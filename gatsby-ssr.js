import React from 'react'
import ContextProvider from './src/components/Context/AppContext'

export const wrapRootElement = ({ element }) => <ContextProvider>{element}</ContextProvider>
