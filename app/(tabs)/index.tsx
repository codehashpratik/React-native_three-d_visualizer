// import { Door } from "@/components/door";
// import Trigger from "@/components/Trigger";
// import { useIsFocused } from "@react-navigation/native";
// import { Canvas, useThree } from "@react-three/fiber/native";
// import { Asset } from "expo-asset";
// import { TextureLoader } from "expo-three";
// import useControls from "r3f-native-orbitcontrols";
// import React, { Suspense, useEffect, useState } from "react";

// import { StatusBar, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { EquirectangularReflectionMapping, PMREMGenerator } from "three";
// import OverlayModal from "../../components/OverlayModal";

// const Index = () => {
//   const [OrbitControls, event] = useControls();
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(true);
//   const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
//   const envMap = Asset.fromModule(require("../../assets/images/bg.jpg")).uri;
//   const [selectedTextureInfo, setSelectedTextureInfo] = useState<
//     [number, number]
//   >([0.18, 0.55]);
//   const resolvedTextureUrl = Asset.fromModule(
//     require("../../assets/images/lami4.jpg")
//   ).uri;
//   const [selectedRoughness, setSelectedRoughness] = useState<string | null>(
//     null
//   );

//   const CustomEnvironment = ({ uri }: { uri: string }) => {
//     const { gl, scene } = useThree();
//     const [hasSetEnv, setHasSetEnv] = useState(false);

//     useEffect(() => {
//       const loader = new TextureLoader();
//       loader.load(
//         uri,
//         (texture) => {
//           texture.mapping = EquirectangularReflectionMapping;

//           const pmremGenerator = new PMREMGenerator(gl);
//           const envMap = pmremGenerator.fromEquirectangular(texture).texture;

//           scene.environment = envMap;
//           scene.background = envMap;

//           texture.dispose();
//           pmremGenerator.dispose();

//           setHasSetEnv(true);
//         },
//         undefined,
//         (err) => {
//           console.error("Error loading environment texture:", err);
//         }
//       );
//     }, [uri]);

//     return null;
//   };

//   const textures = [
//     "Woodgrain Laminate",
//     "Grain Texture",
//     "Stone Laminate",
//     "Tex Mex Laminate",
//   ];
//   const textureMap: Record<string, Asset> = {
//     "Woodgrain Laminate": Asset.fromModule(
//       require("../../assets/images/lami5.jpg")
//     ),
//     "Grain Texture": Asset.fromModule(require("../../assets/images/lami2.jpg")),
//     "Stone Laminate": Asset.fromModule(
//       require("../../assets/images/lami4.jpg")
//     ),
//     "Tex Mex Laminate": Asset.fromModule(
//       require("../../assets/images/lami6.jpg")
//     ),
//   };
//   const Roughness = ["Glossy", "Matte", "Satin Metalic"];

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "gray",
//       }}
//     >
//       <StatusBar animated barStyle={"light-content"} />

//       <View
//         style={{
//           flex: 1,
//         }}
//         {...event}
//       >
//         {/* {loading && <Loader />} */}

//         <Canvas camera={{ position: [-20, 2, 5], fov: 60 }} shadows>
//           <CustomEnvironment uri={envMap} />
//           <ambientLight intensity={0.4} />

//           <OrbitControls enablePan />
//           <directionalLight position={[1, 0, 0]} args={["white", 2]} />
//           <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
//           <directionalLight position={[0, 0, 1]} args={["white", 2]} />
//           <directionalLight position={[0, 0, -1]} args={["white", 2]} />
//           <directionalLight position={[0, 1, 0]} args={["white", 2]} />
//           <directionalLight position={[0, -1, 0]} args={["white", 2]} />
//           <Suspense fallback={<Trigger setLoading={setLoading} />}>
//             <Door
//               textureUrl={textureMap[selectedTexture ? selectedTexture : 0]}
//               roughnessMetalness={{
//                 r: selectedTextureInfo[0],
//                 m: selectedTextureInfo[1],
//               }}
//               hdrIntensity={2.5}
//               textureRepeat={[2, 2]}
//               color="#eee"
//             />
//           </Suspense>
//         </Canvas>
//         {/* {modalVisible == false && (
//           <TouchableOpacity
//             onPressIn={() => {
//               console.log("button pressed");
//               setModalVisible(true);
//             }}
//             style={{
//               height: 50,
//               width: "50%",
//               backgroundColor: "transparent",
//               position: "absolute",
//               alignSelf: "center",
//               bottom: 20,
//             }}
//           >
//             <BlurView
//               intensity={70}
//               tint="dark"
//               style={{
//                 flex: 1,
//                 borderRadius: 10,
//                 overflow: "hidden",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "white",
//                 }}
//               >
//                 Select Texture
//               </Text>
//             </BlurView>
//           </TouchableOpacity>
//         )} */}
//       </View>
//       <OverlayModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onSelectTexture={({ texture, roughnessInfo, roughnessLabel }) => {
//           setSelectedTexture(texture);
//           setSelectedTextureInfo(roughnessInfo);
//           setSelectedRoughness(roughnessLabel);
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default Index;

import { Door } from "@/components/door";
import Trigger from "@/components/Trigger";
import { Canvas, useThree } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import { TextureLoader } from "expo-three";
import useControls from "r3f-native-orbitcontrols";
import React, { Suspense, useEffect, useState } from "react";

import { BlurView } from "expo-blur";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EquirectangularReflectionMapping, PMREMGenerator } from "three";
import OverlayModal from "../../components/OverlayModal";

const Index = () => {
  const [OrbitControls, event] = useControls();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const envMap = Asset.fromModule(require("../../assets/images/bg.jpg")).uri;
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedTextureInfo, setSelectedTextureInfo] = useState<
    [number, number]
  >([0.18, 0.55]);
  const resolvedTextureUrl = Asset.fromModule(
    require("../../assets/images/lami4.jpg")
  ).uri;
  const [selectedRoughness, setSelectedRoughness] = useState<string | null>(
    null
  );

  const CustomEnvironment = ({ uri }: { uri: string }) => {
    const { gl, scene } = useThree();
    const [hasSetEnv, setHasSetEnv] = useState(false);

    useEffect(() => {
      const loader = new TextureLoader();
      loader.load(
        uri,
        (texture) => {
          texture.mapping = EquirectangularReflectionMapping;

          const pmremGenerator = new PMREMGenerator(gl);
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;

          scene.environment = envMap;
          scene.background = envMap;

          texture.dispose();
          pmremGenerator.dispose();

          setHasSetEnv(true);
        },
        undefined,
        (err) => {
          console.error("Error loading environment texture:", err);
        }
      );
    }, [uri]);

    return null;
  };

  const textures = [
    "Woodgrain Laminate",
    "Grain Texture",
    "Stone Laminate",
    "Tex Mex Laminate",
  ];
  const textureMap: Record<string, Asset> = {
    "Woodgrain Laminate": Asset.fromModule(
      require("../../assets/images/lami5.jpg")
    ),
    "Grain Texture": Asset.fromModule(require("../../assets/images/lami2.jpg")),
    "Stone Laminate": Asset.fromModule(
      require("../../assets/images/lami4.jpg")
    ),
    "Tex Mex Laminate": Asset.fromModule(
      require("../../assets/images/lami6.jpg")
    ),
  };
  const Roughness = ["Glossy", "Matte", "Satin Metalic"];

  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //     const resData = async () => {
  //       try {
  //         const response = await fetch(
  //           "http://192.168.29.57:3000/api/category",
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization:
  //                 "Bearer NEO39r3vpkpwKAJCO79CWJC8OJNLJLknkhogHOW7JHG4KJH9JH",
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         //           const response = await fetch("http://192.168.29.57:3000/api/hello", {
  //         //   method: "GET",
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //   },
  //         // });
  //         const Data = await response.json();
  //         console.log("Hey Pratik ::" + JSON.stringify(Data));
  //       } catch (error) {
  //         console.log("the fetch failed" + error);
  //       }
  //     };
  //     resData();
  //   }
  // }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "gray",
      }}
    >
      <StatusBar animated barStyle={"light-content"} />

      <View
        style={{
          flex: 1,
        }}
        {...event}
      >
        {/* {loading && <Loader />} */}

        <Canvas camera={{ position: [-20, 2, 5], fov: 60 }} shadows>
          <CustomEnvironment uri={envMap} />
          <ambientLight intensity={1} />

          <OrbitControls enablePan />
          <directionalLight position={[1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[0, 0, 1]} args={["white", 2]} />
          <directionalLight position={[0, 0, -1]} args={["white", 2]} />
          <directionalLight position={[0, 1, 0]} args={["white", 2]} />
          <directionalLight position={[0, -1, 0]} args={["white", 2]} />
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            <Door
              textureUrl={selectedImageUrl}
              roughnessMetalness={{
                r: selectedTextureInfo[0],
                m: selectedTextureInfo[1],
              }}
              hdrIntensity={2.5}
              textureRepeat={[2, 2]}
              color="#eee"
            />
          </Suspense>
        </Canvas>
        {modalVisible == false && (
          <TouchableOpacity
            onPressIn={() => {
              console.log("button pressed");
              setModalVisible(true);
            }}
            style={{
              height: 50,
              width: "50%",
              backgroundColor: "transparent",
              position: "absolute",
              alignSelf: "center",
              bottom: 20,
            }}
          >
            <BlurView
              intensity={70}
              tint="dark"
              style={{
                flex: 1,
                borderRadius: 10,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Select Texture
              </Text>
            </BlurView>
          </TouchableOpacity>
        )}
      </View>
      <OverlayModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectTexture={({ texture }) => {
          setSelectedImageUrl(texture); // texture is image URL string
        }}
      />
    </SafeAreaView>
  );
};

export default Index;
