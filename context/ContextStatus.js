import { parseCookies } from 'nookies';
import { createContext, useContext, useState } from 'react';

const ContextStatus = createContext()

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {
  const cookie = parseCookies()
  // let items = cookie?.hasOwnProperty('cookieCartItems') ? [...JSON.parse(cookie?.cookieCartItems)] : []
  
  // const [cartItems, setCartItems] = useState(items);
//   const [message, setMessage] = useState('')
  // const [sideCart, setSideCart] = useState(false)
  // const [token, setToken] = useState(cookie?.token ? cookie?.token : null)
  const [loginModal, setLoginModal] = useState(null);
  const [navTop, setNavTop] = useState(true);
  // const [resellerPrice, setResellerPrice] = useState(0)
//   const [otpModal, setOtpModal] = useState(false);
  // const [user, setUser] = useState(cookie?.user ? cookie?.user : null)
  // const [deliveryType, setDeliveryType] = useState(false);
  // const [totalResellerValue, setTotalResellerValue] = useState(0);
  // const [order, setOrder] = useState(true);
  // const [sideCategory, setSideCategory] = useState(false);
  // const [categoryMenu, setCategoryMenu] = useState(false);
  // const [insideDhaka, setInsideDhaka] = useState(0);
  // const [outsideDhaka, setOutsideDhaka] = useState(0);
  // const [checkout, setCheckout] = useState(false);
  // const [firstOrderDiscount, setFirstOrderDiscount] = useState(false);
  // const [firstOrderDiscountAmount, setFirstOrderDiscountAmount] = useState(0);
  // const [page, setPage] = useState(1);

//  console.log('user',user) 
//  console.log('token',token)

  return (
    <ContextStatusProvider value={{ 
      // cartItems, setCartItems, 
      // sideCart, setSideCart,
      // token, setToken,
      // sideCategory, setSideCategory,
      loginModal, setLoginModal,
      navTop, setNavTop,
      // resellerPrice, setResellerPrice,
      // order, setOrder,
      // user, setUser,
      // deliveryType, setDeliveryType,
      // totalResellerValue, setTotalResellerValue,
      // sideCategory, setSideCategory,
      // categoryMenu, setCategoryMenu,
      // insideDhaka, setInsideDhaka,
      // outsideDhaka, setOutsideDhaka,
      // checkout, setCheckout,
      // page, setPage,
      // firstOrderDiscount, setFirstOrderDiscount,
      // firstOrderDiscountAmount, setFirstOrderDiscountAmount,
      }}>
      {children}
    </ContextStatusProvider>
  )
}

function useStatus() {
  const all = useContext(ContextStatus)
  return all;
}

export { StatusProvider, useStatus };
