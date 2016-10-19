(function(window){
    function World(ground){
        this.initialize(ground);
    }
    World.prototype = new createjs.Container();

    World.prototype.container_initialize = World.prototype.initialize;

    World.prototype.initialize = function() {
        this.container_initialize();
        this.name = 'world';
        this.setBounds(0, 0, settings.width, settings.height);
        this.width = settings.width;
        this.height = settings.height;
        this.x = 0;
        this.y = -3000;
        //ground.x = 0;
        //ground.y = 4500;
    }
    World.prototype.tick = function(){
        this.y--;
        if(this.x<(canvas.width-this.width)) this.x = canvas.width-this.width;
        if(this.x>0) this.x = 0;
        if(this.y<(canvas.height-this.height)) this.y = canvas.height-this.height;
        if(this.y>0) this.y = 0;
    }
    window.World = World;
} (window));