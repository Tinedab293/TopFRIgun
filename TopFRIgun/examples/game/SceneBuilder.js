import { Mesh } from './Mesh.js';

import { Node } from './Node.js';
import { Model } from './Model.js';
import { Plane } from './Plane.js';
import { Camera } from './Camera.js';
import { Bridge } from './Bridge.js';

import { Scene } from './Scene.js';

export class SceneBuilder {

    constructor(spec) {
        this.spec = spec;
    }

    createNode(spec) {
        switch (spec.type) {
            case 'camera':{
                return new Camera(spec);
            } 
            case 'model': {
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                console.log(spec.mesh)
                const texture = this.spec.textures[spec.texture];
                if(spec.mesh==3){
                    return new Plane(mesh, texture, spec);
                }
                else if(spec.mesh==0){
                    return new Bridge(mesh, texture, spec);
                } else {return new Model(mesh, texture, spec);}
            }
            default: return new Node(spec);
        }
    }

    build() {
        let scene = new Scene();
        let i = new Node();
        for(i in this.spec.nodes){
            console.log(this.spec.nodes[i].mesh)
            if(this.spec.nodes[i].mesh==3){
                
            }
            
        }
        this.spec.nodes.forEach(spec => scene.addNode(this.createNode(spec)));
        return scene;
    }

}
