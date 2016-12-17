import $ from 'jquery';
import scrollPosition from '../lib/ScrollPosition';
import action from '../lib/ScrollActionType';

export default class GlobalNavigation {
    constructor() {
        this.SCROLL_DURATION = 200;
        this.$root = $('html, body');
        this.$menuContainer = $('#global-navigation');
        this.$menuItems = $('#global-navigation').find('.global-navigation__menu-item');
        this.init();
    }

    init() {
        this.$menuContainer.find('.story-section').on('click', () => {
            const goal = scrollPosition.calc();
            // NOTICE: スクロールアニメーションで向かう位置は、sticky判定のthresholdより僅かに大きくなければならない
            this.triggerScroll(goal.storySection__Top + 1);

            this.emit(action.ENTER_STORY_SECTION);
        });

        this.$menuContainer.find('.browse-section').on('click', () => {
            const goal = scrollPosition.calc();
            this.triggerScroll(goal.browseSection__Top + 1);

            this.emit(action.ENTER_BROWSE_SECTION);
        });

        this.$menuContainer.find('.purchase-section').on('click', () => {
            const goal = scrollPosition.calc();
            this.triggerScroll(goal.purchaseSection__Top + 1);

            this.emit(action.ENTER_PURCHASE_SECTION);
        });
    }

    triggerScroll(position) {
        // TODO: bodyのdata属性に状態持たせるのやめる…
        document.body.dataset.isAnimating = true;
        this.$root.animate({
            scrollTop: position
        }, this.SCROLL_DURATION, () => {
            document.body.dataset.isAnimating = '';
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
        if (i >= 0) {
            this.$menuItems.eq(i).addClass('--chosen');
        }        
    }

    choseNothing() {
        this.$menuItems.removeClass('--chosen');     
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
            case action.ENTER_GLOBAL_NAVIGATION: 
                this.sticky(true);
                this.renderChosen(0);
                break;
            case action.ENTER_HERO_IMAGE: 
                this.sticky(false);
                this.choseNothing();
                break;
        }
    }
}