export function hasBeenUpdated(createdAtMs: number, updatedAtMs: number) {
  const now = Date.now();
  return (updatedAtMs > createdAtMs) && (now > updatedAtMs);
}