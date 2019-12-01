let requestFilter = {
  urls: ["<all_urls>"]
};

let extraInfoSpec = ["requestHeaders", "blocking"];
let handler = details => {
  let isRefererSet = false;
  let headers = details.requestHeaders,
    blockingResponse = {};

  for (let i = 0, l = headers.length; i < l; ++i) {
    if (headers[i].name.toLowerCase() == "referer") {
      headers[i].value = "http://fb.com/";
      isRefererSet = true;
      break;
    }
  }

  if (!isRefererSet) {
    headers.push({
      name: "Referer",
      value: "http://fb.com/"
    });
  }

  blockingResponse.requestHeaders = headers;
  return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  handler,
  requestFilter,
  extraInfoSpec
);
