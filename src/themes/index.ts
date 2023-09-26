import {createTheme} from "@mui/material";
import vars from "styles/_variables.scss";

export const synoraTheme = createTheme(
    {
        typography: {
            fontFamily: vars.fontMulishLight,
        },

        palette: {
           primary: {
               main: vars.mainColor,
           }
        }
    }
)