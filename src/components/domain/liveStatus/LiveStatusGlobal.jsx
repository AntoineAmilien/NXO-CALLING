import React from "react";

const LiveStatusGlobal = ({ services }) => {
  return (
    <div>
      Live status for all services that make up nxo calling.
      <br />
      {services}
    </div>
  );
};

export default LiveStatusGlobal;
