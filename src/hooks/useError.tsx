import { createContext, useContext, useState } from "react";

const ErrorContext = createContext({
  error: "",
  handleError: (errorMessage: string) => {},
  resetError: () => {},
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string>("");

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const resetError = () => {
    setError("");
  };

  return (
    <ErrorContext.Provider value={{ error, handleError, resetError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
