import type { ServiceOption, BudgetOption } from "./types";

export const VALID_SERVICES: readonly ServiceOption[] = [
  "Website or web app",
  "Mobile app",
  "Automation or integration",
  "Not sure yet",
];

export const VALID_BUDGETS: readonly BudgetOption[] = [
  "Under ₹1,00,000",
  "₹1,00,000 - ₹3,00,000",
  "₹3,00,000 - ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

// ISO 3166-1 alpha-2 country codes mapped to international dialing codes
export const COUNTRY_CALLING_CODES: Record<string, string> = {
  IN: "91",
  US: "1",
  GB: "44",
  CA: "1",
  AU: "61",
  AE: "971",
  SG: "65",
  DE: "49",
  FR: "33",
  JP: "81",
  NL: "31",
  IE: "353",
  NZ: "64",
  CH: "41",
  SE: "46",
  ES: "34",
  IT: "39",
  ZA: "27",
  MY: "60",
  ID: "62",
  PH: "63",
  SA: "966",
  QA: "974",
  KW: "965",
  OM: "968",
  BH: "973",
  BD: "880",
  LK: "94",
  NP: "977",
  PK: "92",
  AF: "93",
  AL: "355",
  DZ: "213",
  AD: "376",
  AO: "244",
  AR: "54",
  AM: "374",
  AT: "43",
  AZ: "994",
  BE: "32",
  BR: "55",
  BG: "359",
  CL: "56",
  CN: "86",
  CO: "57",
  CR: "506",
  HR: "385",
  CY: "357",
  CZ: "420",
  DK: "45",
  EG: "20",
  EE: "372",
  FI: "358",
  GE: "995",
  GR: "30",
  HK: "852",
  HU: "36",
  IS: "354",
  IL: "972",
  KE: "254",
  KR: "82",
  LV: "371",
  LT: "370",
  LU: "352",
  MT: "356",
  MX: "52",
  NG: "234",
  NO: "47",
  PL: "48",
  PT: "351",
  RO: "40",
  RS: "381",
  SK: "421",
  SI: "386",
  TH: "66",
  TR: "90",
  UA: "380",
  VN: "84",
  TW: "886",
};

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

/**
 * Returns the flag emoji corresponding to a 2-letter ISO country code.
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const REGION_NAME_OVERRIDES: Record<string, string> = {
  HK: "Hong Kong",
  MO: "Macao",
  TW: "Taiwan",
};

/**
 * Generates an alphabetically sorted list of country options using Intl.DisplayNames.
 * Normalizes regions whose names diverge between server-side Node.js and client browser ICU databases.
 */
export function getCountryList(): CountryOption[] {
  let displayNames: Intl.DisplayNames | null = null;
  try {
    displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    displayNames = null;
  }

  const list: CountryOption[] = Object.entries(COUNTRY_CALLING_CODES).map(
    ([code, dial]) => {
      let name =
        REGION_NAME_OVERRIDES[code] ||
        (displayNames ? displayNames.of(code) || code : code);
      if (name.includes("Hong Kong")) name = "Hong Kong";
      if (name.includes("Macao")) name = "Macao";

      return {
        code,
        name,
        dialCode: `+${dial}`,
        flag: getCountryFlag(code),
      };
    }
  );

  return list.sort((a, b) => a.name.localeCompare(b.name));
}

// Common domain typos to detect and suggest friendly corrections
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "yahooo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahu.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmali.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "icld.com": "icloud.com",
  "iclud.com": "icloud.com",
};

/**
 * Checks for common domain typos and suggests a correction hint.
 */
export function getEmailDomainSuggestion(email: string): string | null {
  if (!email || !email.includes("@")) return null;
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return null;

  const [local, domain] = parts;
  const suggestion = DOMAIN_TYPOS[domain];
  if (suggestion) {
    return `${local}@${suggestion}`;
  }
  return null;
}

/**
 * Validates a person's name:
 * - 2 to 80 characters after trimming
 * - Unicode letters (\p{L}), marks (\p{M}), spaces, hyphens, apostrophes, and full stops only.
 * - Rejects digits and other symbols.
 * - Repeated spaces are collapsed.
 */
export function validateName(rawName: unknown): {
  valid: boolean;
  value: string;
  error?: string;
} {
  if (typeof rawName !== "string") {
    return { valid: false, value: "", error: "Please enter your name." };
  }

  // Collapse repeated spaces and trim
  const cleaned = rawName.trim().replace(/\s+/g, " ");

  if (cleaned.length < 2 || cleaned.length > 80) {
    return {
      valid: false,
      value: cleaned,
      error: "Name must be between 2 and 80 characters.",
    };
  }

  // Unicode letters from any language, marks, spaces, hyphens, apostrophes, full stops only
  // Must reject any digits or punctuation outside . ' -
  const nameRegex = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
  if (!nameRegex.test(cleaned) || /\d/.test(cleaned)) {
    return {
      valid: false,
      value: cleaned,
      error: "Name can only contain letters, spaces, hyphens and apostrophes.",
    };
  }

  return { valid: true, value: cleaned };
}

/**
 * Strict Email validation:
 * - Trimmed, lowercase, max 254 characters
 * - Exactly one @, no spaces, valid domain with a dot, no consecutive dots
 */
export function validateEmail(rawEmail: unknown): {
  valid: boolean;
  value: string;
  error?: string;
  suggestion?: string;
} {
  if (typeof rawEmail !== "string") {
    return { valid: false, value: "", error: "Please enter your email address." };
  }

  const cleaned = rawEmail.trim().toLowerCase();

  if (cleaned.length === 0) {
    return { valid: false, value: "", error: "Please enter your email address." };
  }

  if (cleaned.length > 254) {
    return {
      valid: false,
      value: cleaned,
      error: "Email address cannot exceed 254 characters.",
    };
  }

  // Reject spaces or consecutive dots
  if (/\s/.test(cleaned) || cleaned.includes("..")) {
    return {
      valid: false,
      value: cleaned,
      error: "Please enter a valid email address with no spaces or consecutive dots.",
    };
  }

  // Strict format check: single @, local part, domain part with at least one dot
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(cleaned)) {
    return {
      valid: false,
      value: cleaned,
      error: "Please enter a valid email address (e.g. name@domain.com).",
    };
  }

  const suggestion = getEmailDomainSuggestion(cleaned);

  return { valid: true, value: cleaned, suggestion: suggestion || undefined };
}

/**
 * Phone Number Validation & E.164 Formatting:
 * - Phone is optional: empty or whitespace string is valid (returns null).
 * - Accepts digits, spaces, dashes, parentheses while typing.
 * - Strips formatting characters and validates against the selected country.
 * - Outputs standardized E.164 string (e.g. "+919876543210", "+12025550123").
 */
export function validatePhone(
  rawPhone: unknown,
  countryCode: string = "IN"
): {
  valid: boolean;
  value: string | null;
  error?: string;
} {
  if (!rawPhone || typeof rawPhone !== "string") {
    return { valid: true, value: null };
  }

  const trimmed = rawPhone.trim();
  if (trimmed.length === 0) {
    return { valid: true, value: null };
  }

  // Extract digits and check if an international '+' prefix was included
  const hasPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (digitsOnly.length === 0) {
    return { valid: true, value: null };
  }

  // ITU-T E.164: min 7 digits, max 15 digits
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return {
      valid: false,
      value: trimmed,
      error: "Phone number must be between 7 and 15 digits.",
    };
  }

  const dialCode = COUNTRY_CALLING_CODES[countryCode.toUpperCase()] || "91";

  let e164 = "";

  if (hasPlus) {
    // User already typed an international dial code
    e164 = `+${digitsOnly}`;
  } else if (digitsOnly.startsWith(dialCode)) {
    // User typed dial code without plus
    e164 = `+${digitsOnly}`;
  } else {
    // National format: strip any leading 0 and attach country dial code
    const nationalDigits = digitsOnly.replace(/^0+/, "");
    e164 = `+${dialCode}${nationalDigits}`;
  }

  const totalDigits = e164.replace(/\D/g, "");

  // Country-specific length and pattern checks
  const upperCountry = countryCode.toUpperCase();
  if (upperCountry === "IN") {
    // India: 10 national digits (total 12 with 91)
    const national = totalDigits.startsWith("91") ? totalDigits.slice(2) : totalDigits;
    if (national.length !== 10 || !/^[6-9]\d{9}$/.test(national)) {
      return {
        valid: false,
        value: trimmed,
        error: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      };
    }
    e164 = `+91${national}`;
  } else if (upperCountry === "US" || upperCountry === "CA") {
    // US/Canada: 10 national digits (total 11 with 1)
    const national = totalDigits.startsWith("1") ? totalDigits.slice(1) : totalDigits;
    if (national.length !== 10 || /^[01]/.test(national)) {
      return {
        valid: false,
        value: trimmed,
        error: "Please enter a valid 10-digit North American phone number (area code + 7 digits).",
      };
    }
    e164 = `+1${national}`;
  } else if (totalDigits.length < 8 || totalDigits.length > 15) {
    return {
      valid: false,
      value: trimmed,
      error: "Please enter a valid phone number for the selected country.",
    };
  }

  return { valid: true, value: e164 };
}

/**
 * Counts words by splitting trimmed text on whitespace.
 */
export function countWords(text: string): number {
  if (!text || typeof text !== "string") return 0;
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/**
 * Validates project description message:
 * - Minimum 10 characters after trimming
 * - Maximum 1000 words (split on whitespace)
 * - Hard cap of 8000 characters
 */
export function validateMessage(rawMessage: unknown): {
  valid: boolean;
  value: string;
  error?: string;
  wordCount: number;
} {
  if (typeof rawMessage !== "string") {
    return {
      valid: false,
      value: "",
      error: "Please describe your project (at least 10 characters).",
      wordCount: 0,
    };
  }

  const cleaned = rawMessage.trim();
  const wordCount = countWords(cleaned);

  if (cleaned.length < 10) {
    return {
      valid: false,
      value: cleaned,
      error: "Please describe your project (minimum 10 characters).",
      wordCount,
    };
  }

  if (cleaned.length > 8000) {
    return {
      valid: false,
      value: cleaned,
      error: `Project description exceeds the 8,000 character limit (${cleaned.length} / 8000 characters).`,
      wordCount,
    };
  }

  if (wordCount > 1000) {
    return {
      valid: false,
      value: cleaned,
      error: `Project description exceeds the 1,000 word limit (${wordCount} / 1000 words).`,
      wordCount,
    };
  }

  return { valid: true, value: cleaned, wordCount };
}

/**
 * Validates service option.
 */
export function validateService(rawService: unknown): {
  valid: boolean;
  value: ServiceOption;
  error?: string;
} {
  if (
    typeof rawService === "string" &&
    VALID_SERVICES.includes(rawService as ServiceOption)
  ) {
    return { valid: true, value: rawService as ServiceOption };
  }
  return {
    valid: false,
    value: "Not sure yet",
    error: "Please select an available service option.",
  };
}

/**
 * Validates budget option (optional).
 */
export function validateBudget(rawBudget: unknown): {
  valid: boolean;
  value: BudgetOption;
  error?: string;
} {
  if (!rawBudget || (typeof rawBudget === "string" && rawBudget.trim() === "")) {
    return { valid: true, value: "Not sure yet" };
  }

  const str = typeof rawBudget === "string" ? rawBudget.trim() : "";
  if (VALID_BUDGETS.includes(str as BudgetOption)) {
    return { valid: true, value: str as BudgetOption };
  }

  // Handle encoding fallbacks
  if (str.includes("Under") && str.includes("1,00,000")) return { valid: true, value: "Under ₹1,00,000" };
  if (str.includes("1,00,000") && str.includes("3,00,000")) return { valid: true, value: "₹1,00,000 - ₹3,00,000" };
  if (str.includes("3,00,000") && str.includes("5,00,000")) return { valid: true, value: "₹3,00,000 - ₹5,00,000" };
  if (str.includes("5,00,000")) return { valid: true, value: "₹5,00,000+" };
  if (str.toLowerCase().includes("not sure")) return { valid: true, value: "Not sure yet" };

  return {
    valid: false,
    value: "Not sure yet",
    error: "Please select an available budget option.",
  };
}

export interface SanitizedEnquiryData {
  name: string;
  email: string;
  country: string;
  phone: string | null;
  service: ServiceOption;
  budget: BudgetOption;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  data?: SanitizedEnquiryData;
  emailSuggestion?: string;
}

/**
 * Universal Shared Enquiry Validator used by both the Client Form and the Server API Route.
 */
export function validateEnquiry(raw: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  const nameRes = validateName(raw.name);
  if (!nameRes.valid) errors.name = nameRes.error!;

  const emailRes = validateEmail(raw.email);
  if (!emailRes.valid) errors.email = emailRes.error!;

  const countryCode =
    typeof raw.country === "string" && raw.country.trim().length === 2
      ? raw.country.trim().toUpperCase()
      : "IN";

  const phoneRes = validatePhone(raw.phone, countryCode);
  if (!phoneRes.valid) errors.phone = phoneRes.error!;

  const serviceRes = validateService(raw.service);
  if (!serviceRes.valid) errors.service = serviceRes.error!;

  const budgetRes = validateBudget(raw.budget);
  if (!budgetRes.valid) errors.budget = budgetRes.error!;

  const messageRes = validateMessage(raw.message);
  if (!messageRes.valid) errors.message = messageRes.error!;

  if (Object.keys(errors).length > 0) {
    return {
      valid: false,
      errors,
      emailSuggestion: emailRes.suggestion,
    };
  }

  return {
    valid: true,
    errors: {},
    data: {
      name: nameRes.value,
      email: emailRes.value,
      country: countryCode,
      phone: phoneRes.value,
      service: serviceRes.value,
      budget: budgetRes.value,
      message: messageRes.value,
    },
    emailSuggestion: emailRes.suggestion,
  };
}
