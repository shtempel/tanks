"use strict";

function StartScreen() {
    this.x = 0;
    this.y = 500;
    this.width = CANVAS.width;
    this.height = CANVAS.height;
}

StartScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.BLACK;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    if (this.y >= 0) {
        this.y += -START_SCREEN_SPEED;
        CTX.drawImage(START_SCREEN, this.x, this.y, this.width, this.height);
    }
    CTX.drawImage(START_SCREEN, this.x, this.y, this.width, this.height);
};