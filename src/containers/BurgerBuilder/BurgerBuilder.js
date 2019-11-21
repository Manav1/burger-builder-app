import React from 'react';
import Aux from '..//../hoc//Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const PRICES={
    salad:20,
    cheese:15,
    meat:30,
    bacon:30
};
class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state={
        ingridients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        totalPrice:40,
        purchasable:false,
        purchasing:false
    }
}
    updatePurchaseState(ingridients){
        
        const sum=Object.keys(ingridients).map(igKey=>{
            return ingridients[igKey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0})
    }
    addIngridientHandler=(type)=>{
        const oldCount=this.state.ingridients[type];
        const updatedCount=oldCount+1;
        const upgradedIngridients={...this.state.ingridients};
        upgradedIngridients[type]=updatedCount;
        const priceAddition=PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingridients:upgradedIngridients});
        this.updatePurchaseState(upgradedIngridients);
    }
    purchaseHandler=()=>{
     this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        alert('Order Placed!');
    }
    removeIngridientHandler=(type)=>{
        const oldCount=this.state.ingridients[type];
        if(oldCount<=0)
        {
            return;
        }
        const updatedCount=oldCount-1;
        const upgradedIngridients={...this.state.ingridients};
        upgradedIngridients[type]=updatedCount;
        const priceDeduction=PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingridients:upgradedIngridients});
        this.updatePurchaseState(upgradedIngridients);
    }
    render(){
        const disabledInfo={
         ...this.state.ingridients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingridients={this.state.ingridients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                    />
                    </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls
                price={this.state.totalPrice}
                ingridientAdded={this.addIngridientHandler}
                ingridientRemoved={this.removeIngridientHandler}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;