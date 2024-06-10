import { useSelector } from 'react-redux';
import {useRef, useState, useEffect} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  console.log(formData)
  console.log(filePerc);
  console.log(fileUploadError)

  useEffect(() =>{
    if(file){
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
      (error)=>{
        setFileUploadError(true)
      },

      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
      ( (downloadURL) =>  setFormData({...formData, avatar: downloadURL})
      );
    }
  )

  };
  return (
    <div className='w-2/3 mx-auto'>
      <h1 className='text-center my-6 font-bold text-3xl'>Profile page</h1>
      <form className='flex flex-col gap-y-5' >
        <input onChange={(e) =>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='object-cover h-14 w-14 rounded-full object-center cursor-pointer self-center' src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image Upload image less than 2 MB</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ): filePerc === 100 ? (
            <span className='text-green-700'>Image Succesfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='email'
         />

        <input
          type="text"
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
           />

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
