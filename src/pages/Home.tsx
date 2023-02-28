import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JoinQuiz from '../components/JoinQuiz'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import {AiOutlineRollback} from 'react-icons/ai'

const Home = () => {
    const [showJoinQuiz, setShowJoinQuiz] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const { currentUser} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
      if (currentUser!) {
        navigate('/quiz')
      }
    }, [])

  return (
    <div className=" bg-[#efefef] w-screen flex-col gap-5 h-screen flex items-center justify-center">
      <div className='bg-rose-50 shadow-bubble w-96 h-40 flex items-center justify-center flex-col gap-4'>
        <h1 className='font-display text-xl'>Welcome to Quizzle</h1>
        <button onClick={() => {setShowJoinQuiz(true)}}  className='bg-green-200 font-display p-2 rounded-md shadow-custom duration-300 hover:shadow-sm hover:bg-yellow-200'>Join the Quiz</button>
      
      </div>
      {
        showJoinQuiz? <JoinQuiz /> : null
      }

      {
        showJoinQuiz? null : <div onClick={() => {setShowInfo(true)}} className='bg-purple-200 select-none cursor-pointer p-2 duration-300 hover:bg-yellow-200 font-display rounded-md shadow-custom'>How it Works ?</div>
      }
      
      {
        showInfo?<motion.div initial={{scale:0}} animate={{scale:1}} className='bg-rose-50 rounded-md flex-col shadow-bubble w-96 gap-2 h-64 absolute flex justify-center items-center'>
          <h1 className='font-display'>You play live against the rest of the world</h1>
          <h2 className='font-display text-sm text-gray-500'>Everyone gets the same question</h2>
          <div className='flex flex-row gap-2 mt-2 items-center justify-center'>
          <h3 className='bg-green-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>EASY</h3>
          <h4 className='font-display'> | Correct <span className='bg-green-300 p-2 rounded-full text-center shadow-custom'>+2</span> | Wrong <span className='bg-red-300 p-2 rounded-full text-center shadow-custom'>-2</span></h4>
          </div>
          <div className='flex flex-row gap-2 mt-2 items-center justify-center'>
          <h3 className='bg-orange-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>MEDIUM</h3>
          <h4 className='font-display'> | Correct <span className='bg-green-300 p-2 rounded-full text-center shadow-custom'>+4</span> | Wrong <span className='bg-red-300 p-2 rounded-full text-center shadow-custom'>-4</span></h4>
          </div>
          <div className='flex flex-row gap-2 mt-2 items-center justify-center'>
          <h3 className='bg-red-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>HARD</h3>
          <h4 className='font-display'> | Correct <span className='bg-green-300 p-2 rounded-full text-center shadow-custom'>+6</span> | Wrong <span className='bg-red-300 p-2 rounded-full text-center shadow-custom'>-6</span></h4>
          </div>
          <button onClick={() => {setShowInfo(false)}} className='absolute bg-red-200 rounded-sm m-1 shadow-custom top-0 right-0'><AiOutlineRollback/></button>
        </motion.div>:null
      }

    </div>
  )
}

export default Home
