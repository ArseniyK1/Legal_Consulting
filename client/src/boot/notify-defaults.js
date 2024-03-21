import { Notify } from "quasar";

Notify.setDefaults({
  timeout: 3500,
  position: "bottom-right",
  textColor: "white",
  type: "info",
  actions: [{ icon: "close", color: "white" }],
});
