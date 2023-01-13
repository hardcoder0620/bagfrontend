import React, { useState, useEffect, useRef } from 'react'
import { motion, spring } from 'framer-motion';
import Header from '../components/Header';
import { BiHeart } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCart } from '../store/slices/cartSlice';
import { Router, useRouter } from 'next/router';


export default function cart() {
    const [subTotalState, setSubTotalState] = useState(0)

    const cartArr = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch()
    const router = useRouter()


    useEffect(() => {
        makeSubTotalFn()
    }, [cartArr])

    function makeSubTotalFn() {

        const sum = cartArr.reduce(function (accumulator, currentValue) {
            const proPrice = Number(currentValue.proPrice) * Number(currentValue.proQty)
            return accumulator + proPrice;
        }, 0);
        setSubTotalState(sum)
    }
    function updateByQty(qty, proId) {
        console.log('qty', qty, " ", proId)
        const newCartArr = cartArr.map((itemObj) => {
            if (itemObj.proId == proId) {
                let newArr = { ...itemObj, proQty: qty }
                console.log('newArr', newArr);
                return newArr
            } else {
                return itemObj
            }
        })
        dispatch(updateCart(newCartArr))
        toast.success('Item quantity updated ', {
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
    function removeFromCartFn(id) {
        const newCartArr = cartArr.filter((itemObj) => {
            return itemObj.proId != id
        })
        dispatch(updateCart(newCartArr))
        toast.success('Item removed !!', {
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

    function payFn() {
        const token = localStorage.getItem('token')
        if (token) {
            toast.success('ready to pay', {
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
            toast.success('Please login', {
                position: "top-center",
                autoClose: 2400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setTimeout(() => {
                router.push('/login')
            }, 2000);

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
                <Header />
                <div className="cartSectionMain">
                    <div className="container">
                        <div className="heading">Shopping Cart</div>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="leftSec">
                                    {cartArr.length > 0 ?
                                        cartArr.map((item, index) => {
                                            return (
                                                <div key={index} className="itemBox">
                                                    <img src={item.proImg} alt="" className="proImg" />
                                                    <div className="pcontent">
                                                        <div className="name">
                                                            {item.proName}
                                                        </div>
                                                        {item.proColor ?
                                                            <div className="color">
                                                                Colour: {item.proColor}
                                                            </div>
                                                            : null}
                                                        {item.proSize ?
                                                            <div className="size">
                                                                Size:{item.proSize}
                                                            </div>
                                                            : null}

                                                        <div className="qtySelect d-flex">
                                                            <div className="head">Qty:</div>
                                                            <select value={item.proQty} onChange={(e) => {
                                                                updateByQty(e.target.value, item.proId)
                                                            }} name="" id="">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                        <div className="price">
                                                            Rs. {item.proPrice}
                                                        </div>
                                                        <div className="remove" onClick={() => {
                                                            removeFromCartFn(item.proId)
                                                        }}>
                                                            Remove X
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="noItems">No items in Cart</div>
                                    }

                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="rightSec">
                                    <div className="orderWrapper">
                                        <div className="orderBox">
                                            <div className="head">Order summary :</div>
                                            <div className="divider"></div>
                                            <div className="itemRow">
                                                <div className="textl">
                                                    Items in Cart
                                                </div>
                                                <div className="textr">
                                                    {cartArr.length}
                                                </div>
                                            </div>
                                            <div className="itemRow">
                                                <div className="textl">
                                                    Shipping Charges
                                                </div>
                                                <div className="textr">
                                                    Rs. 0.00
                                                </div>
                                            </div>
                                            <div className="itemRow">
                                                <div className="textl">
                                                    Cart Total
                                                </div>
                                                <div className="textr">
                                                    Rs. {subTotalState}
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="boldRow">
                                                <div className="Textl">Total Payable Amount</div>
                                                <div className="Textr"> Rs. {subTotalState}</div>
                                            </div>
                                            <button className="PayNow" onClick={() => {
                                                payFn()
                                            }}>
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    )
}
