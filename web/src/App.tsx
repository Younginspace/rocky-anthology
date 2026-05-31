import { Component, type ReactNode } from 'react';
import './styles/game.css';
import { wipe } from './state/persistence';
import { GameProvider, useGame } from './state/gameStore';
import { Backdrop, StatusBar } from './components/Chrome';
import { BootScreen } from './components/BootScreen';
import { CallArchive } from './components/CallArchive';
import { InCall } from './components/InCall';
import { CardCollection } from './components/CardCollection';
import { MorningMontage } from './components/MorningMontage';
import { CardToast } from './components/CardToast';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) { console.error('[app] render error:', error); }
  render() {
    if (this.state.error) {
      return (
        <div className="boot" style={{ height: '100dvh' }}>
          <div className="boot-title" style={{ fontSize: 26 }}>通讯中断</div>
          <p className="boot-tag">链路出现异常。先试试重新接入；若反复失败，可清除本地存档后重启。</p>
          <div className="end-actions" style={{ marginTop: 24 }}>
            <button className="btn" onClick={() => location.reload()}>重新接入 ↻</button>
            <button className="btn ghost" onClick={() => { wipe(); location.reload(); }}>清除存档并重启</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Screen() {
  const { screen } = useGame();
  switch (screen) {
    case 'boot': return <BootScreen />;
    case 'archive': return <CallArchive />;
    case 'incall': return <InCall />;
    case 'cards': return <CardCollection />;
    case 'montage': return <MorningMontage />;
    default: return <CallArchive />;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <Backdrop />
        <div className="shell">
          <StatusBar />
          <Screen />
        </div>
        <CardToast />
      </GameProvider>
    </ErrorBoundary>
  );
}
