import React from 'react'
import Header from '../components/Header'
import { motion, spring } from 'framer-motion';
import Link from 'next/link';

export default function login() {
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
                <div className="heading">Log in </div>
                <div className="formSec">
                    <div className="row">
                        <div className="col-4 mx-auto">
                            <div className="actualForm">
                                <input type="text" className='inField'  name="" id="" placeholder=' Email Id'/>
                                <input type="text" className='inField'  name="" id="" placeholder='Enter Password'/>
                                <button>Log in</button>
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
