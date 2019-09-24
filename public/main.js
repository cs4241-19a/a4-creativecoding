const THREE = require( 'three' )
const PP    = require( 'postprocessing' )

const app = {
    init() {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera()
        this.camera.position.z = 50

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight )

        document.body.appendChild( this.renderer.domElement )

        this.createLights()
        this.knot = this.createKnot()

        this.createEffects()
        this.clock = new THREE.Clock()
        this.render = this.render.bind( this )
        this.render()
    },

    createEffects() {
        this.composer = new PP.EffectComposer( this.renderer )
        this.renderPass = new PP.RenderPass( this.scene, this.camera )
        this.composer.addPass( this.renderPass )

        this.glitchPass = new PP.EffectPass( this.camera, new PP.GlitchEffect() )
        this.glitchPass.renderToScreen = true
        this.composer.addPass( this.glitchPass )
    },

    createLights() {
        const pointLight = new THREE.PointLight( 0xffffff )
        pointLight.position.z = 100
        this.scene.add( pointLight )
    },

    createKnot() {
        const knotgeo = new THREE.TorusKnotGeometry( 10, .1, 128, 16, 5, 21 )
        const mat     = new THREE.MeshPhongMaterial({ color:0xff0000, shininess:2000 })
        const knot    = new THREE.Mesh( knotgeo, mat )

        this.scene.add( knot )
        return knot
    },

    render() {
        this.knot.rotation.x += .025
        this.composer.render( this.clock.getDelta() )
        window.requestAnimationFrame( this.render )
    }
}

window.onload = ()=> app.init()