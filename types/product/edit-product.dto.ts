import { editProductSchema } from '@/schema/editproduct.schema';
import { z } from 'zod';

export type EditProductSchema = z.infer<typeof editProductSchema>;
