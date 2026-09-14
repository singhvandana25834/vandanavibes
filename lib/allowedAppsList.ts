import { Globe, Youtube, Calculator, MessageSquare, Bot, Book, Music, Map, Clock, Camera, PlaySquare } from "lucide-react";

export const DUMMY_APPS = [
  { id: "chrome", name: "Chrome", color: "bg-blue-500", icon: Globe, url: "googlechrome://navigate?url=google.com", fallback: "https://google.com" },
  { id: "youtube", name: "YouTube", color: "bg-red-500", icon: PlaySquare, url: "youtube://", fallback: "https://youtube.com" },
  { id: "calculator", name: "Calculator", color: "bg-emerald-500", icon: Calculator, url: "intent://#Intent;package=com.google.android.calculator;scheme=android-app;end;", fallback: "" },
  { id: "whatsapp", name: "WhatsApp", color: "bg-green-500", icon: MessageSquare, url: "whatsapp://", fallback: "https://web.whatsapp.com" },
  { id: "chatgpt", name: "ChatGPT", color: "bg-slate-800 dark:bg-slate-700", icon: Bot, url: "intent://#Intent;package=com.openai.chatgpt;scheme=android-app;end;", fallback: "https://chat.openai.com" },
  { id: "dictionary", name: "Dictionary", color: "bg-indigo-500", icon: Book, url: "intent://#Intent;package=livio.pack.lang.en_US;scheme=android-app;end;", fallback: "https://dictionary.com" },
  { id: "spotify", name: "Spotify", color: "bg-emerald-600", icon: Music, url: "spotify://", fallback: "https://spotify.com" },
  { id: "maps", name: "Maps", color: "bg-amber-500", icon: Map, url: "geo:0,0?q=", fallback: "https://maps.google.com" },
  { id: "clock", name: "Clock", color: "bg-slate-900", icon: Clock, url: "intent://#Intent;package=com.google.android.deskclock;scheme=android-app;end;", fallback: "" },
  { id: "camera", name: "Camera", color: "bg-zinc-600", icon: Camera, url: "intent://#Intent;action=android.media.action.IMAGE_CAPTURE;end;", fallback: "" },
];
