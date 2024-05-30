import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
            <Link to='/'>
            <h1 className='font-bold flex flex-wrap text-sm sm:text-xl'>   {/*Text small for mobile screen : text-sm, Big screen min-width 649px to larger is sm:text-xl  */}
           
                <span className='text-slate-500'>MuzzammilNoor</span>
                <span className='text-slate-700'>Khan</span>
            </h1>
            </Link>
            <form className='rounded-lg bg-slate-100 p-3 flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600' />
            </form>

            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>

                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'> About</li>
                </Link>
                <Link to='/SignIn'>
                <li className=' text-slate-700 hover:underline'>SignIn</li>
                </Link>
                <Link to='/SignUp'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>SignUp</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
