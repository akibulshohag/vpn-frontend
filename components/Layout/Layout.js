import { Fragment } from "react";
import { Container } from "react-bootstrap";
import styles from './Layout.module.css';
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";


function Layout({ children }) {
    return (
        <Fragment>
            <NavBar />
            
            <div style={{backgroundColor:'var(--background-color)'}}>
                {/* <Container> */}
                    <Fragment>
                        {children}
                    </Fragment>
                {/* </Container> */}
            </div>
            <Footer />
        </Fragment>
    );
}

export default Layout;