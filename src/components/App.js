import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from "../Base";
import propTypes from 'prop-types';

class App extends React.Component{
state = {
    fishes:{},
    orders:{}
};
static propTypes = {
mathc:propTypes.object
};
componentDidMount() {
    const {params} = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeid);
    if(localStorageRef){
        this.setState({orders:JSON.parse(localStorageRef)});
    }
    this.ref=base.syncState(`${params.storeid}/fishes`, {
        context:this,
        state:'fishes'
    });
}
componentWillUnmount() {
    base.removeBinding(this.ref);
}
componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeid, JSON.stringify(this.state.orders));
}

 AddFish = fish => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`]=fish;
    this.setState({fishes});
};
UpdateForm = (key, updatedForm) => {
 const fishes= {...this.state.fishes};
 fishes[key] = updatedForm;
 this.setState({fishes});
};

DeleteFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
};

LoadSampleFish = () => {
    this.setState({fishes:SampleFishes});
};
AddToOrder = (key) => {
    const orders = {...this.state.orders};
    orders[key]=orders[key]+1 || 1;
    this.setState({orders});
};
RemoveFromOrder = (key) =>{
    const orders = {...this.state.orders};
    delete orders[key];
    this.setState({orders});

};
    render(){
    return(
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="your fresh sea food" />
                <ul className="fishes">
                    {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.AddToOrder} />)};
                </ul>
            </div>
            <Order AddToOrder={this.AddToOrder} RemoveFromOrder={this.RemoveFromOrder} fishes={this.state.fishes} orders={this.state.orders}/>
            <Inventory AddFish={this.AddFish} UpdateForm={this.UpdateForm} LoadSampleFish={this.LoadSampleFish} fishes={this.state.fishes} DeleteFish={this.DeleteFish} storeid={this.props.match.params.storeid}/>
            </div>
    );
}
}
export default App;