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
    id: string,
    text: string,
    next: string[],
    prev: string[],
}

export default function DocumentBody({ 
    documents: []
 }) {

    const documents: Document[] = []

    return (
        documents.map((doc) => 
        <div className="mt-8">
            <Card className='h-20'>{doc.text}</Card>
        </div>
        )
    );
}
