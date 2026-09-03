const test = require("node:test");
const assert = require("node:assert/strict");
const { extractInviteCode } = require("./join.js");

// Real invite codes are 77-char Crockford base32 (see rt's invite-crypto.ts
// decodeCode) -- built here rather than hand-typed so the length is exact.
const CROCKFORD_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const VALID_CODE = (CROCKFORD_ALPHABET + CROCKFORD_ALPHABET + CROCKFORD_ALPHABET).slice(0, 77);
const withDashes = (s) => s.match(/.{1,5}/g).join("-");

test("extractInviteCode: reads a present, well-formed code from the fragment", () => {
  assert.equal(extractInviteCode("#" + VALID_CODE), VALID_CODE);
});

test("extractInviteCode: accepts the dash-chunked display form", () => {
  assert.equal(extractInviteCode("#" + withDashes(VALID_CODE)), withDashes(VALID_CODE));
});

test("extractInviteCode: returns null when the fragment is absent", () => {
  assert.equal(extractInviteCode(""), null);
  assert.equal(extractInviteCode("#"), null);
});

test("extractInviteCode: never reads the query string, only the fragment", () => {
  assert.equal(extractInviteCode("?code=" + VALID_CODE), null);
});

test("extractInviteCode: rejects a code of the wrong length as malformed", () => {
  assert.equal(extractInviteCode("#" + VALID_CODE.slice(0, 76)), null);
});

test("extractInviteCode: rejects a code with a character outside the Crockford alphabet", () => {
  const badChar = VALID_CODE.slice(0, 76) + "U";
  assert.equal(extractInviteCode("#" + badChar), null);
});
