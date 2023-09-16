import { Controller, Get } from '@nestjs/common';
import { Body, Post, UsePipes, ValidationPipe, Query, Put } from '@nestjs/common';
import { AnnotationService } from '../service/annotation.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('annotation')
export class AnnotationController {

    constructor (
        private readonly annotationService: AnnotationService
    ) {}

	@ApiOperation({ description: 'Fetch candidate documents' })
    @Get('/fetch') 
    async  getDocuments ( ) {
        return 'hello'
    }


}
