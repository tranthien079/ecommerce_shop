import React from "react";
import { base_url } from "../utils/base_url";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

// Yup schema for validation
const contactSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  phone: Yup.string().matches(/^[0-9]+$/, "Số điện thoại không hợp lệ").required("Số điện thoại không được để trống"),
  message: Yup.string().required("Lời nhắn không được để trống"),
});

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values,  { resetForm }) => {
      try {
        const response = await axios.post(`${base_url}user/send-mail`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.data.success) {
          resetForm();
          toast.success("Gửi liên hệ thành công!");
        } else {
          toast.error("Gửi không thành công!");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("Đã xảy ra lỗi khi gửi form.");
      }
    },
  });

  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.857562417006!2d106.68492447573628!3d10.822210558346056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e5496d03cf%3A0xa5b8e7395ec636b9!2zMTIgTmd1eeG7hW4gVsSDbiBC4bqjbywgUGjGsOG7nW5nIDQsIEjhu5MgQ2jDrCBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1724077778397!5m2!1svi!2s"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="row contact-inner-wrapper">
                <div className="col-12 col-md-6">
                  <h3 className="contact-title">Liên hệ</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-15"
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-danger" style={{ fontSize: '14px' }}>{formik.errors.name}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-danger" style={{ fontSize: '14px' }}>{formik.errors.email}</div>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="text-danger" style={{ fontSize: '14px' }}>{formik.errors.phone}</div>
                      )}
                    </div>
                    <div>
                      <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        placeholder="Lời nhắn"
                        className="w-100 form-control"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.message && formik.errors.message && (
                        <div className="text-danger" style={{ fontSize: '14px' }}>{formik.errors.message}</div>
                      )}
                    </div>
                    <div>
                      <button type="submit" className="button border-0 mt-2">
                        Gửi
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-6">
                  <h3 className="contact-title">Địa chỉ</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          Văn Phòng: A07-08 tòa Sarica, Đ. D9, KĐT Sala, P. An
                          Lợi Đông, Q.2, TP. HCM.
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+84818872887">+84 8 1887 2887</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:info@stsgroup.org.vn">
                          info@stsgroup.org.vn
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Thứ hai - Thứ sáu 9AM - 5PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
