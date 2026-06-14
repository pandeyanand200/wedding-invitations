import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret, defineString } from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

// ─── Initialize Firebase Admin ───────────────────────────────────────────────
admin.initializeApp();

// ─── Environment Params ───────────────────────────────────────────────────────
// Non-sensitive: stored in functions/.env (local) or firebase functions:config
const GMAIL_USER = defineString("GMAIL_USER");     // e.g. yourname@gmail.com
const HOST_EMAIL = defineString("HOST_EMAIL");     // e.g. bride-or-groom@gmail.com

// Sensitive: stored in Google Secret Manager via:
//   firebase functions:secrets:set GMAIL_APP_PASSWORD
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");

// ─── Wedding Details (customise here) ────────────────────────────────────────
const WEDDING = {
  coupleNames: "Ritik & Archi",
  date: "Friday, December 12, 2026",
  venue: "Grand Ballroom, The Taj Palace",
  location: "New Delhi",
  mapsUrl: "https://maps.google.com/?q=Taj+Palace+New+Delhi",
  rsvpDeadline: "November 30, 2026",
};

// ─── Email HTML Helpers ───────────────────────────────────────────────────────

/** Confirmation email sent to the guest */
function buildGuestEmail(name: string, attending: string, guests: number): string {
  const attendingText =
    attending === "yes"
      ? `🎉 We're thrilled you'll be joining us!`
      : attending === "no"
      ? `We're sorry you won't be able to make it, but thank you for letting us know.`
      : `We'll keep your spot tentatively reserved and look forward to hearing from you soon.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RSVP Confirmed</title>
</head>
<body style="margin:0;padding:0;font-family:'Georgia',serif;background:#f9f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fffdf9;border:1px solid #e8d5b0;border-radius:4px;overflow:hidden;">

          <!-- Gold top bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#8b6914,#c9a96e,#e8b4b8,#c9a96e,#8b6914);height:5px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 40px 20px;">
              <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9a96e;margin:0 0 12px;">Together with their families</p>
              <h1 style="font-size:42px;font-weight:300;color:#1c2b1e;margin:0;line-height:1.2;">${WEDDING.coupleNames}</h1>
              <div style="margin:16px auto;width:60px;height:1px;background:#c9a96e;"></div>
              <p style="font-family:Arial,sans-serif;font-size:13px;color:#6b7c6e;letter-spacing:1px;margin:0;">${WEDDING.date}</p>
              <p style="font-family:Arial,sans-serif;font-size:12px;color:#9a8a6a;margin:6px 0 0;">📍 ${WEDDING.venue} · ${WEDDING.location}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:10px 40px 30px;">
              <p style="font-size:16px;color:#3a3a3a;line-height:1.8;margin:0 0 16px;">Dear <strong style="color:#1c2b1e;">${name}</strong>,</p>
              <p style="font-size:15px;color:#3a3a3a;line-height:1.8;margin:0 0 16px;">
                Thank you for taking the time to RSVP for our wedding. ${attendingText}
              </p>
              ${
                attending === "yes"
                  ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5ede0;border:1px solid #e8d5b0;border-radius:4px;margin:20px 0;padding:0;">
                <tr>
                  <td style="padding:20px;">
                    <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 12px;">Your RSVP Details</p>
                    <p style="font-size:14px;color:#3a3a3a;margin:0 0 6px;"><strong>Guests Attending:</strong> ${guests} ${guests === 1 ? "person" : "people"}</p>
                    <p style="font-size:14px;color:#3a3a3a;margin:0 0 6px;"><strong>Event Date:</strong> ${WEDDING.date}</p>
                    <p style="font-size:14px;color:#3a3a3a;margin:0;"><strong>Venue:</strong> ${WEDDING.venue}, ${WEDDING.location}</p>
                  </td>
                </tr>
              </table>
              <p style="font-size:14px;color:#3a3a3a;line-height:1.8;margin:0 0 20px;">
                We will share more details closer to the date — including hotel recommendations and event-day instructions. Please mark your calendar!
              </p>
              `
                  : ""
              }
              <p style="font-size:15px;color:#3a3a3a;line-height:1.8;margin:0;">
                With love and gratitude,<br/>
                <em style="color:#c9a96e;font-size:18px;">${WEDDING.coupleNames}</em>
              </p>
            </td>
          </tr>

          <!-- Map CTA (only if attending) -->
          ${
            attending === "yes"
              ? `
          <tr>
            <td align="center" style="padding:0 40px 30px;">
              <a href="${WEDDING.mapsUrl}"
                 style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#8b6914,#c9a96e);color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;border-radius:2px;">
                📍 View Venue on Map
              </a>
            </td>
          </tr>
          `
              : ""
          }

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #f0e4cc;background:#faf6ee;">
              <p style="font-family:Arial,sans-serif;font-size:11px;color:#b0a090;margin:0;text-align:center;line-height:1.8;">
                This email was sent because you submitted an RSVP for the wedding of ${WEDDING.coupleNames}.<br/>
                If you have any questions, please reply to this email.
              </p>
            </td>
          </tr>

          <!-- Gold bottom bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#8b6914,#c9a96e,#e8b4b8,#c9a96e,#8b6914);height:3px;"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Notification email sent to the hosts when a new RSVP arrives */
function buildHostEmail(data: {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: string;
  dietary: string;
  message: string;
}): string {
  const attendingBadge =
    data.attending === "yes"
      ? `<span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:bold;">✓ ATTENDING</span>`
      : data.attending === "no"
      ? `<span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:bold;">✗ DECLINING</span>`
      : `<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:bold;">? TENTATIVE</span>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New RSVP</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1c2b1e,#2d4a30);padding:24px 32px;">
              <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 6px;">Wedding RSVP System</p>
              <h2 style="color:#ffffff;margin:0;font-size:22px;font-weight:400;">${WEDDING.coupleNames}</h2>
            </td>
          </tr>

          <!-- New RSVP alert -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p style="font-size:13px;color:#6b7280;margin:0 0 6px;letter-spacing:1px;text-transform:uppercase;">New RSVP Received</p>
              <h3 style="font-size:24px;color:#111827;margin:0 0 10px;">${data.name} ${attendingBadge}</h3>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;font-size:14px;">
                <tr style="background:#f9fafb;">
                  <td style="color:#6b7280;width:130px;padding:10px 14px;">Email</td>
                  <td style="color:#111827;padding:10px 14px;"><a href="mailto:${data.email}" style="color:#c9a96e;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="color:#6b7280;padding:10px 14px;">Phone</td>
                  <td style="color:#111827;padding:10px 14px;">${data.phone || "—"}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="color:#6b7280;padding:10px 14px;">Attending</td>
                  <td style="color:#111827;padding:10px 14px;text-transform:capitalize;">${data.attending}</td>
                </tr>
                <tr>
                  <td style="color:#6b7280;padding:10px 14px;">Guests</td>
                  <td style="color:#111827;padding:10px 14px;">${data.guests} ${data.guests === 1 ? "person" : "people"}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="color:#6b7280;padding:10px 14px;">Dietary</td>
                  <td style="color:#111827;padding:10px 14px;">${data.dietary || "No special requirements"}</td>
                </tr>
                ${
                  data.message
                    ? `<tr>
                  <td style="color:#6b7280;padding:10px 14px;vertical-align:top;">Message</td>
                  <td style="color:#111827;padding:10px 14px;font-style:italic;">"${data.message}"</td>
                </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="font-size:12px;color:#9ca3af;margin:0;">
                Submitted via your wedding invitation website • ${WEDDING.coupleNames} Wedding
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─── Cloud Function: Triggered on new RSVP in Firestore ──────────────────────

export const onRsvpCreated = onDocumentCreated(
  {
    document: "rsvps/{docId}",
    secrets: [GMAIL_APP_PASSWORD],
    region: "asia-south1", // Mumbai — closest to India for low latency
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data in snapshot, skipping.");
      return;
    }

    const data = snapshot.data() as {
      name: string;
      email: string;
      phone: string;
      guests: number;
      attending: string;
      dietary: string;
      message: string;
    };

    console.log(`New RSVP from: ${data.name} (${data.email}) — ${data.attending}`);

    // ── Create Nodemailer transporter ──────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER.value(),
        pass: GMAIL_APP_PASSWORD.value(), // Gmail App Password (16-char)
      },
    });

    const sendResults: Promise<void>[] = [];

    // ── 1. Guest Confirmation Email ────────────────────────────────────────
    if (data.email) {
      const attendingSubject =
        data.attending === "yes"
          ? `RSVP Confirmed — ${WEDDING.coupleNames}'s Wedding 💍`
          : data.attending === "no"
          ? `RSVP Received — ${WEDDING.coupleNames}'s Wedding`
          : `RSVP Received — ${WEDDING.coupleNames}'s Wedding`;

      sendResults.push(
        transporter
          .sendMail({
            from: `"${WEDDING.coupleNames} Wedding" <${GMAIL_USER.value()}>`,
            to: data.email,
            subject: attendingSubject,
            html: buildGuestEmail(data.name, data.attending, data.guests),
          })
          .then(() => console.log(`✅ Guest confirmation sent to: ${data.email}`))
          .catch((err) => console.error(`❌ Failed to send guest email: ${err.message}`))
      );
    }

    // ── 2. Host Notification Email ─────────────────────────────────────────
    const hostEmailAddr = HOST_EMAIL.value();
    if (hostEmailAddr) {
      const attendingLabel =
        data.attending === "yes" ? "✓ Attending" : data.attending === "no" ? "✗ Declining" : "? Tentative";

      sendResults.push(
        transporter
          .sendMail({
            from: `"Wedding RSVP" <${GMAIL_USER.value()}>`,
            to: hostEmailAddr,
            subject: `New RSVP: ${data.name} — ${attendingLabel} (${data.guests} guest${data.guests !== 1 ? "s" : ""})`,
            html: buildHostEmail(data),
          })
          .then(() => console.log(`✅ Host notification sent to: ${hostEmailAddr}`))
          .catch((err) => console.error(`❌ Failed to send host email: ${err.message}`))
      );
    }

    // Wait for both emails to finish
    await Promise.all(sendResults);
    console.log("📧 All emails processed for RSVP:", event.params.docId);
  }
);
