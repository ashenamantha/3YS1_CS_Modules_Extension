const links = {
  "ESIS": "https://courseweb.sliit.lk/course/view.php?id=7205",
  "CRYPTO": "https://courseweb.sliit.lk/course/view.php?id=7203",
  "ISPM": "https://courseweb.sliit.lk/course/view.php?id=7202",
  "DOSS": "https://courseweb.sliit.lk/course/view.php?id=7201",
  "AIA": "https://courseweb.sliit.lk/course/view.php?id=7204"
};

function setupModuleButtons() {
  for (const [id, url] of Object.entries(links)) {
    document.getElementById(id).addEventListener('click', () => {
      chrome.tabs.create({ url: url });
    });
  }
}

function checkLMS(tabUrl) {
  return tabUrl.startsWith("https://courseweb.sliit.lk/");
}

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentUrl = tabs[0].url || "";
    const modulesDiv = document.getElementById("modules");
    const notLmsDiv = document.getElementById("not-lms");

    if (checkLMS(currentUrl)) {
      modulesDiv.style.display = "flex";
      notLmsDiv.style.display = "none";
      setupModuleButtons();
    } else {
      modulesDiv.style.display = "none";
      notLmsDiv.style.display = "block";
    }
  });
});