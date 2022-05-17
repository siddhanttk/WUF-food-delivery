import React, { useContext } from 'react';
import { useState } from 'react';
import CartContext from '../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';
import orderGif from './icons8-shipped.gif';

const Cart = (props) => {
    const [isCheckedout, setCheckedout] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `₹ ${cartCtx.totalAmount}`;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    }
    const orderHandler = () =>{
        setCheckedout(true);
    }
    const cart = cartCtx.items;
    const cartItem = cart.map((item) => {
        return (<CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)} />)

    })

    const submitHandler = (userData) =>{
        setIsOrdered(true);
        fetch('https://what-s-up-food-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items
            })
        });


    };

    const modalButtons = (
        <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                <button className={classes.button} onClick={orderHandler}>Order</button>
            </div>
    );

    const modalCode = ( <div>
      <ul className={classes['cart-items']}>
            {cartItem}
        </ul>
        
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckedout && <Checkout onCancel={props.onCloseCart} onCheckout={submitHandler} />}
        {!isCheckedout && modalButtons}
        </div>
        );

    return (
        <Modal>
            {!isOrdered && modalCode}
            {isOrdered && <img src={orderGif} height='200px' width='200px'></img>}
        </Modal>
        
    )
}

export default Cart;