import React from 'react';
import { withFormik, Form, Field } from 'formik';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterForm = ({ values, errors, touched, isSubmitting, props }) => {
  
  return(
    <main>
      <Form>
        <Field type="text" name="firstName" placeholder="First Name" />
        <div className="error">
          {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <Field type="text" name="lastName" placeholder="Last Name" />
        <div className="error">
          {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <Field type="email" name="email" placeholder="eMail" />
        <div className="error">
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <Field type="password" name="password" placeholder="Password" />
        <div className="error">
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <label htmlFor="tos">
          <Field type="checkbox" id="tos" name="tos" checked={values.tos} /> Accept Terms of Service
        </label>
        <div className="error">
          {touched.tos && errors.tos && <p>{errors.tos}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>{
          isSubmitting ? <Loader type="Audio" color="#ffffff" width="100%" height="100%"  /> : 'Register'
        }</button>
      </Form>
    </main>
  )
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ firstName, lastName, password, email, tos }) {
    return {
      firstName: firstName || "",
      lastName:  lastName || "",
      email:     email || "",
      password:  password || "",
      tos:       tos || false
    }
  },
  handleSubmit: ( values, formikBag ) => {
    formikBag.resetForm();
    const url= "https://reqres.in/api/users";
    axios.post( url, values )
      .then( res => {
        console.log(res.data);
        alert(`You submitted:\n\t\t\tFirst Name:${res.data.firstName}\n\t\t\tLast Name: ${res.data.lastName}\n\t\t\teMail: ${res.data.email}\n\t\t\tPassword: ${res.data.password}\n\t\t\tAgreed to ToS: ${res.data.tos}`);
      })
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Your first name must be longer than 2 characters")
      .max(15, "Your first name cannot be longer than 15 characters")
      .required("Your first name is required"),
    lastName: Yup.string()
      .min(2, "Your last name must be longer than 2 characters")
      .max(15, "Your last name cannot be longer than 15 characters")
      .required("Your last name is required"),
    email: Yup.string()
      .email()
      .max(20, "Your email cannot be longer then 20 characters")
      .required("Your email is required"),
    password: Yup.string()
      .min(6, "Your password must be longer than 6 characters")
      .max(20, "Your password cannot be longer then 20 characters"),
    tos: Yup.boolean()
      .oneOf([true], 'You must accept the Terms of Service')
  })
})(RegisterForm);

export default FormikLoginForm;