import CartContext from "./cart-context";
import { useReducer } from "react";

const cartReducer = (state, action) => {
    if(action.type === 'ADD')
    {
        const updatedAmount = state.totalAmount + action.item.amount*action.item.price;
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem)
        {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        return { items: updatedItems, totalAmount: updatedAmount }
    }
    if(action.type === 'REMOVE')
    {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1)
        {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem; 
        }
        return { items: updatedItems, totalAmount: updatedAmount }
    }
    return { items: [], totalAmount: 0 }
}

const CartProvider = (props) => {
    const [cartState, dispatchCartHandler] = useReducer(cartReducer, {
        items: [],
        totalAmount: 0
    })
    const addItemHandler = (item) => {
        dispatchCartHandler({type: 'ADD', item: item});
    }
    const removeItemHandler = (id) => {
        dispatchCartHandler({type: 'REMOVE', id: id});
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;