import men from "../../../components/3men.jpg"
import Image from "next/image"
export default function Hero() {
    const popularSkills = ['web design', 'ui/ux design', 'databases', 'business cards'];

    return (
        <>
            <div className="hero w-full min-h-screen bg-gray-100 p-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Search Section */}
                    <div>
                        <h1 className="text-6xl font-bold text-gray-800 mb-6">
                            Find Your Skiled Viraje Saarthi
                        </h1>
                        
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search for any services..."
                                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500 pr-12"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex gap-3 items-center text-sm">
                            <span className="text-gray-600">Popular skills:</span>
                            <div className="flex flex-wrap gap-2">
                                {popularSkills.map((skill, index) => (
                                    <button
                                        key={index}
                                        className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative h-full flex items-center justify-center">
                        <Image
                            src={men}
                            alt="Freelancer working"
                            className="rounded-lg shadow-xl max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}