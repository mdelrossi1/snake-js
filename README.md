# JS Snake

The classic game of [snake](https://en.wikipedia.org/wiki/Snake_(video_game_genre)) created with vanilla JS.

## To play
- a basic server is needed because of CORS issues. I used a global instance of [npm-serve](https://www.npmjs.com/package/serve)
- Latest version of Chrome was used to play.  No cross browser testing was conducted.

## Required TODOs:
- add linter configuration.
- add check in setApple that makes sure the coordinates are not on a square where the snake currently is.
- organize functions better.
  - whether alphabetically or by purpose (handler, utility, etc.).
- find better algorithm to find and change snakeCounts.  Not sure how efficient filtering and updating is.

## Nice to have TODOs:
- Score count
- Game over screen
- Controls for the user to change settings such as board size and snake speed
