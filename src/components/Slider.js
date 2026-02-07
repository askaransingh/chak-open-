// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import "./Slider.css";

// // // // // // // // const slides = [
// // // // // // // //   {
// // // // // // // //     image: "https://images.unsplash.com/photo-1601933470928-c89af4b0b33e",
// // // // // // // //     title: "Premium Truck Parts",
// // // // // // // //     subtitle: "Reliable Quality for Every Journey",
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     image: "https://images.unsplash.com/photo-1610391427871-6b9b0dcaa09e",
// // // // // // // //     title: "Trusted by Mechanics",
// // // // // // // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
// // // // // // // //     title: "Nationwide Delivery",
// // // // // // // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     image: "https://images.unsplash.com/photo-1618835962143-7db9b9c7e6d4",
// // // // // // // //     title: "Your Truck’s Perfect Match",
// // // // // // // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // // // // // // //   },
// // // // // // // // ];

// // // // // // // // export default function Slider() {
// // // // // // // //   const [current, setCurrent] = useState(0);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const timer = setInterval(() => {
// // // // // // // //       setCurrent((prev) => (prev + 1) % slides.length);
// // // // // // // //     }, 5000); // changes every 5 seconds
// // // // // // // //     return () => clearInterval(timer);
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <div className="slider-container">
// // // // // // // //       {slides.map((slide, index) => (
// // // // // // // //         <div
// // // // // // // //           key={index}
// // // // // // // //           className={`slide ${index === current ? "active" : ""}`}
// // // // // // // //           style={{ backgroundImage: `url(${slide.image})` }}
// // // // // // // //         >
// // // // // // // //           <div className="overlay" />
// // // // // // // //           <div className="text-box">
// // // // // // // //             <h1>{slide.title}</h1>
// // // // // // // //             <p>{slide.subtitle}</p>
// // // // // // // //             <button className="explore-btn">Explore Now</button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       ))}

// // // // // // // //       <div className="dots">
// // // // // // // //         {slides.map((_, index) => (
// // // // // // // //           <span
// // // // // // // //             key={index}
// // // // // // // //             className={`dot ${index === current ? "active" : ""}`}
// // // // // // // //             onClick={() => setCurrent(index)}
// // // // // // // //           ></span>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import "./Slider.css";

// // // // // // // const slides = [
// // // // // // //   {
// // // // // // //     image: "https://i.pinimg.com/736x/0c/44/b4/0c44b4105ac123a91b26f67980f5055a.jpg",
// // // // // // //     title: "Premium Truck Parts",
// // // // // // //     subtitle: "Reliable Quality for Every Journey",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     image: "https://i.pinimg.com/1200x/dd/ee/1c/ddee1c1ca3c0e399ffd444d8107b07a5.jpg",
// // // // // // //     title: "Trusted by Mechanics",
// // // // // // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     image: "https://i.pinimg.com/1200x/5c/e5/72/5ce572c957f88c097a03065c8d73e8c8.jpg",
// // // // // // //     title: "Nationwide Delivery",
// // // // // // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // // // // // //   },
// // // // // // //   {
// // // // // // //     image: "https://images.unsplash.com/photo-1618835962143-7db9b9c7e6d4",
// // // // // // //     title: "Your Truck’s Perfect Match",
// // // // // // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // // // // // //   },
// // // // // // // ];



// // // // // // // export default function Slider() {
// // // // // // //   const [current, setCurrent] = useState(0);

// // // // // // //   useEffect(() => {
// // // // // // //     const timer = setInterval(() => {
// // // // // // //       setCurrent((prev) => (prev + 1) % slides.length);
// // // // // // //     }, 5000); // Change every 5 seconds
// // // // // // //     return () => clearInterval(timer);
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="slider-container" >
        
// // // // // // //       {slides.map((slide, index) => (
// // // // // // //         <div
// // // // // // //           key={index}
// // // // // // //           className={`slide ${index === current ? "active" : ""}`}
// // // // // // //           style={{ backgroundImage: `url(${slide.image})` }}
// // // // // // //         >
// // // // // // //           <div className="overlay" />
// // // // // // //           <div className="text-box">
// // // // // // //             <h1>{slide.title}</h1>
// // // // // // //             <p>{slide.subtitle}</p>
// // // // // // //             <button className="explore-btn">Explore Now</button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       ))}

// // // // // // //       <div className="dots">
// // // // // // //         {slides.map((_, index) => (
// // // // // // //           <span
// // // // // // //             key={index}
// // // // // // //             className={`dot ${index === current ? "active" : ""}`}
// // // // // // //             onClick={() => setCurrent(index)}
// // // // // // //           ></span>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import "./Slider.css";

// // // // // // const slides = [
// // // // // //   {
// // // // // //     image: "https://i.pinimg.com/736x/35/dc/b5/35dcb5523dda1c4860d4dcf80861ee9d.jpg",
// // // // // //     title: "Premium Truck Parts",
// // // // // //     subtitle: "Reliable Quality for Every Journey",
// // // // // //   },
// // // // // //   {
// // // // // //     image: "https://i.pinimg.com/1200x/dd/ee/1c/ddee1c1ca3c0e399ffd444d8107b07a5.jpg",
// // // // // //     title: "Trusted by Mechanics",
// // // // // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // // // // //   },
// // // // // //   {
// // // // // //     image: "https://i.pinimg.com/1200x/5c/e5/72/5ce572c957f88c097a03065c8d73e8c8.jpg",
// // // // // //     title: "Nationwide Delivery",
// // // // // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // // // // //   },
// // // // // //   {
// // // // // //     image: "https://i.pinimg.com/1200x/dd/ee/1c/ddee1c1ca3c0e399ffd444d8107b07a5.jpg",
// // // // // //     title: "Your Truck’s Perfect Match",
// // // // // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // // // // //   },
// // // // // // ];

// // // // // // export default function Slider() {
// // // // // //   const [current, setCurrent] = useState(0);

// // // // // //   useEffect(() => {
// // // // // //     const timer = setInterval(() => {
// // // // // //       setCurrent((prev) => (prev + 1) % slides.length);
// // // // // //     }, 5000);
// // // // // //     return () => clearInterval(timer);
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div className="slider-container">
// // // // // //       {slides.map((slide, index) => (
// // // // // //         <div
// // // // // //           key={index}
// // // // // //           className={`slide ${index === current ? "active" : ""}`}
// // // // // //         >
// // // // // //           <div className="slide-left">
// // // // // //             <h1>{slide.title}</h1>
// // // // // //             <p>{slide.subtitle}</p>
// // // // // //             <button className="explore-btn">Explore Now</button>
// // // // // //           </div>
// // // // // //           <div
// // // // // //             className="slide-right"
// // // // // //             style={{ backgroundImage: `url(${slide.image})` }}
// // // // // //           />
// // // // // //         </div>
// // // // // //       ))}

// // // // // //       <div className="dots">
// // // // // //         {slides.map((_, index) => (
// // // // // //           <span
// // // // // //             key={index}
// // // // // //             className={`dot ${index === current ? "active" : ""}`}
// // // // // //             onClick={() => setCurrent(index)}
// // // // // //           ></span>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import React, { useEffect, useState } from "react";
// // // // // import "./Slider.css";

// // // // // // Import your local PNG images from assets folder
// // // // // import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
// // // // // import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
// // // // // import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
// // // // // import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

// // // // // const slides = [
// // // // //   {
// // // // //     image: img1,
// // // // //     title: "Premium Truck Parts",
// // // // //     subtitle: "Reliable Quality for Every Journey",
// // // // //   },
// // // // //   {
// // // // //     image: img2,
// // // // //     title: "Trusted by Mechanics",
// // // // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // // // //   },
// // // // //   {
// // // // //     image: img3,
// // // // //     title: "Nationwide Delivery",
// // // // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // // // //   },
// // // // //   {
// // // // //     image: img4,
// // // // //     title: "Your Truck’s Perfect Match",
// // // // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // // // //   },
// // // // // ];

// // // // // export default function Slider() {
// // // // //   const [current, setCurrent] = useState(0);

// // // // //   useEffect(() => {
// // // // //     const timer = setInterval(() => {
// // // // //       setCurrent((prev) => (prev + 1) % slides.length);
// // // // //     }, 5000);
// // // // //     return () => clearInterval(timer);
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="slider-container">
// // // // //       {slides.map((slide, index) => (
// // // // //         <div
// // // // //           key={index}
// // // // //           className={`slide ${index === current ? "active" : ""}`}
// // // // //         >
// // // // //           <div className="slide-left">
// // // // //             <h1>{slide.title}</h1>
// // // // //             <p>{slide.subtitle}</p>
// // // // //             <button className="explore-btn">Explore Now</button>
// // // // //           </div>

// // // // //           <div
// // // // //             className="slide-right"
// // // // //             style={{ backgroundImage: `url(${slide.image})` }}
// // // // //           />
// // // // //         </div>
// // // // //       ))}

// // // // //       <div className="dots">
// // // // //         {slides.map((_, index) => (
// // // // //           <span
// // // // //             key={index}
// // // // //             className={`dot ${index === current ? "active" : ""}`}
// // // // //             onClick={() => setCurrent(index)}
// // // // //           ></span>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState } from "react";
// // // // import "./Slider.css";

// // // // // Import your local PNG images from assets folder
// // // // import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
// // // // import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
// // // // import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
// // // // import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

// // // // const slides = [
// // // //   {
// // // //     image: img1,
// // // //     title: "Premium Truck Parts",
// // // //     subtitle: "Reliable Quality for Every Journey",
// // // //   },
// // // //   {
// // // //     image: img2,
// // // //     title: "Trusted by Mechanics",
// // // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // // //   },
// // // //   {
// // // //     image: img3,
// // // //     title: "Nationwide Delivery",
// // // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // // //   },
// // // //   {
// // // //     image: img4,
// // // //     title: "Your Truck’s Perfect Match",
// // // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // // //   },
// // // // ];

// // // // export default function Slider() {
// // // //   const [current, setCurrent] = useState(0);

// // // //   useEffect(() => {
// // // //     const timer = setInterval(() => {
// // // //       setCurrent((prev) => (prev + 1) % slides.length);
// // // //     }, 5000);
// // // //     return () => clearInterval(timer);
// // // //   }, []);

// // // //   return (
// // // //     <div className="slider-container">
// // // //       {slides.map((slide, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className={`slide ${index === current ? "active" : ""}`}
// // // //         >
// // // //           <div className="slide-left">
// // // //             <h1>{slide.title}</h1>
// // // //             <p>{slide.subtitle}</p>
// // // //             <button className="explore-btn">Explore Now</button>
// // // //           </div>

// // // //           <div className="slide-right">
// // // //             <img src={slide.image} alt={slide.title} />
// // // //           </div>
// // // //         </div>
// // // //       ))}

// // // //       <div className="dots">
// // // //         {slides.map((_, index) => (
// // // //           <span
// // // //             key={index}
// // // //             className={`dot ${index === current ? "active" : ""}`}
// // // //             onClick={() => setCurrent(index)}
// // // //           ></span>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useEffect, useState } from "react";
// // // import "./Slider.css";

// // // import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
// // // import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
// // // import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
// // // import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

// // // const slides = [
// // //   {
// // //     image: img1,
// // //     title: "Premium Truck Parts",
// // //     subtitle: "Reliable Quality for Every Journey",
// // //   },
// // //   {
// // //     image: img2,
// // //     title: "Trusted by Mechanics",
// // //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// // //   },
// // //   {
// // //     image: img3,
// // //     title: "Nationwide Delivery",
// // //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// // //     small: true, // 👈 mark this one as small
// // //   },
// // //   {
// // //     image: img4,
// // //     title: "Your Truck’s Perfect Match",
// // //     subtitle: "Find the Right Part in Just a Few Clicks",
// // //   },
// // // ];

// // // export default function Slider() {
// // //   const [current, setCurrent] = useState(0);

// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       setCurrent((prev) => (prev + 1) % slides.length);
// // //     }, 5000);
// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   return (
// // //     <div className="slider-container">
// // //       {slides.map((slide, index) => (
// // //         <div
// // //           key={index}
// // //           className={`slide ${index === current ? "active" : ""}`}
// // //         >
// // //           <div className="slide-left">
// // //             <h1>{slide.title}</h1>
// // //             <p>{slide.subtitle}</p>
// // //             <button className="explore-btn">Explore Now</button>
// // //           </div>

// // //           <div
// // //             className={`slide-right ${slide.small ? "small" : ""}`}
// // //             style={{ backgroundImage: `url(${slide.image})` }}
// // //           />
// // //         </div>
// // //       ))}

// // //       <div className="dots">
// // //         {slides.map((_, index) => (
// // //           <span
// // //             key={index}
// // //             className={`dot ${index === current ? "active" : ""}`}
// // //             onClick={() => setCurrent(index)}
// // //           ></span>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // } 


// // import React, { useEffect, useState } from "react";
// // import "./Slider.css";

// // import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
// // import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
// // import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
// // import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

// // const slides = [
// //   {
// //     image: img1,
// //     title: "Premium Truck Parts",
// //     subtitle: "Reliable Quality for Every Journey",
// //   },
// //   {
// //     image: img2,
// //     title: "Trusted by Mechanics",
// //     subtitle: "Top Brands. Genuine Components. Fair Prices.",
// //   },
// //   {
// //     image: img3,
// //     title: "Nationwide Delivery",
// //     subtitle: "Fast, Safe, and On-Time Shipping Across India",
// //     small: true,
// //   },
// //   {
// //     image: img4,
// //     title: "Your Truck’s Perfect Match",
// //     subtitle: "Find the Right Part in Just a Few Clicks",
// //   },
// // ];

// // export default function Slider() {
// //   const [current, setCurrent] = useState(0);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrent((prev) => (prev + 1) % slides.length);
// //     }, 5000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   return (
// //     <div className="slider-container">
// //       {slides.map((slide, index) => (
// //         <div
// //           key={index}
// //           className={`slide ${index === current ? "active" : ""}`}
// //         >
// //           <div className="slide-content">
// //             <div className="slide-left">
// //               <h1>{slide.title}</h1>
// //               <p>{slide.subtitle}</p>
// //               <button className="explore-btn">Explore Now</button>
// //             </div>

// //             <div
// //               className={`slide-right ${slide.small ? "small" : ""}`}
// //               style={{ backgroundImage: `url(${slide.image})` }}
// //             />
// //           </div>
// //         </div>
// //       ))}

// //       <div className="dots">
// //         {slides.map((_, index) => (
// //           <span
// //             key={index}
// //             className={`dot ${index === current ? "active" : ""}`}
// //             onClick={() => setCurrent(index)}
// //           ></span>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import "./Slider.css";

// import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
// import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
// import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
// import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

// const slides = [
//   {
//     image: img1,
//     title: "Premium Truck Parts",
//     subtitle: "Reliable Quality for Every Journey",
//   },
//   {
//     image: img2,
//     title: "Trusted by Mechanics",
//     subtitle: "Top Brands. Genuine Components. Fair Prices.",
//   },
//   {
//     image: img3,
//     title: "Nationwide Delivery",
//     subtitle: "Fast, Safe, and On-Time Shipping Across India",
//     small: true,
//   },
//   {
//     image: img4,
//     title: "Your Truck’s Perfect Match",
//     subtitle: "Find the Right Part in Just a Few Clicks",
//   },
// ];

// export default function Slider() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="slider-container">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`slide ${index === current ? "active" : ""}`}
//         >
//           <div className="slide-left">
//             <h1>{slide.title}</h1>
//             <p>{slide.subtitle}</p>
//             <button className="explore-btn">Explore Now</button>
//           </div>

//           <div className="slide-right">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className={`slide-img ${slide.small ? "small" : ""}`}
//             />
//           </div>
//         </div>
//       ))}

//       <div className="dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${index === current ? "active" : ""}`}
//             onClick={() => setCurrent(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import "./Slider.css";

import img1 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";
import img2 from "../assets/127ab82f085d4d5464e2dd72ffdf7e85-removebg-preview.png";
import img3 from "../assets/c2dbd6885578c855ee4ce7d35acf3c7d-removebg-preview.png";
import img4 from "../assets/4a09ea4b3c54d706575b1a9bae961805-removebg-preview.png";

const slides = [
  {
    image: img1,
    title: "Premium Truck Parts",
    subtitle: "Reliable Quality for Every Journey",
  },
  {
    image: img2,
    title: "Trusted by Mechanics",
    subtitle: "Top Brands. Genuine Components. Fair Prices.",
  },
  {
    image: img3,
    title: "Nationwide Delivery",
    subtitle: "Fast, Safe, and On-Time Shipping Across India",
    small: true,
  },
  {
    image: img4,
    title: "Your Truck’s Perfect Match",
    subtitle: "Find the Right Part in Just a Few Clicks",
  },
];
  const API = process.env.REACT_APP_API_BASE_URL;
export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
        >
          <div className="slide-content">
            <div className="slide-left">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="explore-btn">Explore Now</button>
            </div>

            <div className="slide-right">
              <img
                src={slide.image}
                alt={slide.title}
                className={`slide-img ${slide.small ? "small" : ""}`}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}


