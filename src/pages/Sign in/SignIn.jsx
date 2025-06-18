import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Typefield from "../../components/utils/Typefield";
import validationSchema from "./Valid.jsx";
import { handelSignIn } from "./api_Handler";
import Button from "../../components/utils/Button";
import logo from "../../assets/Logomark.png";
import { motion, AnimatePresence } from "framer-motion";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
        setErrorMsg("");
        const result = await handelSignIn(values, navigate);

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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className=" flex flex-col justify-center items-center w-full max-w-md m-auto bg-white p-8 rounded-lg shadow-md"
        >
          <motion.img
            whileHover={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 rgba(0, 0, 0, 0)",
                "0 0 25px rgba(135, 206, 250, 0.7)", 
                "0 0 0 rgba(0, 0, 0, 0)",
              ],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
              rotate: [0, 10, -10, 0],
              
            }}
            className="mb-4  rounded-full"
            src={logo}
            width={40}
            alt="Logo"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800  mb-6">
            Sign In
          </h2>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="w-full space-y-6">
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignIn;
