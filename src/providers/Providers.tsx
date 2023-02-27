import { ProductsProvider } from './ProductsContext/ProductsContext';
import { UserProvider } from './UserContext/UserContext';

interface IDefaultProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IDefaultProviderProps) => (
  <UserProvider>
    <ProductsProvider>
      {children}
    </ProductsProvider>
  </UserProvider>
);

export default Providers;
