import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://559909881952cf2b7411418c143e4d25@o4508942314045440.ingest.us.sentry.io/4508942317780992",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
  ],
});