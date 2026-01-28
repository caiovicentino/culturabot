import CulturabuilderKit
import CulturabuilderProtocol
import Foundation

// Prefer the CulturabuilderKit wrapper to keep gateway request payloads consistent.
typealias AnyCodable = CulturabuilderKit.AnyCodable
typealias InstanceIdentity = CulturabuilderKit.InstanceIdentity

extension AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: AnyCodable]? { self.value as? [String: AnyCodable] }
    var arrayValue: [AnyCodable]? { self.value as? [AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

extension CulturabuilderProtocol.AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: CulturabuilderProtocol.AnyCodable]? { self.value as? [String: CulturabuilderProtocol.AnyCodable] }
    var arrayValue: [CulturabuilderProtocol.AnyCodable]? { self.value as? [CulturabuilderProtocol.AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: CulturabuilderProtocol.AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [CulturabuilderProtocol.AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}
