import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectRoute from './pages/protectRoute';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const Router = () => (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/shop' element={<ProtectRoute/>}>
      <Route path='/shop' element={<ShopPage />} />
      </Route>
    </Routes>
  );

export default Router;
