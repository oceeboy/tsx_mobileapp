import { z } from 'zod';
import { variantDtoSchema, reviewDtoSchema } from './product.schema';

const editProductSchema = z.object({
  id: z.string().nonempty('Product ID is required'),
  productName: z.string().min(3, 'Product name must be at least 3 characters'),
  productDescription: z
    .string()
    .min(10, 'Product description must be at least 10 characters'),
  productPrice: z.number().min(0, 'Product price must be at least 0'),
  sku: z.string(),
  productImages: z.array(z.string()).optional(),
  category: z.string(),
  stockQuantity: z.number().min(0),
  variants: z.array(variantDtoSchema).optional(),
  tags: z.array(z.string()).optional(),
  isOnSale: z.boolean().optional(),
  salePrice: z.number().min(0).optional(),
  reviews: z.array(reviewDtoSchema).optional(),
});

export { editProductSchema };
