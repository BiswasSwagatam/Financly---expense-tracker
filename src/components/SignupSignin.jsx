import React, { useState } from 'react'
import Input from './Input'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSignin() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const navigate = useNavigate()
  


  function signupWithEmail(e) {
    setLoading(true)
    e.preventDefault()
    if(password.length < 6) {
      toast.error("Password must be at least 6 characters")
      setLoading(false)
    }
    else if(password !== confirmPassword) {
      toast.error("Passwords do not match")
      setLoading(false)
    }
    else if(!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields")
      setLoading(false)
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        toast.success("Account created successfully")
        setConfirmPassword("")
        setPassword("")
        setEmail("")
        setName("")
        setLoading(false)
        createDoc(user)
        navigate("/dashboard")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false)
        // ..
      });
    }

  }

  function googleAuth(e) {
    setLoading(true)
    e.preventDefault()
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user)
          toast.success("User Authenticated successfully")
          createDoc(user)
          setLoading(false)
          navigate("/dashboard")
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(errorMessage)
          setLoading(false)
          // ...
        });
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
    
  }

  function loginWithEmail(e) {
    setLoading(true)
    e.preventDefault()
    if(!email || !password) {
      toast.error("Please fill all the fields")
      setLoading(false)
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("Logged in successfully")
          setEmail("")
          setPassword("")
          setLoading(false)
          navigate("/dashboard")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false)
          toast.error(errorMessage)
        });
    }
  }


  async function createDoc(user) {
    setLoading(true)
    if(!user) return

    const userRef = doc(db, "users", user.uid)
    const userData = await getDoc(userRef)
    if(!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photo: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        })
        console.log("User doc created")
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    } else {
      console.log("User doc already exists")
      setLoading(false)
    }
  }



  return (
    <>
    
    {loginForm ? 
    <div className='flex flex-col justify-center items-center w-[70%] max-w-[500px] border-[1px] rounded-lg shadow-2xl p-10'>
      <p className='flex text-center text-2xl py-7 gap-2'>Login on <span className='text-indigo-600'>Financly</span></p>
      <form className='flex flex-col gap-2'>
        <Input 
          label={"Email"} 
          state={email} 
          setState={setEmail} 
          placeholder={"email"} 
          type={"email"} 
        />
        <Input 
          label={"Password"} 
          state={password} 
          setState={setPassword} 
          placeholder={"password"} 
          type={"password"} 
        />
        <button disabled={loading} onClick={loginWithEmail} className='mx-auto border-2 border-indigo-600 rounded-lg bg-white  text-indigo-600 hover:bg-indigo-600 hover:text-white mt-5 p-2'>
          {loading ? "Logging in..." : "Log In with email"}
        </button>
        <p className='text-center'>or</p>
        <button disabled={loading} onClick={googleAuth} className='mx-auto border-2 border-indigo-600 rounded-lg bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 mb-5 p-2'>
        {loading ? "Logging in..." : "Log in with Google"}
        </button>
      </form>
      <p>Don't have an account? <span onClick={() => setLoginForm(false)} className='text-indigo-600 cursor-pointer'>Sign Up</span></p>
    </div>
      : 
      <div className='flex flex-col justify-center items-center w-[70%] max-w-[500px] border-[1px] rounded-lg shadow-2xl p-10'>
        <p className='flex text-center text-2xl py-7 gap-2'>Sign Up on <span className='text-indigo-600'>Financly</span></p>
        <form className='flex flex-col gap-2'>
          <Input 
            label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"name"} 
            type={"text"} 
          />
          <Input 
            label={"Email"} 
            state={email} 
            setState={setEmail} 
            placeholder={"email"} 
            type={"email"} 
          />
          <Input 
            label={"Password"} 
            state={password} 
            setState={setPassword} 
            placeholder={"password"} 
            type={"password"} 
          />
          <Input 
            label={"Confirm Password"} 
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder={"confirm password"} 
            type={"password"} 
          />
          <button disabled={loading} onClick={signupWithEmail} className='mx-auto border-2 border-indigo-600 rounded-lg bg-white  text-indigo-600 hover:bg-indigo-600 hover:text-white mt-5 p-2'>
            {loading ? "Signing up..." : "Sign Up with email"}
          </button>
          <p className='text-center'>or</p>
          <button disabled={loading} onClick={googleAuth} className='mx-auto border-2 border-indigo-600 rounded-lg bg-indigo-600  text-white hover:bg-white hover:text-indigo-600 mb-5 p-2'>
          {loading ? "Signing up..." : "Sign Up with Google"}
          </button>
        </form>
      <p>Already have an account? <span onClick={() => setLoginForm(true)} className='text-indigo-600 cursor-pointer'>Login</span></p>
    </div>}
    </>
    
  )
}

export default SignupSignin