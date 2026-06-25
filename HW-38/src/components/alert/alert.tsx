import styles from './alert.module.css'

type AlertType = "warning" | "error" | "success" | "info" | "notification";

type AlertProps = {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
};

function Alert ({type, title, message, onClose}: AlertProps) {
    return(
        <div className={`alert alert--${type}`}>
            <div className='alert__icon'/>
            <div className='alert__text'/>
            <button className='alert__close' onClick={onClose}>✕</button>
        </div>
    )
}

export default Alert