import { Types } from "mongoose";   

export const getMember = (board: any, userId: string) => {
  return board.members.find(
    (m: any) => m.user.toString() === userId
  );
};

export const canViewBoard = (board: any, userId: string) => {
  return !!getMember(board, userId);
};

export const canInvite = (board: any, userId: string) => {
  const member = getMember(board, userId);
  return member && (member.role === "owner" || member.role === "admin");
};

export const canDeleteBoard = (board: any, userId: string) => {
  return board.owner.toString() === userId;
};

export const canManageLists = (board: any, userId: string) => {
  const member = getMember(board, userId);
  return member && member.role !== "member";
};  