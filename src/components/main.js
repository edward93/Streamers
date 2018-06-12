import React from "react";
import { observer } from 'mobx-react';
import logo from '../logo.svg';

@observer
class main extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </div>
                <p className="App-intro">
                    Components: <code>src/components/</code> - all components
                </p>
                <p className="App-intro">
                    images: <code>src/images/</code> - all images
                </p>
                <p className="App-intro">
                    stores: <code>src/store/</code> - all stores
                </p>
                <p className="App-intro">
                    services: <code>src/servcies/</code> - majority of logical code
                </p>
                <p className="App-intro">
                    styles: <code>src/styles/</code> - css/sass etc.
                </p>
            </div>
        );
    }
};

export default main;
