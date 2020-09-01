import { loadTheme } from "@fluentui/react/lib/Styling"

loadTheme({
  defaultFontStyle: {
    fontFamily: "'Baloo Tamma 2', cursive",
    fontSize: "1.3rem",
    letterSpacing: "0.09rem",
    color: "white",
  },
  fonts: {
    large: {
      fontWeight: "bold",
    },
    xLarge: {
      fontSize: "1.6rem",
    },
  },
  palette: {
    themePrimary: '#61dafb',
    themeLighterAlt: '#04090a',
    themeLighter: '#102328',
    themeLight: '#1d414b',
    themeTertiary: '#3a8296',
    themeSecondary: '#56bfdc',
    themeDarkAlt: '#71ddfa',
    themeDark: '#87e2fb',
    themeDarker: '#a6e9fc',
    neutralLighterAlt: '#262a32',
    neutralLighter: '#262931',
    neutralLight: '#24282f',
    neutralQuaternaryAlt: '#22252c',
    neutralQuaternary: '#20232a',
    neutralTertiaryAlt: '#1f2228',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#282c34',
  },
})