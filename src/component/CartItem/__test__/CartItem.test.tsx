import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import CartItem from './../index';
import { cartItemType } from "../../../types/apis";

const mockHandleAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockCartItem = (cartItem: cartItemType) => {
    
    return render(<CartItem 
        item={cartItem}
        addToCart={mockHandleAddToCart}
        removeFromCart={mockRemoveFromCart}
        />)
}
describe('change item amounts', () => {
    let component : undefined | RenderResult;

    beforeEach( () => {
        component = mockCartItem({
            id : 1,
            title: 'test',
            description: 'test',
            amount: 1,
            category: 'test',
            image: 'test',
            price: 22
        });
    })
    
    test('call increase amount function by click plus', () => {

        component = component as RenderResult;
        const increaseButton = component.queryByTestId('increase') as Element;

        fireEvent.click(increaseButton);

        expect(mockHandleAddToCart).toBeCalled( )

    })

    test('call increase amount function by click minus', () => {
        component = component as RenderResult;

        const decreaseButton = component.queryByTestId('decrease') as Element;

        fireEvent.click(decreaseButton);

        expect(mockRemoveFromCart).toBeCalledTimes(1);
    });
})