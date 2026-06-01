import { useEffect, useState } from 'react';
import { episodes } from '../content';
import { useGame } from '../state/gameContext';
import { chromeLang, loc, UI } from '../lib/i18n';
import { callSign, getUid } from '../state/persistence';
import { fetchFeedbackCount, submitFeedback, type FeedbackRow } from '../lib/api';

export function FeedbackScreen() {
  const { lang, dispatch } = useGame();
  const cl = chromeLang(lang);
  const t = UI[cl];

  const [ep, setEp] = useState('');
  const [note, setNote] = useState('');
  const [share, setShare] = useState('');
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (status !== 'done') return;
    fetchFeedbackCount().then(setCount);
  }, [status]);

  if (status === 'done') {
    return (
      <div className="scroll">
        <div className="fb-done fadein">
          <div className="fb-done-kicker">{t.fbDoneKicker}</div>
          <h1 className="fb-done-title">{t.fbDoneTitle}</h1>
          <p className="fb-done-body">{t.fbDoneBody}</p>
          {count != null && <p className="fb-done-count">{t.fbDoneCount.replace('{n}', String(count))}</p>}
          <p className="fb-sign">{t.fbYourSign} · <b>{callSign(getUid())}</b></p>
          <div className="end-actions" style={{ marginTop: 26 }}>
            <button className="btn" onClick={() => dispatch({ type: 'GO', screen: 'archive' })}>{t.fbBack}</button>
          </div>
        </div>
      </div>
    );
  }

  const send = async () => {
    const rows: FeedbackRow[] = [];
    if (ep || note.trim()) {
      const epTitle = ep && ep !== 'overall' ? loc(episodes.find((e) => e.id === ep)?.title, cl) : t.fbQ1none;
      rows.push({ kind: 'resonated', episodeId: ep || 'overall', content: note.trim() || epTitle });
    }
    if (share.trim()) rows.push({ kind: 'share', content: share.trim() });
    if (wish.trim()) rows.push({ kind: 'wish', content: wish.trim() });

    if (rows.length === 0) { setStatus('error'); return; }
    setStatus('sending');
    const ok = await submitFeedback(rows, cl);
    setStatus(ok ? 'done' : 'error');
  };

  return (
    <div className="scroll">
      <div className="fb-pad">
        <div className="arch-kicker">{t.fbKicker}</div>
        <h1 className="arch-title">{t.fbTitle}</h1>
        <p className="fb-intro">{t.fbIntro}</p>

        <div className="fb-block">
          <label className="fb-q">{t.fbQ1}</label>
          <select className="fb-select" value={ep} onChange={(e) => setEp(e.target.value)}>
            <option value="">— — —</option>
            <option value="overall">{t.fbQ1none}</option>
            {episodes.map((e) => (
              <option key={e.id} value={e.id}>{String(e.order).padStart(2, '0')} · {loc(e.title, cl)}</option>
            ))}
          </select>
          <textarea className="fb-text" rows={2} placeholder={t.fbQ1note} value={note} onChange={(e) => setNote(e.target.value)} maxLength={2000} />
        </div>

        <div className="fb-block">
          <label className="fb-q">{t.fbQ2}</label>
          <textarea className="fb-text" rows={4} placeholder={t.fbQ2ph} value={share} onChange={(e) => setShare(e.target.value)} maxLength={4000} />
        </div>

        <div className="fb-block">
          <label className="fb-q">{t.fbQ3}</label>
          <textarea className="fb-text" rows={3} placeholder={t.fbQ3ph} value={wish} onChange={(e) => setWish(e.target.value)} maxLength={4000} />
        </div>

        {status === 'error' && (
          <p className="fb-err">{(!ep && !note.trim() && !share.trim() && !wish.trim()) ? t.fbEmpty : t.fbErr}</p>
        )}

        <div className="end-actions" style={{ marginTop: 10 }}>
          <button className="btn ghost" onClick={() => dispatch({ type: 'GO', screen: 'archive' })}>{t.fbBack}</button>
          <button className="btn" disabled={status === 'sending'} onClick={send}>
            {status === 'sending' ? t.fbSending : t.fbSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}
