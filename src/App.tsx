import { AddShoppingCart } from '@mui/icons-material';
import { Badge, Drawer, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import './App.css';
import { StyledButton, Wrapper } from './App.style';
import Cart from './component/Cart';
import Item from './component/Item/Item';
import { useProductsQuery } from './hooks/useProductsQuery';
import { cartItemType } from './types/apis';



function App() {
  const [ isCartOpen, setIsCartOpen ] = React.useState(false);
  const [ cartItems, setCartItems ]   = React.useState([] as cartItemType[]);

  const { data, isLoading, error, isError } = useProductsQuery();

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems( prev => {
      const isCartExistsInCarts = cartItems.some( cart => cart.id === clickedItem.id );

      if( !isCartExistsInCarts ) return [ ...prev, { ...clickedItem, amount : 1}];

      return prev.map( item => 
          item.id === clickedItem.id 
          ?
          { ...item, amount: item.amount + 1 }
          :
          item
        )
    })
  };

  const handleRemoveCart = (id: number) => {
    setCartItems( prev => {
      return prev.reduce( (acc, item)  => {

        if( item.id === id && item.amount === 1) return acc;

        if( item.id === id ) return [ ...acc, {...item, amount : item.amount - 1 }]

        return [...acc, item];
      }, [] as cartItemType[] )
    })
  };
  
  const getTotalItems   = (items: cartItemType[]) => items.reduce( (ack:number, item) => ack + item.amount , 0)
  
  if( isLoading ) return <LinearProgress data-testid="loading" />

  if( isError ) return <div data-testid="error">some errors uccured</div>
  return (
      <Wrapper data-testid="app">
        <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false) } data-testid="drawer">
            <Cart 
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveCart}
            />
        </Drawer>

        <StyledButton data-testid="cartIcon" onClick={ () => setIsCartOpen(true) }>
          <Badge color="error"  badgeContent={getTotalItems(cartItems)}>
            <AddShoppingCart />
          </Badge>
        </StyledButton>

        <Grid container spacing={3}>
          { data?.map(item => (
            <Grid item xs={12} md={4} key={item.id} >
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          )) }
        </Grid>
      </Wrapper>
  );
}

export default App;
