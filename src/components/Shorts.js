import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { TextureLoader } from 'three';
import { useThree } from '@react-three/fiber';
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
export const Shorts = ({fabricIndex,styleIndex,styleIndex1,styleIndex2}) => {
    const [hovered, setHovered] = useState(null);
    const group = useRef();
    const [indeximg, setIndeximg] = useState(0); // Corrected here
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("pra.glb");
    
    console.log("nodes:", nodes);
    const [texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9] = useLoader(TextureLoader, [img1, img2, img3, img4, img5, img6, img7, img8, img9]);
    // Ensure the texture is applied without distortion
    texture9.wrapS = THREE.RepeatWrapping;
    texture9.wrapT = THREE.RepeatWrapping;
    texture9.repeat.set(4, 4);
    const customMaterials = useRef([
        new THREE.MeshStandardMaterial({ map: texture1 }),
        new THREE.MeshStandardMaterial({ map: texture2 }),
        new THREE.MeshStandardMaterial({ map: texture3 }),
        new THREE.MeshStandardMaterial({ map: texture4 }),
        new THREE.MeshStandardMaterial({ map: texture5 }),
        new THREE.MeshStandardMaterial({ map: texture6 }),
        new THREE.MeshStandardMaterial({ map: texture7 }),
        new THREE.MeshStandardMaterial({ map: texture8 }),
        new THREE.MeshStandardMaterial({ map: texture9 })
    ]);
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(0, 1, 50); // Adjust these values to change the camera position
      camera.lookAt(0, 0, 0); // Look at the center of the scene
      camera.fov = 75;
      camera.updateProjectionMatrix();
    }, [camera]);
    // useEffect(() => {
    //   // Zoom out by increasing the field of view (fov)
    //   camera.fov = 45; // Increase this value to zoom out
    //   camera.updateProjectionMatrix();
    // }, [camera]); // Get access to the camera
    // Set initial camera position
    const handleMaterialChange = (index) => {
        // Update indeximg
        if (index >= 8) index = 0;
        setIndeximg(index);
    };
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
      texture.repeat.set(50, 50);
      return texture;
    });
    const fabricmaterialat = texturesat.map(texture => new THREE.MeshStandardMaterial({ map: texture }));
    return (
        <>
            <group ref={group}>
        {/* {Object.keys(nodes).map((key) => (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={nodes[key].geometry}
            material={fabricmaterial[fabricIndex]}
          />
        ))}  */}
        {/* <mesh castShadow receiveShadow> */}

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