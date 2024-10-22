import React from 'react'

function Input({label, state, setState, placeholder, type}) {
  return (
    <div>
        <p className='pb-2'>{label}</p>
        <input 
            className='w-full border-[1px] border-opacity-50 rounded-lg border-black p-1' 
            placeholder={placeholder} 
            type={type}
            onChange={(e) => setState(e.target.value)}
            value={state}/>
    </div>
  )
}

export default Input