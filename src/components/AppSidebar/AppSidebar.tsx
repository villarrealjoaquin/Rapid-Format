import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


const recentConversions = [
  {
    id: 1,
    title: "Object → JSON",
  },
  {
    id: 2,
    title: "JSON → Interface",
  },
  {
    id: 3,
    title: "Object → Interface",
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="relative backdrop-blur-sm"
    >
      <SidebarContent className="overflow-y-auto custom-scrollbar bg-black border-r border-purple-700">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 text-lg font-semibold px-4 py-2">
            Conversiones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentConversions.map((conversion) => (
                <SidebarMenuItem key={conversion.id}>
                  <SidebarMenuButton
                    className="hover:bg-purple-500/10 hover:text-purple-300 transition-colors text-white"
                  >
                    <span>{conversion.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

