import React, { Component } from 'react';

// const withClass = (WrappedComponent, className) =>{
//     return (props) => ( 
//         <div className = {className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }
const withClass = (WrappedComponent, className) =>{
    const WithClass = class extends Component{ //class on Demand
        render(){
            return( 
                <div className = {className}>
                    <WrappedComponent ref={this.props.childRefs} {...this.props} />
                </div>
            );
        }
    }
    
    return React.forwardRef((props, ref)=>{
        return <WithClass {...props} childRefs={ref} />
    });
}
export default withClass;