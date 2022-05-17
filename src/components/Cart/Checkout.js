import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const nameRef = useRef();
    const streetRef = useRef();
    const cityRef = useRef();
    const pinRef = useRef();

    const isEmpty = (value) => value.trim() === ''
    const isSixChars = (value) => value.trim().length === 6

    const [formIsValid, setFormIsValid] = useState({
        name: true,
        street: true,
        city: true,
        pin: true
    })

    const ConfirmCheckout = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredCity = cityRef.current.value;
        const enteredPin = pinRef.current.value;

        const nameIsValid = !isEmpty(enteredName)
        const streetIsValid = !isEmpty(enteredStreet)
        const cityIsValid = !isEmpty(enteredCity)
        const pinIsValid = !isEmpty(enteredPin) && isSixChars(enteredPin)

        setFormIsValid({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            pin: pinIsValid
        })
        const finalFormIsValid = (nameIsValid && streetIsValid && cityIsValid && pinIsValid)
        if(!finalFormIsValid)
        {
            return;
        }

        props.onCheckout({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            pin: enteredPin
        })

        
    }


    return (
        <form onSubmit={ConfirmCheckout} className={classes.form}>
            <div className={`${classes.control} ${formIsValid.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameRef}></input>
                {!formIsValid.name && <p>Please entere valid name</p>}
            </div>
            <div className={`${classes.control} ${formIsValid.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef}></input>
                {!formIsValid.street && <p>Please entere valid street name</p>}
            </div>
            <div className={`${classes.control} ${formIsValid.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} ></input>
                {!formIsValid.city && <p>Please entere valid city name</p>}
            </div>
            <div className={`${classes.control} ${formIsValid.pin ? '' : classes.invalid}`}>
                <label htmlFor='pin'>Pin Code</label>
                <input type='number' id='pin' ref={pinRef} ></input>
                {!formIsValid.pin && <p>Please entere valid pin</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;