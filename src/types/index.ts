import { cartItemType } from "./apis";

export interface itemProps {
    item : cartItemType,
    handleAddToCart : ( clikedItem : cartItemType ) => void
}