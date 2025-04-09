import { signOut } from 'next-auth/react';
import router from 'next/router';
import React from 'react'
import { Button } from './ui/button';

const SignOutButton = () => {
    const handleSignOut = async (e: any) => {
        e.preventDefault();
        await signOut({ redirect: false });
        router.push("/login");
    }
    return (
        <Button
            onClick={handleSignOut}
        >
            Sign Out
        </Button>
    )
}

export default SignOutButton