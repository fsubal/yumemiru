import $ from 'jquery';
import ComicViewerModal from '../lib/ComicViewerModal';
import ScrollManager from '../lib/ScrollManager';
import GoogleAnalyticsClient from '../lib/GoogleAnalyticsClient';

export default class IndexController {
    constructor() {
        this.gaClient = new GoogleAnalyticsClient();
        this.scrollManager = new ScrollManager();
        this.comicViewerModal = new ComicViewerModal();
        this.$modalContainer = $('#modal-container');

        // this.addEventSender();
    }

    addEventSender() {
        $('.ga-send-event').on('click', (e) => {
            const { action, category, label } = e.currentTarget.dataset;
            this.gaClient.send({ action, category, label }); 
        });
    }
}