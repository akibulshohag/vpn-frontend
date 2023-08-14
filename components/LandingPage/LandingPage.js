import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef,  } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Container,img } from "react-bootstrap";
import { useStatus } from '../../context/ContextStatus';
import hostname from '../../lib/config';
import styles from './LandingPage.module.css';

function LandingPage({settings}) {
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



    //  console.log('scrolllllllllll', navTop);




    return ( 
        <div>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <div style={{textAlign: 'center'}} className={styles.margin__top}>
                <div >
                  {/* <Image className={styles.img} src={`${hostname}/${settings?.top?.image}`} height={1000} width={2100} /> */}
                  <img src={`${hostname}/${settings?.top?.image}`} className={`img-fluid ${styles.img}`} alt="Responsive image"></img>
                  <div className={styles.top__image__text}>
                    {/* <h1>{settings?.top?.firstText}</h1> */}
                    <h3 style={{}}>{settings?.top?.secondText}</h3>
                    <Link href="/order"><a className={styles.get__started__button}>Get Red Card VPN</a></Link>
                    <p style={{marginTop:'20px'}}>{settings?.top?.thirdText}</p>
                </div>
                </div>
                
                
                {/* <div className="text-center" style={{marginTop: '-256px'}}><Image src="/assets/images/landingPage/2.png" height={250} width={500} /></div> */}
            </div>
            <Container>
                <div className={styles.two__container__style}>
                    <div>
                        <Image src={`${hostname}/${settings?.firstSection?.image}`} height={300} width={400} />
                    </div>
                    <div className={styles.content__style}>
                        <div dangerouslySetInnerHTML={{__html: `${settings?.firstSection?.text}`}} className={styles.first__text} />
                        {/* <h2>Secure access, worldwide</h2>
                        <p>Connect reliably from anywhere, to anywhere. Our network of high-speed servers across 94 countries puts you in control.</p> */}
                        <Link href="/order"><a className={styles.get__button__style}>Get Access</a></Link>
                    </div>
                    <div className={styles.content__style}>
                        <div dangerouslySetInnerHTML={{__html: `${settings?.secondSection?.text}`}} className={styles.first__text} style={{}} />
                        {/* <h2>Just one click to a safer internet</h2>
                        <p>Going online doesn’t have to mean being exposed. Whether you’re shopping from your desk or just connecting at a cafe, keep your personal information more private and secure.</p> */}
                    </div>
                    <div style={{}}>
                        <Image src={`${hostname}/${settings?.secondSection?.image}`} height={350} width={450} />
                    </div>
                </div>
                <div className={styles.three__container__style}>
                    <div className={styles.mini__container__style}>
                        <Image src={`${hostname}/${settings?.thirdSection?.firstImage}`} height={120} width={200} className={styles.image__radius} />
                        <div dangerouslySetInnerHTML={{__html: `${settings?.thirdSection?.firstText}`}} className={styles.first__text} />
                        {/* <h2>Stronger data protection</h2>
                        <p>Take charge of your online privacy and security with best-in-class encryption.</p> */}
                    </div>
                    <div className={styles.mini__container__style}>
                        <Image src={`${hostname}/${settings?.thirdSection?.secondImage}`} height={120} width={200} className={styles.image__radius} />
                        <div dangerouslySetInnerHTML={{__html: `${settings?.thirdSection?.secondText}`}} className={styles.first__text} />
                        {/* <h2>Works seamlessly everywhere</h2>
                        <p>Experience the internet the way it’s meant to be. On the go, or on your couch.</p> */}
                    </div>
                    <div className={styles.mini__container__style}>
                        <Image src={`${hostname}/${settings?.thirdSection?.thirdImage}`} height={120} width={200} className={styles.image__radius} />
                        <div dangerouslySetInnerHTML={{__html: `${settings?.thirdSection?.thirdText}`}} className={styles.first__text} />
                        {/* <h2>Lightning-quick connectivity</h2>
                        <p>Our VPN network is built for speed, powered by next-generation technology.</p> */}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default LandingPage;
