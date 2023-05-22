import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { UnreadMessage } from './models/unread-message.model';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [SequelizeModule.forFeature([Message, Chat, UnreadMessage])],
  exports: [MessagesService],
})
export class MessagesModule {}
