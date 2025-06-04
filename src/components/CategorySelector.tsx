"use client";

import { useState } from "react";
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
import clsx from "clsx";

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

type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export default function CategorySelector({ selected, setSelected }: Props) {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex flex-col h-[460px] border-b overflow-y-scroll gap-1 p-4 border-white/40 w-5/6">
        {Categories.map((category) => {
          const Icon = category.icon;
          const isActive = selected === category.value;

          return (
            <button
              key={category.value}
              onClick={() => setSelected(category.value)}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-lg">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile version */}
      <div className="block md:hidden py-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-9/12 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20"
        >
          {Categories.map((category) => (
            <option className="bg-[#101010] " key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
