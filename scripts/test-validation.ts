import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateService,
  validateEnquiry,
} from "../src/lib/validation.ts";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n========================================================");
console.log("RUNNING ENQUIRY VALIDATION TEST SUITE");
console.log("========================================================\n");

// 1. Name validation
console.log("1. Name Validation:");
const nameWithDigits = validateName("Rahul123");
assert(!nameWithDigits.valid, "Name with digits 'Rahul123' is rejected");

const nameZoe = validateName("Zoë O'Neil-Smith");
assert(nameZoe.valid && nameZoe.value === "Zoë O'Neil-Smith", "Unicode name 'Zoë O'Neil-Smith' is accepted");

const nameShort = validateName("A");
assert(!nameShort.valid, "Single-character name is rejected (< 2 chars)");

// 2. Email validation & Typos
console.log("\n2. Email Validation & Domain Typo Hints:");
const invalidEmail = validateEmail("invalid-email-without-at");
assert(!invalidEmail.valid, "Invalid email 'invalid-email-without-at' is rejected");

const doubleDotEmail = validateEmail("user..name@domain.com");
assert(!doubleDotEmail.valid, "Email with consecutive dots 'user..name@domain.com' is rejected");

const gmialEmail = validateEmail("john@gmial.com");
assert(
  gmialEmail.valid && gmialEmail.suggestion === "john@gmail.com",
  "'john@gmial.com' suggests correction 'john@gmail.com'"
);

const yahoooEmail = validateEmail("user@yahooo.com");
assert(
  yahoooEmail.valid && yahoooEmail.suggestion === "user@yahoo.com",
  "'user@yahooo.com' suggests correction 'user@yahoo.com'"
);

// 3. Country & Phone (ITU-T E.164)
console.log("\n3. Country & Phone Validation (ITU-T E.164):");
const invalidPhoneIN = validatePhone("12345", "IN");
assert(!invalidPhoneIN.valid, "Invalid 5-digit phone for India is rejected");

const validPhoneIN = validatePhone("98765 43210", "IN");
assert(
  validPhoneIN.valid && validPhoneIN.value === "+919876543210",
  "Valid Indian number '98765 43210' is formatted to E.164: +919876543210"
);

const validPhoneUS = validatePhone("(202) 555-0123", "US");
assert(
  validPhoneUS.valid && validPhoneUS.value === "+12025550123",
  "Valid US number '(202) 555-0123' is formatted to E.164: +12025550123"
);

const emptyPhone = validatePhone("", "IN");
assert(emptyPhone.valid && emptyPhone.value === null, "Optional empty phone returns valid null");

// 4. Message & Word Count
console.log("\n4. Message Word & Character Limits:");
const shortMessage = validateMessage("Too short");
assert(!shortMessage.valid, "Message under 10 chars is rejected");

const words1000 = Array(1000).fill("word").join(" ");
const msg1000 = validateMessage(words1000);
assert(msg1000.valid && msg1000.wordCount === 1000, "Message with exactly 1000 words is accepted");

const words1001 = Array(1001).fill("word").join(" ");
const msg1001 = validateMessage(words1001);
assert(!msg1001.valid, "Message with 1001 words is rejected");

// 5. Service Validation
console.log("\n5. Service Validation:");
const validService = validateService("Website or web app");
assert(validService.valid, "Allowed service 'Website or web app' is accepted");

const invalidService = validateService("Random Hacked Service");
assert(!invalidService.valid, "Disallowed service 'Random Hacked Service' is rejected");

// 6. Full Enquiry Object Validation
console.log("\n6. Full Enquiry Validation:");
const fullEnquiryResult = validateEnquiry({
  name: "Zoë O'Neil-Smith",
  email: "zoe@example.com",
  country: "IN",
  phone: "98765 43210",
  service: "Website or web app",
  budget: "₹1,00,000 - ₹3,00,000",
  message: "We need an end-to-end full-stack web application designed and built.",
});
assert(fullEnquiryResult.valid, "Valid full enquiry passes shared validateEnquiry");

const invalidEnquiryResult = validateEnquiry({
  name: "123",
  email: "bad-email",
  country: "US",
  phone: "1234",
  service: "Not real service",
  message: "short",
});
assert(!invalidEnquiryResult.valid && Object.keys(invalidEnquiryResult.errors).length >= 4, "Invalid enquiry returns field-by-field errors");

console.log("\n========================================================");
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log("========================================================\n");

if (failed > 0) {
  process.exit(1);
}
