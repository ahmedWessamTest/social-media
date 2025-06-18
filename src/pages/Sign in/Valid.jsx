import * as Yup from 'yup';

const validationSchema = Yup.object({
 
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),

 
});

export default validationSchema;
