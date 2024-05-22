import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Trousers } from './Trousers';
import { Joggers } from './Joggers';
import { Teeshirt } from './Teeshirt';
import { Shorts } from './Shorts';
import { Tooltip} from 'react-tooltip';
import Slider from 'react-slick';
import backimg from "./background.png"
import halfpointedright from "./Trouser fabric/half-pointed-right.png"
import halfpointedleft from "./Trouser fabric/half-pointed-left.png"
import pointedflapleft from "./Trouser fabric/pointed-flap-left.PNG"
import pointedflapright from "./Trouser fabric/pointed-flap-right.PNG"
import standardflapleft from "./Trouser fabric/standard-flap-left.png"
import standardflapright from "./Trouser fabric/standard-flap-right.png"
import bottomcuff from "./Trouser fabric/bottom-cuff.PNG"
import bottomfrontcuff1 from "./Trouser fabric/bottom-front-cuff1.PNG"
import bottomfrontcuff2 from "./Trouser fabric/bottom-front-cuff2.PNG"
import bottompant from "./Trouser fabric/bottom-pant.PNG"
import bottomvent from "./Trouser fabric/bottom-vents.PNG"
import bottompant3 from "./Trouser fabric/bottom-pant-3.PNG"
import ticketpointhor from "./Trouser fabric/ticket-pocket-left.PNG"
import ticketpointver from "./Trouser fabric/ticket-pocket-vertical.PNG"

import nopocket from "./Trouser fabric/no-pocket.PNG"
function MainScenes() {
  const [selectedComponent, setSelectedComponent] = useState('Trousers');
  const [fabricIndex, setFabricIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState([true, false, false, false, false, false, false]);
  const [styleIndex1, setStyleIndex1] = useState([true, false]);
  const [styleIndex2, setStyleIndex2] = useState([true, false, false, false, false, false]);

  const [productType, setProductType] = useState('Trousers');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  let index = 0;

  // Function to handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setProductType(component);
  };

  function importAll(r) {
    return r.keys().map(r);
  }

  const selectFabric = (index, img) => {
    console.log('selectFabric', index);
    setFabricIndex(index);
    setImage(img)
  };
  const debounce = (func, delay) => {
    let timeoutId;
    
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  useEffect(() => {
    const handleResize = () => {
      // Your resize logic here
    };

    const debouncedHandleResize = debounce(handleResize, 100); // Adjust debounce delay as needed

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);
  const a = new Array(7).fill(false);

  const handleStyleChange = (number) => {
    console.log("number:", number);
    for (let j = 0; j < 7; j++) {
      a[j] = false;
    }
    a[number] = true;
    setStyleIndex(a);
  };
  const handleStyleChange1 = (number) => {
    console.log("number:", number);
    for (let j = 0; j < 2; j++) {
      a[j] = false;
    }
    a[number] = true;
    setStyleIndex1(a);
  };
  const handleStyleChange2 = (number) => {
    console.log("number:", number);
    for (let j = 0; j < 6; j++) {
      a[j] = false;
    }
    if(number>2){a[0]=true;}
    
    a[number] = true;
    setStyleIndex2(a);
  };

  const images = importAll(require.context('./Trouser fabric', false, /\.jpg$/));
  return (
    <div className="md:flex h-full shadow-sm shadow-white">
      {/* Canvas Container */}
      <div className="flex-grow md:w-[70%] w-[100%] md:h-[100%] h-[55%] bg-[#141720]">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
          <directionalLight
            position={[0, -1000, -1000]}
            intensity={0.1}

          />
          <directionalLight
            position={[0, 1000, 1000]}
            intensity={0.1}
          />
          <Suspense fallback={null}>
            {selectedComponent === 'Trousers' && <Trousers fabricIndex={fabricIndex} styleIndex={styleIndex}  styleIndex1={styleIndex1} styleIndex2={styleIndex2}/>}
            {selectedComponent === 'Joggers' && <Joggers />}
            {selectedComponent === 'Teeshirt' && <Teeshirt fabricIndex={fabricIndex} />}
            {selectedComponent === 'Shorts' && <Shorts fabricIndex={fabricIndex} styleIndex={styleIndex} styleIndex1={styleIndex1} styleIndex2={styleIndex2}/>}
            <Environment preset="city" />
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -0.8, 0]}
              opacity={0.25}
              width={10}
              height={10}
              blur={1.5}
              far={0.8}
            />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="md:w-[25%] w-[100%] md:h-[100%] h-[45%] overflow-hidden shadow-white shadow-lg bg-black overflow-y-auto">
        <div className="flex justify-center items-center mt-2 md:mt-12 mb-2 md:mb-12">
          <button className="justify-center glowing-btn h-[80px] w-[85%]">
            <div className='lg:flex md:flex'>
              <span className=" font-[50px]">Online</span>
              <span>Shop</span>
            </div>
          </button>
        </div>
        <div className="dropdown z-10 mt-[50px]">
          <label htmlFor="dropdown" className="dropdown-btn  opacity-80">
            <span className="flex justify-center">{productType}</span>
            <span className="arrow"></span>
          </label>
          <ul className="dropdown-content opacity-90" role="menu">
            <li><button onClick={() => handleComponentChange('Trousers')} className="w-[100%] h-5 md:h-12  text-white">Trousers</button></li>
            <li><button onClick={() => handleComponentChange('Joggers')} className="w-[100%] h-5 md:h-12 text-white">Joggers</button></li>
            <li><button onClick={() => handleComponentChange('Teeshirt')} className="w-[100%] h-5 md:h-12 text-white">Teeshirts</button></li>
            <li><button onClick={() => handleComponentChange('Shorts')} className="w-[100%] h-5 md:h-12 text-white">Shorts</button></li>
          </ul>
        </div>

        <div className="border-solid border-2 opacity-80 md:h-[180px]  shadow-white shadow-md bg-[#000000] border-[#A6A6A6] h-100 mx-5 p-5 rounded-md flex flex-col mt-[10px] md:mt-[50px]">
          <article className="text-white flex justify-center text-[20px] md:text-[28px] mb-5 mt-[-10px] md:mt-4 font-bold">FABRIC SELECTION</article>

          <div className="border-solid border-2 bg-[#1E222A] border-[#a89e9e] mx-1 rounded-md inline-flex overflow-clip overscroll-x-auto">

            {images.map((img, index) => (
              
              <button key={index} onClick={() => selectFabric(index, img)} className='h-[50px] w-[300px]' >
                <img src={img} alt={`Image ${index + 1}`} className='h-[100px] w-[100px]' />
                {console.log(index)}
              </button>
            ))}

          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />


        </div>

        <div className="flex border-solid border-2 opacity-80 shadow-white shadow-md bg-[#000000] border-[#A6A6A6] h-100 mx-5 mt-[20px] p-5 rounded-md flex-col h-[460px]">

          <article className="text-white flex items-center justify-center text-[28px] mb-5 mt-4 font-bold">Style  Option</article>
          <div className='grid grid-cols-3 grid-rows-4 items-center'>
            <div className="text-white text-[13px]" >STANDARD FLAP</div>
            <label className="container text-white" data-tooltip-id="my-tooltip-left" data-tooltip-place="top">
              Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(0)}/>
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip-left" className='opacity-100 justify-center items-center' >
            <div>
            <img src={halfpointedright} alt="Cat"  className='w-[100px]'/>
            <span >T32K2</span>
          </div>
            </Tooltip>
            <label
              className="container text-white"
              data-tooltip-id="my-tooltip-right"
              data-tooltip-place="top"
            >
              Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(1)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip-right" className="opacity-100">
              <div>
              <img src={halfpointedleft} alt="Cat"  className='w-[100px]'/>
                <span>T32K3</span>
              </div>
            </Tooltip>
            <div className="text-white text-[13px] mt-[10px]" >HALF POINTED</div>
            <label className="container text-white  mt-[10px]"  data-tooltip-id="my-htooltip-right" data-tooltip-place="top">Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(2)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-htooltip-right" className='opacity-100' >
              <div>
                <img src={pointedflapright} alt="Cat"  className='w-[100px]'/>
                <span>T32H9</span>
              </div>
            </Tooltip>
            <label className="container text-white   mt-[10px]"  data-tooltip-id="my-htooltip-left" data-tooltip-place="top">Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(3)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-htooltip-left" className='opacity-100' >
              <div>
              <img src={pointedflapleft} alt="Cat"  className='w-[100px]'/>
              <span>T32J1</span>
              </div>
            </Tooltip>
            <div className="text-white text-[13px]  mt-[10px]">POINTED FLAP</div>
            <label className="container text-white  mt-[10px]" data-tooltip-id="my-stooltip-right" data-tooltip-place="top">Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(4)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-stooltip-right" className='opacity-100' >
              <div>
              <img src={standardflapright} alt="Cat"  className='w-[100px]'/>
              <span>T32K6</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-stooltip-left" data-tooltip-place="top">Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(5)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-stooltip-left" className='opacity-100' >
              <div>
              <img src={standardflapleft} alt="Cat"  className='w-[100px]'/>
              <span>T32K7</span>
              </div>
            </Tooltip>
            <div className="text-white mt-[10px]">NO</div>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-htooltip-No" data-tooltip-place="top">NO
              <input type="radio" name="flap" onChange={() => handleStyleChange(6)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-htooltip-No" className='opacity-100' >
              <div>
              <img src={nopocket} alt="Cat"  className='w-[100px]'/>
              <span>T3200</span>
              </div>
            </Tooltip>
            <span></span>
            <div className="text-white text-[13px] mt-[10px]">TICKET POCKET</div>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-ticket-pocket-h" data-tooltip-place="top"> Horizontal
              <input type="radio" name="ticket" onChange={() => handleStyleChange1(0)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-ticket-pocket-h" className='opacity-100' >
              <div>
              <img src={ticketpointhor} alt="Cat"  className='w-[100px]'/>
              <span>Ticket Horizontal</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-ticket-pocket-v" data-tooltip-place="top">Vertical
              <input type="radio" name="ticket" onChange={() => handleStyleChange1(1)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-ticket-pocket-v" className='opacity-100' >
              <div>
              <img src={ticketpointver} alt="Cat"  className='w-[100px]'/>
              <span>Ticket Vertical</span>
              </div>
            </Tooltip>
          </div>
          <div className='grid grid-cols-4 grid-rows-2 flex items-center'>
            <div className="text-white text-[13px] mt-[10px]">BOTTOM STYLE</div>
            <label className="container text-white text-[8px] mt-[10px]" data-tooltip-id="my-bottom-vent" data-tooltip-place="top">T-3620
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(0)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-vent" className='opacity-100' >
              <div>
              <img src={bottomvent} alt="Cat" className='w-[100px]' />
              <span>T-3620</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-bottom-pant" data-tooltip-place="top">T-3621
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(1)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-pant" className='opacity-100' >
              <div>
              <img src={bottompant} alt="Cat" className='w-[100px]' />
              <span>T-3621</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-bottom-pant3" data-tooltip-place="top">T-362A
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(2)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-pant3" className='opacity-100' >
              <div>
              <img src={bottompant3} alt="Cat" className='w-[100px]' />
              <span>T-362A</span>
              </div>
            </Tooltip>
            <div className="text-white text-[13px] mt-[10px]">CUFF STYLE</div>
            <label className="container text-white text-[8px] mt-[10px]" data-tooltip-id="my-bottom-cuff" data-tooltip-place="top">T-3605
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(3)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-cuff" className='opacity-100' >
              <div>
              <img src={bottomcuff} alt="Cat" className='w-[100px]' />
              <span>T-3605</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-bottom-front1" data-tooltip-place="top">T-3606
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(4)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-front1" className='opacity-100' >
              <div>
              <img src={bottomfrontcuff1} alt="Cat" className='w-[100px]' />
              <span>T-3606</span>
              </div>
            </Tooltip>
            <label className="container text-white mt-[10px]" data-tooltip-id="my-bottom-front2" data-tooltip-place="top">T-3627
              <input type="radio" name="bottom" onChange={() => handleStyleChange2(5)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-bottom-front2" className='opacity-100' >
              <div>
              <img src={bottomfrontcuff2} alt="Cat" className='w-[100px]' />
              <span>T-3627</span>
              </div>
            </Tooltip>
          </div>
        </div>


      </div>
    </div>
  );
}

export default MainScenes;
