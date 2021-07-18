import { useState } from 'react';
import { useQuery } from 'react-query';
//components
import { Grid, LinearProgress, Drawer } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
import Cart from './cart/Cart';
//styles
import { Wrapper,StyledButton } from './App.styles';
import Item from './item/Item';
//types
export type CartItemType = {
  id: number;
  category: string;
  image: string;
  price: number;
  description: string;
  title: string;
  amount: number;
}
const getProducts = async ():Promise<CartItemType[]> => {
  const resp = await fetch(`https://fakestoreapi.com/products`);
  return resp.json();
};
const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, status } = useQuery<CartItemType[]>('products', getProducts);

  const getTotalItems = (items: CartItemType[]) => items.reduce((acc:number,item)=>acc+item.amount,0)

  const handleAddToCart = (clikedItem: CartItemType) =>
    setCartItems(prev => {
      //1.Is the item already added in cart?
      const isItemInCart = prev.find(item => item.id === clikedItem.id)
      if (isItemInCart) {
        return prev.map(item => {
          return item.id === clikedItem.id ? { ...item, amount: item.amount + 1 } : item
        })
      }
      //first time the item is added
      return [...prev, { ...clikedItem, amount: 1}];
    })
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc,{...item,amount:item.amount-1}]
        } else {
          return [...acc,item]
        }
      },[] as CartItemType[])
    )
  }
  if (status === "loading") return <LinearProgress />
  if(status==="error") return <div>Sometings went wrong...</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>{setCartOpen(false)}}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item:CartItemType)=> {
          return (
            <Grid item key={item.id} xs={12} sm={4} className="single--item">
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
          )
        })}
      </Grid>
    </Wrapper>
  );
};
export default App;