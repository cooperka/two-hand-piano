import React from 'react';

// Docs: https://github.com/react-static/react-static/blob/master/docs/config.md
export default {
  siteRoot: 'https://cooperka.github.io/',
  basePath: 'two-hand-piano',

  /* eslint-disable react/prop-types */
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />

        <title>Two-hand piano</title>

        {/* Favicon: https://realfavicongenerator.net/ */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=47MJ24bJM7" /> */}
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=47MJ24bJM7" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=47MJ24bJM7" /> */}
        {/* <link rel="manifest" href="/site.webmanifest?v=47MJ24bJM7" /> */}
        {/* <link rel="mask-icon" href="/safari-pinned-tab.svg?v=47MJ24bJM7" color="#000000" /> */}
        {/* <link rel="shortcut icon" href="/favicon.ico?v=47MJ24bJM7" /> */}
        {/* <meta name="apple-mobile-web-app-title" content="LSR" /> */}
        {/* <meta name="application-name" content="LSR" /> */}
        {/* <meta name="msapplication-TileColor" content="#603cba" /> */}
        <meta name="theme-color" content="#444" />

        {/* Facebook Open Graph markup: https://developers.facebook.com/tools/debug/og/object/ */}
        {/* <meta property="og:type" content="article" /> */}
        {/* <meta property="og:image" content="https://example.com/facebook-preview-v3.png" /> */}
        {/* <meta property="og:image:width" content="800" /> */}
        {/* <meta property="og:image:height" content="400" /> */}

        {/* http://google.github.io/material-design-icons/#icon-font-for-the-web */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        {/* Google Analytics - Global site tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GKL6DDD6BV"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={getGoogleAnalyticsScript()}
        />
      </Head>

      <Body>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        {children}
      </Body>
    </Html>
  ),
  /* eslint-enable */
};

function getGoogleAnalyticsScript() {
  return htmlify(`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GKL6DDD6BV');
  `);
}

/** Returns an object that can be passed to `dangerouslySetInnerHTML`. */
function htmlify(html) {
  return {
    __html: html,
  };
}
