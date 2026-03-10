import Board from "../models/Boards";

const boardPresence: Record<string, Set<string>> = {};

export const registerBoardSocket = (io: any, socket: any) => {

  socket.on("board:join", async (boardId: string) => {
    try {
      const board = await Board.findOne({
        _id: boardId,
        "members.user": socket.user.userId,
      });

      if (!board) {
        return socket.emit("error", "Access denied");
      }

      socket.join(boardId);

      // 🟢 Track presence
      if (!boardPresence[boardId]) {
        boardPresence[boardId] = new Set();
      }

      boardPresence[boardId].add(socket.user.userId);

      // Broadcast updated presence
      io.to(boardId).emit("board:presence", [
        ...boardPresence[boardId],
      ]);

    } catch (error) {
      socket.emit("error", "Failed to join board");
    }
  });

  socket.on("disconnect", () => {
    Object.keys(boardPresence).forEach((boardId) => {
      if (boardPresence[boardId].has(socket.user.userId)) {
        boardPresence[boardId].delete(socket.user.userId);

        io.to(boardId).emit("board:presence", [
          ...boardPresence[boardId],
        ]);
      }
    });
  });
};
