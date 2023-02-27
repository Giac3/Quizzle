import React, { useState } from 'react'
import JoinQuiz from '../components/JoinQuiz'
const Home = () => {
    const [showJoinQuiz, setShowJoinQuiz] = useState(false)

  return (
    <div className=" bg-[#efefef] w-screen h-screen flex items-center justify-center">
      <div className='bg-rose-50 shadow-bubble w-96 h-40 flex items-center justify-center flex-col gap-4'>
        <h1 className='font-display text-xl'>Welcome to Quizzle</h1>
        <button onClick={() => {setShowJoinQuiz(true)}}  className='bg-green-200 font-display p-2 rounded-md shadow-custom duration-300 hover:shadow-sm hover:bg-yellow-200'>Join the Quiz</button>
      
      </div>
      {
        showJoinQuiz? <JoinQuiz /> : null
      }
    </div>
  )
}

export default Home
