import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { Message } from "../entities/Message";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const message = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(message);

    return message;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }
}

export { ConnectionsService };
