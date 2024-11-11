import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d+$/, "Mã xác thực phải là số")
    .min(6, "Mã xác thực gồm 6 số")
    .max(6, "Mã xác thực gồm 6 số")
});

const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth);
  const { isSuccess, verifiedEmail, isLoading } = userState;
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values, { resetForm }) => {
      values.code = otp.join("");
      await dispatch(verifyEmail(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess && verifiedEmail) {
      toast.success("Xác thực email thành công");
      navigate("/login");
    }
  }, [isSuccess, verifiedEmail]);

  return (
    <div>
      <Meta title={"Xác thực email"} />
      <BreadCrumb title="Xác thực email" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="login-card">
                <h3 className="text-center mb-3">Xác thực email</h3>
                <p className="text-center mt-2 mb-3">
                  <span>Hãy nhập mã xác thực đã được gửi qua email đăng ký</span>
                </p>

                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          className="m-2 text-center form-control rounded fs-4"
                          type="text"
                          maxLength="1"
                          value={value}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          pattern="[0-9]*"
                        />
                      ))}
                    </div>
                    {formik.touched.code && formik.errors.code ? (
                      <div className="text-danger">{formik.errors.code}</div>
                    ) : null}
                  </div>

                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button type="submit" className="button border-0">
                      {isLoading && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Xác nhận
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

export default VerifyEmailPage;
