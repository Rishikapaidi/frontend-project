//Most recent working version
/*
import React, { useState } from 'react';           
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register, login } from '../services/authService';
import './App.css';

interface AuthFormProps {
  onLoginSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().when("$isLogin", {
      is: false,
      then: schema => schema.required("First name is required"),
    }),
    last_name: Yup.string().when("$isLogin", {
      is: false,
      then: schema => schema.required("Last name is required"),
    }),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().nullable().when("$isLogin", {
      is: false,
      then: schema => schema.required("Role is required"),
    })
  });

  const handleSubmit = (values: any) => {
    const { first_name, last_name, email, password, role } = values;

    if (isLogin) {
      login(email, password).then(
        () => {
          onLoginSuccess();
        },
        error => {
          setMessage('Login failed. Please check your credentials.');
        }
      );
    } else {
      register(first_name, last_name, email, password, role).then(
        () => {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true);
        },
        error => {
          setMessage('Registration failed. Please try again.');
        }
      );
    }
  };

  return (
    <div className="hero">
      <div className="hero-image"></div>
      <div className="hero-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <Formik
          initialValues={{ first_name: '', last_name: '', email: '', password: '', role: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          context={{ isLogin }}
        >
          <Form>
            {!isLogin && (
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label>Choose Role:</label>
                <div style={{ display: 'flex', gap: '50px', justifyContent: 'left' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Field type="radio" name="role" value="customer" /> Customer
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Field type="radio" name="role" value="serviceProvider" /> Service Provider
                  </label>
                </div>
                <ErrorMessage name="role" component="div" />
              </div>
            )}
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <Field name="first_name" type="text" />
                  <ErrorMessage name="first_name" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <Field name="last_name" type="text" />
                  <ErrorMessage name="last_name" component="div" />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </div>

            {message && <div>{message}</div>}

            <div className="account-switch" style={{ textAlign: 'center', marginTop: '10px' }}>
              <p>{isLogin ? 'Do not have an account?' : 'Already have an account?'}</p>
              <a href="#" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
*/

//New code added
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register, login } from '../services/authService';
import { loginSuccess } from '../slices/authSlice';
import './App.css';

const AuthForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().when("$isLogin", {
      is: false,
      then: schema => schema.required("First name is required"),
    }),
    last_name: Yup.string().when("$isLogin", {
      is: false,
      then: schema => schema.required("Last name is required"),
    }),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().nullable().when("$isLogin", {
      is: false,
      then: schema => schema.required("Role is required"),
    })
  });

  const handleSubmit = (values: any) => {
    const { first_name, last_name, email, password, role } = values;

    if (isLogin) {
      login(email, password).then(
        (userData) => {
          dispatch(loginSuccess(userData));
        },
        () => setMessage('Login failed. Please check your credentials.')
      );
    } else {
      register(first_name, last_name, email, password, role).then(
        () => {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true);
        },
        () => setMessage('Registration failed. Please try again.')
      );
    }
  };

  return (
    <div className="hero">
      <div className="hero-image"></div>
      <div className="hero-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <Formik
          initialValues={{ first_name: '', last_name: '', email: '', password: '', role: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          context={{ isLogin }}
        >
          <Form>
            {!isLogin && (
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label>Choose Role:</label>
                <div style={{ display: 'flex', gap: '50px', justifyContent: 'left' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Field type="radio" name="role" value="customer" /> Customer
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Field type="radio" name="role" value="serviceProvider" /> Service Provider
                  </label>
                </div>
                <ErrorMessage name="role" component="div" />
              </div>
            )}

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <Field name="first_name" type="text" />
                  <ErrorMessage name="first_name" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <Field name="last_name" type="text" />
                  <ErrorMessage name="last_name" component="div" />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </div>

            {message && <div>{message}</div>}

            <div className="account-switch" style={{ textAlign: 'center', marginTop: '10px' }}>
              <p>{isLogin ? 'Do not have an account?' : 'Already have an account?'}</p>
              <a href="#" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
