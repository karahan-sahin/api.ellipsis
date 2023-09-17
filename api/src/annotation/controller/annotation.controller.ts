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
import { ListBody } from '../schemas/annotation.schema';

@ApiTags('Annotation')
@Controller('annotation')
export class AnnotationController {
    constructor (
        private readonly annotationService: AnnotationService
    ) {}

	@ApiOperation({ summary: 'Fetch candidate documents' })
    @Get('/list/:_id') 
    async list (@Body() body: ListBody ) {
        return this.annotationService.list(body.task, body._id, body.page, body.limit )
    }


}
