"use client"

import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {

    return (
        <header>
            <nav className={`nav`}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default NavBar;