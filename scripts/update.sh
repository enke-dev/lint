#!/usr/bin/env bash

# Assuming having fnm installed from HEAD
# brew unlink fnm
# brew install fnm --HEAD
# eval "$(fnm env --use-on-cd --shell zsh)"

# Run a labeled step; on success collapse its output to a single line,
# on failure keep the full output visible and exit.
run_step() {
  local label="$1"; shift
  local output_file
  output_file=$(mktemp)
  trap "rm -f '$output_file'" RETURN

  printf '> %s ...' "$label"

  # Run command in subshell, capture output silently
  ("$@") > "$output_file" 2>&1
  local exit_code=$?

  if [ $exit_code -eq 0 ]; then
    printf '\r\033[2K\033[32m✓ %s\033[0m\n' "$label"
  else
    printf '\r\033[2K\033[31m✗ %s (exit code %d)\033[0m\n' "$label" "$exit_code"
    cat "$output_file"
    exit $exit_code
  fi
}

# Update node to latest version and update .node-version files
# > this requires fnm to be installed from HEAD, as the last stable
# > release is from 11/2024 not containing this flag yet
step() {
  fnm install --lts --use &&
  node -v > .node-version
}; run_step "Updating Node.js to current LTS version" step

# Update all dependencies to latest version in all packages
# > `typescript` is rejected here on purpose: typescript-eslint only supports a bounded TS
# > range, so it is pinned explicitly further down (after install) to the highest version
# > within that range. Letting ncu bump it freely would break the install (peer conflict).
step() {
  npx -y npm-check-updates --dep dev,optional,peer,prod,packageManager --upgrade --reject @types/node,typescript
}; run_step "Checking for latest versions of dependencies" step

# Align node types to installed node lts version
step() {
  NODE_VERSION=$(node -v) # → v.22.18.0
  NODE_MAJOR_VERSION=${NODE_VERSION:1:2} # → 22
  npm install --save-dev --save-exact @types/node@${NODE_MAJOR_VERSION} # → 22.17.2
}; run_step "Aligning @types/node" step

# Install updated dependencies
step() {
  rm -rf node_modules &&
  npm install
}; run_step "Installing updated dependencies" step

# Align TypeScript to the highest version supported by the installed typescript-eslint
# > typescript-eslint declares a bounded TS support range (peerDependencies.typescript);
# > pin the newest published (non-prerelease) version within it, mirroring the @types/node
# > alignment above. npm resolves the range and lists matches ascending, so the last wins.
step() {
  TS_VERSION=$(node -e "
    const range = require('typescript-eslint/package.json').peerDependencies.typescript;
    const out = require('child_process').execSync(\`npm view 'typescript@\${range}' version\`).toString().trim();
    const versions = out.split('\n').map(line => line.replace(/.*@/, '').replace(/ .*/, ''));
    process.stdout.write(versions[versions.length - 1]);
  ") &&
  # typescript lives in both optionalDependencies (caret, consumer contract) and
  # devDependencies (exact pin); set both via `npm pkg set` and sync the lockfile with a
  # plain install. Using `npm install --save-optional` instead writes a phantom root
  # `dependencies` entry that a later `npm install` reverts, churning the lockfile.
  npm pkg set "optionalDependencies.typescript=^${TS_VERSION}" "devDependencies.typescript=${TS_VERSION}" &&
  npm install
}; run_step "Aligning TypeScript to typescript-eslint support" step

# Align Node version in Docker- and Compose files
step() {
  NODE_VVERSION=$(node -v) &&
  NODE_VERSION=${NODE_VVERSION:1} &&
  find . -type f \( -name "Dockerfile*" -o -name "compose*.yaml" \) -exec \
    sed -E -i '' "s/node:[0-9.]+/node:${NODE_VERSION}/g" {} + &&
  find . -type f \( -name "Dockerfile*" -o -name "compose*.yaml" \) -exec \
    sed -E -i '' "s/NODE_VERSION=[0-9.]+/NODE_VERSION=${NODE_VERSION}/g" {} +
}; run_step "Aligning Node version in Docker- and Compose files" step

# Update GitHub Actions to latest versions
step() {
  npx -y actions-up --yes --include-branches
}; run_step "Updating GitHub Actions to latest versions" step
