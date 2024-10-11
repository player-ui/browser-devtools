export PATH=$(pnpm bin):$PATH

VERSION=`pnpm auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog
  
  ## Publish Package
  ## default GPG key needs to be set for signed commit to work
  pnpm config set sign-git-tag true

  pnpm version $VERSION -m "Bump version to: %s [skip ci]"

  echo $branch

  ## Create GitHub Release
  git push --follow-tags --set-upstream origin $branch
  auto release
fi