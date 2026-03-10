import api from "./axios";

export const createList = (boardId: string, title: string) =>
  api.post(`/lists/${boardId}`, { title });

export const getLists = (boardId: string) =>
  api.get(`/lists/${boardId}`);
