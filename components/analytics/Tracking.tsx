import Script from "next/script";
import type { TrackingSettings } from "@/lib/tracking";

// Escape </script> and </noscript> sequences so admin-supplied snippets
// can't break out of the tag they're rendered inside.
function safe(code: string) {
  return code.replace(/<\/(script|noscript)/gi, "<\\/$1");
}

export function TrackingHeadCode({ settings }: { settings: TrackingSettings }) {
  if (!settings.customHeadCode) return null;
  return <div dangerouslySetInnerHTML={{ __html: safe(settings.customHeadCode) }} />;
}

// Placed at the very start of <body>. Order matters here: GTM's noscript
// fallback must be immediately after the body tag opens.
export function TrackingBodyStart({ settings }: { settings: TrackingSettings }) {
  const { gtmId, ga4Id, metaPixelId } = settings;
  if (!gtmId && !ga4Id && !metaPixelId) return null;

  return (
    <>
      {gtmId && (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        </>
      )}

      {ga4Id && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
            }}
          />
        </>
      )}

      {metaPixelId && (
        <>
          <Script
            id="meta-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}

export function TrackingBodyEnd({ settings }: { settings: TrackingSettings }) {
  if (!settings.customBodyEndCode) return null;
  return <div dangerouslySetInnerHTML={{ __html: safe(settings.customBodyEndCode) }} />;
}
