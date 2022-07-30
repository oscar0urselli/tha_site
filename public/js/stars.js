import * as THREE from 'three';

export class StarsGenerator {
    constructor(
        n = 200,
        colorIntervals = [
            [0xffffff, 0xffffff]
        ],
        limits = {
            X: {min: 100, max: 100},
            Y: {min: 100, max: 100},
            Z: {min: 100, max: 100}
        },
        dimensions = {
            radius: {
                min: 0.25,
                max: 0.25
            },
            widthSegments: 16,
            heightSegments: 16
        },
        layer = 0) {
        this.n = n;
        this.colorIntervals = colorIntervals;
        this.limits = limits;
        this.radiusLimits = dimensions.radius;
        this.widthSegments = dimensions.widthSegments;
        this.heightSegments = dimensions.heightSegments;
        this.layer = layer;
    }

    addStars(scene, callback) {
        Array(this.n).fill().forEach(() => {
            /*const geometry = new THREE.SphereBufferGeometry(
                THREE.MathUtils.randFloat(this.radiusLimits.min, this.radiusLimits.max),
                this.widthSegments,
                this.heightSegments
            );*/
            const geometry = new THREE.IcosahedronBufferGeometry();
            
            let randomColorIndex = THREE.MathUtils.randInt(0, this.colorIntervals.length - 1);
            const material = new THREE.MeshBasicMaterial({
                color: THREE.MathUtils.randInt(this.colorIntervals[randomColorIndex][0], this.colorIntervals[randomColorIndex][1])
            });
            const star = new THREE.Mesh(geometry, material);

            const x = THREE.MathUtils.randInt(0, 1) ? THREE.MathUtils.randFloat(this.limits.X.min, this.limits.X.max) : THREE.MathUtils.randFloat(-this.limits.X.min, -this.limits.X.max);
            const y = THREE.MathUtils.randInt(0, 1) ? THREE.MathUtils.randFloat(this.limits.Y.min, this.limits.Y.max) : THREE.MathUtils.randFloat(-this.limits.Y.min, -this.limits.Y.max);
            const z = THREE.MathUtils.randInt(0, 1) ? THREE.MathUtils.randFloat(this.limits.Z.min, this.limits.Z.max) : THREE.MathUtils.randFloat(-this.limits.Z.min, -this.limits.Z.max);

            star.position.set(x, y, z);
            star.layers.set(this.layer);

            callback(star);
        });
    }
}