import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import type { EnquiryRecord } from "@/lib/types";
import { getCountryFlag } from "@/lib/validation";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

function formatIST(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return (
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(d) + " IST"
    );
  } catch {
    return isoDate;
  }
}

export default async function AdminEnquiriesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifySessionToken(token);

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  let enquiries: EnquiryRecord[] = [];
  let dbError: string | null = null;
  const isConfigured = isSupabaseConfigured();

  if (isConfigured) {
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      dbError = error.message;
    } else if (data) {
      enquiries = data as EnquiryRecord[];
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors"
            >
              Migsak
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-sm font-medium text-zinc-300">
              Customer Enquiries
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800/80">
              Live Pipeline
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Customer Enquiries
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Direct client project submissions sorted newest first. Timestamps rendered in Indian Standard Time (IST).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Total: <strong className="text-emerald-400">{enquiries.length}</strong>
            </span>
          </div>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 font-bold text-base">⚠️</span>
              <div>
                <strong className="block text-amber-300 font-semibold mb-1">
                  Supabase Environment Not Configured
                </strong>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Your <code className="bg-amber-900/40 px-1 py-0.5 rounded">SUPABASE_URL</code> or{" "}
                  <code className="bg-amber-900/40 px-1 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code> is not yet set in{" "}
                  <code className="bg-amber-900/40 px-1 py-0.5 rounded">.env.local</code>. Once configured, all customer enquiries submitted through the homepage will persist directly into Supabase Postgres.
                </p>
              </div>
            </div>
          </div>
        )}

        {dbError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-sm">
            Error fetching enquiries: {dbError}
          </div>
        )}

        {enquiries.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800/80">
            <div className="w-12 h-12 rounded-full bg-zinc-800/80 text-zinc-400 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-zinc-200">No enquiries recorded yet</h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Submissions from the homepage contact form will automatically appear here with full project details.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-900 text-xs uppercase font-mono text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Time (IST)</th>
                  <th scope="col" className="px-4 py-3.5">Name</th>
                  <th scope="col" className="px-4 py-3.5">Email</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Country</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Phone (E.164)</th>
                  <th scope="col" className="px-4 py-3.5">Service</th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">Budget</th>
                  <th scope="col" className="px-4 py-3.5 min-w-[280px]">Project Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {enquiries.map((enquiry) => {
                  const countryCode = enquiry.country || "IN";
                  const flag = getCountryFlag(countryCode);
                  return (
                    <tr key={enquiry.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="px-4 py-3.5 text-xs font-mono text-zinc-400 whitespace-nowrap">
                        {formatIST(enquiry.created_at)}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-white whitespace-nowrap">
                        {enquiry.name}
                      </td>
                      <td className="px-4 py-3.5 text-emerald-400 whitespace-nowrap">
                        <a href={`mailto:${enquiry.email}`} className="hover:underline">
                          {enquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-300 whitespace-nowrap font-mono text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <span>{flag}</span>
                          <span>{countryCode}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-300 whitespace-nowrap font-mono text-xs">
                        {enquiry.phone ? (
                          <a href={`tel:${enquiry.phone}`} className="hover:text-emerald-400">
                            {enquiry.phone}
                          </a>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700/60 text-zinc-200">
                          {enquiry.service}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-xs font-mono text-zinc-300">
                        {enquiry.budget}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-300 text-xs leading-relaxed max-w-sm">
                        <div className="max-h-36 overflow-y-auto whitespace-pre-wrap break-words pr-2">
                          {enquiry.message}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
