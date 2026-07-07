import {
    HiOutlineExclamationTriangle,
    HiOutlineXCircle,
    HiOutlineCheckCircle,
    HiOutlineInformationCircle,
    HiOutlineBell
} from "react-icons/hi2";

import styles from "./alert.module.css";

const icons = {
    warning: <HiOutlineExclamationTriangle />,
    error: <HiOutlineXCircle />,
    success: <HiOutlineCheckCircle />,
    info: <HiOutlineInformationCircle />,
    primary: <HiOutlineBell />
};

const Alert = ({ type = "info", children }) => {
    return (
        <div className={`${styles.alert} ${styles[type]}`}>

            <div className={styles.left}>

                <span className={styles.icon}>
                    {icons[type]}
                </span>

                <span className={styles.text}>
                    {children}
                </span>

            </div>
        </div>
    );
};

export default Alert;