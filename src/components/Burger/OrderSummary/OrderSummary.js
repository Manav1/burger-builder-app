import React from 'react';
import Aux from '../../../hoc/Aux1';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingridients)
    .map(igKey=>{
        return(
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingridients[igKey]}
            </li>);
    });
    return(
        <Aux>
        <h3>Your Oder</h3>
        <p>A delicious Burger with the following ingredients:</p>
        <ul>
        {ingredientSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
export default orderSummary;