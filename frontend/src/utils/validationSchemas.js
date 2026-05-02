import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const locationSchema = Yup.object().shape({
  lat: Yup.number()
    .min(-90, 'Invalid latitude')
    .max(90, 'Invalid latitude')
    .required('Latitude is required'),
  lng: Yup.number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude')
    .required('Longitude is required'),
  userId: Yup.string().required('User ID is required'),
});
