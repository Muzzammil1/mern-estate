import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
function CreateListing() {
    const [files , setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false)
    console.log(formData);
    const handleImageSubmit = (e) => {
        if(files.length > 0 && files.length + formData.imageUrls.length< 7){
            setUploading(true);
            setImageUploadError(false)
            const promises = [];

            for (let i = 0; i < files.length ; i++){
                promises.push(storeImage(files[i]));

            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, 
                    imageUrls: formData.imageUrls.concat(urls) 
                });
                setImageUploadError(false);
                setUploading(false);
              
            }).catch((err) => {
                setImageUploadError('Image upload failed (2 mb max per image');
                setUploading(false);
            })
          
        }else{
            setImageUploadError('You can upload 6 images per listing')
            setUploading(false);
        }
    };
    const storeImage = async (file) => {
        return new Promise((resolve , reject ) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=> {
                    reject(error);
                },
                ()=>{
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //     resolve(downloadURL);
                    // })
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      resolve(downloadURL); // <--- This should work now
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }
                
            )

        })
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),

        });
    }
//     const [formData, setFormData] = useState({
//         imageUrls: [],
//     })
//     console.log(formData);
//     const handleImageSubmit = (e) => {
//         console.log('hello')
//         if(files.length>0 && files.length<7){
//             const promises = [];

//             for(let i=0; i < files.length; i++){
//                 promises.push(storeImage(files[i]))
//             }
//             Promise.all(promises).then((urls) => {
//                 setFormData({...formData, imageUrls:formData.concat(urls)});
//             })
//         }
//         console.log('if checks end ')
//     }

//    const storeImage = async (file)=>{
//     return new Promise((resolve,reject) =>{
//         const storage = getStorage(app)
//         const fileName = new Date().getTime() + file.name;
//         const storageRef = ref(storage, fileName);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//                 // You can optionally handle progress here if needed
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log(`Upload is ${progress}% done`);
//             },
//             (error)=>{
//                 // Handle unsuccessful uploads
//                 console.error('Upload failed:', error);
//                 reject(error);
//             },
//             () => {
//                 // Handle successful uploads on complete
//                 getDownloadURL(uploadTask.snapshot.ref)
//                     .then((downloadURL) => {
//                         console.log('File available at', downloadURL);
//                         resolve(downloadURL);
//                     })
//                     .catch((error) => {
//                         console.error('Failed to get download URL:', error);
//                         reject(error);
//                     });
//             }

//         )

//     });
//    }
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1 '>
                    <input type="text" placeholder='Name' className='border p-3 
                rounded-lg' id='name' maxLength='62' minLength='10' required></input>
                    <textarea type="text" placeholder='Description' className='border p-3 
                rounded-lg' id='description' required></textarea>
                    <input type="text" placeholder='Address' className='border p-3 
                rounded-lg' id='address' required></input>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>Parking Slot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className='flex gap-6 flex-wrap'>
                    <div className='flex items-center gap-2'>
                        <input type="number" min='1' max='10' required id='bedrooms'
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Beds</p>
                    </div>
                    <div  className='flex items-center gap-2'>
                        <input type="number" min='1' max='10'required id='bathrooms'
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <p>Bath</p>
                    </div>

                    <div  className='flex items-center gap-2'>
                        <input type="number" min='1' max='10'required id='regularPrice'
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                        <p>Regular Price</p>
                        <span className='text-xs'>($ / Month)</span>
                        </div>
                    </div>

                    <div  className='flex items-center gap-2'>
                        <input type="number" min='1' max='10'required id='discountPrice'
                        className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                        <p>Discounted Price</p>
                        <span className='text-xs'>($ / Month)</span>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Half side */}
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>

                    <div className='flex gap-4'>
                        <input  onChange={(e)=>setFiles(e.target.files)} className='p-3 border rounded border-gray-300 w-full' type="file" id='images' accept='image/*' multiple />
                        <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading? 'Uploading...': 'Upload'}</button>
                    </div>
                    <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

                    {
                        
                        formData.imageUrls.length > 0 &&  formData.imageUrls.map((url, index) => (
                           <div key={url} className='flex justify-between border p-3 items-center'>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                            <button type='button' onClick={()=> handleRemoveImage(index)}  className='p-3 text-red-700 rounded-lg uppercase hover-opacity-75'>Delete</button>
                            </div>
                        ))
                    }

                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                    
                </div>
       
            </form>
        </main>
    )
}

export default CreateListing


{/* <h1 className='text-center m-4 font-bold text-lg '>Create Listing</h1>
    <div className='w-4/5 m-auto md:flex  md:space-x-4'>
  
        <div className='flex-1 mb-4 md:mb-0'>
            <div className='flex flex-col'>
            <input className='my-2  p-2  rounded-md ' type="text" placeholder='Name' />
            <textarea className='my-2 rounded-md p-2' type="text" placeholder='Description' />
            <input className='my-2 rounded-md p-2' type="text" placeholder='Address' />
            </div>

            <div className='mx-1'>
                <input className='mr-1' type="checkbox" /><label>Sell</label>
                <input className='mr-1 ml-3' type="checkbox" /><label>Rent</label>
                <input className='mr-1 ml-3' type="checkbox" /><label>Parking Spot</label>
                <input className='mr-1 ml-3' type="checkbox" /><label>Furnished</label>
                <br />
                <input className='mr-1' type="checkbox"  /><label>Offer</label>
            </div>
            <div className='mt-3'>
                <input className='p-2 rounded-md w-16 mr-2' type="number" id='bedrooms' min='1' max='10' required/><label>Beds</label>
                <input className='p-2 rounded-md w-16 mr-2 ml-2' type="number"  id='bathrooms' min='1' max='10' required/><label>Baths</label>
                <br />
                <input className='p-2 rounded-md w-20 mr-2 mt-3' type="number" id='bedrooms' min='1' max='10' required/><label>Regular Price </label>($/Month)
            </div>
        </div>

        <div className=' flex-1 mb-4 md:ml-3'>
            <p><span className='font-bold'>Images:</span>The first image will be cover (max6)
            </p>

            <input className='border p-3 mt-3' type="file" /> <button className='border text-green-700 border-green-700 p-3 ml-2'>Upload</button>
            <br />
            <button className='bg-slate-700 mt-3 w-full text-white p-3 rounded-lg uppercase hover:opacity-80 '>
          Create Listing
        </button>
        </div>

    </div> */}