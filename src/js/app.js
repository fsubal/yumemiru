import 'babel-polyfill';

import domready from 'domready';
import IndexController from './controller/Index';

domready(() => {
    new IndexController().run();
});