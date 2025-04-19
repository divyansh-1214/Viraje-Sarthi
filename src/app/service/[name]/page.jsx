'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
export default function Page() {
    const params = useParams()
    const serviceName = params.name
    const [work, setWork] = useState("small")

    return (
        <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 capitalize" style={{ color: 'var(--text-black)' }}>
                    {serviceName} Services
                </h1>
                <div className="max-w-2xl mx-auto">
                    <nav className="flex mb-8 bg-white rounded-lg p-2 shadow-sm">
                        <div
                            onClick={() => setWork("small")}
                            className={`flex-1 py-3 px-6 text-center rounded-lg cursor-pointer transition-all duration-300 ${work === "small" ? "bg-yellow-400 text-white" : "hover:bg-yellow-50"}`}
                        >
                            Small Scale
                        </div>
                        <div
                            onClick={() => setWork("large")}
                            className={`flex-1 py-3 px-6 text-center rounded-lg cursor-pointer transition-all duration-300 ${work === "large" ? "bg-yellow-400 text-white" : "hover:bg-yellow-50"}`}
                        >
                            Large Scale
                        </div>
                    </nav>

                    {work === "small" ? (
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <label className="block text-sm font-medium mb-2">Upload Work Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border-2 border-gray-200 rounded-lg p-2"
                                />
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <label className="block text-sm font-medium mb-2">Work Dimensions</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        placeholder="Length (in feet)"
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Width (in feet)"
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />
                                </div>
                            </div>
                            {/* we are does'n trying to fech the data om the base of the smalll aaor the large order */}
                            <Link href={`/store/small/${serviceName}`}>
                                <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                                    Submit
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="w-full border-2 border-gray-200 rounded-lg p-2 mb-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">City</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">PIN Code</label>
                                    <input
                                        type="text"
                                        placeholder="PIN Code"
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />
                                </div>
                            </div>
                            <Link href={`/store/large/${serviceName}`}>
                                <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                                    Submit
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}