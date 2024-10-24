import React from 'react';
import './DataCard.css'; // Zorg ervoor dat je een CSS-bestand hebt voor de stijl

class DataCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await this.props.service();
            // Als response direct de data bevat
            if (response.data) {
                this.setState({ data: response.data, loading: false });
            } else {
                this.setState({ data: response, loading: false });
            }
        } catch (error) {
            this.setState({ error: 'Error fetching data', loading: false });
        }
    };


    render() {
        const { data, loading, error } = this.state;
        const { type } = this.props;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <p>Front Side</p>
                    </div>
                    <div className="card-back">
                        <div className={`data-card data-card-${type}`}>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <div key={index} className="data-card-item">
                                        {this.renderFields(item)}
                                    </div>
                                ))
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataCard;
