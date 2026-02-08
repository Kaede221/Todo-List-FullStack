import type { FC } from "react";

import "./index.scss";
import { taskDeleteService, taskUpdateService } from "../../api/task";

interface IProps {
  title: string;
  done: boolean;
  id: number;
  onSuccess: () => void;
}

const Task: FC<IProps> = ({ title, done, id, onSuccess }) => {
  const handleCheck = async () => {
    await taskUpdateService({ id, title, done: !done });
    onSuccess();
  };

  const handleDelete = async () => {
    await taskDeleteService(id);
    onSuccess();
  };

  return (
    <div className="task-container" key={id}>
      <input type="checkbox" checked={done} onClick={handleCheck} />
      {title}
      <div className="delete-btn" onClick={handleDelete}>
        删除
      </div>
    </div>
  );
};

export default Task;
