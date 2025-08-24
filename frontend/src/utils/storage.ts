const KEY = "plomo-kanban-v1";

export function saveState(state: unknown) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function loadState<T = unknown>(): T | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // if something bogus like "null" or a primitive was stored, ignore it
    if (parsed === null || typeof parsed !== "object") return undefined;
    return parsed as T;
  } catch {
    return undefined;
  }
}
