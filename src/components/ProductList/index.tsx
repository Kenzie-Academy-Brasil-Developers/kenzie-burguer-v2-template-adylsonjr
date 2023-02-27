import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ProductsContext } from '../../providers/ProductsContext/ProductsContext';
import { IProduct } from '../../providers/ProductsContext/Types';



const ProductList = () => {

  const { searchProductsList} = useContext(ProductsContext)
  return(
  <StyledProductList>
    {searchProductsList.map((product: IProduct)=>(  <ProductCard key={product.id} product={product} />))}
  </StyledProductList>
  )
};

export default ProductList;
