import api from "./axios";

export const getBoards = () => api.get("/boards");

export const getBoardData = (id: string) =>
  api.get(`/boards/${id}`);
export const createBoard = (title: string) =>
  api.post("/boards", { title });

