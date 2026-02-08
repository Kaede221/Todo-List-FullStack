import request from "../utils/request";

/**
 * 获取任务列表
 * @returns
 */
export const taskGetAllService = () => request.get<ITask[]>("/tasks");

/**
 * 增加任务
 * @param title
 * @returns
 */
export const taskAddService = (title: string) =>
  request.post(
    "/tasks",
    { title },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

/**
 * 根据ID删除任务
 * @param id
 * @returns
 */
export const taskDeleteService = (id: number) =>
  request.delete("/tasks?id=" + id);

/**
 * 根据ID更新任务
 * @param data
 * @returns
 */
export const taskUpdateService = (data: {
  id: number;
  title: string;
  done: boolean;
}) => request.put("/tasks", data);
