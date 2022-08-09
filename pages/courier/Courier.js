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

export default function Courier() {
  const [counm, setCounm] = useState('')
  const [couList, setCouList] = useState([])
  const [deleteId, setDeleteId] = useState('')
  const [updatecomnm, setUpdatecomnm] = useState('')
  const [delcoumodel, setDelcoumodel] = useState(false)
  const [updatecomid, setUpdatecomid] = useState('')
  const gettokan = JSON.parse(sessionStorage.getItem("userdata"));
  const tokan = gettokan.token;


  // -------- display list
  const datafatch = async () => {
    const data = await fetch("http://192.168.0.98/API/api/courier", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${tokan}`,
      },
    });
    const respoce = await data.json();
    console.log('courier list', respoce.data)
    setCouList(respoce.data)
  };

  useEffect(() => {
    datafatch();
  }, [])

  // ------- list Compelete

  // --------- add and edit 
  const handleval = (e) => {
    setCounm(e.target.value)
  }

  const upnmhandler = (e) => {
    setUpdatecomnm(e.target.value)
  }

  const updatecom = async (updid) => {
    const UpdateId = updid
    setUpdatecomid(UpdateId)
    const updatedata = await fetch(`http://192.168.0.98/API/api/courier/${UpdateId}`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokan}`,
      }
    })
    const updateres = await updatedata.json()
    console.log('get update detail', updateres.data)
    setUpdatecomnm(updateres.data.name)
  }

  const AddData = async () => {

    if (updatecomid) {
      const updatedata = await fetch(`http://192.168.0.98/API/api/courier/${updatecomid}`, {
        method: 'PUT',
        headers: {
          "Accept": 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${tokan}`,
          'Content-Type': 'application/json2',
        },
        body: JSON.stringify({ name: updatecomnm })
      })
      const updateres = await updatedata.json()
      console.log('update data response', updateres)
      if (updateres.success === true) {
        setUpdatecomnm('')
        window.location.reload(true)
      }
    } else {
      const insertdata = await fetch('http://192.168.0.98/API/api/courier', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokan}`,
          'Content-Type': 'application/json2'
        },
        body: JSON.stringify({ name: counm })
      })
      const insertres = await insertdata.json()
      console.log('courier add reaponse', insertres)
      if (insertres.success === true) {
        setCounm('')
        window.location.reload(true)
      }
    }
  }

  // --------- add and edit compelete

  // ----------- delete
  const deleteweb = (delcouid) => {
    const delcouId = delcouid
    setDeleteId(delcouId)
    setDelcoumodel(true)
  }

  const FinalcouDelete = async () => {
    console.log(deleteId)
    const deldata = await fetch(`http://192.168.0.98/API/api/courier/${deleteId}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokan}`,
      }
    })
    const deleteres = await deldata.json()
    console.log(deleteres)
    if (deleteres.success === true) {
      setDelcoumodel(false)
      window.location.reload(true)
    }
  }
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className=" flex-grow-1 px-3">
          <div className="row">
            <div className="col">
              <CCard className="mb-4">
                <CCardHeader className="d-flex justify-content-between mainheading">
                  <div className="heading" style={{ marginTop: "5px" }}>
                    <h2>Courier</h2>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Courier Name"
                      value={updatecomid ? updatecomnm : counm}
                      onChange={updatecomid ? upnmhandler : handleval}
                      id="name"
                      name="name"
                    />
                    <CButton
                      color="primary"
                      style={{ marginLeft: '10px' }}
                      active
                      onClick={AddData}
                    >
                      Save
                    </CButton>
                  </CInputGroup>
                </CCardBody>
              </CCard>
            </div>
            <div className="col">
              <CCard className="mb-4" >
                <CCardHeader className="d-flex justify-content-between mainheading">
                  <div className="heading" style={{ marginTop: "5px" }}>
                    <h2>Courier List</h2>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {couList.map((e, index) => {
                        return (
                          <tr key={e.id}>
                            <td scope="row">{index + 1}</td>
                            <td>{e.name}</td>
                            <td className='setspace'>
                              <a className="editicon" style={{ marginRight: '10px' }} title="Edit" data-toggle="tooltip">
                                <CIcon icon={cilPencil} size="lg" style={{ color: 'dimgrey' }} onClick={() => updatecom(e.id)} />
                              </a>
                              <a className="deleteicon" title="Remove" data-toggle="tooltip">
                                <CIcon icon={cilTrash} size="lg" style={{ color: 'dimgrey' }} onClick={() => deleteweb(e.id)} />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <CModal visible={delcoumodel} >
                    <CModalHeader>
                      <CModalTitle>
                        <div className="ml-5">
                          <h3>DELETE PRODUCT</h3>
                        </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <h5 className="model">looking for delete</h5>
                    </CModalBody>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setDelcoumodel(false)} data-coreui-dismiss="modal">No</button>
                      <button type="button" onClick={FinalcouDelete} className="btn btn-primary">Delete</button>
                    </div>
                  </CModal>
                </CCardBody>
              </CCard>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
