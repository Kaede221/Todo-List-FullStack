import React from "react";
import TitleBar from "./components/TitleBar";
import InputBox from "./components/InputBox";

import { useState } from "react";
import TaskArea from "./components/TaskArea";

import "./App.scss";

const App = () => {
  // 成功的话 触发一下这个Trigger
  const [trigger, setTrigger] = useState(true);

  return (
    <>
      <div className="main-container">
        <TitleBar />
        <InputBox onSuccess={() => setTrigger(!trigger)} />
        <TaskArea trigger={trigger} />
      </div>
    </>
  );
};
export default App;
