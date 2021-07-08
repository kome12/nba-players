// jest.setTimeout(10000);

import { Context, createMockContext, MockContext } from "./tests/test-context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});
