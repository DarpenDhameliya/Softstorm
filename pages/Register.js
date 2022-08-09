import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let nevigate = useNavigate()
  const [reg, setReg] = useState({ name: '', email: '', password: '', c_password: '' })
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)
  const [valerr, setValerr] = useState([])

  const handlemess = (e, value) => {
    setReg({ ...reg, [e.target.name]: e.target.value })
    setSubmit(true)
    return value
  }

  const validation = (value) => {
    let errors = {}
    setSubmit(true)
    //name
    // const code = '/^[a-zA-Z]+$/'
    // if (
    //   value.name === '' ||
    //   value.email === '' ||
    //   value.password === '' ||
    //   value.c_password === ''
    // ) {
    if (!value.name) {
      setSubmit(false)
      errors.name = 'Enter name'
    } else if (value.name.length < 3) {
      setSubmit(false)
      errors.name = 'Enter minimum 2 charecter'
    } else if (value.name.length > 20) {
      setSubmit(false)
      errors.name = 'Enter maximun 20 charecter'
    }
    //email
    // let text = '/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/'
    if (!value.email) {
      setSubmit(false)
      errors.email = 'email is Require'
    }
    //  else if (!value.email.match(text)) {
    //   errors.email = 'enter valid email'
    // }
    //pass
    // const charsm = ' /[a-z]/g'
    // const charup = ' /[A-Z]/g'
    // const num = '/[0-9]/g'
    // const spec = '/(?=.*?[#?!@$%^&*-])/'
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
    // else if (!value.password.match(charup)) {
    //   errors.password = 'Enter atlist 1 uppercase charecter'
    // } else if (!value.password.match(num)) {
    //   errors.password = 'Enter atlist 1 digit'
    // } else if (!value.password.match(spec)) {
    //   errors.password = 'Enter altlist 1 special keyword'
    // } else if (!value.password.match(charsm)) {
    //   errors.password = 'Enter atlist 1 lowercase charecter'
    // }
    if (!value.c_password) {
      setSubmit(false)
      errors.c_password = 'conform password Required'
    } else if (value.c_password !== value.password) {
      setSubmit(false)
      errors.c_password = 'your conform password is different'
    }
    setErrors(errors)
    console.log(errors)

    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0) {
      // console.log('done')
      setSubmit(true)
    } else {
      // console.log('reject')
      setSubmit(false)
    }
    return [errors]
  }

  const sendMess = async (e) => {
    e.preventDefault()
    // const data = new FormData(e.currentTarget)
    // setReg({ name: '', email: '', password: '', c_password: '' })
    // console.log({
    //   name: data.get('name'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   c_pass: data.get('c_password'),
    // })

    setErrors(validation(reg))
    console.log('send', [errors])
    console.log('sub', submit)
    if (validation(reg) && submit === true) {
      const res = await fetch('http://192.168.0.98/API/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json2',
        },
        body: JSON.stringify({
          name: reg.name,
          email: reg.email,
          password: reg.password,
          c_password: reg.c_password,
        }),
      })
      const ddata = await res.json()
      console.log('responce', ddata)
      if (ddata.success === true) {
        sessionStorage.setItem('tokan', ddata.tokan)
        nevigate('/Login')
      } else {
        setValerr(ddata.message)
      }
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={sendMess}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="name"
                      type="text"
                      autoComplete="name"
                      id="name"
                      name="name"
                      onChange={handlemess}
                      value={reg.name}
                    // required
                    />
                  </CInputGroup>
                  <div>{errors.name && <p className='handerr'>{errors.name}</p>}</div>
                  <div>{valerr.name && <p className='handerr'>{valerr.name}</p>}</div>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="abc@gmail.com"
                      type="email"
                      autoComplete="email"
                      id="email"
                      name="email"
                      onChange={handlemess}
                      value={reg.email}
                    // required
                    />
                  </CInputGroup>
                  <div>{errors.email && <p className='handerr'>{errors.email}</p>}</div>
                  <div>{valerr.email && <p className='handerr'>{valerr.email}</p>}</div>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Abcbef@"
                      autoComplete="password"
                      id="password"
                      name="password"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                      onChange={handlemess}
                      value={reg.password}
                    // required
                    />
                  </CInputGroup>
                  <div>{errors.password && <p className='handerr'>{errors.password}</p>}</div>
                  <div>{valerr.password && <p className='handerr'>{valerr.password}</p>}</div>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Abcbef@"
                      autoComplete="c_password"
                      id="c_password"
                      name="c_password"
                      onChange={handlemess}
                      value={reg.c_password}
                    // required
                    />
                  </CInputGroup>
                  <div>{errors.c_password && <p className='handerr'>{errors.c_password}</p>}</div>
                  <div className="d-grid">
                    <CButton color="success" type="submit" >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
