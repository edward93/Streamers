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
    @computed get sessionId() {
        return `${this.modelName}10`;
    }

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
    }

    @action deleteSubscriber = (streamManager) => {
        let index = this.subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    @action createSession = () => {
        const str = `OPENVIDUAPP:${Config.Secret}`;
        const headers = {
            Authorization: `Basic ${btoa(str)}`,
            'Content-Type': 'application/json'
        }

        return Post('/api/sessions', headers, {'customSessionId': this.sessionId}).then(response => {
            if (response) return response;
            else return false;
        });
    }

    @action getToken = () => {
        const str = `OPENVIDUAPP:${Config.Secret}`;
        const headers = {
            Authorization: `Basic ${btoa(str)}`,
            'Content-Type': 'application/json'
        }

        return Post('/api/tokens', headers, {'session': this.sessionId}).then(response => {
            if (response) {
                this.token = response.id;
                return true;
            } 
            return false;
        });
    }
}

export default new RoomStore();
