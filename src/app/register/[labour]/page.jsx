'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import api from '../../../api/postLabour'

export default function LabourRegistration() {
  const searchParams = useSearchParams()
  const aadharId = searchParams.get('aadhar')
  
  const [formData, setFormData] = useState({
    id: aadharId,
    name: '',
    age: '',
    skill: [],
    experience: '',
    min_salary: '',
    max_salary: '',
    location: ''
  })

  const [gender, setGender] = useState('male') // Added gender state but not included in formData
  const [newSkill, setNewSkill] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                placeholder="Add a skill"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSkillAdd}
                className="px-4 py-2 rounded-lg text-black font-semibold"
                style={{ backgroundColor: 'var(--primary-yellow-400)' }}
              >
                Add
              </motion.button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skill.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Minimum Salary
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                name="min_salary"
                value={formData.min_salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
                Maximum Salary
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                name="max_salary"
                value={formData.max_salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border-yellow-200)', '--tw-ring-color': 'var(--primary-yellow-400)' }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--text-gray-700)' }}>
              Location
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