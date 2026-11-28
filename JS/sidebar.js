/* JS/sidebar.js — The Ludens Topoï
 * Single source of truth for the sidebar.
 * To publish a new post: add one line to POSTS. Order doesn't matter (sorted by date).
 */
(function () {
    // ---- 1. Edit only here ------------------------------------------------
    const POSTS = [
        { date: "2026-11-27", title: "To Play Is Not to Watch", url: "Posts/ergodic.html",  flags: "games &cap; aesth" },
        { date: "2026-11-25", title: "The Specter of Mathesis", url: "Posts/mathesis.html", flags: "math &cap; phil" },
    ];

    const MAX_RECENT = 5; // how many posts to show under ~/logs/recent

    const NAV = [
        { label: "~/home/welcome", url: "index.html" },
        { label: "~/sys/whoami",   url: "Posts/about.html" },
    ];

    const LINKS = [
        { label: "GitHub",          url: "https://github.com/gustavosilva73" },
        { label: "PhilPapers",      url: "#" },
        { label: "Arxiv",           url: "#" },
        { label: "Repositorio USP", url: "#" },
        { label: "Ludens Archive",  url: "https://github.com/GustavoSilva73/Ludens_Archive" },
    ];
    // -----------------------------------------------------------------------

    // Site root = the folder above JS/. Works from index.html, from Posts/,
    // on GitHub Pages (user or project site) and when opened locally.
    const ROOT = new URL("..", document.currentScript.src);
    const resolve = (u) => (/^(https?:|#)/.test(u) ? u : new URL(u, ROOT).href);
    const here = location.href.split("#")[0];

    const external = (u) => /^https?:/.test(u)
        ? ' target="_blank" rel="noopener noreferrer"' : "";

    const navItems = NAV.map(n =>
        `<li><a href="${resolve(n.url)}">${n.label}</a></li>`).join("");

    const recentItems = [...POSTS]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, MAX_RECENT)
        .map(p => {
            const href = resolve(p.url);
            const current = href === here ? ' aria-current="page"' : "";
            return `<li>
                <span class="post-date">${p.date}</span>
                <a href="${href}" class="post-title"${current}>${p.title}</a>
                <span class="post-flags">[${p.flags}]</span>
            </li>`;
        }).join("");

    const linkItems = LINKS.map(l =>
        `<li><a href="${resolve(l.url)}"${external(l.url)}>${l.label}</a></li>`).join("");

    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div class="title-bar">
            <span>navigation_hub.exe</span>
            <div class="title-bar-controls">
                <div class="btn"></div><div class="btn"></div><div class="btn"></div>
            </div>
        </div>
        <div class="content-area">
            <h2>~/sys/nav</h2>
            <ul class="nav-menu" style="margin-bottom: 40px;">${navItems}</ul>

            <h2>~/logs/recent</h2>
            <ul class="terminal-index">${recentItems}</ul>

            <h2 style="margin-top: 40px;">Links</h2>
            <ul class="nav-menu">${linkItems}</ul>
        </div>`;
})();
