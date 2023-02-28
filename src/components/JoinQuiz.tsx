import { uuidv4 } from '@firebase/util'
import React, { useRef, useState } from 'react'
import { FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const JoinQuiz = () => {
  const { signIn, signInGuest } = useAuth()
  const navigate = useNavigate()
  const [showGuest, setShowGuest] = useState(false)
  const userNameRef = useRef() as React.MutableRefObject<HTMLInputElement>
    

    const handleGoogle = async () => {
      await signIn()
      navigate('/quiz')
    }
    const handleGuest = async () => {
      if (userNameRef.current.value !== ""){
        await signInGuest(userNameRef.current.value)
        navigate('/quiz')
      } else {
        await signInGuest(`Guest-${uuidv4().split("-")[0]}`)
        navigate('/quiz')
      }
    }
    
  return (
    <div className='bg-rose-50  w-96 h-40 absolute flex items-center justify-center gap-2'>
      <button onClick={() => {setShowGuest(true)}} className='bg-green-200 rounded-md p-2 w-44 shadow-custom'>Join As Guest</button>
      <button onClick={handleGoogle} className='bg-purple-200 rounded-md p-2 shadow-custom w-44'>Join with Google
      <FcGoogle className='inline-block ml-2 scale-[1.3]' />
      </button>
      {
        showGuest? <div className=' bg-green-200 absolute flex items-center flex-col gap-2 justify-center w-96 h-40'>
          <input ref={userNameRef} placeholder='Username...' className='w-64 rounded-md outline-none bg-purple-200 shadow-custom font-display h-10 p-1'/>
          <button onClick={handleGuest} className='bg-blue-200 p-2 duration-300 hover:bg-yellow-200 hover:shadow-md font-display rounded-md shadow-custom'>Join</button>
        </div>:null
      }
      
    </div>
  )
}

export default JoinQuiz
