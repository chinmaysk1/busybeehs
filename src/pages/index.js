import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ServicesCarousel from './components/ServicesCarousel';

export default function Home() {
  const router = useRouter();

  const directServices = [
    { icon: "fas fa-spray-can", title: "Professional Carpet Cleaning", colorClass: "text-yellow-500", image: "carpet.jpg" },
    { icon: "fas fa-wind", title: "Duct & Dryer Vent Cleaning", colorClass: "text-teal-500", image: "vent.webp"},
    { icon: "fas fa-tint", title: "Deck Pressure Washing", colorClass: "text-indigo-500", image: "pressure.jpg" },
    { icon: "fas fa-window-maximize", title: "Window Cleaning", colorClass: "text-blue-700", image: "window.jpg" },
    { icon: "fas fa-solar-panel", title: "Solar Panel Drone Cleaning", colorClass: "text-lime-500", image: "drone.png" },
    { icon: "fas fa-clipboard-check", title: "Residential Assessments", colorClass: "text-pink-500", image: "assessment.jpg" }
  ];

  const partnerServices = [
    { icon: "fas fa-fire-extinguisher", title: "Fire Protection Services", colorClass: "text-red-500", image: "fire.jpg" },
    { icon: "fas fa-wrench", title: "Plumbing", colorClass: "text-orange-400", image: "plumbing.jpg" },
    { icon: "fas fa-paint-roller", title: "Painting (Interior/Exterior)", colorClass: "text-white", image: "painting.jpg" },
    { icon: "fas fa-thermometer-half", title: "HVAC Services", colorClass: "text-cyan-500", image: "hvac.jpg" }
  ];

  function VideoBackground() {
    const videos = ['/1.mp4', '/2.mp4', '/3.mp4'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = [useRef(null), useRef(null), useRef(null)];
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeVideos = useCallback(async () => {
      // Set video sources and load all videos
      const loadPromises = videos.map((videoSrc, index) => {
        const video = videoRefs[index].current;
        if (!video) return Promise.resolve();
        
        video.src = videoSrc;
        return new Promise(resolve => {
          video.addEventListener('loadeddata', resolve, { once: true });
          video.load();
        });
      });

      await Promise.all(loadPromises);

      // Start the first video
      try {
        const firstVideo = videoRefs[0].current;
        if (firstVideo) {
          await firstVideo.play();
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Video autoplay failed:', err);
      }
    }, [videos, videoRefs]);

    useEffect(() => {
      initializeVideos();
    }, [initializeVideos]);

    const handleVideoTransition = useCallback(() => {
      if (!isInitialized) return;

      const currentVideo = videoRefs[currentIndex].current;
      const nextIndex = (currentIndex + 1) % videos.length;
      const nextVideo = videoRefs[nextIndex].current;

      if (!currentVideo || !nextVideo) return;
      
      const timeRemaining = currentVideo.duration - currentVideo.currentTime;
      
      // Start transition 0.5 seconds before current video ends
      if (timeRemaining <= 0.5) {
        // Prepare next video to start from beginning
        nextVideo.currentTime = 0;
        
        // Start playing next video
        nextVideo.play().then(() => {
          // Smooth transition using opacity
          setTimeout(() => {
            setCurrentIndex(nextIndex);
            
            // Pause the previous video after transition
            setTimeout(() => {
              currentVideo.pause();
              currentVideo.currentTime = 0; // Reset for next cycle
            }, 1000); // Wait for opacity transition to complete
          }, 50); // Small delay to ensure next video is playing
        }).catch(err => {
          console.error('Video transition failed:', err);
        });
      }
    }, [currentIndex, isInitialized, videos.length, videoRefs]);

    useEffect(() => {
      if (!isInitialized) return;

      const currentVideo = videoRefs[currentIndex].current;
      
      // Use both timeupdate and a backup interval for reliability
      const intervalId = setInterval(handleVideoTransition, 100);
      if (currentVideo) {
        currentVideo.addEventListener('timeupdate', handleVideoTransition);
      }

      // Cleanup
      return () => {
        clearInterval(intervalId);
        if (currentVideo) {
          currentVideo.removeEventListener('timeupdate', handleVideoTransition);
        }
      };
    }, [handleVideoTransition, currentIndex, isInitialized, videoRefs]);

    // Handle video end as backup
    useEffect(() => {
      if (!isInitialized) return;

      const currentVideo = videoRefs[currentIndex].current;
      
      const handleVideoEnd = () => {
        const nextIndex = (currentIndex + 1) % videos.length;
        const nextVideo = videoRefs[nextIndex].current;
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play();
          setCurrentIndex(nextIndex);
        }
      };

      if (currentVideo) {
        currentVideo.addEventListener('ended', handleVideoEnd);
        return () => currentVideo.removeEventListener('ended', handleVideoEnd);
      }
    }, [currentIndex, isInitialized, videos.length, videoRefs]);

    return (
      <div className="absolute inset-0">
        {videos.map((_, i) => (
          <video
            key={i}
            ref={videoRefs[i]}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            muted
            playsInline
            preload="metadata"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6e8] text-black relative overflow-hidden">
      {/* Font Awesome CDN */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      {/* Hero Section with Parallax Background */}
      <section className="relative h-screen bg-black overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <VideoBackground />
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-15 z-10 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-10" />

        {/* Navbar */}
        <div className='navbar absolute top-12 left-12 w-20 cursor-pointer z-20' onClick={() => router.push("/")}>
          <Image src="/logo.png" alt="Busy Bee Logo" width={80} height={80} />
        </div>

        <div className='absolute top-15 right-5 w-20 cursor-pointer z-20'>
          <i className="fas fa-bars text-xl text-white"></i>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-full px-4 mt-12">
          <div className="max-w-5xl mx-auto text-center transition-all duration-1000 opacity-100 translate-y-0">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg leading-17.5">
              Busy Bee
              <br />
              <span className="text-yellow-600">Home Services</span>
            </h1>
            <p className="text-base md:text-md text-gray-300 mb-6 font-light mx-auto max-w-3xl drop-shadow-md">
              By popular demand, professional home maintenance services are expanding to residential clients. <br />
              With decades of experience delivering high-quality solutions in the commercial sector, we are now bringing the same <span className='text-yellow-600'>professionalism</span>, <span className='text-yellow-600'>reliability</span>, and <span className='text-yellow-600'>results</span> to your home.
            </p>
            <div className="inline-block mt-4 mb-10">
              <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 text-black px-8 py-3 rounded-full text-xs/6 uppercase tracking-wider shadow-lg animate-pulse">
                Now Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-screen bg-[#000] relative">
        <div className="relative z-10 px-4 py-16">
          <div className="mx-auto">
            {/* Services Section */}
            <div className="mx-auto">

              {/* Direct Services */}
              <div className="text-center mb-12 -mt-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-2 flex items-center justify-center gap-3">
                  The Hive of Home Help 
                </h2>
                <p className="text-base text-gray-300 text-center max-w-2xl mx-auto leading-5 mt-5">
                  Whether it&apos;s carpets, windows, vents or more, we deliver dependable service with professional results—so you never have to worry about the details.
                </p>
                <div className="mt-8 w-30 h-0.75 bg-gradient-to-r from-orange-300 to-yellow-400 mx-auto"></div>
              </div>

              <ServicesCarousel directServices={directServices}/>

              {/* Filler Video Section */}
              <section className="w-[100vw] relative h-[100vh] bg-black overflow-hidden my-20">
                <div className="absolute inset-0 bg-black/30 z-10" />
                {/* Centered Hero Text */}
                <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
                  <h2 className="text-white text-shadow-md text-2xl sm:text-xl md:text-4xl font-bold leading-snug max-w-4xl">
                    Together, We <span className='text-yellow-500 text-shadow-lg'>Bring Your Home to Life</span> — With Professional Results That Make Every Room Safer, Cleaner, and More Comfortable.
                  </h2>
                </div>
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/filler.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                
                {/* Top fade: black → transparent */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

                {/* Bottom fade: transparent → black */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
              </section>

              {/* Partner Services */}
              <div className="text-center mb-12 -mt-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-2 flex items-center justify-center gap-3">
                  More Than Just Cleaning
                </h2>
                <p className="text-base text-gray-300 text-center max-w-2xl mx-auto leading-5 mt-5">
                  We&apos;ve built a vetted team of expert partners to deliver essential home services — so you don&apos;t have to chase down separate vendors ever again.
                </p>
                <div className="mt-8 w-30 h-0.75 bg-gradient-to-r from-orange-300 to-yellow-400 mx-auto"></div>
              </div>
            </div>

            <ServicesCarousel directServices={partnerServices} />

            {/* Call to Action */}
            <div className="w-[80vw] mx-auto bg-gray-900/60 backdrop-blur-sm border border-gray-700/20 rounded-2xl p-8 md:p-12 mt-30 mb-20 text-center">
              <h2 className="text-xl md:text-2xl font-medium text-gray-100 mb-3 flex justify-center items-center gap-3">
                <i className="fas fa-tools text-yellow-400/80 text-lg"></i>
                <span>Let Busy Bee simplify your home maintenance</span>
              </h2>
              <p className="text-sm text-gray-400 mb-10 font-light">
                One solution. One team. One call.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 text-sm">
                <a 
                  href="mailto:cbernard@busybee2000.com"
                  className="group flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/30 hover:border-yellow-400/20 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-normal transition-all duration-300 backdrop-blur-sm"
                >
                  <i className="fas fa-envelope text-yellow-400/70 group-hover:text-yellow-400 text-sm transition-colors duration-300"></i>
                  cbernard@busybee2000.com
                </a>

                <a 
                  href="tel:301-646-7020"
                  className="group flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/30 hover:border-yellow-400/20 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-normal transition-all duration-300 backdrop-blur-sm"
                >
                  <i className="fas fa-phone text-yellow-400/70 group-hover:text-yellow-400 text-sm transition-colors duration-300"></i>
                  301-646-7020
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className='flex h-10 items-center justify-center text-center bg-gray-950'>
          <p className='text-gray-100 text-sm'>© Copyright 2025: <span className='text-yellow-700 font-bold cursor-pointer' onClick={() => router.push("/")}>Busy Bee</span> All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}