import React, { Component } from 'react';
import { connect } from 'react-redux';
import './featured.css'
import Image from '../../Assets/images/productimg.png'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import History from '../../History/History'
import Pagination from '../Pager/Pager';
import Loader from 'react-loader-spinner'

class Featured extends Component {
    constructor() {
        super()

        this.state = {
            featureProducts: [],
            products: [],
            pages: 3,
            pageProduct: [],
            number: 10
        }

        this.pageNum = this.pageNum.bind(this);
    }


    componentWillMount() {
        const { allProducts } = this.props;
        const { number } = this.state;
        if (allProducts) {
            // setTimeout(() => {
            //     var arr = [];
            //     allProducts.map(item => {
            //         if (item.data.status === 'approved' && item.data.featured) {
            //             arr.push(item)
            //         }
            //     })

            //     const pages = Math.ceil(arr.length / number)
            //     const pageArr = arr.slice(0, number)
            //     this.setState({ products: arr, pages, pageProduct: pageArr })
            // }, 1000)
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                allProducts.map(item => {
                    if (item.data.status === 'approved') {
                        if (item.data.featured) {
                            featureproductsarr.push(item)
                        }
                        if (!item.data.featured) {
                            productsearr.push(item)
                        }
                    }
                })

                console.log('Run*********', productsearr, allProducts)
                const pages = Math.ceil(productsearr.length / number)
                const pageArr = productsearr.slice(0, number)
                this.setState({ featureProducts: featureproductsarr, products: productsearr, pages, pageProduct: pageArr })
            }, 1000)
        }
    }

    componentWillReceiveProps(props) {
        const { allProducts } = props;
        const { number } = this.state;
        if (allProducts) {
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                allProducts.map(item => {
                    if (item.data.status === 'approved') {
                        if (item.data.featured) {
                            featureproductsarr.push(item)
                        }
                        if (!item.data.featured) {
                            productsearr.push(item)
                        }
                    }
                })

                console.log('Run*********', productsearr, allProducts)
                const pages = Math.ceil(productsearr.length / number)
                const pageArr = productsearr.slice(0, number)
                this.setState({ featureProducts: featureproductsarr, products: productsearr, pages, pageProduct: pageArr })
            }, 1000)
        }
    }

    details(productId) {

        History.push('/details/' + productId)
    }

    products(product) {
        return (
            <div onClick={() => { console.log('product.key', product.key) }} className={'product-image back'}>
                <img src={product.data.images[0].image} />
                <div className={'title'}>
                    {product.data.name}
                </div>
                <div className={'product-Overlay'}>
                    <div className={'brand-overlay'}>
                        <div>
                            <div style={{ color: 'black', fontSize: '20px' }}>
                                Brand:
                           </div>
                            <div style={{ fontSize: 'medium' }}>
                                {product.data.brand}
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'black', fontSize: '20px' }}>
                                Code:
                           </div>
                            <div style={{ fontSize: 'medium' }}>
                                {product.data.code}
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button className={'view-details'} onClick={() => this.details(product.key)}>
                                    View Details
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    pageNum(num) {
        const { products, number } = this.state;
        // console.log('products', products)
        const pageArr = products.slice(num * number, num * number + number)
        this.setState({ pageProduct: pageArr })
        // console.log('pageArr*****', pageArr)
        // console.log('Page Number ***********', num)
        // console.log(num * number, num * number + number)
        // console.log("==========================")
    }

    render() {
        const { pages, featureProducts, pageProduct, number, noProducts } = this.state
        return (
            // featured Products

            <div className={'featured'}>
                <div className={'feature-products'}>
                    <h2 class="background">
                        <span className={'product'}>FEATURE  PRODUCTS</span>
                    </h2>
                </div>
                <div className='products'>
                    {
                        featureProducts.map(items => {
                            return (
                                items.data.status === "approved" ?
                                    this.products(items)
                                    :
                                    null
                            )
                        })
                    }
                </div>

                {
                    featureProducts.length ?
                        null
                        // <Pagination pages={pages} pageNum={this.pageNum} />
                        :
                        <div style={{ textAlign: "center" }}>
                            <Loader
                                type="ThreeDots"
                                color="#f27b01"
                                height="100"
                                width="100"
                            />
                        </div>
                }
                {/* New Coding */}

                <div className={'feature-products'}>
                    <h2 class="background">
                        <span className={'product'}>MORE PRODUCTS</span>
                    </h2>
                </div>
                <div className='products'>
                    {
                        pageProduct.map(items => {
                            return (
                                items.data.status === "approved" ?
                                    this.products(items)
                                    :
                                    null
                            )
                        })
                    }
                </div>

                {/* New Coding */}


                {
                    pageProduct.length > 10 ?
                        <Pagination pages={pages} pageNum={this.pageNum} />
                        :
                        null
                }
                {
                    pageProduct.length ?
                        null
                        // <Pagination pages={pages} pageNum={this.pageNum} />
                        :
                        // noProducts ?
                        <div style={{ textAlign: "center", fontSize: '20px', color: 'grey' }}>
                            No Products
                            </div>
                    // :
                    // <div style={{ textAlign: "center" }}>
                    //     <Loader
                    //         type="ThreeDots"
                    //         color="#f27b01"
                    //         height="100"
                    //         width="100"
                    //     />
                    // </div>
                }
            </div>
        );
    }
}

function mapStateToProps(states) {
    // console.log('states.productReducer.ALLPRODUCTS', states.productReducer.ALLPRODUCTS)
    return ({
        allProducts: states.productReducer.ALLPRODUCTS,
    })
}


export default connect(mapStateToProps, null)(Featured);