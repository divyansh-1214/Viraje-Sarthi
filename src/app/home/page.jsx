'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold"
                            style={{ color: 'var(--text-black)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            VIRAJE SAARTHI
                        </motion.h1>
                        <motion.p
                            className="text-xl"
                            style={{ color: 'var(--text-gray-600)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Connect with skilled professionals for your home and construction needs. Find reliable electricians, plumbers, painters, and more.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            className="relative max-w-xl pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <input
                                type="text"
                                placeholder="Search for any service..."
                                className="w-full px-4 py-3 pl-12 rounded-full border-2 focus:outline-none transition-all duration-300 hover:shadow-md"
                                style={{
                                    borderColor: 'var(--border-yellow-200)',
                                    '--tw-ring-color': 'var(--primary-yellow-400)'
                                }}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute left-4 top-10 transform -translate-y-1/2"
                                style={{ color: 'var(--text-gray-600)' }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </motion.div>

                        {/* Popular Skills */}
                        <motion.div
                            className="flex flex-wrap gap-3 pt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            {['Electrician', 'Plumber', 'Painter', 'Carpenter', 'Mason'].map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    className="px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 hover:shadow-md"
                                    style={{
                                        backgroundColor: 'var(--bg-white)',
                                        color: 'var(--text-gray-700)',
                                        borderColor: 'var(--border-yellow-200)',
                                        border: '1px solid'
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: 'var(--primary-yellow-400)',
                                        color: 'var(--text-black)'
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
                            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/worker.png"
                                alt="Professional Worker"
                                width={500}
                                height={400}
                                className="rounded-lg object-cover w-full"
                            />

                            {/* Trust Indicators */}
                            <motion.div
                                className="mt-8 space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full border-2"
                                                    style={{
                                                        backgroundColor: 'var(--bg-gray-100)',
                                                        borderColor: 'var(--bg-white)'
                                                    }}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
                                                />
                                            ))}
                                        </div>
                                        <span style={{ color: 'var(--text-gray-600)' }}>500+ Verified Professionals</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <motion.div
                                        className="p-4 rounded-lg"
                                        style={{ backgroundColor: 'var(--primary-yellow-50)' }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-2xl font-bold" style={{ color: 'var(--primary-yellow-400)' }}>1000+</p>
                                        <p className="text-sm" style={{ color: 'var(--text-gray-600)' }}>Projects Completed</p>
                                    </motion.div>
                                    <motion.div
                                        className="p-4 rounded-lg"
                                        style={{ backgroundColor: 'var(--primary-yellow-50)' }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-2xl font-bold" style={{ color: 'var(--primary-yellow-400)' }}>4.8/5</p>
                                        <p className="text-sm" style={{ color: 'var(--text-gray-600)' }}>Average Rating</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-20" style={{ backgroundColor: 'var(--bg-white)' }}>
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-16"
                        style={{ color: 'var(--text-black)' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                        {[
                            'Electrical Work',
                            'Plumbing',
                            'Painting',
                            'Carpentry',
                            'Masonry',
                            'Construction',
                            'Interior Work',
                            'Renovation'
                        ].map((service, index) => (
                            <motion.div
                                key={service}
                                className="p-8 text-center rounded-xl transition-all duration-300 cursor-pointer"
                                style={{
                                    backgroundColor: 'var(--primary-yellow-50)',
                                    borderColor: 'var(--border-yellow-200)',
                                    border: '1px solid'
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index, duration: 0.4 }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: 'var(--bg-white)'
                                }}
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                    style={{ backgroundColor: 'var(--primary-yellow-400)' }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <Link href={`/service/${service.toLowerCase()}`}>
                                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-black)' }}>{service}</h3>
                                    <p style={{ color: 'var(--text-gray-600)' }}>Professional {service.toLowerCase()} services</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}