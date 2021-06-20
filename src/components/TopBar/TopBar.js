import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="row">
        <div className="col-sm-6">
          <div className="top-element" id="top-mail">
            <a href="mailto:shaq@americannationwide.com">
              <i className="fas fa-envelope"></i>
              <span>asifjalil0@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="top-element" id="top-phone">
            <i className="fas fa-phone-alt"></i>
            <span>+880 1719 836 117</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
