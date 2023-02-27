export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IProduct{
  id: number,
  name: string,
  price: number,
  img: string
  category: string
}

export interface IProductCart{
  amount: number,
  category: string,
  id: number,
  img: string,
  name: string,
  price: number,
  uuid: string
}
