/* eslint-disable react/no-unknown-property */
import React from 'react';
import { useEffect, useState } from 'react';
import request from '../lib/request';
import Head from 'next/head';
import { useStatus } from '../context/ContextStatus';
import styles from '../styles/Privacy.module.css';
import { Container } from 'react-bootstrap';

function PrivacyPolicy() {
    const [terms, setTerms] = useState({})
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
    useEffect(() => {
        async function getRes() {
            const res = await request(`setting/view`)
            console.log('pppppp', res)
            if(res?.success){
                setTerms(res?.data?.privacyAndPolicy)
            }
        }
        getRes();
    }, [])
    return (
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            {/* <h1 style={{paddingTop: '30px', paddingBottom: '30px', textAlign: 'center', fontSize: '30px', fontWeight: '700'}}>Privacy & Policy</h1> */}
            <Container>
            <div className={styles.privacy__policy__style} dangerouslySetInnerHTML={{__html: `${terms}`}}></div>
            </Container>
        </div>
    );
}

export default PrivacyPolicy;