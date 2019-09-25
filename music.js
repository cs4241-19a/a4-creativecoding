


function AudioVisualizer(){
	//渲染
	this.scene;
	this.camera;
	this.renderer;
	this.controls;
}

AudioVisualizer.prototype.initialize = function(){
	//创建ThreeJS 场景
	this.scene = new THREE.Scene();
	
	//获取窗口长宽
	var  WIDTH = window.innerWidth,
		 HEIGHT = window.innerHeight;
	
	//获取渲染器
	this.renderer = new THREE.WebGLRenderer({antialias:true});
	this.renderer.setSize(WIDTH,HEIGHT);

	//创建并且加入相机
	this.camera = new THREE.PerspectiveCamera(40,WIDTH/HEIGHT,0.1,20000);
	this.camera.position.set(0,45,0);
	this.scene.add(this.camera);

	var that = this;

    //update renderer size, aspect ratio and projection matrix on resize
    //更新渲染器大小，方向（横竖）以及投影矩阵
    window.addEventListener('resize', function () {

        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        that.renderer.setSize(WIDTH, HEIGHT);

        that.camera.aspect = WIDTH / HEIGHT;
        that.camera.updateProjectionMatrix();

    });

    //背景颜色
    this.renderer.setClearColor(0x333F47, 1);

    //创建光源并添加到场景中
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);
}