import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import Body from "./body"


  
  const AppLayout = () => {
    return (
      <div className="app">
        <Header/>
        <Body/>
      </div>
    );
  };
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<AppLayout />);
  