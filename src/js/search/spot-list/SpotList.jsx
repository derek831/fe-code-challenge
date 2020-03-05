import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../common/TextButton';
import SpotItem from '../../spot/SpotItem';
import axios from 'axios';

export default class SpotList extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired
    };

    _onDetailsClick = spot => {
        this._loadSpotDetail(spot.id);
    }

    async _loadSpotDetail(id) {
        try {
            const {
                data
            } = await axios.get('/spots/' + id);

            this.props.setSpot(data)
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    render() {
        const {
            selectedSpot,
            spots
        } = this.props;

        return (
            <div className="SpotList">
                <div className="SpotList-feature">
                    <div className="SpotList-breadcrumbs">
                        <TextButton>Chicago</TextButton> &gt; Millennium Park
                    </div>
                    <h1>Millennium Park</h1>
                    <p>{spots.length} Spots Available</p>
                </div>
                <div className="SpotList-spots">
                    {spots.map(spot => {
                        return (
                            <SpotItem
                                key={spot.id}
                                data={spot}
                                isSelected={selectedSpot && selectedSpot.id === spot.id}
                                onDetailsClick={this._onDetailsClick}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
