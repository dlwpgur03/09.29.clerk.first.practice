import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';


export default async function DashboardPage() {
    const {isAuthenticated} = await auth();

    if(!isAuthenticated){
        return <div>Please sign in to access the dashboard.</div>
    }
    const user = await currentUser();
    console.log(user);

    return(
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-2"> Welcome to Dashboard </p>
            <div className="mb-5">
                <p>Welcome to your dashboard, {user?.firstName || 'Guest'}!</p>
                <p>Email, {user?.primaryEmailAddress?.emailAddress || 'Guest'}!</p>
                <p>사용자 등록일: {user?.createdAt || 'Guest'}!</p>
            </div>
    </div>
    )
}