'use server';

import { Inject, Injectable } from '@nestjs/common';
import { Db, WithId, ObjectId } from 'mongodb';
import { AnnotationBody, UserBody, TaskBody } from '../schemas/annotation.schema';
import { error } from 'console';
import { UserInfo } from 'os';

@Injectable()
export class AnnotationService {
    constructor (
        @Inject('DATABASE') private readonly db: Db,
    ) {}


  /**
   * List documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
    async list ( task: string, user: string, page: number, limit: number ) {
        
        try {
            const userInfo = await this.db.collection<UserBody>('users').findOne({ user_id: user }, { annotatorID: 1, annotorName: 1, password: 0 })
            const taskQuery = await this.db.collection<TaskBody>('tasks').findOne({ task_name: task }, { annotatorID: 1, annotorName: 1, password: 0 })

            return await this.db.collection('instances').aggregate([
                { $project: {
                    candidate_id: 1,
                    candidate_text: 1,
                } },
                { $match: { $and: taskQuery} },  
                { $skip: (page - 1) * limit },
                { $limit: (page - 1) * limit > taskQuery.limit ? taskQuery.limit % limit : limit },
            ])

        } catch (error) {
            return []
        }
    };


  /**
   * Annotate documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
  async annotate ( objectId: string, userId: string, annotations: AnnotationBody[] ) {

        try {
            annotations.map(async (annotationObject) => {
                const obj = await this.db.collection('instances').findOne({ candidate_id: objectId })

                if (obj!!) throw 'Object not Found'

                await this.db.collection('instances').findOneAndUpdate(
                    { candidate_id: objectId },
                    { annotaition : {  $push : annotationObject.annotationType} }
                )
            })


        } catch (error) { throw error }


  }


}
