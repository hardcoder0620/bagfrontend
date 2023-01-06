import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { FaCheck, FaList } from "react-icons/fa";
import { FiGrid, FiHeart } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";

import { motion, spring } from 'framer-motion';
import Head from 'next/head';

export default function products() {

    const router = useRouter()
    const [curPrice, setCurPrice] = useState(0)
    const [curCat, setCurCat] = useState('')
    const [curSubCat, setCurSubCat] = useState('')
    const [curView, setCurView] = useState('grid')
    const [productsState, setProductstState] = useState([])
    const [anime, setAnime] = useState(true)
    const [filteredChildCat,setFilteredChildCat]=useState([])


    const variants = {
        rotate: { x: [-100, 0], opacity: [0, 1], transition: { type: "spring" } },
        stop: { x: [-100, 0], opacity: [0, 1], transition: { type: "spring" } }

    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getAllProducts(signal)

        return () => {
            controller.abort();
        }
    }, [router.query])

    const getAllProducts = async (signal) => {
        try {
            if (router.query.cat) {
                const res = await fetch(`https://bagfrontend.vercel.app/api/products?cat=${router.query.cat}`, {
                    signal: signal
                })
                const data = await res.json()
                console.log('data>>>>cat', data)
                setProductstState(data.data)
            } else if (router.query.subCat) {
                const res = await fetch(`https://bagfrontend.vercel.app/api/products?subCat=${router.query.subCat}`, {
                    signal: signal
                })
                const data = await res.json()
                console.log('data>>>>subCat', data)
                setProductstState(data.data)

            } else if (router.query.childCat) {
                const res = await fetch(`https://bagfrontend.vercel.app/api/products?childCat=${router.query.childCat}`, {
                    signal: signal
                })
                const data = await res.json()
                console.log('data>>>>childCat', data)
                setProductstState(data.data)
            }
            else {
                const res = await fetch('https://bagfrontend.vercel.app/api/products', {
                    signal: signal
                })
                const data = await res.json()
                console.log('data>>>>', data)
                setProductstState(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filterByCat = async (cat) => {
        setAnime((state) => { !state })
        console.log(cat, "category")

        const res = await fetch('https://bagfrontend.vercel.app/api/products')
        const data = await res.json()
        console.log('data>>>>', data)

        const filteredProducts = data.data.filter((product) => {
            return product.productCat == cat
        })
        console.log(filteredProducts, 'filteredProducts')

        setProductstState(filteredProducts)


    }
    const filterBySubCat = async (subCat) => {

        console.log(subCat, "subcategory")
        const res = await fetch(`https://bagfrontend.vercel.app/api/products?subCat=${subCat}`)
        const data = await res.json()
        console.log('data>>>>subCat', data)
        setProductstState(data.data)
        setAnime((state) => { !state })

        // setting child category
        const childCatArr =  data.data.map((pro)=>{
            return pro.productChildCat
        })
        const filteredChildCat =  [...new Set(childCatArr)];
        console.log(filteredChildCat)
        setFilteredChildCat(filteredChildCat)


    }

    const clearFilter = async () => {
        const res = await fetch('https://bagfrontend.vercel.app/api/products')
        const data = await res.json()
        setProductstState(data.data)
        setCurSubCat('')
        setAnime((state) => { !state })
    }

    const sortByPrice = async (val) => {
        console.log(val)
        setCurSubCat('')
        const res = await fetch(`https://bagfrontend.vercel.app/api/products?sort=${val}`)
        const data = await res.json()
        console.log('sort data>>>>', data)
        setProductstState(data.data)
        setAnime((state) => { state })

    }

    const filterByChildCat = async (val) => {
        console.log(val)
        const res = await fetch(`https://bagfrontend.vercel.app/api/products?childCat=${val}`)
        const data = await res.json()
        console.log('company data>>>>', data)
        setProductstState(data.data)
        setAnime((state) => { !state })
    }

    const filterByPrice = async (val) => {
        console.log(val)
        setCurSubCat('')
        const res = await fetch(`https://bagfrontend.vercel.app/api/products`)
        const data = await res.json()
        const filterdData = data.data.filter((pro)=>{
            const proPrice = Number(pro.productPrice)
            const num = Number(val)
            return (proPrice < num)
        })
        console.log(filterdData,'filterdData')
        setProductstState(filterdData)
        // setAnime((state) => { !state })

    }



    return (
        <div style={{ overflow: 'hidden' }}>
            <Head>
                <title>Products page</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, translateX: '-100%' }}
                animate={{ opacity: 1, translateX: '0%' }}
                exit={{ opacity: 0, translateX: '-100%' }}
                transition={{ type: 'spring', stiffness: 60 }}
            >
                <Header />
                <div className="allProductsMain">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="leftSec">
                                    <div className="catDiv ">
                                        <div className="head" >
                                            Categories 
                                        </div>
                                        <div className="options">
                                            <div className="option" onClick={() => {

                                                setCurSubCat('topWear')
                                                filterBySubCat('topWear')
                                            }}>
                                                <div className="text " >
                                                    Top Wear
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'topWear' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {

                                                setCurSubCat('bottomWear')
                                                filterBySubCat('bottomWear')
                                            }}>
                                                <div className="text " >
                                                    Bottom Wear
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'bottomWear' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('footWear')
                                                filterBySubCat('footWear')
                                            }}>
                                                <div className="text " >
                                                    Foot Wear
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'footWear' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('indianWear')
                                                filterBySubCat('indianWear')
                                            }}>
                                                <div className="text " >
                                                    Indian Wear
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'indianWear' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('beauty')
                                                filterBySubCat('beauty')
                                            }}>
                                                <div className="text " >
                                                    Beauty
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'beauty' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('womenFootWear')
                                                filterBySubCat('womenFootWear')
                                            }}>
                                                <div className="text " >
                                                    Women FootWear
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'womenFootWear' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('boysClothing')
                                                filterBySubCat('boysClothing')
                                            }}>
                                                <div className="text " >
                                                    Boys Clothing
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'boysClothing' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('girlsClothing')
                                                filterBySubCat('girlsClothing')
                                            }}>
                                                <div className="text " >
                                                    Girls Clothing
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'girlsClothing' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                            <div className="option" onClick={() => {
                                                setCurSubCat('accessories')
                                                filterBySubCat('accessories')
                                            }}>
                                                <div className="text " >
                                                    Accessories
                                                </div>
                                                <div className="icoBox">
                                                    {curSubCat == 'accessories' ? <FaCheck /> : null}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {filteredChildCat.length > 0 ?
                                    
                                    <div className="companyDiv">
                                        <div className="head">Sub categories</div>
                                        <select name="" id="" onChange={(e) => {
                                            filterByChildCat(e.target.value)
                                        }}>
                                            <option value="">Select Category</option>
                                            {filteredChildCat.map((item,index)=>{
                                                return(
                                                    <option key={index} value={item}>{item.replace(/([A-Z])/g, " $1").toLowerCase()}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    :null}
                                    <div className="priceDiv">
                                        <div className="head">
                                            Price
                                        </div>
                                        <div className="value">
                                            Rs {curPrice}
                                        </div>
                                        <input type="range"  min="100" max="1000" id="volume" name="volume" onChange={(e) => {
                                            setCurPrice(e.target.value)
                                            filterByPrice(e.target.value)
                                        }} />
                                        
                                    </div>
                                    <div className="clearDiv">
                                        <button className="clrBtn" onClick={() => { clearFilter() }}>
                                            Clear Filter
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="rightSec">
                                    <div className="vievDiv">
                                        <div className="viewOpts">
                                            <div className={curView == 'list' ? "box active" : "box"} onClick={() => {
                                                setCurView('list')
                                                setAnime((state) => !state)
                                            }}>
                                                <FaList />
                                            </div>
                                            <div className={curView == 'grid' ? "box active" : "box"} onClick={() => {
                                                setCurView('grid')
                                                setAnime((state) => !state)
                                            }}>
                                                <FiGrid />
                                            </div>
                                        </div>
                                        <select name="sortByPrice" id="" onChange={(e) => { sortByPrice(e.target.value) }}>
                                            <option value="">Select Sort By</option>
                                            <option value="lowToHigh">price low to hight</option>
                                            <option value="highToLow">price high to low</option>
                                        </select>
                                    </div>
                                    <div className="productsDiv"

                                    >
                                        <div className="row gy-4">
                                            {productsState.map((product, index) => {
                                                {
                                                    if (curView == "grid") {
                                                        return (
                                                            <div className="col-lg-3" key={index}

                                                            >
                                                                <motion.div className="product"
                                                                    variants={variants}
                                                                    animate={anime ? 'rotate' : 'stop'}
                                                                >
                                                                    <div className="imgBox">
                                                                        <img src={`https://bagfrontend.vercel.app${product.productImgs[0]}`} alt="bag image" className="w-100 productImg" />
                                                                        <div className="likeDivb">
                                                                            <FiHeart />
                                                                            {/* <BsFillHeartFill/> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="proName">
                                                                        {product.productName}
                                                                    </div>
                                                                    <div className="price">
                                                                        Rs. {product.productPrice}
                                                                    </div>
                                                                </motion.div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="col-12" key={index}>
                                                                <motion.div className="productListView"
                                                                    variants={variants}
                                                                    animate={anime ? 'rotate' : 'stop'}

                                                                >

                                                                    <div className="imgBox">
                                                                        <img src={`https://bagfrontend.vercel.app${product.productImgs[0]}`} alt="bag image" className="productImg" />
                                                                        <div className="likeDivb">
                                                                            <FiHeart />
                                                                            {/* <BsFillHeartFill/> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="content">

                                                                        <div className="proName">
                                                                            {product.productName}
                                                                        </div>
                                                                        <div className="price">
                                                                            Rs. {product.productPrice}
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            })}

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
