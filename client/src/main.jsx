import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Root from "./routes/root";
import "./styles/style.css";
import Index from "./routes";
import ErrorPage from "./routes/error-page";
// import Register from "./routes/auth/register";
import CreateArtwork from "./routes/createArtwork";
import ArtworkDetail from "./routes/artworkDetail";
import EditArtwork from "./routes/editArtwork";
import Login from "./routes/auth/login";
import CreateArtworkFrom from "./routes/createArtworkFrom";
import Profile from "./routes/auth/profile";
import Register from "./routes/auth/register";
import ChangePassword from "./routes/auth/changePassword";
// import ChangeEmail from "./routes/auth/changeEmail";
// import ChangeUsername from "./routes/auth/changeUsername";
import User from "./routes/user";
import { removeAuthData } from "./services/auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: Root.loader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index />, loader: Index.loader },
      {
        path: "/artwork/create",
        element: <CreateArtwork />,
        action: CreateArtwork.action,
        loader: CreateArtwork.loader,
      },
      {
        path: "/artwork/:id",
        element: <ArtworkDetail />,
        loader: ArtworkDetail.loader,
      },
      {
        path: "/artwork/:id/edit",
        element: <EditArtwork />,
        loader: EditArtwork.loader,
        action: EditArtwork.action,
      },
      {
        path: "/artwork/:id/create",
        element: <CreateArtworkFrom />,
        loader: CreateArtworkFrom.loader,
        action: CreateArtworkFrom.action,
      },
      {
        path: "/auth/login",
        element: <Login />,
        action: Login.action,
        loader: Login.loader,
      },
      {
        path: "/auth/changePassword",
        element: <ChangePassword />,
        action: ChangePassword.action,
        loader: ChangePassword.loader,
      },
      // {
      //   path: "/auth/changeEmail",
      //   element: <ChangeEmail />,
      //   action: ChangeEmail.action,
      //   loader: ChangeEmail.loader,
      // },
      // {
      //   path: "/auth/changeUsername",
      //   element: <ChangeUsername />,
      //   action: ChangeUsername.action,
      //   loader: ChangeUsername.loader,
      // },
      {
        path: "/auth/logout",
        action: async () => {
          removeAuthData();
          return redirect("/");
        },
      },
      {
        path: "/auth/register",
        element: <Register />,
        action: Register.action,
      },
      {
        path: "/auth/profile",
        element: <Profile />,
        loader: Profile.loader,
      },
      {
        path: "/users/:id",
        element: <User />,
        loader: User.loader,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
