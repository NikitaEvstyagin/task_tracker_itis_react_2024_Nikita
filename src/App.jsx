import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";

import NotifierContext from "./context/NotifierContext";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import ProjectsPage from "./pages/ProjectsPage";
import apolloClient from "./lib/apolloClient"



const App = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const context = useMemo(
    () => ({
      message,
      errorMessage,
      setMessage: (text) => setMessage(text),
      setErrorMessage: (errorText) => setErrorMessage(errorText),
      clearMessage: () => setMessage(""),
      clearErrorMessage: () => setErrorMessage(""),
    }),
    [message, errorMessage],
  );

  return (
    <NotifierContext.Provider value={context}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </NotifierContext.Provider>
  );
};

export default App;