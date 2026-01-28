# Culturabuilder (iOS)

Internal-only SwiftUI app scaffold.

## Lint/format (required)
```bash
brew install swiftformat swiftlint
```

## Generate the Xcode project
```bash
cd apps/ios
xcodegen generate
open Culturabuilder.xcodeproj
```

## Shared packages
- `../shared/CulturabuilderKit` — shared types/constants used by iOS (and later macOS bridge + gateway routing).

## fastlane
```bash
brew install fastlane

cd apps/ios
fastlane lanes
```

See `apps/ios/fastlane/SETUP.md` for App Store Connect auth + upload lanes.
