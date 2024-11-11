import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordToken } from "../redux/user/userSlice";
import { useLocation } from "react-router-dom";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});
const ResetPwPage = () => {
  const localtion = useLocation();
  const token = localtion.pathname.split("/")[2];
  console.log(token)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const data = {...values, token}
      dispatch(changePasswordToken(data));
      resetForm();
    },
  });

  return (
    <div>
      <Meta title={"Đổi mật khẩu"} />
      <BreadCrumb title="Đổi mật khẩu" />
      <div className="login-wrapper py-5 home-wrapper-2">
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
            <div className="login-card">
              <h3 className="text-center mb-3">Đổi mật khẩu mới</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div>
                  <label htmlFor="password">Mật khẩu mới</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu mới"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="passwordConfirm">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Nhập xác nhận mật khẩu"
                    className="form-control"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div className="text-danger">{formik.errors.passwordConfirm}</div>
                  ) : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Lưu
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

export default ResetPwPage;
