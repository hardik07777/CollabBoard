import { useQuery } from "@tanstack/react-query";
import { getBoardData } from "../board.api";

export const useBoard = (id: string) =>
  useQuery({
    queryKey: ["board", id],
    queryFn: async () => (await getBoardData(id)).data,
  });
