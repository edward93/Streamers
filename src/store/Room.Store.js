import { observable, action, computed } from 'mobx';
import { Post } from '../services/Http';
import Config from 'Config';

class RoomStore {
    @observable modelName = undefined;
    @observable videoEl = undefined;
    @observable isStreamPublished = false;

    @observable ov = undefined;
    @observable session = undefined;
    @observable subscribers = [];
    @observable token = undefined;
    @observable publisher = undefined;
    @observable mainStreamManager = undefined;
    @observable sessionId = undefined;
    @observable isConnected = false;

    @action reset = () => {
        this.modelName = undefined;
        this.videoEl = undefined;
        this.isStreamPublished = false;
        this.ov = undefined;
        this.session = undefined;
        this.subscribers = [];
        this.token = undefined;
        this.publisher = undefined;
        this.mainStreamManager = undefined;
        this.isConnected = false;
    }

    getSubscriberUserName = (sub) => {
        return JSON.parse(sub.stream.connection.data).name;
    }

    @action deleteSubscriber = (streamManager) => {
        let index = this.subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            const subs = [...this.subscribers];
            subs.splice(index, 1);
            this.subscribers = subs;
        }
    }

    @action createSession = (session) => {
        const str = `OPENVIDUAPP:${Config.Secret}`;
        const headers = {
            Authorization: `Basic ${btoa(str)}`,
            'Content-Type': 'application/json'
        }

        return Post('/api/sessions', headers, {customSessionId: session}).then(response => {
            if (response === true) {
                this.setSessionId(session);
                return true;
            } else if (response) {
                this.setSessionId(response.id);
                return response;
            }
            else return false;
        });
    }

    @action setSessionId = (sessionId) => {
        localStorage.setItem("sessionId", sessionId);
        this.sessionId = sessionId;
    }

    @action setToken = (token) => {
        // localStorage.setItem("token", token);
        this.token = token;
    }

    @action getToken = (role) => {
        const str = `OPENVIDUAPP:${Config.Secret}`;
        const headers = {
            Authorization: `Basic ${btoa(str)}`,
            'Content-Type': 'application/json'
        }

        return Post('/api/tokens', headers, { 'session': this.sessionId, role }).then(response => {
            if (response) {
                this.setToken(response.id);
                return true;
            }
            return false;
        });
    }

    @action recoverFromStorage = () => {
        if (localStorage.getItem("sessionId")) {
            this.sessionId = localStorage.getItem("sessionId");
        }
    }

    @action removeSessionId = () => {
        this.sessionId = undefined;
        localStorage.removeItem("sessionId");
    }
}

export default new RoomStore();
