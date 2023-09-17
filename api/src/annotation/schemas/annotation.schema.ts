import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsArray, IsNumber, IsString, Max, Min, ValidateNested, IsIn, IsOptional, IsBoolean } from 'class-validator';



export class AnnotationBody {

	@ApiProperty({
		default: '001',
		description:
			'The userId of the',
	})
	annotationType: string[];
    
}

export class UserBody {

    annotatorName: string;
    annotatorID: string;

}

export class TaskBody {

    taskName: string;
    users: string[];
    acquisition_method: string[];
    elliptical_types: string[];
    limit: number;
    annotated: object;

}


export class ListBody {

	@ApiProperty({
		default: '001',
		description:
			'The userId of the',
	})
	_id: string;

	@ApiProperty({
		default: 1,
		description:
			'The list of strings containing keywords describing a topic',
	})
    @Min(1)
	page: number;

    @ApiProperty({
		default: 6,
		description:
			'The list of strings containing keywords describing a topic',
	})
    limit: number;

    @ApiProperty({
		default: '001',
		description:
			'The userId of the',
	})
	task: string;

}