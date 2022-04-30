import { cartItemType } from "../../types/apis";
import CartItem from "../CartItem";
import { Wrapper } from "./style";

interface Props {
    cartItems : cartItemType[],
    addToCart : (clicedItem: cartItemType) => void,
    removeFromCart : (id: number) => void
}

export default ( { cartItems, addToCart, removeFromCart }: Props ) => {
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            { cartItems.length === 0 ? <p>No Items in cart.</p> : null }

            { cartItems.map( item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )) }
        </Wrapper>
    )
}