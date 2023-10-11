import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveStatusGlobal from "@/components/domain/liveStatus/LiveStatusGlobal";
import IncidentGlobal from "@/components/domain/incident/IncidentGlobal";
import MaintenanceGlobal from "@/components/domain/maintenance/MaintenanceGlobal";

const ALL_SERVICES_NXO_CALLING = [
  {
    serviceName: "Teams",
    offerName: "TEAMS-CALLING",
  },
  {
    serviceName: "Foo",
    offerName: "FOO-CALLING",
  },
  {
    serviceName: "Bar",
    offerName: "BAR-CALLING",
  },
];

export async function getServerSideProps(context) {
  var services = [];

  if (context.query.Services) {
    let servicesQuery = context.query.Services.split(",");
    servicesQuery.map((serviceQuery) => {
      for (const elService of ALL_SERVICES_NXO_CALLING) {
        if (elService.serviceName === serviceQuery) {
          services = [...services, elService];
        }
      }
    });
  } else {
    services = ALL_SERVICES_NXO_CALLING;
  }

  return { props: { services } };
}

export default function Home({ services }) {
  return (
    <>
      <div className="space-y-4 flex justify-between items-end">
        <Image
          src="/nxo-logo-214x80.png"
          width={214}
          height={80}
          alt="Picture of the author"
        />
        <p className="text-2xl font-semi-bold">NXO Calling Status Page</p>
      </div>
      <Separator className="my-4" />

      {JSON.stringify(services)}

      <Tabs defaultValue="liveStatus">
        <TabsList className="mb-4">
          <TabsTrigger value="liveStatus">Live status</TabsTrigger>
          <TabsTrigger value="incident">Incident</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="liveStatus">
          <LiveStatusGlobal services={services} />
        </TabsContent>
        <TabsContent value="incident">
          <IncidentGlobal />
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceGlobal />
        </TabsContent>
      </Tabs>
    </>
  );
}
