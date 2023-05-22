import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { UnreadMessage } from './models/unread-message.model';
import { MessageDto } from './dto/message.dto';
import { Op } from 'sequelize';
import { User } from 'src/users/models/users.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private readonly messagesRepository: typeof Message,
    @InjectModel(Chat) private readonly chatsRepository: typeof Chat,
    @InjectModel(UnreadMessage) private readonly unreadMessagesRepository: typeof UnreadMessage,
  ) {}

  async getMessages(id: number, currentUserId: number) {
    const chat = await this.chatsRepository.findOne({
      where: {
        [Op.or]: [
          { user1_id: id, user2_id: currentUserId },
          { user1_id: currentUserId, user2_id: id },
        ],
      },
      include: { model: Message, as: 'messages', include: [{ model: User, as: 'user' }] },
    });
    return chat?.messages;
  }

  async getChats(id: number) {
    const chats = await this.chatsRepository.findAll({
      where: { [Op.or]: { user1_id: id, user2_id: id } },
      include: [
        { model: Message, as: 'messages', include: [{ model: User, as: 'user' }] },
        { model: User, as: 'user1' },
        { model: User, as: 'user2' },
      ],
    });

    return chats;
  }

  async createMessage(id: number, dto: MessageDto) {
    const chat = await this.chatsRepository.findOne({
      where: {
        [Op.or]: [
          { user1_id: id, user2_id: dto.currentUserId },
          { user1_id: dto.currentUserId, user2_id: id },
        ],
      },
      include: [
        { model: Message, as: 'messages', include: [{ model: User, as: 'user' }] },
        { model: User, as: 'user1' },
        { model: User, as: 'user2' },
      ],
    });

    if (!chat) {
      const createdChat = await this.chatsRepository.create({
        user1_id: id,
        user2_id: dto.currentUserId,
      });

      const createdMessage = await this.messagesRepository.create({
        sender_id: dto.currentUserId,
        message_text: dto.message_text,
        chat_id: createdChat.id,
      });

      const message = await this.messagesRepository.findByPk(createdMessage.id, {
        include: { model: User, as: 'user' },
      });

      const includedChat = await this.chatsRepository.findByPk(createdChat.id, {
        include: [
          { model: Message, as: 'messages', include: [{ model: User, as: 'user' }] },
          { model: User, as: 'user1' },
          { model: User, as: 'user2' },
        ],
      });

      return {
        chat: includedChat,
        createdMessage: message,
      };
    }

    const createdMessage = await this.messagesRepository.create({
      sender_id: dto.currentUserId,
      message_text: dto.message_text,
      chat_id: chat.id,
    });

    const message = await this.messagesRepository.findByPk(createdMessage.id, {
      include: { model: User, as: 'user' },
    });

    return {
      createdMessage: message,
    };
  }

  async deleteMessage(id: number) {
    const message = await this.messagesRepository.findByPk(id);
    const deletedMessage = message?.destroy();
    return deletedMessage ? message : '';
  }

  async editMessage(id: number, dto: { message_text: string }) {
    const message = await this.messagesRepository.findByPk(id);
    return message.update(dto);
  }
}
