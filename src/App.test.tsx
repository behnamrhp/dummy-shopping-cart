import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import App from './App';


import { useProductsQuery } from './hooks/useProductsQuery';

const mockUseProducts = useProductsQuery as jest.Mock<any>;

jest.mock('./hooks/useProductsQuery', () => ({
  useProductsQuery : jest.fn()
}));

const mokedReturnData = [{
  id : 1,
  category : 'test',
  description: 'test',
  image : 'test',
  price : 10,
  title : 'test',
  amount : 10
}]

function showDrawer(appComponent: RenderResult) {
  //get cartIcon button
  const cartIconEl = appComponent.getByTestId('cartIcon');

  //click it
  fireEvent.click(cartIconEl);
}

function clickCartButton(appComponent: RenderResult){
 const addToCartButton = appComponent.queryAllByTestId('addToCart')

 fireEvent.click(addToCartButton[0])
}

  it('renders without error', () => {
    mockUseProducts.mockReturnValue({ isLoading : false });

    const appComponent = render(<App />);
    
    const appDiv = appComponent.getByTestId('app');

    expect(appDiv).toBeInTheDocument();
  })

  describe('react query testing', () => {

  
    afterEach(() => {
      jest.clearAllMocks();
    })

    it('render loading spinner on isLoading', () => {
      mockUseProducts.mockReturnValue({ isLoading : true })
      const appComponent = render(<App />);

      const loadingComponent = appComponent.getByTestId('loading');
      expect(loadingComponent).toBeInTheDocument();
    })
    
    it('render error message on isError', () => {
      mockUseProducts.mockReturnValue({ isError : true });
      const appComponent = render(<App />);

      const errorElement = appComponent.getByTestId('error');

      expect(errorElement).toBeInTheDocument();
    });

    describe.each([
      ['title'],
      ['description'],
      ['price'],
      ['image'],
    ])('check %s data renders currectly', (element) => {
      it(`render currect data on DOM ${element} element`, () => {

        //mock api
        mockUseProducts.mockReturnValue({
          isError: false,
          isLoading : false,
          data : mokedReturnData
        });
  
        const appComponent = render(<App />);
  
        const renderedElement = appComponent.getByTestId(element);
        
        expect(renderedElement).toBeInTheDocument();
  
      })
    })

  })

  describe('integration app testing', () => {
    let appComponent:RenderResult;

    beforeEach(() => {
      const mokedReturnData = [{
        id : 1,
        category : 'test',
        description: 'test',
        image : 'test',
        price : 10,
        title : 'test',
        amount : 10
      }]

     
      mockUseProducts.mockReturnValue({ isLoading : false, isError: false, data: mokedReturnData });

      appComponent = render(<App />)

      clickCartButton(appComponent);
      
      showDrawer(appComponent);

    })

    afterEach(() => {
      jest.clearAllMocks();
    })

    it.skip('show drawer on Click cartIcon button', () => {
      const appComponent = render(<App />)
      
      showDrawer(appComponent);

      //assert it
      const drawerEl = appComponent.getByTestId('drawer');

      expect(drawerEl).toBeInTheDocument();
    })

    it('increase amount cartitem by click plus', () => {
      const increaseButtons = appComponent.queryAllByTestId('increase');

      const amounts = screen.queryAllByTestId('amount') as Element[];
      
      const lastAmount =  +amounts[0].innerHTML;

      fireEvent.click(increaseButtons[0]);

      const newAmounts = screen.queryAllByTestId('amount') as Element[];
    
      expect(newAmounts[0].innerHTML).toBe(  String(lastAmount + 1)  )
    })

    describe('decrease amount', () => {
      it('decrease amount item by click minus', () => {

        //added amount to test more than one amount on click decrease button
        const increaseButtons = appComponent.queryAllByTestId('increase');
        fireEvent.click(increaseButtons[0])

        //get button
        const decreaseButton = appComponent.queryAllByTestId('decrease') as Element[];
  
        const amounts        = appComponent.queryAllByTestId('amount') as Element[];
  
        //get last amount
        const lastAmount     = +amounts[0].innerHTML;
  
        //click button
        fireEvent.click(decreaseButton[0]);
  
        //get new amount 
        const newAmount = appComponent.queryAllByTestId('amount') as Element[];
  
        //assert
        expect(newAmount[0].innerHTML).toBe( String( lastAmount - 1) )
      })

      it('item not exist on amount one when clicked decrease button', () => {
        const decreaseButton = appComponent.queryAllByTestId('decrease') as Element[];
        fireEvent.click(decreaseButton[0]);
        
        //get new amount 
        const newAmount = appComponent.queryAllByTestId('amount') as Element[];
        
        //assert
        expect(newAmount[0]).toBe( undefined )
      })
    })
    
  });

  