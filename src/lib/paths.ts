export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // ensure no double slash when joining
  if (base && path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`.replace(/\/+/g, "/");
}
