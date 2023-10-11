import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import LiveStatusItem from "./LiveStatusItem";

const LiveStatusGlobal = ({ services }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Live status</CardTitle>
        <CardDescription>
          Live status for all services that make up nxo calling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {services.map((service, id) => {
            return (
              <LiveStatusItem
                service={service}
                key={"SERVICES_NXO_CALLING-" + id}
                accordionItemId={"SERVICES_NXO_CALLING-" + id}
              />
            );
          })}
        </Accordion>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default LiveStatusGlobal;
