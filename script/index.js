function fixCanvas(){
    canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}
window.onresize = fixCanvas;
//----The property 'width' is not built-in to the container and other objects of createjs. Assign the '.width' property to each object created manually.----//
//----These are the general settings for objects----//
var settings = new Object();
settings.cloud = new Object();
settings.ground = new Object();
settings.width = 5000;
settings.height = 4500;
settings.ground.width = settings.width;
settings.ground.height = 500;
settings.cloud.width = 1000;
settings.cloud.height = 300;
settings.cloud.minVel = 0;
settings.cloud.maxVel = 5;
settings.cloud.minHeight = settings.height - settings.ground.height - 1000;
settings.cloud.maxHeight = -300;
settings.cloud.maxCount = 100;
settings.cloud.count = 0;
//----End of settings----//

//----Assets are to keep the objects you need at hand----//
//----For more information, refer to the mind map----//
var assets = new Object();

var groundImage = new Image(),
    atmosphereImage = new Image(),
    cloudImage1 = new Image(),
    cloudImage2 = new Image(),
    cloudImage3 = new Image(),
    cloudImage4 = new Image();
function init(){
    fixCanvas();
    loadAssets();

    stage = new createjs.Stage('canvas');
    var world = new World();
    stage.addChild(world);
    
    stage.on('stagemousemove', function(e){
        stage.getChildByName('world').velX = (canvas.width/2 - e.rawX)/4;
        stage.getChildByName('world').velY = (canvas.height/2 - e.rawY)/4;
    });
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tick);
    function tick(e){
        world.tick();
        stage.update();
    }
}
function loadAssets(){
    assets.groundImage = new Image();
    assets.atmosphereImage = new Image();
    assets.cloudImage = [];
    assets.cloudImage[0] = new Image();
    assets.cloudImage[1] = new Image();
    assets.cloudImage[2] = new Image();
    assets.cloudImage[3] = new Image();
    assets.groundImage.onload = onGroundImageLoad;
    assets.atmosphereImage.onload = onAtmosphereImageLoad;
    assets.cloudImage[0].onload = onCloudImageLoad;
    assets.cloudImage[1].onload = onCloudImageLoad;
    assets.cloudImage[2].onload = onCloudImageLoad;
    assets.cloudImage[3].onload = onCloudImageLoad;
    assets.cloudImage[0].isLoaded = false;
    assets.cloudImage[1].isLoaded = false;
    assets.cloudImage[2].isLoaded = false;
    assets.cloudImage[3].isLoaded = false;
    assets.groundImage.src = "./img/world_ground.png";
    assets.atmosphereImage.src = "./img/world_atmosphere.png";
    assets.cloudImage[0].src = './img/world_cloud1.png';
    assets.cloudImage[1].src = './img/world_cloud2.png';
    assets.cloudImage[2].src = './img/world_cloud3.png';
    assets.cloudImage[3].src = './img/world_cloud4.png';
}
function onGroundImageLoad(e){
    var groundShape = new createjs.Shape();
    groundShape.width = settings.ground.width;
    groundShape.height = settings.ground.height;
    groundShape.graphics = new createjs.Graphics();
    groundShape.graphics.beginBitmapFill(this);
    groundShape.graphics.drawRect(0, 0, settings.ground.width, settings.ground.height);
    
    var ground = new Ground(groundShape);
    stage.getChildByName('world').addChild(ground);
    stage.update();
}
function onAtmosphereImageLoad(e){
    var atmosphereShape = new createjs.Shape();
    atmosphereShape.graphics = new createjs.Graphics();
    atmosphereShape.graphics.beginBitmapFill(this);
    atmosphereShape.graphics.drawRect(0, 0, settings.width, settings.height-settings.ground.height);
    atmosphereShape.name = 'atmosphere';
    
    stage.getChildByName('world').addChild(atmosphereShape);
    stage.update();
    
}
function onCloudImageLoad(e){
    this.isLoaded = true;
    if(assets.cloudImage[0].isLoaded && assets.cloudImage[1].isLoaded && assets.cloudImage[2].isLoaded && assets.cloudImage[3].isLoaded) initializeClouds();
}
function initializeClouds(){
    for(var i=0; i<settings.cloud.maxCount; i++){
        var cloud = new Cloud();
        stage.getChildByName('world').addChild(cloud);
    }
}
function onMouseMove(e){
    //stage.getChildByName('world').vel.x = e.rawX - canvas.width/
}