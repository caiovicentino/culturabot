import Foundation

public enum CulturabuilderCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum CulturabuilderCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum CulturabuilderCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum CulturabuilderCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct CulturabuilderCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: CulturabuilderCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: CulturabuilderCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: CulturabuilderCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: CulturabuilderCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct CulturabuilderCameraClipParams: Codable, Sendable, Equatable {
    public var facing: CulturabuilderCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: CulturabuilderCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: CulturabuilderCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: CulturabuilderCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
