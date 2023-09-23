import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Global()
@Module({})
export class MongoDbModule {
	static register (): DynamicModule {
		return {
			module: MongoDbModule,
			global: true,
			providers: [
				{
					provide: 'DATABASE',
					useFactory: async (): Promise<Db> => {
						try {
							if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI_NOT_FOUND');
							const client = new MongoClient(process.env.MONGODB_URI, { monitorCommands: true });
							client.on('connectionReady', () => Logger.verbose('MongoDB connection success.', 'MongoDbModule'));
							const db = client.db();
							if (!db) throw new Error('MONGODB_DB_NOT_FOUND');

							return db;
						} catch (e) {
							Logger.error('MongoDB connection failure:', e, 'MongoDbModule');
							throw new Error('MONGODB_CONNECTION_FAILURE');
						}
					},
				},
			],
			exports: ['DATABASE'],
		};
	}
}
