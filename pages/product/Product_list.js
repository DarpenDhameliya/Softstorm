import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CModalBody,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CCardHeader,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { AppSidebar, AppHeader } from "../../components/index";
import Add_product from './Add_product'
// import Update_pro from "./Update_pro";

const Product_List = () => {
  const [artical, setArtical] = useState([])
  const [showLogin, setShowLogin] = useState(false)
  const [showupdate, setShowupdate] = useState(false)
  const [delmodel, setDelmodel] = useState(false)
  // const [produp, setProdup] = useState({ name: '', sku: '', unit_id: '', gst_id: '' })
  const [upname, setUpname] = useState('')
  const [upsku, setUpsku] = useState('')
  const [upunitid, setUpunitid] = useState('')
  const [upgstid, setUpgstid] = useState('')
  // const [upimage, setUpimage] = useState('')
  const [skid, setSkid] = useState('')
  const tokeen = JSON.parse(sessionStorage.getItem("userdata"));
  const tokkan = tokeen.token;
  const isInitialMount = useRef(true);

  const datafatch = async () => {
    const data = await fetch("http://192.168.0.98/API/api/products", {
      method: "get",
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${tokkan}`,
      },
    });
    const respoce = await data.json();
    setArtical(respoce.data)
  };

  useEffect(() => {
    datafatch();
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateData()
    }
  }, []);

  // ------------------------------------------------------------------------------------------  update
  const updateData = async (id) => {
    const updata = id
    const data = await fetch(`http://192.168.0.98/API/api/products/${updata}`, {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokkan}`,
      }
    })
    const res = await data.json()
    console.log(res.data[0])
    setUpname(res.data[0].name)
    setUpsku(res.data[0].sku)
    setUpunitid(res.data[0].unit_id)
    setUpgstid(res.data[0].gst_id)
    // setUpimage(res.data[0].image)
    setShowupdate(true)
  }

  // const handlerup = (e) => {
  //   setProdup({ ...produp, [e.target.name]: e.targte.value })
  // }
  const nmhandler = (e) => {
    setUpname(e.target.value)
  }
  const skuhandler = (e) => {
    setUpsku(e.target.value)
  }
  const unithandler = (e) => {
    setUpunitid(e.target.value)
  }
  const gsthandler = (e) => {
    setUpgstid(e.target.value)
  }

  // --------------------------------------------------- delete product

  const deleteData = (skuid) => {
    const delid = skuid
    console.log(delid)
    setSkid(delid)
    setDelmodel(true)
    // console.log(skuId)
    // finaldel(delid)
  }

  const finaldel = async () => {
    e.preventDefault()
    console.log(skid)

    const data = await fetch(`http://192.168.0.98/API/api/products/${skid}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Authorization": `Bearer ${tokkan}`,
      }
    })
    const res = await data.json()
    console.log(res)
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
                <h2>Product List</h2>
              </div>
              <div>
                <CButton
                  color="primary"
                  className="mt-1"
                  onClick={() => setShowLogin(true)}
                  active

                >
                  Add
                </CButton>
              </div>
              <Add_product visible={showLogin} clodemode={() => setShowLogin(false)} />
            </CCardHeader>
            <CCardBody>
              <div className='container my-3'>
                <div className='row my-2 '>
                  {
                    artical.map((element) => {
                      return (<div className="col-lg-4 col-md-6 mt10" key={element.sku}>
                        <CCard style={{ width: '20rem', height: '10rem', alignItems: 'center' }} className='border border-2 mobview' >
                          <CCardBody>
                            <div className="row" style={{ justifyContent: 'center' }}>
                              <div className="col-6" style={{ display: 'inline-flex' }}>
                                <CCardImage orientation="top" style={{ maxWidth: '100%', maxHeight: '130px' }} src={element.image} />
                              </div>
                              <div className="col-6">
                                <p>Name:{element.name}</p>
                                <p>sku:{element.sku}</p>
                                <div className="row mt30">
                                  <div className="col-4">
                                    {/* <CIcon icon={cilPencil} onClick={() => setSkuid(element.sku)} /> */}
                                    <CIcon icon={cilPencil} onClick={() => updateData(element.sku)} />
                                  </div>
                                  <div className="col-4">
                                    <CIcon icon={cilTrash} onClick={() => deleteData(element.sku)} />
                                  </div>
                                  <div className="col-4">
                                    <CIcon icon={cilPencil} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CCardBody>
                        </CCard>
                      </div>
                      )
                    })
                  }
                </div>
              </div>
              <CModal visible={showupdate}>
                <CModalHeader>
                  <CModalTitle>
                    <div className="ml-5">
                      <h3>UPDATE PRODUCT</h3>
                    </div>
                  </CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <div className="row">
                    <div className="col-7">
                      <CCard className="fillform">
                        <CCardBody>
                          <CForm>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>*</CInputGroupText>
                              <CFormInput
                                placeholder="Name"
                                type="text"
                                autoComplete="name"
                                id="name"
                                name="name"
                                value={upname}
                                onChange={nmhandler}
                              // value={produp.name}
                              // onChange={handlerup}
                              />
                            </CInputGroup>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>*</CInputGroupText>
                              <CFormInput
                                placeholder="sku"
                                type="text"
                                autoComplete="sku"
                                id="sku"
                                name="sku"
                                value={upsku}
                                onChange={skuhandler}
                              // value={produp.sku}
                              // onChange={handlerup}
                              />
                            </CInputGroup>
                            <div className="row">
                              <div className="col">
                                <CInputGroup className="mb-3">
                                  <CInputGroupText>*</CInputGroupText>
                                  <CFormInput
                                    placeholder="Unit Id"
                                    autoComplete="unit_id"
                                    id="unit_id"
                                    name="unit_id"
                                    value={upunitid}
                                    onChange={unithandler}
                                  // value={produp.unit_id}
                                  // onChange={handlerup}
                                  />
                                </CInputGroup>
                              </div>
                              <div className="col">
                                <CInputGroup className="mb-3">
                                  <CInputGroupText>*</CInputGroupText>
                                  <CFormInput
                                    placeholder="Gst Id"
                                    autoComplete="gst_id"
                                    id="gst_id"
                                    name="gst_id"
                                    value={upgstid}
                                    onChange={gsthandler}
                                  // value={produp.gst_id}
                                  // onChange={handlerup}
                                  />
                                </CInputGroup>
                              </div>
                            </div>
                            <Link to="/productdet">
                              <CButton
                                color="primary"
                                className="w-100 p-2 mt-3"
                                active
                                tabIndex={-1}
                                cuitextopacity="0.4"
                              >
                                Add
                              </CButton>
                            </Link>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="col-5">
                      <CCard
                        className="text-white bg-primary py-3"
                        style={{
                          width: "100%",
                          height: "250px",
                          cuitextopacity: ".4",
                        }}
                      >
                        {/* <image src={upimage} /> */}
                        <CCardFooter>
                          <CFormInput
                            type="file"
                            placeholder="choose file"
                            className="rounded"
                            name="image"
                            accept="image/*"
                          />
                        </CCardFooter>
                      </CCard>
                    </div>
                  </div>
                </CModalBody>
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowupdate(false)} className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
                </div>
              </CModal>
              <CModal visible={delmodel}>
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
                  <button type="button" className="btn btn-secondary" onClick={() => setDelmodel(false)} data-coreui-dismiss="modal">close</button>
                  <button type="button" onClick={finaldel} className="btn btn-primary">Delete</button>
                </div>
              </CModal>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );
};

export default Product_List;

    // const updata = artical.find((element) => {
    //   return element.id === id
    // })
    // console.log(updata)
    // // setShowupdate(true)