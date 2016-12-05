import $ from 'jquery';

const $heroImage = $('#hero-image');
const $browseSection = $('#browse-section');
const $purchaseSection = $('#purchase-section');

const calc = () => {
    return {
        heroImage__Bottom      : $heroImage.offset().top       + $heroImage.outerHeight(),
        browseSection__Top     : $browseSection.offset().top   ,
        purchaseSection__Top   : $purchaseSection.offset().top ,
        purchaseSection__Bottom: $purchaseSection.offset().top + $purchaseSection.outerHeight(),
    };
}

export default { calc };