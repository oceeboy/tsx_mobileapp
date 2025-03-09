# Contributing to [TSX Ecommerce]

Thank you for your interest in contributing! Follow these guidelines to ensure smooth collaboration.

## 🚀 How to Contribute

**Fork the repository** and create a new branch:

```sh
git checkout -b feature/your-feature
```

feat: Added new UI component
fix: Fixed API response handling

//

```
// Edit productcode
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
      images?: string[];
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
    },

    onSuccess: (data) => {
      if (data?._id) {
        queryClient.invalidateQueries({ queryKey: ['adminProduct', data._id] });
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product updated successfully',
      });
    },

    onSettled: (data) => {
      if (data?._id) {
        queryClient.invalidateQueries({ queryKey: ['adminProduct', data._id] });
      }
    },
  });
};

```
