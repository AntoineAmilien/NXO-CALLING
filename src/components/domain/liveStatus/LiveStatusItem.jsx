import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect, useState } from "react";

const LiveStatusItem = ({ service, accordionItemId }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`/api/nxoCallingStatusCollect/v1?serviceName=${service.serviceName}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
          {data?.statusForThisService ? (
            <>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center md:grid-cols-2 lg:grid-cols-4">
                <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
                  <dt className="text-base leading-7 text-gray-600">
                    unavailability in last 24 hours
                  </dt>
                  <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                    {data.statusForThisService.indispo.lastTwentyFourHours} min
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
                  <dt className="text-base leading-7 text-gray-600">
                    unavailability in last 30 days
                  </dt>
                  <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                    {data.statusForThisService.indispo.lastThirtyDays} min
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
                  <dt className="text-base leading-7 text-gray-600">
                    unavailability in last 365 days
                  </dt>
                  <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                    {
                      data.statusForThisService.indispo
                        .lastThreeHundredAndSixtyFiveDays
                    }
                    min
                  </dd>
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-solid p-4 rounded-xl">
                  <dt className="text-base leading-7 text-gray-600">
                    unavailability in last month
                  </dt>
                  <dd className="order-first text-lg font-semibold tracking-tight text-gray-900 lg:text-xl">
                    {data.statusForThisService.indispo.lastMonth} min
                  </dd>
                </div>
              </dl>

              <dl className="space-y-4">
                {Object.keys(data?.statusForThisService.graph).map((key) => {
                  return (
                    <GraphBar data={data?.statusForThisService.graph[key]} />
                  );
                })}
              </dl>
            </>
          ) : (
            <>Chargement...</>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default LiveStatusItem;

const GraphBar = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-7 border rounded-lg p-4 space-x-4">
        <div className="col-span-7 xl:col-span-2 text-center rounded-xl">
          <p className="text-base leading-7 text-gray-600 ">
            {data[0].service_name}
          </p>
        </div>
        <div className="col-span-7 xl:col-span-5">
          <div className="flex space-x-1 min-w-full overflow-auto justify-center xl:justify-start">
            {data.map((el, id) => {
              const hue = (el.Disponibilite / 100) * 120; // 0 représente le rouge, 120 représente le vert dans l'espace des couleurs HSL.
              const color = `hsl(${hue}, 100%, 50%)`; // Saturation et luminosité à 100%, teinte variable.
              const date = new Date(el.ts * 1000);
              return (
                <TooltipProvider
                  delayDuration={0}
                  key={"graduateBar" + el + id}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <svg
                        width="4"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg"
                        className="min-w-fit overflow-x-scroll justify-center"
                      >
                        <rect
                          width="4"
                          height="30"
                          x="0"
                          y="0"
                          fill={color}
                        ></rect>
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {date.toLocaleString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <br />
                        Indispo : {el.indispo} Maintenance : {el.maintenance}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
