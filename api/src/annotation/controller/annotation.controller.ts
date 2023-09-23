import { Controller, Get } from '@nestjs/common';
import { 
    Body, 
    Post, 
    UsePipes, 
    ValidationPipe, 
    Query, 
    Put } from '@nestjs/common';
import { AnnotationService } from '../service/annotation.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentListQuery } from '../schemas/annotation.schema';

@ApiTags('Annotation')
@Controller('annotation')
export class AnnotationController {
    constructor (
        private readonly annotationService: AnnotationService
    ) {}

	@ApiOperation({ summary: 'Fetch candidate documents' })
    @Get('/list/') 
    async list (@Query() query: DocumentListQuery ) {
        return this.annotationService.list(query.task, query._id, parseInt(query.page), parseInt(query.limit) )
    }


}
