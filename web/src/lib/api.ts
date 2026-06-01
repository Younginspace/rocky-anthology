import { getUid } from '../state/persistence';

export type FeedbackKind = 'resonated' | 'share' | 'wish';

export interface FeedbackRow {
  kind: FeedbackKind;
  episodeId?: string;
  content: string;
}

/** Submit one or more "letters to Rocky". Returns true if all succeeded. */
export async function submitFeedback(rows: FeedbackRow[], lang: string): Promise<boolean> {
  if (rows.length === 0) return false;
  const uid = getUid();
  try {
    const results = await Promise.all(
      rows.map((r) =>
        fetch('/api/public/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, kind: r.kind, episodeId: r.episodeId, content: r.content, lang }),
        }),
      ),
    );
    return results.every((res) => res.ok);
  } catch {
    return false;
  }
}

export async function fetchFeedbackCount(): Promise<number | null> {
  try {
    const res = await fetch('/api/public/feedback/count');
    if (!res.ok) return null;
    const json = (await res.json()) as { count?: unknown };
    return typeof json.count === 'number' ? json.count : null;
  } catch {
    return null;
  }
}
