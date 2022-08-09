// import React, { useEffect } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CCardHeader,
//   CCardFooter,
//   CButton,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
// } from '@coreui/react'
// import { Link } from 'react-router-dom'

// export default function Update_pro(props) {

//   const tokan = JSON.parse(sessionStorage.getItem("userdata"))
//   const tokkan = tokan.token
//   const updatedata = async () => {
//     const res = await fetch(`http://192.168.0.98/API/api/products/`, {
//       method: "POST",
//       headers: {
//         "Accept": 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${tokkan}`,
//       },
//     })
//     const response = await res.json()
//     console.log(response)
//   }

//   useEffect(() => {
//     updatedata();
//   }, [])

//   return (
//     <div><CModal visible={props.show}>
//       <CModalHeader>
//         <CModalTitle>
//           <div className="ml-5">
//             <h3>Update Product</h3>
//           </div>
//         </CModalTitle>
//       </CModalHeader>
//       <CCardBody>
//         <CForm>
//           <CInputGroup className="mb-3">
//             <CInputGroupText>*</CInputGroupText>
//             <CFormInput
//               placeholder="Name"
//               type="text"
//               autoComplete="Name"
//               id="Name"
//               name="Name"
//             // value={prod.Name}
//             // onChange={handler}
//             />
//           </CInputGroup>
//           <CInputGroup className="mb-3">
//             <CInputGroupText>*</CInputGroupText>
//             <CFormInput
//               placeholder="sku"
//               type="text"
//               autoComplete="SKU"
//               id="SKU"
//               name="SKU"
//             // value={prod.SKU}
//             // onChange={handler}
//             />
//           </CInputGroup>
//           <div className="row">
//             <div className="col">
//               <CInputGroup className="mb-3">
//                 <CInputGroupText>*</CInputGroupText>
//                 <CFormInput
//                   placeholder="Unit Id"
//                   autoComplete="Unit_id"
//                   id="Unit_id"
//                   name="Unit_id"
//                 // value={prod.Unit_id}
//                 // onChange={handler}
//                 />
//               </CInputGroup>
//             </div>
//             <div className="col">
//               <CInputGroup className="mb-3">
//                 <CInputGroupText>*</CInputGroupText>
//                 <CFormInput
//                   placeholder="Gst Id"
//                   autoComplete="GST_id"
//                   id="GST_id"
//                   name="GST_id"
//                 // value={prod.GST_id}
//                 // onChange={handler}
//                 />
//               </CInputGroup>
//             </div>
//           </div>
//           <Link to="/productdet">
//             <CButton
//               color="primary"
//               className="w-100 p-2 mt-3"
//               active
//               tabIndex={-1}
//               cuitextopacity="0.4"
//             // onClick={senddata}
//             >
//               Add
//             </CButton>
//           </Link>
//         </CForm>
//       </CCardBody>
//     </CModal>
//     </div>
//   )
// }
