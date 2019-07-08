import React from 'react';
import propTypes from 'prop-types';
import {getFunName} from "../helpers"
class StorePicker extends React.Component{
    static propTypes = {
        history: propTypes.object
    }
    myInput = React.createRef();
    goToStore = (event) => {
        event.preventDefault();
        const storeName = (this.myInput.current.value);
        this.props.history.push(`/store/${storeName}`)
    };
    render(){
        return(
        <React.Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
        <h2> Enter The Store</h2>
        <input type="text" ref={this.myInput} required placeholder="name of the store"  defaultValue={getFunName()}/>
        <button type="submit">visit store -></button>
        </form>
        </React.Fragment>
    );     
    }
    
} 

export default StorePicker;