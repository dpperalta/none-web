import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ classes, clickHandle, children }) => (
    <div role="button" className="button" onClick={() => clickHandle()}>
      {children}
    </div>
  );
  
