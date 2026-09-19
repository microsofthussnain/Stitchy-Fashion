"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Image, Mic, Paperclip, Send, Square, Volume2 } from "lucide-react";

type Message = {
  id: string;
  customerId: string | null;
  senderId: string | null;
  type: "TEXT" | "IMAGE" | "VOICE" | "ORDER";
  text: string | null;
  mediaUrl: string | null;
  createdAt: string;
  sender?: { name: string } | null;
  customer?: { fullName: string; phone: string } | null;
};

type Props = {
  mode: "customer" | "staff";
  customerId?: string;
  selectedCustomerId?: string;
  role?: "ADMIN" | "OWNER";
  customerName?: string;
  customerPhone?: string;
  onCustomerCreated?: (id: string) => void;
};

export default function ChatPanel({ mode, customerId, selectedCustomerId, role = "ADMIN", customerName, customerPhone, onCustomerCreated }: Props) {
  const activeCustomerId = mode === "customer" ? customerId : selectedCustomerId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function loadMessages() {
    const query = mode === "staff" ? "staff=true" : `customerId=${encodeURIComponent(activeCustomerId || "")}`;
    if (!activeCustomerId && mode === "customer") return;
    const response = await fetch(`/api/messages?${query}`, { cache: "no-store" });
    if (response.ok) {
      const result = await response.json();
      setMessages(result.messages);
    }
  }

  useEffect(() => {
    loadMessages();
    const timer = window.setInterval(loadMessages, 3000);
    return () => window.clearInterval(timer);
  }, [activeCustomerId, mode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    if ((!text.trim() && !file) || loading || (mode === "staff" && !activeCustomerId)) return;
    setLoading(true);
    const data = new FormData();
    if (activeCustomerId) data.set("customerId", activeCustomerId);
    if (mode === "customer" && !activeCustomerId) {
      data.set("fullName", customerName || "Website Customer");
      data.set("phone", customerPhone || "Website Chat");
    }
    if (mode === "staff") {
      data.set("staff", "true");
      data.set("role", role);
    }
    if (text.trim()) data.set("text", text.trim());
    if (file) {
      data.set("file", file);
      data.set("type", file.type.startsWith("audio/") ? "VOICE" : "IMAGE");
    }

    const response = await fetch("/api/messages", { method: "POST", body: data });
    const result = await response.json();
    if (response.ok) {
      if (mode === "customer" && !activeCustomerId && result.message.customerId) onCustomerCreated?.(result.message.customerId);
      setText("");
      setFile(null);
      await loadMessages();
    } else {
      alert(result.message || "Unable to send message.");
    }
    setLoading(false);
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Voice recording is not supported in this browser.");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
      setFile(new File([new Blob(chunks, { type: recorder.mimeType })], "voice-message.webm", { type: recorder.mimeType }));
      stream.getTracks().forEach((track) => track.stop());
    };
    recorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  if (mode === "staff" && !activeCustomerId) {
    return <div className="flex h-full items-center justify-center p-8 text-center text-neutral-500">Select a customer conversation to start chatting.</div>;
  }

  return (
    <div className="flex h-[620px] flex-col overflow-hidden rounded-[30px] bg-white shadow-xl">
      <div className="flex-1 space-y-4 overflow-y-auto bg-neutral-100 p-5">
        {messages.length === 0 && <p className="py-20 text-center text-neutral-500">No messages yet. Start the conversation.</p>}
        {messages.map((message) => {
          const mine = mode === "customer" ? !message.senderId : Boolean(message.senderId);
          return (
            <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-3xl px-4 py-3 ${mine ? "bg-black text-white" : "bg-white shadow"}`}>
                {message.customer && mode === "staff" && <p className="mb-1 text-xs font-bold opacity-60">{message.customer.fullName}</p>}
                {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                {message.type === "IMAGE" && message.mediaUrl && <img src={message.mediaUrl} alt="Customer attachment" className="mt-2 max-h-64 rounded-2xl object-contain" />}
                {message.type === "VOICE" && message.mediaUrl && <div className="mt-2 flex items-center gap-2"><Volume2 size={17} /><audio controls src={message.mediaUrl} /></div>}
                <time className="mt-1 block text-[10px] opacity-50">{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="border-t bg-white p-4">
        {file && <p className="mb-2 rounded-xl bg-neutral-100 px-3 py-2 text-sm">Attached: {file.name}</p>}
        <div className="flex items-end gap-2">
          <label title="Attach image" className="cursor-pointer rounded-full p-3 hover:bg-neutral-100"><Image size={20} /><input type="file" accept="image/*" className="hidden" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
          <label title="Attach file" className="cursor-pointer rounded-full p-3 hover:bg-neutral-100"><Paperclip size={20} /><input type="file" accept="image/*,audio/*" className="hidden" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
          <button type="button" title={recording ? "Stop recording" : "Record voice"} onClick={recording ? stopRecording : startRecording} className={`rounded-full p-3 ${recording ? "bg-red-600 text-white" : "hover:bg-neutral-100"}`}>{recording ? <Square size={20} /> : <Mic size={20} />}</button>
          <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a message..." rows={1} className="max-h-28 min-h-12 flex-1 resize-none rounded-2xl border bg-neutral-50 px-4 py-3 outline-none focus:border-black" />
          <button disabled={loading} title="Send message" className="rounded-full bg-black p-3 text-white disabled:opacity-50"><Send size={20} /></button>
        </div>
      </form>
    </div>
  );
}
