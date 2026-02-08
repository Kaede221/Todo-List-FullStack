import { useEffect, useState, useCallback, type FC } from "react";
import { taskGetAllService } from "../../api/task";

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
        <div key={i.ID || i.title}>{i.title}</div>
      ))}
    </div>
  );
};

export default TaskArea;
