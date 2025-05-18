import { Route, Routes } from 'react-router'
import PrivateRouters from './private.routers'
import AdminLayout from '@/pages/AdminLayout'
import Dashboard from '@/pages/dashboard/dashboard'
import Users from '@/pages/users/users'
import Products from '@/pages/products/products'
import Variants from '@/pages/variants/variants'
import Discounts from '@/pages/discounts/discounts'
import Categories from '@/pages/categories/categories'
import Orders from '@/pages/orders/orders'
import Coupons from '@/pages/coupons/coupons'
import Reviews from '@/pages/reviews/reviews'
import NotFound from '@/pages/NotFound'
import Analytics from '@/pages/analytics/analytics'

const Routers = () => {
  const isAuthenticated = true

  return (
    <Routes>
      <Route element={<PrivateRouters isAllowed={isAuthenticated ? true : false} redirectTo='/signin' />}>
        <Route path='/' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/users' element={<Users />} />
          <Route path='/products' element={<Products />} />
          <Route path='/variants' element={<Variants />} />
          <Route path='/discounts' element={<Discounts />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/coupons' element={<Coupons />} />
          <Route path='/reviews' element={<Reviews />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers
