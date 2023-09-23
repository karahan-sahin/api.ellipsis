'use server';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db, WithId, ObjectId } from 'mongodb';
import {
  AnnotationBody,
  UserBody,
  TaskBody,
  DocumentBody,
  InstanceBody,
} from '../schemas/annotation.schema';
import { error } from 'console';
import { UserInfo } from 'os';

@Injectable()
export class AnnotationService {
  constructor(@Inject('DATABASE') private readonly db: Db) {}

  /**
   * List documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
  async list(task: string, user: string, page: number, limit: number) {
    try {
      const userInfo = await this.db
        .collection<UserBody>('annotators')
        .findOne({ annotatorID: user });
      const taskQuery = await this.db
        .collection<TaskBody>('tasks')
        .findOne({ task_name: task });

      const docs = await this.db
        .collection('instances')
        .aggregate<DocumentBody>([
          // { $match: { $and: [
          //     { $in : { '$annotation.elliptical_type' : taskQuery.elliptical_types } },
          //     { $in : { '$annotation.acquisition_method' : taskQuery.acquisition_method } },
          //     { $or : [ { '$human_annotation_status' : 'STATUS_CODE_105' }, { '$human_annotation_status' : 'STATUS_CODE_100' } ]},
          // ] } },

          {
            $project: {
              candidate_id: 1,
              candidate_text: 1,
            },
          },
          { $skip: (page - 1) * limit },
          {
            $limit:
              (page - 1) * limit > taskQuery.limit
                ? taskQuery.limit % limit
                : limit,
          },
        ])
        .toArray();

      return docs;
    } catch (error) {
      return [];
    }
  }

  /**
   * Annotate documents from given task
   * @param task The page number to return.
   * @param page The page number to return.
   * @param limit The number of results to return.
   */
  async annotate(
    objectId: string,
    task_name: string,
    userId: string,
    annotations: AnnotationBody[],
  ) {
    try {
      annotations.map(async (annotationObject) => {
        const obj = await this.db
          .collection('instances')
          .findOne({ candidate_id: objectId });

        if (obj!!) throw 'Object not Found';

        await this.db
          .collection('instances')
          .findOneAndUpdate(
            { candidate_id: objectId },
            { annotation: { $push: annotationObject.annotationType } }
          );
      });

        await this.db
        .collection('tasks')
        .findOneAndUpdate(
        { task_name: task_name },
        { human_annotation_status: { $set:  ? 'STATUS_CODE_105' } }
        );



    } catch (error) {
      throw error;
    }
  }
}
