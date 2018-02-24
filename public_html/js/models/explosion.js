"use strict";

(function () {

    Game.models.Explosion = Explosion;

    var sprite = Game.utils.data.constants.IMAGES.SPRITE;

    function Explosion(x, y, width, height, type, imgX, imgY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.imgX = imgX;
        this.imgY = imgY;
    }

    Explosion.prototype.draw = function (ctx) {
        ctx.drawImage(sprite, this.imgX, this.imgY,
                64, 64, this.x, this.y, 50, 50, this.x, this.y);
    };
    Explosion.prototype.explosionInit = function (x, y, array, imgX, imgY) {
        array.push(new Explosion(x, y, 0, 0, "explosion", imgX, imgY));
    };

})();