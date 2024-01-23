"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [verified, setVerified] = useState(false);

  const [data, setData] = useState({
    totalRegistered: 0,
    byOS: {
      win32: 0,
      darwin: 0,
      linux: 0,
    },
    byVersion: [
      {
        "v0.0.1": "0",
      },
    ],
    lastMonth: {
      totalRegistered: 0,
      byOS: {
        win32: 0,
        darwin: 0,
        linux: 0,
      },
      byVersionMonthly: [
        {
          "v0.0.1": "0",
        },
      ],
    },
  });

  const [popularVersion, setPopularVersion] = useState("v0.0.0");

  const [latestRelease, setLatestRelease] = useState("v0.0.0");

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        //console.log(response);
        const { username, discriminator, avatar, id } = response;
        //set the avatar image by constructing a url to access discord's cdn
        if (accessToken) {
          if (id == "910968511273263104" || id == "418876976963649536") {
            //set the welcome username string
            document.getElementById("name").innerText = `${username}`;
            setVerified(true);
          }
        }
      })
      .catch(console.error);

    fetch("/api/analytics")
      .then((result) => result.json())
      .then((response) => {
        setData(response);

        setPopularVersion(
          response.byVersion.reduce((prev, current) => {
            return prev > current ? prev : current;
          })
        );
      })
      .catch(console.error);

    fetch(
      "https://api.github.com/repos/unissh-team/unissh-releases/releases/latest"
    )
      .then((result) => result.json())
      .then((response) => {
        setLatestRelease(response.tag_name);
      })
      .catch(console.error);
  }, []);

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

        <div className="navbar-end mr-2">
          <a
            role="button"
            className="transition-all text-xs text-white/50 hover:text-white/70"
            href="https://discord.com/api/oauth2/authorize?client_id=1198751523589599315&response_type=token&redirect_uri=https%3A%2F%2Funissh-admin.vercel.app%2F&scope=identify"
            id="name"
          >
            login
          </a>
        </div>
      </div>

      {verified ? (
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
                  <div className="stat-value">
                    {data.lastMonth.totalRegistered}
                  </div>
                  <div className="stat-desc">Last 31 Days</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Most popular version:</div>
                  <div className="stat-value">
                    {Object.keys(popularVersion)[0]}
                  </div>
                  <div className="stat-desc">Latest: {latestRelease}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-4 flex grow justify-center items-center h-32">
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=1198751523589599315&response_type=token&redirect_uri=https%3A%2F%2Funissh-admin.vercel.app%2F&scope=identify"
              className="btn bordered-all hover:bordered-all"
            >
              Login
            </a>
          </div>
        </>
      )}
    </main>
  );
}
