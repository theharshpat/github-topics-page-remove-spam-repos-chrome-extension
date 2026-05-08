const DEFAULT_BLOCKED_USERS = ["Dicklesworthstone"];

let blockedUsers = [];

async function loadBlockedUsers() {
  const result = await chrome.storage.sync.get("blockedUsers");

  if (
    !result.blockedUsers ||
    !Array.isArray(result.blockedUsers)
  ) {
    await chrome.storage.sync.set({
      blockedUsers: DEFAULT_BLOCKED_USERS
    });

    blockedUsers = DEFAULT_BLOCKED_USERS;
    return;
  }

  blockedUsers = result.blockedUsers;
}

function removeBlockedRepos() {
  const articles = document.querySelectorAll("article");

  articles.forEach(article => {
    const shouldRemove = blockedUsers.some(username => {
      return article.querySelector(
        `h3 a[href="/${username}"]`
      );
    });

    if (shouldRemove) {
      article.remove();
    }
  });
}

async function start() {
  await loadBlockedUsers();

  removeBlockedRepos();

  const observer = new MutationObserver(removeBlockedRepos);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.blockedUsers) {
    blockedUsers = changes.blockedUsers.newValue || [];
    removeBlockedRepos();
  }
});

start();
