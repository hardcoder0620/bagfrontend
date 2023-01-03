import React from 'react'
import { FaRegHeart,FaShoppingCart,FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header>
            <nav className="navbar navbar-expand-lg navBar">
                <div className="container">
                    <Link href={'/'} className="navbar-brand" >
                        <img src="/images/logo.svg" alt="logo image" className='logoImg'/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 navList">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Backpacks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Ladies Handbags</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Luggage</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Travel Accessories</a>
                            </li>
                        </ul>
                        <div className="likeCartPro">
                            <Link href={'/about'}>
                            <div className="iconBox">
                            <FaRegHeart color='black' size={20}/>
                            </div>
                            </Link>
                            <div className="iconBox">
                            <AiOutlineShoppingCart color='black' size={22}/>
                            <span>
                             2
                            </span>
                            </div>
                            <div className="iconBox">
                            <FaRegUser color='black' size={20}/>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
            </header>
        </>
    )
}
