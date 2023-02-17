import { Dialog } from "./";
import A11yDialog from "a11y-dialog";
import { useSignal, NoSerialize, component$ } from "@builder.io/qwik";
export default component$(() => {
  const dialog = useSignal<NoSerialize<A11yDialog | undefined>>();
  const alert = useSignal<NoSerialize<A11yDialog | undefined>>();
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        TEST
        <button onClick$={() => dialog.value?.show()}>Show</button>
        <button onClick$={() => alert.value?.show()}>Alert</button>
        <Dialog
          title="Hello World"
          id="hello-world-dialog"
          closeButtonPosition="last"
          dialogSignal={dialog}
        >
          Hello World
        </Dialog>
        <Dialog
          title="Hello World Alert"
          id="hello-world-alert"
          closeButtonPosition="last"
          dialogSignal={alert}
          role="alertdialog"
        >
          Hello World Alert
        </Dialog>
      </body>
    </>
  );
});
