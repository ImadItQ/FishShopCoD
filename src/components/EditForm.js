import React from 'react';
import propTypes from 'prop-types';
class EditForm extends React.Component{
    static propTypes = {
        fish : propTypes.shape({
            image:propTypes.string, 
            name:propTypes.string, 
            desc:propTypes.string, 
            status:propTypes.string,  
            price:propTypes.number 
        }),
        index : propTypes.string,
        UpdateForm : propTypes.func
    };
    handleChange = event => {
    const UpdatedForm ={ 
        ...this.props.fish,
        [event.currentTarget.name]:event.currentTarget.value
    };
    this.props.UpdateForm(this.props.index,UpdatedForm);
};
    render(){
        return(
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
              <input  type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/>
              <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold-Out!</option>
              </select>
              <textarea type="text" name="desc"onChange={this.handleChange}  value={this.props.fish.desc}/>
              <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
              <button onClick={() => this.props.DeleteFish(this.props.index)}>Delete Fish</button>
            </div>
        );
    }
}
export default EditForm;