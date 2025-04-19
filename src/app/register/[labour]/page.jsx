'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '../../../api/postLabour'

export default function LabourRegistration() {
  const searchParams = useSearchParams()
  const aadharId = searchParams.get('aadhar')
  
  // Update initial state
  const [formData, setFormData] = useState({
    id: aadharId,
    name: '',
    age: '',
    skill: '',
    experience: '',
    address: '',
    location: ''
  })
  
  // Remove newSkill state and related handlers
  const [gender, setGender] = useState('male')
  
  // Remove these handlers as they're no longer needed
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Remove handleSkillAdd and removeSkill functions

  const handleSkillAdd = () => {
    if (newSkill && !formData.skill.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skill: [...prev.skill, newSkill]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skill: prev.skill.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/labour', formData)
      alert('Registration successful!')
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
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-black)' }}>Labour Registration</h2>
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
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Age
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Experience (years)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              Skills (comma separated)
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
              placeholder="e.g. Painting, Carpentry, Electrical Work"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              your current address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              Enter your Preferred Location
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
              required
            />
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