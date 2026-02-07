
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Wrench, User, PhoneCall, ArrowRight } from "lucide-react";
import HeroSlider from "../component/HeroSlider";

/* ================= CACHE KEYS ================= */
const HOME_CACHE_KEY = "home_page_cache_v1";

/* ================= STATIC DATA ================= */
const heroSlidesData = [
  {
    image: "https://img.freepik.com/premium-photo/closeup-black-truck-isolated-dark-background-banner_110488-4193.jpg",
    title: "Reliable Truck & Tractor Parts",
    subtitle: "High-quality parts delivered across Canada",
  },
  {
    image: "https://img.pikbest.com/wp/202347/pickup-truck-sleek-black-against-a-dark-background-digitally-rendered_9756711.jpg!w700wp",
    title: "Built for Heavy Duty",
    subtitle: "Durable parts for trucks & tractors",
  },
];

const categoriesData = [
  {
    title: "Truck Parts",
    image: "https://img.freepik.com/premium-photo/silhouette-truck-american-dark-red-color_62972-44402.jpg?semt=ais_hybrid&w=740&q=80",
    route: "/catalog",
    description: "Premium parts for all heavy-duty trucks",
  },
  {
    title: "Tractor Parts",
    image: "https://www.shutterstock.com/image-photo/tractor-orange-led-magnetic-beacon-260nw-2629596971.jpg",
    route: "/tractor-category",
    description: "Reliable tractor parts for agriculture & industry",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState(null);

  /* ================= LOAD FROM CACHE ================= */
  useEffect(() => {
    const cached = localStorage.getItem(HOME_CACHE_KEY);
    if (cached) {
      setHomeData(JSON.parse(cached));
    } else {
      const data = {
        heroSlides: heroSlidesData,
        categories: categoriesData,
      };
      localStorage.setItem(HOME_CACHE_KEY, JSON.stringify(data));
      setHomeData(data);
    }
  }, []);

  if (!homeData) return null;

  return (
    <div className="bg-gray-100 text-gray-900">

      {/* ================= HERO ================= */}
      <HeroSlider slides={homeData.heroSlides} />

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeData.categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(cat.route)}
                className="cursor-pointer rounded-xl overflow-hidden shadow-lg border hover:border-red-600 transition"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{cat.description}</p>
                  <span className="inline-flex items-center text-red-600 font-semibold">
                    Browse <ArrowRight className="ml-2" size={18} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            How Our Platform Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* USER SYSTEM */}
            <div className="bg-white p-8 rounded-xl shadow border">
              <User className="text-red-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Normal User System
              </h3>
              <p className="text-gray-600">
                Users can browse truck and tractor parts, add items to cart,
                place secure orders, track purchases, and manage delivery
                addresses easily from their account.
              </p>
            </div>

            {/* MECHANIC SYSTEM */}
            <div className="bg-white p-8 rounded-xl shadow border">
              <Wrench className="text-red-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Mechanic Support System
              </h3>
              <p className="text-gray-600">
                Mechanics can quickly search compatible parts, verify OEM
                numbers, and assist customers in selecting the right 
                parts for long-term vehicle performance.
              </p>
            </div>

            {/* DELIVERY SYSTEM */}
            <div className="bg-white p-8 rounded-xl shadow border">
              <Truck className="text-red-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Fast & Reliable Delivery
              </h3>
              <p className="text-gray-600">
                Orders are processed through our warehouse network and shipped
                quickly across Canada with proper packaging and real-time order
                updates.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://img.pikbest.com/wp/202348/robust-3d-render-of-a-black-truck_9773284.jpg!w700wp"
            alt="warehouse"
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why FairDealTruckParts?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We specialize in high-quality truck and tractor parts.
              Every product is carefully sourced, quality-checked, and stored
              in our modern warehouse facilities to ensure durability and
              compatibility. We do not sell engine parts, focusing only on
              reliable mechanical and structural components.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      {/* <section className="py-16 bg-red-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Right Part?
          </h2>
          <p className="text-lg mb-6">
            Our experts are ready to assist you
          </p>

          <a
            href="tel:+919876543210"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <PhoneCall className="mr-2" />
            +91 98765 43210
          </a>
        </div>
      </section> */}

      {/* ================= FOOTER ================= */}
      {/* <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        © 2025 FairDealTruckParts. All rights reserved.
      </footer> */}
    </div>
  );
}