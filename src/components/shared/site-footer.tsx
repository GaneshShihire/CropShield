import { Mail, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-800 bg-black py-6 text-gray-400">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} CropShield by Team Alpha. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:teamalpla@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="size-4" />
            <span>teamalpla@gmail.com</span>
          </a>
          <a href="tel:9021474371" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="size-4" />
            <span>9021474371</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
