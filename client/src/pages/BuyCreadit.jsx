import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {  motion } from "framer-motion";

const BuyCreadit = () => {

  const {user} =useContext(AppContext)
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='min-h-[80vh] text-center pt-14 mb-10'>
       <button className='border border-gray-400 px-12 py-2 rounded-full bg-zinc-300 mb-5'>Our plans</button>
       <h1 className='text-3xl font-medium mb-6 sm:mb-10'>Choose the Plans</h1>
       
       <div className='flex flex-wrap justify-center text-left gap-5  p-12 '>
      {plans.map((item,index)=>(
        <div className='bg-white crop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 translate-all duration-500' key={index}>
          <img width={40} src={assets.logo_icon} alt="" />
          <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
          <p className='text-sm'>{item.desc}</p>
          <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span> / {item.credits} creadits</p>
          <button className=' mt-7 text-center px-12 py-2 rounded-md bg-black text-white '>{user ? 'Purchase':'Get Started'}</button>
        </div>
      ))}
       </div>
    </motion.div>
  )
}

export default BuyCreadit
