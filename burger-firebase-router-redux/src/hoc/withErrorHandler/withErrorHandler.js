import React, {Component, Fragment} from '../../../../../../../Users/tak_esouza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios ) =>{
    return class extends Component{ //classe anonima
        state = {
            error: null
        }
        

        componentWillMount(){
           this.reqInterceptor = axios.interceptors.request.use(req =>{ // na requisição limpa o modal
                this.setState({
                    error: null
                });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
               this.setState({
                   error:error
               });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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
