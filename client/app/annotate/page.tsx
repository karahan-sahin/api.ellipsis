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
import { use, useEffect, useState } from 'react';
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

export default function AnnotationPage() {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/annotate')
    },
  })

  const [p, setPage] = useState(1);
  const [l, setLimit] = useState(6);
  const [task, setTask] = useState<string | undefined>();
  const [documents, setDocs] = useState<Document[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const user_id = '001';

  console.log('Fact check', annotations?.length === 0)

  async function list(task_name: string | undefined, page: int) {
    try {
      const { data } = await axios.get(
        // TODO: Fetch with env uri
        `http://localhost:3012/annotation/list/?_id=${user_id}&page=${page}&limit=${l}&task=${task_name}`
      );
      
      return data;
    } catch (error) {
      return [];
    }
  }

  async function push() {
    try {
      const { data } = await axios.post(
        // TODO: Fetch with env uri
        `http://localhost:3012/annotation/annotate/`,
        {
          user_id: user_id,
          task_name: task,
          annotations: annotations
        }
      );
    } catch (error) {
      console.log(error)
      return [];
    }
  }

  const fetch = async (task_name: string | undefined, page: int) => {
    if (task !== undefined) {
      const docs = await list(task_name, page);
      setDocs(docs)
    }
  };

  useEffect(() => {
    fetch(task, p)
  }, [])

  // TODO: Fetch from task api
  const tasks = ['First Task', 'Task 2', 'Task 3'];

  return (
    <main>
      {task === undefined ? (
        <Card className="gap-6 m-10 w-auto align-baseline">
          <Subtitle>Select task</Subtitle>
          <Select
            value={task}
            onValueChange={(val) => {
              setTask(val);
              fetch(val, p);
              console.log('Initial state at', p)
            }}
            className="gap-6"
          >
            {tasks.map((val, idx) => (
              <SelectItem key={idx} value={val}>
                {val}
              </SelectItem>
            ))}
          </Select>
        </Card>
      ) : (
        <Grid numItemsLg={6} className="gap-1 mt-2">
          {/* KPI sidebar */}
          <Col numColSpanLg={2} className="ml-3 h-[calc(100vh-20px)]">
            <div className="space-y-0.5">
              <TabGroup>
                <TabList className="mt-1">
                  <Tab>Annotate</Tab>
                  <Tab>Document Information</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Card>
                      <div className="flex row-auto gap-2 mb-2">
                        <Subtitle>Document ID:</Subtitle>
                        <Badge icon={IdentificationIcon}>{documents[activeIdx]?.candidate_id}</Badge>
                      </div>

                      <AnnotationForm 
                        {...{annotations,setAnnotations}} />
    
                      <Button onClick={push} className="gap-1 mt-6">
                        Submit Annotation(s)
                      </Button>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </Col>

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
                    console.log('Most backward at', p)
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
                    console.log('One backward at', p-1)
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
                    console.log('One forward at', p+1)
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

            <Card className="h-[calc(100vh-140px)] overflow-y-scroll">
              {documents ? (
                <DocumentBody 
                  {...{documents,activeIdx,setActiveIdx}}
                />
              ) : undefined}
            </Card>
          </Col>
        </Grid>
      )}
    </main>
  );
}
