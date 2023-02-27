import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IDefaultProviderProps, IProduct, IProductCart } from "./Types";
import { api } from "../../services/api";

interface IProductsContext{
  cartModal: boolean,
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>,
  products: IProduct[] | [],
  localCartList: string | null,
  cartList: IProductCart[] | [],
  setCartList: React.Dispatch<IProduct[] | []>
  setCountProduct: React.Dispatch<React.SetStateAction<number>>,
  countProduct: number,
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
  addProductToCartList: (product: IProductCart) => void
  removeProductFromCartList: (productId: string) => void
  removeAllProductsFromCartList: () => void
  searchProductsList:  IProduct[]
}


export const ProductsContext = createContext({} as IProductsContext)

export const ProductsProvider = ({children}:IDefaultProviderProps)=>{
  const [cartModal, setCartModal] = useState(false)
  const [products, setProducts] = useState<IProduct[] | []>([])
  const localCartList = localStorage.getItem("@KenzieBurguerCartList")
  const [cartList, setCartList] = useState(localCartList ? JSON.parse(localCartList) : []);
  const [countProduct, setCountProduct] = useState(1)
  const [search, setSearch] = useState("")

  const searchProductsList = products.filter((product) => search === "" ? true : (product.name.toLocaleLowerCase()).includes(search.toLocaleLowerCase()) ||
      (product.category.toLocaleLowerCase()).includes(search.toLocaleLowerCase()))

  const listProducts = async ()=>{
    const token = localStorage.getItem("@TOKEN")
    try {
      const response = await api.get<IProduct>("/products", {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listProducts()
  },[])

  useEffect(() => {
    localStorage.setItem("@KenzieBurguerCartList", JSON.stringify(cartList));
  }, [cartList])

  const addProductToCartList = (product:IProductCart) => {


    if (!cartList.includes(product)) {

      setCartList([...cartList, product])
      product.amount = 1
      product.uuid = uuidv4()
    } else {

      setCountProduct(product.amount + 1)
      product.amount += 1
    }
  
  }

  const removeProductFromCartList = (productId: string) => {

    const newCartList = cartList.filter(product => product.uuid !== productId)
    setCartList(newCartList)
   
  }

  const removeAllProductsFromCartList = ()=>{

    setCartList([])

  }



  return(
    <ProductsContext.Provider value={{cartModal, setCartModal, products, localCartList, cartList, setCartList, setCountProduct, countProduct, search, setSearch, addProductToCartList,removeProductFromCartList, removeAllProductsFromCartList, searchProductsList }}>
      {children}
    </ProductsContext.Provider>
  )
}