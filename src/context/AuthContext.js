import React, { createContext, useEffect, useState } from 'react'
import {GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import {auth} from '../auth/firebase-config'
import { useNavigate } from 'react-router-dom'
import { toastErrorNot, toastSuccessNot } from '../helpers/TostNotify'

//https://firebase.google.com/docs/auth/web/start

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()

    let navigate = useNavigate()

    useEffect(() => {
      userTakip()
    }, [])

    const createUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
              displayName: displayName,
            }); 
            toastSuccessNot("Successfully registered!")
            navigate("/")
            
          } catch (error) {
            toastErrorNot(error.message)
          }
    }

    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          toastSuccessNot("Successfully logged in!")
          navigate("/")

        } catch (error) {
          toastErrorNot(error.message)
        }
      }

      const logout = () => {
        signOut(auth)
        toastSuccessNot("Successfully logged out!")
      }

      const signUpGoogle = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then((res) => {
            toastSuccessNot("Successfully logged in with Google")
            navigate("/")
          }).catch((error) => {
          console.log(error.message);
        })

      }

      const userTakip = () => {
        onAuthStateChanged(auth, (user) => {
          
          if (user) {
            const {email, displayName, photoURL} = user
            setCurrentUser({email, displayName, photoURL})
          } else {
            setCurrentUser(false)
          }
        });
      }

      


    return (
        <AuthContext.Provider value={{createUser, signIn, currentUser, logout,signUpGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider