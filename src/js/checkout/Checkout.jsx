import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { purchase } from '../spot/spot-actions';
import Image from '../common/Image';
import Button from '../common/Button';

const Checkout = props => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [formErrors, setformErrors] = useState([true, true]);

    const validateForm = () => {
        let isEmailValidated = /[\w-]+@([\w-]+\.)+[\w-]+/.test(email);
        let isPhoneValidated = /^[0-9]{10}$/.test(phone);

        setformErrors([isEmailValidated, isPhoneValidated]);
        if (isEmailValidated && isPhoneValidated) {
            return true;
        }
    }

    const spot = useSelector(state => state.spot.selected);
    const dispatch = useDispatch();

    return (
        (spot) &&
            <div className="Checkout">
                <div className="CheckoutForm">

                    <div className="CheckoutFormHeader"><Link to="/">&lt; Back to Search</Link></div>
                    <div className="CheckoutFormBody">
                        <div style={{display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                        <Image src={spot.image} />
                        </div>
                        <div style={{display: 'inline-block', width: '50%', verticalAlign: 'top'}}>
                            <h3>{spot.title}</h3>
                            {spot.distance}
                        </div>
                        <hr />
                        <div className="CheckoutFormElement">
                            <label>First Name</label>
                            <input />
                        </div>
                        <div className="CheckoutFormElement">
                            <label>Last Name</label>
                            <input />
                        </div>
                        <div className={'CheckoutFormElement ' + (!formErrors[0] ? 'fieldError' : '')}>
                            <label>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {(!formErrors[0]) && <label className="CheckoutErrorLabel">Please enter a valid email.</label>}
                        </div>
                        <div className={'CheckoutFormElement ' + (!formErrors[1] ? 'fieldError' : '')}>
                            <label>Phone Number</label>
                            <input
                                value={phone}
                                onChange={(e) => {
                                    if (Number(e.target.value))
                                    setPhone(e.target.value)
                                }}
                                />
                            {(!formErrors[1]) && <label className="CheckoutErrorLabel">Please enter a phone number.</label>}
                        </div>
                        <div className="CheckoutFormButtonContainer">
                            <Button
                                className="CheckoutFormButton"
                                onClick={() =>  {
                                    if(validateForm()) {
                                        dispatch(purchase({
                                            'email' : email
                                        }))
                                        props.history.push('/confirmation')
                                    }
                                }}
                            >
                                Purchase For ${(spot.price/100).toFixed(2)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Checkout;
