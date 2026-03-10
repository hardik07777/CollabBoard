import api from "./axios";

export const createTask = ({
  listId,
  title,
}: {
  listId: string;
  title: string;
}) => api.post(`/tasks/${listId}`, { title });

export const getTasks = async (listId: string) => {
  try {
    const { data } = await api.get(`/tasks/${listId}`);
    return data; // NEVER undefined
  } catch (error) {
    console.error("Get tasks failed:", error);
    return [];                 // ALWAYS return array
  }
};


export const deleteTask = (taskId: string) =>
  api.delete(`/tasks/${taskId}`);

export const assignTaskApi = async (
  taskId: string,
  userId: string
) => {
  const { data } = await api.patch(
    `/tasks/${taskId}/assign`,
    { userId }
  );

  return data;
};

export const updateTask = (taskId: string, data: any) =>
  api.patch(`/tasks/${taskId}`, data);

export const moveTask = ({
  taskId,
  sourceListId,
  destinationListId,
  newOrder,
}: any) =>
  api.patch(`/tasks/move/${taskId}`, {
    sourceListId,
    destinationListId,
    newOrder,
  });
