"use client";

import { useState } from "react";
import { Send, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ text: string; isError: boolean } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ text: "Harap isi semua kolom wajib (*) di formulir.", isError: true });
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const newMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        message: message.trim(),
        created_at: new Date().toISOString()
      };

      const existing = localStorage.getItem("rea_messages");
      const messagesList = existing ? JSON.parse(existing) : [];
      messagesList.unshift(newMessage);
      localStorage.setItem("rea_messages", JSON.stringify(messagesList));

      // Simulate a small delay for premium UX
      await new Promise(resolve => setTimeout(resolve, 800));

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error("Failed to send contact message:", err);
      setStatus({ text: `Gagal mengirim pesan: ${err.message || "Koneksi terputus"}`, isError: true });
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-xl space-y-4 animate-scaleIn">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 animate-bounce">
          <CheckCircle size={32} />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-gray-900">Pesan Berhasil Terkirim!</h3>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-md mx-auto">
            Terimakasih telah menghubungi REACreative. Tim kami telah menerima pesan Anda dan akan segera menghubungi Anda kembali melalui WhatsApp atau Email.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Form Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#e11d2e] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d2e]" />
          <span>Kirim Pesan</span>
        </div>
        <h3 className="text-lg font-black text-gray-900 tracking-tight mt-0.5">Formulir Kontak</h3>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 placeholder:text-gray-450 focus:outline-none focus:border-brand transition-colors bg-white font-semibold"
            required
          />
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Alamat Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 placeholder:text-gray-450 focus:outline-none focus:border-brand transition-colors bg-white font-semibold"
            required
          />
        </div>

        {/* Phone input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Nomor Telepon / WhatsApp
          </label>
          <input
            type="tel"
            placeholder="Contoh: 08971302817"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 placeholder:text-gray-450 focus:outline-none focus:border-brand transition-colors bg-white font-semibold"
          />
        </div>

        {/* Message input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Detail Pesan / Kebutuhan Proyek <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Tuliskan detail kebutuhan proyek Anda di sini secara rinci..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-800 placeholder:text-gray-450 focus:outline-none focus:border-brand transition-colors bg-white resize-none font-semibold leading-relaxed"
            required
          />
        </div>

        {/* Error Alert */}
        {status?.text && (
          <div className="flex gap-2 p-3 rounded-lg border bg-red-50 border-red-150 text-red-650 text-xs font-semibold">
            <AlertTriangle size={16} className="flex-shrink-0" />
            <span>{status.text}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-[#e11d2e] hover:bg-[#c41526] hover:shadow-lg text-white font-bold text-xs py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-gray-150 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md"
        >
          {sending ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Mengirim Pesan...</span>
            </>
          ) : (
            <>
              <Send size={14} />
              <span>Kirim Pesan Sekarang</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
