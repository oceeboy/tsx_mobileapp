import http from '@/lib/ky';
import { Product } from '@/types/product';
import { HTTPError } from 'ky';

// Fetch product from API
const fetchOneProduct = async (id: string): Promise<Product> => {
  try {
    const response = await http.get(`product/${id}`).json<Product>();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || 'Failed to fetch product');
    }
    throw error;
  }
};

// Delete product from API
const deleteOneProduct = async (id: string) => {
  try {
    const response = await http.delete(`product/${id}`).json();
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || 'Failed to delete product');
    }
    throw error;
  }
};

const editOneProduct = async (
  id: string,
  updateData: Partial<Product>,
  images?: File[]
) => {
  try {
    const formData = new FormData();

    // Append text fields
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    // Append images (if provided)
    if (images) {
      images.forEach((image) => {
        formData.append('productImages', image);
      });
    }

    // Make the request
    const response = await http
      .patch(`product/${id}`, {
        body: formData,
      })
      .json<Product>();

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      throw new Error(errorBody.message || 'Failed to update product');
    }
    throw error;
  }
};

export const ProductService = {
  fetchOneProduct,
  deleteOneProduct,
  editOneProduct,
};
