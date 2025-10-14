import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],          // 🧺 Store all products added to the cart
    totalQuantity: 0,   // 📦 Total quantity of all items
  },
  reducers: {
    // ✅ Add item to cart (increase quantity if exists)
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }

      state.totalQuantity += 1;
    },

    // ✅ Remove item from cart completely
    removeItem: (state, action) => {
      const { name } = action.payload;
      const itemIndex = state.items.findIndex(item => item.name === name);

      if (itemIndex >= 0) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    // ✅ Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        state.totalQuantity += quantityDifference;

        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          // Remove item if quantity is zero or less
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
