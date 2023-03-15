import messageModel from "../db/model/message"
import { sendMessage,getAllMessage} from "../controllers/messageController"
export const sendMessageService = sendMessage(messageModel)
export const getAllmessageService = getAllMessage(messageModel)


