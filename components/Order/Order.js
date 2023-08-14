/* eslint-disable react/jsx-key */
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Collapse, Container } from 'react-bootstrap';
import request from '../../lib/request';
import postRequest from '../../lib/postRequest';
import styles from './Order.module.css';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { notification, openNotificationWithIcon } from 'antd';
import Slider from "react-slick";
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function Order() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [creditCard, setCreditCard] = useState(false);
    const [packages, setPackages] = useState([]);
    const [paypal, setPaypal] = useState(false);
    const [data, setData] = useState({});
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState(-1);
    const [orderMoney, setOrderMoney] = useState(0)
    const [orderId, setOrderId] = useState('');

    const openNotificationWithIcon = (message, type) => {
        notification[type]({
          message
        });
      };
    useEffect(async () => {
        const res = await request(`setting/view`);
        // console.log('rrrrrrrrrrrrrrrrrrrrr', res?.data)
        setData(res?.data);
        const response = await request(`package/all/view`);
        console.log('rrrrrrrrr', response?.data);
        setPackages(response?.data);
    }, [])

    const onSubmit = (data) => {
        setEmail(data?.email)
    }

    // console.log('eeeeeeeeeeeeee', email)

    function handleOrder(index, orderValue, id) {
        setOrder(index)
        setOrderMoney(orderValue)
        setOrderId(id)
    }

    const onFinalSubmit = async (data) => {
        const res = await postRequest(`/payment-form/create`, {
            "paymentMethod" : 1,
            "id" : orderId,
            "email" : data?.email,
            "firstName" : data?.firstName,
            "lastName": data?.lastName,
            "creditCardNumber": data?.creditCardNumber,
            "expiryMonth": data?.expiryMonth,
            "expiryYear": data?.expiryYear,
            "cvc": data?.cvc,
            "zipCode": data?.zipCode,
        });
        if(res?.success) openNotificationWithIcon(res?.message, 'success')
    }

    const handlePaypal = async () => {
        const res = await postRequest(`/payment-form/create`, {
            "paymentMethod" : 2,
            "id" : orderId,
            "email" : email,
            "firstName" : '',
            "lastName": '',
            "creditCardNumber": '',
            "expiryMonth": '',
            "expiryYear": '',
            "cvc": '',
            "zipCode": '',
        })
    }


    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: packages?.length > 3 ? true : false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow:2,
                },
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    // arrows: false,
                },
            }
        ]
      };

    return (
        <div style={{backgroundColor: '#F7F8F9', overflowX: 'hidden'}}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <Container>
                <div className={styles.main}>
                    <div className={styles.choose__plan}>
                    <div dangerouslySetInnerHTML={{__html: `${data?.firstText}`}}></div>
                    <div dangerouslySetInnerHTML={{__html: `${data?.secondText}`}}></div>
                    </div>
                    <div className={styles.step__one}>
                        <div>
                            <div className={styles.step__one__details}>
                                <a className={styles.step__badge}>Step 1</a>
                                <h3><span style={{color: '#4CA952', fontWeight: '700'}}>Select</span> a plan that works for you:</h3>
                            </div>
                            <p>All plans include all REDCARD VPN apps, 24/7 customer support, and high-speed unlimited bandwidth.</p>
                        </div>
                        <div className="row">
                            <Slider {...settings} className="col-md-12">
                            {
                                packages?.map((item, index) =>(
                                    <div className={styles.card__style}>
                                    {item?.tagName ? <button className={`${order === index ? styles.active__badge : styles.badge}`}>
                                        {item?.tagName}
                                    </button> : null}
                                        <div className={`${order === index ? styles.active__package : styles.popular__package}`} onClick={() => handleOrder(index, item?.buyingPriceSum, item?._id)}>
                                        <h2>{item?.month} {item?.month > 1 ? 'Months' : 'Month'}</h2>
                                        {item?.regularPrice === item?.buyingPrice ? <h3></h3> : <h3 style={{color: '#CCD2D5'}}>${item?.regularPrice}</h3>}
                                        <h1 style={{color: '#4CA952'}}>${item?.buyingPrice}</h1>
                                        <h4>per month</h4>
                                        <p>Billed {item?.regularPriceSum === item?.buyingPriceSum ? `$${item?.buyingPriceSum}` : <span><span style={{textDecoration: 'line-through', color: '#CCD2D5'}}>${item?.regularPriceSum}</span> ${item?.buyingPriceSum}</span>} every {item?.month} months</p>
                                        <p>{item?.moneyBackGuarantee}-day money-back guarantee</p>
                                        {item?.saveTk ? <h2 style={{marginTop: '45px'}}>Save {item?.saveTk}%</h2> : null}
                                    </div>
                                    {item?.packageMsg && index === order ? <div>
                                        <p style={{marginTop: '10px', textAlign: 'center', color: 'white', backgroundColor: '#667782', padding: '10px', borderRadius: '5px', fontSize: '13px'}}>{item?.packageMsg}</p>
                                    </div> : null}
                                    </div>
                                ))
                            }
                            </Slider>
                        </div>
                        <p style={{marginBottom: '70px', marginTop: '20px'}}>All amounts shown are in USD.</p>
                    </div>
                    <div className={styles.step__two}>
                        <div>
                            <div className={styles.step__one__details}>
                                <a className={styles.step__badge}>Step 2</a>
                                <h3><span style={{color: '#4CA952', fontWeight: '700'}}>Enter</span> your email address:</h3>
                            </div>
                            <p>Privacy guarantee: We do not share your information and will contact you only as needed to provide our service.</p>
                        </div>
                        <form onChange={handleSubmit(onSubmit)} onBlur={() => setEmail(event.target.value)} style={{marginBottom: '50px'}}>
                            <input type="text" style={{width: '100%', padding: '10px', border: '1px solid #334A59', borderRadius: '8px'}} placeholder="Enter your email address" {...register("email", {required: true, pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i})} />
                            {errors.email && <span style={{marginBottom: '10px', color: 'red'}}>Please provide valid email!</span>}
                        </form>
                    </div>
                    <div className={styles.step__three}>
                        <div className={styles.step__one__details}>
                            <a className={styles.step__badge}>Step 3</a>
                            <h3><span style={{color: '#4CA952', fontWeight: '700'}}>Select</span> your preferred method of payment:</h3>
                        </div>
                        <div className={styles.step__three__details}>
                            <div style={{marginTop: '10px'}}>
                                {/* <div className={styles.credit__card} onClick={() => setCreditCard(!creditCard)}>
                                    {creditCard ? <Image src="/assets/images/icons/down-arrow.svg" height={20} width={20} /> : <Image src="/assets/images/icons/next.svg" height={20} width={20} />}
                                    <p>Credit Card</p>
                                    <Image src="/assets/images/card/1.png" height={15} width={55} />
                                    <Image src="/assets/images/card/2.png" height={15} width={55} />
                                    <Image src="/assets/images/card/3.png" height={15} width={55} />
                                    <Image src="/assets/images/card/4.png" height={15} width={55} />
                                    <Image src="/assets/images/card/5.png" height={15} width={55} />
                                    <Image src="/assets/images/card/6.png" height={15} width={55} />
                                    <Image src="/assets/images/card/7.png" height={15} width={55} />
                                </div>
                                <Collapse in={creditCard}>
                                    <div className={styles.credit__card__form}>
                                        <form onSubmit={handleSubmit(onFinalSubmit)}>
                                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '10px'}}>
                                            <div>
                                                <p>First Name:</p>
                                                <input className={styles.input__style} type="text" {...register('firstName', {required: true})} />
                                                {errors.firstName && <span>First Name is required</span>}
                                            </div>
                                            <div>
                                                <p>Last Name:</p>
                                                <input className={styles.input__style} type="text" {...register('lastName', {required: true})} />
                                                {errors.lastName && <span>Last Name is required</span>}
                                            </div>
                                            </div>
                                            <div style={{marginTop: '20px'}}>
                                                <p>Credit Card Number:</p>
                                                <input className={styles.input__style} type="text" {...register('creditCardNumber', {required: true})} />
                                                {errors.creditCardNumber && <span>Credit Card number is required</span>}
                                            </div>
                                            <div style={{display: 'grid', gridTemplateColumns: '170px 170px 200px 105px', gridGap: '15px', marginTop: '20px'}}>
                                                <div>
                                                    <p>Expiry Month:</p>
                                                    <select {...register('expiryMonth', {required: true})} className={styles.input__select__style}>
                                                    <option value="1">January</option>
                                                    <option value="2">February</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                    </select>
                                                    {errors.expiryMonth && <span>Expiry month is required</span>}
                                                </div>
                                                <div>
                                                    <p>Expiry Year:</p>
                                                    <select {...register('expiryMonth', {required: true})} className={styles.input__select__style}>
                                                    <option value="2050">2050</option>
                                                    <option value="2049">2049</option>
                                                    <option value="2048">2048</option>
                                                    <option value="2047">2047</option>
                                                    <option value="2046">2046</option>
                                                    <option value="2045">2045</option>
                                                    <option value="2044">2044</option>
                                                    <option value="2043">2043</option>
                                                    <option value="2042">2042</option>
                                                    <option value="2041">2041</option>
                                                    <option value="2040">2040</option>
                                                    <option value="2039">2039</option>
                                                    <option value="2038">2038</option>
                                                    <option value="2037">2037</option>
                                                    <option value="2036">2036</option>
                                                    <option value="2035">2035</option>
                                                    <option value="2034">2034</option>
                                                    <option value="2033">2033</option>
                                                    <option value="2032">2032</option>
                                                    <option value="2031">2031</option>
                                                    <option value="2030">2030</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <p>CVC:</p>
                                                    <input className={styles.input__style} type="text" {...register('cvc', {required: true})} />
                                                    {errors.cvc && <span>This field is required</span>}
                                                </div>
                                                <div>
                                                <p>Zip Code:</p>
                                                <input className={styles.input__style} type="text" {...register('zipCode', {required: true})} />
                                                {errors.zipCode && <span>This field is required</span>}
                                                </div>
                                            </div>
                                            <h3>Order Total: ${orderMoney}</h3>
                                            <input className={styles.submit__button} type="submit" value="Confirm" />
                                            <p style={{marginLeft: '30px'}}>By continuing to Credit Card, you agree to our Terms of Service.</p>
                                        </form>
                                    </div>
                                </Collapse> */}
                                <div style={{border: '1px solid black', borderRadius: '5px',}}>
                                <div className={styles.paypal} onClick={() => setPaypal(!paypal)}>
                                    {paypal ? <Image src="/assets/images/icons/down-arrow.svg" height={20} width={20} /> : <Image src="/assets/images/icons/next.svg" height={20} width={20} />}
                                    <p>Paypal</p>
                                    <Image src="/assets/images/card/paypal.png" height={15} width={55} />
                                </div>
                                <Collapse in={paypal}>
                                    <div className={styles.paypal__form}>
                                        <hr />
                                        <h4>CONTINUE BELOW TO BUY A VPN SUBSCRIPTION WITH PAYPAL.</h4>
                                        <h3>Order Total: <span style={{color: '#4CA952'}}>${orderMoney}</span></h3>
                                        <p>REDCARD VPN 1-month plan, billed monthly (${orderMoney}/month)</p>
                                        <button className={styles.paypal__button} onClick={handlePaypal}>Continue to Paypal</button>
                                        <div style={{display: 'grid', gridTemplateColumns: '16px auto', marginLeft: '28px', marginTop: '10px'}}>
                                            <div><FontAwesomeIcon icon={faLock} /></div>
                                            <p style={{marginLeft: '10px'}}>Secure checkout. You’re 100% covered by our 30-day money-back guarantee.</p>
                                        </div>
                                        <p>By continuing to PayPal, you agree to our <Link href="/terms-of-service"><a>Terms of Service.</a></Link></p>
                                    </div>
                                </Collapse>
                                </div>
                            </div>
                            <div>
                                <div className={styles.review__image}>
                                    <Image src="/assets/images/trustpilot.png" height={45} width={60} />
                                    <Image src="/assets/images/appstore.png" height={45} width={60} />
                                    <Image src="/assets/images/playstore.png" height={45} width={60} />
                                </div>
                                <div className={styles.feature}>
                                    <h2>REDCARD VPN includes</h2>
                                    <ul>
                                        <li>24/7 customer support by live chat</li>
                                        <li>Ultra-fast servers in 94 countries</li>
                                        <li>Apps for       and more!</li>
                                        <li>Best-in-class security & encryption</li>
                                        <li>No activity logs & no connection logs</li>
                                        <li>30 days risk-free. Not satisfied? Get your money back, no questions asked</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Order;