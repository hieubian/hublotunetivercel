"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userName = "Guest";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className="nav">
                <div className="nav__left">
                    <button type="button" className={`nav__hamburger ${isMenuOpen ? 'nav__hamburger--open' : ''}`} id="yzHamburger"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                        aria-controls="yzOverlay"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                        <span className="nav__hamburger-bar nav__hamburger-bar--top" aria-hidden="true"></span>
                        <span className="nav__hamburger-bar nav__hamburger-bar--middle" aria-hidden="true"></span>
                        <span className="nav__hamburger-bar nav__hamburger-bar--bottom" aria-hidden="true"></span>
                    </button>
                    <Link href="/" className="nav__logo" aria-label="HUBLOT UNETI">
                        <img src="/hublot-logo-upd.svg" alt="" className="nav__logo-img" width="368" height="48" decoding="async" />
                    </Link>
                </div>

                <div className="nav__right">
                    <Link href="/wishlist" className="nav__icon nav__badge" title="Wishlist">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {wishlistCount > 0 && <span className="nav__badge-count wishlist-count">{wishlistCount}</span>}
                    </Link>
                    <Link href="/cart" className="nav__cart-btn nav__badge" title="Cart">
                        <svg style={{width: '18px', height: '18px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        {cartCount > 0 && <span className="nav__badge-count cart-count">{cartCount}</span>}
                    </Link>
                    {isLoggedIn ? (
                        <Link href="/userProfile" className="nav__account" title="Account — signed in">
                            <span className="nav__account-icon-wrap" aria-hidden="true">
                                <svg className="nav__account-icon--filled" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </span>
                            <span className="nav__user-name">{userName}</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="nav__icon" title="Sign In">
                            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </Link>
                    )}
                </div>
            </nav>

            <div className={`overlay-menu ${isMenuOpen ? 'overlay-menu--open' : ''}`} id="yzOverlay" role="dialog" aria-modal="true" aria-hidden={!isMenuOpen}
                aria-label="Menu" onClick={(e) => { if (e.target === e.currentTarget) setIsMenuOpen(false) }}>
                <div className="overlay-menu__inner">
                    <div className="overlay-menu__body">
                        <nav className="overlay-menu__section overlay-menu__section--first" aria-labelledby="overlayNavShop">
                            <h2 id="overlayNavShop" className="overlay-menu__section-label">Shop</h2>
                            <div className="overlay-menu__links">
                                <Link href="/" className="overlay-menu__link" onClick={toggleMenu}>Home</Link>
                                <Link href="/productView" className="overlay-menu__link" onClick={toggleMenu}>Watches</Link>
                                <Link href="/productView?view=new" className="overlay-menu__link" onClick={toggleMenu}>New Arrivals</Link>
                                <Link href="/productView?view=bestseller" className="overlay-menu__link" onClick={toggleMenu}>Best Sellers</Link>
                            </div>
                        </nav>
                        <nav className="overlay-menu__section" aria-labelledby="overlayNavService">
                            <h2 id="overlayNavService" className="overlay-menu__section-label">Customer care</h2>
                            <div className="overlay-menu__links overlay-menu__links--service">
                                <Link href="/track-order" className="overlay-menu__link overlay-menu__link--accent" onClick={toggleMenu}>Order tracking</Link>
                                <Link href="/policies" className="overlay-menu__link overlay-menu__link--accent" onClick={toggleMenu}>Policies & warranty</Link>
                                <Link href="/contact" className="overlay-menu__link overlay-menu__link--accent" onClick={toggleMenu}>Contact</Link>
                            </div>
                        </nav>
                        <nav className="overlay-menu__section" aria-labelledby="overlayNavAccount">
                            <h2 id="overlayNavAccount" className="overlay-menu__section-label">Account</h2>
                            <div className="overlay-menu__links overlay-menu__links--account">
                                <Link href="/cart" className="overlay-menu__link overlay-menu__link--sm" onClick={toggleMenu}>Cart</Link>
                                <Link href="/wishlist" className="overlay-menu__link overlay-menu__link--sm" onClick={toggleMenu}>Wishlist</Link>
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/userProfile" className="overlay-menu__link overlay-menu__link--sm" onClick={toggleMenu}>My Account</Link>
                                        <Link href="/logout" className="overlay-menu__link overlay-menu__link--sm overlay-menu__link--no-chevron" onClick={toggleMenu}>Logout</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="overlay-menu__link overlay-menu__link--sm overlay-menu__link--no-chevron" onClick={toggleMenu}>Sign In</Link>
                                        <Link href="/register" className="overlay-menu__link overlay-menu__link--sm overlay-menu__link--no-chevron" onClick={toggleMenu}>Register</Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                    <div className="overlay-menu__footer">
                        <nav className="overlay-menu__social" aria-label="Social media">
                            <a href="https://www.facebook.com/hegiahe/" className="overlay-menu__social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg className="overlay-menu__social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/hegiahe/" className="overlay-menu__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg className="overlay-menu__social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/hegiahe/" className="overlay-menu__social-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <svg className="overlay-menu__social-icon overlay-menu__social-icon--tiktok" viewBox="0 0 448 512" fill="currentColor"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>
                            </a>
                        </nav>
                        <div className="overlay-menu__locale-group">
                            <span className="overlay-menu__locale-code overlay-menu__locale-code--active">VI</span>
                            <span className="overlay-menu__locale-code">EN</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-spacer"></div>
        </>
    );
}
