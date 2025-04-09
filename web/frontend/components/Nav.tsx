import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavbarProps {
    title: string;
}

const Navbar = ({ title }: NavbarProps) => {
    const router = useRouter();

    return (
        <div className="navbar bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                <a className="text-3xl font-bold tracking-tight text-indigo-600">{title}</a>
                <ul className="menu menu-horizontal px-1 flex">
                    <li className={`ml-8 text-xl ${router.pathname === "/" ? "text-indigo-600" : "text-gray-500"}`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`ml-8 text-xl ${router.pathname === "/projects" ? "text-indigo-600" : "text-gray-500"}`}>
                        <Link href="/projects">Projects</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Navbar;
