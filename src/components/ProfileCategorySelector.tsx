import {
  GalleryHorizontal,
  LayoutDashboard,
  Square,
  Monitor,
  Megaphone,
  Layers,
  MessageSquare,
  CreditCard,
  FileText,
  Newspaper,
  Users,
  HelpCircle,
  Images,
  ListOrdered,
  BarChart2,
  SquareStack,
  LogIn,
  Mail,
  Calendar,
} from "lucide-react";
import Link from "next/link";

const Categories = [
  { name: "All", icon: GalleryHorizontal, value: "All" },
  { name: "Navbar", icon: LayoutDashboard, value: "Navbar" },
  { name: "Footer", icon: Square, value: "Footer" },
  { name: "Hero", icon: Monitor, value: "Hero" },
  { name: "CTA", icon: Megaphone, value: "CTA" },
  { name: "Features", icon: Layers, value: "Features" },
  { name: "Testimonials", icon: MessageSquare, value: "Testimonials" },
  { name: "Pricing", icon: CreditCard, value: "Pricing" },
  { name: "Forms", icon: FileText, value: "Forms" },
  { name: "Blog", icon: Newspaper, value: "Blog" },
  { name: "Team", icon: Users, value: "Team" },
  { name: "FAQ", icon: HelpCircle, value: "FAQ" },
  { name: "Gallery", icon: Images, value: "Gallery" },
  { name: "Steps", icon: ListOrdered, value: "Steps" },
  { name: "Stats", icon: BarChart2, value: "Stats" },
  { name: "Cards", icon: SquareStack, value: "Cards" },
  { name: "Login", icon: LogIn, value: "Login" },
  { name: "Contact", icon: Mail, value: "Contact" },
  { name: "Timeline", icon: Calendar, value: "Timeline" },
];



export default function ProfileCategorySelector() {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden  lg:flex flex-col h-[570px] border-b overflow-y-scroll gap-1 p-4 border-white/10 w-1/5 fixed">
        {Categories.map((category) => {
          const Icon = category.icon;
          
          return (
            <Link href={{ pathname: "/templates", query: { category: category.value } }}
              key={category.value}
              className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[14px] xl:text-lg">{category.name}</span>
            </Link>
          );
        })}
      </div>      
    </>
  );
}
