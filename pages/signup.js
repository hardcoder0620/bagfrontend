import React, { useState } from 'react'
import Header from '../components/Header'
import { motion, spring } from 'framer-motion';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function signup() {
  const [userName,setUserName]= useState('')
  const [userPass,setUserPass]= useState('')
  const [userMail,setUserMail]= useState('')




  async function createUserFn(){
    if(!userMail || !userName || !userPass){
      toast.error('fill all the fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    }
    const res = await fetch(`http://localhost:3000/api/register`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"userName":userName,"userPass":userPass,"userEmail":userMail})
    })
    const data = await res.json()
    console.warn(data)
    if(data.message == "success"){
      localStorage.setItem('token',data.token)
      localStorage.setItem('userId',data.data.userId)
      toast.success('Account created successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.error('failed', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setUserMail('')
    setUserName('')
    setUserPass('')
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <ToastContainer/>
      <motion.div className=""
        initial={{ opacity: 0, translateX: '-100%' }}
        animate={{ opacity: 1, translateX: '0%' }}
        exit={{ opacity: 0, translateX: '-100%' }}
        transition={{ type: 'spring', stiffness: 60 }}
      >

        <Header />
        <div className="loginMainSec">
          <div className="container">
            <div className="heading">Create new account </div>
            <div className="formSec">
              <div className="row">
                <div className="col-4 mx-auto">
                  <div className="actualForm">
                    <input type="text"  value={userName} onChange={(e)=>setUserName(e.target.value)} className='inField' name="" id="" placeholder='Your Name' />
                    <input type="text"  value={userMail} onChange={(e)=>setUserMail(e.target.value)} className='inField' name="" id="" placeholder='Email Id' />
                    <input type="text"  value={userPass} onChange={(e)=>setUserPass(e.target.value)} className='inField' name="" id="" placeholder='Enter Password' />
                    <button onClick={()=>{
                      createUserFn()
                    }}>Register</button>
                    <div className="create">
                      Already hav an account <Link href={'/login'}>Log in</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
