## Get app version.
VERSION=$(node get-version.js)

## Build to docker image with version.
# --platform linux/amd64, linux/arm64, darwin/amd64
docker build -t "artour-app:$VERSION" .