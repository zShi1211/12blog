/// <reference types="vite/client" />



export { };
declare module 'vue' {
  interface ComponentCustomProperties {
    $dateFormat: (date: Date) => string;
  }
}



