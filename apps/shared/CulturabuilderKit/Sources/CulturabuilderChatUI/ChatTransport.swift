import Foundation

public enum CulturabuilderChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(CulturabuilderChatEventPayload)
    case agent(CulturabuilderAgentEventPayload)
    case seqGap
}

public protocol CulturabuilderChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> CulturabuilderChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [CulturabuilderChatAttachmentPayload]) async throws -> CulturabuilderChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> CulturabuilderChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<CulturabuilderChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension CulturabuilderChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "CulturabuilderChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> CulturabuilderChatSessionsListResponse {
        throw NSError(
            domain: "CulturabuilderChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}
