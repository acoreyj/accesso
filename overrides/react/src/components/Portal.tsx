import { createPortal } from 'react-dom';
import { PropsWithChildren } from 'react';
import { isBrowser } from '../functions/is-browser';
export interface PortalProps extends PropsWithChildren<any> {
  target: HTMLElement | string;
}

export default function Portal(props: PortalProps) {
  let target: HTMLElement | null;
  if (typeof props?.target === 'string') {
    target = document.querySelector(props.target);
  } else {
    target = props.target;
  }
  return isBrowser()
    ? createPortal(props.children, target || document.body)
    : undefined;
}
