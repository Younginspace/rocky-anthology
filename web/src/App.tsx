import { Component, type ReactNode } from 'react';
import './styles/game.css';
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
          <p className="boot-tag">链路出现异常。刷新页面可重新接入；你的进度已保存。</p>
          <button className="btn" style={{ marginTop: 24 }} onClick={() => location.reload()}>重新接入 ↻</button>
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
