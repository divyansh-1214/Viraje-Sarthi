'use client';

import { motion } from 'framer-motion';
import { FaTools, FaSearch, FaHandshake, FaStar } from 'react-icons/fa';
import { MdElectricBolt, MdPlumbing, MdBrush } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../components/logo.jpg"
export default function Home() {
  const services = [
    { icon: <MdElectricBolt className="text-4xl" />, title: 'Electricians', description: 'Professional electrical services for your home and business' },
    { icon: <MdPlumbing className="text-4xl" />, title: 'Plumbers', description: 'Expert plumbing solutions for all your needs' },
    { icon: <MdBrush className="text-4xl" />, title: 'Painters', description: 'Quality painting services to transform your space' },
  ];

  const features = [
    { icon: <FaSearch className="text-2xl" />, title: 'Easy Search', description: 'Find skilled professionals in your area' },
    { icon: <FaStar className="text-2xl" />, title: 'Verified Reviews', description: 'Read genuine reviews from previous clients' },
    { icon: <FaHandshake className="text-2xl" />, title: 'Secure Payments', description: 'Safe and secure payment system' },
  ];

  return (
    <main className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <Image
                src={logo}
                alt="Viraj Saarthi Services"
                width={200}
                height={200}
                priority
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">Find Skilled Laborers Near You</h1>
            <p className="text-xl mb-8">Connect with professional electricians, plumbers, painters, and more for your home and business needs</p>
            <div className="flex justify-center gap-4">
              <button className="bg-black text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
                <Link href="/home">
                  Find a Saarthi
                </Link>
              </button>
              <button className="border-2 border-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-yellow-400 transition">
                <Link href="/login">
                  Join as a Saarthi
                </Link>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-yellow-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-yellow-200"
              >
                <div className="text-yellow-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-yellow-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-yellow-400 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers and professionals</p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition">
            <Link href="/login">
              Sign Up Now
            </Link>
          </button>
        </div>
      </section>
    </main>
  );
}
