import { observable, action, computed } from 'mobx';
import { getAuthData } from '../services/Utilities';

class UserSession {
    @observable isloggedIn = false;
    @observable firstName = undefined;
    @observable lastName = undefined;
    @observable dateOfBirth = undefined;
    @observable email = undefined;
    @observable role = undefined;

    @action login = (role, name) => {
        this.role = role;
        this.firstName = 'Adam';
        this.lastName = 'Jensen';
        this.email = name;
        this.isloggedIn = true;
        localStorage.setItem("AuthData", JSON.stringify({ name: name, role: role }));
    }

    @action logout = () => {
        this.isloggedIn = false;
        this.firstName = undefined;
        this.lastName = undefined;
        this.dateOfBirth = undefined;
        this.email = undefined;
        this.role = undefined;
        localStorage.removeItem("AuthData");
        localStorage.removeItem("sessionId");
    }

    @action recoverFromStorage = () => {
        const data = getAuthData();
        if (data) {
            this.isloggedIn = true;
            this.role = data.role;
            this.email = data.name;
        }
    }
}

export default new UserSession();
