import { FC, FormEvent } from 'react';

import classes from './Modal.module.scss';

export interface ModalProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  clickOutside?: boolean;
}

const Modal: FC<ModalProps> = ({ onCancel, onConfirm, clickOutside, text }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Backdrop} onClick={clickOutside ? onCancel : undefined}></div>
      <form className={classes.Modal} onSubmit={onSubmit}>
        <strong>{text}</strong>
        <div>
          <button type="button" className={classes.Btn__Cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={classes.Btn__Confirm}>Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
