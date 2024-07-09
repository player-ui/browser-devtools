export PATH=$(pnpm bin):$PATH

VERSION=`auto version`

echo "version : "
echo "$VERSION"
## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  ## Publish Package
  npm version $VERSION -m "Bump version to: %s [skip ci]"
  ## publish to npm
  ## npm publish

  ## Create GitHub Release
  git push --follow-tags --set-upstream origin $branch
  auto release
fi