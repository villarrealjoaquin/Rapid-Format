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
import { useTranslations } from "@/hooks/useTranslations";


const recentConversions = [
  {
    id: 1,
    title: "Object - JSON",
  },
  {
    id: 2,
    title: "JSON - Object",
  },
  {
    id: 3,
    title: "JSON -Interface",
  },
  {
    id: 4,
    title: "Object - Interface",
  }
];

export function AppSidebar() {
  const { t } = useTranslations();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="relative backdrop-blur-sm border-r border-purple-500/20"
    >
      <SidebarContent className="overflow-y-auto custom-scrollbar bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 text-lg font-semibold py-6 capitalize">
            {t("combinations.title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentConversions.map((conversion) => (
                <SidebarMenuItem key={conversion.id}>
                  <SidebarMenuButton
                    className="hover:bg-purple-500/10 hover:text-purple-300 transition-colors text-white"
                  >
                    <span className="text-[0.8rem]">{conversion.title}</span>
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

