'use client';

import { 
    Card,
    AreaChart,
    Title,
    Subtitle,
    Text,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
    AccordionList,
    Select,
    SelectItem,
    TextInput,  
    Icon} from '@tremor/react';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';


interface Annotation {
    _id: string,
    type: string,
    grammaticality: boolean,
  };
  

export default function AnnotationForm(
    annotations: Annotation[] | undefined ) {

    const ellipticalTypes = [
        'No Ellipsis',
        'Object Drop',
        'Argument Drop',
        'NP Drop',
        'Ki Expression',
        'Gapping',
        'Stripping',
        'Fragment',
        'Genitive Drop',
        'Subject Drop'
    ]

    const grammaticality = [
       true,
       false
    ]

    const [spans, setSpan] = useState([
        { value: 'Hello World!', span: { start: 2, end: 5 } }
    ])

    return (
        <div className="overflow-y-scroll overscroll-contain max-h-[calc(100vh-300px)] text-xs">
            
            <Card>
            <div className='gap-6 mb-2'>
                <Subtitle>Elliptical Type</Subtitle>
            </div>
            <Select className='gap-6 mb-5'>
                {ellipticalTypes.map((val) => <SelectItem value={val}>{val}</SelectItem>)}
            </Select>


            <div className='gap-6 mb-2'>
                <Subtitle>Correlate Text</Subtitle>
            </div>
            <TextInput defaultValue="This is the default correlate" className='gap-6 mb-5 h-10' placeholder="Add Correlate Text..." />


            <div className='gap-6 mb-2'>
                <Subtitle>Grammaticality</Subtitle>
            </div>
            <Select className='gap-6 mb-5'>
                {grammaticality.map((val) => <SelectItem value={val.toString()}>{val.toString()}</SelectItem>)}
            </Select>

            
            <div className='gap-6 mb-2'>
                <Subtitle>Span(s)</Subtitle>
            </div>
            <AccordionList className='gap-6 mb-5'>
                {spans.map((span, idx) => { 
                    return (
                    <Accordion className='gap-6 mb-5'>
                        <AccordionHeader className='flex row-auto justify-between gap-6 mb-2 h-fit'>
                        {span.value}
                        <Button className='ml-10' size="xs" icon={TrashIcon} onClick={() =>{setSpan([
                            ...spans.slice(0, idx),
                            ...spans.slice(idx + 1)
                        ])}}></Button>
                        </AccordionHeader>
                        <AccordionBody>
                            There will be a span body here
                        </AccordionBody>
                    </Accordion>
                )})}
            </AccordionList>
            <Button className='gap-6 mb-5 h-10' onClick={() => {setSpan([...spans, { value: 'Hello World!', span: { start: 2, end: 5 } }])}}>Add Span</Button>


            <div className='gap-6 mb-2'>
                <Subtitle>Question Text</Subtitle>
            </div>
            <TextInput className='gap-6 mb-5 h-10' placeholder="Add Question Text..." />


            <div className='gap-6 mb-2'>
                <Subtitle>Notes</Subtitle>
            </div>
            <TextInput className='gap-6 mb-5 h-10' placeholder="Add Notes..." />    
            

            <Button className='gap-6 mb-5 h-10'>Add Annotation</Button>

            </Card>

        </div>
    );
}
