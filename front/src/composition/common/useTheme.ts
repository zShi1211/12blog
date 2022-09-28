import { ref, watchEffect } from 'vue';

type IThemeState = "light" | "dark" | undefined;
const key = 'Theme'
const theme = ref<IThemeState>("dark");
const prestoreTheme = localStorage.getItem(key)
if (prestoreTheme) {
    theme.value = prestoreTheme as IThemeState;
}

watchEffect(() => {
    localStorage.setItem(key, theme.value!);
    document.documentElement.className = theme.value!;
})
export default function useTheme() {
    function switchTheme() {
        theme.value = theme.value === 'dark' ? "light" : "dark";
    }
    return {
        theme,
        switchTheme,
    }
}


