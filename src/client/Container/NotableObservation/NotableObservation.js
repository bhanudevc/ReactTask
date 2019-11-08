import React,{Component} from 'react';
import { Table } from 'reactstrap';
import  axios from 'axios';
import { Pagination } from 'antd';

import  './NotableObservation.css';
let currentPage;
class NotableObservation extends Component{
    constructor() {
        super();
        this.state = {
            latitude: '',
            longitude: '',
            nearbyObservations :[],
            startPage: 1,
            perPage: 5,
        };
        this.getMyLocation = this.getMyLocation.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onClickHandler=(e)=>{
        e.preventDefault(e);
        axios.get(`http://localhost:5000/getNotablePlaces/${this.state.latitude}/${this.state.longitude}`)
            .then(res => {
                const nearbyObservations = res.data;
                this.setState({ nearbyObservations });
            })

    };
    handleClick(event) {
        this.setState({
            startPage: event
        });
    }
    onHandleChange=(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    };

    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }

    };

    render() {
        const { latitude, longitude,nearbyObservations,startPage,perPage } = this.state;

        const indexOfLastPage = startPage * perPage;
        const indexOfFirstPage = indexOfLastPage - perPage;
        const pageNumbers = [];

        if(nearbyObservations.length===0) {

            currentPage = nearbyObservations.slice(indexOfFirstPage, indexOfLastPage);
            for (let i = 1; i <= Math.ceil(nearbyObservations.length / perPage); i++) {
                pageNumbers.push(i);

            }
        }else{
            currentPage = nearbyObservations.slice(indexOfFirstPage, indexOfLastPage);
            for (let i = 1; i <= Math.ceil(nearbyObservations.length / perPage); i++) {
                pageNumbers.push(i);
            }
        }
        let data= (this.state.nearbyObservations.length===0);
        return (
           <div className="login-page">
            <div className="form_input">
                <div><input type="number" name="latitude" value={latitude}  onChange={this.onHandleChange.bind(this)} step="any" /></div>
                <div><input type="text" name="longitude" value={longitude}  onChange={this.onHandleChange.bind(this)} step="any"/></div>
                <div><input type="button" value="Submit" onClick={this.onClickHandler.bind(this)}/></div>
                <div><input type="button" value="Fetch Current Location" onClick={this. getMyLocation.bind(this)}/></div>
            </div>

        {!data &&
            (<div className="data">
            <table className="rwd-table" border='1px'>
            <tr>
            <th>Location Name</th>
        <th>Latitude</th>
        <th>Longitude</th>
        </tr>
        { currentPage.map((items, i)  => {
            return(
                <tr>
                <td>{items.locName}</td>
                <td>{items.lat}</td>
                <td>{items.lng}</td>
                </tr>)
        })}
    </table>
        <div id="page-numbers" className="pagination" style={{cursor: 'pointer'}}>
    <table>
        <Pagination current={this.state.startPage} onChange={this.handleClick.bind(this)} total={2500} />
        </table>
        </div>
            </div>)}
        </div>
    )
    }
}

export default NotableObservation;