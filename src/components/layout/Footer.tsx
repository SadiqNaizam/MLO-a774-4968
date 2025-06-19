import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About/Brand */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">GameImpact</h3>
            <p className="text-sm text-muted-foreground">
              Providing insights for responsible gaming.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Navigate</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} GameImpact. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;