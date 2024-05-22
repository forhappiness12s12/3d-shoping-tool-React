import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import state from "../state";
import { Html } from '@react-three/drei';

export const Trousers = ({ fabricIndex, styleIndex, styleIndex1, styleIndex2 }) => {
  const group = useRef();
  const inputRef = useRef();
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("pra.glb");
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 20, 35); // Adjust these values to change the camera position
    camera.lookAt(0, 20, 0); // Look at the center of the scene
    camera.fov = 65;
    camera.updateProjectionMatrix();
  }, [camera]);

  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(require.context('./Trouser fabric', false, /\.jpg$/));
  const textureLoader = new TextureLoader();

  const textures = images.map(image => {
    const texture = textureLoader.load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
  });

  const fabricmaterial = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture }));
  const texturesat = images.map(image => {
    const texture = textureLoader.load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);
    return texture;
  });

  const fabricmaterialat = texturesat.map(texture => new THREE.MeshStandardMaterial({ map: texture }));
  console.log("images:", images);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
  };

  // Use useFrame hook to rotate the group in each frame
  useFrame(({ clock }) => {
    // Adjust the rotation speed here (e.g., rotate 1 degree per second)
      group.current.rotation.y += 0.01; // Adjust the rotation speed as needed
  });

  return (
    <>
      <Html >
        <div>
          <input type="file" accept=".jpg" onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
        </div>
      </Html>
      <group ref={group}>
        <mesh castShadow receiveShadow>
        <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser004.geometry}
          />
                    <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser004_1.geometry}
          />
       <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.leftbackhalf.geometry}
            visible={styleIndex[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.rightbackhalf.geometry}
            visible={styleIndex[1]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.leftcenterback.geometry}
            visible={styleIndex[2]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.rightcenterback.geometry}
            visible={styleIndex[3]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.leftnocenterback.geometry}
            visible={styleIndex[4]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.rightnocenterback.geometry}
            visible={styleIndex[5]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ticketleft.geometry}
            visible={styleIndex1[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ticketleft001.geometry}
            visible={styleIndex1[1]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ticketright.geometry}
            visible={styleIndex1[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ticketright001.geometry}
            visible={styleIndex1[1]}
          />
           <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser003.geometry}
            visible={styleIndex2[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser003_1.geometry}
            visible={styleIndex2[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser002.geometry}
            visible={styleIndex2[1]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser002_1.geometry}
            visible={styleIndex2[1]}
          />      
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser001.geometry}
            visible={styleIndex2[2]}
          />          
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.trouser001_1.geometry}
            visible={styleIndex2[2]}
          />

          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff.geometry}
            visible={styleIndex2[3]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff_1.geometry}
            visible={styleIndex2[3]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff1.geometry}
            visible={styleIndex2[4]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff1_1.geometry}
            visible={styleIndex2[4]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff2.geometry}
            visible={styleIndex2[5]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterialat[fabricIndex]}
            geometry={nodes.cuff2_1.geometry}
            visible={styleIndex2[5]}
          />
        </mesh>
      </group>
    </>
  );
};
