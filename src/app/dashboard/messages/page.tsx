"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import { cn, timeAgo } from "@/lib/utils";
import { Send, ArrowLeft, MoreVertical, Search, FileText, Shield } from "lucide-react";

interface ChatMessage { id: string; senderId: string; content: string; createdAt: Date; }

const CONVERSATIONS = [
  {
    id: "c1", business: MOCK_BUSINESSES[3],
    counterparty: { id: "seller_4", name: "David Torres", initials: "DT" },
    lastMessage: "Can you share the last 3 years of P&L statements?",
    lastAt: new Date(Date.now() - 3600000), unread: 2,
    messages: [
      { id: "m1", senderId: "seller_4", content: "Hi, thanks for your interest in the Content Creator Network!", createdAt: new Date(Date.now() - 86400000 * 3) },
      { id: "m2", senderId: "user_1", content: "Hi David! I've been following your channel for a while. I'm seriously interested in acquiring this business.", createdAt: new Date(Date.now() - 86400000 * 3 + 3600000) },
      { id: "m3", senderId: "seller_4", content: "Absolutely! What would you like to know? I can share the teaser document right now.", createdAt: new Date(Date.now() - 86400000 * 2) },
      { id: "m4", senderId: "user_1", content: "I've signed the NDA. Can you share the last 3 years of P&L statements and the YouTube analytics dashboard?", createdAt: new Date(Date.now() - 86400000) },
      { id: "m5", senderId: "seller_4", content: "Can you share the last 3 years of P&L statements?", createdAt: new Date(Date.now() - 3600000) },
    ] as ChatMessage[],
  },
  {
    id: "c2", business: MOCK_BUSINESSES[5],
    counterparty: { id: "seller_6", name: "Robert Kim", initials: "RK" },
    lastMessage: "The NPS score of 72 is quite impressive. How many enterprise clients are on annual contracts?",
    lastAt: new Date(Date.now() - 7200000), unread: 0,
    messages: [
      { id: "m1", senderId: "user_1", content: "Hi Robert, I'm very interested in the B2B SaaS HR Platform.", createdAt: new Date(Date.now() - 172800000) },
      { id: "m2", senderId: "seller_6", content: "Great to hear! We have 85 enterprise clients, 78 of which are on annual contracts.", createdAt: new Date(Date.now() - 172800000 + 3600000) },
      { id: "m3", senderId: "user_1", content: "The NPS score of 72 is quite impressive. How many enterprise clients are on annual contracts?", createdAt: new Date(Date.now() - 7200000) },
    ] as ChatMessage[],
  },
];

const CURRENT_USER_ID = "user_1";

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(CONVERSATIONS[0].messages);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const selectConvo = (convo: typeof CONVERSATIONS[0]) => { setActiveConvo(convo); setMessages(convo.messages); };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, senderId: CURRENT_USER_ID, content: input.trim(), createdAt: new Date() }]);
    setInput("");
  };

  const filteredConvos = CONVERSATIONS.filter((c) => c.business.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.counterparty.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={{ name: "Alex Johnson", email: "alex@example.com" }} />
      <main className="flex-1 flex overflow-hidden bg-[#0a0a0a]">
        <div className="w-full sm:w-80 shrink-0 border-r border-[#1f1f1f] flex flex-col bg-[#080808]">
          <div className="p-4 border-b border-[#1f1f1f]">
            <div className="flex items-center justify-between mb-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[#737373] hover:text-white transition-colors"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>
              <h2 className="text-sm font-semibold text-white">Messages</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#737373]" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="w-full pl-8 pr-3 py-2 bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg text-xs text-white placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvos.map((convo) => (
              <button key={convo.id} onClick={() => selectConvo(convo)} className={cn("w-full flex items-start gap-3 p-4 text-left hover:bg-[#111] transition-colors border-b border-[#1f1f1f]", activeConvo.id === convo.id && "bg-[#111] border-l-2 border-indigo-500")}>
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">{convo.counterparty.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-sm font-medium text-white truncate">{convo.counterparty.name}</p>
                    <p className="text-[10px] text-[#737373] shrink-0">{timeAgo(convo.lastAt)}</p>
                  </div>
                  <p className="text-[10px] text-indigo-400 truncate mb-0.5">{convo.business.title}</p>
                  <p className="text-xs text-[#737373] truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && <span className="w-4 h-4 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0 mt-1">{convo.unread}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1f1f1f] bg-[#080808]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">{activeConvo.counterparty.initials}</div>
              <div><p className="text-sm font-semibold text-white">{activeConvo.counterparty.name}</p><p className="text-xs text-indigo-400">{activeConvo.business.title}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/listings/${activeConvo.business.slug}`}><Button variant="ghost" size="sm">View Listing</Button></Link>
              <Link href="/escrow"><Button variant="secondary" size="sm" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Escrow</Button></Link>
              <button className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-[#737373] hover:text-white transition-colors"><MoreVertical className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg, i) => {
              const isMe = msg.senderId === CURRENT_USER_ID;
              const showDate = i === 0 || new Date(messages[i - 1].createdAt).toDateString() !== new Date(msg.createdAt).toDateString();
              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px bg-[#2f2f2f]" />
                      <span className="text-[10px] text-[#737373]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      <div className="flex-1 h-px bg-[#2f2f2f]" />
                    </div>
                  )}
                  <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                    {!isMe && <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white mr-2 shrink-0 mt-auto">{activeConvo.counterparty.initials}</div>}
                    <div className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm", isMe ? "bg-indigo-600 text-white rounded-br-sm" : "bg-[#1a1a1a] border border-[#2f2f2f] text-[#a3a3a3] rounded-bl-sm")}>
                      <p className="leading-relaxed">{msg.content}</p>
                      <p className={cn("text-[10px] mt-1", isMe ? "text-indigo-200" : "text-[#737373]")}>{timeAgo(msg.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <div className="px-5 py-4 border-t border-[#1f1f1f] bg-[#080808]">
            <div className="flex items-end gap-3">
              <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#737373] hover:text-white transition-colors shrink-0"><FileText className="h-4 w-4" /></button>
              <div className="flex-1 relative">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Type a message... (Enter to send)" rows={1} className="w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none" />
              </div>
              <button onClick={sendMessage} disabled={!input.trim()} className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors shrink-0"><Send className="h-4 w-4" /></button>
            </div>
            <p className="text-[10px] text-[#737373] mt-2 text-center">Messages are end-to-end encrypted · NDA protected</p>
          </div>
        </div>
      </main>
    </div>
  );
}
