import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import './AdminProducts.css'
import Pagination from '../../../Component/Pager/Pager';
import { ClipLoader } from 'react-spinners';
import { Button } from '@material-ui/core';
import History from '../../../History/History';

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: null,
            pages: 3,
            pageProduct: [],
            number: 10,
            searchText: '',
            searchArr: [],

        }

        this.pageNum = this.pageNum.bind(this);
        this._details = this._details.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillMount() {
        const { allProducts } = this.props;
        const { number } = this.state;
        if (allProducts && allProducts.length) {
            setTimeout(() => {
                allProducts.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
                    }
                );
                const pages = Math.ceil(allProducts.length / number)
                const pageArr = allProducts.slice(0, number)
                this.setState({ allProducts, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allProducts', allProducts)
    }

    componentWillReceiveProps(props) {
        const { allProducts } = props;
        const { number } = this.state;
        if (allProducts && allProducts.length) {
            setTimeout(() => {
                allProducts.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
                    }
                );
                const pages = Math.ceil(allProducts.length / number)
                const pageArr = allProducts.slice(0, number)
                this.setState({ allProducts, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allProducts', allProducts)
    }

    pageNum(num) {
        const { allProducts, number } = this.state;
        const pageArr = allProducts.slice(num * number, num * number + number)
        this.setState({ pageProduct: pageArr })
    }

    _details(item) {
        History.push({
            pathname: `/productDetails/${item.key}`,
            state: item
        })
    }


    search(val) {
        const { allProducts, searchArr } = this.state;
        this.setState({ searchText: val })
        var arr = []
        allProducts.map(item => {
            if ((item.data.name.toUpperCase()).startsWith(val.toUpperCase()) || (item.data.brand.toUpperCase()).startsWith(val.toUpperCase())) {
                arr.push(item)
                console.log('arr', arr)
                this.setState({ searchArr: arr })
            } else {
                if (arr.indexOf(item) !== -1) {
                    arr.splice(item, 1)
                }
                this.setState({ searchArr: arr })
            }
        })
    }

    _table = (item) => {
        return (
            <tr className={'TBody'}>
                <td className={'Date'}>{item.data.date}</td>
                <td className={'Name'}>
                    <img src={item.data.images[0].image} />
                </td>
                <td className={'OrderID'}>{item.data.name}</td>
                <td className={'Number'}>{item.data.manufacture}</td>
                <td className={'UserRole'}>{item.data.brand}</td>
                <td className={'Btn'}>
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => this._details(item)}>Details</Button>
                </td>
            </tr>
        )
    }

    render() {
        const { orderArr, searchText, pageProduct, pages, searchArr, allProducts } = this.state;
        console.log('orderArr', orderArr)
        return (
            <AdminDashboard>
                {
                    pageProduct.length ?

                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Products
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                            </div>
                            <div className={"Search-Field"}>
                                <input placeholder="Search by name or brand" value={searchText} onChange={(e) => { this.search(e.target.value) }} />
                            </div>
                            <div className={"Sellers"}>
                                <table>
                                    <thead>
                                        <tr className={'THead'}>
                                            <th className={'Date'}>Date</th>
                                            <th className={'Name'}>Photo</th>
                                            <th className={'OrderID'}>Name</th>
                                            <th className={'Number'}>Manufacture</th>
                                            <th className={'UserRole'}>Brand</th>
                                            <th className={'Btn'}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !searchText && pageProduct && pageProduct.length ?
                                                pageProduct.map(item => {
                                                    return this._table(item)
                                                })
                                                :
                                                null
                                        }
                                        {
                                            searchText && searchArr && searchArr.length ?
                                                searchArr.map(item => {
                                                    return this._table(item)
                                                })
                                                :
                                                null
                                        }
                                    </tbody>
                                </table>
                                {
                                    searchText && searchArr && !searchArr.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No product found</div>
                                        :
                                        null
                                }
                            </div>
                            <div className={"Pagination"}>
                                {
                                    !searchText && pageProduct.length && allProducts.length > 10 ?
                                        <Pagination pages={pages} pageNum={this.pageNum} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Products
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                        </div>
                }
            </AdminDashboard >
        )
    }
}


function mapStateToProps(states) {
    return ({
        allProducts: states.productReducer.ALLPRODUCTS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);