"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__col">
                        <div className="footer__title">Shop</div>
                        <Link href="/productView" className="footer__link">Watches</Link>
                        <Link href="/productView?view=new" className="footer__link">New Arrivals</Link>
                        <Link href="/productView?view=bestseller" className="footer__link">Best Sellers</Link>
                    </div>
                    <div className="footer__col">
                        <div className="footer__title">Help</div>
                        <Link href="/track-order" className="footer__link">Order tracking</Link>
                        <Link href="/policies" className="footer__link">Policies & warranty</Link>
                        <Link href="/policies#shipping" className="footer__link">Shipping</Link>
                    </div>
                    <div className="footer__col">
                        <div className="footer__title">Account</div>
                        <Link href="/login" className="footer__link">Sign In</Link>
                        <Link href="/register" className="footer__link">Register</Link>
                        <Link href="/userProfile" className="footer__link">My Account</Link>
                        <Link href="/wishlist" className="footer__link">Wishlist</Link>
                    </div>
                    <div className="footer__col footer__col--contact">
                        <div className="footer__title">Contact</div>
                        <div className="footer__address-block">
                            <p className="footer__brand">HUBLOT UNETI</p>
                            <p className="footer__address-text">Hanoi, Vietnam</p>
                        </div>
                        <div className="footer__contact-fields">
                            <div className="footer__contact-field">
                                <span className="footer__contact-label">Email</span>
                                <a href="mailto:support@hublotuneti.com" className="footer__contact-value">support@hublotuneti.com</a>
                            </div>
                            <div className="footer__contact-field">
                                <span className="footer__contact-label">Phone</span>
                                <a href="tel:+84123456789" className="footer__contact-value">+84 123 456 789</a>
                            </div>
                        </div>
                        <nav className="footer__contact-nav" aria-label="Contact links">
                            <a href="https://www.facebook.com/hegiahe/" className="footer__link footer__link--caps" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://maps.google.com" className="footer__link footer__link--caps" target="_blank" rel="noopener noreferrer">Directions</a>
                        </nav>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        <span>&copy; {new Date().getFullYear()} HUBLOT UNETI</span>
                    </p>
                    <div className="footer__locale">
                        <span className="footer__locale-group">
                            <span className="footer__locale-btn footer__locale-btn--active" title="VI · VND">VI</span>
                            <span className="footer__locale-btn" title="EN · USD">EN</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
