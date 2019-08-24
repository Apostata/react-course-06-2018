import React, {useState} from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () =>{}
});


const AuthContextProvider = props => {

    const [authState, setAuthState] = useState(false);

    const loginHandler = () => {
        setAuthState(true)
    }

     return (
        <AuthContext.Provider value={{ login: loginHandler, isAuth: authState }} >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;