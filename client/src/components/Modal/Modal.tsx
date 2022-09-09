import { FC, FormEvent } from 'react';

import classes from './Modal.module.scss';

type ModalType = 'reset-chart' | 'save-strategy' | 'error' | 'add-day-data' | 'day-details';

export interface ModalProps {
  title?: string;
  text?: string;
  type: ModalType;
  classNames?: {
    modal?: string;
    title?: string;
    body?: string;
    buttonsContainer?: string;
  };
  onConfirm?: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  clickOutside?: boolean;
  withButtons?: boolean;
  cancelText?: string;
  confirmText?: string;
  children?: React.ReactNode;
  buttonTheme?: 'confirm-green' | 'confirm-red';
}

const Modal: FC<ModalProps> = ({
  title,
  type,
  classNames,
  onCancel,
  onConfirm,
  clickOutside,
  text = null,
  withButtons,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  buttonTheme = 'confirm-red',
  children,
}) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConfirm?.(event);
  };

  let content = null;

  switch (type) {
    case 'reset-chart':
    case 'add-day-data':
    case 'day-details':
      content = (
        <>
          {text && <strong>{text}</strong>}
          {children}
        </>
      );
      break;

    case 'save-strategy':
      content = <> </>;
      break;

    case 'error':
      content = (
        <>
          {text && <strong>{text}</strong>}
          {children}
          (click outside to close)
        </>
      );
      break;

    default:
      break;
  }

  let confirmButtonClasses = classes.Btn__Danger;
  let cancelButtonClasses = classes.Btn__Success;

  if (buttonTheme === 'confirm-green') {
    confirmButtonClasses = classes.Btn__Success;
    cancelButtonClasses = classes.Btn__Danger;
  } else if (buttonTheme === 'confirm-red') {
    confirmButtonClasses = classes.Btn__Danger;
    cancelButtonClasses = classes.Btn__Success;
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Backdrop} onClick={clickOutside ? onCancel : undefined} />
      <form
        className={`${classes.Modal}
        ${classNames?.modal ? classNames.modal : ''}
      `}
        onSubmit={onSubmit}>
        <div className={`${classNames?.body ? classNames.body : ''}`}>
          {title && <h2 className={classes.Title}>{title}</h2>}
          {content}
        </div>
        {withButtons && (
          <div>
            <button type="button" className={cancelButtonClasses} onClick={onCancel}>
              {cancelText}
            </button>
            <button className={confirmButtonClasses}>{confirmText}</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Modal;
