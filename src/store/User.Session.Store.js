import { observable, action } from 'mobx';

class UserSession {
    @observable firstName = undefined;
    @observable lastName = undefined;
    @observable dateOfBirth = undefined;
    @observable email = undefined;
    @observable role = undefined;
}

export default new UserSession();
