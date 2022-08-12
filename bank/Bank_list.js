import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CForm,
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
// import Add_bank from './Add_bank'

export default function Bank_list() {
  const [bankList, setBankList] = useState([])
  // const [show, setShow] = useState(false)
  const [idconform, setIdconform] = useState(false)
  const [visible, setVisible] = useState(false)
  const [bname, setBname] = useState('')
  const [bac_no, setBac_no] = useState('')
  const [bifsc, setBifsc] = useState('')
  const [bbranch, setBbranch] = useState('')
  const [upbankid, setUpbankid] = useState('')
  const [deleteBank, setDeleteBank] = useState('')
  const [delbankmod, setDelbankmod] = useState(false)

  const [bankdet, setBankdet] = useState({ Bname: '', Bac_no: '', Bifsc: '', Bbranch: '' })

  const Bhandler = (e) => {
    setBankdet({ ...bankdet, [e.target.name]: e.target.value })
    //console.log(bankdet)
  }

  const gettokan = JSON.parse(sessionStorage.getItem("userdata"));
  const tokan = gettokan.token;

  const datafatch = async () => {
    const datafetch = await fetch("http://192.168.0.98/API/api/bank", {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${tokan}`,
      },
    });
    const respoce = await datafetch.json();
    console.log('benk list', respoce.data)
    setBankList(respoce.data)
  };

  useEffect(() => {
    datafatch();
  }, [])

  // ------------------- update && insert

  const updatebnk = async (ids) => {
    const Updid = ids
    setIdconform(true)
    setUpbankid(Updid)
    // console.log(Updid)
    const data = await fetch(`http://192.168.0.98/API/api/bank/${Updid}`, {
      method: 'get',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokan}`,
      }
    })
    const res = await data.json()
    console.log(res.data)
    if (Updid) {
      setIdconform(true)
      setBname(res.data.bank_name)
      setBac_no(res.data.ac_no)
      setBifsc(res.data.ifsc)
      setBbranch(res.data.branch_name)
    } else {
      setIdconform(false)
    }
    setVisible(true)

  }

  const nmhandle = (e) => {
    setBname(e.target.value)
  }
  const achandle = (e) => {
    setBac_no(e.target.value)
  }
  const ifschandle = (e) => {
    setBifsc(e.target.value)
  }
  const brnmhandle = (e) => {
    setBbranch(e.target.value)
  }

  const updatedatasend = async () => {
    //console.log(idconform)
    if (idconform) {
      //console.log('yes')
      const updatedata = await fetch(`http://192.168.0.98/API/api/bank/${upbankid}`, {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Authorization": `Bearer ${tokan}`,
          'Content-Type': 'application/json2',
        },
        body: JSON.stringify({ bank_name: bname, ac_no: bac_no, ifsc: bifsc, branch_name: bbranch })
      })
      const updateres = await updatedata.json()
      console.log('update data response', updateres)
      if (updateres.success === true) {
        setBname('')
        setBac_no('')
        setBifsc('')
        setBbranch('')
        setIdconform(false)
        setVisible(false)
        const datafetch = await fetch("http://192.168.0.98/API/api/bank", {
          method: "GET",
          headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${tokan}`,
          },
        });
        const respoce = await datafetch.json();
        console.log('benk list', respoce.data)
        setBankList(respoce.data)
      }
    }
    else {
      //console.log('false')
      const data = await fetch('http://192.168.0.98/API/api/bank', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data , application/json2',
          'Authorization': `Bearer ${tokan}`,
        },
        body: JSON.stringify({ bank_name: bankdet.Bname, ac_no: bankdet.Bac_no, ifsc: bankdet.Bifsc, branch_name: bankdet.Bbranch })
      })
      const res = await data.json()
      console.log(res.success)
      if (res.success === true) {
        setBankdet({ Bname: '', Bac_no: '', Bifsc: '', Bbranch: '' })
        setVisible(false)
        const data = await fetch("http://192.168.0.98/API/api/bank", {
          method: "GET",
          headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${tokan}`,
          },
        });
        const respoce = await data.json();
        console.log('benk list', respoce.data)
        setBankList(respoce.data)
      }
    }
  }

// ------------delete

  const delbank = (delid) => {
    const delId = delid
    setDeleteBank(delId)
    setDelbankmod(true)
  }

  const FinalbankDelete = async () => {
    //console.log(deleteBank)
    const deldata = await fetch(`http://192.168.0.98/API/api/bank/${deleteBank}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokan}`,
      }
    })
    const deleteres = await deldata.json()
    //console.log(deleteres.success)
    if (deleteres.success === true) {
      setDelbankmod(false)
      const data = await fetch("http://192.168.0.98/API/api/bank", {
        method: "GET",
        headers: {
          "Accept": 'application/json',
          "Authorization": `Bearer ${tokan}`,
        },
      });
      const respoce = await data.json();
      console.log('benk list', respoce.data)
      setBankList(respoce.data)
    }
  }


  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className=" flex-grow-1 px-3">
          <CCard className="mb-4" >
            <CCardHeader className="d-flex justify-content-between mainheading">
              <div className="heading" style={{ marginTop: "5px" }}>
                <h2>Bank Details</h2>
              </div>
              <div>
                <CButton
                  color="primary"
                  className="mt-1"
                  onClick={() => setVisible(true)}
                  active
                >
                  Add Bank
                </CButton>
              </div>
              {/* <Add_bank show={show} close={() => setShow(false)} /> */}
            </CCardHeader>
            <CCardBody className='table-responsive'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">A/c No</th>
                    <th scope="col">ifsc code</th>
                    <th scope="col">Branch Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bankList.map((e, index) => {
                    return (
                      <tr key={e.id}>
                        <td scope="row"> {index + 1}</td>
                        <td scope="row">{e.bank_name}</td>
                        <td scope="row">{e.ac_no}</td>
                        <td scope="row">{e.branch_name}</td>
                        <td scope="row">{e.ifsc}</td>
                        <td className='setspace'>
                          <a className="editicon" style={{ marginRight: '10px' }} title="Edit" data-toggle="tooltip">
                            <CIcon icon={cilPencil} size="lg" style={{ color: 'dimgrey' }} onClick={() => updatebnk(e.id)} />
                          </a>
                          <a className="deleteicon" title="Remove" data-toggle="tooltip">
                            <CIcon icon={cilTrash} size="lg" style={{ color: 'dimgrey' }} onClick={() => delbank(e.id)} />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <CModal visible={visible}>
                <CModalHeader>
                  <CModalTitle>
                    <div className="ml-5">
                      <h3>UPDATE BANK</h3>
                    </div>
                  </CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <CCard className="fillform">
                    <CCardBody>
                      <CForm>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>*</CInputGroupText>
                          <CFormInput
                            placeholder="bank name"
                            type="text"
                            autoComplete="Bname"
                            id="Bname"
                            name="Bname"
                            value={idconform ? bname : bankdet.Bname}
                            onChange={idconform ? nmhandle : Bhandler}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>*</CInputGroupText>
                          <CFormInput
                            placeholder="account no"
                            type="text"
                            autoComplete="Bac_no"
                            id="Bac_no"
                            name="Bac_no"
                            value={idconform ? bac_no : bankdet.Bac_no}
                            onChange={idconform ? achandle : Bhandler}                      
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>*</CInputGroupText>
                          <CFormInput
                            placeholder="ifsc code"
                            autoComplete="Bifsc"
                            id="Bifsc"
                            name="Bifsc"
                            value={idconform ? bifsc : bankdet.Bifsc}
                            onChange={idconform ? ifschandle : Bhandler}
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>*</CInputGroupText>
                          <CFormInput
                            placeholder="Branch Name"
                            autoComplete="Bbranch"
                            id="Bbranch"
                            name="Bbranch"
                            value={idconform ? bbranch : bankdet.Bbranch}
                            onChange={idconform ? brnmhandle : Bhandler}
                          />
                        </CInputGroup>
                        <CButton
                          color="primary"
                          className="w-100 p-2 mt-3"
                          active
                          cuitextopacity="0.4"
                          onClick={updatedatasend}
                        // onClick={senddata}
                        >
                          update
                        </CButton>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CModalBody>
                <div className="modal-footer">
                  <button type="button" onClick={() => setVisible(false)} className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
                </div>
              </CModal>
              <CModal visible={delbankmod} >
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
                  <button type="button" className="btn btn-secondary" onClick={() => setDelbankmod(false)} data-coreui-dismiss="modal">No</button>
                  <button type="button" onClick={FinalbankDelete} className="btn btn-primary">Delete</button>
                </div>
              </CModal>

            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  )
}
