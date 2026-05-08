const DEFAULT_BLOCKED_USERS = ["Dicklesworthstone"];

const userList = document.getElementById("userList");
const usernameInput = document.getElementById("usernameInput");
const addButton = document.getElementById("addButton");

async function getUsers() {
  const result = await chrome.storage.sync.get("blockedUsers");

  if (
    !result.blockedUsers ||
    !Array.isArray(result.blockedUsers)
  ) {
    await chrome.storage.sync.set({
      blockedUsers: DEFAULT_BLOCKED_USERS
    });

    return DEFAULT_BLOCKED_USERS;
  }

  return result.blockedUsers;
}

async function saveUsers(users) {
  await chrome.storage.sync.set({
    blockedUsers: users
  });
}

async function renderUsers() {
  const users = await getUsers();

  userList.innerHTML = "";

  users.forEach(username => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = username;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", async () => {
      const updatedUsers = users.filter(
        user => user !== username
      );

      await saveUsers(updatedUsers);

      renderUsers();
    });

    li.appendChild(span);
    li.appendChild(removeButton);

    userList.appendChild(li);
  });
}

addButton.addEventListener("click", async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    return;
  }

  const users = await getUsers();

  if (users.includes(username)) {
    usernameInput.value = "";
    return;
  }

  users.push(username);

  await saveUsers(users);

  usernameInput.value = "";

  renderUsers();
});

usernameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    addButton.click();
  }
});

usernameInput.focus();

renderUsers();
