"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/message/QBCWIASFJ4ZVI1";

// Floating WhatsApp chat button, shown on every customer page.
export default function WhatsAppButton() {
  const pathname = usePathname();

  // Not needed in the admin panel.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile bize yazın"
      title="WhatsApp ile bize yazın"
      className="group fixed bottom-24 right-4 z-40 flex items-center gap-3 lg:bottom-6 lg:right-6"
    >
      {/* Label on desktop hover */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lg transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        WhatsApp ile yazın
      </span>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.45)] transition duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 motion-reduce:hidden" />
        <FaWhatsapp className="relative text-[30px]" />
      </span>
    </a>
  );
}
