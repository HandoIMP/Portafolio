globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDb, f as crmLeads } from '../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, locals }) => {
  const formData = await request.formData();
  const honeypot = String(formData.get("website") || "");
  if (honeypot) {
    return Response.json({ ok: true });
  }
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const serviceInterest = String(formData.get("service_interest") || "").trim();
  const budgetRange = String(formData.get("budget_range") || "").trim();
  const message = String(formData.get("message") || "").trim();
  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Nombre, correo y mensaje son obligatorios." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Formato de correo inválido." }, { status: 400 });
  }
  const turnstileSecret = locals.runtime?.env?.TURNSTILE_SECRET_KEY;
  const turnstileResponse = String(formData.get("cf-turnstile-response") || "");
  if (turnstileSecret && turnstileSecret !== "1x0000000000000000000000000000000AA" && turnstileResponse) {
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileResponse
        })
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return Response.json(
          { ok: false, error: "Verificación de seguridad fallida. Intenta de nuevo." },
          { status: 400 }
        );
      }
    } catch {
    }
  }
  const d1 = locals.runtime?.env?.DB;
  if (!d1) {
    return Response.json({ ok: false, error: "Base de datos no disponible." }, { status: 500 });
  }
  const db = getDb(d1);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const referer = request.headers.get("referer") || "";
  const sourcePage = referer ? new URL(referer).pathname : "/contacto";
  try {
    await db.insert(crmLeads).values({
      name,
      email,
      phone,
      company,
      serviceInterest,
      budgetRange,
      message,
      status: "Nuevo",
      internalNotes: "",
      sourcePage,
      createdAt: now,
      updatedAt: now
    });
  } catch {
    return Response.json({ ok: false, error: "Error guardando el mensaje." }, { status: 500 });
  }
  return Response.json({ ok: true });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
