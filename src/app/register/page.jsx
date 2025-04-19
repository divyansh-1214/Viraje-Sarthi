'use client'
import Link from 'next/link'
import { useState } from 'react'
import api from '../../api/post'
import { useRouter } from 'next/navigation'  // Changed this line

export default function RegisterForm() {
    const [userType, setUserType] = useState('labour')
    const router = useRouter()  // Changed variable name for consistency
    const [formData, setFormData] = useState({
        aadhar: '',
        mobile: '',
    })
    const [errors, setErrors] = useState({
        aadhar: '',
        mobile: '',
    })
    function add() {
       
    }
    const validateForm = () => {
        let isValid = true
        const newErrors = { aadhar: '', mobile: '' }

        if (!/^\d{12}$/.test(formData.aadhar)) {
            newErrors.aadhar = 'Aadhar number must be exactly 12 digits'
            isValid = false
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be exactly 10 digits'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const validateAadhar = async (aadharNumber) => {
        try {
            const response = await api.get('/aadhar')
            const aadharData = response.data
            console.log('Aadhar data:', aadharData)
            console.log('Aadhar number:', aadharNumber)
            return aadharData.some(entry => entry.aadhar === aadharNumber)
        } catch (error) {
            console.error('Error checking Aadhar:', error)
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            try {
                const isValidAadhar = await validateAadhar(formData.aadhar)
                if (!isValidAadhar) {
                    setErrors(prev => ({
                        ...prev,
                        aadhar: 'Invalid Aadhar number. Please check and try again.'
                    }))
                    return
                }
                
                console.log('Form submitted:', {
                    ...formData,
                    userType,
                })
                if(userType === 'labour'){
                    router.push(`/register/labour?aadhar=${formData.aadhar}`)
                }
                
            } catch (error) {
                console.error('Registration error:', error)
                setErrors(prev => ({
                    ...prev,
                    aadhar: 'Error verifying Aadhar. Please try again later.'
                }))
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value === '' || /^\d+$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
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