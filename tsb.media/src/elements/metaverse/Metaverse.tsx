import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { BoxElement } from "../box";

export const MetaverseElement = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#1a1a1a" }}>
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
          // left: "7vw",
          width: "30vw",
          height: 150,
          margin: "0px 30px 0px 60px",
          borderRadius: 15,
          justifyContent: "center",
          padding: 20,
          flexDirection: "column",
          backgroundColor: "#fff",
          alignSelf: "center",
          borderColor: "gold",
          border: "0.4rem solid silver",
        }}
      >
        <h1
          style={{
            color: "#232323",
            textAlign: "center",
            fontFamily: "Helvetica",
            fontSize: 70,
          }}
        >
          PORTAL TO METAVERSE.
        </h1>
        {/* <h4
          style={{ color: "#fff", textAlign: "left", fontFamily: "Helvetica" }}
        >
          TSB M3DIA LTD
        </h4> */}
      </div>
    </div>
  );
};
