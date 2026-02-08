import { useState, type FC } from "react";
import "./index.scss";
import { taskAddService } from "../../api/task";

interface IProps {
  onSuccess: () => void;
}

const InputBox: FC<IProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");

  const handleInput = (str: string) => {
    setTitle(str);
  };

  const handleKeyDown = async (key: string) => {
    if (key === "Enter") {
      await handleAddTask();
    }
  };

  const handleAddTask = async () => {
    // 发送保存的请求
    const t = title.trim();
    if (t.length === 0) return;

    await taskAddService(t);
    setTitle("");
    onSuccess();
  };

  return (
    <div className="input-box">
      <input
        value={title}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
      />
      <div
        className={"input-box_add-btn " + (title.length !== 0 ? "active" : "")}
        onClick={handleAddTask}
      >
        添加
      </div>
    </div>
  );
};

export default InputBox;
