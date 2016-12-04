export default class GoogleAnalyticsClient {
    constructor() {
        this.gaClient = window.ga;
    }

    send(action, category, label) {
        this.gaClient.send(action, category, label);
    }
}