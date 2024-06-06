import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = async () => {
        try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth, provider)
        console.log('Google sign-in result:', result);
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
        })
        console.log('Fetch response:', res);
            if (!res.ok) {
                throw new Error('Failed to authenticate with backend');
            }
        const data = await res.json()
        dispatch(signInSuccess(data))
        navigate('/')
            
        } catch (error) {
            console.log('Could not Sign with google OAuth.jsx Catch', error);
            dispatch(signInFailure(error.message))
        }
    }
    return (
        <button type='button' onClick={handleChange} className='bg-red-600 text-white p-3 rounded-lg uppercase  hover:opacity-95'>
            CONTINUE WITH GOOGLE
        </button>
    )
}


