import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {Link} from 'react-router-dom';
import { app } from '../firebase';
import { updateUserStart, 
  updateUserSuccess, 
  updateUserFailure, 
  deleteUserFailure, 
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess} from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [UpdateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  // console.log(formData)
  // console.log(filePerc);
  // console.log(fileUploadError)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);

    }

  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => setFormData({ ...formData, avatar: downloadURL })
          );
      }
    )

  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      
    } catch (error) {
      console.error('Error during user update: Catch Block But why its running', error);
        dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser =async ()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(data.message))
    }
  }
  return (
    <div className='w-2/3 mx-auto'>
      <h1 className='text-center my-6 font-bold text-3xl'>Profile page</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-5' >
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='object-cover h-14 w-14 rounded-full object-center cursor-pointer self-center' src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image Upload image less than 2 MB</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image Succesfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          onChange={handleChange}
          placeholder='Username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          id='username'
        />

        <input
          type="text"
          onChange={handleChange}
          placeholder='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          id='email'
        />

        <input
          type="text"
          onChange={handleChange}
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 '>
          {loading? 'Loading...': 'Update'}
        </button>

        <Link to={"/create-listing"}
          className='bg-green-900 text-white text-center p-3 rounded-lg uppercase hover:opacity-95'>
          Creating List
        </Link>

        <div className="flex justify-between">
          <div onClick={handleDeleteUser} className='text-red-800'>Delete Account</div>
          <div onClick={handleSignOut} className='text-red-800'>Sign out</div>
        </div>
        <p className='text-red-700 mt-5 text-center'>{error?error:''}</p>
        <p className='text-green-700 mt-4 text-center'>{UpdateSuccess?'User is updated successfully!':''}</p>
      </form>
    </div>
  )
}
