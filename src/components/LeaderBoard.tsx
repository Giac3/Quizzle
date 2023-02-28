import { collection, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

const LeaderBoard = () => {
  const playersRef = collection(db, "/players")
  const [topFive, setTopFive] = useState<object[]>([])
  useEffect(() => {

    if (topFive.length <4) {
      let q = query(playersRef, orderBy('score', 'desc'), limit(4))
      const retrieveData = async() => { 
        const docsSnap = await getDocs(q)
        docsSnap.forEach(doc => {
          
          setTopFive(prev => [...prev,doc.data()] )
          
        })
      }
      retrieveData()
    }

    
  }, [])

  return (
    <div className='absolute p-6 bottom-10 items-center justify-center bg-red-200 w-[460px] flex flex-row gap-2 rounded-md shadow-custom h-10'>
      {
        topFive.length !== 0 ? topFive.map((player:any, i) => {
          return <div key={i} className="bg-purple-300 flex flex-row items-center   rounded-md shadow-custom w-32 h-10" >
            <img className='w-7 h-7 m-1 rounded-md shadow-custom' src={player!.photo}/>
            <div className='flex flex-col gap-1'>
            <h1 className='font-display text-xs'> { player.name.length >7 ? `${player.name.substring(0,7)}...` : player.name}</h1>
            <h2 className='font-display text-[9px] text-black'>Score: {player.score}</h2>
            </div>
          </div>
        }):null
      }
    </div>
  )
}

export default LeaderBoard
