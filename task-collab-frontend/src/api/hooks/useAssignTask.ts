import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignTaskApi } from "../task.api";

export const useAssignTask = (listId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      assignTaskApi(taskId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
  queryKey: ["tasks", listId],
});
    },
  });
};
