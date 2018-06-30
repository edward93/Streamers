import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class NavItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.path !== nextProps.path) {
            if (this.props.location.pathname === this.props.path) {
                this.setState({ active: true });
            } else {
                this.setState({ active: false });
            }
        }
    }

    go = (event) => {
        event.preventDefault();

        this.props.history.push(this.props.path);
    }

    componentWillMount() {
        this.handler = this.props.history.listen((location, action) => {
            if (location.pathname === this.props.path) {
                this.setState({ active: true });
            } else {
                this.setState({ active: false });
            }
        });
        if (this.props.location.pathname === this.props.path) {
            this.setState({ active: true });
        } else {
            this.setState({ active: false });
        }
    }

    componentWillUnmount() {
        this.handler();
    }

    className = () => {
        if (this.state.active) {
            return (
                `nav-item active ${this.props.className || ''}`
            );
        } 
        return (
            `nav-item ${this.props.className || ''}`
        );
    }

    render() {
        return (
            <li className={this.className()}>
                <a className="nav-link"
                    href={this.props.path}
                    onClick={this.props.onClick ? this.props.onClick : this.go}>
                    {this.props.name}<span className="sr-only">(current)</span>
                </a>
            </li>
        )
    }
}

NavItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default withRouter(NavItem);
