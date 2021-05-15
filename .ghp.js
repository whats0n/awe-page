const fs = require('fs')
const { exec } = require("child_process")
console.log('------------START ghpages')

const execPromisify = command => new Promise((resolve, reject) => {
  exec(command, error => {
    if (error) {
      console.log(error)
      reject(error)
    } else {
      resolve()
    }
  })
});

;(async function() {
  const content = fs.readFileSync('.gitignore', 'utf8')
  const contentWithoutDist = content.replace('\ndist\n', '\n')

  fs.writeFileSync('.gitignore', contentWithoutDist, 'utf8')

  const commitMessage = process.argv[2] || 'update gh-pages'
  console.log('------------COMMIT MESSAGE', commitMessage)

  const commands = [
    'git push origin --delete gh-pages',
    'git add dist',
    `git commit -m "${commitMessage}"`,
    'git subtree push --prefix dist origin gh-pages',
    'git reset HEAD~'
  ]

  const command = commands.join('; ')

  await execPromisify(command)

  fs.writeFileSync('.gitignore', content, 'utf8')

  console.log('------------END ghpages')
})()

