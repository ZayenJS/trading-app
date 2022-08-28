import { FC, FormEvent } from 'react';

import classes from './Modal.module.scss';

export interface ModalProps {
  title?: string;
  text?: string;
  type: 'reset-chart' | 'save-strategy' | 'error';
  onConfirm?: () => void;
  onCancel?: () => void;
  clickOutside?: boolean;
  withButtons?: boolean;
}

const Modal: FC<ModalProps> = ({ title, type, onCancel, onConfirm, clickOutside, text, withButtons }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm?.();
  };

  let content = null;

  switch (type) {
    case 'reset-chart':
      content = (
        <>
          {title && <h2 className={classes.Title}>{title}</h2>}
          <strong>{text}</strong>
        </>
      );
      break;

    case 'save-strategy':
      content = <>{title && <h2 className={classes.Title}>{title}</h2>}</>;
      break;

    case 'error':
      content = (
        <>
          {title && <h2 className={classes.Title}>{title}</h2>}
          <strong>{text}</strong>
          (click outside to close)
        </>
      );
      break;

    default:
      break;
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Backdrop} onClick={clickOutside ? onCancel : undefined} />
      <form className={classes.Modal} onSubmit={onSubmit}>
        {content}
        {withButtons && (
          <div>
            <button type="button" className={classes.Btn__Cancel} onClick={onCancel}>
              Cancel
            </button>
            <button className={classes.Btn__Confirm}>Confirm</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Modal;
