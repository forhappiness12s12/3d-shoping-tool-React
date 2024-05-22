import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import state from "../state";
import img1 from "./Shoe/material/1.jpg"
import img2 from "./Shoe/material/2.jpg";
import img3 from "./Shoe/material/3.jpg";
import img4 from "./Shoe/material/4.jpg";
import img5 from "./Shoe/material/5.jpg";
import img6 from "./Shoe/material/6.jpg";
import img7 from "./Shoe/material/7.jpg";
import img8 from "./Shoe/material/8.jpg";
import img9 from "./Shoe/material/tro3.jpg"

export const Trousers = () => {
  const group = useRef();
  const { nodes } = useGLTF("editmodel1.glb");
  const [indeximg, setIndeximg] = useState(0);
  const snap = useSnapshot(state);
  const [texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9] = useLoader(TextureLoader, [img1, img2, img3, img4, img5, img6, img7, img8, img9]);
  const { camera } = useThree();
  const texture = useLoader(TextureLoader, img9);

  // Ensure the texture is applied without distortion
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  const customMaterials = useRef([
    new THREE.MeshBasicMaterial({ map: texture }), // Use the loaded texture
    new THREE.MeshBasicMaterial({ map: texture2 }),
    new THREE.MeshBasicMaterial({ map: texture3 }),
    new THREE.MeshBasicMaterial({ map: texture4 }),
    new THREE.MeshBasicMaterial({ map: texture5 }),
    new THREE.MeshBasicMaterial({ map: texture6 }),
    new THREE.MeshBasicMaterial({ map: texture7 }),
    new THREE.MeshBasicMaterial({ map: texture8 }),
    new THREE.MeshBasicMaterial({ map: texture9 })
  ]);

  useEffect(() => {
    camera.position.set(0, 1, 3);
  }, [camera]);

  const handleMaterialChange = (index) => {
    setIndeximg(index % 9); // Cycle through 9 materials
  };

  return (
    <>
      <Html>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <button onClick={() => handleMaterialChange(indeximg + 1)}>Change Material</button>
        </div>
      </Html>
      <group ref={group} dispose={null}>
        {Object.keys(nodes).map((key) => (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={nodes[key].geometry}
            material={customMaterials.current[indeximg]}
          />
        ))}
      </group>
    </>
  );
};