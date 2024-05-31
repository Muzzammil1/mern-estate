import React from 'react'
import { Link } from 'react-router-dom'
export default function SignUp() {
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />

        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' />


        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />

        <button className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-80'>Sign UP</button>
        <button className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-80'>Sign In</button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-700'>SignIn</span>
        </Link>
      </div>
    </div>


    // My Design


  //   <div className="bg-slate-100 h-screen">
  //   <div className='text-center pt-10'>
  //     <h1 className='pb-3 font-bold text-4xl'>Sign UP</h1>
  //     <form>
  //       <input className='rounded-sm mb-3 focus:outline-none sm:w-3/5 p-2' type="text" placeholder='Username' id="username" /> <br></br>
  //       <input className='rounded-sm mb-3 focus:outline-none sm:w-3/5 p-2' type="text" placeholder='Email' id="email" /><br></br>
  //       <input className='rounded-sm mb-3 focus:outline-none sm:w-3/5 p-2' type="password" placeholder='password' id="password"/><br></br>


  //       <button className='rounded-sm mb-3  w-48 sm:w-3/5 p-2 bg-slate-800 text-slate-50'>Sign Up</button> <br></br>
  //       <button className='rounded-sm mb-3  w-48 sm:w-3/5 p-2 bg-red-600 text-slate-50'>CONTINUE WITH GOOGLE</button>
  //     </form>

  //     <p className='mt-4 text-center sm:w-3/5 mx-auto text-left'>Have an account? <span>Sign in</span>
  //     </p>
  //   </div>
  // </div>


  // Ends Here
  )
}
