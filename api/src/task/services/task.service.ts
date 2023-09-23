
import { Db, WithId, ObjectId } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    constructor (
        @Inject('DATABASE') private readonly db: Db,
    ) {}


   /**
   * List documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
    async list ( task: string, user: string, page: number, limit: number ) {}


   /**
   * List documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
    async create () {}

}
