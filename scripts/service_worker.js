if (typeof browser === "undefined") {
  var xbrowser = chrome;
} else {
  var xbrowser = browser;
}
let redirectionUrl;

xbrowser.storage.local.get("redirection_url", function (result) {
  redirectionUrl = result.redirection_url;
});

xbrowser.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === "local" && changes.redirection_url) {
    redirectionUrl = changes.redirection_url.newValue;
  }
});

const navigateGuard = (event) => {
  const { url } = event;
  const parsedUrl = new URL(url);
  const isTargetDomain = ['twitter.com', 'x.com'].includes(parsedUrl.hostname);

  if (isTargetDomain) {
    const redirectUrl = `${redirectionUrl}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
    xbrowser.tabs.update(event.tabId, { url: redirectUrl });
  }
};

xbrowser.webNavigation.onBeforeNavigate.addListener(navigateGuard);
