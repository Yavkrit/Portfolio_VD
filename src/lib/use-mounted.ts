import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after the client has hydrated. Avoids the SSR/client
 * mismatch on theme-dependent UI without a setState-in-effect re-render.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
