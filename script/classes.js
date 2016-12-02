(function(window){
    function World(){
        this.initialize();
    }
    World.prototype = new createjs.Container();

    World.prototype.container_initialize = World.prototype.initialize;

    World.prototype.initialize = function() {
        this.container_initialize();
        this.name = 'world';
        this.tickChildren = true;
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
        this.x = 0 ;
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
    function Cloud(x, y){
        this.initialize(x, y);
    }
    Cloud.prototype = new createjs.Container();

    Cloud.prototype.container_initialize = Cloud.prototype.initialize;

    Cloud.prototype.initialize = function(x, y) {
        this.container_initialize();
        this.name = 'cloud';
        this.setBounds(0, 0, settings.cloud.width, settings.cloud.height);
        this.width = settings.cloud.width;
        this.height = settings.cloud.height;
        this.x = x;
        this.y = y;
        this.vel = Math.random()*settings.cloud.maxVel;
        this.index = assets.clouds.length;
        var cloudBitmap = new createjs.Bitmap(assets.cloudImage[getRand(0,3)]);
        cloudBitmap.x = 0;
        cloudBitmap.y = 0;
        this.addChild(cloudBitmap);
        assets.clouds.push(this);
        stage.setChildIndex( this, stage.getNumChildren()-1);
    }
    Cloud.prototype.tick = function(){
        this.x-=this.vel;
        if(this.x<(-settings.cloud.width) && assets.clouds.length<100){
            this.x = settings.width+settings.cloud.width;
            console.log('clouds: ' + assets.clouds.length);
        }
    }
    window.Cloud = Cloud;
} (window));
function getRand(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

(function(window){
    function Force(v, d){
        this.initialize(v, d);
    }
    Force.prototype = new Object();
    Force.prototype.initialize = function(v, d){
        this.value = v;
        this.direction = d;
        this.apply = function(){}; //define the way the force interacts with the object manually, after every definition.
    }
    window.Force = Force;
} (window));

(function(window){
    function Bullet(x, y, direction){
        this.initialize(x, y, direction);
    }
    Bullet.prototype = new createjs.Container();

    Bullet.prototype.container_initialize = Bullet.prototype.initialize;

    Bullet.prototype.initialize = function(x, y, direction) {
        this.container_initialize();
        this.name = 'bullet';
        this.setBounds(0, 0, settings.bullet.radius, settings.bullet.radius);
        this.width = settings.bullet.radius;
        this.height = settings.bullet.radius;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.index = assets.bullets.length;
        var bulletShape = new createjs.Shape();
        bulletShape.x = 0;
        bulletShape.y = 0;
        bulletShape.width = settings.bullet.radius;
        bulletShape.height = settings.bullet.radius;
        bulletShape.graphics = new createjs.Graphics();
        bulletShape.graphics.beginFill('yellow');
        bulletShape.graphics.drawCircle(0, 0, settings.bullet.radius);
        this.addChild(bulletShape);
        assets.bullets.push(this);
        stage.setChildIndex(this, stage.getNumChildren()-1);
        console.log('Bullet created!');
    }
    Bullet.prototype.tick = function(){
        this.y += ((Math.sin(this.direction * (Math.PI/180))) * settings.bullet.speed);
        this.x += ((Math.cos(this.direction * (Math.PI/180))) * settings.bullet.speed);
    }
    window.Bullet = Bullet;
} (window));

