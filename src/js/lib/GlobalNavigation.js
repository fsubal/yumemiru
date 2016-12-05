import $ from 'jquery';
import position from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

export default class GlobalNavigation {
    constructor() {
        this.SCROLL_DURATION = 200;
        this.$root = $('html, body');
        this.$menuContainer = $('#global-navigation');
        this.$menuItems = $('#global-navigation').find('.menu-item');
        this.init();
    }

    init() {
        this.$menuItems.find('.story-section').on('click', () => {
            const position = scrollPosition.calc();
            this.triggerScroll(position.heroImage__Bottom);

            this.trigger(action.ENTER_STORY_SECTION);
        });

        this.$menuItems.find('.browse-section').on('click', () => {
            const position = scrollPosition.calc();
            this.triggerScroll(position.browseSection__Top);

            this.trigger(action.ENTER_BROWSE_SECTION);
        });

        this.$menuItems.find('.purchase-section').on('click', () => {
            const position = scrollPosition.calc();
            this.triggerScroll(position.purchaseSection__Top);

            this.trigger(action.ENTER_PURCHASE_SECTION);
        });
    }

    triggerScroll(position) {
        // TODO: bodyのdata属性に状態持たせるのやめる…
        document.body.dataset.isAnimating = true;
        this.$root.animate({
            scrollTop: position
        }, this.SCROLL_DURATION, () => {
            delete document.body.dataset.isAnimating;
        });
    }

    sticky(shouldBeSticky) {
        if (shouldBeSticky) {
            !this.$menuContainer.hasClass('--sticky') && this.$menuContainer.addClass('--sticky');
        } else {
            this.$menuContainer.hasClass('--sticky') && this.$menuContainer.removeClass('--sticky');
        }
    }

    renderChosen(i) {
        this.$menuItems.removeClass('--chosen');
        this.$menuItems.eq(i).addClass('--chosen');
    }

    // TODO: EventEmitter入れる
    emit(actionType) {
        switch (actionType) {
            case action.ENTER_PURCHASE_SECTION: 
                this.sticky(true);
                this.renderChosen(2);
                break;
            case action.ENTER_BROWSE_SECTION:
                this.sticky(true);
                this.renderChosen(1);
                break;
            case action.ENTER_STORY_SECTION: 
                this.sticky(true);
                this.renderChosen(0);
                break;
            case action.ENTER_HERO_IMAGE: 
                this.sticky(false);
                break;
        }
    }
}