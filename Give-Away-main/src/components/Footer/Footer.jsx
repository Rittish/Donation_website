import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="Footer">
      <span className="Footer-copyright">Copyright by Rocky</span>
      <div className="Footer-links">
        <a className="Footer-links__facebook" href="https:\\facebook.com"></a>
        <a className="Footer-links__instagram" href="https:\\instagram.com"></a>
      </div>
    </div>
  );
};
