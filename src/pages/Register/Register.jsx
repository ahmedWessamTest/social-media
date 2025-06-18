import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Typefield from "../../components/utils/Typefield";
import validationSchema from "./Valid";
import { handelRegister } from "./api_Handler";
import Button from "../../components/utils/Button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/Logomark.png";


const Register = () => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await handelRegister(values, navigate);
        setLoading(false);
      } catch (error) {
        console.error("Registration error:", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        >
         <img src={logo} width={40} className="mb-3" alt="Logo" />
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Sign up
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <Typefield
              name="name"
              type="text"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
              touched={formik.touched.name}
            />

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

            <Typefield
              name="rePassword"
              type="password"
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.rePassword && formik.errors.rePassword
                  ? formik.errors.rePassword
                  : null
              }
              touched={formik.touched.rePassword}
            />

            <Typefield
              name="dateOfBirth"
              type="date"
              value={formik.values.dateOfBirth}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  ? formik.errors.dateOfBirth
                  : null
              }
              touched={formik.touched.dateOfBirth}
            />

            <Typefield
              name="gender"
              type="select"
              value={formik.values.gender}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.gender && formik.errors.gender
                  ? formik.errors.gender
                  : null
              }
              touched={formik.touched.gender}
              options={[
                { label: "Select Gender", value: "" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              I agree to the Terms and Privacy Policy.
            </label>

            <Button
              type="submit"
              label="Sign In"
              loadingLabel="Signing In..."
              loading={loading}
              disabled={loading || !agreed}
              className={`w-full py-2 rounded-md text-white ${
                agreed
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            />
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account?
            <Link
              to="/signin"
              className="text-blue-600 hover:font-semibold cursor-pointer ml-1"
            >
              Log In
            </Link>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Register;
