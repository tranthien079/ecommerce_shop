import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Assuming React Router is used
import Meta from '../components/Meta';

const AccountPage = () => {
  return (
    <div className="container my-4">
       <Meta title='Tài khoản' />
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <NavLink
              to="/account"
              end // Chỉ kích hoạt lớp 'active' khi route khớp chính xác '/account'
              className={({ isActive }) =>
                isActive ? 'list-group-item list-group-item-action active bg-secondary border-secondary text-white' : 'list-group-item list-group-item-action'
              }
            >
              Tài khoản của tôi
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? 'list-group-item list-group-item-action active bg-secondary border-secondary text-white' : 'list-group-item list-group-item-action'
              }
            >
              Lịch sử đơn hàng
            </NavLink>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9">
          {/* Render the component matching the route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
