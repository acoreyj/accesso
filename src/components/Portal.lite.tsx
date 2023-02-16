import { onMount, useStore } from '@builder.io/mitosis';
import { isBrowser } from '../functions/is-browser';
export interface PortalProps {
  target: HTMLElement | string;
  children?: any;
}
export default function Portal(props: PortalProps) {
  const state = useStore({
    target: null as HTMLElement | null,
  });
  onMount(() => {
    if (!state.target && isBrowser()) {
      let targetEl: HTMLElement | null;
      if (typeof props?.target === 'string') {
        targetEl = document.querySelector(props.target);
      } else {
        targetEl = props.target;
      }
      state.target = targetEl || document.body;
    }
  });
  return null;
}
// import { component$, useSignal, Slot, useClientEffect$ } from '@builder.io/qwik';

// interface Props {
//   target: HTMLElement | string
// }

// export const Portal = component$<Props>((props) => {
//   const el = useSignal<HTMLElement>()

//   useClientEffect$(({ cleanup }) => {
//     const target = typeof props.target === 'string'
//       ? document.querySelector(props.target)
//       : props.target;

//     target.appendChild(el.value)

//     cleanup(() => {
//       if(el.value?.parentNode) {
//         el.value.parentNode.removeChild(el.value)
//       }
//     })
//   })

//   return <div ref={el}>
//     <Slot />
//   </div>
// })
