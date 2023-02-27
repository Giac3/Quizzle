import React from 'react'
import { FcGoogle} from 'react-icons/fc'
const JoinQuiz = () => {

    const handleGuest = () => {

    }

    const handleGoogle = () => {

    }
    
  return (
    <div className='bg-rose-50  w-96 h-40 absolute flex items-center justify-center gap-2'>
      <button onClick={handleGuest} className='bg-green-200 rounded-md p-2 w-44 shadow-custom'>Join As Guest</button>
      <button onClick={handleGoogle} className='bg-purple-200 rounded-md p-2 shadow-custom w-44'>Join with Google
      <FcGoogle className='inline-block ml-2 scale-[1.3]' />
      </button>
      
    </div>
  )
}

export default JoinQuiz
