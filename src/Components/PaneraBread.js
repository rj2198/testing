import React, { useState } from 'react';
import './index.css';
import OrderShoppingCart from './OrderShoppingCart';
import Reviews from './Reviews';

const foodItems = [
  {
      "name": "Bacon Turkey Bravo Sandwich",
      "description": "Smoked turkey breast, bacon, smoked Gouda, lettuce, tomatoes, and signature sauce on tomato basil bread.",
      "price": 8.49,
      "calories": 560,
      "image": "bacon_turkey_bravo.jpg"
  },
  {
      "name": "Broccoli Cheddar Soup",
      "price": 5.29,
      "calories": 360,
      "image": "broccoli_cheddar_soup.jpg"
  },
  {
      "name": "Fuji Apple Chicken Salad",
      "description": "Chicken, mixed field greens, romaine lettuce, and vine-ripened tomatoes with red onions, pecans, Gorgonzola cheese, and Fuji apple vinaigrette.",
      "price": 9.99,
      "calories": 570,
      "image": "fuji_apple_chicken_salad.jpg"
  },
  {
      "name": "Mediterranean Veggie Sandwich",
      "description": "Zesty sweet Peppadew piquant peppers, feta cheese, cucumbers, lettuce, vine-ripened tomatoes, red onions, and cilantro-jalapeno hummus on thin-sliced Tomato Basil.",
      "price": 7.99,
      "calories": 460,
      "image": "mediterranean_veggie_sandwich.jpg"
  },
  {
      "name": "Bowl of Mac & Cheese",
      "price": 6.99,
      "calories": 530,
      "image": "mac_and_cheese.jpg"
  },
  {
      "name": "Chocolate Chipper Cookie",
      "price": 2.49,
      "calories": 350,
      "image": "chocolate_chipper_cookie.jpg"
  },
  {
      "name": "Iced Green Tea",
      "price": 2.09,
      "calories": 0,
      "image": "iced_green_tea.jpg"
  },
  {
      "name": "Cafe Latte",
      "price": 3.99,
      "calories": 120,
      "image": "cafe_latte.jpg"
  }
];
;
const PaneraBread = () => {
  const [orderItems, setOrderItems] = useState([]);
  
  const addToOrder = (item) => {
    const itemIndex = orderItems.findIndex((orderItem) => orderItem.name === item.name);

    if (itemIndex === -1) {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    } else {
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[itemIndex].quantity += 1;
      setOrderItems(updatedOrderItems);
    }
  };

  const removeFromOrder = (item) => {
    const updatedOrderItems = orderItems.filter((orderItem) => orderItem.name !== item.name);
    setOrderItems(updatedOrderItems);
  };

  const increaseQuantity = (item) => {
    const updatedOrderItems = orderItems.map((orderItems) => {
      if (orderItems.name === item.name) {
        orderItems.quantity += 1;
      }
      return orderItems;
    });
    setOrderItems(updatedOrderItems);
  };

  const decreaseQuantity = (item) => {
    const updatedOrderItems = orderItems.map((orderItem) => {
      if (orderItem.name === item.name && orderItem.quantity > 1) {
        orderItem.quantity -= 1;
      }
      return orderItem;
    });
    setOrderItems(updatedOrderItems);
  };

  return (
    <div className="order-page">
      <h1>Featured Items</h1>
      <div className="food-grid">
        {foodItems.map((item, index) => (
          <div key={index} className="food-card">
            <div className="food-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Calories: {item.calories} cal</p>
              <button onClick={() => addToOrder(item)}>Add</button>
              <button onClick={() => removeFromOrder(item)}>Remove</button>
              {orderItems.find((orderItem) => orderItem.name === item.name) && (
                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{orderItems.find((orderItem) => orderItem.name === item.name).quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
              )}
            </div>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
      <OrderShoppingCart orderItems={orderItems} removeFromOrder={removeFromOrder} />
      <Reviews />
    </div>
  );
};

export default PaneraBread;
