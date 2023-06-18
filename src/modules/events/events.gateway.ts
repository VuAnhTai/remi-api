import { EVENT, EVENT_SOCKET } from '@/common/constants';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '@/filters/ws-exception.filter';
import { SharedUrl } from '@/modules/sharedUrls/sharedUrl.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
@UsePipes(new ValidationPipe())
@UseFilters(new WebSocketExceptionFilter())
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('Initialized');
  }

  async handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected.`);
  }

  @OnEvent(EVENT.SHARED_URL.CREATED)
  handleSharedUrlCreated(data: SharedUrl) {
    this.server.sockets.emit(EVENT_SOCKET.NOTIFICATION, data);
  }
}
