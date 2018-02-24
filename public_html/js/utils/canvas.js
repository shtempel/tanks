"use strict";

(function () {
    Game.utils.Canvas = Canvas;

    function Canvas() {
        this.elem = document.createElement("canvas");
        this.width = this.elem.width;
        this.height = this.elem.height;
        this.ctx = this.elem.getContext("2d");
    }

    Canvas.prototype = {
        add: function () {
            this.elem.width = this.width;
            this.elem.height = this.height;
            this.elem.style.float = "left";
            document.getElementById("canvas").appendChild(this.elem);
        },

        setSizes: function (width, height) {
            this.width = width;
            this.height = height;
        }
    };
    
})();