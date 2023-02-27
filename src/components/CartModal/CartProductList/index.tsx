import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ProductsContext } from '../../../providers/ProductsContext/ProductsContext';
import { IProductCart } from '../../../providers/ProductsContext/Types';


const CartProductList = () => {
  const {cartList, removeAllProductsFromCartList} = useContext(ProductsContext)

  const totalValue = cartList.reduce((acum: number, currt: { price: number; amount: number; }) => {
    let value = 0
    value = currt.price * currt.amount

    return acum + value
}, 0)

  return(
  <StyledCartProductList>
    <ul>
      {cartList.map((product: IProductCart)=>(<CartProductCard key={product.id} product={product} />))}
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>{totalValue.toFixed(2)}</StyledParagraph>
    </div>
    <StyledButton onClick={()=>removeAllProductsFromCartList()} $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
  )
};

export default CartProductList;
