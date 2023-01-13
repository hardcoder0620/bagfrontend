import React from 'react'
import { FaRegHeart, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector,useDispatch } from 'react-redux';

export default function Header() {
    const cartArr = useSelector((state)=>state.cartReducer)
    const router = useRouter()

    function goToLogin(){
        const token = localStorage.getItem('token')
        if(token){
            router.push('/profile')
        }else{
            router.push('/login')
        }

    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navBar">
                    <div className="container">
                        <Link href={'/'} className="navbar-brand" >
                            <img src="/images/logo.svg" alt="logo image" className='logoImg' />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navList">
                               
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        men
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" href="/products?subCat=topWear">top wear</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=tshirts">t-shirts</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=sweatShirts">sweat shirts</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=formalShirts">formal shirts</Link></li>
                                        <li><Link className="dropdown-item" href="/products?subCat=bottomWear">bottom wear</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensJeans">jeans</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensTrousers">trousers</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensShorts">shorts</Link></li>
                                        <li><Link className="dropdown-item" href="/products?subCat=footWear">foot wear</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensCasualShoues">casual shoes</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensSportShoues">sport shoes</Link></li>
                                        <li><Link className="dropdown-item sub" href="/products?childCat=mensFormalShoues">formal shoes</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        women
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/products?subCat=indianWear">indian Wear</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=kurtas">kurtas</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=sarees">sarees</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=lehenga">lehenga</Link></li>
                                    <li><Link className="dropdown-item" href="/products?subCat=beauty">beauty</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=makeup">makeup</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=skinCare">skin Care</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=lipstiks">lipstiks</Link></li>
                                    <li><Link className="dropdown-item" href="/products?subCat=womenFootWear">women FootWear</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=womenHeels"> Heels</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=womenSports"> Sports</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=womenFlats"> Flats</Link></li>
                                        
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        kids
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/products?subCat=boysClothing">boys Clothing</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=boysTshirts">Tshirts</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=boysShirts">Shirts</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=boysShorts">Shorts</Link></li>
                                    <li><Link className="dropdown-item" href="/products?subCat=girlsClothing">girls Clothing</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=girlsDresses">Dresses</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=girlsTops">Tops</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=girlsTshirts">Tshirts</Link></li>
                                    <li><Link className="dropdown-item" href="/products?subCat=accessories">accessories</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=bags"> bags</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=watches"> watches</Link></li>
                                    <li><Link className="dropdown-item sub" href="/products?childCat=hats"> hats</Link></li>
                                    </ul>
                                </li>
                               
                           
                            </ul>
                            <div className="likeCartPro">
                                <Link href={'/about'}>
                                    <div className="iconBox">
                                        <FaRegHeart color='black' size={20} />
                                    </div>
                                </Link>
                                <Link href={'/cart'} className="iconBox">
                                    <AiOutlineShoppingCart color='black' size={22} />
                                    <span>
                                        {cartArr.length}
                                    </span>
                                </Link>
                                <div className="iconBox">
                                    <div onClick={()=>{goToLogin()}} style={{cursor:'pointer'}}>
                                    <FaRegUser color='black' size={20} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
