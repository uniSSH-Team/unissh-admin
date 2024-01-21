export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="navbar min-h-min h-[40px] drag bordered-b" id="navbar">
        <div
          className="navbar-start ml-2 flex flex-row gap-4"
          id="navbar_start"
        >
          <div className="dropdown no-drag" id="navbar_start_btn">
            <div tabIndex={0} role="button" className="">
              <h1
                to={"/"}
                className="transition-all text-xs text-white/50 hover:text-white/70"
              >
                home
              </h1>
            </div>
          </div>

          <div className="dropdown no-drag h-full" id="navbar_start_btn_about">
            <div tabIndex={0} role="button" className="align-middle">
              <h1 className="transition-all text-xs text-white/50 hover:text-white/70">
                about
              </h1>
            </div>
            <ul className="dropdown-content bordered-all mt-3 z-[1] shadow bg-neutral rounded-lg w-64 p-4">
              <h1>uniSSH Admin Dashboard</h1>
              <a className="text-sm">Dashboard for analytics</a>
              <h1 className="text-xs">
                Made by{" "}
                <a
                  className="transition-all hover:text-white/50 after:content-['_↗']"
                  href=""
                >
                  {" "}
                  Juaneth{" "}
                </a>
              </h1>
            </ul>
          </div>
        </div>

        <div className="navbar-center no-drag">
          <div className="tooltip tooltip-bottom" data-tip="v0.0.1">
            <a className="transition-all select-none text-sm hover:text-white/60">
              uniSSH Admin Dashboard
            </a>
          </div>
        </div>

        <div className="navbar-end"></div>
      </div>

      <div className="flex flex-col p-4 gap-3">
        <div className="">
          <div className="label pt-0">Statistics:</div>
          <div className="stats shadow-xl bg-black">
            <div className="stat">
              <div className="stat-title">Montly active users</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Last 31 Days</div>
            </div>

            <div className="stat">
              <div className="stat-title">New Users</div>
              <div className="stat-value">5k</div>
              <div className="stat-desc">Last 31 Days</div>
            </div>

            <div className="stat">
              <div className="stat-title">Feature Requests</div>
              <div className="stat-value">13</div>
              <div className="stat-desc">From GitHub</div>
            </div>

            <div className="stat">
              <div className="stat-title">Current Version:</div>
              <div className="stat-value">v0.0.1</div>
              <div className="stat-desc">From GitHub</div>
            </div>

            <div className="stat">
              <div className="stat-title">Most popular version:</div>
              <div className="stat-value">v0.0.1</div>
              <div className="stat-desc">From Analytics API</div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="label pt-0">Push new verion:</div>
        </div>
      </div>
    </main>
  );
}
