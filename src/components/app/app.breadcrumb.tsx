import { Breadcrumb, BreadcrumbProps } from 'antd'
import { matchPath, useLocation } from 'react-router'

const breadcrumbNameMap: Record<string, { group: string, label: string, action?: string }> = {
  '/': { group: 'Tổng quan', label: 'Dashboard' },
  '/analytics': { group: 'Tổng quan', label: 'Thống kê' },
  '/users': { group: 'Quản lý', label: 'Khách hàng' },
  '/products': { group: 'Quản lý', label: 'Sản phẩm' },
  '/products/add': { group: 'Quản lý', label: 'Sản phẩm', action: "Thêm mới" },
  '/products/update/:id': { group: 'Quản lý', label: 'Sản phẩm', action: "Cập nhật" },
  '/variants': { group: 'Quản lý', label: 'Biến thể' },
  '/variants/add': { group: 'Quản lý', label: 'Biến thể', action: "Thêm mới" },
  '/variants/edit/:id': { group: 'Quản lý', label: 'Biến thể', action: "Cập nhật" },
  '/discounts': { group: 'Quản lý', label: 'Khuyến mại' },
  '/discounts/add': { group: 'Quản lý', label: 'Khuyến mại', action: "Thêm mới" },
  '/discounts/update/:id': { group: 'Quản lý', label: 'Khuyến mại', action: "Cập nhật" },
  '/categories': { group: 'Quản lý', label: 'Danh mục' },
  '/categories/add': { group: 'Quản lý', label: 'Danh mục', action: "Thêm mới" },
  '/categories/edit/:id': { group: 'Quản lý', label: 'Danh mục', action: "Cập nhật" },
  '/orders': { group: 'Quản lý', label: 'Đơn hàng' },
  '/order/details/:id': { group: 'Quản lý', label: 'Đơn hàng', action: "Chi tiết" },
  '/coupons': { group: 'Quản lý', label: 'Mã giảm giá' },
  '/coupons/add': { group: 'Quản lý', label: 'Mã giảm giá', action: "Thêm mới" },
  '/coupons/edit/:id': { group: 'Quản lý', label: 'Mã giảm giá', action: "Cập nhật" },
  '/reviews': { group: 'Quản lý', label: 'Đánh giá' },
}

const AppBreadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const matched = Object.entries(breadcrumbNameMap).find(([key]) =>
    matchPath(key, pathname)
  )?.[1];

  const breadcrumbItems: BreadcrumbProps['items'] = matched
    ? [
        { title: matched.group },
        { title: matched.label },
        ...(matched.action ? [{ title: matched.action }] : [])
      ]
    : [{ title: 'Trang không xác định' }];

  return (
    <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
  );
};

export default AppBreadcrumb;