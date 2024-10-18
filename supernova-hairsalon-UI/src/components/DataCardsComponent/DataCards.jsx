import React, { Component } from 'react';
import './DataCards.css'; // Zorg ervoor dat je styling toevoegt voor de kaarten

class DataCards extends Component {
    render() {
        const { data } = this.props;

        return (
            <div className="data-cards-container">
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default DataCards;
