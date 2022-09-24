import { IProduct, IReviews } from "../../Services/Types/product";
import { api } from "../api";
type GetAllProductsResponse = {
  code: number;
  message: string;
  data: {
    products: IProduct[];
    length: number;
  };
};
type GetProductResponse = {
  code: number;
  message: string;
  data: IProduct;
};
export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<GetAllProductsResponse, string | undefined>({
      query: (query) => `products?${query}`,
      providesTags: ["Product"],
    }),
    getProduct: build.query<GetProductResponse, string>({
      query: (id) => `products/find/${id}`,
      providesTags: ["Product"],
    }),
    updateProduct: build.mutation<GetProductResponse, IProduct>({
      query(data) {
        const { _id } = data;
        return {
          url: `products/${_id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<{ data: {}; message: string }, string>({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
    addProduct: build.mutation<GetProductResponse, IProduct>({
      query(body) {
        return {
          url: `products`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProductReviews: build.query<IReviews[], string>({
      query: (id) => `products/reviews/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetProductReviewsQuery,
} = productApi;
