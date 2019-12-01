let requestFilter = {
  urls: ["<all_urls>"]
};
let extraInfoSpec = ['requestHeaders', 'blocking', 'extraHeaders'];

let handler = details => {
  let headers = details.requestHeaders;
  let blockingResponse = {};

  let isRefererSet = false;
  for (var i = 0, l = headers.length; i < l; i++) {
    if (headers[i].name.toLowerCase() == "referer") {
      headers[i].value = "https://fb.me/";
      isRefererSet = true;
    }
  }

  if (!isRefererSet) {
    headers.push({ name: "referer", value: "https://fb.me/" });
  }

  blockingResponse.requestHeaders = headers;
  return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  handler,
  requestFilter,
  extraInfoSpec
);
