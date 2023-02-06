import React from "react";
import { MetaverseElement } from "../../elements";

export const WalletReproduceElement = ({ endpoint, wallets }: any) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "20vh",
          flexDirection: "row",
          backgroundColor: "#1a1a1a",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#fdf" }}>SECRET RECOVERY PHRASE</h3>
          <input />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "#fdf" }}>
            <h3>PRIVATE KEY</h3>{" "}
          </div>
          <input />
        </div>
      </div>
      <MetaverseElement />
    </>
  );
};
