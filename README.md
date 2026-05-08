# GitHub Topics Page - Remove Spam Repos

A Chrome extension that hides repositories from blocked GitHub usernames on GitHub Topics pages.

## How it works

The extension scans GitHub Topics pages (`https://github.com/topics/*`) and removes repository cards authored by users you've blocked. It uses a `MutationObserver` to continuously watch for new content loaded via infinite scroll or dynamic updates.

Changes made in the popup (add/remove blocked users) take effect immediately on open tabs via `chrome.storage.onChanged` — no page refresh needed.

This only runs on `https://github.com/topics/*`, so it won't affect normal repo pages, search results, or anything else.

## Install locally

1. Clone this repository:
   ```
   git clone git@github.com:theharshpat/github-topics-page-remove-spam-repos-chrome-extension.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the extension folder

## Usage

1. Navigate to any GitHub Topics page (e.g. `https://github.com/topics/rust`)
2. Click the extensions puzzle icon in the Chrome toolbar
3. Click **GitHub Topics Page - Remove Spam Repos**
4. Type a GitHub username and click **Add** (or press Enter)
5. Matching repos on the Topics page disappear immediately
6. Click **Remove** next to a username to unblock them

Changes sync live across all open tabs — no refresh needed.

## Default blocked user

- `Dicklesworthstone`
