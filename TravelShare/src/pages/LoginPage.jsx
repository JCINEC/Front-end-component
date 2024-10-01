import React, { useState } from 'react'

import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import Header from '../components/HeaderComponent.jsx'
import { loginUser, registerUser } from '../core/services/userFetch.js'
import UserRoutesPage from './UserRoutesPage.jsx'
import '../styles.css';

import context from '../core/context/Context.js'


const LoginPage = () => {

  const [isLogin, setIsLogin] = useState(true)

  const {setCurrentUserName} = useContext(context)

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const isAdult = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    return age > 18 || (age === 18 && m >= 0);
  }
  
  const registrationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    userName: Yup.string().required('User name is required'),
    birthDate: Yup.object().shape({
      day: Yup.number().integer('Day must be an integer').positive("Day must be positive").required('Birth day is required'),
      month: Yup.number().integer('Month must be an integer').positive("Month must be positive").required('Birth month is required'),
      year: Yup.number().integer('Year must be an integer').positive("Year must be positive").required('Birth year is required'),
    }).test('Adult', 'You must be at least 18 years old', (birthDate) => isAdult(birthDate)),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    hasDriverLicense: Yup.boolean().required('This field is required'),
    payment: Yup.string().required('This field is required')
  })

  const handleToggle = () => {
    setIsLogin(!isLogin)
  }

  const initialValues = isLogin
    ? { email: '', password: '' }
    : { firstName: '', lastName: '', userName: '', birthDate: { day: '', month: '', year: '' }, email: '', password: '', hasDriverLicense: '', payment: '' }

  return (
    <div>
      {(isLogin) ? <Header title='LOGIN' /> : <Header title='REGISTER' />}
      <Formik
        initialValues={initialValues}
        validationSchema={isLogin ? loginSchema : registrationSchema}
        onSubmit={ async (values) => {
          console.log(values)
          if (isLogin){
            await loginUser(values)
            setCurrentUserName(values.userName)
            return <UserRoutesPage />
          }else{
            await registerUser(values).status === 201
          }
          
        }}
      >
        {() => (
          <Form>
            {!isLogin && (
              <>
                <div>
                  <label>First Name: </label>
                  <Field name="firstName" />
                  <ErrorMessage name="firstName" component="div" className="error-message"/>
                </div>
                <div>
                  <label>Last Name: </label>
                  <Field name="lastName" />
                  <ErrorMessage name="lastName" component="div" className="error-message"/>
                </div>
                <div>
                  <label>User Name: </label>
                  <Field name="userName" />
                  <ErrorMessage name="userName" component="div" className="error-message"/>
                </div>
                <div>
                  <label>Birth Day: </label>
                  <Field name="birthDate.day" />
                  <ErrorMessage name="birthDate.day" component="div" className="error-message"/>
                </div>
                <div>
                  <label>Birth Month: </label>
                  <Field name="birthDate.month" />
                  <ErrorMessage name="birthDate.month" component="div" className="error-message"/>
                </div>
                <div>
                  <label>Birth Year: </label>
                  <Field name="birthDate.year" />
                  <ErrorMessage name="birthDate.year" component="div" className="error-message"/>
                </div>
                <div>
                  <label>You have a your driver's license: </label>
                  <Field as="select" name="hasDriverLicense">
                    <option value="">Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Field>
                  <ErrorMessage name="hasDriverLicense" component="div" className="error-message"/>
                </div>
                <div>
                  <label>Payment method: </label>
                  <Field as="select" name="hasDriverLicense">
                    <option value="">Select</option>
                    <option value={"visa"}>Visa</option>
                    <option value={"paypal"}>Paypal</option>
                  </Field>
                  <ErrorMessage name="hasDriverLicense" component="div" className="error-message"/>
                </div>
              </>
            )}
            <div>
              <label>email: </label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error-message"/>
            </div>
            <div>
              <label>Password: </label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error-message"/>
            </div>
            <button type="button" onClick={handleToggle}>
                {isLogin ? 'Register' : 'Back'}
            </button>
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage