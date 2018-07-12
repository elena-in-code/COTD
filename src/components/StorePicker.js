import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{
    constructor (){
        super();

        this.goToStore = this.goToStore.bind(this);
    }
    goToStore(event){
        event.preventDefault();
        console.log('you changed the URL');
        //first grab text from input
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        //transition fron / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`)
    }

    render(){
        return(
            <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please enter A store</h2>
            <input type="text" required placeholder="store name..." defaultValue={getFunName()} ref={(input) => { this.storeInput = input}}/>
            <button className="submit">Visit store ➡</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;