class conforttableElement {
    constructor(dom) {
        this.dom = dom;
    }
    isFullyDisplay() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.top >= 0 && boundingClientRect.bottom >= 0 && boundingClientRect.left >= 0 && boundingClientRect.right >= 0 && boundingClientRect.width !== 0 && boundingClientRect.height !== 0;
    }
    isTopBorderTouchTop() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.top <= 0;
    }
    isTopBorderTouchBottom() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.top >= document.documentElement.clientHeight;
    }
    isBottomBorderTouchTop() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.bottom <= 0;
    }
    isBottomBorderTouchBottom() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.bottom >= document.documentElement.clientHeight;
    }
    isLeftBorderTouchLeft() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.left <= 0;
    }
    isLeftBorderTouchRight() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.left >= document.documentElement.clientWidth;
    }
    isRightBorderTouchLeft() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.right <= 0;
    }
    isRightBorderTouchRight() {
        let boundingClientRect = this.dom.getBoundingClientRect()
        return boundingClientRect.right >= document.documentElement.clientWidth;
    }
}
