let redirectionUrl;

chrome.storage.local.get("redirection_url", function (result) {
  redirectionUrl = result.redirection_url;
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
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
    chrome.tabs.update(event.tabId, { url: redirectUrl });
  }
};

chrome.webNavigation.onBeforeNavigate.addListener(navigateGuard);
