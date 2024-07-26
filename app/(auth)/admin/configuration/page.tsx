import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {AccessControlList} from './(acl)/page';
import hasPermission from "@/hooks/use-permission-check";
import { Permissions } from "@/components/constants/user-roles";

function ConfigurationPage() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Configuration</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] px-4">
        <Tabs defaultValue="acl" className="lg:w-[70em] md:w-[50em] mx-auto">
          <TabsList>
            <TabsTrigger value="acl">Access contol list</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <div className="">
          <TabsContent value="acl"><AccessControlList /></TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
          </div>
        </Tabs>
        </div>
      </main>
  )
}

export default hasPermission(ConfigurationPage, [Permissions.ManageConfigurations]);
