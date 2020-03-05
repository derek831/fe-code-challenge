import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextButton from '../../common/TextButton';
import Button from '../../common/Button';

export default class SpotModal extends PureComponent {
    state = {
        modalClosing: false
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        setSpot: PropTypes.func.isRequired
    };

    _onCloseSpotModal = evt => {
        this.setState({
            modalClosing: true
        }, () => {
            this.props.setSpot(null);
        });
    }

    render() {
        const {
            data
        } = this.props;

        return (
            <div className={"SpotModal " + (this.state.modalClosing && 'SpotModalClosing')}>
                <TextButton className="SpotModalClose" onClick={this._onCloseSpotModal}>x</TextButton>
                <h1>Spot Details</h1>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <div className="SpotModalButtonContainer">
                    <Link to={"/Checkout"}>
                        <Button
                            className="SpotModalButton">
                                ${(data.price/100).toFixed(2)} | Book It!
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}
