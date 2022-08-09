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
  CModalBody,
} from '@coreui/react'
import { cilPencil, cilTrash, cilUser } from '@coreui/icons'
import { AppHeader, AppSidebar } from 'src/components'
import CIcon from '@coreui/icons-react'

export default function Web_list() {
  const [webaddnm, setWebaddnm] = useState('')
  const [updatenm, setUpdatenm] = useState('')
  const [webList, setWebList] = useState([])
  const [deleteId, setDeleteId] = useState('')
  const [updateid, setUpdateid] = useState('')
  const [delwebmodel, setDelwebmodel] = useState(false)
  const gettokan = JSON.parse(sessionStorage.getItem("userdata"));
  const tokan = gettokan.token;

  // ------------------------------------------------------------------ display website
  const datafatch = async () => {
    const data = await fetch("http://192.168.0.98/API/api/website", {
      method: "get",
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${tokan}`,
      },
    });
    const respoce = await data.json();
    setWebList(respoce.data)
  };

  useEffect(() => {
    datafatch();
  }, [])

  // --------------------------------------------------------------- add website running

  const handleaddval = (e) => {
    setWebaddnm(e.target.value)
  }

  // ------------------------------------------------------------ update website running

  const updateweb = async (userid) => {
    const userId = userid
    setUpdateid(userId)
    const updatedata = await fetch(`http://192.168.0.98/API/api/website/${userId}`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokan}`,
      }
    })
    const updateres = await updatedata.json()
    console.log('get update detail', updateres)
    setUpdatenm(updateres.data.name)
  }

  const upnmhandler = (e) => {
    setUpdatenm(e.target.value)
    console.log(updatenm)
  }

  const Adddata = async (e) => {
    e.preventDefault()
    console.log(updateid)
    if (updateid) {
      const updatedata = await fetch(`http://192.168.0.98/API/api/website/${updateid}`, {
        method: 'PUT',
        headers: {
          "Accept": 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${tokan}`,
          'Content-Type': 'application/json2',
        },
        body: JSON.stringify({ name: updatenm })
      })
      const updateres = await updatedata.json()
      console.log('update data response', updateres)
      if (updateres.success === true) {
        setUpdatenm('')
        window.location.reload(true)
      }
    } else {
      const data = await fetch('http://192.168.0.98/API/api/website', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${tokan}`,
          'Content-Type': 'application/json2'
        },
        body: JSON.stringify({ name: webaddnm })
      })
      const res = await data.json()
      console.log('data add reaponse', res)
      if (res.success === true) {
        setWebaddnm('')
        window.location.reload(true)
      }
    }
  }

  // ------------------------------------------------------------------------------------------------------ delete  compelete

  const deleteweb = (delid) => {
    const delId = delid
    setDeleteId(delId)
    setDelwebmodel(true)
  }

  const FinalwebDelte = async () => {
    console.log(deleteId)
    const deldata = await fetch(`http://192.168.0.98/API/api/website/${deleteId}`, {
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
      setDelwebmodel(false)
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
                    <h2>Website</h2>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Website Name"
                      value={updateid ? updatenm : webaddnm}
                      onChange={updateid ? upnmhandler : handleaddval}
                      id="name"
                      name="name"
                    />
                    <CButton
                      color="primary"
                      style={{ marginLeft: '10px' }}
                      active
                      onClick={Adddata}
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
                    <h2>Website List</h2>
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
                      {webList.map((e, index) => {
                        return (
                          <tr key={e.id}>
                            <td scope="row">{index + 1}</td>
                            <td>{e.name}</td>
                            <td className='setspace'>
                              <a className="editicon" style={{ marginRight: '10px' }} title="Edit" data-toggle="tooltip">
                                <CIcon icon={cilPencil} size="lg" style={{ color: 'dimgrey' }} onClick={() => updateweb(e.id)} />
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
                  <CModal visible={delwebmodel} >
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
                      <button type="button" className="btn btn-secondary" onClick={() => setDelwebmodel(false)} data-coreui-dismiss="modal">No</button>
                      <button type="button" onClick={FinalwebDelte} className="btn btn-primary">Delete</button>
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
