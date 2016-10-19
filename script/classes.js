(function(window){
    function World(){
        this.initialize();
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
        this.velX = 0;
        this.velY = 0;
    }
    World.prototype.tick = function(){
        this.y += this.velY;
        this.x += this.velX;
        if(this.x<(canvas.width-this.width)) this.x = canvas.width-this.width;
        if(this.x>0) this.x = 0;
        if(this.y<(canvas.height-this.height)) this.y = canvas.height-this.height;
        if(this.y>0) this.y = 0;
    }
    window.World = World;
} (window));

(function(window){
    function Ground(groundShape){
        this.initialize(groundShape);
    }
    Ground.prototype = new createjs.Container();

    Ground.prototype.container_initialize = Ground.prototype.initialize;

    Ground.prototype.initialize = function(groundShape) {
        this.container_initialize();
        this.name = 'ground';
        this.setBounds(0, settings.height-settings.ground.height, settings.width, settings.ground.height);
        this.x = 0;
        this.y = settings.height-settings.ground.height;
        this.width = settings.width;
        this.height = settings.ground.height;
        this.addChild(groundShape);
    }
    Ground.prototype.tick = function(){
    }
    window.Ground = Ground;
} (window));

(function(window){
    function Cloud(){
        this.initialize();
    }
    Cloud.prototype = new createjs.Container();

    Cloud.prototype.container_initialize = Cloud.prototype.initialize;

    Cloud.prototype.initialize = function() {
        this.container_initialize();
        this.name = 'cloud';
        this.setBounds(getRand(-settings.cloud.width+1, settings.width+settings.cloud.width-1), getRand(settings.cloud.minHeight, settings.cloud.MaxHeight), settings.cloud.width, settings.cloud.height);
        this.width = settings.cloud.width;
        this.height = settings.cloud.height;
        this.x = getRand(-settings.cloud.width+1, settings.width+settings.cloud.width-1);
        this.y = getRand(settings.cloud.minHeight, settings.cloud.MaxHeight);
        this.vel = getRand(settings.cloud.minVel, settings.cloud.maxVel);
        var cloudBitmap = new createjs.Bitmap(assets.cloudImage[getRand(0,3)]);
        //cloudBitmap.x = 0;
        //cloudBitmap.y = 0;
        this.addChild(cloudBitmap);
    }
    Cloud.prototype.tick = function(){
        this.x-=this.vel;
        if(this.x<(-settings.cloud.width)){
            stage.getChildByName('world').removeChild(this);
            settings.cloud.count--;
        }
    }
    window.Cloud = Cloud;
} (window));
function getRand(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}