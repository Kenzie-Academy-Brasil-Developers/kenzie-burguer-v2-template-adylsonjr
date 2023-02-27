import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { IProductCart } from '../../../../providers/ProductsContext/Types';
import { ProductsContext } from '../../../../providers/ProductsContext/ProductsContext';

const CartProductCard = ({product}:{product:IProductCart}) => {

  const {removeProductFromCartList} = useContext(ProductsContext)

  return(
  <StyledCartProductCard>
    <div className='imageBox'>
      <img src={product.img} alt={product.name} />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {product.name}
      </StyledTitle>
      <button onClick={()=>removeProductFromCartList(product.uuid)} type='button' aria-label='Remover'>
        <MdDelete size={24} />
      </button>
      <span>{product.amount}</span>
    </div>
  </StyledCartProductCard>
  )
};

export default CartProductCard;
