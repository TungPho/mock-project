import { Outlet } from "react-router-dom";

const Root = () => {
  // overview brand
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Root;
