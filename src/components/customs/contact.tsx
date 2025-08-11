/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { toast } from "sonner";

declare global {
  interface Window {
    grecaptcha?: any;
    onReyhanCaptcha?: (token?: string) => void;
  }
}

type ContactFormProps = {
  serviceId?: string;
  templateId?: string;
  publicKey: string; // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  siteKey: string; // NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  allowedDomain: string; // defaults to NEXT_PUBLIC_DOMAIN (e.g. "reyhanjs.com")
};

const FormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  title: z.string().trim().min(2, "Please enter a title."),
  message: z.string().trim().min(5, "Please enter a longer message."),
});
type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm({ serviceId = "service_j0mmuf4", templateId = "template_ayumu0v", publicKey, siteKey, allowedDomain }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isCaptchaDomain, setIsCaptchaDomain] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  useEffect(() => {
    setMounted(true);
    const host = window.location.hostname;
    const apex = allowedDomain.replace(/^www\./, "");
    const normalized = host.replace(/^www\./, "");
    setIsCaptchaDomain(normalized === apex); // works for reyhanjs.com and www.reyhanjs.com
    window.onReyhanCaptcha = (t?: string) => setCaptchaToken(t || "");
    return () => {
      delete window.onReyhanCaptcha;
    };
  }, [allowedDomain]);

  const captchaEnabled = mounted && isCaptchaDomain;

  function getValues(): FormValues {
    const fd = new FormData(formRef.current!);
    return {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      title: String(fd.get("title") || ""),
      message: String(fd.get("message") || ""),
    };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    // Validate
    const parsed = FormSchema.safeParse(getValues());
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      if (first) formRef.current.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});

    let token = "";
    if (captchaEnabled) {
      token = captchaToken || window.grecaptcha?.getResponse?.() || "";
      if (!token) {
        toast.error("reCAPTCHA required", {
          description: "Please complete the reCAPTCHA before sending.",
        });
        return;
      }
    }

    setSending(true);
    try {
      const v = getValues();
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: v.name,
          email: v.email,
          title: v.title,
          message: v.message,
          time: new Date().toLocaleString(),
          "g-recaptcha-response": token,
        },
        { publicKey }
      );

      formRef.current.reset();
      if (captchaEnabled) window.grecaptcha?.reset?.();
      setCaptchaToken("");
      toast.success("Message sent", {
        description: "Thanks! I will get back to you shortly.",
      });
    } catch (err: any) {
      const msg = err?.text || err?.message || (typeof err === "string" ? err : "Unknown error");
      toast.error("Send failed", {
        description: msg,
      });
    } finally {
      setSending(false);
    }
  }

  const border = (key: keyof FormValues) =>
    `w-full rounded-md bg-transparent border ${
      errors[key] ? "border-red-500 focus:border-red-400" : "border-white/30 focus:border-white/60"
    } outline-none px-3 py-2 text-white placeholder-white/40`;

  const isDisabled = sending || (captchaEnabled && !captchaToken);
  return (
    <section className="mt-6">
      {captchaEnabled && <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-6">Get in touch</h3>
      <form ref={formRef} onSubmit={onSubmit} noValidate className="bg-black/30 border border-white/20 rounded-lg p-4 sm:p-6 md:p-8 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-white text-sm mb-1">
              Name
            </label>
            <input id="name" name="name" autoComplete="name" className={border("name")} placeholder="Your name" />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-1">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" className={border("email")} placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="block text-white text-sm mb-1">
            Title
          </label>
          <input id="title" name="title" className={border("title")} placeholder="What’s this about?" />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="block text-white text-sm mb-1">
            Message
          </label>
          <textarea id="message" name="message" rows={5} className={border("message")} placeholder="Your message..." />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        {captchaEnabled && (
          <div className="mt-4 min-h-16 flex items-center">
            <div className="g-recaptcha" data-sitekey={siteKey} data-callback="onReyhanCaptcha" />
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            disabled={isDisabled}
            className="
              inline-flex items-center justify-center px-4 py-2 rounded-md shadow-lg
              text-white transition-colors
              bg-blue-600 enabled:hover:bg-blue-700
              enabled:cursor-pointer disabled:cursor-not-allowed
              disabled:bg-gray-500 disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </section>
  );
}
