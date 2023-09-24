'use client';

import {
  Card,
  Title,
  Text,
  Grid,
  Col,
  Button,
  Badge,
  Subtitle,
  TabList,
  Tab,
  Select,
  SelectItem,
  Accordion,
  AccordionBody,
  AccordionList,
  AccordionHeader,
  TabGroup,
  TabPanels,
  TabPanel
} from '@tremor/react';
import AnnotationForm from './components/form';
import { SetStateAction, useEffect, useState } from 'react';
import {
  IdentificationIcon,
  BackwardIcon,
  ForwardIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';
import axios from 'axios';
import DocumentBody from './components/document';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

interface Annotation {
  _id: string;
  annotation_type: string;
  type: string;
  grammaticality: boolean;
}

interface Document {
  candidate_id: string;
  candidate_text: string;
}

interface Prop {
    p: int,
    l: int,
    task: string,
    docs: Document[],
    setDocs: SetStateAction<Document[]>,
    setPage: SetStateAction<number>,
}

export default function NavigationComponent( props : Prop ) {


    const { data: session } = getServerSession(authOptions)

    const user_id = '001';
    const { p, l, task, docs, setDocs, setPage} = props

    return (
        <main>
            {/* Main section */}
            <Col numColSpanLg={4} className="mt-1 mr-2">
                <Card className="flex row-auto justify-between content-center mb-2.5 h-fit p-2">
                <div className="p-0">
                    <Button
                    className="mr-3"
                    size="xs"
                    icon={BackwardIcon}
                    disabled={p > 1 ? false : true}
                    onClick={() => {
                        setPage(1);
                        fetch(task, 1);
                    }}
                    />
                    <Button
                    className="mr-3"
                    size="xs"
                    icon={ChevronLeftIcon}
                    disabled={p > 1 ? false : true}
                    onClick={() => {
                        setPage(p - 1);
                        fetch(task, p-1);
                    }}
                    />
                </div>

                <Text className="p-0 align-super self-center">
                    {(p - 1) * l}-{p * l} documents from 30000
                </Text>

                <div className="p-0">
                    <Button
                    className="ml-3"
                    size="xs"
                    icon={ChevronRightIcon}
                    onClick={() => {
                        setPage(p + 1);
                        fetch(task, p+1);
                    }}
                    />
                    <Button
                    className="ml-3"
                    size="xs"
                    icon={ForwardIcon}
                    onClick={() => {
                        setPage(p + 1);
                        fetch(task, p+1);
                    }}
                    />
                </div>
                </Card>
        </main>
    );
    }
