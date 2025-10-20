export interface Image {
  id: string;
  url: string;
  publicId: string;
}

export interface Billboard {
  id: string;
  label: string;
  description?: string;
  image?: Image;
  imageId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: Image;
}

export interface GalleryItem {
  id: string;
  image: Image;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category?: Category;
  images: Image[];
  gallery?: GalleryItem[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  id: string;
  siteName: string;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
    mapUrl?: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  metaData: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}
