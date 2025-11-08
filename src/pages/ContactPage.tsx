import { useState } from "react";
import { Mail, MessageSquare, User, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface ContactPageProps {
  user?: {
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  } | null;
  onNavigate: (page: string) => void;
}

export default function ContactPage({ user, onNavigate }: ContactPageProps) {
  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: name || "Anonymous User",
          email: email || "guest",
          message,
        },
      ]);

      if (error) throw error;

      toast.success("Message sent successfully! 🎉");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004d26] to-[#1a7735] dark:from-gray-900 dark:to-gray-800 p-6 transition-colors">
      {/* 🌿 Floating Back Button */}
      <motion.button
        onClick={() => onNavigate("home")}
        className="fixed top-6 left-6 bg-white dark:bg-gray-800 text-[#004d26] dark:text-[#00ff99] px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 font-semibold hover:scale-105 hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </motion.button>

      {/* ✉️ Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#004d26] dark:text-[#00ff99]">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Have questions, feedback, or ideas? We’d love to hear from you!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!user?.user_metadata?.full_name}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#004d26] dark:focus:ring-[#00ff99] outline-none ${
                  user?.user_metadata?.full_name
                    ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!user?.email}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#004d26] dark:focus:ring-[#00ff99] outline-none ${
                  user?.email ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#004d26] dark:focus:ring-[#00ff99] outline-none min-h-[120px]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-[#003d1f] dark:hover:bg-[#00cc80] transition-all disabled:opacity-50 shadow-md"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
