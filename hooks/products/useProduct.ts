import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useProducts"],
    queryFn: () => ProductService.fetchProducts(),
  });
  return { data, error, isLoading };
};

// find one product with id
export const useProduct = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["useProduct", id],
    queryFn: () => ProductService.fetchOneProduct(id),
  });
  return { data, error, isLoading };
};

// import { useQuery } from "@tanstack/react-query";
// import { ProductService } from "@/services/product.service";
// import { useUser } from "@/hooks/useUser";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
// import { useMutation } from "@tanstack/react-query";
// import { ProductService } from "@/services/product.service";
