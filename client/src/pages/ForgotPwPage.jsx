import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/user/userSlice";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});
const ForgotPwPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(forgotPassword(values));
      resetForm();
    },
  });

  return (
    <div>
      <Meta title={"Quên mật khẩu"} />
      <BreadCrumb title="Quên mật khẩu" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="login-card">
                <h3 className="text-center mb-3">Thiết lập lại mật khẩu</h3>
                <p className="text-center mt-2 mb-3">
                  Bạn sẽ nhận được link đổi mật khẩu mới qua email.
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Nhập email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button type="submit" className="button border-0">
                        Đặt lại mật khẩu
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwPage;
