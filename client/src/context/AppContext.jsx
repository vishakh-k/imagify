import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const backendUrl = "https://imagify-backend-tzk9.onrender.com";

  const navigate = useNavigate();

  const loadCreditsData = async () => {
    if (!token) return; // Prevent unnecessary API calls if no token is present

    try {
      const { data } = await axios.get(backendUrl+'/api/user/credits', {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to load credits.");
      }
    } catch (error) {
      console.error("Error loading credits:", error);
      toast.error(error.response?.data?.message || "Error loading credits.");
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl+'/api/image/generate-image',
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData(); 
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
      }
    }
    } catch (error) {
      console.error("Error generating image:", error.response ? error.response.data : error.message);
      toast.error("Image generation failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData(); // Only load credits data if there's a valid token
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
