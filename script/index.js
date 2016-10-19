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
settings.cloud.minVel = 0;
settings.cloud.maxVel = 5;
settings.cloud.minHeight = settings.height - settings.ground.height - 1000;
settings.cloud.maxHeight = settings.height + 500;
//----End of settings----//

var groundImage = new Image(),
    atmosphereImage = new Image(),
    cloudImage1 = new Image(),
    cloudImage2 = new Image(),
    cloudImage3 = new Image(),
    cloudImage4 = new Image();
    //world = new createjs.Container();
function init(){
    fixCanvas();
    loadAssets();

    stage = new createjs.Stage('canvas');
    var world = new World();
    //world.setBounds(0, 0, settings.width, settings.height);
    //world.x = 0;
    //world.y = -3000;
    //world.name = 'world';
    stage.addChild(world);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tick);
    function tick(e){
        world.tick();
        stage.update();
    }
}
function loadAssets(){
    groundImage.onload = onGroundImageLoad;
    atmosphereImage.onload = onAtmosphereImageLoad;
    cloudImage1.onload = onCloudImageLoad(cloudImage1);
    groundImage.src = "./img/world_ground.png";
    atmosphereImage.src = "./img/world_atmosphere.png";
    cloudImage1.src = './img/world_cloud1.png';
}
function onGroundImageLoad(e){
    var groundShape = new createjs.Shape();
    groundShape.width = settings.ground.width;
    groundShape.height = settings.ground.height;
    groundShape.graphics = new createjs.Graphics();
    groundShape.graphics.beginBitmapFill(groundImage);
    groundShape.graphics.drawRect(0, settings.height-settings.ground.height, settings.ground.width, settings.ground.height);
    
    stage.getChildByName('world').addChild(groundShape);
    stage.update();
}
function onAtmosphereImageLoad(e){
    var atmosphereShape = new createjs.Shape();
    atmosphereShape.graphics = new createjs.Graphics();
    atmosphereShape.graphics.beginBitmapFill(atmosphereImage);
    atmosphereShape.graphics.drawRect(0, 0, settings.width, settings.height-settings.ground.height);
    
    stage.getChildByName('world').addChild(atmosphereShape);
    stage.update();
    
}
function onCloudImageLoad(e, cloudImage){
    var cloudBitmap = new createjs.Bitmap(cloudImage);
    //cloudBitmap.x = Math.floor(Math.random()*(stage.getChildByName('world').width) );
}
