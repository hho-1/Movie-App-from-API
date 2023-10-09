import React, { createContext, useEffect, useState } from 'react'
import {GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import {auth} from '../auth/firebase-config'
import { useNavigate } from 'react-router-dom'
import { toastErrorNot, toastSuccessNot, toastWarnNot } from '../helpers/TostNotify'

//https://firebase.google.com/docs/auth/web/start

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {     /* cocuklardan gelen her veriyi kulln */

    const [currentUser, setCurrentUser] = useState()

    let navigate = useNavigate()

    useEffect(() => {
      userTakip()
    }, [])

    const createUser = async (email, password, displayName) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {                //Bu kullanici profilini güncellemek icin kullanilan bir firebase metodu, yani hazir aldik
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

        signInWithPopup(auth, provider).then(() => {
            toastSuccessNot("Successfully logged in with Google")
            navigate("/")
          }).catch((error) => {
          console.log(error.message);
        })

      }

      const userTakip = () => {            //bu metod kullanicinin login logout olup olmadigini kontrol eder. 
        onAuthStateChanged(auth, (user) => {
          
          if (user) {
            const {email, displayName, photoURL} = user
            setCurrentUser({email, displayName, photoURL})
          } else {
            setCurrentUser(false)
          }
        });
      }

      const forgotPassword  = (email) => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
              toastWarnNot("Check your Email")
          })
          .catch((error) => {
            toastErrorNot(error.message)
          });
      }


    return (
        <AuthContext.Provider value={{createUser, signIn, currentUser, logout, signUpGoogle, forgotPassword}}>   {/* Burada cocuklara hem degiskenleri hem de fonksiyonlari gönderiyoruz */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider