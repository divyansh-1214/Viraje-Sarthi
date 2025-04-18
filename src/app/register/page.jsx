'use client'
import Link from 'next/link'
import { useState } from 'react'

// Add after imports
export default function RegisterForm() {
    const [userType, setUserType] = useState('labour')
    const [newLocation, setNewLocation] = useState('')
    const [selectedLocations, setSelectedLocations] = useState([])
    const locations = ['Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka']

    const [formData, setFormData] = useState({
        aadhar: '',
        mobile: '',
    })
    const [errors, setErrors] = useState({
        aadhar: '',
        mobile: '',
        locations: ''
    })

    const handleLocationSelect = (location) => {
        if (!selectedLocations.includes(location)) {
            if (selectedLocations.length < 3) {
                setSelectedLocations([...selectedLocations, location])
            }
        } else {
            setSelectedLocations(selectedLocations.filter(loc => loc !== location))
        }
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = { aadhar: '', mobile: '', locations: '' }

        if (!/^\d{12}$/.test(formData.aadhar)) {
            newErrors.aadhar = 'Aadhar number must be exactly 12 digits'
            isValid = false
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be exactly 10 digits'
            isValid = false
        }
        if (userType === 'labour' && selectedLocations.length !== 3) {
            newErrors.locations = 'Please select exactly 3 locations'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Form submitted:', {
                ...formData,
                userType,
                locations: selectedLocations
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'location' || value === '' || /^\d+$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleAddLocation = (e) => {
        e.preventDefault()
        if (newLocation.trim() && selectedLocations.length < 3) {
            setSelectedLocations([...selectedLocations, newLocation.trim()])
            setNewLocation('')
        }
    }

    const removeLocation = (locationToRemove) => {
        setSelectedLocations(selectedLocations.filter(loc => loc !== locationToRemove))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <nav className="flex justify-center space-x-4 mb-6">
                    <button
                        type="button"
                        onClick={() => setUserType('labour')}
                        className={`px-4 py-2 rounded-lg ${userType === 'labour'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Register as Labour
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserType('client')}
                        className={`px-4 py-2 rounded-lg ${userType === 'client'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Register as Client
                    </button>
                </nav>
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Aadhar Number
                        </label>
                        <input
                            type="text"
                            name="aadhar"
                            value={formData.aadhar}
                            onChange={handleChange}
                            maxLength={12}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter 12 digit Aadhar number"
                        />
                        {errors.aadhar && <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={10}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter 10 digit mobile number"
                        />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>
                    {userType === 'labour' && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Enter 3 Preferred Locations
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter city name"
                                    disabled={selectedLocations.length >= 3}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddLocation}
                                    disabled={selectedLocations.length >= 3 || !newLocation.trim()}
                                    className={`px-4 py-2 rounded-lg ${selectedLocations.length >= 3 || !newLocation.trim()
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    Add
                                </button>
                            </div>

                            <div className="space-y-2">
                                {selectedLocations.map((loc, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                                        <span>{loc}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeLocation(loc)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {errors.locations && <p className="text-red-500 text-xs mt-1">{errors.locations}</p>}
                            <p className="text-sm text-gray-600 mt-2">
                                Selected: {selectedLocations.length}/3 locations
                            </p>
                        </div>
                    )}

                    <div className='m-3'>
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}