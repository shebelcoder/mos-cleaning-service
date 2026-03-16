import { prisma } from "@/lib/prisma";
import { Mail, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-16 text-center text-gray-400">
          No messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-sm border p-5 ${!msg.isRead ? "border-blue-200 border-l-4 border-l-blue-500" : "border-gray-100"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">{msg.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString("en-CA", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {!msg.isRead && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">New</span>
                )}
              </div>
              <p className="text-gray-700 mb-4">{msg.message}</p>
              <div className="flex gap-4 flex-wrap">
                <a href={`mailto:${msg.email}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  <Mail size={14} /> {msg.email}
                </a>
                {msg.phone && (
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                    <Phone size={14} /> {msg.phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
