import React from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Paths from '../../services/Paths';

@inject('session')
@observer
class SigninViewer extends React.Component {
    username = undefined;
    render() {
        return (
            <div className="S-signin-container text-center container-fluid">
                <div className="S-signin-box-wrapper">
                    <div className="S-page-title">
                        <h2>Select a username</h2>
                    </div>
                    <div className="mx-auto col-sm-4">
                        <Input placeholder="Select name" onChange={this.usernameChange} />
                    </div>
                    <hr />
                    <div className="S-action">
                        <Button type="primary" onClick={this.login}>Sign In</Button>
                    </div>
                </div>

            </div>
        )
    }

    usernameChange = (event) => {
        this.username = event.target.value;
    }

    login = () => {
        this.props.session.login('viewer', this.username);
        this.props.history.go(Paths.home);
    }
}

export default withRouter(SigninViewer);
