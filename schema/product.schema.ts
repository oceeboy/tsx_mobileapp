import { z } from "zod";

// Define VariantDto as a Zod schema
const variantDtoSchema = z.object({
  variantName: z.string(),
  variantPrice: z.number().min(0),
  variantStockQuantity: z.number().min(0),
});

// Define ReviewDto as a Zod schema
const reviewDtoSchema = z.object({
  userId: z.string().nonempty(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nonempty(),
});

// Define CreateProduct as a Zod schema
const createProductSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  productDescription: z
    .string()
    .min(10, "Product description must be at least 10 characters"),
  productPrice: z.number().min(0, "Product price must be at least 0"),
  productImages: z.array(z.string()),
  category: z.string(),
  stockQuantity: z.number().min(0),

  variants: z.array(variantDtoSchema).optional(),
  tags: z.array(z.string()).optional(),
  isOnSale: z.boolean().optional(),
  salePrice: z.number().min(0).optional(),
  reviews: z.array(reviewDtoSchema).optional(), // Add reviews array as optional
});

export { variantDtoSchema, reviewDtoSchema, createProductSchema };
