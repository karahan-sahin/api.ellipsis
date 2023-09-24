import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsArray, IsNumber, IsString, Max, Min, ValidateNested, IsIn, IsOptional, IsBoolean } from 'class-validator';



export class AnnotationBody {

	@ApiProperty({
		default: '001',
		description:
			'The elliptical type of the annotation',
	})
	elliptical_type: string;

	@ApiProperty({
		default: '001',
		description:
			'The elliptical type of the annotation',
	})
	grammaticality: boolean;

	@ApiProperty({
		default: '001',
		description:
			'The elliptical type of the annotation',
	})
	correlate_text: string;

	@ApiProperty({
		default: '001',
		description:
			'The elliptical type of the annotation',
	})
	question: string;

	@ApiProperty({
		default: '001',
		description:
			'The elliptical type of the annotation',
	})
	span: SpanBody[];
}


export class SpanBody {
	
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


export class AnnotationPostBody {

	@ApiProperty({
		description: 'the id of user submitting annotation'
	})
	@IsString()
	user_id: string

	@ApiProperty({
		description: 'the id of user submitting annotation'
	})
	@IsString()
	task_id: string

	@ApiProperty({
		description: 'the list of annotation submitted'
	})
	@IsArray()
	annotations: AnnotationBody[];
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