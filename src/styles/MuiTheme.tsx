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
            main: '#3DB4E6',
            contrastText: "white"
          },
          secondary: {
            main: '#570057',
          },
          warning: {
            main: '#570057',
          },
          info: {
            main: '#1d4758',
          },
          deactivate: {main: '#B6B1B1',},
          darkblue: {main:'#435161'},
          darkgreen: {main:'#1D4758'}
        } as CustomPaletteOptions,
      });
    
    
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

  

export default MuiTheme