import messageModel from "../db/model/message";
import { create, getAll, getOne, deleteOne, update } from "./blogController";
export const addMessage = create(messageModel);
export const getAllmessage = getAll(messageModel);
export const getOneMessage = getOne(messageModel);
export const deleteOneMessage = deleteOne(messageModel);
export const updateMessage = update(messageModel);
