"use client";

import { useEffect, useState } from "react";
import { useLoading } from "./loading-context";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Template = {
  id: number;
  status: "Verified" | "unVerified" | "Rejected";
  category: string;
  tailwind: boolean;
  previewUrl: string;
  userId: string;
  user: { nickname: string }[];
};

export default function AdminTemplatePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { show, hide } = useLoading();

  useEffect(() => {
    show();
    const fetchTemplates = async () => {
      const res = await fetch("/api/templates");
      const data = await res.json();
      setTemplates(data);
      hide();
    };
    fetchTemplates();
  }, []);

  const updateStatus = async (id: number, status: "Verified" | "Rejected") => {
    try {
      const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/status/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      console.log(res)

      setTemplates((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="pt-10 mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel — Templates</h1>
      <div className="flex flex-col gap-10">
        {templates.map((t) => (
          <div key={t.id} className="relative w-3/4 p-4">
            <Link  href={`/templates/${t.id}`} className="w-full aspect-[5/2]  flex justify-center items-center bg-[#cbcbcb] p-2 relative rounded-xl shadow" >
              <div className="relative w-full select-none pointer-events-none aspect-[5/2]">
                <Image src={t?.previewUrl}
                        alt="templatepreview"
                        fill
                        className="object-cover rounded"
                        />
              </div>
              
              </Link>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="font-semibold">{t.user[0]?.nickname}</span>{" "}
                  <span className="text-gray-500 ml-2">{t.category}</span>
                </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-yellow-500">{t.status}</span>
                <button
                  onClick={() => updateStatus(t.id, "Verified")}
                  className="border cursor-pointer border-green-500 text-green-600 rounded-md px-3 py-1 text-sm hover:bg-green-100"
                >
                  ✅ Verify
                </button>
                <button
                  onClick={() => updateStatus(t.id, "Rejected")}
                  className="border border-red-500 text-red-600 rounded-md px-3 py-1 text-sm hover:bg-red-100"
                >
                  ❌ Reject
                </button>
              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
