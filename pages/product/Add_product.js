import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardHeader,
  CCardFooter,
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFooter,
} from '@coreui/react'
import axios from 'axios'

const Add_product = (props) => {
  const [prod, setProd] = useState({ name: '', sku: '', unit_id: '', gst_id: '' })
  const [images, setImages] = useState()

  const handler = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value })
    console.log(JSON.stringify(prod.name))
  }

  const tokeen = JSON.parse(sessionStorage.getItem("userdata"));
  const tokkan = tokeen.token;

  const imageHandle = (e) => {
    const addImage = e.target.files[0]
    setImages(addImage)
  }

  const senddata = async (e) => {
    e.preventDefault()
    console.log(images)
    const data = await fetch('http://192.168.0.98/API/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST',
        // 'Content-Type': 'application/json2',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${tokkan}`,
      },
      body: JSON.stringify({ name: prod.name, sku: prod.sku, gst_id: prod.gst_id, unit_id: prod.unit_id, image: images })
    })
    const res = await data.json()
    console.log(res)
    // axios.post('http://192.168.0.98/API/api/products',
    //   { name: prod.name, sku: prod.sku, gst_id: prod.gst_id, unit_id: prod.unit_id, image: images },
    //   {
    //     headers: {
    //       "Accept": 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'multipart/form-data ',
    //       // 'Content-Type': 'application/json2',
    //       "Authorization": `Bearer ${tokkan}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response)
    //   })

  }

  return (
    <>
      <CModal visible={props.visible}>
        <CModalHeader>
          <CModalTitle>
            <div className="ml-5">
              <h3>ADD PRODUCT</h3>
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
                        value={prod.name}
                        onChange={handler}
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
                        value={prod.sku}
                        onChange={handler}
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
                            value={prod.unit_id}
                            onChange={handler}
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
                            value={prod.gst_id}
                            onChange={handler}
                          />
                        </CInputGroup>
                      </div>
                    </div>
                    <Link to="/productdet">
                      <CButton
                        color="primary"
                        className="w-100 p-2 mt-3"
                        active
                        // tabIndex={-1}
                        cuitextopacity="0.4"
                        onClick={senddata}
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
                <CCardHeader style={{ alignItems: "center" }}>
                </CCardHeader>
                <CCardFooter>
                  <CFormInput
                    type="file"
                    name="file"
                    onChange={imageHandle}
                  />
                </CCardFooter>
              </CCard>
            </div>
          </div>
        </CModalBody>
        <div className="modal-footer">
          <button type="button" onClick={props.clodemode} className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
        </div>
      </CModal>
    </>
  )
}

export default Add_product

// Add_product.propTypes = {
//   show: propTypes.string,
// }

// const displayphoto = ((fileArray) => {
//   return fileArray.map((photo) => {
//     console.log(photo)
//return (<div className="setimg" style={{ position: "relative" }}>
{/* <img
      src={photo}
      key={photo}
      height="150px"
      width="153px"
    /> */}
{/* <button type="button" className="btn-close canimg" aria-label="Close" onClick={() => setImage(image.filter((e) => e !== photo))} /> */ }
  //</div>
  //)
  //   })
  // })