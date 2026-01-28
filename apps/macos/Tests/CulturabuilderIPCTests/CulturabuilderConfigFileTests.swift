import Foundation
import Testing
@testable import Culturabuilder

@Suite(.serialized)
struct CulturabuilderConfigFileTests {
    @Test
    func configPathRespectsEnvOverride() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("culturabuilder-config-\(UUID().uuidString)")
            .appendingPathComponent("culturabuilder.json")
            .path

        await TestIsolation.withEnvValues(["CULTURABUILDER_CONFIG_PATH": override]) {
            #expect(CulturabuilderConfigFile.url().path == override)
        }
    }

    @MainActor
    @Test
    func remoteGatewayPortParsesAndMatchesHost() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("culturabuilder-config-\(UUID().uuidString)")
            .appendingPathComponent("culturabuilder.json")
            .path

        await TestIsolation.withEnvValues(["CULTURABUILDER_CONFIG_PATH": override]) {
            CulturabuilderConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "ws://gateway.ts.net:19999",
                    ],
                ],
            ])
            #expect(CulturabuilderConfigFile.remoteGatewayPort() == 19999)
            #expect(CulturabuilderConfigFile.remoteGatewayPort(matchingHost: "gateway.ts.net") == 19999)
            #expect(CulturabuilderConfigFile.remoteGatewayPort(matchingHost: "gateway") == 19999)
            #expect(CulturabuilderConfigFile.remoteGatewayPort(matchingHost: "other.ts.net") == nil)
        }
    }

    @MainActor
    @Test
    func setRemoteGatewayUrlPreservesScheme() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("culturabuilder-config-\(UUID().uuidString)")
            .appendingPathComponent("culturabuilder.json")
            .path

        await TestIsolation.withEnvValues(["CULTURABUILDER_CONFIG_PATH": override]) {
            CulturabuilderConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "wss://old-host:111",
                    ],
                ],
            ])
            CulturabuilderConfigFile.setRemoteGatewayUrl(host: "new-host", port: 2222)
            let root = CulturabuilderConfigFile.loadDict()
            let url = ((root["gateway"] as? [String: Any])?["remote"] as? [String: Any])?["url"] as? String
            #expect(url == "wss://new-host:2222")
        }
    }

    @Test
    func stateDirOverrideSetsConfigPath() async {
        let dir = FileManager().temporaryDirectory
            .appendingPathComponent("culturabuilder-state-\(UUID().uuidString)", isDirectory: true)
            .path

        await TestIsolation.withEnvValues([
            "CULTURABUILDER_CONFIG_PATH": nil,
            "CULTURABUILDER_STATE_DIR": dir,
        ]) {
            #expect(CulturabuilderConfigFile.stateDirURL().path == dir)
            #expect(CulturabuilderConfigFile.url().path == "\(dir)/culturabuilder.json")
        }
    }
}
