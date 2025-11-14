import test from "node:test";
import assert from "node:assert/strict";
import { getCategoryMetadata, getAchivementMetadata } from "../front/mappers";

test("getCategoryMetadata returns fallback for unknown category", () => {
  const fallback = getCategoryMetadata("unknown-category");
  assert.equal(fallback.bgClass.includes("gray"), true);
});

test("getCategoryMetadata returns defined metadata for known category", () => {
  const data = getCategoryMetadata("food_booth");
  assert.ok(data.bgClass.includes("red"));
});

test("getAchivementMetadata returns fallback when id is unknown", () => {
  const metadata = getAchivementMetadata("non-existent");
  assert.ok(metadata.title.length > 0);
});

test("getAchivementMetadata returns concrete data for known id", () => {
  const metadata = getAchivementMetadata("hello-world");
  assert.equal(metadata.title, "ありぐにゃとごにゃいにゃす");
});
