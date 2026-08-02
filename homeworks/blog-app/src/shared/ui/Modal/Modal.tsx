import { type FC, type PropsWithChildren, useEffect } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<PropsWithChildren<IModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Button variant="text" className={styles.closeBtn} onClick={onClose}>
          ✕
        </Button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
