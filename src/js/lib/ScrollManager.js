import $ from 'jquery';
import { throttle } from 'lodash';

import GlobalNavigation from '../lib/GlobalNavigation';
import position from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

export default class ScrollManager {
    constructor() {
        this.THROTTLE_INTERVAL = 24;

        this.$root = $('html, body');
        this.globalNavigation = new GlobalNavigation();
    }

    run() {
        const { isAnimating } = document.body.dataset;
        this.$root.on('scroll', throttle(e => {
            if (!isAnimating) {
                this.updateByScroll(this.$root.scrollTop());
            }
        }, this.THROTTLE_INTERVAL));
    }

    updateByScroll(scrollTop) {
        if (scrollTop > position.PURCHASE_SECTION__BOTTOM) {
            this.globalNavigation.update(
                action.PASS_PURCHASE_SECTION
            );
        } else if (scrollTop > position.PURCHASE_SECTION__TOP) {
            this.globalNavigation.update(
                action.ENTER_PURCHASE_SECTION
            );
        } else if (scrollTop > position.BROWSE_SECTION__TOP) {
            this.globalNavigation.update(
                action.ENTER_BROWSE_SECTION
            );
        } else if (scrollTop > position.HERO_IMAGE__BOTTOM) {
            this.globalNavigation.update(
                action.ENTER_STORY_SECTION
            );
        } else {
            this.globalNavigation.update(
                action.ENTER_HERO_IMAGE
            );
        }
    }
}