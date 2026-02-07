// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { ChevronLeft, ChevronRight } from 'lucide-react';
// // // // // import { Button } from './ui/button';

// // // // // const HeroSlider = ({ slides }) => {
// // // // //   const [currentSlide, setCurrentSlide] = useState(0);
// // // // //   const [isAnimating, setIsAnimating] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const timer = setInterval(() => {
// // // // //       handleNext();
// // // // //     }, 5000);
// // // // //     return () => clearInterval(timer);
// // // // //   }, [currentSlide]);

// // // // //   const handleNext = () => {
// // // // //     if (!isAnimating) {
// // // // //       setIsAnimating(true);
// // // // //       setCurrentSlide((prev) => (prev + 1) % slides.length);
// // // // //       setTimeout(() => setIsAnimating(false), 500);
// // // // //     }
// // // // //   };

// // // // //   const handlePrev = () => {
// // // // //     if (!isAnimating) {
// // // // //       setIsAnimating(true);
// // // // //       setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
// // // // //       setTimeout(() => setIsAnimating(false), 500);
// // // // //     }
// // // // //   };

// // // // //   const goToSlide = (index) => {
// // // // //     if (!isAnimating && index !== currentSlide) {
// // // // //       setIsAnimating(true);
// // // // //       setCurrentSlide(index);
// // // // //       setTimeout(() => setIsAnimating(false), 500);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="relative w-full h-[600px] overflow-hidden bg-black">
// // // // //       {slides.map((slide, index) => (
// // // // //         <div
// // // // //           key={slide.id}
// // // // //           className={`absolute inset-0 transition-all duration-700 ease-in-out ${
// // // // //             index === currentSlide
// // // // //               ? 'opacity-100 translate-x-0'
// // // // //               : index < currentSlide
// // // // //               ? 'opacity-0 -translate-x-full'
// // // // //               : 'opacity-0 translate-x-full'
// // // // //           }`}
// // // // //         >
// // // // //           <div
// // // // //             className="absolute inset-0 bg-cover bg-center"
// // // // //             style={{ backgroundImage: `url(${slide.image})` }}
// // // // //           >
// // // // //             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
// // // // //           </div>

// // // // //           <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
// // // // //             <div className="max-w-2xl space-y-6">
// // // // //               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in">
// // // // //                 {slide.title}
// // // // //               </h1>
// // // // //               <p className="text-xl md:text-2xl text-gray-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
// // // // //                 {slide.subtitle}
// // // // //               </p>
// // // // //               <Button
// // // // //                 className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in"
// // // // //                 style={{ animationDelay: '0.4s' }}
// // // // //               >
// // // // //                 {slide.cta}
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       ))}

// // // // //       {/* Navigation Buttons */}
// // // // //       <button
// // // // //         onClick={handlePrev}
// // // // //         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
// // // // //         aria-label="Previous slide"
// // // // //       >
// // // // //         <ChevronLeft size={28} />
// // // // //       </button>
// // // // //       <button
// // // // //         onClick={handleNext}
// // // // //         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
// // // // //         aria-label="Next slide"
// // // // //       >
// // // // //         <ChevronRight size={28} />
// // // // //       </button>

// // // // //       {/* Dots Indicator */}
// // // // //       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
// // // // //         {slides.map((_, index) => (
// // // // //           <button
// // // // //             key={index}
// // // // //             onClick={() => goToSlide(index)}
// // // // //             className={`transition-all duration-300 rounded-full ${
// // // // //               index === currentSlide
// // // // //                 ? 'bg-red-600 w-12 h-3'
// // // // //                 : 'bg-white/50 hover:bg-white/70 w-3 h-3'
// // // // //             }`}
// // // // //             aria-label={`Go to slide ${index + 1}`}
// // // // //           />
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HeroSlider;


// // // // import React, { useState, useEffect } from "react";
// // // // import { ChevronLeft, ChevronRight } from "lucide-react";
// // // // import { Button } from "./ui/button";

// // // // const HeroSlider = ({ slides = [] }) => {
// // // //   const [currentSlide, setCurrentSlide] = useState(0);
// // // //   const [isAnimating, setIsAnimating] = useState(false);

// // // //   /* ================= SAFETY GUARD ================= */
// // // //   if (!Array.isArray(slides) || slides.length === 0) {
// // // //     return (
// // // //       <div className="w-full h-[500px] bg-black flex items-center justify-center text-gray-400">
// // // //         Loading...
// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* ================= AUTO SLIDE ================= */
// // // //   useEffect(() => {
// // // //     const timer = setInterval(() => {
// // // //       handleNext();
// // // //     }, 5000);

// // // //     return () => clearInterval(timer);
// // // //     // eslint-disable-next-line
// // // //   }, [currentSlide]);

// // // //   const handleNext = () => {
// // // //     if (isAnimating) return;
// // // //     setIsAnimating(true);
// // // //     setCurrentSlide((prev) => (prev + 1) % slides.length);
// // // //     setTimeout(() => setIsAnimating(false), 600);
// // // //   };

// // // //   const handlePrev = () => {
// // // //     if (isAnimating) return;
// // // //     setIsAnimating(true);
// // // //     setCurrentSlide((prev) =>
// // // //       prev === 0 ? slides.length - 1 : prev - 1
// // // //     );
// // // //     setTimeout(() => setIsAnimating(false), 600);
// // // //   };

// // // //   const goToSlide = (index) => {
// // // //     if (index === currentSlide || isAnimating) return;
// // // //     setIsAnimating(true);
// // // //     setCurrentSlide(index);
// // // //     setTimeout(() => setIsAnimating(false), 600);
// // // //   };

// // // //   return (
// // // //     <div className="relative w-full h-[600px] overflow-hidden bg-black">

// // // //       {/* SLIDES */}
// // // //       {slides.map((slide, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className={`absolute inset-0 transition-opacity duration-700 ${
// // // //             index === currentSlide ? "opacity-100" : "opacity-0"
// // // //           }`}
// // // //         >
// // // //           <div
// // // //             className="absolute inset-0 bg-cover bg-center"
// // // //             style={{ backgroundImage: `url(${slide.image})` }}
// // // //           >
// // // //             <div className="absolute inset-0 bg-black/60" />
// // // //           </div>

// // // //           <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
// // // //             <div className="max-w-2xl space-y-6">
// // // //               <h1 className="text-4xl md:text-6xl font-bold text-white">
// // // //                 {slide.title}
// // // //               </h1>
// // // //               <p className="text-lg md:text-xl text-gray-200">
// // // //                 {slide.subtitle}
// // // //               </p>

// // // //               {slide.cta && (
// // // //                 <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 text-lg">
// // // //                   {slide.cta}
// // // //                 </Button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ))}

// // // //       {/* CONTROLS */}
// // // //       <button
// // // //         onClick={handlePrev}
// // // //         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// // // //       >
// // // //         <ChevronLeft size={28} />
// // // //       </button>

// // // //       <button
// // // //         onClick={handleNext}
// // // //         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// // // //       >
// // // //         <ChevronRight size={28} />
// // // //       </button>

// // // //       {/* DOTS */}
// // // //       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
// // // //         {slides.map((_, index) => (
// // // //           <button
// // // //             key={index}
// // // //             onClick={() => goToSlide(index)}
// // // //             className={`rounded-full transition-all ${
// // // //               index === currentSlide
// // // //                 ? "w-10 h-3 bg-red-600"
// // // //                 : "w-3 h-3 bg-white/50"
// // // //             }`}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HeroSlider;

// // // import React, { useEffect, useState } from "react";
// // // import { ChevronLeft, ChevronRight } from "lucide-react";
// // // import { Button } from "./ui/button";

// // // const HeroSlider = ({ slides }) => {
// // //   /* ================= STATE ================= */
// // //   const safeSlides = Array.isArray(slides) ? slides : [];

// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [isAnimating, setIsAnimating] = useState(false);

// // //   /* ================= AUTO PLAY ================= */
// // //   useEffect(() => {
// // //     if (safeSlides.length === 0) return;

// // //     const timer = setInterval(() => {
// // //       handleNext();
// // //     }, 5000);

// // //     return () => clearInterval(timer);
// // //     // eslint-disable-next-line
// // //   }, [currentSlide, safeSlides.length]);

// // //   /* ================= HANDLERS ================= */
// // //   const handleNext = () => {
// // //     if (isAnimating || safeSlides.length === 0) return;
// // //     setIsAnimating(true);
// // //     setCurrentSlide((prev) => (prev + 1) % safeSlides.length);
// // //     setTimeout(() => setIsAnimating(false), 600);
// // //   };

// // //   const handlePrev = () => {
// // //     if (isAnimating || safeSlides.length === 0) return;
// // //     setIsAnimating(true);
// // //     setCurrentSlide((prev) =>
// // //       prev === 0 ? safeSlides.length - 1 : prev - 1
// // //     );
// // //     setTimeout(() => setIsAnimating(false), 600);
// // //   };

// // //   const goToSlide = (index) => {
// // //     if (isAnimating || index === currentSlide) return;
// // //     setIsAnimating(true);
// // //     setCurrentSlide(index);
// // //     setTimeout(() => setIsAnimating(false), 600);
// // //   };

// // //   /* ================= FALLBACK UI ================= */
// // //   if (safeSlides.length === 0) {
// // //     return (
// // //       <div className="w-full h-[500px] bg-black flex items-center justify-center text-gray-400">
// // //         Loading banner...
// // //       </div>
// // //     );
// // //   }

// // //   /* ================= UI ================= */
// // //   return (
// // //     <div className="relative w-full h-[600px] overflow-hidden bg-black">
// // //       {safeSlides.map((slide, index) => (
// // //         <div
// // //           key={index}
// // //           className={`absolute inset-0 transition-opacity duration-700 ${
// // //             index === currentSlide ? "opacity-100" : "opacity-0"
// // //           }`}
// // //         >
// // //           <div
// // //             className="absolute inset-0 bg-cover bg-center"
// // //             style={{ backgroundImage: `url(${slide.image})` }}
// // //           >
// // //             <div className="absolute inset-0 bg-black/60" />
// // //           </div>

// // //           <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
// // //             <div className="max-w-2xl space-y-6">
// // //               <h1 className="text-4xl md:text-6xl font-bold text-white">
// // //                 {slide.title}
// // //               </h1>
// // //               <p className="text-lg md:text-xl text-gray-200">
// // //                 {slide.subtitle}
// // //               </p>

// // //               {slide.cta && (
// // //                 <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 text-lg">
// // //                   {slide.cta}
// // //                 </Button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ))}

// // //       {/* NAVIGATION */}
// // //       <button
// // //         onClick={handlePrev}
// // //         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// // //       >
// // //         <ChevronLeft size={28} />
// // //       </button>

// // //       <button
// // //         onClick={handleNext}
// // //         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// // //       >
// // //         <ChevronRight size={28} />
// // //       </button>

// // //       {/* DOTS */}
// // //       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
// // //         {safeSlides.map((_, index) => (
// // //           <button
// // //             key={index}
// // //             onClick={() => goToSlide(index)}
// // //             className={`rounded-full transition-all ${
// // //               index === currentSlide
// // //                 ? "w-10 h-3 bg-red-600"
// // //                 : "w-3 h-3 bg-white/50"
// // //             }`}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HeroSlider;

// // import React, { useEffect, useState } from "react";
// // import { ChevronLeft, ChevronRight } from "lucide-react";
// // import { Button } from "./ui/button";

// // /* ✅ FALLBACK SLIDES (NO BRAND LOGOS – INTERNET IMAGES) */
// // const DEFAULT_SLIDES = [
// //   {
// //     title: "Premium Truck & Tractor Parts",
// //     subtitle: "Reliable spare parts delivered fast across Canada",
// //     image:
// //       "https://images.unsplash.com/photo-1617886322168-72b886573c6c",
// //     cta: "Browse Parts",
// //   },
// //   {
// //     title: "Built for Heavy Duty Performance",
// //     subtitle: "Quality you can trust for long-term operations",
// //     image:
// //       "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9",
// //     cta: "Explore Catalog",
// //   },
// //   {
// //     title: "Fast Delivery & Expert Support",
// //     subtitle: "Right part. Right time. Every time.",
// //     image:
// //       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7",
// //     cta: "Contact Support",
// //   },
// // ];

// // const HeroSlider = ({ slides }) => {
// //   /* ================= SAFE SLIDES ================= */
// //   const safeSlides =
// //     Array.isArray(slides) && slides.length > 0
// //       ? slides
// //       : DEFAULT_SLIDES;

// //   /* ================= STATE ================= */
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [isAnimating, setIsAnimating] = useState(false);

// //   /* ================= AUTO PLAY ================= */
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       handleNext();
// //     }, 5000);

// //     return () => clearInterval(timer);
// //     // eslint-disable-next-line
// //   }, [currentSlide]);

// //   /* ================= HANDLERS ================= */
// //   const handleNext = () => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setCurrentSlide((prev) => (prev + 1) % safeSlides.length);
// //     setTimeout(() => setIsAnimating(false), 600);
// //   };

// //   const handlePrev = () => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setCurrentSlide((prev) =>
// //       prev === 0 ? safeSlides.length - 1 : prev - 1
// //     );
// //     setTimeout(() => setIsAnimating(false), 600);
// //   };

// //   const goToSlide = (index) => {
// //     if (isAnimating || index === currentSlide) return;
// //     setIsAnimating(true);
// //     setCurrentSlide(index);
// //     setTimeout(() => setIsAnimating(false), 600);
// //   };

// //   /* ================= UI ================= */
// //   return (
// //     <div className="relative w-full h-[600px] overflow-hidden bg-black">
// //       {safeSlides.map((slide, index) => (
// //         <div
// //           key={index}
// //           className={`absolute inset-0 transition-opacity duration-700 ${
// //             index === currentSlide ? "opacity-100" : "opacity-0"
// //           }`}
// //         >
// //           <div
// //             className="absolute inset-0 bg-cover bg-center"
// //             style={{ backgroundImage: `url(${slide.image})` }}
// //           >
// //             <div className="absolute inset-0 bg-black/60" />
// //           </div>

// //           <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
// //             <div className="max-w-2xl space-y-6">
// //               <h1 className="text-4xl md:text-6xl font-bold text-white">
// //                 {slide.title}
// //               </h1>
// //               <p className="text-lg md:text-xl text-gray-200">
// //                 {slide.subtitle}
// //               </p>

// //               {slide.cta && (
// //                 <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 text-lg">
// //                   {slide.cta}
// //                 </Button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       ))}

// //       {/* NAVIGATION */}
// //       <button
// //         onClick={handlePrev}
// //         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// //       >
// //         <ChevronLeft size={28} />
// //       </button>

// //       <button
// //         onClick={handleNext}
// //         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
// //       >
// //         <ChevronRight size={28} />
// //       </button>

// //       {/* DOTS */}
// //       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
// //         {safeSlides.map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => goToSlide(index)}
// //             className={`rounded-full transition-all ${
// //               index === currentSlide
// //                 ? "w-10 h-3 bg-red-600"
// //                 : "w-3 h-3 bg-white/50"
// //             }`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeroSlider;

// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";

// /* ✅ FALLBACK SLIDES — VEHICLE RELATED, NO LOGOS */
// const DEFAULT_SLIDES = [
//   {
//     title: "Premium Truck & Tractor Parts",
//     subtitle: "Reliable spare parts delivered fast across Canada",
//     image:
//       "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
//     cta: "Browse Parts",
//   },
//   {
//     title: "Built for Heavy Duty Performance",
//     subtitle: "Engineered parts for long-haul and farm equipment",
//     image:
//       "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
//     cta: "Explore Catalog",
//   },
//   {
//     title: "Fast Delivery & Expert Support",
//     subtitle: "Right part. Right time. Every time.",
//     image:
//       "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
//     cta: "Contact Support",
//   },
// ];

// const HeroSlider = ({ slides }) => {
//   /* ================= SAFE SLIDES ================= */
//   const safeSlides =
//     Array.isArray(slides) && slides.length > 0 ? slides : DEFAULT_SLIDES;

//   /* ================= STATE ================= */
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   /* ================= AUTO PLAY ================= */
//   useEffect(() => {
//     const timer = setInterval(() => {
//       handleNext();
//     }, 5000);

//     return () => clearInterval(timer);
//     // eslint-disable-next-line
//   }, [currentSlide]);

//   /* ================= HANDLERS ================= */
//   const handleNext = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentSlide((prev) => (prev + 1) % safeSlides.length);
//     setTimeout(() => setIsAnimating(false), 600);
//   };

//   const handlePrev = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentSlide((prev) =>
//       prev === 0 ? safeSlides.length - 1 : prev - 1
//     );
//     setTimeout(() => setIsAnimating(false), 600);
//   };

//   const goToSlide = (index) => {
//     if (isAnimating || index === currentSlide) return;
//     setIsAnimating(true);
//     setCurrentSlide(index);
//     setTimeout(() => setIsAnimating(false), 600);
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="relative w-full h-[600px] overflow-hidden bg-black">
//       {safeSlides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: `url(${slide.image})` }}
//           >
//             <div className="absolute inset-0 bg-black/60" />
//           </div>

//           <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
//             <div className="max-w-2xl space-y-6">
//               <h1 className="text-4xl md:text-6xl font-bold text-white">
//                 {slide.title}
//               </h1>
//               <p className="text-lg md:text-xl text-gray-200">
//                 {slide.subtitle}
//               </p>

//               {slide.cta && (
//                 <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 text-lg">
//                   {slide.cta}
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* NAVIGATION */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
//       >
//         <ChevronLeft size={28} />
//       </button>

//       <button
//         onClick={handleNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
//       >
//         <ChevronRight size={28} />
//       </button>

//       {/* DOTS */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//         {safeSlides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`rounded-full transition-all ${
//               index === currentSlide
//                 ? "w-10 h-3 bg-red-600"
//                 : "w-3 h-3 bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroSlider;

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

/* ✅ FALLBACK SLIDES (NO LOGOS – HEAVY DUTY / TRACTOR / PARTS IMAGES) */
const DEFAULT_SLIDES = [
  {
    title: "Premium Truck & Tractor Parts",
    subtitle: "Reliable spare parts delivered fast across Canada",
    image:
      "https://img.freepik.com/premium-photo/closeup-black-truck-isolated-dark-background-banner_110488-4193.jpg",
    cta: "Browse Parts",
  },
  {
    title: "Heavy Duty Pickup & Commercial Trucks",
    subtitle: "Built to handle the toughest jobs on the road",
    image:
      "https://img.pikbest.com/wp/202347/pickup-truck-sleek-black-against-a-dark-background-digitally-rendered_9756711.jpg!w700wp",
    cta: "Explore Catalog",
  },
  {
    title: "Tractor & Agricultural Components",
    subtitle: "Powering farms with durable and reliable parts",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-a-tractor-is-prominently-displayed-against-dark-background-highlighting-its-features-image_16165261.jpg",
    cta: "View Tractor Parts",
  },
];

const HeroSlider = ({ slides }) => {
  /* ================= SAFE SLIDES ================= */
  const safeSlides =
    Array.isArray(slides) && slides.length > 0
      ? slides
      : DEFAULT_SLIDES;

  /* ================= STATE ================= */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /* ================= AUTO PLAY ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [currentSlide]);

  /* ================= HANDLERS ================= */
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % safeSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) =>
      prev === 0 ? safeSlides.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  /* ================= UI ================= */
  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      {safeSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                {slide.subtitle}
              </p>

              {slide.cta && (
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 text-lg">
                  {slide.cta}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* NAVIGATION */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-20"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {safeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide
                ? "w-10 h-3 bg-red-600"
                : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;