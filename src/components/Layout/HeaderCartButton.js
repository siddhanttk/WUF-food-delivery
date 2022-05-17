import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{
    const cartCtx = useContext(CartContext);
    const [btnHighlight, setBtnHighlight] = useState(false);
    const { items } = cartCtx;
    const cartItemsTotal = items.reduce((curNumber, item) =>{
        return (curNumber + item.amount);
    },0)

    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`

    useEffect(() =>{
        if(items.length === 0)
        {
            return;
        }
        setBtnHighlight(true)

        const timer = setTimeout(() =>{
            setBtnHighlight(false)
        },300);

        return ()=>{
            clearTimeout(timer)
        }
    },[items])
    return(
        <button className={btnClasses} onClick={props.onShowCart2}>
            <span className={classes.icon}>
               <CartIcon></CartIcon>
            </span>
            <span>Cart</span>
            <span className={classes.badge}>{cartItemsTotal}</span>
        </button>
    )
}

export default HeaderCartButton;