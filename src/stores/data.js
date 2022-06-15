import { writable } from "svelte/store";

export const dataResult = writable([]);
export const libraryResult = writable([]);

export const geoData = writable(false);
export const geoLocation = writable(false);
