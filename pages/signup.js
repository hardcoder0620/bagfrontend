import React from 'react'
import Header from '../components/Header'
import { motion, spring } from 'framer-motion';
import Link from 'next/link';

export default function signup() {
  return (
    <div style={{ overflow: 'hidden' }}>
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
                    <input type="text" className='inField' name="" id="" placeholder='Your Name' />
                    <input type="text" className='inField' name="" id="" placeholder='Email Id' />
                    <input type="text" className='inField' name="" id="" placeholder='Enter Password' />
                    <button>Register</button>
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
