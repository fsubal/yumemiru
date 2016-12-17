export default class GoogleAnalyticsClient {
    constructor() {}

    scrolledToStory() {
        this._send('scroll', 'story', '', { once: true });
    }

    scrolledToBrowse() {
        this._send('scroll', 'browse', '', { once: true });
    }

    scrolledToPurchase() {
        this._send('scroll', 'purchase', '', { once: true });
    }

    openMangaViewer() {
        this._send('open', 'manga', '', {});
    }

    closeMangaViewer(pageNumber) {
        this._send('close', 'manga', pageNumber, {});
    }

    goToWebCatalog() {
        this._send('goto', 'catalog', '', {});
    }

    goToPixivSample(bookName) {
        this._send('goto', 'pixiv', bookName, {});
    }

    goToBooth() {
        this._send('goto', 'booth', '', {});
    }

    _send(category, action, label, { once }) {
        const isOnce = !!once;

        if (isOnce && this._hasSent(category, action, label)) {
            return;
        }

        window.ga('send', 'event', category, action, label);
        if (isOnce) {
            this._doNotSendAgain(category, action, label);
        }
    }

    _doNotSendAgain(category, action, label) {
        window.sessionStorage[`${category}-${action}-${label}`] = 1;
    }

    _hasSent(category, action, label) {
        return ~~window.sessionStorage[`${category}-${action}-${label}`] === 1;
    }
}