// pages/login.tsx
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import React, { useEffect } from 'react'

function login() {
    const { data: session } = useSession()
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    // if user is already logged in, redirect to home page
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session]);

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        await signIn("credentials", {
            email: data?.email,
            password: data?.password,
            redirect: false,
            callbackUrl: `${window.location.origin}`,
        }).then((response) => {
            if (response?.error) {
                // show notification for user
                alert(response.error);
            } else {
                router.push("/");
            }
        });
    }

    // handle input change
    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {/* large header shows "Expert Finder" */}
            <div className="mt-6 text-center">
                <div className="mt-6">
                    <h1 className="text-7xl font-extrabold tracking-tight text-gray-900">
                        Expert Finder
                    </h1>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
                    Sign in
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST" onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* hyperlink to signup */}
                    <div className="text-sm">
                        Don't have an account?
                        <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </a>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default login