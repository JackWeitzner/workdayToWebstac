document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getCourses" }, (response) => {
      if (response && response.data) {
        displayCourses(response.data);
      } else {
        document.getElementById("course-container").innerHTML = "<p>No courses found.</p>";
      }
    });
  });
});

function displayCourses(courses) {
  const container = document.getElementById("course-container");
  container.innerHTML = ""; // Clear previous content

  courses.forEach(course => {
    const courseElem = document.createElement("div");
    courseElem.className = "course-card";
    courseElem.innerHTML = `<h2>${course.title}</h2><p>Status: ${course.status}</p><p>Department: ${course.department}</p>`;
    container.appendChild(courseElem);
  });
}