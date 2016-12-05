import $ from 'jquery';

const $heroImage = $('#hero-image');
const $browseSection = $('#browse-section');
const $purchaseSection = $('#purchase-section');

const SCROLL_POSITION = {
    HERO_IMAGE__BOTTOM      : $heroImage.offset().top       + $heroImage.outerHeight(),
    BROWSE_SECTION__TOP     : $browseSection.offset().top   ,
    PURCHASE_SECTION__TOP   : $purchaseSection.offset().top ,
    PURCHASE_SECTION__BOTTOM: $purchaseSection.offset().top + $purchaseSection.outerHeight(),
};

export default SCROLL_POSITION;