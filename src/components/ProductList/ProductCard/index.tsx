import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import {
  IProduct,
} from '../../../providers/ProductsContext/Types';
import { ProductsContext } from '../../../providers/ProductsContext/ProductsContext';

const ProductCard = ({ product }: { product: IProduct }) => {
  const { addProductToCartList } = useContext(ProductsContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>
          R${product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          onClick={() => addProductToCartList(product)}
          $buttonSize='medium'
          $buttonStyle='green'
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
