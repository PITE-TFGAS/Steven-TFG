// Al instalar o iniciar la extensión
chrome.runtime.onInstalled.addListener(() => {
  console.log('PITEGAS instalada');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('PITEGAS iniciada');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['dist/content.bundle.js']
  });
});