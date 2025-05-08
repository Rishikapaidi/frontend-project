import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const FormikExample: React.FC = () => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  });

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your first name"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your last name"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email address"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikExample; 