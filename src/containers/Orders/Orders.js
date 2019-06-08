import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(
            res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push(
                        {
                            ...res.data[key],
                            id: key
                        }
                    )
                }
                this.setState({ loading: false, orders: fetchedOrders });
            }
        ).catch(error => {
            this.setState({ loading: false });
        });
    }

    render() {
        let spinner = this.state.loading ? <Spinner /> : null
        return (
            <div>
                {spinner}
                {this.state.orders.map(val => <Order key={val.id} ingredients={val.ingredients} price={+val.price} />)}
            </div>
        )
    }
}

export default Orders;