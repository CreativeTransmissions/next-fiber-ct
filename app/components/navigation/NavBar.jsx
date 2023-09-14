"use client"

import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {

    return (
        <header className="flex justify-center w-full">
            <nav className="flex space-x-4 md:space-x-8 lg:w-2/3 xl:w-1/2">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
        </header>

    );
};

export default NavBar;