import $ from 'jquery';
import throttle from 'lodash';

import GlobalNavigation from '../lib/GlobalNavigation';
import ScrollPosition from '../lib/ScrollPosition';
import ScrollActionType from '../lib/ScrollActionType';

export default class ScrollManager {
    constructor() {
        this.THROTTLE_INTERVAL = 24;
        this.globalNavigation = new GlobalNavigation();

        this.$body = $(document.body);
        this.POTISION = ScrollPosition;
        this.ACTION_TYPE = ScrollActionType;
    }

    run() {
        this.$body.on('scroll', throttle(e => {
            this.updateByScroll(
                this.$body.scrollTop()
            );
        }, this.THROTTLE_INTERVAL));
    }

    updateByScroll(scrollTop) {
        const { HERO_IMAGE__BOTTOM, BROWSE_SECTION__TOP, PURCHASE_SECTION__TOP, PURCHASE_SECTION__BOTTOM } = this.POSITION;
        const { ENTER_HERO_IMAGE, ENTER_STORY_SECTION, ENTER_BROWSE_SECTION, ENTER_PURCHASE_SECTION, PASS_PURCHASE_SECTION } = this.ACTION_TYPE;

        if (scrollTop > PURCHASE_SECTION__BOTTOM) {
            this.globalNavigation.update(PASS_PURCHASE_SECTION);
        } else if (scrollTop > PURCHASE_SECTION__TOP) {
            this.globalNavigation.update(ENTER_PURCHASE_SECTION);
        } else if (scrollTop > BROWSE_SECTION__TOP) {
            this.globalNavigation.update(ENTER_BROWSE_SECTION);
        } else if (scrollTop > HERO_IMAGE__BOTTOM) {
            this.globalNavigation.update(ENTER_STORY_SECTION);
        } else {
            this.globalNavigation.update(ENTER_HERO_IMAGE);
        }
    }
}