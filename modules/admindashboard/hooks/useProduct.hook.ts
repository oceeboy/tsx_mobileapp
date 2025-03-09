import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../services/adminproduct.service';
import { queryClient } from '@/lib/query-tanstack';
import Toast from 'react-native-toast-message';
import { Product } from '@/types/product';

// Fetch one product
export const useFetchOneProduct = (id: string) => {
  return useQuery({
    queryKey: ['adminProduct', id],
    queryFn: () => ProductService.fetchOneProduct(id),
    enabled: !!id, // Prevents execution if id is falsy
  });
};

// Delete one product
export const useDeleteOneProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductService.deleteOneProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useProducts'] });

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Product deleted successfully',
        },
      });
    },

    onError: (error) => {
      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          description: error.message || 'Failed to delete product',
        },
      });
    },
  });
};

// Edit product
export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updateData,
      images,
    }: {
      id: string;
      updateData: Partial<Product>;
      images?: File[];
    }) => ProductService.editOneProduct(id, updateData, images),

    onMutate: async ({ id, updateData }) => {
      await queryClient.cancelQueries({ queryKey: ['adminProduct', id] });

      const previousProduct = queryClient.getQueryData<Product>([
        'adminProduct',
        id,
      ]);

      queryClient.setQueryData(
        ['adminProduct', id],
        (oldData: Product | undefined) => ({
          ...oldData,
          ...updateData,
        })
      );

      return { previousProduct };
    },

    onError: (error, _variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ['adminProduct', context.previousProduct._id],
          context.previousProduct
        );
      }

      Toast.show({
        type: 'error',
        props: {
          title: 'Error',
          description: 'Failed to update Product' || error.message,
        },
      });
    },

    onSuccess: (data) => {
      if (data?._id) {
        queryClient.invalidateQueries({
          queryKey: ['adminProduct', data._id],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['useProducts'] });

      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Product updated successfully',
        },
      });
    },

    onSettled: (data) => {
      if (data?._id) {
        queryClient.invalidateQueries({ queryKey: ['adminProduct', data._id] });
      }
    },
  });
};
