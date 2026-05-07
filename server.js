const express = require("express");
const httpProxy = require("http-proxy");

const app = express();

const proxy = httpProxy.createProxyServer({
    target: "https://devglobe.xyz",
    changeOrigin: true,
    ws: true,
    secure: true,
    selfHandleResponse: true,

    headers: {
        "accept-encoding": "identity"
    }
});


// =========================
// JS injecté
// =========================
const injectedScript = `
<script>

(function () {

function cleanUI() {

    // 🌍 Globe fullscreen
    const globe = document.querySelector("#globe-card");

    if (globe) {

        globe.style.position = "fixed";
        globe.style.inset = "0";
        globe.style.width = "100vw";
        globe.style.height = "100vh";
        globe.style.zIndex = "999999";
        globe.style.background = "black";
    }

    // 🧹 Activity
    document.querySelectorAll('div.z-\\\\[660\\\\]')
        .forEach(e => e.remove());

    // 🧹 Toolbar
    document.querySelectorAll('div.z-\\\\[650\\\\]')
        .forEach(e => e.remove());

    // 🧹 Search
    document.querySelectorAll('div.z-\\\\[600\\\\]')
        .forEach(div => {

            const txt = (div.textContent || "").toLowerCase();

            if (
                txt.includes("search developers") ||
                div.querySelector("input")
            ) {
                div.remove();
            }
        });

    // 🧹 Buttons
    document.querySelectorAll("button").forEach(btn => {

        const txt = (btn.textContent || "").toLowerCase();

        if (
            txt.includes("sign in") ||
            btn.querySelector(".lucide-expand")
        ) {
            btn.remove();
        }
    });

    // 🔒 Disable interactions
    document.querySelectorAll("*").forEach(el => {
        el.style.pointerEvents = "none";
        el.style.userSelect = "none";
    });

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
}

cleanUI();
setInterval(cleanUI, 500);

})();

</script>
`;


// =========================
// Injection HTML
// =========================
proxy.on("proxyRes", (proxyRes, req, res) => {

    const contentType =
        proxyRes.headers["content-type"] || "";

    // non HTML
    if (!contentType.includes("text/html")) {

        res.writeHead(
            proxyRes.statusCode,
            proxyRes.headers
        );

        proxyRes.pipe(res);

        return;
    }

    let body = [];

    proxyRes.on("data", chunk => {
        body.push(chunk);
    });

    proxyRes.on("end", () => {

        try {

            body = Buffer.concat(body)
                .toString("utf8");

            body = body.replace(
                "</body>",
                injectedScript + "</body>"
            );

            delete proxyRes.headers["content-length"];

            res.writeHead(
                proxyRes.statusCode,
                proxyRes.headers
            );

            res.end(body);

        } catch (e) {

            console.error(e);
            res.end();
        }
    });
});


// =========================
// Routes
// =========================
app.use((req, res) => {
    proxy.web(req, res);
});


// =========================
// WebSocket
// =========================
const server = app.listen(50234, () => {
    console.log("http://localhost:50234/space");
});

server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
});