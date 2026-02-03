import { AppProvider, useApp } from '@/contexts/AppContext';
import LandingPage from '@/sections/LandingPage';
import OnboardingPage from '@/sections/OnboardingPage';
import CanvasPage from '@/sections/CanvasPage';
import LoadingPage from '@/sections/LoadingPage';
import ResultPage from '@/sections/ResultPage';
import RiskResultPage from '@/sections/RiskResultPage';
import ProfessionalReportPage from '@/sections/ProfessionalReportPage';
import { Toaster } from '@/components/ui/sonner';

// 路由组件
function AppRouter() {
  const { currentState } = useApp();

  switch (currentState) {
    case 'landing':
      return <LandingPage />;
    case 'onboarding':
      return <OnboardingPage />;
    case 'canvas':
      return <CanvasPage />;
    case 'upload':
      // 上传后直接跳转到加载页
      return <LoadingPage />;
    case 'loading':
      return <LoadingPage />;
    case 'result':
      return <ResultPage />;
    case 'risk-result':
      return <RiskResultPage />;
    case 'professional-report':
      return <ProfessionalReportPage />;
    default:
      return <LandingPage />;
  }
}

// 主应用组件
function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <AppRouter />
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'hsl(30 50% 96%)',
              border: '1px solid hsl(340 20% 85%)',
              borderRadius: '1rem',
            },
          }}
        />
      </div>
    </AppProvider>
  );
}

export default App;