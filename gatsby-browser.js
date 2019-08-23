// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { themes, type Theme } from './src/designSystem'
import { useLocalStorage } from './src/hooks'
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
export const AppContext = React.createContext()

const Wrapped = ({ children }) => {
 const [activeTheme, setActiveTheme] = useLocalStorage('activeTheme', 'light')
 return (
  <AppContext.Provider value={[activeTheme, setActiveTheme]}>
   <ThemeProvider theme={themes[activeTheme]}>{children}</ThemeProvider>
  </AppContext.Provider>
 )
}

export const wrapRootElement = ({ element }) => <Wrapped>{element}</Wrapped>
