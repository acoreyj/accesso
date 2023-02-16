// export default function Portal() {
//   return null;
// }
import { isBrowser } from '../functions/is-browser';
import A11yDialogLib from 'a11y-dialog';
import Portal from './Portal.lite';
import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  onUpdate,
  Show,
  useDefaultProps,
} from '@builder.io/mitosis';
type DialogRef = (dialog?: A11yDialogLib) => undefined;

export interface DialogProps {
  role?: 'dialog' | 'alertdialog';
  id: string;
  title: any;
  dialogRef?: DialogRef;
  titleId?: string;
  closeButtonLabel?: string;
  closeButtonContent?: any | string;
  closeButtonPosition?: 'first' | 'last' | 'none';
  dialogRoot?: string;
  classNames?: {
    container?: string;
    overlay?: string;
    dialog?: string;
    title?: string;
    closeButton?: string;
  };
  children?: any;
}

export default function Dialog(props: DialogProps) {
  const ref = useRef<HTMLElement>(null);
  useDefaultProps({
    role: 'dialog',
    closeButtonLabel: 'Close this dialog window',
    closeButtonContent: '\u00D7',
    closeButtonPosition: 'first',
    classNames: {
      container: 'dialog-container',
      overlay: 'dialog-overlay',
      dialog: 'dialog-content',
    },
    dialogRef: (() => undefined) as DialogRef,
    children: [] as any[],
  });
  const state = useStore({
    isMounted: false,
    isOpen: false,
    titleId: '',
    get attributes(): any {
      return {
        container: {
          id: props.id,
          role: props.role,
          tabIndex: -1,
          'aria-modal': true,
          'aria-hidden': true,
          'aria-labelledby': state.titleId,
        },
        overlay: {
          onClick:
            props.role === 'alertdialog'
              ? undefined
              : () => (state.isOpen = false),
        },
        dialog: { role: 'document' },
        closeButton: { type: 'button', onClick: () => (state.isOpen = false) },
        // Using a paragraph with accessibility mapping can be useful to work
        // around SEO concerns of having multiple <h1> per page.
        // See: https://twitter.com/goetsu/status/1261253532315004930
        title: { role: 'heading', 'aria-level': 1, id: state.titleId },
      };
    },
    instance: undefined as A11yDialogLib | undefined,
    get button(): any {
      return (
        <button
          {...state.attributes.closeButton}
          className={props.classNames?.closeButton}
          aria-label={props.closeButtonLabel}
          key="button"
        >
          {props.closeButtonContent}
        </button>
      );
    },
    get target(): HTMLElement | string {
      if (isBrowser()) {
        let targetEl = props.dialogRoot
          ? document.querySelector(props.dialogRoot)
          : document.body;
        targetEl = targetEl ?? document.body;
        return targetEl as HTMLElement;
      }
      return 'body';
    },
  });

  onUpdate(() => {
    if (ref && !state.instance) {
      state.instance = new A11yDialogLib(ref);
    }
  });

  onUpdate(() => {
    if (state.instance) {
      state.instance.on('show', () => (state.isOpen = true));
      state.instance.on('hide', () => (state.isOpen = false));
    }
  }, [state.instance]);

  onMount(() => {
    if (!state.titleId) {
      state.titleId = props.titleId ?? props.id + '-title';
    }
    if (!state.isMounted && isBrowser()) {
      state.isMounted = true;
    }
  });

  onUnMount(() => {
    if (state.instance) state.instance.destroy();
  });

  onUpdate(() => {
    if (state.instance && props.dialogRef) props.dialogRef(state.instance);
    return () => props.dialogRef && props.dialogRef(undefined);
  }, [props.dialogRef, state.instance]);

  onUpdate(() => {
    if (!state.isOpen && state.instance?.shown) {
      state.instance.hide();
    }
  }, [state.isOpen]);

  return (
    <Show when={state.isMounted}>
      <Portal target={state.target}>
        <div
          ref={ref}
          {...state.attributes.container}
          className={props.classNames?.container}
        >
          <div
            {...state.attributes.overlay}
            className={props.classNames?.overlay}
          />
          <div
            {...state.attributes.dialog}
            className={props.classNames?.dialog}
          >
            <Show when={props.closeButtonPosition === 'first'}>
              {state.button}
            </Show>
            <p
              {...state.attributes.title}
              className={props.classNames?.title}
              key="title"
            >
              {props.title}
            </p>
            {props.children}
            <Show when={props.closeButtonPosition === 'last'}>
              {state.button}
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
