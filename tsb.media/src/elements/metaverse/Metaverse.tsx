import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { BoxElement } from "../box";

export const MetaverseElement = () => {
  return (
    <div style={{ height: "90vh", backgroundColor: "#1a1a1a" }}>
      <Canvas camera={{ position: [0, 0, 35] }}>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <BoxElement position={[0, 2, 0]} />
      </Canvas>
      <div
        style={{
          display: "flex",
          position: "absolute",
          opacity: 0.8,
          top: "10vh",
          width: "20vw",
          height: 150,
          margin: 30,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <h1
          style={{ color: "#fff", textAlign: "left", fontFamily: "Helvetica" }}
        >
          YOUR PORTAL TO THE METAVERSE...
        </h1>
      </div>
    </div>
  );
};
