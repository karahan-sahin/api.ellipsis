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
    Bold,
    Badge} from '@tremor/react';

import { TrashIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';


interface Document {
    candidate_id: string,
    candidate_text: string,
}

const STATUS_MAP = {

    'STATUS_CODE_100': 'red',
    'STATUS_CODE_105': 'yellow',
    'STATUS_CODE_200': 'green',
    'STATUS_CODE_400': 'red',

}

interface Prop {

    documents: Document[],
    activeIdx: number,
    setActiveIdx: Dispatch<SetStateAction<number>>,

}

export default function DocumentBody( props: Prop ) {

    const { documents , activeIdx, setActiveIdx } = props;

    if (documents) {
        return (
            Object.values(documents).map((doc, idx) => 
            <div onClick={() => {console.log(idx); setActiveIdx(idx)}} key={idx} className="mt-4 hover:outline-1">
                <Card className='h-20 hover:outline-1 tremor-shadow-card flex row-auto justify-between'  decoration={activeIdx == idx ? 'top' : undefined}>
                    <p>{doc?.candidate_text}</p> 
                    <Badge color={STATUS_MAP[doc?.human_annotation_status]}>{doc?.human_annotation_status}</Badge>
                </Card>
                
            </div>
            )
        );}
}
