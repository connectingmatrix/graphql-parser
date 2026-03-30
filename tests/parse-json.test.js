const assert = require("node:assert/strict");
const test = require("node:test");
const { OperationType, parseJSON } = require("../dist");

test("parseJSON reads top level fields instead of the GraphQL operation name", () => {
  const parsed = parseJSON({
    query: "query UserActivityLogsCollection($first: Int) { user_activity_logsCollection(first: $first) { edges { node { id } } } }",
    variables: { first: 1 }
  });

  assert.equal(parsed.operation.name, "UserActivityLogsCollection");
  assert.deepEqual(parsed.operation.fields, [
    { key: "user_activity_logsCollection", name: "user_activity_logsCollection", operation: OperationType.QUERY }
  ]);
});

test("parseJSON honors operationName when a document has multiple operations", () => {
  const parsed = parseJSON({
    query: "query FirstQuery { authPing } query SecondQuery { user_activity_logsCollection { edges { node { id } } } }",
    operationName: "SecondQuery"
  });

  assert.equal(parsed.operation.name, "SecondQuery");
  assert.deepEqual(parsed.operation.fields, [
    { key: "user_activity_logsCollection", name: "user_activity_logsCollection", operation: OperationType.QUERY }
  ]);
});
