import React from 'react';
import propTypes from 'prop-types';
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { transcode } from 'buffer';

class Order extends React.Component{
    static propTypes = {
        fishes:propTypes.object,
        order:propTypes.object,
        RemoveFromOrder:propTypes.func
    }
    renderOrder= (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.orders[key];
        const isAvailable=fish && fish.status=== "available";
        if(!fish){
            return null;
        }
        if(!isAvailable){
            return(
                <CSSTransition classNames="count" key={key} timeout={{enter:2000, exit:2000}}>
                <li key={key}> sorry {fish ? fish.name : 'fish'} is currently unavailable</li>
                </CSSTransition>
            );
        }
        return(
        <CSSTransition classNames="order" key={key} timeout={{enter:250, exit:250}} >
        <li key={key}>
                <span>
            <TransitionGroup component="span" className="count">
                <CSSTransition
                classNames="count"
                key={count}
                timeout={{enter:500 , exit:500}}
                >
                <span>{count}</span>
                </CSSTransition>
                </TransitionGroup>
                
            kg {fish.name}
            {formatPrice(count * fish.price)} 
            <button onClick={() => this.props.RemoveFromOrder(key)}>&times;</button>
            </span>
        </li>
        </CSSTransition>
        );
    };
    render(){
        const orderIds=Object.keys(this.props.orders)
        const total = orderIds.reduce((prevTotal,key) => {
            const fish = this.props.fishes[key];
            const count = this.props.orders[key];
            const isAvailable= fish && fish.status === "available";
            if(isAvailable)
        {
            return prevTotal + (count * fish.price);
        }
            return prevTotal;
         },0);
        return(
           <div className="order-wrap">
               <h2> Order </h2>
              <TransitionGroup component="ul" className="order">
              {orderIds.map(this.renderOrder)}
            </TransitionGroup> 
               <div className="total">
                   Total:
                   <strong>{formatPrice(total)}</strong>
               </div>
           </div>
        );
    }
}
export default Order;