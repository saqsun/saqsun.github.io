(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adLiveCommand = adLiveCommand;

var _lego = require('@armathai/lego');

var _startGameStateCommand = require('../states/start-game-state-command');

function adLiveCommand() {
  _lego.lego.command.execute(_startGameStateCommand.startGameStateCommand);
}

},{"../states/start-game-state-command":80,"@armathai/lego":212}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adStatusUpdateCommand = adStatusUpdateCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _hintModelGuard = require('../../guards/ad/hint-model-guard');

var _persistentCtaModelGuard = require('../../guards/ad/persistent-cta-model-guard');

var _tutorialModelGuard = require('../../guards/ad/tutorial-model-guard');

var _gameModelGuard = require('../../guards/game/game-model-guard');

var _playerModelGuard = require('../../guards/player/player-model-guard');

var _destroyGameModelCommand = require('../game/destroy-game-model-command');

var _mapPlayableCommandsCommand = require('../game/map-playable-commands-command');

var _unmapPlayableCommandsCommand = require('../game/unmap-playable-commands-command');

var _initializeModelsCommand = require('../initialize-models-command');

var _destroyPlayerModelCommand = require('../player/destroy-player-model-command');

var _shutdownModelsCommand = require('../shutdown-models-command');

var _restartGameStateCommand = require('../states/restart-game-state-command');

var _destroyHintModelCommand = require('./hint/destroy-hint-model-command');

var _destroyPersistentCtaModelCommand = require('./pcta/destroy-persistent-cta-model-command');

var _setAdStatusCommand = require('./set-ad-status-command');

var _setTutorialSkipCommand = require('./tutorial/set-tutorial-skip-command');

function adStatusUpdateCommand(status) {
  switch (status) {
    case _constants.AdStatus.Game:
      _lego.lego.command.execute(_mapPlayableCommandsCommand.mapPlayableCommandsCommand, _initializeModelsCommand.initializeModelsCommand);
      break;

    case _constants.AdStatus.Restart:
      _lego.lego.command.execute(_restartGameStateCommand.restartGameStateCommand);
      break;

    case _constants.AdStatus.PreCta:
      _lego.lego.command.guard(_tutorialModelGuard.tutorialModelGuard).execute(_setTutorialSkipCommand.setTutorialSkipCommand).execute(_unmapPlayableCommandsCommand.unmapPlayableCommandsCommand).guard(_hintModelGuard.hintModelGuard).execute(_destroyHintModelCommand.destroyHintModelCommand);
      break;

    case _constants.AdStatus.Cta:
      _lego.lego.command.guard(_playerModelGuard.playerModelGuard).execute(_destroyPlayerModelCommand.destroyPlayerModelCommand).guard(_gameModelGuard.gameModelGuard).execute(_destroyGameModelCommand.destroyGameModelCommand).guard(_persistentCtaModelGuard.persistentCtaModelGuard).execute(_destroyPersistentCtaModelCommand.destroyPersistentCtaModelCommand);

      break;

    case _constants.AdStatus.Retry:
      _lego.lego.command
      //
      .execute(_shutdownModelsCommand.shutdownModelsCommand).payload(_constants.AdStatus.Game).execute(_setAdStatusCommand.setAdStatusCommand);
      break;
    default:
  }
}

},{"../../constants":107,"../../guards/ad/hint-model-guard":119,"../../guards/ad/persistent-cta-model-guard":121,"../../guards/ad/tutorial-model-guard":126,"../../guards/game/game-model-guard":133,"../../guards/player/player-model-guard":135,"../game/destroy-game-model-command":56,"../game/map-playable-commands-command":58,"../game/unmap-playable-commands-command":65,"../initialize-models-command":68,"../player/destroy-player-model-command":72,"../shutdown-models-command":76,"../states/restart-game-state-command":79,"./hint/destroy-hint-model-command":11,"./pcta/destroy-persistent-cta-model-command":15,"./set-ad-status-command":18,"./tutorial/set-tutorial-skip-command":29,"@armathai/lego":212}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adViewStateUpdateCommand = adViewStateUpdateCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _gameInitCommand = require('../game-init-command');

var _gameShutDownCommand = require('../game-shut-down-command');

var _gameStartCommand = require('../game-start-command');

function adViewStateUpdateCommand(state) {
  switch (state) {
    case _constants.AdViewState.Init:
      _lego.lego.command.execute(_gameInitCommand.gameInitCommand);
      break;

    case _constants.AdViewState.Create:
      _lego.lego.command.execute(_gameStartCommand.gameStartCommand);
      break;

    case _constants.AdViewState.ShutDown:
      _lego.lego.command.execute(_gameShutDownCommand.gameShutDownCommand);
      break;
    default:
  }
}

},{"../../constants":107,"../game-init-command":53,"../game-shut-down-command":54,"../game-start-command":55,"@armathai/lego":212}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaIdleTimeCommand = ctaIdleTimeCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _showCtaCommand = require('./show-cta-command');

function ctaIdleTimeCommand() {
  _lego.lego.command
  //
  .payload(_constants.GameOverReasons.Idled, 0).execute(_showCtaCommand.showCtaCommand);
}

},{"../../../constants":107,"./show-cta-command":9,"@armathai/lego":212}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaPreVisibleUpdateCommand = ctaPreVisibleUpdateCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _ctaPrevisibleGuard = require('../../../guards/ad/cta-previsible-guard');

var _setAdStatusCommand = require('../set-ad-status-command');

function ctaPreVisibleUpdateCommand() {
  _lego.lego.command.guard(_ctaPrevisibleGuard.ctaPreVisibleGuard).payload(_constants.AdStatus.PreCta).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../../../constants":107,"../../../guards/ad/cta-previsible-guard":117,"../set-ad-status-command":18,"@armathai/lego":212}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaVisibleUpdateCommand = ctaVisibleUpdateCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _adLiveGuard = require('../../../guards/ad/ad-live-guard');

var _asecGuard = require('../../../guards/ad/asec-guard');

var _ctaVisibleGuard = require('../../../guards/ad/cta-visible-guard');

var _setAdStatusCommand = require('../set-ad-status-command');

function ctaVisibleUpdateCommand() {
  _lego.lego.command.guard(_ctaVisibleGuard.ctaVisibleGuard, _adLiveGuard.adLiveGuard, (0, _lego.not)(_asecGuard.asecGuard)).payload(_constants.AdStatus.Cta).execute(_setAdStatusCommand.setAdStatusCommand).guard(_ctaVisibleGuard.ctaVisibleGuard, (0, _lego.not)(_adLiveGuard.adLiveGuard)).payload(_constants.AdStatus.Restart).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../../../constants":107,"../../../guards/ad/ad-live-guard":114,"../../../guards/ad/asec-guard":115,"../../../guards/ad/cta-visible-guard":118,"../set-ad-status-command":18,"@armathai/lego":212}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyCtaModelCommand = destroyCtaModelCommand;

var _store = require('../../../models/store');

function destroyCtaModelCommand() {
  _store.store.ad.destroyCtaModel();
}

},{"../../../models/store":158}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCtaModelCommand = initializeCtaModelCommand;

var _store = require('../../../models/store');

function initializeCtaModelCommand() {
  _store.store.ad.initializeCtaModel();
}

},{"../../../models/store":158}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showCtaCommand = showCtaCommand;

var _store = require('../../../models/store');

function showCtaCommand(reason, delay) {
  _store.store.ad.cta.show(reason, delay);
}

},{"../../../models/store":158}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decreaseRetriesCountCommand = decreaseRetriesCountCommand;

var _store = require('../../models/store');

function decreaseRetriesCountCommand() {
  _store.store.ad.decreaseRetriesCount();
}

},{"../../models/store":158}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyHintModelCommand = destroyHintModelCommand;

var _store = require('../../../models/store');

function destroyHintModelCommand() {
  _store.store.ad.destroyHintModel();
}

},{"../../../models/store":158}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeHintModelCommand = initializeHintModelCommand;

var _store = require('../../../models/store');

function initializeHintModelCommand() {
  _store.store.ad.initializeHintModel();
}

},{"../../../models/store":158}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAdModelCommand = initializeAdModelCommand;

var _store = require('../../models/store');

function initializeAdModelCommand() {
  _store.store.initializeADModel();
}

},{"../../models/store":158}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAdStatusUpdateCommand = mapAdStatusUpdateCommand;

var _lego = require('@armathai/lego');

var _modelEvents = require('../../events/model-events');

var _adStatusUpdateCommand = require('./ad-status-update-command');

function mapAdStatusUpdateCommand() {
  _lego.lego.command.off(_modelEvents.ModelEvents.AdModel.StatusUpdate, _adStatusUpdateCommand.adStatusUpdateCommand).on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _adStatusUpdateCommand.adStatusUpdateCommand);
}

},{"../../events/model-events":112,"./ad-status-update-command":2,"@armathai/lego":212}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPersistentCtaModelCommand = destroyPersistentCtaModelCommand;

var _store = require('../../../models/store');

function destroyPersistentCtaModelCommand() {
  _store.store.ad.destroyPersistentCtaModel();
}

},{"../../../models/store":158}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePersistentCtaModelCommand = initializePersistentCtaModelCommand;

var _store = require('../../../models/store');

function initializePersistentCtaModelCommand() {
  _store.store.ad.initializePersistentCtaModel();
}

},{"../../../models/store":158}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetTimeCommand = resetTimeCommand;
function resetTimeCommand() {
  CI_API.game.time.reset();
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAdStatusCommand = setAdStatusCommand;

var _store = require('../../models/store');

function setAdStatusCommand(status) {
  _store.store.ad.status = status;
}

},{"../../models/store":158}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLastInteractionCommand = setLastInteractionCommand;

var _globals = require('../../kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setLastInteractionCommand(value) {
  _globals2.default.LAST_INTERACTION_TIME = value;
}

},{"../../kernel/globals":137}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSoundModelCommand = initializeSoundModelCommand;

var _store = require('../../../models/store');

function initializeSoundModelCommand() {
  _store.store.ad.initializeSoundModel();
}

},{"../../../models/store":158}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeTutorialSequenceCommand = completeTutorialSequenceCommand;

var _store = require('../../../models/store');

function completeTutorialSequenceCommand() {
  _store.store.ad.tutorial.completeSequence();
}

},{"../../../models/store":158}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyTutorialModelCommand = destroyTutorialModelCommand;

var _store = require('../../../models/store');

function destroyTutorialModelCommand() {
  _store.store.ad.destroyTutorialModel();
}

},{"../../../models/store":158}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTutorialModelCommand = initializeTutorialModelCommand;

var _store = require('../../../models/store');

function initializeTutorialModelCommand() {
  _store.store.ad.initializeTutorialModel();
}

},{"../../../models/store":158}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextTutorialSequenceCommand = nextTutorialSequenceCommand;

var _store = require('../../../models/store');

function nextTutorialSequenceCommand() {
  _store.store.ad.tutorial.nextSequence();
}

},{"../../../models/store":158}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTutorialCompleteCommand = onTutorialCompleteCommand;

var _lego = require('@armathai/lego');

var _destroyTutorialModelCommand = require('./destroy-tutorial-model-command');

function onTutorialCompleteCommand() {
  _lego.lego.command
  //
  .execute(_destroyTutorialModelCommand.destroyTutorialModelCommand);
}

},{"./destroy-tutorial-model-command":22,"@armathai/lego":212}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTutorialSequenceCompleteCommand = onTutorialSequenceCompleteCommand;
function onTutorialSequenceCompleteCommand() {
  // You can detect what sequence completed, and execute some commands on it.
  // const { index } = store.ad.tutorial.getSequenceByUuid(uuid);
}

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTutorialSkipCommand = onTutorialSkipCommand;

var _lego = require('@armathai/lego');

var _destroyTutorialModelCommand = require('./destroy-tutorial-model-command');

function onTutorialSkipCommand() {
  _lego.lego.command
  //
  .execute(_destroyTutorialModelCommand.destroyTutorialModelCommand);
}

},{"./destroy-tutorial-model-command":22,"@armathai/lego":212}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTutorialCompleteCommand = setTutorialCompleteCommand;

var _store = require('../../../models/store');

function setTutorialCompleteCommand() {
  _store.store.ad.tutorial.complete = true;
}

},{"../../../models/store":158}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTutorialSkipCommand = setTutorialSkipCommand;

var _store = require('../../../models/store');

function setTutorialSkipCommand() {
  _store.store.ad.tutorial.skip = true;
}

},{"../../../models/store":158}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showTutorialSequenceCommand = showTutorialSequenceCommand;

var _store = require('../../../models/store');

function showTutorialSequenceCommand() {
  _store.store.ad.tutorial.showSequence();
}

},{"../../../models/store":158}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialScreenClickCommand = tutorialScreenClickCommand;

var _lego = require('@armathai/lego');

var _tutorialLastSequenceGuard = require('../../../guards/ad/tutorial-last-sequence-guard');

var _tutorialSequenceGuard = require('../../../guards/ad/tutorial-sequence-guard');

var _startSimulationCommand = require('../../board/start-simulation-command');

var _completeTutorialSequenceCommand = require('./complete-tutorial-sequence-command');

var _setTutorialSkipCommand = require('./set-tutorial-skip-command');

function tutorialScreenClickCommand() {
  _lego.lego.command
  //
  .payload(0).guard(_tutorialSequenceGuard.tutorialSequenceGuard).execute(_startSimulationCommand.startSimulationCommand, _completeTutorialSequenceCommand.completeTutorialSequenceCommand).payload(2).guard(_tutorialSequenceGuard.tutorialSequenceGuard).execute(_startSimulationCommand.startSimulationCommand, _completeTutorialSequenceCommand.completeTutorialSequenceCommand).guard(_tutorialLastSequenceGuard.lastTutorialSequenceGuard).execute(_setTutorialSkipCommand.setTutorialSkipCommand);
}

},{"../../../guards/ad/tutorial-last-sequence-guard":125,"../../../guards/ad/tutorial-sequence-guard":128,"../../board/start-simulation-command":52,"./complete-tutorial-sequence-command":21,"./set-tutorial-skip-command":29,"@armathai/lego":212}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialSequenceViewCompleteCommand = tutorialSequenceViewCompleteCommand;

var _lego = require('@armathai/lego');

var _tutorialLastSequenceGuard = require('../../../guards/ad/tutorial-last-sequence-guard');

var _tutorialModelGuard = require('../../../guards/ad/tutorial-model-guard');

var _setTutorialCompleteCommand = require('./set-tutorial-complete-command');

function tutorialSequenceViewCompleteCommand() {
  _lego.lego.command
  //
  .guard(_tutorialModelGuard.tutorialModelGuard, _tutorialLastSequenceGuard.lastTutorialSequenceGuard).execute(_setTutorialCompleteCommand.setTutorialCompleteCommand);
}

},{"../../../guards/ad/tutorial-last-sequence-guard":125,"../../../guards/ad/tutorial-model-guard":126,"./set-tutorial-complete-command":28,"@armathai/lego":212}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardSimulateCommand = boardSimulateCommand;

var _store = require('../../models/store');

function boardSimulateCommand() {
  _store.store.game.boardModel.simulate();
}

},{"../../models/store":158}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForAutoPlaySoundsCommand = checkForAutoPlaySoundsCommand;

var _constants = require('../../constants');

var _store = require('../../models/store');

function checkForAutoPlaySoundsCommand(timePast) {
  _store.store.game.boardModel.autoPlaySounds.forEach(function (sound) {
    var startTime = sound.startTime;


    if (timePast > startTime && sound.state !== _constants.SoundPartState.Autoplay) {
      sound.state = _constants.SoundPartState.Autoplay;
    }
  });
}

},{"../../constants":107,"../../models/store":158}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForRightPadClickedCommand = checkForRightPadClickedCommand;

var _constants = require('../../constants');

var _store = require('../../models/store');

function checkForRightPadClickedCommand(sound, time) {
  _store.store.game.boardModel.playSequence.forEach(function (sequence) {
    var name = sequence.name,
        startTime = sequence.startTime,
        state = sequence.state;

    var offset = 300;

    if (sound === name && state !== _constants.SoundPartState.Play && time > startTime - offset && time < startTime + offset) {
      sequence.state = _constants.SoundPartState.Play;
      _store.store.player.score += 1;
    }
  });
}

},{"../../constants":107,"../../models/store":158}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForSequencePlayedCommand = checkForSequencePlayedCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _constants = require('../../constants');

var _hintModelGuard = require('../../guards/ad/hint-model-guard');

var _tutorialLastSequenceGuard = require('../../guards/ad/tutorial-last-sequence-guard');

var _tutorialModelGuard = require('../../guards/ad/tutorial-model-guard');

var _lastPlaySequenceGuard = require('../../guards/board/last-play-sequence-guard');

var _store = require('../../models/store');

var _showCtaCommand = require('../ad/cta/show-cta-command');

var _destroyHintModelCommand = require('../ad/hint/destroy-hint-model-command');

var _nextTutorialSequenceCommand = require('../ad/tutorial/next-tutorial-sequence-command');

var _showTutorialSequenceCommand = require('../ad/tutorial/show-tutorial-sequence-command');

var _stopTimerCommand = require('../game/stop-timer-command');

var _disableInitialPadsCommand = require('./disable-initial-pads-command');

var _nextPlaySequenceCommand = require('./next-play-sequence-command');

var _resetAutoPlaySoundsCommand = require('./reset-auto-play-sounds-command');

var _resetPlaySequenceCommand = require('./reset-play-sequence-command');

var _resetSimulationSequenceCommand = require('./reset-simulation-sequence-command');

var _setBoardStateCommand = require('./set-board-state-command');

function checkForSequencePlayedCommand(timePast) {
  var _getSequenceStartEndT = (0, _boardConfig.getSequenceStartEndTime)(_store.store.game.boardModel.sequence),
      endTime = _getSequenceStartEndT.endTime;

  if (timePast >= endTime) {
    _lego.lego.command
    //
    .execute(_stopTimerCommand.stopTimerCommand).payload(_constants.BoardState.Idle).execute(_setBoardStateCommand.setBoardStateCommand).payload(_constants.GameOverReasons.ItemsToCtaReached, 500).guard(_lastPlaySequenceGuard.lastPlaySequenceGuard).execute(_showCtaCommand.showCtaCommand).guard((0, _lego.not)(_lastPlaySequenceGuard.lastPlaySequenceGuard)).execute(_nextPlaySequenceCommand.nextPlaySequenceCommand, _resetAutoPlaySoundsCommand.resetAutoPlaySoundsCommand, _resetSimulationSequenceCommand.resetSimulationSequenceCommand, _resetPlaySequenceCommand.resetPlaySequenceCommand).guard(_tutorialModelGuard.tutorialModelGuard, (0, _lego.not)(_tutorialLastSequenceGuard.lastTutorialSequenceGuard)).execute(_nextTutorialSequenceCommand.nextTutorialSequenceCommand, _showTutorialSequenceCommand.showTutorialSequenceCommand).guard(_hintModelGuard.hintModelGuard).execute(_destroyHintModelCommand.destroyHintModelCommand).execute(_disableInitialPadsCommand.disableInitialPadsCommand);
  }
}

},{"../../configs/board-config":87,"../../constants":107,"../../guards/ad/hint-model-guard":119,"../../guards/ad/tutorial-last-sequence-guard":125,"../../guards/ad/tutorial-model-guard":126,"../../guards/board/last-play-sequence-guard":132,"../../models/store":158,"../ad/cta/show-cta-command":9,"../ad/hint/destroy-hint-model-command":11,"../ad/tutorial/next-tutorial-sequence-command":24,"../ad/tutorial/show-tutorial-sequence-command":30,"../game/stop-timer-command":63,"./disable-initial-pads-command":40,"./next-play-sequence-command":46,"./reset-auto-play-sounds-command":48,"./reset-play-sequence-command":49,"./reset-simulation-sequence-command":50,"./set-board-state-command":51,"@armathai/lego":212}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForSimulationCommand = checkForSimulationCommand;

var _constants = require('../../constants');

var _store = require('../../models/store');

function checkForSimulationCommand(timePast) {
  _store.store.game.boardModel.simulationSequence.forEach(function (sound) {
    var startTime = sound.startTime;


    if (timePast > startTime && sound.state !== _constants.SoundPartState.Simulate) {
      sound.state = _constants.SoundPartState.Simulate;
    }
  });
}

},{"../../constants":107,"../../models/store":158}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForSimulationSequenceOverCommand = checkForSimulationSequenceOverCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _constants = require('../../constants');

var _hintModelGuard = require('../../guards/ad/hint-model-guard');

var _hintParamGuard = require('../../guards/ad/hint-param-guard');

var _tutorialLastSequenceGuard = require('../../guards/ad/tutorial-last-sequence-guard');

var _store = require('../../models/store');

var _initializeHintModelCommand = require('../ad/hint/initialize-hint-model-command');

var _nextTutorialSequenceCommand = require('../ad/tutorial/next-tutorial-sequence-command');

var _showTutorialSequenceCommand = require('../ad/tutorial/show-tutorial-sequence-command');

var _stopTimerCommand = require('../game/stop-timer-command');

var _enableInitialPadsCommand = require('./enable-initial-pads-command');

var _resetAutoPlaySoundsCommand = require('./reset-auto-play-sounds-command');

var _resetSimulationSequenceCommand = require('./reset-simulation-sequence-command');

var _setBoardStateCommand = require('./set-board-state-command');

function checkForSimulationSequenceOverCommand(timePast) {
  var _getSequenceStartEndT = (0, _boardConfig.getSequenceStartEndTime)(_store.store.game.boardModel.sequence),
      endTime = _getSequenceStartEndT.endTime;

  if (timePast >= endTime) {
    _lego.lego.command
    //
    .payload(_constants.BoardState.Idle).execute(_setBoardStateCommand.setBoardStateCommand).execute(_stopTimerCommand.stopTimerCommand).guard((0, _lego.not)(_tutorialLastSequenceGuard.lastTutorialSequenceGuard)).execute(_nextTutorialSequenceCommand.nextTutorialSequenceCommand, _showTutorialSequenceCommand.showTutorialSequenceCommand).guard(_hintParamGuard.hintParamGuard, (0, _lego.not)(_hintModelGuard.hintModelGuard)).execute(_initializeHintModelCommand.initializeHintModelCommand).execute(_resetAutoPlaySoundsCommand.resetAutoPlaySoundsCommand, _resetSimulationSequenceCommand.resetSimulationSequenceCommand).execute(_enableInitialPadsCommand.enableInitialPadsCommand);
  }
}

},{"../../configs/board-config":87,"../../constants":107,"../../guards/ad/hint-model-guard":119,"../../guards/ad/hint-param-guard":120,"../../guards/ad/tutorial-last-sequence-guard":125,"../../models/store":158,"../ad/hint/initialize-hint-model-command":12,"../ad/tutorial/next-tutorial-sequence-command":24,"../ad/tutorial/show-tutorial-sequence-command":30,"../game/stop-timer-command":63,"./enable-initial-pads-command":42,"./reset-auto-play-sounds-command":48,"./reset-simulation-sequence-command":50,"./set-board-state-command":51,"@armathai/lego":212}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForHintCommand = checkForHintCommand;

var _constants = require('../../constants');

var _store = require('../../models/store');

function checkForHintCommand(timePast) {
  _store.store.game.boardModel.simulationSequence.forEach(function (sound) {
    var startTime = sound.startTime;


    if (timePast > startTime && sound.state !== _constants.SoundPartState.Hint) {
      sound.state = _constants.SoundPartState.Hint;
    }
  });
}

},{"../../constants":107,"../../models/store":158}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableInitialPadsCommand = disableInitialPadsCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _disablePadCommand = require('./disable-pad-command');

function disableInitialPadsCommand() {
  var pads = (0, _boardConfig.getOpeningPads)();

  pads.forEach(function (pad) {
    var row = pad.row,
        column = pad.column;


    _lego.lego.command
    //
    .payload(row, column).execute(_disablePadCommand.disablePadCommand);
  });
}

},{"../../configs/board-config":87,"./disable-pad-command":41,"@armathai/lego":212}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disablePadCommand = disablePadCommand;

var _store = require('../../models/store');

function disablePadCommand(row, column) {
  _store.store.game.boardModel.getPadByPosition(row, column).disable();
}

},{"../../models/store":158}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableInitialPadsCommand = enableInitialPadsCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _enablePadCommand = require('./enable-pad-command');

function enableInitialPadsCommand() {
  var pads = (0, _boardConfig.getOpeningPads)();

  pads.forEach(function (pad) {
    var row = pad.row,
        column = pad.column;


    _lego.lego.command
    //
    .payload(row, column).execute(_enablePadCommand.enablePadCommand);
  });
}

},{"../../configs/board-config":87,"./enable-pad-command":43,"@armathai/lego":212}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enablePadCommand = enablePadCommand;

var _store = require('../../models/store');

function enablePadCommand(row, column) {
  _store.store.game.boardModel.getPadByPosition(row, column).enable();
}

},{"../../models/store":158}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idleInitialPadsCommand = idleInitialPadsCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _idlePadCommand = require('./idle-pad-command');

function idleInitialPadsCommand() {
  var pads = (0, _boardConfig.getOpeningPads)();

  pads.forEach(function (pad) {
    var row = pad.row,
        column = pad.column;


    _lego.lego.command
    //
    .payload(row, column).execute(_idlePadCommand.idlePadCommand);
  });
}

},{"../../configs/board-config":87,"./idle-pad-command":45,"@armathai/lego":212}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idlePadCommand = idlePadCommand;

var _store = require('../../models/store');

function idlePadCommand(row, column) {
  _store.store.game.boardModel.getPadByPosition(row, column).idle();
}

},{"../../models/store":158}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextPlaySequenceCommand = nextPlaySequenceCommand;

var _store = require('../../models/store');

function nextPlaySequenceCommand() {
  _store.store.game.boardModel.sequence += 1;
}

},{"../../models/store":158}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onPadClickCommand = onPadClickCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _constants = require('../../constants');

var _tutorialModelGuard = require('../../guards/ad/tutorial-model-guard');

var _tutorialSequenceGuard = require('../../guards/ad/tutorial-sequence-guard');

var _boardStateIdleGuard = require('../../guards/board/board-state-idle-guard');

var _store = require('../../models/store');

var _completeTutorialSequenceCommand = require('../ad/tutorial/complete-tutorial-sequence-command');

var _startTimerFromCommand = require('../game/start-timer-from-command');

var _checkForRightPadClickedCommand = require('./check-for-right-pad-clicked-command');

var _setBoardStateCommand = require('./set-board-state-command');

function onPadClickCommand(uuid) {
  var pad = _store.store.game.boardModel.getPadByUuid(uuid);

  var _getSequenceStartEndT = (0, _boardConfig.getSequenceStartEndTime)(_store.store.game.boardModel.sequence),
      startTime = _getSequenceStartEndT.startTime;

  _lego.lego.command
  //
  .payload(1).guard(_tutorialModelGuard.tutorialModelGuard, _tutorialSequenceGuard.tutorialSequenceGuard, _boardStateIdleGuard.boardStateIdleGuard).execute(_completeTutorialSequenceCommand.completeTutorialSequenceCommand).payload(3).guard(_tutorialModelGuard.tutorialModelGuard, _tutorialSequenceGuard.tutorialSequenceGuard, _boardStateIdleGuard.boardStateIdleGuard).execute(_completeTutorialSequenceCommand.completeTutorialSequenceCommand).payload(startTime, false).guard(_boardStateIdleGuard.boardStateIdleGuard).execute(_startTimerFromCommand.startTimerFromCommand).payload(_constants.BoardState.Playing).execute(_setBoardStateCommand.setBoardStateCommand).payload(pad.sound, (0, _boardConfig.getGameTime)() - _store.store.game.timerModel.remaining).execute(_checkForRightPadClickedCommand.checkForRightPadClickedCommand);
}

},{"../../configs/board-config":87,"../../constants":107,"../../guards/ad/tutorial-model-guard":126,"../../guards/ad/tutorial-sequence-guard":128,"../../guards/board/board-state-idle-guard":129,"../../models/store":158,"../ad/tutorial/complete-tutorial-sequence-command":21,"../game/start-timer-from-command":62,"./check-for-right-pad-clicked-command":35,"./set-board-state-command":51,"@armathai/lego":212}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetAutoPlaySoundsCommand = resetAutoPlaySoundsCommand;

var _store = require('../../models/store');

function resetAutoPlaySoundsCommand() {
  _store.store.game.boardModel.resetAutoPlaySounds();
}

},{"../../models/store":158}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPlaySequenceCommand = resetPlaySequenceCommand;

var _store = require('../../models/store');

function resetPlaySequenceCommand() {
  _store.store.game.boardModel.resetPlaySequence();
}

},{"../../models/store":158}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetSimulationSequenceCommand = resetSimulationSequenceCommand;

var _store = require('../../models/store');

function resetSimulationSequenceCommand() {
  _store.store.game.boardModel.resetSimulationSequence();
}

},{"../../models/store":158}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBoardStateCommand = setBoardStateCommand;

var _store = require('../../models/store');

function setBoardStateCommand(state) {
  _store.store.game.boardModel.state = state;
}

},{"../../models/store":158}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSimulationCommand = startSimulationCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _store = require('../../models/store');

var _startTimerFromCommand = require('../game/start-timer-from-command');

var _boardSimulateCommand = require('./board-simulate-command');

function startSimulationCommand() {
  var _getSequenceStartEndT = (0, _boardConfig.getSequenceStartEndTime)(_store.store.game.boardModel.sequence),
      startTime = _getSequenceStartEndT.startTime;

  _lego.lego.command
  //
  .execute(_boardSimulateCommand.boardSimulateCommand).payload(startTime, true).execute(_startTimerFromCommand.startTimerFromCommand);
}

},{"../../configs/board-config":87,"../../models/store":158,"../game/start-timer-from-command":62,"./board-simulate-command":33,"@armathai/lego":212}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameInitCommand = gameInitCommand;

var _lego = require('@armathai/lego');

var _resetTimeCommand = require('./ad/reset-time-command');

function gameInitCommand() {
  _lego.lego.command.execute(_resetTimeCommand.resetTimeCommand);
}

},{"./ad/reset-time-command":17,"@armathai/lego":212}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameShutDownCommand = gameShutDownCommand;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _tutorialModelGuard = require('../guards/ad/tutorial-model-guard');

var _setAdStatusCommand = require('./ad/set-ad-status-command');

var _setLastInteractionCommand = require('./ad/set-last-interaction-command');

var _setTutorialSkipCommand = require('./ad/tutorial/set-tutorial-skip-command');

var _unmapPlayableCommandsCommand = require('./game/unmap-playable-commands-command');

var _shutdownModelsCommand = require('./shutdown-models-command');

function gameShutDownCommand() {
  _lego.lego.command.guard(_tutorialModelGuard.tutorialModelGuard).execute(_setTutorialSkipCommand.setTutorialSkipCommand).execute(_unmapPlayableCommandsCommand.unmapPlayableCommandsCommand).execute(_shutdownModelsCommand.shutdownModelsCommand).payload(0).execute(_setLastInteractionCommand.setLastInteractionCommand).payload(_constants.AdStatus.Unknown).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../constants":107,"../guards/ad/tutorial-model-guard":126,"./ad/set-ad-status-command":18,"./ad/set-last-interaction-command":19,"./ad/tutorial/set-tutorial-skip-command":29,"./game/unmap-playable-commands-command":65,"./shutdown-models-command":76,"@armathai/lego":212}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameStartCommand = gameStartCommand;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _mapAdStatusUpdateCommand = require('./ad/map-ad-status-update-command');

var _setAdStatusCommand = require('./ad/set-ad-status-command');

function gameStartCommand() {
  _lego.lego.command.execute(_mapAdStatusUpdateCommand.mapAdStatusUpdateCommand).payload(_constants.AdStatus.Game).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../constants":107,"./ad/map-ad-status-update-command":14,"./ad/set-ad-status-command":18,"@armathai/lego":212}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyGameModelCommand = destroyGameModelCommand;

var _store = require('../../models/store');

function destroyGameModelCommand() {
  _store.store.destroyGameModel();
}

},{"../../models/store":158}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeGameModelCommand = initializeGameModelCommand;

var _store = require('../../models/store');

function initializeGameModelCommand() {
  _store.store.initializeGameModel();
}

},{"../../models/store":158}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPlayableCommandsCommand = mapPlayableCommandsCommand;

var _lego = require('@armathai/lego');

var _legoConfig = require('../../configs/lego-config');

function mapPlayableCommandsCommand() {
  _legoConfig.playCommands.forEach(function (entry) {
    return _lego.lego.command.on(entry.event, entry.command);
  });
}

},{"../../configs/lego-config":101,"@armathai/lego":212}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onProgressUpdateCommand = onProgressUpdateCommand;

var _lego = require('@armathai/lego');

var _updateProgressBarDots = require('./update-progress-bar-dots');

function onProgressUpdateCommand(progress) {
  _lego.lego.command
  //
  .payload(progress).execute(_updateProgressBarDots.updateProgressBarDots);
}

},{"./update-progress-bar-dots":66,"@armathai/lego":212}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTimerCompleteUpdateCommand = onTimerCompleteUpdateCommand;

var _lego = require('@armathai/lego');

var _tutorialModelGuard = require('../../guards/ad/tutorial-model-guard');

var _boardStatePlayingGuard = require('../../guards/board/board-state-playing-guard');

var _timerCompleteGuard = require('../../guards/game/timer-complete-guard');

var _timerToCtaCommand = require('./timer-to-cta-command');

function onTimerCompleteUpdateCommand(complete) {
  _lego.lego.command
  //
  .payload(complete).guard((0, _lego.not)(_tutorialModelGuard.tutorialModelGuard), _timerCompleteGuard.timerCompleteGuard, _boardStatePlayingGuard.boardStatePlayingGuard).execute(_timerToCtaCommand.timerToCtaCommand);
}

},{"../../guards/ad/tutorial-model-guard":126,"../../guards/board/board-state-playing-guard":130,"../../guards/game/timer-complete-guard":134,"./timer-to-cta-command":64,"@armathai/lego":212}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTimerRemainingUpdateCommand = onTimerRemainingUpdateCommand;

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _hintModelGuard = require('../../guards/ad/hint-model-guard');

var _tutorialModelGuard = require('../../guards/ad/tutorial-model-guard');

var _boardStateIdleGuard = require('../../guards/board/board-state-idle-guard');

var _boardStatePlayingGuard = require('../../guards/board/board-state-playing-guard');

var _boardStateSimulationGuard = require('../../guards/board/board-state-simulation-guard');

var _checkForAutoPlaySoundPartsCommand = require('../board/check-for-auto-play-sound-parts-command');

var _checkForSequencePlayedCommand = require('../board/check-for-sequence-played-command');

var _checkForSimulationCommand = require('../board/check-for-simulation-command');

var _checkForSimulationSequenceOverCommand = require('../board/check-for-simulation-sequence-over-command');

var _checkHintSimulationCommand = require('../board/check-hint-simulation-command');

var _updateProgressCommand = require('./update-progress-command');

function onTimerRemainingUpdateCommand(remaining) {
  _lego.lego.command
  //
  .payload((0, _boardConfig.getGameTime)() - remaining).guard(_boardStateSimulationGuard.boardStateSimulationGuard).execute(_checkForSimulationSequenceOverCommand.checkForSimulationSequenceOverCommand).payload((0, _boardConfig.getGameTime)() - remaining).guard(_boardStateSimulationGuard.boardStateSimulationGuard).execute(_checkForSimulationCommand.checkForSimulationCommand).payload((0, _boardConfig.getGameTime)() - remaining).guard((0, _lego.not)(_boardStateIdleGuard.boardStateIdleGuard)).execute(_checkForAutoPlaySoundPartsCommand.checkForAutoPlaySoundsCommand).payload((0, _boardConfig.getGameTime)() - remaining).guard(_hintModelGuard.hintModelGuard, _boardStatePlayingGuard.boardStatePlayingGuard).execute(_checkHintSimulationCommand.checkForHintCommand).payload((0, _boardConfig.getGameTime)() - remaining).guard(_tutorialModelGuard.tutorialModelGuard, _boardStatePlayingGuard.boardStatePlayingGuard).execute(_checkForSequencePlayedCommand.checkForSequencePlayedCommand).payload(remaining).guard(_boardStatePlayingGuard.boardStatePlayingGuard).execute(_updateProgressCommand.updateProgressCommand);
}

},{"../../configs/board-config":87,"../../guards/ad/hint-model-guard":119,"../../guards/ad/tutorial-model-guard":126,"../../guards/board/board-state-idle-guard":129,"../../guards/board/board-state-playing-guard":130,"../../guards/board/board-state-simulation-guard":131,"../board/check-for-auto-play-sound-parts-command":34,"../board/check-for-sequence-played-command":36,"../board/check-for-simulation-command":37,"../board/check-for-simulation-sequence-over-command":38,"../board/check-hint-simulation-command":39,"./update-progress-command":67,"@armathai/lego":212}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startTimerFromCommand = startTimerFromCommand;

var _store = require('../../models/store');

function startTimerFromCommand(time, delay) {
  _store.store.game.timerModel.startTimerFrom(time, delay);
}

},{"../../models/store":158}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTimerCommand = stopTimerCommand;

var _store = require('../../models/store');

function stopTimerCommand() {
  _store.store.game.timerModel.stopTimer();
}

},{"../../models/store":158}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timerToCtaCommand = timerToCtaCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _showCtaCommand = require('../ad/cta/show-cta-command');

function timerToCtaCommand() {
  _lego.lego.command
  //
  .payload(_constants.GameOverReasons.ItemsToCtaReached, 500).execute(_showCtaCommand.showCtaCommand);
}

},{"../../constants":107,"../ad/cta/show-cta-command":9,"@armathai/lego":212}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmapPlayableCommandsCommand = unmapPlayableCommandsCommand;

var _lego = require('@armathai/lego');

var _legoConfig = require('../../configs/lego-config');

function unmapPlayableCommandsCommand() {
  _legoConfig.playCommands.forEach(function (entry) {
    return _lego.lego.command.off(entry.event, entry.command);
  });
}

},{"../../configs/lego-config":101,"@armathai/lego":212}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProgressBarDots = updateProgressBarDots;

var _constants = require('../../constants');

var _store = require('../../models/store');

function updateProgressBarDots(progress) {
  if (progress === 0) {
    var firstDot = _store.store.game.progressBarModel.getDotAtPosition(0);
    firstDot.state = _constants.DotState.Filled;

    var secondDot = _store.store.game.progressBarModel.getDotAtPosition(1);
    secondDot.state = _constants.DotState.Glowing;
  } else if (progress >= 0.5 && progress < 1) {
    var _firstDot = _store.store.game.progressBarModel.getDotAtPosition(1);

    if (_firstDot.state !== _constants.DotState.Filled) {
      _firstDot.state = _constants.DotState.Idle;
      _firstDot.state = _constants.DotState.Filled;
    }

    var _secondDot = _store.store.game.progressBarModel.getDotAtPosition(2);
    _secondDot.state = _constants.DotState.Glowing;
  } else if (progress >= 1) {
    var _firstDot2 = _store.store.game.progressBarModel.getDotAtPosition(2);
    _firstDot2.state = _constants.DotState.Idle;
    _firstDot2.state = _constants.DotState.Filled;
  }
}

},{"../../constants":107,"../../models/store":158}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProgressCommand = updateProgressCommand;

var _boardConfig = require('../../configs/board-config');

var _store = require('../../models/store');

function updateProgressCommand(remainingTime) {
  var progress = 1 - remainingTime / (0, _boardConfig.getGameTime)();
  _store.store.game.progressBarModel.progress = Math.min(1, progress);
}

},{"../../configs/board-config":87,"../../models/store":158}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeModelsCommand = initializeModelsCommand;

var _lego = require('@armathai/lego');

var _hintParamGuard = require('../guards/ad/hint-param-guard');

var _persistentCtaParamGuard = require('../guards/ad/persistent-cta-param-guard');

var _soundModelGuard = require('../guards/ad/sound-model-guard');

var _soundParamGuard = require('../guards/ad/sound-param-guard');

var _tutorialModelGuard = require('../guards/ad/tutorial-model-guard');

var _tutorialParamGuard = require('../guards/ad/tutorial-param-guard');

var _initializeCtaModelCommand = require('./ad/cta/initialize-cta-model-command');

var _initializeHintModelCommand = require('./ad/hint/initialize-hint-model-command');

var _initializePersistentCtaModelCommand = require('./ad/pcta/initialize-persistent-cta-model-command');

var _initializeSoundModelCommand = require('./ad/sound/initialize-sound-model-command');

var _initializeTutorialModelCommand = require('./ad/tutorial/initialize-tutorial-model-command');

var _enableInitialPadsCommand = require('./board/enable-initial-pads-command');

var _idleInitialPadsCommand = require('./board/idle-initial-pads-command');

var _initializeGameModelCommand = require('./game/initialize-game-model-command');

var _initializePlayerModelCommand = require('./player/initialize-player-model-command');

function initializeModelsCommand() {
  _lego.lego.command.execute(_initializePlayerModelCommand.initializePlayerModelCommand).execute(_initializeGameModelCommand.initializeGameModelCommand).execute(_initializeCtaModelCommand.initializeCtaModelCommand).guard(_soundParamGuard.soundParamGuard, (0, _lego.not)(_soundModelGuard.soundModelGuard)).execute(_initializeSoundModelCommand.initializeSoundModelCommand).guard(_tutorialParamGuard.tutorialParamGuard).execute(_initializeTutorialModelCommand.initializeTutorialModelCommand).guard(_tutorialModelGuard.tutorialModelGuard).execute(_idleInitialPadsCommand.idleInitialPadsCommand).guard((0, _lego.not)(_tutorialModelGuard.tutorialModelGuard)).execute(_idleInitialPadsCommand.idleInitialPadsCommand, _enableInitialPadsCommand.enableInitialPadsCommand).guard(_hintParamGuard.hintParamGuard, (0, _lego.not)(_tutorialModelGuard.tutorialModelGuard)).execute(_initializeHintModelCommand.initializeHintModelCommand).guard(_persistentCtaParamGuard.persistentCtaParamGuard).execute(_initializePersistentCtaModelCommand.initializePersistentCtaModelCommand);
}

},{"../guards/ad/hint-param-guard":120,"../guards/ad/persistent-cta-param-guard":122,"../guards/ad/sound-model-guard":123,"../guards/ad/sound-param-guard":124,"../guards/ad/tutorial-model-guard":126,"../guards/ad/tutorial-param-guard":127,"./ad/cta/initialize-cta-model-command":8,"./ad/hint/initialize-hint-model-command":12,"./ad/pcta/initialize-persistent-cta-model-command":16,"./ad/sound/initialize-sound-model-command":20,"./ad/tutorial/initialize-tutorial-model-command":23,"./board/enable-initial-pads-command":42,"./board/idle-initial-pads-command":44,"./game/initialize-game-model-command":57,"./player/initialize-player-model-command":73,"@armathai/lego":212}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAnalyticsObservantCommand = initializeAnalyticsObservantCommand;

var _analyticsObservant = require('../../observants/analytics-observant');

function initializeAnalyticsObservantCommand() {
  (0, _analyticsObservant.AnalyticsObservant)();
}

},{"../../observants/analytics-observant":187}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSoundObservantCommand = initializeSoundObservantCommand;

var _soundObservant = require('../../observants/sound-observant');

function initializeSoundObservantCommand() {
  (0, _soundObservant.SoundObservant)();
}

},{"../../observants/sound-observant":188}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeWrapperObservantCommand = initializeWrapperObservantCommand;

var _wrapperObservant = require('../../observants/wrapper-observant');

function initializeWrapperObservantCommand() {
  (0, _wrapperObservant.WrapperObservant)();
}

},{"../../observants/wrapper-observant":189}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPlayerModelCommand = destroyPlayerModelCommand;

var _store = require('../../models/store');

function destroyPlayerModelCommand() {
  _store.store.destroyPlayerModel();
}

},{"../../models/store":158}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePlayerModelCommand = initializePlayerModelCommand;

var _store = require('../../models/store');

function initializePlayerModelCommand() {
  _store.store.initializePlayerModel();
}

},{"../../models/store":158}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeCommand = resizeCommand;
function resizeCommand() {
  //
}

},{}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryCommand = retryCommand;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _setAdStatusCommand = require('./ad/set-ad-status-command');

function retryCommand() {
  _lego.lego.command.payload(_constants.AdStatus.Retry).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../constants":107,"./ad/set-ad-status-command":18,"@armathai/lego":212}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shutdownModelsCommand = shutdownModelsCommand;

var _lego = require('@armathai/lego');

var _ctaModelGuard = require('../guards/ad/cta-model-guard');

var _hintModelGuard = require('../guards/ad/hint-model-guard');

var _persistentCtaModelGuard = require('../guards/ad/persistent-cta-model-guard');

var _gameModelGuard = require('../guards/game/game-model-guard');

var _playerModelGuard = require('../guards/player/player-model-guard');

var _destroyCtaModelCommand = require('./ad/cta/destroy-cta-model-command');

var _destroyHintModelCommand = require('./ad/hint/destroy-hint-model-command');

var _destroyPersistentCtaModelCommand = require('./ad/pcta/destroy-persistent-cta-model-command');

var _destroyGameModelCommand = require('./game/destroy-game-model-command');

var _destroyPlayerModelCommand = require('./player/destroy-player-model-command');

function shutdownModelsCommand() {
  _lego.lego.command.guard(_playerModelGuard.playerModelGuard).execute(_destroyPlayerModelCommand.destroyPlayerModelCommand).guard(_gameModelGuard.gameModelGuard).execute(_destroyGameModelCommand.destroyGameModelCommand).guard(_ctaModelGuard.ctaModelGuard).execute(_destroyCtaModelCommand.destroyCtaModelCommand).guard(_hintModelGuard.hintModelGuard).execute(_destroyHintModelCommand.destroyHintModelCommand).guard(_persistentCtaModelGuard.persistentCtaModelGuard).execute(_destroyPersistentCtaModelCommand.destroyPersistentCtaModelCommand);
}

},{"../guards/ad/cta-model-guard":116,"../guards/ad/hint-model-guard":119,"../guards/ad/persistent-cta-model-guard":121,"../guards/game/game-model-guard":133,"../guards/player/player-model-guard":135,"./ad/cta/destroy-cta-model-command":7,"./ad/hint/destroy-hint-model-command":11,"./ad/pcta/destroy-persistent-cta-model-command":15,"./game/destroy-game-model-command":56,"./player/destroy-player-model-command":72,"@armathai/lego":212}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startupCommand = startupCommand;

var _lego = require('@armathai/lego');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _soundModelGuard = require('../guards/ad/sound-model-guard');

var _soundParamGuard = require('../guards/ad/sound-param-guard');

var _adLiveCommand = require('./ad/ad-live-command');

var _adViewStateUpdateCommand = require('./ad/ad-view-state-update-command');

var _ctaIdleTimeCommand = require('./ad/cta/cta-idle-time-command');

var _ctaVisibleUpdateCommand = require('./ad/cta/cta-visible-update-command');

var _initializeAdModelCommand = require('./ad/initialize-ad-model-command');

var _initializeAnalyticsObservantCommand = require('./observants/initialize-analytics-observant-command');

var _initializeSoundObservantCommand = require('./observants/initialize-sound-observant-command');

var _initializeWrapperObservantCommand = require('./observants/initialize-wrapper-observant-command');

var _resizeCommand = require('./resize-command');

var _initializePhaserStatesCommand = require('./states/initialize-phaser-states-command');

var _initializeNinepatchesCommand = require('./view/initialize-ninepatches-command');

var _initializeParticlesCommand = require('./view/initialize-particles-command');

var _onRetryClickCommand = require('./view/on-retry-click-command');

var _patchTextForLocalizationCommand = require('./view/patch-text-for-localization-command');

var _userInteractionCommand = require('./view/user-interaction-command');

function startupCommand() {
  _lego.lego.command

  // .execute(addOverlayCommand)
  .execute(_patchTextForLocalizationCommand.patchTextForLocalizationCommand).execute(_initializeNinepatchesCommand.initializeNinePatchesCommand).execute(_initializeParticlesCommand.initializeParticlesCommand).execute(_initializeAdModelCommand.initializeAdModelCommand).execute(_initializePhaserStatesCommand.initializePhaserStatesCommand).execute(_initializeWrapperObservantCommand.initializeWrapperObservantCommand).execute(_initializeAnalyticsObservantCommand.initializeAnalyticsObservantCommand).guard(_soundParamGuard.soundParamGuard, (0, _lego.not)(_soundModelGuard.soundModelGuard)).execute(_initializeSoundObservantCommand.initializeSoundObservantCommand).on(_viewEvents.ViewEvents.Ad.Live, _adLiveCommand.adLiveCommand).on(_viewEvents.ViewEvents.Game.Resize, _resizeCommand.resizeCommand).on(_viewEvents.ViewEvents.Game.UserInteraction, _userInteractionCommand.userInteractionCommand).on(_viewEvents.ViewEvents.GameState.CtaIdleTime, _ctaIdleTimeCommand.ctaIdleTimeCommand).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, _adViewStateUpdateCommand.adViewStateUpdateCommand).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, _ctaVisibleUpdateCommand.ctaVisibleUpdateCommand).on(_viewEvents.ViewEvents.CtaView.RetryClick, _onRetryClickCommand.onRetryClickCommand);
}

},{"../events/model-events":112,"../events/view-events":113,"../guards/ad/sound-model-guard":123,"../guards/ad/sound-param-guard":124,"./ad/ad-live-command":1,"./ad/ad-view-state-update-command":3,"./ad/cta/cta-idle-time-command":4,"./ad/cta/cta-visible-update-command":6,"./ad/initialize-ad-model-command":13,"./observants/initialize-analytics-observant-command":69,"./observants/initialize-sound-observant-command":70,"./observants/initialize-wrapper-observant-command":71,"./resize-command":74,"./states/initialize-phaser-states-command":78,"./view/initialize-ninepatches-command":81,"./view/initialize-particles-command":82,"./view/on-retry-click-command":83,"./view/patch-text-for-localization-command":84,"./view/user-interaction-command":85,"@armathai/lego":212}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePhaserStatesCommand = initializePhaserStatesCommand;

var _constants = require('../../constants');

var _gameState = require('../../states/game-state');

var _preloaderState = require('../../states/preloader-state');

function initializePhaserStatesCommand() {
  var _CI_API = CI_API,
      game = _CI_API.game,
      states = _CI_API.states;

  states.preloader = CI_API.game.state.add(_constants.PhaserState.Preload, _preloaderState.PreloaderState, false);
  states.game = CI_API.game.state.add(_constants.PhaserState.Game, _gameState.GameState, false);
  game.state.start(_constants.PhaserState.Preload);
}

},{"../../constants":107,"../../states/game-state":190,"../../states/preloader-state":191}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restartGameStateCommand = restartGameStateCommand;
function restartGameStateCommand() {
  CI_API.game.state.restart();
}

},{}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGameStateCommand = startGameStateCommand;

var _constants = require('../../constants');

function startGameStateCommand() {
  CI_API.game.state.start(_constants.PhaserState.Game);
}

},{"../../constants":107}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeNinePatchesCommand = initializeNinePatchesCommand;

var _phaser2Ninepatch = require('@armathai/phaser2-ninepatch');

var _ninepatchConfigs = require('../../configs/ninepatch-configs');

var addNinePatch = function addNinePatch(config) {
  var key = config.key,
      data = config.data;

  CI_API.game.cache.addNinePatch(key, data);
};

function initializeNinePatchesCommand() {
  var _CI_API = CI_API,
      game = _CI_API.game;

  game.plugins.add(_phaser2Ninepatch.NinePatchPlugin);
  _ninepatchConfigs.ninePatches.forEach(function (ninePatch) {
    return addNinePatch(ninePatch);
  });
}

},{"../../configs/ninepatch-configs":102,"@armathai/phaser2-ninepatch":220}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeParticlesCommand = initializeParticlesCommand;

var _particlesConfigs = require('../../configs/particles-configs');

var addData = function addData(config) {
  var key = config.key,
      data = config.data;

  CI_API.game.particleStorm.addData(key, data);
};

function initializeParticlesCommand() {
  var _CI_API = CI_API,
      game = _CI_API.game;

  game.particleStorm = game.plugins.add(Phaser.ParticleStorm);
  _particlesConfigs.particles.forEach(function (p) {
    return addData(p);
  });
}

},{"../../configs/particles-configs":103}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRetryClickCommand = onRetryClickCommand;

var _lego = require('@armathai/lego');

var _decreaseRetriesCountCommand = require('../ad/decrease-retries-count-command');

var _retryCommand = require('../retry-command');

function onRetryClickCommand() {
  _lego.lego.command
  //
  .execute(_decreaseRetriesCountCommand.decreaseRetriesCountCommand).execute(_retryCommand.retryCommand);
}

},{"../ad/decrease-retries-count-command":10,"../retry-command":75,"@armathai/lego":212}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.patchTextForLocalizationCommand = patchTextForLocalizationCommand;
/* eslint-disable no-underscore-dangle */
function patchTextForLocalizationCommand() {
  localization.has = function has(str) {
    return !!this._strings[str];
  };

  if (delete Phaser.Text.prototype._text) {
    var localize = function localize(newValue) {
      var macros = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (!localization.has(newValue)) {
        throw Error('"' + newValue + '" is not localized.');
      }
      return localization.get(newValue, macros);
    };

    Object.defineProperty(Phaser.Text.prototype, '_text', {
      get: function get() {
        return this.__text || '';
      },
      set: function set(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          var text = value.text,
              macros = value.macros,
              ignoreLocalization = value.ignoreLocalization;

          if (ignoreLocalization) {
            this.__text = text;
            return;
          }
          this.__text = localize(text, macros);
          return;
        }

        if (value.length === 0 || !value.trim()) {
          this.__text = value;
          return;
        }

        this.__text = localize(value);
      },

      configurable: true
    });
  }
}

},{}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userInteractionCommand = userInteractionCommand;

var _lego = require('@armathai/lego');

var _setLastInteractionCommand = require('../ad/set-last-interaction-command');

function userInteractionCommand() {
  _lego.lego.command.payload(CI_API.game.time.totalElapsedSeconds()).execute(_setLastInteractionCommand.setLastInteractionCommand);
}

},{"../ad/set-last-interaction-command":19,"@armathai/lego":212}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoinFallAnimationConfig = getCoinFallAnimationConfig;
var Animations = exports.Animations = {
  Item: {
    Fall: 'fall'
  }
};

// export function getScrollAnimationConfig(x, y) {
//   return {
//     key: ASSETS,
//     x,
//     y,
//     data: [
//       {
//         name: Animations.Scroll.Open,
//         prefix: 'animations/scroll/',
//         start: 0,
//         stop: 5,
//         suffix: '.png',
//         zeroPad: 0,
//         frameRate: 12,
//         loop: false
//       },
//       {
//         name: Animations.Scroll.Close,
//         prefix: 'animations/scroll/',
//         start: 5,
//         stop: 1,
//         suffix: '.png',
//         zeroPad: 0,
//         frameRate: 12,
//         loop: false
//       }
//     ]
//   };
// }

function getCoinFallAnimationConfig() {
  return {
    data: [{
      name: Animations.Item.Fall,
      prefix: 'animation/coins/coin_',
      start: 1,
      stop: 10,
      suffix: '.png',
      zeroPad: 0,
      frameRate: 40,
      loop: true
    }]
  };
}

},{}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Column = exports.Row = undefined;
exports.getGameTime = getGameTime;
exports.getPadsConfig = getPadsConfig;
exports.getOpeningPads = getOpeningPads;
exports.getAutoPlaySoundPartsConfig = getAutoPlaySoundPartsConfig;
exports.getPlaySequence = getPlaySequence;
exports.getSequenceStartEndTime = getSequenceStartEndTime;

var _constants = require('../constants');

var Row = exports.Row = 4;
var Column = exports.Column = 3;

function getGameTime() {
  var time = void 0;

  switch (CI_API.Globals.PARAMS.difficulty) {
    case 'easy':
      time = CI_API.Globals.PARAMS.short_version ? 4000 : 19000;
      break;
    case 'medium':
      time = CI_API.Globals.PARAMS.short_version ? 7000 : 19000;
      break;
    case 'hard':
      time = CI_API.Globals.PARAMS.short_version ? 7400 : 19000;
      break;
    default:
      break;
  }

  return time;
}

function getPadsConfig() {
  var config = [];

  switch (CI_API.Globals.PARAMS.difficulty) {
    case 'easy':
      config = [[{ row: 0, column: 0, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 1, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 2, color: _constants.PadColor.BlueBright, sound: null }], [{ row: 1, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 1, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 2, color: _constants.PadColor.Pink, sound: null }], [{ row: 2, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 2, column: 1, color: _constants.PadColor.Yellow, sound: 'missing_part_1' }, { row: 2, column: 2, color: _constants.PadColor.Yellow, sound: 'missing_part_2' }], [{ row: 3, column: 0, color: _constants.PadColor.Purple, sound: 'drum_1' }, { row: 3, column: 1, color: _constants.PadColor.Purple, sound: 'drum_2' }, { row: 3, column: 2, color: _constants.PadColor.Purple, sound: 'drum_3' }]];
      break;
    case 'medium':
      config = [[{ row: 0, column: 0, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 1, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 2, color: _constants.PadColor.BlueBright, sound: null }], [{ row: 1, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 1, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 2, color: _constants.PadColor.Pink, sound: null }], [{ row: 2, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 2, column: 1, color: _constants.PadColor.Yellow, sound: 'missing_part_1' }, { row: 2, column: 2, color: _constants.PadColor.Yellow, sound: 'missing_part_2' }], [{ row: 3, column: 0, color: _constants.PadColor.Purple, sound: 'drum_1' }, { row: 3, column: 1, color: _constants.PadColor.Purple, sound: 'drum_2' }, { row: 3, column: 2, color: _constants.PadColor.Purple, sound: 'drum_3' }]];
      break;
    case 'hard':
      config = [[{ row: 0, column: 0, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 1, color: _constants.PadColor.BlueBright, sound: null }, { row: 0, column: 2, color: _constants.PadColor.BlueBright, sound: null }], [{ row: 1, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 1, color: _constants.PadColor.Pink, sound: null }, { row: 1, column: 2, color: _constants.PadColor.Pink, sound: null }], [{ row: 2, column: 0, color: _constants.PadColor.Pink, sound: null }, { row: 2, column: 1, color: _constants.PadColor.Yellow, sound: 'missing_part_1' }, { row: 2, column: 2, color: _constants.PadColor.Yellow, sound: 'missing_part_2' }], [{ row: 3, column: 0, color: _constants.PadColor.Purple, sound: 'drum_1' }, { row: 3, column: 1, color: _constants.PadColor.Purple, sound: 'drum_2' }, { row: 3, column: 2, color: _constants.PadColor.Purple, sound: 'drum_3' }]];
      break;
    default:
      break;
  }

  return config;
}

function getOpeningPads() {
  var pads = [];

  switch (CI_API.Globals.PARAMS.difficulty) {
    case 'easy':
      pads = [{
        row: 3,
        column: 0
      }, {
        row: 3,
        column: 1
      }, {
        row: 3,
        column: 2
      }];
      break;
    case 'medium':
      pads = [{
        row: 2,
        column: 2
      }, {
        row: 3,
        column: 0
      }, {
        row: 3,
        column: 1
      }, {
        row: 3,
        column: 2
      }];
      break;
    case 'hard':
      pads = [{
        row: 2,
        column: 1
      }, {
        row: 2,
        column: 2
      }, {
        row: 3,
        column: 0
      }, {
        row: 3,
        column: 1
      }, {
        row: 3,
        column: 2
      }];
      break;
    default:
      break;
  }

  return pads;
}

function getAutoPlaySoundPartsConfig() {
  var parts = [];

  switch (CI_API.Globals.PARAMS.difficulty) {
    case 'easy':
      parts = [[{ name: 'first_sequence', startTime: 0 }], [{ name: 'missing_part_1', startTime: 4000 }, { name: 'missing_part_2', startTime: 7000 }, { name: 'second_sequence', startTime: 7400 }]];
      break;
    case 'medium':
      parts = [[{ name: 'first_sequence', startTime: 0 }, { name: 'missing_part_1', startTime: 4000 }], [{ name: 'second_sequence', startTime: 7400 }]];
      break;
    case 'hard':
      parts = [[{ name: 'first_sequence', startTime: 0 }], [{ name: 'second_sequence', startTime: 7400 }]];
      break;
    default:
      break;
  }

  return parts;
}

function getPlaySequence() {
  var sequence = [];

  switch (CI_API.Globals.PARAMS.difficulty) {
    case 'easy':
      sequence = [[{ name: 'drum_1', startTime: 0 }, { name: 'drum_3', startTime: 450 - 25 }, { name: 'drum_1', startTime: 900 - 25 }, { name: 'drum_3', startTime: 1350 - 25 }, { name: 'drum_1', startTime: 1800 - 25 }, { name: 'drum_3', startTime: 2250 - 25 }, { name: 'drum_1', startTime: 2700 - 25 }, { name: 'drum_3', startTime: 3150 - 25 }], [{ name: 'drum_1', startTime: 7450 + 0 }, { name: 'drum_3', startTime: 7450 + 450 - 50 }, { name: 'drum_1', startTime: 7450 + 900 - 50 }, { name: 'drum_3', startTime: 7450 + 1350 - 50 }, { name: 'drum_1', startTime: 7450 + 1800 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 }, { name: 'drum_3', startTime: 7450 + 3400 + 450 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 900 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 1350 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 1800 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 2250 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 2700 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 450 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 900 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 1350 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 1800 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 2250 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 2700 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 3150 + 50 }]];
      break;
    case 'medium':
      sequence = [[{ name: 'drum_1', startTime: 0 }, { name: 'drum_2', startTime: 250 - 25 }, { name: 'drum_3', startTime: 450 - 25 }, { name: 'drum_2', startTime: 700 - 25 }, { name: 'drum_1', startTime: 900 - 25 }, { name: 'drum_2', startTime: 1150 - 25 }, { name: 'drum_3', startTime: 1350 - 25 }, { name: 'drum_2', startTime: 1600 - 25 }, { name: 'drum_1', startTime: 1800 - 25 }, { name: 'drum_2', startTime: 2050 - 25 }, { name: 'drum_3', startTime: 2250 - 25 }, { name: 'drum_2', startTime: 2500 - 25 }, { name: 'drum_1', startTime: 2700 - 25 }, { name: 'drum_2', startTime: 2950 - 25 }, { name: 'drum_3', startTime: 3150 - 25 }, { name: 'drum_2', startTime: 3400 - 25 }], [{ name: 'missing_part_2', startTime: 7000 }, { name: 'drum_1', startTime: 7450 + 0 }, { name: 'drum_3', startTime: 7450 + 450 - 50 }, { name: 'drum_1', startTime: 7450 + 900 - 50 }, { name: 'drum_3', startTime: 7450 + 1350 - 50 }, { name: 'drum_1', startTime: 7450 + 1800 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 }, { name: 'drum_3', startTime: 7450 + 3400 + 450 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 900 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 1350 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 1800 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 2250 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 2700 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 450 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 900 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 1350 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 1800 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 2250 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 2700 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 3150 + 50 }]];
      break;
    case 'hard':
      sequence = [[{ name: 'drum_1', startTime: 0 }, { name: 'drum_2', startTime: 250 - 25 }, { name: 'drum_3', startTime: 450 - 25 }, { name: 'drum_2', startTime: 700 - 25 }, { name: 'drum_1', startTime: 900 - 25 }, { name: 'drum_2', startTime: 1150 - 25 }, { name: 'drum_3', startTime: 1350 - 25 }, { name: 'drum_2', startTime: 1600 - 25 }, { name: 'drum_1', startTime: 1800 - 25 }, { name: 'drum_2', startTime: 2050 - 25 }, { name: 'drum_3', startTime: 2250 - 25 }, { name: 'drum_2', startTime: 2500 - 25 }, { name: 'drum_1', startTime: 2700 - 25 }, { name: 'drum_2', startTime: 2950 - 25 }, { name: 'drum_3', startTime: 3150 - 25 }, { name: 'drum_2', startTime: 3400 - 25 }, { name: 'missing_part_1', startTime: 4000 }, { name: 'missing_part_2', startTime: 7000 }], [{ name: 'drum_1', startTime: 7450 + 0 }, { name: 'drum_2', startTime: 7450 + 250 - 50 }, { name: 'drum_3', startTime: 7450 + 450 - 50 }, { name: 'drum_2', startTime: 7450 + 700 - 50 }, { name: 'drum_1', startTime: 7450 + 900 - 50 }, { name: 'drum_2', startTime: 7450 + 1150 - 50 }, { name: 'drum_3', startTime: 7450 + 1350 - 50 }, { name: 'drum_2', startTime: 7450 + 1600 - 50 }, { name: 'drum_1', startTime: 7450 + 1800 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 }, { name: 'drum_2', startTime: 7450 + 3400 + 250 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 450 - 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 700 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 900 - 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 1150 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 1350 - 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 1600 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 1800 - 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 2050 - 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 2250 - 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 2500 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 2700 - 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 250 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 450 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 700 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 900 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 1150 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 1350 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 1600 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 1800 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 2050 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 2250 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 2500 + 50 }, { name: 'drum_1', startTime: 7450 + 3400 + 3400 + 2700 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 2950 + 50 }, { name: 'drum_3', startTime: 7450 + 3400 + 3400 + 3150 + 50 }, { name: 'drum_2', startTime: 7450 + 3400 + 3400 + 3400 + 50 }]];
      break;
    default:
      break;
  }

  return sequence;
}

function getSequenceStartEndTime(sequence) {
  var difficulty = CI_API.Globals.PARAMS.difficulty;

  var time = void 0;

  switch (sequence) {
    case 0:
      if (difficulty === 'easy') {
        time = { startTime: 0, endTime: 4000 };
      } else if (difficulty === 'medium') {
        time = { startTime: 0, endTime: 7000 };
      } else if (difficulty === 'hard') {
        time = { startTime: 0, endTime: 7400 };
      }
      break;
    case 1:
      if (difficulty === 'easy') {
        time = { startTime: 4000, endTime: 19000 };
      } else if (difficulty === 'medium') {
        time = { startTime: 7000, endTime: 19000 };
      } else if (difficulty === 'hard') {
        time = { startTime: 7400, endTime: 19000 };
      }
      break;
    default:
      break;
  }

  return time;
}

},{"../constants":107}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersistentCtaButtonConfig = getPersistentCtaButtonConfig;
exports.getCtaPlayButtonConfig = getCtaPlayButtonConfig;
exports.getCtaRetryButtonConfig = getCtaRetryButtonConfig;

var _constants = require('../constants');

var _imageConfigs = require('./image-configs');

var _textConfigs = require('./text-configs');

// PERSISTENT CTA
function getPersistentCtaButtonConfig() {
  return {
    input: {
      name: 'persistent_cta_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _imageConfigs.getPlayButtonImageConfig)(),
        label: (0, _textConfigs.getPersistentCtaTextConfig)(),
        fitWidth: 0.8,
        fitHeight: 0.8
      }
    }
  };
}

// CTA
function getCtaPlayButtonConfig(text) {
  return {
    input: {
      name: 'cta_play_button',
      priority: _constants.InputPriority.Cta + 1
    },
    states: {
      up: {
        bg: (0, _imageConfigs.getPlayButtonImageConfig)(),
        label: (0, _textConfigs.getCtaPlayButtonTextConfig)(text),
        fitWidth: 0.75
      }
    }
  };
}

function getCtaRetryButtonConfig() {
  return {
    input: {
      name: 'cta_retry_button',
      priority: _constants.InputPriority.Cta + 1
    },
    states: {
      up: {
        bg: (0, _imageConfigs.getRetryButtonImageConfig)(),
        label: (0, _textConfigs.getCtaRetryButtonTextConfig)()
      }
    }
  };
}

},{"../constants":107,"./image-configs":100,"./text-configs":105}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainGridConfig = getMainGridConfig;
exports.getForegroundGridConfig = getForegroundGridConfig;
exports.getTutorialGridConfig = getTutorialGridConfig;
exports.getTutorialSequenceGridConfig = getTutorialSequenceGridConfig;
exports.getBackgroundGridConfig = getBackgroundGridConfig;
exports.getUIGridConfig = getUIGridConfig;
exports.getGameGridConfig = getGameGridConfig;
exports.getCTAContainerGridConfig = getCTAContainerGridConfig;
exports.getCTAStandardGridConfig = getCTAStandardGridConfig;
exports.getCTAEmbeddedGridConfig = getCTAEmbeddedGridConfig;

var _backgroundGridConfigs = require('./grid/background-grid-configs');

var _ctaContainerGridConfigs = require('./grid/cta-container-grid-configs');

var _ctaEmbeddedGridConfigs = require('./grid/cta-embedded-grid-configs');

var _ctaStandardGridConfigs = require('./grid/cta-standard-grid-configs');

var _foregroundGridConfigs = require('./grid/foreground-grid-configs');

var _gameGridConfigs = require('./grid/game-grid-configs');

var _mainGridConfigs = require('./grid/main-grid-configs');

var _tutorialGridConfig = require('./grid/tutorial-grid-config');

var _tutorialSequenceGridConfig = require('./grid/tutorial-sequence-grid-config');

var _uiGridConfigs = require('./grid/ui-grid-configs');

function getMainGridConfig() {
  return LP(_mainGridConfigs.getMainGridLandscapeConfig, _mainGridConfigs.getMainGridPortraitConfig).call(null);
}

function getForegroundGridConfig() {
  return LP(_foregroundGridConfigs.getForegroundGridLandscapeConfig, _foregroundGridConfigs.getForegroundGridPortraitConfig).call(null);
}

function getTutorialGridConfig() {
  return LP(_tutorialGridConfig.getTutorialGridLandscapeConfig, _tutorialGridConfig.getTutorialGridPortraitConfig).call(null);
}

function getTutorialSequenceGridConfig() {
  return LP(_tutorialSequenceGridConfig.getTutorialSequenceGridLandscapeConfig, _tutorialSequenceGridConfig.getTutorialSequenceGridPortraitConfig).call(null);
}

function getBackgroundGridConfig() {
  return LP(_backgroundGridConfigs.getBackgroundGridLandscapeConfig, _backgroundGridConfigs.getBackgroundGridPortraitConfig).call(null);
}

function getUIGridConfig() {
  return LP(_uiGridConfigs.getUIGridLandscapeConfig, _uiGridConfigs.getUIGridPortraitConfig).call(null);
}

function getGameGridConfig() {
  return LP(_gameGridConfigs.getGameGridLandscapeConfig, _gameGridConfigs.getGameGridPortraitConfig).call(null);
}

function getCTAContainerGridConfig() {
  return LP(_ctaContainerGridConfigs.getCTAContainerGridLandscapeConfig, _ctaContainerGridConfigs.getCTAContainerGridPortraitConfig).call(null);
}

function getCTAStandardGridConfig() {
  return LP(_ctaStandardGridConfigs.getCTAStandardGridLandscapeConfig, _ctaStandardGridConfigs.getCTAStandardGridPortraitConfig).call(null);
}

function getCTAEmbeddedGridConfig() {
  return LP(_ctaEmbeddedGridConfigs.getCTAEmbeddedGridLandscapeConfig, _ctaEmbeddedGridConfigs.getCTAEmbeddedGridPortraitConfig).call(null);
}

},{"./grid/background-grid-configs":90,"./grid/cta-container-grid-configs":91,"./grid/cta-embedded-grid-configs":92,"./grid/cta-standard-grid-configs":93,"./grid/foreground-grid-configs":94,"./grid/game-grid-configs":95,"./grid/main-grid-configs":96,"./grid/tutorial-grid-config":97,"./grid/tutorial-sequence-grid-config":98,"./grid/ui-grid-configs":99}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackgroundGridLandscapeConfig = getBackgroundGridLandscapeConfig;
exports.getBackgroundGridPortraitConfig = getBackgroundGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getBackgroundGridLandscapeConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'background',
    cells: [{
      name: 'bg',
      scale: _phaser2Grid.CellScale.Envelop,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

function getBackgroundGridPortraitConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'background',
    cells: [{
      name: 'bg',
      scale: _phaser2Grid.CellScale.Envelop,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

},{"@armathai/phaser2-grid":217}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCTAContainerGridLandscapeConfig = getCTAContainerGridLandscapeConfig;
exports.getCTAContainerGridPortraitConfig = getCTAContainerGridPortraitConfig;
function getCTAContainerGridLandscapeConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta_container',
    cells: [{
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      name: 'cta'
    }]
  };
}

function getCTAContainerGridPortraitConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta_container',
    cells: [{
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      name: 'cta'
    }]
  };
}

},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCTAEmbeddedGridLandscapeConfig = getCTAEmbeddedGridLandscapeConfig;
exports.getCTAEmbeddedGridPortraitConfig = getCTAEmbeddedGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

function getCTAEmbeddedGridLandscapeConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'logo',
      bounds: { x: 0, y: 0.125, width: 0.3, height: 0.3 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'retry_button',
      align: _phaser2Grid.CellAlign.CenterBottom,
      bounds: { x: 0, y: 0.6 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'play_button',
      align: _phaser2Grid.CellAlign.CenterTop,
      bounds: { x: 0, y: 0.77 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'play_button_no_retry',
      bounds: { x: 0, y: 0.68 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'content',
      bounds: { x: 0.3, y: 0, width: 0.7, height: 1 },
      padding: { x: 0.1, y: 0.15, height: 0.7, width: 0.7 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

function getCTAEmbeddedGridPortraitConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'logo',
      bounds: { x: 0, y: 0.05, width: 1, height: 0.15 }
    }, {
      name: 'content',
      align: _phaser2Grid.CellAlign.CenterTop,
      bounds: { x: 0.1, y: 0.23, width: 0.8, height: 0.5 }
    }, {
      name: 'retry_button',
      align: _phaser2Grid.CellAlign.CenterBottom,
      bounds: { x: 0.1, y: 0.77 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 },
      padding: { height: 0.9 }
    }, {
      name: 'play_button',
      align: _phaser2Grid.CellAlign.CenterTop,
      bounds: { x: 0.1, y: 0.77 + 0.1 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 },
      padding: { y: 0.1 }
    }, {
      name: 'play_button_no_retry',
      bounds: { x: 0.1, y: 0.81 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

},{"../../utils":199,"@armathai/phaser2-grid":217}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCTAStandardGridLandscapeConfig = getCTAStandardGridLandscapeConfig;
exports.getCTAStandardGridPortraitConfig = getCTAStandardGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

function getCTAStandardGridLandscapeConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'logo',
      bounds: { x: 0, y: 0.05, width: 0.3, height: 0.3 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'title',
      // align: CellAlign.CenterBottom,
      bounds: { x: 0, y: (0, _utils.isNarrowScreen)() ? 0.35 : 0.3, width: 0.3, height: 0.1 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'retry_button',
      align: _phaser2Grid.CellAlign.CenterBottom,
      bounds: { x: 0, y: 0.6 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'play_button',
      align: _phaser2Grid.CellAlign.CenterTop,
      bounds: { x: 0, y: 0.77 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'play_button_no_retry',
      bounds: { x: 0, y: 0.68 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0), width: 0.3, height: 0.15 },
      padding: { x: 0.1, width: 0.8 }
    }, {
      name: 'content',
      bounds: { x: 0.3, y: 0, width: 0.7, height: 1 },
      padding: { x: 0.1, y: 0.15, height: 0.7, width: 0.7 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

function getCTAStandardGridPortraitConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'logo',
      bounds: { x: 0, y: 0.05, width: 1, height: 0.18 }
    }, {
      name: 'title',
      align: _phaser2Grid.CellAlign.CenterBottom,
      bounds: { x: 0.1, y: 0.25, width: 0.8, height: 0.08 }
    }, {
      name: 'content',
      align: _phaser2Grid.CellAlign.Center,
      bounds: { x: 0.1, y: 0.35, width: 0.8, height: 0.4 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05) }
    }, {
      name: 'retry_button',
      align: _phaser2Grid.CellAlign.CenterBottom,
      bounds: { x: 0.1, y: 0.77 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 },
      padding: { height: 0.9 }
    }, {
      name: 'play_button',
      align: _phaser2Grid.CellAlign.CenterTop,
      bounds: { x: 0.1, y: 0.77 + 0.1 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 },
      padding: { y: 0.1 }
    }, {
      name: 'play_button_no_retry',
      bounds: { x: 0.1, y: 0.81 - ((0, _utils.isSquareLikeScreen)() ? 0.025 : 0.05), width: 0.8, height: 0.1 }
    }, {
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill,
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

},{"../../utils":199,"@armathai/phaser2-grid":217}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getForegroundGridLandscapeConfig = getForegroundGridLandscapeConfig;
exports.getForegroundGridPortraitConfig = getForegroundGridPortraitConfig;
function getForegroundGridLandscapeConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'foreground',
    cells: [{
      name: 'logo',
      padding: 0.05,
      bounds: { x: 0, y: 0.2, width: 0.3, height: 0.22 }
    }, {
      name: 'tutorial',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

function getForegroundGridPortraitConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'foreground',
    cells: [{
      name: 'logo',
      padding: 0.1,
      bounds: { x: 0, y: 0, width: 0.7, height: 0.1 }
    }, {
      name: 'tutorial',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGameGridLandscapeConfig = getGameGridLandscapeConfig;
exports.getGameGridPortraitConfig = getGameGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getGameGridLandscapeConfig() {
  return {
    // debug: { color: 0x2fc900 },
    name: 'game',
    cells: [{
      name: 'progress_bar',
      bounds: { x: 0.9, y: 0, width: 0.1, height: 1 }
    }, {
      name: 'timer',
      bounds: { x: 0, y: 0, width: 0.3, height: 0.2 }
    }, {
      name: 'board',
      padding: { x: 0.025, width: 0.9 },
      bounds: { x: 0.3, y: 0, width: 0.6, height: 1 }
    }]
  };
}

function getGameGridPortraitConfig() {
  return {
    // debug: { color: 0x2fc900 },
    name: 'game',
    cells: [{
      name: 'progress_bar',
      align: _phaser2Grid.CellAlign.CenterBottom,
      padding: { x: 0, y: 0, width: 1, height: 0.8 },
      bounds: { x: 0, y: 0.1, width: 1, height: 0.125 }
    }, {
      name: 'timer',
      bounds: { x: 0.7, y: 0, width: 0.3, height: 0.1 }
    }, {
      name: 'board',
      bounds: { x: 0, y: 0.225, width: 1, height: 0.625 }
    }]
  };
}

},{"@armathai/phaser2-grid":217}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainGridLandscapeConfig = getMainGridLandscapeConfig;
exports.getMainGridPortraitConfig = getMainGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

function getMainGridLandscapeConfig() {
  return {
    name: 'main',
    bounds: (0, _utils.getGameBounds)(),
    // debug: { color: 0xffffff },
    scale: _phaser2Grid.CellScale.None
  };
}

function getMainGridPortraitConfig() {
  return {
    name: 'main',
    bounds: (0, _utils.getGameBounds)(),
    // debug: { color: 0xffffff },
    scale: _phaser2Grid.CellScale.None
  };
}

},{"../../utils":199,"@armathai/phaser2-grid":217}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTutorialGridLandscapeConfig = getTutorialGridLandscapeConfig;
exports.getTutorialGridPortraitConfig = getTutorialGridPortraitConfig;
function getTutorialGridLandscapeConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'tutorial',
    cells: [{
      name: 'sequence',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

function getTutorialGridPortraitConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'tutorial',
    cells: [{
      name: 'sequence',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }]
  };
}

},{}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTutorialSequenceGridLandscapeConfig = getTutorialSequenceGridLandscapeConfig;
exports.getTutorialSequenceGridPortraitConfig = getTutorialSequenceGridPortraitConfig;
function getTutorialSequenceGridLandscapeConfig() {
  // const x = isNarrowScreen() ? 0.4 : 0.415;
  // const width = isNarrowScreen() ? 0.425 : 0.4;

  return {
    // debug: { color: 0xd95777 },
    name: 'tutorial_sequence',
    cells: [{
      name: '0',
      bounds: { x: 0.25, y: 0, width: 0.5, height: 1 }
    }, {
      name: '1',
      bounds: { x: 0.25, y: 0, width: 0.5, height: 1 }
    }, {
      name: '2',
      bounds: { x: 0.25, y: 0, width: 0.5, height: 1 }
    }, {
      name: '3',
      bounds: { x: 0.25, y: 0, width: 0.5, height: 1 }
    }]
  };
}

function getTutorialSequenceGridPortraitConfig() {
  // const y = isNarrowScreen() ? 0.3 : 0.25;
  // const height = isNarrowScreen() ? 0.275 : 0.3;

  return {
    // debug: { color: 0xd95777 },
    name: 'tutorial_sequence',
    cells: [{
      name: '0',
      bounds: { x: 0, y: 0.25, width: 1, height: 0.5 }
    }, {
      name: '1',
      bounds: { x: 0, y: 0.25, width: 1, height: 0.5 }
    }, {
      name: '2',
      bounds: { x: 0, y: 0.25, width: 1, height: 0.5 }
    }, {
      name: '3',
      bounds: { x: 0, y: 0.25, width: 1, height: 0.5 }
    }]
  };
}

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUIGridLandscapeConfig = getUIGridLandscapeConfig;
exports.getUIGridPortraitConfig = getUIGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

function getUIGridLandscapeConfig() {
  return {
    // debug: { color: 0x4287f5 },
    name: 'ui',
    cells: [{
      name: 'p_cta',
      padding: 0.05,
      bounds: { x: 0, y: 0.6, width: 0.3, height: 0.175 }
    }]
  };
}

function getUIGridPortraitConfig() {
  return {
    // debug: { color: 0x4287f5 },
    name: 'ui',
    cells: [{
      name: 'p_cta',
      align: (0, _utils.isNarrowScreen)() ? _phaser2Grid.CellAlign.CenterTop : _phaser2Grid.CellAlign.Center,
      bounds: { x: 0, y: 0.85, width: 1, height: 0.155 }
    }]
  };
}

},{"../../utils":199,"@armathai/phaser2-grid":217}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackgroundImageConfig = getBackgroundImageConfig;
exports.getPadImageConfig = getPadImageConfig;
exports.getPadInnerGlowImageConfig = getPadInnerGlowImageConfig;
exports.getPlayMusicImageConfig = getPlayMusicImageConfig;
exports.getPauseMusicImageConfig = getPauseMusicImageConfig;
exports.getSingerImageConfig = getSingerImageConfig;
exports.getPlayButtonImageConfig = getPlayButtonImageConfig;
exports.getRetryButtonImageConfig = getRetryButtonImageConfig;
exports.getSoundIconImageConfig = getSoundIconImageConfig;
exports.getBallImageConfig = getBallImageConfig;
exports.getProgressBarDotImageConfig = getProgressBarDotImageConfig;
exports.getProgressBarDotGlowImageConfig = getProgressBarDotGlowImageConfig;
exports.getProgressBarTriangleImageConfig = getProgressBarTriangleImageConfig;
exports.getNextButtonIconImageConfig = getNextButtonIconImageConfig;
exports.getHandImageConfig = getHandImageConfig;
function getBackgroundImageConfig(key) {
  return {
    frame: key
  };
}

function getPadImageConfig(color) {
  return {
    frame: 'pads/' + color + '.png'
  };
}

function getPadInnerGlowImageConfig() {
  return {
    frame: 'fx/tap_light.png'
  };
}

function getPlayMusicImageConfig() {
  return {
    frame: 'cta/play_music.png'
  };
}

function getPauseMusicImageConfig() {
  return {
    frame: 'cta/pause_music.png'
  };
}

function getSingerImageConfig(singer) {
  return {
    frame: 'cta/' + singer + '.png'
  };
}

function getPlayButtonImageConfig() {
  return {
    frame: 'ui/play_button.png'
  };
}

function getRetryButtonImageConfig() {
  return {
    frame: 'ui/retry_button.png'
  };
}

function getSoundIconImageConfig() {
  return {
    frame: 'ui/sound_icon.png'
  };
}

function getBallImageConfig() {
  return {
    frame: 'ui/ball.png'
  };
}

function getProgressBarDotImageConfig() {
  return {
    frame: 'ui/dot.png'
  };
}

function getProgressBarDotGlowImageConfig() {
  return {
    frame: 'ui/dot_glow.png'
  };
}

function getProgressBarTriangleImageConfig() {
  return {
    frame: 'ui/triangle.png'
  };
}

function getNextButtonIconImageConfig() {
  return {
    frame: 'ui/arrow.png'
  };
}

function getHandImageConfig() {
  return {
    frame: 'ui/hand.png',
    anchor: { x: 0.4, y: 0 }
  };
}

},{}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playCommands = exports.legoLoggerConfig = undefined;

var _ctaPrevisibleUpdateCommand = require('../commands/ad/cta/cta-previsible-update-command');

var _onTutorialCompleteCommand = require('../commands/ad/tutorial/on-tutorial-complete-command');

var _onTutorialSequenceCompleteCommand = require('../commands/ad/tutorial/on-tutorial-sequence-complete-command');

var _onTutorialSkipCommand = require('../commands/ad/tutorial/on-tutorial-skip-command');

var _tutorialScreenClickCommand = require('../commands/ad/tutorial/tutorial-screen-click-command');

var _tutorialSequenceViewCompleteCommand = require('../commands/ad/tutorial/tutorial-sequence-view-complete-command');

var _onPadClickCommand = require('../commands/board/on-pad-click-command');

var _onProgressUpdateCommand = require('../commands/game/on-progress-update-command');

var _onTimerCompleteCommand = require('../commands/game/on-timer-complete-command');

var _onTimerRemainingUpdateCommand = require('../commands/game/on-timer-remaining-update-command');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var legoLoggerConfig = exports.legoLoggerConfig = Object.freeze({
  debugGuards: true,
  debugCommand: true,
  debugEventArguments: true,
  debugRedundantEventFlag: true,
  debugEvents: true,
  fontSize: 12,
  excludedEvents: [''],
  padding: 1,
  fontFamily: 'Arial'
});

var playCommands = exports.playCommands = Object.freeze([{
  event: _modelEvents.ModelEvents.TutorialModel.CompleteUpdate,
  command: _onTutorialCompleteCommand.onTutorialCompleteCommand
}, {
  event: _modelEvents.ModelEvents.TutorialModel.SkipUpdate,
  command: _onTutorialSkipCommand.onTutorialSkipCommand
}, {
  event: _viewEvents.ViewEvents.TutorialView.ScreenClick,
  command: _tutorialScreenClickCommand.tutorialScreenClickCommand
}, {
  event: _viewEvents.ViewEvents.TutorialView.SequenceHideComplete,
  command: _tutorialSequenceViewCompleteCommand.tutorialSequenceViewCompleteCommand
}, {
  event: _modelEvents.ModelEvents.CtaModel.PreVisibleUpdate,
  command: _ctaPrevisibleUpdateCommand.ctaPreVisibleUpdateCommand
}, {
  event: _modelEvents.ModelEvents.TutorialSequenceModel.CompleteUpdate,
  command: _onTutorialSequenceCompleteCommand.onTutorialSequenceCompleteCommand
}, {
  event: _viewEvents.ViewEvents.BoardView.PadClick,
  command: _onPadClickCommand.onPadClickCommand
}, {
  event: _modelEvents.ModelEvents.TimerModel.RemainingUpdate,
  command: _onTimerRemainingUpdateCommand.onTimerRemainingUpdateCommand
}, {
  event: _modelEvents.ModelEvents.ProgressBarModel.ProgressUpdate,
  command: _onProgressUpdateCommand.onProgressUpdateCommand
}, {
  event: _modelEvents.ModelEvents.TimerModel.CompleteUpdate,
  command: _onTimerCompleteCommand.onTimerCompleteUpdateCommand
}]);

},{"../commands/ad/cta/cta-previsible-update-command":5,"../commands/ad/tutorial/on-tutorial-complete-command":25,"../commands/ad/tutorial/on-tutorial-sequence-complete-command":26,"../commands/ad/tutorial/on-tutorial-skip-command":27,"../commands/ad/tutorial/tutorial-screen-click-command":31,"../commands/ad/tutorial/tutorial-sequence-view-complete-command":32,"../commands/board/on-pad-click-command":47,"../commands/game/on-progress-update-command":59,"../commands/game/on-timer-complete-command":60,"../commands/game/on-timer-remaining-update-command":61,"../events/model-events":112,"../events/view-events":113}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMusicBarPatchConfig = getMusicBarPatchConfig;
exports.getMusicBarGlowPatchConfig = getMusicBarGlowPatchConfig;
var musicBar = 'cta/music_bar.png';
var musicBarGlow = 'cta/music_bar_glow.png';

function getMusicBarPatchConfig() {
  return {
    width: 588,
    height: 235,
    frame: musicBar
  };
}

function getMusicBarGlowPatchConfig() {
  return {
    width: 588,
    height: 235,
    frame: musicBarGlow
  };
}

var ninePatches = exports.ninePatches = [{
  key: musicBar,
  data: {
    left: 0,
    right: 0,
    top: 60,
    bottom: 60
  }
}, {
  key: musicBarGlow,
  data: {
    left: 0,
    right: 0,
    top: 60,
    bottom: 60
  }
}];

},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSparkleParticlesConfig = getSparkleParticlesConfig;
exports.getPCTASparkleEmitterConfig = getPCTASparkleEmitterConfig;
exports.getEmbeddedCTAEmitterConfig = getEmbeddedCTAEmitterConfig;
var sparkle = 'sparkle';
var ctaSparkle = 'cta_sparkle';

function getEmbeddedCTAParticlesConfig() {
  return {
    key: ctaSparkle,
    data: {
      lifespan: 1500,
      frame: ['fx/star.png', 'fx/sparkle.png'],
      scale: {
        initial: 0,
        value: 1,
        control: [{ x: 0, y: 0.5 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }]
      },
      alpha: {
        initial: 0,
        value: 1,
        control: [{ x: 0, y: 0.5 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }]
      },
      vy: { min: -2, max: 2 },
      vx: { min: -2, max: 2 },
      rotation: { delta: { min: -3, max: 3 } }
    }
  };
}

function getSparkleParticlesConfig() {
  return {
    key: sparkle,
    data: {
      lifespan: 600,
      frame: ['fx/fx_star.png'],
      scale: {
        initial: 0,
        value: 1,
        control: [{ x: 0, y: 0.5 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }]
      },
      alpha: {
        initial: 0,
        value: 1,
        control: [{ x: 0, y: 0.5 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }]
      },
      vy: { min: -2, max: 2 },
      vx: { min: -2, max: 2 },
      rotation: { delta: { min: -10, max: 10 } }
    }
  };
}

var particles = exports.particles = [getSparkleParticlesConfig(), getEmbeddedCTAParticlesConfig()];

// export function getLeftConfettiEmitterConfig(parent, y) {
//   return {
//     key: confettiLeft,
//     parent,
//     x: -50,
//     y,
//     force: { x: 0, y: 0.15 },
//     config: {
//       zone: CI_API.game.particleStorm.createCircleZone(1),
//       total: LP(50, 50),
//       delay: { start: 0, step: 30, visible: true }
//     }
//   };
// }

function getPCTASparkleEmitterConfig(parent, view) {
  var x = view.x,
      y = view.y,
      width = view.width,
      height = view.height;

  return {
    key: sparkle,
    parent: parent,
    x: x - width / 2,
    y: y - height / 2,
    force: { x: 0, y: 0 },
    config: {
      zone: CI_API.game.particleStorm.createRectangleZone(width, height),
      total: 10,
      repeat: -1
    }
  };
}

function getEmbeddedCTAEmitterConfig(parent, view) {
  var x = view.x,
      y = view.y,
      width = view.width,
      height = view.height;

  return {
    key: ctaSparkle,
    parent: parent,
    x: x - width / 2,
    y: y - height / 2,
    force: { x: 0, y: 0 },
    config: {
      zone: CI_API.game.particleStorm.createRectangleZone(width, height),
      total: 6,
      repeat: -1
    }
  };
}

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Spines = exports.Spines = {};

// export function getCardSpineConfig(x, y) {
//   return {
//     key: Spines.Card.Key,
//     x,
//     y
//   };
// }

},{}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTutorialTextConfig = getTutorialTextConfig;
exports.getPersistentCtaTextConfig = getPersistentCtaTextConfig;
exports.getCtaPlayButtonTextConfig = getCtaPlayButtonTextConfig;
exports.getCtaRetryButtonTextConfig = getCtaRetryButtonTextConfig;
exports.getStandardCtaTitleTextConfig = getStandardCtaTitleTextConfig;
exports.getGameLogoLabelTextConfig = getGameLogoLabelTextConfig;
exports.getCtaLogoLabelTextConfig = getCtaLogoLabelTextConfig;
exports.getCtaOptionTitleTextConfig = getCtaOptionTitleTextConfig;
exports.getCtaOptionOriginalTextConfig = getCtaOptionOriginalTextConfig;
exports.getCtaOptionSingerTextConfig = getCtaOptionSingerTextConfig;
exports.getPointerTextConfig = getPointerTextConfig;
exports.getTimerTextConfig = getTimerTextConfig;
exports.getCTAStandardLabelTextConfig = getCTAStandardLabelTextConfig;
exports.getCTAEmbeddedProgressTextConfig = getCTAEmbeddedProgressTextConfig;

var _constants = require('../constants');

// TUTORIAL
function getTutorialTextConfig(text, fill) {
  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: 48,
      fill: fill,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 400,
      stroke: '#000000',
      strokeThickness: 5
    }
  };
}

// PERSISTENT
function getPersistentCtaTextConfig() {
  return {
    text: 'cta_btn_persistent_text',
    style: {
      font: _constants.FONT1,
      fontSize: 65,
      fill: '#000000'
    }
  };
}

// CTA
function getCtaPlayButtonTextConfig(text) {
  return {
    text: text,
    y: 3,
    style: {
      font: _constants.FONT1,
      fontSize: 55,
      fill: '#000000'
    }
  };
}

function getCtaRetryButtonTextConfig() {
  return {
    text: 'RETRY',
    y: 3,
    style: {
      font: _constants.FONT1,
      fontSize: 50,
      fill: '#f9db0b'
    }
  };
}

function getStandardCtaTitleTextConfig(text) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#ffffff';

  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: 48,
      fill: color
    }
  };
}

function getGameLogoLabelTextConfig() {
  return {
    text: 'BEAT MAKER PRO',
    style: {
      font: _constants.FONT1,
      fontSize: 82,
      fill: '#ffffff'
    }
  };
}

function getCtaLogoLabelTextConfig() {
  return {
    text: 'BEAT MAKER PRO',
    style: {
      font: _constants.FONT1,
      fontSize: 45,
      fill: '#ffffff'
    }
  };
}

function getCtaOptionTitleTextConfig(text) {
  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: 30,
      fill: '#ffffff'
    }
  };
}

function getCtaOptionOriginalTextConfig() {
  return {
    text: 'Original by',
    style: {
      font: _constants.FONT2,
      fontSize: 22,
      fill: '#dddddd'
    }
  };
}

function getCtaOptionSingerTextConfig(text) {
  return {
    text: text,
    style: {
      font: _constants.FONT2,
      fontSize: 24,
      fill: '#9cf5f3'
    }
  };
}

function getPointerTextConfig(text) {
  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: 32,
      fill: '#fef955'
    }
  };
}

function getTimerTextConfig(text) {
  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: 32,
      fill: '#ffffff'
    }
  };
}

function getCTAStandardLabelTextConfig() {
  return {
    text: {
      text: ' ' + localization.get('WELL DONE!') + ' ',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 85,
      fill: '#ffffff',
      shadow: {
        x: 0,
        y: 0,
        color: '#5fbfd0',
        blur: 25,
        shadowStroke: true,
        shadowFill: true
      }
    }
  };
}

function getCTAEmbeddedProgressTextConfig(progress) {
  var percent = progress * 100;
  return {
    text: {
      text: '  ' + percent.toFixed(0) + '%  ',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 90,
      fill: '#fef955',
      shadow: {
        x: 0,
        y: 0,
        color: '#fef955',
        blur: 20,
        shadowStroke: true,
        shadowFill: true
      }
    }
  };
}

},{"../constants":107}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTutorialConfig = getTutorialConfig;
/**
 * Define tutorial behavior.
 * @parameter text: Content of tutorial sequence.
 *
 * @parameter duration: Milliseconds delay before tutorial sequence completes. Set -1 to make delay endless.
 *
 * @parameter clickToComplete: If set 'true', the entire screen will be clickable to complete the sequence.
 * Otherwise you should use property duration to complete it, or handle it manually.
 */
function getTutorialConfig() {
  var config = [];
  var shortVersion = CI_API.Globals.PARAMS.short_version;


  if (shortVersion) {
    config = [{ text: 'Tutorial Text 1', duration: -1, clickToComplete: true }, { text: 'Tutorial Text 2', duration: -1, clickToComplete: false }];
  } else {
    config = [{ text: 'Tutorial Text 1', duration: -1, clickToComplete: true }, { text: 'Tutorial Text 2', duration: -1, clickToComplete: false }, { text: 'Tutorial Text 1', duration: -1, clickToComplete: true }, { text: 'Tutorial Text 2', duration: -1, clickToComplete: false }];
  }

  return config;
}

},{}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FONT1 = exports.FONT1 = 'Roboto-Bold';
var FONT2 = exports.FONT2 = 'Roboto-Regular';

var AdState = exports.AdState = Object.freeze({
  Ready: 'ready',
  Live: 'live',
  Idle: 'idle'
});

var AdStatus = exports.AdStatus = Object.freeze({
  Unknown: 'unknown',
  Game: 'game',
  PreCta: 'pre_cta',
  Cta: 'cta',
  Retry: 'retry',
  Restart: 'restart'
});

var PhaserState = exports.PhaserState = Object.freeze({
  Preload: 'PreloaderState',
  Game: 'GameState'
});

var AdViewState = exports.AdViewState = Object.freeze({
  Unknown: 'unknown',
  Init: 'Init',
  Preload: 'Preload',
  Create: 'Create',
  ShutDown: 'ShutDown'
});

var SoundState = exports.SoundState = Object.freeze({
  Unknown: 'unknown',
  On: 'on',
  Off: 'off'
});

var InputPriority = exports.InputPriority = Object.freeze({
  Game: 10,
  Cta: 20,
  Foreground: 30
});

var GameOverReasons = exports.GameOverReasons = Object.freeze({
  Unknown: 'unknown',
  Idled: 'idled',
  ItemsToCtaReached: 'items_to_cta_reached'
});

var PadGap = exports.PadGap = 10;
var PadWidth = exports.PadWidth = 168;
var PadHeight = exports.PadHeight = 168;

var BoardState = exports.BoardState = Object.freeze({
  Unknown: 'unknown',
  Idle: 'idle',
  Simulation: 'simulation',
  Playing: 'playing'
});

var PadState = exports.PadState = Object.freeze({
  Unknown: 'unknown',
  Idle: 'idle',
  Blocked: 'blocked',
  Enabled: 'enabled',
  Disabled: 'disabled'
});

var PadColor = exports.PadColor = Object.freeze({
  Pink: 'cube_pink',
  Purple: 'cube_purple',
  Yellow: 'cube_yellow',
  BlueBright: 'cube_blue_bright'
});

var DotState = exports.DotState = Object.freeze({
  Unknown: 'unknown',
  Idle: 'idle',
  Glowing: 'glowing',
  Filled: 'filled'
});

var SoundPartState = exports.SoundPartState = Object.freeze({
  Unknown: 'unknown',
  Idle: 'idle',
  Play: 'play',
  Autoplay: 'autoplay',
  Simulate: 'simulate',
  Hint: 'hint'
});

},{}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fontloader ...
 *
 * @copyright CrossInstall 2018
 * @module FontLoader
 */
var FontLoader = {};

/**
 * Non-web fonts: Provide local otf font file in /texture_sheets/ <br>
 * Provided font files must contain no spaces and avoid uppercase characters <br>
 *
 * @name fontsToLoad
 * @returns {object}
 */
/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

FontLoader.FONTS_TO_LOAD = {
  families: ad_fonts_to_load ? ad_fonts_to_load.split(',') : []
};

FontLoader.TIMEOUT = 4000;

FontLoader.LOADED_FONTS = [];
FontLoader.FAILED_FONTS = [];
FontLoader.AD_FONTS_READY = false;

/**
 * - Inner Methods - <br> <br>
 * active - This event is triggered when the fonts have rendered <br>
 * inactive - This event is triggered when linked fonts is unsupported or no fonts could be loaded <br>
 * fontactive - This event is triggered once for each font that renders <br>
 * fontinactive - This event is triggered if the font can't be loaded <br>
 *
 * @name loadFonts
 * @param function callback
 * @function
 */
FontLoader.loadFonts = function (callback) {
  var fontConfig = {
    custom: FontLoader.FONTS_TO_LOAD,

    timeout: FontLoader.TIMEOUT,

    active: function active() {
      if (document.readyState == 'complete') {
        if (callback) callback();
      } else {
        window.addEventListener('load', function () {
          if (callback) callback();
        });
      }
      FontLoader.AD_FONTS_READY = true;

      console.log('Custom fonts loaded: ' + FontLoader.LOADED_FONTS);
    },
    inactive: function inactive() {
      if (callback) callback();
      if (FontLoader.FAILED_FONTS.length) console.warn('One or more fonts failed to load: ' + FontLoader.FAILED_FONTS);
    },
    fontactive: function fontactive(familyName) {
      // This event is triggered once for each font that renders.
      FontLoader.LOADED_FONTS[FontLoader.LOADED_FONTS.length] = familyName;

      var newDiv = document.createElement('font-div');
      newDiv.id = familyName;
      newDiv.style.fontFamily = familyName;
      newDiv.style.position = 'absolute';
      newDiv.style.visibility = 'hidden';
      newDiv.innerHTML = 'Hello world.';
      document.body.appendChild(newDiv);
    },
    fontinactive: function fontinactive(familyName, fvd) {
      FontLoader.FAILED_FONTS[FontLoader.FAILED_FONTS.length] = familyName;
      console.warn('failed ' + familyName + ' ' + fvd);
    }
  };

  /* Load with fontConfig */
  _webfontloader2.default.load(fontConfig);
};

exports.default = FontLoader;

},{"webfontloader":221}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layoutUtilsGeneral = require('./lu/layout-utils-general');

var _layoutUtilsGeneral2 = _interopRequireDefault(_layoutUtilsGeneral);

var _layoutUtilsCompact = require('./lu/layout-utils-compact');

var _layoutUtilsCompact2 = _interopRequireDefault(_layoutUtilsCompact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Trigger to load old ('general') or 'compact' (with universal orientation support) Layout Utils
/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

/* global CI_API, ad_orientation */
var useUniversalOrientation = true;

// TODO Temporary disable handleOrientation methods
var disableIncorrectOrientationHandling = function disableIncorrectOrientationHandling() {
  if (Utils.prototype.handleIncorrectOrientation) {
    Utils.prototype.handleIncorrectOrientation = function () {};
  }

  if (Utils.prototype.handleCorrectOrientation) {
    Utils.prototype.handleCorrectOrientation = function () {};
  }
};

var LU = useUniversalOrientation ? _layoutUtilsCompact2.default : _layoutUtilsGeneral2.default;

if (useUniversalOrientation) disableIncorrectOrientationHandling();

exports.default = LU;

},{"./lu/layout-utils-compact":110,"./lu/layout-utils-general":111}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
*****************************************************************************/

var LayoutUtilsCompact = function () {
  function LayoutUtilsCompact() {
    _classCallCheck(this, LayoutUtilsCompact);

    this.CONTAINER_NAME = 'creative';
    this.inited = false;
  }

  // Init method should be called only once, to avoid size check requestAnimationFrame duplicates,
  // and other Phaser's properties refresh.


  _createClass(LayoutUtilsCompact, [{
    key: 'init',
    value: function init(game) {
      var isUniversal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.inited) {
        this.inited = true;
      } else {
        return;
      }

      this.mGame = game;
      this.mIsUniversal = isUniversal;
      this.mHeaderNode = document.getElementById('ad_header') || { clientHeight: 0 };
      this.mOrientationNode = document.getElementById('orientation') || { style: {} };
      game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

      // If universal then override default LP method. New LP method checks real
      // device orientation instead of getting it from 'ad_orientation' tag param.
      if (isUniversal) {
        window.LP = function (landscape, portrait) {
          return window.innerWidth > window.innerHeight ? landscape : portrait;
        };
      }

      this.sizeCheck();
      this.refresh();
    }
  }, {
    key: 'sizeCheck',
    value: function sizeCheck() {
      var _this = this;

      var maxCheckTime = 750;
      var startTime = null;

      var tempWidth = 0;
      var tempHeight = 0;
      var handleId = null;

      var check = function check(timestamp) {
        if (!_this.mGame) return;
        if (!startTime) startTime = timestamp;

        if (tempWidth !== window.innerWidth || tempHeight !== window.innerHeight) {
          _this.refresh();
          _this.resizeCall(_this.mGame.world);

          tempWidth = window.innerWidth;
          tempHeight = window.innerHeight;
        }

        if (timestamp - startTime < maxCheckTime) {
          window.cancelAnimationFrame(handleId);
          handleId = window.requestAnimationFrame(check);
        }
      };

      window.cancelAnimationFrame(handleId);
      handleId = window.requestAnimationFrame(check);

      window.addEventListener('resize', function (e) {
        startTime = null;
        check(0);
      });
    }

    // Recursively calls resize handler for each sprite in gameObject tree

  }, {
    key: 'resizeCall',
    value: function resizeCall(gameObject) {
      gameObject.handleResize && gameObject.handleResize(LP('landscape', 'portrait'));
      gameObject.children.forEach(this.resizeCall, this);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      if (!this.mGame) return;
      var game = this.mGame,
          orientationNode = this.mOrientationNode,
          isUniversal = this.mIsUniversal,
          headerNode = this.mHeaderNode;

      // Lets try to keep world within 960x640 range

      var windowWidth = window.innerWidth || 1;
      var windowHeight = window.innerHeight || 1;
      var mw = LP(windowWidth * 640 / windowHeight, windowWidth * 960 / windowHeight);
      var mh = LP(windowHeight * 960 / windowWidth, windowHeight * 640 / windowWidth);
      var scaleFactor = Math.max(mw / windowWidth, mh / windowHeight);

      var width = windowWidth * scaleFactor;
      var height = windowHeight * scaleFactor;

      // Notify phaser
      game.scale.setGameSize(width, height);
      game.scale.setUserScale(1 / scaleFactor, 1 / scaleFactor);
      game.scale.refresh();

      CI_API._orientationBlocker = null;
      orientationNode.style.display = isUniversal || LP(width > height, width < height) ? 'none !important' : 'block';

      // Refresh must be called at least once before read this property
      // Also this property can return a zero in a feature
      game.headerHeight = headerNode.clientHeight * scaleFactor;
      game.scaleFactor = this.scaleFactor = scaleFactor;
      game.visibleHeight = height - game.headerHeight;
    }
  }, {
    key: '_throwError',
    value: function _throwError() {
      throw new Error('Please, check do you really need to use multi-orientation layout-utils version');
    }
  }, {
    key: 'refreshViewDimmensions',
    value: function refreshViewDimmensions() {
      this._throwError();
    }
  }, {
    key: 'getHeaderHeight',
    value: function getHeaderHeight() {
      this._throwError();
    }
  }, {
    key: 'fitIntoRect',
    value: function fitIntoRect() {
      this._throwError();
    }
  }, {
    key: 'centerIntoView',
    value: function centerIntoView() {
      this._throwError();
    }
  }, {
    key: 'isPortrait',
    get: function get() {
      return LP(false, true);
    }
  }, {
    key: 'isLandscape',
    get: function get() {
      return LP(true, false);
    }
  }]);

  return LayoutUtilsCompact;
}();

exports.default = new LayoutUtilsCompact();

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

/**
 * @file A set of utils functions to work with multi-resolution.
 * @copyright CrossInstall 2016
 * @author 62316e@gmail.com
 */

var LayoutUtils = function () {
  function LayoutUtils() {
    _classCallCheck(this, LayoutUtils);

    throw new Error('AbstractClassError');
  }

  _createClass(LayoutUtils, null, [{
    key: 'init',
    value: function init(game) {
      var state = game.state.states[game.state.current];

      utils.scaleCreative();
      utils.attachResizeListener(state);
    }
  }, {
    key: 'resizeCall',
    value: function resizeCall() {
      return null;
    }
  }, {
    key: 'getDevicePixelRatio',
    value: function getDevicePixelRatio() {
      var ratio = 1;

      if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) ratio = window.screen.systemXDPI / window.screen.logicalXDPI;else if (window.devicePixelRatio !== undefined) ratio = window.devicePixelRatio;

      return ratio * LayoutUtils.RENDER_RESOLUTION;
    }
  }, {
    key: 'getHeaderHeight',
    value: function getHeaderHeight() {
      return LayoutUtils.HEADER_ELEMENT.clientHeight * LayoutUtils.getDevicePixelRatio() * LayoutUtils.INVS;
    }
  }, {
    key: 'refreshViewDimmensions',
    value: function refreshViewDimmensions() {
      LayoutUtils.CONTAINER = document.getElementById(LayoutUtils.CONTAINER_NAME);
      LayoutUtils.HEADER_ELEMENT = document.getElementById('ad_header');

      LayoutUtils.VIEW_WIDTH = document.body.clientWidth * LayoutUtils.getDevicePixelRatio();
      LayoutUtils.VIEW_HEIGHT = document.body.clientHeight * LayoutUtils.getDevicePixelRatio();

      if (LayoutUtils.IS_LANDSCAPE) {
        LayoutUtils.BASE_WIDTH = LayoutUtils.DEFAULT_BASE_WIDTH;
        LayoutUtils.BASE_HEIGHT = LayoutUtils.DEFAULT_BASE_HEIGHT;
      } else {
        LayoutUtils.BASE_WIDTH = LayoutUtils.DEFAULT_BASE_HEIGHT;
        LayoutUtils.BASE_HEIGHT = LayoutUtils.DEFAULT_BASE_WIDTH;
      }

      var scaleX = LayoutUtils.VIEW_WIDTH / LayoutUtils.BASE_WIDTH;
      var scaleY = LayoutUtils.VIEW_HEIGHT / LayoutUtils.BASE_HEIGHT;

      LayoutUtils.S = Math.min(scaleX, scaleY);
      LayoutUtils.INVS = 1 / LayoutUtils.S;

      LayoutUtils.LEFT_OFFSET = -(LayoutUtils.VIEW_WIDTH / 2 - LayoutUtils.BASE_WIDTH / 2 * LayoutUtils.S) * LayoutUtils.INVS;
      LayoutUtils.RIGHT_OFFSET = -LayoutUtils.LEFT_OFFSET + LayoutUtils.BASE_WIDTH;
      LayoutUtils.TOP_OFFSET = -(LayoutUtils.VIEW_HEIGHT / 2 - LayoutUtils.BASE_HEIGHT / 2 * LayoutUtils.S) * LayoutUtils.INVS;
      LayoutUtils.BOTTOM_OFFSET = -LayoutUtils.TOP_OFFSET + LayoutUtils.BASE_HEIGHT;
      LayoutUtils.FULL_GAME_WIDTH = LayoutUtils.RIGHT_OFFSET - LayoutUtils.LEFT_OFFSET;
      LayoutUtils.FULL_GAME_HEIGHT = LayoutUtils.BOTTOM_OFFSET - LayoutUtils.TOP_OFFSET;

      LayoutUtils.ASPECT_RATIO = Math.round(LayoutUtils.VIEW_HEIGHT / LayoutUtils.VIEW_WIDTH * 100) / 100; // TODO: check landscape

      // console.log('[' + LayoutUtils.MODULE_NAME + ']', 'orientation:', ad_orientation, 'view-size:', LayoutUtils.VIEW_SIZE, 'left-offset:', LayoutUtils.LEFT_OFFSET, 'right-offset:', LayoutUtils.RIGHT_OFFSET, 'top-offset:', LayoutUtils.TOP_OFFSET, 'bottom-offset:', LayoutUtils.BOTTOM_OFFSET, 'aspect:', LayoutUtils.ASPECT_RATIO);
      LayoutUtils.fixCanvasSize(true);
    }
  }, {
    key: 'fixCanvasSize',
    value: function fixCanvasSize() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (r) {
        setTimeout(function () {
          LayoutUtils.fixCanvasSize(false);
        }, 100);
        return;
      }

      window.scrollTo(0, 1);
    }
  }, {
    key: 'centerIntoView',
    value: function centerIntoView(object) {
      object.scale.set(LayoutUtils.S);
      object.x = LayoutUtils.VIEW_WIDTH / 2 - LayoutUtils.BASE_WIDTH / 2 * LayoutUtils.S;
      object.y = LayoutUtils.VIEW_HEIGHT / 2 - LayoutUtils.BASE_HEIGHT / 2 * LayoutUtils.S;
    }
  }, {
    key: 'fitIntoRect',
    value: function fitIntoRect(sprite, bounds, fillRect, align, spriteBounds) {
      var wD = spriteBounds ? spriteBounds.width / sprite.scale.x : sprite.width / sprite.scale.x;
      var hD = spriteBounds ? spriteBounds.height / sprite.scale.y : sprite.height / sprite.scale.y;

      var wR = bounds.width;
      var hR = bounds.height;

      var sX = wR / wD;
      var sY = hR / hD;

      var rD = wD / hD;
      var rR = wR / hR;

      var sH = fillRect ? sY : sX;
      var sV = fillRect ? sX : sY;

      var s = rD >= rR ? sH : sV;
      var w = wD * s;
      var h = hD * s;

      var tX = 0.0;
      var tY = 0.0;

      switch (align) {
        case 'left':
        case 'topLeft':
        case 'bottomLeft':
          tX = 0.0;
          break;

        case 'right':
        case 'topRight':
        case 'bottomRight':
          tX = w - wR;
          break;

        default:
          tX = 0.5 * (w - wR);
      }

      switch (align) {
        case 'top':
        case 'topLeft':
        case 'topRight':
          tY = 0.0;
          break;

        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
          tY = h - hR;
          break;

        default:
          tY = 0.5 * (h - hR);
      }

      sprite.x = bounds.x - tX;
      sprite.y = bounds.y - tY;
      sprite.scale.set(s);
    }
  }]);

  return LayoutUtils;
}();

// Hum hum! 1 = 1:1 to device size. 0.5 means 50% to device pixel density. Make it smaller only if you need to get few more FPS.


LayoutUtils.RENDER_RESOLUTION = 1;

// MR related
LayoutUtils.CONTAINER_NAME = 'creative';
LayoutUtils.CONTAINER = document.getElementById(LayoutUtils.CONTAINER_NAME);

LayoutUtils.DEFAULT_BASE_WIDTH = 960;
LayoutUtils.DEFAULT_BASE_HEIGHT = 640;

LayoutUtils.BASE_WIDTH = 960;
LayoutUtils.BASE_HEIGHT = 640;

LayoutUtils.ASPECT_RATIO = 0;
LayoutUtils.S = 1; // SCALE
LayoutUtils.INVS = 1 / LayoutUtils.S; // SCALE INVERTED
LayoutUtils.VIEW_WIDTH = 0;
LayoutUtils.VIEW_HEIGHT = 0;

LayoutUtils.LEFT_OFFSET = 0;
LayoutUtils.RIGHT_OFFSET = 0;
LayoutUtils.TOP_OFFSET = 0;
LayoutUtils.BOTTOM_OFFSET = 0;

LayoutUtils.IS_LANDSCAPE = ad_orientation === 'landscape';
LayoutUtils.IS_PORTRAIT = !LayoutUtils.IS_LANDSCAPE;

// Fake
LayoutUtils.MODULE_NAME = 'LayoutUtils';
exports.default = LayoutUtils;

},{}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ModelEvents = exports.ModelEvents = Object.freeze({
  AdModel: {
    StatusUpdate: 'AdModelStatusUpdate',
    ViewStateUpdate: 'AdModelViewStateUpdate',
    LoadUpdate: 'AdModelLoadUpdate',
    HintUpdate: 'AdModelHintUpdate',
    TutorialUpdate: 'AdModelTutorialUpdate',
    PersistentCtaUpdate: 'AdModelPersistentCtaUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    RetriesUpdate: 'AdModelRetriesUpdate'
  },
  CtaModel: {
    TypeUpdate: 'CtaModelTypeUpdate',
    ReasonUpdate: 'CtaModelReasonUpdate',
    PreVisibleUpdate: 'CtaModelPreVisibleUpdate',
    VisibleUpdate: 'CtaModelVisibleUpdate'
  },
  HintModel: {
    VisibleUpdate: 'HintModelVisibleUpdate',
    TimerAlreadyStartedUpdate: 'HintModelTimerAlreadyStartedUpdate'
  },
  LoadModel: {
    ProgressUpdate: 'LoadModelProgressUpdate',
    CompleteUpdate: 'LoadModelCompleteUpdate'
  },
  SoundModel: {
    StateUpdate: 'SoundModelStateUpdate',
    IconUpdate: 'SoundModelIconUpdate'
  },
  TutorialModel: {
    CompleteUpdate: 'TutorialModelCompleteUpdate',
    SkipUpdate: 'TutorialModelSkipUpdate',
    SequencesUpdate: 'TutorialModelSequencesUpdate',
    CurrentUpdate: 'TutorialModelCurrentUpdate',
    CurrentIndexUpdate: 'TutorialModelCurrentIndexUpdate'
  },
  TutorialSequenceModel: {
    ConfigUpdate: 'TutorialSequenceModelConfigUpdate',
    IndexUpdate: 'TutorialSequenceModelIndexUpdate',
    CompleteUpdate: 'TutorialSequenceModelCompleteUpdate',
    ShowUpdate: 'TutorialSequenceModelShowUpdate'
  },
  BoardModel: {
    PadsUpdate: 'BoardModelPadsUpdate',
    PlaySequenceUpdate: 'BoardModelPlaySequenceUpdate',
    AutoPlaySoundsUpdate: 'BoardModelAutoPlaySoundsUpdate',
    SimulationSequenceUpdate: 'BoardModelSimulationSequenceUpdate',
    SequenceUpdate: 'BoardModelSequenceUpdate',
    StateUpdate: 'BoardModelStateUpdate'
  },
  PadModel: {
    RowUpdate: 'PadModelRowUpdate',
    ColumnUpdate: 'PadModelColumnUpdate',
    ColorUpdate: 'PadModelColorUpdate',
    SoundUpdate: 'PadModelSoundUpdate',
    StateUpdate: 'PadModelStateUpdate'
  },
  SoundPartModel: {
    NameUpdate: 'SoundPartModelNameUpdate',
    StartTimeUpdate: 'SoundPartModelStartTimeUpdate',
    StateUpdate: 'SoundPartModelStateUpdate'
  },
  DotModel: {
    StateUpdate: 'DotModelStateUpdate'
  },
  GameModel: {
    BoardModelUpdate: 'GameModelBoardModelUpdate',
    TimerModelUpdate: 'GameModelTimerModelUpdate',
    ProgressBarModelUpdate: 'GameModelProgressBarModelUpdate'
  },
  ProgressBarModel: {
    DotsUpdate: 'ProgressBarModelDotsUpdate',
    ProgressUpdate: 'ProgressBarModelProgressUpdate'
  },
  TimerModel: {
    TimerUpdate: 'TimerModelTimerUpdate',
    RemainingUpdate: 'TimerModelRemainingUpdate',
    DurationUpdate: 'TimerModelDurationUpdate',
    DeltaUpdate: 'TimerModelDeltaUpdate',
    CompleteUpdate: 'TimerModelCompleteUpdate',
    StoppedUpdate: 'TimerModelStoppedUpdate'
  },
  ObservableModel: {
    UuidUpdate: 'ObservableModelUuidUpdate'
  },
  PlayerModel: {
    ScoreUpdate: 'PlayerModelScoreUpdate'
  },
  Store: {
    AdUpdate: 'StoreAdUpdate',
    PlayerUpdate: 'StorePlayerUpdate',
    GameUpdate: 'StoreGameUpdate'
  }
});

},{}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ViewEvents = exports.ViewEvents = Object.freeze({
  Ad: {
    Live: 'AdLive'
  },
  Game: {
    Resize: 'GameResize',
    UserInteraction: 'UserInteraction',
    CtaIdleTime: 'CtaIdleTime'
  },
  GameState: {
    CtaIdleTime: 'GameStateCtaIdleTime'
  },
  SoundView: {
    Click: 'SoundViewClick'
  },
  TutorialView: {
    ScreenClick: 'TutorialViewScreenClick',
    SequenceHideComplete: 'TutorialViewSequenceHideComplete'
  },
  PersistentCtaView: {
    Click: 'PersistentCtaViewClick'
  },
  CtaView: {
    ScreenClick: 'CtaViewScreenClick',
    PlayClick: 'CtaViewPlayClick',
    RetryClick: 'CtaViewRetryClick',
    OptionClick: 'CtaViewOptionClick',
    OptionPreview: 'CtaViewOptionPreview'
  },
  BoardView: {
    PadClick: 'BoardViewPadClick'
  }
});

},{}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adLiveGuard = adLiveGuard;

var _constants = require('../../constants');

function adLiveGuard() {
  return ad_state === _constants.AdState.Live;
}

},{"../../constants":107}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asecGuard = asecGuard;
function asecGuard() {
  return ad_exchange === 'tapjoy' && window.TJ_API && window.TJ_API.directives && !window.TJ_API.directives.showEndCard;
}

},{}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaModelGuard = ctaModelGuard;

var _store = require('../../models/store');

function ctaModelGuard() {
  return _store.store.ad.cta;
}

},{"../../models/store":158}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaPreVisibleGuard = ctaPreVisibleGuard;

var _store = require('../../models/store');

function ctaPreVisibleGuard() {
  return _store.store.ad.cta.preVisible;
}

},{"../../models/store":158}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaVisibleGuard = ctaVisibleGuard;

var _store = require('../../models/store');

function ctaVisibleGuard() {
  return _store.store.ad.cta.visible;
}

},{"../../models/store":158}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hintModelGuard = hintModelGuard;

var _store = require('../../models/store');

function hintModelGuard() {
  return _store.store.ad.hint;
}

},{"../../models/store":158}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hintParamGuard = hintParamGuard;
function hintParamGuard() {
  return CI_API.Globals.PARAMS.hint;
}

},{}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistentCtaModelGuard = persistentCtaModelGuard;

var _store = require('../../models/store');

function persistentCtaModelGuard() {
  return _store.store.ad.persistentCta;
}

},{"../../models/store":158}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistentCtaParamGuard = persistentCtaParamGuard;
function persistentCtaParamGuard() {
  return CI_API.Globals.PARAMS.cta_btn_persistent;
}

},{}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundModelGuard = soundModelGuard;

var _store = require('../../models/store');

function soundModelGuard() {
  return _store.store.ad.sound;
}

},{"../../models/store":158}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundParamGuard = soundParamGuard;
function soundParamGuard() {
  return CI_API.Globals.PARAMS.sound;
}

},{}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastTutorialSequenceGuard = lastTutorialSequenceGuard;

var _store = require('../../models/store');

function lastTutorialSequenceGuard() {
  var _store$ad$tutorial = _store.store.ad.tutorial,
      currentIndex = _store$ad$tutorial.currentIndex,
      sequences = _store$ad$tutorial.sequences;

  return currentIndex === sequences.length - 1;
}

},{"../../models/store":158}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialModelGuard = tutorialModelGuard;

var _store = require('../../models/store');

function tutorialModelGuard() {
  return _store.store.ad.tutorial;
}

},{"../../models/store":158}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialParamGuard = tutorialParamGuard;
function tutorialParamGuard() {
  return CI_API.Globals.PARAMS.tutorial;
}

},{}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialSequenceGuard = tutorialSequenceGuard;

var _store = require('../../models/store');

function tutorialSequenceGuard(sequence) {
  return _store.store.ad.tutorial.currentIndex === sequence;
}

},{"../../models/store":158}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardStateIdleGuard = boardStateIdleGuard;

var _constants = require('../../constants');

var _store = require('../../models/store');

function boardStateIdleGuard() {
  return _store.store.game.boardModel.state === _constants.BoardState.Idle;
}

},{"../../constants":107,"../../models/store":158}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardStatePlayingGuard = boardStatePlayingGuard;

var _constants = require('../../constants');

var _store = require('../../models/store');

function boardStatePlayingGuard() {
  return _store.store.game.boardModel.state === _constants.BoardState.Playing;
}

},{"../../constants":107,"../../models/store":158}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boardStateSimulationGuard = boardStateSimulationGuard;

var _constants = require('../../constants');

var _store = require('../../models/store');

function boardStateSimulationGuard() {
  return _store.store.game.boardModel.state === _constants.BoardState.Simulation;
}

},{"../../constants":107,"../../models/store":158}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastPlaySequenceGuard = lastPlaySequenceGuard;

var _boardConfig = require('../../configs/board-config');

var _store = require('../../models/store');

function lastPlaySequenceGuard() {
  var _getPlaySequence = (0, _boardConfig.getPlaySequence)(),
      length = _getPlaySequence.length;

  return _store.store.game.boardModel.sequence === length - 1;
}

},{"../../configs/board-config":87,"../../models/store":158}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameModelGuard = gameModelGuard;

var _store = require('../../models/store');

function gameModelGuard() {
  return _store.store.game;
}

},{"../../models/store":158}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timerCompleteGuard = timerCompleteGuard;
function timerCompleteGuard(complete) {
  return complete;
}

},{}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerModelGuard = playerModelGuard;

var _store = require('../../models/store');

function playerModelGuard() {
  return _store.store.player;
}

},{"../../models/store":158}],136:[function(require,module,exports){
"use strict";

/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

/* global Phaser, imageLoader, embedded */

(function () {
  // Decorate Phaser Render
  var generateTilingTexture = Phaser.TileSprite.prototype.generateTilingTexture;

  var renderCanvas = Phaser.Sprite.prototype._renderCanvas;
  var matrixPool = [];
  var rectPool = [];
  var scalePool = {};

  var scaleJson = function scaleJson(json) {
    var frames = json.frames;


    for (var name in frames) {
      if (!Object.prototype.hasOwnProperty.call(frames, name) || !frames[name].frame) continue;
      var frame = frames[name];
      var scale = getScale(json, name);

      frame.frame.x /= scale;
      frame.frame.y /= scale;
      frame.frame.w /= scale;
      frame.frame.h /= scale;
      frame.spriteSourceSize.x /= scale;
      frame.spriteSourceSize.y /= scale;
      frame.spriteSourceSize.w /= scale;
      frame.spriteSourceSize.h /= scale;
      frame.sourceSize.w /= scale;
      frame.sourceSize.h /= scale;
    }
  };

  // Normalize scale for all embedded atlas jsons
  var scaleAllJsons = function scaleAllJsons() {
    for (var embeddedKey in embedded) {
      var json_data = embedded[embeddedKey];
      if (json_data.meta && json_data.frames) {
        scaleJson(json_data);
      }
    }
  };

  // Return sprite independent scale
  var getScale = function getScale(jsonData, frameName) {
    if (scalePool[frameName]) {
      return scalePool[frameName];
    }

    var scale = 1;
    if (jsonData && jsonData.frames && jsonData.frames[frameName] && jsonData.frames[frameName].scale) {
      scale = jsonData.frames[frameName].scale;
    }

    scalePool[frameName] = scale;
    return scale;
  };

  var multiply = function multiply(rect, sc) {
    rect.x *= sc;
    rect.y *= sc;
    rect.width *= sc;
    rect.height *= sc;
  };

  Phaser.Sprite.prototype._renderCanvas = function (renderSession, matrix) {
    if (!this.visible || this.alpha === 0 || !this.renderable || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;

    var texture = this.texture;

    var wt = this.worldTransform;
    var json = embedded[texture.baseTexture.source.name];
    var sc = getScale(json, this.frameName);
    var crop = (rectPool.pop() || new Phaser.Rectangle()).copyFrom(texture.crop);
    var trim = (rectPool.pop() || new Phaser.Rectangle()).copyFrom(texture.trim || texture.frame);
    var m = (matrixPool.pop() || new Phaser.Matrix()).setTo(wt.a / sc, wt.b / sc, wt.c / sc, wt.d / sc, wt.tx, wt.ty);

    multiply(texture.crop, sc);
    multiply(texture.trim || texture.frame, sc);

    renderCanvas.call(this, renderSession, matrix || m);

    crop.copyTo(texture.crop);
    trim.copyTo(texture.trim || texture.frame);

    rectPool.push(crop, trim);
    matrixPool.push(m);
  };

  Phaser.TileSprite.prototype.generateTilingTexture = function (forcePowerOfTwo) {
    if (!this.texture.baseTexture.hasLoaded) return;

    var texture = this.texture;

    var json = embedded[texture.baseTexture.source.name];
    var sc = getScale(json, this.frameName);
    var crop = (rectPool.pop() || new Phaser.Rectangle()).copyFrom(texture.crop);

    multiply(texture.crop, sc);
    generateTilingTexture.call(this, forcePowerOfTwo);
    crop.copyTo(texture.crop);
    rectPool.push(crop);
  };

  var imageRenderCanvas = Phaser.Button.prototype._renderCanvas;
  var imageMatrixPool = [];
  var imageRectPool = [];

  Phaser.Button.prototype._renderCanvas = function (renderSession, matrix) {
    if (!this.visible || this.alpha === 0 || !this.renderable || this.texture.crop.width <= 0 || this.texture.crop.height <= 0) return;

    var texture = this.texture;

    var wt = this.worldTransform;
    var json = embedded[texture.baseTexture.source.name];
    var sc = getScale(json, this.frameName);
    var crop = (imageRectPool.pop() || new Phaser.Rectangle()).copyFrom(texture.crop);
    var trim = (imageRectPool.pop() || new Phaser.Rectangle()).copyFrom(texture.trim || texture.frame);
    var m = (imageMatrixPool.pop() || new Phaser.Matrix()).setTo(wt.a / sc, wt.b / sc, wt.c / sc, wt.d / sc, wt.tx, wt.ty);

    multiply(texture.crop, sc);
    multiply(texture.trim || texture.frame, sc);
    imageRenderCanvas.call(this, renderSession, matrix || m);

    crop.copyTo(texture.crop);
    trim.copyTo(texture.trim || texture.frame);

    imageRectPool.push(crop, trim);
    imageMatrixPool.push(m);
  };

  // Override Spine.createSprite method for supporting independent asset scaling
  var overrideSpineLibrary = function overrideSpineLibrary() {
    var spineLibraryAdded = false;
    try {
      spineLibraryAdded = spine || null;
    } catch (e) {}

    if (spineLibraryAdded) {
      PhaserSpine.Spine.prototype.createSprite = function (slot, attachment) {
        var descriptor = attachment.rendererObject;
        var baseTexture = descriptor.page.rendererObject;
        var spriteRect = new PIXI.Rectangle(descriptor.x, descriptor.y, descriptor.rotate ? descriptor.height : descriptor.width, descriptor.rotate ? descriptor.width : descriptor.height);

        // Get asset scale and adjust it to the sprite rect
        var sc = getScale(null, descriptor.name + ".png") || 1;
        multiply(spriteRect, sc);

        var spriteTexture = new PIXI.Texture(baseTexture, spriteRect);

        var sprite = new Phaser.Sprite(this.game, 0, 0, spriteTexture);
        var baseRotation = descriptor.rotate ? Math.PI * 0.5 : 0.0;

        // Divide on asset scale to get the original sprite size
        sprite.scale.x = attachment.scaleX / this.imageScale / sc;
        sprite.scale.y = attachment.scaleY / this.imageScale / sc;
        sprite.rotation = baseRotation;
        sprite.anchor.x = (0.5 * descriptor.originalWidth - descriptor.offsetX) / descriptor.width;
        sprite.anchor.y = (0.5 * descriptor.originalHeight - descriptor.offsetY) / descriptor.height;
        sprite.alpha = attachment.a;
        if (descriptor.rotate) {
          var x1 = sprite.scale.x;
          sprite.scale.x = sprite.scale.y;
          sprite.scale.y = x1;
        }
        slot.sprites = slot.sprites || {};
        slot.sprites[descriptor.name] = sprite;
        return sprite;
      };
    }
  };

  scaleAllJsons();
  overrideSpineLibrary();
})();

},{}],137:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

/* global ad_webroot, ad_name, utils, embedded */

/**
 * Stores game variables and static constants.
 *
 * @copyright CrossInstall 2016
 * @author 62316e@gmail.com
 * @module Global
 */
var Globals = function Globals() {
  _classCallCheck(this, Globals);

  throw new Error('AbstractClassError');
};

/**
 * Globals verbose is a required variable, default true
 * @type {boolean}
 * @name verbose
 */


exports.default = Globals;
Globals.VERBOSE = true;
Globals.WEB_ROOT = ad_webroot + '/' + ad_name;
Globals.LAST_INTERACTION_TIME = 0;
Globals.PARAMS = utils.getAdParameters(embedded.params);
Globals.RETRIES_NUMBER = Globals.PARAMS.retries;

Globals.VICTORY = 1;
Globals.DEFEAT = 0;

},{}],138:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** *****************************************************************************
 _____ _     _       ____                  
|_   _| |__ (_)___  |  _ \ __ _  __ _  ___ 
  | | | '_ \| / __| | |_) / _` |/ _` |/ _ \
  | | | | | | \__ \ |  __/ (_| | (_| |  __/
  |_| |_| |_|_|___/ |_|   \__,_|\__, |\___|
                                |___/      
 ___       _             _   _                   _ _         _          __ _   
|_ _|_ __ | |_ ___ _ __ | |_(_) ___  _ __   __ _| | |_   _  | |    ___ / _| |_ 
 | || '_ \| __/ _ \ '_ \| __| |/ _ \| '_ \ / _` | | | | | | | |   / _ \ |_| __|
 | || | | | ||  __/ | | | |_| | (_) | | | | (_| | | | |_| | | |__|  __/  _| |_ 
|___|_| |_|\__\___|_| |_|\__|_|\___/|_| |_|\__,_|_|_|\__, | |_____\___|_|  \__|
                                                     |___/                     
 _   _       _     ____  _             _    
| \ | | ___ | |_  | __ )| | __ _ _ __ | | __
|  \| |/ _ \| __| |  _ \| |/ _` | '_ \| |/ /
| |\  | (_) | |_  | |_) | | (_| | | | |   < 
|_| \_|\___/ \__| |____/|_|\__,_|_| |_|_|\_\
                                            
DO NOT MODIFY THIS CROSSINSTALL FRAMEWORK FILE

This file is required for the framework to work as expected. 
If the file is modified, the final build may not work.

If your solution requires modifying this file, you should:
  * find a different solution that doesn't modify this file, or
  * submit a PR with the changes you would like to make to this file

Questions? Ask our Creative Engineering Team!

                                       © 2020 CrossInstall All Rights Reserved
**************************************************************************** */

/* jshint -W083 */
/* eslint no-prototype-builtins: "error" */

/* global Phaser, imageLoader, ad_webroot, ad_name, xp, spine, embedded, ad_assets_path */

/**
 * Multi-Atlas support library
 *
 * This library allows to use multiple atlases in Phaser 2.x without carrying about
 * collecting all animations, Spriter, Spine assets in one atlas
 *
 * This library is universal. For using just import this file in the preloader state
 */

/**
 * Override Phaser Phaser.AnimationManager.add and Phaser.Animation.updateCurrentFrame methods
 * Looking through the all added atlases for finding needed frame by name
 * If the current sprite FrameData used another atlas LoadTexture method calls
 * It the only one method to replace the base texture entirely
 */
var overridePhaserAnimation = function overridePhaserAnimation() {
  Phaser.AnimationManager.prototype.add = function (name, frames, frameRate, loop) {
    frames = frames || [];
    frameRate = frameRate || 60;

    if (loop === undefined) {
      loop = false;
    }

    // Gather animation frames data from all cached atlases for all animation frameNames
    var framesInfo = [];
    var framesCount = frames.length;

    // Creating new FrameData with only used frames in the current animation
    var animationFrameData = null;

    while (framesCount--) {
      var frameName = frames[framesCount];
      var cacheKeys = this.game.cache.getKeys(Phaser.Cache.IMAGE);
      var keyCount = cacheKeys.length;

      while (keyCount--) {
        var cacheKey = cacheKeys[keyCount];
        var frameData = this.game.cache.getFrameData(cacheKey);
        var frame = frameData.getFrameByName(frameName);

        if (frameData && frame && frames.indexOf(frameName) !== -1) {
          if (!animationFrameData) {
            animationFrameData = new Phaser.FrameData();
            for (var i = 0; i < frames.length; i++) {
              animationFrameData.addFrame(frames[i]);
            }
          }

          framesInfo.push({
            frameName: frameName,
            atlasName: cacheKey,
            frameData: animationFrameData,
            frame: frame
          });
        }
      }
    }

    framesInfo.reverse();
    if (framesInfo.length === 0) {
      console.warn("Animation wasn't created. Please, make sure that you add at least one existing sprite name");
      return;
    }
    // Set Frame Data form the firs exist frame
    this._frameData = framesInfo[0].frameData;
    this._anims[name] = new Phaser.Animation(this.game, this.sprite, name, this._frameData, framesInfo, frameRate, loop);

    if (this.sprite.tilingTexture) {
      this.sprite.refreshTexture = true;
    }

    return this._anims[name];
  };

  Phaser.Animation.prototype.updateCurrentFrame = function (signalUpdate, fromPlay) {
    if (fromPlay === undefined) {
      fromPlay = false;
    }

    if (!this._frameData) {
      // The animation is already destroyed, probably from a callback
      return false;
    }

    //  Previous index
    // return false if there's no current Frame
    var idx = this.currentFrame ? this.currentFrame.index : false;

    // Update frameData
    var frameInfo = this._frames[this._frameIndex];
    this._frameData = frameInfo.frameData;
    this.currentFrame = frameInfo.frame;

    if (this.currentFrame && (fromPlay || !fromPlay && !(idx === this.currentFrame.index && this._parent.key === frameInfo.atlasName))) {
      // Here call loadTexture if current FrameData used another base Texture Atlas
      if (this._parent.key !== frameInfo.atlasName) {
        this._parent.loadTexture(frameInfo.atlasName, frameInfo.frameName, false);
      } else {
        this._parent.setFrame(this.currentFrame);
      }
    }

    if (this.onUpdate && signalUpdate) {
      this.onUpdate.dispatch(this, this.currentFrame);

      // False if the animation was destroyed from within a callback
      return !!this._frameData;
    }
    return true;
  };

  /**
   * Override Phaser.Animation.update currentFrame set values
   * for taking needed texture on the first loop frame
   */
  var animationUpdate = Phaser.Animation.prototype.update;

  Phaser.Animation.prototype.update = function () {
    var currentFrameTmp = this.currentFrame;

    var result = animationUpdate.call(this);

    if (!this.currentFrame || currentFrameTmp && currentFrameTmp.name !== this.currentFrame.name) {
      this.currentFrame = this._frames[this._frameIndex].frame;

      if (this.currentFrame) {
        this._parent.setFrame(this.currentFrame);
      }

      if (this.onUpdate) {
        this.onUpdate.dispatch(this, this.currentFrame);

        // False if the animation was destroyed from within a callback
        result = !!this._frameData;
      } else {
        result = true;
      }
    }

    return result;
  };
};

/**
 * Next three methods allows calling Phaser.TileSprite, Phaser.Sprite and Emitter.MakeParticles without atlas key parameter or use any string as atlas name.
 * As multiple-atlas support cares about taking texture frame data from the right atlas name, these properties aren't useful now.
 */
var fakeTileSpriteAtlasName = 'tileSpriteFakeAtlas';
var fakeSpriteAtlasName = 'spriteFakeAtlas';
var fakeEmitterAtlasName = 'emitterFakeAtlas';

var overridePhaserTileSprite = function overridePhaserTileSprite() {
  var tileSprite = Phaser.TileSprite;
  Phaser.TileSprite = function (game, x, y, width, height, key, frame) {
    if (key && !frame) frame = key;

    tileSprite.call(this, game, x, y, width, height, fakeTileSpriteAtlasName, frame);
  };

  Phaser.TileSprite = Object.assign(Phaser.TileSprite, tileSprite);
  Phaser.TileSprite.prototype = tileSprite.prototype;
};

var overridePhaserSprite = function overridePhaserSprite() {
  Phaser.Component.Core.init = function (game, x, y, key, frame) {
    if (!Phaser.Component.Core.skipTypeChecks) {
      if (!(game instanceof Phaser.Game)) {
        throw new Error('The value passed as the `game` argument (' + game + ') is not an instance of Phaser.Game.');
      }

      if (typeof x !== 'number') {
        console.warn('The `x` argument value (%s) should be a number.', x);
        x = 0; // This would be done implicitly in position.set().
      }

      if (typeof y !== 'number') {
        console.warn('The `y` argument value (%s) should be a number.', y);
        y = 0; // This would be done implicitly in position.set().
      }
    }

    this.game = game;
    this.key = key;
    this.data = {};

    this.position.set(x, y);
    this.world = new Phaser.Point(x, y);
    this.previousPosition = new Phaser.Point(x, y);

    this.events = new Phaser.Events(this);

    this._bounds = new Phaser.Rectangle();

    if (this.components.PhysicsBody) {
      // Enable-body checks for hasOwnProperty; makes sure to lift property from prototype.
      this.body = this.body;
    }

    if (this.components.Animation) {
      this.animations = new Phaser.AnimationManager(this);
    }

    if (this.components.LoadTexture && key !== null) {
      if (!frame && typeof key === 'string') {
        frame = key;
        key = fakeSpriteAtlasName;
      }
      this.loadTexture(key, frame);
    }

    if (this.components.FixedToCamera) {
      this.cameraOffset = new Phaser.Point(x, y);
    }
  };
};

var overridePhaserMakeParticle = function overridePhaserMakeParticle() {
  if (!Phaser.Particles.Arcade) return;

  var mp = Phaser.Particles.Arcade.Emitter.prototype.makeParticles;

  Phaser.Particles.Arcade.Emitter.prototype.makeParticles = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'string' && (typeof args[1] === 'string' || Array.isArray(args[1]))) {
      args.splice(0, 1);
      return mp.call.apply(mp, [this, fakeEmitterAtlasName].concat(args));
    }
    return mp.call.apply(mp, [this, fakeEmitterAtlasName].concat(args));
  };
};

/**
 * Override spine.Atlas function
 * Adding all available atlases so, Spine can looking thorough the all resources for needed attachment assets
 */
var overrideSpineLibrary = function overrideSpineLibrary() {
  // check if Spine using in the current project
  var spineLibraryAdded = false;
  try {
    spineLibraryAdded = spine || null;
  } catch (e) {}

  if (spineLibraryAdded) {
    // Override spine.Atlas
    var spineAtlas = spine.Atlas;

    spine.Atlas = function (json_data, textureLoader) {
      // call spineAtlas for all added atlases and collect all results
      var pages = [];
      var regions = [];

      // Check for exist atlases from embedded atlas jsons data
      var embeddedKeys = Object.keys(embedded);
      var keyCount = embeddedKeys.length;
      while (keyCount--) {
        var embeddedKey = embeddedKeys[keyCount];
        json_data = embedded[embeddedKey];

        if (!json_data.meta && !json_data.frames) continue;

        spineAtlas.call(this, json_data, textureLoader);

        pages = pages.concat(this.pages);
        regions = regions.concat(this.regions);
      }

      this.pages = pages;
      this.regions = regions;
    };

    spine.Atlas = Object.assign(spine.Atlas, spineAtlas);
    spine.Atlas.prototype = spineAtlas.prototype;
  }
};

/**
 * Replace frame name key from xp-assets.json data
 * Used only for preview build
 * @param key
 * @returns {*|string}
 */
var replaceKey = function replaceKey(key) {
  if (xp._assetData.production) return key;
  var assetsData = xp._assetData.images;
  for (var category in assetsData) {
    var imageData = assetsData[category];
    if (key === imageData.default.replace(/.*(assets\/)/, '')) {
      if (!imageData.active || imageData.active === '') return key;
      var libPrefix = imageData.active.replace(/\/(.*)/, '');
      key = libPrefix + '/' + category + '/' + imageData.active.replace(/.*([\\/])/, '');
    }
  }
  return key;
};

/**
 * Override Phaser.AnimationManager.frameName property
 * This allows to call LoadTexture method to change base sprite texture Atlas, if current atlas doesn't contain needed frameData.
 */
var overridePhaserFrameName = function overridePhaserFrameName() {
  var animationManager = Object.create(Phaser.AnimationManager.prototype);

  Object.defineProperty(animationManager, 'frameName', {
    get: function get() {
      if (this.currentFrame) {
        return this.currentFrame.name;
      }
      return null;
    },
    set: function set(value) {
      var gotFrame = void 0;

      // replace frame name form xp-assets.json Needed only for preview mode
      value = replaceKey(value);

      if (typeof value === 'string' && this._frameData && (gotFrame = this._frameData.getFrameByName(value))) {
        this.currentFrame = gotFrame;
        this._frameIndex = this.currentFrame.index;
        this.sprite.setFrame(this.currentFrame);
      } else {
        // Search for the frameName in all atlases and call LoadTexture instead of change frameName if such is present
        var cacheKeys = this.game.cache.getKeys(Phaser.Cache.IMAGE);
        var keyCount = cacheKeys.length;
        while (keyCount--) {
          var cacheKey = cacheKeys[keyCount];
          var frameData = this.game.cache.getFrameData(cacheKey);
          var frame = frameData.getFrameByName(value);
          if (frameData && frame) {
            this.sprite.loadTexture(cacheKey, value);
            return;
          }
        }

        this.sprite.loadTexture(value);
        // console.warn('Cannot set frameName: ' + value);
      }
    }
  });

  Phaser.AnimationManager.prototype = animationManager;

  var ignoreAtlasWarningNames = [fakeSpriteAtlasName, fakeTileSpriteAtlasName, fakeEmitterAtlasName]; // Skip warnings for fake atlas names

  // Override Phaser.Cache.prototype.getItem to replace frame name form xp-assets.json Needed only for preview mode
  var getItem = Phaser.Cache.prototype.getItem;


  Phaser.Cache.prototype.getItem = function (key, cache, method, property) {
    key = replaceKey(key);

    if (ignoreAtlasWarningNames.indexOf(key) !== -1) {
      return null;
    }

    return getItem.call(this, key, cache, method, property);
  };
};

/**
 * Extend imageLoader with helper methods
 * imageLoader.loadAllAtlases - loading all atlases
 * imageLoader.loadSpineMultipleAtlas - load all spine animations
 */
var extendImageLoader = function extendImageLoader() {
  var webRoot = ad_webroot + '/' + ad_name + '/';

  /**
   * Check for ad_assets_path parameter
   * For some of the partners we save texture_atlases to the different folders due to the reason that assets have different scale
   */
  if (typeof ad_assets_path !== 'undefined') {
    webRoot += ad_assets_path;
  }

  /**
   * Load all atlases that added to the embedded
   */
  imageLoader.loadAllAtlases = function () {
    var embeddedKeys = Object.keys(embedded);
    var keyCount = embeddedKeys.length;
    while (keyCount--) {
      var embeddedKey = embeddedKeys[keyCount];
      var json_data = embedded[embeddedKey];
      if (json_data.meta && json_data.frames) {
        imageLoader.loadAtlas(embeddedKey.toString(), webRoot + 'texture_sheets/' + json_data.meta.image);
      }
    }
  };

  /**
   * Load Spine animations by animation name
   * @param {...(string||{name: string}|{name: string, scale: number, basePath: string})} args Animation name or Object that contains name and scale
   * name - animation name, scale - custom Spine animation scale (optional), basePath - custom assets folder name (optional)
   */
  imageLoader.loadSpineMultipleAtlas = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // check if Spine using in the current project
    var spineLibraryAdded = false;
    try {
      spineLibraryAdded = spine || null;
    } catch (e) {
      console.warn('Spine library is not defined. Please add it first before trying to load the Spine animation.');
    }

    if (spineLibraryAdded) {
      var argCount = args.length;
      var basePathNames = {}; // Optional animation assets base paths that adds before animation asset path name.

      // By overriding 'Spine object' creating we add another override for AtlasAttachmentLoader.newRegionAttachment method where change asset name by adding baseName before asset path.
      // Each time when new Spine object created it overrides AtlasAttachmentLoader.newRegionAttachment method and changes the target asset name.
      // Overrides for AtlasAttachmentLoader.newMeshAttachment and AtlasAttachmentLoader.newWeightedMeshAttachment are skipped for now, because canvas rendering don't support meshes.
      PhaserSpine.SpinePlugin.prototype.addSpineFactory = function () {
        Phaser.GameObjectFactory.prototype.spine = function (x, y, key, scalingVariant, group) {
          if (group === undefined) {
            group = this.world;
          }
          var spineObject = new PhaserSpine.Spine(this.game, key, scalingVariant);
          spineObject.setToSetupPose();
          spineObject.position.x = x;
          spineObject.position.y = y;
          return group.add(spineObject);
        };
        Phaser.GameObjectCreator.prototype.spine = function (x, y, key, scalingVariant, group) {
          spine.AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
            var targetPath = path;
            var basePath = basePathNames[key];

            if (basePath) targetPath = basePath + path;

            var region = this.atlas.findRegion(targetPath);
            if (!region) throw 'Region not found in atlas: ' + targetPath + ' (region attachment: ' + name + ')';
            var attachment = new spine.RegionAttachment(name);
            attachment.rendererObject = region;
            attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
            attachment.regionOffsetX = region.offsetX;
            attachment.regionOffsetY = region.offsetY;
            attachment.regionWidth = region.width;
            attachment.regionHeight = region.height;
            attachment.regionOriginalWidth = region.originalWidth;
            attachment.regionOriginalHeight = region.originalHeight;
            return attachment;
          };

          return new PhaserSpine.Spine(this.game, key, scalingVariant);
        };
      };

      // Check for the atlases exist
      var firstExistAtlasName = null;
      var embeddedKeys = Object.keys(embedded);
      var keyCount = embeddedKeys.length;
      while (keyCount--) {
        var embeddedKey = embeddedKeys[keyCount];
        var json_data = embedded[embeddedKey];

        if (json_data.meta && json_data.frames) {
          firstExistAtlasName = embeddedKey;
          keyCount = 0;
        }
      }

      if (!firstExistAtlasName) {
        return console.warn('Please add at least one atlas');
      }

      while (argCount--) {
        var arg = args[argCount];
        switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
          case 'string':
            imageLoader.loadSpine(arg, firstExistAtlasName, webRoot + '/texture_sheets/' + firstExistAtlasName + '.png');
            break;
          case 'object':
            if (arg.basePath) basePathNames[arg.name] = arg.basePath;

            imageLoader.loadSpine(arg.name, firstExistAtlasName, webRoot + '/texture_sheets/' + firstExistAtlasName + '.png', arg.scale ? '@' + arg.scale + 'x' : null);
            break;
        }
      }
    }
  };
};

/**
 * Override Phaser and Spine methods for support multi-atlases, extend imageLoader with loader helpers
 */
(function () {
  overridePhaserAnimation();
  overrideSpineLibrary();
  overridePhaserFrameName();
  overridePhaserTileSprite();
  overridePhaserMakeParticle();
  overridePhaserSprite();
  extendImageLoader();
})();

},{}],139:[function(require,module,exports){
'use strict';

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Pete Baron <pete@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 * @version      1.0.0 - October 7th 2015
 */

/**
 * @namespace Phaser
 */

/**
 * An instance of a Particle Storm Plugin.
 *
 * This class is responsible for updating and managing all active emitters created by this plugin.
 *
 * Add it to your game via the Phaser Plugin Manager:
 *
 * `this.manager = this.game.plugins.add(Phaser.ParticleStorm);`
 *
 * You only need one instance of this plugin installed. It can create multiple emitters, each
 * capable of controlling their own sets of particles.
 *
 * The plugin is not a display object itself, you cannot add it to the display list or position it.
 *
 * @class Phaser.ParticleStorm
 * @constructor
 * @param {Phaser.Game} game - A reference to the current Phaser.Game instance.
 * @param {Phaser.PluginManager} parent - The Phaser Plugin Manager which looks after this plugin.
 */
Phaser.ParticleStorm = function (game, parent) {
  Phaser.Plugin.call(this, game, parent);

  /**
   * An array of Emitter objects.
   *
   * @property {array} emitters
   * @protected
   */
  this.emitters = [];

  /**
   * An object containing references or copies of all the Particle data that has been added via `addData` and `cloneData`.
   *
   * Clear this list by calling `clearData()`.
   *
   * @property {object} dataList
   * @protected
   */
  this.dataList = {};

  var useNew = PIXI.canUseNewCanvasBlendModes();

  /**
   * A local helper object which stores blend mode string to blend mode mappings.
   *
   * @property {object} blendModeMap
   * @protected
   */
  this.blendModeMap = {
    NORMAL: [0, 'source-over'],
    ADD: [1, 'lighter'],
    MULTIPLY: [2, useNew ? 'multiply' : 'source-over'],
    SCREEN: [3, useNew ? 'screen' : 'source-over'],
    OVERLAY: [4, useNew ? 'overlay' : 'source-over'],
    DARKEN: [5, useNew ? 'darken' : 'source-over'],
    LIGHTEN: [6, useNew ? 'lighten' : 'source-over'],
    COLOR_DODGE: [7, useNew ? 'color-dodge' : 'source-over'],
    COLOR_BURN: [8, useNew ? 'color-burn' : 'source-over'],
    HARD_LIGHT: [9, useNew ? 'hard-light' : 'source-over'],
    SOFT_LIGHT: [10, useNew ? 'soft-light' : 'source-over'],
    DIFFERENCE: [11, useNew ? 'difference' : 'source-over'],
    EXCLUSION: [12, useNew ? 'exclusion' : 'source-over'],
    HUE: [13, useNew ? 'hue' : 'source-over'],
    SATURATION: [14, useNew ? 'saturation' : 'source-over'],
    COLOR: [15, useNew ? 'color' : 'source-over'],
    LUMINOSITY: [16, useNew ? 'luminosity' : 'source-over']
  };

  /**
   * A local helper object which stores HSV color modes for emitter renderers to use.
   *
   * @property {array} hsv
   * @protected
   */
  this.hsv = Phaser.Color.HSVColorWheel();
};

Phaser.ParticleStorm.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.ParticleStorm.prototype.constructor = Phaser.ParticleStorm;

/**
 * A constant used for the Sprite Renderer.
 * @constant
 * @type {string}
 */
Phaser.ParticleStorm.SPRITE = 'sprite';

/**
 * A constant used for the BitmapData based Pixel Renderer.
 * @constant
 * @type {string}
 */
Phaser.ParticleStorm.PIXEL = 'pixel';

/**
 * A constant used for the Render Texture based Renderer.
 * @constant
 * @type {string}
 */
Phaser.ParticleStorm.RENDERTEXTURE = 'render texture';

/**
 * A constant used for the Sprite Batch based Renderer.
 * @constant
 * @type {string}
 */
Phaser.ParticleStorm.SPRITE_BATCH = 'sprite batch';

/**
 * A constant used for the Bitmap Data based Renderer.
 * @constant
 * @type {string}
 */
Phaser.ParticleStorm.BITMAP_DATA = 'bitmap data';

/**
 * A constant that contains the base object properties.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE = { value: 0, initial: 0, delta: 0, offset: 0, control: null, calc: 0 };

/**
 * A constant that contains the base 1 object properties.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE_1 = { value: 1, initial: 0, delta: 0, offset: 0, control: null, calc: 1 };

/**
 * A constant that contains the base 255 object properties.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE_255 = { value: 0, initial: 0, delta: 0, offset: 0, min: 0, max: 255, control: null, calc: 0 };

/**
 * A constant that contains the base 359 object properties.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE_359 = { value: 0, initial: 0, delta: 0, offset: 0, min: 0, max: 359, control: null, calc: 0 };

/**
 * A constant that contains the null base object properties.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE_NULL = { value: null, initial: 0, delta: 0, offset: 0, control: null, calc: 0 };

/**
 * A constant that contains the base object used by the emit property.
 * @constant
 * @type {object}
 */
Phaser.ParticleStorm.BASE_EMIT = {
  name: null,
  value: 0,
  initial: 0,
  control: null,
  at: null,
  inherit: true,
  offsetX: 0,
  offsetY: 0
};

Phaser.ParticleStorm.Controls = {};

Phaser.ParticleStorm.Zones = {};

/**
 * Creates a new Particle Emitter. You can specify the type of renderer the emitter will use. By default it uses
 * the Sprite emitter, meaning each particle it creates is its own sprite object.
 *
 * `this.manager = this.game.plugins.add(Phaser.ParticleStorm);`
 * `this.emitter = this.manager.createEmitter();`
 *
 * The emitter is added to the ParticleStorm.emitters array and is updated every frame.
 *
 * @method Phaser.ParticleStorm#createEmitter
 * @param {Phaser.ParticleStorm.SPRITE|Phaser.ParticleStorm.PIXEL|Phaser.ParticleStorm.RENDERTEXTURE|Phaser.ParticleStorm.SPRITE_BATCH} [renderType=Phaser.ParticleStorm.SPRITE] - The Particle Renderer type constant.
 * @param {Phaser.Point} [force] - Amount of force to be applied to all particles every update.
 * @param {Phaser.Point} [scrollSpeed] - All particles can be scrolled. This offsets their positions by the amount in this Point each update.
 *     This is different to force which is applied as a velocity on the particle, where-as scrollSpeed directly adjusts their final position.
 * @return {Phaser.ParticleStorm.Emitter} The Emitter object.
 */
Phaser.ParticleStorm.prototype.createEmitter = function (renderType, force, scrollSpeed) {
  var emitter = new Phaser.ParticleStorm.Emitter(this, renderType, force, scrollSpeed);

  this.emitters.push(emitter);

  return emitter;
};

/**
 * Removes the given Particle Emitter from the plugin. Stops it from being updated.
 *
 * Note that this does not destroy the emitter, or any objects it may in turn have created.
 *
 * @method Phaser.ParticleStorm#removeEmitter
 * @param {Phaser.ParticleStorm.Emitter} emitter - The Emitter object you wish to remove.
 */
Phaser.ParticleStorm.prototype.removeEmitter = function (emitter) {
  for (var i = 0; i < this.emitters.length; i++) {
    if (this.emitters[i] === emitter) {
      this.emitters.splice(i, 1);
      return;
    }
  }
};

/**
 * Particle Storm works by taking a specially formatted JavaScript object that contains all of the settings the
 * emitter needs to emit a particle. The settings objects each have a unique string-based key and are stored
 * within the plugin itself, making them available for any Emitter to access.
 *
 * You can either pass in a JavaScript object to this method, or a string. If you pass a string it will use that
 * to look in the Phaser.Cache for a matching JSON object and use that instead, allowing you to externally load
 * particle data rather than create it all at run-time. If you are loading JSON data from the cache then you can
 * also provide an array of strings, and it will load each of them in turn. Note that when doing this the `obj`
 * argument is ignored.
 *
 * @method Phaser.ParticleStorm#addData
 * @param {string|array} key - The unique key for this set of particle data. If no `obj` argument is provided it will use
 *     Phaser.Cache.getJSON to try and get a matching entry. Can be either a string or an Array of strings.
 *     When using an array of strings the `obj` argument is ignored.
 * @param {object} [obj] - The particle data. This is optional and if not provided the `key` argument will be used to look
 *     for the data in the Phaser.Cache. If provided it will be used instead of looking in the Cache.
 *     This should be a well formed object matching the ParticleStorm object structure.
 *     A reference to the object is stored internally, so if you manipulate the original object all freshly emitted particles
 *     will use the new values. To avoid this you can use `ParticleStorm.cloneData` instead.
 * @return {Phaser.ParticleStorm} This ParticleManager.
 */
Phaser.ParticleStorm.prototype.addData = function (key, obj) {
  if (key === undefined) {
    return this;
  }

  if (Array.isArray(key)) {
    for (var i = 0; i < key.length; i++) {
      this.dataList[key[i]] = this.game.cache.getJSON(key[i]);
    }
  } else if (obj !== undefined) {
    this.dataList[key] = obj;
  } else {
    this.dataList[key] = this.game.cache.getJSON(key);
  }

  return this;
};

/**
 * Gets the particle data based on the given key.
 *
 * @method Phaser.ParticleStorm#getData
 * @memberOf Phaser.ParticleStorm
 * @param {string} [key] - The unique key of the particle data that was added.
 * @return {object} The particle data.
 */
Phaser.ParticleStorm.prototype.getData = function (key) {
  return this.dataList[key];
};

/**
 * Clears particle data sets from memory.
 *
 * You can provide a specific key, or array of keys to remove.
 *
 * If no key is provided it will remove all data sets currently held.
 *
 * @method Phaser.ParticleStorm#clearData
 * @memberOf Phaser.ParticleStorm
 * @param {string|array} [key] - A string or array of strings that map to the data to be removed. If not provided all data sets are removed.
 * @return {Phaser.ParticleStorm} This ParticleManager.
 */
Phaser.ParticleStorm.prototype.clearData = function (key) {
  if (key === undefined) {
    //  Nuke them all
    this.dataList = {};
  } else if (Array.isArray(key)) {
    for (var i = 0; i < key.length; i++) {
      delete this.dataList[key[i]];
    }
  } else {
    delete this.dataList[key];
  }

  return this;
};

/**
 * This method works in exactly the same way as ParticleStorm.addData, with the exception that clones of
 * the particle data objects are stored internally, instead of references to the original objects.
 *
 * @method Phaser.ParticleStorm#cloneData
 * @memberOf Phaser.ParticleStorm
 * @param {string|array} key - The unique key for this set of particle data. If no `obj` argument is provided it will use
 *     Phaser.Cache.getJSON to try and get a matching entry. Can be either a string or an Array of strings.
 *     When using an array of strings the `obj` argument is ignored.
 * @param {object} [obj] - The particle data. This is optional and if not provided the `key` argument will be used to look
 *     for the data in the Phaser.Cache. If provided it will be used instead of looking in the Cache.
 *     This should be a well formed object matching the ParticleStorm object structure.
 *     The settings object, whether from the Cache or given as an argument, is cloned before being stored locally.
 *     If you wish to add a reference to an object instead of cloning it then see `addData`.
 * @return {Phaser.ParticleStorm} This ParticleManager.
 */
Phaser.ParticleStorm.prototype.cloneData = function (key, obj) {
  if (key === undefined) {
    return this;
  }

  if (Array.isArray(key)) {
    for (var i = 0; i < key.length; i++) {
      this.dataList[key[i]] = Phaser.Utils.extend(true, this.game.cache.getJSON(key[i]));
    }
  } else if (obj !== undefined) {
    this.dataList[key] = Phaser.Utils.extend(true, obj);
  } else {
    this.dataList[key] = Phaser.Utils.extend(true, this.game.cache.getJSON(key));
  }

  return this;
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Point Zone. This is a zone consisting of a single coordinate from which particles
 * are emitted.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createPointZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [x=0] - The x coordinate of the zone.
 * @param {number} [y=0] - The y coordinate of the zone.
 * @return {Phaser.ParticleStorm.Zones.Point} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createPointZone = function (x, y) {
  return new Phaser.ParticleStorm.Zones.Point(this.game, x, y);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Line Zone. This is a zone consisting of two sets of points, the start
 * and end of the line respectively. Particles can be emitted from anywhere on this line segment.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createLineZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [x1=0] - The x coordinate of the start of the line.
 * @param {number} [y1=0] - The y coordinate of the start of the line.
 * @param {number} [x2=0] - The x coordinate of the end of the line.
 * @param {number} [y2=0] - The y coordinate of the end of the line.
 * @return {Phaser.ParticleStorm.Zones.Line} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createLineZone = function (x1, y1, x2, y2) {
  return new Phaser.ParticleStorm.Zones.Line(this.game, x1, y1, x2, y2);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Rectangle Zone. This is a zone consisting of a rectangle shape.
 * Particles can be emitted from anywhere within this rectangle.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createRectangleZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [width=0] - The width of the Rectangle. Should always be a positive value.
 * @param {number} [height=0] - The height of the Rectangle. Should always be a positive value.
 * @return {Phaser.ParticleStorm.Zones.Rectangle} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createRectangleZone = function (width, height) {
  return new Phaser.ParticleStorm.Zones.Rectangle(this.game, width, height);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Circle Zone. This is a zone consisting of a circle shape.
 * Particles can be emitted from anywhere within this circle.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createCircleZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [radius=0] - The radius of the circle.
 * @return {Phaser.ParticleStorm.Zones.Circle} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createCircleZone = function (radius) {
  return new Phaser.ParticleStorm.Zones.Circle(this.game, radius);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Ellipse Zone. This is a zone consisting of an ellipse shape.
 * Particles can be emitted from anywhere within this ellipse.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createEllipseZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [width=0] - The overall width of this ellipse.
 * @param {number} [height=0] - The overall height of this ellipse.
 * @return {Phaser.ParticleStorm.Zones.Ellipse} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createEllipseZone = function (width, height) {
  return new Phaser.ParticleStorm.Zones.Ellipse(this.game, width, height);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Linear Spline Zone. A Linear Spline consists of a set of points through
 * which a linear path is constructed. Particles can be emitted anywhere along this path.
 *
 * The points can be set from a variety of formats:
 *
 * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
 * - An array of objects with public x/y properties: `[ { x: 0, y: 0 }, ...]`
 * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createLinearSplineZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [resolution=1000] - The resolution of the spline. Higher values generate more points during path interpolation.
 * @param {boolean} [closed=true] - A closed path loops from the final point back to the start again.
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 * @return {Phaser.ParticleStorm.Zones.Spline} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createLinearSplineZone = function (resolution, closed, points) {
  return new Phaser.ParticleStorm.Zones.Spline(this.game, 0, resolution, closed, points);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Bezier Spline Zone. A Bezier Spline consists of a set of points through
 * which a bezier curved path is constructed. Particles can be emitted anywhere along this path.
 *
 * The points can be set from a variety of formats:
 *
 * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
 * - An array of objects with public x/y properties: `[ { x: 0, y: 0 }, ...]`
 * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createBezierSplineZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [resolution=1000] - The resolution of the spline. Higher values generate more points during path interpolation.
 * @param {boolean} [closed=true] - A closed path loops from the final point back to the start again.
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 * @return {Phaser.ParticleStorm.Zones.Spline} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createBezierSplineZone = function (resolution, closed, points) {
  return new Phaser.ParticleStorm.Zones.Spline(this.game, 1, resolution, closed, points);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Catmull Rom Spline Zone. A Catmull Spline consists of a set of points through
 * which a catmull curved path is constructed. Particles can be emitted anywhere along this path.
 *
 * The points can be set from a variety of formats:
 *
 * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
 * - An array of objects with public x/y properties: `[ { x: 0, y: 0 }, ...]`
 * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createCatmullSplineZone
 * @memberOf Phaser.ParticleStorm
 * @param {number} [resolution=1000] - The resolution of the spline. Higher values generate more points during path interpolation.
 * @param {boolean} [closed=true] - A closed path loops from the final point back to the start again.
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 * @return {Phaser.ParticleStorm.Zones.Spline} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createCatmullSplineZone = function (resolution, closed, points) {
  return new Phaser.ParticleStorm.Zones.Spline(this.game, 2, resolution, closed, points);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Spline Zone. A spline consists of a set of points through
 * which a path is constructed. Particles can be emitted anywhere along this path.
 *
 * The points can be set from a variety of formats:
 *
 * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
 * - An array of objects with public x/y properties: `[ { x: 0, y: 0 }, ...]`
 * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createSplineZone
 * @memberOf Phaser.ParticleStorm
 * @param {integer} [mode=0] - The type of spline to create. 0 = linear, 1 = bezier and 2 = catmull.
 * @param {number} [resolution=1000] - The resolution of the spline. Higher values generate more points during path interpolation.
 * @param {boolean} [closed=true] - A closed path loops from the final point back to the start again.
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 * @return {Phaser.ParticleStorm.Zones.Spline} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createSplineZone = function (mode, resolution, closed, points) {
  return new Phaser.ParticleStorm.Zones.Spline(this.game, mode, resolution, closed, points);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates a Text Zone. This is a zone consisting of a Phaser.Text object.
 * Particles can be emitted from anywhere within the Text object.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createTextZone
 * @memberOf Phaser.ParticleStorm
 * @param {Phaser.Text} text - The Text object that is used to create this zone.
 * @return {Phaser.ParticleStorm.Zones.Text} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createTextZone = function (text) {
  return new Phaser.ParticleStorm.Zones.Text(this.game, text);
};

/**
 * Zones allow you to define an area within which particles can be emitted.
 *
 * This method creates an Image Zone. This is a zone consisting of an image which certain types of
 * Emitter renderer can read from in order to extract pixel data, which can then be used to tint
 * or otherwise modify the properties of the particles if emits.
 *
 * All zones extend Phaser.ParticleStorm.Zones.Base, which you can use to create your own custom
 * zones if required.
 *
 * @method Phaser.ParticleStorm#createImageZone
 * @memberOf Phaser.ParticleStorm
 * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} key - The object that
 *     will be used to create this Image zone. If you give a string it will try and find the Image in the Game.Cache first.
 * @return {Phaser.ParticleStorm.Zones.Image} The zone that was created.
 */
Phaser.ParticleStorm.prototype.createImageZone = function (key) {
  return new Phaser.ParticleStorm.Zones.Image(this.game, key);
};

/**
 * Update all emitters in this plugin. Only emitters that have `enabled` set will be updated.
 *
 * You can tell an emitter to never be updated by the plugin by setting its `manualUpdate` property
 * to `true`. This allows you to update it as you see fit, rather than have the plugin do it
 * automatically.
 *
 * Set ParticleStorm.active to `false` to stop the plugin from updating _all_ emitters.
 *
 * @method Phaser.ParticleStorm#update
 * @memberOf Phaser.ParticleStorm
 * @protected
 */
Phaser.ParticleStorm.prototype.update = function () {
  if (!this.active) {
    return;
  }

  for (var i = 0; i < this.emitters.length; i++) {
    if (this.emitters[i].enabled && !this.emitters[i].manualUpdate) {
      this.emitters[i].update();
    }
  }
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Pete Baron <pete@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * An instance of a Particle Storm Emitter.
 *
 * This class is responsible for updating and managing all active particles created by this emitter.
 *
 * Add it to your game via the plugin:
 *
 * `this.manager = this.game.plugins.add(Phaser.ParticleStorm);`
 * `this.emitter = this.manager.createEmitter();`
 *
 * You can have multiple emitters running, each controlling their own set of particles.
 *
 * Emitters are not display objects and you cannot add it to the display list or position it.
 * The renderer created by this emitter is the entity that lives on the display list.
 *
 * @class Phaser.ParticleStorm.Emitter
 * @constructor
 * @param {Phaser.ParticleStorm} parent - The ParticleStorm Plugin.
 * @param {Phaser.ParticleStorm.SPRITE|Phaser.ParticleStorm.PIXEL|Phaser.ParticleStorm.RENDERTEXTURE|Phaser.ParticleStorm.SPRITE_BATCH} [renderType=Phaser.ParticleStorm.SPRITE] - The Particle Renderer type constant.
 * @param {Phaser.Point} [force] - Amount of force to be applied to all particles every update.
 * @param {Phaser.Point} [scrollSpeed] - All particles can be scrolled. This offsets their positions by the amount in this Point each update.
 *     This is different to force which is applied as a velocity on the particle, where-as scrollSpeed directly adjusts their final position.
 */
Phaser.ParticleStorm.Emitter = function (parent, renderType, force, scrollSpeed) {
  /**
   * @property {Phaser.Game} game - A reference to the Phaser Game instance.
   */
  this.game = parent.game;

  /**
   * @property {Phaser.ParticleStorm} parent - The Particle Storm plugin.
   */
  this.parent = parent;

  /**
   * The Particle Renderer this emitter is using.
   * @property {Phaser.ParticleStorm.Renderer.Base} renderer
   * @default
   */
  this.renderer = null;

  /**
   * The type of renderer this emitter is using.
   * @property {string} renderType
   */
  this.renderType = null;

  /**
   * A set of useful common static functions.
   * @property {Phaser.ParticleStorm.Graph} graph
   */
  this.graph = Phaser.ParticleStorm.Graph;

  /**
   * The enabled state of this emitter. If set to `false` it won't emit any new particles or update
   * alive particles. You can toggle this directly or via Emitter.paused.
   * @property {boolean} enabled
   */
  this.enabled = false;

  /**
   * Is this emitter updated automatically by the Particle Storm plugin, or should it be
   * updated manually via the game code?
   *
   * If `false` (the default) the plugin will update this emitter automatically for you.
   * If `true` then you need to call the `update` method directly from your game code.
   *
   * @property {boolean} manualUpdate
   * @default
   */
  this.manualUpdate = false;

  /**
   * The scrolling speed of the particles in pixels per frame.
   * The amount specified in this Point object is added to the particles position each frame
   * after their internal velocities and calculations have taken place.
   *
   * @property {Phaser.Point} scrollSpeed
   */
  this.scrollSpeed = new Phaser.Point();

  /**
   * Amount of force to be applied to all particles every update.
   * This is in addition to any particle velocities or forces defined in the particle data.
   * This object can be manipulated in real-time to provide for effects such as varying wind
   * or gravity.
   *
   * @property {Phaser.Point} force
   */
  this.force = new Phaser.Point();

  /**
   * This signal is dispatched each time a particle is emitted by this emitter.
   *
   * By default this signal is set to `null`. This is because it can generate
   * extremely high numbers of callbacks in busy particle systems. To enable it
   * add: `emitter.onEmit = new Phaser.Signal()` to your code.
   *
   * It is sent two parameters: a reference to this emitter and a reference to the
   * particle that was emitted.
   *
   * This signal is dispatched BEFORE the first time the particle is rendered, so
   * you can adjust positions, colors, textures and other properties the callback.
   *
   * @property {Phaser.Signal} onEmit
   * @default
   */
  this.onEmit = null;

  /**
   * This signal is dispatched each time a particle enters a 'complete' state.
   * A particle can only do this if it has a fixed lifespan (i.e. a lifespan value
   * greater than 0) and has its `keepAlive` property set to `true`. This enables
   * you to emit particles with timespan based events that when they complete are
   * not immediately killed ready for re-use, but instead enter an 'idle' completed
   * state.
   *
   * By default this signal is set to `null`. This is because it can generate
   * extremely high numbers of callbacks in busy particle systems. To enable it
   * add: `emitter.onComplete = new Phaser.Signal()` to your code.
   *
   * It is sent two parameters: a reference to this emitter and a reference to the
   * particle that was killed.
   *
   * @property {Phaser.Signal} onComplete
   * @default
   */
  this.onComplete = null;

  /**
   * This signal is dispatched each time a particle is killed.
   *
   * By default this signal is set to `null`. This is because it can generate
   * extremely high numbers of callbacks in busy particle systems. To enable it
   * add: `emitter.onKill = new Phaser.Signal()` to your code.
   *
   * It is sent two parameters: a reference to this emitter and a reference to the
   * particle that was killed.
   *
   * @property {Phaser.Signal} onKill
   * @default
   */
  this.onKill = null;

  /**
   * The class type of the Particle that is emitted.
   *
   * You can change this to your own custom object, as long as it extends ParticleStorm.Particle.
   *
   * If you change it in an emitter that has already emitted some particles then you will create
   * a mixed data-type emitter. You are recommended to clear this emitter first before changing
   * the particleClass.
   *
   * @property {object} particleClass
   * @default Phaser.ParticleStorm.Particle
   */
  this.particleClass = Phaser.ParticleStorm.Particle;

  /**
   * The Timer used by this emitter for repeated and looped emissions.
   *
   * @property {Phaser.Timer} timer
   */
  this.timer = this.game.time.create(false);

  /**
   * The Phaser.TimerEvent object that was created by the last call to emit that had a repeat value set.
   * If you set-up multiple repeated emits then this property will be overwritten each time, so it's up
   * to you to store your own reference locally before creating another repeated emitter.
   *
   * @property {Phaser.TimerEvent} timerEvent
   * @default
   */
  this.timerEvent = null;

  /**
   * Contains all active particles being managed by this emitter.
   * When a particle is killed it is moved to the `pool` array.
   *
   * @property {array} list
   * @protected
   */
  this.list = [];

  /**
   * A pool of particle objects waiting to be used. When a particle is activated it moves from the
   * pool to the `list` array. It moves back to the pool when killed.
   *
   * @property {array} pool
   * @protected
   */
  this.pool = [];

  /**
   * Contains references to all particles that were emitted in the last call to Emitter.emit.
   * The contents of this array are reset every single time `Emitter.emit` is called, so if
   * you need to retain references to the particles that were just emitted you should make
   * a shallow copy of this array in your own game code.
   *
   * @property {array} batch
   * @protected
   */
  this.batch = [];

  /**
   * An array containing all active GravityWells belonging to this emitter.
   *
   * @property {array} wells
   * @protected
   */
  this.wells = [];

  /**
   * Internal Point object used by the emit methods.
   * @property {Phaser.Point} _rnd
   * @private
   */
  this._rnd = new Phaser.Point();

  /**
   * Internal Point object used by the emit methods for particle spacing.
   * @property {Phaser.Point} _step
   * @private
   */
  this._step = new Phaser.Point();

  /**
   * Internal counter for the number of parent particles emitted this batch.
   * @property {integer} _pCount
   * @private
   */
  this._pCount = 0;

  /**
   * Internal var holding the delay properties for this batch.
   * @property {object} _delay
   * @private
   */
  this._delay = { enabled: false, start: 0, inc: 0, visible: false };

  this.init(renderType, force, scrollSpeed);
};

Phaser.ParticleStorm.Emitter.prototype = {
  /**
   * Establishes the renderer and clears the particle list and pool ready for use.
   *
   * This is called automatically by the Phaser PluginManager.
   *
   * @method Phaser.ParticleStorm.Emitter#init
   * @protected
   * @param {Phaser.ParticleStorm.SPRITE|Phaser.ParticleStorm.PIXEL|Phaser.ParticleStorm.RENDERTEXTURE|Phaser.ParticleStorm.SPRITE_BATCH} [renderType=Phaser.ParticleStorm.SPRITE] - The Particle Renderer type constant.
   * @param {Phaser.Point} [force] - Amount of force to be applied to all particles every update.
   * @param {Phaser.Point} [scrollSpeed] - All particles can be scrolled. This offsets their positions by the amount in this Point each update.
   *     This is different to force which is applied as a velocity on the particle, where-as scrollSpeed directly adjusts their final position.
   */
  init: function init(renderType, force, scrollSpeed) {
    if (renderType === undefined) {
      renderType = Phaser.ParticleStorm.SPRITE;
    }

    var w = this.game.width;
    var h = this.game.height;

    switch (renderType) {
      case Phaser.ParticleStorm.SPRITE:
        this.renderer = new Phaser.ParticleStorm.Renderer.Sprite(this);
        break;

      case Phaser.ParticleStorm.PIXEL:
        this.renderer = new Phaser.ParticleStorm.Renderer.Pixel(this, w, h);
        break;

      case Phaser.ParticleStorm.RENDERTEXTURE:
        this.renderer = new Phaser.ParticleStorm.Renderer.RenderTexture(this, w, h);
        break;

      case Phaser.ParticleStorm.SPRITE_BATCH:
        this.renderer = new Phaser.ParticleStorm.Renderer.SpriteBatch(this);
        break;

      case Phaser.ParticleStorm.BITMAP_DATA:
        this.renderer = new Phaser.ParticleStorm.Renderer.BitmapData(this, w, h);
        break;

      default:
        console.warn('ParticleManager.init - Invalid renderType given');
        return false;
    }

    this.renderType = renderType;

    if (force) {
      this.force.set(force.x, force.y);
    }

    if (scrollSpeed) {
      this.scrollSpeed.set(scrollSpeed.x, scrollSpeed.y);
    }

    this.list = [];
    this.pool = [];
    this.wells = [];

    this.enabled = true;
  },


  /**
   * Adds the Particle Renderer to the game world.
   *
   * You can optionally specify a Phaser.Group for the renderer to be added to.
   * If not provided it will be added to the World group.
   *
   * @method Phaser.ParticleStorm.Emitter#addToWorld
   * @param {Phaser.Group} [group] - The group to add the renderer to. If not specified it will be added to the World.
   * @return {Phaser.Image|Phaser.Sprite|Phaser.Group} The display object that contains the particle renderer.
   */
  addToWorld: function addToWorld(group) {
    if (group === undefined) {
      group = this.game.world;
    }

    return this.renderer.addToWorld(group);
  },


  /**
   * Adds a Gravity Well to this Particle Manager. A Gravity Well creates a force on the
   * particles to draw them towards a single point.The force applied is inversely proportional
   * to the square of the distance from the particle to the point, in accordance with Newton's
   * law of gravity.
   *
   * A Gravity Well only effects particles owned by the emitter that created it.
   *
   * Gravity Wells don't have any display properties, i.e. they are not Sprites.
   *
   * @method Phaser.ParticleStorm.Emitter#createGravityWell
   * @param {number} [x=0] - The x coordinate of the Gravity Well, the point towards which particles are drawn.
   * @param {number} [y=0] - The y coordinate of the Gravity Well, the point towards which particles are drawn.
   * @param {number} [power=0] - The strength of the gravity well. Larger numbers create stronger forces. Start with low values like 1.
   * @param {number} [epsilon=100] - The minimum distance for which gravity is calculated.
   *                               Particles closer than this distance experience a gravity force as if
   *                               they were this distance away. This stops the gravity effect blowing
   *                               up as distances get small. For realistic gravity effects you will want
   *                               a small epsilon (~1), but for stable visual effects a larger
   *                               epsilon (~100) is often better.
   * @param {number} [gravity=50] - The gravity constant.
   * @return {Phaser.ParticleStorm.GravityWell} The GravityWell object.
   */
  createGravityWell: function createGravityWell(x, y, power, epsilon, gravity) {
    var well = new Phaser.ParticleStorm.GravityWell(this, x, y, power, epsilon, gravity);

    this.wells.push(well);

    return well;
  },


  /**
   * Seeds this emitter with `qty` number of Particle objects, and places them in the pool ready for use.
   * This allows you to pre-seed the pool and avoid object creation in hot parts of your game code.
   *
   * @method Phaser.ParticleStorm.Emitter#seed
   * @param {integer} qty - The amount of Particle objects to create in the pool.
   * @return {Phaser.ParticleStorm.Emitter} This Emitter.
   */
  seed: function seed(qty) {
    for (var i = 0; i < qty; i++) {
      var particle = new Phaser.ParticleStorm.Particle(this);

      this.pool.push(particle);
    }

    return this;
  },


  /**
   * Tells the Emitter to emit one or more particles, with a delay before it starts.
   *
   * The key refers to the ParticleData already set-up within Particle Storm via `ParticleStorm.addDdata`.
   *
   * You must have added or created the data referenced by key before you can call `emit`.
   *
   * The `config` argument is an object that contains additional emission settings.
   *
   * @method Phaser.ParticleStorm.Emitter#emitDelayed
   * @param {number} delay - The delay (in ms) before this emit will be run. It's added to an internal timed queue.
   * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
   * @param {number|array} [x=0] - The x location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {number|array} [y=0] - The y location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {object} [config] - An emitter configuration object. See `Emitter.emit` for the full object property docs.
   * @return {Phaser.TimerEvent} The TimerEvent object created for this delayed emit.
   */
  emitDelayed: function emitDelayed(delay, key, x, y, config) {
    if (!this.enabled || !this.parent.dataList[key] || delay <= 0) {
      return null;
    }

    this.timerEvent = this.timer.add(delay, this.emit, this, key, x, y, config);

    this.timer.start();

    return this.timerEvent;
  },


  /**
   * Tells the Emitter to emit one or more particles.
   *
   * The key refers to the ParticleData already set-up within Particle Storm via `ParticleStorm.addDdata`.
   *
   * You must have added or created the data referenced by key before you can call `emit`.
   *
   * The `config` argument is an object that contains additional emission settings.
   *
   * @method Phaser.ParticleStorm.Emitter#emit
   * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
   * @param {number|array} [x=0] - The x location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {number|array} [y=0] - The y location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {object} [config] - An emitter configuration object.
   * @param {number} [config.total] - The number of particles to emit (-1 means 'all' when the zone distribution is 'full')
   * @param {number} [config.repeat] - How many times this emit should repeat. A value of -1 means 'forever'.
   * @param {number} [config.frequency] - If `repeat` is -1 or > 0 this controls the ms that will elapse between each repeat.
   * @param {number} [config.xStep=0] - The amount of horizontal spacing in pixels to add between each particle emitted in this call. This is in addition to the `x` argument.
   * @param {number} [config.yStep=0] - The amount of vertical spacing in pixels to add between each particle emitted in this call. This is in addition to the `y` argument.
   * @param {number|object} [config.delay] - If a number it sets the delay of the first particle to `delay` ms. This is in addition to any delay set in the particle data.
   * @param {number} [config.delay.start=0] - A starting delay value in ms before any particle in this emit call is activated.
   * @param {number} [config.delay.step=0] - If this emit call will emit multiple particles the step controls how many ms to add between each ones delay.
   * @param {boolean} [config.delay.visible=false] - Should particles render and be visible, even when delayed?
   * @param {Phaser.ParticleStorm.Zones.Base} [config.zone] - The zone to emit the particles from.
   * @param {number} [config.percent] - If a spline based zone this value tells the emitter how far along the spline to emit the particles from. Between 0 and 100.
   * @param {boolean} [config.random] - If a zone is set this will emit the particles from random locations within the zone.
   * @param {boolean} [config.full] - If a zone is set this will emit the particles from all locations in the zone (only applies to specific types of zone like Images)
   * @param {boolean} [config.setAlpha] - If the zone supports it will the particle alpha be set?
   * @param {boolean} [config.setColor] - If the zone supports it will the particle color be set?
   * @param {integer} [config.step] - Controls the iteration through the pixel data. Only for 'full' zone emissions.
   * @param {integer|array} [config.spacing] - The pixel spacing between each emitted particle.
   * @param {object} [config.radiate] - Emits the particle in a radial arc.
   * @param {number} [config.radiate.velocity] - The speed to emit the particle when radiating.
   * @param {number} [config.radiate.from] - The starting angle to radiate from.
   * @param {number} [config.radiate.to] - The angle to radiate to.
   * @param {object} [config.radiateFrom] - Emits the particle radiating away from a given point.
   * @param {number} [config.radiateFrom.x] - The x coordinate of the point to radiate away from.
   * @param {number} [config.radiateFrom.y] - The y coordinate of the point to radiate away from.
   * @param {number} [config.radiateFrom.velocity] - The speed to emit the particle when radiating.
   * @return {Phaser.ParticleStorm.Particle|array} The particle or an array of particles that were emitted,
   *     or null if no particle could be created.
   */
  emit: function emit(key, x, y, config) {
    if (!this.enabled || !this.parent.dataList[key]) {
      return null;
    }

    this.batch = [];

    this._pCount = 0;

    this._step.x = 0;
    this._step.y = 0;

    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }

    //  ------------------------------------------------
    //  Fast-exit: No config object
    //  ------------------------------------------------

    if (!config) {
      return this.emitParticle(key, x, y, null);
    }

    //  ------------------------------------------------
    //  The number of particles to emit
    //  ------------------------------------------------

    var total = config.hasOwnProperty('total') ? config.total : 1;

    //  ------------------------------------------------
    //  Batch position spacing
    //  ------------------------------------------------

    if (config.xStep > 0) {
      this._step.x = config.xStep;
    } else {
      this._step.x = 0;
    }

    if (config.yStep > 0) {
      this._step.y = config.yStep;
    } else {
      this._step.y = 0;
    }

    //  ------------------------------------------------
    //  The particle delays per emit
    //  ------------------------------------------------

    this._delay.enabled = false;

    if (config.delay) {
      this._delay.enabled = true;

      if (typeof config.delay === 'number') {
        this._delay.start = config.delay;
        this._delay.step = 0;
        this._delay.visible = false;
      } else {
        this._delay.start = config.delay.start ? config.delay.start : 0;
        this._delay.step = config.delay.step ? config.delay.step : 0;
        this._delay.visible = !!config.delay.visible;
      }
    }

    //  ------------------------------------------------
    //  Zone
    //  ------------------------------------------------
    if (config.zone) {
      if (config.random === undefined && config.full === undefined && config.percent === undefined || config.random) {
        //  Neither 'random' or 'full' are set, so we default to 'random'
        config.zone.emit(this, key, x, y, total, config.setAlpha, config.setColor);
      } else if (config.percent === undefined && (config.full !== undefined || !config.random)) {
        //  'full' is set, or 'random' is specifically set to false
        config.zone.emitFull(this, key, x, y, config.step, config.spacing, config.setAlpha, config.setColor);
      } else if (config.percent !== undefined) {
        //  'percent' is set for a Spline zone
        var pnt = 0;

        if (typeof config.percent === 'number') {
          pnt = config.percent;
        } else {
          //  min/max?
          if (config.percent.hasOwnProperty('min')) {
            pnt = this.game.rnd.between(config.percent.min, config.percent.max);
          } else if (config.percent.callback) {
            pnt = config.percent.callback.call(config.percent.context, this);
          }
        }

        config.zone.emitPercent(this, key, x, y, total, pnt);
      }
    } else {
      //  ------------------------------------------------
      //  No zone
      //  ------------------------------------------------
      for (var i = 0; i < total; i++) {
        this.emitParticle(key, x, y, null);
      }
    }

    if (config.radiate) {
      //  ------------------------------------------------
      //  Radiate
      //  ------------------------------------------------
      for (var c = 0; c < this.batch.length; c++) {
        this.batch[c].radiate(config.radiate.velocity, config.radiate.from, config.radiate.to);
      }
    } else if (config.radiateFrom) {
      //  ------------------------------------------------
      //  RadiateFrom
      //  ------------------------------------------------
      for (var c = 0; c < this.batch.length; c++) {
        this.batch[c].radiateFrom(config.radiateFrom.x, config.radiateFrom.y, config.radiateFrom.velocity);
      }
    }

    //  ------------------------------------------------
    //  Repeat
    //  ------------------------------------------------
    var repeat = config.hasOwnProperty('repeat') ? config.repeat : 0;

    if (repeat !== 0) {
      var frequency = config.hasOwnProperty('frequency') ? config.frequency : 250;

      //  Or the repeats will stack-up
      delete config.repeat;

      if (repeat === -1) {
        this.timerEvent = this.timer.loop(frequency, this.emit, this, key, x, y, config);
      } else if (repeat > 0) {
        this.timerEvent = this.timer.repeat(frequency, repeat, this.emit, this, key, x, y, config);
      }

      this.timer.start();
    }

    //  Reset the pCounter
    this._pCount = 0;

    return this.batch;
  },


  /**
   * Tells the Emitter to emit one single particle.
   *
   * **This method shouldn't usually be called directly. See `Emitter.emit`.**
   *
   * The key refers to the ParticleData already set-up within Particle Storm via `ParticleStorm.addDdata`.
   *
   * You must have added or created the data referenced by key before you can call `emit`.
   *
   * @method Phaser.ParticleStorm.Emitter#emitParticle
   * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
   * @param {number|array} [x=0] - The x location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {number|array} [y=0] - The y location of the particle. Either a discrete value or an array consisting of 2 elements, the min and max, it will pick a point at random between them.
   * @param {Phaser.ParticleStorm.Particle} [parent=null] - The parent of this particle, if any.
   * @return {Phaser.ParticleStorm.Particle} The particle that was emitted.
   */
  emitParticle: function emitParticle(key, x, y, parent) {
    var particle = this.pool.pop();

    if (!particle) {
      particle = new this.particleClass(this);
    }

    particle.parent = parent;

    //  ------------------------------------------------
    //  If the coordinates are arrays it uses them as min/max pairs
    //  ------------------------------------------------
    if (Array.isArray(x)) {
      x = this.game.rnd.between(x[0], x[1]);
    }

    if (Array.isArray(y)) {
      y = this.game.rnd.between(y[0], y[1]);
    }

    //  ------------------------------------------------
    //  If the coordinates are sequential based on previous particle
    //  ------------------------------------------------

    x += this._step.x * this._pCount;
    y += this._step.y * this._pCount;

    particle.reset(this.renderer, x, y, this.parent.dataList[key]);

    if (particle.alive) {
      //  Apply delay (in addition to any set in the particle data)

      if (!parent && this._delay.enabled) {
        particle.delay += this._delay.start + this._pCount * this._delay.step;
        particle.delayVisible = this._delay.visible;
      }

      this.list.push(particle);

      this.batch.push(particle);

      if (!parent) {
        this._pCount++;
      }
    } else {
      particle.kill();

      if (this.onKill) {
        this.onKill.dispatch(this, particle);
      }

      this.pool.push(particle);
    }

    return particle;
  },


  /**
   * Update all particles in this emitter.
   *
   * This method is called by the Particle Storm plugin automatically unless
   * `manualUpdate` has been set to `true`.
   *
   * @method Phaser.ParticleStorm.Emitter#update
   * @return {number} The number of active particles in this manager.
   */
  update: function update() {
    var elapsed = this.game.time.elapsed;


    this.renderer.preUpdate();

    //  Update all the particles and destroy those that request it
    for (var i = this.list.length - 1; i >= 0; i--) {
      var p = this.list[i];

      if (!p.ignoreScrollSpeed) {
        p.transform.x += this.scrollSpeed.x;
        p.transform.y += this.scrollSpeed.y;
      }

      for (var w = 0; w < this.wells.length; w++) {
        if (this.wells[w].active) {
          this.wells[w].step(p);
        }
      }

      if (!p.step(elapsed, this.force)) {
        p.kill();
        this.pool.push(p);
        this.list.splice(i, 1);
      }
    }

    this.renderer.postUpdate();

    return this.list.length;
  },


  /**
   * This is an internal method that takes a emission data object, time value and
   * life percentage and calculates the new number of child particles that should be emitted.
   *
   * @method Phaser.ParticleStorm.Emitter#updateFrequency
   * @protected
   * @param {object} emit - The emission data object describing what and when to emit.
   * @param {number} elapsedTime - How long has it been since the last time this was updated (in milliseconds)
   * @param {number} lastPercent - The lifePercent last time this was updated.
   * @param {number} lifePercent - How far through its life is this particle (from 0 to 1)
   * @return {number} The number of children for this particle to emit.
   */
  updateFrequency: function updateFrequency(emit, elapsedTime, lastPercent, lifePercent) {
    //  If the emit frequency is specified as a list of time intervals
    //  and number of children then ...
    if (emit.at) {
      //  Total is the number to be created for all time intervals
      //  between lastPercent and lifePercent
      var total = 0;

      for (var i = 0; i < emit.at.length; i++) {
        var o = emit.at[i];

        //  Inclusive at the low end for time == 0 only, always inclusive at the high end
        if ((o.time > lastPercent || o.time === 0 && lastPercent === 0) && o.time <= lifePercent) {
          //  If emit.at.value is between 0 and 1 then it expresses a
          //  percentage random chance to create a child at this time
          if (o.value > 0 && o.value < 1.0) {
            if (Math.random() < o.value) {
              total += 1;
            }
          } else {
            //  All other values are taken literally
            total += o.value;
          }
        }
      }

      return total;
    }

    //  Alternatively, we have a fixed emission frequency or a control graph
    return this.graph.getParamArea(emit, lastPercent, lifePercent) * elapsedTime;
  },


  /**
   * Call a function on each _alive_ particle in this emitter.
   *
   * Additional arguments for the callback can be specified after the context parameter.
   * For example:
   *
   * `Emitter.forEach(headTowards, this, 100, 500)`
   *
   * .. would invoke the `headTowards` function with the arguments `(particle, 100, 500)`.
   *
   * @method Phaser.ParticleStorm.Emitter#forEach
   * @param {function} callback - The function that will be called for each alive particle. The particle will be passed as the first argument.
   * @param {object} callbackContext - The context in which the function should be called (usually 'this').
   * @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the particle.
   */
  forEach: function forEach(callback, callbackContext) {
    if (arguments.length <= 2) {
      for (var i = 0; i < this.list.length; i++) {
        callback.call(callbackContext, this.list[i]);
      }
    } else {
      var args = [null];

      for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.list.length; i++) {
        args[0] = this.list[i];
        callback.apply(callbackContext, args);
      }
    }
  },


  /**
   * Call a function on each _alive_ particle that was emitted in the last call.
   * When you call `emit` the particles that are emitted are temporarily added to the
   * Emitter.batch array. This method allows you to call a function on all particles
   * within that array.
   *
   * Additional arguments for the callback can be specified after the context parameter.
   * For example:
   *
   * `Emitter.forEach(headTowards, this, 100, 500)`
   *
   * .. would invoke the `headTowards` function with the arguments `(particle, 100, 500)`.
   *
   * @method Phaser.ParticleStorm.Emitter#forEachNew
   * @param {function} callback - The function that will be called for each alive particle. The particle will be passed as the first argument.
   * @param {object} callbackContext - The context in which the function should be called (usually 'this').
   * @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the particle.
   */
  forEachNew: function forEachNew(callback, callbackContext) {
    if (this.batch.length === 0) {
      return;
    }

    if (arguments.length <= 2) {
      for (var i = 0; i < this.batch.length; i++) {
        callback.call(callbackContext, this.batch[i]);
      }
    } else {
      var args = [null];

      for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      for (var i = 0; i < this.batch.length; i++) {
        args[0] = this.batch[i];
        callback.apply(callbackContext, args);
      }
    }
  },


  /**
   * Gets a Particle from this emitter based on the given index.
   *
   * Only 'live' particles are checked.
   *
   * @method Phaser.ParticleStorm.Emitter#getParticle
   * @param {integer} [index=0] - The index of the particle to get.
   * @return {Phaser.ParticleStorm.Particle} The particle that was emitted.
   */
  getParticle: function getParticle(index) {
    if (index === undefined) {
      index = 0;
    }

    if (this.list[index]) {
      return this.list[index];
    }
    return null;
  },


  /**
   * Renders a Debug panel for this Emitter using the Phaser.Debug class.
   *
   * It displays the force, scroll speed and numbers of alive and dead particles.
   *
   * The size of the rendered debug panel is 360x70.
   *
   * You should **never** use this in a production game, as it costs CPU/GPU time to display it.
   *
   * @method Phaser.ParticleStorm.Emitter#debug
   * @param {number} [x=0] - The x coordinate to render the Debug panel at.
   * @param {number} [y=0] - The y coordinate to render the Debug panel at.
   */
  debug: function debug(x, y) {
    var d = this.game.debug;

    if (d) {
      d.start(x + 4, y + 16, 'rgb(255, 255, 255)', 132);

      d.context.fillStyle = 'rgba(0, 74, 128, 0.5)';
      d.context.fillRect(x, y, 360, 70);

      var fx = '' + this.force.x;
      var fy = '' + this.force.y;

      d.line('Force:', fx.substr(0, 8), fy.substr(0, 8));
      d.line('Scroll Speed:', this.scrollSpeed.x, this.scrollSpeed.y);
      d.line('Alive:', 'Dead:', 'Total:');
      d.line(this.alive, this.dead, this.total);

      d.stop();
    }
  },


  /**
   * Destroys this emitter.
   *
   * Calls `clear` on the renderer and kills all particles in its lists.
   *
   * @method Phaser.ParticleStorm.Emitter#destroy
   */
  destroy: function destroy() {
    if (this.renderer.clear) {
      this.renderer.clear();
    }

    this.renderer.destroy();
    this.renderer = null;

    for (var i = this.list.length - 1; i >= 0; i--) {
      this.list[i].kill();
      this.list.splice(i, 1);
    }

    this.list = [];
    this.pool = [];
    this.batch = [];
    this.wells = [];
  }
};

/**
 * The paused state of the Emitter.
 *
 * If paused is set to `true` then no calls to `emit` or `update` will be processed.
 *
 * Set to `false` to resume updating of the particles.
 *
 * @name Phaser.ParticleStorm.Emitter#paused
 * @property {boolean} paused
 */
Object.defineProperty(Phaser.ParticleStorm.Emitter.prototype, 'paused', {
  get: function get() {
    return !this.enabled;
  },
  set: function set(value) {
    this.enabled = !value;
  }
});

/**
 * The total number of particles being managed by this emitter, including both
 * alive and dead particles.
 *
 * @name Phaser.ParticleStorm.Emitter#total
 * @property {integer} total
 * @readOnly
 */
Object.defineProperty(Phaser.ParticleStorm.Emitter.prototype, 'total', {
  get: function get() {
    return this.alive + this.dead;
  }
});

/**
 * The total number of active (alive) particles being managed by this emitter.
 *
 * @name Phaser.ParticleStorm.Emitter#alive
 * @property {integer} alive
 * @readOnly
 */
Object.defineProperty(Phaser.ParticleStorm.Emitter.prototype, 'alive', {
  get: function get() {
    return this.list.length;
  }
});

/**
 * The total number of dead particles in the pool, ready to be re-used by this emitter.
 *
 * @name Phaser.ParticleStorm.Emitter#dead
 * @property {integer} dead
 * @readOnly
 */
Object.defineProperty(Phaser.ParticleStorm.Emitter.prototype, 'dead', {
  get: function get() {
    return this.pool.length;
  }
});

Phaser.ParticleStorm.Emitter.prototype.constructor = Phaser.ParticleStorm.Emitter;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Pete Baron <pete@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A single particle created and updated by a Particle Emitter.
 *
 * It can belong to only one Emitter at any one time.
 *
 * Particles themselves don't have any display properties, i.e. they are not Sprites. If a Particle
 * is added to an Emitter Renderer that uses Sprites, then a new Sprite object will be created and
 * assigned to the Particles `sprite` property. Not all types of renderer do this, for example the
 * Pixel renderer doesn't use sprites at all.
 *
 * Particles are frequently pooled, so don't add any parameter initialization into the constructor should you extend it.
 * Instead place it inside the Particle.reset method.
 *
 * @class Phaser.ParticleStorm.Particle
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that owns this particle.
 */
Phaser.ParticleStorm.Particle = function (emitter) {
  /**
   * The emitter that owns this particle.
   * @property {Phaser.ParticleStorm.Emitter} emitter
   */
  this.emitter = emitter;

  /**
   * The renderer responsible for rendering this particle.
   * @property {Phaser.ParticleStorm.Renderer.Base} renderer
   */
  this.renderer = null;

  /**
   * A set of useful common static functions.
   * @property {Phaser.ParticleStorm.Graph} graph
   */
  this.graph = Phaser.ParticleStorm.Graph;

  /**
   * The transform control for this particle. Contains properties such as position, velocity and acceleration.
   * @property {Phaser.ParticleStorm.Controls.Transform} transform
   */
  this.transform = new Phaser.ParticleStorm.Controls.Transform(this);

  /**
   * The color control for this particle. Contains color related properties including red, green, blue, alpha, tint and blendMode.
   * @property {Phaser.ParticleStorm.Controls.Color} color
   */
  this.color = new Phaser.ParticleStorm.Controls.Color(this);

  /**
   * The texture control for this particle. Contains texture related properties including key, frame and animation handling.
   * @property {Phaser.ParticleStorm.Controls.Texture} texture
   */
  this.texture = new Phaser.ParticleStorm.Controls.Texture(this);

  /**
   * @property {Phaser.ParticleStorm.Particle} parent - The parent particle, if it has one.
   * @default
   */
  this.parent = null;

  /**
   * The lifespan of the particle is the length of time in milliseconds that it will live for once spawned.
   * Set the lifespan to zero to allow it to live forever. However particles cannot live forever if you use
   * any parameter controls at all, as they require an expiry date.
   * @property {number} lifespan
   * @default
   */
  this.lifespan = 2000;

  /**
   * Should the particle be kept alive and rendering once it has completed its lifespan?
   * This can only be set to true if lifespan is a value above zero.
   * When a particle is 'kept alive' it will never dispatch an onKill event.
   * @property {boolean} keepAlive
   * @default
   */
  this.keepAlive = false;

  /**
   * The delay in milliseconds that the particle will wait for until spawning.
   * @property {number} delay
   * @default
   */
  this.delay = 0;

  /**
   * Controls if the particle should still be rendered or not, even when delayed.
   * This allows you to display a particle in place before its lifecycle starts.
   * @property {boolean} delayVisible
   * @default
   */
  this.delayVisible = false;

  /**
   * The current age of this particle as a percentage of its total lifespan. A value between 0 and 1.
   * @property {number} life
   * @default
   */
  this.life = 0;

  /**
   * If this particle is part of a Sprite based renderer then the sprite associated with this particle is referenced
   * in this property. Otherwise this value is `null`.
   * @property {Phaser.Sprite} sprite
   * @default
   */
  this.sprite = null;

  /**
   * The visible state of this particle.
   * @property {boolean} visible
   */
  this.visible = false;

  /**
   * A particle is considered 'complete' when it reaches 100% of its lifespan.
   * If it has no lifespan it is never 'complete'.
   * @property {boolean} isComplete
   */
  this.isComplete = false;

  /**
   * Should this particle ignore any force applied by its emitter?
   * @property {boolean} ignoreForce
   * @default
   */
  this.ignoreForce = false;

  /**
   * Should this particle ignore any scrollSpeed applied by its emitter?
   * @property {boolean} ignoreScrollSpeed
   * @default
   */
  this.ignoreScrollSpeed = false;

  /**
   * @property {object} emit - The emit data of this particle.
   * @private
   */
  this.emit = {};

  /**
   * @property {number} _age - Internal helper for tracking the current age of this particle.
   * @private
   */
  this._age = 0;

  /**
   * @property {number} _lastPercent - Internal tracking var for previous lifePercent.
   * @private
   */
  this._lastPercent = 0;

  /**
   * @property {number} _numToEmit - Internal accumulator to track the fractions of a particle to be emitted across multiple frames.
   * @private
   */
  this._numToEmit = 0;
};

Phaser.ParticleStorm.Particle.prototype = {
  /**
   * Reset all of the particle properties back to their defaults, ready for spawning.
   *
   * If the optional `data` parameter is provided then Particle.create will be automatically called.
   *
   * @method Phaser.ParticleStorm.Particle#reset
   * @param {Phaser.ParticleStorm.Renderer.Base} renderer - The renderer responsible for rendering this particle.
   * @param {number} x - The x position of this Particle in world space.
   * @param {number} y - The y position of this Particle in world space.
   * @param {object} [data] - The data this particle will use when emitted.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  reset: function reset(renderer, x, y, data) {
    this.renderer = renderer;

    this.transform.reset();
    this.color.reset();
    this.texture.reset();

    this.emit = Object.create(Phaser.ParticleStorm.BASE_EMIT);

    this.isComplete = false;
    this.keepAlive = false;

    this.delay = 0;
    this.delayVisible = false;

    this.ignoreForce = false;
    this.ignoreScrollSpeed = false;

    this.alive = false;
    this.lifespan = 2000;
    this.life = 0;
    this.visible = false;

    this._age = 0;
    this._lastPercent = 0;
    this._numToEmit = 0;

    if (data !== undefined) {
      this.create(x, y, data);
    }

    return this;
  },


  /**
   * Activates this Particle. Should be called only after the particle has been reset.
   *
   * It works by populating all of the local settings with the values contained in the `data` object.
   * It's then added to the renderer and drawn once with its initial values.
   *
   * @method Phaser.ParticleStorm.Particle#create
   * @param {number} x - The x position of this Particle in world space.
   * @param {number} y - The y position of this Particle in world space.
   * @param {object} data - The data this particle will use to populate its settings.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  create: function create(x, y, data) {
    //  ------------------------------------------------
    //  Lifespan
    //  ------------------------------------------------

    if (data.hasOwnProperty('lifespan')) {
      this.lifespan = this.graph.getMinMax(data.lifespan);
    }

    this.keepAlive = data.keepAlive;

    //  ------------------------------------------------
    //  Delay
    //  ------------------------------------------------

    if (data.hasOwnProperty('delay')) {
      this.delay = this.graph.getMinMax(data.delay);
    }

    this.ignoreForce = data.ignoreForce;
    this.ignoreScrollSpeed = data.ignoreScrollSpeed;

    //  ------------------------------------------------
    //  Update controls
    //  ------------------------------------------------

    this.transform.init(x, y, data);
    this.color.init(data);
    this.texture.init(data);

    //  ------------------------------------------------
    //  Emit child
    //  ------------------------------------------------

    if (data.emit) {
      this.emit = Object.create(data.emit);
    }

    this.visible = data.visible !== false;

    this.alive = true;

    if (this.parent && this.parent.emit && this.parent.emit.inherit) {
      this.alive = this.onInherit(this.parent);
    }

    if (this.alive) {
      //  Make sure all parameters are set
      this.transform.step();
      this.color.step();

      //  Add a display system object for this particle
      var sprite = this.renderer.add(this);

      if (sprite) {
        //  Only the TextureControl has a post-add step (which defines the animation frames)
        this.texture.step(data, sprite);
      }

      this.onEmit();

      if (this.emitter.onEmit) {
        this.emitter.onEmit.dispatch(this.emitter, this);
      }

      //  Draw the particle in its initial state
      this.renderer.update(this);
    }

    return this;
  },


  /**
   * Update this particle for a single time step.
   *
   * Decides when to emit particles and when to die.
   *
   * @method Phaser.ParticleStorm.Particle#step
   * @param {number} elapsedTime - How long has it been since the last time this was updated (in milliseconds)
   * @param {Phaser.Point} [force] - A force which is applied to this particle as acceleration on every update call.
   * @return {boolean} True to continue living, false if this particle should die now.
   */
  step: function step(elapsedTime, force) {
    //  Keep track of the particles age
    this._age += elapsedTime;

    //  If there's a delay
    if (this.delay) {
      if (this._age < this.delay) {
        this.renderer.update(this);

        //  Exit (but don't kill the particle)
        return true;
      }
      //  The delay has expired. Clear the delay value and reset the particle _age to zero (newborn)
      this.delay = 0;
      this._age = 0;
    }

    this._lastPercent = this.life;

    //  Calculate lifespan of this particle, commencing when delay expired (if there was one)
    if (this.lifespan > 0) {
      this.life = Math.min(this._age / this.lifespan, 1.0);
    }

    if (force && !this.ignoreForce) {
      this.transform.velocity.x.value += force.x;
      this.transform.velocity.y.value += force.y;
    }

    this.transform.step();
    this.color.step();

    this.onUpdate();

    if (this.alive) {
      //  How many should we release in this time interval (summed with any fractions we didn't emit previously)
      this._numToEmit += this.emitter.updateFrequency(this.emit, elapsedTime, this._lastPercent, this.life);

      //  Create all the 'whole' emissions
      while (this._numToEmit >= 1.0) {
        this.emitChild();
      }

      this.renderer.update(this);
    }

    if (!this.isComplete && this.life === 1.0) {
      this.isComplete = true;

      if (this.emitter.onComplete) {
        this.emitter.onComplete.dispatch(this.emitter, this);
      }
    }

    //  Return false if this particle should die, otherwise true
    return this.life < 1.0 || this.keepAlive;
  },


  /**
   * Emit a child particle from this one.
   *
   * @method Phaser.ParticleStorm.Particle#emitChild
   * @private
   */
  emitChild: function emitChild() {
    var x = this.graph.getMinMax(this.emit.offsetX) | 0;
    var y = this.graph.getMinMax(this.emit.offsetY) | 0;

    //  Does this emitter specify a creation circle or rect?
    if (this.emit.rect) {
      // pick a random location inside the rectangle
      var rect = this.emit.rect;

      x = Math.random() * rect.width + rect.x;
      y = Math.random() * rect.height + rect.y;
    } else if (this.emit.circle) {
      var radius = this.emit.circle;
      // randomly pick a y coordinate inside the circle
      y = Math.random() * radius * 2 - radius;
      // calculate the horizontal span from the point (0, y) to the circumference (Pythagoras: x2 + y2 = r2)
      var span = Math.sqrt(radius * radius - y * y);
      // randomly pick an x coordinate in that span on either side of the x = 0 line
      x = Math.random() * span * 2 - span;
    }

    var key = this.emit.name;

    if (typeof key !== 'string') {
      key = this.getChildKey(this.emit.name);
    }

    if (key) {
      var p = this.emitter.emitParticle(key, this.transform.x + x, this.transform.y + y, this);

      //  Apply any overwrite parameters to the new child particle
      if (p && this.emit.overwrite) {
        this.applyOverwrite(this.emit.overwrite, p);
      }
    }

    this._numToEmit -= 1.0;
  },


  /**
   * A blank method that allows you to control overwriting specific particle properties
   * on emission. Extend the Particle class then use this method as required.
   *
   * @method Phaser.ParticleStorm.Particle#applyOverwrite
   * @param {object} data - The overwrite data.
   * @param {Phaser.ParticleStorm.Particle} particle - The Particle object.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  applyOverwrite: function applyOverwrite(data, particle) {
    return particle;
  },


  /**
   * Work out what child particle should be emitted by this particle.
   * Handles simple name string, lists of name strings, and the "at" format.
   *
   * @method Phaser.ParticleStorm.Particle#getChildKey
   * @param {object} param - A child defining data structure.
   * @returns {string|null} The name of the child to emit.
   */
  getChildKey: function getChildKey(param) {
    if (Array.isArray(param)) {
      return this.emitter.game.rnd.pick(param);
    }

    if (param.at !== undefined && param.at.length > 0) {
      //  It's a list of child types over time using the "at" list syntax, find the appropriate one
      var ret = param.at[0].value;

      for (var i = 0; i < param.at.length; i++) {
        if (param.at[i].time > this.life) {
          break;
        }

        ret = param.at[i].value;
      }

      return ret;
    }

    return null;
  },


  /**
   * Set this particles velocity components to radiate away from its current position by the given angle.
   *
   * @method Phaser.ParticleStorm.Particle#radiate
   * @param {object} velocity - An object containing a min/max pair, an array of strings containing discrete values, or a single discrete value.
   * @param {number} [from=0] - If both arc variables are undefined, radiate in all directions.
   * @param {number} [to=359] - If both arc variables are defined the particle will radiate within the arc range defined.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  radiate: function radiate(velocity, from, to) {
    //  If `from` is defined, but `to` isn't, we set `to` to match `from`
    if (to === undefined && from !== undefined) {
      to = from;
    } else {
      if (from === undefined) {
        from = 0;
      }
      if (to === undefined) {
        to = 359;
      }
    }

    var v = velocity;

    if (velocity.hasOwnProperty('min')) {
      v = this.graph.getMinMax(velocity);
    } else if (Array.isArray(velocity)) {
      v = parseFloat(this.emitter.game.rnd.pick(velocity), 10);
    }

    var angle = (Math.random() * (to - from) + from) * Math.PI / 180.0;

    this.transform.velocity.x.value = Math.sin(angle) * v;
    this.transform.velocity.y.value = -Math.cos(angle) * v;

    return this;
  },


  /**
   * Set this particles velocity components to radiate away from a given point.
   *
   * @method Phaser.ParticleStorm.Particle#radiateFrom
   * @param {number} x - The central x location to radiate from.
   * @param {number} y - The central y location to radiate from.
   * @param {object} velocity - An object containing a min/max pair, an array of strings containing discrete values, or a single discrete value.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  radiateFrom: function radiateFrom(x, y, velocity) {
    var v = velocity;

    if (velocity.hasOwnProperty('min')) {
      v = this.graph.getMinMax(velocity);
    } else if (Array.isArray(velocity)) {
      v = parseFloat(this.emitter.game.rnd.pick(velocity), 10);
    }

    var dx = this.transform.x - x;
    var dy = this.transform.y - y;
    var d = Math.sqrt(dx * dx + dy * dy);

    this.transform.velocity.x.value = dx * v / d;
    this.transform.velocity.y.value = dy * v / d;

    return this;
  },


  /**
   * Set this particles velocity components to _approximately_ head towards the given coordinates.
   *
   * It will set the velocity to ensure it arrives within the lifespan of this particle.
   * However it does not factor in other forces acting on the particle such as
   * Emitter.force or Gravity Wells.
   *
   * If you specify a zone it will pick a random point from anywhere within the zone and
   * add the x and y values to it, using the x and y values as the placement of the zone.
   *
   * @method Phaser.ParticleStorm.Particle#target
   * @param {object} data - The target data.
   * @param {number} [data.x] - The x location to head to. Must be specified if no zone is given.
   * @param {number} [data.y] - The y location to head to. Must be specified if no zone is given.
   * @param {Phaser.ParticleStorm.Zones.Base} [data.zone] - A zone. A random point within the zone will be selected as the target.
   * @param {string} [data.speed] - Either 'linear', 'reverse' or 'yoyo'.
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  target: function target(data) {
    var x = 0;
    var y = 0;
    var t = this.transform;

    if (data.x) {
      x = data.x;
    }

    if (data.y) {
      y = data.y;
    }

    if (data.zone) {
      var p = data.zone.getRandom();

      x += p.x;
      y += p.y;
    }

    var angle = Math.atan2(y - t.y, x - t.x);

    var dx = t.x - x;
    var dy = t.y - y;

    var speed = Math.sqrt(dx * dx + dy * dy) / (this.lifespan / 1000);

    var vx = Math.cos(angle) * speed * t.time.physicsElapsed;
    var vy = Math.sin(angle) * speed * t.time.physicsElapsed;

    if (data.speed) {
      this.graph.fromControl({ value: vx * 2, control: data.speed }, t.velocity.x);
      this.graph.fromControl({ value: vy * 2, control: data.speed }, t.velocity.y);
    } else {
      t.velocity.x.value = vx;
      t.velocity.y.value = vy;
    }

    return this;
  },


  /**
   * Sets a new lifespan for this particle.
   *
   * The current age of the particle is reset to zero when this is called.
   *
   * @method Phaser.ParticleStorm.Particle#setLife
   * @param {number|object} lifespan - The new lifespan of this particle in ms. Either a value or a min/max pair.
   * @param {boolean} [keepAlive=false] - Should the particle be kept alive at the end of its lifespan?
   * @return {Phaser.ParticleStorm.Particle} This Particle object.
   */
  setLife: function setLife(lifespan, keepAlive) {
    this.lifespan = this.graph.getMinMax(lifespan);

    this.life = 0;
    this._age = 0;
    this._lastPercent = 0;

    this.isComplete = false;
    this.keepAlive = keepAlive;

    return this;
  },


  /**
   * Turns off this particle, leaving it ready to be restarted with reset().
   *
   * @method Phaser.ParticleStorm.Particle#kill
   */
  kill: function kill() {
    this.alive = false;

    this.renderer.kill(this);

    this.onKill();
  },


  /**
   * Called when this Particle is first emitted.
   *
   * This is a blank method for you to override in your own classes that extend Particle.
   *
   * @method Phaser.ParticleStorm.Particle#onEmit
   * @param {Phaser.ParticleStorm.Particle} [parent] - The parent particle that emitted this one, if any.
   */
  onEmit: function onEmit() {},


  /**
   * Called when this Particle is updated by the Particle Manager.
   *
   * It is called at the end of the Particle.step method, just before this particle emits
   * any children and before it's sent to the renderer. If you set Particle.alive to false
   * in this method then the particle will not emit any children or be rendered.
   *
   * This is a blank method for you to override in your own classes that extend Particle.
   *
   * @method Phaser.ParticleStorm.Particle#onUpdate
   */
  onUpdate: function onUpdate() {},


  /**
   * Called when this Particle inherits values from a parent particle.
   *
   * This method must return a boolean value. If you wish for this particle to be used
   * by the Particle Manager and rendered then return `true`. If you want the particle
   * to be immediately killed then return `false`.
   *
   * This is method is for you to override in your own classes that extend Particle.
   *
   * @method Phaser.ParticleStorm.Particle#onInherit
   * @param {Phaser.ParticleStorm.Particle} parent - The parent particle that emitted this one.
   * @return {boolean} True if this particle should be added to the pool and rendered, otherwise false if it should be killed.
   */
  onInherit: function onInherit() {
    return true;
  },


  /**
   * Called when this Particle is killed by its emitter, or directly in code.
   *
   * A killed particle is moved from the active particle list back to the pool, ready
   * for use again in the future. It is not destroyed, it is hibernated for later use.
   *
   * This is a blank method for you to override in your own classes that extend Particle.
   *
   * @method Phaser.ParticleStorm.Particle#onKill
   */
  onKill: function onKill() {}
};

/**
 * The life percent value of this particle rounded between 0 and 100.
 *
 * If you need a value between 0 and 1 then use `Particle.life` instead.
 *
 * @name Phaser.ParticleStorm.Particle#lifePercent
 * @property {integer} lifePercent - The current life percentage of this particle. Rounded between 0 and 100.
 * @readOnly
 */
Object.defineProperty(Phaser.ParticleStorm.Particle.prototype, 'lifePercent', {
  get: function get() {
    return Math.round(this.life * 100);
  }
});

/**
 * Sets the frequency at which this particle emits children.
 *
 * @name Phaser.ParticleStorm.Particle#frequency
 * @property {number|object} value - A value/control type object defining a set rate or a graph of rates across lifespan.
 */
Object.defineProperty(Phaser.ParticleStorm.Particle.prototype, 'frequency', {
  get: function get() {
    return this.emit.value;
  },
  set: function set(value) {
    this.emit.value = value;
  }
});

Phaser.ParticleStorm.Particle.prototype.constructor = Phaser.ParticleStorm.Particle;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Richard Lord
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * A Gravity Well creates a force on the particles to draw them towards a single point.
 * The force applied is inversely proportional to the square of the distance from the particle to the point,
 * in accordance with Newton's law of gravity.
 *
 * A Gravity Well only effects particles owned by the emitter that created it.
 *
 * Gravity Wells don't have any display properties, i.e. they are not Sprites.
 *
 * This class was directly inspired by the work of Richard Lord and some of the jsdocs
 * use his original text. As such this class is released under an MIT License.
 *
 * @class Phaser.ParticleStorm.GravityWell
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The Emitter that owns this Gravity Well.
 * @param {number} [x=0] - The x coordinate of the Gravity Well, the point towards which particles are drawn.
 * @param {number} [y=0] - The y coordinate of the Gravity Well, the point towards which particles are drawn.
 * @param {number} [power=0] - The strength of the gravity well. Larger numbers create stronger forces. Start with low values like 1.
 * @param {number} [epsilon=100] - The minimum distance for which gravity is calculated.
 *                               Particles closer than this distance experience a gravity force as if
 *                               they were this distance away. This stops the gravity effect blowing
 *                               up as distances get small. For realistic gravity effects you will want
 *                               a small epsilon (~1), but for stable visual effects a larger
 *                               epsilon (~100) is often better.
 * @param {number} [gravity=50] - The gravity constant.
 */
Phaser.ParticleStorm.GravityWell = function (emitter, x, y, power, epsilon, gravity) {
  if (x === undefined) {
    x = 0;
  }
  if (y === undefined) {
    y = 0;
  }
  if (power === undefined) {
    power = 0;
  }
  if (epsilon === undefined) {
    epsilon = 100;
  }
  if (gravity === undefined) {
    gravity = 50;
  }

  /**
   * @property {Phaser.ParticleStorm.Emitter} emitter - The Emitter that this Gravity Well belongs to.
   */
  this.emitter = emitter;

  /**
   * @property {Phaser.Time} time - A reference to the Phaser.Time system.
   */
  this.time = emitter.game.time;

  /**
   * @property {Phaser.Point} position - The position of the Gravity Well in world space.
   */
  this.position = new Phaser.Point(x, y);

  /**
   * @property {boolean} active - When `true` the Gravity Well is in effect. When `false` it doesn't influence particles.
   */
  this.active = true;

  /**
   * @property {number} _gravity - Internal gravity var.
   * @private
   */
  this._gravity = gravity;

  /**
   * @property {number} _power - Internal power var.
   * @private
   */
  this._power = 0;

  /**
   * @property {number} _epsilon - Internal epsilon var.
   * @private
   */
  this._epsilon = 0;

  this.power = power;
  this.epsilon = epsilon;
};

Phaser.ParticleStorm.GravityWell.prototype = {
  /**
   * Applies the influence of this Gravity Well to the given Particle.
   *
   * This is called automatically by the Emitter the Gravity Well belongs to.
   *
   * @method Phaser.ParticleStorm.GravityWell#step
   * @param {Phaser.ParticleStorm.Particle} particle - The particle to adjust based on this Gravity Well.
   */
  step: function step(particle) {
    var x = this.position.x - particle.transform.x;
    var y = this.position.y - particle.transform.y;
    var dSq = x * x + y * y;

    if (dSq === 0) {
      return;
    }

    var d = Math.sqrt(dSq);

    if (dSq < this._epsilon) {
      dSq = this._epsilon;
    }

    var factor = this._power * this.time.elapsed / (dSq * d);

    particle.transform.velocity.x.value += x * factor;
    particle.transform.velocity.y.value += y * factor;
  }
};

/**
 * The minimum distance for which the gravity force is calculated.
 * Particles closer than this distance experience the gravity as if
 * they were this distance away. This stops the gravity effect blowing
 * up as distances get small.  For realistic gravity effects you will want
 * a small epsilon (~1), but for stable visual effects a larger
 * epsilon (~100) is often better.
 *
 * @name Phaser.ParticleStorm.GravityWell#epsilon
 * @property {number} epsilon
 */
Object.defineProperty(Phaser.ParticleStorm.GravityWell.prototype, 'epsilon', {
  get: function get() {
    return Math.sqrt(this._epsilon);
  },
  set: function set(value) {
    this._epsilon = value * value;
  }
});

/**
 * The strength of the gravity force - larger numbers produce a stronger force.
 *
 * @name Phaser.ParticleStorm.GravityWell#power
 * @property {number} power
 */
Object.defineProperty(Phaser.ParticleStorm.GravityWell.prototype, 'power', {
  get: function get() {
    return this._power / this.gravity;
  },
  set: function set(value) {
    this._power = value * this.gravity;
  }
});

/**
 * The gravity constant against which the forces are calculated.
 *
 * @name Phaser.ParticleStorm.GravityWell#gravity
 * @property {number} gravity
 */
Object.defineProperty(Phaser.ParticleStorm.GravityWell.prototype, 'gravity', {
  get: function get() {
    return this._gravity;
  },
  set: function set(value) {
    var pwr = this.power;
    this._gravity = value;
    this.power = pwr;
  }
});

Phaser.ParticleStorm.GravityWell.prototype.constructor = Phaser.ParticleStorm.GravityWell;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Pete Baron <pete@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A collection of common functions.
 *
 * @class Phaser.ParticleStorm.Graph
 * @static
 */
Phaser.ParticleStorm.Graph = {
  /**
   * A constant used for the Linear control sets.
   * @constant
   * @type {array}
   */
  CONTROL_LINEAR: [{ x: 0, y: 1 }, { x: 1, y: 0 }],

  /**
   * A constant used for the reversed linear control sets.
   * @constant
   * @type {array}
   */
  CONTROL_REVERSE: [{ x: 0, y: 0 }, { x: 1, y: 1 }],

  /**
   * A constant used for yoyo'd linear control sets.
   * @constant
   * @type {array}
   */
  CONTROL_YOYO: [{ x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 }],

  /**
   * Get the control value by linear interpolation of points in the control array
   * for the current percent "x" value.
   *
   * NOTE: The control array must contain at least points with x = 0 and x = 1,
   * other points may lie between those.
   *
   * @method Phaser.ParticleStorm.Graph#getControlValue
   * @param {object} control - The control curve for a parameter.
   * @param {number} percent - A value between 0 and 1.
   * @return {number} The control value at 'percent'.
   */
  getControlValue: function getControlValue(control, percent) {
    var index = 0;
    var point = control[index];

    if (point.x === percent) {
      return point.y;
    }

    while (point.x <= percent) {
      if (index >= control.length - 1) {
        return point.x;
      }

      point = control[++index];
    }

    var prev = control[index - 1];

    //  Linear interpolation: f(x) = y0 + (y1 - y0) * (x - x0) / (x1 - x0)
    return prev.y + (percent - prev.x) * (point.y - prev.y) / (point.x - prev.x);
  },


  /**
   * Create a list of all control values between the start and end times given.
   *
   * @method Phaser.ParticleStorm.Graph#getControlValues
   * @param {object} control - The control graph.
   * @param {number} previousPercent - The starting "x" value.
   * @param {number} nowPercent - The ending "x" value.
   * @return {array} An array of point objects: {x: number, y: number}[]
   */
  getControlValues: function getControlValues(control, previousPercent, nowPercent) {
    // create a list containing the starting point at previousPercent, interpolated if necessary
    var firsty = Phaser.ParticleStorm.Graph.getControlValue(control, previousPercent);
    var points = [{ x: previousPercent, y: firsty }];

    // no time has elapsed, that's all she wrote
    if (previousPercent >= nowPercent) {
      return points;
    }

    // scan the control array for x values between previousPercent and nowPercent, add them to the list
    for (var i = 0; i < control.length; i++) {
      if (control[i].x > previousPercent) {
        if (control[i].x < nowPercent) {
          points.push(control[i]);
        } else {
          // early out, array is in ascending order so there's no need to search the rest
          break;
        }
      }
    }

    // push the terminal point at nowPercent, interpolated if necessary
    points.push({ x: nowPercent, y: Phaser.ParticleStorm.Graph.getControlValue(control, nowPercent) });

    return points;
  },


  /**
   * Get a value for the area under a control graph (if there is one on param)
   * Otherwise just return the "value" field of param.
   *
   * @method Phaser.ParticleStorm.Graph#getParamArea
   * @param {object} param - The parameter to evaluate.
   * @param {number} previousPercent - The life percent to begin the calculation from (0 .. 1).
   * @param {number} nowPercent - The life percent where the calculation ends (0 .. 1).
   * @return {number} The area found.
   */
  getParamArea: function getParamArea(param, previousPercent, nowPercent) {
    if (param.control) {
      return param.value * Phaser.ParticleStorm.Graph.getControlArea(param.control, previousPercent, nowPercent);
    }

    return param.value;
  },


  /**
   * Calculate the area under a graph between two points.
   *
   * @method Phaser.ParticleStorm.Graph#getControlArea
   * @param {object} control - The graph definition as a list of objects with "x" and "y" fields.
   * @param {number} previousPercent - The starting "x" value.
   * @param {number} nowPercent - The ending "x" value.
   * @return {number} The area.
   */
  getControlArea: function getControlArea(control, previousPercent, nowPercent) {
    // find all the points where the control array changes slope (including the points at previousPercent and nowPercent)
    var points = Phaser.ParticleStorm.Graph.getControlValues(control, previousPercent, nowPercent);

    if (previousPercent >= nowPercent) {
      return points[0].y;
    }

    // the total area under the lines is the sum areas of each trapezoid formed by a line segment, two verticals and the (y = 0) axis
    //
    //    /|\ __
    //   /A|B|C |
    //  |__|_|__|
    //
    var area = points.length > 1 ? 0 : points.y;
    var prev = points[0];

    for (var i = 1; i < points.length; i++) {
      var next = points[i];
      // area of a trapezoid is .5 * b * (h1 + h2)
      area += 0.5 * (next.x - prev.x) * (prev.y + next.y);
      prev = next;
    }

    return area;
  },


  /**
   * Return a value for an object which has an "initial" field.
   * The field can be either a number or a min-max range.
   *
   * Number (eg. 1900.123)
   * Range (eg. { "min":-4.0, "max":123.45 })
   * Object with initial Number (eg. { "initial": 1900.123, ... })
   * Object with initial Range (eg. { "initial": { "min":-4.0, "max":123.45 }, ... })
   * Object without initial value at all (returns 0)
   *
   * If there is no "initial" field, this function will return 0.
   *
   * @method Phaser.ParticleStorm.Graph#getMinMaxInitial
   * @param {object} object - The object to evaluate.
   * @return {number} The value found or zero if not found.
   */
  getMinMaxInitial: function getMinMaxInitial(object) {
    if (object.initial !== undefined) {
      return Phaser.ParticleStorm.Graph.getMinMax(object.initial);
    }
    return 0;
  },


  /**
   * Checks if the given value is numeric or not.
   *
   * @method Phaser.ParticleStorm.Graph#isNumeric
   * @param {object|number} n - The value to be checked.
   * @return {boolean} True if the value given is numeric, otherwise false.
   */
  isNumeric: function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },


  /**
   * Pick a random number in the range between "min" and "max".
   * If the 'value' is not an object with "min" and "max" in it, return 'value'.
   *
   * @method Phaser.ParticleStorm.Graph#getMinMax
   * @param {object|number} value - An object with "min" and "max" values, or a plain number.
   * @return {number} The number picked.
   */
  getMinMax: function getMinMax(value) {
    if (value !== undefined && value !== null && value.min !== undefined && value.max !== undefined) {
      return value.min + Math.random() * (value.max - value.min);
    }

    return value;
  },


  /**
   * Takes a source and destination graph control object and copies the values from `src` to `dest`.
   *
   * @method Phaser.ParticleStorm.Graph#clone
   * @param {object} src - The source control object from which the values are copied.
   * @param {object} dest - The destination control object into which the values are set.
   * @return {object} The destination object.
   */
  clone: function clone(src, dest) {
    dest.value = src.value;
    dest.initial = src.initial;
    dest.delta = src.delta;
    dest.offset = src.offset;
    dest.min = src.min;
    dest.max = src.max;
    dest.control = src.control;

    return dest;
  },


  /**
   * Takes a particle data setting and extracts just its value and control properties.
   *
   * @method Phaser.ParticleStorm.Graph#fromControl
   * @param {number|object} data - The source value or object from which the values are extracted.
   * @param {object} obj - The destination control object into which the values are set.
   */
  fromControl: function fromControl(data, obj) {
    if (data.value !== undefined) {
      obj.value = Phaser.ParticleStorm.Graph.getMinMax(data.value);
    }

    if (data.control) {
      if (data.control === 'linear') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_LINEAR;
      } else if (data.control === 'reverse') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_REVERSE;
      } else if (data.control === 'yoyo') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_YOYO;
      } else {
        //  Reference the original object - could use Object.create here, but would rather
        //  save some memory and just use references.
        obj.control = data.control;
      }
    }
  },


  /**
   * Takes a particle data setting and extracts its values into the graph control object.
   *
   * @method Phaser.ParticleStorm.Graph#fromData
   * @param {number|object} data - The source value or object from which the values are extracted.
   * @param {object} obj - The destination control object into which the values are set.
   * @return {boolean} True if it was able to extract any data, false if it couldn't find any.
   */
  fromData: function fromData(data, obj) {
    if (data === undefined || data === null) {
      return false;
    }

    if (typeof data === 'number') {
      obj.value = data;
      return true;
    }

    if (data.min !== undefined) {
      //  Allows you to do: rotation: { min: 0, max: 90 }
      //  assumes assignment to the value property only.
      obj.value = Phaser.ParticleStorm.Graph.getMinMax(data);
    } else if (data.value !== undefined) {
      //  Allows rotation: { value: { min: 0, max: 90 } }
      obj.value = Phaser.ParticleStorm.Graph.getMinMax(data.value);
    }

    if (data.initial !== undefined) {
      obj.initial = Phaser.ParticleStorm.Graph.getMinMax(data.initial);
    }

    if (data.delta !== undefined) {
      obj.delta = Phaser.ParticleStorm.Graph.getMinMax(data.delta);
    }

    if (data.offset !== undefined) {
      obj.offset = Phaser.ParticleStorm.Graph.getMinMax(data.offset);
    }

    if (data.control) {
      if (data.control === 'linear') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_LINEAR;
      } else if (data.control === 'reverse') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_REVERSE;
      } else if (data.control === 'yoyo') {
        obj.control = Phaser.ParticleStorm.Graph.CONTROL_YOYO;
      } else {
        //  Reference the original object - could use Object.create here, but would rather
        //  save some memory and just use references.
        obj.control = data.control;
      }
    }

    return true;
  },


  /**
   * Return the value of this parameter object.
   *
   * Get the control value by linear interpolation of points in the control array for the current percent "x" value.
   *
   * NOTE: The control array must contain at least points with x = 0 and x = 1, other points may lie between those
   *
   * @method Phaser.ParticleStorm.Graph#getValue
   * @param {number|object} obj - The source graph control object from which the value is extracted.
   * @param {number} percent - The current lifePercent value of a particle.
   * @return {number} The value of the parameter object at this point in the particles life.
   */
  getValue: function getValue(obj, percent) {
    if (!obj.control || percent === undefined) {
      return obj.value;
    }

    var point = obj.control[0];

    //  Very start of the graph?
    if (point.x === percent) {
      return point.y;
    }

    var index = obj.control.length - 1;

    //  Very end of the graph?
    var last = obj.control[index];

    if (last.x === percent) {
      return last.y;
    }

    index = 0;

    while (point.x <= percent) {
      if (index >= obj.control.length - 1) {
        return point.y;
      }

      point = obj.control[++index];
    }

    var prev = obj.control[index - 1];

    //  Linear interpolation: f(x) = y0 + (y1 - y0) * (x - x0) / (x1 - x0)
    return obj.value * (prev.y + (percent - prev.x) * (point.y - prev.y) / (point.x - prev.x));
  },


  /**
   * Return the value of this parameter object, clamped to be within the range obj.min to obj.max.
   *
   * Get the control value by linear interpolation of points in the control array for the current percent "x" value.
   *
   * NOTE: The control array must contain at least points with x = 0 and x = 1, other points may lie between those
   *
   * @method Phaser.ParticleStorm.Graph#getClampedValue
   * @param {number|object} obj - The source graph control object from which the value is extracted.
   * @param {number} percent - The current lifePercent value of a particle.
   * @return {number} The clammped value of the parameter object at this point in the particles life.
   */
  getClampedValue: function getClampedValue(obj, percent) {
    return Phaser.Math.clamp(Math.floor(obj.initial + this.getValue(obj, percent)), obj.min, obj.max);
  }
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

Phaser.ParticleStorm.Zones = {};

/**
 * The base class which all ParticleStorm zones must extend.
 *
 * @class Phaser.ParticleStorm.Zones.Base
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 */
Phaser.ParticleStorm.Zones.Base = function (game) {
  /**
   * @property {Phaser.Game} game - A reference to the Phaser Game instance.
   */
  this.game = game;

  /**
   * The active state of this Zone. If set to `false` it won't emit or process any particles.
   * @property {boolean} active
   */
  this.active = true;

  /**
   * The scale of this zone. You can scale a zone, which influences the position of
   * emitted particles and the overall dimensions of the zone.
   * @property {Phaser.Point} scale
   */
  this.scale = new Phaser.Point(1, 1);

  /**
   * When scanning the pixels of image based zones you can set it to ignore any pixel
   * with an alpha value *below* the threshold. This is a value between 0 (fully
   * transparent) to 255 (fully opaque). If you change this value you need to call
   * `update` afterwards to re-scan the zone.
   * @property {integer} alphaThreshold
   * @default
   */
  this.alphaThreshold = 0;

  /**
   * @property {Phaser.Point} _rnd - Internal point property.
   * @private
   */
  this._rnd = new Phaser.Point();
};

Phaser.ParticleStorm.Zones.Base.prototype = {
  /**
   * Gets a random point from within this zone.
   * Takes the scale of the zone into account.
   *
   * Internally this method uses the private _rnd property
   * of this zone, so what is returned is a reference to
   * that Phaser.Point object. So if you need to store
   * the result rather than use it immediately you should
   * clone the Point or extract its values.
   *
   * @method Phaser.ParticleStorm.Zones.Base#getRandom
   * @return {Phaser.Point} A random point within this zone.
   */
  getRandom: function getRandom() {
    if (this.shape === Phaser.Point) {
      this._rnd = this.shape;
    } else {
      this.shape.random(this._rnd);
    }

    this._rnd.x *= this.scale.x;
    this._rnd.y *= this.scale.y;

    return this._rnd;
  },


  /**
   * Emits the `qty` number of particles on the given emitter.
   * Each particle is given a random location from within this zone.
   *
   * @method Phaser.ParticleStorm.Zones.Base#emit
   * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
   * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
   * @param {number|array} x - The x location of the new particle.
   * @param {number|array} y - The y location of the new particle.
   * @param {number} qty - The quantity of particles to emit.
   * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
   */
  emit: function emit(emitter, key, x, y, qty) {
    //  ------------------------------------------------
    //  If the coordinates are arrays it uses them as min/max pairs
    //  ------------------------------------------------
    if (Array.isArray(x)) {
      x = this.game.rnd.between(x[0], x[1]);
    }

    if (Array.isArray(y)) {
      y = this.game.rnd.between(y[0], y[1]);
    }

    var particle = null;

    for (var i = 0; i < qty; i++) {
      this.shape.random(this._rnd);

      particle = emitter.emitParticle(key, x + this._rnd.x * this.scale.x, y + this._rnd.y * this.scale.y, null);
    }

    return particle;
  }
};

Phaser.ParticleStorm.Zones.Base.prototype.constructor = Phaser.ParticleStorm.Zones.Base;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Point Zone defines a point object from within which particles can be emitted.
 *
 * @class Phaser.ParticleStorm.Zones.Point
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} [x=0] - The horizontal position of this Point Zone.
 * @param {number} [y=0] - The vertical position of this Point Zone.
 */
Phaser.ParticleStorm.Zones.Point = function (game, x, y) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The Phaser geometry primitive this zone uses.
   * @property {Phaser.Point} shape
   */
  this.shape = new Phaser.Point(x, y);
};

Phaser.ParticleStorm.Zones.Point.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Point.prototype.constructor = Phaser.ParticleStorm.Zones.Point;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Rectangle Zone defines a rectangle object from within which particles can be emitted.
 *
 * @class Phaser.ParticleStorm.Zones.Rectangle
 * @constructor
 * @extends Phaser.ParticleStorm.Zones.Base
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} [width=0] - The width of the Rectangle. Should always be either zero or a positive value.
 * @param {number} [height=0] - The height of the Rectangle. Should always be either zero or a positive value.
 */
Phaser.ParticleStorm.Zones.Rectangle = function (game, width, height) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The Phaser geometry primitive this zone uses.
   * @property {Phaser.Rectangle} shape
   */
  this.shape = new Phaser.Rectangle(0, 0, width, height);
};

Phaser.ParticleStorm.Zones.Rectangle.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Rectangle.prototype.constructor = Phaser.ParticleStorm.Zones.Rectangle;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Circle Zone defines a circular area from within which particles can be emitted.
 *
 * @class Phaser.ParticleStorm.Zones.Circle
 * @constructor
 * @extends Phaser.ParticleStorm.Zones.Base
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} [radius=0] - The radius of the circle in pixels.
 */
Phaser.ParticleStorm.Zones.Circle = function (game, radius) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The Phaser geometry primitive this zone uses.
   * @property {Phaser.Circle} shape
   */
  this.shape = new Phaser.Circle(0, 0, radius * 2);
};

Phaser.ParticleStorm.Zones.Circle.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Circle.prototype.constructor = Phaser.ParticleStorm.Zones.Circle;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * An Ellipse Zone defines an elliptical area from within which particles can be emitted.
 *
 * @class Phaser.ParticleStorm.Zones.Ellipse
 * @constructor
 * @extends Phaser.ParticleStorm.Zones.Base
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} [width=0] - The overall width of this ellipse.
 * @param {number} [height=0] - The overall height of this ellipse.
 */
Phaser.ParticleStorm.Zones.Ellipse = function (game, width, height) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The Phaser geometry primitive this zone uses.
   * @property {Phaser.Ellipse} shape
   */
  this.shape = new Phaser.Ellipse(0, 0, width, height);
};

Phaser.ParticleStorm.Zones.Ellipse.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Ellipse.prototype.constructor = Phaser.ParticleStorm.Zones.Ellipse;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Line Zone defines a line segment from within which particles can be emitted.
 *
 * @class Phaser.ParticleStorm.Zones.Line
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} [x1=0] - The x coordinate of the start of the line.
 * @param {number} [y1=0] - The y coordinate of the start of the line.
 * @param {number} [x2=0] - The x coordinate of the end of the line.
 * @param {number} [y2=0] - The y coordinate of the end of the line.
 */
Phaser.ParticleStorm.Zones.Line = function (game, x1, y1, x2, y2) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The Phaser geometry primitive this zone uses.
   * @property {Phaser.Line} shape
   */
  this.shape = new Phaser.Line(x1, y1, x2, y2);
};

Phaser.ParticleStorm.Zones.Line.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Line.prototype.constructor = Phaser.ParticleStorm.Zones.Line;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Spline Zone. A spline consists of a set of points through which a path is
 * constructed. Particles can be emitted anywhere along this path.
 *
 * The points can be set from a variety of formats:
 *
 * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
 * - An array of objects with public x/y properties: `[ { x: 0, y: 0 }, ...]`
 * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
 *
 * @class Phaser.ParticleStorm.Zones.Spline
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {integer} [mode=0] - The type of spline to create. 0 = linear, 1 = bezier and 2 = catmull.
 * @param {number} [resolution=1000] - The resolution of the spline. Higher values generate more points during path interpolation.
 * @param {boolean} [closed=true] - A closed path loops from the final point back to the start again.
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 */
Phaser.ParticleStorm.Zones.Spline = function (game, mode, resolution, closed, points) {
  if (mode === undefined) {
    mode = 0;
  }
  if (resolution === undefined) {
    resolution = 1000;
  }
  if (closed === undefined) {
    closed = true;
  }

  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * Reference to the Phaser.Math class.
   * @property {Phaser.Math} math
   */
  this.math = this.game.math;

  /**
   * An object holding the point values.
   * @property {object} points
   */
  this.points = { x: [], y: [] };

  /**
   * An array containing the interpolated path values.
   * @property {array} path
   */
  this.path = [];

  /**
   * The resolution controls how tightly packed together the interpolated results are.
   * @property {integer} resolution
   */
  this.resolution = resolution;

  /**
   * The type of spline. 0 = linear, 1 = bezier and 2 = catmull.
   * @property {integer} mode
   */
  this.mode = mode;

  /**
   * A closed path loops from the final point back to the start again.
   * @property {boolean} closed
   */
  this.closed = closed;

  /**
   * @property {number} mult - Internal index var.
   * @private
   */
  this.mult = 0;

  this.update(points);
};

Phaser.ParticleStorm.Zones.Spline.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Spline.prototype.constructor = Phaser.ParticleStorm.Zones.Spline;

/**
 * Updates the spline path data. This clears the path and rebuilds it based on
 * the points given.
 *
 * @method Phaser.ParticleStorm.Zones.Spline#update
 * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - An array of points to use for the spline.
 *        These can also be set later via `ParticleStorm.Zones.Spline.setTo`.
 * @return {Phaser.ParticleStorm.Zones.Spline} This zone.
 */
Phaser.ParticleStorm.Zones.Spline.prototype.update = function (points) {
  this.points = { x: [], y: [] };
  this.path = [];

  for (var i = 0; i < points.length; i++) {
    this.points.x.push(points[i].x);
    this.points.y.push(points[i].y);
  }

  if (this.closed) {
    this.points.x.push(points[0].x);
    this.points.y.push(points[0].y);
  }

  //  Now loop through the points and build the path data
  var ix = 0;
  var x = 1 / this.resolution;

  for (var i = 0; i <= 1; i += x) {
    if (this.mode === 0) {
      var px = this.math.linearInterpolation(this.points.x, i);
      var py = this.math.linearInterpolation(this.points.y, i);
    } else if (this.mode === 1) {
      var px = this.math.bezierInterpolation(this.points.x, i);
      var py = this.math.bezierInterpolation(this.points.y, i);
    } else if (this.mode === 2) {
      var px = this.math.catmullRomInterpolation(this.points.x, i);
      var py = this.math.catmullRomInterpolation(this.points.y, i);
    }

    var node = { x: px, y: py, angle: 0 };

    if (ix > 0) {
      node.angle = this.math.angleBetweenPoints(this.path[ix - 1], node);
    }

    this.path.push(node);

    ix++;
  }

  this.mult = this.path.length / 100;

  return this;
};

/**
 * Gets a random point from this path.
 *
 * @method Phaser.ParticleStorm.Zones.Spline#getRandom
 * @return {object} A point from the path. The object contains public x, y and angle properties.
 */
Phaser.ParticleStorm.Zones.Spline.prototype.getRandom = function () {
  return this.game.rnd.pick(this.path);
};

/**
 * Emits the `qty` number of particles on the given emitter.
 *
 * Each particle has a random location from the path of this spline.
 *
 * @method Phaser.ParticleStorm.Zones.Spline#emit
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} qty - The quantity of particles to emit.
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Spline.prototype.emit = function (emitter, key, x, y, qty) {
  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var rnd = null;
  var particle = null;

  for (var i = 0; i < qty; i++) {
    rnd = this.game.rnd.pick(this.path);

    particle = emitter.emitParticle(key, x + rnd.x, y + rnd.y);
  }

  return particle;
};

/**
 * Emits the `qty` number of particles on the given emitter.
 *
 * Each particle has its location based on the percent argument.
 * For example a percent value of 0 will emit a particle right at the
 * start of the spline, where-as a percent value of 50 will emit a
 * particle half-way along the spline.
 *
 * @method Phaser.ParticleStorm.Zones.Spline#emit
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} qty - The quantity of particles to emit.
 * @param {number} percent - The distance along the path to emit the particles from. Between 0 and 100.
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Spline.prototype.emitPercent = function (emitter, key, x, y, qty, percent) {
  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var particle = null;

  percent = Math.floor(percent * this.mult);

  for (var i = 0; i < qty; i++) {
    var path = this.path[percent];

    if (path) {
      particle = emitter.emitParticle(key, x + path.x, y + path.y);
    }
  }

  return particle;
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Text Zone. This is a special kind of zone that scans the pixel data of the given
 * Text object and uses it to emit particles from.
 *
 * Based on the type of renderer being used with this Text zone you can emit particles
 * based on the pixels in the text, optionally tinting and setting their alpha to match.
 *
 * @class Phaser.ParticleStorm.Zones.Text
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {Phaser.Text} text - The Text object used to populate this zone.
 */
Phaser.ParticleStorm.Zones.Text = function (game, text) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The BitmapData object which is used to populate this zone.
   * @property {Phaser.BitmapData} bmd
   */
  this.bmd = new Phaser.BitmapData(game, 'ParticleStorm.Text');

  /**
   * A reference to the Phaser.Text object that populates the data in this zone.
   * @property {Phaser.Text} text
   */
  this.text = text;

  /**
   * This array holds all of the pixel color data from the pixels that were
   * scanned (i.e. non-transparent pixels). It is used internally and should
   * not usually be modified directly.
   * @property {array} points
   */
  this.points = [];

  this.update(text);
};

Phaser.ParticleStorm.Zones.Text.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Text.prototype.constructor = Phaser.ParticleStorm.Zones.Text;

/**
 * Updates the contents of this zone. It resets the `points` array, clearing previous
 * pixel data. If a `text` argument was provided the new Text object is loaded, then it has all
 * pixels scanned and stored in the points array.
 *
 * The scale of the Text object is reset to 1:1 before the pixel data is scanned. The scale
 * is restored again once the scan is complete. This zone is also scaled to match the scale
 * of the Text object given to it.
 *
 * If you don't provide a `text` argument then it has the effect of re-scanning the current
 * Text object, which is useful if you've modified it in any way (for example by changing
 * the text value.)
 *
 * @method Phaser.ParticleStorm.Zones.Text#update
 * @param {Phaser.Text} [text] - The Text object used to populate this zone.
 * @return {Phaser.ParticleStorm.Zones.Text} This zone.
 */
Phaser.ParticleStorm.Zones.Text.prototype.update = function (text) {
  if (text !== undefined) {
    this.text = text;
  } else {
    text = this.text;
  }

  //  Store the Text object properties before we reset them

  var tx = text.x;
  var ty = text.y;

  var sx = text.scale.x;
  var sy = text.scale.y;

  //  Write the Text to the bmd

  text.x = 0;
  text.y = 0;

  text.scale.set(1);

  this.points = [];

  this.bmd.load(text);

  this.bmd.processPixelRGB(this.addPixel, this);

  this.scale = new Phaser.Point(sx, sy);

  //  Restore the Text object properties

  text.x = tx;
  text.y = ty;

  text.scale.set(sx, sy);

  return this;
};

/**
 * Internal method used by the processPixelRGB call. Checks if the given
 * color alpha is above `alphaThreshold` and if so it adds it to the
 * points array.
 *
 * @method Phaser.ParticleStorm.Zones.Text#addPixel
 * @param {object} color - The color object created by the processPixelRGB method.
 * @param {number} x - The x coordinate of the pixel within the image.
 * @param {number} y - The y coordinate of the pixel within the image.
 * @return {boolean} This method must always return false.
 */
Phaser.ParticleStorm.Zones.Text.prototype.addPixel = function (color, x, y) {
  if (color.a > this.alphaThreshold) {
    this.points.push({ x: x, y: y, color: { r: color.r, g: color.g, b: color.b, a: color.a / 255 } });
  }

  return false;
};

/**
 * Gets a single random pixel data object from the text.
 *
 * The object contains x and y properties relating to its position within the text.
 * It also contains a color object containing r, g, b and a properties for the red,
 * green, blue and alpha values of the pixel respectively.
 *
 * @method Phaser.ParticleStorm.Zones.Text#getRandom
 * @return {object} A pixel data object.
 */
Phaser.ParticleStorm.Zones.Text.prototype.getRandom = function () {
  var rnd = this.game.rnd.pick(this.points);

  rnd.x *= this.scale.x;
  rnd.y *= this.scale.y;

  return rnd;
};

/**
 * Emits the `qty` number of particles on the given emitter.
 * Each particle is given a random location from within this zone.
 *
 * @method Phaser.ParticleStorm.Zones.Text#emit
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} qty - The quantity of particles to emit.
 * @param {boolean} setAlpha - Should the zone set the alpha of the particle?
 * @param {boolean} setColor - Should the zone set the tint of the particle?
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Text.prototype.emit = function (emitter, key, x, y, qty, setAlpha, setColor) {
  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var rnd = null;
  var particle = null;

  for (var i = 0; i < qty; i++) {
    rnd = this.game.rnd.pick(this.points);

    particle = emitter.emitParticle(key, x + rnd.x * this.scale.x, y + rnd.y * this.scale.y);

    if (particle) {
      if (setAlpha && rnd.color.a < 1) {
        particle.color.alpha.value = rnd.color.a;
      }

      if (setColor) {
        particle.color.setColor(rnd.color.r, rnd.color.g, rnd.color.b, rnd.color.a);
      }
    }
  }

  return particle;
};

/**
 * Emits a particle for every pixel in this text object.
 * The step and spacing arguments control the iteration through the pixels.
 *
 * @method Phaser.ParticleStorm.Zones.Text#emitFull
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} step - Controls the iteration through the pixel data.
 * @param {number|array} spacing - The spacing between the particle coordinates.
 * @param {boolean} setAlpha - Should the zone set the alpha of the particle?
 * @param {boolean} setColor - Should the zone set the tint of the particle?
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Text.prototype.emitFull = function (emitter, key, x, y, step, spacing, setAlpha, setColor) {
  if (step === undefined) {
    step = 1;
  }

  var sx = 1;
  var sy = 1;

  if (Array.isArray(spacing)) {
    sx = spacing[0];
    sy = spacing[1];
  } else if (typeof spacing === 'number') {
    sx = spacing;
    sy = spacing;
  }

  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var point = null;
  var particle = null;

  for (var i = 0; i < this.points.length; i += step) {
    point = this.points[i];

    var px = x + point.x * this.scale.x * (sx / step);
    var py = y + point.y * this.scale.y * (sy / step);

    particle = emitter.emitParticle(key, px, py);

    if (particle) {
      if (setAlpha && point.color.a < 1) {
        particle.color.alpha.value = point.color.a;
      }

      if (setColor) {
        particle.color.setColor(point.color.r, point.color.g, point.color.b, point.color.a);
      }
    }
  }

  return particle;
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * An Image Zone. This is a special kind of zone based on the pixel data in
 * the given image.
 *
 * Based on the type of renderer being used with this Image zone you can emit particles
 * based on the pixels in the image, optionally tinting and setting their alpha to match.
 *
 * @class Phaser.ParticleStorm.Zones.Image
 * @constructor
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} key - The object that
 *     will be used to create this Image zone. If you give a string it will try and find the Image in the Game.Cache first.
 */
Phaser.ParticleStorm.Zones.Image = function (game, key) {
  Phaser.ParticleStorm.Zones.Base.call(this, game);

  /**
   * The BitmapData object which is used to populate this zone.
   * @property {Phaser.BitmapData} bmd
   */
  this.bmd = new Phaser.BitmapData(game, 'ParticleStorm.Image');

  /**
   * The key given in the constructor or calls to `update`.
   * @property {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} key
   * @private
   */
  this.key = key;

  /**
   * This array holds all of the pixel color data from the pixels that were
   * scanned (i.e. non-transparent pixels). It is used internally and should
   * not usually be modified directly.
   * @property {array} points
   */
  this.points = [];

  this.update(key);
};

Phaser.ParticleStorm.Zones.Image.prototype = Object.create(Phaser.ParticleStorm.Zones.Base.prototype);
Phaser.ParticleStorm.Zones.Image.prototype.constructor = Phaser.ParticleStorm.Zones.Image;

/**
 * Updates the contents of this zone. It resets the `points` array, clearing previous
 * pixel data. If a key argument was provided the new image is loaded, then it has all
 * pixels scanned and stored in the points array.
 *
 * If you don't provide a key argument then it has the effect of re-scanning the current
 * image, which is useful if you've modified the image or BitmapData directly.
 *
 * @method Phaser.ParticleStorm.Zones.Image#update
 * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} [key] - The object that
 *     will be used to create this Image zone. If you give a string it will try and find the Image in the Game.Cache first.
 * @return {Phaser.ParticleStorm.Zones.Image} This zone.
 */
Phaser.ParticleStorm.Zones.Image.prototype.update = function (key) {
  if (key === undefined) {
    key = this.key;
  }

  this.points = [];

  this.bmd.load(key);

  this.bmd.processPixelRGB(this.addPixel, this);

  return this;
};

/**
 * Internal method used by the processPixelRGB call. Checks if the given
 * color alpha is above `alphaThreshold` and if so it adds it to the
 * points array.
 *
 * @method Phaser.ParticleStorm.Zones.Image#addPixel
 * @param {object} color - The color object created by the processPixelRGB method.
 * @param {number} x - The x coordinate of the pixel within the image.
 * @param {number} y - The y coordinate of the pixel within the image.
 * @return {boolean} This method must always return false.
 */
Phaser.ParticleStorm.Zones.Image.prototype.addPixel = function (color, x, y) {
  if (color.a > this.alphaThreshold) {
    this.points.push({ x: x, y: y, color: { r: color.r, g: color.g, b: color.b, a: color.a / 255 } });
  }

  return false;
};

/**
 * Gets a single random pixel data object from the image.
 *
 * The object contains x and y properties relating to its position within the image.
 * It also contains a color object containing r, g, b and a properties for the red,
 * green, blue and alpha values of the pixel respectively.
 *
 * @method Phaser.ParticleStorm.Zones.Image#getRandom
 * @return {object} A pixel data object.
 */
Phaser.ParticleStorm.Zones.Image.prototype.getRandom = function () {
  var rnd = this.game.rnd.pick(this.points);

  rnd.x *= this.scale.x;
  rnd.y *= this.scale.y;

  return rnd;
};

/**
 * Emits the `qty` number of particles on the given emitter.
 * Each particle is given a random location from within this zone.
 *
 * @method Phaser.ParticleStorm.Zones.Image#emit
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} qty - The quantity of particles to emit.
 * @param {boolean} setAlpha - Should the zone set the alpha of the particle?
 * @param {boolean} setColor - Should the zone set the tint of the particle?
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Image.prototype.emit = function (emitter, key, x, y, qty, setAlpha, setColor) {
  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var rnd = null;
  var particle = null;

  for (var i = 0; i < qty; i++) {
    rnd = this.game.rnd.pick(this.points);

    particle = emitter.emitParticle(key, x + rnd.x * this.scale.x, y + rnd.y * this.scale.y);

    if (particle) {
      if (setAlpha && rnd.color.a < 1) {
        particle.color.alpha.value = rnd.color.a;
      }

      if (setColor) {
        particle.color.setColor(rnd.color.r, rnd.color.g, rnd.color.b, rnd.color.a);
      }
    }
  }

  return particle;
};

/**
 * Emits a particle for every pixel in this image.
 * The step and spacing arguments control the iteration through the pixels.
 *
 * @method Phaser.ParticleStorm.Zones.Image#emitFull
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter containing the particles to be emitted from this zone.
 * @param {string} key - The key of the data that the particle will use to obtain its emission values from.
 * @param {number} x - The x location of the new particle.
 * @param {number} y - The y location of the new particle.
 * @param {number} step - Controls the iteration through the pixel data.
 * @param {number|array} spacing - The spacing between the particle coordinates.
 * @param {boolean} setAlpha - Should the zone set the alpha of the particle?
 * @param {boolean} setColor - Should the zone set the tint of the particle?
 * @return {Phaser.ParticleStorm.Particle} The particle that was emitted. If more than one was emitted it returns the last particle.
 */
Phaser.ParticleStorm.Zones.Image.prototype.emitFull = function (emitter, key, x, y, step, spacing, setAlpha, setColor) {
  if (step === undefined) {
    step = 1;
  }

  var sx = 1;
  var sy = 1;

  if (Array.isArray(spacing)) {
    sx = spacing[0];
    sy = spacing[1];
  } else if (typeof spacing === 'number') {
    sx = spacing;
    sy = spacing;
  }

  //  ------------------------------------------------
  //  If the coordinates are arrays it uses them as min/max pairs
  //  ------------------------------------------------
  if (Array.isArray(x)) {
    x = this.game.rnd.between(x[0], x[1]);
  }

  if (Array.isArray(y)) {
    y = this.game.rnd.between(y[0], y[1]);
  }

  var point = null;
  var particle = null;

  for (var i = 0; i < this.points.length; i += step) {
    point = this.points[i];

    var px = x + point.x * this.scale.x * (sx / step);
    var py = y + point.y * this.scale.y * (sy / step);

    particle = emitter.emitParticle(key, px, py);

    if (particle) {
      if (setAlpha && point.color.a < 1) {
        particle.color.alpha.value = point.color.a;
      }

      if (setColor) {
        particle.color.setColor(point.color.r, point.color.g, point.color.b, point.color.a);
      }
    }
  }

  return particle;
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * The Texture control belongs to a single particle and controls all aspects of its texture.
 * It allows you to control the texture, animation frame and z-index in display lists.
 *
 * @class Phaser.ParticleStorm.Controls.Texture
 * @constructor
 * @param {Phaser.ParticleStorm.Particle} particle - The particle this control belongs to.
 */
Phaser.ParticleStorm.Controls.Texture = function (particle) {
  /**
   * The particle this control belongs to.
   * @property {Phaser.ParticleStorm.Particle} particle
   */
  this.particle = particle;

  /**
   * A reference to the Phaser.RandomDataGenerator which several methods in this
   * control require.
   * @property {Phaser.RandomDataGenerator} rnd
   */
  this.rnd = particle.emitter.game.rnd;

  /**
   * @property {Phaser.ParticleStorm.Graph} graph - A set of useful common static functions.
   */
  this.graph = Phaser.ParticleStorm.Graph;

  /**
   * Particles that are spawned within a display list (such as Sprite particles) can
   * optionally be 'sent to the back' of the list upon being spawned.
   * @property {boolean} sendToBack
   * @default
   */
  this.sendToBack = false;

  /**
   * Particles that are spawned within a display list (such as Sprite particles) can
   * optionally be 'bought to the front' of the list upon being spawned.
   * @property {boolean} bringToTop
   * @default
   */
  this.bringToTop = true;

  /**
   * The key of the image this particle uses for rendering, if any.
   * @property {string} key
   * @default
   */
  this.key = null;

  /**
   * The current numeric frame of this particle texture, if using a sprite sheet.
   * @property {number} frame
   * @default
   */
  this.frame = undefined;

  /**
   * The current frame name of this particles texture, if using an atlas.
   * @property {string} frameName
   * @default
   */
  this.frameName = undefined;

  /**
   * The scale mode used by the texture.
   * @property {integer} scaleMode
   * @default
   */
  this.scaleMode = Phaser.scaleModes.DEFAULT;
};

Phaser.ParticleStorm.Controls.Texture.prototype = {
  /**
   * Resets this control and all properties of it. This is called automatically
   * when its parent particle is spawned.
   *
   * @method Phaser.ParticleStorm.Controls.Texture#reset
   */
  reset: function reset() {
    this.sendToBack = false;
    this.bringToTop = true;

    this.key = '__default';

    this.frame = undefined;
    this.frameName = undefined;

    this.scaleMode = Phaser.scaleModes.DEFAULT;
  },


  /**
   * Populates all aspects of this control to its particle that apply.
   *
   * @method Phaser.ParticleStorm.Controls.Texture#init
   */
  init: function init(data) {
    //  ------------------------------------------------
    //  Send to Back / Bring to Front (boolean)
    //  ------------------------------------------------

    if (data.sendToBack) {
      this.sendToBack = data.sendToBack;
    } else if (data.bringToTop) {
      this.bringToTop = data.bringToTop;
    }

    //  ------------------------------------------------
    //  Particle image (string or array) with optional Frame
    //  ------------------------------------------------

    if (data.image) {
      if (Array.isArray(data.image)) {
        this.key = this.rnd.pick(data.image);
      } else {
        this.key = data.image;
      }
    }

    //  Allows for single frame setting (index or string based, both work)
    if (data.frame !== undefined) {
      var f = data.frame;

      if (Array.isArray(data.frame)) {
        f = this.rnd.pick(data.frame);
      }

      if (this.graph.isNumeric(f)) {
        this.frame = f;
      } else {
        this.frameName = f;
      }
    }

    //  ------------------------------------------------
    //  Scale Mode
    //  ------------------------------------------------

    if (data.scaleMode) {
      var sm = data.scaleMode.toUpperCase();

      if (sm === 'LINEAR') {
        this.scaleMode = Phaser.scaleModes.LINEAR;
      } else if (sm === 'NEAREST') {
        this.scaleMode = Phaser.scaleModes.NEAREST;
      }
    }
  },


  /**
   * Called automatically when the parent particle updates. It applies
   * all texture controls to the particle based on its lifespan.
   *
   * @method Phaser.ParticleStorm.Controls.Texture#step
   * @param {object} data - The particle data object.
   * @param {Phaser.Sprite} [sprite] - The particle sprite.
   */
  step: function step(data, sprite) {
    //  ------------------------------------------------
    //  Animation
    //  ------------------------------------------------

    if (this.particle.emitter.renderType === Phaser.ParticleStorm.SPRITE && data.animations !== undefined) {
      var names = [];

      for (var name in data.animations) {
        var anim = data.animations[name];

        var frames = null;
        var numeric = true;

        if (anim.frames !== undefined) {
          if (Array.isArray(anim.frames)) {
            frames = anim.frames;
          } else {
            frames = Phaser.Animation.generateFrameNames(anim.frames.prefix, anim.frames.start, anim.frames.stop, anim.frames.suffix, anim.frames.zeroPad);
          }

          if (typeof frames[0] === 'string') {
            numeric = false;
          }
        }

        var frameRate = anim.frameRate === undefined ? 60 : anim.frameRate;
        var loop = anim.loop === undefined ? false : anim.loop;

        sprite.animations.add(name, frames, frameRate, loop, numeric);

        names.push(name);
      }

      if (names.length > 0) {
        if (data.play !== undefined) {
          sprite.play(this.rnd.pick(names));
        } else {
          sprite.play(names[0]);
        }
      }
    }

    //  ------------------------------------------------
    //  Z Order
    //  ------------------------------------------------

    if (this.sendToBack) {
      sprite.sendToBack();
    } else if (this.bringToTop) {
      sprite.bringToTop();
    }
  }
};

Phaser.ParticleStorm.Controls.Texture.prototype.constructor = Phaser.ParticleStorm.Controls.Texture;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * The Color control belongs to a single particle and controls all aspects of its color.
 * It allows you to control the color channels, alpha, tint, hsv and other properties.
 *
 * @class Phaser.ParticleStorm.Controls.Color
 * @constructor
 * @param {Phaser.ParticleStorm.Particle} particle - The particle this control belongs to.
 */
Phaser.ParticleStorm.Controls.Color = function (particle) {
  /**
   * The particle this control belongs to.
   * @property {Phaser.ParticleStorm.Particle} particle
   */
  this.particle = particle;

  /**
   * @property {Phaser.ParticleStorm.Graph} graph - A set of useful common static functions.
   */
  this.graph = Phaser.ParticleStorm.Graph;

  /**
   * The red color channel control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE_255 object.
   * @property {object} red
   */
  this.red = {};

  /**
   * The green color channel control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE_255 object.
   * @property {object} green
   */
  this.green = {};

  /**
   * The blue color channel control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE_255 object.
   * @property {object} blue
   */
  this.blue = {};

  /**
   * The alpha channel control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE_1 object.
   * @property {object} alpha
   */
  this.alpha = {};

  /**
   * The hsv control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE_359 object.
   * @property {object} hsv
   */
  this.hsv = {};

  /**
   * A local helper object which stores HSV color modes for emitter renderers to use.
   * This is a reference to the array stored in Phaser.ParticleStorm.
   *
   * @property {array} hsvData
   * @protected
   */
  this.hsvData = this.particle.emitter.parent.hsv;

  /**
   * This pre-calculated tint value.
   * @property {integer} tint
   */
  this.tint = 0;

  /**
   * A flag telling the renderer if a tint should be applied or not.
   * @property {boolean} isTinted
   */
  this.isTinted = false;

  /**
   * This pre-calculated rgba string.
   * @property {string} rgba
   */
  this.rgba = 'rgba(0, 0, 0, 1)';

  /**
   * The blend mode being used by the particle.
   * This is a reference to a ParticleStorm.blendModeMap entry.
   * @property {array} blendMode
   */
  this.blendMode = this.particle.emitter.parent.blendModeMap.NORMAL;
};

Phaser.ParticleStorm.Controls.Color.prototype = {
  /**
   * Resets this control and all properties of it. This is called automatically
   * when its parent particle is spawned.
   *
   * @method Phaser.ParticleStorm.Controls.Color#reset
   */
  reset: function reset() {
    this.red = Object.create(Phaser.ParticleStorm.BASE_255);
    this.green = Object.create(Phaser.ParticleStorm.BASE_255);
    this.blue = Object.create(Phaser.ParticleStorm.BASE_255);

    this.alpha = Object.create(Phaser.ParticleStorm.BASE_1);

    this.tint = 0xffffff;
    this.isTinted = false;

    this.isHSV = false;
    this.hsv = Object.create(Phaser.ParticleStorm.BASE_359);

    this.rgba = 'rgba(0, 0, 0, 1)';

    this.blendMode = this.particle.emitter.parent.blendModeMap.NORMAL;
  },


  /**
   * Takes a particle data object and populates all aspects of this control
   * that it applies to.
   *
   * @method Phaser.ParticleStorm.Controls.Color#init
   * @param {object} data - The particle data.
   */
  init: function init(data) {
    var tint = false;

    //  ------------------------------------------------
    //  HSV
    //  ------------------------------------------------

    if (data.hasOwnProperty('hsv')) {
      if (typeof data.hsv === 'number') {
        this.hsv.value = data.hsv;
      } else {
        this.graph.fromData(data.hsv, this.hsv);
      }

      tint = true;
      this.isHSV = true;
    } else {
      //  ------------------------------------------------
      //  RGB
      //  ------------------------------------------------

      if (data.hasOwnProperty('red')) {
        if (typeof data.red === 'number') {
          this.red.value = data.red;
        } else {
          this.graph.fromData(data.red, this.red);
        }

        tint = true;
      }

      if (data.hasOwnProperty('green')) {
        if (typeof data.green === 'number') {
          this.green.value = data.green;
        } else {
          this.graph.fromData(data.green, this.green);
        }

        tint = true;
      }

      if (data.hasOwnProperty('blue')) {
        if (typeof data.blue === 'number') {
          this.blue.value = data.blue;
        } else {
          this.graph.fromData(data.blue, this.blue);
        }

        tint = true;
      }
    }

    //  ------------------------------------------------
    //  Alpha
    //  ------------------------------------------------

    if (data.hasOwnProperty('alpha')) {
      if (typeof data.alpha === 'number') {
        this.alpha.value = data.alpha;
      } else {
        this.graph.fromData(data.alpha, this.alpha);
      }
    }

    this.red.value = Phaser.Math.clamp(this.red.value, 0, 255);
    this.green.value = Phaser.Math.clamp(this.green.value, 0, 255);
    this.blue.value = Phaser.Math.clamp(this.blue.value, 0, 255);
    this.alpha.value = Phaser.Math.clamp(this.alpha.value, 0, 1);
    this.hsv.value = Phaser.Math.clamp(this.hsv.value, 0, 359);

    if (this.particle.emitter.renderType !== Phaser.ParticleStorm.PIXEL) {
      //  We don't tint pixels
      this.isTinted = tint;
    }

    if (data.blendMode) {
      this.blendMode = this.particle.emitter.parent.blendModeMap[data.blendMode.toUpperCase()];
    }
  },


  /**
   * Called automatically when the parent particle updates. It applies
   * all color controls to the particle based on its lifespan.
   *
   * @method Phaser.ParticleStorm.Controls.Color#step
   */
  step: function step() {
    var life = this.particle.life;


    if (this.isHSV) {
      this.hsv.value += this.hsv.delta;
      this.hsv.calc = Phaser.Math.clamp(Math.floor(this.hsv.initial + this.graph.getValue(this.hsv, life)), 0, 359);

      this.red.value = this.hsvData[this.hsv.calc].r;
      this.green.value = this.hsvData[this.hsv.calc].g;
      this.blue.value = this.hsvData[this.hsv.calc].b;
    } else {
      this.red.value += this.red.delta;
      this.green.value += this.green.delta;
      this.blue.value += this.blue.delta;
    }

    this.red.calc = this.graph.getClampedValue(this.red, life);
    this.green.calc = this.graph.getClampedValue(this.green, life);
    this.blue.calc = this.graph.getClampedValue(this.blue, life);

    if (this.isTinted) {
      this.tint = this.red.calc << 16 | this.green.calc << 8 | this.blue.calc;
    }

    this.alpha.value += this.alpha.delta;
    this.alpha.calc = Phaser.Math.clamp(this.alpha.initial + this.graph.getValue(this.alpha, life), 0, 1);

    this.rgba = 'rgba(' + this.red.calc + ',' + this.green.calc + ',' + this.blue.calc + ',' + this.alpha.calc + ')';
  },


  /**
   * Sets the color values of the red, green and blue controls.
   *
   * @method Phaser.ParticleStorm.Controls.Color#setColor
   * @param {integer} r - The red color value. Between 1 and 255.
   * @param {integer} g - The green color value. Between 1 and 255.
   * @param {integer} b - The blue color value. Between 1 and 255.
   * @param {integer} a - The alpha color value. Between 1 and 255.
   */
  setColor: function setColor(r, g, b, a) {
    this.red.value = r;
    this.green.value = g;
    this.blue.value = b;
    this.alpha.value = a;

    if (this.particle.emitter.renderType !== Phaser.ParticleStorm.PIXEL) {
      //  We don't tint pixels
      this.isTinted = true;
    }

    this.step();
  }
};

Phaser.ParticleStorm.Controls.Color.prototype.constructor = Phaser.ParticleStorm.Controls.Color;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * The Transform control belongs to a single particle and controls all aspects of its transformation.
 * It allows you to control the position, scale, rotation, velocity and other properties.
 *
 * @class Phaser.ParticleStorm.Controls.Transform
 * @constructor
 * @param {Phaser.ParticleStorm.Particle} particle - The particle this control belongs to.
 */
Phaser.ParticleStorm.Controls.Transform = function (particle) {
  /**
   * The particle this control belongs to.
   * @property {Phaser.ParticleStorm.Particle} particle
   */
  this.particle = particle;

  /**
   * A reference to the Phaser.Time class.
   * @property {Phaser.Time} time
   */
  this.time = particle.emitter.game.time;

  /**
   * @property {Phaser.ParticleStorm.Graph} graph - A set of useful common static functions.
   */
  this.graph = Phaser.ParticleStorm.Graph;

  /**
   * The horizontal position of this particle.
   * @property {number} x
   */
  this.x = 0;

  /**
   * The vertical position of this particle.
   * @property {number} y
   */
  this.y = 0;

  /**
   * The velocity control object. Contains x, y and facing properties.
   * They inherits all properties of the Phaser.ParticleStorm.BASE object.
   * @property {object} velocity
   */
  this.velocity = { x: null, y: null, facing: null };

  /**
   * The acceleration control object. Contains x, y and facing properties.
   * They inherits all properties of the Phaser.ParticleStorm.BASE object.
   * @property {object} acceleration
   */
  this.acceleration = { x: null, y: null, facing: null };

  /**
   * The scale control object. Contains x and y and properties.
   * They inherits all properties of the Phaser.ParticleStorm.BASE_1 object.
   * @property {object} scale
   */
  this.scale = { x: null, y: null };

  /**
   * The rotation control object.
   * This inherits all properties of the Phaser.ParticleStorm.BASE object.
   * @property {object} rotation
   */
  this.rotation = {};

  /**
   * The anchor of the particle. By default particles all have anchors set to
   * 0.5 (i.e. their center) to assist with rotation.
   * @property {Phaser.Point} anchor
   */
  this.anchor = new Phaser.Point();
};

Phaser.ParticleStorm.Controls.Transform.prototype = {
  /**
   * Resets this control and all properties of it. This is called automatically
   * when its parent particle is spawned.
   *
   * @method Phaser.ParticleStorm.Controls.Transform#reset
   */
  reset: function reset() {
    this.velocity.x = Object.create(Phaser.ParticleStorm.BASE);
    this.velocity.y = Object.create(Phaser.ParticleStorm.BASE);
    this.velocity.facing = Object.create(Phaser.ParticleStorm.BASE_NULL);

    this.acceleration.x = Object.create(Phaser.ParticleStorm.BASE);
    this.acceleration.y = Object.create(Phaser.ParticleStorm.BASE);
    this.acceleration.facing = Object.create(Phaser.ParticleStorm.BASE_NULL);

    this.scale.x = Object.create(Phaser.ParticleStorm.BASE_1);
    this.scale.y = Object.create(Phaser.ParticleStorm.BASE_1);

    this.rotation = Object.create(Phaser.ParticleStorm.BASE);

    this.anchor.set(0.5);
  },


  /**
   * Takes a particle data object and populates all aspects of this control
   * that it applies to.
   *
   * @method Phaser.ParticleStorm.Controls.Transform#init
   * @param {number} x - The horizontal position of the particle.
   * @param {number} y - The vertical position of the particle.
   * @param {object} data - The particle data.
   */
  init: function init(x, y, data) {
    this.x = x;
    this.y = y;

    //  ------------------------------------------------
    //  Anchor
    //  ------------------------------------------------

    if (data.hasOwnProperty('anchor')) {
      this.anchor.set(data.anchor);
    } else {
      if (data.hasOwnProperty('anchorX')) {
        this.anchor.x = data.anchorX;
      }

      if (data.hasOwnProperty('anchorY')) {
        this.anchor.y = data.anchorY;
      }
    }

    //  ------------------------------------------------
    //  Velocity
    //  ------------------------------------------------

    //  Use 'velocity' instead or in addition to 'vx' and 'vy' when those two are interlinked
    //  (eg. when creating a radial vector from the creation point)

    if (data.hasOwnProperty('velocity')) {
      if (this.graph.isNumeric(data.velocity)) {
        //  velocity: 2
        this.velocity.x.value = data.velocity;
        this.velocity.y.value = data.velocity;
      } else if (data.velocity.hasOwnProperty('min')) {
        //  velocity: { min: -2, max: 2 }
        this.velocity.x.value = this.graph.getMinMax(data.velocity);
        this.velocity.y.value = this.velocity.x.value;
      } else if (data.velocity.radial) {
        //  radial velocity
        var v = this.graph.getMinMaxInitial(data.velocity);

        var arcs = data.velocity.radial.arcStart;
        var arce = data.velocity.radial.arcEnd;

        if (arcs !== undefined && arce !== undefined) {
          //  Radiate within an arc
          var angle = (Math.random() * (arce - arcs) + arcs) * Math.PI / 180.0;
          var dx = Math.sin(angle);
          var dy = -Math.cos(angle);
          this.velocity.x.value = dx * v;
          this.velocity.y.value = dy * v;
        }
      } else {
        //  velocity: { initial: 2, value: 3, delta: 0.1, control: {} }
        this.velocity.x.initial = this.graph.getMinMaxInitial(data.velocity);
        this.velocity.y.initial = this.velocity.x.initial;

        this.velocity.x.value = this.graph.getMinMax(data.velocity.value);
        this.velocity.y.value = this.velocity.x.value;
      }

      if (data.velocity.hasOwnProperty('delta')) {
        this.velocity.x.delta = this.graph.getMinMax(data.velocity.delta);
        this.velocity.y.delta = this.velocity.x.delta;
      }

      if (data.velocity.hasOwnProperty('control')) {
        this.velocity.x.control = data.velocity.control;
        this.velocity.y.control = data.velocity.control;
      }

      //  If they defined vx/vy AND velocity then the vx/vy settings over-ride velocity
      if (data.hasOwnProperty('vx')) {
        this.graph.fromData(data.vx, this.velocity.x);
      }

      if (data.hasOwnProperty('vy')) {
        this.graph.fromData(data.vy, this.velocity.y);
      }
    } else if (data.hasOwnProperty('target')) {
      //  ------------------------------------------------
      //  Target
      //  ------------------------------------------------

      this.particle.target(data.target);
    } else {
      //  ------------------------------------------------
      //  vx / vy
      //  ------------------------------------------------

      //  Avoids calling fromData if we know we're just dealing with a number
      if (typeof data.vx === 'number') {
        this.velocity.x.value = data.vx;
      } else {
        this.graph.fromData(data.vx, this.velocity.x);
      }

      if (typeof data.vy === 'number') {
        this.velocity.y.value = data.vy;
      } else {
        this.graph.fromData(data.vy, this.velocity.y);
      }
    }

    //  ------------------------------------------------
    //  Facing Acceleration / Velocity
    //  ------------------------------------------------

    //  Avoids calling fromData if we know we're just dealing with a number
    if (typeof data.facingVelocity === 'number') {
      this.velocity.facing.value = data.facingVelocity;
    } else {
      this.graph.fromData(data.facingVelocity, this.velocity.facing);
    }

    if (typeof data.facingAcceleration === 'number') {
      this.acceleration.facing.value = data.facingAcceleration;
    } else {
      this.graph.fromData(data.facingAcceleration, this.acceleration.facing);
    }

    //  ------------------------------------------------
    //  Acceleration
    //  ------------------------------------------------

    if (data.hasOwnProperty('acceleration')) {
      //  Use 'acceleration' when the ax and ay are interlinked
      this.graph.fromData(data.acceleration, this.acceleration.x);
      this.graph.fromData(data.acceleration, this.acceleration.y);
    } else {
      //  Avoids calling fromData if we know we're just dealing with a number
      if (typeof data.ax === 'number') {
        this.acceleration.x.value = data.ax;
      } else {
        this.graph.fromData(data.ax, this.acceleration.x);
      }

      if (typeof data.ay === 'number') {
        this.acceleration.y.value = data.ay;
      } else {
        this.graph.fromData(data.ay, this.acceleration.y);
      }
    }

    //  ------------------------------------------------
    //  Scale and Rotation
    //  ------------------------------------------------

    if (data.hasOwnProperty('scale')) {
      this.graph.fromData(data.scale, this.scale.x);
      this.graph.clone(this.scale.x, this.scale.y);
    } else {
      if (typeof data.scaleX === 'number') {
        this.scale.x.value = data.scaleX;
      } else {
        this.graph.fromData(data.scaleX, this.scale.x);
      }

      if (typeof data.scaleY === 'number') {
        this.scale.y.value = data.scaleY;
      } else {
        this.graph.fromData(data.scaleY, this.scale.y);
      }
    }

    if (typeof data.rotation === 'number') {
      this.rotation.value = data.rotation;
    } else {
      this.graph.fromData(data.rotation, this.rotation);
    }

    var parent = this.particle.parent;


    if (parent && parent.emit && parent.emit.inherit) {
      this.inherit(parent);
    }
  },


  /**
   * Adjust Particle parameters according to the inheritable properties
   * of the parent particle.
   *
   * @method Phaser.ParticleStorm.Controls.Transform#inherit
   * @param {Phaser.ParticleStorm.Particle} - The Parent particle to inherit from.
   */
  inherit: function inherit(parent) {
    var inherit = parent.emit.inherit;

    var all = false;

    if (typeof inherit === 'boolean') {
      all = true;
    }

    if (all || inherit.vx || inherit.velocity) {
      this.graph.clone(parent.transform.velocity.x, this.velocity.x);
    }

    if (all || inherit.vy || inherit.velocity) {
      this.graph.clone(parent.transform.velocity.y, this.velocity.y);
    }

    if (all || inherit.facingVelocity) {
      this.graph.clone(parent.transform.velocity.facing, this.velocity.facing);
    }

    if (all || inherit.scaleX || inherit.scale) {
      this.graph.clone(parent.transform.scale.x, this.scale.x);
    }

    if (all || inherit.scaleY || inherit.scale) {
      this.graph.clone(parent.transform.scale.y, this.scale.y);
    }

    if (all || inherit.rotation) {
      this.graph.clone(parent.transform.rotation, this.rotation);
    }

    if (inherit.angularVelocity) {
      var r = (parent.transform.rotation.initial + parent.transform.rotation.value) * Math.PI / 180;
      this.velocity.x.initial = Math.sin(r);
      this.velocity.y.initial = -Math.cos(r);
    }
  },


  /**
   * Called automatically when the parent particle updates. It applies
   * all transform controls to the particle based on its lifespan.
   *
   * @method Phaser.ParticleStorm.Controls.Transform#step
   */
  step: function step() {
    var life = this.particle.life;


    this.scale.x.value += this.scale.x.delta;
    this.scale.y.value += this.scale.y.delta;

    this.rotation.value += this.rotation.delta;

    this.rotation.calc = (this.rotation.initial + this.graph.getValue(this.rotation, life)) * Math.PI / 180;

    this.scale.x.calc = this.scale.x.initial + this.graph.getValue(this.scale.x, life);
    this.scale.y.calc = this.scale.y.initial + this.graph.getValue(this.scale.y, life);

    //  Bail out if fresh
    if (life === 0) {
      return;
    }

    var r = 0;
    var v = 0;

    if (this.acceleration.facing.value !== null) {
      //  Add 90 degrees because particle rotation 0 is right-handed
      this.acceleration.facing.value += this.acceleration.facing.delta;
      r = this.rotation.calc + (90 + this.acceleration.facing.offset) * Math.PI / 180;
      v = this.acceleration.facing.initial + this.graph.getValue(this.acceleration.facing, life);
      this.velocity.x.value += v * Math.sin(r);
      this.velocity.y.value += v * -Math.cos(r);
    }

    this.acceleration.x.value += this.acceleration.x.delta;
    this.acceleration.y.value += this.acceleration.y.delta;

    this.velocity.x.value += this.velocity.x.delta + this.acceleration.x.initial + this.graph.getValue(this.acceleration.x, life);
    this.velocity.y.value += this.velocity.y.delta + this.acceleration.y.initial + this.graph.getValue(this.acceleration.y, life);

    if (this.velocity.facing.value !== null) {
      //  Add 90 degrees because particle rotation 0 is right-handed
      this.velocity.facing.value += this.velocity.facing.delta;
      r = this.rotation.calc + (90 + this.velocity.facing.offset) * Math.PI / 180;
      v = this.velocity.facing.initial + this.graph.getValue(this.velocity.facing, life);
      this.x += v * Math.sin(r);
      this.y += v * -Math.cos(r);
    }

    this.x += this.velocity.x.initial + this.graph.getValue(this.velocity.x, life);
    this.y += this.velocity.y.initial + this.graph.getValue(this.velocity.y, life);
  }
};

Phaser.ParticleStorm.Controls.Transform.prototype.constructor = Phaser.ParticleStorm.Controls.Transform;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

Phaser.ParticleStorm.Renderer = {};

/**
 * The base class which all ParticleStorm renderers must extend.
 *
 * @class Phaser.ParticleStorm.Renderer.Base
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 */
Phaser.ParticleStorm.Renderer.Base = function (emitter) {
  /**
   * @property {Phaser.Game} game - A reference to the Phaser Game instance.
   */
  this.game = emitter.game;

  /**
   * @property {Phaser.ParticleStorm.Emitter} emitter - The emitter that owns this renderer.
   */
  this.emitter = emitter;

  /**
   * @property {Phaser.ParticleStorm} parent - The Particle Storm plugin.
   */
  this.parent = emitter.parent;

  /**
   * The size of a 'pixel' as used by the Pixel renderer and others that extend
   * it. It can be any positive value from 1 up. A value of 2 means a 2x2 pixel,
   * 3 is a 3x3 pixel and so on. At a size of 1 or 2 it uses setPixel to
   * draw to the BitmapData. At 3+ it uses a fillRect operation.
   * @property {integer} pixelSize
   */
  this.pixelSize = 1;
};

Phaser.ParticleStorm.Renderer.Base.prototype = {
  /**
   * Adds this Particle Renderer to the display list.
   *
   * You can specify a Group to add it to. If none is given it will use Phaser.World instead.
   * If this renderer emits particle display objects such as Phaser.Sprites they will be added to the same Group.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#addToWorld
   * @param {Phaser.Group} [group] - The Group to add this renderer to. If not specified Phaser.World is used.
   * @return {Phaser.Image|Phaser.Sprite|Phaser.Group} The display object that contains the particle renderer.
   */
  addToWorld: function addToWorld(group) {
    group.add(this.display);

    return this.display;
  },


  /**
   * The preUpdate method of this renderer.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#preUpdate
   */
  preUpdate: function preUpdate() {},


  /**
   * Adds the given particle to this renderer, to be rendered in the next update.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#add
   * @param {Phaser.ParticleStorm.Particle} particle - Adds a particle to this renderer.
   */
  add: function add() {
    return null;
  },


  /**
   * Updates the given particle within this renderer.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#update
   * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
   */
  update: function update(particle) {
    return particle;
  },


  /**
   * The postUpdate method of this renderer.
   * Called after all updates have taken place, before the render pass.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#postUpdate
   */
  postUpdate: function postUpdate() {},


  /**
   * Kills the given particle from this renderer.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#kill
   * @param {Phaser.ParticleStorm.Particle} particle - The particle to be killed.
   */
  kill: function kill(particle) {
    return particle;
  },


  /**
   * Destroys this renderer.
   *
   * @method Phaser.ParticleStorm.Renderer.Base#destroy
   */
  destroy: function destroy() {
    this.game = null;
  }
};

Phaser.ParticleStorm.Renderer.Base.prototype.constructor = Phaser.ParticleStorm.Renderer.Base;

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Sprite based renderer.
 *
 * @class Phaser.ParticleStorm.Renderer.Sprite
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 */
Phaser.ParticleStorm.Renderer.Sprite = function (emitter) {
  Phaser.ParticleStorm.Renderer.Base.call(this, emitter);

  /**
   * A Phaser.Group that contains all particles created by this renderer.
   * @property {Phaser.Group} display
   */
  this.display = this.game.make.group(null, 'particleStormSpriteRenderer');
};

Phaser.ParticleStorm.Renderer.Sprite.prototype = Object.create(Phaser.ParticleStorm.Renderer.Base.prototype);
Phaser.ParticleStorm.Renderer.Sprite.prototype.constructor = Phaser.ParticleStorm.Renderer.Sprite;

/**
 * Adds the given particle to this renderer. If the particle has a sprite property
 * then its reset and updated. If it doesn't then a new Phaser.Sprite is created,
 * belonging to this renderers display group.
 *
 * @method Phaser.ParticleStorm.Renderer.Sprite#add
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 * @return {Phaser.Sprite} This particles sprite property.
 */
Phaser.ParticleStorm.Renderer.Sprite.prototype.add = function (particle) {
  var spr = particle.sprite;
  var key = particle.texture.key;
  var frame = particle.texture.frame;


  if (frame === undefined && particle.texture.frameName !== undefined) {
    //  String frame
    frame = particle.texture.frameName;
  }

  if (spr) {
    spr.reset(particle.transform.x, particle.transform.y);

    if (spr.key !== key) {
      spr.loadTexture(key, frame);
    } else if (particle.texture.frame !== undefined) {
      spr.frame = frame;
    } else if (particle.texture.frameName !== undefined) {
      spr.frameName = frame;
    }
  } else {
    spr = this.display.create(particle.transform.x, particle.transform.y, key, frame);
  }

  spr.anchor.set(particle.transform.anchor.x, particle.transform.anchor.y);

  if (particle.color.isTinted) {
    spr.tint = particle.color.tint;
  }

  spr.blendMode = particle.color.blendMode[0];
  spr.texture.baseTexture.scaleMode = particle.texture.scaleMode;

  spr.visible = particle.visible;

  particle.sprite = spr;

  return spr;
};

/**
 * Updates and renders the given particle to this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.Sprite#update
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 */
Phaser.ParticleStorm.Renderer.Sprite.prototype.update = function (particle) {
  var spr = particle.sprite;

  //  If the particle is delayed AND should be hidden when delayed ...
  if (particle.delay > 0 && !particle.delayVisible) {
    spr.visible = false;
    return;
  }

  spr.visible = particle.visible;

  spr.alpha = particle.color.alpha.calc;

  spr.rotation = particle.transform.rotation.calc;

  if (particle.color.isTinted) {
    spr.tint = particle.color.tint;
  }

  spr.scale.setTo(particle.transform.scale.x.calc, particle.transform.scale.y.calc);

  spr.x = particle.transform.x;
  spr.y = particle.transform.y;
};

/**
 * Kills the given particle from this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.SpriteBatch#kill
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be killed.
 */
Phaser.ParticleStorm.Renderer.Sprite.prototype.kill = function (particle) {
  if (particle.sprite) {
    particle.sprite.kill();
  }
};

/**
 * Destroys this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.SpriteBatch#destroy
 */
Phaser.ParticleStorm.Renderer.Sprite.prototype.destroy = function () {
  this.display.destroy(true);

  this.emitter = null;

  this.game = null;
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Pixel renderer. This is a special form of the BitmapData renderer which is
 * dedicated to rendering pixel particles, rather than images or sprites.
 *
 * The size of the pixels can be controlled with the `pixelSize` property, which can
 * be changed in real-time.
 *
 * @class Phaser.ParticleStorm.Renderer.Pixel
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 * @param {integer} width - The width of the renderer. Defaults to Game.width.
 * @param {integer} height - The height of the renderer. Defaults to Game.height.
 */
Phaser.ParticleStorm.Renderer.Pixel = function (emitter, width, height) {
  Phaser.ParticleStorm.Renderer.Base.call(this, emitter);

  /**
   * The BitmapData object which is used to render the particles to.
   * @property {Phaser.BitmapData} bmd
   */
  this.bmd = this.game.make.bitmapData(width, height);

  /**
   * A Phaser.Image that has this BitmapData set as its texture.
   * When you add this renderer to the display list it is this image
   * that is added.
   * @property {Phaser.Image} display
   */
  this.display = this.game.make.sprite(0, 0, this.bmd);

  /**
   * If true then this renderer automatically clears itself each update, before
   * new particles are rendered to it. You can disable this and then call the
   * `clear` method directly to control how and when it's cleared.
   * @property {boolean} autoClear
   * @default
   */
  this.autoClear = true;
};

Phaser.ParticleStorm.Renderer.Pixel.prototype = Object.create(Phaser.ParticleStorm.Renderer.Base.prototype);
Phaser.ParticleStorm.Renderer.Pixel.prototype.constructor = Phaser.ParticleStorm.Renderer.Pixel;

/**
 * Resizes the dimensions of the BitmapData used for rendering.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#resize
 * @param {integer} width - The width of the renderer. Defaults to Game.width.
 * @param {integer} height - The height of the renderer. Defaults to Game.height.
 * @return {Phaser.ParticleStorm.Renderer.Pixel} This renderer.
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.resize = function (width, height) {
  this.bmd.resize(width, height);

  return this;
};

/**
 * Clears this BitmapData. An optional `alpha` value allows you to specify
 * the amount of alpha to use when clearing. By setting values lower than 1
 * you can leave behind previous particle images, creating 'trail' like effects.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#clear
 * @param {number} [alpha=1] - The alpha color value, between 0 and 1.
 * @return {Phaser.ParticleStorm.Renderer.Pixel} This renderer.
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.clear = function (alpha) {
  this.bmd.fill(0, 0, 0, alpha);
  this.bmd.update();

  return this;
};

/**
 * The preUpdate method of this renderer. This is called automatically by
 * the Emitter.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#preUpdate
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.preUpdate = function () {
  if (this.autoClear) {
    this.bmd.clear();
    this.bmd.update();
  }
};

/**
 * Updates and renders the given particle to this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#update
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.update = function (particle) {
  //  If the particle is delayed AND should be hidden when delayed ...
  if (particle.delay > 0 && !particle.delayVisible) {
    return;
  }

  //  We need whole numbers to render pixels
  var x = Math.floor(particle.transform.x);
  var y = Math.floor(particle.transform.y);

  var r = particle.color.red.calc;
  var g = particle.color.green.calc;
  var b = particle.color.blue.calc;
  var a = Math.floor(particle.color.alpha.calc * 255);

  if (this.pixelSize > 2) {
    this.bmd.rect(x, y, this.pixelSize, this.pixelSize, particle.color.rgba);
  } else {
    this.bmd.setPixel32(x, y, r, g, b, a, false);

    //  2x2
    if (this.pixelSize === 2) {
      this.bmd.setPixel32(x + 1, y, r, g, b, a, false);
      this.bmd.setPixel32(x, y + 1, r, g, b, a, false);
      this.bmd.setPixel32(x + 1, y + 1, r, g, b, a, false);
    }
  }
};

/**
 * The postUpdate method is called automatically when all particles have
 * been rendered.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#postUpdate
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.postUpdate = function () {
  if (this.pixelSize <= 2) {
    this.bmd.context.putImageData(this.bmd.imageData, 0, 0);
  }

  this.bmd.dirty = true;
};

/**
 * Destroys this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.Pixel#destroy
 */
Phaser.ParticleStorm.Renderer.Pixel.prototype.destroy = function () {
  this.game = null;

  this.display.destroy();

  this.bmd.destroy();
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A BitmapData based renderer. A single BitmapData is created onto which all
 * particles are rendered directly. The renderer can be resized using the resize method.
 *
 * @class Phaser.ParticleStorm.Renderer.BitmapData
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 * @param {integer} width - The width of the renderer. Defaults to Game.width.
 * @param {integer} height - The height of the renderer. Defaults to Game.height.
 */
Phaser.ParticleStorm.Renderer.BitmapData = function (emitter, width, height) {
  Phaser.ParticleStorm.Renderer.Base.call(this, emitter);

  /**
   * The BitmapData object which is used to render the particles to.
   * @property {Phaser.BitmapData} bmd
   */
  this.bmd = this.game.make.bitmapData(width, height);

  /**
   * A Phaser.Image that has this BitmapData set as its texture.
   * When you add this renderer to the display list it is this image
   * that is added.
   * @property {Phaser.Image} display
   */
  this.display = this.game.make.sprite(0, 0, this.bmd);

  /**
   * If true then all pixel coordinates will be rounded before being rendered.
   * This avoids sub-pixel anti-aliasing.
   * @property {boolean} roundPx
   * @default
   */
  this.roundPx = true;

  /**
   * If true then this renderer automatically clears itself each update, before
   * new particles are rendered to it. You can disable this and then call the
   * `clear` method directly to control how and when it's cleared.
   * @property {boolean} autoClear
   * @default
   */
  this.autoClear = true;
};

Phaser.ParticleStorm.Renderer.BitmapData.prototype = Object.create(Phaser.ParticleStorm.Renderer.Base.prototype);
Phaser.ParticleStorm.Renderer.BitmapData.prototype.constructor = Phaser.ParticleStorm.Renderer.BitmapData;

/**
 * Resizes the dimensions of the BitmapData used for rendering.
 *
 * @method Phaser.ParticleStorm.Renderer.BitmapData#resize
 * @param {integer} width - The width of the renderer. Defaults to Game.width.
 * @param {integer} height - The height of the renderer. Defaults to Game.height.
 * @return {Phaser.ParticleStorm.Renderer.BitmapData} This renderer.
 */
Phaser.ParticleStorm.Renderer.BitmapData.prototype.resize = function (width, height) {
  this.bmd.resize(width, height);

  return this;
};

/**
 * Clears this BitmapData. An optional `alpha` value allows you to specify
 * the amount of alpha to use when clearing. By setting values lower than 1
 * you can leave behind previous particle images, creating 'trail' like effects.
 *
 * @method Phaser.ParticleStorm.Renderer.BitmapData#clear
 * @param {number} [alpha=1] - The alpha color value, between 0 and 1.
 * @return {Phaser.ParticleStorm.Renderer.BitmapData} This renderer.
 */
Phaser.ParticleStorm.Renderer.BitmapData.prototype.clear = function (alpha) {
  this.bmd.fill(0, 0, 0, alpha);

  return this;
};

/**
 * The preUpdate method of this renderer. This is called automatically by
 * the Emitter.
 *
 * @method Phaser.ParticleStorm.Renderer.BitmapData#preUpdate
 */
Phaser.ParticleStorm.Renderer.BitmapData.prototype.preUpdate = function () {
  if (this.autoClear) {
    this.bmd.clear();
  }
};

/**
 * Updates and renders the given particle to this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.BitmapData#update
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 */
Phaser.ParticleStorm.Renderer.BitmapData.prototype.update = function (particle) {
  //  If the particle is delayed AND should be hidden when delayed ...
  if (particle.delay > 0 && !particle.delayVisible) {
    return;
  }

  //  We need whole numbers to render pixels
  var t = particle.transform;

  this.bmd.copy(particle.texture.key, 0, 0, null, null, t.x, t.y, null, null, t.rotation.calc, t.anchor.x, t.anchor.y, t.scale.x.calc, t.scale.y.calc, particle.color.alpha.calc, particle.color.blendMode[1], this.roundPx);
};

/**
 * Destroys this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.BitmapData#destroy
 */
Phaser.ParticleStorm.Renderer.BitmapData.prototype.destroy = function () {
  this.game = null;

  this.display.destroy();

  this.bmd.destroy();
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A RenderTexture based renderer. Render Textures are highly optimised (under WebGL)
 * for rendering images to. This renderer works by creating a 'stamp', which takes on
 * the form of each particle and then 'stamps' itself on this RenderTexture. This avoids
 * each particle needing to have its own sprite instance.
 *
 * @class Phaser.ParticleStorm.Renderer.RenderTexture
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 * @param {integer} width - The width of the renderer. Defaults to Game.width.
 * @param {integer} height - The height of the renderer. Defaults to Game.height.
 */
Phaser.ParticleStorm.Renderer.RenderTexture = function (emitter, width, height) {
  Phaser.ParticleStorm.Renderer.Base.call(this, emitter);

  /**
   * The RenderTexture object which is used to render the particles to.
   * @property {Phaser.RenderTexture} renderTexture
   */
  this.renderTexture = this.game.make.renderTexture(width, height);

  /**
   * A Phaser.Image that has this RenderTexture set as its texture.
   * When you add this renderer to the display list it is this image
   * that is added.
   * @property {Phaser.Image} display
   */
  this.display = this.game.make.sprite(0, 0, this.renderTexture);

  /**
   * A Phaser.Image that is used as the stamp for this RenderTexture. When a
   * particle is rendered to this RenderTexture the stamp takes on the texture
   * and form of the particle, then 'stamps' itself on the RenderTexture.
   * @property {Phaser.Image} stamp
   * @protected
   */
  this.stamp = this.game.make.sprite(0, 0);

  /**
   * If true then this renderer automatically clears itself each update, before
   * new particles are rendered to it. You can disable this and then call the
   * `clear` method directly to control how and when it's cleared.
   * @property {boolean} autoClear
   * @default
   */
  this.autoClear = true;
};

Phaser.ParticleStorm.Renderer.RenderTexture.prototype = Object.create(Phaser.ParticleStorm.Renderer.Base.prototype);
Phaser.ParticleStorm.Renderer.RenderTexture.prototype.constructor = Phaser.ParticleStorm.Renderer.RenderTexture;

/**
 * Clears the RenderTexture being used by this renderer. This happens automatically
 * if `autoClear` is enabled.
 *
 * @method Phaser.ParticleStorm.Renderer.RenderTexture#clear
 */
Phaser.ParticleStorm.Renderer.RenderTexture.prototype.clear = function () {
  this.renderTexture.clear();
};

/**
 * The preUpdate method of this renderer. This is called automatically by
 * the Emitter.
 *
 * @method Phaser.ParticleStorm.Renderer.RenderTexture#preUpdate
 */
Phaser.ParticleStorm.Renderer.RenderTexture.prototype.preUpdate = function () {
  if (this.autoClear) {
    this.renderTexture.clear();
  }
};

/**
 * Updates and renders the given particle to this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.RenderTexture#update
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 */
Phaser.ParticleStorm.Renderer.RenderTexture.prototype.update = function (particle) {
  //  If the particle is delayed AND should be hidden when delayed ...
  if (particle.delay > 0 && !particle.delayVisible || !particle.visible || particle.color.alpha.calc === 0) {
    return;
  }

  //  Transfer settings to the drawing object
  var key = particle.texture.key;
  var frame = particle.texture.frame;


  if (frame === undefined && particle.texture.frameName !== undefined) {
    //  String frame
    frame = particle.texture.frameName;
  }

  if (this.stamp.key !== key) {
    this.stamp.loadTexture(key, frame);
  } else if (particle.texture.frame !== undefined) {
    this.stamp.frame = frame;
  } else if (particle.texture.frameName !== undefined) {
    this.stamp.frameName = frame;
  }

  this.stamp.anchor.set(particle.transform.anchor.x, particle.transform.anchor.y);

  this.stamp.alpha = particle.color.alpha.calc;

  this.stamp.rotation = particle.transform.rotation.calc;

  if (particle.color.isTinted) {
    this.stamp.tint = particle.color.tint;
  }

  this.stamp.blendMode = particle.color.blendMode[0];

  this.stamp.texture.baseTexture.scaleMode = particle.texture.scaleMode;

  this.stamp.scale.setTo(particle.transform.scale.x.calc, particle.transform.scale.y.calc);

  this.renderTexture.renderXY(this.stamp, particle.transform.x, particle.transform.y, false);
};

/**
 * Destroys this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.RenderTexture#destroy
 */
Phaser.ParticleStorm.Renderer.RenderTexture.prototype.destroy = function () {
  this.display.destroy();

  this.stamp.destroy();

  this.renderTexture.destroy();

  this.emitter = null;

  this.game = null;
};

/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2015 Photon Storm Ltd.
 * @license      {@link http://choosealicense.com/licenses/no-license/|No License}
 */

/**
 * A Sprite Batch based renderer. Sprite Batching is a way to get extremely fast
 * drawing, especially under WebGL, by batching the particles together and reducing
 * the quantity of draw calls. It only works when every particle uses the exact same
 * Texture. If you have particles with varying textures then they will break the batch,
 * nullifying the effect of its speed. You can use texture atlases to combine different
 * frames into a single batch, but the core texture must be the same for all particles.
 *
 * @class Phaser.ParticleStorm.Renderer.SpriteBatch
 * @constructor
 * @param {Phaser.ParticleStorm.Emitter} emitter - The emitter that this renderer belongs to.
 */
Phaser.ParticleStorm.Renderer.SpriteBatch = function (emitter) {
  Phaser.ParticleStorm.Renderer.Base.call(this, emitter);

  /**
   * A Phaser.SpriteBatch that contains all of the particles in this renderer.
   * @property {Phaser.SpriteBatch} display
   */
  this.display = this.game.make.spriteBatch();
};

Phaser.ParticleStorm.Renderer.SpriteBatch.prototype = Object.create(Phaser.ParticleStorm.Renderer.Base.prototype);
Phaser.ParticleStorm.Renderer.SpriteBatch.prototype.constructor = Phaser.ParticleStorm.Renderer.SpriteBatch;

/**
 * Adds the given particle to this renderer. If the particle has a sprite property
 * then its reset and updated. If it doesn't then a new Phaser.Sprite is created,
 * belonging to this renderers display.
 *
 * @method Phaser.ParticleStorm.Renderer.SpriteBatch#add
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 * @return {Phaser.Sprite} This particles sprite property.
 */
Phaser.ParticleStorm.Renderer.SpriteBatch.prototype.add = function (particle) {
  var spr = particle.sprite;
  var key = particle.texture.key;
  var frame = particle.texture.frame;


  if (frame === undefined && particle.texture.frameName !== undefined) {
    //  String frame
    frame = particle.texture.frameName;
  }

  if (spr) {
    spr.reset(particle.transform.x, particle.transform.y);

    if (spr.key !== key) {
      spr.loadTexture(key, frame);
    } else if (particle.texture.frame !== undefined) {
      spr.frame = frame;
    } else if (particle.texture.frameName !== undefined) {
      spr.frameName = frame;
    }
  } else {
    spr = this.game.make.sprite(particle.transform.x, particle.transform.y, key, frame);
  }

  this.display.addChild(spr);

  spr.anchor.set(particle.transform.anchor.x, particle.transform.anchor.y);

  if (particle.color.isTinted) {
    spr.tint = particle.color.tint;
  }

  spr.blendMode = particle.color.blendMode[0];
  spr.texture.baseTexture.scaleMode = particle.texture.scaleMode;

  spr.visible = particle.visible;

  particle.sprite = spr;

  return spr;
};

/**
 * Updates and renders the given particle to this renderer.
 *
 * @method Phaser.ParticleStorm.Renderer.SpriteBatch#update
 * @param {Phaser.ParticleStorm.Particle} particle - The particle to be updated.
 */
Phaser.ParticleStorm.Renderer.SpriteBatch.prototype.update = function (particle) {
  var spr = particle.sprite;

  //  If the particle is delayed AND should be hidden when delayed ...
  if (particle.delay > 0 && !particle.delayVisible) {
    spr.visible = false;
    return;
  }

  spr.visible = particle.visible;

  spr.alpha = particle.color.alpha.calc;

  spr.rotation = particle.transform.rotation.calc;

  if (particle.color.isTinted) {
    spr.tint = particle.color.tint;
  }

  spr.scale.setTo(particle.transform.scale.x.calc, particle.transform.scale.y.calc);

  spr.x = particle.transform.x;
  spr.y = particle.transform.y;
};

Phaser.ParticleStorm.Renderer.SpriteBatch.prototype.kill = function (particle) {
  if (particle.sprite) {
    particle.sprite.kill();
  }
};

Phaser.ParticleStorm.Renderer.SpriteBatch.prototype.destroy = function () {
  this.display.destroy(true);

  this.emitter = null;

  this.game = null;
};

},{}],140:[function(require,module,exports){
'use strict';

var _startupCommand = require('./commands/startup-command');

var _fontLoader = require('./display/font-loader');

var _fontLoader2 = _interopRequireDefault(_fontLoader);

var _layoutUtils = require('./display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _globals = require('./kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

require('./lib/particle-storm');

var _gameState = require('./states/game-state');

var _preloaderState = require('./states/preloader-state');

require('./strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.CI_API = window.CI_API || {
  states: {},
  PreloaderState: _preloaderState.PreloaderState,
  GameState: _gameState.GameState,
  FontLoader: _fontLoader2.default,
  LU: _layoutUtils2.default,
  CTA: null, // define CTA later
  Globals: _globals2.default,
  renderer: 1 /* 0 - Auto | << 1 - Canvas >> | 2 - WebGL */
};

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, '100%', '100%', CI_API.renderer, _layoutUtils2.default.CONTAINER_NAME, null));
  }

  return Game;
}(Phaser.Game);

/* Load our font resources and create a new game */


window.ad_begin = function () {
  _fontLoader2.default.loadFonts(function () {
    /**
     * Create new game after initializing all information about loading modules.
     * xp-assets.json is loaded as independent file in the -preview mode.
     * May define the CTA class here as a CTA xp module.
     */
    xp.init(_globals2.default.WEB_ROOT, function () {
      // CI_API.CTA = xp.getActiveModule('cta_style', CTAView);
      // @ts-ignore
      CI_API.game = new Game();
      setTimeout(function () {
        // legologger.start(legoLoggerConfig);
        (0, _startupCommand.startupCommand)();
      });
    });
  });
};

},{"./commands/startup-command":77,"./display/font-loader":108,"./display/layout-utils":109,"./kernel/globals":137,"./lib/particle-storm":139,"./states/game-state":190,"./states/preloader-state":191,"./strings":192}],141:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../constants');

var _observableModel = require('../observable-model');

var _ctaModel = require('./cta-model');

var _hintModel = require('./hint-model');

var _loadModel = require('./load-model');

var _persistentCtaModel = require('./persistent-cta-model');

var _soundModel = require('./sound-model');

var _tutorialModel = require('./tutorial-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdModel = exports.AdModel = function (_ObservableModel) {
  _inherits(AdModel, _ObservableModel);

  function AdModel() {
    _classCallCheck(this, AdModel);

    var _this = _possibleConstructorReturn(this, (AdModel.__proto__ || Object.getPrototypeOf(AdModel)).call(this, 'AdModel'));

    _this._cta = null;
    _this._hint = null;
    _this._load = null;
    _this._sound = null;
    _this._tutorial = null;
    _this._persistentCta = null;
    _this._status = _constants.AdStatus.Unknown;
    _this._viewState = _constants.AdViewState.Unknown;
    _this._retries = CI_API.Globals.PARAMS.retries;

    _this.makeObservable();
    return _this;
  }

  _createClass(AdModel, [{
    key: 'initialize',
    value: function initialize() {
      this._load = new _loadModel.LoadModel();
    }

    // CTA

  }, {
    key: 'initializeCtaModel',
    value: function initializeCtaModel() {
      this._cta = new _ctaModel.CtaModel();
      this._cta.initialize();
    }
  }, {
    key: 'destroyCtaModel',
    value: function destroyCtaModel() {
      this._cta.destroy();
      this._cta = null;
    }

    // HINT

  }, {
    key: 'initializeHintModel',
    value: function initializeHintModel() {
      this._hint = new _hintModel.HintModel();
      this._hint.initialize();
    }
  }, {
    key: 'destroyHintModel',
    value: function destroyHintModel() {
      this._hint.destroy();
      this._hint = null;
    }

    // LOAD

  }, {
    key: 'initializeLoadModel',
    value: function initializeLoadModel() {
      this._load = new _loadModel.LoadModel();
      this._load.initialize();
    }
  }, {
    key: 'destroyLoadModel',
    value: function destroyLoadModel() {
      this._load.destroy();
      this._load = null;
    }

    // TUTORIAL

  }, {
    key: 'initializeTutorialModel',
    value: function initializeTutorialModel() {
      this._tutorial = new _tutorialModel.TutorialModel();
      this._tutorial.initialize();
    }
  }, {
    key: 'destroyTutorialModel',
    value: function destroyTutorialModel() {
      this._tutorial.destroy();
      this._tutorial = null;
    }

    // PERSISTENT_CTA

  }, {
    key: 'initializePersistentCtaModel',
    value: function initializePersistentCtaModel() {
      this._persistentCta = new _persistentCtaModel.PersistentCtaModel();
      this._persistentCta.initialize();
    }
  }, {
    key: 'destroyPersistentCtaModel',
    value: function destroyPersistentCtaModel() {
      this._persistentCta.destroy();
      this._persistentCta = null;
    }

    // SOUND;

  }, {
    key: 'initializeSoundModel',
    value: function initializeSoundModel() {
      this._sound = new _soundModel.SoundModel();
      this._sound.initialize();
    }
  }, {
    key: 'destroySoundModel',
    value: function destroySoundModel() {
      this._sound.destroy();
      this._sound = null;
    }
  }, {
    key: 'decreaseRetriesCount',
    value: function decreaseRetriesCount() {
      this._retries -= 1;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    },
    set: function set(value) {
      this._status = value;
    }
  }, {
    key: 'viewState',
    get: function get() {
      return this._viewState;
    },
    set: function set(value) {
      this._viewState = value;
    }
  }, {
    key: 'load',
    get: function get() {
      return this._load;
    }
  }, {
    key: 'hint',
    get: function get() {
      return this._hint;
    }
  }, {
    key: 'tutorial',
    get: function get() {
      return this._tutorial;
    }
  }, {
    key: 'persistentCta',
    get: function get() {
      return this._persistentCta;
    }
  }, {
    key: 'cta',
    get: function get() {
      return this._cta;
    }
  }, {
    key: 'sound',
    get: function get() {
      return this._sound;
    }
  }, {
    key: 'retries',
    get: function get() {
      return this._retries;
    }
  }]);

  return AdModel;
}(_observableModel.ObservableModel);

},{"../../constants":107,"../observable-model":156,"./cta-model":142,"./hint-model":143,"./load-model":144,"./persistent-cta-model":145,"./sound-model":146,"./tutorial-model":147}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CtaModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ctaTypesDependsOnRea;

var _constants = require('../../constants');

var _utils = require('../../utils');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ctaTypesDependsOnReason = (_ctaTypesDependsOnRea = {}, _defineProperty(_ctaTypesDependsOnRea, _constants.GameOverReasons.Idled, 'standard'), _defineProperty(_ctaTypesDependsOnRea, _constants.GameOverReasons.ItemsToCtaReached, 'standard'), _ctaTypesDependsOnRea);

var CtaModel = exports.CtaModel = function (_ObservableModel) {
  _inherits(CtaModel, _ObservableModel);

  function CtaModel() {
    _classCallCheck(this, CtaModel);

    var _this = _possibleConstructorReturn(this, (CtaModel.__proto__ || Object.getPrototypeOf(CtaModel)).call(this, 'CtaModel'));

    _this._type = null;
    _this._visible = null;
    _this._preVisible = null;
    _this._reason = _constants.GameOverReasons.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(CtaModel, [{
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._visibilityDelayTimer);
    }
  }, {
    key: 'show',
    value: function show(reason) {
      var _this2 = this;

      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._reason = reason;
      this._preVisible = true;
      this._type = ctaTypesDependsOnReason[reason]; // || CI_API.Globals.PARAMS.cta_type;

      (0, _utils.removeRunnable)(this._visibilityDelayTimer);
      this._visibilityDelayTimer = (0, _utils.delayRunnable)(delay, function () {
        _this2._visible = true;
      });
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }, {
    key: 'reason',
    get: function get() {
      return this._reason;
    }
  }, {
    key: 'preVisible',
    get: function get() {
      return this._preVisible;
    }
  }, {
    key: 'visible',
    get: function get() {
      return this._visible;
    }
  }]);

  return CtaModel;
}(_observableModel.ObservableModel);

},{"../../constants":107,"../../utils":199,"../observable-model":156}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HintModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../utils');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HintModel = exports.HintModel = function (_ObservableModel) {
  _inherits(HintModel, _ObservableModel);

  function HintModel() {
    _classCallCheck(this, HintModel);

    var _this = _possibleConstructorReturn(this, (HintModel.__proto__ || Object.getPrototypeOf(HintModel)).call(this, 'HintModel'));

    _this._visible = false;
    _this.makeObservable();
    return _this;
  }

  _createClass(HintModel, [{
    key: 'destroy',
    value: function destroy() {
      this.stopVisibilityTimer();
    }
  }, {
    key: 'startVisibilityTimer',
    value: function startVisibilityTimer() {
      var _this2 = this;

      this._visibilityTimer = (0, _utils.delayRunnable)(CI_API.Globals.PARAMS.hint_on_idle, function () {
        _this2._visible = true;
      });
    }
  }, {
    key: 'stopVisibilityTimer',
    value: function stopVisibilityTimer() {
      (0, _utils.removeRunnable)(this._visibilityTimer);
      this._visibilityTimer = null;
    }
  }, {
    key: 'visible',
    get: function get() {
      return this._visible;
    },
    set: function set(value) {
      this._visible = value;
      this.stopVisibilityTimer();
    }
  }, {
    key: 'timerAlreadyStarted',
    get: function get() {
      return this._visibilityTimer;
    }
  }]);

  return HintModel;
}(_observableModel.ObservableModel);

},{"../../utils":199,"../observable-model":156}],144:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadModel = exports.LoadModel = function (_ObservableModel) {
  _inherits(LoadModel, _ObservableModel);

  function LoadModel() {
    _classCallCheck(this, LoadModel);

    var _this = _possibleConstructorReturn(this, (LoadModel.__proto__ || Object.getPrototypeOf(LoadModel)).call(this, 'LoadModel'));

    _this._progress = 0;
    _this._complete = false;
    _this.makeObservable();
    return _this;
  }

  _createClass(LoadModel, [{
    key: 'progress',
    get: function get() {
      return this._progress;
    },
    set: function set(value) {
      this._progress = value;
    }
  }, {
    key: 'complete',
    get: function get() {
      return this._complete;
    },
    set: function set(value) {
      this._complete = value;
    }
  }]);

  return LoadModel;
}(_observableModel.ObservableModel);

},{"../observable-model":156}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentCtaModel = undefined;

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PersistentCtaModel = exports.PersistentCtaModel = function (_ObservableModel) {
  _inherits(PersistentCtaModel, _ObservableModel);

  function PersistentCtaModel() {
    _classCallCheck(this, PersistentCtaModel);

    return _possibleConstructorReturn(this, (PersistentCtaModel.__proto__ || Object.getPrototypeOf(PersistentCtaModel)).call(this, 'PersistentCtaModel'));
  }

  return PersistentCtaModel;
}(_observableModel.ObservableModel);

},{"../observable-model":156}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../constants');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundModel = exports.SoundModel = function (_ObservableModel) {
  _inherits(SoundModel, _ObservableModel);

  function SoundModel() {
    _classCallCheck(this, SoundModel);

    var _this = _possibleConstructorReturn(this, (SoundModel.__proto__ || Object.getPrototypeOf(SoundModel)).call(this, 'SoundModel'));

    _this._state = _constants.SoundState.Unknown;
    _this._icon = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(SoundModel, [{
    key: 'initialize',
    value: function initialize() {
      this._icon = CI_API.Globals.PARAMS.sound_icon;
      this._state = _constants.SoundState.On;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      this._state = value;
    }
  }, {
    key: 'icon',
    get: function get() {
      return this._icon;
    },
    set: function set(value) {
      this._icon = value;
    }
  }]);

  return SoundModel;
}(_observableModel.ObservableModel);

},{"../../constants":107,"../observable-model":156}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tutorialConfig = require('../../configs/tutorial-config');

var _utils = require('../../utils');

var _observableModel = require('../observable-model');

var _tutorialSequenceModel = require('./tutorial-sequence-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TutorialModel = exports.TutorialModel = function (_ObservableModel) {
  _inherits(TutorialModel, _ObservableModel);

  function TutorialModel() {
    _classCallCheck(this, TutorialModel);

    var _this = _possibleConstructorReturn(this, (TutorialModel.__proto__ || Object.getPrototypeOf(TutorialModel)).call(this, 'TutorialModel'));

    _this._complete = false;
    _this._skip = false;
    _this._sequences = null;
    _this._currentIndex = null;
    _this._sequenceCompleteTimer = null;

    _this.makeObservable('_complete', '_skip', '_currentIndex');
    return _this;
  }

  _createClass(TutorialModel, [{
    key: 'getSequenceByUuid',
    value: function getSequenceByUuid(uuid) {
      return this._sequences.find(function (sequence) {
        return sequence.uuid === uuid;
      });
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      _get(TutorialModel.prototype.__proto__ || Object.getPrototypeOf(TutorialModel.prototype), 'initialize', this).call(this);

      this._initSequences();

      this.nextSequence();
      this.showSequence();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._stopSequenceCompleteTimer();
      _get(TutorialModel.prototype.__proto__ || Object.getPrototypeOf(TutorialModel.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'nextSequence',
    value: function nextSequence() {
      this.current && this.completeSequence();
      this._currentIndex = this.current ? this._currentIndex + 1 : 0;
    }
  }, {
    key: 'showSequence',
    value: function showSequence() {
      this.current.show = true;
      this._startSequenceCompleteTimer();
    }
  }, {
    key: 'completeSequence',
    value: function completeSequence() {
      this.current.complete = true;
      this._stopSequenceCompleteTimer();
    }
  }, {
    key: '_initSequences',
    value: function _initSequences() {
      this._sequences = (0, _tutorialConfig.getTutorialConfig)().map(function (config, index) {
        return new _tutorialSequenceModel.TutorialSequenceModel(config, index);
      });
    }
  }, {
    key: '_startSequenceCompleteTimer',
    value: function _startSequenceCompleteTimer() {
      var duration = this.current.config.duration;


      if (duration !== -1) {
        this._sequenceCompleteTimer = (0, _utils.delayRunnable)(duration, this.completeSequence, this);
      }
    }
  }, {
    key: '_stopSequenceCompleteTimer',
    value: function _stopSequenceCompleteTimer() {
      (0, _utils.removeRunnable)(this._sequenceCompleteTimer);
    }
  }, {
    key: 'complete',
    get: function get() {
      return this._complete;
    },
    set: function set(value) {
      this._complete = value;
    }
  }, {
    key: 'skip',
    get: function get() {
      return this._skip;
    },
    set: function set(value) {
      this._skip = value;
    }
  }, {
    key: 'sequences',
    get: function get() {
      return this._sequences;
    }
  }, {
    key: 'current',
    get: function get() {
      return this._sequences[this._currentIndex];
    }
  }, {
    key: 'currentIndex',
    get: function get() {
      return this._currentIndex;
    }
  }]);

  return TutorialModel;
}(_observableModel.ObservableModel);

},{"../../configs/tutorial-config":106,"../../utils":199,"../observable-model":156,"./tutorial-sequence-model":148}],148:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialSequenceModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TutorialSequenceModel = exports.TutorialSequenceModel = function (_ObservableModel) {
  _inherits(TutorialSequenceModel, _ObservableModel);

  function TutorialSequenceModel(config, index) {
    _classCallCheck(this, TutorialSequenceModel);

    var _this = _possibleConstructorReturn(this, (TutorialSequenceModel.__proto__ || Object.getPrototypeOf(TutorialSequenceModel)).call(this, 'TutorialSequenceModel'));

    _this._index = index;
    _this._config = config;
    _this._complete = false;
    _this._show = false;

    _this.makeObservable('_complete', '_show');
    return _this;
  }

  _createClass(TutorialSequenceModel, [{
    key: 'config',
    get: function get() {
      return this._config;
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }, {
    key: 'complete',
    get: function get() {
      return this._complete;
    },
    set: function set(value) {
      this._complete = value;
    }
  }, {
    key: 'show',
    get: function get() {
      return this._show;
    },
    set: function set(value) {
      this._show = value;
    }
  }]);

  return TutorialSequenceModel;
}(_observableModel.ObservableModel);

},{"../observable-model":156}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boardConfig = require('../../../configs/board-config');

var _constants = require('../../../constants');

var _utils = require('../../../utils');

var _observableModel = require('../../observable-model');

var _padModel = require('./pad-model');

var _soundPartModel = require('./sound-part-model');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoardModel = exports.BoardModel = function (_ObservableModel) {
  _inherits(BoardModel, _ObservableModel);

  function BoardModel() {
    _classCallCheck(this, BoardModel);

    var _this = _possibleConstructorReturn(this, (BoardModel.__proto__ || Object.getPrototypeOf(BoardModel)).call(this, 'BoardModel'));

    _this._pads = [];
    _this._playSequence = [];
    _this._autoPlaySounds = [];
    _this._simulationSequence = [];
    _this._sequence = null;
    _this._state = _constants.BoardState.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(BoardModel, [{
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._simulateRunnable);
      this._simulateRunnable = null;

      _get(BoardModel.prototype.__proto__ || Object.getPrototypeOf(BoardModel.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'getPadByUuid',
    value: function getPadByUuid(uuid) {
      return this._pads.find(function (p) {
        return p.uuid === uuid;
      });
    }
  }, {
    key: 'getPadBySound',
    value: function getPadBySound(sound) {
      return this._pads.find(function (p) {
        return p.sound === sound;
      });
    }
  }, {
    key: 'getPadByPosition',
    value: function getPadByPosition(row, column) {
      return this._pads.find(function (p) {
        return p.row === row && p.column === column;
      });
    }
  }, {
    key: 'getAutoPlaySoundByUuid',
    value: function getAutoPlaySoundByUuid(uuid) {
      return this._autoPlaySounds.find(function (p) {
        return p.uuid === uuid;
      });
    }
  }, {
    key: 'getSimulationSoundByUuid',
    value: function getSimulationSoundByUuid(uuid) {
      return this._simulationSequence.find(function (p) {
        return p.uuid === uuid;
      });
    }
  }, {
    key: 'getSimulationSoundByState',
    value: function getSimulationSoundByState(state) {
      return this._simulationSequence.find(function (p) {
        return p.state === state;
      });
    }
  }, {
    key: 'simulate',
    value: function simulate() {
      var _this2 = this;

      var delay = 500;

      this._simulateRunnable = (0, _utils.delayRunnable)(delay, function () {
        _this2._state = _constants.BoardState.Simulation;
      });
    }
  }, {
    key: 'resetAutoPlaySounds',
    value: function resetAutoPlaySounds() {
      this._autoPlaySounds = [];

      this._initializeAutoPlaySounds();
    }
  }, {
    key: 'resetPlaySequence',
    value: function resetPlaySequence() {
      this._playSequence = [];

      this._initializePlaySequence();
    }
  }, {
    key: 'resetSimulationSequence',
    value: function resetSimulationSequence() {
      this._simulationSequence = [];

      this._initializeSimulationSequence();
    }
  }, {
    key: 'addPad',
    value: function addPad(config) {
      var row = config.row,
          column = config.column,
          color = config.color,
          sound = config.sound;

      var pad = new _padModel.PadModel(row, column, color, sound);

      this._pads = [].concat(_toConsumableArray(this._pads), [pad]);

      pad.initialize();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this._sequence = 0;

      this._initializePads();
      this._initializeAutoPlaySounds();
      this._initializePlaySequence();
      this._initializeSimulationSequence();

      this._state = _constants.BoardState.Idle;
    }
  }, {
    key: '_initializePads',
    value: function _initializePads() {
      var padConfig = (0, _boardConfig.getPadsConfig)();

      for (var i = 0; i < padConfig.length; i += 1) {
        var row = padConfig[i];
        for (var j = 0; j < row.length; j += 1) {
          this.addPad(row[j]);
        }
      }
    }
  }, {
    key: '_initializeAutoPlaySounds',
    value: function _initializeAutoPlaySounds() {
      var tutorial = CI_API.Globals.PARAMS.tutorial;

      var soundPartsConfig = (0, _boardConfig.getAutoPlaySoundPartsConfig)();
      var arr = [];

      for (var i = 0; i < soundPartsConfig[this._sequence].length; i += 1) {
        var _soundPartsConfig$_se = soundPartsConfig[this._sequence][i],
            name = _soundPartsConfig$_se.name,
            startTime = _soundPartsConfig$_se.startTime;

        var part = new _soundPartModel.SoundPartModel(name, startTime);

        arr.push(part);
      }

      var a = [];
      soundPartsConfig.forEach(function (s) {
        var b = [];
        for (var _i = 0; _i < s.length; _i += 1) {
          var _s$_i = s[_i],
              name = _s$_i.name,
              startTime = _s$_i.startTime;

          var _part = new _soundPartModel.SoundPartModel(name, startTime);
          _part.initialize();

          b.push(_part);
        }
        a = [].concat(_toConsumableArray(a), b);
      });

      tutorial ? this._autoPlaySounds = [].concat(arr) : this._autoPlaySounds = [].concat(_toConsumableArray(a));
    }
  }, {
    key: '_initializePlaySequence',
    value: function _initializePlaySequence() {
      var tutorial = CI_API.Globals.PARAMS.tutorial;

      var sequences = (0, _boardConfig.getPlaySequence)();
      var arr = [];

      for (var i = 0; i < sequences[this._sequence].length; i += 1) {
        var _sequences$_sequence$ = sequences[this._sequence][i],
            name = _sequences$_sequence$.name,
            startTime = _sequences$_sequence$.startTime;

        var part = new _soundPartModel.SoundPartModel(name, startTime);

        arr.push(part);
      }

      var a = [];
      sequences.forEach(function (s) {
        var b = [];
        for (var _i2 = 0; _i2 < s.length; _i2 += 1) {
          var _s$_i2 = s[_i2],
              name = _s$_i2.name,
              startTime = _s$_i2.startTime;

          var _part2 = new _soundPartModel.SoundPartModel(name, startTime);
          _part2.initialize();

          b.push(_part2);
        }
        a = [].concat(_toConsumableArray(a), b);
      });

      tutorial ? this._playSequence = [].concat(arr) : this._playSequence = [].concat(_toConsumableArray(a));
    }
  }, {
    key: '_initializeSimulationSequence',
    value: function _initializeSimulationSequence() {
      var tutorial = CI_API.Globals.PARAMS.tutorial;

      var sequences = (0, _boardConfig.getPlaySequence)();
      var arr = [];

      for (var i = 0; i < sequences[this._sequence].length; i += 1) {
        var _sequences$_sequence$2 = sequences[this._sequence][i],
            name = _sequences$_sequence$2.name,
            startTime = _sequences$_sequence$2.startTime;

        var part = new _soundPartModel.SoundPartModel(name, startTime);
        part.initialize();

        arr.push(part);
      }

      var a = [];
      sequences.forEach(function (s) {
        var b = [];
        for (var _i3 = 0; _i3 < s.length; _i3 += 1) {
          var _s$_i3 = s[_i3],
              name = _s$_i3.name,
              startTime = _s$_i3.startTime;

          var _part3 = new _soundPartModel.SoundPartModel(name, startTime);
          _part3.initialize();

          b.push(_part3);
        }
        a = [].concat(_toConsumableArray(a), b);
      });

      tutorial ? this._simulationSequence = [].concat(arr) : this._simulationSequence = [].concat(_toConsumableArray(a));
    }
  }, {
    key: 'pads',
    get: function get() {
      return this._pads;
    }
  }, {
    key: 'playSequence',
    get: function get() {
      return this._playSequence;
    }
  }, {
    key: 'autoPlaySounds',
    get: function get() {
      return this._autoPlaySounds;
    }
  }, {
    key: 'simulationSequence',
    get: function get() {
      return this._simulationSequence;
    }
  }, {
    key: 'sequence',
    get: function get() {
      return this._sequence;
    },
    set: function set(value) {
      this._sequence = value;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      this._state = value;
    }
  }]);

  return BoardModel;
}(_observableModel.ObservableModel);

},{"../../../configs/board-config":87,"../../../constants":107,"../../../utils":199,"../../observable-model":156,"./pad-model":150,"./sound-part-model":151}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PadModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _observableModel = require('../../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PadModel = exports.PadModel = function (_ObservableModel) {
  _inherits(PadModel, _ObservableModel);

  function PadModel(row, column, color, sound) {
    _classCallCheck(this, PadModel);

    var _this = _possibleConstructorReturn(this, (PadModel.__proto__ || Object.getPrototypeOf(PadModel)).call(this, 'PadModel'));

    _this._row = row;
    _this._column = column;
    _this._color = color;
    _this._sound = sound;
    _this._state = _constants.PadState.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(PadModel, [{
    key: 'idle',
    value: function idle() {
      this._state = _constants.PadState.Idle;
    }
  }, {
    key: 'block',
    value: function block() {
      this._state = _constants.PadState.Blocked;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._state = _constants.PadState.Enabled;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._state = _constants.PadState.Disabled;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this._state = _constants.PadState.Blocked;
    }
  }, {
    key: 'row',
    get: function get() {
      return this._row;
    }
  }, {
    key: 'column',
    get: function get() {
      return this._column;
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color;
    }
  }, {
    key: 'sound',
    get: function get() {
      return this._sound;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      this._state = value;
    }
  }]);

  return PadModel;
}(_observableModel.ObservableModel);

},{"../../../constants":107,"../../observable-model":156}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundPartModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _observableModel = require('../../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundPartModel = exports.SoundPartModel = function (_ObservableModel) {
  _inherits(SoundPartModel, _ObservableModel);

  function SoundPartModel(name, startTime) {
    _classCallCheck(this, SoundPartModel);

    var _this = _possibleConstructorReturn(this, (SoundPartModel.__proto__ || Object.getPrototypeOf(SoundPartModel)).call(this, 'SoundPartModel'));

    _this._name = name;
    _this._startTime = startTime;
    _this._state = _constants.SoundPartState.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(SoundPartModel, [{
    key: 'initialize',
    value: function initialize() {
      this._state = _constants.SoundPartState.Idle;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'startTime',
    get: function get() {
      return this._startTime;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      this._state = value;
    }
  }]);

  return SoundPartModel;
}(_observableModel.ObservableModel);

},{"../../../constants":107,"../../observable-model":156}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../constants');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DotModel = exports.DotModel = function (_ObservableModel) {
  _inherits(DotModel, _ObservableModel);

  function DotModel() {
    _classCallCheck(this, DotModel);

    var _this = _possibleConstructorReturn(this, (DotModel.__proto__ || Object.getPrototypeOf(DotModel)).call(this, 'DotModel'));

    _this._state = _constants.DotState.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(DotModel, [{
    key: 'initialize',
    value: function initialize() {
      this._state = _constants.DotState.Idle;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    },
    set: function set(value) {
      this._state = value;
    }
  }]);

  return DotModel;
}(_observableModel.ObservableModel);

},{"../../constants":107,"../observable-model":156}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observableModel = require('../observable-model');

var _boardModel = require('./board/board-model');

var _progressBarModel = require('./progress-bar-model');

var _timerModel = require('./timer-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameModel = exports.GameModel = function (_ObservableModel) {
  _inherits(GameModel, _ObservableModel);

  function GameModel() {
    _classCallCheck(this, GameModel);

    var _this = _possibleConstructorReturn(this, (GameModel.__proto__ || Object.getPrototypeOf(GameModel)).call(this, 'GameModel'));

    _this._boardModel = null;
    _this._timerModel = null;
    _this._progressBarModel = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(GameModel, [{
    key: 'initializeTimer',
    value: function initializeTimer() {
      this._initializeTimerModel();
    }
  }, {
    key: 'destroyTimer',
    value: function destroyTimer() {
      this._destroyTimerModel();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this._initializeBoardModel();
      this._initializeTimerModel();
      this._initializeProgressBarModel();
    }
  }, {
    key: '_initializeBoardModel',
    value: function _initializeBoardModel() {
      this._boardModel = new _boardModel.BoardModel();
      this._boardModel.initialize();
    }
  }, {
    key: '_destroyBoardModel',
    value: function _destroyBoardModel() {
      this._boardModel.destroy();
      this._boardModel = null;
    }
  }, {
    key: '_initializeTimerModel',
    value: function _initializeTimerModel() {
      this._timerModel = new _timerModel.TimerModel();
      this._timerModel.initialize();
    }
  }, {
    key: '_destroyTimerModel',
    value: function _destroyTimerModel() {
      this._timerModel.destroy();
      this._timerModel = null;
    }
  }, {
    key: '_initializeProgressBarModel',
    value: function _initializeProgressBarModel() {
      this._progressBarModel = new _progressBarModel.ProgressBarModel();
      this._progressBarModel.initialize();
    }
  }, {
    key: '_destroyProgressBarModel',
    value: function _destroyProgressBarModel() {
      this._progressBarModel.destroy();
      this._progressBarModel = null;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._destroyBoardModel();
      this._destroyTimerModel();
      this._destroyProgressBarModel();
    }
  }, {
    key: 'boardModel',
    get: function get() {
      return this._boardModel;
    }
  }, {
    key: 'timerModel',
    get: function get() {
      return this._timerModel;
    }
  }, {
    key: 'progressBarModel',
    get: function get() {
      return this._progressBarModel;
    }
  }]);

  return GameModel;
}(_observableModel.ObservableModel);

},{"../observable-model":156,"./board/board-model":149,"./progress-bar-model":154,"./timer-model":155}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBarModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../constants');

var _observableModel = require('../observable-model');

var _dotModel = require('./dot-model');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBarModel = exports.ProgressBarModel = function (_ObservableModel) {
  _inherits(ProgressBarModel, _ObservableModel);

  function ProgressBarModel() {
    _classCallCheck(this, ProgressBarModel);

    var _this = _possibleConstructorReturn(this, (ProgressBarModel.__proto__ || Object.getPrototypeOf(ProgressBarModel)).call(this, 'ProgressBarModel'));

    _this._dots = [];
    _this._progress = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(ProgressBarModel, [{
    key: 'getDotByUuid',
    value: function getDotByUuid(uuid) {
      return this._dots.find(function (d) {
        return d.uuid === uuid;
      });
    }
  }, {
    key: 'getDotAtPosition',
    value: function getDotAtPosition(index) {
      return this._dots[index];
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._dots.forEach(function (d, i) {
        i === 0 ? d.state = _constants.DotState.Filled : d.state = _constants.DotState.Idle;
      });
      this._progress = 0;
    }
  }, {
    key: 'addDot',
    value: function addDot() {
      var pad = new _dotModel.DotModel();
      this._dots = [].concat(_toConsumableArray(this._dots), [pad]);
      pad.initialize();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this._initializeDots();
      this._progress = 0;
    }
  }, {
    key: '_initializeDots',
    value: function _initializeDots() {
      var count = 3;

      for (var i = 0; i < count; i += 1) {
        this.addDot();
      }
    }
  }, {
    key: 'dots',
    get: function get() {
      return this._dots;
    }
  }, {
    key: 'progress',
    get: function get() {
      return this._progress;
    },
    set: function set(value) {
      this._progress = value;
    }
  }]);

  return ProgressBarModel;
}(_observableModel.ObservableModel);

},{"../../constants":107,"../observable-model":156,"./dot-model":152}],155:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _boardConfig = require('../../configs/board-config');

var _utils = require('../../utils');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerModel = exports.TimerModel = function (_ObservableModel) {
  _inherits(TimerModel, _ObservableModel);

  function TimerModel() {
    var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CI_API.game.time.physicsElapsedMS;

    _classCallCheck(this, TimerModel);

    var _this = _possibleConstructorReturn(this, (TimerModel.__proto__ || Object.getPrototypeOf(TimerModel)).call(this, 'TimerModel'));

    _this._delta = delta;
    _this._timer = null;
    _this._duration = null;
    _this._remaining = null;
    _this._complete = null;
    _this._stopped = false;

    _this.makeObservable();
    return _this;
  }

  _createClass(TimerModel, [{
    key: 'destroy',
    value: function destroy() {
      this.stopTimer();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.stopTimer();
    }
  }, {
    key: 'resume',
    value: function resume() {
      this._startTimer();
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      this._stopped = false;
      this._duration = (0, _boardConfig.getGameTime)();
      this._remaining = this._duration;
      this._startTimer();
    }
  }, {
    key: 'startTimerFrom',
    value: function startTimerFrom(time, delay) {
      var _this2 = this;

      this._stopped = false;
      this._duration = (0, _boardConfig.getGameTime)();
      this._remaining = (0, _boardConfig.getGameTime)() - time;

      if (delay) {
        this._startRunnable = (0, _utils.delayRunnable)(500, function () {
          _this2._startTimer();
        });
      } else {
        this._startTimer();
      }
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      this._stopped = true;
      this._complete = false;

      if (this._timer) {
        (0, _utils.removeRunnable)(this._timer);
      }
    }
  }, {
    key: '_startTimer',
    value: function _startTimer() {
      var _this3 = this;

      this._timer = (0, _utils.loopRunnable)(this._delta, function () {
        _this3._remaining = Math.max(_this3._remaining - _this3._delta, 0);
        if (_this3._remaining <= 0) {
          _this3._remaining = 0;
          _this3._complete = true;
          _this3.stopTimer();
        }
      });
    }
  }, {
    key: 'timer',
    get: function get() {
      return this._timer;
    }
  }, {
    key: 'remaining',
    get: function get() {
      return this._remaining;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._duration;
    }
  }, {
    key: 'delta',
    get: function get() {
      return this._delta;
    }
  }, {
    key: 'complete',
    get: function get() {
      return this._complete;
    },
    set: function set(value) {
      this._complete = value;
    }
  }, {
    key: 'stopped',
    get: function get() {
      return this._stopped;
    },
    set: function set(value) {
      this._stopped = value;
    }
  }]);

  return TimerModel;
}(_observableModel.ObservableModel);

},{"../../configs/board-config":87,"../../utils":199,"../observable-model":156}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservableModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getUUID = function () {
  var num = 0;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    num += 1;
    var value = num < 10 ? '0' + num : num;
    return '' + prefix + value.toString();
  };
}();

var ObservableModel = exports.ObservableModel = function () {
  function ObservableModel(name) {
    _classCallCheck(this, ObservableModel);

    this.__name__ = name;
    this._uuid = getUUID(this.__name__);
  }

  _createClass(ObservableModel, [{
    key: 'makeObservable',
    value: function makeObservable() {
      var _lego$observe;

      for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      (_lego$observe = _lego.lego.observe).makeObservable.apply(_lego$observe, [this].concat(properties));
    }
  }, {
    key: 'createObservable',
    value: function createObservable(property, value) {
      _lego.lego.observe.createObservable(this, property, value);
    }
  }, {
    key: 'removeObservable',
    value: function removeObservable() {
      var _lego$observe2;

      for (var _len2 = arguments.length, properties = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      (_lego$observe2 = _lego.lego.observe).removeObservable.apply(_lego$observe2, [this].concat(properties));
    }
  }, {
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'uuid',
    get: function get() {
      return this._uuid;
    }
  }]);

  return ObservableModel;
}();

},{"@armathai/lego":212}],157:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerModel = exports.PlayerModel = function (_ObservableModel) {
  _inherits(PlayerModel, _ObservableModel);

  function PlayerModel() {
    _classCallCheck(this, PlayerModel);

    var _this = _possibleConstructorReturn(this, (PlayerModel.__proto__ || Object.getPrototypeOf(PlayerModel)).call(this, 'PlayerModel'));

    _this._score = 0;
    return _this;
  }

  _createClass(PlayerModel, [{
    key: 'score',
    get: function get() {
      return this._score;
    },
    set: function set(value) {
      this._score = value;
    }
  }]);

  return PlayerModel;
}(_observableModel.ObservableModel);

},{"../observable-model":156}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adModel = require('./ad/ad-model');

var _gameModel = require('./game/game-model');

var _observableModel = require('./observable-model');

var _playerModel = require('./player/player-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_ObservableModel) {
  _inherits(Store, _ObservableModel);

  function Store() {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, 'Store'));

    _this._ad = null;
    _this._game = null;
    _this._player = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(Store, [{
    key: 'initializeADModel',


    // AD
    value: function initializeADModel() {
      this._ad = new _adModel.AdModel();
      this._ad.initialize();
    }

    // PLAYER

  }, {
    key: 'initializePlayerModel',
    value: function initializePlayerModel() {
      this._player = new _playerModel.PlayerModel();
      this._player.initialize();
    }
  }, {
    key: 'destroyPlayerModel',
    value: function destroyPlayerModel() {
      this._player.destroy();
      this._player = null;
    }

    // GAME

  }, {
    key: 'initializeGameModel',
    value: function initializeGameModel() {
      this._game = new _gameModel.GameModel();
      this._game.initialize();
    }
  }, {
    key: 'destroyGameModel',
    value: function destroyGameModel() {
      this._game.destroy();
      this._game = null;
    }
  }, {
    key: 'ad',
    get: function get() {
      return this._ad;
    },
    set: function set(value) {
      this._ad = value;
    }
  }, {
    key: 'player',
    get: function get() {
      return this._player;
    },
    set: function set(value) {
      this._player = value;
    }
  }, {
    key: 'game',
    get: function get() {
      return this._game;
    },
    set: function set(value) {
      this._game = value;
    }
  }]);

  return Store;
}(_observableModel.ObservableModel);

var store = exports.store = new Store();

},{"./ad/ad-model":141,"./game/game-model":153,"./observable-model":156,"./player/player-model":157}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animationConfigs = require('./configs/animation-configs');

var animationConfigs = _interopRequireWildcard(_animationConfigs);

var _buttonConfigs = require('./configs/button-configs');

var buttonConfigs = _interopRequireWildcard(_buttonConfigs);

var _gridConfigs = require('./configs/grid-configs');

var gridConfigs = _interopRequireWildcard(_gridConfigs);

var _imageConfigs = require('./configs/image-configs');

var imageConfigs = _interopRequireWildcard(_imageConfigs);

var _ninepatchConfigs = require('./configs/ninepatch-configs');

var ninepatchConfigs = _interopRequireWildcard(_ninepatchConfigs);

var _particlesConfigs = require('./configs/particles-configs');

var particlesConfigs = _interopRequireWildcard(_particlesConfigs);

var _spineConfigs = require('./configs/spine-configs');

var spineConfigs = _interopRequireWildcard(_spineConfigs);

var _textConfigs = require('./configs/text-configs');

var textConfigs = _interopRequireWildcard(_textConfigs);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  animationConfigs: animationConfigs,
  buttonConfigs: buttonConfigs,
  gridConfigs: gridConfigs,
  particlesConfigs: particlesConfigs,
  imageConfigs: imageConfigs,
  ninepatchConfigs: ninepatchConfigs,
  spineConfigs: spineConfigs,
  textConfigs: textConfigs,
  utils: utils
};

},{"./configs/animation-configs":86,"./configs/button-configs":88,"./configs/grid-configs":89,"./configs/image-configs":100,"./configs/ninepatch-configs":102,"./configs/particles-configs":103,"./configs/spine-configs":104,"./configs/text-configs":105,"./utils":199}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var BackgroundView = exports.BackgroundView = function (_Phaser2Grid) {
  _inherits(BackgroundView, _Phaser2Grid);

  function BackgroundView() {
    _classCallCheck(this, BackgroundView);

    var _this = _possibleConstructorReturn(this, (BackgroundView.__proto__ || Object.getPrototypeOf(BackgroundView)).call(this, CI_API.game));

    _this.build(_this.getGridConfig());

    _this._build();
    return _this;
  }

  _createClass(BackgroundView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getBackgroundGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      this._gradient && this._rebuildGradient();

      _get(BackgroundView.prototype.__proto__ || Object.getPrototypeOf(BackgroundView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: '_rebuildGradient',
    value: function _rebuildGradient() {
      this._destroyGradient();
      this._buildGradient();
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildGradient();
    }
  }, {
    key: '_buildGradient',
    value: function _buildGradient() {
      this._gradient && this._gradient.destroy();
      this._gradient = (0, _utils.makeGradient)({
        width: CI_API.game.width,
        height: CI_API.game.height,
        horizontal: 0,
        vertical: 1,
        colors: [{
          percent: 0,
          color: '#282167'
        }, {
          percent: 0.25,
          color: '#020339'
        }, {
          percent: 0.75,
          color: '#020339'
        }, {
          percent: 1,
          color: '#282167'
        }]
      });

      this._gradient.inputEnabled = true;
      this._gradient.name = 'background';

      this.setChild('bg', this._gradient);
    }
  }, {
    key: '_destroyGradient',
    value: function _destroyGradient() {
      this._gradient.destroy();
      this._gradient = null;
    }
  }, {
    key: 'name',
    get: function get() {
      return 'BackgroundView';
    }
  }]);

  return BackgroundView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../utils":199,"@armathai/phaser2-grid":217}],161:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _store = require('../../models/store');

var _ctaEmbeddedView = require('./cta-embedded-view');

var _ctaStandardView = require('./cta-standard-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable class-methods-use-this */
var CTAContainer = exports.CTAContainer = function (_Phaser2Grid) {
  _inherits(CTAContainer, _Phaser2Grid);

  function CTAContainer() {
    _classCallCheck(this, CTAContainer);

    var _this = _possibleConstructorReturn(this, (CTAContainer.__proto__ || Object.getPrototypeOf(CTAContainer)).call(this, CI_API.game));

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this);
    return _this;
  }

  _createClass(CTAContainer, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getCTAContainerGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      _get(CTAContainer.prototype.__proto__ || Object.getPrototypeOf(CTAContainer.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      var _this2 = this;

      switch (status) {
        case _constants.AdStatus.Cta:
          this._build();
          break;
        case _constants.AdStatus.Game:
          if (this._cta) {
            this._ctaHideTw = this._cta.hide();
            this._ctaHideTw.onComplete.add(function () {
              _this2._cta.destroy();
              _this2._cta = null;
            });
          }
          break;
        default:
      }
    }
  }, {
    key: '_build',
    value: function _build() {
      this._cta && this._destroyCta();

      this.build(this.getGridConfig());
      this._buildCta();
    }
  }, {
    key: '_destroyCta',
    value: function _destroyCta() {
      this.game.tweens.remove(this._ctaHideTw);
      this._cta.destroy();
      this._cta = null;
    }
  }, {
    key: '_buildCta',
    value: function _buildCta() {
      var type = CI_API.Globals.PARAMS.cta_type;
      var reason = _store.store.ad.cta.reason;


      switch (type) {
        case 'standard':
          this._buildStandardCta();
          break;
        case 'embedded':
          reason === _constants.GameOverReasons.ItemsToCtaReached ? this._buildEmbeddedCta() : this._buildStandardCta();
          break;
        default:
          break;
      }
    }
  }, {
    key: '_buildStandardCta',
    value: function _buildStandardCta() {
      this._cta = new _ctaStandardView.CTAStandardView();
      this.setChild('cta', this._cta);
    }
  }, {
    key: '_buildEmbeddedCta',
    value: function _buildEmbeddedCta() {
      this._cta = new _ctaEmbeddedView.CTAEmbeddedView();
      this.setChild('cta', this._cta);
    }
  }]);

  return CTAContainer;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../constants":107,"../../events/model-events":112,"../../models/store":158,"./cta-embedded-view":163,"./cta-standard-view":167,"@armathai/lego":212,"@armathai/phaser2-grid":217}],162:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAEmbeddedContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _boardConfig = require('../../configs/board-config');

var _particlesConfigs = require('../../configs/particles-configs');

var _textConfigs = require('../../configs/text-configs');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _container = require('../../utils/container');

var _ctaProgressComponent = require('./cta-progress-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable class-methods-use-this */
var CTAEmbeddedContent = exports.CTAEmbeddedContent = function (_Container) {
  _inherits(CTAEmbeddedContent, _Container);

  function CTAEmbeddedContent() {
    _classCallCheck(this, CTAEmbeddedContent);

    var _this = _possibleConstructorReturn(this, (CTAEmbeddedContent.__proto__ || Object.getPrototypeOf(CTAEmbeddedContent)).call(this));

    _this._buildLabel();
    _this._buildProgress();
    _this._buildProgressLabel();
    _this._buildParticles();
    _this.alpha = 0;

    // const gr = this.game.add.graphics();
    // gr.beginFill(0xff0000, 0.5);
    // gr.drawRect(-270, -300, 540, 600);
    // this.add(gr);
    return _this;
  }

  _createClass(CTAEmbeddedContent, [{
    key: 'getBounds',
    value: function getBounds() {
      return new Phaser.Rectangle(-270, -300, 540, 600);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.game.tweens.remove(this._hideTw);
      if (this._particleEmitter) {
        this._particleEmitter.paused = true;
        this._particleEmitter.destroy();
      }

      _get(CTAEmbeddedContent.prototype.__proto__ || Object.getPrototypeOf(CTAEmbeddedContent.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'show',
    value: function show() {
      this.game.add.tween(this).to({ alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._hideTw = this.game.add.tween(this).to({ alpha: 0 }, 800, Phaser.Easing.Sinusoidal.InOut, true);

      return this._hideTw;
    }
  }, {
    key: '_buildProgress',
    value: function _buildProgress() {
      var length = 0;

      var sequence = (0, _boardConfig.getPlaySequence)();

      if (CI_API.Globals.PARAMS.short_version) {
        length = sequence[0].length;
      } else {
        sequence.forEach(function (s) {
          length += s.length;
        });
      }

      var percent = Math.max(0.5, _store.store.player.score / length);

      var progress = new _ctaProgressComponent.CTAProgressComponent(percent);
      this.addChild(progress);
    }
  }, {
    key: '_buildProgressLabel',
    value: function _buildProgressLabel() {
      var length = 0;

      var sequence = (0, _boardConfig.getPlaySequence)();

      if (CI_API.Globals.PARAMS.short_version) {
        length = sequence[0].length;
      } else {
        sequence.forEach(function (s) {
          length += s.length;
        });
      }

      var percent = Math.max(0.5, _store.store.player.score / length);

      var label = (0, _utils.makeText)((0, _textConfigs.getCTAEmbeddedProgressTextConfig)(percent));
      label.anchor.set(0.5);
      label.y = 100;
      this.addChild(label);
    }
  }, {
    key: '_buildParticles',
    value: function _buildParticles() {
      this._particlesContainer = new _container.Container();
      this.addChildAt(this._particlesContainer, 0);

      var gr = this.game.add.graphics();
      gr.beginFill(0x00ff00, 0);
      gr.drawRect(-300, -350, 600, 700);
      this.add(gr);
      this._particleEmitter = (0, _utils.makeEmitter)((0, _particlesConfigs.getEmbeddedCTAEmitterConfig)(this._particlesContainer, gr));
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getCTAStandardLabelTextConfig)());
      label.anchor.set(0.5);
      label.y = -80;
      this.addChild(label);
    }
  }]);

  return CTAEmbeddedContent;
}(_container.Container);

},{"../../configs/board-config":87,"../../configs/particles-configs":103,"../../configs/text-configs":105,"../../models/store":158,"../../utils":199,"../../utils/container":198,"./cta-progress-component":165}],163:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAEmbeddedView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _buttonConfigs = require('../../configs/button-configs');

var _gridConfigs = require('../../configs/grid-configs');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _ctaEmbeddedContnent = require('./cta-embedded-contnent');

var _ctaView = require('./cta-view');

var _nextButton = require('./next-button');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var CTAEmbeddedView = exports.CTAEmbeddedView = function (_CTAView) {
  _inherits(CTAEmbeddedView, _CTAView);

  function CTAEmbeddedView() {
    _classCallCheck(this, CTAEmbeddedView);

    var _this = _possibleConstructorReturn(this, (CTAEmbeddedView.__proto__ || Object.getPrototypeOf(CTAEmbeddedView)).call(this));

    _this._build();
    _this.show();
    return _this;
  }

  _createClass(CTAEmbeddedView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getCTAEmbeddedGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      _get(CTAEmbeddedView.prototype.__proto__ || Object.getPrototypeOf(CTAEmbeddedView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._showRunnable);

      _get(CTAEmbeddedView.prototype.__proto__ || Object.getPrototypeOf(CTAEmbeddedView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'buildPlayButton',
    value: function buildPlayButton() {
      var cellName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'play_button';

      this._playBtn = new _nextButton.NextButton((0, _buttonConfigs.getCtaPlayButtonConfig)('NEXT SONG'));
      this._playBtn.onClick.add(this._onPlayClick, this);
      this._playBtn.alpha = 0;

      this.setChild(cellName, this._playBtn);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      this._showRunnable = (0, _utils.delayRunnable)(500, function () {
        _this2._content.show();
        _this2._logo.alpha = 1;
        _this2._playBtn.alpha = 1;
        _this2.showBlocker().onComplete.add(function () {
          if (CI_API.Globals.PARAMS.cta_scrn_clickable) {
            _this2._blocker.events.onInputDown.add(_this2._onScreenClick, _this2);
          }
        });
        (0, _utils.showFromBottom)(_this2._playBtn, 200, 500, false, Phaser.Easing.Cubic.Out).onComplete.add(function () {
          _this2._playBtn.onClick.add(_this2._onPlayClick, _this2);
        });
        (0, _utils.showFromUp)(_this2._logo, 0, 500, false, Phaser.Easing.Sinusoidal.Out);
        if (_this2._retryBtn) {
          _this2._retryBtn.alpha = 1;
          (0, _utils.showFromBottom)(_this2._retryBtn, 0, 500, false, Phaser.Easing.Cubic.Out).onComplete.add(function () {
            _this2._retryBtn.onClick.add(_this2._onRetryClick, _this2);
          });
        }
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.hideBlocker();
      (0, _utils.hideToBottom)(this._playBtn, 0, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
        _this3._playBtn.visible = false;
      });
      (0, _utils.hideToUp)(this._logo, 0, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
        _this3._logo.visible = false;
      });

      var longestTween = this._content.hide();
      if (this._retryBtn) {
        (0, _utils.hideToBottom)(this._retryBtn, 200, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
          _this3._retryBtn.visible = false;
        });
      }

      return longestTween;
    }
  }, {
    key: '_build',
    value: function _build() {
      this.build(this.getGridConfig());
      this.buildLogo();
      this._buildContent();
      if (_store.store.ad.retries) {
        this.buildPlayButton();
        this.buildRetryButton();
      } else {
        this.buildPlayButton('play_button_no_retry');
      }
    }
  }, {
    key: '_buildContent',
    value: function _buildContent() {
      this.setChild('content', this._content = new _ctaEmbeddedContnent.CTAEmbeddedContent());
    }
  }]);

  return CTAEmbeddedView;
}(_ctaView.CTAView);

},{"../../configs/button-configs":88,"../../configs/grid-configs":89,"../../models/store":158,"../../utils":199,"./cta-embedded-contnent":162,"./cta-view":168,"./next-button":169}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CtaLogoView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textConfigs = require('../../configs/text-configs');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var CtaLogoView = exports.CtaLogoView = function (_Phaser$Sprite) {
  _inherits(CtaLogoView, _Phaser$Sprite);

  function CtaLogoView() {
    _classCallCheck(this, CtaLogoView);

    var texture = (0, _utils.searchAtlasByFrame)('ui/logo.png');

    var _this = _possibleConstructorReturn(this, (CtaLogoView.__proto__ || Object.getPrototypeOf(CtaLogoView)).call(this, CI_API.game, 0, 0, texture.key, texture.frame));

    _this.name = 'LogoView';
    _this.anchor.set(0.5);

    _this._buildLabel();
    _this._buildBounds();
    return _this;
  }

  _createClass(CtaLogoView, [{
    key: 'getBounds',
    value: function getBounds() {
      return new Phaser.Rectangle(-200, -80, 400, 200);
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getCtaLogoLabelTextConfig)());
      label.anchor.set(0.5);
      label.y = this.height * 0.8;
      this.addChild(label);
    }
  }, {
    key: '_buildBounds',
    value: function _buildBounds() {
      var _getBounds = this.getBounds(),
          x = _getBounds.x,
          y = _getBounds.y,
          width = _getBounds.width,
          height = _getBounds.height;

      var gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 0);
      gr.drawRect(x, y, width, height);
      gr.endFill();

      gr.inputEnabled = true;
      gr.name = 'logo';

      this.addChild(gr);
    }
  }]);

  return CtaLogoView;
}(Phaser.Sprite);

},{"../../configs/text-configs":105,"../../utils":199}],165:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAProgressComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _container = require('../../utils/container');

var _dotComponent = require('../game/dot-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var CTAProgressComponent = exports.CTAProgressComponent = function (_Container) {
  _inherits(CTAProgressComponent, _Container);

  function CTAProgressComponent(progress) {
    _classCallCheck(this, CTAProgressComponent);

    var _this = _possibleConstructorReturn(this, (CTAProgressComponent.__proto__ || Object.getPrototypeOf(CTAProgressComponent)).call(this));

    _this._dots = [];
    _this._build();
    _this._updateProgress(progress);
    return _this;
  }

  _createClass(CTAProgressComponent, [{
    key: '_updateProgress',
    value: function _updateProgress(progress) {
      this._updateGrWidth(this._maskRect, progress);
      if (progress === 1) {
        this._dots[0].fill();
        this._dots[1].fill();
        this._dots[2].fill();
      } else if (progress >= 0.5) {
        this._dots[0].fill();
        this._dots[1].fill();
      } else if (progress < 0.5) {
        this._dots[0].fill();
      }
    }
  }, {
    key: '_updateGrWidth',
    value: function _updateGrWidth(gr, progress) {
      var _fill = this._fill,
          x = _fill.x,
          y = _fill.y,
          width = _fill.width,
          height = _fill.height;

      gr.clear();
      gr.beginFill(0xff0000, 0.6);
      gr.drawRect(x - width / 2, y - height / 2, width * progress, height);
      gr.endFill();
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildBg();
      this._buildFill();
      this._buildMask();
      this._buildDots();

      this._buildBounds();
    }
  }, {
    key: '_buildBounds',
    value: function _buildBounds() {
      var _getBounds = this.getBounds(),
          x = _getBounds.x,
          y = _getBounds.y,
          width = _getBounds.width,
          height = _getBounds.height;

      var gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 0);
      gr.drawRect(x, y, width, height);
      gr.endFill();
      this.addChild(gr);
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var gr = this.game.add.graphics();
      gr.beginFill(0x9396ff, 1);
      gr.drawRoundedRect(-250, -10, 500, 20, 20);
      gr.endFill();

      this.addChild(this._bg = gr);
    }
  }, {
    key: '_buildFill',
    value: function _buildFill() {
      var gr = this.game.add.graphics();
      gr.beginFill(0xfef955, 1);
      gr.drawRoundedRect(-250, -10, 500, 20, 20);
      gr.endFill();

      this.addChild(this._fill = gr);
    }
  }, {
    key: '_buildMask',
    value: function _buildMask() {
      var gr = this.game.add.graphics();
      gr.beginFill(0x00ff00);
      gr.drawRect(0, 0, 0, 0);
      this.addChild(this._maskRect = gr);

      this._fill.mask = gr;
    }
  }, {
    key: '_buildDots',
    value: function _buildDots() {
      var count = 3;
      for (var i = 0; i < count; i += 1) {
        var dot = new _dotComponent.DotComponent();
        dot.idle();
        dot.position.set(this._dots.length * (this._bg.width / 2) - this._bg.width / 2, 0);

        this._dots.push(dot);

        this.addChild(dot);
      }
    }
  }]);

  return CTAProgressComponent;
}(_container.Container);

},{"../../utils/container":198,"../game/dot-component":179}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAStandardTitleComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textConfigs = require('../../configs/text-configs');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable class-methods-use-this */
var CTAStandardTitleComponent = exports.CTAStandardTitleComponent = function (_Container) {
  _inherits(CTAStandardTitleComponent, _Container);

  function CTAStandardTitleComponent() {
    _classCallCheck(this, CTAStandardTitleComponent);

    var _this = _possibleConstructorReturn(this, (CTAStandardTitleComponent.__proto__ || Object.getPrototypeOf(CTAStandardTitleComponent)).call(this));

    _this._build();
    return _this;
  }

  _createClass(CTAStandardTitleComponent, [{
    key: '_build',
    value: function _build() {
      var label1 = (0, _utils.makeText)((0, _textConfigs.getStandardCtaTitleTextConfig)('Choose', '#f9db0b'));
      var label2 = (0, _utils.makeText)((0, _textConfigs.getStandardCtaTitleTextConfig)('your next song!'));
      label2.position.set(label1.right, 0);

      this.addChild(label1);
      this.addChild(label2);
    }
  }]);

  return CTAStandardTitleComponent;
}(_container.Container);

},{"../../configs/text-configs":105,"../../utils":199,"../../utils/container":198}],167:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAStandardView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _gridConfigs = require('../../configs/grid-configs');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _ctaStandardTitleComponent = require('./cta-standard-title-component');

var _ctaView = require('./cta-view');

var _optionSetComponent = require('./option-set-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var CTAStandardView = exports.CTAStandardView = function (_CTAView) {
  _inherits(CTAStandardView, _CTAView);

  function CTAStandardView() {
    _classCallCheck(this, CTAStandardView);

    var _this = _possibleConstructorReturn(this, (CTAStandardView.__proto__ || Object.getPrototypeOf(CTAStandardView)).call(this));

    _this._build();
    _this.show();
    return _this;
  }

  _createClass(CTAStandardView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getCTAStandardGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      _get(CTAStandardView.prototype.__proto__ || Object.getPrototypeOf(CTAStandardView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._showRunnable);

      _get(CTAStandardView.prototype.__proto__ || Object.getPrototypeOf(CTAStandardView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      this._showRunnable = (0, _utils.delayRunnable)(500, function () {
        _this2._optionSet.show();
        _this2._logo.alpha = 1;
        _this2._playBtn.alpha = 1;
        _this2._titleLabel.alpha = 1;
        _this2.showBlocker().onComplete.add(function () {
          if (CI_API.Globals.PARAMS.cta_scrn_clickable) {
            _this2._blocker.events.onInputDown.add(_this2._onScreenClick, _this2);
          }
        });
        (0, _utils.showFromBottom)(_this2._playBtn, 200, 500, false, Phaser.Easing.Cubic.Out).onComplete.add(function () {
          _this2._playBtn.onClick.add(_this2._onPlayClick, _this2);
        });
        (0, _utils.showFromLeft)(_this2._titleLabel, 400, 500, false, Phaser.Easing.Back.Out);
        (0, _utils.showFromUp)(_this2._logo, 0, 500, false, Phaser.Easing.Sinusoidal.Out);
        if (_this2._retryBtn) {
          _this2._retryBtn.alpha = 1;
          (0, _utils.showFromBottom)(_this2._retryBtn, 0, 500, false, Phaser.Easing.Cubic.Out).onComplete.add(function () {
            _this2._retryBtn.onClick.add(_this2._onRetryClick, _this2);
          });
        }
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.hideBlocker();
      (0, _utils.hideToBottom)(this._playBtn, 0, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
        _this3._playBtn.visible = false;
      });
      (0, _utils.hideToUp)(this._logo, 0, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
        _this3._logo.visible = false;
      });
      (0, _utils.hideToLeft)(this._titleLabel, 0, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
        _this3._titleLabel.visible = false;
      });

      var longestTween = this._optionSet.hide();
      if (this._retryBtn) {
        (0, _utils.hideToBottom)(this._retryBtn, 200, 500, false, Phaser.Easing.Cubic.In).onComplete.add(function () {
          _this3._retryBtn.visible = false;
        });
      }

      return longestTween;
    }
  }, {
    key: '_build',
    value: function _build() {
      this.build(this.getGridConfig());
      this.buildLogo();
      this._buildTitleLabel();
      this._buildContent();
      if (_store.store.ad.retries) {
        this.buildPlayButton();
        this.buildRetryButton();
      } else {
        this.buildPlayButton('play_button_no_retry');
      }
    }
  }, {
    key: '_buildTitleLabel',
    value: function _buildTitleLabel() {
      this.setChild('title', this._titleLabel = new _ctaStandardTitleComponent.CTAStandardTitleComponent());
      this._titleLabel.alpha = 0;
    }
  }, {
    key: '_buildContent',
    value: function _buildContent() {
      this.setChild('content', this._optionSet = new _optionSetComponent.OptionSetComponent());
    }
  }]);

  return CTAStandardView;
}(_ctaView.CTAView);

},{"../../configs/grid-configs":89,"../../models/store":158,"../../utils":199,"./cta-standard-title-component":166,"./cta-view":168,"./option-set-component":171}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _buttonConfigs = require('../../configs/button-configs');

var _constants = require('../../constants');

var _viewEvents = require('../../events/view-events');

var _moduleBindings = require('../../module-bindings');

var _moduleBindings2 = _interopRequireDefault(_moduleBindings);

var _utils = require('../../utils');

var _button = require('../../utils/button/button');

var _ctaLogoView = require('./cta-logo-view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var CTAView = exports.CTAView = function (_Phaser2Grid) {
  _inherits(CTAView, _Phaser2Grid);

  function CTAView() {
    _classCallCheck(this, CTAView);

    var _this = _possibleConstructorReturn(this, (CTAView.__proto__ || Object.getPrototypeOf(CTAView)).call(this, CI_API.game));

    _this._blocker = null;
    _this.bindings = _moduleBindings2.default;
    return _this;
  }

  _createClass(CTAView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return new Error('function getGridConfig() is not implemented');
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      _get(CTAView.prototype.__proto__ || Object.getPrototypeOf(CTAView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: 'buildLogo',
    value: function buildLogo() {
      this._logo = new _ctaLogoView.CtaLogoView();
      this._logo.alpha = 0;
      this.setChild('logo', this._logo);
    }
  }, {
    key: 'buildPlayButton',
    value: function buildPlayButton() {
      var cellName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'play_button';

      this._playBtn = new _button.Button((0, _buttonConfigs.getCtaPlayButtonConfig)(CI_API.Globals.PARAMS.cta_btn_text));
      this._playBtn.alpha = 0;

      this.setChild(cellName, this._playBtn);
    }
  }, {
    key: 'buildRetryButton',
    value: function buildRetryButton() {
      this._retryBtn = new _button.Button((0, _buttonConfigs.getCtaRetryButtonConfig)());
      this._retryBtn.alpha = 0;

      this.setChild('retry_button', this._retryBtn);
    }
  }, {
    key: 'build',
    value: function build(config) {
      var blockerAlpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      _get(CTAView.prototype.__proto__ || Object.getPrototypeOf(CTAView.prototype), 'build', this).call(this, config);
      this._buildBlocker(blockerAlpha);
    }
  }, {
    key: 'showBlocker',
    value: function showBlocker() {
      this._showBlockerTw = this.game.add.tween(this._blocker).to({ alpha: 0.8 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0);
      this._showBlockerTw.universal = true;

      return this._showBlockerTw;
    }
  }, {
    key: 'hideBlocker',
    value: function hideBlocker() {
      this._hideBlockerTw = this.game.add.tween(this._blocker).to({ alpha: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0);
      this._hideBlockerTw.universal = true;

      return this._hideBlockerTw;
    }
  }, {
    key: '_buildBlocker',
    value: function _buildBlocker(alpha) {
      this._blocker = (0, _utils.makePixel)({ alpha: alpha });
      this._blocker.inputEnabled = true;
      this._blocker.input.priorityID = _constants.InputPriority.Cta;
      this._blocker.name = 'cta_overlay';
      this.setChild('blocker', this._blocker);
    }
  }, {
    key: '_buildButton',
    value: function _buildButton(config, callback) {
      var btn = new _button.Button(config);
      btn.onClick.add(callback, this);
      return btn;
    }
  }, {
    key: '_onScreenClick',
    value: function _onScreenClick() {
      if (!this._hideBlockerTw) {
        _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.ScreenClick);
      }
    }
  }, {
    key: '_onPlayClick',
    value: function _onPlayClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.PlayClick);
    }
  }, {
    key: '_onRetryClick',
    value: function _onRetryClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.RetryClick);
      this._retryBtn.onClick.remove(this._onRetryClick, this);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'CTAView';
    }
  }, {
    key: 'logoPosition',
    get: function get() {
      return this.toGlobal(this._logo.position);
    }
  }]);

  return CTAView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/button-configs":88,"../../constants":107,"../../events/view-events":113,"../../module-bindings":159,"../../utils":199,"../../utils/button/button":196,"./cta-logo-view":164,"@armathai/lego":212,"@armathai/phaser2-grid":217}],169:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageConfigs = require('../../configs/image-configs');

var _utils = require('../../utils');

var _abstractButton = require('../../utils/button/abstract-button');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NextButton = exports.NextButton = function (_AbstractButton) {
  _inherits(NextButton, _AbstractButton);

  function NextButton(config) {
    _classCallCheck(this, NextButton);

    var _this = _possibleConstructorReturn(this, (NextButton.__proto__ || Object.getPrototypeOf(NextButton)).call(this, config));

    _this.createIcon();
    return _this;
  }

  _createClass(NextButton, [{
    key: 'createIcon',
    value: function createIcon() {
      var icon = (0, _utils.makeImage)((0, _imageConfigs.getNextButtonIconImageConfig)());
      // @ts-ignore
      icon.right = this.states.up.right - 30;
      this.addChild(icon);
    }
  }, {
    key: 'createState',
    value: function createState(config) {
      var state = new Phaser.Group(this.game);

      var bg = config.bg,
          label = config.label,
          _config$fitHeight = config.fitHeight,
          fitHeight = _config$fitHeight === undefined ? 0.9 : _config$fitHeight;

      // FRAME

      var bgObj = bg.width && bg.height ? (0, _utils.makeNinePatch)(bg) : (0, _utils.makeImage)(bg);
      state.add(bgObj);

      // LABEL
      if (label) {
        var labelObj = (0, _utils.makeText)(label);
        labelObj.anchor.set(0.5);
        state.add(labelObj);

        (0, _utils.fitText)(labelObj, bgObj.width * 0.45, bgObj.height * fitHeight);
      }

      return this.add(state);
    }
  }]);

  return NextButton;
}(_abstractButton.AbstractButton);

},{"../../configs/image-configs":100,"../../utils":199,"../../utils/button/abstract-button":195}],170:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _imageConfigs = require('../../configs/image-configs');

var _ninepatchConfigs = require('../../configs/ninepatch-configs');

var _textConfigs = require('../../configs/text-configs');

var _constants = require('../../constants');

var _viewEvents = require('../../events/view-events');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var OptionComponent = exports.OptionComponent = function (_Container) {
  _inherits(OptionComponent, _Container);

  function OptionComponent(config) {
    _classCallCheck(this, OptionComponent);

    var _this = _possibleConstructorReturn(this, (OptionComponent.__proto__ || Object.getPrototypeOf(OptionComponent)).call(this));

    _this._config = config;

    _this._build();
    return _this;
  }

  _createClass(OptionComponent, [{
    key: 'getBounds',
    value: function getBounds() {
      return new Phaser.Rectangle(-265, -90, 530, 180);
    }
  }, {
    key: 'highlightGlow',
    value: function highlightGlow() {
      var _this2 = this;

      this._glow.visible = true;
      var tw = this.game.add.tween(this._glow).to({ alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
      tw.universal = true;
      tw.onComplete.add(function () {
        _this2._glow.visible = false;
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this._playButton.alpha = 0;
      this._pauseButton.alpha = 1;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._playButton.alpha = 1;
      this._pauseButton.alpha = 0;
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      this._bg.input.priorityID = _constants.InputPriority.Cta + 1;
      this._bg.events.onInputDown.add(function () {
        _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.OptionClick, _this3._bg.name);
      });
    }
  }, {
    key: '_build',
    value: function _build() {
      var _config = this._config,
          icon = _config.icon,
          title = _config.title,
          singer = _config.singer;


      this._buildBg();
      this._buildGlow();
      this._buildIcon(icon);
      this._buildTitleLabel(title);
      this._buildOriginalLabel();
      this._buildPlayButton();
      this._buildPauseButton();
      this._buildSingerLabel(singer);
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var bg = (0, _utils.makeNinePatch)((0, _ninepatchConfigs.getMusicBarPatchConfig)());
      var _config2 = this._config,
          title = _config2.title,
          singer = _config2.singer;

      bg.name = singer + ': ' + title;
      bg.inputEnabled = true;
      this.addChild(this._bg = bg);
    }
  }, {
    key: '_buildGlow',
    value: function _buildGlow() {
      var glow = (0, _utils.makeNinePatch)((0, _ninepatchConfigs.getMusicBarGlowPatchConfig)());
      this.addChild(this._glow = glow);
      this._glow.alpha = 0;
      this._glow.visible = false;
    }
  }, {
    key: '_buildIcon',
    value: function _buildIcon(icon) {
      var img = (0, _utils.makeImage)((0, _imageConfigs.getSingerImageConfig)(icon));
      this.addChild(this._icon = img);
      img.left = this._bg.left + 33;
      img.y = -1;
    }
  }, {
    key: '_buildTitleLabel',
    value: function _buildTitleLabel(text) {
      var label = (0, _utils.makeText)((0, _textConfigs.getCtaOptionTitleTextConfig)(text));
      label.left = this._icon.right + 30;
      label.top = this._icon.top + 30;
      this.addChild(label);
    }
  }, {
    key: '_buildOriginalLabel',
    value: function _buildOriginalLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getCtaOptionOriginalTextConfig)());
      label.left = this._icon.right + 30;
      label.top = this._icon.top + 75;
      this.addChild(label);
    }
  }, {
    key: '_buildSingerLabel',
    value: function _buildSingerLabel(text) {
      var label = (0, _utils.makeText)((0, _textConfigs.getCtaOptionSingerTextConfig)(text));
      label.left = this._icon.right + 30;
      label.top = this._icon.top + 105;
      this.addChild(label);
    }
  }, {
    key: '_buildPlayButton',
    value: function _buildPlayButton() {
      var img = (0, _utils.makeImage)((0, _imageConfigs.getPlayMusicImageConfig)());
      this.addChild(this._playButton = img);
      img.right = this._bg.right - 70;
      img.y = -1;
    }
  }, {
    key: '_buildPauseButton',
    value: function _buildPauseButton() {
      var img = (0, _utils.makeImage)((0, _imageConfigs.getPauseMusicImageConfig)());
      this.addChild(this._pauseButton = img);
      img.right = this._bg.right - 70;
      img.alpha = 0;
      img.y = -1;
    }
  }, {
    key: 'playButton',
    get: function get() {
      return this._playButton;
    }
  }]);

  return OptionComponent;
}(_container.Container);

},{"../../configs/image-configs":100,"../../configs/ninepatch-configs":102,"../../configs/text-configs":105,"../../constants":107,"../../events/view-events":113,"../../utils":199,"../../utils/container":198,"@armathai/lego":212}],171:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionSetComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _imageConfigs = require('../../configs/image-configs');

var _viewEvents = require('../../events/view-events');

var _utils = require('../../utils');

var _last = require('../../utils/array/last');

var _container = require('../../utils/container');

var _optionComponent = require('./option-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var optionSetCOnfig = [{
  icon: '1',
  title: 'Faded',
  singer: 'Alan Walker'
}, {
  icon: '2',
  title: 'Closer',
  singer: 'The Chainsmokers'
}];

var OptionSetComponent = exports.OptionSetComponent = function (_Container) {
  _inherits(OptionSetComponent, _Container);

  function OptionSetComponent() {
    _classCallCheck(this, OptionSetComponent);

    var _this = _possibleConstructorReturn(this, (OptionSetComponent.__proto__ || Object.getPrototypeOf(OptionSetComponent)).call(this));

    _this._optionsShowTweens = [];
    _this._optionsHideTweens = [];
    _this._options = [];

    _this._build();
    return _this;
  }

  _createClass(OptionSetComponent, [{
    key: 'getBounds',
    value: function getBounds() {
      return new Phaser.Rectangle(-265, -90, 530, 400);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      this._showOptions();
      (0, _last.last)(this._optionsShowTweens).onComplete.add(function () {
        _this2._showHand();
        _this2._options.forEach(function (o) {
          return o.enable();
        });
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.removeActions();
      this._hand.destroy();
      return this._hideOptions();
    }
  }, {
    key: 'removeActions',
    value: function removeActions() {
      var _this3 = this;

      (0, _utils.removeRunnable)(this._highlightRunnable);
      (0, _utils.removeRunnable)(this._previewRunnable);
      this.game.tweens.remove(this._moveTw);
      this.game.tweens.remove(this._showTw);
      this.game.tweens.remove(this._alphaTw);
      this.game.tweens.remove(this._scaleTw);
      this.game.tweens.remove(this._scaleBackTw);
      this._optionsShowTweens.forEach(function (tw) {
        _this3.game.tweens.remove(tw);
      });
      this._optionsHideTweens.forEach(function (tw) {
        _this3.game.tweens.remove(tw);
      });
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildOptions();
      this._buildHand();
    }
  }, {
    key: '_buildOptions',
    value: function _buildOptions() {
      var _this4 = this;

      optionSetCOnfig.forEach(function (config, i) {
        var option = new _optionComponent.OptionComponent(config);
        _this4.addChild(option);
        _this4._options.push(option);
        option.alpha = 0;
        option.y = i * (option.height + 25);
      });
    }
  }, {
    key: '_buildHand',
    value: function _buildHand() {
      var hand = (0, _utils.makeImage)((0, _imageConfigs.getHandImageConfig)());
      hand.visible = false;
      this.addChild(this._hand = hand);
    }
  }, {
    key: '_showOptions',
    value: function _showOptions() {
      this._optionsShowTweens = this._options.map(function (opt, i) {
        opt.alpha = 1;
        return (0, _utils.showFromRight)(opt, 150 * i, 1000, false, Phaser.Easing.Back.Out);
      });
    }
  }, {
    key: '_hideOptions',
    value: function _hideOptions() {
      this._optionsHideTweens = this._options.map(function (opt, i) {
        opt.alpha = 1;
        return (0, _utils.hideToRight)(opt, 150 * i, 1000, false, Phaser.Easing.Back.In);
      });

      return (0, _last.last)(this._optionsHideTweens);
    }
  }, {
    key: '_showHand',
    value: function _showHand() {
      this._positions = this._getHintPositions();
      this._currentPoint = 0;

      this._firstTimeShow();
    }
  }, {
    key: '_firstTimeShow',
    value: function _firstTimeShow() {
      var _this5 = this;

      var point = this._positions[this._currentPoint];
      this._hand.scale.set(1);
      this._hand.alpha = 1;
      this._hand.position.set(point.x, point.y);
      this._hand.angle = 0;
      this._hand.visible = true;
      var _hand = this._hand,
          x = _hand.x,
          y = _hand.y,
          angle = _hand.angle;


      this._showTw = this.game.add.tween(this._hand).from({ x: x + 50, y: y + 50, angle: angle + 30 }, 400, Phaser.Easing.Cubic.Out, true, 0);
      this._showTw.universal = true;
      this._showTw.onComplete.addOnce(function () {
        _this5._pointHand();
      });

      this._alphaTw = this.game.add.tween(this._hand).from({ alpha: 0 }, 400, Phaser.Easing.Cubic.Out, true, 0);
      this._alphaTw.universal = true;
    }
  }, {
    key: '_pointHand',
    value: function _pointHand() {
      var _this6 = this;

      this._scaleTw = (0, _utils.handScaleTw)(this._hand);
      this._scaleTw.universal = true;

      this._highlightRunnable = (0, _utils.delayRunnable)(200, function () {
        _this6._options[_this6._currentPoint].highlightGlow();
      });

      this._scaleTw.onComplete.addOnce(function () {
        _this6._options[_this6._currentPoint].play();
        _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.OptionPreview, _this6._currentPoint);

        _this6._previewRunnable = (0, _utils.delayRunnable)(4500, function () {
          _this6._scaleBackTw = (0, _utils.handScaleTw)(_this6._hand);
          _this6._scaleBackTw.universal = true;

          _this6._scaleBackTw.onComplete.addOnce(function () {
            _this6._options[_this6._currentPoint].pause();

            _this6._currentPoint += 1;
            if (_this6._currentPoint === _this6._positions.length) {
              _this6._currentPoint = 0;
            }

            _this6._moveHand(_this6._positions[_this6._currentPoint]);
          });
        });
      });
    }
  }, {
    key: '_moveHand',
    value: function _moveHand(pos) {
      var _this7 = this;

      this._moveTw = (0, _utils.handMoveTw)(this._hand, pos);
      this._moveTw.universal = true;
      this._moveTw.onComplete.addOnce(function () {
        _this7._pointHand();
      });
    }
  }, {
    key: '_getHintPositions',
    value: function _getHintPositions() {
      var _this8 = this;

      return this._options.map(function (opt) {
        return _this8.toLocal(opt.toGlobal(opt.playButton.position), undefined);
      });
    }
  }]);

  return OptionSetComponent;
}(_container.Container);

},{"../../configs/image-configs":100,"../../events/view-events":113,"../../utils":199,"../../utils/array/last":194,"../../utils/container":198,"./option-component":170,"@armathai/lego":212}],172:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForegroundView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _ctaLogoView = require('../cta/cta-logo-view');

var _logoView = require('./logo-view');

var _tutorialView = require('./tutorial-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


function getLogo() {
  if (LP(true, false)) {
    return new _ctaLogoView.CtaLogoView();
  }
  return new _logoView.LogoView();
}

var ForegroundView = exports.ForegroundView = function (_Phaser2Grid) {
  _inherits(ForegroundView, _Phaser2Grid);

  function ForegroundView() {
    _classCallCheck(this, ForegroundView);

    var _this = _possibleConstructorReturn(this, (ForegroundView.__proto__ || Object.getPrototypeOf(ForegroundView)).call(this, CI_API.game));

    _this.build(_this.getGridConfig());

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this).on(_modelEvents.ModelEvents.AdModel.TutorialUpdate, _this._onTutorialUpdate, _this);
    return _this;
  }

  _createClass(ForegroundView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getForegroundGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      if (this._logoView) {
        this._destroyLogo();
        this.setChild('logo', this._logoView = getLogo());
      }

      _get(ForegroundView.prototype.__proto__ || Object.getPrototypeOf(ForegroundView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: '_removeTweens',
    value: function _removeTweens() {
      this.game.tweens.remove(this._tutorialHideTw);
      this.game.tweens.remove(this._logoShowTw);
      this.game.tweens.remove(this._logoHideTw);
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.PreCta:
          this._removeTweens();
          this._tutorialView && this._destroyTutorial();

          this._hideLogo().onComplete.add(this._destroyLogo, this);
          break;
        case _constants.AdStatus.Game:
          this._build();
          this._removeTweens();

          this._logoView && this._destroyLogo();
          this._buildLogo();
          this._showLogo();
          break;
        default:
      }
    }
  }, {
    key: '_build',
    value: function _build() {}
    //


    // LOGO

  }, {
    key: '_buildLogo',
    value: function _buildLogo() {
      this._logoView = getLogo();
      this.setChild('logo', this._logoView);
    }
  }, {
    key: '_destroyLogo',
    value: function _destroyLogo() {
      this._logoView.destroy();
      this._logoView = null;
    }
  }, {
    key: '_showLogo',
    value: function _showLogo() {
      var _LP;

      var twArg = [this._logoView, (0, _utils.getRetryDelay)(_store.store.ad.retries), 500, false, Phaser.Easing.Cubic.Out];
      this._logoShowTw = (_LP = LP(_utils.showFromUp, _utils.showFromUp)).call.apply(_LP, [null].concat(twArg));
      return this._logoShowTw;
    }
  }, {
    key: '_hideLogo',
    value: function _hideLogo() {
      var _LP2;

      var twArg = [this._logoView, 0, 500, false, Phaser.Easing.Cubic.In];
      this._logoHideTw = (_LP2 = LP(_utils.hideToUp, _utils.hideToUp)).call.apply(_LP2, [null].concat(twArg));
      return this._logoHideTw;
    }

    // TUTORIAL

  }, {
    key: '_onTutorialUpdate',
    value: function _onTutorialUpdate(tutorial) {
      var _this2 = this;

      if (tutorial) {
        this._buildTutorial();
      } else if (this._tutorialView) {
        this._tutorialHideTw = this._hideTutorial();
        this._tutorialHideTw.onComplete.add(function () {
          return _this2._destroyTutorial();
        });
      }
    }
  }, {
    key: '_onTutorialSequenceReady',
    value: function _onTutorialSequenceReady() {
      this.setChild('tutorial', this._tutorialView);
    }
  }, {
    key: '_buildTutorial',
    value: function _buildTutorial() {
      this._tutorialView = new _tutorialView.TutorialView();
      this._tutorialView.onSequenceReady.add(this._onTutorialSequenceReady, this);
    }
  }, {
    key: '_destroyTutorial',
    value: function _destroyTutorial() {
      this._tutorialView.destroy();
      this._tutorialView = null;
    }
  }, {
    key: '_hideTutorial',
    value: function _hideTutorial() {
      var tw = this.game.add.tween(this._tutorialView).to({ alpha: 0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
      tw.universal = true;

      return tw;
    }
  }, {
    key: 'name',
    get: function get() {
      return 'ForegroundView';
    }
  }, {
    key: 'logoPosition',
    get: function get() {
      return this._logoView ? this.toGlobal(this._logoView.position) : null;
    }
  }]);

  return ForegroundView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../constants":107,"../../events/model-events":112,"../../models/store":158,"../../utils":199,"../cta/cta-logo-view":164,"./logo-view":173,"./tutorial-view":176,"@armathai/lego":212,"@armathai/phaser2-grid":217}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogoView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _textConfigs = require('../../configs/text-configs');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var LogoView = exports.LogoView = function (_Phaser$Sprite) {
  _inherits(LogoView, _Phaser$Sprite);

  function LogoView() {
    _classCallCheck(this, LogoView);

    var texture = (0, _utils.searchAtlasByFrame)('ui/logo.png');

    var _this = _possibleConstructorReturn(this, (LogoView.__proto__ || Object.getPrototypeOf(LogoView)).call(this, CI_API.game, 0, 0, texture.key, texture.frame));

    _this.name = 'LogoView';
    _this.anchor.set(0.5);

    _this._buildLabel();
    _this._buildBounds();
    return _this;
  }

  _createClass(LogoView, [{
    key: 'getBounds',
    value: function getBounds() {
      return new Phaser.Rectangle(-70, -80, 835, 150);
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getGameLogoLabelTextConfig)());
      label.anchor.set(0, 0.5);
      label.x = this.width / 2 + 20;
      label.y = 5;
      this.addChild(this._label = label);
    }
  }, {
    key: '_buildBounds',
    value: function _buildBounds() {
      var _getBounds = this.getBounds(),
          x = _getBounds.x,
          y = _getBounds.y,
          width = _getBounds.width,
          height = _getBounds.height;

      var gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 0);
      gr.drawRect(x, y, width, height);
      gr.endFill();

      gr.inputEnabled = true;
      gr.name = 'logo';

      this.addChild(gr);
    }
  }]);

  return LogoView;
}(Phaser.Sprite);

},{"../../configs/text-configs":105,"../../utils":199}],174:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundIconBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */


var _constants = require('../../constants');

var _layoutUtils = require('../../display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _index = require('../../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundIconBuilder = exports.SoundIconBuilder = function () {
  function SoundIconBuilder() {
    _classCallCheck(this, SoundIconBuilder);

    this._onBtn = null;

    this._build();
  }

  _createClass(SoundIconBuilder, [{
    key: 'onResize',
    value: function onResize() {
      this._setPosition();
    }
  }, {
    key: '_build',
    value: function _build() {
      this._onBtn = (0, _index.makeImage)({ frame: 'sound_on.png' });
      this._onBtn.scale.set(0.8);
      soundLoader.registerMuteButton(this._onBtn);

      this._onBtn.name = 'mute_button';
      this._onBtn.input.priorityID = _constants.InputPriority.Foreground;
      CI_API.game.world.add(this._onBtn);

      (0, _index.postRunnable)(function () {
        _layoutUtils2.default.resizeCall(CI_API.game.world);
      });
    }
  }, {
    key: '_setPosition',
    value: function _setPosition() {
      var _this = this;

      (0, _index.postRunnable)(function () {
        var x = void 0;

        var _getViewByProperty = (0, _index.getViewByProperty)('name', 'ForegroundView'),
            logoPosition = _getViewByProperty.logoPosition;

        if (logoPosition) {
          x = LP(logoPosition.x, CI_API.game.width - _this._onBtn.width / 2 - 30);
        } else {
          var _getViewByProperty2 = (0, _index.getViewByProperty)('name', 'CTAView'),
              ctaLogoPos = _getViewByProperty2.logoPosition;

          x = LP(ctaLogoPos.x, CI_API.game.width - _this._onBtn.width / 2 - 30);
        }

        var y = LP(CI_API.game.height / 2 + 15, _this._onBtn.height / 2 + ((0, _index.isSquareLikeScreen)() ? 0 : 15));

        _this._onBtn.x = x;
        _this._onBtn.y = y;
      });
    }
  }]);

  return SoundIconBuilder;
}();

},{"../../constants":107,"../../display/layout-utils":109,"../../utils/index":199}],175:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialSequenceView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _textConfigs = require('../../configs/text-configs');

var _store = require('../../models/store');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var TutorialSequenceView = exports.TutorialSequenceView = function (_Phaser2Grid) {
  _inherits(TutorialSequenceView, _Phaser2Grid);

  function TutorialSequenceView(config, index) {
    _classCallCheck(this, TutorialSequenceView);

    var _this = _possibleConstructorReturn(this, (TutorialSequenceView.__proto__ || Object.getPrototypeOf(TutorialSequenceView)).call(this, CI_API.game));

    _this._showTween = null;
    _this._hideTween = null;

    _this._config = config;
    _this._index = index;
    _this.alpha = 0;

    _this._build();
    return _this;
  }

  _createClass(TutorialSequenceView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getTutorialSequenceGridConfig)();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.game.tweens.remove(this._showTween);
      this.game.tweens.remove(this._hideTween);

      _get(TutorialSequenceView.prototype.__proto__ || Object.getPrototypeOf(TutorialSequenceView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'show',
    value: function show() {
      var delay = void 0;

      if (this._index === 0) {
        delay = (0, _utils.getRetryDelay)(_store.store.ad.retries);
      } else {
        delay = 500;
      }

      this._showTween = this.game.add.tween(this).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, delay);
      return this._showTween;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._hideTween = this.game.add.tween(this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
      return this._hideTween;
    }
  }, {
    key: '_build',
    value: function _build() {
      _get(TutorialSequenceView.prototype.__proto__ || Object.getPrototypeOf(TutorialSequenceView.prototype), 'build', this).call(this, this.getGridConfig());
      this._buildLabel();
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var fill = void 0;
      switch (this._index) {
        case 0:
        case 2:
          fill = '#ffffff';
          break;
        case 1:
        case 3:
          fill = '#fef955';
          break;
        default:
          break;
      }
      this._label = (0, _utils.makeText)((0, _textConfigs.getTutorialTextConfig)(this._config.text, fill));
      this._label.anchor.set(0.5);

      (0, _utils.fitText)(this._label, 400, 400);

      this.setChild('' + this._index, this._label);
    }
  }]);

  return TutorialSequenceView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../configs/text-configs":105,"../../models/store":158,"../../utils":199,"@armathai/phaser2-grid":217}],176:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _tutorialSequenceView = require('./tutorial-sequence-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var TutorialView = exports.TutorialView = function (_Phaser2Grid) {
  _inherits(TutorialView, _Phaser2Grid);

  function TutorialView() {
    _classCallCheck(this, TutorialView);

    var _this = _possibleConstructorReturn(this, (TutorialView.__proto__ || Object.getPrototypeOf(TutorialView)).call(this, CI_API.game));

    _this.build(_this.getGridConfig());

    _this._current = null;
    _this.onSequenceReady = new Phaser.Signal();

    _lego.lego.event.on(_modelEvents.ModelEvents.TutorialSequenceModel.ShowUpdate, _this._onTutorialSequenceShowUpdate, _this);
    _lego.lego.event.on(_modelEvents.ModelEvents.TutorialSequenceModel.CompleteUpdate, _this._onTutorialCurrentCompleteUpdate, _this);
    return _this;
  }

  _createClass(TutorialView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getTutorialGridConfig)();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var destroyChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var soft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _lego.lego.event.off(_modelEvents.ModelEvents.TutorialSequenceModel.ShowUpdate, this._onTutorialSequenceShowUpdate, this).off(_modelEvents.ModelEvents.TutorialSequenceModel.CompleteUpdate, this._onTutorialCurrentCompleteUpdate, this);

      (0, _utils.removeRunnable)(this._showRunnable);
      this.game.tweens.remove(this._showTw);
      this.game.tweens.remove(this._hideTw);
      this._switchScreenInput(false);

      _get(TutorialView.prototype.__proto__ || Object.getPrototypeOf(TutorialView.prototype), 'destroy', this).call(this, destroyChildren, soft);
    }
  }, {
    key: '_onTutorialSequenceShowUpdate',
    value: function _onTutorialSequenceShowUpdate() {
      var sequence = _store.store.ad.tutorial.current;

      if (!sequence) {
        return;
      }

      this._buildSequence(sequence, false);
      this.onSequenceReady.dispatch();
    }
  }, {
    key: '_onTutorialCurrentCompleteUpdate',
    value: function _onTutorialCurrentCompleteUpdate(complete) {
      var _this2 = this;

      if (!complete) {
        return;
      }

      this._switchScreenInput(false);
      this._hideTw = this._current.hide();
      this._hideTw.onComplete.addOnce(function () {
        _this2._current.destroy();
        _this2._current = null;
        _lego.lego.event.emit(_viewEvents.ViewEvents.TutorialView.SequenceHideComplete);
      });
    }
  }, {
    key: '_buildSequence',
    value: function _buildSequence(sequence, force) {
      var _this3 = this;

      this._current = new _tutorialSequenceView.TutorialSequenceView(sequence.config, sequence.index);
      this.setChild('sequence', this._current);

      if (!force) {
        this._showRunnable = (0, _utils.postRunnable)(function () {
          _this3._showTw = _this3._current.show();
          _this3._showTw.onComplete.addOnce(function () {
            var clickToComplete = _store.store.ad.tutorial.current.config.clickToComplete;

            _this3._switchScreenInput(clickToComplete);
          });
        });
      }
    }
  }, {
    key: '_switchScreenInput',
    value: function _switchScreenInput(enable) {
      this.game.input.onDown.remove(this._onScreenClick, this);

      enable && this.game.input.onDown.addOnce(this._onScreenClick, this);
    }
  }, {
    key: '_onScreenClick',
    value: function _onScreenClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.TutorialView.ScreenClick);
    }
  }]);

  return TutorialView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../events/model-events":112,"../../events/view-events":113,"../../models/store":158,"../../utils":199,"./tutorial-sequence-view":175,"@armathai/lego":212,"@armathai/phaser2-grid":217}],177:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _boardConfig = require('../../../configs/board-config');

var _imageConfigs = require('../../../configs/image-configs');

var _constants = require('../../../constants');

var _modelEvents = require('../../../events/model-events');

var _viewEvents = require('../../../events/view-events');

var _store = require('../../../models/store');

var _utils = require('../../../utils');

var _difference = require('../../../utils/array/difference');

var _container = require('../../../utils/container');

var _padView = require('./pad-view');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var BoardView = exports.BoardView = function (_Container) {
  _inherits(BoardView, _Container);

  function BoardView() {
    _classCallCheck(this, BoardView);

    var _this = _possibleConstructorReturn(this, (BoardView.__proto__ || Object.getPrototypeOf(BoardView)).call(this));

    _this._pads = [];

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.BoardModel.PadsUpdate, _this._onPadsUpdate, _this).on(_modelEvents.ModelEvents.BoardModel.StateUpdate, _this._onBoardStateUpdate, _this).on(_modelEvents.ModelEvents.PadModel.StateUpdate, _this._onPadStateUpdate, _this).on(_modelEvents.ModelEvents.SoundPartModel.StateUpdate, _this._onSoundStateUpdate, _this).on(_modelEvents.ModelEvents.TutorialModel.CurrentIndexUpdate, _this._onTutorialIndexUpdate, _this).on(_modelEvents.ModelEvents.AdModel.HintUpdate, _this._onHintUpdate, _this);
    return _this;
  }

  _createClass(BoardView, [{
    key: 'getBounds',
    value: function getBounds() {
      var width = _boardConfig.Column * _constants.PadWidth + _constants.PadGap * 2;
      var height = _boardConfig.Row * _constants.PadHeight + _constants.PadGap * 3;

      return new (Function.prototype.bind.apply(Phaser.Rectangle, [null].concat(_toConsumableArray(LP([-height / 2, -width / 2, height, width], [-width / 2, -height / 2, width, height])))))();
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._hintView && (this._hintView.angle = LP(-120, -30));
    }
  }, {
    key: '_getPadByUuid',
    value: function _getPadByUuid(uuid) {
      return this._pads.find(function (p) {
        return p.uuid === uuid;
      });
    }
  }, {
    key: '_getPadByPosition',
    value: function _getPadByPosition(row, column) {
      return this._pads.find(function (p) {
        return p.row === row && p.column === column;
      });
    }
  }, {
    key: '_onPadsUpdate',
    value: function _onPadsUpdate(pads) {
      this._buildPads(pads);
    }
  }, {
    key: '_onBoardStateUpdate',
    value: function _onBoardStateUpdate(state) {
      switch (state) {
        case _constants.BoardState.Playing:
          this._hintView && this._removeHintPulse();
          break;
        default:
          break;
      }
    }
  }, {
    key: '_onTutorialIndexUpdate',
    value: function _onTutorialIndexUpdate(index) {
      switch (index) {
        case 0:
        case 2:
          this._buildBall();
          this._showBall(index);
          break;
        default:
          break;
      }
    }
  }, {
    key: '_onPadStateUpdate',
    value: function _onPadStateUpdate(state, previousState, uuid) {
      var pad = this._getPadByUuid(uuid);

      switch (state) {
        case _constants.PadState.Idle:
          pad.idle();
          break;
        case _constants.PadState.Blocked:
          pad.block();
          break;
        case _constants.PadState.Enabled:
          pad.enable();
          break;
        case _constants.PadState.Disabled:
          pad.disable();
          break;
        default:
          break;
      }
    }
  }, {
    key: '_onPadClick',
    value: function _onPadClick(uuid) {
      var _store$game$boardMode = _store.store.game.boardModel.getPadByUuid(uuid),
          sound = _store$game$boardMode.sound;

      _lego.lego.event.emit(_viewEvents.ViewEvents.BoardView.PadClick, uuid, sound);
    }
  }, {
    key: '_onSoundStateUpdate',
    value: function _onSoundStateUpdate(state, previousState, uuid) {
      switch (state) {
        case _constants.SoundPartState.Simulate:
          this._ballMovement();
          this._simulateClick(uuid);
          break;
        case _constants.SoundPartState.Hint:
          this._startHintMovement();
          break;
        default:
          break;
      }
    }
  }, {
    key: '_ballMovement',
    value: function _ballMovement() {
      var simulationSound = _store.store.game.boardModel.getSimulationSoundByState(_constants.SoundPartState.Idle);

      if (simulationSound) {
        var name = simulationSound.name,
            startTime = simulationSound.startTime;

        var _store$game$boardMode2 = _store.store.game.boardModel.getPadBySound(name),
            padUuid = _store$game$boardMode2.uuid;

        var position = _store.store.game.boardModel.simulationSequence.map(function (e) {
          return e.state;
        }).indexOf(_constants.SoundPartState.Idle);
        var previousPart = _store.store.game.boardModel.simulationSequence[position - 1];

        var duration = startTime - previousPart.startTime;

        var pad = this._getPadByUuid(padUuid);
        var _pad$position = pad.position,
            x = _pad$position.x,
            y = _pad$position.y;


        this._moveBall(x, y, duration);
      } else {
        this._hideBall().onComplete.add(this._destroyBall, this);
      }
    }
  }, {
    key: '_simulateClick',
    value: function _simulateClick(uuid) {
      var _store$game$boardMode3 = _store.store.game.boardModel.getSimulationSoundByUuid(uuid),
          name = _store$game$boardMode3.name;

      var _store$game$boardMode4 = _store.store.game.boardModel.getPadBySound(name),
          padUuid = _store$game$boardMode4.uuid;

      var pad = this._getPadByUuid(padUuid);
      pad.click();
    }
  }, {
    key: '_buildBall',
    value: function _buildBall() {
      var name = _store.store.game.boardModel.simulationSequence[0].name;

      var _store$game$boardMode5 = _store.store.game.boardModel.getPadBySound(name),
          uuid = _store$game$boardMode5.uuid;

      var _getPadByUuid$positio = this._getPadByUuid(uuid).position,
          x = _getPadByUuid$positio.x,
          y = _getPadByUuid$positio.y;

      this._ball = (0, _utils.makeImage)((0, _imageConfigs.getBallImageConfig)());
      this._ball.scale.set(0.8);
      this._ball.position.set(x + 35, y - 35);

      this.addChild(this._ball);
    }
  }, {
    key: '_showBall',
    value: function _showBall(index) {
      var delay = void 0;

      if (index === 0) {
        delay = (0, _utils.getRetryDelay)(_store.store.ad.retries);
      } else {
        delay = 500;
      }

      this._ballShowTw = this.game.add.tween(this._ball).from({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, delay);

      return this._ballShowTw;
    }
  }, {
    key: '_hideBall',
    value: function _hideBall() {
      this._ballHideTw = this.game.add.tween(this._ball).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);

      return this._ballHideTw;
    }
  }, {
    key: '_destroyBall',
    value: function _destroyBall() {
      this._ball.destroy();
      this._ball = null;
    }
  }, {
    key: '_moveBall',
    value: function _moveBall(x, y, duration) {
      var xArr = [(x + 35) / 1, x + 35];
      var yArr = [(y - 35) / 1.5, y - 35];
      this._ballMoveTw = this.game.add.tween(this._ball).to({ x: xArr, y: yArr }, duration, Phaser.Easing.Linear.None, true, 0);
      this._ballMoveTw.interpolation(Phaser.Math.bezierInterpolation);

      var scaleArr = [0.8, 0.6, 0.8];
      this._ballScaleTw = this.game.add.tween(this._ball.scale).to({ x: scaleArr, y: scaleArr }, duration, Phaser.Easing.Linear.None, true, 0);
      this._ballScaleTw.interpolation(Phaser.Math.bezierInterpolation);

      this._ballMoveTw.universal = true;
      this._ballScaleTw.universal = true;
    }

    // HINT

  }, {
    key: '_onHintUpdate',
    value: function _onHintUpdate(hint) {
      hint && this._buildHint();
    }
  }, {
    key: '_buildHint',
    value: function _buildHint() {
      var name = _store.store.game.boardModel.playSequence[0].name;

      var _store$game$boardMode6 = _store.store.game.boardModel.getPadBySound(name),
          uuid = _store$game$boardMode6.uuid;

      var _getPadByUuid$positio2 = this._getPadByUuid(uuid).position,
          x = _getPadByUuid$positio2.x,
          y = _getPadByUuid$positio2.y;

      this._hintView = (0, _utils.makeImage)((0, _imageConfigs.getHandImageConfig)());
      this._hintView.scale.set(0.9);
      this._hintView.anchor.set(0.4, 0);
      this._hintView.position.set(x, y);
      this._hintView.angle = LP(-120, -30);

      this._hintPulseTw = (0, _utils.pulse)(this._hintView, 0.1);
      this.game.add.tween(this._hintView).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 500);

      this.addChild(this._hintView);
    }
  }, {
    key: '_destroyHint',
    value: function _destroyHint() {
      this._hintView.destroy();
      this._hintView = null;
    }
  }, {
    key: '_hideHint',
    value: function _hideHint() {
      this.game.tweens.remove(this._hintPulseTw);
      this.game.tweens.remove(this._hintScaleTw);
      this.game.tweens.remove(this._hintMoveTw);

      this._hintHideTw = this.game.add.tween(this._hintView).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);

      return this._hintHideTw;
    }
  }, {
    key: '_removeHintPulse',
    value: function _removeHintPulse() {
      this._hintView.scale.set(0.9);
      this.game.tweens.remove(this._hintPulseTw);
    }
  }, {
    key: '_startHintMovement',
    value: function _startHintMovement() {
      var simulationSound = _store.store.game.boardModel.getSimulationSoundByState(_constants.SoundPartState.Idle);

      if (simulationSound) {
        var name = simulationSound.name,
            startTime = simulationSound.startTime;

        var _store$game$boardMode7 = _store.store.game.boardModel.getPadBySound(name),
            padUuid = _store$game$boardMode7.uuid;

        var position = _store.store.game.boardModel.simulationSequence.map(function (e) {
          return e.state;
        }).indexOf(_constants.SoundPartState.Idle);
        var previousPart = _store.store.game.boardModel.simulationSequence[position - 1];

        var duration = startTime - previousPart.startTime;

        var pad = this._getPadByUuid(padUuid);
        var _pad$position2 = pad.position,
            x = _pad$position2.x,
            y = _pad$position2.y;


        this._moveHint(x, y, duration);
      } else {
        this._hideHint().onComplete.add(this._destroyHint, this);
      }
    }
  }, {
    key: '_moveHint',
    value: function _moveHint(x, y, duration) {
      var xArr = [x / 1, x];
      var yArr = [y / 1.5, y];
      this._hintMoveTw = this.game.add.tween(this._hintView).to({ x: xArr, y: yArr }, duration, Phaser.Easing.Linear.None, true, 0);
      this._hintMoveTw.interpolation(Phaser.Math.bezierInterpolation);

      var scaleArr = [0.6, 0.9, 0.6];
      this._hintScaleTw = this.game.add.tween(this._hintView.scale).to({ x: scaleArr, y: scaleArr }, duration, Phaser.Easing.Linear.None, true, 0);
      this._hintScaleTw.interpolation(Phaser.Math.bezierInterpolation);

      this._hintMoveTw.universal = true;
      this._hintScaleTw.universal = true;
    }
  }, {
    key: '_build',
    value: function _build() {
      // this._buildBounds();
    }
  }, {
    key: '_buildBounds',
    value: function _buildBounds() {
      var _getBounds = this.getBounds(),
          x = _getBounds.x,
          y = _getBounds.y,
          width = _getBounds.width,
          height = _getBounds.height;

      var gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 0.5);
      gr.drawRect(x, y, width, height);
      gr.endFill();
      this.addChild(gr);
    }
  }, {
    key: '_buildPads',
    value: function _buildPads(pads) {
      var _this2 = this;

      var padsModels = pads.map(function (p) {
        return p.uuid;
      });
      var padsView = this._pads.map(function (p) {
        return p.uuid;
      });

      var newPads = (0, _difference.difference)(padsModels, padsView);

      newPads.forEach(function (uuid) {
        var _store$game$boardMode8 = _store.store.game.boardModel.getPadByUuid(uuid),
            row = _store$game$boardMode8.row,
            column = _store$game$boardMode8.column;

        var pad = new _padView.PadView(uuid);

        pad.onClick.add(_this2._onPadClick, _this2);
        pad.position.set(column * (_constants.PadWidth + _constants.PadGap) - (_constants.PadWidth + _constants.PadGap), row * (_constants.PadHeight + _constants.PadGap) - (_constants.PadHeight + _constants.PadGap) * 1.5);

        _this2._pads.push(pad);
        _this2.addChild(pad);
      });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'BoardView';
    }
  }]);

  return BoardView;
}(_container.Container);

},{"../../../configs/board-config":87,"../../../configs/image-configs":100,"../../../constants":107,"../../../events/model-events":112,"../../../events/view-events":113,"../../../models/store":158,"../../../utils":199,"../../../utils/array/difference":193,"../../../utils/container":198,"./pad-view":178,"@armathai/lego":212}],178:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PadView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageConfigs = require('../../../configs/image-configs');

var _store = require('../../../models/store');

var _utils = require('../../../utils');

var _container = require('../../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var PadView = exports.PadView = function (_Container) {
  _inherits(PadView, _Container);

  function PadView(uuid) {
    _classCallCheck(this, PadView);

    var _this = _possibleConstructorReturn(this, (PadView.__proto__ || Object.getPrototypeOf(PadView)).call(this));

    _this._uuid = uuid;
    _this.onClick = new Phaser.Signal();

    _this._build();
    return _this;
  }

  _createClass(PadView, [{
    key: 'idle',
    value: function idle() {
      this._blocker.alpha = 0;
    }
  }, {
    key: 'block',
    value: function block() {
      this._blocker.alpha = 0.8;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._bg.inputEnabled = true;
      this._bg.events.onInputDown.add(this._onClick, this);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this._bg.inputEnabled = false;
      this._bg.events.onInputDown.remove(this._onClick, this);
    }
  }, {
    key: 'click',
    value: function click() {
      var _this2 = this;

      this.scale.set(1);
      this._outline.alpha = 1;
      this._innerGlow.alpha = 1;
      this._outline.scale.set(1, 1);

      this.game.tweens.remove(this._padScaleTw);
      this.game.tweens.remove(this._outlineScaleTw);
      this.game.tweens.remove(this._outlineAlphaTw);

      this._padScaleTw = this.game.add.tween(this.scale).to({ x: 0.8, y: 0.8 }, 100, Phaser.Easing.Cubic.InOut, true, 0, 0, true);

      this._outlineScaleTw = this.game.add.tween(this._outline.scale).to({ x: 1.5, y: 1.5 }, 500, Phaser.Easing.Cubic.InOut, true, 0);

      this._outlineAlphaTw = this.game.add.tween(this._outline).to({ alpha: 0 }, 500, Phaser.Easing.Cubic.InOut, true, 0);

      this._padScaleTw.universal = true;

      this._padScaleTw.onComplete.add(function () {
        _this2._innerGlow.alpha = 0;
      });

      this._outlineAlphaTw.onComplete.add(function () {
        _this2._outline.scale.set(1, 1);
        _this2._outline.alpha = 1;
      });
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildOutline();
      this._buildBg();
      this._buildInnerGlow();
      this._buildBlocker();
    }
  }, {
    key: '_buildOutline',
    value: function _buildOutline() {
      var gr = this.game.add.graphics();
      gr.lineStyle(5, 0xffffff, 1);
      gr.drawRoundedRect(-70, -70, 140, 140, 10);
      gr.endFill();

      this.addChild(this._outline = gr);
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var _store$game$boardMode = _store.store.game.boardModel.getPadByUuid(this._uuid),
          color = _store$game$boardMode.color;

      this._bg = (0, _utils.makeImage)((0, _imageConfigs.getPadImageConfig)(color));
      this._bg.name = _store.store.game.boardModel.getPadByUuid(this._uuid).sound;

      this.addChild(this._bg);
    }
  }, {
    key: '_buildInnerGlow',
    value: function _buildInnerGlow() {
      this._innerGlow = (0, _utils.makeImage)((0, _imageConfigs.getPadInnerGlowImageConfig)());
      this._innerGlow.alpha = 0;

      this.addChild(this._innerGlow);
    }
  }, {
    key: '_buildBlocker',
    value: function _buildBlocker() {
      this._blocker = (0, _utils.makeImage)((0, _imageConfigs.getPadImageConfig)('cube_black'));

      this.addChild(this._blocker);
    }
  }, {
    key: '_onClick',
    value: function _onClick() {
      this.click();
      this.onClick.dispatch(this._uuid);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'PadView';
    }
  }, {
    key: 'uuid',
    get: function get() {
      return this._uuid;
    }
  }]);

  return PadView;
}(_container.Container);

},{"../../../configs/image-configs":100,"../../../models/store":158,"../../../utils":199,"../../../utils/container":198}],179:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageConfigs = require('../../configs/image-configs');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DotComponent = exports.DotComponent = function (_Container) {
  _inherits(DotComponent, _Container);

  function DotComponent(uuid) {
    _classCallCheck(this, DotComponent);

    var _this = _possibleConstructorReturn(this, (DotComponent.__proto__ || Object.getPrototypeOf(DotComponent)).call(this));

    _this._uuid = uuid;

    _this._build();
    return _this;
  }

  _createClass(DotComponent, [{
    key: 'getBounds',
    value: function getBounds() {
      return this._dot.getBounds();
    }
  }, {
    key: 'idle',
    value: function idle() {
      this._fill.alpha = 0;
      this._glow.alpha = 0;
      this.game.tweens.remove(this._alphaTw);
    }
  }, {
    key: 'glow',
    value: function glow() {
      var _this2 = this;

      (0, _utils.postRunnable)(function () {
        _this2._alphaTw = _this2.game.add.tween(_this2._glow).to({ alpha: 1 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        _this2._alphaTw.universal = true;
      });
    }
  }, {
    key: 'fill',
    value: function fill() {
      this._fill.alpha = 1;
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildGlow();
      this._buildDot();
      this._buildFill();
    }
  }, {
    key: '_buildGlow',
    value: function _buildGlow() {
      this._glow = (0, _utils.makeImage)((0, _imageConfigs.getProgressBarDotGlowImageConfig)());

      this.addChild(this._glow);
    }
  }, {
    key: '_buildDot',
    value: function _buildDot() {
      this._dot = (0, _utils.makeImage)((0, _imageConfigs.getProgressBarDotImageConfig)());

      this.addChild(this._dot);
    }
  }, {
    key: '_buildFill',
    value: function _buildFill() {
      var gr = this.game.add.graphics();
      gr.beginFill(0xfef955, 1);
      gr.drawCircle(0, 0, 25);
      gr.endFill();

      this.addChild(this._fill = gr);
    }
  }, {
    key: 'uuid',
    get: function get() {
      return this._uuid;
    }
  }]);

  return DotComponent;
}(_container.Container);

},{"../../configs/image-configs":100,"../../utils":199,"../../utils/container":198}],180:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _modelEvents = require('../../events/model-events');

var _boardView = require('./board/board-view');

var _progressBarView = require('./progress-bar-view');

var _timerView = require('./timer-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var GameView = exports.GameView = function (_Phaser2Grid) {
  _inherits(GameView, _Phaser2Grid);

  function GameView() {
    _classCallCheck(this, GameView);

    var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this, CI_API.game));

    _this.build(_this.getGridConfig());

    _this._boardView = null;

    _lego.lego.event.on(_modelEvents.ModelEvents.GameModel.BoardModelUpdate, _this._onBoardUpdate, _this).on(_modelEvents.ModelEvents.GameModel.ProgressBarModelUpdate, _this._onProgressBarUpdate, _this);
    return _this;
  }

  _createClass(GameView, [{
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      this._boardView && this._rebuildBoard();
      this._progressBarView && this._rebuildProgressBar();

      _get(GameView.prototype.__proto__ || Object.getPrototypeOf(GameView.prototype), 'rebuild', this).call(this, config);
    }
  }, {
    key: '_rebuildBoard',
    value: function _rebuildBoard() {
      this._boardView.rebuild();
      this._boardView.angle = LP(90, 0);
    }
  }, {
    key: '_rebuildProgressBar',
    value: function _rebuildProgressBar() {
      this._progressBarView.rebuild();
      this._progressBarView.angle = LP(-90, 0);
    }
  }, {
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getGameGridConfig)();
    }

    // BOARD

  }, {
    key: '_onBoardUpdate',
    value: function _onBoardUpdate(board) {
      board && this._buildBoard();
    }
  }, {
    key: '_buildBoard',
    value: function _buildBoard() {
      this._boardView && this._destroyBoard();

      this._boardView = new _boardView.BoardView();
      this._boardView.angle = LP(90, 0);
      this.setChild('board', this._boardView);
    }
  }, {
    key: '_destroyBoard',
    value: function _destroyBoard() {
      this._boardView.destroy();
      this._boardView = null;
    }

    // PROGRESS BAR

  }, {
    key: '_onProgressBarUpdate',
    value: function _onProgressBarUpdate(progressBar) {
      progressBar && this._buildProgressBar();
    }
  }, {
    key: '_buildProgressBar',
    value: function _buildProgressBar() {
      this._progressBarView && this._destroyProgressBar();
      this._progressBarView = new _progressBarView.ProgressBarView();
      this._progressBarView.angle = LP(-90, 0);
      this.setChild('progress_bar', this._progressBarView);
    }
  }, {
    key: '_destroyProgressBar',
    value: function _destroyProgressBar() {
      this._progressBarView.destroy();
      this._progressBarView = null;
    }

    // TIMER

  }, {
    key: '_onTimerUpdate',
    value: function _onTimerUpdate(timer) {
      timer ? this._buildTimer() : this._destroyTimer();
    }
  }, {
    key: '_buildTimer',
    value: function _buildTimer() {
      this._timerView = new _timerView.TimerView();
      this.setChild('timer', this._timerView);
    }
  }, {
    key: '_destroyTimer',
    value: function _destroyTimer() {
      this._timerView.destroy();
      this._timerView = null;
    }
  }, {
    key: 'name',
    get: function get() {
      return 'GameView';
    }
  }]);

  return GameView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../events/model-events":112,"./board/board-view":177,"./progress-bar-view":182,"./timer-view":183,"@armathai/lego":212,"@armathai/phaser2-grid":217}],181:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointerComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageConfigs = require('../../configs/image-configs');

var _textConfigs = require('../../configs/text-configs');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointerComponent = exports.PointerComponent = function (_Container) {
  _inherits(PointerComponent, _Container);

  function PointerComponent() {
    _classCallCheck(this, PointerComponent);

    var _this = _possibleConstructorReturn(this, (PointerComponent.__proto__ || Object.getPrototypeOf(PointerComponent)).call(this));

    _this._build();

    _this.updateText(0);
    return _this;
  }

  _createClass(PointerComponent, [{
    key: 'updateText',
    value: function updateText(percent) {
      this._label.setText({
        text: parseInt(percent, 10) + ' %',
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._repositionText();
    }
  }, {
    key: '_repositionText',
    value: function _repositionText() {
      this._label.angle = LP(90, 0);
      this._label.anchor.set(LP(1, 0.5), LP(0.5, 1));
      this._label.position.set(LP(-2, 0), LP(this._pointer.top - 5, this._pointer.top));
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildPointer();
      this._buildText();
    }
  }, {
    key: '_buildPointer',
    value: function _buildPointer() {
      this._pointer = (0, _utils.makeImage)((0, _imageConfigs.getProgressBarTriangleImageConfig)());
      this._pointer.anchor.set(0.5, 1);

      this.addChild(this._pointer);
    }
  }, {
    key: '_buildText',
    value: function _buildText() {
      this._label = (0, _utils.makeText)((0, _textConfigs.getPointerTextConfig)());
      this._repositionText();

      (0, _utils.fitText)(this._label, this._pointer.width * 0.95, this._pointer.height);

      this.addChild(this._label);
    }
  }]);

  return PointerComponent;
}(_container.Container);

},{"../../configs/image-configs":100,"../../configs/text-configs":105,"../../utils":199,"../../utils/container":198}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBarView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _store = require('../../models/store');

var _difference = require('../../utils/array/difference');

var _container = require('../../utils/container');

var _dotComponent = require('./dot-component');

var _pointerComponent = require('./pointer-component');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var ProgressBarView = exports.ProgressBarView = function (_Container) {
  _inherits(ProgressBarView, _Container);

  function ProgressBarView() {
    _classCallCheck(this, ProgressBarView);

    var _this = _possibleConstructorReturn(this, (ProgressBarView.__proto__ || Object.getPrototypeOf(ProgressBarView)).call(this));

    _this._dots = [];

    _lego.lego.event.on(_modelEvents.ModelEvents.ProgressBarModel.DotsUpdate, _this._onDotsUpdate, _this).on(_modelEvents.ModelEvents.DotModel.StateUpdate, _this._onDotsStateUpdate, _this).on(_modelEvents.ModelEvents.ProgressBarModel.ProgressUpdate, _this._onProgressUpdate, _this);

    _this._build();
    return _this;
  }

  _createClass(ProgressBarView, [{
    key: 'getBounds',
    value: function getBounds() {
      return new (Function.prototype.bind.apply(Phaser.Rectangle, [null].concat(_toConsumableArray(LP([-13.5, -250, 27, 500], [-250, -13.5, 500, 27])))))();
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      _store.store.ad.status !== _constants.AdStatus.Cta && this._updateProgress(_store.store.game.progressBarModel.progress);
      this._pointer && this._pointer.rebuild();
    }
  }, {
    key: '_onDotsUpdate',
    value: function _onDotsUpdate(dots) {
      this._buildDots(dots);
    }
  }, {
    key: '_onDotsStateUpdate',
    value: function _onDotsStateUpdate(state, previousValue, uuid) {
      var dot = this._getDotByUuid(uuid);

      switch (state) {
        case _constants.DotState.Idle:
          dot.idle();
          break;
        case _constants.DotState.Glowing:
          dot.glow();
          break;
        case _constants.DotState.Filled:
          dot.fill();
          break;
        default:
          break;
      }
    }
  }, {
    key: '_onProgressUpdate',
    value: function _onProgressUpdate(progress) {
      this._updateProgress(progress);
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress(progress) {
      this._updatePointer(progress);
      this._updateGrWidth(this._maskRect, progress);
    }
  }, {
    key: '_getDotByUuid',
    value: function _getDotByUuid(uuid) {
      return this._dots.find(function (d) {
        return d.uuid === uuid;
      });
    }
  }, {
    key: '_updateGrWidth',
    value: function _updateGrWidth(gr, progress) {
      var _fill = this._fill,
          x = _fill.x,
          y = _fill.y,
          width = _fill.width,
          height = _fill.height;

      gr.clear();
      gr.beginFill(0xff0000, 0.6);
      gr.drawRect(x - width / 2, y - height / 2, width * progress, height);
      gr.endFill();
    }
  }, {
    key: '_updatePointer',
    value: function _updatePointer(progress) {
      this._pointer.updateText(progress * 100);
      this._pointer.position.set(progress * this._bg.width - this._bg.width / 2, -10);
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildBg();
      this._buildFill();
      this._buildMask();
      this._buildPointerComponent();

      this._buildBounds();
    }
  }, {
    key: '_buildBounds',
    value: function _buildBounds() {
      var _getBounds = this.getBounds(),
          x = _getBounds.x,
          y = _getBounds.y,
          width = _getBounds.width,
          height = _getBounds.height;

      var gr = this.game.add.graphics();
      gr.beginFill(0xff0000, 0);
      gr.drawRect(x, y, width, height);
      gr.endFill();
      this.addChild(gr);
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var gr = this.game.add.graphics();
      gr.beginFill(0x9396ff, 1);
      gr.drawRoundedRect(-250, -10, 500, 20, 20);
      gr.endFill();

      this.addChild(this._bg = gr);
    }
  }, {
    key: '_buildFill',
    value: function _buildFill() {
      var gr = this.game.add.graphics();
      gr.beginFill(0xfef955, 1);
      gr.drawRoundedRect(-250, -10, 500, 20, 20);
      gr.endFill();

      this.addChild(this._fill = gr);
    }
  }, {
    key: '_buildMask',
    value: function _buildMask() {
      var gr = this.game.add.graphics();
      gr.beginFill(0x00ff00);
      gr.drawRect(0, 0, 0, 0);
      this.addChild(this._maskRect = gr);

      this._fill.mask = gr;
    }
  }, {
    key: '_buildPointerComponent',
    value: function _buildPointerComponent() {
      this._pointer = new _pointerComponent.PointerComponent();
      this._pointer.position.set(this._bg.left, -10);

      this.addChild(this._pointer);
    }
  }, {
    key: '_buildDots',
    value: function _buildDots(dots) {
      var _this2 = this;

      var dotsModels = dots.map(function (d) {
        return d.uuid;
      });
      var dotsView = this._dots.map(function (d) {
        return d.uuid;
      });

      var newDots = (0, _difference.difference)(dotsModels, dotsView);

      newDots.forEach(function (uuid) {
        var dot = new _dotComponent.DotComponent(uuid);

        dot.position.set(_this2._dots.length * (_this2._bg.width / 2) - _this2._bg.width / 2, 0);

        _this2._dots.push(dot);

        _this2.addChild(dot);
      });
    }
  }]);

  return ProgressBarView;
}(_container.Container);

},{"../../constants":107,"../../events/model-events":112,"../../models/store":158,"../../utils/array/difference":193,"../../utils/container":198,"./dot-component":179,"./pointer-component":181,"@armathai/lego":212}],183:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _boardConfig = require('../../configs/board-config');

var _textConfigs = require('../../configs/text-configs');

var _modelEvents = require('../../events/model-events');

var _container = require('../../utils/container');

var _index = require('../../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var TimerView = exports.TimerView = function (_Container) {
  _inherits(TimerView, _Container);

  function TimerView() {
    _classCallCheck(this, TimerView);

    var _this = _possibleConstructorReturn(this, (TimerView.__proto__ || Object.getPrototypeOf(TimerView)).call(this));

    _lego.lego.event.on(_modelEvents.ModelEvents.TimerModel.RemainingUpdate, _this._onTimerUpdate, _this).on(_modelEvents.ModelEvents.TimerModel.StoppedUpdate, _this._onTimerStoppedUpdate, _this);

    _this._build();
    _this._updateText((0, _boardConfig.getGameTime)());
    return _this;
  }

  _createClass(TimerView, [{
    key: '_updateText',
    value: function _updateText(value) {
      var time = (0, _index.msToTime)(value);
      this._label.setText({
        text: '' + parseInt(time.secondsStr, 10),
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(TimerView.prototype.__proto__ || Object.getPrototypeOf(TimerView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: '_onTimerStoppedUpdate',
    value: function _onTimerStoppedUpdate(stopped) {
      if (stopped) {
        // this._hide();
      }
    }
  }, {
    key: '_onTimerUpdate',
    value: function _onTimerUpdate(newValue) {
      this._updateText(newValue);
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildBg();
      this._buildText();
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var gr = this.game.add.graphics();
      gr.beginFill(0x000000, 0.5);
      gr.drawRoundedRect(-100, -50, 200, 100, 20);
      gr.endFill();

      this.addChild(this._bg = gr);
    }
  }, {
    key: '_buildText',
    value: function _buildText() {
      this._label = (0, _index.makeText)((0, _textConfigs.getTimerTextConfig)());
      this._label.anchor.set(0.5);

      (0, _index.fitText)(this._label, this._bg.width * 0.95, this._bg.height);

      this.addChild(this._label);
    }
  }, {
    key: 'name',
    get: function get() {
      return 'TimerView';
    }
  }]);

  return TimerView;
}(_container.Container);

},{"../../configs/board-config":87,"../../configs/text-configs":105,"../../events/model-events":112,"../../utils/container":198,"../../utils/index":199,"@armathai/lego":212}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../configs/grid-configs');

var _constants = require('../constants');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _utils = require('../utils');

var _backgroundView = require('./background/background-view');

var _ctaContainer = require('./cta/cta-container');

var _foregroundView = require('./foreground/foreground-view');

var _soundIconBuilder = require('./foreground/sound-icon-builder');

var _gameView = require('./game/game-view');

var _uiView = require('./ui/ui-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var MainView = exports.MainView = function (_Phaser2Grid) {
  _inherits(MainView, _Phaser2Grid);

  function MainView() {
    _classCallCheck(this, MainView);

    var _this = _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this, CI_API.game));

    _this.build();

    _lego.lego.event.on(_viewEvents.ViewEvents.Game.Resize, _this._onResize, _this).on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this).on(_modelEvents.ModelEvents.SoundModel.IconUpdate, _this._onSoundIconUpdate, _this);
    return _this;
  }

  _createClass(MainView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getMainGridConfig)();
    }
  }, {
    key: 'build',
    value: function build() {
      _get(MainView.prototype.__proto__ || Object.getPrototypeOf(MainView.prototype), 'build', this).call(this, this.getGridConfig());

      this.setChild('main', new _backgroundView.BackgroundView());
      this.setChild('main', new _gameView.GameView());
      this.setChild('main', new _uiView.UIView());
      this.setChild('main', this._ctaView = new _ctaContainer.CTAContainer());
      this.setChild('main', new _foregroundView.ForegroundView());

      (0, _utils.postRunnable)(CI_API.LU.refresh, CI_API.LU);
    }
  }, {
    key: '_onSoundIconUpdate',
    value: function _onSoundIconUpdate(value) {
      value && this._buildSoundIcon();
    }

    // SOUND

  }, {
    key: '_buildSoundIcon',
    value: function _buildSoundIcon() {
      this._sound = new _soundIconBuilder.SoundIconBuilder();
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this._sound && this._sound.onResize();
      this.rebuild(this.getGridConfig());
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.Cta:
          this.rebuildChild(this._ctaView);
          break;
        default:
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return 'MainView';
    }
  }]);

  return MainView;
}(_phaser2Grid.Phaser2Grid);

},{"../configs/grid-configs":89,"../constants":107,"../events/model-events":112,"../events/view-events":113,"../utils":199,"./background/background-view":160,"./cta/cta-container":161,"./foreground/foreground-view":172,"./foreground/sound-icon-builder":174,"./game/game-view":180,"./ui/ui-view":186,"@armathai/lego":212,"@armathai/phaser2-grid":217}],185:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentCTAView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _buttonConfigs = require('../../configs/button-configs');

var _particlesConfigs = require('../../configs/particles-configs');

var _viewEvents = require('../../events/view-events');

var _utils = require('../../utils');

var _button2 = require('../../utils/button/button');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PersistentCTAView = exports.PersistentCTAView = function (_Container) {
  _inherits(PersistentCTAView, _Container);

  function PersistentCTAView() {
    _classCallCheck(this, PersistentCTAView);

    var _this = _possibleConstructorReturn(this, (PersistentCTAView.__proto__ || Object.getPrototypeOf(PersistentCTAView)).call(this));

    _this._build();
    return _this;
  }

  _createClass(PersistentCTAView, [{
    key: 'getBounds',
    value: function getBounds() {
      var _button = this._button,
          width = _button.width,
          height = _button.height;

      return new Phaser.Rectangle(-width / 2, -height / 2, width, height);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._sparkleEmitter && (this._sparkleEmitter.paused = true);
      this.game.tweens.removeFrom(this._button);
      this.game.tweens.removeFrom(this._button.scale);
      _get(PersistentCTAView.prototype.__proto__ || Object.getPrototypeOf(PersistentCTAView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._button.scale.set(LP((0, _utils.isSquareLikeScreen)() ? 0.5 : 0.6, 0.8));
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildButton();
      this._buildPersistentCtaEffect();
    }
  }, {
    key: '_buildPersistentCtaEffect',
    value: function _buildPersistentCtaEffect() {
      var effect = CI_API.Globals.PARAMS.pcta_button_effect;
      switch (effect) {
        case 'sparkle':
          this._buildSparkle();
          break;
        case 'pulse':
          (0, _utils.pulse)(this);
          break;
        case 'both':
          this._buildSparkle();
          (0, _utils.pulse)(this);
          break;
        default:
          break;
      }
    }
  }, {
    key: '_buildButton',
    value: function _buildButton() {
      this._button = new _button2.Button((0, _buttonConfigs.getPersistentCtaButtonConfig)());
      this._button.onClick.add(function () {
        return _lego.lego.event.emit(_viewEvents.ViewEvents.PersistentCtaView.Click);
      }, this);
      this._button.scale.set(LP((0, _utils.isSquareLikeScreen)() ? 0.5 : 0.6, 0.8));
      this.addChild(this._button);
    }
  }, {
    key: '_buildSparkle',
    value: function _buildSparkle() {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;

      this._sparkleEmitter = (0, _utils.makeEmitter)((0, _particlesConfigs.getPCTASparkleEmitterConfig)(this, { x: x, y: y, width: width, height: height }));
      this.bringToTop(this._button);
    }
  }]);

  return PersistentCTAView;
}(_container.Container);

},{"../../configs/button-configs":88,"../../configs/particles-configs":103,"../../events/view-events":113,"../../utils":199,"../../utils/button/button":196,"../../utils/container":198,"@armathai/lego":212}],186:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _modelEvents = require('../../events/model-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _persistentCtaView = require('./persistent-cta-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var UIView = exports.UIView = function (_Phaser2Grid) {
  _inherits(UIView, _Phaser2Grid);

  function UIView() {
    _classCallCheck(this, UIView);

    var _this = _possibleConstructorReturn(this, (UIView.__proto__ || Object.getPrototypeOf(UIView)).call(this, CI_API.game));

    _this.build(_this.getGridConfig());

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.PersistentCtaUpdate, _this._onPersistentCtaUpdate, _this);
    return _this;
  }

  _createClass(UIView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getUIGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      this._persistentCtaView && this._persistentCtaView.rebuild();

      _get(UIView.prototype.__proto__ || Object.getPrototypeOf(UIView.prototype), 'rebuild', this).call(this, config);
    }

    // PERSISTENT

  }, {
    key: '_onPersistentCtaUpdate',
    value: function _onPersistentCtaUpdate(persistentCta) {
      if (persistentCta) {
        this.game.tweens.remove(this._hideTw);
        this._hideTw = null;
        this._persistentCtaView && this._destroyPersistentCta();
        this._buildPersistentCta();
        this._showPersistentCta();
      } else {
        this.game.tweens.remove(this._showTw);
        this._showTw = null;
        this._hidePersistentCta().onComplete.add(this._destroyPersistentCta, this);
      }
    }
  }, {
    key: '_buildPersistentCta',
    value: function _buildPersistentCta() {
      this.setChild('p_cta', this._persistentCtaView = new _persistentCtaView.PersistentCTAView());
    }
  }, {
    key: '_destroyPersistentCta',
    value: function _destroyPersistentCta() {
      this._persistentCtaView.destroy();
      this._persistentCtaView = null;
    }
  }, {
    key: '_showPersistentCta',
    value: function _showPersistentCta() {
      var _LP;

      var twArg = [this._persistentCtaView, (0, _utils.getRetryDelay)(_store.store.ad.retries), 500, false, Phaser.Easing.Cubic.Out];
      this._showTw = (_LP = LP(_utils.showFromBottom, _utils.showFromBottom)).call.apply(_LP, [null].concat(twArg));
      return this._showTw;
    }
  }, {
    key: '_hidePersistentCta',
    value: function _hidePersistentCta() {
      var _LP2;

      var twArg = [this._persistentCtaView, 0, 500, false, Phaser.Easing.Cubic.In];
      this._hideTw = (_LP2 = LP(_utils.hideToBottom, _utils.hideToBottom)).call.apply(_LP2, [null].concat(twArg));
      return this._hideTw;
    }
  }, {
    key: 'name',
    get: function get() {
      return 'UIView';
    }
  }]);

  return UIView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":89,"../../events/model-events":112,"../../models/store":158,"../../utils":199,"./persistent-cta-view":185,"@armathai/lego":212,"@armathai/phaser2-grid":217}],187:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsObservant = AnalyticsObservant;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _store = require('../models/store');

var toSnakeCase = function toSnakeCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function (x) {
    return x.toLowerCase();
  }).join('_');
};

function logCtaOverride() {
  analytics.logProgress('cta_override', 'restart');
}

function logIdledCta() {
  analytics.logProgress('objective', 'idle');
}

function logItemsToCtaReached() {
  analytics.logProgress('objective', 'completed');
}

function logCta() {
  switch (_store.store.ad.cta.reason) {
    case _constants.GameOverReasons.Idled:
      logIdledCta();
      break;
    case _constants.GameOverReasons.ItemsToCtaReached:
      logItemsToCtaReached();
      break;
    default:
      throw new Error('Unknown CTA reason');
  }
}

function onGameDown(pointer) {
  if (!pointer.targetObject || !pointer.targetObject.sprite) {
    analytics.logClick('first_interaction_click', 'unknown');
    return;
  }
  analytics.logClick('first_interaction_click', toSnakeCase(pointer.targetObject.sprite.name));
}

function onCtaScreenClick() {
  analytics.logClick('cta_click', 'cta_overlay');
}

function onCtaPlayClick() {
  analytics.logClick('cta_click', 'cta_button');
}

function onCtaRetryClick() {
  analytics.logClick('cta_click', 'retry_button');
}

function onCtaOptionClick(optionName) {
  analytics.logClick('option_click', optionName);
}

function onPersistentCtaClick() {
  analytics.logClick('cta_click', 'persistent_cta_button');
}

function onTutorialCompleteUpdate(complete) {
  if (complete) {
    analytics.logProgress('tutorial', 'complete');
  }
}

function onTutorialSkipUpdate(skip) {
  if (skip) {
    analytics.logProgress('tutorial', 'skipped');
  }
}

function onViewStateUpdate(state) {
  switch (state) {
    case _constants.AdViewState.Create:
      CI_API.game.input.onDown.addOnce(onGameDown, this);
      _lego.lego.event.off(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, onViewStateUpdate, this);
      break;
    default:
  }
}

function onAdStatusUpdate(status) {
  switch (status) {
    case _constants.AdStatus.Restart:
      logCtaOverride();
      break;
    default:
  }
}

function onCtaVisibleUpdate(visible) {
  if (!visible) {
    return;
  }

  logCta();
}

function AnalyticsObservant() {
  _lego.lego.event.on(_viewEvents.ViewEvents.CtaView.ScreenClick, onCtaScreenClick, this).on(_viewEvents.ViewEvents.CtaView.PlayClick, onCtaPlayClick, this).on(_viewEvents.ViewEvents.CtaView.RetryClick, onCtaRetryClick, this).on(_viewEvents.ViewEvents.CtaView.OptionClick, onCtaOptionClick, this).on(_viewEvents.ViewEvents.PersistentCtaView.Click, onPersistentCtaClick, this).on(_modelEvents.ModelEvents.TutorialModel.CompleteUpdate, onTutorialCompleteUpdate, this).on(_modelEvents.ModelEvents.TutorialModel.SkipUpdate, onTutorialSkipUpdate, this).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, onViewStateUpdate, this).on(_modelEvents.ModelEvents.AdModel.StatusUpdate, onAdStatusUpdate, this).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, onCtaVisibleUpdate, this);
}

},{"../constants":107,"../events/model-events":112,"../events/view-events":113,"../models/store":158,"@armathai/lego":212}],188:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundObservant = SoundObservant;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _store = require('../models/store');

var sfx = void 0;

function play(id) {
  var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  sfx.play(id, volume);
}

function stop(id) {
  sfx.stop(id);
}

function onLoadCompleteUpdate(complete) {
  if (!complete) {
    return;
  }

  sfx = soundLoader.addAudioSprite('audio');
}

function onAdStatusUpdate(status) {
  switch (status) {
    case _constants.AdStatus.Game:
      stop('faded_preview');
      stop('closer_preview');
      break;
    case _constants.AdStatus.PreCta:
      stop('first_sequence');
      stop('second_sequence');
      stop('drum_1');
      stop('drum_2');
      stop('drum_3');
      stop('missing_part_1');
      stop('missing_part_2');
      break;
    default:
      break;
  }
}

function onPadClick(uuid, sound) {
  play(sound);
}

function onSoundPartStateUpdate(state, previousState, uuid) {
  switch (state) {
    case _constants.SoundPartState.Autoplay:
      play(_store.store.game.boardModel.getAutoPlaySoundByUuid(uuid).name);
      break;
    case _constants.SoundPartState.Simulate:
      play(_store.store.game.boardModel.getSimulationSoundByUuid(uuid).name);
      break;
    default:
      break;
  }
}

function onOptionPreview(option) {
  switch (option) {
    case 0:
      play('faded_preview');
      break;
    case 1:
      play('closer_preview');
      break;
    default:
      break;
  }
}

function SoundObservant() {
  _lego.lego.event.on(_modelEvents.ModelEvents.LoadModel.CompleteUpdate, onLoadCompleteUpdate, this).on(_modelEvents.ModelEvents.AdModel.StatusUpdate, onAdStatusUpdate, this).on(_viewEvents.ViewEvents.BoardView.PadClick, onPadClick, this).on(_modelEvents.ModelEvents.SoundPartModel.StateUpdate, onSoundPartStateUpdate, this).on(_viewEvents.ViewEvents.CtaView.OptionPreview, onOptionPreview, this);
}

},{"../constants":107,"../events/model-events":112,"../events/view-events":113,"../models/store":158,"@armathai/lego":212}],189:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperObservant = WrapperObservant;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _store = require('../models/store');

function hideSplash() {
  wrapper_hide_splash();
}

function onLoadProgress(progress) {
  wrapper_load_progress(progress);
}

function onLoadComplete() {
  wrapper_preload_complete();
}

function onViewStateUpdate(state) {
  state === _constants.AdViewState.Create && hideSplash();
}

function clickGo() {
  wrapper_click_go();
}

function onCtaVisibleUpdate(visible) {
  if (!visible) {
    return;
  }

  if (_store.store.ad.cta.reason === _constants.GameOverReasons.Unknown) {
    // eslint-disable-next-line no-console
    console.error('Please provide game over reason');
  }

  wrapper_mark_cta(_store.store.ad.cta.reason);
}

function markInteraction() {
  wrapper_mark_interaction();
}

function WrapperObservant() {
  _lego.lego.event.on(_modelEvents.ModelEvents.LoadModel.ProgressUpdate, onLoadProgress, this).on(_modelEvents.ModelEvents.LoadModel.CompleteUpdate, onLoadComplete, this).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, onViewStateUpdate, this).on(_viewEvents.ViewEvents.PersistentCtaView.Click, clickGo, this).on(_viewEvents.ViewEvents.CtaView.ScreenClick, clickGo, this).on(_viewEvents.ViewEvents.CtaView.PlayClick, clickGo, this).on(_viewEvents.ViewEvents.CtaView.OptionClick, clickGo, this).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, onCtaVisibleUpdate, this).on(_viewEvents.ViewEvents.Game.UserInteraction, markInteraction, this);
}

},{"../constants":107,"../events/model-events":112,"../events/view-events":113,"../models/store":158,"@armathai/lego":212}],190:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _viewEvents = require('../events/view-events');

var _store = require('../models/store');

var _mainView = require('../objects/main-view');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var GameState = exports.GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));

    _this._adModel = _store.store.ad;
    _this._mainView = null;
    return _this;
  }

  _createClass(GameState, [{
    key: 'init',
    value: function init() {
      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'init', this).call(this);

      _store.store.ad.viewState = _constants.AdViewState.Init;
    }
  }, {
    key: 'preload',
    value: function preload(game) {
      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'preload', this).call(this, game);

      _store.store.ad.viewState = _constants.AdViewState.Preload;
    }
  }, {
    key: 'create',
    value: function create(game) {
      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'create', this).call(this, game);

      this._mainView = new _mainView.MainView();

      this.input.onDown.add(function () {
        _lego.lego.event.emit(_viewEvents.ViewEvents.Game.UserInteraction);
      });

      this.game.world.handleResize = function (orientation) {
        (0, _utils.manageUniversalTweens)();
        _lego.lego.event.emit(_viewEvents.ViewEvents.Game.Resize, orientation);
      };

      _store.store.ad.viewState = _constants.AdViewState.Create;
    }
  }, {
    key: 'shutdown',
    value: function shutdown(game) {
      _store.store.ad.viewState = _constants.AdViewState.ShutDown;

      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'shutdown', this).call(this, game);
    }
  }, {
    key: 'update',
    value: function update() {
      var _CI_API = CI_API,
          Globals = _CI_API.Globals,
          game = _CI_API.game;


      _get(GameState.prototype.__proto__ || Object.getPrototypeOf(GameState.prototype), 'update', this).call(this, game);

      if (ad_state === 'live' && this._adModel.status !== _constants.AdStatus.Cta) {
        if (game.time.totalElapsedSeconds() - Globals.LAST_INTERACTION_TIME > Globals.PARAMS.cta_on_idle_time * 0.001) {
          _lego.lego.event.emit(_viewEvents.ViewEvents.GameState.CtaIdleTime);
        }
      }
    }
  }, {
    key: 'victory',
    value: function victory(_reason) {
      //
    }
  }, {
    key: 'defeat',
    value: function defeat(_reason) {
      //
    }
  }]);

  return GameState;
}(Phaser.State);

},{"../constants":107,"../events/view-events":113,"../models/store":158,"../objects/main-view":184,"../utils":199,"@armathai/lego":212}],191:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloaderState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _layoutUtils = require('../display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _viewEvents = require('../events/view-events');

require('../kernel/atlas-rescale');

require('../kernel/multiple-atlas');

var _store = require('../models/store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var PreloaderState = exports.PreloaderState = function (_Phaser$State) {
  _inherits(PreloaderState, _Phaser$State);

  function PreloaderState() {
    _classCallCheck(this, PreloaderState);

    return _possibleConstructorReturn(this, (PreloaderState.__proto__ || Object.getPrototypeOf(PreloaderState)).apply(this, arguments));
  }

  _createClass(PreloaderState, [{
    key: 'init',
    value: function init() {
      if (this.game && this.game.device && this.game.device.touch) {
        this.game.input.mouse.stop();
      }
      this.stage.backgroundColor = '#010101';
      this.stage.disableVisibilityChange = true;

      _layoutUtils2.default.init(this.game, true);
    }

    /**
     * Required function, please do not delete <br>
     * Enable handlers and use imageLoader to preload assets
     *
     * @name preload
     * @function
     * @returns {void}
     */

  }, {
    key: 'preload',
    value: function preload() {
      utils.enableHandlers(this.game);

      imageLoader.registerGame(this.game);
      /**
       * Loading assets and modules due to xp-assets.json file params
       */
      xp.loadAssets({
        // spine: [
        //   'tiffy_happy',              // Spine name can be set as the string
        //   {name:'yeti_dance'},              // Spine name can be set as Object.name value
        //   {name: 'mr-toffe', scale: 0.5}  // define the custom scale of Spine animation if needed
        //   {name: 'mr-toffe', scale: 0.5, basePath: 'spineAnimation1/'}  // define custom spine assets path
        // ]
      });
      if (CI_API.Globals.PARAMS.sound) {
        this.preloadAudio();
      }
    }
  }, {
    key: 'preloadAudio',
    value: function preloadAudio() {
      soundLoader.registerGame(this.game);
      soundLoader.loadAudioSprite('audio', CI_API.Globals.WEB_ROOT + '/audio/audio.mp3', CI_API.Globals.WEB_ROOT + '/embed/audio.json');
    }

    /**
     * Required function, please do not delete <br>
     *
     * @name create
     * @function
     * @returns {void}
     */

  }, {
    key: 'create',
    value: function create() {
      _store.store.ad.load.complete = true;
    }

    /**
     * @name loadUpdate
     * @function
     * @returns {void}
     */

  }, {
    key: 'loadUpdate',
    value: function loadUpdate() {
      _store.store.ad.load.progress = this.game.load.progress;
    }

    /**
     * Required function, please do not delete <br>
     * ad_state being set to live is important for partnerships
     *
     * @name update
     * @function
     * @returns {void}
     */

  }, {
    key: 'update',
    value: function update() {
      if (ad_state === 'ready') {
        ad_state = 'live';

        _lego.lego.event.emit(_viewEvents.ViewEvents.Ad.Live);
      }
    }
  }]);

  return PreloaderState;
}(Phaser.State);

},{"../display/layout-utils":109,"../events/view-events":113,"../kernel/atlas-rescale":136,"../kernel/multiple-atlas":138,"../models/store":158,"@armathai/lego":212}],192:[function(require,module,exports){
'use strict';

localization.registerStrings({
  'Tutorial Text 1': {
    en: 'Tap to listen!'
  },
  'Tutorial Text 2': {
    en: "Now it's your turn!"
  },
  cta_btn_persistent_text: {
    en: 'MAKE YOUR OWN BEAT'
  },
  'Download Now': {
    en: 'DOWNLOAD NOW'
  },
  Download: {
    en: 'DOWNLOAD'
  },
  'Play Now': {
    en: 'PLAY NOW'
  },
  Play: {
    en: 'PLAY'
  },
  Continue: {
    en: 'CONTINUE'
  },
  RETRY: {
    en: 'RETRY'
  },
  'NEXT SONG': {
    en: 'NEXT SONG'
  },
  'WELL DONE!': {
    en: 'WELL DONE!'
  },
  'BEAT MAKER PRO': {
    en: 'BEAT MAKER PRO'
  },
  Choose: {
    en: 'Choose '
  },
  'your next song!': {
    en: 'your next song!'
  },
  Faded: {
    en: 'Faded'
  },
  Closer: {
    en: 'Closer'
  },
  'Alan Walker': {
    en: 'Alan Walker'
  },
  'The Chainsmokers': {
    en: 'The Chainsmokers'
  },
  'Original by': {
    en: 'Original by'
  }
});

},{}],193:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var difference = exports.difference = function difference(arrA, arrB) {
  return arrA.filter(function (x) {
    return !arrB.includes(x);
  });
};

},{}],194:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var last = exports.last = function last(arr) {
  return arr.slice(-1)[0];
};

},{}],195:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inputHandler = require('./input-handler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var AbstractButton = exports.AbstractButton = function (_InputHandler) {
  _inherits(AbstractButton, _InputHandler);

  function AbstractButton(_ref) {
    var states = _ref.states,
        input = _ref.input;

    _classCallCheck(this, AbstractButton);

    var _this = _possibleConstructorReturn(this, (AbstractButton.__proto__ || Object.getPrototypeOf(AbstractButton)).call(this));

    _this.onClick = new Phaser.Signal();
    _this.states = _this.createStates(states);
    _this.inputArea = _this.createHitArea(input);

    _this.switchEnable(true);
    return _this;
  }

  _createClass(AbstractButton, [{
    key: 'switchEnable',
    value: function switchEnable(value) {
      _get(AbstractButton.prototype.__proto__ || Object.getPrototypeOf(AbstractButton.prototype), 'switchInput', this).call(this, value);

      this.setState('up');

      if (value === false) {
        this.setState('disable');
      }
    }

    // override

  }, {
    key: 'onDown',
    value: function onDown(_target, _pointer) {
      this.setState('down');
    }

    // override

  }, {
    key: 'onUp',
    value: function onUp(target, pointer, isOver) {
      this.setState('up');

      if (isOver) {
        this.onClick.dispatch(this);
      }
    }
  }, {
    key: 'createStates',
    value: function createStates() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$up = _ref2.up,
          up = _ref2$up === undefined ? null : _ref2$up,
          _ref2$down = _ref2.down,
          down = _ref2$down === undefined ? null : _ref2$down,
          _ref2$disable = _ref2.disable,
          disable = _ref2$disable === undefined ? null : _ref2$disable;

      return {
        up: up && this.createState(up),
        down: down && this.createState(down),
        disable: disable && this.createState(disable)
      };
    }

    // abstract

  }, {
    key: 'createState',
    value: function createState(_config) {
      throw new Error('createState abstract function is not implemented');
    }
  }, {
    key: 'setState',
    value: function setState(key) {
      var _this2 = this;

      if (!this.states[key]) {
        return;
      }
      Object.keys(this.states).forEach(function (prop) {
        var state = _this2.states[prop];
        if (!state) {
          return;
        }
        state.visible = false;
      });

      this.states[key].visible = true;
    }
  }]);

  return AbstractButton;
}(_inputHandler.InputHandler);

},{"./input-handler":197}],196:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('..');

var _abstractButton = require('./abstract-button');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_AbstractButton) {
  _inherits(Button, _AbstractButton);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'createState',
    value: function createState(config) {
      var state = new Phaser.Group(this.game);

      var bg = config.bg,
          label = config.label,
          _config$fitWidth = config.fitWidth,
          fitWidth = _config$fitWidth === undefined ? 0.9 : _config$fitWidth,
          _config$fitHeight = config.fitHeight,
          fitHeight = _config$fitHeight === undefined ? 0.9 : _config$fitHeight;

      // FRAME

      var bgObj = bg.width && bg.height ? (0, _.makeNinePatch)(bg) : (0, _.makeImage)(bg);
      state.add(bgObj);

      // LABEL
      if (label) {
        var labelObj = (0, _.makeText)(label);
        labelObj.anchor.set(0.5);
        state.add(labelObj);

        (0, _.fitText)(labelObj, bgObj.width * fitWidth, bgObj.height * fitHeight);
      }

      return this.add(state);
    }
  }]);

  return Button;
}(_abstractButton.AbstractButton);

},{"..":199,"./abstract-button":195}],197:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable class-methods-use-this */
var InputHandler = exports.InputHandler = function (_Phaser$Group) {
  _inherits(InputHandler, _Phaser$Group);

  function InputHandler() {
    _classCallCheck(this, InputHandler);

    var _this = _possibleConstructorReturn(this, (InputHandler.__proto__ || Object.getPrototypeOf(InputHandler)).call(this, CI_API.game));

    _this.inputArea = null;
    return _this;
  }

  _createClass(InputHandler, [{
    key: 'switchInput',
    value: function switchInput(value) {
      this.inputArea.input.reset();
      this.inputArea.input.enabled = value;
    }
  }, {
    key: 'onDown',
    value: function onDown(_target, _pointer) {}
  }, {
    key: 'onUp',
    value: function onUp(_target, _pointer, _isOver) {}
  }, {
    key: 'onOver',
    value: function onOver(_target, _pointer) {}
  }, {
    key: 'createHitArea',
    value: function createHitArea() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$name = _ref.name,
          name = _ref$name === undefined ? '' : _ref$name,
          _ref$shape = _ref.shape,
          shape = _ref$shape === undefined ? null : _ref$shape,
          _ref$priority = _ref.priority,
          priority = _ref$priority === undefined ? 0 : _ref$priority;

      var gr = this.game.make.graphics();
      gr.beginFill(0xffffff, 0);
      gr.drawShape(shape || new Phaser.Rectangle(0, 0, this.width, this.height));
      gr.endFill();

      gr.inputEnabled = true;
      gr.input.name = name;
      gr.name = name;
      gr.input.priorityID = priority;
      gr.events.onInputDown.add(this.onDown, this);
      gr.events.onInputUp.add(this.onUp, this);
      gr.events.onInputOver.add(this.onOver, this);
      gr.centerX = this.centerX;
      gr.centerY = this.centerY;

      this.add(gr);
      this.inputArea = gr;
      return gr;
    }
  }, {
    key: 'enabled',
    get: function get() {
      return this.inputArea.input.enabled;
    }
  }]);

  return InputHandler;
}(Phaser.Group);

},{}],198:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = exports.Container = function (_Phaser$Group) {
  _inherits(Container, _Phaser$Group);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, CI_API.game));
  }

  _createClass(Container, [{
    key: 'destroy',
    value: function destroy() {
      var destroyChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var soft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _lego.lego.event.removeListenersOf(this);

      _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'destroy', this).call(this, destroyChildren, soft);
    }
  }]);

  return Container;
}(Phaser.Group);

_phaser2Grid.Phaser2Grid.prototype.destroy = Container.prototype.destroy;

},{"@armathai/lego":212,"@armathai/phaser2-grid":217}],199:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweenTint = exports.makePixel = exports.getGameBounds = exports.postRunnable = exports.loopRunnable = exports.removeRunnable = exports.delayRunnable = exports.searchAtlasByFrame = undefined;
exports.fitText = fitText;
exports.tweenNumber = tweenNumber;
exports.getViewByProperty = getViewByProperty;
exports.makeText = makeText;
exports.makeSpine = makeSpine;
exports.makeAnimation = makeAnimation;
exports.makeImage = makeImage;
exports.makeNinePatch = makeNinePatch;
exports.makeEmitter = makeEmitter;
exports.makeGradient = makeGradient;
exports.updateUniversalTweenData = updateUniversalTweenData;
exports.completeTween = completeTween;
exports.manageUniversalTweens = manageUniversalTweens;
exports.makeUniversalTween = makeUniversalTween;
exports.getRelativeScale = getRelativeScale;
exports.getRelativePosition = getRelativePosition;
exports.getRelativeTransform = getRelativeTransform;
exports.isSquareLikeScreen = isSquareLikeScreen;
exports.isNarrowScreen = isNarrowScreen;
exports.tweenToCell = tweenToCell;
exports.pulse = pulse;
exports.showFromBottom = showFromBottom;
exports.showFromRight = showFromRight;
exports.showFromLeft = showFromLeft;
exports.showFromUp = showFromUp;
exports.hideToBottom = hideToBottom;
exports.hideToRight = hideToRight;
exports.hideToLeft = hideToLeft;
exports.hideToUp = hideToUp;
exports.handScaleTw = handScaleTw;
exports.handMoveTw = handMoveTw;
exports.tintSlot = tintSlot;
exports.tintSpine = tintSpine;
exports.msToTime = msToTime;
exports.getRetryDelay = getRetryDelay;

var _objectKeys = require('./object/object-keys');

var _universalTween = require('./tween/universal-tween');

/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
function updateTextSize(textGameObject, fontSize) {
  var styleRef = textGameObject.style;
  styleRef.fontSize = fontSize;
  textGameObject.setStyle(styleRef);
}

var searchAtlasByFrame = exports.searchAtlasByFrame = function searchAtlasByFrame(frame) {
  var atlas = imageLoader._atlases.find(function (a) {
    return !!CI_API.game.cache.getFrameByName(a, frame);
  });
  return atlas ? { key: atlas, frame: frame } : { key: frame };
};

var delayRunnable = exports.delayRunnable = function delayRunnable(delay, runnable, context) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var _CI_API$game$time$eve;

  return (_CI_API$game$time$eve = CI_API.game.time.events).add.apply(_CI_API$game$time$eve, [delay, runnable, context].concat(args));
};

var removeRunnable = exports.removeRunnable = function removeRunnable(runnable) {
  return CI_API.game.time.events.remove(runnable);
};

var loopRunnable = exports.loopRunnable = function loopRunnable(delay, runnable, context) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  var _CI_API$game$time$eve2;

  return (_CI_API$game$time$eve2 = CI_API.game.time.events).loop.apply(_CI_API$game$time$eve2, [delay, runnable, context].concat(args));
};

var postRunnable = exports.postRunnable = function postRunnable(runnable, context) {
  for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return delayRunnable.apply(undefined, [CI_API.game.time.physicsElapsedMS, runnable, context].concat(args));
};

function fitText(textGameObject, width, height) {
  if (textGameObject.__defaultFontSize__) {
    updateTextSize(textGameObject, textGameObject.__defaultFontSize__);
  }

  var fontSize = textGameObject.fontSize,
      textWidth = textGameObject.width,
      textHeight = textGameObject.height;

  var ratioW = width ? width / textWidth : 1;
  var ratioH = height ? height / textHeight : 1;
  var ratio = Math.min(Math.min(ratioW, ratioH), 1);

  if (typeof fontSize === 'number') {
    var newFontSize = fontSize * ratio;
    updateTextSize(textGameObject, newFontSize);
  }
}

var getGameBounds = exports.getGameBounds = function getGameBounds() {
  var _CI_API$game = CI_API.game,
      width = _CI_API$game.width,
      height = _CI_API$game.height;


  return new Phaser.Rectangle(0, 0, width, height);
};

function tweenNumber(config) {
  var from = config.from,
      to = config.to,
      duration = config.duration,
      _config$onUpdate = config.onUpdate,
      onUpdate = _config$onUpdate === undefined ? function () {} : _config$onUpdate,
      _config$onComplete = config.onComplete,
      onComplete = _config$onComplete === undefined ? function () {} : _config$onComplete,
      _config$onStart = config.onStart,
      onStart = _config$onStart === undefined ? function () {} : _config$onStart,
      context = config.context,
      _config$step = config.step,
      step = _config$step === undefined ? 1 : _config$step;

  var localStep = 0;
  var tweenObj = { from: from, to: to };
  var t = CI_API.game.add.tween(tweenObj).to({ from: to }, duration, Phaser.Easing.Sinusoidal.Out, true);
  t.onStart.addOnce(function () {
    onStart.call(context);
  });
  t.onUpdateCallback(function (tween) {
    localStep += 1;
    if (localStep === step) {
      onUpdate.call(context, tween.target.from);
      localStep = 0;
    }
  });
  t.onComplete.addOnce(function () {
    tweenObj.from = to;
    onUpdate.call(context, tweenObj.from);
    onComplete.call(context);
  });
  return t;
}

function getViewByProperty(prop, value, parent) {
  var _ref = parent || CI_API.game.world,
      children = _ref.children;

  if (!children || children.length === 0) {
    return null;
  }

  for (var i = 0; i < children.length; i += 1) {
    var child = children[i];
    if (child[prop] === value) {
      return child;
    }

    var view = getViewByProperty(prop, value, child);
    if (view) {
      return view;
    }
  }

  return null;
}

function makeText(config) {
  var text = config.text,
      _config$style = config.style,
      style = _config$style === undefined ? {} : _config$style,
      _config$x = config.x,
      x = _config$x === undefined ? 0 : _config$x,
      _config$y = config.y,
      y = _config$y === undefined ? 0 : _config$y;
  var shadow = style.shadow,
      gradient = style.gradient,
      _style$lineSpacing = style.lineSpacing,
      lineSpacing = _style$lineSpacing === undefined ? 0 : _style$lineSpacing,
      fontSize = style.fontSize;


  var label = CI_API.game.add.text(x, y, text, style);
  label.lineSpacing = lineSpacing;

  if (fontSize) {
    label.__defaultFontSize__ = fontSize;
  }

  if (shadow) {
    var shadowX = shadow.x,
        shadowY = shadow.y,
        color = shadow.color,
        blur = shadow.blur,
        shadowStroke = shadow.shadowStroke,
        shadowFill = shadow.shadowFill;

    label.setShadow(shadowX, shadowY, color, blur, shadowStroke, shadowFill);
  }

  if (gradient) {
    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    var grd = label.context.createLinearGradient(0, 0, 0, label.height);
    gradient.forEach(function (grdConfig) {
      var offset = grdConfig.offset,
          color = grdConfig.color;

      grd.addColorStop(offset, color);
    });
    label.fill = grd;
  }

  return label;
}

function makeSpine(config) {
  var key = config.key,
      _config$x2 = config.x,
      x = _config$x2 === undefined ? 0 : _config$x2,
      _config$y2 = config.y,
      y = _config$y2 === undefined ? 0 : _config$y2,
      scalingVariant = config.scalingVariant,
      _config$scale = config.scale,
      scale = _config$scale === undefined ? { x: 1, y: 1 } : _config$scale,
      skin = config.skin;

  var spine = CI_API.game.add.spine(x, y, key, scalingVariant);
  spine.scale.copyFrom(scale);
  skin && spine.setSkinByName(skin);
  return spine;
}

function makeAnimation(config) {
  var key = config.key,
      _config$x3 = config.x,
      x = _config$x3 === undefined ? 0 : _config$x3,
      _config$y3 = config.y,
      y = _config$y3 === undefined ? 0 : _config$y3,
      data = config.data;

  var animation = imageLoader.spriteMake(x, y, key);
  data.forEach(function (d) {
    var name = d.name,
        prefix = d.prefix,
        start = d.start,
        stop = d.stop,
        suffix = d.suffix,
        zeroPad = d.zeroPad,
        frameRate = d.frameRate,
        loop = d.loop;

    animation.animations.add(name, Phaser.Animation.generateFrameNames(prefix, start, stop, suffix, zeroPad), frameRate, loop);
  });
  return animation;
}

function makeImage(config) {
  var frame = config.frame,
      _config$x4 = config.x,
      x = _config$x4 === undefined ? 0 : _config$x4,
      _config$y4 = config.y,
      y = _config$y4 === undefined ? 0 : _config$y4,
      tint = config.tint,
      _config$scale2 = config.scale,
      scale = _config$scale2 === undefined ? { x: 1, y: 1 } : _config$scale2,
      _config$anchor = config.anchor,
      anchor = _config$anchor === undefined ? { x: 0.5, y: 0.5 } : _config$anchor;
  var sx = scale.x,
      sy = scale.y;
  var ax = anchor.x,
      ay = anchor.y;


  var img = imageLoader.spriteMake(x, y, frame);

  if (tint) img.tint = tint;
  img.scale.set(sx, sy);
  img.anchor.set(ax, ay);

  return img;
}

function makeNinePatch(config) {
  var frame = config.frame,
      _config$x5 = config.x,
      x = _config$x5 === undefined ? 0 : _config$x5,
      _config$y5 = config.y,
      y = _config$y5 === undefined ? 0 : _config$y5,
      width = config.width,
      height = config.height,
      tint = config.tint,
      _config$anchor2 = config.anchor,
      anchor = _config$anchor2 === undefined ? { x: 0.5, y: 0.5 } : _config$anchor2;
  var ax = anchor.x,
      ay = anchor.y;

  var texture = searchAtlasByFrame(frame);
  var ninePatch = CI_API.game.add.ninePatch(x, y, texture.key, texture.frame, width, height);
  if (tint) ninePatch.tint = tint;
  ninePatch.anchor.set(ax, ay);

  return ninePatch;
}

function makeEmitter(config) {
  var key = config.key,
      parent = config.parent,
      _config$x6 = config.x,
      x = _config$x6 === undefined ? 0 : _config$x6,
      _config$y6 = config.y,
      y = _config$y6 === undefined ? 0 : _config$y6,
      emitterConfig = config.config,
      _config$force = config.force,
      force = _config$force === undefined ? { x: 0, y: 0 } : _config$force;

  var emitter = CI_API.game.particleStorm.createEmitter();
  emitter.addToWorld(parent);
  emitter.force.set(force.x, force.y);
  emitter.emit(key, x, y, emitterConfig);

  return emitter;
}

var makePixel = exports.makePixel = function () {
  var texture = null;

  return function (config) {
    if (!texture) {
      texture = CI_API.game.make.graphics(0, 0).beginFill(0xffffff).drawRect(0, 0, 4, 4).endFill().generateTexture();
    }
    var _config$x7 = config.x,
        x = _config$x7 === undefined ? 0 : _config$x7,
        _config$y7 = config.y,
        y = _config$y7 === undefined ? 0 : _config$y7,
        width = config.width,
        height = config.height,
        _config$alpha = config.alpha,
        alpha = _config$alpha === undefined ? 1 : _config$alpha,
        _config$tint = config.tint,
        tint = _config$tint === undefined ? 0x0 : _config$tint;

    var pixel = CI_API.game.make.sprite(x, y, texture);
    pixel.width = width;
    pixel.height = height;
    pixel.tint = tint;
    pixel.alpha = alpha;

    return pixel;
  };
}();

function makeGradient(config) {
  var width = config.width,
      height = config.height,
      colors = config.colors,
      vertical = config.vertical,
      horizontal = config.horizontal;


  var bmp = CI_API.game.add.bitmapData(width, height);
  var grd = bmp.context.createLinearGradient(0, 0, width * horizontal, vertical * height);
  colors.forEach(function (c) {
    var percent = c.percent,
        color = c.color;

    grd.addColorStop(percent, color);
  });
  bmp.context.fillStyle = grd;
  bmp.context.fillRect(0, 0, width, height);

  var img = CI_API.game.make.sprite(0, 0, bmp);

  return img;
}

function updateUniversalTweenData(tw) {
  var timeline = tw.timeline;

  var vEnd = tw.getPropertiesEndValue();
  var vStart = tw.getPropertiesStartValue();

  timeline.forEach(function (tl, index) {
    tw.updateTweenData('vEnd', vEnd, index);
    tw.updateTweenData('vStart', vStart, index);
  });

  tw.resume();
}

function completeTween(tw) {
  var notStarted = false;
  var timeline = tw.timeline,
      target = tw.target;

  tw.stop();
  CI_API.game.tweens.removeFrom(target);

  timeline.forEach(function (tl) {
    var vEnd = tl.vEnd,
        vStart = tl.vStart,
        yoyo = tl.yoyo,
        percent = tl.percent;

    var keys = (0, _objectKeys.objectKeys)(vEnd);

    keys.forEach(function (k) {
      target[k] = yoyo ? vStart[k] : vEnd[k];
    });

    if (percent === 0) {
      notStarted = true;
    }
  });

  if (notStarted) {
    tw.onStart.dispatch();
  }

  tw.onComplete.dispatch();
}

function manageUniversalTweens() {
  var tweens = CI_API.game.tweens.getAll();
  tweens.forEach(function (tw) {
    if (tw instanceof _universalTween.UniversalTween) {
      updateUniversalTweenData(tw);

      return;
    }

    if (tw.universal === true) {
      tw.resume();

      return;
    }

    completeTween(tw);
  });
}

function makeUniversalTween(config) {
  var target = config.target,
      startValues = config.startValues,
      endValues = config.endValues,
      context = config.context,
      _config$duration = config.duration,
      duration = _config$duration === undefined ? 1000 : _config$duration,
      _config$easing = config.easing,
      easing = _config$easing === undefined ? null : _config$easing,
      _config$autoStart = config.autoStart,
      autoStart = _config$autoStart === undefined ? false : _config$autoStart,
      _config$delay = config.delay,
      delay = _config$delay === undefined ? 0 : _config$delay,
      _config$repeat = config.repeat,
      repeat = _config$repeat === undefined ? 0 : _config$repeat,
      _config$yoyo = config.yoyo,
      yoyo = _config$yoyo === undefined ? false : _config$yoyo,
      _config$from = config.from,
      from = _config$from === undefined ? false : _config$from;


  var sValues = from ? endValues : startValues;
  var eValues = from ? startValues : endValues;

  var tw = new _universalTween.UniversalTween(target, sValues, eValues, context);
  tw.to(eValues.call(context), duration, easing, autoStart, delay, repeat, yoyo);

  return tw;
}

function getRelativeScale(source, destination) {
  var _source$getLocalBound = source.getLocalBounds(),
      sourceWidth = _source$getLocalBound.width,
      sourceHeight = _source$getLocalBound.height;

  var _destination$getBound = destination.getBounds(),
      destinationWidth = _destination$getBound.width,
      destinationHeight = _destination$getBound.height;

  return new Phaser.Point(destinationWidth / (sourceWidth * source.parent.worldScale.x), destinationHeight / (sourceHeight * source.parent.worldScale.y));
}

function getRelativePosition(source, destination) {
  return source.parent.toLocal(destination.parent.toGlobal(destination.position));
}

function getRelativeTransform(source, destination) {
  return { scale: getRelativeScale(source, destination), position: getRelativePosition(source, destination) };
}

function isSquareLikeScreen() {
  var _getGameBounds = getGameBounds(),
      width = _getGameBounds.width,
      height = _getGameBounds.height;

  return Math.min(width, height) / Math.max(width, height) > 0.7;
}

function isNarrowScreen() {
  var _getGameBounds2 = getGameBounds(),
      width = _getGameBounds2.width,
      height = _getGameBounds2.height;

  return Math.min(width, height) / Math.max(width, height) < 0.5;
}

function tweenToCell(grid, child, cellName) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
  var ease = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.InOut;
  var _child$scale = child.scale,
      formScaleX = _child$scale.x,
      formScaleY = _child$scale.y;
  var _child$position = child.position,
      formPositionX = _child$position.x,
      formPositionY = _child$position.y;

  grid.rebuildChild(child, cellName);
  CI_API.game.add.tween(child).from({ x: formPositionX, y: formPositionY }, duration, ease, true);
  CI_API.game.add.tween(child.scale).from({ x: formScaleX, y: formScaleY }, duration, ease, true);
}

function pulse(target) {
  var amplitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
  var repeat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

  var tw = CI_API.game.add.tween(target.scale).to({ x: target.scale.x + amplitude, y: target.scale.y + amplitude }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, repeat, true);
  tw.universal = true;
  return tw;
}

function showFromBottom(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal = parent.toLocal({ x: 0, y: getGameBounds().bottom + Math.abs(view.height) }, null),
      y = _parent$toLocal.y;

  var tw = CI_API.game.add.tween(view).from({ y: y }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function showFromRight(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal2 = parent.toLocal({ x: getGameBounds().width + Math.abs(view.width), y: 0 }, null),
      x = _parent$toLocal2.x;

  var tw = CI_API.game.add.tween(view).from({ x: x }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function showFromLeft(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal3 = parent.toLocal({ x: -Math.abs(view.width), y: 0 }, null),
      x = _parent$toLocal3.x;

  var tw = CI_API.game.add.tween(view).from({ x: x }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function showFromUp(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal4 = parent.toLocal({ y: -Math.abs(view.height), x: 0 }, null),
      y = _parent$toLocal4.y;

  var tw = CI_API.game.add.tween(view).from({ y: y }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function hideToBottom(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal5 = parent.toLocal({ x: 0, y: getGameBounds().bottom + Math.abs(view.height) }, null),
      y = _parent$toLocal5.y;

  var tw = CI_API.game.add.tween(view).to({ y: y }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function hideToRight(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal6 = parent.toLocal({ x: getGameBounds().width + Math.abs(view.width), y: 0 }, null),
      x = _parent$toLocal6.x;

  var tw = CI_API.game.add.tween(view).to({ x: x }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function hideToLeft(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal7 = parent.toLocal({ x: -Math.abs(view.width), y: 0 }, null),
      x = _parent$toLocal7.x;

  var tw = CI_API.game.add.tween(view).to({ x: x }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

function hideToUp(view) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var universal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Phaser.Easing.Sinusoidal.Out;
  var parent = view.parent;

  var _parent$toLocal8 = parent.toLocal({ y: -Math.abs(view.height), x: 0 }, null),
      y = _parent$toLocal8.y;

  var tw = CI_API.game.add.tween(view).to({ y: y }, duration, easing, true, delay);
  tw.universal = universal;

  return tw;
}

var tweenTint = exports.tweenTint = function tweenTint(_ref2) {
  var target = _ref2.target,
      to = _ref2.to,
      from = _ref2.from,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === undefined ? 500 : _ref2$duration,
      _ref2$easing = _ref2.easing,
      easing = _ref2$easing === undefined ? Phaser.Easing.Cubic.InOut : _ref2$easing,
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === undefined ? 0 : _ref2$delay,
      _ref2$repeat = _ref2.repeat,
      repeat = _ref2$repeat === undefined ? 0 : _ref2$repeat,
      _ref2$yoyo = _ref2.yoyo,
      yoyo = _ref2$yoyo === undefined ? false : _ref2$yoyo;

  var colorTo = Phaser.Color.getRGB(to);
  var colorFrom = Phaser.Color.getRGB(from);
  var tween = CI_API.game.add.tween(colorFrom).to(colorTo, duration, easing, true, delay, repeat, yoyo);

  tween.onStart.addOnce(function () {
    target.tint = from;
  });

  tween.onUpdateCallback(function () {
    Phaser.Color.updateColor(tween.target);
    target.tint = Phaser.Color.getColor32(target.alpha, tween.target.r, tween.target.g, tween.target.b);
  }, undefined);

  tween.onComplete.addOnce(function () {
    target.tint = to;
  });

  return tween;
};

function handScaleTw(hand) {
  var amplitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;

  var signX = Phaser.Math.sign(hand.scale.x);
  var signY = Phaser.Math.sign(hand.scale.y);
  var scaleTw = CI_API.game.add.tween(hand.scale).to({
    x: hand.scale.x - amplitude * signX,
    y: hand.scale.y - amplitude * signY
  }, 500, Phaser.Easing.Cubic.InOut, true, 0, 0, true);

  return scaleTw;
}

function handMoveTw(hand, pos) {
  var offX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var offY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var x = pos.x,
      y = pos.y;

  var moveTw = CI_API.game.add.tween(hand).to({ x: x + offX, y: y + offY }, 500, Phaser.Easing.Cubic.InOut, true, 0, 0, false);

  return moveTw;
}

function tintSlot(spine, slotName, color) {
  var rgb = Phaser.Color.hexToRGBArray(color);
  var slot = spine.skeleton.findSlot(slotName);

  if (!slot) {
    var slots = spine.skeleton.slots.filter(function (s) {
      return s.data && s.data.attachmentName === slotName;
    });
    slots.forEach(function (s) {
      s.r = rgb[0];
      s.g = rgb[1];
      s.b = rgb[2];
    });
  }

  if (slot) {
    slot.r = rgb[0];
    slot.g = rgb[1];
    slot.b = rgb[2];
  }
}

function tintSpine(spine, tint) {
  var slots = spine.skeleton.slots;

  for (var i = 0; i < slots.length; i += 1) {
    var slot = slots[i];
    if (slot.currentSprite) slot.currentSprite.tint = tint;
    var rgb = Phaser.Color.hexToRGBArray(tint);
    slot.r = rgb[0];
    slot.g = rgb[1];
    slot.b = rgb[2];
  }
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000 / 10).toString(), 10);
  var seconds = parseInt((duration / 1000 % 60).toString(), 10);
  var minutes = parseInt((duration / (1000 * 60) % 60).toString(), 10);
  var hours = parseInt((duration / (1000 * 60 * 60) % 24).toString(), 10);

  var millisecondsStr = milliseconds < 10 ? '' + 0 + milliseconds : '' + milliseconds;
  var hoursStr = hours < 10 ? '' + 0 + hours : '' + hours;
  var minutesStr = minutes < 10 ? '' + 0 + minutes : '' + minutes;
  var secondsStr = seconds < 10 ? '' + 0 + seconds : '' + seconds;
  return { hoursStr: hoursStr, minutesStr: minutesStr, secondsStr: secondsStr, millisecondsStr: millisecondsStr };
}

function getRetryDelay(retries) {
  return CI_API.Globals.PARAMS.retries === retries ? 0 : 1500;
}

},{"./object/object-keys":200,"./tween/universal-tween":201}],200:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var objectKeys = exports.objectKeys = function objectKeys(object) {
  var keys = [];
  Object.entries(object).forEach(function (entry) {
    var key = entry[0];
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      keys.push(key);
    }
  });
  return keys;
};

},{}],201:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UniversalTween = exports.UniversalTween = function (_Phaser$Tween) {
  _inherits(UniversalTween, _Phaser$Tween);

  function UniversalTween(target, startValues, endValues, context) {
    _classCallCheck(this, UniversalTween);

    var _this = _possibleConstructorReturn(this, (UniversalTween.__proto__ || Object.getPrototypeOf(UniversalTween)).call(this, target, CI_API.game, CI_API.game.tweens));

    _this.__context__ = context;
    _this.getStartValues = startValues;
    _this.getEndValues = endValues;
    return _this;
  }

  _createClass(UniversalTween, [{
    key: "getPropertiesStartValue",
    value: function getPropertiesStartValue() {
      _get(UniversalTween.prototype.__proto__ || Object.getPrototypeOf(UniversalTween.prototype), "start", this).call(this);
      return this.getStartValues.call(this.__context__);
    }
  }, {
    key: "getPropertiesEndValue",
    value: function getPropertiesEndValue() {
      return this.getEndValues.call(this.__context__);
    }
  }]);

  return UniversalTween;
}(Phaser.Tween);

},{}],202:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("./Types");
var Point_1 = require("./utils/geom/Point");
var Rect_1 = require("./utils/geom/Rect");
var Utils_1 = require("./utils/Utils");
var Cell = /** @class */ (function () {
    /**
     * @param config Input configuration object.
     */
    function Cell(config) {
        var name = config.name, bounds = config.bounds, cells = config.cells, scale = config.scale, align = config.align, padding = config.padding, offset = config.offset;
        this._config = config;
        this._name = this._getName(name);
        this._scale = this._getScale(scale);
        this._align = this._getAlign(align);
        this._offset = this._getOffset(offset);
        this._contents = this._getContents();
        this._bounds = this._getBounds(bounds);
        this._padding = this._buildPadding(this._getPadding(padding));
        this._cells = this._buildCells(this._getCells(cells));
    }
    Object.defineProperty(Cell.prototype, "config", {
        /**
         * @description Configuration object reference passed in constructor
         * @returns {ICellConfig} configuration object
         */
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "name", {
        /**
         * @description Cell name defined in configuration object
         * @returns {string} cell name
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "cells", {
        /**
         * @description Array of child cells
         * @returns {Cell[]} child cells
         */
        get: function () {
            return this._cells;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "bounds", {
        /**
         * @description Bounds area in pixels
         * @returns {Rect} bounds area
         */
        get: function () {
            return this._bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "padding", {
        /**
         * @description Padding area in pixels
         * @returns {Rect} padding area
         */
        get: function () {
            return this._padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "scale", {
        /**
         * @description Scale type, used to scale contents
         * @returns {CellScale} scale type
         */
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "align", {
        /**
         * @description Align type, used to align contents
         * @returns {CellAlign} align type
         */
        get: function () {
            return this._align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "contents", {
        /**
         * @description Contents
         * @returns {T[]} cell contents
         */
        get: function () {
            return this._contents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "area", {
        /**
         * @description Cell bounds considered paddings
         * @returns {Rect} Rectangle considered paddings
         */
        get: function () {
            return this._padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "offset", {
        /**
         * @description Cell offset
         * @returns {Point} cell offset
         */
        get: function () {
            return this._offset;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Returns cells way down of the tree, recursively
     * @returns {Cell[]} Array of cells
     */
    Cell.prototype.getCells = function () {
        var cells = [];
        cells.push(this);
        this._cells.forEach(function (cell) { return cells.push.apply(cells, __spread(cell.getCells())); });
        return cells;
    };
    /**
     * @description Returns cell based on given name
     * @param name The name of the cell
     * @returns {Cell | undefined}
     */
    Cell.prototype.getCellByName = function (name) {
        return this.getCells().find(function (cell) { return cell._name === name; });
    };
    Cell.prototype.getCellByContent = function (content) {
        return this.getCells().find(function (cell) { return cell.contents.includes(content); });
    };
    Cell.prototype._getName = function (rawName) {
        return rawName;
    };
    Cell.prototype._getScale = function (rawScale) {
        return rawScale || Types_1.CellScale.Fit;
    };
    Cell.prototype._getAlign = function (rawAlign) {
        return rawAlign || Types_1.CellAlign.Center;
    };
    Cell.prototype._getOffset = function (rawOffset) {
        return rawOffset ? new Point_1.Point(rawOffset.x || 0, rawOffset.y || 0) : new Point_1.Point(0, 0);
    };
    Cell.prototype._getContents = function () {
        return new Array(0);
    };
    Cell.prototype._getCells = function (rawCells) {
        return rawCells || new Array(0);
    };
    Cell.prototype._getBounds = function (rawBounds) {
        var b = rawBounds ? Utils_1.rawToRect(rawBounds) : new Rect_1.Rect(0, 0, Cell.MIN_SIZE, Cell.MIN_SIZE);
        var o = this.offset;
        return new Rect_1.Rect(b.x + o.x, b.y + o.y, b.width, b.height);
    };
    Cell.prototype._getPadding = function (rawPadding) {
        return rawPadding
            ? typeof rawPadding === 'number'
                ? Utils_1.numberToRect(rawPadding)
                : Utils_1.fillRect(rawPadding)
            : new Rect_1.Rect(0, 0, 1, 1);
    };
    Cell.prototype._buildPadding = function (padding) {
        var px = padding.x, py = padding.y, pw = padding.width, ph = padding.height;
        var _a = this._bounds, bx = _a.x, by = _a.y, bw = _a.width, bh = _a.height;
        return new Rect_1.Rect(bx + px * bw, by + py * bh, bw * pw, bh * ph);
    };
    Cell.prototype._buildCells = function (rawCells) {
        var e_1, _a;
        var cells = [];
        var _b = this.area, bw = _b.width, bh = _b.height, bl = _b.left, br = _b.right, bt = _b.top, bb = _b.bottom;
        try {
            for (var rawCells_1 = __values(rawCells), rawCells_1_1 = rawCells_1.next(); !rawCells_1_1.done; rawCells_1_1 = rawCells_1.next()) {
                var rawCell = rawCells_1_1.value;
                var _c = rawCell.bounds, bounds = _c === void 0 ? new Rect_1.Rect(0, 0, 0, 0) : _c;
                var configBounds = __assign({}, bounds);
                bounds.x =
                    bounds.x !== undefined
                        ? typeof bounds.x === 'string'
                            ? bl + Utils_1.px2number(bounds.x)
                            : bl + bounds.x * bw
                        : Math.max.apply(Math, __spread([bl], cells.map(function (_a) {
                            var b = _a._bounds;
                            return b.right;
                        })));
                bounds.y =
                    bounds.y !== undefined
                        ? typeof bounds.y === 'string'
                            ? bt + Utils_1.px2number(bounds.y)
                            : bt + bounds.y * bh
                        : Math.max.apply(Math, __spread([bt], cells.map(function (_a) {
                            var b = _a._bounds;
                            return b.bottom;
                        })));
                bounds.width =
                    bounds.width !== undefined
                        ? typeof bounds.width === 'string'
                            ? Utils_1.px2number(bounds.width)
                            : bounds.width * bw
                        : br - bounds.x;
                bounds.height =
                    bounds.height !== undefined
                        ? typeof bounds.height === 'string'
                            ? Utils_1.px2number(bounds.height)
                            : bounds.height * bh
                        : bb - bounds.y;
                var cell = new Cell(rawCell);
                cell.config.bounds = configBounds;
                cells.push(cell);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rawCells_1_1 && !rawCells_1_1.done && (_a = rawCells_1.return)) _a.call(rawCells_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return cells;
    };
    Cell.MIN_SIZE = 1 / Number.MAX_SAFE_INTEGER;
    return Cell;
}());
exports.Cell = Cell;

},{"./Types":203,"./utils/Utils":205,"./utils/geom/Point":206,"./utils/geom/Rect":207}],203:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CellScale;
(function (CellScale) {
    CellScale[CellScale["None"] = 1] = "None";
    CellScale[CellScale["Fit"] = 2] = "Fit";
    CellScale[CellScale["Fill"] = 3] = "Fill";
    CellScale[CellScale["ShowAll"] = 4] = "ShowAll";
    CellScale[CellScale["Envelop"] = 5] = "Envelop";
    CellScale[CellScale["Custom"] = 6] = "Custom";
})(CellScale = exports.CellScale || (exports.CellScale = {}));
var CellAlign;
(function (CellAlign) {
    CellAlign[CellAlign["None"] = 1] = "None";
    CellAlign[CellAlign["Center"] = 2] = "Center";
    CellAlign[CellAlign["CenterTop"] = 3] = "CenterTop";
    CellAlign[CellAlign["CenterBottom"] = 4] = "CenterBottom";
    CellAlign[CellAlign["LeftCenter"] = 5] = "LeftCenter";
    CellAlign[CellAlign["LeftTop"] = 6] = "LeftTop";
    CellAlign[CellAlign["LeftBottom"] = 7] = "LeftBottom";
    CellAlign[CellAlign["RightCenter"] = 8] = "RightCenter";
    CellAlign[CellAlign["RightTop"] = 9] = "RightTop";
    CellAlign[CellAlign["RightBottom"] = 10] = "RightBottom";
})(CellAlign = exports.CellAlign || (exports.CellAlign = {}));

},{}],204:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("./Cell");
exports.Cell = Cell_1.Cell;
var Types_1 = require("./Types");
exports.CellAlign = Types_1.CellAlign;
exports.CellScale = Types_1.CellScale;
var Point_1 = require("./utils/geom/Point");
exports.Point = Point_1.Point;
var Rect_1 = require("./utils/geom/Rect");
exports.Rect = Rect_1.Rect;
var Utils_1 = require("./utils/Utils");
exports.align = Utils_1.align;
exports.fit = Utils_1.fit;

},{"./Cell":202,"./Types":203,"./utils/Utils":205,"./utils/geom/Point":206,"./utils/geom/Rect":207}],205:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("../Types");
var Point_1 = require("./geom/Point");
var Rect_1 = require("./geom/Rect");
function rawToRect(_a) {
    var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e;
    return new Rect_1.Rect(typeof x === 'string' ? px2number(x) : x, typeof y === 'string' ? px2number(y) : y, typeof width === 'string' ? px2number(width) : width, typeof height === 'string' ? px2number(height) : height);
}
exports.rawToRect = rawToRect;
function numberToRect(value) {
    return new Rect_1.Rect(value, value, 1 - 2 * value, 1 - 2 * value);
}
exports.numberToRect = numberToRect;
function fillRect(_a) {
    var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? 1 - (x ? x : 0) : _d, _e = _a.height, height = _e === void 0 ? 1 - (y ? y : 0) : _e;
    return new Rect_1.Rect(x, y, width, height);
}
exports.fillRect = fillRect;
function px2number(value) {
    return parseInt(value, 10);
}
exports.px2number = px2number;
/**
 * @description Represents scale difference needed to scale first dimension compared with second based on scale type
 * @param d1 Dimension to scale
 * @param d2 Dimension to compare with
 * @param scaleType Scale type
 * @returns {Point}
 */
function fit(d1, d2, scaleType) {
    switch (scaleType) {
        case Types_1.CellScale.Fit:
            return _fit(d1, d2);
        case Types_1.CellScale.Fill:
            return _fill(d1, d2);
        case Types_1.CellScale.ShowAll:
            return _showAll(d1, d2);
        case Types_1.CellScale.Envelop:
            return _envelop(d1, d2);
        case Types_1.CellScale.None:
            return new Point_1.Point(1, 1);
        default:
            throw new Error("Unknown scale type: " + scaleType);
    }
}
exports.fit = fit;
/**
 * @description Represents position difference needed to align dimension in rect based on align type
 * @param dimension Dimension to align
 * @param rect Rect to align to
 * @param alignType Align type
 * @returns {Point}
 */
function align(dimension, rect, alignType) {
    var w1 = dimension.width, h1 = dimension.height;
    var x2 = rect.x, y2 = rect.y, w2 = rect.width, h2 = rect.height;
    var pos = new Point_1.Point(x2, y2);
    switch (alignType) {
        case Types_1.CellAlign.Center:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1) / 2);
        case Types_1.CellAlign.CenterTop:
            return pos.set(x2 + (w2 - w1) / 2, y2);
        case Types_1.CellAlign.CenterBottom:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1));
        case Types_1.CellAlign.LeftCenter:
            return pos.set(x2, y2 + (h2 - h1) / 2);
        case Types_1.CellAlign.LeftTop:
            return pos;
        case Types_1.CellAlign.LeftBottom:
            return pos.set(x2, y2 + (h2 - h1));
        case Types_1.CellAlign.RightCenter:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1) / 2);
        case Types_1.CellAlign.RightTop:
            return pos.set(x2 + (w2 - w1), y2);
        case Types_1.CellAlign.RightBottom:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1));
        case Types_1.CellAlign.None:
            return pos;
        default:
            throw new Error("Unknown align: " + align);
    }
}
exports.align = align;
function _fit(d1, d2) {
    var w1 = d1.width, h1 = d1.height;
    var w2 = d2.width, h2 = d2.height;
    var s = Math.min(w2 / w1, h2 / h1);
    return s < 1 ? new Point_1.Point(s, s) : new Point_1.Point(1, 1);
}
function _showAll(d1, d2) {
    var w1 = d1.width, h1 = d1.height;
    var w2 = d2.width, h2 = d2.height;
    var s = Math.min(w2 / w1, h2 / h1);
    return new Point_1.Point(s, s);
}
function _envelop(d1, d2) {
    var w1 = d1.width, h1 = d1.height;
    var w2 = d2.width, h2 = d2.height;
    var s = Math.max(w2 / w1, h2 / h1);
    return new Point_1.Point(s, s);
}
function _fill(d1, d2) {
    var w1 = d1.width, h1 = d1.height;
    var w2 = d2.width, h2 = d2.height;
    return new Point_1.Point(w2 / w1, h2 / h1);
}

},{"../Types":203,"./geom/Point":206,"./geom/Rect":207}],206:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a Point in 2D space, with an | x, y | component.
 */
var Point = /** @class */ (function () {
    /**
     *
     * @param x The x coordinate of this Point.
     * @param y The y coordinate of this Point.
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @description Set the x and y coordinates of the point to the given values.
     * @param x The x coordinate of this Point.
     * @param y The y coordinate of this Point.
     */
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    return Point;
}());
exports.Point = Point;

},{}],207:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encapsulates a 2D rectangle with an | x, y, width, height | component
 */
var Rect = /** @class */ (function () {
    /**
     *
     * @param x The X coordinate of the top left corner of the Rectangle.
     * @param y The Y coordinate of the top left corner of the Rectangle.
     * @param width The width of the Rectangle.
     * @param height The height of the Rectangle.
     */
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "left", {
        /**
         * @description The x coordinate of the left of the Rectangle.
         */
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "right", {
        /**
         * @description The sum of the x and width properties.
         */
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "top", {
        /**
         * @description The y coordinate of the top of the Rectangle.
         */
        get: function () {
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        /**
         * @description The sum of the y and height properties.
         */
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
exports.Rect = Rect;

},{}],208:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var Command = /** @class */ (function () {
    function Command() {
        this._guards = [];
        this._payloads = [];
    }
    Command.prototype.on = function (event, command) {
        index_1.lego.event.on(event, this._getEventCallback(command));
        return this;
    };
    Command.prototype.once = function (event, command) {
        index_1.lego.event.once(event, this._getEventCallback(command));
        return this;
    };
    Command.prototype.off = function (event, command) {
        var ll = index_1.lego.event.getListeners(event);
        // @ts-ignore
        var found = ll.find(function (l) { return l.callback.__command === command; });
        if (!found) {
            return this;
        }
        index_1.lego.event.off(event, found.callback);
        return this;
    };
    Command.prototype.execute = function () {
        var e_1, _a;
        var commands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            commands[_i] = arguments[_i];
        }
        var _b = this, _guards = _b._guards, _payloads = _b._payloads;
        var passed = !_guards.length || !_guards.find(function (guard) { return !guard.apply(undefined, _payloads); });
        if (passed) {
            try {
                for (var commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
                    var c = commands_1_1.value;
                    this._execute.apply(this, __spread([c], _payloads));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (commands_1_1 && !commands_1_1.done && (_a = commands_1.return)) _a.call(commands_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this._resetGuardsAndPayloads();
        }
        return this;
    };
    Command.prototype.payload = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._payloads = args;
        return this;
    };
    Command.prototype.guard = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._guards = args;
        return this;
    };
    Command.prototype._execute = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._resetGuardsAndPayloads();
        command.apply(undefined, args);
    };
    Command.prototype._resetGuardsAndPayloads = function () {
        this.guard().payload();
    };
    Command.prototype._getEventCallback = function (command) {
        return Object.defineProperties(this._execute.bind(this, command), {
            __command: { value: command },
        });
    };
    return Command;
}());
exports.Command = Command;

},{"./index":212}],209:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Map_1 = require("./utils/Map");
var Emitter = /** @class */ (function () {
    function Emitter() {
        this._events = new Map_1.Map();
    }
    Emitter.prototype.getListeners = function (event) {
        return this._events.get(event) || [];
    };
    Emitter.prototype.on = function (name, callback, context) {
        this._addListener(name, callback, context, false);
        return this;
    };
    Emitter.prototype.once = function (name, callback, context) {
        this._addListener(name, callback, context, true);
        return this;
    };
    Emitter.prototype.off = function (name, callback, context) {
        this._removeListener(name, callback, context);
        return this;
    };
    Emitter.prototype.emit = function (name) {
        var e_1, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ll = this.getListeners(name);
        if (!ll.length) {
            return;
        }
        var llCopy = __spread(ll);
        try {
            for (var llCopy_1 = __values(llCopy), llCopy_1_1 = llCopy_1.next(); !llCopy_1_1.done; llCopy_1_1 = llCopy_1.next()) {
                var l = llCopy_1_1.value;
                var callback = l.callback, context = l.context, once = l.once;
                if (once) {
                    this._removeListener(name, callback, context);
                }
                callback.apply(context, args);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (llCopy_1_1 && !llCopy_1_1.done && (_a = llCopy_1.return)) _a.call(llCopy_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Emitter.prototype.removeListenersOf = function (context) {
        var keys = this._events.keys();
        for (var i = keys.length - 1; i >= 0; i -= 1) {
            var name = keys[i];
            var ll = this.getListeners(name);
            for (var j = ll.length - 1; j >= 0; j -= 1) {
                var l = ll[j];
                if (l.context === context) {
                    this._removeListener(name, l.callback, context);
                }
            }
        }
    };
    Emitter.prototype._addListener = function (name, callback, context, once) {
        var ll = this.getListeners(name);
        var l = { callback: callback, context: context, once: once };
        !ll.length ? this._events.set(name, [l]) : ll.push(l);
    };
    Emitter.prototype._removeListener = function (name, callback, context) {
        var ll = this.getListeners(name);
        if (!ll.length) {
            return;
        }
        for (var i = ll.length - 1; i >= 0; i -= 1) {
            var l = ll[i];
            var clb = l.callback, ctx = l.context;
            if (clb === callback && ctx === context) {
                ll.splice(i, 1);
                break;
            }
        }
        if (!ll.length) {
            this._events.delete(name);
        }
    };
    return Emitter;
}());
exports.Emitter = Emitter;

},{"./utils/Map":213}],210:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("./Command");
var Emitter_1 = require("./Emitter");
var Observe_1 = require("./Observe");
var Lego = /** @class */ (function () {
    function Lego() {
        this.observe = new Observe_1.Observe();
        this.event = new Emitter_1.Emitter();
        this.command = new Command_1.Command();
    }
    return Lego;
}());
exports.Lego = Lego;

},{"./Command":208,"./Emitter":209,"./Observe":211}],211:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function adjustEventName(str) {
    var clean = str.replace(/[^0-9a-z-A-Z]/g, '').replace(/ +/, ' ');
    return "" + clean.charAt(0).toUpperCase() + clean.slice(1);
}
var Observe = /** @class */ (function () {
    function Observe() {
    }
    Observe.prototype.makeObservable = function (obj) {
        var e_1, _a;
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        if (!props.length) {
            props = Object.keys(obj);
        }
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var prop = props_1_1.value;
                var value = obj[prop];
                if (delete obj[prop]) {
                    this.createObservable(obj, prop, value);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Observe.prototype.removeObservable = function (obj) {
        var e_2, _a;
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        if (!props.length) {
            props = Object.keys(obj);
        }
        try {
            for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
                var prop = props_2_1.value;
                var value = obj[prop];
                if (delete obj[prop]) {
                    Object.defineProperty(obj, prop, {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: value,
                    });
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (props_2_1 && !props_2_1.done && (_a = props_2.return)) _a.call(props_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Observe.prototype.createObservable = function (obj, prop, value) {
        var eventName = "" + obj.__name__ + adjustEventName(prop) + "Update";
        var oldValue = value;
        var newValue = oldValue;
        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: true,
            get: function () {
                return newValue;
            },
            set: function (val) {
                if (val === newValue) {
                    return;
                }
                oldValue = newValue;
                newValue = val;
                index_1.lego.event.emit(eventName, newValue, oldValue, obj.uuid);
            },
        });
    };
    return Observe;
}());
exports.Observe = Observe;

},{"./index":212}],212:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lego_1 = require("./Lego");
var Utils_1 = require("./utils/Utils");
exports.not = Utils_1.not;
exports.lego = new Lego_1.Lego();

},{"./Lego":210,"./utils/Utils":214}],213:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = /** @class */ (function () {
    function Map() {
    }
    Map.prototype.get = function (key) {
        // @ts-ignore
        return this[key];
    };
    Map.prototype.keys = function () {
        return Object.keys(this);
    };
    Map.prototype.values = function () {
        var _this = this;
        var keys = this.keys();
        // @ts-ignore
        return keys.map(function (k) { return _this[k]; });
    };
    Map.prototype.set = function (key, value) {
        // @ts-ignore
        this[key] = value;
    };
    Map.prototype.delete = function (key) {
        var v = this.get(key);
        // @ts-ignore
        delete this[key];
        return v;
    };
    Map.prototype.forEach = function (fn) {
        var _this = this;
        Object.keys(this).forEach(function (prop, index) { return fn(prop, _this.get(prop), index); });
    };
    return Map;
}());
exports.Map = Map;

},{}],214:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function not(fn) {
    var wrappedFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !fn.apply(void 0, __spread(args));
    };
    var upperCaseName = fn.name.charAt(0).toUpperCase() + fn.name.slice(1);
    Object.defineProperties(wrappedFn, {
        name: { value: "not" + upperCaseName },
    });
    return wrappedFn;
}
exports.not = not;

},{}],215:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = exports.Debug = void 0;
var Debug = /** @class */ (function () {
    function Debug(parent) {
        this._parent = parent;
    }
    Debug.prototype.bringToTop = function () {
        if (!this._debugger) {
            return;
        }
        this._parent.bringToTop(this._debugger);
    };
    Debug.prototype.draw = function (cell, lineWidth, parentDebug) {
        var _this = this;
        if (lineWidth === void 0) { lineWidth = 10; }
        var _a = cell.bounds, bx = _a.x, by = _a.y, bw = _a.width, bh = _a.height;
        var _b = cell.area, px = _b.x, py = _b.y, pw = _b.width, ph = _b.height;
        var _c = cell.config.debug, debug = _c === void 0 ? parentDebug : _c;
        if (debug) {
            if (this._debugger === undefined) {
                // Init debugger
                this._debugger = new Debugger(this._parent.game);
                this._parent.add(this._debugger);
            }
            var color = debug.color, fill = debug.fill;
            // Draw content area
            fill
                ? this._debugger.fillRect(px, py, pw, ph, lineWidth * 0.8, color)
                : this._debugger.strokeRect(px, py, pw, ph, lineWidth * 0.8, color);
            // Draw cell bounds
            this._debugger.strokeRect(bx, by, bw, bh, lineWidth, color);
        }
        cell.cells.forEach(function (el) { return _this.draw(el, lineWidth * 0.7, debug); });
    };
    Debug.prototype.clear = function () {
        if (!this._debugger) {
            return;
        }
        this._debugger.clear();
    };
    Debug.prototype.strokeRect = function (x, y, w, h, lineWidth, color) {
        if (!this._debugger) {
            return;
        }
        this._debugger.fillRect(x, y, w, h, lineWidth, color);
    };
    Debug.prototype.fillRect = function (x, y, w, h, lineWidth, color) {
        if (!this._debugger) {
            return;
        }
        this._debugger.strokeRect(x, y, w, h, lineWidth, color);
    };
    return Debug;
}());
exports.Debug = Debug;
// tslint:disable-next-line: max-classes-per-file
var Debugger = /** @class */ (function (_super) {
    __extends(Debugger, _super);
    function Debugger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Debugger.prototype.strokeRect = function (x, y, w, h, lineWidth, color) {
        if (color === void 0) { color = Debugger.DEFAULT_COLOR; }
        this.lineStyle(lineWidth, color, 1);
        this.drawRect(x, y, w, h);
    };
    Debugger.prototype.fillRect = function (x, y, w, h, lineWidth, color) {
        if (color === void 0) { color = Debugger.DEFAULT_COLOR; }
        this.lineStyle(lineWidth, color, 1);
        this.beginFill(color, 0.4);
        this.drawRect(x, y, w, h);
        this.endFill();
    };
    Debugger.DEFAULT_COLOR = 0xffffff;
    return Debugger;
}(Phaser.Graphics));
exports.Debugger = Debugger;

},{}],216:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phaser2Grid = void 0;
var grid_core_1 = require("@armathai/grid-core");
var Debugger_1 = require("./Debugger");
var Phaser2Grid = /** @class */ (function (_super) {
    __extends(Phaser2Grid, _super);
    function Phaser2Grid(game) {
        var _this = _super.call(this, game) || this;
        _this._debug = new Debugger_1.Debug(_this);
        return _this;
    }
    Phaser2Grid.prototype.getCellByName = function (name) {
        return this.grid.getCellByName(name);
    };
    Phaser2Grid.prototype.getCellByContent = function (content) {
        return this.grid.getCellByContent(content);
    };
    /**
     * @description Rebuilds Grid. Destroys existing grid and creates new one based on given or existing configuration
     * @param config Input configuration object. Can be empty, to build with existing configuration
     * @returns {void}
     */
    Phaser2Grid.prototype.rebuild = function (config) {
        var _this = this;
        // saves cells references before destroying grid
        var cells = this.grid.getCells();
        // creates new grid
        this._internalBuild(config || this.grid.config);
        // sets old cells contents in new grid cells
        cells.forEach(function (cell) { return cell.contents.forEach(function (content) { return _this._rebuildContent(cell.name, content); }); });
    };
    /**
     * @description Creates Grid object based on input configuration object
     * @param config Input configuration object.
     * @returns {void}
     */
    Phaser2Grid.prototype.build = function (config) {
        this._internalBuild(config);
    };
    /**
     * @description Adds the given Game Object, to this Container.
     * @param cellName Cell name which will hold given child as content
     * @param child The Game Object, to add to the Container.
     * @param config Configuration object, which will be merged with cell configuration
     * @returns {this}
     */
    Phaser2Grid.prototype.setChild = function (cellName, child) {
        this.addChild(child);
        this._patchChildDestroy(child, cellName);
        this._rebuildContent(cellName, child);
        if (child.postBuild !== undefined) {
            child.postBuild();
        }
        this._debug.bringToTop();
        return this;
    };
    Phaser2Grid.prototype.rebuildChild = function (child, cellName) {
        var cell = this.getCellByContent(child);
        if (cell === undefined) {
            throw new Error("No cell found with " + child);
        }
        if (cellName === undefined) {
            cellName = cell.name;
        }
        this._removeContent(child);
        this._rebuildContent(cellName, child);
        return this;
    };
    Phaser2Grid.prototype._patchChildDestroy = function (child, cellName) {
        var _this = this;
        var childDestroy = child.destroy;
        child.destroy = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            childDestroy.call.apply(childDestroy, __spread([child], args));
            _this._removeContent(child);
        };
    };
    Phaser2Grid.prototype._internalBuild = function (config) {
        this.grid = new grid_core_1.Cell(config);
        this._debug.clear();
        this._debug.draw(this.grid);
    };
    Phaser2Grid.prototype._rebuildContent = function (cellName, child) {
        var cell = this.grid.getCellByName(cellName);
        if (cell === undefined) {
            throw new Error("No cell found with name " + cellName);
        }
        this._removeContent(child);
        this._addContent(child, cell);
        this._resetContent(child, cell);
        this._adjustContent(child, cell);
    };
    Phaser2Grid.prototype._addContent = function (child, cell) {
        cell.contents.push(child);
    };
    Phaser2Grid.prototype._removeContent = function (child) {
        var cell = this.getCellByContent(child);
        if (cell === undefined) {
            return;
        }
        cell.contents.splice(cell.contents.indexOf(child), 1);
    };
    Phaser2Grid.prototype._adjustContent = function (child, cell) {
        child instanceof Phaser2Grid ? this._adjustGridChild(child, cell) : this._adjustChild(child, cell);
    };
    Phaser2Grid.prototype._adjustGridChild = function (child, cell) {
        var gridConfig = child.getGridConfig();
        gridConfig.bounds = cell.area;
        child.rebuild(gridConfig);
    };
    Phaser2Grid.prototype._adjustChild = function (child, cell) {
        var childBounds = child.getBounds();
        this._scaleContent(child, cell, childBounds);
        this._positionContent(child, cell, childBounds);
    };
    Phaser2Grid.prototype._scaleContent = function (child, cell, childBounds) {
        switch (cell.scale) {
            case grid_core_1.CellScale.None:
                break;
            case grid_core_1.CellScale.Custom:
                if (!child.resize) {
                    throw new Error('resize() function does not implemented');
                }
                child.resize(cell.area.width, cell.area.height);
                break;
            default:
                var childDimensions = {
                    width: childBounds.width / child.worldScale.x,
                    height: childBounds.height / child.worldScale.y,
                };
                var scale = grid_core_1.fit(childDimensions, cell.area, cell.scale);
                child.scale.set(scale.x, scale.y);
        }
    };
    Phaser2Grid.prototype._positionContent = function (child, cell, childBounds) {
        var childDimensions = {
            width: (childBounds.width / child.worldScale.x) * child.scale.x,
            height: (childBounds.height / child.worldScale.y) * child.scale.y,
        };
        var pos = grid_core_1.align(childDimensions, cell.area, cell.align);
        child.position.set(pos.x, pos.y);
        child.x -= (childBounds.x / child.worldScale.x) * child.scale.x;
        child.y -= (childBounds.y / child.worldScale.y) * child.scale.y;
    };
    Phaser2Grid.prototype._resetContent = function (child, cell) {
        child.position.set(0, 0);
        if (cell.scale !== grid_core_1.CellScale.None) {
            child.scale.set(1, 1);
        }
        child.updateTransform();
    };
    return Phaser2Grid;
}(Phaser.Group));
exports.Phaser2Grid = Phaser2Grid;

},{"./Debugger":215,"@armathai/grid-core":204}],217:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_core_1 = require("@armathai/grid-core");
Object.defineProperty(exports, "CellAlign", { enumerable: true, get: function () { return grid_core_1.CellAlign; } });
Object.defineProperty(exports, "CellScale", { enumerable: true, get: function () { return grid_core_1.CellScale; } });
var Phaser2Grid_1 = require("./Phaser2Grid");
Object.defineProperty(exports, "Phaser2Grid", { enumerable: true, get: function () { return Phaser2Grid_1.Phaser2Grid; } });

},{"./Phaser2Grid":216,"@armathai/grid-core":204}],218:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NinePatch = void 0;
var NinePatch = /** @class */ (function (_super) {
    __extends(NinePatch, _super);
    function NinePatch(game, x, y, key, frame, width, height, data) {
        var _this = _super.call(this, game, x, y, key, frame) || this;
        /**
         * The eventual sizes of the container
         */
        _this.localWidth = 1;
        _this.localHeight = 1;
        _this.localWidth = width;
        _this.localHeight = height;
        _this.setPatchesData(key, frame, data);
        _this.render();
        return _this;
    }
    /**
     * Changes the base texture the Game Object is using. The old texture is removed and the new one is referenced or fetched from the Cache.
     *
     * If your Game Object is using a frame from a texture atlas and you just wish to change to another frame, then see the `frame` or `frameName` properties instead.
     *
     * You should only use `loadTexture` if you want to replace the base texture entirely.
     *
     * Calling this method causes a WebGL texture update, so use sparingly or in low-intensity portions of your game, or if you know the new texture is already on the GPU.
     *
     * You can use the new const `Phaser.PENDING_ATLAS` as the texture key for any sprite.
     * Doing this then sets the key to be the `frame` argument (the frame is set to zero).
     *
     * This allows you to create sprites using `load.image` during development, and then change them
     * to use a Texture Atlas later in development by simply searching your code for 'PENDING_ATLAS'
     * and swapping it to be the key of the atlas data.
     *
     * Note: You cannot use a RenderTexture as a texture for a TileSprite.
     *
     * @param key This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or an instance of a RenderTexture, BitmapData, Video or PIXI.Texture.
     * @param frame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
     * @param stopAnimation If an animation is already playing on this Sprite you can choose to stop it or let it carry on playing. - Default: true
     */
    NinePatch.prototype.loadTexture = function (key, frame, stopAnimation) {
        this.baseFrameName = frame;
        _super.prototype.loadTexture.call(this, key, frame, stopAnimation);
        this.baseTexture = this.texture.baseTexture;
        this.setBaseFrame(this.texture.frame);
        if (this.texture) {
            this.texture.destroy(false);
        }
        this.texture = new Phaser.RenderTexture(this.game, this.localWidth, this.localHeight);
        if (this.patchesData) {
            this.render();
        }
    };
    Object.defineProperty(NinePatch.prototype, "frameName", {
        /**
         * Sets the current frame name of the texture being used to render this Game Object.
         *
         * To change the frame set `frameName` to the name of the new frame in the texture atlas you wish this Game Object to use,
         * for example: `player.frameName = "idle"`.
         *
         * If the frame name given doesn't exist it will revert to the first frame found in the texture and throw a console warning.
         *
         * If you are using a sprite sheet then you should use the `frame` property instead.
         *
         * If you wish to fully replace the texture being used see `loadTexture`.
         */
        set: function (value) {
            this.loadTexture(this.key, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NinePatch.prototype, "height", {
        /**
         * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
         */
        get: function () {
            return this.localHeight;
        },
        set: function (value) {
            this.resize(this.localWidth, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NinePatch.prototype, "width", {
        /**
         * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
         */
        get: function () {
            return this.localWidth;
        },
        set: function (value) {
            this.resize(value, this.localHeight);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set the size of the container, then update all the parts
     *
     * @param width
     * @param height
     */
    NinePatch.prototype.resize = function (width, height) {
        this.localWidth = Math.round(width);
        this.localHeight = Math.round(height);
        this.render();
    };
    /**
     * Override the destroy to fix PIXI leaking CanvasBuffers
     *
     * @param args
     */
    NinePatch.prototype.destroy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.destroy.call(this, args[0]);
        this.texture.destroy(true);
        this.baseTexture = undefined;
        this.baseFrame = undefined;
    };
    NinePatch.prototype.setPatchesData = function (key, frame, data) {
        var game = this.game;
        this.patchesData = data || game.cache.getNinePatch(key) || game.cache.getNinePatch(frame);
        if (!this.patchesData) {
            throw Error('Cannot crate NinePatch without patches data.');
        }
    };
    NinePatch.prototype.setBaseFrame = function (f) {
        this.baseFrame = f;
    };
    /**
     * Redraw the the current texture to adjust for the new sizes;
     */
    NinePatch.prototype.render = function () {
        var renderTexture = this.texture;
        var _a = this, localWidth = _a.localWidth, localHeight = _a.localHeight;
        // Set a new empty texture
        renderTexture.resize(localWidth, localHeight, true);
        var _b = this.patchesData, top = _b.top, _c = _b.left, left = _c === void 0 ? top : _c, _d = _b.right, right = _d === void 0 ? top : _d, _e = _b.bottom, bottom = _e === void 0 ? top : _e;
        var _f = this.baseFrame, baseFrameWidth = _f.width, baseFrameHeight = _f.height;
        // The positions we want from the base texture
        var textureXs = [0, left, baseFrameWidth - right, baseFrameWidth];
        var textureYs = [0, top, baseFrameHeight - bottom, baseFrameHeight];
        // These are the positions we need the eventual texture to have
        var finalXs = [0, left, localWidth - right, localWidth];
        var finalYs = [0, top, localHeight - bottom, localHeight];
        renderTexture.clear();
        for (var yi = 0; yi < 3; yi++) {
            for (var xi = 0; xi < 3; xi++) {
                var s = this.createTexturePart(textureXs[xi], // x
                textureYs[yi], // y
                textureXs[xi + 1] - textureXs[xi], // width
                textureYs[yi + 1] - textureYs[yi]);
                s.width = finalXs[xi + 1] - finalXs[xi];
                s.height = finalYs[yi + 1] - finalYs[yi];
                renderTexture.renderXY(s, finalXs[xi], finalYs[yi]);
            }
        }
    };
    /**
     * Here we create a sprite part for the container based on the given input
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {PIXI.Sprite}
     */
    NinePatch.prototype.createTexturePart = function (x, y, width, height) {
        var frame = new PIXI.Rectangle(this.baseFrame.x + this.texture.frame.x + x, this.baseFrame.y + this.texture.frame.y + y, Math.max(width, 1), Math.max(height, 1));
        return new Phaser.Sprite(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
    };
    return NinePatch;
}(Phaser.Sprite));
exports.NinePatch = NinePatch;

},{}],219:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NinePatchPlugin = void 0;
var NinePatch_1 = require("./NinePatch");
var NinePatchPlugin = /** @class */ (function (_super) {
    __extends(NinePatchPlugin, _super);
    function NinePatchPlugin(game, parent) {
        var _this = _super.call(this, game, parent) || this;
        _this.addNinePatchCache();
        _this.addNinePatchFactory();
        _this.addNinePatchLoader();
        return _this;
    }
    NinePatchPlugin.prototype.addNinePatchLoader = function () {
        Phaser.Loader.prototype.ninePatch = function (key, url, top, left, right, bottom) {
            var cacheData = {
                top: top,
            };
            if (left) {
                cacheData.left = left;
            }
            if (right) {
                cacheData.right = right;
            }
            if (bottom) {
                cacheData.bottom = bottom;
            }
            this.addToFileList('image', key, url);
            this.game.cache.addNinePatch(key, cacheData);
        };
    };
    /**
     * Extends the GameObjectFactory prototype with the support of adding NinePatch. this allows us to add NinePatch methods to the game just like any other object:
     * game.add.NinePatch();
     */
    NinePatchPlugin.prototype.addNinePatchFactory = function () {
        Phaser.GameObjectFactory.prototype.ninePatch = function (x, y, key, frame, width, height, group) {
            if (group === undefined) {
                group = this.world;
            }
            var ninePatchObject = new NinePatch_1.NinePatch(this.game, x, y, key, frame, width, height);
            return group.add(ninePatchObject);
        };
        Phaser.GameObjectCreator.prototype.ninePatch = function (x, y, key, frame, width, height) {
            return new NinePatch_1.NinePatch(this.game, x, y, key, frame, width, height);
        };
    };
    /**
     * Extends the Phaser.Cache prototype with NinePatch properties
     */
    NinePatchPlugin.prototype.addNinePatchCache = function () {
        // Create the cache space
        Phaser.Cache.prototype.ninePatch = {};
        // Method for adding a NinePatch dict to the cache space
        Phaser.Cache.prototype.addNinePatch = function (key, data) {
            this.ninePatch[key] = data;
        };
        // Method for fetching a NinePatch dict from the cache space
        Phaser.Cache.prototype.getNinePatch = function (key) {
            var data = this.ninePatch[key];
            return data;
        };
    };
    return NinePatchPlugin;
}(Phaser.Plugin));
exports.NinePatchPlugin = NinePatchPlugin;

},{"./NinePatch":218}],220:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NinePatch_1 = require("./NinePatch");
Object.defineProperty(exports, "NinePatch", { enumerable: true, get: function () { return NinePatch_1.NinePatch; } });
var NinePatchPlugin_1 = require("./NinePatchPlugin");
Object.defineProperty(exports, "NinePatchPlugin", { enumerable: true, get: function () { return NinePatchPlugin_1.NinePatchPlugin; } });

},{"./NinePatch":218,"./NinePatchPlugin":219}],221:[function(require,module,exports){
/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

},{}]},{},[140])

//# sourceMappingURL=creative.js.map
