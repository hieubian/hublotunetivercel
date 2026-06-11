"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Cart() {
    // Mock Cart State
    const [cartItems, setCartItems] = useState([
        {
            id: 26,
            name: "Big Bang Unico Titanium 42mm",
            image: "uploads/products/2e30df3d-f2df-435c-b17a-a5192fa79f70.glb", // Using model or image
            price: 575000000,
            quantity: 1
        }
    ]);

    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    const updateQty = (id: number, delta: number) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container cart-page">
            <h1 className="cart-page__title">Your Bag</h1>

            {cartItems.length > 0 ? (
                <div className="cart-layout">
                    <div>
                        {cartItems.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item__image">
                                    <Link href={`/productDetails?id=${item.id}`}>
                                        {/* Mock image fallback */}
                                        <div style={{width: '100%', height: '100px', backgroundColor: '#f5f5f5'}}></div>
                                    </Link>
                                </div>
                                <div>
                                    <div className="cart-item__name">{item.name}</div>
                                    <div className="cart-item__price">
                                        <span>{formatPrice(item.price)}</span> &times; <span>{item.quantity}</span>
                                    </div>
                                    <div className="cart-item__qty">
                                        <button type="button" className="cart-item__qty-btn" onClick={() => updateQty(item.id, -1)}>&minus;</button>
                                        <input type="number" className="cart-item__qty-val" value={item.quantity} readOnly />
                                        <button type="button" className="cart-item__qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item__remove" onClick={() => removeItem(item.id)}>Remove</div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="cart-summary">
                            <div className="cart-summary__title">Order Summary</div>
                            <div className="cart-summary__row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subTotal)}</span>
                            </div>
                            <div className="cart-summary__row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="cart-summary__total">
                                <span>Total</span>
                                <span>{formatPrice(subTotal)}</span>
                            </div>
                            <Link href="/checkout" className="btn btn--primary btn--full mt-20" style={{textAlign: 'center'}}>Checkout</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cart-page__empty">
                    <p style={{fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px'}}>Your bag is empty</p>
                    <Link href="/productView" className="btn btn--outline">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
}
