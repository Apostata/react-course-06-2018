import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios ) =>{
    return class extends Component{ //classe anonima
        state = {
            error: null
        }

        componentWillMount(){
            axios.interceptors.response.use(req =>{ // na requisição limpa o modal
                this.setState({
                    error: null
                });
                return req;
            });

            axios.interceptors.response.use(res => res, error =>{
               this.setState({
                   error:error
               });
            })
        }

        errorConfirmedHandler(){
            this.setState({
                error:null
            })
        }        

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} backdropClick={this.errorConfirmedHandler.bind(this)}>
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};

export default withErrorHandler; //exporta função
