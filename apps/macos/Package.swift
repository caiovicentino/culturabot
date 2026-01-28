// swift-tools-version: 6.2
// Package manifest for the Culturabuilder macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "Culturabuilder",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "CulturabuilderIPC", targets: ["CulturabuilderIPC"]),
        .library(name: "CulturabuilderDiscovery", targets: ["CulturabuilderDiscovery"]),
        .executable(name: "Culturabuilder", targets: ["Culturabuilder"]),
        .executable(name: "culturabuilder-mac", targets: ["CulturabuilderMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/CulturabuilderKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "CulturabuilderIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CulturabuilderDiscovery",
            dependencies: [
                .product(name: "CulturabuilderKit", package: "CulturabuilderKit"),
            ],
            path: "Sources/CulturabuilderDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "Culturabuilder",
            dependencies: [
                "CulturabuilderIPC",
                "CulturabuilderDiscovery",
                .product(name: "CulturabuilderKit", package: "CulturabuilderKit"),
                .product(name: "CulturabuilderChatUI", package: "CulturabuilderKit"),
                .product(name: "CulturabuilderProtocol", package: "CulturabuilderKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/Culturabuilder.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "CulturabuilderMacCLI",
            dependencies: [
                "CulturabuilderDiscovery",
                .product(name: "CulturabuilderKit", package: "CulturabuilderKit"),
                .product(name: "CulturabuilderProtocol", package: "CulturabuilderKit"),
            ],
            path: "Sources/CulturabuilderMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CulturabuilderIPCTests",
            dependencies: [
                "CulturabuilderIPC",
                "Culturabuilder",
                "CulturabuilderDiscovery",
                .product(name: "CulturabuilderProtocol", package: "CulturabuilderKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
