import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const directServices = [
    { icon: "fas fa-spray-can", title: "Professional Carpet Cleaning", colorClass: "text-yellow-500" },
    { icon: "fas fa-wind", title: "Duct & Dryer Vent Cleaning", colorClass: "text-teal-500" },
    { icon: "fas fa-tint", title: "Deck Pressure Washing", colorClass: "text-indigo-500" },
    { icon: "fas fa-window-maximize", title: "Window Cleaning", colorClass: "text-orange-500" },
    { icon: "fas fa-solar-panel", title: "Solar Panel Drone Cleaning", colorClass: "text-lime-500" },
    { icon: "fas fa-clipboard-check", title: "Residential Assessments", colorClass: "text-pink-500" }
  ];

  const partnerServices = [
    { icon: "fas fa-fire-extinguisher", title: "Fire Protection Services", colorClass: "text-red-500" },
    { icon: "fas fa-wrench", title: "Plumbing", colorClass: "text-orange-400" },
    { icon: "fas fa-paint-roller", title: "Painting (Interior/Exterior)", colorClass: "text-violet-500" },
    { icon: "fas fa-thermometer-half", title: "HVAC Services", colorClass: "text-cyan-500" }
  ];

  return (
    <div className="min-h-screen bg-[#fff6e8] text-black relative overflow-hidden">
      {/* Font Awesome CDN */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      {/* Subtle background hues */}
      <div className="absolute inset-0 overflow-hidden z-0 -mb-220">
        <div className="absolute w-[700px] h-[700px] bg-yellow-200 opacity-10 rounded-full blur-3xl top-10 left-10" />
        <div className="absolute w-[900px] h-[900px] bg-yellow-300 opacity-10 rounded-full blur-3xl bottom-16 right-16" />
        <div className="absolute w-[1000px] h-[1000px] bg-yellow-100 opacity-10 rounded-full blur-3xl top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Navbar Logo */}
      <div className='navbar absolute top-12 left-12 w-20 cursor-pointer' onClick={() => router.push("/")}>
        <img src="/logo.png" />
      </div>

      <div className='absolute top-15 right-5 w-20 cursor-pointer'>
        <i className="fas fa-bars text-xl text-black"></i>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center min-h-screen px-4 py-16 mt-50">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-4 leading-snug">
            Busy Bee
            <br />
            <span className="text-yellow-600">Residential Services</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-md text-gray-600 mb-6 font-light mx-auto max-w-3xl">
            By popular demand, professional home maintenance services are expanding to residential clients. <br />
            With decades of experience delivering high-quality solutions in the commercial sector, we are now bringing the same professionalism, reliability, and results to your home.
          </p>

          {/* Badge */}
          <div className="inline-block mt-4 mb-10">
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-full text-xs/6 uppercase tracking-wider shadow-lg animate-pulse">
              Now Available
            </div>
          </div>

          {/* Services Section */}
          <div className="max-w-[1400px] mx-auto">

            {/* Direct Services */}
            <div className="text-center mt-12 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                Direct Residential Services
              </h2>
              <div className="w-40 h-0.75 bg-gradient-to-r from-orange-300 to-yellow-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-6 gap-4 max-w-full">
              {directServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/70 flex-column align-center justify-center backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-yellow-50 hover:backdrop-blur-md hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="text-center mb-1">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110">
                      <i className={`${service.icon} text-xl text-yellow-500`}></i>
                    </div>
                  </div>
                  <h3 className="text-xs text-gray-600 text-center leading-tight mt-2 font-bold">{service.title}</h3>
                </div>
              ))}
            </div>

            {/* Partner Services */}
            <div className="text-center mt-20 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                Certified Partner Services
              </h2>
              <div className="w-40 h-0.75 bg-gradient-to-r from-orange-300 to-yellow-400 mx-auto"></div>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {partnerServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-yellow-50 hover:backdrop-blur-md hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="text-center mb-1">
                    <div className="w-12 h-12 flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110">
                      <i className={`${service.icon} text-xl text-yellow-500`}></i>
                    </div>
                  </div>
                  <h3 className="text-xs text-gray-600 text-center leading-tight mt-2 font-bold">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-800 rounded-3xl p-6 md:p-10 mt-20 mb-12 shadow-sm text-center border border-yellow-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2">
              <i className="fas fa-tools text-yellow-500 text-xl pr-3"></i>
              <span className='text-gray-100'>Let Busy Bee simplify your home maintenance</span>
            </h2>
            <p className="text-base text-gray-300 mb-8">
              One solution. One team. One call.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
              <a 
                href="mailto:cbernard@busybee2000.com"
                className="group flex items-center justify-center gap-2 bg-white hover:bg-yellow-100 border border-yellow-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-envelope text-yellow-500 text-base"></i>
                cbernard@busybee2000.com
              </a>

              <a 
                href="tel:301-646-7020"
                className="group flex items-center justify-center gap-2 bg-white hover:bg-yellow-100 border border-yellow-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-phone text-black text-base"></i>
                301-646-7020
              </a>
            </div>
          </div>

        </div>
      </main>

      <footer>
        <div className='flex h-10 items-center justify-center text-center bg-yellow-100'>
          <p className='text-black text-sm'>© Copyright 2025: <span className='text-yellow-600 cursor-pointer' onClick={() => router.push("/")}>Busy Bee</span> All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
