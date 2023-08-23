import React, { createContext } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../auth/firebase-config'
import { useNavigate } from 'react-router-dom'

//https://firebase.google.com/docs/auth/web/start

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    //let navigate = useNavigate()

    const createUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            
          } catch (error) {
            console.log(error.message);
          }
    }

    const signIn = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          //navigate("/")

        } catch (error) {
          console.log(error.message);
        }
      }


    return (
        <AuthContext.Provider value={{createUser, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider