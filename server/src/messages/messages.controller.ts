import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get('/:id')
  getAllMessagesByChatId(
    @Param('id') userId: number,
    @Query('currentUserId') currentUserId: number,
  ) {
    return this.messagesService.getMessages(userId, currentUserId);
  }

  @Get('/chats/:id')
  getAllChatsByUserId(@Param('id') userId: number) {
    return this.messagesService.getChats(userId);
  }

  @Post('/:id')
  createMessage(@Param('id') userId: number, @Body() dto: MessageDto) {
    return this.messagesService.createMessage(userId, dto);
  }

  @Delete('/:id')
  deleteMessageById(@Param('id') id: number) {
    return this.messagesService.deleteMessage(id);
  }

  @Put('/:id')
  editMessageById(@Param('id') id: number, @Body() dto: { message_text: string }) {
    return this.messagesService.editMessage(id, dto);
  }
}
