class DemoAppPage {
    constructor(page) {
        this.page = page;

        // locators

        this.usernameInput = `#username`;
        this.passwordInput = `#password`;
        this.loginButton = `button[type="submit"]`;
        this.navButton = (text) => `nav.flex-1 button:has-text("${text}")`;
        this.column = (columnName) => `main .flex-col:has(h2:has-text("${columnName}"))`;
        this.task = (taskName) => `h3:has-text("${taskName}")`;
        this.tag = (tagName) => `span:has-text("${tagName}")`
    }

    async login(username, password) {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async nagivateTo(navText) {
        await this.page.locator(this.navButton(navText)).click();
    }

    async getColumn(columnName) {
        return this.page.locator(this.column(columnName))
    }

    async getTask(columnLocator, taskName) {
        return columnLocator.locator(this.task(taskName))
    }

    async getTag(taskLocator, tagName) {
        return taskLocator.locator(this.tag(tagName))
    }

    async getTaskParentDiv(taskLocator) {
        return taskLocator.locator('..'); // Finds the parent div of the task
    }

    async verifyTagExists(taskLocator, tagName) {
        const parentDivLocator = await this.getTaskParentDiv(taskLocator);
        const tagLocator = parentDivLocator.locator(this.tag(tagName));
        return tagLocator; // Returns the tag locator for validation
    }
}

export default DemoAppPage;