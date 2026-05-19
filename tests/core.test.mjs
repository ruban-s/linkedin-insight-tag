import { describe, it, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";

function setupWindow() {
  globalThis.window = {
    _linkedin_data_partner_ids: undefined,
    _linkedin_event_id: undefined,
    lintrk: undefined,
    location: { pathname: "/pricing" },
  };
  globalThis.document = {
    getElementById: () => null,
    createElement: () => ({
      set id(_) {},
      set src(_) {},
      set async(_) {},
      set type(_) {},
      set onload(_) {},
    }),
    head: {
      appendChild: () => {},
    },
  };
}

function teardownWindow() {
  delete globalThis.window;
  delete globalThis.document;
}

describe("injectScript", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should register single partner ID", async () => {
    const { injectScript } = await import("../dist/index.esm.js");
    injectScript("12345");
    assert.deepEqual(window._linkedin_data_partner_ids, ["12345"]);
  });

  it("should register multiple partner IDs", async () => {
    const { injectScript } = await import("../dist/index.esm.js");
    injectScript(["111", "222"]);
    assert.deepEqual(window._linkedin_data_partner_ids, ["111", "222"]);
  });

  it("should not duplicate partner IDs", async () => {
    window._linkedin_data_partner_ids = ["12345"];
    const { injectScript } = await import("../dist/index.esm.js");
    injectScript("12345");
    assert.deepEqual(window._linkedin_data_partner_ids, ["12345"]);
  });

  it("should setup lintrk queue", async () => {
    const { injectScript } = await import("../dist/index.esm.js");
    injectScript("12345");
    assert.ok(window.lintrk);
    assert.ok(Array.isArray(window.lintrk.q));
  });
});

describe("trackEvent", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should queue track calls", async () => {
    const { injectScript, trackEvent } = await import("../dist/index.esm.js");
    injectScript("12345");
    trackEvent("conv-1");
    assert.equal(window.lintrk.q.length, 1);
    assert.deepEqual(window.lintrk.q[0], [
      "track",
      { conversion_id: "conv-1" },
    ]);
  });

  it("should include value and currency", async () => {
    const { injectScript, trackEvent } = await import("../dist/index.esm.js");
    injectScript("12345");
    trackEvent("conv-1", { value: 99.99, currency: "USD" });
    assert.deepEqual(window.lintrk.q[0][1], {
      conversion_id: "conv-1",
      value: "99.99",
      currency: "USD",
    });
  });

  it("should include eventId for dedup", async () => {
    const { injectScript, trackEvent } = await import("../dist/index.esm.js");
    injectScript("12345");
    trackEvent("conv-1", { eventId: "evt-123" });
    assert.deepEqual(window.lintrk.q[0][1], {
      conversion_id: "conv-1",
      event_id: "evt-123",
    });
  });

  it("should include variant for A/B testing", async () => {
    const { injectScript, trackEvent } = await import("../dist/index.esm.js");
    injectScript("12345");
    trackEvent("conv-1", { variant: "B" });
    assert.deepEqual(window.lintrk.q[0][1], {
      conversion_id: "conv-1",
      variant: "B",
    });
  });

  it("should not throw without lintrk", async () => {
    const { trackEvent } = await import("../dist/index.esm.js");
    assert.doesNotThrow(() => trackEvent("conv-1"));
  });
});

describe("setPageEventId", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should set window._linkedin_event_id", async () => {
    const { setPageEventId } = await import("../dist/index.esm.js");
    setPageEventId("page-evt-1");
    assert.equal(window._linkedin_event_id, "page-evt-1");
  });
});

describe("isLoaded", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should return false when lintrk has queue", async () => {
    const { injectScript, isLoaded } = await import("../dist/index.esm.js");
    injectScript("12345");
    assert.equal(isLoaded(), false);
  });

  it("should return false without window", async () => {
    teardownWindow();
    const { isLoaded } = await import("../dist/index.esm.js");
    assert.equal(isLoaded(), false);
  });
});

describe("isPathExcluded", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should match exact path", async () => {
    const { isPathExcluded } = await import("../dist/index.esm.js");
    assert.equal(isPathExcluded(["/pricing"]), true);
    assert.equal(isPathExcluded(["/about"]), false);
  });

  it("should match wildcard path", async () => {
    const { isPathExcluded } = await import("../dist/index.esm.js");
    window.location.pathname = "/admin/users";
    assert.equal(isPathExcluded(["/admin/*"]), true);
    assert.equal(isPathExcluded(["/settings/*"]), false);
  });
});

describe("matchSegment", () => {
  beforeEach(() => {
    teardownWindow();
    setupWindow();
  });

  it("should return matching segment name", async () => {
    const { matchSegment } = await import("../dist/index.esm.js");
    const segments = [
      { name: "high-intent", paths: ["/pricing", "/demo"] },
      { name: "blog-readers", paths: ["/blog/*"] },
    ];
    assert.equal(matchSegment(segments), "high-intent");
  });

  it("should return null for no match", async () => {
    const { matchSegment } = await import("../dist/index.esm.js");
    window.location.pathname = "/random";
    assert.equal(matchSegment([{ name: "x", paths: ["/y"] }]), null);
  });

  it("should accept explicit pathname", async () => {
    const { matchSegment } = await import("../dist/index.esm.js");
    const segments = [{ name: "blog", paths: ["/blog/*"] }];
    assert.equal(matchSegment(segments, "/blog/post-1"), "blog");
  });
});

describe("hashEmail", () => {
  it("should hash email with SHA-256", async () => {
    const { hashEmail } = await import("../dist/index.esm.js");
    const hash = await hashEmail("Test@Example.com");
    const expected = await hashEmail("test@example.com");
    assert.equal(hash, expected);
  });

  it("should trim whitespace", async () => {
    const { hashEmail } = await import("../dist/index.esm.js");
    const h1 = await hashEmail("  user@test.com  ");
    const h2 = await hashEmail("user@test.com");
    assert.equal(h1, h2);
  });
});
