'use client'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import labourApi from '../../api/postLabour'
import clientApi from '../../api/postClient'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [userType, setUserType] = useState('labour')
  const [formData, setFormData] = useState({
    aadhar: '',
    mobile: ''
  })
  const [errors, setErrors] = useState({
    aadhar: '',
    mobile: '',
    auth: ''
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { aadhar: '', mobile: '' }

    // Validate Aadhar Number
    if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar number must be exactly 12 digits'
      isValid = false
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const checkUserExists = async () => {
    try {
      const api = userType === 'labour' ? labourApi : clientApi
      const endpoint = userType === 'labour' ? '/labour' : '/cline'
      
      const response = await api.get(endpoint)
      const users = response.data
      
      const userExists = users.some(user => 
        user.id === formData.aadhar
      )

      return userExists
    } catch (error) {
      console.error('Authentication error:', error)
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const userExists = await checkUserExists()
        
        if (userExists) {
          // Redirect to appropriate dashboard
          router.push(`/dashboard/${userType}?aadhar=${formData.aadhar}`)
        } else {
          setErrors(prev => ({
            ...prev,
            auth: 'Invalid credentials. Please check your Aadhar number or register.'
          }))
        }
      } catch (error) {
        console.error('Login error:', error)
        setErrors(prev => ({
          ...prev,
          auth: 'Login failed. Please try again later.'
        }))
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    // Clear form data and errors when user type changes
    setFormData({
      aadhar: '',
      mobile: ''
    })
    setErrors({
      aadhar: '',
      mobile: '',
      auth: ''
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <nav className="flex justify-center space-x-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleUserTypeChange('labour')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              userType === 'labour'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={userType === 'labour' ? { backgroundColor: 'var(--primary-yellow-400)' } : {}}
          >
            Login as Labour
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleUserTypeChange('client')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              userType === 'client'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={userType === 'client' ? { backgroundColor: 'var(--primary-yellow-400)' } : {}}
          >
            Login as Client
          </motion.button>
        </nav>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-black)' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              Aadhar Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              maxLength={12}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
              placeholder="Enter 12 digit Aadhar number"
            />
            {errors.aadhar && <p className="text-red-500 text-xs mt-1">{errors.aadhar}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              Mobile Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
              placeholder="Enter 10 digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
          <div className='m-3 text-center' style={{ color: 'var(--text-gray-600)' }}>
            don't have an account?{' '}
            <Link href="/register" style={{ color: 'var(--primary-yellow-400)' }} className="hover:underline font-semibold">
              Signup
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-black font-semibold transition-colors duration-300"
            style={{ 
              backgroundColor: 'var(--primary-yellow-400)',
              hover: { backgroundColor: 'var(--primary-yellow-500)' }
            }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
      {errors.auth && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center mt-4 absolute bottom-4"
        >
          {errors.auth}
        </motion.p>
      )}
    </div>
  )
}