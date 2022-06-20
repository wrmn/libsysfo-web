import { writable } from "svelte/store";

// get data result for list
export const dataResult = writable([]);
export const libraryResult = writable([]);
export const routeResult = writable([]);
export const routeIndex = writable(0);
export const guideResult = writable([]);

export const geoData = writable(false);
