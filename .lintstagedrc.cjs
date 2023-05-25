module.exports = {
    "*": "prettier --plugin-search-dir . --check",
    "*.{ts,js,svelte}": ["eslint"],
};
