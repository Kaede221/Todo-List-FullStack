import { useEffect, useState, useCallback, type FC } from "react";
import { taskGetAllService } from "../../api/task";

import Task from "../Task";

import "./index.scss";

interface IProps {
  trigger: boolean;
}

const TaskArea: FC<IProps> = ({ trigger }) => {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await taskGetAllService();
      setTaskList(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData, trigger]);

  return (
    <div className="task-area">
      {taskList.map((i) => (
        <Task
          key={i.ID}
          title={i.title}
          done={i.done}
          id={i.ID}
          onSuccess={fetchData}
        />
      ))}
    </div>
  );
};

export default TaskArea;
