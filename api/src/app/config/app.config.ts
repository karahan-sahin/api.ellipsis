// import { plainToInstance } from 'class-transformer';
// import { IsNotEmpty, IsNumber, IsSemVer, IsString, Matches, validateSync } from 'class-validator';

// class EnvironmentVariables {
// 	@IsNotEmpty()
// 	@IsString()
// 	@Matches('^(production|local|development|test)$')
// 	NODE_ENV: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	NODE_OPTIONS: string;

// 	@IsNotEmpty()
// 	@IsNumber()
// 	AI_HTTP_PORT: number;

// 	@IsNotEmpty()
// 	@IsString()
// 	AI_SAGEMAKER_REGION: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	AI_SAGEMAKER_DEPLOYMENT_NAME: string;

// 	@IsNotEmpty()
// 	AI_IS_PRIMARY: string;

// 	@IsSemVer()
// 	AI_VERSION: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	AI_MONGODB_URI: string;

// 	@IsNotEmpty()
// 	@IsString()
// 	AI_REDIS_URI: string;
// }

// export function validateEnvironmentVariables (configuration: Record<string, unknown>): EnvironmentVariables {
// 	const finalConfig = plainToInstance(EnvironmentVariables, configuration, { enableImplicitConversion: true });

// 	const errors = validateSync(finalConfig, { skipMissingProperties: false });

// 	if (errors.length) throw new Error(errors.toString());

// 	return finalConfig;
// }
