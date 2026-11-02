Development Notes

Running from Source Code:
1. Clone project from GitHub
2. Install node.js `v22.23.4 LTS` (`v26.13.0 LTS` does not work, have not tried the other ones)
3. In project root folder, run `npm install`
4. In project root folder, run `npm run start`

TODO:

- [ ] Local storage of app preferences


Completed \[Toolbar\]:
- [x] Add separators between left, center, and right top bar sections
- [x] Add background and gradient on left and right top bar sections (so center does not appear behind them on animated mode transition)
- [x] Add dark theme option under Preferences
- [x] Add animation toggle under Preferences
- [x] Remove 'New Project', 'Save Project', and 'Save Project As' options on 'Run' mode
- [x] Fix theme change failing to update Toolbar background when window is small
- [x] Fix sizing and positioning of dropdown item expanding arrow
- [x] Make accent change with mode
- [x] Add app scaling option under Preferences
- [x] Fix dark mode colouring of mode toggle and dropdown menus