import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { motion, spring } from 'framer-motion';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

export default function login() {
    const router = useRouter()
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    // dispatcj and selector
    const dispatch = useDispatch()
    const userSlice = useSelector((state) => state.userReducer)


    useEffect(() => {
      checkUserLoginFun()
    }, [])

    function checkUserLoginFun(){
        const token = localStorage.getItem('token')
        if(token){
            router.push('/profile')
        }

    }

    async function logInFn() {
        try {
            if (!userEmail || !userPass) {
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
            const res = await fetch(`https://bagfrontend.vercel.app/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userEmail": userEmail,
                    "userPass": userPass
                })
            })
            const data = await res.json()
            console.log("user logged in ", data)
            console.log('userSlice before', userSlice)
            if (data.message == "success") {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.data.userId)
                localStorage.setItem('userName', data.data.userName)

                dispatch(setUser({
                    userName: data.data.userName,
                    token: data.token,
                    userId: data.data.userId
                }))

                console.log('userSlice after', userSlice)
                toast.success('Logged in successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    router.push('/')
                }, 2000);

            } else {
                toast.error(data.message, {
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
            setUserEmail('')
            setUserPass('')


        } catch (error) {
            console.log("login error", error)
            toast.error("Failed", {
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
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <ToastContainer />
            <motion.div className=""
                initial={{ opacity: 0, translateX: '-100%' }}
                animate={{ opacity: 1, translateX: '0%' }}
                exit={{ opacity: 0, translateX: '-100%' }}
                transition={{ type: 'spring', stiffness: 60 }}
            >
                <Header />
                <div className="loginMainSec">
                    <div className="container">
                        <div className="heading">Log in </div>
                        <div className="formSec">
                            <div className="row">
                                <div className="col-md-4 mx-auto">
                                    <div className="actualForm">
                                        <input type="text" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} className='inField' name="" id="" placeholder=' Email Id' />
                                        <input type="text" value={userPass} onChange={(e) => { setUserPass(e.target.value) }} className='inField' name="" id="" placeholder='Enter Password' />
                                        <button onClick={() => { logInFn() }}>Log in</button>
                                        <div className="create">
                                            create new account <Link href={'/signup'}>Sign up</Link>
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
