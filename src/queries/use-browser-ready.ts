"use client";

import { useSyncExternalStore } from "react";

const subscribeBrowser = () => () => {};

/** false during SSR, true in the browser, so queries do not run on the server. */
export function useBrowserReady() {
  return useSyncExternalStore(
    subscribeBrowser,
    () => true,
    () => false,
  );
}
