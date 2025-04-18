'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const data = [
        {
            heading: "3D ARTIST",
            description: "Specializing in game design, environment art, and creative 3D modeling",
            imageUrl: "/assets/images/3d-artist.jpg"
        },
        {
            heading: "VIDEO EXPLAINER",
            description: "Creating engaging animated and live-action explainer videos",
            imageUrl: "/assets/images/video-explainer.jpg"
        },
        {
            heading: "GRAPHIC DESIGN",
            description: "Professional graphic design solutions for all your creative needs",
            imageUrl: "/assets/images/graphic-design.jpg"
        },
        {
            heading: "DIGITAL MARKETING",
            description: "Comprehensive digital marketing strategies to grow your business",
            imageUrl: "/assets/images/digital-marketing.jpg"
        },
        {
            heading: "DIGITAL MARKETING",
            description: "Comprehensive digital marketing strategies to grow your business",
            imageUrl: "/assets/images/digital-marketing.jpg"
        },
        {
            heading: "DIGITAL MARKETING",
            description: "Comprehensive digital marketing strategies to grow your business",
            imageUrl: "/assets/images/digital-marketing.jpg"
        },
        {
            heading: "DIGITAL MARKETING",
            description: "Comprehensive digital marketing strategies to grow your business",
            imageUrl: "/assets/images/digital-marketing.jpg"
        },
        {
            heading: "DIGITAL MARKETING",
            description: "Comprehensive digital marketing strategies to grow your business",
            imageUrl: "/assets/images/digital-marketing.jpg"
        },
    ];

    // useEffect(() => {
    //     const timer = setInterval(nextSlide, 3000);
    //     return () => clearInterval(timer);
    // }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="relative overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                >
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="w-[80%] flex-shrink-0 "
                        >
                            <div className='grid grid-cols-2 w-[22.4375rem] '>
                                <div className='w-[22.4375rem] h-[22.4375rem]'>
                                    <Image herf={item.Image} />
                                </div>
                                <div className='w-[22.4375rem] h-[22.4375rem]'>
                                    <h2 className="text-3xl font-semibold mb-2">{item.heading}</h2>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-4 rounded-r-lg transition-colors"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-4 rounded-l-lg transition-colors"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Existing dot navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {data.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                currentIndex === index 
                                    ? 'bg-blue-500' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}