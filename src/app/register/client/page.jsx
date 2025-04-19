'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '../../../api/postClient'

export default function ClientRegistration() {
  const searchParams = useSearchParams()
  const aadharId = searchParams.get('aadhar')
  
  const [formData, setFormData] = useState({
    id: aadharId,
    name: '',
    email: ''
  })
  const [gender, setGender] = useState('male') // Added gender state

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/cline', formData)
      alert('Client registration successful!')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: 'var(--primary-yellow-50)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-black)' }}>Client Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="other"
                    checked={gender === 'other'}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-yellow-400 border-gray-300 focus:ring-yellow-400"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-black font-semibold transition-colors duration-300 mt-6"
            style={{ 
              backgroundColor: 'var(--primary-yellow-400)',
              hover: { backgroundColor: 'var(--primary-yellow-500)' }
            }}
          >
            Complete Registration
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}