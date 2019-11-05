import React from "react";

export default ({ onClick }) => (
  <div style={{ textAlign: "center" }}>
    <a
      href="https://www.supergoteam.com/"
      title="Super Go Team"
      alt="Super Go Team"
    >
      <img
        src="https://www.supergoteam.com/images/go.png"
        width="100%"
        alt="Super Go Team Logo"
        style={{ maxWidth: "600px", minWidth: "180px" }}
        className="SGTLogo"
      />
    </a>
    {onClick && (
      <a href="#void" className="fill-button" onClick={onClick}>
        <span className="fill-button-hover">
          <span className="fill-button-text">Get Started</span>
        </span>
      </a>
    )}
  </div>
);
