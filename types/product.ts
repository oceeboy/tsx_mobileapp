export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Variant {
  variantName: string;
  variantPrice: number;
  variantStockQuantity: number;
}

export interface Product {
  id: any;
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: string[];
  category: string;
  stockQuantity: number;
  sku: string;
  variants: Variant[];
  tags: string[];
  ratings: number;
  reviews: Review[];
  isOnSale: boolean;
  salePrice?: number;
  createdAt: Date;
  updatedAt: Date;
}
