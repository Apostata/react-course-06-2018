import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpClient from '../../hooks/http-error-handler';

const withErrorHandler = ( WrappedComponent, axios ) =>{
   
    return props =>{
        const [errorState, clearError] = useHttpClient(axios);
        return (
            <Fragment>
                <Modal show={errorState} backdropClick={clearError}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
};

export default withErrorHandler; //exporta função
