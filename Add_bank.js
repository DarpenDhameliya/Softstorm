// import React, { useState } from 'react'
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
//   CCardImage,
// } from '@coreui/react'

// const Add_bank = (props) => {
//   const [bankdet, setBankdet] = useState({ Bname: '', Bac_no: '', Bifsc: '', Bbranch: '' })
//   const gettokan = JSON.parse(sessionStorage.getItem("userdata"));
//   const tokan = gettokan.token;

//   const Bhandler = (e) => {
//     setBankdet({ ...bankdet, [e.target.name]: e.target.value })
//     console.log(bankdet)
//   }

//   const senddata = async (e)  => {
//     e.preventDefault()
//     const data = await fetch('http://192.168.0.98/API/api/bank', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'multipart/form-data , application/json2',
//         'Authorization': `Bearer ${tokan}`,
//       },
//       body: JSON.stringify({ bank_name:bankdet.Bname, ac_no: bankdet.Bac_no, ifsc: bankdet.Bifsc, branch_name: bankdet.Bbranch})
//     })
//     const res = await data.json()
//     console.log(res.success)
//     if(res.success === true ){
//       props.close()
//       const data = await fetch("http://192.168.0.98/API/api/bank", {
//       method: "GET",
//       headers: {
//         "Accept": 'application/json',
//         "Authorization": `Bearer ${tokan}`,
//       },
//     });
//     const respoce = await data.json();
//     console.log('benk list', respoce.data)
//     }
//     // navigate('/banklist')
//   }

//   return (
//     <>
//       <CModal visible={props.show}>
//         <CModalHeader>
//           <CModalTitle>
//             <div className="ml-5">
//               <h3>ADD BANK</h3>
//             </div>
//           </CModalTitle>
//         </CModalHeader>
//         <CModalBody>
         
//               <CCard className="fillform">
//                 <CCardBody>
//                   <CForm>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>*</CInputGroupText>
//                       <CFormInput
//                         placeholder="bank name"
//                         type="text"
//                         autoComplete="Bname"
//                         id="Bname"
//                         name="Bname"
//                         value={bankdet.Bname}
//                         onChange={Bhandler}
//                       />
//                     </CInputGroup>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>*</CInputGroupText>
//                       <CFormInput
//                         placeholder="account no"
//                         type="text"
//                         autoComplete="Bac_no"
//                         id="Bac_no"
//                         name="Bac_no"
//                         value={bankdet.Bac_no}
//                         onChange={Bhandler}
//                       />
//                     </CInputGroup>
                    
//                         <CInputGroup className="mb-3">
//                           <CInputGroupText>*</CInputGroupText>
//                           <CFormInput
//                             placeholder="ifsc code"
//                             autoComplete="Bifsc"
//                             id="Bifsc"
//                             name="Bifsc"
//                             value={bankdet.Bifsc}
//                             onChange={Bhandler}
//                           />
//                         </CInputGroup>
                     
//                         <CInputGroup className="mb-3">
//                           <CInputGroupText>*</CInputGroupText>
//                           <CFormInput
//                             placeholder="Branch Name"
//                             autoComplete="Bbranch"
//                             id="Bbranch"
//                             name="Bbranch"
//                             value={bankdet.Bbranch}
//                             onChange={Bhandler}
//                           />
//                         </CInputGroup>
                      
//                       <CButton
//                         color="primary"
//                         className="w-100 p-2 mt-3"
//                         active
//                         cuitextopacity="0.4"
//                         onClick={senddata}
//                       >
//                         Add
//                       </CButton>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//         </CModalBody>
//         <div className="modal-footer">
//           <button type="button" onClick={props.close} className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
//         </div>
//       </CModal>
//     </>
//   )
// }

// export default Add_bank