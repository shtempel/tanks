"use strict";

(function () {
    Game.models.screens.Start = Start;

    var imageSrc = Game.utils.data.constants.IMAGES.START_IMAGE,
            image = new Image(),
            speed = Game.utils.data.constants.SPEED.START_SPEED,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            color = Game.utils.data.constants.COLORS.BLACK;

    image.src = imageSrc;

    function Start() {
        this.x = -3;
        this.y = height;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    Start.prototype = {
        draw: function (ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, width, height);
            if (this.y >= 0) {
                this.y += -this.speed;
                ctx.drawImage(image, this.x, this.y, this.width, this.height);
            }
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
        }
    };
}

)();