import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'
import { cilPencil, cilTrash, cilUser } from '@coreui/icons'
import { AppHeader, AppSidebar } from 'src/components'
import CIcon from '@coreui/icons-react'

export default function Order_list() {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className=" flex-grow-1 px-3">

        </div>
      </div>
    </>
  )
}

