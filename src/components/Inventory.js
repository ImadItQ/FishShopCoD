import React from 'react';
import AddFishForm from "./AddFishForm";
import EditForm from "./EditForm";
import firebase from 'firebase';
import propTypes from 'prop-types';
import Login from './Login';
import base,{ firebaseApp } from '../Base';

class Inventory extends React.Component{
    static propTypes = {
        fishes: propTypes.object,
        UpdateForm: propTypes.func,
        DeleteFish: propTypes.func,
        LoadSampleFish: propTypes.func
    };
    state= {
        uid:null,
        owner: null
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({user});
            }
        });
    }
    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeid, {context: this});
        console.log(store);
        if(!store.owner){
            await base.post(`${this.props.storeid}/owner`, {
                data: authData.user.uid
            });
        }
        this.setState({
            uid:authData.user.uid,
            owner:store.owner || authData.user.uid
        });
    }; 
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };
    logout = async () => {
        console.log('logging out...');
        await firebase.auth().signOut();
        this.setState({uid:null});
    };
    render(){
        const logout = <button onClick={this.logout}>LogOut</button>
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}/>
        }
        if(this.state.uid !== this.state.owner){
            return (<div><p>sorry you are not the owner</p>{logout}</div>);
        }
        return(
            <div>
                <h2> Inventory </h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditForm key={key} index={key} fish={this.props.fishes[key]} UpdateForm={this.props.UpdateForm} DeleteFish={this.props.DeleteFish}/>)}
                <AddFishForm AddFish={this.props.AddFish}  />
                <button onClick={this.props.LoadSampleFish} >Load Sample fishes</button>
            </div>
        );
    }
}
export default Inventory;