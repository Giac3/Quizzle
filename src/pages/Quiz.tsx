import React, { useEffect, useState } from 'react'
import { update, useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import LeaderBoard from '../components/LeaderBoard'
import { updateProfile } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Counter from '../components/Counter'

const Quiz = () => {
    const { currentUser } = useAuth()
    const docRef = doc(db, "/players", `${currentUser.uid}`)
    const [isA, setIsA] =  useState(false)
    const [isB, setIsB] =  useState(false)
    const [isC, setIsC] =  useState(false)
    const [isD, setIsD] =  useState(false)
    const [question, setQuestion] = useState<any>()
    const [timer, setTimer] = useState<number>(0)
    const [answers, setAnswers] = useState<string[]>([])
    const [score, setScore] = useState(0)   
    const [userAnswer, setUserAnswer] = useState<string>("") 
    const [isUp, setIsUp] = useState(false)
    const [isDown, setIsDown] = useState(false)
    const [prevScore, setPrevScore] = useState(0)

    useEffect(() => {
        getDoc(docRef).then(docsnap => {
            if (docsnap.exists()) {
                setScore(docsnap.data().score)
            }
        })
    }, [])


    useEffect(() => {
        
        clock()
    }, [timer])

    function shuffle(array:any) {
        var copy = [], n = array.length, i;
      
        
        while (n) {
      
          
          i = Math.floor(Math.random() * n--);
      
          
          copy.push(array.splice(i, 1)[0]);
        }
      
        return copy;
      }


    const clock = () => {

        if (timer === 30) {

            if (question! && userAnswer === question.correctAnswer) {

                if (question.difficulty === "easy") {
                    setScore(score + 2)
                    setPrevScore(score)
                    setIsUp(true)
                    setTimeout(() => {
                        setIsUp(false)
                        setUserAnswer("")
                        update(score+2, currentUser)
                    }, 1000);
                }
                if (question.difficulty === "medium") {
                    setScore(score + 4)
                    setPrevScore(score)
                    setIsUp(true)
                    setTimeout(() => {
                        setIsUp(false)
                        setUserAnswer("")
                        update(score+4, currentUser)
                    }, 1000);
                }
                if (question.difficulty === "hard") {
                    setScore(score + 6)
                    setPrevScore(score)
                    setIsUp(true)
                    setTimeout(() => {
                        setIsUp(false)
                        setUserAnswer("")
                        update(score+6, currentUser)
                    }, 1000);
                }
                
            } 
            if (question! && userAnswer !== question.correctAnswer && userAnswer !== "") {

                if (question.difficulty === "easy") {
                    setScore(score - 3)
                    setPrevScore(score)
                    setIsDown(true)
                    setTimeout(() => {
                        setIsDown(false)
                        setUserAnswer("")
                        update(score -3, currentUser)
                    }, 1000);
                }
                if (question.difficulty === "medium") {
                    setScore(score - 4)
                    setPrevScore(score)
                    setIsDown(true)
                    setTimeout(() => {
                        setIsDown(false)
                        setUserAnswer("")
                        update(score -4, currentUser)
                    }, 1000);
                }
                if (question.difficulty === "hard") {
                    setScore(score - 6)
                    setPrevScore(score)
                    setIsDown(true)
                    setTimeout(() => {
                        setIsDown(false)
                        setUserAnswer("")
                        update(score -6, currentUser)
                    }, 1000);
                }
                
            }
            
            fetch('https://quizzle-server.onrender.com/api').then(result => {
                result.json().then((data) => {
                    setQuestion(data.question[0])
                    
                    let ans = [...data.question[0].incorrectAnswers]
                    ans.push(data.question[0].correctAnswer)
                    
                    let shuffled = shuffle(ans)
                    
                    setAnswers(shuffled)
                })
            }
            )

            setTimer(0)
            
        }
        setTimeout(() => {
            setTimer(timer+1)
        }, 1000);
    }

    useEffect(() => {
        setIsA(false)
        setIsB(false)
        setIsC(false)
        setIsD(false)
    }, [question])


  return (
    <div className='w-screen select-none flex items-center justify-center flex-col gap-5 text-white h-screen bg-purple-200 fixed'>

            <motion.h1 
            initial={{backgroundColor: "#FECACA"}} 
            animate={{backgroundColor: isUp? "#BBF7D0": isDown? "#f24911" : "#FECACA"}}
            transition={{duration: 1}}
            className='absolute top-12 text-3xl font-display bg-red-200 shadow-custom shadow-orange-500 w-20 h-20 rounded-full flex items-center justify-center'>
                <Counter from={prevScore} to={score}/>
            </motion.h1>
        


        {
            question! ?  question.difficulty === "easy"?
             <h1 className='bg-green-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>{question.difficulty.toUpperCase()}</h1> : 
             question.difficulty === "medium" ? 
             <h1 className='bg-orange-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>{question.difficulty.toUpperCase()}</h1> :
              question.difficulty === "hard"? 
              <h1 className='bg-red-200 rounded-md p-2 font-display text-purple-500 shadow-custom'>{question.difficulty.toUpperCase()}</h1> :null :null
        }
        <div className='bg-purple-400 select-none shadow-custom text-center w-[400px] p-2  overflow-y-auto  rounded-md'>
        {question? question.question : "Waiting for the next Question"}
        </div>
        <div className=' w-[400px] flex flex-row gap-4 items-center justify-center '>
            {
                isA?<button className='bg-yellow-200 w-40 duration-300 p-1 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom break-words'>{answers[0]}</button>:<button onClick={() => {setIsA(true),setIsB(false),setIsC(false),setIsD(false), setUserAnswer(answers[0])}} className='bg-green-200 w-32 duration-300 p-1 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom break-words'>{answers[0]}</button>
            }
            {
                isB?<button  className='bg-yellow-200 w-40 duration-300 p-1 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom break-words'>{answers[1]}</button>:<button onClick={() => {setIsA(false),setIsB(true),setIsC(false),setIsD(false), setUserAnswer(answers[1])}} className='bg-green-200 w-32 duration-300 p-1 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom break-words'>{answers[1]}</button>
            }
            {
                isC?<button  className='bg-yellow-200 w-40 duration-300 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm p-1  rounded-md shadow-custom break-words'>{answers[2]}</button>:<button onClick={() => {setIsA(false),setIsB(false),setIsC(true),setIsD(false), setUserAnswer(answers[2])}} className='bg-green-200 w-32 duration-300 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm p-1  rounded-md shadow-custom break-words'>{answers[2]}</button>
            }
            {
                isD?<button  className='bg-yellow-200 p-1 w-40 break-words  duration-300 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom'>{answers[3]}</button>:<button onClick={() => {setIsA(false),setIsB(false),setIsC(false),setIsD(true), setUserAnswer(answers[3])}} className='bg-green-200 p-1 w-32 duration-300 hover:bg-yellow-200 hover:shadow-md text-black font-display text-sm  rounded-md shadow-custom break-words'>{answers[3]}</button>
            }
            
        </div>
        <div className=' w-[400px] h-4 rounded-md shadow-custom' >
            <motion.div 
            initial={{width:0}} 
            animate={{width: (timer/30)*400}}  
            transition={{duration:1}}
            className=' bg-gradient-to-r from-purple-300 to-yellow-400 h-full rounded-md' ></motion.div>
        </div>
        <h2 className='bg-yellow-200 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-custom p-3 text-xl '>{30 - timer}</h2>
        <div className='flex-row gap-2 items-center flex bg-purple-400 p-2 rounded-md font-display shadow-custom'>
        <img className='w-10 h-10 rounded-md shadow-custom' src={currentUser.photoURL} alt='avatar'/>
        <h3 className=''>{currentUser.displayName}</h3>
        </div>
        <h6 className='absolute bottom-[84px] shadow-custom text-xl font-display text-black bg-rose-200 p-2 rounded-md rounded-br-none rounded-bl-none'>Top4 Players</h6>
        <LeaderBoard/>
    </div>
  )
}

export default Quiz
