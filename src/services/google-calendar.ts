import { google } from "googleapis";

export class GoogleCalendarService {
  private calendar;

  constructor(serviceAccountPath: string) {
    const auth = new google.auth.GoogleAuth({
      keyFilename: serviceAccountPath,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    this.calendar = google.calendar({ version: "v3", auth });
  }

  async getEvents(maxResults = 10) {
    const response = await this.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data.items;
  }

  async createEvent(eventData: any) {
    const response = await this.calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    });

    return response.data;
  }
}
