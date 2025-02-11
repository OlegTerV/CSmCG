import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const vertices = new Float32Array( [
	 10.0,  10.0, 10.0, // v0
	-10.0,  10.0, 10.0, // v1
	-10.0, -10.0,  10.0, // v2
	-10.0, -10.0, -10.0, // v3
	 10.0, -10.0, -10.0, // v4
	 10.0,  10.0, -10.0,  // v5
    -10.0,  10.0, -10.0,  // v6
     10.0, -10.0,  10.0  // v7
] );

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const indices = [
	0, 5, 6,
	6, 0, 1,
    7, 4, 3,
    3, 7, 2,
    0, 1, 2,
    0, 2, 7,
    0, 4, 7,
    0, 4, 5,
    3, 4, 5,
    3, 5, 6,
    1, 2, 3,
    1, 3, 6
];

const colors = new Float32Array([
    1, 1, 1, // white (v0)
    0, 1, 0, // green (v1)
    0, 0, 1, // blue (v2)
    1, 0, 0, // red (v3)
    1, 1, 0, // yellow (v4)
    0.65, 0.16, 0.16, // brown (v5)
    0, 1, 1, // cyan (v6)
    1, 0.65, 0 // orange (v7)
]);


geometry.setIndex( indices );
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const material = new THREE.MeshBasicMaterial( { vertexColors: true} );
material.side=THREE.DoubleSide;
const mesh = new THREE.Mesh( geometry, material );

const rotateMatrix=[ 
    [1, 0, 0], 
    [0, Math.cos(0.015708), -Math.sin(0.015708)],
    [0, Math.sin(0.015708), Math.cos(0.015708)] ];


scene.add(mesh);
camera.position.z = 25;
camera.position.y = 25;
camera.position.x = 25;
camera.lookAt(0,0,0)
function render() {
    requestAnimationFrame( render );
    for (let i = 0; i <=21; i+=3){
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];
        vertices[i] = rotateMatrix[0][0] * x + rotateMatrix[0][1] * y + rotateMatrix[0][2] * z;
        vertices[i + 1] = rotateMatrix[1][0] * x + rotateMatrix[1][1] * y + rotateMatrix[1][2] * z;
        vertices[i + 2] = rotateMatrix[2][0] * x + rotateMatrix[2][1] * y + rotateMatrix[2][2] * z;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render( scene, camera );
}
render();