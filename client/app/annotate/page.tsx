'use client';

import { Card, Title, Text, Grid, Col, Button, Badge, Subtitle,  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel, } from "@tremor/react";
import AnnotationForm from "./components/form";
import DocumentBody from "./components/document";
import { useState } from "react";
import { IdentificationIcon } from '@heroicons/react/24/solid';


export default function AnnotationPage() {

  const [annotations, setAnnotations] = useState([])


  const docs = [
    'seed_0',
    'seed_0',
    'seed_0',
    'seed_0',
    'seed_0',
    'seed_0',
  ]

  return (
    <main >
      <Grid numItemsLg={6} className="gap-3 mt-2">
        {/* KPI sidebar */}
        <Col numColSpanLg={2} className="ml-3 h-[calc(100vh-100px)]" >
          <div className="space-y-1">
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
        <Col numColSpanLg={4} className="mt-5 mr-2">
          <Card className="h-[calc(100vh-100px)] overflow-y-scroll">
            {docs.map((doc_id) => <DocumentBody documents={docs}/>)}
          </Card>
        </Col>
      </Grid>
    </main>
  );
}