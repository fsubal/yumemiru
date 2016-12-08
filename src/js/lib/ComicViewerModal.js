import $ from 'jquery';
import 'slick-carousel';
import browserHistory from 'history/createBrowserHistory';

export default class ComicViewerModal {
    constructor() {
        this.init();
        this.history = browserHistory();
    }

    init() {
        this.preloadSampleImages();
    }

    render() {
    }

    preloadSampleImages() {
        for (let i of [
            1, 2, 3]) {
            const image = new Image();
            image.src = `../img/sample/0${i}.jpg`;
        }
    }
}
