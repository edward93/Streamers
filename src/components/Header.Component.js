import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import NavItem from './NavigationComponents/NavItem.Component';
import Paths from '../services/Paths';

@observer
class Header extends React.Component {
    static propTypes = {

    }

    render() {
        return (
            <div className="S-header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" onClick={this.onBrandClick} href={Paths.home}>S</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <NavItem path={Paths.home} name="Home" />
                            <NavItem path={Paths.topModels} name="Top Models" />
                            <NavItem path={Paths.newModels} name="New Models" />
                            <NavItem path={Paths.categories} name="Categories" />
                            <NavItem path={Paths.about} name="About us" />
                        </ul>

                        {/* <ul className="navbar-nav pull-sm-right">
                            <NavItem path={Paths.signin} name="Sign In" />
                        </ul> */}
                    </div>
                </nav>
            </div >
        )
    }

    onBrandClick = (e) => {
        e.preventDefault();

        this.props.history.push(Paths.home);
    }
}

export default withRouter(Header);
