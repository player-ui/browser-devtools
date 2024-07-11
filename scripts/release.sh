export PATH=$(pnpm bin):$PATH

VERSION=`pnpm auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  echo $VERSION
  
  ls

  git stash

  git fetch --tags  

  ## Publish Package
  pnpm version $VERSION -m "Bump version to: %s [skip ci]"
  ## publish to npm
  ## npm publish

  
  ## Create GitHub Release
  ## git push --follow-tags --set-upstream origin $branch
  auto release
fi