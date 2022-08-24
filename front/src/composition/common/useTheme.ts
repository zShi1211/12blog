import { ref, watchEffect } from 'vue';

type IThemeState = "light" | "dark" | undefined;
const key = 'Theme'
const theme = ref<IThemeState>("dark");
const prestoreTheme = localStorage.getItem(key)
if (prestoreTheme) {
    theme.value = prestoreTheme as IThemeState;
}
export default function useTheme() {
    watchEffect(() => {
        localStorage.setItem(key, theme.value!);
        document.documentElement.className = theme.value!;
    })
    function switchTheme() {
        theme.value = theme.value === 'dark' ? "light" : "dark";
    }
    return {
        theme,
        switchTheme,

    }
}


