/// <reference types="svelte" />
import App from "../../App/component.svelte";
// //@ts-ignore: not supported by Svelte
export default new App({ target: <Element>document.querySelector('[ng-view]') });
