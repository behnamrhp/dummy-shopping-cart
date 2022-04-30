import { Button } from "@mui/material";
import { cartItemType } from "../../types/apis";
import { Wrapper } from "./style";

interface Props {
    item : cartItemType,
    addToCart : (clickeItem: cartItemType) => void,
    removeFromCart : (id : number) => void
}
export default ( { item, addToCart, removeFromCart } : Props ) => {
    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>

                <div className="information">
                    <p>Price: ${ item.price} </p>
                    <p>Total: ${ ( item.amount * item.price ).toFixed(2) }</p>
                </div>
                <div className="buttons">
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={ () => removeFromCart( item.id ) }
                        data-testid="decrease"
                    >
                            -
                    </Button>

                    <p data-testid="amount" title="amount">{item.amount}</p>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        color="secondary"
                        onClick={ () => addToCart( item ) }
                        data-testid="increase"
                    >
                        +
                    </Button>
                    <img src={item.image} alt={item.title} />
                </div>
            </div>
        </Wrapper>
    )
}