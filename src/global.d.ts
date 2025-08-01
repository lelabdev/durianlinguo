declare module "$app/environment" {
  export const browser: boolean;
}

declare const $state: <T>(value?: T) => T;
declare const $effect: (fn: () => void) => void;
