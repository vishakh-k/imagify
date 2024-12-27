import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router';

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();
  const onclickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div  
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1, }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{once:true}}
    className='flex flex-col justify-center items-center pb-16'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800 py-6 md:py-16'>See the Magic. Try Now</h1>
      <button onClick={onclickHandler} className="inline-flex sm:text-lg text-white bg-black w-auto px-12 py-3 gap-2 m-auto items-center rounded-full hover:scale-105 transition-all duration-500">Generate Images <img src={assets.star_group} alt="" className='h-6' /></button>
    </motion.div>
  )
}

export default GenerateBtn
