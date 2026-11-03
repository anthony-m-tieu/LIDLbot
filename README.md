# Development Notes

## Project Objectives:

This project is currently under development, to be built as the successor to the [LIDLbot Experiment Platform](https://github.com/Lab-for-Infant-Development-and-Language/LIDLbot-Experiment-Platform). It is designed based on lessons we have learned during the development and usage of the old system. Primary objectives include:

- Improved user experience.
- Integrated experiment builder and runner.
- Simplified configuration files.
- Support for both a web and desktop app.

## Running from Source:
1. Clone the project from GitHub.
2. Install node.js `v22.23.4 LTS`.
3. To install the required node modules, open a terminal in the project root folder and run `npm install`.
4. To run the project:
    - For the desktop app, open a terminal in the project root folder and run `npm run start`.
    - Otherwise, for the web app, open a terminal in the project root folder and run `npm run start:web`. The terminal will return a URL, open the URL in a browser.

## To-Do:

- [ ] Add caching of app preferences.
- [ ] Implement web versions of opening external links and app scaling. 
- [ ] Deploy to GitHub pages

## Completed:

### Functionality:

### Visual Components:

#### Toolbar:
- [x] Add `ModeToggle`.
- [x] Add `NavigationMenu`.
- [x] Add `ApplicationMenu`.
- [x] Add animated menu indicator (for `NavigationMenu` and `ApplicationMenu`).
- [x] Handle `Toolbar` layout on window resize.
- [x] Add horizontal scroll when `Toolbar` becomes too small to display all menus. Add edge gradients to visually indicate scrollability.
- [x] Add visual separators between the left, center, and right sections of the `Toolbar` (only when fully compressed).
- [x] Add `DropdownMenu` for `ApplicationMenu`.
- [x] Add GitHub link under `ApplicationMenu > Help`.
- [x] Add animation toggle under `ApplicationMenu > Preferences`.
- [x] Add light/dark mode toggle under `ApplicationMenu > Preferences`.
- [x] Add app scaling under `ApplicationMenu > Preferences`.
- [x] Make accent colours change with mode (`Configure` or `Run`).
- [x] Remove `File > New Project`, `File > Save Project`, and `File > Save Project As` options under `Run` mode.
