import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import state from "../state";
import img1 from "./Shoe/material/1.jpg"
import img2 from "./Shoe/material/2.jpg";
import img3 from "./Shoe/material/3.jpg";
import img4 from "./Shoe/material/4.jpg";
import img5 from "./Shoe/material/5.jpg";
import img6 from "./Shoe/material/6.jpg";
import img7 from "./Shoe/material/7.jpg";
import img8 from "./Shoe/material/8.jpg";
import img9 from "./Shoe/material/trouserfabric.png"
import { Html } from '@react-three/drei';

export const Joggers = () => {
  const [hovered, setHovered] = useState(null);
  const group = useRef();
  const [indeximg, setIndeximg] = useState(0); // Corrected here
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("sphere_cube.glb");
  console.log("nodes:", nodes);
  const [texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9] = useLoader(TextureLoader, [img1, img2, img3, img4, img5, img6, img7, img8, img9]);
  const customMaterials = useRef([
    new THREE.MeshBasicMaterial({ map: texture1 }),
    new THREE.MeshBasicMaterial({ map: texture2 }),
    new THREE.MeshBasicMaterial({ map: texture3 }),
    new THREE.MeshBasicMaterial({ map: texture4 }),
    new THREE.MeshBasicMaterial({ map: texture5 }),
    new THREE.MeshBasicMaterial({ map: texture6 }),
    new THREE.MeshBasicMaterial({ map: texture7 }),
    new THREE.MeshBasicMaterial({ map: texture8 }),
    new THREE.MeshBasicMaterial({ map: texture9 })
  ]);



  const { camera } = useThree(); // Get access to the camera

  // Set initial camera position
  useEffect(() => {
    camera.position.y = -50; // Adjust this value to fit your scene
  }, [camera]);



  const handleMaterialChange = (index) => {
    // Update indeximg
    if (index >= 8) index = 0;
    setIndeximg(index);

  };

  return (
    <>
<Html>
  <div style={{ position: 'absolute', top: -300, left: -500, display: 'flex', flexDirection: 'row' }}>
    <div className="border-solid border-2border-[#A6A6A6] mx-2">
      <button>simgum</button>
      <button>simgum1</button>
      <button>simgum2</button>
      <button>simgum3</button>
      <button>simgum4</button>
    </div>
    <div style={{ marginTop: '10px' }}> {/* Adjust margin as needed */}
      <button className="btn" onClick={() => handleMaterialChange(indeximg + 1)}>Change Material</button>
    </div>
  </div>
</Html>

      <group
        ref={group}
        dispose={null}
        onPointerOver={(e) => (
          e.stopPropagation(), setHovered(e.object.material.name)
        )}
        onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
        onPointerMissed={() => (state.current = null)}
        onPointerDown={(e) => (
          e.stopPropagation(), (state.current = e.object.material.name)
        )}
      >
        <mesh
          material-color={snap.items.laces}
          material={customMaterials.current[indeximg]}
          geometry={nodes.Sphere.geometry}
        />
        <mesh
          material-color={snap.items.laces}
          material={customMaterials.current[8]}
          geometry={nodes.Cube.geometry}

        />



      </group>
    </>
  );
};
