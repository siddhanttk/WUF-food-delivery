import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () =>{
    setShowCart(true)
  }
  const hideCartHandler = () =>{
    setShowCart(false);
  }
  
  return (
    <CartProvider>
      {showCart && <Cart onCloseCart = {hideCartHandler}/>}
      <Header onShowCart = {showCartHandler}></Header>
      <main>
        <Meals />
      </main>
      </CartProvider>
  );
}

export default App;
