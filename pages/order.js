/* eslint-disable react/no-unknown-property */
import Head from 'next/head';
import React, {useEffect} from 'react';
// import { useEffect } from 'react';
import Order from '../components/Order/Order';
import { useStatus } from '../context/ContextStatus';

function OrderPage(props) {
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
    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <Order />
        </div>
    );
}

export default OrderPage;