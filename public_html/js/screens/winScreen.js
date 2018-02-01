"use strict";

function WinScreen() {
    this.x = 122;
    this.y = 0;
    this.width = CANVAS.width;
    this.height = CANVAS.height;
}

WinScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.LIGHT_GRAY;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(SPRITE, IMAGES_COORDS.victory.x, IMAGES_COORDS.victory.y, 380, 63, this.x, this.y, 380, 63);
    if (this.y < 275) {
        this.y += GAME_OVER_SPEED;
    } else {
        state = GAME_STATE.STATE_RESULTS;
        this.y = 0;
        return;
    }
};
