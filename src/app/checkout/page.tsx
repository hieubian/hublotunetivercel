"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Checkout() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState<React.ReactNode>(null);
    const [discountedTotal, setDiscountedTotal] = useState(575000000); // Using the mock item price

    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    const applyCoupon = () => {
        if (couponCode === 'HUBLOT10') {
            setDiscountedTotal(575000000 * 0.9);
            setCouponMessage(<span style={{color: 'green'}}>Coupon applied! 10% off</span>);
        } else {
            setCouponMessage(<span style={{color: 'red'}}>Invalid coupon code</span>);
        }
    };

    const placeOrder = () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/thankyou');
        }, 1500);
    };

    return (
        <div className="container checkout-page">
            <h1 className="cart-page__title">Checkout</h1>

            <form id="checkoutForm" onSubmit={e => e.preventDefault()}>
                <div className="checkout-layout">
                    <div>
                        {/* Delivery Address */}
                        <div className="checkout-section">
                            <h2 className="checkout-section__title">Delivery Address</h2>
                            <div className="address-grid">
                                <label className="address-card address-card--selected">
                                    <input type="radio" name="addressOption" value="1" defaultChecked style={{display: 'none'}} />
                                    <div className="address-card__name">Nguyen Gia Hieu</div>
                                    <div>123 Minh Khai</div>
                                    <div>Hanoi - 100000</div>
                                    <div>0123456789</div>
                                </label>
                            </div>
                            <button type="button" className="btn btn--outline btn--small mt-20">+ Add New Address</button>
                        </div>

                        {/* Payment Method */}
                        <div className="checkout-section">
                            <h2 className="checkout-section__title">Payment Method</h2>
                            <div className="payment-options">
                                <label className="payment-option payment-option--selected">
                                    <input type="radio" name="paymentOption" value="COD" defaultChecked />
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className="payment-option">
                                    <input type="radio" name="paymentOption" value="VNPAY" />
                                    <span>VNPAY</span>
                                </label>
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="checkout-section">
                            <h2 className="checkout-section__title">Coupon</h2>
                            <div className="coupon-input">
                                <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Enter code (try HUBLOT10)" />
                                <button type="button" className="btn btn--outline btn--small" onClick={applyCoupon}>Apply</button>
                            </div>
                            <div id="couponMessage" style={{fontSize: '13px', marginTop: '10px'}}>{couponMessage}</div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="cart-summary">
                            <div className="cart-summary__title">Order Summary</div>
                            
                            <div className="cart-summary__row">
                                <span>Big Bang Unico Titanium 42mm &times; 1</span>
                                <span>{formatPrice(575000000)}</span>
                            </div>
                            
                            <div className="cart-summary__row">
                                <span>Shipping</span>
                                <span style={{color: '#2e7d32'}}>Free</span>
                            </div>
                            <div className="cart-summary__total">
                                <span>Total</span>
                                <span>{formatPrice(discountedTotal)}</span>
                            </div>
                            <button type="button" className={`btn btn--primary btn--full mt-20 ${loading ? 'btn--loading' : ''}`} disabled={loading} onClick={placeOrder}>
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
