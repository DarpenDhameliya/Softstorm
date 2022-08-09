import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  let nevigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(true)
  const [valerr, setValerr] = useState([])

  const handleval = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }

  const validation = (value) => {
    let errors = {}
    setSubmit(true)
    if (!value.email) {
      setSubmit(false)
      errors.email = 'email is Require'
    }

    if (!value.password) {
      setSubmit(false)
      errors.password = 'password Required'
    } else if (value.password.length > 20) {
      setSubmit(false)
      errors.password = 'Enter max 20 charecter'
    } else if (value.password.length < 6) {
      setSubmit(false)
      errors.password = 'Enter Minimun 6 charecter'
    }
    setErrors(errors)
    // console.log(errors)

    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
    return [errors]
  }

  const sendMess = async (e) => {
    e.preventDefault()
    // const data = new FormData(e.currentTarget)
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // })

    setErrors(validation(user))
    console.log('chcek error or validation', validation(user))
    console.log('submit or not', submit)
    if (validation(user) && submit === true) {
      console.log(user)
      const res = await fetch('http://192.168.0.98/API/api/login', {
        method: 'POST',
        headers: {
          "accept": 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json2',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      })
      const ddata = await res.json()
      console.log(ddata)
      if (ddata.success === true) {
        setUser({ email: '', password: '' })
        sessionStorage.setItem('userdata', JSON.stringify(ddata.data))
        nevigate('/dashboard')
      } else {

        setValerr(ddata.message)
      }
      // console.log('localstorage', ddata.data.token)
      // localStorage.setItem('tokan', ddata.data.token)
      // console.log('userdata', JSON.stringify(ddata.data))
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={sendMess}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {/* <h3>{mess}</h3> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        value={user.email}
                        onChange={handleval}
                        autoComplete="email"
                        id="email"
                        name="email"
                      />
                      {errors.email && <p className="handerr">{errors.email}</p>}
                      {valerr.email && <p className="handerr">{valerr.email}</p>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleval}
                      // required
                      />
                      {errors.password && <p className="handerr">{errors.password}</p>}
                      {valerr.password && <p className="handerr">{valerr.password}</p>}

                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login