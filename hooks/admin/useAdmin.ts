import { queryClient } from "@/lib/query-tanstack";
import { AdminService } from "./../../services/admin/admin.service";
import { CreateProductDto } from "@/types/product/create-product.dto";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: (formData: FormData) => AdminService.createProduct(formData),
    onSuccess: () => {
      // Invalidate and refetch
      Toast.show({
        type: "success",
        props: {
          title: "Product created",
          description: "The product has been successfully created",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["useProducts"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.status === "pending",
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
