import $ from 'jquery';
import Fastclick from 'fastclick';

import ComicViewerModal from '../lib/ComicViewerModal';
import ScrollManager from '../lib/ScrollManager';
import GoogleAnalyticsClient from '../lib/GoogleAnalyticsClient';

export default class IndexController {
    constructor() {
        Fastclick.attach(document.body);

        this.gaClient = new GoogleAnalyticsClient();
        this.scrollManager = new ScrollManager();
        this.comicViewerModal = new ComicViewerModal();
        this.$modalContainer = $('#modal-container');

        this.addHoverEventsToLinks();
        this.addEventSender();
    }

    addHoverEventsToLinks() {
        $('a').on('touchstart mouseenter', function() {
            $(this).addClass('hover');
        }).on('touchend mouseleave', function() {
            $(this).removeClass('hover');
        });

        $('.--hoverable').on('touchstart mouseenter', function() {
            $(this).addClass('hover');
        }).on('touchend mouseleave', function() {
            $(this).removeClass('hover');
        });
    }

    addEventSender() {
        // $('.').on('click', () => this.gaClient.openMangaViewer());
        // $('.').on('click', () => this.gaClient.closeMangaViewer());

        $('[href*="webcatalog"]').on('click', () => this.gaClient.goToWebCatalog());

        $('[href*="pixiv"]').on('click', (e) => {
            this.gaClient.goToPixivSample(e.currentTarget.dataset.bookName)
        });
        $('[href^=booth]').on('click', () => this.gaClient.goToBooth());
    }
}