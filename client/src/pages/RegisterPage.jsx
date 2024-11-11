import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("Vui lòng nhập họ đệm"),
  lastname: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  mobile: yup
    .number()
    .min(10, "Số điện thoại tối thiểu 10 số")
    .required("Vui lòng nhập số điện thoại"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerState = useSelector((state) => state?.auth);
  const { isSuccess, isLoading, createdUser } = registerState;
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(register(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess && createdUser) {
      navigate("/verify-email");
    }
  }, [isSuccess, createdUser]);
  return (
    <div>
      <Meta title={"Đăng kí"} />
      <BreadCrumb title="Đăng kí" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="login-card p-4">
                <h3 className="text-center mb-3">Đăng kí</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div className="">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Họ đệm"
                      className="form-control"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                  </div>
                  <div
                    className="text-danger"
                    style={{ fontSize: "14px", fontStyle: "inherit" }}
                  >
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <p className="mb-0">{formik.errors.firstname}</p>
                    ) : null}
                  </div>

                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Tên"
                      className="form-control"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                  </div>
                  <div
                    className="text-danger"
                    style={{ fontSize: "14px", fontStyle: "inherit" }}
                  >
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <p className="mb-0">{formik.errors.lastname}</p>
                    ) : null}
                  </div>

                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
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
                      placeholder="Mật khẩu"
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

                  <div className="mt-1">
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Số điện thoại"
                      className="form-control"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                  </div>
                  <div
                    className="text-danger"
                    style={{ fontSize: "14px", fontStyle: "inherit" }}
                  >
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <p className="mb-0">{formik.errors.mobile}</p>
                    ) : null}
                  </div>

                  <div className="mt-2">
                    <p>
                      Bạn có tài khoản để <Link to="/login">Đăng nhập</Link>
                    </p>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0 " type="submit">
                        {isLoading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Đăng kí
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

export default RegisterPage;
