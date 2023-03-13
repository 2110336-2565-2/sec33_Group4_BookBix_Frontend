import React, { createContext, FC, useContext, useMemo, useState } from "react";
import { UserInterface } from "../interfaces/user.interfaces";
interface UserProviderProps extends React.PropsWithChildren<{}> {}

interface IUserContext {
    currentUser: UserInterface | null;
    setCurrentUser: (user: UserInterface | null) => void;
}
const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: FC<UserProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
    
    const context = useMemo<IUserContext>(() => ({
        currentUser,
        setCurrentUser
    }), [currentUser])
    
    return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    
    if(context === undefined) {
        throw new Error("Cannot use useUserContext outside of UserProvider")
    }
    
    return context;
}