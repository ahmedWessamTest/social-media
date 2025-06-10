import * as Yup from 'yup';

const validationSchema = Yup.object({
 

  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),

    newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    )
    .required('new Password is required'),
 
});

export default validationSchema;
