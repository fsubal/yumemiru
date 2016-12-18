import $ from 'jquery';

import 'slick-carousel';
import 'slick/slick.css'; 
import 'slick/slick-theme.css'; 
import browserHistory from 'history/createBrowserHistory';

import GoogleAnalyticsClient from '../lib/GoogleAnalyticsClient';

export default class ComicViewerModal {
    constructor() {
        this.$modalContainer = $('.modal-container');
        this.$pages = this.$modalContainer.find('.pages');
        this.$page = this.$pages.find('.page');

        this.$closeButton = this.$modalContainer.find('.modal-container__close');
        this.$openButton = $('.js-open-carousel');

        this.history = browserHistory();
        this.gaClient = new GoogleAnalyticsClient();

        this.preloadSampleImages();

        this.addEventToButton();
        this.initCarousel();
    }

    addEventToButton() {
        this.$openButton.on('click', function() {
            this.open();
        }.bind(this));

        this.$closeButton.on('click', function() {
            this.close();
        }.bind(this));
    }

    open() {
        this.$modalContainer.removeClass('hidden');
        this.scrollLock();
        this.gaClient.openMangaViewer();
    }

    close() {
        this.$modalContainer.addClass('hidden');
        this.scrollUnlock();
        this.gaClient.closeMangaViewer();
        this.$pages.slickGoTo(0, /* withoutAnimation = */ true);
    }

    scrollLock() {
        this.scrollTop = $(document).scrollTop();

        $(document.body).css({
            position: 'fixed',
            width   : '100%',
            top     : -1 * this.scrollTop
        });
    }

    scrollUnlock() {
        $(document.body).css({
            position: '',
            width   : '',
            top     : ''
        });

        $(document).scrollTop(this.scrollTop);
    }

    initCarousel() {
        this.$pages.slick({
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            infinite: false,
            rtl: true,
        });
    }

    preloadSampleImages() {
        for (let i of [0, 1, 2, 3]) {
            const image = new Image();
            image.src = `./public/img/sample/0${i}.png`;
        }
    }
}
