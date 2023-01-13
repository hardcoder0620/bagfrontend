import React from 'react'
import Header from '../components/Header'
import { motion } from 'framer-motion'
import { useSelector,useDispatch  } from 'react-redux'
import { setUser } from '../store/slices/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

export default function profile() {
    const dispatch = useDispatch()
    const userSlice = useSelector((state)=>state.userReducer)
    const router = useRouter()

    function logOutFn(){
        localStorage.setItem('token','')
        localStorage.setItem('userId','')
        localStorage.setItem('userName','')
        dispatch(setUser({
            userName:'',
            token:'',
            userId:''
        }))
        
        toast.success('Logged out successfully', {
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
                <div className="profileMainSec">
                    <div className="container">

                      <div className="wel">
                        Welcome {userSlice.userName}
                      </div>
                        <div className="mt-5 text-md-start text-center"  >
                            <button className='lgout' onClick={()=>{logOutFn()}} >log out</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
