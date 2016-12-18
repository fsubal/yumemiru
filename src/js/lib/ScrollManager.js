import $ from 'jquery';
import throttle from 'lodash/throttle';

import GlobalNavigation from '../lib/GlobalNavigation';
import scrollPosition from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

import GoogleAnalyticsClient from '../lib/GoogleAnalyticsClient';

export default class ScrollManager {
    constructor() {
        this.THROTTLE_INTERVAL = 12;
        this.$document = $(document);
        this.globalNavigation = new GlobalNavigation();
        this.gaClient = new GoogleAnalyticsClient();

        this.init();
    }

    init() {
        this.updateByScroll(this.$document.scrollTop());

        const { isAnimating } = document.body.dataset;
        this.$document.on('scroll', throttle(e => {
            if (!isAnimating) {
                this.updateByScroll(this.$document.scrollTop());
            }
        }, this.THROTTLE_INTERVAL));
    }

    updateByScroll(scrollTop) {
        const threshold = scrollPosition.calc();

        switch(true) {
            case scrollTop > threshold.purchaseSection__Bottom:
                this.globalNavigation.emit(action.PASS_PURCHASE_SECTION);
                break;
            case scrollTop > threshold.purchaseSection__Top:
                this.globalNavigation.emit(action.ENTER_PURCHASE_SECTION);
                this.gaClient.scrolledToPurchase();
                break;
            case scrollTop > threshold.browseSection__Top:
                this.globalNavigation.emit(action.ENTER_BROWSE_SECTION);
                this.gaClient.scrolledToBrowse();
                break;
            case scrollTop > threshold.storySection__Top:
                this.globalNavigation.emit(action.ENTER_STORY_SECTION);
                this.gaClient.scrolledToStory();
            case scrollTop > threshold.globalNavigation__Top:
                this.globalNavigation.emit(action.ENTER_GLOBAL_NAVIGATION);
                break;
            default:
                this.globalNavigation.emit(action.ENTER_HERO_IMAGE);
                break;
        }
    }
}