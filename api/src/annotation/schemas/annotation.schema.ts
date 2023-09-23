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


export class DocumentListQuery {

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
	page: string;

    @ApiProperty({
		default: 6,
		description:
			'The list of strings containing keywords describing a topic',
	})
    limit: string;

    @ApiProperty({
		default: 'First Task',
		description:
			'The userId of the',
	})
	task: string;

}

export class DocumentBody {

	candidate_id: string;
	candidate_text: string;

}


export class InstanceBody {

	_id: string;
	candidate_id: string;
	candidate_text: string;
	previous_context: string[];
	next_context: string[];
	provenance: string;
	annotation: string[];
	acquisition_method: string;
	timestamp: string;
	parse: string;
	human_annotation_status: string;
}