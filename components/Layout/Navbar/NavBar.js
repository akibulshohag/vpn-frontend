/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
// import 'font-awesome/css/font-awesome.min.css';
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { AiFillApple } from 'react-icons/ai';
import { FaGooglePlay } from 'react-icons/fa';
import { useStatus } from "../../../context/ContextStatus";
import hostname from "../../../lib/config";
import request from "../../../lib/request";
import styles from "./NavBar.module.css";

function NavBar() {
  const { navTop, setNavTop } = useStatus();
  const [logo, setLogo] = useState("");
  const [navBackground, setNavBackground] = useState(false);
  useEffect(async () => {
    const res = await request(`setting/view`);
    setLogo(res?.data?.logo);
  }, []);

  const [showw, setShoww] = useState(false);
  const showwDropdown = (e) => {
    setShoww(!showw);
  };
  const hideeDropdown = (e) => {
    setShoww(false);
  };
  // useEffect(() => {
  //     const changeNavbarColor = () =>{
  //     if(window.scrollY >= 80){
  //         setNavBackground(true);
  //     }
  //     else{
  //         setNavBackground(false);
  //     }
  //  };

  //  window.addEventListener('scroll', changeNavbarColor);
  // }, []);

  // console.log('sssssssssssssssssssss', navBackground);

  return (
    <Navbar
      className={`${navTop ? null : "bg-white"} sticky-top pb-3`}
      collapseOnSelect
      expand="lg"
      variant="light"
      id='navbarSupportedContent'
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Navbar.Brand data-toggle="collapse" data-target={isMobile?`#navbarSupportedContent`:''} href="#home">
          
            <a href="/">
              <div style={{ display: "flex" }}>
                <Image src={`${hostname}/${logo}`} height={55} width={160 } />
                {/* <h4 style={{ marginTop: "10px", marginLeft: "5px" }}>
                  REDCARD
                </h4> */}
              </div>
            </a>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" data-toggle="collapse" data-target={isMobile?`#navbarSupportedContent`:''} />
        <Navbar.Collapse id="responsive-navbar-nav" data-toggle="collapse" data-target={isMobile?`#navbarSupportedContent`:''}>
          <Nav>
            <div className={styles.margin__right}>
              
            </div>
            
              <a href="/vpn" data-toggle="collapse" data-target={isMobile?`#navbarSupportedContent`:''} className={styles.nav__item}>What is VPN?</a>
            
            
              <a href="/about-us" className={styles.nav__item}>About Us</a>
            
            
              <a href="/order" className={styles.nav__item}>Order</a>
            
            
              <a href="/support" className={styles.nav__item}>Support</a>
           

            <NavDropdown
              title="Download App"
              id="collasible-nav-dropdown"
              // show={showw}
              // onMouseEnter={showwDropdown}
              // onMouseLeave={hideeDropdown}
              className={`${styles.nav__dropdown}`}
            >
              
                {" "}
                <a style={{color:'#000000',alignItems:'center'}} href="https://play.google.com/store/apps/details?id=com.arabian.redcard&hl=en&gl=US" >
                  <div className={styles.playstore} >
                    {/* <Image src="/assets/images/play-store.jpeg" height={50} width={150} /> */}
                    
                    <FaGooglePlay className={styles.icon}  size={25} />
                    <p className={styles.store} > Play Store</p>
                  </div>
                </a>
              
              
                <a style={{color:'#000000'}} href="https://apps.apple.com/ae/app/red-card-vpn/id1494273595">
                  <div className={styles.playstore}>
                    {/* <Image src="/assets/images/app-store.jpeg" height={50} width={150} /> */}
                    <AiFillApple className={styles.icon} size={29} />
                    <p className={styles.store}>App Store</p>
                  </div>
                </a>
              
              
            </NavDropdown>
            
                <a  href="/order"className={styles.nav__item__button}>Get Started</a>
              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
