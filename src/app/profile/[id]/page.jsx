'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '../../../api/postLabour'

export default function Page() {
    const params = useParams()
    const labourId = params.id
    const [labourProfile, setLabourProfile] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/labour/${labourId}`)
                setLabourProfile(response.data)
            } catch (error) {
                console.error('Error fetching labour profile:', error)
            }
        }

        if (labourId) {
            fetchProfile()
        }
    }, [labourId])

    return (
        <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
            <div className="container mx-auto px-6">
                {labourProfile ? (
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
                        {/* Left side - Profile Image */}
                        <div className="md:w-1/3">
                            <div className="bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center">
                                <span className="text-6xl text-gray-600">
                                    {labourProfile.name[0]}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-600">★</span>
                                    <span className="font-semibold">{labourProfile.experience} Years Experience</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    93% of clients recommended
                                </div>
                            </div>
                        </div>

                        {/* Right side - Details */}
                        <div className="md:w-2/3">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-3xl font-bold">{labourProfile.name}</h2>
                                <div className="flex gap-3">
                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {labourProfile.skill.split(',').map((skill, index) => (
                                            <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold">Age</h3>
                                        <p className="text-gray-600">{labourProfile.age} years</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Location</h3>
                                        <p className="text-gray-600">{labourProfile.location}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-600">{labourProfile.address}</p>
                                </div>

                                <div className="pt-6">
                                    <button className="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition">
                                        Contact Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-800 border-t-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    )
}