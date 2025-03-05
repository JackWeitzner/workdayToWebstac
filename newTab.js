document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('courses', (result) => {
      const courses = result.courses;
      const container = document.getElementById('course-container');
      if (courses && courses.length > 0) {
        container.innerHTML = ""; // Clear the loading text
        courses.forEach(course => {
          const courseElem = document.createElement('div');
          courseElem.className = "course-card";
          courseElem.innerHTML = `
            <h2>${course.title}</h2>
            <p>Status: ${course.status}</p>
            <p>Department: ${course.department}</p>
          `;
          container.appendChild(courseElem);
        });
      } else {
        container.innerHTML = "<p>No courses found.</p>";
      }
    });
  });
  