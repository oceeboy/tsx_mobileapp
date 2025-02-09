import {
  createProductSchema,
  reviewDtoSchema,
  variantDtoSchema,
} from "@/schema/product.schema";
import { z } from "zod";

export type CreateProductDto = z.infer<typeof createProductSchema>;

export type AddVariantDto = z.infer<typeof variantDtoSchema>;

export type AddReviewDto = z.infer<typeof reviewDtoSchema>;
