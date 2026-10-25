"use client";

import React, { useState, useRef, useMemo } from "react";
import type { EnquiryInput, ServiceOption, BudgetOption } from "@/lib/types";
import {
  getCountryList,
  validateName,
  validateEmail,
  validatePhone,
  validateService,
  validateBudget,
  validateMessage,
  countWords,
  VALID_SERVICES,
  VALID_BUDGETS,
} from "@/lib/validation";
import Reveal from "./Reveal";

export default function EnquiryForm() {
  const countryOptions = useMemo(() => getCountryList(), []);

  const [formData, setFormData] = useState<EnquiryInput>({
    name: "",
    email: "",
    country: "IN",
    phone: "",
    service: "Website or web app",
    budget: "Not sure yet",
    message: "",
    honeypot: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  // Refs for focusing first invalid field on failed submit
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const serviceSelectRef = useRef<HTMLSelectElement>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Live word and character counting for message
  const wordCount = useMemo(() => countWords(formData.message), [formData.message]);
  const charCount = formData.message.length;

  const hasError = (field: string) => Boolean(touched[field] && fieldErrors[field]);

  // Single field validation for blur and change
  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name": {
        const res = validateName(value);
        return res.valid ? undefined : res.error;
      }
      case "email": {
        const res = validateEmail(value);
        if (res.valid) {
          setEmailSuggestion(res.suggestion || null);
          return undefined;
        }
        setEmailSuggestion(null);
        return res.error;
      }
      case "phone": {
        const res = validatePhone(value, formData.country || "IN");
        return res.valid ? undefined : res.error;
      }
      case "service": {
        const res = validateService(value);
        return res.valid ? undefined : res.error;
      }
      case "budget": {
        const res = validateBudget(value);
        return res.valid ? undefined : res.error;
      }
      case "message": {
        const res = validateMessage(value);
        return res.valid ? undefined : res.error;
      }
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = (formData as unknown as Record<string, string>)[field] || "";
    const error = validateField(field, val);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const validateAll = (): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validateField("phone", formData.phone || "");
    if (phoneErr) errors.phone = phoneErr;

    const serviceErr = validateField("service", formData.service);
    if (serviceErr) errors.service = serviceErr;

    const budgetErr = validateField("budget", formData.budget || "");
    if (budgetErr) errors.budget = budgetErr;

    const messageErr = validateField("message", formData.message);
    if (messageErr) errors.message = messageErr;

    return { valid: Object.keys(errors).length === 0, errors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      budget: true,
      message: true,
    });

    const { valid, errors } = validateAll();
    setFieldErrors(errors);

    if (!valid) {
      // Focus the first invalid field
      if (errors.name) {
        nameInputRef.current?.focus();
      } else if (errors.email) {
        emailInputRef.current?.focus();
      } else if (errors.phone) {
        phoneInputRef.current?.focus();
      } else if (errors.service) {
        serviceSelectRef.current?.focus();
      } else if (errors.message) {
        messageTextareaRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus("error");
        setServerMessage(
          data.error || "Unable to send your project details. Please try again or email contact@migsak.com."
        );
        if (data.errors) {
          setFieldErrors(data.errors);
          // Focus the first field returned with an error
          const firstKey = Object.keys(data.errors)[0];
          if (firstKey === "name") nameInputRef.current?.focus();
          else if (firstKey === "email") emailInputRef.current?.focus();
          else if (firstKey === "phone") phoneInputRef.current?.focus();
          else if (firstKey === "service") serviceSelectRef.current?.focus();
          else if (firstKey === "message") messageTextareaRef.current?.focus();
        }
        setIsSubmitting(false);
        return;
      }

      setSubmitStatus("success");
      setServerMessage(
        data.message || "Thank you! We have received your project details and will reply within one working day."
      );
      setFormData({
        name: "",
        email: "",
        country: "IN",
        phone: "",
        service: "Website or web app",
        budget: "Not sure yet",
        message: "",
        honeypot: "",
      });
      setTouched({});
      setFieldErrors({});
      setEmailSuggestion(null);
    } catch {
      setSubmitStatus("error");
      setServerMessage("A network error occurred. Please try again or email us directly at contact@migsak.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyEmailSuggestion = () => {
    if (emailSuggestion) {
      setFormData((prev) => ({ ...prev, email: emailSuggestion }));
      setEmailSuggestion(null);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  };

  return (
    <section id="enquiry" className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] glow-section blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section Header with Pill Badge and Side Lines */}
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span
                className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/50"
                aria-hidden="true"
              />
              <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-950/40 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-violet-300">
                Start a project
              </span>
              <span
                className="h-px w-8 bg-gradient-to-l from-transparent to-violet-400/50"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-100 to-violet-200 bg-clip-text text-transparent">
                Start a Project
              </span>
            </h2>
            <p className="mt-4 text-base text-[#A8B3CF] leading-relaxed">
              Tell us about what you want to build. We reply to every message within one working day.
            </p>
          </Reveal>

          <Reveal delayMs={80} className="mt-12">
            <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-8 md:p-10 shadow-2xl">
              {submitStatus === "success" ? (
                <div role="status" className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-4 shadow-[0_0_16px_rgba(139,92,246,0.3)]">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Enquiry Received
                  </h3>
                  <p className="mt-2 text-base text-[#A8B3CF] max-w-md mx-auto leading-relaxed">
                    {serverMessage}
                  </p>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="btn-secondary inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold tracking-wide"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot field for bot protection (visually hidden) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company-fax">Leave this field blank</label>
                    <input
                      type="text"
                      id="company-fax"
                      name="company-fax"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-3"
                    >
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <span>{serverMessage}</span>
                        <div className="mt-1">
                          <a href="mailto:contact@migsak.com" className="font-semibold text-white underline">
                            Send email directly to contact@migsak.com
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1. Name & Email Row (Mobile: single col; sm+: 2 cols) */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Your Name <span className="text-xs font-semibold text-violet-300 ml-1">(required)</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="enquiry-name"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (fieldErrors.name) {
                            const err = validateField("name", e.target.value);
                            setFieldErrors((prev) => ({ ...prev, name: err || "" }));
                          }
                        }}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Rahul Sharma"
                        aria-invalid={hasError("name")}
                        aria-describedby={hasError("name") ? "name-error" : undefined}
                        className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white placeholder-[#7E8BA8] focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                      />
                      {hasError("name") && (
                        <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Email Address <span className="text-xs font-semibold text-violet-300 ml-1">(required)</span>
                      </label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        id="enquiry-email"
                        name="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (fieldErrors.email) {
                            const err = validateField("email", e.target.value);
                            setFieldErrors((prev) => ({ ...prev, email: err || "" }));
                          }
                        }}
                        onBlur={() => handleBlur("email")}
                        placeholder="e.g. rahul@company.com"
                        aria-invalid={hasError("email")}
                        aria-describedby={hasError("email") ? "email-error" : undefined}
                        className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white placeholder-[#7E8BA8] focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                      />
                      {hasError("email") && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {fieldErrors.email}
                        </p>
                      )}
                      {emailSuggestion && !hasError("email") && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-violet-300">
                          <span>Did you mean <strong>{emailSuggestion}</strong>?</span>
                          <button
                            type="button"
                            onClick={applyEmailSuggestion}
                            className="font-semibold underline hover:text-white transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Country & Phone Row (Mobile: single col; sm+: 2 cols) */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-country"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Country <span className="text-xs font-normal text-[#7E8BA8]">(for phone dialing code)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="enquiry-country"
                          name="country"
                          autoComplete="country"
                          value={formData.country}
                          suppressHydrationWarning
                          onChange={(e) => {
                            const newCountry = e.target.value;
                            setFormData((prev) => ({ ...prev, country: newCountry }));
                            if (formData.phone) {
                              const err = validatePhone(formData.phone, newCountry);
                              setFieldErrors((prev) => ({ ...prev, phone: err.valid ? "" : (err.error || "") }));
                            }
                          }}
                          className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                        >
                          {countryOptions.map((c) => (
                            <option
                              key={c.code}
                              value={c.code}
                              className="bg-[#090e24] text-white"
                              suppressHydrationWarning
                            >
                              {c.flag} {c.name} ({c.dialCode})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Phone Number <span className="text-xs font-normal text-[#7E8BA8]">(Optional)</span>
                      </label>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        id="enquiry-phone"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, phone: e.target.value }));
                          if (fieldErrors.phone) {
                            const err = validatePhone(e.target.value, formData.country || "IN");
                            setFieldErrors((prev) => ({ ...prev, phone: err.valid ? "" : (err.error || "") }));
                          }
                        }}
                        onBlur={() => handleBlur("phone")}
                        placeholder="e.g. 98765 43210"
                        aria-invalid={hasError("phone")}
                        aria-describedby={hasError("phone") ? "phone-error" : undefined}
                        className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white placeholder-[#7E8BA8] focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                      />
                      {hasError("phone") && (
                        <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 3. Service & Budget Row */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-service"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Service Needed <span className="text-xs font-semibold text-violet-300 ml-1">(required)</span>
                      </label>
                      <select
                        ref={serviceSelectRef}
                        id="enquiry-service"
                        name="service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, service: e.target.value as ServiceOption }));
                          if (fieldErrors.service) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.service;
                              return next;
                            });
                          }
                        }}
                        className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                      >
                        {VALID_SERVICES.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#090e24] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {hasError("service") && (
                        <p role="alert" className="mt-1.5 text-xs text-red-400">
                          {fieldErrors.service}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-budget"
                        className="block text-sm font-semibold text-white mb-2"
                      >
                        Rough Budget <span className="text-xs font-normal text-[#7E8BA8]">(Optional)</span>
                      </label>
                      <select
                        id="enquiry-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, budget: e.target.value as BudgetOption }));
                        }}
                        className="w-full min-h-[44px] h-11 px-4 rounded-xl border border-white/10 bg-[#090e24] text-white focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm transition-all"
                      >
                        {VALID_BUDGETS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#090e24] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1.5 text-xs text-[#A8B3CF]">
                        Pricing is a fixed quote after the first call. Any budget: we can start with a single feature.
                      </p>
                    </div>
                  </div>

                  {/* 4. Project Message Textarea with Live Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="enquiry-message"
                        className="block text-sm font-semibold text-white"
                      >
                        Project Description <span className="text-xs font-semibold text-violet-300 ml-1">(required)</span>
                      </label>

                      {/* Live Counter (turns amber at 90% [900 words], red over 1000 words or 8000 chars) */}
                      <span
                        className={`text-xs font-mono transition-colors ${
                          wordCount > 1000 || charCount > 8000
                            ? "text-red-400 font-bold"
                            : wordCount >= 900
                            ? "text-amber-400 font-semibold"
                            : "text-[#7E8BA8]"
                        }`}
                        aria-live="polite"
                      >
                        {wordCount} / 1000 words ({charCount} / 8000 chars)
                      </span>
                    </div>

                    <textarea
                      ref={messageTextareaRef}
                      id="enquiry-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, message: e.target.value }));
                        if (fieldErrors.message) {
                          const err = validateField("message", e.target.value);
                          setFieldErrors((prev) => ({ ...prev, message: err || "" }));
                        }
                      }}
                      onBlur={() => handleBlur("message")}
                      placeholder="Tell us what problem you want to solve, what screens or systems are involved, and any specific tools to connect (minimum 10 characters)."
                      aria-invalid={hasError("message")}
                      aria-describedby={hasError("message") ? "message-error" : undefined}
                      className="w-full p-4 rounded-xl border border-white/10 bg-[#090e24] text-white placeholder-[#7E8BA8] focus-visible:outline-none focus-visible:border-violet-400 focus-visible:ring-2 focus-visible:ring-violet-400/20 text-[16px] sm:text-sm leading-relaxed resize-y min-h-[120px] transition-all"
                    />
                    {hasError("message") && (
                      <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group btn-primary w-full sm:w-auto min-w-[220px] min-h-[44px] h-12 px-8 rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c1d] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending Project Details...
                        </span>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
