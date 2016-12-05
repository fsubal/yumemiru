import $ from 'jquery';
import { throttle } from 'lodash';

import GlobalNavigation from '../lib/GlobalNavigation';
import scrollPosition from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

export default class ScrollManager {
    constructor() {
        this.THROTTLE_INTERVAL = 24;
        this.$root = $('html, body');
        this.globalNavigation = new GlobalNavigation();

        this.init();
    }

    init() {
        const { isAnimating } = document.body.dataset;
        this.$root.on('scroll', throttle(e => {
            if (!isAnimating) {
                this.updateByScroll(this.$root.scrollTop());
            }
        }, this.THROTTLE_INTERVAL));
    }

    updateByScroll(scrollTop) {
        const position = scrollPosition.calc();
        if (scrollTop > position.purchaseSection__Bottom) {
            // 「購入する」の下端よりも下にいる時
            this.globalNavigation.emit(action.PASS_PURCHASE_SECTION);
        } else if (scrollTop > position.purchaseSection__Top) {
            // 「購入する」の中にいる時
            this.globalNavigation.emit(action.ENTER_PURCHASE_SECTION);
        } else if (scrollTop > position.browseSection__Top) {
            // 「試し読み」の中にいる時
            this.globalNavigation.emit(action.ENTER_BROWSE_SECTION);
        } else if (scrollTop > position.heroImage__Bottom) {
            // 「あらすじ」の中にいる時
            this.globalNavigation.emit(action.ENTER_STORY_SECTION);
        } else {
            // ヒーローイメージが出ている時
            this.globalNavigation.emit(action.ENTER_HERO_IMAGE);
        }
    }
}