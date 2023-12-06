import { Node } from './Node.js';

export class Plane extends Node {

    constructor(mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
    }

}