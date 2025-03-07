import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services/adminproduct.service';

const useFetchOneProduct = (id: string) => {
  return useQuery({
    queryKey: ['useAdminProduct', id],
    queryFn: () => ProductService.fetchOneProduct(id),
    enabled: !!id, // Prevents execution if id is undefined/null
  });
};

// Export the hook properly
export const useProduct = {
  fetchOneProduct: useFetchOneProduct,
};
