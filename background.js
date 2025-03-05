chrome.action.onClicked.addListener((tab) => {
  // Inject script into the active tab (the Workday page) to extract course data
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractCourseData
  }, (injectionResults) => {
    if (!injectionResults || injectionResults.length === 0) return;
    
    const courses = injectionResults[0].result;
    
    // Store the courses data in chrome.storage.local
    chrome.storage.local.set({ courses: courses }, () => {
      // Now open the new tab that will display the courses
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html") });
    });
  });
});

// This function is executed in the context of the active tab (Workday page)
function extractCourseData() {
  let courses = Array.from(document.querySelectorAll('span.gwt-InlineLabel'))
    .filter(el => el.innerText.includes('|'))
    .map(course => ({
      title: course.innerText.split('|')[0].trim(),
      status: course.innerText.split('|')[1].trim(),
      department: course.innerText.split('|')[2].trim()
    }));
  return courses;
}
