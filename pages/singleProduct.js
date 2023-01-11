import React, { useState, useEffect, useRef } from 'react'
import { motion, spring } from 'framer-motion';
import Header from '../components/Header';
import { BiHeart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Magnifier from "react-magnifier";


export default function singleProduct({ data }) {
    const [singPro, setSingPro] = useState('')
    const [varients, setVarients] = useState([])
    const [curSize, setCurSize] = useState('')
    const [curCols, setCurCols] = useState([])
    const [curColor, setCurColor] = useState('')
    const [curQty, setCurQty] = useState('1')
    const [curPrice, setCurPrice] = useState('')

    const dispatch = useDispatch()
    const cartArr = useSelector((state) => state.cartReducer)

    const imgBoxRef = useRef();
    useEffect(() => {
        setSingPro(data)
        console.log(data, 'data.varients')
        setVarients(data.varients)
        if (data.varients.length > 0) {
            setCurSize(data.varients[0].size)
            setCurCols(data.varients[0].colors)
            setCurColor(data.varients[0].colors[0].color)
            setCurPrice(data.varients[0].colors[0].price)
        }
    }, [])

    function setColorsFun(varient) {
        setCurCols(varient.colors)
        setCurColor(varient.colors[0].color)
        setCurPrice(varient.colors[0].price)
    }

    function setCurPriceFn(color) {
        const [colorObj] = curCols.filter((elem) => {
            return elem.color == color
        })

        setCurPrice(colorObj.price)
    }

    function addToCartFn() {
        const proObj = {
            proId: singPro._id,
            proName: singPro.productName,
            proQty: curQty,
            proPrice: singPro.productPrice,
            proImg: singPro.productImgs[0]
        }
        if (data.varients.length > 0) {
            proObj.proPrice = curPrice
            proObj.proColor = curColor
            proObj.proSize = curSize
        }
        console.log('proObj', proObj)
        const filteredArr = cartArr.filter((itemObj) => {
            return itemObj.proId == proObj.proId
        })
        if (filteredArr.length == 0) {
            dispatch(addToCart(proObj))
            toast.success('Item added in cart', {
                position: "top-center",
                autoClose: 2400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } else {
            toast.error('Item already in cart', {
                position: "top-center",
                autoClose: 2400,
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
        <div style={{ overflow: 'hiden' }}>
            <motion.div
                initial={{ opacity: 0, translateX: '-100%' }}
                animate={{ opacity: 1, translateX: '0%' }}
                exit={{ opacity: 0, translateX: '-100%' }}
                transition={{ type: 'spring', stiffness: 60 }}
            >
                <Header />
                
                <div className='singleProMain'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6" >
                                <div className="porImgsSec" ref={imgBoxRef}>
                                    {singPro ?
                                        <div className="mainImg" >
                                            {/* <Magnifier src={singPro.productImgs[0]} mgWidth={250} mgHeight={250} /> */}
                                        </div>
                                        : null}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {singPro ?

                                    <div className="proDescMain">
                                        <div className="name">{singPro.productName}</div>
                                        <div className="desc">{singPro.productDesc}</div>
                                        {varients.length > 0 ?

                                            <div className="price">Rs.{curPrice}</div>
                                            :
                                            <div className="price">Rs.{singPro.productPrice}</div>
                                        }
                                        {varients.length > 0 ?

                                            <div className="sizes">
                                                <div className="had">
                                                    Size:
                                                </div>
                                                {varients ?
                                                    varients.map((varient, index) => {
                                                        return (
                                                            <span key={index} onClick={() => {
                                                                setCurSize(varient.size)
                                                                setColorsFun(varient)
                                                            }} className={`size ${curSize == varient.size && 'active'}`}>
                                                                {varient.size}
                                                            </span>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </div>
                                            : null}

                                        {varients.length > 0 ?

                                            <div className="colors">
                                                <div className="had">
                                                    Colour:
                                                </div>
                                                {curCols ?
                                                    curCols.map((color, index) => {
                                                        return (
                                                            <span onClick={() => {
                                                                setCurColor(color.color)
                                                                setCurPriceFn(color.color)
                                                            }} className={`color ${curColor == color.color && 'active'}`} key={index} style={{ background: color.color }}></span>
                                                        )
                                                    })
                                                    : null}
                                            </div>

                                            : null}
                                        <div className="qtySelector">
                                            <div className="head">Qauntity</div>
                                            <select name="" value={curQty} onChange={(e) => {
                                                setCurQty(e.target.value)
                                            }} id="">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="cartWish">
                                            <button className="cart" onClick={() => { addToCartFn() }}>Add to Cart</button>
                                            <button className="wish"> <BiHeart size={20} style={{ marginRight: '5px' }} /> Add to Widhlist</button>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                
            </motion.div>
            <ToastContainer/>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const res = await fetch(`https://bagfrontend.vercel.app/api/getProduct?productId=${ctx.query.productId}`)
    const data = await res.json()
    return {
        props: {
            data: data.data[0]
        }
    }
}
