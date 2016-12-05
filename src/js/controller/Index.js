import $ from 'jquery';
import { render } from 'react-dom';

import ComicViewerModal from '../Component/ComicViewerModal';
import ScrollManager from '../lib/ScrollManager';
import GoogleAnalyticsClient from '../lib/GoogleAnalyticsClient';

export default class IndexController {
    constructor() {
        this.gaClient = new GoogleAnalyticsClient();
        this.scrollManager = new ScrollManager();
        this.$modalContainer = $('#modal-container');
    }

    run () {
        // this.addEventSender();
        this.scrollManager.run();
        render(ComicViewerModal, this.$modalContainer[0]);
    }

    addEventSender() {
        $('.ga-send-event').on('click', () => {
            const { action, category, label } = e.currentTarget.dataset;
            this.gaClient.send({ action, category, label }); 
        });
    }
}