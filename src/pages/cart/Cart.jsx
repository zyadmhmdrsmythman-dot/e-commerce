import React, { useContext } from 'react'
import { CartContext } from '../../components/context/CartContext'
import { FaTrashAlt } from "react-icons/fa";
import './Cart.css'
import PageTransition from '../../components/PageTransition';

function Cart() {


    const {cartItem , increaseQuantity, decreaseQuantity , RemoveCart} = useContext(CartContext)

    const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity , 0)
    

  return (
    <PageTransition>
        <div className='Checkout'>
      <div className="ordersummery">
        <h1>Order Summery</h1>

        <div className="items">
            {cartItem.length === 0 ? (
                <p>Your Cart is Empty.</p>
            ):(
                cartItem.map((item , index)=>(
                    <div className="item_cart" key={index}>
                        <div className="image_name">
                            <div className="img_item">
                                <img src={item.images[0]} alt="" />
                            </div>

                            <div className="content">
                                <h4>{item.title}</h4>
                                <p className='price_item'>${item.price}</p>

                                <div className="quantity_control">
                                    <button onClick={()=>decreaseQuantity(item.id)}>-</button>
                                    <span className='quantity'>{item.quantity}</span>
                                    <button onClick={()=>increaseQuantity(item.id)}>+</button>
                                </div>

                            </div>

                        </div>
                            <button onClick={()=>RemoveCart(item.id)} className="dalete_item"><FaTrashAlt /></button>
                    </div>
                ))
            )}
        </div>


        <div className="button_summary">
            <div className="shop_table">
                <p>Total : </p>
                <span className='total_checkout'>${total.toFixed(2)}</span>
            </div>
            <div className="btn_div">

                <button type="submit">Place Order</button>
            </div>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}

export default Cart
