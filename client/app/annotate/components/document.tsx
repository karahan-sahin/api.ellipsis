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


interface Document {
    _id: string,
    text: string,
}

export default function DocumentBody(
    docs: { documents: Document[] }
 ) {

    const { documents } = docs

    console.log(`Retrieved docs ${documents.length}`, 'AnnotateService:DocumentBody')

    return (
        documents.map((doc) => 
        <div className="mt-8">
            <Card className='h-20'>{doc.text}</Card>
        </div>
        )
    );
}
