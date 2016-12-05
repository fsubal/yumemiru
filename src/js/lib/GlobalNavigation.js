import $ from 'jquery';
import ScrollPosition from '../lib/ScrollPosition';
import ScrollActionType from '../lib/ScrollActionType';

export default class GlobalNavigation {
    constructor() {
        this.SELECTOR_STORY_SECTION = '.story-section';
        this.SELECTOR_BROWSE_SECTION = '.browse-section';
        this.SELECTOR_PURCHASE_SECTION = '.purchase-section';

        this.POTISION = ScrollPosition;
        this.ACTION_TYPE = ScrollActionType;

        this.$body = $(document.body);
        this.$menuContainer = $('#menu-container');
        this.$menuItems = $('#menu-container').find('.menu-item');

        this.init();
    }

    init() {
        const { HERO_IMAGE__BOTTOM, BROWSE_SECTION__TOP, PURCHASE_SECTION__TOP } = this.POSITION;
        
        $menuItems.find(this.SELECTOR_STORY_SECTION).on('click', () => {
            this.$body.scrollTo(HERO_IMAGE__BOTTOM);
        });

        $menuItems.find(this.SELECTOR_BROWSE_SECTION).on('click', () => {
            this.$body.scrollTo(BROWSE_SECTION__TOP);
        });

        $menuItems.find(this.SELECTOR_PURCHASE_SECTION).on('click', () => {
            this.$body.scrollTo(PURCHASE_SECTION__TOP);
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

    update(actionType) {
        const { ENTER_HERO_IMAGE, ENTER_STORY_SECTION, ENTER_BROWSE_SECTION, ENTER_PURCHASE_SECTION, PASS_PURCHASE_SECTION } = this.ACTION_TYPE;

        switch (actionType) {
            case PASS_PURCHASE_SECTION:
                this.hide();
                break;
            case ENTER_PURCHASE_SECTION: 
                this.renderChosen(2);
                break;
            case ENTER_BROWSE_SECTION:
                this.renderChosen(1);
                break;
            case ENTER_STORY_SECTION: 
                this.renderChosen(0);
                break;
            case ENTER_HERO_IMAGE: 
                this.hide();
                break;
        }
    }
}