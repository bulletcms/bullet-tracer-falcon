# TODO

- [ ] nav
  - [ ] nav updates view from fetch state
- [ ] performance
  - [ ] gulp-imagemin OR tiny png
- [ ] dashboard
  - [ ] authentication manager
  - [ ] pages editor
    - [x] parse bulletmark
    - [ ] send post request
      - [ ] post system will compose of action creators and a queue
    - [ ] view list of pages
    - [ ] edit pages
  - [ ] blog post editor

### Done
- [x] new app boot process
   - [x] first pagelistfetch
   - [x] page state has list of accessible pages from pagelistfetch
   - [x] page can get pages based on route
   - [x] page fetch services
- [x] page renderer
  - [x] fetch action created from view
  - [x] fetch action fetches data
    - [x] fetch action dispatches stop requesting more api calls
  - [x] data pass from action to reducer to state
  - [x] page component updates from state
  - [x] renderer assembles view from json
    - [x] page renderer must use react create element
- [x] style
  - [x] refactor scss into config and main
