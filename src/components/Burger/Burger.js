import React from 'react';
import './Burger.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingridients).map(igKey=>{
    return[...Array(props.ingridients[igKey])].map((_,i)=>{return <BurgerIngridient key={igKey+i} type={igKey}/>});
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length===0)
    {
        transformedIngredients=<p>Please add ingridients</p>
    }
return(
<div className="Burger">
<BurgerIngridient type="bread-top"/>
{transformedIngredients}
<BurgerIngridient type="bread-bottom"/>
</div>
);
};
export default burger;