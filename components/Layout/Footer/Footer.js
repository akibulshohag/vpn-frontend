import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import hostname from '../../../lib/config';
import request from '../../../lib/request';
import styles from './Footer.module.css';
import { BsFacebook } from 'react-icons/bs';
// import NewsLaterForm from './NewsLaterForm'

export default function Footer() {
    const [data, setData] = useState({});
    useEffect(async () => {
        const res = await request(`setting/view`)
        setData(res?.data)
    }, [])
    return (
        <div className={styles.main}>
            <Container>
            <div className={styles.footer__wrapper}>
            <div>
                {/* <Image priority={true} 
                    placeholder='blur' 
                    blurDataURL={`${hostname}/${data?.logo}`}
                    src={`${hostname}/${data?.logo}`}
                    height={60} 
                    width={80} 
                    alt='Logo'
                    className={styles.footer__logo}
                /> */}
                <p style={{fontSize:'20px'}}>Red Card VPN</p>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{__html: `${data?.address}`}}></div>
            </div>
            <div className={styles.footer__address}>
                <Link href="/about-us"><a style={{color: 'white'}}>About us</a></Link><br />
                <Link href="/disclaimer"><a style={{color: 'white'}}>Disclaimer</a></Link><br />
                <Link href="/privacy-policy"><a style={{color: 'white'}}>Privacy Policy</a></Link><br />
                <Link href="/terms-of-service"><a style={{color: 'white'}}>Terms and Services</a></Link>
                
            </div>
            <div>
                <h2>Follow Us</h2>
                <div className={styles.social}>
                    <Link href={`/${data?.facebookLink}`} prefetch={false}>
                        <a>
                            <span>
                                <BsFacebook size={15} />
                            </span>
                        </a>
                    </Link>
                    {/* <Link href={`/${data?.twitterLink}`} prefetch={false}>
                        <a>
                            <span>
                                <Image height={12} width={12} src='/assets/images/icons/twitter.png' alt='Follow on Facebook' />
                            </span>
                        </a>
                    </Link>
                    <Link href={`/${data?.youtubeLink}`}  prefetch={false}>
                        <a>
                            <span>
                                <Image height={12} width={12} src='/assets/images/icons/youtube.png' alt='Follow on Facebook' />
                            </span>
                        </a>
                    </Link>
                    <Link href={`/${data?.linkedinLink}`}  prefetch={false}>
                        <a>
                            <span>
                                <Image height={12} width={12} src='/assets/images/icons/linkedin.png' alt='Follow on Facebook' />
                            </span>
                        </a>
                    </Link> */}
                </div>
            </div>
            </div>
            {/* <div>
                <div className={styles.newslater__container}>
                    <div className={styles.left__newslater}>
                        <div style={{alignSelf: 'center'}}><Image priority='true' height={25} width={40} src='/assets/images/icons/gmail.png' alt='Gmail' /></div>
                        <div>
                            <h1>Sign Up For Newsletters</h1>
                            <p>Get E-mail update about our latest shop and special offers</p>
                        </div>
                    </div>
                    <div className={styles.right__newslater}>
                        <NewsLaterForm />
                    </div>
                </div>
            </div> */}
            </Container>
        </div>
    );
};