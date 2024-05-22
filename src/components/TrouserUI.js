import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
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
import img9 from "./Shoe/material/tro3.jpg"
import { Html } from '@react-three/drei';

export const Trousers = ({ handleMaterialChange }) => { // Remove duplicate declaration here
  const [hovered, setHovered] = useState(null);
  const group = useRef();
  const inputRef = useRef();
  const [indeximg, setIndeximg] = useState(0);
  const snap = useSnapshot(state);
  const { nodes } = useGLTF("trousertotal.glb");
  console.log("nodes:", nodes);
  const [texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9] = useLoader(TextureLoader, [img1, img2, img3, img4, img5, img6, img7, img8, img9]);
  // Load the texture using TextureLoader
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

  const { camera } = useThree();

  // Set initial camera position
  useEffect(() => {
    camera.position.y = -50;
  }, [camera]);

  // const handleMaterialChange = (index) => {
  //   if (index >= 8) index = 0;
  //   setIndeximg(index);
  // };
  const [fabricindex, setfabricindex] = useState();
  const handleMaterialChange = (index) => {
    setfabricindex(index);
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

  // Convert textures to MeshBasicMaterial
  const fabricmaterial = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
  console.log("fabrimaterials::", fabricmaterial)

  console.log("images:", images);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Here you can save the file to the desired location, like ./trouserfabric
    console.log("Selected file:", file);
  };
  const [i, setI] = useState(0);

  const a = new Array(7).fill(false); // Initialize an array to hold visibility states, assuming you have an array named `a`
  
  const handleStyleChange = () => {
    console.log("call")
    // Increase the fabric index by one
    setI((prevI) => (prevI + 1) % 7);
    for (let j = 0; j < 7; j++) {
      a[j] = false;
    }
    a[i] = true;
    seta(a);
    console.log("a:",i,a[i])
  };
  const [ai,seta]=useState(a);
  console.log("ai:",ai)

  return (
    <>
      <Html >
        <div>
          <input type="file" accept=".jpg" onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
          <button className='button-70' onClick={() => inputRef.current.click()}>Add Fabric</button>
          <button className='button-29' onClick={handleStyleChange}>Style Change</button>
        </div>
        <div className="border-solid border-2border-[#A6A6A6] mx-2">
          <button className='button-29'>simgum1</button>
          <button className='button-29'>simgum2</button>
          <button className='button-29'>simgum3</button>
          <button className='button-29'>simgum4</button>
        </div>
        <div style={{ marginTop: '10px' }}>
          <button className="btn" onClick={() => handleMaterialChange(indeximg + 1)}>Change Material</button>
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
        <mesh castShadow receiveShadow>
          <mesh
            material-color={snap.items.laces}
            material={customMaterials.current[indeximg]}
            geometry={nodes.ATT.geometry}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.ATT_1.geometry}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.centerpocket_left.geometry}
            visible={ai[5]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.centerpocket_right.geometry}
            visible={ai[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.nocenterpocket_left.geometry}
            visible={ai[1]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.nocenterpocket_right.geometry}
            visible={ai[2]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.pocket_left.geometry}
            visible={ai[3]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricindex]}
            geometry={nodes.pocket_right.geometry}
            visible={ai[4]}
          />
        </mesh>
      </group>
    </>
  );
};
