'use client';

import { Card, Title, Text, Grid, Col, Button, Badge, Subtitle,  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel, } from "@tremor/react";
import AnnotationForm from "./components/form";
import DocumentBody from "./components/document";
import { useState } from "react";
import { IdentificationIcon, BackwardIcon, ForwardIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import axios from "axios";


interface Document {
  _id: string,
  text: string
}

export default function AnnotationPage() {

  
  const [p, setPage] = useState(1)
  const [l, setLimit] = useState(6)
  const [annotations, setAnnotations] = useState([])

  const user_id = '001';

  var docs = [
    { _id: 'seed_0', text: 'lorem ipsum' },
    { _id: 'seed_1', text: 'lorem ipsum' },
    { _id: 'seed_2', text: 'lorem ipsum' },
    { _id: 'seed_3', text: 'lorem ipsum' },
    { _id: 'seed_4', text: 'lorem ipsum' },
    { _id: 'seed_5', text: 'lorem ipsum' },
  ]

  async function getDocuments() {
    try {
      const documents: Document[] = await axios.get(
        `annotate/list/?_id:${user_id}&page=${p}&limit=${l}`,
      )
      return documents
    } catch (error) {  return [] }
  }

  const documents = getDocuments()

  return (
    <main >
      <Grid numItemsLg={6} className="gap-1 mt-2">
        {/* KPI sidebar */}
        <Col numColSpanLg={2} className="ml-3 h-[calc(100vh-90px)]" >
          <div className="space-y-0.5">
          <TabGroup>
          <TabList className="mt-1">
            <Tab>Annotate</Tab>
            <Tab>Document Information</Tab>
          </TabList>
            <TabPanels>
              <TabPanel>
                <Card>
                  <div className='flex row-auto gap-2 mb-2'>
                      <Subtitle>Document ID:</Subtitle>
                      <Badge icon={IdentificationIcon}>seed_0</Badge>
                  </div>
                  <AnnotationForm annotations={annotations}/>
                  <Button className="gap-1 mt-6">Submit Annotation(s)</Button>
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
              <Button className="mr-3" size='xs' icon={BackwardIcon} disabled={p > 1 ? false: true } onClick={() => {
                setPage(1);

              }}></Button>
              <Button className="mr-3" size='xs' icon={ChevronLeftIcon} disabled={p > 1 ? false: true } onClick={() => {
                setPage(p-1);
                
              }}></Button>
            </div>

            <Text className="p-0 align-super self-center">{(p-1) * l}-{p * l} documents from 30000</Text>

            <div className="p-0">
              <Button className="ml-3" size='xs' icon={ChevronRightIcon} onClick={() => {
                setPage(p+1);
                
              }}></Button>
              <Button className="ml-3" size='xs' icon={ForwardIcon} onClick={() => {
                setPage(p+1);
                
              }}></Button>
            </div>

          </Card>

          <Card className="h-[calc(100vh-170px)] overflow-y-scroll">
              <DocumentBody documents={docs}/>
          </Card>
        </Col>
      </Grid>
    </main>
  );
}