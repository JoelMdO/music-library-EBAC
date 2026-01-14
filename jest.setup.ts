/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import util from "util";
// Polyfill TextEncoder/TextDecoder for jsdom environment (avoid TS prototype mismatch)

if (typeof (global as any).TextEncoder === "undefined") {
  (global as any).TextEncoder = util.TextEncoder;
}
if (typeof (global as any).TextDecoder === "undefined") {
  (global as any).TextDecoder = util.TextDecoder;
}
