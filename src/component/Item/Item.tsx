import { Button } from "@mui/material";
import { itemProps } from "../../types";
import { Wrapper } from "./style";

export default ( { item, handleAddToCart } : itemProps ) => (
    <Wrapper>
        <img src={item.image} alt={item.title} data-testid="image"/>
        <div>
            <h3 data-testid="title">{item.title}</h3>
            <p data-testid="description">{item.description}</p>
            <h3 data-testid="price">{item.price}</h3>
        </div>

        <Button onClick={ () => handleAddToCart(item) } data-testid="addToCart">Add to Cart</Button>
    </Wrapper>
)