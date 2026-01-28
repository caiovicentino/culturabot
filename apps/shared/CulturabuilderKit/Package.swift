// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "CulturabuilderKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "CulturabuilderProtocol", targets: ["CulturabuilderProtocol"]),
        .library(name: "CulturabuilderKit", targets: ["CulturabuilderKit"]),
        .library(name: "CulturabuilderChatUI", targets: ["CulturabuilderChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "CulturabuilderProtocol",
            path: "Sources/CulturabuilderProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CulturabuilderKit",
            dependencies: [
                "CulturabuilderProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/CulturabuilderKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CulturabuilderChatUI",
            dependencies: [
                "CulturabuilderKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/CulturabuilderChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CulturabuilderKitTests",
            dependencies: ["CulturabuilderKit", "CulturabuilderChatUI"],
            path: "Tests/CulturabuilderKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
