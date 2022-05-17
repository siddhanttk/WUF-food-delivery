import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const cartRef = useRef();
    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredAmount = cartRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5)
        {
            setAmountIsValid(false);
            return;
        }

        props.onAddItem(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" 
            ref={cartRef}
            input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                default: '1'
            }} />
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter a value between 1-10</p>}
        </form>
    )
}

export default MealItemForm;