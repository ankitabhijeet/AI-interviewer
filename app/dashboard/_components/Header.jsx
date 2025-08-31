"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    const router = useRouter();
    
    useEffect(() => {
        console.log(path);
    }, [])

    return (
        <div className='flex p-4 items-center justify-between'>
            <Image src={'/logo.svg'} width={160} height={100} alt="logo"/>
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard' && 'text-primary font-bold'}`}
                onClick={() => router.push('/dashboard')}
                >Dashboard</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/questions' && 'text-primary font-bold'}`}
                onClick={() => router.push('/dashboard/questions')}
                >Questions</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}
                onClick={() => router.push('/dashboard/upgrade')}
                >Upgrade</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path == '/dashboard/howItWorks' && 'text-primary font-bold'}`}
                onClick={() => router.push('/dashboard/howItWorks')}
                >How It Works?</li>
            </ul>
            <UserButton/>
        </div>
    )
}

export default Header