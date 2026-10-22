/**
 * Deploy as a Google Apps Script Web App (Execute as: Me, Who has access: Anyone).
 * Paste the Web App URL into CCPA_GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * Sheet columns (row 1 headers recommended):
 * Submitted At | First Name | Last Name | Address | City | State | Zip | Email | Phone |
 * Preferred Contact | Receive Via | Want Access | Want Delete | Want Opt-Out Sale |
 * Authorized Agent | IP | User Agent
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}")
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheets()[0] ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet()

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "First Name",
        "Last Name",
        "Address",
        "City",
        "State",
        "Zip",
        "Email",
        "Phone",
        "Preferred Contact",
        "Receive Via",
        "Want Access",
        "Want Delete",
        "Want Opt-Out Sale",
        "Authorized Agent",
        "IP",
        "User Agent",
      ])
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.firstName || "",
      data.lastName || "",
      data.address || "",
      data.city || "",
      data.state || "",
      data.zip || "",
      data.email || "",
      data.phone || "",
      data.preferredContactMethod || "",
      data.receiveInformationVia || "",
      data.wantAccess || "",
      data.wantDelete || "",
      data.wantOptOutSale || "",
      data.isAuthorizedAgent || "",
      data.ip || "",
      data.userAgent || "",
    ])

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(error) })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
