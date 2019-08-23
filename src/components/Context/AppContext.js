// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { themes } from '../../designSystem'
import { useLocalStorage } from '../../hooks'
import GlobalStyle from '../../designSystem/GlobalStyle'

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
export const AppContext = React.createContext()

const ContextProvider = ({ children }) => {
 const [activeTheme, setActiveTheme] = useLocalStorage('activeTheme', 'light')
 return (
  <AppContext.Provider value={[activeTheme, setActiveTheme]}>
   <ThemeProvider theme={themes[activeTheme]}>{children}</ThemeProvider>
   <GlobalStyle theme={themes[activeTheme]} />
  </AppContext.Provider>
 )
}

export default ContextProvider
