

export default async function RegisteredStats() {

  let data = await (
    await fetch("https://unissh-admin.vercel.app/api/analytics", {
      next: {
        revalidate: 60,
      },
    })
  ).json();

  let popularVersion = Object.keys(
    await data.byVersion.reduce((prev, current) => {
      return prev > current ? prev : current;
    })
  )[0];

  let latestRelease = await (
    await fetch(
      "https://api.github.com/repos/unissh-team/unissh-releases/releases/latest",
      { cache: "no-store" }
    )
  ).json();

  return (
    <>
      <div className="flex flex-col p-4 gap-3">
        <div className="">
          <div className="label pt-0 font-semibold text-xl text-shadow-white">
            Register Statistics:
          </div>
          <div className="stats shadow-xl bg-black">
            <div className="stat">
              <div className="stat-title">Total Registered</div>
              <div className="stat-value">{data.totalRegistered}</div>
              <div className="stat-desc">From Analytics API</div>
            </div>

            <div className="stat">
              <div className="stat-title">New Users</div>
              <div className="stat-value">{data.lastMonth.totalRegistered}</div>
              <div className="stat-desc">Last 31 Days</div>
            </div>

            <div className="stat">
              <div className="stat-title">Most popular version:</div>
              <div className="stat-value">{popularVersion}</div>
              <a
                href={latestRelease.html_url}
                target="_blank"
                className="stat-desc hover:text-white/30 transition-all"
              >
                Latest: {latestRelease.tag_name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
