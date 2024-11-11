import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, login } from "../redux/user/userSlice";
import * as yup from "yup";
import { useFormik } from "formik";
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});
const LoginPage = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.auth);
  const { isLoading, user } = authState;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await dispatch(login(values));
    },
  });

  return (
    <div>
      {user?._id && <Navigate to="/" replace={true} />}
      <Meta title={"Đăng nhập"} />
      <BreadCrumb title="Đăng nhập" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="login-card">
                <h3 className="text-center mb-3">Đăng nhập</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div className="">
                    <input
                      type="email"
                      name="email"
                      placeholder="Nhập email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                  </div>
                  <div
                    className="text-danger"
                    style={{ fontSize: "14px", fontStyle: "inherit" }}
                  >
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mb-0">{formik.errors.email}</p>
                    ) : null}
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                  </div>
                  <div
                    className="text-danger"
                    style={{ fontSize: "14px", fontStyle: "inherit" }}
                  >
                    {formik.touched.password && formik.errors.password ? (
                      <p className="mb-0">{formik.errors.password}</p>
                    ) : null}
                  </div>
                  <div>
                    <Link to="/forgot-password">Quên mật khẩu</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                      {isLoading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Đăng nhập
                      </button>
                      <Link to="/register" className="button signup">
                        Đăng kí
                      </Link>
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

export default LoginPage;
