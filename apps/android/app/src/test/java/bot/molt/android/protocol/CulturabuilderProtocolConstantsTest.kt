package bot.molt.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class CulturabuilderProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", CulturabuilderCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", CulturabuilderCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", CulturabuilderCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", CulturabuilderCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", CulturabuilderCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", CulturabuilderCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", CulturabuilderCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", CulturabuilderCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", CulturabuilderCapability.Canvas.rawValue)
    assertEquals("camera", CulturabuilderCapability.Camera.rawValue)
    assertEquals("screen", CulturabuilderCapability.Screen.rawValue)
    assertEquals("voiceWake", CulturabuilderCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", CulturabuilderScreenCommand.Record.rawValue)
  }
}
