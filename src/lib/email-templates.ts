export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const WRAPPER_START = (preheader: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dr. V. D. Shivling</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f6f4ef;font-family:Georgia,'Times New Roman',serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f4ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border:1px solid #e0dbd0;">
            <tr>
              <td style="padding:28px 32px;border-bottom:2px solid #b8710a;">
                <span style="font-family:'Courier New',monospace;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#b8710a;">
                  Dr. V. D. Shivling
                </span>
                <div style="font-family:'Courier New',monospace;font-size:11px;color:#8a8f95;margin-top:4px;">
                  Chief Scientist &middot; CSIR&ndash;CSIO
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">`;

const WRAPPER_END = `
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f6f4ef;border-top:1px solid #e0dbd0;">
                <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#8a8f95;">
                  CSIR &ndash; Central Scientific Instruments Organisation, Sector 30-C, Chandigarh 160030, India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export function adminNotificationEmail(data: {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
}) {
  const { name, email, organization, subject, message } = data;
  const rows = [
    ["Name", name],
    ["Email", email],
    ...(organization ? [["Organization", organization]] : []),
    ["Subject", subject],
  ];

  const html = `${WRAPPER_START(`New portfolio contact from ${name}`)}
    <h1 style="margin:0 0 16px;font-size:20px;font-weight:400;color:#15171a;">New Contact Form Submission</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rows
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:6px 0;font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8a8f95;width:120px;vertical-align:top;">${escapeHtml(
          label
        )}</td>
        <td style="padding:6px 0;font-size:14px;color:#15171a;">${escapeHtml(value)}</td>
      </tr>`
        )
        .join("")}
    </table>
    <div style="padding:16px;background-color:#f6f4ef;border:1px solid #e0dbd0;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#15171a;white-space:pre-wrap;">${escapeHtml(
        message
      )}</p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#5b6168;">Reply directly to this email to respond to ${escapeHtml(
      name
    )}.</p>
  ${WRAPPER_END}`;

  const text = [
    "New Contact Form Submission",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    message,
  ].join("\n");

  return { subject: `[Portfolio] ${subject}`, html, text };
}

export function visitorConfirmationEmail(data: { name: string; subject: string }) {
  const { name, subject } = data;

  const html = `${WRAPPER_START("Thank you for reaching out")}
    <h1 style="margin:0 0 16px;font-size:20px;font-weight:400;color:#15171a;">Thank You for Reaching Out</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#15171a;">
      Dear ${escapeHtml(name)},
    </p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#15171a;">
      Thank you for your message regarding &ldquo;${escapeHtml(
        subject
      )}.&rdquo; This is a confirmation that it has been received and will be reviewed personally.
      Please allow a few business days for a response.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.7;color:#15171a;">
      Regards,<br />
      Dr. V. D. Shivling<br />
      <span style="color:#5b6168;">Chief Scientist, CSIR&ndash;CSIO</span>
    </p>
  ${WRAPPER_END}`;

  const text = `Dear ${name},\n\nThank you for your message regarding "${subject}." This is a confirmation that it has been received and will be reviewed personally. Please allow a few business days for a response.\n\nRegards,\nDr. V. D. Shivling\nChief Scientist, CSIR-CSIO`;

  return { subject: "We've received your message", html, text };
}
