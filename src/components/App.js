import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            fishes: {},
            order: {}
        }
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }prop

    addFish(fish) {
        //update state
            //first make a copy of current the state
            //...  spread to take every item of the object spread into this object: this.state.fishes
            const fishes = {...this.state.fishes};  
        //add new fishes  
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //set state
        this.setState({
            fishes: fishes
        })
    }

    updateFish(key, updatedFish) {
        //copy of all the fishes
        const fishes = {...this.state.fishes};
        //overwrite the one updated fish
        fishes[key] = updatedFish;
        //set state
        this.setState({
            fishes: fishes
        })
    }

    removeFish(key) {
        //copy of all the fishes
        const fishes = {...this.state.fishes};
        //delet fish
        fishes[key] = null;
        //set state
        this.setState({
            fishes: fishes
        })
    }

    componentWillMount() {
        //this runs before the app renders
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
          context: this,
          state: 'fishes'
      });
      //Check if there is any order in local storage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

      if(localStorageRef) {
          //update our App components order state
          this.setState({
              order:JSON.parse(localStorageRef)
          })
      }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, 
        JSON.stringify(nextState.order));
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key) {
        //first make a copy of current the state
        const order = {...this.state.order}; 
        //update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1; 
        //update state
        this.setState({
            order: order
        });
    }

    removeFromOrder(key){
        //copy of the order
        const order = {...this.state.order}; 
        //delete order item
        delete order[key];
        //set state
        this.setState({
            order: order
        })
    }

    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            //Make it into an array
                            Object
                            .keys(this.state.fishes)
                            //loop over it
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}  
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder} 
                    params={this.props.params} />
                <Inventory 
                    addFish={this.addFish} 
                    removeFish={this.removeFish} 
                    loadSamples={this.loadSamples} 
                    fishes={this.state.fishes}
                    updateFish={this.updateFish} />
            </div>
        )
    }
}

App.prototypes = {
    params: React.PropTypes.object.isRequired
}

export default App;