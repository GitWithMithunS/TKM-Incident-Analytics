import { Link, useNavigate , useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isDashboardPage = location.pathname.startsWith( "/dashboard");

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Toyota TKM
            </p>

            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              Incident Analytics
            </h1>
          </div>

          <Link
            to={isDashboardPage ? "/" : "/dashboard"}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {isDashboardPage ? "Back to Home" : "Open Dashboard"}
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;