import { Outlet } from "react-router-dom";
import Hero from "../components/Hero";
import { getAuthData } from "../services/auth";

const loader = async () => {
  const data = getAuthData();
  return data;
};

const Root = () => {
  return (
    <>
      <Hero />
      <main>
        <Outlet />
      </main>
    </>
  );
};

Root.loader = loader;

export default Root;
