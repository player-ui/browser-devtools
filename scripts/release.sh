export PATH=$(pnpm bin):$PATH

VERSION=`pnpm auto version`

echo "VERSION: $VERSION"
## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  pnpm auto changelog

  ## Publish Package
  pnpm version $VERSION -m "Bump version to: %s [skip ci]"
  ## publish to npm
  ## npm publish

  ## Create GitHub Release
  git push --follow-tags --set-upstream origin $branch
  auto release
fi