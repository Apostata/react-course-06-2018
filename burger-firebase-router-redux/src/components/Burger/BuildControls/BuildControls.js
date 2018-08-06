import React from '../../../../../../../../Users/tak_esouza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.scss';
import controlers from '../../../json/buildControls.json';

const buildControls = (props) =>(
    <div className={styles.BuildControls}>
        <p>Preço final : R$ {props.totalPrice.toFixed(2)}</p>
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
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orded}
        >PEDIR</button>
    </div>
);
export default buildControls;