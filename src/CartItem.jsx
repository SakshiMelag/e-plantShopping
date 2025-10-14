import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Calculate subtotal for an item
  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  // Calculate total amount for cart
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0)
      .toFixed(2);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart ({totalQuantity} items)</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={item.name}
                style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}
              >
                <img src={item.image} alt={item.name} width="100" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: {item.cost}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                    <span style={{ marginLeft: '20px' }}>Subtotal: ${calculateItemSubtotal(item)}</span>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary" style={{ marginTop: '20px' }}>
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <button onClick={onContinueShopping}>Continue Shopping</button>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
