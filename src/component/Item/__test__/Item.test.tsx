import { fireEvent, render } from "@testing-library/react";
import { cartItemType } from "../../../types/apis";
import Item from "../Item";



const mockAddToCart     = jest.fn();
const mockItemComponent = (item: cartItemType) => {
    
    return render(<Item 
        item={item}
        handleAddToCart={mockAddToCart}
        />)
}
it('call add to cartItem function on Click addToCart button', () => {
    const mockedData = {
        id : 1,
        title: 'test',
        description: 'test',
        amount: 1,
        category: 'test',
        image: 'test',
        price: 22
    }
    const ItemComponent = mockItemComponent(mockedData);
    
    const addTocartButton = ItemComponent.getByTestId('addToCart');

    fireEvent.click(addTocartButton);
    
    expect(mockAddToCart).toBeCalledTimes(1);
})