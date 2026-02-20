# react-toggle-dark-mode

## 2.0.0

### Major Changes

- Modernize build setup and harden DarkModeSwitch for React 16–19

  ### Changed
  - Migrated project tooling from Yarn to pnpm.
  - Updated root scripts and package metadata for pnpm-based workflows.
  - Switched CI to modern GitHub Actions (`checkout@v4`, `setup-node@v4`, Node 20) and pnpm caching.
  - Added a React compatibility CI matrix for React 16, 17, 18, and 19.
  - Replaced `react-spring` import usage with `@react-spring/web`.
  - Updated dependencies/devDependencies across root and example app (React 19, newer TypeScript/tooling).
  - Modernized example app bootstrapping to `createRoot` and module script loading.
  - Updated README install instructions to show pnpm usage.
  - Added `.pnpm-store` to `.gitignore`.

  ### Improved
  - Refactored `DarkModeSwitch` animation property merging to avoid mutating defaults.
  - Improved prop typing (button-oriented props) and event handling in `DarkModeSwitch`.
  - Improved accessibility defaults (`role="switch"`, `aria-checked`, default label behavior).
  - Strengthened test suite with coverage for:
    - animation-property merge behavior
    - non-mutation of defaults
    - accessibility attributes
    - unique mask IDs across multiple component instances

  ### Removed
  - Removed legacy Yarn lockfiles (`yarn.lock`, `example/yarn.lock`).
