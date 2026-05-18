import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

// str_replace_editor — create command
test("shows 'Creating <filename>' for str_replace_editor create", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "src/components/Card.tsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Creating Card.tsx")).toBeDefined();
});

// str_replace_editor — str_replace command
test("shows 'Editing <filename>' for str_replace_editor str_replace", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "src/App.jsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

// str_replace_editor — insert command
test("shows 'Editing <filename>' for str_replace_editor insert", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "src/index.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing index.ts")).toBeDefined();
});

// str_replace_editor — undo_edit command
test("shows 'Editing <filename>' for str_replace_editor undo_edit", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "undo_edit", path: "src/utils.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing utils.ts")).toBeDefined();
});

// str_replace_editor — view command
test("shows 'Reading <filename>' for str_replace_editor view", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "src/config.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Reading config.ts")).toBeDefined();
});

// str_replace_editor — unknown command falls back to Editing
test("falls back to 'Editing <filename>' for unknown str_replace_editor command", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "unknown_cmd", path: "src/foo.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Editing foo.ts")).toBeDefined();
});

// file_manager — rename
test("shows 'Renaming <filename>' for file_manager rename", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "rename", path: "src/old.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Renaming old.ts")).toBeDefined();
});

// file_manager — delete
test("shows 'Deleting <filename>' for file_manager delete", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "delete", path: "src/remove.ts" }}
      state="call"
    />
  );
  expect(screen.getByText("Deleting remove.ts")).toBeDefined();
});

// unknown tool falls back to raw tool name
test("falls back to raw tool name for unknown tools", () => {
  render(
    <ToolInvocationBadge
      toolName="some_other_tool"
      args={{}}
      state="call"
    />
  );
  expect(screen.getByText("some_other_tool")).toBeDefined();
});

// missing path gracefully degrades
test("shows generic label when path is missing", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create" }}
      state="call"
    />
  );
  expect(screen.getByText("Creating file")).toBeDefined();
});

// nested path — only filename shown
test("extracts filename from nested path", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "src/components/ui/Button.tsx" }}
      state="call"
    />
  );
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

// state=result renders green dot (no spinner)
test("renders green dot when state is result", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "App.tsx" }}
      state="result"
    />
  );
  // green dot is a div with bg-emerald-500
  expect(container.querySelector(".bg-emerald-500")).toBeTruthy();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

// state=call renders spinner (no green dot)
test("renders spinner when state is call", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "App.tsx" }}
      state="call"
    />
  );
  expect(container.querySelector(".animate-spin")).toBeTruthy();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});
