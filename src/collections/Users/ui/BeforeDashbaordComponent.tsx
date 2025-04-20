'use client'
import { useAuth } from '@payloadcms/ui'
import Link from 'next/link'
import React from 'react'

const BeforeDashboardComponent: React.FC = () => {
    const { user } = useAuth()
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold  mb-4">
                👋 Welcome to Jobly Admin!
            </h1>
            {user && (
                <p className="text-gray-600 mb-4 text-lg">
                    Logged in as: <span className="font-semibold">{user.name || user.email}</span>
                </p>
            )}
            <p className="text-lg  max-w-xl mb-6">
                This is your powerful admin panel to manage job listings, applications, and more. Use the sidebar to navigate.
            </p>
            <div className="flex items-center space-x-4">
                <Link
                    href="/admin/collections/jobs"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    View Jobs
                </Link>
                <Link
                    href="/admin/collections/job-applications"
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    View Applicants
                </Link>
            </div>
        </div>
    )
}

export default BeforeDashboardComponent
