"use strict";

(function () {
    Game.models.screens.Splash = Splash;

    var imageSrc = Game.utils.data.constants.IMAGES.SPLASH_IMAGE,
            image = new Image(),
            speed = Game.utils.data.constants.SPEED.SPLASH_SPEED,
            gameState = Game.utils.data.constants.GAME_STATE.PLAY,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            color = Game.utils.data.constants.COLORS.BLACK,
            sounds = Game.utils.data.constants.SOUNDS;

    image.src = imageSrc;

    function Splash() {
        this.x = 0;
        this.y = 212;
        this.width = width;
        this.height = 200;
    }

    Splash.prototype.draw = function (ctx, soundPLayer) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
        soundPLayer.play(sounds.STAGE_START);
        if (this.x < width) {
            this.x += speed;
        } else {
            this.x = 0;
            STATE = gameState;
            return;
        }
    };

})();