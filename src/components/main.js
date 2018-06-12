import React from "react";
import { observer } from 'mobx-react';
import logo from '../logo.svg';

@observer
class main extends React.Component {
    render() {
        return (
            <div className="text-center">
                Hello
            </div>
        );
    }
};

export default main;
