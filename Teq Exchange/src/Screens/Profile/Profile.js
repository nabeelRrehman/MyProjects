import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History/History';
import Containers from '../../Container/container/container';
import { Button } from '@material-ui/core';
import './Profile.css';
import Loader from 'react-loader-spinner'
import { ClipLoader } from 'react-spinners';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faUserEdit, faEdit)


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }

    componentWillMount() {
        const { authChange, currentUser } = this.props;
        this.setState({ currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
    }

    componentWillReceiveProps(props) {
        const { authChange, currentUser } = props;
        this.setState({ currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
    }


    // componentDidMount() {
    //     const { currentUserUID } = this.props;
    //     console.log('currentUserUID*********************', currentUserUID)
    //     if (!currentUserUID) {
    //         History.push('/')
    //     }
    // }

    // static getDerivedStateFromProps(props) {
    //     const { currentUser } = props;
    //     return ({ currentUser })

    // }

    render() {
        const { currentUser } = this.state;
        const { currentUserUID } = this.props;
        console.log('currentUserUID**********', currentUserUID)
        console.log('currentUser**********', currentUser)

        return (
            <Containers>
                <div className={'Profile'}>
                    <div>
                        Profile
                    </div>
                    {currentUser && currentUser.role &&
                        <div>
                            <Button
                                color={"primary"}
                                size={"small"}
                                variant="outlined"
                                onClick={() => { History.push('/editprofile') }}
                            >
                                <FontAwesomeIcon icon={"edit"} size={'1x'} className={'FontAws'} />
                                Edit Profile
                            </Button>
                        </div>
                    }
                    <hr />
                </div>
                {currentUser && currentUser.role ?
                    <div>
                        {currentUser.role === 'buyer' ?
                            <div className={'ProfileBuyerData'}>
                                <span>
                                    <div>
                                        <div className={'formLabBuyer'} >First Name</div>
                                        <div className={'formText'}>{currentUser.firstName}</div>
                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Last Name</div>
                                        <div className={'formText'}>{currentUser.lastName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Contact Email</div>
                                        <div className={'formText'}>{currentUser.contactEmail}</div>

                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Phone No.</div>
                                        <div className={'formText'}>+{currentUser.phoneNoCode}{currentUser.phoneNo}</div>
                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Telephone No.</div>
                                        <div className={'formText'}>+{currentUser.telCode}{currentUser.telephoneNo}</div>
                                    </div>
                                </span>
                            </div>
                            :
                            null
                        }
                        {currentUser.role === 'seller' ?
                            <div className={'ProfileData'}>
                                <span>
                                    <div>
                                        <div className={'formLab'} >First Name</div>
                                        <div className={'formText'}>{currentUser.firstName}</div>
                                    </div>
                                    <div>
                                        <div className={'formLab'} >Last Name</div>
                                        <div className={'formText'}>{currentUser.lastName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Email</div>
                                        <div className={'formText'}> {currentUser.contactEmail}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Phone No.</div>
                                        <div className={'formText'}>+{currentUser.phoneNoCode}{currentUser.phoneNo}</div>
                                    </div>
                                    <div>
                                        <div className={'formLab'} >Telephone No.</div>
                                        <div className={'formText'}>+{currentUser.telCode}{currentUser.telephoneNo}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Company Name</div>
                                        <div className={'formText'}>{currentUser.companyName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Registration No.</div>
                                        <div className={'formText'}>{currentUser.registNo}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >No. Of Peoples In Organization</div>
                                        <div className={'formText'}>{currentUser.noOfPeople}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Country</div>
                                        <div className={'formText'}>{currentUser.country}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Service Category</div>
                                        <div className={'formText'}>{currentUser.serviceCategory}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Designation</div>
                                        <div className={'formText'}>{currentUser.designation}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 3}</div>
                                        <div className={'formText'}>${currentUser.turnOver3}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 2}</div>
                                        <div className={'formText'}>${currentUser.turnOver2}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 1}</div>
                                        <div className={'formText'}>${currentUser.turnOver1}</div>

                                    </div>


                                    <div>
                                        <div className={'formLab'} >Beneficiary Name</div>
                                        <div className={'formText'}>{currentUser.beneficiaryName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Bank Name</div>
                                        <div className={'formText'}>{currentUser.bankName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Bank Code</div>
                                        <div className={'formText'}>{currentUser.bankCode}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Swift Code</div>
                                        <div className={'formText'}>{currentUser.swiftCode}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Account Number</div>
                                        <div className={'formText'}>{currentUser.accountNumber}</div>

                                    </div>
                                </span>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <div style={{ textAlign: "center" }}>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={120}
                            color={'#f27b01'}
                            loading={true}
                        />
                    </div>
                    // <div style={{ textAlign: "center" }}>
                    //     <Loader
                    //         type="ThreeDots"
                    //         color="#f27b01"
                    //         height="100"
                    //         width="100"
                    //     />
                    // </div>
                }
            </Containers>
        )
    }
}

function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        authChange: states.authReducer.AUTHCHANGE
    })
}

export default connect(mapStateToProps, null)(Profile);