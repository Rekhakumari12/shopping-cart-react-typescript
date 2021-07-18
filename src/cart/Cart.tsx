import CartItem from "../cartItem/CartItem";
//Styles
import { Wrapper } from "./Cart.style";
//Types
import { CartItemType } from "../App";
import Item from "../item/Item";
type Props = {
  cartItems: CartItemType[];
  addToCart: (clikedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}
const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) => {
    return items.reduce((acc,item)=>acc+item.amount*item.price,0)
  }
  return (
    <Wrapper>
      <h2>Your Shpoing Cart</h2>
      {cartItems.length === 0 ? <div>No items in cart</div> : null}
      {cartItems?.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  )
}
export default Cart 