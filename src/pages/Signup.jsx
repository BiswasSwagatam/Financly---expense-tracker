import React from 'react'
import Header from '../components/Header'
import SignupSignin from '../components/SignupSignin'

function Signup() {
  return (
    <div>
      <Header />
      <div className='flex justify-center items-center w-full h-[90vh] '>
        <SignupSignin />
      </div>
    </div>
  )
}

export default Signup