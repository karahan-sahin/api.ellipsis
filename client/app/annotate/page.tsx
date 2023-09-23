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
import { useEffect, useState } from 'react';
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
  type: string;
  grammaticality: boolean;
}

interface Document {
  _id: string;
  text: string;
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
  const [activeIdx, setActiveIdx] = useState(6);
  const [documents, setDocs] = useState<Document[]>([]);
  const [task, setTask] = useState<string | undefined>();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const user_id = '001';

  async function getDocuments(task_name: string) {
    try {
      const { data } = await axios.get(
        // process.env.API_URI ?
        `http://localhost:3012/annotation/list/?_id=${user_id}&page=${p}&limit=${l}&task=${task_name}`
        // `${process.env.API_URI}annotation/list/?_id=${user_id}&page=${p}&limit=${l}`,
      );
      return data;
    } catch (error) {
      return [];
    }
  }

  const fetch = async (task_name: string) => {
    const docs = await getDocuments(task_name);
    console.log('The documents are ', documents);
  };

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
              fetch(val);
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
                        <Badge icon={IdentificationIcon}>seed_0</Badge>
                      </div>
                      <Accordion>
                        <AccordionList>
                          <AnnotationForm {...annotations} />
                        </AccordionList>
                      </Accordion>
                      <Button className="gap-1 mt-6">
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
                    fetch(task);
                  }}
                />
                <Button
                  className="mr-3"
                  size="xs"
                  icon={ChevronLeftIcon}
                  disabled={p > 1 ? false : true}
                  onClick={() => {
                    setPage(p - 1);
                    fetch(task);
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
                    fetch(task);
                  }}
                />
                <Button
                  className="ml-3"
                  size="xs"
                  icon={ForwardIcon}
                  onClick={() => {
                    setPage(p + 1);
                    fetch(task);
                  }}
                />
              </div>
            </Card>

            <Card className="h-[calc(100vh-140px)] overflow-y-scroll">
              {documents ? (
                <DocumentBody 
                  {...documents}
                />
              ) : undefined}
            </Card>
          </Col>
        </Grid>
      )}
    </main>
  );
}
