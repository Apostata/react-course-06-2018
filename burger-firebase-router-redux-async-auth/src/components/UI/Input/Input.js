import React from 'react';
import styles from './Input.scss';

const input = (props)=>{
    let inputElement = null;
    const inputClasses =[styles.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(styles.Invalid);
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                    className={inputClasses.join(' ')}
                    {...props.attributes}
                    value={props.value}
                    onChange={props.change}
                />;
            break;

        case ('textarea'):
            inputElement = <textarea
                    className={inputClasses.join(' ')}
                    {...props.attributes}
                    value={props.value}
                    onChange={props.change}
                />;
            break;

        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                onChange={props.change}
                value={props.value}
                >
                {props.attributes.options
                    .map(option =>
                    <option 
                        key={option.value}
                        value={option.value}>
                        {option.text}
                    </option>)}
            </select>;
            break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.attributes}
                value={props.value}
                onChange={props.change}
            />;
            break;
    }

    return (
        <div className={styles.Input} >
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;