import type { LocalizedText } from '../engine/types';
import { useGame } from '../state/gameContext';
import { loc } from '../lib/i18n';

/**
 * Renders a piece of story text per the active display mode:
 *  - 'both' → Chinese primary + English as a smaller, dimmer line beneath
 *  - 'zh' / 'en' → that single language
 * Used for narrative surfaces (dialogue, choices, cards, reason, outcome).
 */
export function Bi({ text }: { text?: LocalizedText }) {
  const { lang } = useGame();
  if (text == null) return null;

  if (lang === 'both') {
    const zh = loc(text, 'zh');
    const en = loc(text, 'en');
    return (
      <>
        {zh}
        {en && en !== zh && <span className="bi-en">{en}</span>}
      </>
    );
  }
  return <>{loc(text, lang === 'en' ? 'en' : 'zh')}</>;
}
