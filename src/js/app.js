import 'babel-polyfill';
import domready from 'domready';
import { render } from 'react-dom';

import ComicViewerModal from './component/ComicViewerModal';

import ScrollManager from './lib/ScrollManager';
import GoogleAnalyticsClient from './lib/GoogleAnalyticsClient';

domready(q => {
    render(ComicViewerModal, document.querySelector('#modal'));

    new ScrollManager().run();
    new GoogleAnalyticsClient().run();
})();