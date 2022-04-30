import { useQuery } from "react-query";
import { getProducts } from "../api/apis";
import { cartItemType } from "../types/apis";

  export const useProductsQuery = () => {
   return useQuery<cartItemType[]>(
        'products',
        getProducts
      )
    
  }