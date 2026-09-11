declare const Deno;

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req?.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const body = await req?.json();
    const { type, data } = body;

    const RESEND_API_KEY = Deno?.env?.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const isStudent = type === "student";

    // ── Admin notification email ──────────────────────────────────────────────
    const adminSubject = isStudent
      ? "Nouvelle inscription étudiant" :"Nouvelle inscription enseignant";

    let adminHtml = "";

    if (isStudent) {
      adminHtml = `
        <h2 style="color:#1a56db;">Nouvelle inscription étudiant — Insight Academy</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Nom</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.nom}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Prénom</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.prenom}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Date de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.age} (${(() => {
            const birthDate = new Date(data?.age);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            return age + ' ans';
          })()})</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Wilaya</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.wilaya}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Niveau</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.niveau}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Formation souhaitée</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.formation}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Téléphone</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.telephone}</td></tr>
        </table>
      `;
    } else {
      adminHtml = `
        <h2 style="color:#1a56db;">Nouvelle inscription enseignant — Insight Academy</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Prénom</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.prenom}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Nom</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.nom}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Date de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.dateNaissance}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Lieu de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.lieuNaissance}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Lieu de résidence</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.lieuResidence}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Années d'expérience</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.anneesExperience}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f9fafb;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.email}</td></tr>
        </table>
      `;
    }

    // ── Confirmation email to registrant ─────────────────────────────────────
    const confirmSubject = isStudent
      ? "Confirmation de votre inscription — Insight Academy" :"Confirmation de votre candidature — Insight Academy";

    let confirmHtml = "";

    if (isStudent) {
      confirmHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1a56db,#3b82f6);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;">✅ Inscription confirmée !</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Bienvenue chez Insight Academy 🎉</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
            <p style="font-size:15px;color:#374151;">Bonjour <strong>${data?.prenom} ${data?.nom}</strong>,</p>
            <p style="font-size:14px;color:#6b7280;">Nous avons bien reçu votre inscription. Voici un récapitulatif de vos informations :</p>
            <table style="border-collapse:collapse;width:100%;font-size:14px;margin:16px 0;">
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Nom complet</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.prenom} ${data?.nom}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Date de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.age}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Wilaya</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.wilaya}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Niveau</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.niveau}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Formation souhaitée</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.formation}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Téléphone</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.telephone}</td></tr>
            </table>
            <div style="background:#eff6ff;border-left:4px solid #1a56db;padding:12px 16px;border-radius:4px;margin-top:16px;">
              <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">Prochaines étapes :</p>
              <ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">
                <li>Notre équipe vous appellera dans les <strong>24h</strong> pour confirmer votre inscription.</li>
                <li>Vous passerez un <strong>test de niveau gratuit</strong> de 20 minutes.</li>
                <li>Vous recevrez votre <strong>planning de cours</strong> et les informations pratiques.</li>
              </ol>
            </div>
            <p style="font-size:13px;color:#6b7280;margin-top:20px;">Pour toute question, contactez-nous à <a href="mailto:insightacademybenak@gmail.com" style="color:#1a56db;">insightacademybenak@gmail.com</a>.</p>
            <p style="font-size:13px;color:#9ca3af;margin-top:8px;">— L'équipe Insight Academy</p>
          </div>
        </div>
      `;
    } else {
      confirmHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1a56db,#3b82f6);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;">✅ Candidature reçue !</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Merci de votre intérêt pour Insight Academy 🎓</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
            <p style="font-size:15px;color:#374151;">Bonjour <strong>${data?.prenom} ${data?.nom}</strong>,</p>
            <p style="font-size:14px;color:#6b7280;">Nous avons bien reçu votre candidature. Voici un récapitulatif de vos informations :</p>
            <table style="border-collapse:collapse;width:100%;font-size:14px;margin:16px 0;">
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Nom complet</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.prenom} ${data?.nom}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Date de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.dateNaissance}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Lieu de naissance</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.lieuNaissance}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Lieu de résidence</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.lieuResidence}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Années d'expérience</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.anneesExperience}</td></tr>
              <tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#fff;">Email</td><td style="padding:8px;border:1px solid #e5e7eb;">${data?.email}</td></tr>
            </table>
            <div style="background:#eff6ff;border-left:4px solid #1a56db;padding:12px 16px;border-radius:4px;margin-top:16px;">
              <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">Prochaines étapes :</p>
              <ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8;">
                <li>Notre équipe pédagogique examinera votre profil dans les <strong>48 heures</strong>.</li>
                <li>Vous serez contacté pour un <strong>entretien téléphonique</strong>.</li>
                <li>Si votre profil correspond, vous recevrez une <strong>proposition d'intégration</strong>.</li>
              </ol>
            </div>
            <p style="font-size:13px;color:#6b7280;margin-top:20px;">Pour toute question, contactez-nous à <a href="mailto:insightacademybenak@gmail.com" style="color:#1a56db;">insightacademybenak@gmail.com</a>.</p>
            <p style="font-size:13px;color:#9ca3af;margin-top:8px;">— L'équipe Insight Academy</p>
          </div>
        </div>
      `;
    }

    // ── Send admin notification ───────────────────────────────────────────────
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["insightacademybenak@gmail.com"],
        subject: adminSubject,
        html: adminHtml,
      }),
    });

    if (!adminRes?.ok) {
      const errorData = await adminRes?.json();
      throw new Error(errorData.message || "Failed to send admin email");
    }

    const adminResult = await adminRes?.json();

    // ── Send confirmation copy to registrant (only if email provided) ─────────
    let confirmResult = null;
    if (data?.email) {
      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [data.email],
          subject: confirmSubject,
          html: confirmHtml,
        }),
      });

      if (confirmRes?.ok) {
        confirmResult = await confirmRes?.json();
      }
    }

    return new Response(
      JSON.stringify({ success: true, adminId: adminResult.id, confirmId: confirmResult?.id }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
