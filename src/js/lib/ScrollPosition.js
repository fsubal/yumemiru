import $ from 'jquery';

const $heroImage = $('#hero-image');
const $globalNavigation = $('#global-navigation');
const $storySection = $('#story-section');
const $browseSection = $('#browse-section');
const $purchaseSection = $('#purchase-section');

const calc = () => {
    return {
        heroImage__Bottom      : $heroImage.offset().top       + $heroImage.outerHeight(),
        globalNavigation__Top  : $globalNavigation.offset().top,
        storySection__Top      : $storySection.offset().top    - $globalNavigation.outerHeight(),
        browseSection__Top     : $browseSection.offset().top   - $globalNavigation.outerHeight(),
        purchaseSection__Top   : $purchaseSection.offset().top - $globalNavigation.outerHeight(),
        purchaseSection__Bottom: $purchaseSection.offset().top + $purchaseSection.outerHeight(),
    };
}

export default { calc };