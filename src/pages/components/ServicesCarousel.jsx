import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ServicesCarousel = ({directServices}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsToShow = 3;
  const totalItems = directServices.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-screen max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {directServices.map((service, index) => (
            <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsToShow}%` }}
            >
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:border-yellow-500/20 cursor-pointer group h-full flex flex-col">
                
                {/* Image */}
                <div className="h-52 w-full overflow-hidden">
                    <img
                    src={`/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    />
                </div>

                {/* Icon and title */}
                <div className="flex-1 p-4 flex flex-col justify-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110">
                    <i className={`${service.icon} text-xl ${service.colorClass}`} />
                    </div>
                    <h3 className="text-sm text-gray-300 font-medium leading-tight group-hover:text-white transition-colors duration-300">
                    {service.title}
                    </h3>
                </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/30 hover:border-yellow-500/30 rounded-full flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100 backdrop-blur-sm"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/30 hover:border-yellow-500/30 rounded-full flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100 backdrop-blur-sm"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-yellow-400 w-4'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;