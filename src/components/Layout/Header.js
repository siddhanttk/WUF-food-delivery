import React from 'react'
import mealImage from 'C:/impdata/projects/React_work/foodordering_app/src/components/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

function Header(props){
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>What's up Food!</h1>
                <HeaderCartButton onShowCart2 = {props.onShowCart}></HeaderCartButton>
            </header>
            <div className={classes['main-img']}>
                <img src={mealImage}></img>
            </div>
        </React.Fragment>
    )
}

export default Header;