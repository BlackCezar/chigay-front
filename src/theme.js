import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        heading: 'Open Sans, sans-serif',
        body: 'Raleway, sans-serif'
    },
    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        blue: '#0B59A4',
        gray: {
            50: '#f7fafc',
            // ...
            900: '#171923'
        }
        // ...
    }
})

export default theme
