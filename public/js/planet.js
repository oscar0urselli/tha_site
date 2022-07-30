import * as THREE from 'three';

export class Planet {
    constructor(
        dimensions = {
            radius: 3,
            widthSegments: 15,
            heightSegments: 15
        },
        spawnPosition = new THREE.Vector3(0, 0, 0),
        obliquity = 0,
        materialParameter = {
            texture: undefined,
            transparent: undefined,
            blending: undefined,
            bumpMap: undefined,
            bumpScale: undefined,
            roughness: undefined,
            metalness: undefined,
            blending: undefined
        },
        layer = 0
        ) {
        this.dimensions = dimensions;
        this.spawnPosition = spawnPosition;
        this.obliquity = obliquity;
        this.layer = layer;
        this.materialParameter = materialParameter;
    }

    createPlanet() {
        const geometry = new THREE.SphereBufferGeometry(this.dimensions.radius, this.dimensions.widthSegments, this.dimensions.heightSegments);
        const texture = this.materialParameter.texture ? new THREE.TextureLoader().load(this.materialParameter.texture) : undefined;
        const bump = this.materialParameter.bumpMap ? new THREE.TextureLoader().load(this.materialParameter.bumpMap) : undefined;
        const material = new THREE.MeshPhongMaterial({
            roughness: this.materialParameter.roughness,
            metalness: this.materialParameter.metalness,
            map: texture,
            transparent: this.materialParameter.transparent,
            bumpMap: bump,
            bumpScale: this.materialParameter.bumpScale,
            blending: this.materialParameter.blending
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.receiveShadow = true;
        planet.castShadow = true;
        planet.position.set(this.spawnPosition.x, this.spawnPosition.y, this.spawnPosition.z);
        planet.rotateX(THREE.MathUtils.degToRad(this.obliquity));
        planet.layers.set(this.layer);

        return planet;
    }
}