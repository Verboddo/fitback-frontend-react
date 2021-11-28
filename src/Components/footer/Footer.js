import styles from "./Footer.module.css"
import dumbell from "../../assets/dumbell1.png"
import {Link} from "react-router-dom";
import { MdOutlineLocationOn, MdPhone, MdOutlineEmail } from "react-icons/md"

function Footer() {
    return (
        <>
            <div className={styles["footer-container"]}>

                <nav>

                    <Link to="/">
                <span className={styles["logo-container"]}>
                    <img src={dumbell} alt="logo"/>
                    <h3>
                        Fitback
                    </h3>
                </span>
                    </Link>
                    <div className={styles["footer-contact-information-container"]}>
                        <p>Contact information</p>
                        <p> <MdOutlineLocationOn/> Cellostraat 48</p>
                        <p>4876VP Etten-Leur</p>
                        <p>
                            <MdPhone/>
                            <a href="tel:+31651776472"> +31 651776472</a>
                        </p>
                        <a href="mailto:ramonsmeekens@hotmail.com">
                            <MdOutlineEmail/> ramonsmeekens@hotmail.com</a>
                    </div>

                </nav>




            </div>
        </>
    )
}

export default Footer