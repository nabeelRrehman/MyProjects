import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Containers from '../../Container/container/container';
import History from '../../History/History'
// import { Badge } from 'reactstrap'
import Image from '../../Assets/images/product.png'
import './cart.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox } from '@material-ui/core'
import { updateEmail } from '../../store/action/orderAction'
import { ClipLoader } from 'react-spinners';
import { ProductCart } from '../../store/action/cartAction'
// import { ProductCart, RemoveQuantity, DeleteCart } from '../../store/action/cartAction'
import Loader from 'react-loader-spinner'
import { prototype } from 'react-image-crop';


library.add(faTrashAlt, faHeart, faMapMarkerAlt)

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            quantity: [],
            cart: [],
            selectedCarts: [],
            allChecked: false,
            selectAll: false,
            oneCheck: false,
            cartQuantity: [],
            indexNum: null,
            count: 0,
            emptyCart: null,
            selectedCartsIndex: [],
            myCart: null,


        }
    }

    getSubtotal() {
        const { selectedCarts } = this.state
        var total = 0
        console.log(selectedCarts, 'selectedcarts')
        selectedCarts.map(data => {
            if (data.product.discount) {
                const sum = (data.product.price - data.product.discount) * data.quantity
                total += sum
            } else {
                const sum = data.product.price * data.quantity
                total += sum
            }
        })
        this.setState({ subtotal: total })
    }

    singleSelect(e, id, items, itemIndex, oneCheck) {
        const { cart, selectedCarts, selectAll, myCart, carts, selectedCartsIndex } = this.state;
        // console.log(selectedCarts, items, 'selectedcarts here')

        console.log(id, 'issssdddddd')

        selectedCarts.map((data, index) => {
            if (data.productKey === items.productKey) {
                selectedCarts.splice(index, 1)
                selectedCartsIndex.splice(index, 1)
                if (carts.length !== selectedCarts.length) {
                    this.setState({ selectAll: false })
                }
                else {
                    this.setState({ selectAll: true })
                }

                this.setState({ selectedCarts, selectedCartsIndex })
            }
        })


        if (id && !selectAll) {
            if (selectedCarts.indexOf(items) === -1) {
                selectedCarts.push(items)
                selectedCartsIndex.push(itemIndex)
                // console.log('Selected Carts id && !selectAll', selectedCarts)
                this.setState({ selectedCarts, selectedCartsIndex })
            }
            this.getSubtotal()
        }
        if (!id && !selectAll) {
            if (selectedCarts.indexOf(items) !== -1) {
                selectedCarts.splice(selectedCarts.indexOf(items), 1)
                selectedCartsIndex.splice(itemIndex, 1)
                this.setState({ selectedCarts, oneCheck: false, selectedCartsIndex })
            }
            this.getSubtotal()
        }

        if (!selectAll) {
            if (selectedCarts.length === carts.length) {
                this.setState({ selectAll: true })
            }
        }
        else if (selectAll) {
            this.getSubtotal()
        }
    }


    // Wasi Code

    componentWillMount() {
        const { myCart, products } = this.props;
        var carts = []
        // console.log('products', products)
        if (myCart && myCart.length) {
            this.setState({ myCart })
            myCart.map((cartItem, index) => {
                products.map(proItem => {
                    if (cartItem.productKey === proItem.key) {
                        carts.push({ ...cartItem, product: proItem.data, index })
                        this.setState({ carts })

                    }
                })
            })
        }

        if (this.props.currentUser) {
            this.setState({ currentUser: this.props.currentUser })
        }

        if (this.props.emptyCart) {
            this.setState({ emptyCart: true, selectedCarts: [], selectAll: false })
        } else {
            this.setState({ emptyCart: false })

        }
    }

    componentWillReceiveProps(props) {
        const { myCart, products } = props;
        var carts = []

        // console.log('productsProps', products)
        if (myCart) {
            console.log(myCart, 'mycart hererrrrr')
            console.log(products, 'products hererrrrr')
            this.setState({ myCart })

            myCart.map((cartItem, index) => {
                products.map(proItem => {
                    if (cartItem.productKey === proItem.key) {
                        carts.push({ ...cartItem, product: proItem.data, index })
                        this.setState({ carts }, () => {
                            console.log(this.state.carts, 'this.state.carts')
                        })
                    }
                })
            })
        }

        if (props.currentUser) {
            this.setState({ currentUser: props.currentUser })
        }

        if (props.emptyCart) {
            this.setState({ emptyCart: true, selectedCarts: [], selectAll: false })
        } else {
            this.setState({ emptyCart: false })

        }

    }

    addAQuantity(items, index) {
        const { myCart, selectedCarts } = this.state;
        const { userUID, products } = this.props;
        var carts = [];

        this.setState({ btnDisabled: true, loader: true, indexNum: index })

        // console.log('items', index, items)
        myCart[index].quantity = items.quantity + 1;
        // console.log('Quantity', myCart[index].quantity)
        this.props.actions.ProductCart(myCart, userUID)
            .then(() => {

                this.setState({ btnDisabled: false, loader: false, myCart })

                myCart.map((cartItem, index) => {
                    products.map(proItem => {
                        if (cartItem.productKey === proItem.key) {
                            carts.push({ ...cartItem, product: proItem.data, index })
                            this.setState({ carts })
                        }
                    })
                })

                const { selectedCarts, subtotal } = this.state
                // var discount = items.product.discount ? (items.product.price - items.product.discount) : items.product.price

                let discount = 0

                // if (selectedCarts.length > 0) {
                // }
                selectedCarts.map(selectItems => {
                    if (selectItems.productKey === items.productKey) {
                        console.log(selectItems, 'lak selebashyvy')
                        selectItems.quantity = selectItems.quantity + 1
                        if (items.product.discount) {
                            discount = items.product.price - items.product.discount
                            var total = subtotal + discount
                        } else {
                            discount = Number(items.product.price)
                            var total = subtotal + discount
                        }
                        this.setState({ subtotal: total })
                    }
                    this.setState({ selectedCarts })
                })


            })

        console.log(selectedCarts, 'selected carts here')

    }

    removeAQuantity(items, index) {
        const { myCart } = this.state;
        const { userUID, products } = this.props;
        var carts = [];
        this.setState({ btnDisabled: true, loader: true, indexNum: index })
        if (items.quantity > 1) {
            // console.log('indexRemove', index, items.quantity)
            myCart[index].quantity = items.quantity - 1;
            // console.log('Quantity', myCart[index].quantity)
            this.props.actions.ProductCart(myCart, userUID)
                .then(() => {

                    this.setState({ btnDisabled: false, loader: false, myCart })

                    myCart.map((cartItem, index) => {
                        products.map(proItem => {
                            if (cartItem.productKey === proItem.key) {
                                carts.push({ ...cartItem, product: proItem.data, index })
                                this.setState({ carts })
                            }
                        })
                    })

                    console.log(items.quantity, 'itmes .quantity here')

                    const { selectedCarts, subtotal } = this.state

                    let discount = 0

                    // if (selectedCarts.length > 0) {
                    // }

                    selectedCarts.map(selectItems => {
                        if (selectItems.productKey === items.productKey) {
                            console.log(selectItems, 'lak selebashyvy')
                            selectItems.quantity = selectItems.quantity - 1
                            if (items.product.discount) {
                                discount = items.product.price - items.product.discount
                                var total = subtotal - discount
                            } else {
                                discount = Number(items.product.price)
                                var total = subtotal - discount
                            }
                            this.setState({ subtotal: total })
                        }
                        this.setState({ selectedCarts })
                    })

                })
        }
        else {
            // console.log('indexRemove', index, items.quantity)
        }
    }

    deleteProduct(items, index) {
        const { myCart } = this.state;
        const { userUID, products } = this.props;
        var carts = []

        myCart.splice(index, 1);
        this.props.actions.ProductCart(myCart, userUID)
            .then(() => {
                this.setState({ myCart })

                if (myCart.length === 0) {
                    this.setState({ carts })
                    this.props.myCart.splice(0)
                    this.setState({ subtotal: null, selectedCarts: [] })

                }
                if (myCart.length > 0) {
                    const { selectedCarts, selectedCartsIndex } = this.state
                    if (selectedCarts.length) {
                        selectedCarts.map((selectedItems, index) => {
                            console.log(selectedItems, 'selectedItems')
                            console.log(items, 'myCart Itemsjdkb')
                            if (selectedItems.productKey === items.productKey) {
                                selectedCarts.splice(index, 1)
                                selectedCartsIndex.splice(index, 1)
                                this.setState({ selectedCarts, selectedCartsIndex })
                                this.getSubtotal()
                            }
                        })
                    }
                }
            })

    }

    onSelectAllClick() {
        const { selectAll, myCart, carts, selectedCartsIndex } = this.state;
        console.log('selectAll', selectAll, myCart)
        // const select = myCart.slice(0)
        if (carts) {
            const select = carts.slice(0)
            if (selectAll) {
                console.log(selectAll, 'selectallllllll')
                selectedCartsIndex.splice(0)
                this.setState({
                    selectAll: false, selectedCarts: [], subtotal: null, selectedCartsIndex
                })
            } else {
                selectedCartsIndex.splice(0)
                for (var i = 0; i < carts.length; i++) {
                    selectedCartsIndex.push(i)
                }
                this.setState({
                    selectAll: true, selectedCarts: select, selectedCartsIndex
                }, () => {
                    this.getSubtotal()
                })
            }
        }


    }


    checkOut() {
        const { selectedCarts, subtotal } = this.state

        const obj = {
            checkout: selectedCarts,
            subtotal: subtotal
        }

        History.push({
            pathname: '/checkout',
            state: obj
        })

    }

    details(items) {
        History.push('/details/' + items.productKey)
    }


    productCart(items, index, selectedCarts) {
        const { quantity, selectAll, oneCheck, loader, indexNum, btnDisabled, selectedCartsIndex } = this.state
        const cartData = items.product
        console.log(selectedCarts, 'index herer')
        console.log(items, 'itemsss')
        return (
            <div className={'detail-body cart_load'}>
                <div>
                    <Checkbox
                        // checked={selectAll || selectedCarts.indexOf(items) !== -1}
                        checked={selectAll || selectedCartsIndex.indexOf(index) !== -1}
                        // checked={selectAll || this.selectOpt(selectedCarts, items.productKey)}
                        id={items}
                        className={'checkbox-Color'}
                        onChange={(e, id) => this.singleSelect(e, id, items, index, oneCheck)}
                    />
                </div>
                <div>
                    <img src={cartData.images[0].image} width={'130px'} />
                </div>
                <div className={'pro-name'}>
                    <div className={'getDetails'} onClick={() => this.details(items)}>
                        {cartData.name}
                    </div>
                    <div>
                        {cartData.brand}
                    </div>
                    <div>
                        {/* <span><FontAwesomeIcon icon={'heart'} /></span> */}
                        <span onClick={() => this.deleteProduct(items, index)}><FontAwesomeIcon icon={'trash-alt'} /></span>
                    </div>
                </div>
                <div className={'product-pricing'}>
                    <div>
                        {
                            cartData.discount &&
                            `$ ${cartData.price - cartData.discount}`
                        }
                        {
                            cartData.price && !cartData.discount &&
                            `$ ${cartData.price}`
                        }
                    </div>
                    <div>
                        {
                            cartData.discount &&
                            `$ ${cartData.price}`
                        }
                    </div>
                    <div>
                        {
                            cartData.discount &&
                            `- ${Math.floor((cartData.discount / cartData.price) * 100)}%`
                        }
                    </div>
                </div>
                <div className={'cart-quantity'}>
                    {
                        items.quantity > 1 ?
                            <button disabled={btnDisabled} className={'btnStyle'} onClick={() => this.removeAQuantity(items, index)}>-</button>
                            :
                            <button disabled className={'btnStyleDisabled'}>-</button>
                    }
                    <span style={{ color: 'grey' }}>
                        {
                            items.quantity
                        }
                    </span>
                    {
                        items.quantity < 5 ?
                            <button disabled={btnDisabled} className={'btnStyle'} onClick={() => this.addAQuantity(items, index)}>+</button>
                            :
                            <button disabled className={'btnStyleDisabled'}>+</button>
                    }
                </div>
                {
                    loader && index === indexNum &&
                    <div className={'loader cart_loader'}>
                        <Loader
                            type="ThreeDots"
                            color="#f27b01"
                            height="50"
                            width="50"
                        />
                    </div>
                }
            </div>
        )
    }


    async editAddress() {
        const { value: address } = await Swal({
            title: 'Input Address',
            input: 'text',
            confirmButtonColor: 'rgb(241, 123, 1)',
            inputPlaceholder: 'Enter your Address'
        })

        if (address) {
            const { updateEmail } = this.props.actions
            const { userUID } = this.props
            updateEmail('address', address, userUID)
        }
    }


    render() {
        const { cart, selectedCarts, selectAll, arr2, subtotal, emptyCart, currentUser, carts } = this.state;
        return (
            <Containers>
                <div className={'vendor-products'}>
                    <div>
                        CART
                    </div>
                    <hr />
                    <div className={'products-cart'}>
                        <div className={'cart-details'}>
                            <div className={'details-header'}>
                                <div>
                                    <Checkbox
                                        checked={selectAll}
                                        className={'checkbox-Color'}
                                        onChange={() => this.onSelectAllClick()}
                                    />
                                </div>
                                <div>
                                    {
                                        !selectAll &&
                                        `SELECT ALL (${cart.length} ITEM(S))`
                                    }
                                    {
                                        selectAll &&
                                        `${selectedCarts.length} ITEM(S) SELECTED`
                                    }
                                </div>
                                <div>
                                    PRICE
                                </div>
                                <div>
                                    QUANTITY
                                </div>
                            </div>
                            <div>
                                <hr />
                            </div>

                            {
                                emptyCart ?
                                    <div className={'loader empty_cart'}>
                                        There are no items in this cart
                                    </div>
                                    :
                                    carts ?
                                        carts.map((items) => {
                                            return (
                                                this.productCart(items, items.index, selectedCarts)
                                            )
                                        })
                                        :
                                        <div className={'loader'}>
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={120}
                                                color={'#f27b01'}
                                                loading={true}
                                            />
                                        </div>
                            }

                        </div>
                        <div className={'delivery-details'}>
                            <div>
                                Location
                            </div>
                            <div className={'location-detail'}>
                                <div>
                                    <span>
                                        <FontAwesomeIcon icon={'map-marker-alt'} />
                                    </span>
                                    <span>
                                        {
                                            currentUser &&
                                                currentUser.address ? currentUser.address : 'Address not available'
                                        }
                                    </span>
                                </div>
                                <div className={'edit-style'} onClick={() => this.editAddress()}>
                                    CHANGE
                                </div>
                                <div>
                                    <hr />
                                </div>
                                <div>
                                    Order Summary
                                </div>
                                <div className={'pricing'}>
                                    <div>
                                        Subtotal ({selectedCarts.length} items)
                                    </div>
                                    <div>
                                        $ {subtotal ? subtotal : 0}
                                    </div>
                                </div>
                                {/* <div className={'pricing'}>
                                    <div>
                                        Shipping Fee
                                    </div>
                                    <div>
                                        $ 10
                                    </div>
                                </div> */}
                                <div className={'pricing'}>
                                    <div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                                        Total
                                    </div>
                                    <div style={{ color: 'rgb(241, 123, 1)' }}>
                                        $ {subtotal ? subtotal : 0}
                                    </div>
                                </div>
                                <div>
                                    {
                                        selectedCarts.length > 0 ?
                                            <Button
                                                variant={'contained'}
                                                className={'checkout-btn'}
                                                onClick={() => this.checkOut()}
                                            >
                                                PROCEED TO CHECKOUT
                                            </Button>
                                            :
                                            <Button
                                                variant={'contained'}
                                                disabled={true}
                                            >
                                                PROCEED TO CHECKOUT
                                            </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        products: states.productReducer.ALLPRODUCTS,
        myCart: states.cartReducer.CART,
        deleteCart: states.cartReducer.DELETECART,
        counter: states.cartReducer.COUNTER,
        modified: states.cartReducer.MODIFIED,
        flag: states.cartReducer.FLAG,
        currentUser: states.authReducer.CURRENTUSER,
        changes: states.cartReducer.CHANGES,
        emptyCart: states.cartReducer.EMPTYCART,
        userUID: states.authReducer.CURRENTUSERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ProductCart,
            //  RemoveQuantity, DeleteCart,
            updateEmail
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);