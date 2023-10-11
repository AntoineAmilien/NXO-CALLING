import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const LiveStatusItem = ({ service, accordionItemId }) => {
  return (
    <AccordionItem value={accordionItemId}>
      <AccordionTrigger>
        <div className="flex">
          <p className="text-xl">{service.serviceName}</p>
          <Badge variant="success" className="ml-2">
            Up
          </Badge>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="mx-auto px-6 lg:px-8 text-center space-y-4">
          <p className="text-lg">
            Engagement de disponibilité du service NXO - {service.serviceName}
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center md:grid-cols-2 lg:grid-cols-4">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
              <dt className="text-base leading-7 text-gray-600">
                unavailability in last 24 hours
              </dt>
              <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                min
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
              <dt className="text-base leading-7 text-gray-600">
                unavailability in last 30 days
              </dt>
              <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                min
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
              <dt className="text-base leading-7 text-gray-600">
                unavailability in last 365 days
              </dt>
              <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                min
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
              <dt className="text-base leading-7 text-gray-600">
                unavailability in last month
              </dt>
              <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                min
              </dd>
            </div>
          </dl>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LiveStatusItem;
