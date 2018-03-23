
import Main from '../../layouts/main';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class HelloWorld extends Component {
    constructor(props) {
        super(props);

        this.state = {'value': ''};
    }

    onSubmit(event) {
        event.preventDefault();
 
        const {putMessage} = this.props;
        const {value} = this.state;

        if (typeof putMessage === 'function') {
            putMessage({'message': value}).catch(error => {
                console.error(error);
            });
        }
    }

    componentDidMount() {
        const {getMessage} = this.props;

        if (typeof getMessage === 'function') {
            getMessage().catch(error => {
                console.error(error);
            });
        }
    }

    handleChange(event) {
        this.setState({value: event.currentTarget.value});
    }

    render() {
        const {hellos} = this.props;
        const hellosPartial = map(hellos, (hello) => {
            return <p key={hello.id}>{hello.message}</p>;
        });

        return (
            <Main>
                <p>
                    <a href="http://localhost:8000/explorer">Rest API Explorer</a>
                </p>
                <hr />
                {hellosPartial}
                <hr />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <p>
                        <label htmlFor="exampleInputMessage1">Message</label>
                        <input aria-describedby="messageHelp"
                            className="form-control"
                            id="exampleInputMessage1"
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter message"
                            type="message" />
                    </p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Main>
        );
    }
}

HelloWorld.propTypes = {
    'getMessage': PropTypes.func,
    'hellos': PropTypes.array,
    'putMessage': PropTypes.func
};

export default HelloWorld;
