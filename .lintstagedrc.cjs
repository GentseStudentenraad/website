module.exports = {
    "*": "prettier --plugin-search-dir . --check",
    ".ts": ["eslint"],
    ".js": ["eslint"],
    ".svelte": ["eslint"],
};
