/* eslint-disable react/no-unknown-property */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import hostname from '../lib/config';
import request from '../lib/request';
import styles from '../styles/Support.module.css';
import { useForm } from "react-hook-form";
import postRequest from "../lib/postRequest";
import { notification, openNotificationWithIcon } from 'antd';
import { useStatus } from '../context/ContextStatus';

function Support() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {navTop, setNavTop} = useStatus();
    useEffect(() => {     
        // document.addEventListener("scroll",  ()=> {  
        //     console.log('.................gotcha');
        // }); 
        window.addEventListener('scroll', function() {
           
            if(window.scrollY == 0){
                setNavTop(true);
            }
               if(window.scrollY<200 && window.scrollY !== 0){
                setNavTop(false);
               }

               // Show loading spinner and make fetch request to api
         });
     },[]);

  const openNotificationWithIcon = (message, type) => {
    notification[type]({
      message
    });
  };

    const [terms, setTerms] = useState('')
    const [address, setAddress] = useState('');
    const gotoMail = () => {
        window.open("mailto:iar@b2gsoft.com", "_blank");
      };
    
      const [isInfoOpen, setisInfoOpen] = useState(false);
      const [name, setname] = useState("");
      const [phone, setphone] = useState("");
      const [email, setemail] = useState("");
      const [subject, setsubject] = useState("");
      const [details, setdetails] = useState("");
    useEffect(() => {
        async function getRes() {
            const res = await request(`support/view`)
            console.log('pppppp', res?.data)
            if(res?.success){
                setTerms(res?.data)
            }
        }
        getRes();

        (async () => {
          const res = await request(`setting/view`)
          setAddress(res?.data?.address)
        })()
    }, [])

    const onSubmit = async (data) => {
      const res = await postRequest(`/support/form/create`, data)
      if(res?.success){
        openNotificationWithIcon(res?.message, 'success')
      }else{
        openNotificationWithIcon(res?.message, 'error')
      }
    }

    console.log('......',address);
    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <div className="mt-3 container">
        <div
          className="row mb-5 "
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="col-md-5 ">
            <img style={{ width: "100%" }} src={`${hostname}/${terms?.image}`} />
          </div>
          <div className="col-md-5 ml-5" style={{ textAlign: "left" }}>
          <div dangerouslySetInnerHTML={{__html: `${terms?.text}`}}></div>
            {/* <h1
              style={{
                color: "#08104D",
                fontSize: "50px",
                fontWeight: "bolder",
              }}
            >
              Feel free to contact us anytime!
            </h1>
            <h5>Communication works for those who work at it.</h5> */}
          </div>
        </div>
        <div
          className="row mb-5 "
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "#03051A",
          }}
        >
          <div className="col-md-5 mt-5 mb-5 ml-2">
            <div className={styles.address} dangerouslySetInnerHTML={{__html: `${address}`}} />
            {/* <h2>Meet us in Dhaka</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  marginBottom: "0px",
                  marginLeft: "10px",
                }}
              >
                (+88) 01868890689
              </p>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            > */}
              {/* <MdEmail
                onClick={() => gotoMail()}
                style={{ cursor: "pointer" }}
                color="#41050A"
                size={20}
              /> */}
              {/* <p
                style={{
                  marginBottom: "0px",
                  marginLeft: "10px",
                }}
              >
                iar@b2gsoft.com
              </p>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            > */}
              {/* <SiGooglemaps color="#D20505" size={20} /> */}
              {/* <p
                style={{
                  marginBottom: "0px",
                  marginLeft: "10px",
                }}
              >
                Flat: 6B, House: 32/1, Road: 03, Shymoli, Dhaka
              </p>
            </div> */}
          </div>
          <div
            className="col-md-6 mt-5 mb-5"
            style={{
              textAlign: "left",
              // border: "1px solid #03051A",
              // boxShadow: "0px 0px 5px 5px #061857",
            }}
          >
            <h2>Contact form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  {...register("name", {required: true})}
                />
                {errors.name && <span style={{color: 'red'}}>This field is required</span>}
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter email"
                  {...register('email', {required: true})}
                />
                {errors.email && <span style={{color: 'red'}}>This field is required</span>}
              </div>
              {/* <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Phone Number"
                  {...register('phone', {required: true})}
                />
                {errors.phone && <span>This field is required</span>}
              </div> */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Subject"
                  {...register('subject', {required: true})}
                />
                {errors.subject && <span style={{color: 'red'}}>This field is required</span>}
              </div>
              <div className="form-group mb-3">
                <textarea
                  rows={4}
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Write Something"
                  {...register('description', {required: true})}
                />
                {errors.description && <span style={{color: 'red'}}>This field is required</span>}
              </div>
              {/* <div className="pulse" style={{width:'20%'}}> */}
              <div className="text-center">
              <button type="submit" className={styles.message__button}>
                Submit
            </button>
                </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
        </div>
    );
}

export default Support;






// function OurPortfolio() {
  

//   const formSubmit = async () => {
//     const data = {
//       name: name,
//       phone: phone,
//       email: email,
//       subject: subject,
//       details: details,
//     };
//     console.log("...........................values", data);

//     try {
//       const createRes = await axios.post(`/contact/form/create`, data);
//       console.log("create response", createRes);
//       if (createRes?.data?.success) {
//         // openNotificationWithIcon(createRes?.data?.message, 'success')
//         alert(createRes?.data?.message);
//         window.location.reload();
//       }
//     } catch (error) {
//       // openNotificationWithIcon(error?.response?.data?.message, 'error')
//       alert(error?.response?.data?.message);
//     }
//   };

//   return (
//     <>
      
//       <MyComponent />
//     </>
//   );
// }

// export default OurPortfolio;
