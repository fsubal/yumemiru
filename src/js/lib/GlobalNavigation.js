import $ from 'jquery';
import position from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

export default class GlobalNavigation {
    constructor() {
        this.SCROLL_DURATION = 200;
        this.$root = $('html, body');
        this.$menuContainer = $('#menu-container');
        this.$menuItems = $('#menu-container').find('.menu-item');
        this.init();
    }

    init() {
        $menuItems.find('.story-section').on('click', () => {
            const position = scrollPosition.calc();
            this.scrollTo(position.heroImage__Bottom);
        });

        $menuItems.find('.browse-section').on('click', () => {
            const position = scrollPosition.calc();
            this.scrollTo(position.browseSection__Top);
        });

        $menuItems.find('.purchase-section').on('click', () => {
            const position = scrollPosition.calc();
            this.scrollTo(position.purchaseSection__Top);
        });
    }

    scrollTo(position) {
        // TODO: bodyのdata属性に状態持たせるのやめる…
        document.body.dataset.isAnimating = true;
        this.$root.animate({
            scrollTop: position
        }, this.SCROLL_DURATION, () => {
            delete document.body.dataset.isAnimating;
        });
    }

    hide() {
        this.$menuContainer.addClass('--hidden');
    }

    renderChosen(i) {
        if (this.$menuContainer.hasClass('--hidden')) {
            this.$menuContainer.removeClass('--hidden');
        }
        this.$menuItems.removeClass('--chosen');
        this.$menuItems.eq(i).addClass('--chosen');
    }

    // TODO: EventEmitter入れる
    trigger(actionType) {
        switch (actionType) {
            case action.PASS_PURCHASE_SECTION:
                this.hide();
                break;
            case action.ENTER_PURCHASE_SECTION: 
                this.renderChosen(2);
                break;
            case action.ENTER_BROWSE_SECTION:
                this.renderChosen(1);
                break;
            case action.ENTER_STORY_SECTION: 
                this.renderChosen(0);
                break;
            case action.ENTER_HERO_IMAGE: 
                this.hide();
                break;
        }
    }
}