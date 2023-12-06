import { GUI } from '../../lib/dat.gui.module.js';
import { vec3, mat4 } from '../../lib/gl-matrix-module.js';


import { Application } from '../../common/engine/Application.js';

import { Renderer } from './Renderer.js';
import { Physics } from './Physics.js';
import { Camera } from './Camera.js';
import { Plane } from './Plane.js';
import { Bridge } from './Bridge.js';

import { SceneLoader } from './SceneLoader.js';
import { SceneBuilder } from './SceneBuilder.js';

class App extends Application {

    start() {
        const gl = this.gl;

        this.renderer = new Renderer(gl);
        this.time = Date.now();
        this.startTime = this.time;
        this.aspect = 1;
        this.pointerlockchangeHandler = this.pointerlockchangeHandler.bind(this);
        document.addEventListener('pointerlockchange', this.pointerlockchangeHandler);
        this.load('scene.json');
    }

    async load(uri) {
        const scene = await new SceneLoader().loadScene(uri);
        const builder = new SceneBuilder(scene);
        this.scene = builder.build();
        this.physics = new Physics(this.scene);

        // Find first camera.
        this.camera = null;
        this.letalo = null;
        this.scene.traverse(node => {
            if (node instanceof Camera) {
                this.camera = node;
            }
            if (node instanceof Plane) {
                this.camera.addChild(node)
            }
        });

        this.camera.aspect = this.aspect;
        this.camera.updateProjection();
        this.renderer.prepare(this.scene);
    }

    enableCamera() {
        this.canvas.requestPointerLock();
    }

    pointerlockchangeHandler() {
        if (!this.camera) {
            return;
        }

        if (document.pointerLockElement === this.canvas) {
            this.camera.enable();
        } else {
            this.camera.disable();
        }
    }

    update() {
        const t = this.time = Date.now();
        const dt = (this.time - this.startTime) * 0.001;
        this.startTime = this.time;
    
        if(this.scene){
        
        let t1 = this.scene.nodes[40].transform;
        const x = Math.cos(Date.now()*0.001);
        mat4.fromTranslation(t1, [9+x, 3, -5]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[41].transform;
        mat4.fromTranslation(t1, [10-x, 3, -26.7]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[42].transform;
        mat4.fromTranslation(t1, [4.6+x, 3, -33]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[43].transform;
        mat4.fromTranslation(t1, [15+3*x, 3, -89.4]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[44].transform;
        mat4.fromTranslation(t1, [12-3*x, 3, -120]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[45].transform;
        mat4.fromTranslation(t1, [10.2-3*x, 3, -168.7]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[46].transform;
        mat4.fromTranslation(t1, [22-3*x, 3, -274]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[47].transform;
        mat4.fromTranslation(t1, [18-3*x, 3, -300]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[48].transform;
        mat4.fromTranslation(t1, [34+3*x, 3, -328]);
        mat4.scale(t1,t1, [30, 30, 30]);

        t1 = this.scene.nodes[49].transform;
        mat4.fromTranslation(t1, [30-x, 3, -359]);
        mat4.scale(t1,t1, [30, 30, 30])

        t1 = this.scene.nodes[50].transform;
        mat4.fromTranslation(t1, [7-x, 3, -50]);
        mat4.scale(t1,t1, [30, 30, 30])

        t1 = this.scene.nodes[51].transform;
        mat4.fromTranslation(t1, [15-4*x, 3, -193]);
        mat4.scale(t1,t1, [30, 30, 30])

        t1 = this.scene.nodes[52].transform;
        mat4.fromTranslation(t1, [19+4*x, 3, -210]);
        mat4.scale(t1,t1, [30, 30, 30])

        }

        if (this.camera) {
            this.camera.update(dt);
        }

        if (this.physics) {
            this.physics.update(dt);
        }
    }

    render() {
        if (this.scene) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    resize() {
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        this.aspect = w / h;
        if (this.camera) {
            this.camera.aspect = this.aspect;
            this.camera.updateProjection();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const app = new App(canvas);
    const gui = new GUI();
    gui.add(app, 'enableCamera');
});
