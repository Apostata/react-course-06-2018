import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.scss';
import controlers from '../../../json/buildControls.json';

const buildControls = (props) =>(
    <div className={styles.BuildControls}>
        {
            controlers.map((controle)=>(
                <BuildControl
                    key={controle.label}
                    label={controle.label}
                    type={controle.type}
                    add={()=>{props.addIngredient(controle.type)}}
                    remove={()=>{props.removeIngredient(controle.type)}}
                    disabledLess={props.disabled[controle.type]}
                />
            ))
        }
    </div>
);
export default buildControls;