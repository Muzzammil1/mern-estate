import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const handleChange = () => {

  }
  return (
    <div className='w-2/3 mx-auto'>
      <h1 className='text-center my-6 font-bold text-3xl'>Profile page</h1>
      <form className='flex flex-col gap-y-5' >
        <img className='object-cover h-14 w-14 rounded-full object-center cursor-pointer self-center' src={currentUser.avatar} alt="" />

        <input
          type="text"
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange} />

        <input
          type="text"
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange} />

        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 '>
          Update
        </button>

        <button
          className='bg-green-900 text-white p-3 rounded-lg uppercase hover:opacity-80'>
          Creating List
        </button>

        <div className="flex justify-between">
        <div className='text-red-800'>Delete Account</div>
        <div className='text-red-800'>Sign out</div>
        </div>
      </form>
    </div>
  )
}
