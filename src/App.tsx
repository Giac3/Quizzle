import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './contexts/AuthContext'
import Quiz from './pages/Quiz'

function App() {
  
const goToQuiz = () => {

}
  return (
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/quiz' element={<Quiz />}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
