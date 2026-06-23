import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";

export function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<Navigate to="/privacy-policy" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
