import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Typefield from "../../components/utils/Typefield";
import validationSchema from "./Valid";
import { handelSignIn } from "./api_Handler";
import Button from "../../components/utils/Button";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // ✅ Added state for error message
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setErrorMsg(""); // ✅ Clear any existing error
        const result = await handelSignIn(values, navigate); // ✅ Capture result

        // ✅ Show error if login failed
        if (!result.success) {
          setErrorMsg(result.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {/* ✅ Show error message if exists */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Typefield
            name="email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
            touched={formik.touched.email}
          />

          <Typefield
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
            touched={formik.touched.password}
          />

          <Button
            type="submit"
            label="Sign In"
            loadingLabel="Signing In..."
            loading={loading}
            disabled={loading}
            className="font-semibold"
          />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't Have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
