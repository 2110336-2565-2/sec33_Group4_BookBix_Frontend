import React, { createContext, FC, useContext, useMemo, useState } from 'react'
import { AccessTokenInterface } from '../interfaces/authentication.interface'

interface UserProviderProps extends React.PropsWithChildren<{}> {}
interface UserContextInterface {
  currentToken: AccessTokenInterface | null
  setCurrentToken: (token: AccessTokenInterface | null) => void
}
const TokenContext = createContext<UserContextInterface | undefined>(undefined)

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentToken, setCurrentToken] = useState<AccessTokenInterface | null>(null)

  const context = useMemo<UserContextInterface>(
    () => ({
      currentToken: currentToken,
      setCurrentToken: setCurrentToken,
    }),
    [currentToken],
  )

  return <TokenContext.Provider value={context}>{children}</TokenContext.Provider>
}

export const useTokenContext = () => {
  const context = useContext(TokenContext)

  if (context === undefined) {
    throw new Error('Cannot use useTokenContext outside of UserProvider')
  }

  return context
}
