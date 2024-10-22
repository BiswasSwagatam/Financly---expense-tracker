import React from 'react'

function Header() {
  return (
    <div className='flex justify-between px-5 py-3 m-0 bg-indigo-600 text-white'>
      <div className='flex items-center gap-2'>
        <i className="fa-solid fa-coins"/><p>Financly</p>
      </div>
      <div>
        <p className='cursor-pointer opacity-80 hover:opacity-100'>Logout</p>
      </div>
    </div>
  )
}

export default Header