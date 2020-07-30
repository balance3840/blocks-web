import React from "react";
import Spinner from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Spinner type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  );
}
