import { useState, useEffect } from 'react';

export default httpClient => {
    const [errorState, errorSetState] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req =>{ // na requisição limpa o modal
        errorSetState(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, error =>{
        errorSetState(error);
    });

    const clearError = () => errorSetState(null);

    useEffect( //after render
        ()=>{
            return ()=>{
                console.log('after render')
                httpClient.interceptors.request.eject(reqInterceptor);
                httpClient.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor, httpClient]
    );

    return [errorState, clearError];
}