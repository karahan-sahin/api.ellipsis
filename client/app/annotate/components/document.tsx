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
    Icon,
    Bold} from '@tremor/react';

import { TrashIcon } from '@heroicons/react/24/solid';
import { SetStateAction, useState } from 'react';


interface Document {
    candidate_id: string,
    candidate_text: string,
}

export default function DocumentBody( documents: Document[], activeIdx: int, setActiveIdx: SetStateAction ) {

    activeIdx=3
    if (documents) {

        console.log(`Retrieved docs ${JSON.stringify(documents)}`, 'AnnotateService:DocumentBody')

        return (
            Object.values(documents).map((doc, idx) => 
            <div onClick={() => {console.log(idx); setActiveIdx(idx)}} key={idx} className="mt-4 hover:outline-1">
                <Card className='h-20 hover:outline-1 tremor-shadow-card'  decoration={activeIdx == idx ? 'top' : undefined}>{doc?.candidate_text}</Card>
            </div>
            )
        );}
}
