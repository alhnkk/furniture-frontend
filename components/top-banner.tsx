import { Phone, Instagram, Facebook, Mail } from "lucide-react";

const TopBanner = () => {
  return (
    <div className="w-full bg-amber-950 text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
         
          className="flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <a
            href="tel:+905555555555"
            className="text-sm hover:text-amber-200 transition-colors"
          >
            +90 555 555 55 55
          </a>
          <span className="mx-2 text-amber-500">|</span>
          <Mail className="w-4 h-4" />
          <a
            href="mailto:info@deryatasarim.com"
            className="text-sm hover:text-amber-200 transition-colors"
          >
            info@deryatasarim.com
          </a>
        </div>

        <div
          
          className="flex items-center gap-4"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-200 transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
