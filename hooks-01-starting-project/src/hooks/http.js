import { useReducer, useCallback } from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (currentUiState, action) => { // para mostar o loader e o modal de erros
    switch(action.type){
        case 'SEND':
            return { error: null, loading: true, data: null };
        case 'RESPONSE':
            return { error: null, loading: false, data: action.responseData, extra: action.extra, identifier: action.identifier };
        case 'CLEAR':
            return initialState;
        case 'ERROR':
            return { ...currentUiState, error: action.error.message };
        default :  
            throw new Error('Should not get there!');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp ]= useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({type:'CLEAR'}), []);

    const sendRequest = useCallback((url, method, body, extra, identifier) =>{
        dispatchHttp({type:'SEND', identifier});
        fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseData)=> {
            dispatchHttp({type:'RESPONSE', responseData, extra, identifier});
        })
        .catch(error =>{
            dispatchHttp({type:'ERROR', error, identifier});
        })
    },[]);

    return {
        loading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        identifier: httpState.identifier,
        sendRequest,
        clear
    }
};

export default useHttp;