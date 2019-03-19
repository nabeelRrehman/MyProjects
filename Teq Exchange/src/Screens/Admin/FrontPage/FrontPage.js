import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import History from '../../../History/History';
import Button from '@material-ui/core/Button';
import Pagination from '../../../Component/Pager/Pager';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FrontPage.css';


import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);



class AdminFrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editBtn: false,
            images: [],
            products: [],
            featureProducts: [],
            pages: 3,
            pageProduct: [],
            number: 10,
            ourSeller: [],
            aboutWebsite: '',
            productCatogeries: '',
            more: false,
            name: '',
            email: '',
            subject: '',
            message: '',

        }
        this.pageNum = this.pageNum.bind(this);
        this._submit = this._submit.bind(this);
    }


    componentWillMount() {
        const { Slider, allProducts, ourSeller, aboutWebsite, productCatogeries } = this.props;
        const { number } = this.state;
        if (Slider) {
            this.setState({ images: Slider })
        }

        if (ourSeller) {
            this.setState({ ourSeller })
        }

        if (aboutWebsite) {
            this.setState({ aboutWebsite })
        }

        if (productCatogeries) {
            this.setState({ productCatogeries })
        }

        if (allProducts) {
            // setTimeout(() => {
            //     const pages = Math.ceil(allProducts.length / number)
            //     const pageArr = allProducts.slice(0, number)
            //     this.setState({ products: allProducts, pages, pageProduct: pageArr })
            // }, 1000)
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                allProducts.map(item => {
                        if (item.data.featured) {
                            featureproductsarr.push(item)
                        }
                        if (!item.data.featured) {
                            productsearr.push(item)
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
        const { Slider, allProducts, ourSeller, aboutWebsite, productCatogeries } = props;
        const { number } = this.state;
        console.log('Slider********', props.Slider)
        if (Slider) {
            this.setState({ images: Slider })
        }

        if (ourSeller) {
            this.setState({ ourSeller })
        }

        if (aboutWebsite) {
            this.setState({ aboutWebsite })
        }

        if (productCatogeries) {
            this.setState({ productCatogeries })
        }


        if (allProducts) {
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                allProducts.map(item => {
                        if (item.data.featured) {
                            featureproductsarr.push(item)
                        }
                        if (!item.data.featured) {
                            productsearr.push(item)
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

        History.push('/products')
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

    vendors() {
        History.push('/signup')
    }

    OurSellers(item) {
        return (
            <div className={'vendor'}>
                <div>
                    {/* 120 x 120px */}
                    <img alt={'Vendor Machinary Image'} src={item.image} />
                </div>
                <div>
                    {item.name}
                </div>
                <div>
                    {item.description}
                </div>
            </div>
        )
    }




    _submit() {
        const { name, email, subject, message } = this.state
        console.log('Data', { name, email, subject, message })
        const date = new Date().getTime()
        if (name && message && subject &&
            email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            const messageObj = { name, email, subject, message, date }
            this.setState({ submitBtn: false })
            this.props.actions.sendMessage(messageObj)
                .then(() => {
                    this.setState({
                        name: '',
                        email: '',
                        subject: '',
                        // date: new Date().getTime(),
                        message: '',
                        submitBtn: true
                    })
                    swal({
                        type: "success",
                        title: "Sent",
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
        else {
            if (!name) {
                swal({
                    type: 'error',
                    title: 'Please enter name',
                })
            }
            else if (name && !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                swal({
                    type: 'error',
                    title: 'Please enter correct email',
                })
            }
            else if (name && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && !subject) {
                swal({
                    type: 'error',
                    title: 'Please enter subject',
                })
            }
            else if (name && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && subject && !message) {
                swal({
                    type: 'error',
                    title: 'Please type some message',
                })
            }
        }

    }

    showLess(val) {
        return (
            <div>
                <div>
                    {val}
                </div>

                <div onClick={() => this.setState({ more: true })} className={'showMore'}>
                    Show more
                 </div>
            </div>
        )
    }

    showMore(val) {
        return (
            <div>
                <div>
                    {val}
                </div>

                <div onClick={() => this.setState({ more: false })} className={'showMore'}>
                    Show Less
                 </div>
            </div>
        )
    }

    render() {
        const { pages,featureProducts, pageProduct, editBtn, number, images, ourSeller, more, name, email, subject, message, submitBtn, aboutWebsite, productCatogeries, } = this.state
        return (
            <AdminDashboard>
                <div className={'AdminFrontPage'}>
                    <div
                        onMouseEnter={() => this.setState({ editBtn: true })}
                        onMouseLeave={() => this.setState({ editBtn: false })}
                        className={'Adminslider'}
                    >
                        <ImageGallery
                            items={images}
                            showThumbnails={false}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showBullets={true}
                            autoPlay={true}
                            sizes={{ width: '100px' }}
                        />
                        <div className={'EditBannerBtn'}>
                            {
                                editBtn ?
                                    <FontAwesomeIcon
                                        size='2x'
                                        icon={"edit"}
                                        onClick={() => History.push('/editBanner')}
                                    />
                                    :
                                    null
                            }
                        </div>
                    </div>

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
                                <div style={{ textAlign: "center" }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#f27b01"
                                        height="100"
                                        width="100"
                                    />
                                </div>
                        }
                    </div>

                    <div className={'featured'}>
                        <div style={{ cursor: 'pointer' }} onClick={() => this.vendors()} className={'feature-products'}>
                            <h2 class="background">
                                <span className={'product'}>JOIN OUR SELLERS</span>
                            </h2>
                        </div>
                        <div className='vendor-div'>
                            {
                                ourSeller &&
                                    ourSeller.length ?
                                    ourSeller.map((items) => {
                                        return this.OurSellers(items)
                                    })
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
                        </div>
                    </div>


                    <div className={'footer'}>
                        <div className={'companies'}>
                            <div>
                                About TeqXC
                                <FontAwesomeIcon
                                    size='1x'
                                    style={{ marginLeft: '12px', color: '#1e6ad8', cursor: 'pointer' }}
                                    icon={"edit"}
                                    onClick={() => History.push('/about')}
                                />
                            </div>
                            <div className={'web-link'}>
                                <a href={'/'}>{aboutWebsite ? aboutWebsite.siteName : null}</a>
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                <div>
                                    {aboutWebsite ? aboutWebsite.websiteWelcome : null}
                                </div>
                                {
                                    aboutWebsite ?


                                        <div>
                                            {
                                                more ?
                                                    this.showMore(aboutWebsite.description)
                                                    :
                                                    this.showLess(aboutWebsite.description.slice(0, 300))
                                            }
                                        </div>
                                        :
                                        null
                                }

                            </div>
                            <div>
                            </div>
                        </div>
                        <div className={'category'}>
                            <div>
                                Product Categories
                                <FontAwesomeIcon
                                    size='1x'
                                    style={{ marginLeft: '12px', color: '#1e6ad8', cursor: 'pointer' }}
                                    icon={"edit"}
                                    onClick={() => History.push('/about')}
                                />
                            </div>
                            {
                                productCatogeries && productCatogeries.length ?
                                    productCatogeries.map(item => {
                                        return <div>
                                            &raquo; {item.data.name ? item.data.name : null}
                                            {
                                                item.data.subcategory && item.data.subcategory.length ?
                                                    item.data.subcategory.map((subItem, subIndex) => {
                                                        return <div style={{ marginBottom: '0em', color: '#ca570b' }}>
                                                            &nbsp; &nbsp; &nbsp; &raquo; {subItem}
                                                        </div>
                                                    })
                                                    :
                                                    null
                                            }
                                        </div>
                                    })
                                    :
                                    null
                            }
                        </div>
                        <div className={'vendors'}>
                            <div>Sellers
                                <FontAwesomeIcon
                                    size='1x'
                                    style={{ marginLeft: '12px', color: '#1e6ad8', cursor: 'pointer' }}
                                    icon={"edit"}
                                    onClick={() => History.push('/OurSellers')}
                                />
                            </div>
                            {
                                ourSeller && ourSeller.length ?
                                    ourSeller.map(item => {
                                        return <div>
                                            &raquo; {item.name}
                                        </div>
                                    })
                                    :
                                    null
                            }
                            {/* <div>
                            &raquo; Hickory Pte Ltd
                        </div> */}
                        </div>
                        <div className={'contact'}>
                            <div>
                                Contact Us
                        </div>
                            <div>
                                <input type={'text'} placeholder={'Full Name'} value={name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                            </div>
                            <div>
                                <input type={'text'} placeholder={'Email Address'} value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                            </div>
                            <div>
                                <input type={'text'} placeholder={'Subject'} value={subject} onChange={(e) => { this.setState({ subject: e.target.value }) }} />
                            </div>
                            <div>
                                <textarea rows={'4'} placeholder={'Message'} value={message} onChange={(e) => { this.setState({ message: e.target.value }) }} />
                            </div>
                            <div>
                                {
                                    submitBtn ?
                                        <button style={{ cursor: 'pointer' }} onClick={this._submit}>Submit</button>
                                        :
                                        <button disabled>Submit</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </AdminDashboard>
        )
    }

}

// export default AdminFrontPage;

function mapStateToProps(states) {
    return ({
        Slider: states.authReducer.SLIDER,
        allProducts: states.productReducer.ALLPRODUCTS,
        ourSeller: states.authReducer.OURSELLERS,
        aboutWebsite: states.aboutWebsiteReducer.ABOUTWEBSITE,
        productCatogeries: states.aboutWebsiteReducer.PRODUCTCATOGERY,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // editProfile: (userProfile, userUID) => {
        //     dispatch(editProfile(userProfile, userUID));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminFrontPage);