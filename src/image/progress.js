import { load, save } from "../core/storage.js";

export const loadProgress = () => load("image:progress", null);
export const saveProgress = (p) => save("image:progress", p);
