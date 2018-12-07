const gulp = require('gulp')
const connect = require('gulp-connect-php')
const browserSync = require('browser-sync')

let dirs = []
const WATCH_DIRS = process.env.WATCH_DIRS
const IGNORE_DIRS = process.env.IGNORE_DIRS

const setDirs = (env, dirs, i = true) => {
  if (env !== undefined) {
    for (const dir of env.split('&&')) {
      dirs.push(`${i ? '' : '!'}dist/${dir}/**/*`)
    }
  }
}

const showDirs = (dirs) => {
  for (const dir of dirs) {
    console.log(
      dir.startsWith('!')
        ? `ignoring "${dir.slice(5)}"`
        : `watching "${dir.slice(4)}"`,
    )
  }
}

setDirs(WATCH_DIRS, dirs)
if (dirs.length === 0) {
  dirs.push(`dist/**/*`)
}
setDirs(IGNORE_DIRS, dirs, false)

gulp.task('serve', () => {
  connect.server(
    {
      base: 'dist',
      open: false,
    },
    () => {
      browserSync({
        proxy: '127.0.0.1:8000',
        open: false,
      })
    },
  )
})

gulp.task('reload', () => {
  browserSync.reload()
  console.log('-------------------------------------')
  showDirs(dirs)
  console.log('-------------------------------------')
})

gulp.task('default', ['serve'], () => {
  gulp.watch(dirs, ['reload'])
  showDirs(dirs)
})
