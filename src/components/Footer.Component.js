import React from 'react';
import Paths from "../services/Paths";

class Footer extends React.Component {
    render() {
        return (
            <div className="S-footer-container">
                <div className="S-footer-content-wrapper">
                    <p>Brought to you by VS Media, Inc., Westlake Village, CA, United States</p>

                    <p>
                        <a href={Paths.home}>Home</a>
                    </p>

                    <p>All persons depicted herein were at least 18 years of age at the time of photography:</p>
                    <p>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</p>

                    <p>© 1996 - {(new Date()).getFullYear()} VS3.COM, VS Media, Inc. All Rights Reserved. Privacy Policy, Copyright Policy & Terms & Conditions.</p>

                </div>
            </div>
        );
    }
}

export default Footer;