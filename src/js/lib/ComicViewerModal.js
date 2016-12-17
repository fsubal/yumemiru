import $ from 'jquery';
import intersection from 'lodash/intersection';

import 'slick-carousel';
import 'slick/slick.css'; 
import 'slick/slick-theme.css'; 
import browserHistory from 'history/createBrowserHistory';

export default class ComicViewerModal {
    constructor() {
        this.$modalContainer = $('.modal-container');
        this.$pages = this.$modalContainer.find('.pages');
        this.$page = this.$pages.find('.page');

        this.$closeButton = this.$modalContainer.find('.modal-container__close');
        this.$openButton = $('.js-open-carousel');

        this.history = browserHistory();
        this.preloadSampleImages();

        this.addEventToButton();
        this.initCarousel();
    }

    addEventToButton() {
        this.$closeButton.on('click', function() {
            this.close();
        }.bind(this));

        this.$openButton.on('click', function() {
            this.$modalContainer.removeClass('--hidden');
            // $(document.body).removeClass('--locked');
        }.bind(this));

        var closableClass = ['pages', 'modal-container__header'];
        this.$modalContainer.on('click', function(e) {
            const classList = [].slice.call(e.target.classList);
            if (intersection(classList, closableClass).length === 0) {
                return;
            }
            this.close();
        }.bind(this));
    }

    close() {
        this.$modalContainer.addClass('--hidden');
        // $(document.body).addClass('--locked');
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
            image.src = `../public/img/sample/0${i}.png`;
        }
    }
}
