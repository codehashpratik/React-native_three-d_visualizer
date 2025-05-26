// // import { BlurView } from "expo-blur";
// // import React from "react";
// // import { Pressable, StyleSheet, Text, View } from "react-native";

// // const OverlayModal = ({ visible, onClose }) => {
// //   if (!visible) return null;

// //   return (
// //     <View style={styles.overlayContainer} pointerEvents="box-none">
// //       <BlurView intensity={80} tint="regular" style={styles.blurOverlay}>
// //         <View style={styles.modalBox}>
// //           <Text style={styles.title}>This is a floating modal</Text>
// //           <Pressable onPress={onClose} style={styles.closeButton}>
// //             <Text style={styles.closeText}>Close</Text>
// //           </Pressable>
// //         </View>
// //       </BlurView>
// //     </View>
// //   );
// // };

// // export default OverlayModal;

// // const styles = StyleSheet.create({
// //   overlayContainer: {
// //     position: "absolute",
// //     // top: 0,
// //     bottom: -20,
// //     left: 0,
// //     right: 0,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     zIndex: 999,
// //   },
// //   blurOverlay: {
// //     width: "100%",
// //     height: 250,
// //     borderRadius: 30,
// //     borderWidth: 0.6,
// //     borderColor: "grey",
// //     overflow: "hidden", // This is the key!
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   modalBox: {
// //     // backgroundColor: "#fff",
// //     // backgroundColor: "transparent",
// //     padding: 20,
// //     // borderRadius: 10,
// //     // elevation: 5,
// //     // shadowColor: "#000",
// //     // shadowOpacity: 0.3,

// //     // shadowRadius: 5,
// //     shadowOffset: { width: 0, height: 2 },
// //     height: 250,
// //     width: "100%",
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// //   closeButton: {
// //     marginTop: 10,
// //     backgroundColor: "#007bff",
// //     padding: 10,
// //     borderRadius: 6,
// //   },
// //   closeText: {
// //     color: "white",
// //   },
// // });

// import { BlurView } from "expo-blur";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const SCREEN_HEIGHT = Dimensions.get("window").height;

// type OverlayModalProps = {
//   visible: boolean,
//   onClose: () => void,
//   onSelectTexture?: (data: {
//     texture: string,
//     roughnessInfo: [number, number],
//     roughnessLabel: string,
//   }) => void,
// };

// const OverlayModal: React.FC<OverlayModalProps> = ({
//   visible,
//   onClose,
//   onSelectTexture,
// }) => {
//   const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
//   const [isRendered, setIsRendered] = useState(visible);
//   const [selectedTexture, setSelectedTexture] = useState(null);
//   const [selectedRoughness, setSelectedRoughness] = useState(null);
//   const [selectedTextureInfo, setSelectedTextureInfo] = useState([]);

//   useEffect(() => {
//     if (selectedTexture && selectedRoughness && selectedTextureInfo.length) {
//       onSelectTexture?.({
//         texture: selectedTexture,
//         roughnessInfo: selectedTextureInfo,
//         roughnessLabel: selectedRoughness,
//       });
//     }
//   }, [selectedTexture, selectedRoughness]);

//   const textures = [
//     "Woodgrain Laminate",
//     "Grain Texture",
//     "Stone Laminate",
//     "Tex Mex Laminate",
//   ];

//   const Roughness = ["Glossy", "Matte", "Satin Metalic"];

//   useEffect(() => {
//     if (visible) {
//       setIsRendered(true);
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(slideAnim, {
//         toValue: SCREEN_HEIGHT,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setIsRendered(false));
//     }
//   }, [visible]);

//   if (!isRendered) return null;

//   return (
//     <View style={styles.overlayContainer} pointerEvents="box-none">
//       <Animated.View
//         style={[
//           styles.animatedWrapper,
//           {
//             transform: [{ translateY: slideAnim }],
//           },
//         ]}
//       >
//         <BlurView intensity={43} tint="dark" style={styles.blurOverlay}>
//           <View style={styles.modalBox}>
//             <ScrollView
//               showsHorizontalScrollIndicator={false}
//               horizontal
//               contentContainerStyle={styles.scrollRow}
//             >
//               {textures.map((item) => {
//                 const isSelected = selectedTexture === item;
//                 return (
//                   <TouchableOpacity
//                     key={item}
//                     onPress={() => setSelectedTexture(item)}
//                     style={[
//                       styles.textureButton,
//                       {
//                         backgroundColor: isSelected ? "black" : null,
//                         borderColor: isSelected ? null : "white",
//                         borderWidth: isSelected ? null : 1,
//                       },
//                     ]}
//                   >
//                     <Text style={styles.buttonText}>{item}</Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>

//             <View style={styles.roughnessContainer}>
//               {Roughness.map((item) => {
//                 const isSelected = selectedRoughness === item;
//                 return (
//                   <TouchableOpacity
//                     key={item}
//                     onPress={() => {
//                       setSelectedRoughness(item);
//                       setSelectedTextureInfo(
//                         item === "Glossy"
//                           ? [0.06, 0.5]
//                           : item === "Matte"
//                           ? [0.35, 0.88]
//                           : [0.18, 0.55]
//                       );
//                     }}
//                     style={[
//                       styles.roughnessButton,
//                       {
//                         backgroundColor: isSelected ? "black" : null,
//                         borderColor: isSelected ? null : "white",
//                         borderWidth: isSelected ? null : 1,
//                       },
//                     ]}
//                   >
//                     <Text style={styles.buttonText}>{item}</Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         </BlurView>
//       </Animated.View>
//     </View>
//   );
// };

// export default OverlayModal;

// const styles = StyleSheet.create({
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     zIndex: 999,
//   },
//   animatedWrapper: {
//     width: "100%",
//   },

//   scrollRow: {
//     paddingHorizontal: 0,
//     alignItems: "center",
//     // backgroundColor: "red",
//     // width: "100%",
//     height: 70,
//   },

//   textureButton: {
//     height: 45,
//     paddingHorizontal: 10,
//     justifyContent: "center",
//     borderRadius: 6,
//     marginHorizontal: 8,
//   },

//   roughnessContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center", // ✅ Ensures vertical alignment in row
//     marginTop: 0,
//     height: 60,
//     // backgroundColor: "yellow",
//   },

//   roughnessButton: {
//     height: 45,
//     paddingHorizontal: 10,
//     justifyContent: "center",
//     borderRadius: 6,
//     marginHorizontal: 8,
//   },

//   buttonText: {
//     color: "white",
//   },
//   blurOverlay: {
//     width: "100%",
//     height: 170,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: "hidden",
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     borderWidth: 0.6,
//     borderColor: "rgba(35, 33, 33, 0.76)",
//   },
//   modalBox: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: "#007bff",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   closeText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
type Category = {
  id: string;
  name: string;
  image: string;
};
type Laminate = {
  id: string;
  name: string;
  coverImage: string;
};
type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectTexture?: (data: { texture: string }) => void;
};
const OverlayModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectTexture,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [laminates, setLaminates] = useState<Laminate[]>([]);
  const [loadingLaminates, setLoadingLaminates] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(visible);
  // Animate modal in/out
  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsRendered(false));
    }
  }, [visible]);
  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await fetch("http://192.168.29.57:3000/api/category", {
          headers: {
            Authorization:
              "Bearer NEO39r3vpkpwKAJCO79CWJC8OJNLJLknkhogHOW7JHG4KJH9JH",
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) setSelectedCategoryId(data[0].id);
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      }
      setLoadingCategories(false);
    };
    fetchCategories();
  }, []);
  // Fetch laminates on category change
  useEffect(() => {
    if (!selectedCategoryId) {
      setLaminates([]);
      return;
    }
    const fetchLaminates = async () => {
      setLoadingLaminates(true);
      setError(null);
      try {
        const res = await fetch(
          `http://192.168.29.57:3000/api/items?category=${selectedCategoryId}`,
          {
            headers: {
              Authorization:
                "Bearer NEO39r3vpkpwKAJCO79CWJC8OJNLJLknkhogHOW7JHG4KJH9JH",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log("Laminates API response:", data);
        if (data && Array.isArray(data.laminates)) {
          setLaminates(data.laminates);
        } else {
          setError("Unexpected response structure");
          setLaminates([]);
        }
      } catch (err) {
        console.error("Failed to fetch laminates:", err);
        setError("Failed to fetch laminates: " + (err as Error).message);
        setLaminates([]);
      } finally {
        setLoadingLaminates(false);
      }
    };
    fetchLaminates();
  }, [selectedCategoryId]);
  if (!isRendered) return null;
  return (
    <>
      <View style={styles.overlayContainer} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.animatedWrapper,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <BlurView intensity={43} tint="dark" style={styles.blurOverlay}>
            <View style={styles.modalBox}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {loadingCategories ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  categories.map((cat) => {
                    const isSelected = cat.id === selectedCategoryId;
                    return (
                      <TouchableOpacity
                        key={cat.id}
                        onPress={() => setSelectedCategoryId(cat.id)}
                        style={[
                          styles.textureButton,
                          {
                            backgroundColor: isSelected
                              ? "black"
                              : "transparent",
                            borderColor: isSelected ? "black" : "white",
                            borderWidth: 1,
                          },
                        ]}
                      >
                        <Image
                          source={{
                            uri: `https://cpil-ddn-s3.s3.ap-south-1.amazonaws.com/${cat.image}`,
                          }}
                          style={{ width: 120, height: 60, borderRadius: 6 }}
                        />
                        <Text style={styles.buttonText}>{cat.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </ScrollView>
              <View style={{ height: 130, marginTop: 20 }}>
                {loadingLaminates ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <FlatList
                    data={laminates}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          onSelectTexture?.({
                            texture: `https://cpil-ddn-s3.s3.ap-south-1.amazonaws.com/${item.coverImage}`,
                          });
                        }}
                        style={{
                          width: 100,
                          marginRight: 15,
                          backgroundColor: "#222",
                          borderRadius: 8,
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: `https://cpil-ddn-s3.s3.ap-south-1.amazonaws.com/${item.coverImage}`,
                          }}
                          style={{ width: 80, height: 60, borderRadius: 6 }}
                        />
                        <Text
                          style={{
                            color: "white",
                            marginTop: 6,
                            fontSize: 12,
                            textAlign: "center",
                          }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <BlurView
          intensity={43}
          tint="dark"
          style={{
            flex: 1,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Ionicons name="close" size={32} color="white" />
        </BlurView>
      </TouchableOpacity>
    </>
  );
};
export default OverlayModal;
const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 999,
  },
  animatedWrapper: {
    width: "100%",
    position: "absolute",
  },
  blurOverlay: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.6,
    borderColor: "rgba(255,255,255,0.2)",
  },
  modalBox: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textureButton: {
    marginHorizontal: 8,
    alignItems: "center",
    borderRadius: 6,
    padding: 5,
  },
  buttonText: {
    color: "white",
    marginTop: 5,
  },
  closeButton: {
    height: 45,
    width: 45,
    backgroundColor: "transparent",
    bottom: 310,
    alignSelf: "center",
    position: "absolute",
  },
});
