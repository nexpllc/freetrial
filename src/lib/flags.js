/* Small persistent flags — "already saw the popup", that kind of thing.
   Falls back silently when storage is blocked (private mode, in-app browsers
   with storage disabled), because none of this is worth breaking a page over. */
export const flagStore = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* nothing to do — the flag just won't survive this session */
    }
  },
};
