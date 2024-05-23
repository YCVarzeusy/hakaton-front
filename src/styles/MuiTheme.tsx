'use client'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ReactNode } from "react"
import { PaletteOptions } from "@mui/material/styles/createPalette";

// Extender la interfaz PaletteOptions para incluir tus colores personalizados
interface CustomPaletteOptions extends PaletteOptions {
    deactivate?: {
      main: string;
    },
    darkblue?: {
        main: string;
      }
    darkgreen?: {
        main: string;
    };
    gray?: {
      main: string;
    };
  }


const MuiTheme = ({children}:{children:ReactNode}) =>{
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none', // Desactiva la capitalización automática para todos los botones
                    },
                },
            },
        },
        palette: {
          mode: 'light',
          primary: {
            main: '#FFCC4A',
            contrastText: "black"
          },
          secondary: {
            main: '#00C299',
            contrastText: 'white',
          },
          warning: {
            main: '#570057',
          },
          info: {
            main: '#5372D9',
          },
          deactivate: {main: '#B6B1B1',},
          darkblue: {main:'#191A21'},
          darkgreen: {main:'#00213D'},
          gray:{ main:"#252424"}
        } as CustomPaletteOptions,
      });
    
    
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

  

export default MuiTheme