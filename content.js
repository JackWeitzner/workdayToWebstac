function extractCourseData() {
    let courses = Array.from(document.querySelectorAll('span.gwt-InlineLabel'));

    // Filter out non-course items by checking if the content has a pipe symbol "|"
    return courses.filter(course => course.innerText.includes('|')).map(course => ({
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
