import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { doc, getDoc, setDoc } from 'firebase/firestore'

const AuthContext =  React.createContext<any>(null)

const provider = new GoogleAuthProvider()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children}:any) {
    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    function signIn() {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value:object = {
        currentUser,
        signIn
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}