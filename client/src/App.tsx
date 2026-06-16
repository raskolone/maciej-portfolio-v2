import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import CribroHome from "./pages/CribroHome";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/apps"} component={Apps} />
      <Route path={"/cribro"} component={CribroHome} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    // Show loading screen only once per session
    return !sessionStorage.getItem("cribro_loaded");
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem("cribro_loaded", "1");
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Maciej Wyrozumski — English Coach & Builder";
  }, []);

  return (
    <ErrorBoundary>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <ThemeProvider
        defaultTheme="dark"
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
