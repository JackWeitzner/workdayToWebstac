function extractCourseData() {
    let courses = Array.from(document.querySelectorAll('span.gwt-InlineLabel'));

    return courses.map(course => ({
        title: course.innerText.split('|')[0].trim(), // Extract the course name before "|"
        status: course.innerText.includes('|') ? course.innerText.split('|')[1].trim() : "No status",
        department: course.innerText.includes('|') ? course.innerText.split('|')[2].trim() : "No department"
    }));
}

  
  // Send extracted data to popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCourses") {
      sendResponse({ data: extractCourseData() });
    }
  });
  