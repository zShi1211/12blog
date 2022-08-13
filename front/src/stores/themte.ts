import { defineStore } from 'pinia'

interface IThemeState {
  theme: "light" | "dark";
}
interface IThemeAction {
  switchTheme: () => void
}

export const useThemeStore = defineStore<'theme', IThemeState, {}, IThemeAction>({
  id: 'theme',
  state: () => ({
    theme: 'light'
  }),
  actions: {
    switchTheme() {
      this.theme = this.theme === 'dark' ? "light" : "dark";
    }
  }
})
