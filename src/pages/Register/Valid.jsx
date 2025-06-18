import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),

  rePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth can't be in the future")
    .required('Date of Birth is required'),

  gender: Yup.string()
    .oneOf(['male', 'female'], 'Select either Male or Female')
    .required('Gender is required'),
});

export default validationSchema;
