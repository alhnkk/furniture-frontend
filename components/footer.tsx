import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import getSettings from "@/actions/get-settings";

const Footer = async () => {
  const settings = await getSettings();
  const { contactInfo, socialMedia } = settings;
  const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Ürünlerimiz", href: "/products" },
    { name: "İletişim", href: "/contact" },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
  ];

  return (
    <footer className="bg-stone-50 border-t border-stone-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <h2 className="text-2xl font-semibold text-amber-800">
                {settings.siteName}
              </h2>
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Kaliteli ve şık mobilya çözümleriyle yaşam alanlarınızı
              güzelleştiriyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-amber-800 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-amber-800" />
                <span className="text-neutral-600 text-sm">
                  {contactInfo?.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-800" />
                <span className="text-neutral-600 text-sm">
                  {contactInfo?.phone}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-800" />
                <span className="text-neutral-600 text-sm">
                  {contactInfo?.email}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Sosyal Medya
            </h3>
            <div className="flex space-x-3">
              {socialMedia && (
                <>
                  <div>  
                    <a
                      href={socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:shadow-lg group-hover:border-amber-100">
                        <Facebook className="w-4 h-4 text-amber-800 group-hover:text-amber-700 transition-colors duration-300" />
                      </div>
                    </a>
                  </div>
                  <div>
                    <a
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:shadow-lg group-hover:border-amber-100">
                        <Instagram className="w-4 h-4 text-amber-800 group-hover:text-amber-700 transition-colors duration-300" />
                      </div>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-center text-sm text-neutral-600">
            © {new Date().getFullYear()} Derya Tasarım Mimarlık. Tüm hakları
            saklıdır.
          </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
