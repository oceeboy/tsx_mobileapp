import http from "@/lib/ky";
import { CreateProductDto } from "@/types/product/create-product.dto";
import { ProductResponse } from "@/types/product/index";
import { HTTPError } from "ky";

const createProduct = async (
  // createProductDto: CreateProductDto
  formData: FormData
): Promise<ProductResponse> => {
  console.log("Created Itemssss:", formData);
  try {
    // Send the POST request to create a transaction
    const response = await http
      .post<ProductResponse>("product", {
        body: formData,
      })
      .json<ProductResponse>();

    // Directly throw the error if there's an error field in the response
    if ("error" in response) {
      throw new Error(
        typeof response.error === "string" ? response.error : "Unknown error"
      );
    }
    return response;
  } catch (error: unknown) {
    // Handle HTTP errors specifically
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json();
      const errorMessage = errorBody?.error || "An unexpected error occurred";
      throw new Error(errorMessage);
    }

    // For any other type of error, such as network errors
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }

    // Fallback for unknown errors
    throw new Error("An unknown error occurred");
  }
};

export const AdminService = {
  createProduct,
} as const;
