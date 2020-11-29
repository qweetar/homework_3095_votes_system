import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';
import saveAs from 'file-saver';

class DownloadButton extends React.PureComponent {
    static propTypes = {
        btnName: PropTypes.string.isRequired,
    };

    // state = {
    //     acceptFormat: 'application/' + this.props.btnName,
    // };


    handleSubmit = (event) => {
        event.preventDefault();
        let fileFormat;
        if( this.props.btnName == 'html') {
            fileFormat = 'text/' + this.props.btnName;
        } else {
            fileFormat = 'application/' + this.props.btnName;
        }

        let url = 'http://46.101.125.193:3195/download';
        // let url = 'http://localhost:3195/download';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': fileFormat
            },
        })
        .then(function(response) {
            return response.blob();
        })
        .then(function(blob) {
            saveAs(blob);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return(
            <li style={{display: 'inline', margin: '5px'}}>
                <form onSubmit={this.handleSubmit}>
                    <button  type='submit'>{this.props.btnName}</button>
                </form>
            </li>
        )
    }
}

export default DownloadButton;