import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext.tsx";
import Navbar from "./components/Navbar.tsx";
import AuthModal from "./components/AuthModal.tsx";
import Home from "./pages/Home.tsx";
import SearchPage from "./pages/Search.tsx";
import UnitPage from "./pages/Unit.tsx";
import About from "./pages/About.tsx";
import Support from "./pages/Support.tsx";
import Suggest from "./pages/Suggest.tsx";
import NotFound from "./pages/NotFound.tsx";

function RootLayout() {
  return (
    <AppProvider>
      <Toaster position="bottom-right" richColors />
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <AuthModal />
    </AppProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,          Component: Home       },
      { path: "search",       Component: SearchPage },
      { path: "unit/:code",   Component: UnitPage   },
      { path: "about",        Component: About      },
      { path: "support",      Component: Support    },
      { path: "suggest",      Component: Suggest    },
      { path: "*",            Component: NotFound   },
    ],
  },
]);
