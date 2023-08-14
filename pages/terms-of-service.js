import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useStatus } from '../context/ContextStatus';
import request from '../lib/request';
import styles from '../styles/Privacy.module.css';

function TermsOfService() {
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
                setTerms(res?.data?.termsAnsCondition)
            }
        }
        getRes();
    }, [])
    return (
        <div>
            {/* <h1 style={{paddingTop: '30px', paddingBottom: '30px', textAlign: 'center', fontSize: '30px', fontWeight: '700'}}>Terms & Services</h1> */}
            <Container>
            <div className={styles.privacy__policy__style} dangerouslySetInnerHTML={{__html: `${terms}`}}></div>
            </Container>
        </div>
    );
}

export default TermsOfService;