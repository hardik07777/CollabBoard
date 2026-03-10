import jwt from "jsonwebtoken";

export const verifySocketToken = (socket: any, next: any) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.user = decoded;

    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
};
