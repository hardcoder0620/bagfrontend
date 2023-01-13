import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import TopCarousel from '../components/TopCarousel'
import TopCategories from '../components/TopCategories'
import { setUser } from '../store/slices/userSlice'

import { motion } from 'framer-motion';

import { increment, decrement } from '../store/slices/counterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const count = useSelector((state) => state.counterReducer.value)
  const userSlice = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserSliceFn()
  }, [])


  function setUserSliceFn() {
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    if (userName && userId && token) {
      dispatch(setUser({
        userName: userName,
        token: token,
        userId: userId
      }))
    }
  }


  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, translateX: '-100%' }}
        animate={{ opacity: 1, translateX: '0%' }}
        exit={{ opacity: 0, translateX: '-100%' }}

        transition={{ type: 'spring', stiffness: 60 }}
      >
        <Head>
          <title>E-commerse</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <TopCarousel />
        <TopCategories />
        <div className="counter">
          <div className="counterr">
            {count}
          </div>
          <button onClick={() => { dispatch(increment()) }} >in</button>
          <button onClick={() => { dispatch(decrement(20)) }} >de</button>
        </div>
      </motion.div>
    </div>
  )
}
