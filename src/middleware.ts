import type { APIRoute } from "astro";

export const onRequest: APIRoute = ({ request, redirect }) => {
  const url = new URL(request.url);

  // Skip if it's an API route or has a file extension
  if (url.pathname.startsWith("/api/") || /\.[^/]+$/.test(url.pathname)) {
    return new Response(null, { status: 200 });
  }

  // Add trailing slash if missing
  if (!url.pathname.endsWith("/") && url.pathname !== "") {
    url.pathname += "/";
    return redirect(url.toString(), 301);
  }

  return new Response(null, { status: 200 });
};
