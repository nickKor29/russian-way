import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tours from "./pages/Tours";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Tour from "./pages/Tour";
import CreateTour from "./pages/CreateTour";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import Instructors from "./pages/Instructors";
import InstructorDetailPage from "./pages/Instructor";
import CreateInstructor from "./pages/CreateInstructor";
import ArchiveInstructors from "./pages/ArchivedInstructors";
import Reviews from "./pages/Reviews";
import Review from "./pages/Review";
import Participants from "./pages/Participants";
import Participant from "./pages/Participant";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import CreateUser from "./pages/CreateUser";
import Account from "./pages/Account";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToggleSidebarProvider } from "./context/ToggleSidebarContext";
import { ErrorBoundary } from "react-error-boundary"; // Импортируйте ErrorBoundary
import ErrorFallback from "./ui/ErrorFallback"; // Импортируйте ваш компонент обработки ошибок

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "tours", element: <Tours /> },
      { path: "tours/:tourId", element: <Tour /> },
      { path: "instructors", element: <Instructors /> },
      { path: "instructors/:instructorId", element: <InstructorDetailPage /> },
      { path: "archive", element: <ArchiveInstructors /> },
      { path: "tours/new", element: <CreateTour /> },
      { path: "instructors/new", element: <CreateInstructor /> },
      { path: "settings", element: <Settings /> },
      { path: "reviews", element: <Reviews /> },
      { path: "createNewUser", element: <CreateUser /> },
      { path: "participants", element: <Participants /> },
      { path: "participants/:participantId", element: <Participant /> },
      { path: "reviews/:reviewId", element: <Review /> },
      { path: "account", element: <Account /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <DarkModeProvider>
        <ToggleSidebarProvider>
          <RouterProvider router={router} />
        </ToggleSidebarProvider>
      </DarkModeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
