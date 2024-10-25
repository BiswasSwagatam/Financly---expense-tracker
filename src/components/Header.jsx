import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';


function Header() {

  const [user, loading] = useAuthState(auth);
  const naviagte = useNavigate();

  useEffect(() => {
    if(user) {
      naviagte("/dashboard")
    }
  }, [user])

  function logout() {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged out successfully")
        naviagte("/")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='z-100 flex justify-between px-5 py-3 m-0 bg-indigo-600 text-white'>
      <div className='flex items-center gap-2'>
        <i className="fa-solid fa-coins"/><p>Financly</p>
      </div>
      {user && 
        <div className='flex items-center gap-2'>
          
          <p onClick={logout} className='cursor-pointer opacity-80 hover:opacity-100'>Logout</p>
        </div>
      }
    </div>
  )
}

export default Header