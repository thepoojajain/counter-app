import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
    dsn: "https://07429687c33c435e8932c0b97b9e25e9@o1116106.ingest.sentry.io/6149251",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log
}