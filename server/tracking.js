// Google Tag Manager and Meta Pixel tags, built from settings.tracking (see
// src/content/types.ts). The server puts them into every page it sends; the
// website adds them itself when it runs without the server (src/lib/tracking.ts).
//
// IDs are checked against their known format, so a typo in the dashboard can't
// break the page.

const valid = {
  gtmId: (id) => /^GTM-[A-Z0-9]{4,12}$/.test(id),
  metaPixelId: (id) => /^\d{6,20}$/.test(id),
  code: (value) => /^[\w-]{4,120}$/.test(value),
};

/** The usable IDs of the switched-on tools; anything off, empty or malformed is "". */
export function trackingIds(tracking) {
  const gtm = tracking?.gtm || {};
  const meta = tracking?.meta || {};
  const gtmId = String(gtm.containerId || "").trim().toUpperCase();
  const metaPixelId = String(meta.pixelId || "").trim();
  return {
    gtmId: gtm.enabled !== false && valid.gtmId(gtmId) ? gtmId : "",
    metaPixelId: meta.enabled !== false && valid.metaPixelId(metaPixelId) ? metaPixelId : "",
  };
}

/** True when the ID is filled in but not in the right format. */
export function trackingIdProblems(tracking) {
  const gtmId = String(tracking?.gtm?.containerId || "").trim().toUpperCase();
  const pixelId = String(tracking?.meta?.pixelId || "").trim();
  const code = String(tracking?.meta?.domainVerification || "").trim();
  return {
    gtm: gtmId !== "" && !valid.gtmId(gtmId),
    meta: pixelId !== "" && !valid.metaPixelId(pixelId),
    verification: code !== "" && !valid.code(code),
  };
}

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** HTML for the end of <head>. */
export function trackingHead(tracking) {
  const parts = ["<script>window.__DO_TRACKING__=true</script>"];
  // Domain verification stays even when the pixel is switched off.
  const verification = String(tracking?.meta?.domainVerification || "").trim();
  if (valid.code(verification)) parts.push(`<meta name="facebook-domain-verification" content="${attr(verification)}" />`);

  const { gtmId, metaPixelId } = trackingIds(tracking);
  if (gtmId) {
    parts.push(
      `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`,
    );
  }
  if (metaPixelId) {
    // disablePushState: the site reports its own page changes (src/lib/tracking.ts),
    // so the pixel mustn't count them a second time.
    parts.push(
      `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq.disablePushState=true;fbq('init','${metaPixelId}');fbq('track','PageView');</script>`,
    );
  }
  return parts.join("\n");
}

/** HTML for the start of <body> (fallbacks for visitors without JavaScript). */
export function trackingBody(tracking) {
  const { gtmId, metaPixelId } = trackingIds(tracking);
  const parts = [];
  if (gtmId) parts.push(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
  if (metaPixelId) parts.push(`<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1" /></noscript>`);
  return parts.join("\n");
}
