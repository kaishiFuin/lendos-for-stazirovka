import { getVariant } from './ab';

type EventPayload = Record<string, unknown>;

function pushEvent(event: string, payload: EventPayload = {}): void {
  window.dataLayer.push({
    event,
    ab_variant: getVariant(),
    timestamp: new Date().toISOString(),
    ...payload,
  });
}

export const analytics = {
  view(section: string) {
    pushEvent('section_view', { section });
  },
  cta(label: string) {
    pushEvent('cta_click', { label });
  },
  leadSubmitted(email: string) {
    pushEvent('lead_submitted', { email });
  },
  spinnerSpin(result: string) {
    pushEvent('spinner_spin', { result });
  },
  timerExpired() {
    pushEvent('timer_expired');
  },
  exitIntentShown() {
    pushEvent('exit_intent_shown');
  },
};
