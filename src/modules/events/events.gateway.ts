import { EVENT, EVENT_SOCKET } from '@/common/constants';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketExceptionFilter } from '@/filters/ws-exception.filter';
import { SharedUrl } from '@/modules/sharedUrls/sharedUrl.entity';
import { AuthService } from '../auth/auth.service';

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
  private connectedClients: Map<number, Socket> = new Map<number, Socket>();
  constructor(private authService: AuthService) {}

  afterInit(server: Server) {
    this.server = server;
    console.log('Initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const user = await this.authService.validateToken(token);
      if (!user) {
        client.disconnect();
        return;
      }

      const userId = user.id;
      client.data.userId = userId;

      this.connectedClients.set(userId, client);
      console.log(`Client connected: ${userId}: ${user.email}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) {
      client.emit('exception', {
        status: 400,
        message: 'Invalid userId',
      });
      client.disconnect();
      return;
    }

    this.connectedClients.delete(userId);
  }

  @OnEvent(EVENT.SHARED_URL.CREATED)
  handleSharedUrlCreated(data: SharedUrl) {
    this.connectedClients.forEach((client, userId) => {
      if (userId !== data.createdBy) {
        client.emit(EVENT_SOCKET.NOTIFICATION, {
          ...data,
          type: EVENT.SHARED_URL.CREATED,
        });
      }
    });
  }
}
