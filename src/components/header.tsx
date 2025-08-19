"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PointsDisplay } from './points/points-display';

const navigation = [
  { name: 'Categories', href: '/categories' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Submit Idea', href: '/submit-idea' },
  { name: 'About', href: '/about' },
  { name: 'Docs', href: '/docs' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/40'
          : 'bg-white/5 border border-white/10 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                IdeaGen
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none group relative">
                    <span className="relative group-hover:opacity-100 transition-all duration-300">
                      {item.name}
                    </span>
                    <svg className="ml-1 h-4 w-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[220px] p-1.5 bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/40 rounded-lg overflow-hidden">
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem}
                        className="px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-md transition-all duration-300 group relative overflow-hidden"
                      >
                        <span className="relative z-10 group-hover:text-blue-100 transition-colors duration-300 flex items-center">
                          <span className="absolute left-0 h-full w-0.5 bg-gradient-to-b from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                          <span className="ml-2">{subItem}</span>
                        </span>
                        <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group relative px-2 py-1 rounded-md"
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  <span className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-md hover:bg-white/5 relative group"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Register
                <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn('md:hidden transition-all duration-500 ease-in-out overflow-hidden', mobileMenuOpen ? 'max-h-screen' : 'max-h-0')}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800/50">
          {navigation.map((item) => (
            <div key={item.name} className="px-2 py-1">
              <div className="text-gray-300 hover:bg-gray-800/50 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors duration-300">
                {item.name}
              </div>
              {item.submenu && mobileMenuOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-md transition-colors duration-300"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-800/50 mt-2">
            <div className="flex flex-1 items-center justify-end gap-4">
              <PointsDisplay />
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// Add this to your global CSS or a layout component to prevent content from being hidden behind the fixed header
// body { padding-top: 4rem; }
