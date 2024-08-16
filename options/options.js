document.addEventListener("DOMContentLoaded", function () {
  const redirectionUrl = document.getElementById("redirection_url");
  const saveBtn = document.getElementById("save-btn");

  // Initialize storage with default value if it doesn't exist
  chrome.storage.local.get("redirection_url", function (result) {
    if (!result.redirection_url) {
      let defaultRedirectionUrl = "https://xcancel.com"
      chrome.storage.local.set({ redirection_url: defaultRedirectionUrl });
      redirectionUrl.value = defaultRedirectionUrl;
    } else {
      redirectionUrl.value = result.redirection_url;
    }
  });

  saveBtn.addEventListener("click", function () {
    const redirection_url = redirectionUrl.value;
    chrome.storage.local.set({ redirection_url: redirection_url });
  });
});
