import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StudyAnalytics from './pages/study-analytics';
import Login from './pages/login';
import DocumentSummarizer from './pages/document-summarizer';
import Dashboard from './pages/dashboard';
import QuestionPaperGenerator from './pages/question-paper-generator';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/study-analytics" element={<StudyAnalytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/document-summarizer" element={<DocumentSummarizer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/question-paper-generator" element={<QuestionPaperGenerator />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
