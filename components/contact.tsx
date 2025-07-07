"use client";

import { Button } from "./ui/button";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactProps {
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
  };
}

export const Contact: React.FC<ContactProps> = ({
  contactInfo,
  socialMedia,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Intersection Observer for lazy loading map
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadMap) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Load map 100px before it comes into view
        threshold: 0.1,
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoadMap]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Bir hata oluştu");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Bir hata oluştu"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Link href={`tel:${contactInfo.phone}`}>
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:border-amber-100">
                  <Phone className="w-5 h-5 text-amber-800" />
                </div>
              </div>
              <div className="flex items-center flex-col justify-center">
                <h3 className="text-base font-medium text-neutral-900 group-hover:text-amber-800 transition-colors duration-300">
                  Telefon
                </h3>
                <p className="text-neutral-600">{contactInfo.phone}</p>
              </div>
            </div>
          </Link>

          <Link href={`mailto:${contactInfo.email}`} className="group">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:border-amber-100">
                  <Mail className="w-5 h-5 text-amber-800" />
                </div>
              </div>
              <div className="flex items-center flex-col justify-center">
                <h3 className="text-base font-medium text-neutral-900 group-hover:text-amber-800 transition-colors duration-300">
                  Email
                </h3>
                <p className="text-neutral-600">{contactInfo.email}</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="flex flex-col items-start">
              <h3 className="text-base font-medium text-neutral-900 mb-3">
                Sosyal Medya hesaplarımızı takip edin
              </h3>
              <div className="flex space-x-3">
                {socialMedia && (
                  <>
                    <Link
                      href={socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="Facebook sayfamızı ziyaret edin"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:border-amber-100">
                        <Facebook className="w-4 h-4 text-amber-800 group-hover:text-amber-700 transition-colors duration-300" />
                      </div>
                    </Link>
                    <Link
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      aria-label="Instagram sayfamızı ziyaret edin"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:border-amber-100">
                        <Instagram className="w-4 h-4 text-amber-800 group-hover:text-amber-700 transition-colors duration-300" />
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div ref={mapRef} className="relative h-full min-h-[400px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-stone-200 to-amber-100 rounded-2xl blur opacity-30" />
            <div className="relative rounded-2xl overflow-hidden h-full shadow-sm">
              {shouldLoadMap ? (
                <iframe
                  title="Derya Mimarlık Tasarım Konum Haritası"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900450697!2d28.792275776332386!3d40.986670571240275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa4157b72f461%3A0x2e53201c8876c3c1!2zQXRhdMO8cmsgTWFoYWxsZXNpLCBZZcWfaWx0ZXBlIFNrLiBObzogNS8xLCAzNDE1OCBLw7zDp8O8a8OnZWttZWNlL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1710272768950!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-stone-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-stone-600">Harita yükleniyor...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-stone-200 to-amber-100 rounded-2xl blur opacity-30" />
            <div className="relative bg-white shadow-sm rounded-2xl p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Ad Soyad
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                    placeholder="Email adresiniz"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                    placeholder="Telefon numaranız"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Mesaj
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300 resize-none"
                    placeholder="Mesajınız"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {submitError}
                  </div>
                )}

                {submitSuccess && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                    Mesajınız başarıyla gönderildi!
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-800 text-white py-2.5 rounded-xl hover:bg-amber-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
