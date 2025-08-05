'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import  Link  from 'next/link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkSubmenuOpen, setIsWorkSubmenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsWorkSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsWorkSubmenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const workCategories = [
    { name: 'Commercial', path: '/portfolio/commercial' },
    { name: 'Music', path: '/portfolio/music' },
    { name: 'DJ', path: '/portfolio/dj' },
    { name: 'Portrait', path: '/portfolio/portrait' },
    { name: 'Skate', path: '/portfolio/skate' },
    { name: 'Tattoo', path: '/portfolio/tattoo' },
    { name: 'Documental', path: '/portfolio/documental' },
    { name: 'Bio', path: '/bio' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-wider text-black">
            YUSSEL ESTRADA PHOTOGRAPHY
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <div 
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="hidden md:flex space-x-6">
                {workCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div>
              <button 
                onClick={() => setIsWorkSubmenuOpen(!isWorkSubmenuOpen)}
                className="flex items-center text-gray-700 hover:text-black transition-colors duration-300 font-medium"
              >
                Work
                <ChevronDown size={16} className={`ml-1 transition-transform ${isWorkSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mobile Submenu */}
              {isWorkSubmenuOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link 
                    href="/" 
                    onClick={() => {
                      scrollToSection('work');
                      setIsOpen(false);
                    }}
                    className="block text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    All Work
                  </Link>
                  {workCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-600 hover:text-black transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => scrollToSection('bio')}
              className="block text-gray-700 hover:text-black transition-colors duration-300 font-medium"
            >
              Bio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block text-gray-700 hover:text-black transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;