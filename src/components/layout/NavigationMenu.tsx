import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, X, Search, UserCircle } from 'lucide-react'; // Icons

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Games" },
    { href: "/guides", label: "Impact Guides" },
    // Add more links as needed
  ];

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              GameImpact
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search and Auth Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search" aria-label="Search"> {/* Assuming search button navigates or opens a modal */}
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/auth" aria-label="User Account">
                <UserCircle className="h-6 w-6" />
              </Link>
            </Button>
            {/* Add Login/Register or Profile button if needed */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-5 space-x-2">
               <Button variant="ghost" size="icon" className="w-full justify-start" asChild>
                  <Link to="/search" onClick={() => setIsMobileMenuOpen(false)}>
                    <Search className="h-5 w-5 mr-2" /> Search
                  </Link>
               </Button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
              {/* Add other auth links */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;