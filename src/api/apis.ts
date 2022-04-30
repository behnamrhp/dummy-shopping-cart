import { cartItemType } from "../types/apis";

export const getProducts = async () : Promise<cartItemType[]> =>
    await ( await fetch('https://fakestoreapi.com/products')).json();