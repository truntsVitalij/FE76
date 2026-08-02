import {type  FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearPreviewImage } from '../../store/actions';
import Modal from '../../shared/ui/Modal';
import styles from './ImagePreview.module.css';

const ImagePreview: FC = () => {
  const imageUrl = useAppSelector((state) => state.imagePreview.imageUrl);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearPreviewImage());
  };

  return (
    <Modal isOpen={!!imageUrl} onClose={handleClose}>
      {imageUrl && <img src={imageUrl} alt="Preview" className={styles.image} />}
    </Modal>
  );
};

export default ImagePreview;