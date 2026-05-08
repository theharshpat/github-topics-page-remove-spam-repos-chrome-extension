# GitHub Topics Page - Remove Spam Repos

A Chrome extension that hides repositories from blocked GitHub usernames on GitHub Topics pages.

## How it works

The extension scans GitHub Topics pages (`https://github.com/topics/*`) and removes repository cards authored by users you've blocked. It uses a `MutationObserver` to continuously watch for new content loaded via infinite scroll or dynamic updates.

Changes made in the popup (add/remove blocked users) take effect immediately on open tabs via `chrome.storage.onChanged` — no page refresh needed.

## Usage

1. Click the extension icon in the Chrome toolbar
2. Type a GitHub username and click **Add** (or press Enter)
3. Matching repos on any open Topics page are removed instantly
4. Click **Remove** next to a username to unblock them

## Default blocked user

- `Dicklesworthstone`
