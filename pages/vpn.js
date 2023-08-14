/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import request from '../lib/request';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import styles from '../styles/Vpn.module.css'
import Head from 'next/head';
import { useStatus } from '../context/ContextStatus';
import hostname from '../lib/config';

function VPN() {
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
            const res = await request(`vpn/view`)
            console.log('pppppp', res)
            if(res?.success){
                setTerms(res?.data)
            }
        }
        getRes();
    }, [])
    
    return (
        <div className={styles.main}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <Container>
            {/* <h1 style={{paddingTop: '80px'}}>Get Your Benefits Using Symlex VPN</h1>
            <p>Protect your private data online and securely access through unlimited platforms.</p> */}
            <div className={styles.image__text__grid__style}>
                <div className={styles.margin_top} >
                <div className={styles.firsttext} dangerouslySetInnerHTML={{__html: `${terms?.firstText}`}}></div>
                    {/* <h2>Fastest VPN with Secure Connection</h2>
                    <p>Using Symlex VPN, there is no buffering, no throttling, and no bandwidth limits. You can do all you need to serve your VPN-related purposes. We ensure both security and faster performance since you don’t need to lose one for ensuring another. Moreover, all your data remains safe and secure behind a wall of a next-generation encryption facility.</p> */}
                </div>
                <div className={styles.margin_top1} >
                    <Image className={styles.img} src={`${hostname}/${terms?.firstImage}`} height={400} width={500} />
                </div>
                <div className={styles.margin_top1}>
                    <Image src={`${hostname}/${terms?.secondImage}`} height={400} width={500} />
                </div>
                <div className={styles.firsttext}>
                    <div dangerouslySetInnerHTML={{__html: `${terms?.secondText}`}}></div>
                    {/* <h2>Unlimited Bandwidth</h2>
                    <p>You can have an unlimited amount of VPN bandwidth to download and enjoy using Symlex VPN. You’ll get the freedom to enjoy the internet as it was meant to be. There is no limitation in downloading and accessing what you need at any time and any place.</p> */}
                </div>
                <div className={styles.firsttext} >
                    <div dangerouslySetInnerHTML={{__html: `${terms?.thirdText}`}}></div>
                    {/* <h2>Borderless Internet Facility</h2>
                    <p>If you travel through different restrictive regions of the world, you need to bypass your internet to serve your purposes. Symlex VPN has pretty decent amount of servers in different countries so that you can connect to any one of them. That’s how you can enjoy your preferred content no matter where you are.</p> */}
                </div>
                <div className={styles.margin_top1}>
                    <Image src={`${hostname}/${terms?.thirdImage}`} height={400} width={500} />
                </div>
                {/* <div style={{marginBottom: '150px'}}>
                    <Image src="/assets/images/aboutus/4.png" height={400} width={500} />
                </div>
                <div style={{marginTop: '100px', marginBottom: '150px'}}>
                    <h2>Trusted Servers with Wide Range Locations</h2>
                    <p>We believe in trustworthiness and most of our users are loyal since we keep their trust by providing valued service. Data breaching could be lethal for any business and we’re utmost concerned about the server security. ​​We know exactly what we're doing and Symlex VPN runs on the most secure server minimizing the risk of vulnerabilities.In addition to having access to over 50 locations around the world, Symlex VPN also has 100+ reliable servers that provide unlimited bandwidth.</p>
                </div> */}
                {/* <div>
                    <h2>Easy to Use App for All Major OS</h2>
                    <p>Symlex can be accessed through any of your desired devices. Symlex VPN's features include Android, iPhone, Windows, and Mac. There is no installation charge and can be downloaded on any device.</p>
                </div>
                <div>
                    <Image src="/assets/images/aboutus/5.png" height={400} width={500} />
                </div> */}
            </div>
            </Container>
            {/* <div dangerouslySetInnerHTML={{__html: `${terms}`}} style={{backgroundColor: '#F8F9FA'}}></div> */}
        </div>
    );
}

export default VPN;