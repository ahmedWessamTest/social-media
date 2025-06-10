import React from "react";
import Typefield from "../../../components/utils/Typefield";
import { useFormik } from "formik";
import { handleChangePassword } from "./ApiHandelrs";
import Button from "../../../components/utils/Button";
import validationSchema from "./Valid";

const ChangePassword = () => {
  function changePassword(values) {
    handleChangePassword(values);
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });

  return (
    <div className="w-3/4 pl-6 space-y-5">
      <div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <p className="text-sm font-medium text-[#111827] mb-5">Change Your Password</p>

          <Typefield
            name="password"
            type="text"
            placeholder="Enter Your old Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            touched={formik.touched.password}
          />

          <Typefield
            name="newPassword"
            type="text"
            placeholder="Enter Your New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : null}
            touched={formik.touched.newPassword}
          />

          <Button disabled={!(formik.isValid && formik.dirty)} />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
