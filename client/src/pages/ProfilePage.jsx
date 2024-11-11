import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUserInfo } from '../redux/user/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user); // Get user info from Redux
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string().required('Vui lòng nhập họ đệm'),
    lastname: Yup.string().required('Vui lòng nhập tên'),
    mobile: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 số'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ')
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    await dispatch(updateUserInfo(values)); 
  };

  return (
    <div className="container">
      <h2 className='text-center'>Cập nhật thông tin khách hàng</h2>
      <Formik
        initialValues={{
          firstname: user?.firstname || '',
          lastname: user?.lastname || '',
          mobile: user?.mobile || '',
          email: user?.email || '',
          address: user?.address || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-3 login-card">
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">Họ đệm</label>
              <Field name="firstname" type="text" className="form-control" />
              <ErrorMessage name="firstname" component="div" className="text-danger" />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastname" className="form-label">Tên</label>
              <Field name="lastname" type="text" className="form-control" />
              <ErrorMessage name="lastname" component="div" className="text-danger" />
            </div>

            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label">Số điện thoại</label>
              <Field name="mobile" type="text" className="form-control" />
              <ErrorMessage name="mobile" component="div" className="text-danger" />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Địa chỉ</label>
              <Field name="address" type="text" className="form-control" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            <div className="col-12 ">
              <button type="submit" className="btn btn-primary mx-auto btn-md " style={{ padding: '10px 30px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'Lưu'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfilePage;
