'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '../../../../api/postLabour'
import Link from 'next/link'
export default function Page() {
    const params = useParams()
    const skillType = params.name
    const [labourData, setLabourData] = useState([])
    const [displayLabour, setDisplayLabour] = useState([])
    useEffect(() => {
        const fetchLabour = async () => {
            try {
                const response = await api.get(`/labour`)
                setLabourData(response.data)
            } catch (error) {
                console.error('Error fetching labour data:', error)
            }
        }

        fetchLabour()
    }, [skillType])

    useEffect(() => {
        const filteredLabour = labourData.filter(labour => 
            labour.skill.toLowerCase().includes(skillType.toLowerCase())
        )
        setDisplayLabour(filteredLabour)
    }, [labourData, skillType])

    return (
        <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold mb-8 capitalize">
                    {skillType} Workers
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayLabour.map((labour) => (
                        <Link key={labour.id} href={`/profile/${labour.id}`}>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">{labour.name}</h2>
                                <p className="text-gray-600 mb-2">Experience: {labour.experience} years</p>
                                <p className="text-gray-600 mb-2">Skills: {labour.skill}</p>
                                <p className="text-gray-600 mb-2">Location: {labour.location}</p>
                                <p className="text-gray-600">Address: {labour.address}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}