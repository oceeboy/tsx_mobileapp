import http from '@/lib/ky';
import { Product } from '@/types/product';
import { HTTPError } from 'ky';

const fetchOneProduct = async (id: string): Promise<Product> => {
  try {
    const response = await http.get(`product/${id}`);
    if ('error' in response) {
      throw new Error('something went wrong');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || 'Failed to fetch transactions');
    }
    throw error;
  }
};

export const ProductService = {
  fetchOneProduct,
};
