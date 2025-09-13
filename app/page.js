"use client"
import React, { useState, useEffect } from 'react';
import { Award, Phone, Star, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [activeTab, setActiveTab] = useState('rent');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      text: "Found my perfect 2BHK in Bangalore within a week. The verification process was thorough and transparent.",
      location: "Bangalore"
    },
    {
      name: "Rahul Gupta", 
      role: "Marketing Manager",
      text: "Excellent PG options near my office. Clean facilities and reasonable pricing made the decision easy.",
      location: "Pune"
    },
    {
      name: "Anjali Singh",
      role: "Doctor",
      text: "Professional service helped us buy our first home. The legal documentation support was invaluable.",
      location: "Delhi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    // Search functionality
    console.log('Searching for:', searchLocation);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">

  {/* Main Hero Section */}
  <section className="relative min-h-screen flex items-center">
  {/* Background decorative shapes */}
  <div className="absolute inset-0 opacity-5 dark:opacity-10">
    <div className="absolute top-20 left-20 w-32 h-32 border border-gray-400 dark:border-gray-600 rounded-lg rotate-12"></div>
    <div className="absolute top-40 right-32 w-24 h-24 border border-gray-400 dark:border-gray-600 rounded-full"></div>
    <div className="absolute bottom-40 left-1/4 w-28 h-28 border border-gray-400 dark:border-gray-600 rotate-45"></div>
  </div>

  {/* City skyline image at bottom */}
  <div className="absolute bottom-0 w-full z-0 flex justify-center ">
    <img 
      src="./building5.png" 
      alt="city skyline" 
      className="h-[520px] w-[1300px] translate-y-24"
    />
  </div>

  {/* Hero content */}
  <div className="container mx-auto px-6 lg:px-8 z-10 ">
    <div className="max-w-4xl mx-auto text-center">
      {/* Main heading */}
      <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
        Property Solutions
        <span className="block text-[#7F57F1] text-4xl lg:text-6xl mt-2">
          Made Simple
        </span>
      </h1>
      
      <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-medium transition-colors duration-300">
        Connecting tenants, buyers, and property owners across India
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto transition-colors duration-300">
        Whether you need a PG room, family apartment, or investment property, 
        we provide verified listings with complete transparency.
      </p>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section className="py-20 transition-colors duration-300">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Why Property Owners Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
              We provide end-to-end solutions for property management and tenant acquisition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Verified Tenants</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Complete background verification including employment, 
                identity, and reference checks for all potential tenants.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Clock className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quick Rentals</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Average property rental time of 15 days with our 
                extensive database of verified tenants and buyers.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Award className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Legal Support</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Complete documentation assistance including rental agreements, 
                NOC, and property verification services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 transition-colors duration-300">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16 transition-colors duration-300">
              Customer Experiences
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 p-8 lg:p-12 transition-colors duration-300">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed transition-colors duration-300">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-bold text-gray-900 dark:text-white text-lg transition-colors duration-300">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                </div>
              </div>

              {/* Testimonial indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-emerald-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#7f57f1]">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your Property Search Today
            </h2>
            <p className="text-xl text-purple-100 mb-10">
              Join thousands who have found their ideal homes through our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href='/rent'>
                <button className="bg-white text-[#7f57f1] px-8 py-4 rounded-xl cursor-pointer font-semibold hover:bg-gray-100 transition-colors">
                  Find Properties
                </button>
              </Link>

              <Link href='/add-new-listing'>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold cursor-pointer">
                  List Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-12 pb-8 transition-colors duration-300">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">PropertyHub</h3>
              <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md transition-colors duration-300">
                Making property search simple and transparent. 
                Connecting property seekers with verified owners across India.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-[#7f57f1]" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">Rent Properties</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">Buy Properties</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">PG Options</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">List Property</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                <li className='hover:text-[#7f57f1] transition-colors cursor-pointer'>Help Center</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-[#7f57f1] transition-colors cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center transition-colors duration-300">
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">&copy; 2024 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;