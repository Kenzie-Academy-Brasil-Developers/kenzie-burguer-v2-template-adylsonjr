/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IDefaultProviderProps, IProduct, IProductCart } from './Types';
import { api } from '../../services/api';

interface IProductsContext {
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  products: IProduct[] | [];
  localCartList: string | null;
  cartList: IProduct[] | [];
  setCartList: React.Dispatch<IProduct[] | []>;
  setCountProduct: React.Dispatch<React.SetStateAction<number>>;
  countProduct: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  addProductToCartList: (product: IProduct) => void;
  removeProductFromCartList: (productId: string) => void;
  removeAllProductsFromCartList: () => void;
  searchProductsList: IProduct[];
  totalValue: number;
}

export const ProductsContext = createContext({} as IProductsContext);

export const ProductsProvider = ({ children }: IDefaultProviderProps) => {
  const [cartModal, setCartModal] = useState(false);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const localCartList = localStorage.getItem('@KenzieBurguerCartList');
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );
  const [countProduct, setCountProduct] = useState(1);
  const [search, setSearch] = useState('');

  const totalValue = cartList.reduce(
    (acum: number, currt: { price: number }) => acum + currt.price,
    0
  );

  const searchProductsList = products.filter((product) =>
    search === ''
      ? true
      : product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        product.category
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
  );

  const listProducts = async () => {
    const token = localStorage.getItem('@TOKEN');
    try {
      const response = await api.get<IProduct[]>('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('@KenzieBurguerCartList', JSON.stringify(cartList));
  }, [cartList]);

  const addProductToCartList = (product: IProduct) => {
    if (!cartList.includes(product)) {
      setCartList([...cartList, product]);
      product.uuid = uuidv4();
    }
  };

  const removeProductFromCartList = (productId: string) => {
    const newCartList = cartList.filter(
      (product: IProductCart) => product.uuid !== productId
    );
    setCartList(newCartList);
  };

  const removeAllProductsFromCartList = () => {
    setCartList([]);
  };

  return (
    <ProductsContext.Provider
      value={{
        cartModal,
        setCartModal,
        products,
        localCartList,
        cartList,
        setCartList,
        setCountProduct,
        countProduct,
        search,
        setSearch,
        addProductToCartList,
        removeProductFromCartList,
        removeAllProductsFromCartList,
        searchProductsList,
        totalValue,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
