/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head> 
          {/* code that you want to add to the header */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <div id="fb-root"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v12.0'
              });
            };

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />

        <div className="fb-customerchat"
          attribution="page_inbox"
          page_id="102056112132760">
        </div>
      </Html>
    )
  }
}