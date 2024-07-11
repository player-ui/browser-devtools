export PATH=$(pnpm bin):$PATH

VERSION=`pnpm auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  ## Publish Package
  pnpm version $VERSION -m "Bump version to: %s [skip ci]"
  ## publish to npm
  ## npm publish

  # pnpm publish

  ## Create GitHub Release
  ## git push --follow-tags --set-upstream origin $branch
  auto release --dry-run
fi