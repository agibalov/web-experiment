# angular-typeorm-experiment

Learning how well Angular, [TypeORM](http://typeorm.io/#/) and [sql.js](https://github.com/kripken/sql.js/) play together.

Launch with:
```
ng serve --extra-webpack-config webpack.partial.js
```

Build with:
```
ng build --extra-webpack-config webpack.partial.js
```

## Findings

1. sql.js wants node's `crypto` and `fs`. To make them available, I had to use [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) to extend the Angular's webpack configuration (Angular CLI 7.x says they're planning to completely eliminate the `eject` feature and suggest to use extensions like `ngx-build-plus` instead).
