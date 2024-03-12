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

},{"../states/start-game-state-command":78,"@armathai/lego":219}],2:[function(require,module,exports){
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

var _mapPlayableCommandsCommand = require('../game/map-playable-commands-command');

var _unmapPlayableCommandsCommand = require('../game/unmap-playable-commands-command');

var _initializeModelsCommand = require('../initialize-models-command');

var _restartGameStateCommand = require('../states/restart-game-state-command');

var _destroyHintModelCommand = require('./hint/destroy-hint-model-command');

var _destroyPersistentCtaModelCommand = require('./pcta/destroy-persistent-cta-model-command');

var _destroyTutorialModelCommand = require('./tutorial/destroy-tutorial-model-command');

function adStatusUpdateCommand(status) {
  switch (status) {
    case _constants.AdStatus.Game:
      _lego.lego.command.execute(_mapPlayableCommandsCommand.mapPlayableCommandsCommand, _initializeModelsCommand.initializeModelsCommand);
      break;

    case _constants.AdStatus.Restart:
      _lego.lego.command.execute(_restartGameStateCommand.restartGameStateCommand);
      break;

    case _constants.AdStatus.PreCta:
      _lego.lego.command.execute(_unmapPlayableCommandsCommand.unmapPlayableCommandsCommand).guard(_tutorialModelGuard.tutorialModelGuard).execute(_destroyTutorialModelCommand.destroyTutorialModelCommand).guard(_hintModelGuard.hintModelGuard).execute(_destroyHintModelCommand.destroyHintModelCommand);
      break;

    case _constants.AdStatus.Cta:
      _lego.lego.command.guard(_persistentCtaModelGuard.persistentCtaModelGuard).execute(_destroyPersistentCtaModelCommand.destroyPersistentCtaModelCommand);

      break;

    case _constants.AdStatus.Retry:
      //
      break;
    default:
  }
}

},{"../../constants":106,"../../guards/ad/hint-model-guard":118,"../../guards/ad/persistent-cta-model-guard":120,"../../guards/ad/tutorial-model-guard":123,"../game/map-playable-commands-command":55,"../game/unmap-playable-commands-command":60,"../initialize-models-command":63,"../states/restart-game-state-command":77,"./hint/destroy-hint-model-command":10,"./pcta/destroy-persistent-cta-model-command":17,"./tutorial/destroy-tutorial-model-command":27,"@armathai/lego":219}],3:[function(require,module,exports){
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

},{"../../constants":106,"../game-init-command":35,"../game-shut-down-command":36,"../game-start-command":37,"@armathai/lego":219}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaIdleTimeCommand = ctaIdleTimeCommand;

var _constants = require('../../../constants');

var _store = require('../../../models/store');

function ctaIdleTimeCommand() {
  _store.store.ad.cta.show(_constants.GameOverReasons.Idled, 0);
}

},{"../../../constants":106,"../../../models/store":156}],5:[function(require,module,exports){
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

},{"../../../constants":106,"../../../guards/ad/cta-previsible-guard":116,"../set-ad-status-command":20,"@armathai/lego":219}],6:[function(require,module,exports){
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

},{"../../../constants":106,"../../../guards/ad/ad-live-guard":113,"../../../guards/ad/asec-guard":114,"../../../guards/ad/cta-visible-guard":117,"../set-ad-status-command":20,"@armathai/lego":219}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyCtaModelCommand = destroyCtaModelCommand;

var _store = require('../../../models/store');

function destroyCtaModelCommand() {
  _store.store.ad.destroyCtaModel();
}

},{"../../../models/store":156}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCtaModelCommand = initializeCtaModelCommand;

var _store = require('../../../models/store');

function initializeCtaModelCommand() {
  _store.store.ad.initializeCtaModel();
}

},{"../../../models/store":156}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemsToCtaCompleteCommand = itemsToCtaCompleteCommand;

var _constants = require('../../../constants');

var _store = require('../../../models/store');

function itemsToCtaCompleteCommand() {
  _store.store.ad.cta.show(_constants.GameOverReasons.ItemsToCtaReached, 1000);
}

},{"../../../constants":106,"../../../models/store":156}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyHintModelCommand = destroyHintModelCommand;

var _store = require('../../../models/store');

function destroyHintModelCommand() {
  _store.store.ad.destroyHintModel();
}

},{"../../../models/store":156}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeHintModelCommand = initializeHintModelCommand;

var _store = require('../../../models/store');

function initializeHintModelCommand() {
  _store.store.ad.initializeHintModel();
}

},{"../../../models/store":156}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetHintVisibilityTimerCommand = resetHintVisibilityTimerCommand;

var _store = require('../../../models/store');

function resetHintVisibilityTimerCommand() {
  _store.store.ad.hint.resetVisibilityTimer();
}

},{"../../../models/store":156}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHintVisibleCommand = setHintVisibleCommand;

var _store = require('../../../models/store');

function setHintVisibleCommand(value) {
  _store.store.ad.hint.visible = value;
}

},{"../../../models/store":156}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHintStateCommand = updateHintStateCommand;

var _lego = require('@armathai/lego');

var _spinBtnActiveGuard = require('../../../guards/game/spin-btn-active-guard');

var _resetHintVisibilityTimerCommand = require('./reset-hint-visibility-timer-command');

var _setHintVisibleCommand = require('./set-hint-visible-command');

function updateHintStateCommand() {
  _lego.lego.command.payload(false).execute(_setHintVisibleCommand.setHintVisibleCommand).guard(_spinBtnActiveGuard.spinBtnActiveGuard).execute(_resetHintVisibilityTimerCommand.resetHintVisibilityTimerCommand);
}

},{"../../../guards/game/spin-btn-active-guard":133,"./reset-hint-visibility-timer-command":12,"./set-hint-visible-command":13,"@armathai/lego":219}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAdModelCommand = initializeAdModelCommand;

var _store = require('../../models/store');

function initializeAdModelCommand() {
  _store.store.initializeADModel();
}

},{"../../models/store":156}],16:[function(require,module,exports){
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

},{"../../events/model-events":111,"./ad-status-update-command":2,"@armathai/lego":219}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPersistentCtaModelCommand = destroyPersistentCtaModelCommand;

var _store = require('../../../models/store');

function destroyPersistentCtaModelCommand() {
  _store.store.ad.destroyPersistentCtaModel();
}

},{"../../../models/store":156}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePersistentCtaModelCommand = initializePersistentCtaModelCommand;

var _store = require('../../../models/store');

function initializePersistentCtaModelCommand() {
  _store.store.ad.initializePersistentCtaModel();
}

},{"../../../models/store":156}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetTimeCommand = resetTimeCommand;
function resetTimeCommand() {
  CI_API.game.time.reset();
}

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAdStatusCommand = setAdStatusCommand;

var _store = require('../../models/store');

function setAdStatusCommand(status) {
  _store.store.ad.status = status;
}

},{"../../models/store":156}],21:[function(require,module,exports){
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

},{"../../kernel/globals":138}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSpinsToCtaCommand = setSpinsToCtaCommand;

var _store = require('../../models/store');

function setSpinsToCtaCommand() {
  var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
      first_slot_spins = _CI_API$Globals$PARAM.first_slot_spins,
      number_of_extra_spins = _CI_API$Globals$PARAM.number_of_extra_spins;


  _store.store.game.slotMachine.spinsToCta = first_slot_spins + number_of_extra_spins;
}

},{"../../models/store":156}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroySoundModelCommand = destroySoundModelCommand;

var _store = require('../../../models/store');

function destroySoundModelCommand() {
  _store.store.ad.destroySoundModel();
}

},{"../../../models/store":156}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSoundModelCommand = initializeSoundModelCommand;

var _store = require('../../../models/store');

function initializeSoundModelCommand() {
  _store.store.ad.initializeSoundModel();
}

},{"../../../models/store":156}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSoundStateCommand = setSoundStateCommand;

var _store = require('../../../models/store');

function setSoundStateCommand(value) {
  _store.store.ad.sound.state = value;
}

},{"../../../models/store":156}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.completeTutorialSequenceCommand = completeTutorialSequenceCommand;

var _store = require('../../../models/store');

function completeTutorialSequenceCommand() {
  _store.store.ad.tutorial.completeSequence();
}

},{"../../../models/store":156}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyTutorialModelCommand = destroyTutorialModelCommand;

var _store = require('../../../models/store');

function destroyTutorialModelCommand() {
  _store.store.ad.destroyTutorialModel();
}

},{"../../../models/store":156}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTutorialModelCommand = initializeTutorialModelCommand;

var _store = require('../../../models/store');

function initializeTutorialModelCommand() {
  _store.store.ad.initializeTutorialModel();
}

},{"../../../models/store":156}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextTutorialSequenceCommand = nextTutorialSequenceCommand;

var _store = require('../../../models/store');

function nextTutorialSequenceCommand() {
  _store.store.ad.tutorial.nextSequence();
}

},{"../../../models/store":156}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTutorialCompleteCommand = setTutorialCompleteCommand;

var _store = require('../../../models/store');

function setTutorialCompleteCommand() {
  _store.store.ad.tutorial.complete = true;
}

},{"../../../models/store":156}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialCompleteCommand = tutorialCompleteCommand;

var _lego = require('@armathai/lego');

var _destroyTutorialModelCommand = require('./destroy-tutorial-model-command');

function tutorialCompleteCommand() {
  _lego.lego.command.execute(_destroyTutorialModelCommand.destroyTutorialModelCommand);
}

},{"./destroy-tutorial-model-command":27,"@armathai/lego":219}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialScreenClickCommand = tutorialScreenClickCommand;

var _lego = require('@armathai/lego');

var _completeTutorialSequenceCommand = require('./complete-tutorial-sequence-command');

function tutorialScreenClickCommand() {
  _lego.lego.command.execute(_completeTutorialSequenceCommand.completeTutorialSequenceCommand);
}

},{"./complete-tutorial-sequence-command":26,"@armathai/lego":219}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialSequenceViewCompleteCommand = tutorialSequenceViewCompleteCommand;

var _lego = require('@armathai/lego');

var _lastTutorialGuard = require('../../../guards/game/last-tutorial-guard');

var _setTutorialCompleteCommand = require('./set-tutorial-complete-command');

function tutorialSequenceViewCompleteCommand() {
  _lego.lego.command.guard(_lastTutorialGuard.lastTutorialGuard).execute(_setTutorialCompleteCommand.setTutorialCompleteCommand);
}

},{"../../../guards/game/last-tutorial-guard":132,"./set-tutorial-complete-command":30,"@armathai/lego":219}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTutorialCommand = updateTutorialCommand;

var _lego = require('@armathai/lego');

var _firstExtraSpinGuard = require('../../../guards/game/first-extra-spin-guard');

var _firstSpinGuard = require('../../../guards/game/first-spin-guard');

var _nextTutorialSequenceCommand = require('./next-tutorial-sequence-command');

function updateTutorialCommand() {
  _lego.lego.command.guard(_firstSpinGuard.firstSpinGuard).execute(_nextTutorialSequenceCommand.nextTutorialSequenceCommand).guard(_firstExtraSpinGuard.firstExtraSpinGuard).execute(_nextTutorialSequenceCommand.nextTutorialSequenceCommand);
}

},{"../../../guards/game/first-extra-spin-guard":127,"../../../guards/game/first-spin-guard":128,"./next-tutorial-sequence-command":29,"@armathai/lego":219}],35:[function(require,module,exports){
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

},{"./ad/reset-time-command":19,"@armathai/lego":219}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameShutDownCommand = gameShutDownCommand;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _setAdStatusCommand = require('./ad/set-ad-status-command');

var _setLastInteractionCommand = require('./ad/set-last-interaction-command');

var _unmapPlayableCommandsCommand = require('./game/unmap-playable-commands-command');

var _shutdownModelsCommand = require('./shutdown-models-command');

function gameShutDownCommand() {
  _lego.lego.command.execute(_unmapPlayableCommandsCommand.unmapPlayableCommandsCommand).execute(_shutdownModelsCommand.shutdownModelsCommand).payload(0).execute(_setLastInteractionCommand.setLastInteractionCommand).payload(_constants.AdStatus.Unknown).execute(_setAdStatusCommand.setAdStatusCommand);
}

},{"../constants":106,"./ad/set-ad-status-command":20,"./ad/set-last-interaction-command":21,"./game/unmap-playable-commands-command":60,"./shutdown-models-command":74,"@armathai/lego":219}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameStartCommand = gameStartCommand;

var _lego = require('@armathai/lego');

var _constants = require('../constants');

var _store = require('../models/store');

var _mapAdStatusUpdateCommand = require('./ad/map-ad-status-update-command');

var _setAdStatusCommand = require('./ad/set-ad-status-command');

var _idleSlotMachineCommand = require('./game/machine/idle-slot-machine-command');

var _setGameStatusCommand = require('./game/set-game-status-command');

var _setBetCommand = require('./player/set-bet-command');

function gameStartCommand() {
  _lego.lego.command.execute(_mapAdStatusUpdateCommand.mapAdStatusUpdateCommand).payload(_constants.AdStatus.Game).execute(_setAdStatusCommand.setAdStatusCommand).payload(_constants.GameStatus.Slot).execute(_setGameStatusCommand.setGameStatusCommand).payload(_store.store.game.slotMachine.config.bet.min).execute(_setBetCommand.setBetCommand).execute(_idleSlotMachineCommand.idleSlotMachineCommand);
}

},{"../constants":106,"../models/store":156,"./ad/map-ad-status-update-command":16,"./ad/set-ad-status-command":20,"./game/machine/idle-slot-machine-command":41,"./game/set-game-status-command":56,"./player/set-bet-command":71,"@armathai/lego":219}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyGameModelCommand = destroyGameModelCommand;

var _store = require('../../models/store');

function destroyGameModelCommand() {
  _store.store.destroyGameModel();
}

},{"../../models/store":156}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameStatusUpdateCommand = gameStatusUpdateCommand;

var _lego = require('@armathai/lego');

var _gameStatusSlotGuard = require('../../guards/game/game-status-slot-guard');

var _setSpinsToCtaCommand = require('../ad/set-spins-to-cta-command');

function gameStatusUpdateCommand() {
  _lego.lego.command.guard(_gameStatusSlotGuard.gameStatusSlotGuard).execute(_setSpinsToCtaCommand.setSpinsToCtaCommand);
}

},{"../../guards/game/game-status-slot-guard":130,"../ad/set-spins-to-cta-command":22,"@armathai/lego":219}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeGameModelCommand = initializeGameModelCommand;

var _store = require('../../models/store');

function initializeGameModelCommand() {
  _store.store.initializeGameModel();
}

},{"../../models/store":156}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idleSlotMachineCommand = idleSlotMachineCommand;

var _store = require('../../../models/store');

function idleSlotMachineCommand() {
  _store.store.game.slotMachine.idle();
}

},{"../../../models/store":156}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReelStateCommand = setReelStateCommand;

var _store = require('../../../../models/store');

function setReelStateCommand(uuid, state) {
  var reel = _store.store.game.slotMachine.getReel(uuid);
  reel.setState(state);
}

},{"../../../../models/store":156}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSlotMachineStateCommand = setSlotMachineStateCommand;

var _store = require('../../../models/store');

function setSlotMachineStateCommand(state) {
  _store.store.game.slotMachine.setState(state);
}

},{"../../../models/store":156}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSpinResultCommand = setSpinResultCommand;

var _store = require('../../../models/store');

function setSpinResultCommand() {
  _store.store.game.slotMachine.setSpinResult(_store.store.player.bet);
}

},{"../../../models/store":156}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateActionCommand = slotMachineStateActionCommand;

var _lego = require('@armathai/lego');

var _store = require('../../../models/store');

var _setBalanceCommand = require('../../player/set-balance-command');

function slotMachineStateActionCommand() {
  var balance = _store.store.player.balance;
  var prize = _store.store.game.slotMachine.spinResult.prize;


  _lego.lego.command.payload(balance + prize).execute(_setBalanceCommand.setBalanceCommand);
}

},{"../../../models/store":156,"../../player/set-balance-command":70,"@armathai/lego":219}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateIdleCommand = slotMachineStateIdleCommand;

var _lego = require('@armathai/lego');

var _tutorialModelGuard = require('../../../guards/ad/tutorial-model-guard');

var _updateTutorialCommand = require('../../ad/tutorial/update-tutorial-command');

var _updateAutoSpinCommand = require('../update-auto-spin-command');

var _updateSpinButtonCommand = require('../update-spin-button-command');

function slotMachineStateIdleCommand() {
  _lego.lego.command.execute(_updateAutoSpinCommand.updateAutoSpinCommand).execute(_updateSpinButtonCommand.updateSpinButtonCommand).guard(_tutorialModelGuard.tutorialModelGuard).execute(_updateTutorialCommand.updateTutorialCommand);
}

},{"../../../guards/ad/tutorial-model-guard":123,"../../ad/tutorial/update-tutorial-command":34,"../update-auto-spin-command":61,"../update-spin-button-command":62,"@armathai/lego":219}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateMaxSpeedCommand = slotMachineStateMaxSpeedCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _extraSpinsGuard = require('../../../guards/game/extra-spins-guard');

var _stopButtonGuard = require('../../../guards/game/stop-button-guard');

var _setSpinButtonActiveCommand = require('../spin/set-spin-button-active-command');

var _setSpinButtonStateCommand = require('../spin/set-spin-button-state-command');

function slotMachineStateMaxSpeedCommand() {
  _lego.lego.command.guard((0, _lego.not)(_extraSpinsGuard.extraSpinsGuard), _stopButtonGuard.stopButtonGuard).payload(_constants.SpinBtnState.Stop).execute(_setSpinButtonStateCommand.setSpinButtonStateCommand).guard(_stopButtonGuard.stopButtonGuard).payload(true).execute(_setSpinButtonActiveCommand.setSpinButtonActiveCommand);
}

},{"../../../constants":106,"../../../guards/game/extra-spins-guard":126,"../../../guards/game/stop-button-guard":135,"../spin/set-spin-button-active-command":57,"../spin/set-spin-button-state-command":58,"@armathai/lego":219}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateSpinCommand = slotMachineStateSpinCommand;

var _lego = require('@armathai/lego');

var _checkoutCommand = require('../../player/checkout-command');

var _setSpinButtonActiveCommand = require('../spin/set-spin-button-active-command');

function slotMachineStateSpinCommand() {
  _lego.lego.command.execute(_checkoutCommand.checkoutCommand).payload(false).execute(_setSpinButtonActiveCommand.setSpinButtonActiveCommand);
}

},{"../../player/checkout-command":67,"../spin/set-spin-button-active-command":57,"@armathai/lego":219}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateStopCommand = slotMachineStateStopCommand;

var _lego = require('@armathai/lego');

var _setSpinButtonActiveCommand = require('../spin/set-spin-button-active-command');

function slotMachineStateStopCommand() {
  _lego.lego.command.payload(false).execute(_setSpinButtonActiveCommand.setSpinButtonActiveCommand);
}

},{"../spin/set-spin-button-active-command":57,"@armathai/lego":219}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slotMachineStateUpdateCommand = slotMachineStateUpdateCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _slotMachineStateActionCommand = require('./slot-machine-state-action-command');

var _slotMachineStateIdleCommand = require('./slot-machine-state-idle-command');

var _slotMachineStateMaxSpeedCommand = require('./slot-machine-state-max-speed-command');

var _slotMachineStateSpinCommand = require('./slot-machine-state-spin-command');

var _slotMachineStateStopCommand = require('./slot-machine-state-stop-command');

function slotMachineStateUpdateCommand(state) {
  switch (state) {
    case _constants.SlotMachineState.Spin:
      _lego.lego.command.execute(_slotMachineStateSpinCommand.slotMachineStateSpinCommand);
      break;
    case _constants.SlotMachineState.MaxSpeed:
      _lego.lego.command.execute(_slotMachineStateMaxSpeedCommand.slotMachineStateMaxSpeedCommand);
      break;
    case _constants.SlotMachineState.Stop:
      _lego.lego.command.execute(_slotMachineStateStopCommand.slotMachineStateStopCommand);
      break;
    case _constants.SlotMachineState.Action:
      _lego.lego.command.execute(_slotMachineStateActionCommand.slotMachineStateActionCommand);
      break;
    case _constants.SlotMachineState.Idle:
      _lego.lego.command.execute(_slotMachineStateIdleCommand.slotMachineStateIdleCommand);
      break;
    default:
  }
}

},{"../../../constants":106,"./slot-machine-state-action-command":45,"./slot-machine-state-idle-command":46,"./slot-machine-state-max-speed-command":47,"./slot-machine-state-spin-command":48,"./slot-machine-state-stop-command":49,"@armathai/lego":219}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetSlotsCommand = resetSlotsCommand;

var _store = require('../../../../models/store');

function resetSlotsCommand(shuffle) {
  _store.store.game.slotMachine.resetSlots(shuffle);
}

},{"../../../../models/store":156}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinSlotMachineCommand = spinSlotMachineCommand;

var _store = require('../../../models/store');

function spinSlotMachineCommand() {
  _store.store.game.slotMachine.spin();
}

},{"../../../models/store":156}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startAutoSpinTimerCommand = startAutoSpinTimerCommand;

var _store = require('../../../models/store');

function startAutoSpinTimerCommand() {
  _store.store.game.slotMachine.startAutoSpinTimer();
}

},{"../../../models/store":156}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopSlotMachineCommand = stopSlotMachineCommand;

var _lego = require('@armathai/lego');

var _store = require('../../../models/store');

var _setSpinResultCommand = require('./set-spin-result-command');

function stopSlotMachineCommand() {
  _lego.lego.command.execute(_setSpinResultCommand.setSpinResultCommand);

  _store.store.game.slotMachine.stop();
}

},{"../../../models/store":156,"./set-spin-result-command":44,"@armathai/lego":219}],55:[function(require,module,exports){
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

},{"../../configs/lego-config":99,"@armathai/lego":219}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGameStatusCommand = setGameStatusCommand;

var _store = require('../../models/store');

function setGameStatusCommand(status) {
  _store.store.game.status = status;
}

},{"../../models/store":156}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSpinButtonActiveCommand = setSpinButtonActiveCommand;

var _store = require('../../../models/store');

function setSpinButtonActiveCommand(value) {
  _store.store.game.spinBtn.active = value;
}

},{"../../../models/store":156}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSpinButtonStateCommand = setSpinButtonStateCommand;

var _store = require('../../../models/store');

function setSpinButtonStateCommand(value) {
  _store.store.game.spinBtn.state = value;
}

},{"../../../models/store":156}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinButtonActiveUpdateCommand = spinButtonActiveUpdateCommand;

var _lego = require('@armathai/lego');

var _hintModelGuard = require('../../../guards/ad/hint-model-guard');

var _updateHintStateCommand = require('../../ad/hint/update-hint-state-command');

function spinButtonActiveUpdateCommand() {
  _lego.lego.command.guard(_hintModelGuard.hintModelGuard).execute(_updateHintStateCommand.updateHintStateCommand);
}

},{"../../../guards/ad/hint-model-guard":118,"../../ad/hint/update-hint-state-command":14,"@armathai/lego":219}],60:[function(require,module,exports){
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

},{"../../configs/lego-config":99,"@armathai/lego":219}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAutoSpinCommand = updateAutoSpinCommand;

var _lego = require('@armathai/lego');

var _autoSpinGuard = require('../../guards/game/auto-spin-guard');

var _startAutoSpinTimerCommand = require('./machine/start-auto-spin-timer-command');

function updateAutoSpinCommand() {
  _lego.lego.command.guard(_autoSpinGuard.autoSpinGuard).execute(_startAutoSpinTimerCommand.startAutoSpinTimerCommand);
}

},{"../../guards/game/auto-spin-guard":125,"./machine/start-auto-spin-timer-command":53,"@armathai/lego":219}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSpinButtonCommand = updateSpinButtonCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _extraSpinsGuard = require('../../guards/game/extra-spins-guard');

var _stopButtonGuard = require('../../guards/game/stop-button-guard');

var _setSpinButtonActiveCommand = require('./spin/set-spin-button-active-command');

var _setSpinButtonStateCommand = require('./spin/set-spin-button-state-command');

function updateSpinButtonCommand() {
  _lego.lego.command.guard(_extraSpinsGuard.extraSpinsGuard).payload(_constants.SpinBtnState.FreeSpin).execute(_setSpinButtonStateCommand.setSpinButtonStateCommand).guard((0, _lego.not)(_extraSpinsGuard.extraSpinsGuard), _stopButtonGuard.stopButtonGuard).payload(_constants.SpinBtnState.Stop).execute(_setSpinButtonStateCommand.setSpinButtonStateCommand).payload(true).execute(_setSpinButtonActiveCommand.setSpinButtonActiveCommand);
}

},{"../../constants":106,"../../guards/game/extra-spins-guard":126,"../../guards/game/stop-button-guard":135,"./spin/set-spin-button-active-command":57,"./spin/set-spin-button-state-command":58,"@armathai/lego":219}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeModelsCommand = initializeModelsCommand;

var _lego = require('@armathai/lego');

var _hintParamGuard = require('../guards/ad/hint-param-guard');

var _persistentCtaParamGuard = require('../guards/ad/persistent-cta-param-guard');

var _soundParamGuard = require('../guards/ad/sound-param-guard');

var _tutorialParamGuard = require('../guards/ad/tutorial-param-guard');

var _initializeCtaModelCommand = require('./ad/cta/initialize-cta-model-command');

var _initializeHintModelCommand = require('./ad/hint/initialize-hint-model-command');

var _initializePersistentCtaModelCommand = require('./ad/pcta/initialize-persistent-cta-model-command');

var _initializeSoundModelCommand = require('./ad/sound/initialize-sound-model-command');

var _initializeTutorialModelCommand = require('./ad/tutorial/initialize-tutorial-model-command');

var _initializeGameModelCommand = require('./game/initialize-game-model-command');

var _initializePlayerModelCommand = require('./player/initialize-player-model-command');

function initializeModelsCommand() {
  _lego.lego.command.execute(_initializePlayerModelCommand.initializePlayerModelCommand).execute(_initializeGameModelCommand.initializeGameModelCommand).execute(_initializeCtaModelCommand.initializeCtaModelCommand).guard(_soundParamGuard.soundParamGuard).execute(_initializeSoundModelCommand.initializeSoundModelCommand).guard(_hintParamGuard.hintParamGuard).execute(_initializeHintModelCommand.initializeHintModelCommand).guard(_tutorialParamGuard.tutorialParamGuard).execute(_initializeTutorialModelCommand.initializeTutorialModelCommand).guard(_persistentCtaParamGuard.persistentCtaParamGuard).execute(_initializePersistentCtaModelCommand.initializePersistentCtaModelCommand);
}

},{"../guards/ad/hint-param-guard":119,"../guards/ad/persistent-cta-param-guard":121,"../guards/ad/sound-param-guard":122,"../guards/ad/tutorial-param-guard":124,"./ad/cta/initialize-cta-model-command":8,"./ad/hint/initialize-hint-model-command":11,"./ad/pcta/initialize-persistent-cta-model-command":18,"./ad/sound/initialize-sound-model-command":24,"./ad/tutorial/initialize-tutorial-model-command":28,"./game/initialize-game-model-command":40,"./player/initialize-player-model-command":69,"@armathai/lego":219}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeAnalyticsObservantCommand = initializeAnalyticsObservantCommand;

var _analyticsObservant = require('../../observants/analytics-observant');

function initializeAnalyticsObservantCommand() {
  (0, _analyticsObservant.AnalyticsObservant)();
}

},{"../../observants/analytics-observant":186}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSoundObservantCommand = initializeSoundObservantCommand;

var _soundObservant = require('../../observants/sound-observant');

function initializeSoundObservantCommand() {
  (0, _soundObservant.SoundObservant)();
}

},{"../../observants/sound-observant":187}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeWrapperObservantCommand = initializeWrapperObservantCommand;

var _wrapperObservant = require('../../observants/wrapper-observant');

function initializeWrapperObservantCommand() {
  (0, _wrapperObservant.WrapperObservant)();
}

},{"../../observants/wrapper-observant":188}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkoutCommand = checkoutCommand;

var _lego = require('@armathai/lego');

var _store = require('../../models/store');

var _setBalanceCommand = require('./set-balance-command');

function checkoutCommand() {
  var _store$player = _store.store.player,
      bet = _store$player.bet,
      balance = _store$player.balance;


  _lego.lego.command.payload(balance - bet).execute(_setBalanceCommand.setBalanceCommand);
}

},{"../../models/store":156,"./set-balance-command":70,"@armathai/lego":219}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPlayerModelCommand = destroyPlayerModelCommand;

var _store = require('../../models/store');

function destroyPlayerModelCommand() {
  _store.store.destroyPlayerModel();
}

},{"../../models/store":156}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializePlayerModelCommand = initializePlayerModelCommand;

var _store = require('../../models/store');

function initializePlayerModelCommand() {
  _store.store.initializePlayerModel();
}

},{"../../models/store":156}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBalanceCommand = setBalanceCommand;

var _store = require('../../models/store');

function setBalanceCommand(value) {
  _store.store.player.balance = value;
}

},{"../../models/store":156}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBetCommand = setBetCommand;

var _store = require('../../models/store');

function setBetCommand(betAmount) {
  _store.store.player.bet = betAmount;
}

},{"../../models/store":156}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeCommand = resizeCommand;

var _lego = require('@armathai/lego');

var _hintModelGuard = require('../guards/ad/hint-model-guard');

var _updateHintStateCommand = require('./ad/hint/update-hint-state-command');

function resizeCommand() {
  _lego.lego.command.guard(_hintModelGuard.hintModelGuard).execute(_updateHintStateCommand.updateHintStateCommand);
}

},{"../guards/ad/hint-model-guard":118,"./ad/hint/update-hint-state-command":14,"@armathai/lego":219}],73:[function(require,module,exports){
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

},{"../constants":106,"./ad/set-ad-status-command":20,"@armathai/lego":219}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shutdownModelsCommand = shutdownModelsCommand;

var _lego = require('@armathai/lego');

var _ctaModelGuard = require('../guards/ad/cta-model-guard');

var _hintModelGuard = require('../guards/ad/hint-model-guard');

var _persistentCtaModelGuard = require('../guards/ad/persistent-cta-model-guard');

var _soundParamGuard = require('../guards/ad/sound-param-guard');

var _tutorialModelGuard = require('../guards/ad/tutorial-model-guard');

var _gameModelGuard = require('../guards/game/game-model-guard');

var _playerModelGuard = require('../guards/player/player-model-guard');

var _destroyCtaModelCommand = require('./ad/cta/destroy-cta-model-command');

var _destroyHintModelCommand = require('./ad/hint/destroy-hint-model-command');

var _destroyPersistentCtaModelCommand = require('./ad/pcta/destroy-persistent-cta-model-command');

var _destroySoundModelCommand = require('./ad/sound/destroy-sound-model-command');

var _destroyTutorialModelCommand = require('./ad/tutorial/destroy-tutorial-model-command');

var _destroyGameModelCommand = require('./game/destroy-game-model-command');

var _destroyPlayerModelCommand = require('./player/destroy-player-model-command');

function shutdownModelsCommand() {
  _lego.lego.command.guard(_playerModelGuard.playerModelGuard).execute(_destroyPlayerModelCommand.destroyPlayerModelCommand).guard(_gameModelGuard.gameModelGuard).execute(_destroyGameModelCommand.destroyGameModelCommand).guard(_ctaModelGuard.ctaModelGuard).execute(_destroyCtaModelCommand.destroyCtaModelCommand).guard(_soundParamGuard.soundParamGuard).execute(_destroySoundModelCommand.destroySoundModelCommand).guard(_hintModelGuard.hintModelGuard).execute(_destroyHintModelCommand.destroyHintModelCommand).guard(_tutorialModelGuard.tutorialModelGuard).execute(_destroyTutorialModelCommand.destroyTutorialModelCommand).guard(_persistentCtaModelGuard.persistentCtaModelGuard).execute(_destroyPersistentCtaModelCommand.destroyPersistentCtaModelCommand);
}

},{"../guards/ad/cta-model-guard":115,"../guards/ad/hint-model-guard":118,"../guards/ad/persistent-cta-model-guard":120,"../guards/ad/sound-param-guard":122,"../guards/ad/tutorial-model-guard":123,"../guards/game/game-model-guard":129,"../guards/player/player-model-guard":136,"./ad/cta/destroy-cta-model-command":7,"./ad/hint/destroy-hint-model-command":10,"./ad/pcta/destroy-persistent-cta-model-command":17,"./ad/sound/destroy-sound-model-command":23,"./ad/tutorial/destroy-tutorial-model-command":27,"./game/destroy-game-model-command":38,"./player/destroy-player-model-command":68,"@armathai/lego":219}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startupCommand = startupCommand;

var _lego = require('@armathai/lego');

var _modelEvents = require('../events/model-events');

var _viewEvents = require('../events/view-events');

var _soundParamGuard = require('../guards/ad/sound-param-guard');

var _adLiveCommand = require('./ad/ad-live-command');

var _adViewStateUpdateCommand = require('./ad/ad-view-state-update-command');

var _ctaIdleTimeCommand = require('./ad/cta/cta-idle-time-command');

var _ctaVisibleUpdateCommand = require('./ad/cta/cta-visible-update-command');

var _initializeAdModelCommand = require('./ad/initialize-ad-model-command');

var _setSoundStateCommand = require('./ad/sound/set-sound-state-command');

var _initializeAnalyticsObservantCommand = require('./observants/initialize-analytics-observant-command');

var _initializeSoundObservantCommand = require('./observants/initialize-sound-observant-command');

var _initializeWrapperObservantCommand = require('./observants/initialize-wrapper-observant-command');

var _resizeCommand = require('./resize-command');

var _retryCommand = require('./retry-command');

var _initializePhaserStatesCommand = require('./states/initialize-phaser-states-command');

var _initializeNinepatchesCommand = require('./view/initialize-ninepatches-command');

var _patchTextForLocalizationCommand = require('./view/patch-text-for-localization-command');

var _userInteractionCommand = require('./view/user-interaction-command');

function startupCommand() {
  _lego.lego.command

  // .execute(addOverlayCommand)
  .execute(_patchTextForLocalizationCommand.patchTextForLocalizationCommand).execute(_initializeNinepatchesCommand.initializeNinePatchesCommand)
  // .execute(initializeParticlesCommand)
  .execute(_initializeAdModelCommand.initializeAdModelCommand).execute(_initializePhaserStatesCommand.initializePhaserStatesCommand).execute(_initializeWrapperObservantCommand.initializeWrapperObservantCommand).execute(_initializeAnalyticsObservantCommand.initializeAnalyticsObservantCommand).guard(_soundParamGuard.soundParamGuard).execute(_initializeSoundObservantCommand.initializeSoundObservantCommand).on(_viewEvents.ViewEvents.Ad.Live, _adLiveCommand.adLiveCommand).on(_viewEvents.ViewEvents.Game.Resize, _resizeCommand.resizeCommand).on(_viewEvents.ViewEvents.Game.UserInteraction, _userInteractionCommand.userInteractionCommand).on(_viewEvents.ViewEvents.GameState.CtaIdleTime, _ctaIdleTimeCommand.ctaIdleTimeCommand).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, _adViewStateUpdateCommand.adViewStateUpdateCommand).on(_viewEvents.ViewEvents.SoundView.Click, _setSoundStateCommand.setSoundStateCommand).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, _ctaVisibleUpdateCommand.ctaVisibleUpdateCommand).on(_viewEvents.ViewEvents.CtaView.RetryClick, _retryCommand.retryCommand);
}

},{"../events/model-events":111,"../events/view-events":112,"../guards/ad/sound-param-guard":122,"./ad/ad-live-command":1,"./ad/ad-view-state-update-command":3,"./ad/cta/cta-idle-time-command":4,"./ad/cta/cta-visible-update-command":6,"./ad/initialize-ad-model-command":15,"./ad/sound/set-sound-state-command":25,"./observants/initialize-analytics-observant-command":64,"./observants/initialize-sound-observant-command":65,"./observants/initialize-wrapper-observant-command":66,"./resize-command":72,"./retry-command":73,"./states/initialize-phaser-states-command":76,"./view/initialize-ninepatches-command":81,"./view/patch-text-for-localization-command":84,"./view/user-interaction-command":85,"@armathai/lego":219}],76:[function(require,module,exports){
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
  // @ts-ignore

  states.preloader = CI_API.game.state.add(_constants.PhaserState.Preload, _preloaderState.PreloaderState, false);
  // @ts-ignore
  states.game = CI_API.game.state.add(_constants.PhaserState.Game, _gameState.GameState, false);
  game.state.start(_constants.PhaserState.Preload);
}

},{"../../constants":106,"../../states/game-state":189,"../../states/preloader-state":190}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restartGameStateCommand = restartGameStateCommand;
function restartGameStateCommand() {
  CI_API.game.state.restart();
}

},{}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGameStateCommand = startGameStateCommand;

var _constants = require('../../constants');

function startGameStateCommand() {
  CI_API.game.state.start(_constants.PhaserState.Game);
}

},{"../../constants":106}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betButtonClickCommand = betButtonClickCommand;

var _lego = require('@armathai/lego');

var _store = require('../../models/store');

var _clamp = require('../../utils/number/clamp');

var _setBetCommand = require('../player/set-bet-command');

function betButtonClickCommand(value) {
  var game = _store.store.game,
      player = _store.store.player;
  var bet = player.bet;
  var _game$slotMachine$con = game.slotMachine.config.bet,
      step = _game$slotMachine$con.step,
      max = _game$slotMachine$con.max,
      min = _game$slotMachine$con.min;


  var clamped = (0, _clamp.clamp)(bet + value * step, min, max);
  _lego.lego.command.payload(clamped).execute(_setBetCommand.setBetCommand);
}

},{"../../models/store":156,"../../utils/number/clamp":203,"../player/set-bet-command":71,"@armathai/lego":219}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectsViewSpinResultAnimationCompleteCommand = effectsViewSpinResultAnimationCompleteCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _firstExtraSpinGuard = require('../../../guards/game/first-extra-spin-guard');

var _spinsToCtaGuard = require('../../../guards/game/spins-to-cta-guard');

var _itemsToCtaCompleteCommand = require('../../ad/cta/items-to-cta-complete-command');

var _idleSlotMachineCommand = require('../../game/machine/idle-slot-machine-command');

var _setGameStatusCommand = require('../../game/set-game-status-command');

function effectsViewSpinResultAnimationCompleteCommand() {
  _lego.lego.command.guard(_spinsToCtaGuard.spinsToCtaGuard).execute(_itemsToCtaCompleteCommand.itemsToCtaCompleteCommand).payload(_constants.GameStatus.Reward).guard(_firstExtraSpinGuard.firstExtraSpinGuard).execute(_setGameStatusCommand.setGameStatusCommand).guard((0, _lego.not)(_spinsToCtaGuard.spinsToCtaGuard), (0, _lego.not)(_firstExtraSpinGuard.firstExtraSpinGuard)).execute(_idleSlotMachineCommand.idleSlotMachineCommand);
}

},{"../../../constants":106,"../../../guards/game/first-extra-spin-guard":127,"../../../guards/game/spins-to-cta-guard":134,"../../ad/cta/items-to-cta-complete-command":9,"../../game/machine/idle-slot-machine-command":41,"../../game/set-game-status-command":56,"@armathai/lego":219}],81:[function(require,module,exports){
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

},{"../../configs/ninepatch-configs":100,"@armathai/phaser2-ninepatch":227}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reelSpeedDownCompleteCommand = reelSpeedDownCompleteCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _lastReelGuard = require('../../../guards/game/last-reel-guard');

var _setReelStateCommand = require('../../game/machine/reel/set-reel-state-command');

var _setSlotMachineStateCommand = require('../../game/machine/set-slot-machine-state-command');

function reelSpeedDownCompleteCommand(uuid) {
  _lego.lego.command.payload(uuid, _constants.ReelState.Idle).execute(_setReelStateCommand.setReelStateCommand).payload(_constants.SlotMachineState.Action).guard(function () {
    return (0, _lastReelGuard.lastReelGuard)(uuid);
  }).execute(_setSlotMachineStateCommand.setSlotMachineStateCommand);
}

},{"../../../constants":106,"../../../guards/game/last-reel-guard":131,"../../game/machine/reel/set-reel-state-command":42,"../../game/machine/set-slot-machine-state-command":43,"@armathai/lego":219}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reelSpeedUpCompleteCommand = reelSpeedUpCompleteCommand;

var _lego = require('@armathai/lego');

var _constants = require('../../../constants');

var _lastReelGuard = require('../../../guards/game/last-reel-guard');

var _stopButtonGuard = require('../../../guards/game/stop-button-guard');

var _setReelStateCommand = require('../../game/machine/reel/set-reel-state-command');

var _setSlotMachineStateCommand = require('../../game/machine/set-slot-machine-state-command');

var _resetSlotCommand = require('../../game/machine/slot/reset-slot-command');

var _stopSlotMachineCommand = require('../../game/machine/stop-slot-machine-command');

function reelSpeedUpCompleteCommand(uuid) {
  _lego.lego.command.payload(true).execute(_resetSlotCommand.resetSlotsCommand).payload(uuid, _constants.ReelState.MaxSpeed).execute(_setReelStateCommand.setReelStateCommand).payload(_constants.SlotMachineState.MaxSpeed).guard(function () {
    return (0, _lastReelGuard.lastReelGuard)(uuid);
  }).execute(_setSlotMachineStateCommand.setSlotMachineStateCommand).payload(uuid).guard(function () {
    return (0, _lastReelGuard.lastReelGuard)(uuid);
  }, (0, _lego.not)(_stopButtonGuard.stopButtonGuard)).execute(_stopSlotMachineCommand.stopSlotMachineCommand);
}

},{"../../../constants":106,"../../../guards/game/last-reel-guard":131,"../../../guards/game/stop-button-guard":135,"../../game/machine/reel/set-reel-state-command":42,"../../game/machine/set-slot-machine-state-command":43,"../../game/machine/slot/reset-slot-command":51,"../../game/machine/stop-slot-machine-command":54,"@armathai/lego":219}],84:[function(require,module,exports){
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

  // @ts-ignore
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

var _hintModelGuard = require('../../guards/ad/hint-model-guard');

var _updateHintStateCommand = require('../ad/hint/update-hint-state-command');

var _setLastInteractionCommand = require('../ad/set-last-interaction-command');

function userInteractionCommand() {
  _lego.lego.command.payload(CI_API.game.time.totalElapsedSeconds()).execute(_setLastInteractionCommand.setLastInteractionCommand).guard(_hintModelGuard.hintModelGuard).execute(_updateHintStateCommand.updateHintStateCommand);
}

},{"../../guards/ad/hint-model-guard":118,"../ad/hint/update-hint-state-command":14,"../ad/set-last-interaction-command":21,"@armathai/lego":219}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animations = undefined;
exports.getCoinFallAnimationConfig = getCoinFallAnimationConfig;

var _constants = require('../constants');

var Animations = exports.Animations = {
  Coin: {
    Fall: 'fall'
  }
};

function getCoinFallAnimationConfig() {
  return {
    key: _constants.ASSETS,
    data: [{
      name: Animations.Coin.Fall,
      prefix: 'animation/coin/coin-',
      start: 0,
      stop: 9,
      suffix: '.png',
      zeroPad: 0,
      frameRate: 60,
      loop: true
    }]
  };
}

},{"../constants":106}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFreeSpinButtonConfig = getFreeSpinButtonConfig;
exports.getSpinButtonConfig = getSpinButtonConfig;
exports.getStopButtonConfig = getStopButtonConfig;
exports.getPersistentCtaButtonConfig = getPersistentCtaButtonConfig;
exports.getCtaStyle1PlayButtonConfig = getCtaStyle1PlayButtonConfig;
exports.getBetPlusButtonConfig = getBetPlusButtonConfig;
exports.getBetMinusButtonConfig = getBetMinusButtonConfig;

var _constants = require('../constants');

var _imageConfigs = require('./image-configs');

var _ninepatchConfigs = require('./ninepatch-configs');

var _textConfigs = require('./text-configs');

// SPIN
function getFreeSpinButtonConfig() {
  return {
    input: {
      name: 'spin_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _ninepatchConfigs.getSpinBtnUpNinePatchConfig)(),
        count: (0, _textConfigs.getFreeSpinBtnUpCountTextConfig)(),
        label: (0, _textConfigs.getFreeSpinBtnUpTextConfig)()
      },
      down: {
        bg: (0, _ninepatchConfigs.getSpinBtnDownNinePatchConfig)(),
        count: (0, _textConfigs.getFreeSpinBtnDownCountTextConfig)(),
        label: (0, _textConfigs.getFreeSpinBtnDownTextConfig)()
      },
      disable: {
        bg: (0, _ninepatchConfigs.getSpinBtnDisableNinePatchConfig)(),
        count: (0, _textConfigs.getFreeSpinBtnDisableCountTextConfig)(),
        label: (0, _textConfigs.getFreeSpinBtnDisableTextConfig)()
      }
    }
  };
}

function getSpinButtonConfig() {
  return {
    input: {
      name: 'spin_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _ninepatchConfigs.getSpinBtnUpNinePatchConfig)(),
        label: (0, _textConfigs.getSpinBtnUpTextConfig)()
      },
      down: {
        bg: (0, _ninepatchConfigs.getSpinBtnDownNinePatchConfig)(),
        label: (0, _textConfigs.getSpinBtnDownTextConfig)()
      },
      disable: {
        bg: (0, _ninepatchConfigs.getSpinBtnDisableNinePatchConfig)(),
        label: (0, _textConfigs.getSpinBtnDisableTextConfig)()
      }
    }
  };
}

function getStopButtonConfig() {
  return {
    input: {
      name: 'stop_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _ninepatchConfigs.getStopBtnUpNinePatchConfig)(),
        label: (0, _textConfigs.getStopBtnUpTextConfig)()
      },
      down: {
        bg: (0, _ninepatchConfigs.getStopBtnDownNinePatchConfig)(),
        label: (0, _textConfigs.getStopBtnDownTextConfig)()
      },
      disable: {
        bg: (0, _ninepatchConfigs.getStopBtnDisableNinePatchConfig)(),
        label: (0, _textConfigs.getStopBtnDisableTextConfig)()
      }
    }
  };
}

// PERSISTENT CTA
function getPersistentCtaButtonConfig() {
  return {
    input: {
      name: 'persistent_cta_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _ninepatchConfigs.getPersistentCtaButtonNinePathConfig)(),
        label: (0, _textConfigs.getPersistentCtaTextConfig)()
      }
    }
  };
}

// CTA
function getCtaStyle1PlayButtonConfig() {
  return {
    input: {
      name: 'cta_play_button',
      priority: _constants.InputPriority.Cta + 1
    },
    states: {
      up: {
        bg: (0, _ninepatchConfigs.getCtaStyle1PlayButtonNinePatchConfig)(),
        label: (0, _textConfigs.getCtaStyle1PlayButtonTextConfig)()
      }
    }
  };
}

// CONTROLS
function getBetPlusButtonConfig() {
  return {
    input: {
      name: 'bet_plus_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _imageConfigs.getBetPlusBtnUpImageConfig)()
      },
      down: {
        bg: (0, _imageConfigs.getBetPlusBtnDownImageConfig)()
      },
      disable: {
        bg: (0, _imageConfigs.getBetPlusBtnDisableImageConfig)()
      }
    }
  };
}

function getBetMinusButtonConfig() {
  return {
    input: {
      name: 'bet_minus_button',
      priority: _constants.InputPriority.Game
    },
    states: {
      up: {
        bg: (0, _imageConfigs.getBetMinusBtnUpImageConfig)()
      },
      down: {
        bg: (0, _imageConfigs.getBetMinusBtnDownImageConfig)()
      },
      disable: {
        bg: (0, _imageConfigs.getBetMinusBtnDisableImageConfig)()
      }
    }
  };
}

},{"../constants":106,"./image-configs":98,"./ninepatch-configs":100,"./text-configs":104}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMainGridConfig = getMainGridConfig;
exports.getForegroundGridConfig = getForegroundGridConfig;
exports.getRewardGridConfig = getRewardGridConfig;
exports.getBackgroundGridConfig = getBackgroundGridConfig;
exports.getUIGridConfig = getUIGridConfig;
exports.getControlsGridConfig = getControlsGridConfig;
exports.getGameGridConfig = getGameGridConfig;
exports.getCTAStyle1GridConfig = getCTAStyle1GridConfig;
exports.getEffectsGridConfig = getEffectsGridConfig;

var _backgroundGridConfigs = require('./grid/background-grid-configs');

var _controlsGridConfigs = require('./grid/controls-grid-configs');

var _ctaGridConfigs = require('./grid/cta-grid-configs');

var _effectsGridConfigs = require('./grid/effects-grid-configs');

var _foregroundGridConfigs = require('./grid/foreground-grid-configs');

var _gameGridConfigs = require('./grid/game-grid-configs');

var _mainGridConfigs = require('./grid/main-grid-configs');

var _rewardGridConfigs = require('./grid/reward-grid-configs');

var _uiGridConfigs = require('./grid/ui-grid-configs');

function getMainGridConfig() {
  return LP(_mainGridConfigs.getMainGridLandscapeConfig, _mainGridConfigs.getMainGridPortraitConfig).call(null);
}

function getForegroundGridConfig() {
  return LP(_foregroundGridConfigs.getForegroundGridLandscapeConfig, _foregroundGridConfigs.getForegroundGridPortraitConfig).call(null);
}

function getRewardGridConfig() {
  return LP(_rewardGridConfigs.getRewardGridLandscapeConfig, _rewardGridConfigs.getRewardGridPortraitConfig).call(null);
}

function getBackgroundGridConfig() {
  return LP(_backgroundGridConfigs.getBackgroundGridLandscapeConfig, _backgroundGridConfigs.getBackgroundGridPortraitConfig).call(null);
}

function getUIGridConfig() {
  return LP(_uiGridConfigs.getUIGridLandscapeConfig, _uiGridConfigs.getUIGridPortraitConfig).call(null);
}

function getControlsGridConfig() {
  return LP(_controlsGridConfigs.getControlsGridLandscapeConfig, _controlsGridConfigs.getControlsGridPortraitConfig).call(null);
}

function getGameGridConfig() {
  return LP(_gameGridConfigs.getGameGridLandscapeConfig, _gameGridConfigs.getGameGridPortraitConfig).call(null);
}

function getCTAStyle1GridConfig() {
  return LP(_ctaGridConfigs.getCTAStyle1GridLandscapeConfig, _ctaGridConfigs.getCTAStyle1GridPortraitConfig).call(null);
}

function getEffectsGridConfig() {
  return LP(_effectsGridConfigs.getEffectsGridLandscapeConfig, _effectsGridConfigs.getEffectsGridPortraitConfig).call(null);
}

},{"./grid/background-grid-configs":89,"./grid/controls-grid-configs":90,"./grid/cta-grid-configs":91,"./grid/effects-grid-configs":92,"./grid/foreground-grid-configs":93,"./grid/game-grid-configs":94,"./grid/main-grid-configs":95,"./grid/reward-grid-configs":96,"./grid/ui-grid-configs":97}],89:[function(require,module,exports){
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
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Envelop
    }]
  };
}

function getBackgroundGridPortraitConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'background',
    cells: [{
      name: 'bg',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Envelop
    }]
  };
}

},{"@armathai/phaser2-grid":224}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlsGridLandscapeConfig = getControlsGridLandscapeConfig;
exports.getControlsGridPortraitConfig = getControlsGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getControlsGridLandscapeConfig() {
  return {
    // debug: { color: 0xff0000 },
    name: 'controls',
    cells: [{
      name: 'win_bet',
      bounds: { x: 0.038, y: 0, width: 0.26, height: 1 }
    }, {
      name: 'spin',
      bounds: { x: 0.72, y: 0.1, width: 0.16, height: 0.8 }
    }, {
      name: 'bg',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Fill
    }]
  };
}

function getControlsGridPortraitConfig() {
  return {
    // debug: { color: 0xff0000 },
    name: 'controls',
    cells: [{
      name: 'win_bet',
      bounds: { x: 0.07, y: 0, width: 0.52, height: 0.8 }
    }, {
      name: 'spin',
      bounds: { x: 0.58, y: 0, width: 0.4, height: 0.8 }
    }, {
      name: 'bg',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Fill
    }]
  };
}

},{"@armathai/phaser2-grid":224}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCTAStyle1GridLandscapeConfig = getCTAStyle1GridLandscapeConfig;
exports.getCTAStyle1GridPortraitConfig = getCTAStyle1GridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getCTAStyle1GridLandscapeConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'popup',
      bounds: { x: 0, y: 0.36, width: 1, height: 0.33 }
    }, {
      name: 'play_button',
      bounds: { x: 0 }
    }, {
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill
    }]
  };
}

function getCTAStyle1GridPortraitConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'cta',
    cells: [{
      name: 'popup',
      bounds: { x: 0, y: 0.36, height: 0.24 }
    }, {
      name: 'play_button',
      bounds: { x: 0, height: 0.2 }
    }, {
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      name: 'blocker',
      scale: _phaser2Grid.CellScale.Fill
    }]
  };
}

},{"@armathai/phaser2-grid":224}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEffectsGridLandscapeConfig = getEffectsGridLandscapeConfig;
exports.getEffectsGridPortraitConfig = getEffectsGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getEffectsGridLandscapeConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'effects',
    cells: [{
      name: 'result',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      align: _phaser2Grid.CellAlign.LeftTop,
      scale: _phaser2Grid.CellScale.None
    }]
  };
}

function getEffectsGridPortraitConfig() {
  return {
    // debug: { color: 0x4bdbd4 },
    name: 'effects',
    cells: [{
      name: 'result',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      align: _phaser2Grid.CellAlign.LeftTop,
      scale: _phaser2Grid.CellScale.None
    }]
  };
}

},{"@armathai/phaser2-grid":224}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getForegroundGridLandscapeConfig = getForegroundGridLandscapeConfig;
exports.getForegroundGridPortraitConfig = getForegroundGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getForegroundGridLandscapeConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'foreground',
    cells: [{
      name: 'logo',
      bounds: { x: 0, y: 0.03, width: 0.17, height: 0.12 },
      align: _phaser2Grid.CellAlign.LeftTop
    }, {
      name: 'sound',
      bounds: { x: 0, width: 0.06, height: 0.1 },
      align: _phaser2Grid.CellAlign.LeftTop,
      offset: { x: 60, y: 20 }
    }, {
      name: 'cta_logo',
      bounds: { x: 0.3, y: 0.1, width: 0.4, height: 0.22 }
    }]
  };
}

function getForegroundGridPortraitConfig() {
  return {
    // debug: { color: 0xd95027 },
    name: 'foreground',
    cells: [{
      name: 'logo',
      bounds: { x: 0.2, y: 0.02, width: 0.6, height: 0.15 }
    }, {
      name: 'sound',
      bounds: { x: 0, y: 0.08, width: 0.1, height: 0.05 },
      align: _phaser2Grid.CellAlign.LeftCenter,
      offset: { x: 20 }
    }, {
      name: 'cta_logo',
      bounds: { x: 0.2, y: 0.1, width: 0.6, height: 0.18 }
    }]
  };
}

},{"@armathai/phaser2-grid":224}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGameGridLandscapeConfig = getGameGridLandscapeConfig;
exports.getGameGridPortraitConfig = getGameGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

function getGameGridLandscapeConfig() {
  var offsetY = CI_API.Globals.PARAMS.cta_btn_persistent ? -56 : -42;

  return {
    // debug: { color: 0x2fc900 },
    name: 'game',
    cells: [{
      name: 'machine',
      bounds: { x: 0.15, y: 0, width: 0.7, height: 1 },
      offset: { y: offsetY },
      scale: _phaser2Grid.CellScale.None
    }]
  };
}

function getGameGridPortraitConfig() {
  return {
    // debug: { color: 0x2fc900 },
    name: 'game',
    cells: [{
      name: 'machine',
      bounds: { x: 0, y: 0.32, width: 1, height: 0.36 },
      padding: -0.052
    }]
  };
}

},{"@armathai/phaser2-grid":224}],95:[function(require,module,exports){
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

},{"../../utils":202,"@armathai/phaser2-grid":224}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRewardGridLandscapeConfig = getRewardGridLandscapeConfig;
exports.getRewardGridPortraitConfig = getRewardGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

function getRewardGridLandscapeConfig() {
  return {
    bounds: (0, _utils.getGameBounds)(),
    // debug: { color: 0x2fc900 },
    name: 'reward',
    cells: [{
      name: 'blocker',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Fill
    }, {
      name: 'popup',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }, {
      name: 'emitter',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.None
    }]
  };
}

function getRewardGridPortraitConfig() {
  return {
    bounds: (0, _utils.getGameBounds)(),
    // debug: { color: 0x2fc900 },
    name: 'reward',
    cells: [{
      name: 'blocker',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.Fill
    }, {
      name: 'popup',
      bounds: { x: 0, y: 0, width: 1, height: 1 }
    }, {
      name: 'emitter',
      bounds: { x: 0, y: 0, width: 1, height: 1 },
      scale: _phaser2Grid.CellScale.None
    }]
  };
}

},{"../../utils":202,"@armathai/phaser2-grid":224}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUIGridLandscapeConfig = getUIGridLandscapeConfig;
exports.getUIGridPortraitConfig = getUIGridPortraitConfig;

var _phaser2Grid = require('@armathai/phaser2-grid');

var _utils = require('../../utils');

var getBalanceHeight = function getBalanceHeight() {
  return LP(Math.min(0.134, 86 / (0, _utils.getGameBounds)().height), Math.min(0.09, 100 / (0, _utils.getGameBounds)().height));
};

var getFooterHeight = function getFooterHeight() {
  return LP(Math.min(0.19, 120 / (0, _utils.getGameBounds)().height), Math.min(0.158, 180 / (0, _utils.getGameBounds)().height));
};

function getUIGridLandscapeConfig() {
  var footerH = getFooterHeight();
  var footerY = 1 - footerH;

  var balanceH = getBalanceHeight();
  var balanceY = 0;

  var pCtaH = 0.105;
  var pCtaY = footerY - pCtaH;

  return {
    // debug: { color: 0x4287f5 },
    name: 'ui',
    cells: [{
      name: 'balance',
      bounds: { x: 0, y: balanceY, width: 1, height: balanceH },
      align: _phaser2Grid.CellAlign.CenterTop,
      offset: { y: -24 }
    }, {
      name: 'footer',
      bounds: { x: 0, width: 1, y: footerY }
    }, {
      name: 'p_cta',
      bounds: { x: 0, y: pCtaY, width: 1, height: pCtaH },
      padding: { height: 0.9 }
    }, {
      name: 'tutorial',
      bounds: { x: 0.3, width: 0.4, y: footerY },
      padding: -0.03
    }]
  };
}

function getUIGridPortraitConfig() {
  var footerH = getFooterHeight();
  var footerY = 1 - footerH;

  var balanceH = getBalanceHeight();
  var balanceY = 1 - (footerH + balanceH);

  var pCtaH = 0.09;
  var pCtaY = balanceY - pCtaH;

  return {
    // debug: { color: 0x4287f5 },
    name: 'ui',
    cells: [{
      name: 'balance',
      bounds: { x: 0, y: balanceY, width: 1, height: balanceH },
      align: _phaser2Grid.CellAlign.CenterBottom,
      offset: { y: 8 }
    }, {
      name: 'footer',
      bounds: { x: 0, y: footerY, width: 1, height: footerH }
    }, {
      name: 'p_cta',
      bounds: { x: 0, y: pCtaY, width: 1, height: pCtaH }
    }, {
      name: 'tutorial',
      bounds: { x: 0, y: 0.19, width: 1, height: 0.13 },
      padding: -0.13
    }]
  };
}

},{"../../utils":202,"@armathai/phaser2-grid":224}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoinImageConfig = getCoinImageConfig;
exports.getBgImageConfig = getBgImageConfig;
exports.getLogoImageConfig = getLogoImageConfig;
exports.getLogoGlowConfig = getLogoGlowConfig;
exports.getCtaOrnamentImageConfig = getCtaOrnamentImageConfig;
exports.getRewardPopupBgImageConfig = getRewardPopupBgImageConfig;
exports.getRewardPopupFreeSpinBgImageConfig = getRewardPopupFreeSpinBgImageConfig;
exports.getUiOrnamentImageConfig = getUiOrnamentImageConfig;
exports.getSlotMachineBgImageConfig = getSlotMachineBgImageConfig;
exports.getBetPlusBtnUpImageConfig = getBetPlusBtnUpImageConfig;
exports.getBetPlusBtnDownImageConfig = getBetPlusBtnDownImageConfig;
exports.getBetPlusBtnDisableImageConfig = getBetPlusBtnDisableImageConfig;
exports.getBetMinusBtnUpImageConfig = getBetMinusBtnUpImageConfig;
exports.getBetMinusBtnDownImageConfig = getBetMinusBtnDownImageConfig;
exports.getBetMinusBtnDisableImageConfig = getBetMinusBtnDisableImageConfig;
exports.getWinBetOrnamentImageConfig = getWinBetOrnamentImageConfig;
// MAIN
function getCoinImageConfig() {
  return {
    frame: 'animation/coin/coin-0.png'
  };
}

// BG
function getBgImageConfig() {
  return {
    frame: 'bg/bg.jpg'
  };
}

// LOGO
function getLogoImageConfig() {
  return {
    frame: 'ui/logo.png'
  };
}

function getLogoGlowConfig() {
  return {
    y: 60,
    x: 10,
    frame: 'ui/logo-glow.png'
  };
}

// CTA
function getCtaOrnamentImageConfig() {
  return {
    frame: 'cta/cta-ornament.png'
  };
}

// REWARD
function getRewardPopupBgImageConfig() {
  return {
    frame: 'reward/reward-bg-part.png'
  };
}

function getRewardPopupFreeSpinBgImageConfig() {
  return {
    y: -200,
    frame: 'reward/free-spin-bg.png'
  };
}

// UI
function getUiOrnamentImageConfig() {
  return {
    frame: 'ui/ornament-1.png'
  };
}

// MACHINE
function getSlotMachineBgImageConfig() {
  return {
    frame: 'slot/machine-bg.png',
    anchor: { x: 0, y: 0 }
  };
}

// CONTROLS
function getBetPlusBtnUpImageConfig() {
  return {
    frame: 'ui/bet-plus-btn-up.png'
  };
}

function getBetPlusBtnDownImageConfig() {
  return {
    frame: 'ui/bet-plus-btn-down.png'
  };
}

function getBetPlusBtnDisableImageConfig() {
  return {
    frame: 'ui/bet-plus-btn-disable.png'
  };
}

function getBetMinusBtnUpImageConfig() {
  return {
    frame: 'ui/bet-minus-btn-up.png'
  };
}

function getBetMinusBtnDownImageConfig() {
  return {
    frame: 'ui/bet-minus-btn-down.png'
  };
}

function getBetMinusBtnDisableImageConfig() {
  return {
    frame: 'ui/bet-minus-btn-disable.png'
  };
}

function getWinBetOrnamentImageConfig() {
  return {
    frame: 'ui/ornament-2.png'
  };
}

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playCommands = exports.legoLoggerConfig = undefined;

var _ctaPrevisibleUpdateCommand = require('../commands/ad/cta/cta-previsible-update-command');

var _tutorialCompleteCommand = require('../commands/ad/tutorial/tutorial-complete-command');

var _tutorialScreenClickCommand = require('../commands/ad/tutorial/tutorial-screen-click-command');

var _tutorialSequenceViewCompleteCommand = require('../commands/ad/tutorial/tutorial-sequence-view-complete-command');

var _gameStatusUpdateCommand = require('../commands/game/game-status-update-command');

var _idleSlotMachineCommand = require('../commands/game/machine/idle-slot-machine-command');

var _slotMachineStateUpdateCommand = require('../commands/game/machine/slot-machine-state-update-command');

var _spinSlotMachineCommand = require('../commands/game/machine/spin-slot-machine-command');

var _stopSlotMachineCommand = require('../commands/game/machine/stop-slot-machine-command');

var _spinButtonActiveUpdateCommand = require('../commands/game/spin/spin-button-active-update-command');

var _betButtonClickCommand = require('../commands/view/bet-button-click-command');

var _effectsViewSpinResultCompleteCommand = require('../commands/view/effects/effects-view-spin-result-complete-command');

var _reelSpeedDownCompleteCommand = require('../commands/view/machine/reel-speed-down-complete-command');

var _reelSpeedUpCompleteCommand = require('../commands/view/machine/reel-speed-up-complete-command');

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
// eslint-disable-next-line max-len
var playCommands = exports.playCommands = Object.freeze([{
  event: _modelEvents.ModelEvents.TutorialModel.CompleteUpdate,
  command: _tutorialCompleteCommand.tutorialCompleteCommand
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
  event: _viewEvents.ViewEvents.SpinView.Spin,
  command: _spinSlotMachineCommand.spinSlotMachineCommand
}, {
  event: _viewEvents.ViewEvents.SpinView.Stop,
  command: _stopSlotMachineCommand.stopSlotMachineCommand
}, {
  event: _viewEvents.ViewEvents.SlotMachineView.Spin,
  command: _spinSlotMachineCommand.spinSlotMachineCommand
}, {
  event: _viewEvents.ViewEvents.BetView.ButtonClick,
  command: _betButtonClickCommand.betButtonClickCommand
}, {
  event: _viewEvents.ViewEvents.ReelView.SpeedUpComplete,
  command: _reelSpeedUpCompleteCommand.reelSpeedUpCompleteCommand
}, {
  event: _viewEvents.ViewEvents.ReelView.SpeedDownComplete,
  command: _reelSpeedDownCompleteCommand.reelSpeedDownCompleteCommand
}, {
  event: _modelEvents.ModelEvents.SlotMachineModel.StateUpdate,
  command: _slotMachineStateUpdateCommand.slotMachineStateUpdateCommand
}, {
  event: _modelEvents.ModelEvents.SpinButtonModel.ActiveUpdate,
  command: _spinButtonActiveUpdateCommand.spinButtonActiveUpdateCommand
}, {
  event: _viewEvents.ViewEvents.EffectsView.SpinResultAnimationComplete,
  command: _effectsViewSpinResultCompleteCommand.effectsViewSpinResultAnimationCompleteCommand
}, {
  event: _modelEvents.ModelEvents.GameModel.StatusUpdate,
  command: _gameStatusUpdateCommand.gameStatusUpdateCommand
}, {
  event: _viewEvents.ViewEvents.RewardView.HideComplete,
  command: _idleSlotMachineCommand.idleSlotMachineCommand
}]);

},{"../commands/ad/cta/cta-previsible-update-command":5,"../commands/ad/tutorial/tutorial-complete-command":31,"../commands/ad/tutorial/tutorial-screen-click-command":32,"../commands/ad/tutorial/tutorial-sequence-view-complete-command":33,"../commands/game/game-status-update-command":39,"../commands/game/machine/idle-slot-machine-command":41,"../commands/game/machine/slot-machine-state-update-command":50,"../commands/game/machine/spin-slot-machine-command":52,"../commands/game/machine/stop-slot-machine-command":54,"../commands/game/spin/spin-button-active-update-command":59,"../commands/view/bet-button-click-command":79,"../commands/view/effects/effects-view-spin-result-complete-command":80,"../commands/view/machine/reel-speed-down-complete-command":82,"../commands/view/machine/reel-speed-up-complete-command":83,"../events/model-events":111,"../events/view-events":112}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ninePatches = undefined;
exports.getPersistentCtaButtonNinePathConfig = getPersistentCtaButtonNinePathConfig;
exports.getCtaStyle1PopupTitleBgPatchConfig = getCtaStyle1PopupTitleBgPatchConfig;
exports.getCtaStyle1PlayButtonNinePatchConfig = getCtaStyle1PlayButtonNinePatchConfig;
exports.getTutorialBgImageConfig = getTutorialBgImageConfig;
exports.getBalanceBgNinePatchConfig = getBalanceBgNinePatchConfig;
exports.getSpinBtnUpNinePatchConfig = getSpinBtnUpNinePatchConfig;
exports.getSpinBtnDownNinePatchConfig = getSpinBtnDownNinePatchConfig;
exports.getSpinBtnDisableNinePatchConfig = getSpinBtnDisableNinePatchConfig;
exports.getStopBtnUpNinePatchConfig = getStopBtnUpNinePatchConfig;
exports.getStopBtnDownNinePatchConfig = getStopBtnDownNinePatchConfig;
exports.getStopBtnDisableNinePatchConfig = getStopBtnDisableNinePatchConfig;
exports.getWinBetBgNinePathConfig = getWinBetBgNinePathConfig;

var _constants = require('../constants');

var persistentCta = 'ui/persistent-cta.png';
var ctaTitleBg = 'cta/cta-title-bg.png';
var ctaPlayBtn = 'cta/play-btn.png';
var tutorialBg = 'tutorial/tutorial-bg.png';
var balanceBg = 'ui/balance-bg.png';
var winBetBg = 'ui/bet-bg.png';
var spinBtnUp = 'ui/spin-btn-up.png';
var spinBtnDown = 'ui/spin-btn-down.png';
var spinBtnDisable = 'ui/spin-btn-disable.png';
var stopBtnUp = 'ui/stop-btn-up.png';
var stopBtnDown = 'ui/stop-btn-down.png';

// PERSISTENT
function getPersistentCtaButtonNinePathConfig() {
  return {
    width: 264,
    height: 80,
    frame: persistentCta
  };
}

// CTA
function getCtaStyle1PopupTitleBgPatchConfig() {
  return {
    width: 350,
    height: 92,
    frame: ctaTitleBg
  };
}

function getCtaStyle1PlayButtonNinePatchConfig() {
  return {
    width: 420,
    height: 210,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: ctaPlayBtn
  };
}

// TUTORIAL
function getTutorialBgImageConfig() {
  return {
    width: 550,
    height: 184,
    frame: tutorialBg
  };
}

// BALANCE
function getBalanceBgNinePatchConfig() {
  return {
    width: 470,
    height: 94,
    frame: balanceBg
  };
}

// CONTROLS
function getSpinBtnUpNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: spinBtnUp
  };
}

function getSpinBtnDownNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: spinBtnDown
  };
}

function getSpinBtnDisableNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: spinBtnDisable
  };
}

function getStopBtnUpNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: stopBtnUp
  };
}

function getStopBtnDownNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: stopBtnDown
  };
}

function getStopBtnDisableNinePatchConfig() {
  return {
    width: 182,
    height: 92,
    key: _constants.UNCOMPRESSED_ASSETS,
    frame: spinBtnDisable
  };
}

function getWinBetBgNinePathConfig() {
  return {
    width: LP(300, 330),
    height: 92,
    frame: winBetBg
  };
}

var ninePatches = exports.ninePatches = [{
  key: persistentCta,
  data: {
    left: 62,
    right: 62,
    top: 30,
    bottom: 30
  }
}, {
  key: ctaTitleBg,
  data: {
    left: 62,
    right: 62,
    top: 30,
    bottom: 30
  }
}, {
  key: ctaPlayBtn,
  data: {
    left: 84,
    right: 84,
    top: 75,
    bottom: 75
  }
}, {
  key: tutorialBg,
  data: {
    left: 70,
    right: 70,
    top: 80,
    bottom: 80
  }
}, {
  key: balanceBg,
  data: {
    left: 90,
    right: 90,
    top: 0,
    bottom: 0
  }
}, {
  key: spinBtnUp,
  data: {
    left: 67,
    right: 67,
    top: 30,
    bottom: 30
  }
}, {
  key: spinBtnDown,
  data: {
    left: 67,
    right: 67,
    top: 30,
    bottom: 30
  }
}, {
  key: spinBtnDisable,
  data: {
    left: 62,
    right: 62,
    top: 30,
    bottom: 30
  }
}, {
  key: stopBtnUp,
  data: {
    left: 67,
    right: 67,
    top: 30,
    bottom: 30
  }
}, {
  key: stopBtnDown,
  data: {
    left: 67,
    right: 67,
    top: 30,
    bottom: 30
  }
}, {
  key: winBetBg,
  data: {
    left: 124,
    right: 42,
    top: 0,
    bottom: 0
  }
}];

},{"../constants":106}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.particles = undefined;
exports.getCtaCoinEmitterConfig = getCtaCoinEmitterConfig;
exports.getWinCoinEmitterConfig = getWinCoinEmitterConfig;

var _coinFallParticle = require('../utils/emitters/coin-fall/coin-fall-particle');

function getCtaCoinEmitterConfig() {
  return {
    area: {
      random: true,
      shape: new Phaser.Line(-100, -100, CI_API.game.width + 100, -100)
    },
    repeat: true,
    count: 70,
    gravity: { x: 0, y: 5 },
    scale: { min: 1, max: 1.3 },
    rotation: { min: Math.PI, max: 2 * Math.PI },
    delay: { min: 0, max: 3000 },
    duration: { min: 3000, max: 3000 },
    velocity: { x: { min: 0, max: 0 }, y: { min: 300, max: 700 } },
    particleClass: _coinFallParticle.CoinFallParticle
  };
}

function getWinCoinEmitterConfig() {
  return {
    area: {
      random: true,
      shape: new Phaser.Line(-100, -100, CI_API.game.width + 100, -100)
    },
    count: 50,
    repeat: false,
    gravity: { x: 0, y: 5 },
    scale: { min: 1, max: 1.3 },
    rotation: { min: Math.PI, max: 2 * Math.PI },
    delay: { min: 0, max: 1400 },
    duration: { min: 2000, max: 2000 },
    velocity: { x: { min: 0, max: 0 }, y: { min: 500, max: 1000 } },
    particleClass: _coinFallParticle.CoinFallParticle
  };
}

var particles = exports.particles = [];

},{"../utils/emitters/coin-fall/coin-fall-particle":200}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlotMachineConfig = getSlotMachineConfig;
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
function BackOut(k) {
  // const s = 1.70158;
  var s = 0.8;
  return --k * k * ((s + 1) * k + s) + 1;
}

function BackIn(k) {
  // const s = 1.70158;
  var s = 0.4;
  return k * k * ((s + 1) * k - s);
}

function getSlotMachineConfig() {
  return {
    slotOffset: -24,
    clickable: true,
    speed: 1.3,
    bet: { step: 50000, max: 400000, min: 100000 },
    prizeFactor: { regular: 10, big: 20, mega: 30 },
    combinations: {
      loose: [[[0], [4], [1], [3], [5]], [[3], [1], [4], [0], [8]]],
      regular: [[[0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1]], [[2], [2], [2], [2], [2]], [[3], [2], [2], [2], [3]], [[1], [1], [1], [1], [2]], [[2], [1], [1], [1], [1]], [[], [0], [1], [2], []], [[], [2], [1], [0], []]],
      big: [[[], [1], [1], [1], []]],
      mega: [[[0, 1, 2, 3], [1], [1], [1], [0, 1, 2, 3]]]
    },
    mask: [{ x: 38, y: 34 }, { x: 180, y: 34 }, { x: 180, y: 86 }, { x: 600, y: 86 }, { x: 600, y: 34 }, { x: 741, y: 34 }, { x: 741, y: 450 }, { x: 600, y: 450 }, { x: 600, y: 396 }, { x: 180, y: 396 }, { x: 180, y: 450 }, { x: 38, y: 450 }],
    spinEasing: BackIn,
    stopEasing: BackOut,
    reelsSpinDelay: 0,
    reelsStopDelay: 30,
    reels: [{
      offset: { x: 1, y: 1 },
      slots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }, {
      offset: { x: 0, y: 57 },
      slots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    }, {
      offset: { x: 0, y: 57 },
      slots: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]
    }, {
      offset: { x: 0, y: 57 },
      slots: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]
    }, {
      offset: { x: 0, y: 3 },
      slots: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
    }],
    winSlotTypes: {
      mega: [8, 9],
      big: [0],
      regular: [1, 2, 3, 4, 5, 6, 7]
    },
    slotDimensions: [{ width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }, { width: 152, height: 129 }]
  };
}

},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Spines = exports.Spines = {
  Frame: {
    Key: 'frame',
    Animations: {
      Idle: 'animation'
    }
  },
  Bracelet: {
    Key: 'bracelet',
    Animations: {
      Idle: 'idle',
      Action: 'action'
    }
  }
};

// export function getCardSpineConfig(x, y) {
//   return {
//     key: Spines.Card.Key,
//     x,
//     y
//   };
// }

var SlotSpineMap = exports.SlotSpineMap = Object.freeze(['free_spin', 'bracelet', 'symbol', 'shield', 'necklace', 'leaf', 'wild', 'crown', 'cleopatra', 'caesar']);

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCtaStyle1PlayButtonTextConfig = getCtaStyle1PlayButtonTextConfig;
exports.getCtaStyle1PopupTitleTextConfig = getCtaStyle1PopupTitleTextConfig;
exports.getCtaStyle1PopupSubtitleTextConfig = getCtaStyle1PopupSubtitleTextConfig;
exports.getTutorial1TextConfig = getTutorial1TextConfig;
exports.getTutorial2TextConfig = getTutorial2TextConfig;
exports.getRewardPopupCountTextConfig = getRewardPopupCountTextConfig;
exports.getRewardPopupTitleTextConfig = getRewardPopupTitleTextConfig;
exports.getBalanceLabelTextConfig = getBalanceLabelTextConfig;
exports.getSpinBtnUpTextConfig = getSpinBtnUpTextConfig;
exports.getSpinBtnDownTextConfig = getSpinBtnDownTextConfig;
exports.getSpinBtnDisableTextConfig = getSpinBtnDisableTextConfig;
exports.getStopBtnUpTextConfig = getStopBtnUpTextConfig;
exports.getStopBtnDownTextConfig = getStopBtnDownTextConfig;
exports.getStopBtnDisableTextConfig = getStopBtnDisableTextConfig;
exports.getFreeSpinBtnUpTextConfig = getFreeSpinBtnUpTextConfig;
exports.getFreeSpinBtnDownTextConfig = getFreeSpinBtnDownTextConfig;
exports.getFreeSpinBtnDisableTextConfig = getFreeSpinBtnDisableTextConfig;
exports.getFreeSpinBtnCountTextConfig = getFreeSpinBtnCountTextConfig;
exports.getFreeSpinBtnUpCountTextConfig = getFreeSpinBtnUpCountTextConfig;
exports.getFreeSpinBtnDownCountTextConfig = getFreeSpinBtnDownCountTextConfig;
exports.getFreeSpinBtnDisableCountTextConfig = getFreeSpinBtnDisableCountTextConfig;
exports.getPersistentCtaTextConfig = getPersistentCtaTextConfig;
exports.getWinLabelTextConfig = getWinLabelTextConfig;
exports.getWinTextConfig = getWinTextConfig;
exports.getBetLabelTextConfig = getBetLabelTextConfig;
exports.getBetTextConfig = getBetTextConfig;

var _constants = require('../constants');

// CTA
function getCtaStyle1PlayButtonTextConfig() {
  return {
    text: CI_API.Globals.PARAMS.cta_btn_text,
    y: 2,
    style: {
      font: _constants.FONT1,
      fontSize: 34,
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#174417',
      strokeThickness: 2,
      lineSpacing: -10,
      shadow: {
        x: 1,
        y: 1,
        color: '#153615',
        blur: 4,
        shadowStroke: true,
        shadowFill: true
      }
    }
  };
}

function getCtaStyle1PopupTitleTextConfig() {
  return {
    text: 'big_win',
    y: 3,
    style: {
      font: _constants.FONT1,
      fontSize: 52,
      fontWeight: 900,
      fill: '#ffffff',
      stroke: '#012646',
      strokeThickness: 4,
      align: 'center'
    }
  };
}

function getCtaStyle1PopupSubtitleTextConfig() {
  return {
    x: 45,
    text: {
      text: '',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 65,
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#012646',
      strokeThickness: 6
    }
  };
}

// TUTORIAL
function getTutorial1TextConfig() {
  var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
      first_slot_auto = _CI_API$Globals$PARAM.first_slot_auto,
      tutorial_text = _CI_API$Globals$PARAM.tutorial_text;

  var text = first_slot_auto ? _constants.SpinStopMap[tutorial_text] : tutorial_text;

  return {
    text: text,
    style: {
      font: _constants.FONT1,
      fontSize: LP(30, 26),
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      align: 'center',
      lineSpacing: -5,
      wordWrap: true,
      wordWrapWidth: 580
    }
  };
}

function getTutorial2TextConfig() {
  return {
    text: {
      text: 'tutorial_text_2',
      macros: { '{{0}}': CI_API.Globals.PARAMS.number_of_extra_spins },
      ignoreLocalization: false,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: LP(40, 30),
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      wordWrap: true,
      wordWrapWidth: 580
    }
  };
}

// REWARD
function getRewardPopupCountTextConfig(text) {
  return {
    x: -2,
    text: {
      text: '' + text,
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 72,
      fontWeight: 900,
      fill: '#ffffff'
    }
  };
}

function getRewardPopupTitleTextConfig() {
  return {
    x: 0,
    y: 106,
    text: 'free_spins',
    style: {
      font: _constants.FONT1,
      fontSize: 46,
      fontWeight: 900,
      fill: '#ffffff',
      align: 'center',
      stroke: '#01d4ac',
      strokeThickness: 4,
      shadow: {
        x: 1,
        y: 1,
        color: '#00f3b4',
        blur: 4,
        shadowStroke: true,
        shadowFill: true
      },
      gradient: [{
        color: '#02a26e',
        percent: 0
      },
      // {
      //   color: '#00e9b3',
      //   percent: 0.25
      // },
      {
        color: '#00e9b3',
        percent: 0.5
      }, {
        color: '#02a26e',
        percent: 1
      }],
      wordWrap: true,
      wordWrapWidth: 200,
      lineSpacing: -12
    }
  };
}

// BALANCE
function getBalanceLabelTextConfig(text) {
  return {
    text: {
      text: '' + text,
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    y: 8,
    style: {
      font: _constants.FONT1,
      fontSize: 32,
      fontWeight: 800,
      fill: '#ffffff'
    }
  };
}

// SPIN
function getSpinBtnTextConfigBase() {
  return {
    text: 'spin',
    y: 2,
    style: {
      font: _constants.FONT1,
      fontSize: 45,
      fontWeight: 900,
      fill: '#ffffff',
      stroke: '#141420',
      strokeThickness: 4
    }
  };
}

function getSpinBtnUpTextConfig() {
  return getSpinBtnTextConfigBase();
}

function getSpinBtnDownTextConfig() {
  var config = getSpinBtnTextConfigBase();
  config.y = 4;

  return config;
}

function getSpinBtnDisableTextConfig() {
  var config = getSpinBtnTextConfigBase();
  config.style.fill = '#dadada';
  config.style.stroke = '#5e5e6c';

  return config;
}

function getStopBtnTextConfigBase() {
  return {
    text: 'stop',
    y: 2,
    style: {
      font: _constants.FONT1,
      fontSize: 45,
      fontWeight: 900,
      fill: '#ffffff',
      stroke: '#4c0505',
      strokeThickness: 4
    }
  };
}

function getStopBtnUpTextConfig() {
  return getStopBtnTextConfigBase();
}

function getStopBtnDownTextConfig() {
  var config = getStopBtnTextConfigBase();
  config.y = 4;

  return config;
}

function getStopBtnDisableTextConfig() {
  var config = getStopBtnTextConfigBase();
  config.style.fill = '#dadada';
  config.style.stroke = '#5e5e6c';

  return config;
}

function getFreeSpinBtnTextConfigBase() {
  return {
    text: 'free_spins',
    y: 2,
    style: {
      stroke: '#000a46',
      strokeThickness: 4,
      font: _constants.FONT1,
      fontSize: 22,
      fill: '#ffffff',
      gradient: [{
        color: '#ffffff',
        percent: 0
      }, {
        color: '#9e9e9e',
        percent: 1
      }]
    }
  };
}

function getFreeSpinBtnUpTextConfig() {
  var config = getFreeSpinBtnTextConfigBase();

  return config;
}

function getFreeSpinBtnDownTextConfig() {
  var config = getFreeSpinBtnTextConfigBase();
  config.y = 4;

  return config;
}

function getFreeSpinBtnDisableTextConfig() {
  var config = getFreeSpinBtnTextConfigBase();
  config.style.fill = '#dadada';
  config.style.stroke = '#5e5e6c';
  return config;
}

function getFreeSpinBtnCountTextConfig() {
  return {
    text: {
      text: '',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      stroke: '#000a46',
      strokeThickness: 4,
      font: _constants.FONT1,
      fontSize: 26,
      fill: '#ffffff',
      gradient: [{
        color: '#ffffff',
        percent: 0
      }, {
        color: '#9e9e9e',
        percent: 1
      }]
    }
  };
}

function getFreeSpinBtnUpCountTextConfig() {
  var config = getFreeSpinBtnCountTextConfig();

  return config;
}

function getFreeSpinBtnDownCountTextConfig() {
  var config = getFreeSpinBtnCountTextConfig();
  config.y = 2;

  return config;
}

function getFreeSpinBtnDisableCountTextConfig() {
  var config = getFreeSpinBtnCountTextConfig();
  config.style.fill = '#dadada';
  config.style.stroke = '#5e5e6c';

  return config;
}

// PERSISTENT
function getPersistentCtaTextConfig() {
  return {
    text: 'cta_btn_persistent_text',
    y: 1,
    style: {
      font: _constants.FONT1,
      fontSize: 40,
      fontWeight: 700,
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      shadow: {
        x: 1,
        y: 1,
        color: '#c48eff',
        blur: 8,
        shadowStroke: true,
        shadowFill: true
      }
    }
  };
}

// CONTROLS
function getWinLabelTextConfig() {
  return {
    text: 'win',
    style: {
      font: _constants.FONT1,
      fontSize: 19,
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#00000c',
      strokeThickness: 3,
      gradient: [{
        color: '#f5b867',
        percent: 0
      }, {
        color: '#bf6b11',
        percent: 1
      }]
    }
  };
}

function getWinTextConfig() {
  return {
    text: {
      text: '',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 22,
      fontWeight: 600,
      fill: '#ffffff'
    }
  };
}

function getBetLabelTextConfig() {
  return {
    text: 'bet',
    style: {
      font: _constants.FONT1,
      fontSize: 19,
      fontWeight: 800,
      fill: '#ffffff',
      stroke: '#00000c',
      strokeThickness: 3,
      gradient: [{
        color: '#f5b867',
        percent: 0
      }, {
        color: '#bf6b11',
        percent: 1
      }]
    }
  };
}

function getBetTextConfig() {
  return {
    text: {
      text: '',
      ignoreLocalization: true,
      toString: function toString() {
        return this;
      }
    },
    style: {
      font: _constants.FONT1,
      fontSize: 22,
      fontWeight: 600,
      fill: '#ffffff'
    }
  };
}

},{"../constants":106}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTutorialConfig = getTutorialConfig;

var _textConfigs = require('./text-configs');

function getTutorialConfig() {
  return [{ text: _textConfigs.getTutorial1TextConfig, duration: Infinity }, { text: _textConfigs.getTutorial2TextConfig, duration: 4000 }];
}

},{"./text-configs":104}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FONT1 = exports.FONT1 = 'PTSerif-Regular';

var ASSETS = exports.ASSETS = 'assets_png';
var UNCOMPRESSED_ASSETS = exports.UNCOMPRESSED_ASSETS = 'assets_png_unc_';

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

var GameStatus = exports.GameStatus = Object.freeze({
  Unknown: 'unknown',
  Slot: 'slot',
  Reward: 'reward'
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
  Reward: 20,
  Cta: 30,
  Foreground: 40
});

var GameOverReasons = exports.GameOverReasons = Object.freeze({
  Unknown: 'unknown',
  Idled: 'idled',
  ItemsToCtaReached: 'items_to_cta_reached'
});

var SlotMachineState = exports.SlotMachineState = Object.freeze({
  Idle: 'idle',
  Spin: 'spin',
  MaxSpeed: 'max_speed',
  Action: 'action',
  Stop: 'stop'
});

var ReelState = exports.ReelState = Object.freeze({
  Idle: 'idle',
  Spin: 'spin',
  MaxSpeed: 'max_speed',
  Stop: 'stop'
});

var SlotState = exports.SlotState = Object.freeze({
  Idle: 'idle',
  Animation: 'animation'
});

var SpinResultType = exports.SpinResultType = Object.freeze({
  Big: 'big',
  Regular: 'regular',
  Mega: 'mega',
  Loose: 'loose'
});

var SpinBtnState = exports.SpinBtnState = Object.freeze({
  Spin: 'spin',
  Stop: 'stop',
  FreeSpin: 'free_spin'
});

var SpinStopMap = exports.SpinStopMap = Object.freeze({
  'Spin to earn your prize!': 'Stop to earn your prize!',
  'Spin and test your luck!': 'Stop and test your luck!',
  "You're so close to the jackpot! Spin and test your luck!": "You're so close to the jackpot! Stop and test your luck!"
});

},{}],107:[function(require,module,exports){
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

},{"webfontloader":228}],108:[function(require,module,exports){
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

},{"./lu/layout-utils-compact":109,"./lu/layout-utils-general":110}],109:[function(require,module,exports){
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

var LayoutUtilsCompact = function () {
  function LayoutUtilsCompact() {
    _classCallCheck(this, LayoutUtilsCompact);

    this.CONTAINER_NAME = 'creative';
  }

  // Init method should be called only once, to avoid size check requestAnimationFrame duplicates,
  // and other Phaser's properties refresh.


  _createClass(LayoutUtilsCompact, [{
    key: 'init',
    value: function init(game) {
      var isUniversal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      var game = this.mGame,
          orientationNode = this.mOrientationNode,
          isUniversal = this.mIsUniversal,
          headerNode = this.mHeaderNode;

      // Lets try to keep world within 960x640 range

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
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
      // game.scaleFactor = this.scaleFactor = scaleFactor;

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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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
    SoundUpdate: 'AdModelSoundUpdate'
  },
  CtaModel: {
    ReasonUpdate: 'CtaModelReasonUpdate',
    PreVisibleUpdate: 'CtaModelPreVisibleUpdate',
    VisibleUpdate: 'CtaModelVisibleUpdate'
  },
  HintModel: {
    VisibleUpdate: 'HintModelVisibleUpdate'
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
    SequencesUpdate: 'TutorialModelSequencesUpdate',
    CurrentUpdate: 'TutorialModelCurrentUpdate'
  },
  TutorialSequenceModel: {
    ConfigUpdate: 'TutorialSequenceModelConfigUpdate',
    CompleteUpdate: 'TutorialSequenceModelCompleteUpdate'
  },
  GameModel: {
    SlotMachineUpdate: 'GameModelSlotMachineUpdate',
    SpinBtnUpdate: 'GameModelSpinBtnUpdate',
    StatusUpdate: 'GameModelStatusUpdate'
  },
  ReelModel: {
    ConfigUpdate: 'ReelModelConfigUpdate',
    SlotsUpdate: 'ReelModelSlotsUpdate',
    StateUpdate: 'ReelModelStateUpdate'
  },
  SlotMachineModel: {
    ConfigUpdate: 'SlotMachineModelConfigUpdate',
    ReelsUpdate: 'SlotMachineModelReelsUpdate',
    StateUpdate: 'SlotMachineModelStateUpdate',
    SpinResultUpdate: 'SlotMachineModelSpinResultUpdate',
    SpinsCountUpdate: 'SlotMachineModelSpinsCountUpdate',
    SpinsToCtaUpdate: 'SlotMachineModelSpinsToCtaUpdate'
  },
  SlotModel: {
    TypeUpdate: 'SlotModelTypeUpdate',
    StateUpdate: 'SlotModelStateUpdate'
  },
  SpinButtonModel: {
    StateUpdate: 'SpinButtonModelStateUpdate',
    ActiveUpdate: 'SpinButtonModelActiveUpdate'
  },
  ObservableModel: {
    UuidUpdate: 'ObservableModelUuidUpdate'
  },
  PlayerModel: {
    ProfitUpdate: 'PlayerModelProfitUpdate',
    BalanceUpdate: 'PlayerModelBalanceUpdate',
    BetUpdate: 'PlayerModelBetUpdate'
  },
  Store: {
    AdUpdate: 'StoreAdUpdate',
    PlayerUpdate: 'StorePlayerUpdate',
    GameUpdate: 'StoreGameUpdate'
  }
});

},{}],112:[function(require,module,exports){
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
    ScoreTweenStart: 'CtaViewScoreTweenStart',
    ScoreTweenComplete: 'CtaViewScoreTweenComplete'
  },
  SlotMachineView: {
    Ready: 'SlotMachineViewReady',
    Spin: 'SlotMachineViewSpin',
    LooseStateHandled: 'SlotMachineViewLooseStateHandled'
  },
  ReelView: {
    SpeedUpComplete: 'ReelViewSpeedUpComplete',
    SpeedDownComplete: 'ReelViewSpeedDownComplete'
  },
  RewardView: {
    HideComplete: 'RewardViewHideComplete',
    ShowStart: 'RewardViewShowStart'
  },
  EffectsView: {
    SpinResultAnimationStart: 'EffectsViewSpinResultAnimationStart',
    SpinResultAnimationComplete: 'EffectsViewSpinResultAnimationComplete'
  },
  SpinView: {
    Spin: 'SpinViewSpin',
    Stop: 'SpinViewStop'
  },
  WinView: {
    ScoreTweenStart: 'WinViewScoreTweenStart',
    ScoreTweenComplete: 'WinViewScoreTweenComplete'
  },
  BetView: {
    ButtonClick: 'BetViewButtonClick'
  }
});

},{}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adLiveGuard = adLiveGuard;

var _constants = require('../../constants');

function adLiveGuard() {
  return ad_state === _constants.AdState.Live;
}

},{"../../constants":106}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asecGuard = asecGuard;
function asecGuard() {
  return ad_exchange === 'tapjoy' && window.TJ_API && window.TJ_API.directives && !window.TJ_API.directives.showEndCard;
}

},{}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaModelGuard = ctaModelGuard;

var _store = require('../../models/store');

function ctaModelGuard() {
  return _store.store.ad.cta;
}

},{"../../models/store":156}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaPreVisibleGuard = ctaPreVisibleGuard;

var _store = require('../../models/store');

function ctaPreVisibleGuard() {
  return _store.store.ad.cta.preVisible;
}

},{"../../models/store":156}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctaVisibleGuard = ctaVisibleGuard;

var _store = require('../../models/store');

function ctaVisibleGuard() {
  return _store.store.ad.cta.visible;
}

},{"../../models/store":156}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hintModelGuard = hintModelGuard;

var _store = require('../../models/store');

function hintModelGuard() {
  return _store.store.ad.hint;
}

},{"../../models/store":156}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hintParamGuard = hintParamGuard;
function hintParamGuard() {
  return CI_API.Globals.PARAMS.hint;
}

},{}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistentCtaModelGuard = persistentCtaModelGuard;

var _store = require('../../models/store');

function persistentCtaModelGuard() {
  return _store.store.ad.persistentCta;
}

},{"../../models/store":156}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistentCtaParamGuard = persistentCtaParamGuard;
function persistentCtaParamGuard() {
  return CI_API.Globals.PARAMS.cta_btn_persistent;
}

},{}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soundParamGuard = soundParamGuard;
function soundParamGuard() {
  return CI_API.Globals.PARAMS.sound;
}

},{}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialModelGuard = tutorialModelGuard;

var _store = require('../../models/store');

function tutorialModelGuard() {
  return _store.store.ad.tutorial;
}

},{"../../models/store":156}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialParamGuard = tutorialParamGuard;
function tutorialParamGuard() {
  return CI_API.Globals.PARAMS.tutorial;
}

},{}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoSpinGuard = autoSpinGuard;

var _store = require('../../models/store');

function autoSpinGuard() {
  var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
      first_slot_auto = _CI_API$Globals$PARAM.first_slot_auto,
      extra_spin_auto = _CI_API$Globals$PARAM.extra_spin_auto,
      first_slot_spins = _CI_API$Globals$PARAM.first_slot_spins;
  var spinsCount = _store.store.game.slotMachine.spinsCount;


  if (first_slot_auto && spinsCount < first_slot_spins) {
    return true;
  }

  if (extra_spin_auto && spinsCount >= first_slot_spins) {
    return true;
  }

  return false;
}

},{"../../models/store":156}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extraSpinsGuard = extraSpinsGuard;

var _store = require('../../models/store');

function extraSpinsGuard() {
  var first_slot_spins = CI_API.Globals.PARAMS.first_slot_spins;
  var spinsCount = _store.store.game.slotMachine.spinsCount;


  return spinsCount >= first_slot_spins;
}

},{"../../models/store":156}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstExtraSpinGuard = firstExtraSpinGuard;

var _store = require('../../models/store');

function firstExtraSpinGuard() {
  var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
      first_slot_spins = _CI_API$Globals$PARAM.first_slot_spins,
      number_of_extra_spins = _CI_API$Globals$PARAM.number_of_extra_spins;
  var spinsCount = _store.store.game.slotMachine.spinsCount;


  return number_of_extra_spins && first_slot_spins === spinsCount;
}

},{"../../models/store":156}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstSpinGuard = firstSpinGuard;

var _store = require('../../models/store');

function firstSpinGuard() {
  return _store.store.game.slotMachine.spinsCount === 0;
}

},{"../../models/store":156}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameModelGuard = gameModelGuard;

var _store = require('../../models/store');

function gameModelGuard() {
  return _store.store.game;
}

},{"../../models/store":156}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameStatusSlotGuard = gameStatusSlotGuard;

var _constants = require('../../constants');

var _store = require('../../models/store');

function gameStatusSlotGuard() {
  return _store.store.game.status === _constants.GameStatus.Slot;
}

},{"../../constants":106,"../../models/store":156}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastReelGuard = lastReelGuard;

var _store = require('../../models/store');

function lastReelGuard(uuid) {
  return _store.store.game.slotMachine.isLastReel(uuid);
}

},{"../../models/store":156}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastTutorialGuard = lastTutorialGuard;

var _store = require('../../models/store');

function lastTutorialGuard() {
  return _store.store.ad.tutorial.sequences.length === 0;
}

},{"../../models/store":156}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinBtnActiveGuard = spinBtnActiveGuard;

var _store = require('../../models/store');

function spinBtnActiveGuard() {
  return _store.store.game.spinBtn.active;
}

},{"../../models/store":156}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinsToCtaGuard = spinsToCtaGuard;

var _store = require('../../models/store');

function spinsToCtaGuard() {
  return _store.store.game.slotMachine.isLastSpin();
}

},{"../../models/store":156}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopButtonGuard = stopButtonGuard;

var _store = require('../../models/store');

function stopButtonGuard() {
  var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
      first_slot_spins = _CI_API$Globals$PARAM.first_slot_spins,
      first_slot_auto = _CI_API$Globals$PARAM.first_slot_auto;
  var spinsCount = _store.store.game.slotMachine.spinsCount;


  return first_slot_auto && spinsCount <= first_slot_spins;
}

},{"../../models/store":156}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playerModelGuard = playerModelGuard;

var _store = require('../../models/store');

function playerModelGuard() {
  return _store.store.player;
}

},{"../../models/store":156}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
'use strict';

var _startupCommand = require('./commands/startup-command');

var _fontLoader = require('./display/font-loader');

var _fontLoader2 = _interopRequireDefault(_fontLoader);

var _layoutUtils = require('./display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _globals = require('./kernel/globals');

var _globals2 = _interopRequireDefault(_globals);

var _ctaView = require('./objects/cta/cta-view');

var _gameState = require('./states/game-state');

var _preloaderState = require('./states/preloader-state');

require('./strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import { legologger } from '@armathai/lego-logger';
// import { legoLoggerConfig } from './configs/lego-config';


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
      CI_API.CTA = xp.getActiveModule('cta_style', _ctaView.CTAView);
      // @ts-ignore
      CI_API.game = new Game();
      setTimeout(function () {
        // legologger.start(legoLoggerConfig);
        (0, _startupCommand.startupCommand)();
      });
    });
  });
};

},{"./commands/startup-command":75,"./display/font-loader":107,"./display/layout-utils":108,"./kernel/globals":138,"./objects/cta/cta-view":159,"./states/game-state":189,"./states/preloader-state":190,"./strings":191}],141:[function(require,module,exports){
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
  }]);

  return AdModel;
}(_observableModel.ObservableModel);

},{"../../constants":106,"../observable-model":154,"./cta-model":142,"./hint-model":143,"./load-model":144,"./persistent-cta-model":145,"./sound-model":146,"./tutorial-model":147}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CtaModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../constants');

var _utils = require('../../utils');

var _observableModel = require('../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CtaModel = exports.CtaModel = function (_ObservableModel) {
  _inherits(CtaModel, _ObservableModel);

  function CtaModel() {
    _classCallCheck(this, CtaModel);

    var _this = _possibleConstructorReturn(this, (CtaModel.__proto__ || Object.getPrototypeOf(CtaModel)).call(this, 'CtaModel'));

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

      this._preVisible = true;
      this._reason = reason;

      (0, _utils.removeRunnable)(this._visibilityDelayTimer);
      this._visibilityDelayTimer = (0, _utils.delayRunnable)(delay, function () {
        _this2._visible = true;
      });
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

},{"../../constants":106,"../../utils":202,"../observable-model":154}],143:[function(require,module,exports){
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
    key: 'initialize',
    value: function initialize() {
      this._startVisibilityTimer();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._stopVisibilityTimer();
    }
  }, {
    key: 'resetVisibilityTimer',
    value: function resetVisibilityTimer() {
      this._stopVisibilityTimer();
      this._startVisibilityTimer();
    }
  }, {
    key: '_startVisibilityTimer',
    value: function _startVisibilityTimer() {
      var _this2 = this;

      this._visibilityTimer = (0, _utils.delayRunnable)(CI_API.Globals.PARAMS.hint_on_idle, function () {
        _this2._visible = true;
      });
    }
  }, {
    key: '_stopVisibilityTimer',
    value: function _stopVisibilityTimer() {
      (0, _utils.removeRunnable)(this._visibilityTimer);
    }
  }, {
    key: 'visible',
    get: function get() {
      return this._visible;
    },
    set: function set(value) {
      this._visible = value;
      this._stopVisibilityTimer();
    }
  }]);

  return HintModel;
}(_observableModel.ObservableModel);

},{"../../utils":202,"../observable-model":154}],144:[function(require,module,exports){
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

},{"../observable-model":154}],145:[function(require,module,exports){
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

},{"../observable-model":154}],146:[function(require,module,exports){
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

},{"../../constants":106,"../observable-model":154}],147:[function(require,module,exports){
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
    _this._sequences = null;
    _this._current = null;
    _this._sequenceCompleteTimer = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(TutorialModel, [{
    key: 'initialize',
    value: function initialize() {
      _get(TutorialModel.prototype.__proto__ || Object.getPrototypeOf(TutorialModel.prototype), 'initialize', this).call(this);

      this._initSequences();
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
      this._current = this._sequences.shift();
      this._startSequenceCompleteTimer();
    }
  }, {
    key: 'completeSequence',
    value: function completeSequence() {
      this._current.complete = true;
      this._stopSequenceCompleteTimer();
    }
  }, {
    key: '_initSequences',
    value: function _initSequences() {
      this._sequences = (0, _tutorialConfig.getTutorialConfig)().map(function (config) {
        return new _tutorialSequenceModel.TutorialSequenceModel(config);
      });
    }
  }, {
    key: '_startSequenceCompleteTimer',
    value: function _startSequenceCompleteTimer() {
      this._sequenceCompleteTimer = (0, _utils.delayRunnable)(this.current.config.duration, this.completeSequence, this);
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
    key: 'sequences',
    get: function get() {
      return this._sequences;
    }
  }, {
    key: 'current',
    get: function get() {
      return this._current;
    }
  }]);

  return TutorialModel;
}(_observableModel.ObservableModel);

},{"../../configs/tutorial-config":105,"../../utils":202,"../observable-model":154,"./tutorial-sequence-model":148}],148:[function(require,module,exports){
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

  function TutorialSequenceModel(config) {
    _classCallCheck(this, TutorialSequenceModel);

    var _this = _possibleConstructorReturn(this, (TutorialSequenceModel.__proto__ || Object.getPrototypeOf(TutorialSequenceModel)).call(this, 'TutorialSequenceModel'));

    _this._config = config;
    _this._complete = false;

    _this.makeObservable('_complete');
    return _this;
  }

  _createClass(TutorialSequenceModel, [{
    key: 'config',
    get: function get() {
      return this._config;
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

  return TutorialSequenceModel;
}(_observableModel.ObservableModel);

},{"../observable-model":154}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slotMachineConfig = require('../../configs/slot-machine-config');

var _constants = require('../../constants');

var _observableModel = require('../observable-model');

var _slotMachineModel = require('./machine/slot-machine-model');

var _spinButtonModel = require('./machine/spin-button-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameModel = exports.GameModel = function (_ObservableModel) {
  _inherits(GameModel, _ObservableModel);

  function GameModel() {
    _classCallCheck(this, GameModel);

    var _this = _possibleConstructorReturn(this, (GameModel.__proto__ || Object.getPrototypeOf(GameModel)).call(this, 'GameModel'));

    _this._slotMachine = null;
    _this._spinBtn = null;
    _this._status = _constants.GameStatus.Unknown;

    _this.makeObservable();
    return _this;
  }

  _createClass(GameModel, [{
    key: 'initialize',
    value: function initialize() {
      this.initializeMachineModel();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyMachineModel();
    }
  }, {
    key: 'initializeMachineModel',
    value: function initializeMachineModel() {
      this._slotMachine = new _slotMachineModel.SlotMachineModel((0, _slotMachineConfig.getSlotMachineConfig)());
      this._slotMachine.initialize();

      this._spinBtn = new _spinButtonModel.SpinButtonModel();
      this._spinBtn.initialize();
    }
  }, {
    key: 'destroyMachineModel',
    value: function destroyMachineModel() {
      this._slotMachine.destroy();
      this._slotMachine = null;
    }
  }, {
    key: 'slotMachine',
    get: function get() {
      return this._slotMachine;
    }
  }, {
    key: 'spinBtn',
    get: function get() {
      return this._spinBtn;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    },
    set: function set(value) {
      this._status = value;
    }
  }]);

  return GameModel;
}(_observableModel.ObservableModel);

},{"../../configs/slot-machine-config":102,"../../constants":106,"../observable-model":154,"./machine/slot-machine-model":151,"./machine/spin-button-model":153}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReelModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _observableModel = require('../../observable-model');

var _slotModel = require('./slot-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function extendConfig(config) {
  var offset = config.offset;

  config.offset = { x: offset.x || 0, y: offset.y || 0 };

  return config;
}

var ReelModel = exports.ReelModel = function (_ObservableModel) {
  _inherits(ReelModel, _ObservableModel);

  function ReelModel(config) {
    _classCallCheck(this, ReelModel);

    var _this = _possibleConstructorReturn(this, (ReelModel.__proto__ || Object.getPrototypeOf(ReelModel)).call(this, 'ReelModel'));

    _this._config = extendConfig(config);
    _this._slots = _this._generateSlots();
    _this._state = _constants.ReelState.Idle;

    _this.makeObservable('_state');
    return _this;
  }

  _createClass(ReelModel, [{
    key: 'getSlot',
    value: function getSlot(uuid) {
      return this._slots.find(function (slot) {
        return slot.uuid === uuid;
      });
    }
  }, {
    key: 'setState',
    value: function setState(value) {
      this._state = value;
    }
  }, {
    key: 'setSlotState',
    value: function setSlotState(slotIndex, state) {
      var slot = this._slots[slotIndex];
      slot.setState(state);
    }
  }, {
    key: 'setSlotType',
    value: function setSlotType(slotIndex, type) {
      var slot = this._slots[slotIndex];
      slot.setType(type);
    }
  }, {
    key: '_generateSlots',
    value: function _generateSlots() {
      return this._config.slots.map(function (slotType) {
        return new _slotModel.SlotModel(slotType);
      });
    }
  }, {
    key: 'config',
    get: function get() {
      return this._config;
    }
  }, {
    key: 'slots',
    get: function get() {
      return this._slots;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }]);

  return ReelModel;
}(_observableModel.ObservableModel);

},{"../../../constants":106,"../../observable-model":154,"./slot-model":152}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlotMachineModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _last = require('../../../utils/array/last');

var _sample = require('../../../utils/array/sample');

var _shuffle = require('../../../utils/array/shuffle');

var _index = require('../../../utils/index');

var _observableModel = require('../../observable-model');

var _reelModel = require('./reel-model');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlotMachineModel = exports.SlotMachineModel = function (_ObservableModel) {
  _inherits(SlotMachineModel, _ObservableModel);

  function SlotMachineModel(config) {
    _classCallCheck(this, SlotMachineModel);

    var _this = _possibleConstructorReturn(this, (SlotMachineModel.__proto__ || Object.getPrototypeOf(SlotMachineModel)).call(this, 'SlotMachineModel'));

    _this._config = config;
    _this._reels = _this._generateReels();
    _this._state = null;
    _this._spinResult = null;
    _this._spinsToCta = 0;
    _this._spinsCount = 0;
    _this._autoSpinTimer = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(SlotMachineModel, [{
    key: 'destroy',
    value: function destroy() {
      this.stopAutoSpinTimer();
    }
  }, {
    key: 'isLastSpin',
    value: function isLastSpin() {
      return this.spinsToCta === this.spinsCount;
    }
  }, {
    key: 'isLastReel',
    value: function isLastReel(uuid) {
      return (0, _last.last)(this._reels).uuid === uuid;
    }
  }, {
    key: 'getReelIndex',
    value: function getReelIndex(uuid) {
      return this._reels.indexOf(this._reels.find(function (r) {
        return r.uuid === uuid;
      }));
    }
  }, {
    key: 'getReel',
    value: function getReel(uuid) {
      return this._reels.find(function (r) {
        return r.uuid === uuid;
      });
    }
  }, {
    key: 'setState',
    value: function setState(value) {
      this._state = value;
    }
  }, {
    key: 'setSpinsCount',
    value: function setSpinsCount(value) {
      this._spinsCount = value;
    }
  }, {
    key: 'spin',
    value: function spin() {
      var _this2 = this;

      this.setState(_constants.SlotMachineState.Spin);

      this._reels.forEach(function (r, index) {
        return (0, _index.delayRunnable)(index * _this2._config.reelsSpinDelay, r.setState, r, _constants.ReelState.Spin);
      });

      this.stopAutoSpinTimer();
      this.setSpinsCount(this._spinsCount + 1);
      this._setSpinResult = null;
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this3 = this;

      this.setState(_constants.SlotMachineState.Stop);

      this._reels.forEach(function (r, index) {
        return (0, _index.delayRunnable)(index * _this3._config.reelsStopDelay, r.setState, r, _constants.ReelState.Stop);
      });
    }
  }, {
    key: 'idle',
    value: function idle() {
      this.setState(_constants.SlotMachineState.Idle);
    }
  }, {
    key: 'resetSlots',
    value: function resetSlots(shuffleAfterReset) {
      var _this4 = this;

      var reels = this.config.reels;


      reels.forEach(function (r, i) {
        var slots = r.slots;


        var reelModel = _this4._reels[i];
        var slotTypes = [].concat(_toConsumableArray(slots));
        shuffleAfterReset && (0, _shuffle.shuffle)(slotTypes);
        slotTypes.forEach(function (s, j) {
          reelModel.slots[j].type = s;
        });
      });
    }
  }, {
    key: 'startAutoSpinTimer',
    value: function startAutoSpinTimer() {
      // @ts-ignore
      this._autoSpinTimer = (0, _index.delayRunnable)(CI_API.Globals.PARAMS.auto_spin_delay || 0, this.spin, this);
    }
  }, {
    key: 'stopAutoSpinTimer',
    value: function stopAutoSpinTimer() {
      (0, _index.removeRunnable)(this._autoSpinTimer);
    }

    // SPIN RESULT

  }, {
    key: 'setSpinResult',
    value: function setSpinResult(bet) {
      var _this5 = this;

      this._spinResult = this._generateSpinResult(bet);
      this._spinResult.reels.forEach(function (r, i) {
        return r.forEach(function (s) {
          return _this5._reels[i].setSlotType(s.index, s.type);
        });
      });
    }
  }, {
    key: 'getWinType',
    value: function getWinType() {
      var first_slot_spins = CI_API.Globals.PARAMS.first_slot_spins;


      if (this.isLastSpin()) {
        return _constants.SpinResultType.Mega;
      }

      if (this.spinsCount === first_slot_spins) {
        return _constants.SpinResultType.Big;
      }

      return _constants.SpinResultType.Regular;
    }
  }, {
    key: 'getResultPattern',
    value: function getResultPattern(winType) {
      return (0, _sample.sample)(this._config.combinations[winType]);
    }
  }, {
    key: '_getReelsResultPattern',
    value: function _getReelsResultPattern(pattern) {
      var slotTypes = this.getWinSlotTypes();

      return pattern.map(function (reelPattern) {
        return reelPattern.map(function (slotIndex) {
          return { index: slotIndex, type: (0, _sample.sample)(slotTypes) };
        });
      });
    }
  }, {
    key: 'getWinSlotTypes',
    value: function getWinSlotTypes() {
      var winSlotTypes = this.config.winSlotTypes;
      var first_slot_spins = CI_API.Globals.PARAMS.first_slot_spins;


      if (this.isLastSpin()) {
        return [(0, _sample.sample)(winSlotTypes.mega)];
      }

      if (this._spinsCount === first_slot_spins) {
        return [(0, _sample.sample)(winSlotTypes.big)];
      }

      var reg = (0, _sample.sample)(winSlotTypes.regular);
      var mega = (0, _sample.sample)(winSlotTypes.mega);
      return [reg, reg, mega, reg, reg];
    }
  }, {
    key: 'getPrize',
    value: function getPrize(winType, bet) {
      var prize = winType === _constants.SpinResultType.Loose ? 0 : this._config.prizeFactor[winType] * bet;

      if (this.isLastSpin()) {
        prize = 999999999;
      }

      return prize;
    }
  }, {
    key: '_generateSpinResult',
    value: function _generateSpinResult(bet) {
      var type = this.getWinType();
      var prize = this.getPrize(type, bet);
      var pattern = this.getResultPattern(type);
      var reels = this._getReelsResultPattern(pattern);

      return { type: type, prize: prize, pattern: pattern, reels: reels };
    }
  }, {
    key: '_generateReels',
    value: function _generateReels() {
      return this._config.reels.map(function (reelConfig) {
        return new _reelModel.ReelModel(reelConfig);
      });
    }
  }, {
    key: 'config',
    get: function get() {
      return this._config;
    }
  }, {
    key: 'reels',
    get: function get() {
      return this._reels;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }, {
    key: 'spinResult',
    get: function get() {
      return this._spinResult;
    }
  }, {
    key: 'spinsCount',
    get: function get() {
      return this._spinsCount;
    }
  }, {
    key: 'spinsToCta',
    get: function get() {
      return this._spinsToCta;
    },
    set: function set(value) {
      this._spinsToCta = value;
    }
  }]);

  return SlotMachineModel;
}(_observableModel.ObservableModel);

},{"../../../constants":106,"../../../utils/array/last":192,"../../../utils/array/sample":193,"../../../utils/array/shuffle":194,"../../../utils/index":202,"../../observable-model":154,"./reel-model":150}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlotModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _observableModel = require('../../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlotModel = exports.SlotModel = function (_ObservableModel) {
  _inherits(SlotModel, _ObservableModel);

  function SlotModel(type) {
    _classCallCheck(this, SlotModel);

    var _this = _possibleConstructorReturn(this, (SlotModel.__proto__ || Object.getPrototypeOf(SlotModel)).call(this, 'SlotModel'));

    _this._type = type;
    _this._state = _constants.SlotState.Idle;

    _this.makeObservable();
    return _this;
  }

  _createClass(SlotModel, [{
    key: 'setType',
    value: function setType(value) {
      this._type = value;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this._state = state;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    },
    set: function set(value) {
      this._type = value;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }]);

  return SlotModel;
}(_observableModel.ObservableModel);

},{"../../../constants":106,"../../observable-model":154}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinButtonModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _observableModel = require('../../observable-model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpinButtonModel = exports.SpinButtonModel = function (_ObservableModel) {
  _inherits(SpinButtonModel, _ObservableModel);

  function SpinButtonModel() {
    _classCallCheck(this, SpinButtonModel);

    var _this = _possibleConstructorReturn(this, (SpinButtonModel.__proto__ || Object.getPrototypeOf(SpinButtonModel)).call(this, 'SpinButtonModel'));

    _this._state = null;
    _this._active = null;

    _this.makeObservable();
    return _this;
  }

  _createClass(SpinButtonModel, [{
    key: 'initialize',
    value: function initialize() {
      this._state = _constants.SpinBtnState.Spin;
      this._active = true;
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
    key: 'active',
    get: function get() {
      return this._active;
    },
    set: function set(value) {
      this._active = value;
    }
  }]);

  return SpinButtonModel;
}(_observableModel.ObservableModel);

},{"../../../constants":106,"../../observable-model":154}],154:[function(require,module,exports){
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

},{"@armathai/lego":219}],155:[function(require,module,exports){
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

    _this._balance = 100000000;
    _this._balanceOnStart = _this._balance;
    _this._bet = 0;
    _this.makeObservable();
    return _this;
  }

  _createClass(PlayerModel, [{
    key: 'profit',
    get: function get() {
      return this.balance - this._balanceOnStart;
    }
  }, {
    key: 'balance',
    get: function get() {
      return this._balance;
    },
    set: function set(value) {
      this._balance = value;
    }
  }, {
    key: 'bet',
    get: function get() {
      return this._bet;
    },
    set: function set(value) {
      this._bet = value;
    }
  }]);

  return PlayerModel;
}(_observableModel.ObservableModel);

},{"../observable-model":154}],156:[function(require,module,exports){
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

},{"./ad/ad-model":141,"./game/game-model":149,"./observable-model":154,"./player/player-model":155}],157:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lego = require('@armathai/lego');

var lego = _interopRequireWildcard(_lego);

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

var _viewEvents = require('./events/view-events');

var ViewEvents = _interopRequireWildcard(_viewEvents);

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
  utils: utils,
  lego: lego,
  ViewEvents: ViewEvents
};

},{"./configs/animation-configs":86,"./configs/button-configs":87,"./configs/grid-configs":88,"./configs/image-configs":98,"./configs/ninepatch-configs":100,"./configs/particles-configs":101,"./configs/spine-configs":103,"./configs/text-configs":104,"./events/view-events":112,"./utils":202,"@armathai/lego":219}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _imageConfigs = require('../../configs/image-configs');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundView = exports.BackgroundView = function (_Phaser2Grid) {
  _inherits(BackgroundView, _Phaser2Grid);

  function BackgroundView() {
    _classCallCheck(this, BackgroundView);

    var _this = _possibleConstructorReturn(this, (BackgroundView.__proto__ || Object.getPrototypeOf(BackgroundView)).call(this, CI_API.game));

    _get(BackgroundView.prototype.__proto__ || Object.getPrototypeOf(BackgroundView.prototype), 'build', _this).call(_this, _this.getGridConfig());
    _this._buildBg();
    return _this;
  }

  _createClass(BackgroundView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getBackgroundGridConfig)();
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      this.setChild('bg', this._bg = (0, _utils.makeImage)((0, _imageConfigs.getBgImageConfig)()));
    }
  }, {
    key: 'name',
    get: function get() {
      return 'BackgroundView';
    }
  }]);

  return BackgroundView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../configs/image-configs":98,"../../utils":202,"@armathai/phaser2-grid":224}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CTAView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _particlesConfigs = require('../../configs/particles-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _moduleBindings = require('../../module-bindings');

var _moduleBindings2 = _interopRequireDefault(_moduleBindings);

var _utils = require('../../utils');

var _button = require('../../utils/button/button');

var _coinFallEmitter = require('../../utils/emitters/coin-fall/coin-fall-emitter');

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
    _this._emitter = null;
    _this.bindings = _moduleBindings2.default;
    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this);
    return _this;
  }

  _createClass(CTAView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return new Error('function getGridConfig() is not implemented');
    }
  }, {
    key: 'postRebuild',
    value: function postRebuild() {
      this.show();
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      var Linear = Phaser.Easing.Linear;


      var tween = this.game.add.tween(this._blocker).from({ alpha: 0 }, 200, Linear.None, true);
      tween.onStart.addOnce(function () {
        _this2._blocker.visible = true;
      });
      // @ts-ignore
      tween.universal = true;
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      if (!this.grid) {
        return;
      }

      _get(CTAView.prototype.__proto__ || Object.getPrototypeOf(CTAView.prototype), 'rebuild', this).call(this, config);

      this._emitter.destroy();
      this._buildEmitter();
    }
  }, {
    key: 'buildPlayButton',
    value: function buildPlayButton(config) {
      return this._buildButton(config, this._onPlayClick);
    }
  }, {
    key: 'buildRetryButton',
    value: function buildRetryButton(config) {
      return this._buildButton(config, this._onRetryClick);
    }
  }, {
    key: 'build',
    value: function build(config) {
      var blockerAlpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.7;

      _get(CTAView.prototype.__proto__ || Object.getPrototypeOf(CTAView.prototype), 'build', this).call(this, config);
      this._buildBlocker(blockerAlpha);
      this._buildEmitter();
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.Cta:
          this.build();
          break;
        case _constants.AdStatus.Game:
          this.removeChildren();
          break;
        default:
      }
    }
  }, {
    key: '_buildBlocker',
    value: function _buildBlocker(alpha) {
      this._blocker = (0, _utils.makePixel)({ alpha: alpha });
      this._blocker.inputEnabled = true;
      this._blocker.input.priorityID = _constants.InputPriority.Cta;
      this._blocker.name = this.name;
      this._blocker.visible = false;

      this.setChild('blocker', this._blocker);

      if (CI_API.Globals.PARAMS.cta_scrn_clickable) {
        this._blocker.events.onInputDown.add(this._onScreenClick, this);
      }
    }
  }, {
    key: '_buildEmitter',
    value: function _buildEmitter() {
      this._emitter = new _coinFallEmitter.CoinFallEmitter((0, _particlesConfigs.getCtaCoinEmitterConfig)());
      this._emitter.emit();
      this.addChildAt(this._emitter, 1);
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
      _lego.lego.event.emit(_viewEvents.ViewEvents.CtaView.ScreenClick);
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
    }
  }]);

  return CTAView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/particles-configs":101,"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../module-bindings":157,"../../utils":202,"../../utils/button/button":196,"../../utils/emitters/coin-fall/coin-fall-emitter":199,"@armathai/lego":219,"@armathai/phaser2-grid":224}],160:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigWinBehaviour = undefined;

var _winBehaviour = require('./win-behaviour');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BigWinBehaviour = exports.BigWinBehaviour = function (_WinBehaviour) {
  _inherits(BigWinBehaviour, _WinBehaviour);

  function BigWinBehaviour() {
    _classCallCheck(this, BigWinBehaviour);

    return _possibleConstructorReturn(this, (BigWinBehaviour.__proto__ || Object.getPrototypeOf(BigWinBehaviour)).apply(this, arguments));
  }

  return BigWinBehaviour;
}(_winBehaviour.WinBehaviour);

},{"./win-behaviour":164}],161:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectsView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _bigWinBehaviour = require('./big-win-behaviour');

var _megaWinBehaviour = require('./mega-win-behaviour');

var _regularWinBehaviour = require('./regular-win-behaviour');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EffectsView = exports.EffectsView = function (_Phaser2Grid) {
  _inherits(EffectsView, _Phaser2Grid);

  function EffectsView() {
    _classCallCheck(this, EffectsView);

    var _this = _possibleConstructorReturn(this, (EffectsView.__proto__ || Object.getPrototypeOf(EffectsView)).call(this, CI_API.game));

    _get(EffectsView.prototype.__proto__ || Object.getPrototypeOf(EffectsView.prototype), 'build', _this).call(_this, _this.getGridConfig());

    _this._winBehaviour = null;
    _this._completeRunnable = null;

    _lego.lego.event.on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, _this._onSlotMachineStateUpdate, _this);
    _lego.lego.event.on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, _this._onCtaVisibleUpdate, _this);
    return _this;
  }

  _createClass(EffectsView, [{
    key: 'resize',
    value: function resize() {
      this._winBehaviour && this._winBehaviour.resize();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._completeRunnable);
      _get(EffectsView.prototype.__proto__ || Object.getPrototypeOf(EffectsView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getEffectsGridConfig)();
    }
  }, {
    key: '_onCtaVisibleUpdate',
    value: function _onCtaVisibleUpdate(value) {
      value && this._winBehaviour && this._winBehaviour.destroy();
    }
  }, {
    key: '_onSlotMachineStateUpdate',
    value: function _onSlotMachineStateUpdate() {
      var _store$game$slotMachi = _store.store.game.slotMachine,
          state = _store$game$slotMachi.state,
          spinResult = _store$game$slotMachi.spinResult;


      switch (state) {
        case _constants.SlotMachineState.Action:
          switch (spinResult.type) {
            case _constants.SpinResultType.Regular:
              this._setWinBehaviour(_regularWinBehaviour.RegularWinBehaviour);
              break;
            case _constants.SpinResultType.Big:
              this._setWinBehaviour(_bigWinBehaviour.BigWinBehaviour);
              this.game.camera.shake(0.006, 400);
              break;
            case _constants.SpinResultType.Mega:
              this._setWinBehaviour(_megaWinBehaviour.MegaWinBehaviour);
              break;
            default:
              this._setCompleteTimer(0);
          }
          break;
        default:
          this._winBehaviour = null;
      }
    }
  }, {
    key: '_setCompleteTimer',
    value: function _setCompleteTimer(duration) {
      var _this2 = this;

      this._completeRunnable = (0, _utils.delayRunnable)(duration, function () {
        _this2._onAnimationComplete();
      });
    }
  }, {
    key: '_setWinBehaviour',
    value: function _setWinBehaviour(behaviour) {
      // eslint-disable-next-line new-cap
      this.setChild('result', this._winBehaviour = new behaviour());
      this._winBehaviour.onComplete.addOnce(this._setCompleteTimer, this, 0, 0);
      this._winBehaviour.show();

      _lego.lego.event.emit(_viewEvents.ViewEvents.EffectsView.SpinResultAnimationStart);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: '_onAnimationComplete',
    value: function _onAnimationComplete() {
      this._winBehaviour && this._winBehaviour.hide();

      _lego.lego.event.emit(_viewEvents.ViewEvents.EffectsView.SpinResultAnimationComplete);
    }
  }]);

  return EffectsView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../models/store":156,"../../utils":202,"./big-win-behaviour":160,"./mega-win-behaviour":162,"./regular-win-behaviour":163,"@armathai/lego":219,"@armathai/phaser2-grid":224}],162:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MegaWinBehaviour = undefined;

var _winBehaviour = require('./win-behaviour');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MegaWinBehaviour = exports.MegaWinBehaviour = function (_WinBehaviour) {
  _inherits(MegaWinBehaviour, _WinBehaviour);

  function MegaWinBehaviour() {
    _classCallCheck(this, MegaWinBehaviour);

    return _possibleConstructorReturn(this, (MegaWinBehaviour.__proto__ || Object.getPrototypeOf(MegaWinBehaviour)).apply(this, arguments));
  }

  return MegaWinBehaviour;
}(_winBehaviour.WinBehaviour);

},{"./win-behaviour":164}],163:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegularWinBehaviour = undefined;

var _winBehaviour = require('./win-behaviour');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegularWinBehaviour = exports.RegularWinBehaviour = function (_WinBehaviour) {
  _inherits(RegularWinBehaviour, _WinBehaviour);

  function RegularWinBehaviour() {
    _classCallCheck(this, RegularWinBehaviour);

    return _possibleConstructorReturn(this, (RegularWinBehaviour.__proto__ || Object.getPrototypeOf(RegularWinBehaviour)).apply(this, arguments));
  }

  return RegularWinBehaviour;
}(_winBehaviour.WinBehaviour);

},{"./win-behaviour":164}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WinBehaviour = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _particlesConfigs = require('../../configs/particles-configs');

var _spineConfigs = require('../../configs/spine-configs');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _container = require('../../utils/container');

var _coinFallEmitter = require('../../utils/emitters/coin-fall/coin-fall-emitter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WinBehaviour = exports.WinBehaviour = function (_Container) {
  _inherits(WinBehaviour, _Container);

  function WinBehaviour() {
    _classCallCheck(this, WinBehaviour);

    var _this = _possibleConstructorReturn(this, (WinBehaviour.__proto__ || Object.getPrototypeOf(WinBehaviour)).call(this));

    _this._slots = null;
    _this._completeRunnable = null;

    _this.onComplete = new Phaser.Signal();
    return _this;
  }

  _createClass(WinBehaviour, [{
    key: 'destroy',
    value: function destroy() {
      _get(WinBehaviour.prototype.__proto__ || Object.getPrototypeOf(WinBehaviour.prototype), 'destroy', this).call(this);

      (0, _utils.removeRunnable)(this._completeRunnable);
    }
  }, {
    key: 'show',
    value: function show() {
      this._buildSlots();
      this.resize();

      if (!_store.store.game.slotMachine.isLastSpin()) {
        this._buildParticles();
      }

      this.visible = true;

      this._completeRunnable = (0, _utils.delayRunnable)(2400, this.onComplete.dispatch, this.onComplete);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      this.game.add.tween(this).to({ alpha: 0 }, 600, Phaser.Easing.Cubic.Out, true).onComplete.addOnce(function () {
        _this2.destroy();
      });
    }
  }, {
    key: 'resize',
    value: function resize() {
      var _this3 = this;

      this._slots.forEach(function (s) {
        var slotUUID = s.slotUUID;

        var slotView = (0, _utils.getViewByProperty)('uuid', slotUUID);
        var scale = slotView.worldScale.x / _this3.worldScale.x;
        s.scale.set(1);
        s.scale.set(scale);

        var pos = _this3.toLocal(slotView.position, slotView.parent);
        s.position.set(pos.x, pos.y);
      });
    }
  }, {
    key: '_buildSlots',
    value: function _buildSlots() {
      var _this4 = this;

      this._slots = [];

      var sloMachineModel = _store.store.game.slotMachine;
      // const sloMachineView = getViewByUUID('SlotMachineView');

      var reels = sloMachineModel.spinResult.reels;

      reels.forEach(function (r, i) {
        var reelModel = sloMachineModel.reels[i];

        r.forEach(function (s) {
          var slotModel = reelModel.slots[s.index];

          _this4._buildSlot(slotModel.uuid);
        });
      });
    }
  }, {
    key: '_buildParticles',
    value: function _buildParticles() {
      this._emitter = new _coinFallEmitter.CoinFallEmitter((0, _particlesConfigs.getWinCoinEmitterConfig)());
      this._emitter.emit();
      this.addChild(this._emitter);
    }
  }, {
    key: '_buildSlot',
    value: function _buildSlot(slotUUID) {
      var slotCont = new _container.Container();

      var slotView = (0, _utils.getViewByProperty)('uuid', slotUUID);
      slotView.visible = false;
      var type = slotView.type;


      var slot = (0, _utils.makeSpine)({ key: _spineConfigs.SlotSpineMap[type] });
      slot.setToSetupPose();
      slot.setAnimationByName(0, 'animation', false);
      slot.onComplete.addOnce(function () {
        slotView.visible = true;
      });

      var frame = (0, _utils.makeSpine)({ key: 'frame' });
      frame.setAnimationByName(0, 'start', false);
      frame.onComplete.addOnce(function () {
        frame.setAnimationByName(0, 'idle', true);
      });

      // @ts-ignore
      slotCont.slotUUID = slotUUID;

      slotCont.addChild(slot);
      slotCont.addChild(frame);

      this.addChild(slotCont);
      this._slots.push(slotCont);
    }
  }]);

  return WinBehaviour;
}(_container.Container);

},{"../../configs/particles-configs":101,"../../configs/spine-configs":103,"../../models/store":156,"../../utils":202,"../../utils/container":198,"../../utils/emitters/coin-fall/coin-fall-emitter":199}],165:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForegroundView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _hintView = require('./hint-view');

var _logoView = require('./logo-view');

var _rewardView = require('./reward/reward-view');

var _soundView = require('./sound-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForegroundView = exports.ForegroundView = function (_Phaser2Grid) {
  _inherits(ForegroundView, _Phaser2Grid);

  function ForegroundView() {
    _classCallCheck(this, ForegroundView);

    var _this = _possibleConstructorReturn(this, (ForegroundView.__proto__ || Object.getPrototypeOf(ForegroundView)).call(this, CI_API.game));

    _get(ForegroundView.prototype.__proto__ || Object.getPrototypeOf(ForegroundView.prototype), 'build', _this).call(_this, _this.getGridConfig());

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this).on(_modelEvents.ModelEvents.SoundModel.IconUpdate, _this._onSoundIconUpdate, _this).on(_modelEvents.ModelEvents.AdModel.HintUpdate, _this._onHintUpdate, _this);
    return _this;
  }

  _createClass(ForegroundView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getForegroundGridConfig)();
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.Game:
          this._build();
          break;
        case _constants.AdStatus.Cta:
          this._adjustCtaLogo();
          break;
        default:
      }
    }
  }, {
    key: '_onSoundIconUpdate',
    value: function _onSoundIconUpdate(value) {
      value && this._buildSoundIcon();
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildLogo();
      this._buildReward();
    }

    // LOGO

  }, {
    key: '_buildLogo',
    value: function _buildLogo() {
      this.setChild('logo', this._logoView = new _logoView.LogoView());
    }

    // REWARD

  }, {
    key: '_buildReward',
    value: function _buildReward() {
      this.setChild('foreground', this._rewardView = new _rewardView.RewardView());
    }

    // SOUND

  }, {
    key: '_buildSoundIcon',
    value: function _buildSoundIcon() {
      this.setChild('sound', this._soundView = new _soundView.SoundView());
    }

    // HINT

  }, {
    key: '_onHintUpdate',
    value: function _onHintUpdate(hint) {
      hint ? this._buildHint() : this._destroyHint();
    }
  }, {
    key: '_buildHint',
    value: function _buildHint() {
      this.addChild(this._hintView = new _hintView.HintView());
    }
  }, {
    key: '_destroyHint',
    value: function _destroyHint() {
      this._hintView.destroy();
    }
  }, {
    key: '_adjustCtaLogo',
    value: function _adjustCtaLogo() {
      var _this2 = this;

      var Sinusoidal = Phaser.Easing.Sinusoidal;


      var cell = this.getCellByName('cta_logo').area;
      var pos = new Phaser.Point(cell.x + cell.width / 2, cell.y + cell.height / 2);
      var maxScale = Math.min(cell.width / this._logoView.logo.width, cell.height / this._logoView.logo.height);
      var scale = Math.min(1, maxScale);

      this.game.add.tween(this._logoView).to({ x: pos.x, y: pos.y }, 400, Sinusoidal.InOut, true);
      this.game.add.tween(this._logoView.scale).to({ x: scale, y: scale }, 400, Sinusoidal.InOut, true).onComplete.addOnce(function () {
        _this2.rebuildChild(_this2._logoView, 'cta_logo');
      });
    }
  }, {
    key: 'name',
    get: function get() {
      return 'ForegroundView';
    }
  }]);

  return ForegroundView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../constants":106,"../../events/model-events":111,"./hint-view":166,"./logo-view":167,"./reward/reward-view":169,"./sound-view":170,"@armathai/lego":219,"@armathai/phaser2-grid":224}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HintView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _utils = require('../../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HintView = exports.HintView = function (_Phaser$Sprite) {
  _inherits(HintView, _Phaser$Sprite);

  function HintView() {
    _classCallCheck(this, HintView);

    var _this = _possibleConstructorReturn(this, (HintView.__proto__ || Object.getPrototypeOf(HintView)).call(this, CI_API.game, 0, 0, _constants.ASSETS, 'ui/hand.png'));

    _this.anchor.set(0.1, 0);
    _this.rotation = Math.PI * -0.78;

    _lego.lego.event.on(_modelEvents.ModelEvents.HintModel.VisibleUpdate, _this._onHintVisibleUpdate, _this);
    _this._hide();
    return _this;
  }

  _createClass(HintView, [{
    key: 'destroy',
    value: function destroy() {
      _lego.lego.event.removeListenersOf(this);

      _get(HintView.prototype.__proto__ || Object.getPrototypeOf(HintView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: '_onHintVisibleUpdate',
    value: function _onHintVisibleUpdate(visible) {
      visible ? this._show() : this._hide();
    }
  }, {
    key: '_show',
    value: function _show() {
      var spinView = (0, _utils.getViewByProperty)('name', 'SpinView');
      var pos = this.parent.toLocal(spinView.parent.toGlobal(new Phaser.Point(spinView.centerX + 54, spinView.centerY - 10)), undefined);

      this.position.set(pos.x, pos.y);
      this.scale.set(1);
      this.visible = true;
      this.game.tweens.removeFrom(this.scale);
      this.game.add.tween(this.scale).to({ x: 0.8, y: 0.8 }, 500, Phaser.Easing.Cubic.Out, true, 0, -1, true);
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.game.tweens.removeFrom(this.scale);
      this.visible = false;
    }
  }]);

  return HintView;
}(Phaser.Sprite);

},{"../../constants":106,"../../events/model-events":111,"../../utils":202,"@armathai/lego":219}],167:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogoView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _imageConfigs = require('../../configs/image-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var LogoView = exports.LogoView = function (_Container) {
  _inherits(LogoView, _Container);

  function LogoView() {
    _classCallCheck(this, LogoView);

    var _this = _possibleConstructorReturn(this, (LogoView.__proto__ || Object.getPrototypeOf(LogoView)).call(this));

    _this._glow = (0, _utils.makeImage)((0, _imageConfigs.getLogoGlowConfig)());
    _this._glow.scale.set(2.4, 2);
    _this._glow.alpha = 0;

    _this._logo = (0, _utils.makeImage)((0, _imageConfigs.getLogoImageConfig)());

    _this.addChild(_this._glow);
    _this.addChild(_this._logo);
    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this);
    return _this;
  }

  _createClass(LogoView, [{
    key: 'getBounds',
    value: function getBounds() {
      return this._logo.getBounds();
    }
  }, {
    key: '_highlight',
    value: function _highlight() {
      this.game.add.tween(this._glow).to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true);
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.Cta:
          this._highlight();
          break;
        default:
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return 'LogoView';
    }
  }, {
    key: 'logo',
    get: function get() {
      return this._logo;
    }
  }]);

  return LogoView;
}(_container.Container);

},{"../../configs/image-configs":98,"../../constants":106,"../../events/model-events":111,"../../utils":202,"../../utils/container":198,"@armathai/lego":219}],168:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardPopup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageConfigs = require('../../../configs/image-configs');

var _textConfigs = require('../../../configs/text-configs');

var _utils = require('../../../utils');

var _container = require('../../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RewardPopup = exports.RewardPopup = function (_Container) {
  _inherits(RewardPopup, _Container);

  function RewardPopup() {
    _classCallCheck(this, RewardPopup);

    var _this = _possibleConstructorReturn(this, (RewardPopup.__proto__ || Object.getPrototypeOf(RewardPopup)).call(this));

    _this._bg = null;

    _this._build();
    return _this;
  }

  _createClass(RewardPopup, [{
    key: 'getBounds',
    value: function getBounds() {
      return this._bg.getBounds();
    }
  }, {
    key: '_build',
    value: function _build() {
      // BG
      var bg = new _container.Container();
      var part1 = (0, _utils.makeImage)((0, _imageConfigs.getRewardPopupBgImageConfig)());
      var part2 = (0, _utils.makeImage)((0, _imageConfigs.getRewardPopupBgImageConfig)());

      part2.x += part2.width / 2 - 1;
      part1.x -= part1.width / 2 - 1;

      part2.scale.x = -1;

      bg.addMultiple([part1, part2]);
      this.addChild(this._bg = bg);

      // COUNT
      var countBg = (0, _utils.makeImage)((0, _imageConfigs.getRewardPopupFreeSpinBgImageConfig)());
      var count = (0, _utils.makeText)((0, _textConfigs.getRewardPopupCountTextConfig)(CI_API.Globals.PARAMS.number_of_extra_spins));

      count.anchor.set(0.5);

      countBg.addChild(count);
      this.addChild(countBg);

      // TITLE
      var title = (0, _utils.makeText)((0, _textConfigs.getRewardPopupTitleTextConfig)());
      title.anchor.set(0.5);
      this.addChild(title);
    }
  }]);

  return RewardPopup;
}(_container.Container);

},{"../../../configs/image-configs":98,"../../../configs/text-configs":104,"../../../utils":202,"../../../utils/container":198}],169:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../../configs/grid-configs');

var _constants = require('../../../constants');

var _modelEvents = require('../../../events/model-events');

var _viewEvents = require('../../../events/view-events');

var _utils = require('../../../utils');

var _sparkleEmitter = require('../../../utils/emitters/sparkle/sparkle-emitter');

var _rewardPopup = require('./reward-popup');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RewardView = exports.RewardView = function (_Phaser2Grid) {
  _inherits(RewardView, _Phaser2Grid);

  function RewardView() {
    _classCallCheck(this, RewardView);

    var _this = _possibleConstructorReturn(this, (RewardView.__proto__ || Object.getPrototypeOf(RewardView)).call(this, CI_API.game));

    _get(RewardView.prototype.__proto__ || Object.getPrototypeOf(RewardView.prototype), 'build', _this).call(_this, _this.getGridConfig());

    _this._blocker = null;
    _this._hideRunnable = null;

    _lego.lego.event.on(_modelEvents.ModelEvents.GameModel.StatusUpdate, _this._onGameStatusUpdate, _this).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, _this._onCtaVisibleUpdate, _this);
    return _this;
  }

  _createClass(RewardView, [{
    key: '_onCtaVisibleUpdate',
    value: function _onCtaVisibleUpdate(value) {
      if (!value) {
        return;
      }

      this.visible = false;
      (0, _utils.removeRunnable)(this._hideRunnable);
    }
  }, {
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getRewardGridConfig)();
    }
  }, {
    key: '_onGameStatusUpdate',
    value: function _onGameStatusUpdate(status) {
      switch (status) {
        case _constants.GameStatus.Reward:
          this._init();
          break;
        default:
      }
    }
  }, {
    key: '_init',
    value: function _init() {
      this._buildBlocker();
      this._buildEmitter();
      this._buildPopup();
      this._show();
    }
  }, {
    key: '_buildBlocker',
    value: function _buildBlocker() {
      var blocker = (0, _utils.makePixel)({ tint: 0x0, alpha: 0.7 });
      blocker.inputEnabled = true;
      blocker.input.priorityID = _constants.InputPriority.Reward;

      this.setChild('blocker', this._blocker = blocker);
    }
  }, {
    key: '_buildEmitter',
    value: function _buildEmitter() {
      this.setChild('emitter', this._emitter = new _sparkleEmitter.SparkleEmitter());
    }
  }, {
    key: '_buildPopup',
    value: function _buildPopup() {
      this.setChild('popup', this._popup = new _rewardPopup.RewardPopup());
    }
  }, {
    key: '_show',
    value: function _show() {
      var _Phaser$Easing = Phaser.Easing,
          Cubic = _Phaser$Easing.Cubic,
          Back = _Phaser$Easing.Back;


      this.game.add.tween(this).from({ alpha: 0 }, 400, Cubic.Out, true);
      this.game.add.tween(this._popup.scale).from({ x: 0, y: 0 }, 400, Back.Out, true).onStart.addOnce(this._onShowStart, this);

      this._hideRunnable = (0, _utils.delayRunnable)(3000, this._hide, this);

      this._emitter.emit();
    }
  }, {
    key: '_hide',
    value: function _hide() {
      var Cubic = Phaser.Easing.Cubic;


      this.game.add.tween(this).to({ alpha: 0 }, 400, Cubic.In, true).onComplete.addOnce(this._onHideComplete, this);
    }
  }, {
    key: '_onShowStart',
    value: function _onShowStart() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.RewardView.ShowStart);
    }
  }, {
    key: '_onHideComplete',
    value: function _onHideComplete() {
      this.visible = false;
      this._emitter.stop();

      _lego.lego.event.emit(_viewEvents.ViewEvents.RewardView.HideComplete);
    }
  }]);

  return RewardView;
}(_phaser2Grid.Phaser2Grid);

},{"../../../configs/grid-configs":88,"../../../constants":106,"../../../events/model-events":111,"../../../events/view-events":112,"../../../utils":202,"../../../utils/emitters/sparkle/sparkle-emitter":201,"./reward-popup":168,"@armathai/lego":219,"@armathai/phaser2-grid":224}],170:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var SoundView = exports.SoundView = function (_Container) {
  _inherits(SoundView, _Container);

  function SoundView() {
    _classCallCheck(this, SoundView);

    var _this = _possibleConstructorReturn(this, (SoundView.__proto__ || Object.getPrototypeOf(SoundView)).call(this));

    _this._onBtn = null;
    _this._offBtn = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.SoundModel.StateUpdate, _this._onSoundStateUpdate, _this);
    return _this;
  }

  _createClass(SoundView, [{
    key: '_onSoundStateUpdate',
    value: function _onSoundStateUpdate(value) {
      switch (value) {
        case _constants.SoundState.On:
          this._onBtn.visible = true;
          this._offBtn.visible = false;
          this.game.sound.volume = 1;
          break;
        case _constants.SoundState.Off:
          this._onBtn.visible = false;
          this._offBtn.visible = true;
          this.game.sound.volume = 0;
          break;
        default:
      }
    }
  }, {
    key: '_build',
    value: function _build() {
      this._onBtn = imageLoader.button(0, 0, 'ui/sound_on.png', this._off, this);
      this._offBtn = imageLoader.button(0, 0, 'ui/sound_off.png', this._on, this);

      this._onBtn.name = 'mute_button_on';
      this._offBtn.name = 'mute_button_off';

      this._onBtn.input.priorityID = _constants.InputPriority.Foreground;
      this._offBtn.input.priorityID = _constants.InputPriority.Foreground;

      this.addMultiple([this._onBtn, this._offBtn]);
    }
  }, {
    key: '_on',
    value: function _on() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.SoundView.Click, 'on');
    }
  }, {
    key: '_off',
    value: function _off() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.SoundView.Click, 'off');
    }
  }]);

  return SoundView;
}(_container.Container);

},{"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../utils/container":198,"@armathai/lego":219}],171:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialSequenceView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ninepatchConfigs = require('../../configs/ninepatch-configs');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var TutorialSequenceView = exports.TutorialSequenceView = function (_Container) {
  _inherits(TutorialSequenceView, _Container);

  function TutorialSequenceView(config) {
    _classCallCheck(this, TutorialSequenceView);

    var _this = _possibleConstructorReturn(this, (TutorialSequenceView.__proto__ || Object.getPrototypeOf(TutorialSequenceView)).call(this));

    _this._showTween = null;
    _this._hideTween = null;
    _this._textConfigFn = config.text;
    _this.addChild(_this._bg = _this._buildBg());
    _this.addChild(_this._label = _this._buildLabel());

    _this.alpha = 0;
    _this.rebuild();
    return _this;
  }

  _createClass(TutorialSequenceView, [{
    key: 'destroy',
    value: function destroy() {
      this.game.tweens.remove(this._showTween);
      this.game.tweens.remove(this._hideTween);

      _get(TutorialSequenceView.prototype.__proto__ || Object.getPrototypeOf(TutorialSequenceView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      var width = LP(700, 550);
      var height = LP(184, 184);
      this._bg.resize(width, height);
      this._label.setStyle(this._textConfigFn().style);
    }
  }, {
    key: 'show',
    value: function show() {
      this._showTween = this.game.add.tween(this).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
      return this._showTween;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._hideTween = this.game.add.tween(this).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true);
      return this._hideTween;
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      return (0, _utils.makeNinePatch)((0, _ninepatchConfigs.getTutorialBgImageConfig)());
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var _bg = this._bg,
          width = _bg.width,
          height = _bg.height;


      var label = (0, _utils.makeText)(this._textConfigFn());
      label.anchor.set(0.5);
      (0, _utils.fitText)(label, width * 0.8, height * 0.8);

      return label;
    }
  }]);

  return TutorialSequenceView;
}(_container.Container);

},{"../../configs/ninepatch-configs":100,"../../utils":202,"../../utils/container":198}],172:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _container = require('../../utils/container');

var _tutorialSequenceView = require('./tutorial-sequence-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var TutorialView = exports.TutorialView = function (_Container) {
  _inherits(TutorialView, _Container);

  function TutorialView() {
    _classCallCheck(this, TutorialView);

    var _this = _possibleConstructorReturn(this, (TutorialView.__proto__ || Object.getPrototypeOf(TutorialView)).call(this));

    _this._current = null;
    _this.onSequenceReady = new Phaser.Signal();

    _lego.lego.event.on(_modelEvents.ModelEvents.TutorialModel.CurrentUpdate, _this._onTutorialCurrentUpdate, _this);
    _lego.lego.event.on(_modelEvents.ModelEvents.TutorialSequenceModel.CompleteUpdate, _this._onTutorialCurrentCompleteUpdate, _this);
    return _this;
  }

  _createClass(TutorialView, [{
    key: 'destroy',
    value: function destroy() {
      var destroyChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var soft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._switchScreenInput(false);

      _get(TutorialView.prototype.__proto__ || Object.getPrototypeOf(TutorialView.prototype), 'destroy', this).call(this, destroyChildren, soft);
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      if (!this._current || !this._current.parent) {
        return;
      }

      this._current.rebuild();
    }
  }, {
    key: '_onTutorialCurrentUpdate',
    value: function _onTutorialCurrentUpdate(sequence) {
      if (!sequence) {
        return;
      }

      this._buildSequence(sequence);
      this.onSequenceReady.dispatch();
    }
  }, {
    key: '_onTutorialCurrentCompleteUpdate',
    value: function _onTutorialCurrentCompleteUpdate(complete) {
      if (!complete) {
        return;
      }

      this._switchScreenInput(false);
      this._current.hide().onComplete.addOnce(function () {
        _lego.lego.event.emit(_viewEvents.ViewEvents.TutorialView.SequenceHideComplete);
      });
    }
  }, {
    key: '_buildSequence',
    value: function _buildSequence(sequence) {
      this._current = new _tutorialSequenceView.TutorialSequenceView(sequence.config);
      this._switchScreenInput(true);
      this._current.show().onComplete.addOnce(function () {});

      this.addChild(this._current);
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
}(_container.Container);

},{"../../events/model-events":111,"../../events/view-events":112,"../../utils/container":198,"./tutorial-sequence-view":171,"@armathai/lego":219}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _modelEvents = require('../../events/model-events');

var _slotMachineView = require('./machine/slot-machine-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameView = exports.GameView = function (_Phaser2Grid) {
  _inherits(GameView, _Phaser2Grid);

  function GameView() {
    _classCallCheck(this, GameView);

    var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this, CI_API.game));

    _get(GameView.prototype.__proto__ || Object.getPrototypeOf(GameView.prototype), 'build', _this).call(_this, _this.getGridConfig());

    _this._machine = null;

    _lego.lego.event.on(_modelEvents.ModelEvents.GameModel.SlotMachineUpdate, _this._onMachineUpdate, _this);
    return _this;
  }

  _createClass(GameView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getGameGridConfig)();
    }

    // MACHINE

  }, {
    key: '_onMachineUpdate',
    value: function _onMachineUpdate(slotMachine) {
      slotMachine ? this._buildMachine() : this._destroyMachine();
    }
  }, {
    key: '_buildMachine',
    value: function _buildMachine() {
      this.setChild('machine', this._machine = new _slotMachineView.SlotMachineView());
    }
  }, {
    key: '_destroyMachine',
    value: function _destroyMachine() {
      this._machine.destroy();
    }
  }, {
    key: 'name',
    get: function get() {
      return 'GameView';
    }
  }]);

  return GameView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../events/model-events":111,"./machine/slot-machine-view":175,"@armathai/lego":219,"@armathai/phaser2-grid":224}],174:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReelView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _modelEvents = require('../../../events/model-events');

var _viewEvents = require('../../../events/view-events');

var _store = require('../../../models/store');

var _utils = require('../../../utils');

var _container = require('../../../utils/container');

var _slotView = require('./slot-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getTweenPoints(time, ease, from, to) {
  var dt = CI_API.game.time.physicsElapsedMS;
  var points = [];
  var framesCount = Math.round(1 / time * 1000 / dt);
  for (var i = 1; i <= framesCount; i += 1) {
    points.push(Math.round(from + ease(i / framesCount) * to));
  }

  return points;
}

var ReelView = exports.ReelView = function (_Container) {
  _inherits(ReelView, _Container);

  function ReelView(model) {
    _classCallCheck(this, ReelView);

    var _this = _possibleConstructorReturn(this, (ReelView.__proto__ || Object.getPrototypeOf(ReelView)).call(this));

    _this.name = 'ReelView';

    var slots = model.slots,
        uuid = model.uuid;
    var _store$game$slotMachi = _store.store.game.slotMachine.config,
        slotOffset = _store$game$slotMachi.slotOffset,
        speed = _store$game$slotMachi.speed;


    _this._uuid = uuid;
    _this._offset = slotOffset;
    _this._speed = speed;
    _this._loopRunnable = null;
    _this._spinRunnable = null;
    _this._stopRunnable = null;
    _this._loopStep = null;
    _this._slots = null;
    _this._height = null;
    _this._tile = null;

    _lego.lego.event.on(_modelEvents.ModelEvents.SlotModel.TypeUpdate, _this._onSlotTypeUpdate, _this);

    _this._build(slots);
    return _this;
  }

  _createClass(ReelView, [{
    key: 'destroy',
    value: function destroy() {
      (0, _utils.removeRunnable)(this._spinRunnable);
      (0, _utils.removeRunnable)(this._stopRunnable);
      (0, _utils.removeRunnable)(this._loopRunnable);

      _get(ReelView.prototype.__proto__ || Object.getPrototypeOf(ReelView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'highlightSpinResult',
    value: function highlightSpinResult(slots) {
      var _this2 = this;

      slots.forEach(function (s) {
        var type = s.type,
            index = s.index;

        if (type < 10) {
          _this2._slots[index].highlightSpinResult();
        }
      });
    }
  }, {
    key: 'getSlot',
    value: function getSlot(uuid) {
      return this._slots.find(function (slot) {
        return slot.uuid === uuid;
      });
    }
  }, {
    key: 'getSlotByIndex',
    value: function getSlotByIndex(index) {
      return this.slots[index];
    }
  }, {
    key: 'spin',
    value: function spin() {
      var _this3 = this;

      var spinEasing = _store.store.game.slotMachine.config.spinEasing;

      var points = getTweenPoints(this._speed, spinEasing, this._tileY, this._height);

      var lastPoints = points.slice(points.length - 2);
      this._loopStep = lastPoints[1] - lastPoints[0];
      this._spinRunnable = (0, _utils.loopRunnable)(0, function () {
        _this3.tileY = points.shift();

        if (!points.length) {
          (0, _utils.removeRunnable)(_this3._spinRunnable);
          _this3._loop();
          _lego.lego.event.emit(_viewEvents.ViewEvents.ReelView.SpeedUpComplete, _this3._uuid);
        }
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this4 = this;

      (0, _utils.removeRunnable)(this._loopRunnable);

      this.unBlur();

      var stopEasing = _store.store.game.slotMachine.config.stopEasing;

      var diff = this._height - this._tileY % this._height;
      var points = getTweenPoints(this._speed, stopEasing, this._tileY, diff + this._height);

      this._stopRunnable = (0, _utils.loopRunnable)(0, function () {
        _this4.tileY = points.shift();
        if (!points.length) {
          (0, _utils.removeRunnable)(_this4._stopRunnable);
          _lego.lego.event.emit(_viewEvents.ViewEvents.ReelView.SpeedDownComplete, _this4._uuid);
        }
      });
    }
  }, {
    key: 'blur',
    value: function blur() {
      this._slots.forEach(function (s) {
        return s.blur();
      });
    }
  }, {
    key: 'unBlur',
    value: function unBlur() {
      this._slots.forEach(function (s) {
        return s.unBlur();
      });
    }
  }, {
    key: '_onSlotTypeUpdate',
    value: function _onSlotTypeUpdate(newType, oldType, uuid) {
      var slotView = this.getSlot(uuid);
      if (!slotView) {
        return;
      }

      slotView.setType(newType);
      this._height = this._calculateHeight();
    }
  }, {
    key: '_loop',
    value: function _loop() {
      var _this5 = this;

      this._loopRunnable = (0, _utils.loopRunnable)(0, function () {
        _this5.tileY += _this5._loopStep;
      });
    }
  }, {
    key: '_buildSlots',
    value: function _buildSlots(slots) {
      var _this6 = this;

      return slots.map(function (model) {
        var slot = new _slotView.SlotView(model);

        return _this6.addChild(slot);
      });
    }
  }, {
    key: '_calculateHeight',
    value: function _calculateHeight() {
      var _this7 = this;

      return this._slots.reduce(function (acc, cur) {
        return acc + cur.height + _this7._offset;
      }, 0);
    }
  }, {
    key: '_updateSlotsPositions',
    value: function _updateSlotsPositions() {
      for (var i = 0; i < this._slots.length; i += 1) {
        var slot = this._slots[i];

        if (i === 0) {
          slot.setY(this._tileY % this._height);
        } else {
          var previews = this._slots[i - 1];
          slot.setY(previews.bottom + this._offset);
        }

        this._checkForLimits(slot);
      }
    }
  }, {
    key: '_checkForLimits',
    value: function _checkForLimits(slot) {
      if (slot.bottom > this._height) {
        slot.setY(slot.top - this._height);
      } else if (slot.bottom < 0) {
        slot.setY(slot.top + this._height);
      }
    }
  }, {
    key: '_build',
    value: function _build(slots) {
      this._slots = this._buildSlots(slots);

      this._height = this._calculateHeight();
      this.tileY = 0;
    }
  }, {
    key: 'uuid',
    get: function get() {
      return this._uuid;
    }
  }, {
    key: 'slots',
    get: function get() {
      return this._slots;
    }
  }, {
    key: 'tileY',
    get: function get() {
      return this._tileY;
    },
    set: function set(value) {
      this._tileY = value;
      this._updateSlotsPositions();
    }
  }]);

  return ReelView;
}(_container.Container);

},{"../../../events/model-events":111,"../../../events/view-events":112,"../../../models/store":156,"../../../utils":202,"../../../utils/container":198,"./slot-view":176,"@armathai/lego":219}],175:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlotMachineView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _imageConfigs = require('../../../configs/image-configs');

var _constants = require('../../../constants');

var _modelEvents = require('../../../events/model-events');

var _viewEvents = require('../../../events/view-events');

var _store = require('../../../models/store');

var _utils = require('../../../utils');

var _container = require('../../../utils/container');

var _reelView = require('./reel-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


function getMaskGraphics() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$alpha = config.alpha,
      alpha = _config$alpha === undefined ? 1 : _config$alpha,
      _config$color = config.color,
      color = _config$color === undefined ? 0x0 : _config$color;
  var points = _store.store.game.slotMachine.config.mask;


  var gr = CI_API.game.add.graphics();
  gr.beginFill(color, 1);
  gr.drawPolygon(points);
  gr.endFill();

  gr.alpha = alpha;

  return gr;
}

var SlotMachineView = exports.SlotMachineView = function (_Container) {
  _inherits(SlotMachineView, _Container);

  function SlotMachineView() {
    _classCallCheck(this, SlotMachineView);

    var _this = _possibleConstructorReturn(this, (SlotMachineView.__proto__ || Object.getPrototypeOf(SlotMachineView)).call(this));

    _this._bg = null;
    _this._reels = null;
    _this._reelsBg = null;
    _this._reelsGroup = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, _this._onStateUpdate, _this);
    _lego.lego.event.on(_modelEvents.ModelEvents.ReelModel.StateUpdate, _this._onReelStateUpdate, _this);
    _lego.lego.event.on(_viewEvents.ViewEvents.EffectsView.SpinResultAnimationStart, _this._onSpinResultAnimationStart, _this);
    _lego.lego.event.on(_viewEvents.ViewEvents.EffectsView.SpinResultAnimationComplete, _this._onSpinResultAnimationComplete, _this);
    return _this;
  }

  _createClass(SlotMachineView, [{
    key: 'getBounds',
    value: function getBounds() {
      return this._bg.getBounds();
    }
  }, {
    key: 'getReel',
    value: function getReel(uuid) {
      return this._reels.find(function (reel) {
        return reel.uuid === uuid;
      });
    }
  }, {
    key: '_onSpinResultAnimationStart',
    value: function _onSpinResultAnimationStart() {
      this.game.add.tween(this._blocker).to({ alpha: 0.2 }, 200, null, true);
    }
  }, {
    key: '_onSpinResultAnimationComplete',
    value: function _onSpinResultAnimationComplete() {
      this.game.add.tween(this._blocker).to({ alpha: 0 }, 200, null, true);
    }
  }, {
    key: '_onStateUpdate',
    value: function _onStateUpdate(state) {
      this._switchInputs(false);

      switch (state) {
        case _constants.SlotMachineState.Idle:
          this._switchInputs(true);
          break;
        default:
      }
    }
  }, {
    key: '_onReelStateUpdate',
    value: function _onReelStateUpdate(newState, oldState, uuid) {
      switch (newState) {
        case _constants.ReelState.Spin:
          this.getReel(uuid).spin();
          break;
        case _constants.ReelState.MaxSpeed:
          // this.getReel(uuid).blur();
          break;
        case _constants.ReelState.Stop:
          this.getReel(uuid).stop();
          break;
        default:
      }
    }
  }, {
    key: '_switchInputs',
    value: function _switchInputs(value) {
      _store.store.game.slotMachine.config.clickable && (this._bg.input.enabled = value);
    }
  }, {
    key: '_onBlockerClick',
    value: function _onBlockerClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.SlotMachineView.Spin);
    }

    // BUILD

  }, {
    key: '_build',
    value: function _build() {
      var clickable = _store.store.game.slotMachine.config.clickable;


      this._buildBg();
      this._buildReels();
      this._buildBlocker();
      this._switchInputs(clickable);
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var bgPart = (0, _utils.makeImage)((0, _imageConfigs.getSlotMachineBgImageConfig)());
      var width = bgPart.width,
          height = bgPart.height;


      bgPart.scale.set(1 / 0.76);

      var rt = new Phaser.RenderTexture(this.game, width * 2, height);
      rt.renderXY(bgPart, 0, 0);
      bgPart.scale.x *= -1;
      rt.renderXY(bgPart, width * 2, 0);

      this._bg = this.game.add.sprite(0, 0, rt);
      this._bg.name = this.name;
      this._bg.inputEnabled = true;
      this._bg.events.onInputDown.add(this._onBlockerClick, this);

      this.addChild(this._bg);
    }
  }, {
    key: '_buildReels',
    value: function _buildReels() {
      var reels = _store.store.game.slotMachine.reels;


      var group = new _container.Container();
      this._reels = reels.map(function (model) {
        var offset = model.config.offset;

        var reel = new _reelView.ReelView(model);
        reel.position.set(group.width + offset.x, offset.y);

        return group.add(reel);
      });

      group.centerX = this._bg.centerX;
      group.y = this._bg.y + 20;

      var mask = getMaskGraphics({ alpha: 0.9 });
      mask.x = this._bg.left;
      mask.y = this._bg.top;

      this.add(group.mask = mask);
      this.add(this._reelsGroup = group);
    }
  }, {
    key: '_buildBlocker',
    value: function _buildBlocker() {
      this._blocker = this.add(getMaskGraphics({ alpha: 0 }));
      this._blocker.x = this._bg.left;
      this._blocker.y = this._bg.top;
    }
  }, {
    key: 'name',
    get: function get() {
      return 'SlotMachineView';
    }
  }, {
    key: 'reels',
    get: function get() {
      return this._reels;
    }
  }]);

  return SlotMachineView;
}(_container.Container);

},{"../../../configs/image-configs":98,"../../../constants":106,"../../../events/model-events":111,"../../../events/view-events":112,"../../../models/store":156,"../../../utils":202,"../../../utils/container":198,"./reel-view":174,"@armathai/lego":219}],176:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlotView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../../constants');

var _store = require('../../../models/store');

var _utils = require('../../../utils');

var _container = require('../../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlotView = exports.SlotView = function (_Container) {
  _inherits(SlotView, _Container);

  function SlotView(model) {
    _classCallCheck(this, SlotView);

    var _this = _possibleConstructorReturn(this, (SlotView.__proto__ || Object.getPrototypeOf(SlotView)).call(this));

    _this.name = 'SlotView';

    var uuid = model.uuid,
        type = model.type;

    _this._uuid = uuid;
    _this._type = type;
    _this._width = null;
    _this._height = null;
    _this._blur = false;

    _this._updateDimensions();

    _this._build();
    return _this;
  }

  _createClass(SlotView, [{
    key: 'setY',
    value: function setY(value) {
      this.y = value + this.height * this._slot.anchor.y;
    }
  }, {
    key: 'setType',
    value: function setType(value) {
      this._type = value;

      this._buildSlot();
      this._updateDimensions();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this._blur = true;
      this._slot.loadTexture(_constants.ASSETS, 'slot/slot-blur-' + (this._type + 1) + '.png');
    }
  }, {
    key: 'unBlur',
    value: function unBlur() {
      this._blur = false;
      this._slot.loadTexture(_constants.ASSETS, 'slot/slot-' + (this._type + 1) + '.png');
    }
  }, {
    key: 'highlightSpinResult',
    value: function highlightSpinResult() {
      this.game.add.tween(this.scale).to({ x: '-0.1', y: '-0.1' }, 600, Phaser.Easing.Quadratic.InOut, true, 800, 0, true);
    }
  }, {
    key: '_build',
    value: function _build() {
      this._buildSlot();
    }
  }, {
    key: '_buildSlot',
    value: function _buildSlot() {
      this._slot && this._slot.destroy();

      var slot = (0, _utils.makeImage)({ frame: 'slot/slot-' + (this._blur ? 'blur-' : '') + (this._type + 1) + '.png' });
      slot.anchor.set(0.5);

      this.addChild(this._slot = slot);
    }
  }, {
    key: '_updateDimensions',
    value: function _updateDimensions() {
      var slotDimensions = _store.store.game.slotMachine.config.slotDimensions;

      this._width = slotDimensions[this._type].width;
      this._height = slotDimensions[this._type].height;
    }
  }, {
    key: 'uuid',
    get: function get() {
      return this._uuid;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }, {
    key: 'width',
    get: function get() {
      return this._width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this._height;
    }
  }, {
    key: 'top',
    get: function get() {
      return this.y - this.height * this._slot.anchor.y;
    }
  }, {
    key: 'bottom',
    get: function get() {
      return this.y + this.height * this._slot.anchor.y;
    }
  }]);

  return SlotView;
}(_container.Container);

},{"../../../constants":106,"../../../models/store":156,"../../../utils":202,"../../../utils/container":198}],177:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _gridConfigs = require('../configs/grid-configs');

var _constants = require('../constants');

var _modelEvents = require('../events/model-events');

var _resizablePhaser2Grid = require('../utils/resizable-phaser2-grid');

var _backgroundView = require('./background/background-view');

var _ctaView = require('./cta/cta-view');

var _effectsView = require('./effects/effects-view');

var _foregroundView = require('./foreground/foreground-view');

var _gameView = require('./game/game-view');

var _uiView = require('./ui/ui-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var MainView = exports.MainView = function (_ResizablePhaser2Grid) {
  _inherits(MainView, _ResizablePhaser2Grid);

  function MainView() {
    _classCallCheck(this, MainView);

    var _this = _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this, CI_API.game));

    _this.build();

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.StatusUpdate, _this._onAdStatusUpdate, _this);
    return _this;
  }

  _createClass(MainView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getMainGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      _get(MainView.prototype.__proto__ || Object.getPrototypeOf(MainView.prototype), 'rebuild', this).call(this, config);

      this.updateTransform();
      this._effectView.resize();
    }
  }, {
    key: 'build',
    value: function build() {
      _get(MainView.prototype.__proto__ || Object.getPrototypeOf(MainView.prototype), 'build', this).call(this, this.getGridConfig());

      this.setChild('main', new _backgroundView.BackgroundView());
      this.setChild('main', new _gameView.GameView());
      this.setChild('main', new _uiView.UIView());
      this.setChild('main', this._ctaView = CI_API.CTA.Instantiate(_ctaView.CTAView));
      this.setChild('main', new _foregroundView.ForegroundView());
      this.setChild('main', this._effectView = new _effectsView.EffectsView());
    }
  }, {
    key: '_onAdStatusUpdate',
    value: function _onAdStatusUpdate(status) {
      switch (status) {
        case _constants.AdStatus.Cta:
          this.rebuildChild(this._ctaView);
          this._ctaView.postRebuild();
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
}(_resizablePhaser2Grid.ResizablePhaser2Grid);

},{"../configs/grid-configs":88,"../constants":106,"../events/model-events":111,"../utils/resizable-phaser2-grid":207,"./background/background-view":158,"./cta/cta-view":159,"./effects/effects-view":161,"./foreground/foreground-view":165,"./game/game-view":173,"./ui/ui-view":184,"@armathai/lego":219}],178:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BalanceView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _imageConfigs = require('../../configs/image-configs');

var _ninepatchConfigs = require('../../configs/ninepatch-configs');

var _textConfigs = require('../../configs/text-configs');

var _modelEvents = require('../../events/model-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var BalanceView = exports.BalanceView = function (_Container) {
  _inherits(BalanceView, _Container);

  function BalanceView() {
    _classCallCheck(this, BalanceView);

    var _this = _possibleConstructorReturn(this, (BalanceView.__proto__ || Object.getPrototypeOf(BalanceView)).call(this));

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.PlayerModel.BalanceUpdate, _this._onBalanceUpdate, _this);
    return _this;
  }

  _createClass(BalanceView, [{
    key: 'destroy',
    value: function destroy() {
      this.game.tweens.remove(this._numberTween);

      _get(BalanceView.prototype.__proto__ || Object.getPrototypeOf(BalanceView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._bg.scale.y = LP(-1, 1);
      this._label.fontSize = LP(28, 32);
      this._coin.x = this._label.left - 40;
    }
  }, {
    key: '_onBalanceUpdate',
    value: function _onBalanceUpdate(newValue, oldValue) {
      var _this2 = this;

      this._numberTween = (0, _utils.tweenNumber)({
        from: oldValue,
        to: newValue,
        duration: 1000,
        step: 1,
        context: this,
        onUpdate: function onUpdate(value) {
          return _this2._setText(Math.floor(value));
        }
      });
    }
  }, {
    key: '_build',
    value: function _build() {
      this.addChild(this._bg = this._buildBg());
      this.addChild(this._coin = this._buildCoin());
      this.addChild(this._label = this._buildLabel());

      this.rebuild();
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var bg = (0, _utils.makeNinePatch)((0, _ninepatchConfigs.getBalanceBgNinePatchConfig)());
      return bg;
    }
  }, {
    key: '_buildCoin',
    value: function _buildCoin() {
      var coin = (0, _utils.makeImage)((0, _imageConfigs.getCoinImageConfig)());
      coin.scale.set(0.6);
      coin.position.set(-136, 5);
      return coin;
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var text = (0, _utils.makeText)((0, _textConfigs.getBalanceLabelTextConfig)(_store.store.player.balance.toLocaleString()));
      text.anchor.set(0.5);

      return text;
    }
  }, {
    key: '_setText',
    value: function _setText(n) {
      this._label.setText({
        text: n.toLocaleString(),
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });
    }
  }]);

  return BalanceView;
}(_container.Container);

},{"../../configs/image-configs":98,"../../configs/ninepatch-configs":100,"../../configs/text-configs":104,"../../events/model-events":111,"../../models/store":156,"../../utils":202,"../../utils/container":198,"@armathai/lego":219}],179:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BetView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _buttonConfigs = require('../../configs/button-configs');

var _textConfigs = require('../../configs/text-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _button = require('../../utils/button/button');

var _pairInfoComponent = require('./pair-info-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var BetView = exports.BetView = function (_PairInfoComponent) {
  _inherits(BetView, _PairInfoComponent);

  function BetView() {
    _classCallCheck(this, BetView);

    var _this = _possibleConstructorReturn(this, (BetView.__proto__ || Object.getPrototypeOf(BetView)).call(this, {
      label: (0, _textConfigs.getBetLabelTextConfig)(),
      text: (0, _textConfigs.getBetTextConfig)()
    }));

    _this._bet = null;
    _this._label = null;
    _this._plus = null;
    _this._minus = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.PlayerModel.BetUpdate, _this._onBetUpdate, _this);
    _lego.lego.event.on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, _this._onSlotMachineStateUpdate, _this);
    return _this;
  }

  _createClass(BetView, [{
    key: '_onBetUpdate',
    value: function _onBetUpdate(value) {
      this._setBet(value);
    }
  }, {
    key: '_onSlotMachineStateUpdate',
    value: function _onSlotMachineStateUpdate(value) {
      value === _constants.SlotMachineState.Idle ? this._checkForButtonsState() : this._switchButtonsEnable(false);
    }
  }, {
    key: '_build',
    value: function _build() {
      this.addChild(this._plus = this._buildPlusBtn());
      this.addChild(this._minus = this._buildMinusBtn());
      this.addChild(this._bet = this._buildBetText());
      this.addChild(this._label = this._buildLabel());

      this._setBet(_store.store.player.bet);
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getBetLabelTextConfig)());
      label.anchor.set(0.5);
      label.x = LP(-95, -108);
      if (this._plus) {
        label.y = this._plus.centerY + 2;
      }
      return label;
    }
  }, {
    key: '_buildBetText',
    value: function _buildBetText() {
      var bet = (0, _utils.makeText)((0, _textConfigs.getBetTextConfig)());
      bet.anchor.set(0.5);
      bet.x = this._plus.left - (this._plus.left - this._minus.right) / 2;
      bet.y = this._plus.centerY + 3;
      return bet;
    }
  }, {
    key: '_buildPlusBtn',
    value: function _buildPlusBtn() {
      var btn = new _button.Button((0, _buttonConfigs.getBetPlusButtonConfig)());
      btn.onClick.add(this._onButtonClick, this, 0, 1);
      btn.x = LP(btn.width * 1.95 - 1, btn.width * 2.18);
      btn.y = -3;
      btn.scale.x = -1;

      return btn;
    }
  }, {
    key: '_buildMinusBtn',
    value: function _buildMinusBtn() {
      var btn = new _button.Button((0, _buttonConfigs.getBetMinusButtonConfig)());
      btn.onClick.add(this._onButtonClick, this, 0, -1);
      btn.x = LP(-btn.width + 6, -btn.width * 1.2);
      btn.y = -3;

      return btn;
    }
  }, {
    key: '_setBet',
    value: function _setBet(value) {
      this._checkForButtonsState();
      this._setText('' + value.toLocaleString());
    }
  }, {
    key: '_setText',
    value: function _setText(text) {
      this._bet.setText({
        text: text,
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });

      (0, _utils.fitText)(this._bet, this._plus.left - this._minus.right);
    }
  }, {
    key: '_checkForButtonsState',
    value: function _checkForButtonsState() {
      var game = _store.store.game,
          player = _store.store.player;
      var bet = player.bet;
      var _game$slotMachine$con = game.slotMachine.config.bet,
          max = _game$slotMachine$con.max,
          min = _game$slotMachine$con.min;


      this._minus.switchEnable(bet !== min);
      this._plus.switchEnable(bet !== max);
    }
  }, {
    key: '_switchButtonsEnable',
    value: function _switchButtonsEnable(enable) {
      this._minus.switchEnable(enable);
      this._plus.switchEnable(enable);
    }
  }, {
    key: '_onButtonClick',
    value: function _onButtonClick(target, value) {
      _lego.lego.event.emit(_viewEvents.ViewEvents.BetView.ButtonClick, value);
    }
  }]);

  return BetView;
}(_pairInfoComponent.PairInfoComponent);

},{"../../configs/button-configs":87,"../../configs/text-configs":104,"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../models/store":156,"../../utils":202,"../../utils/button/button":196,"./pair-info-component":181,"@armathai/lego":219}],180:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlsView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _imageConfigs = require('../../configs/image-configs');

var _ninepatchConfigs = require('../../configs/ninepatch-configs');

var _modelEvents = require('../../events/model-events');

var _utils = require('../../utils');

var _container = require('../../utils/container');

var _betView = require('./bet-view');

var _spinView = require('./spin-view');

var _winView = require('./win-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var ControlsView = exports.ControlsView = function (_Phaser2Grid) {
  _inherits(ControlsView, _Phaser2Grid);

  function ControlsView() {
    _classCallCheck(this, ControlsView);

    var _this = _possibleConstructorReturn(this, (ControlsView.__proto__ || Object.getPrototypeOf(ControlsView)).call(this, CI_API.game));

    _this._bg = null;
    _this._spin = null;
    _this._win = null;
    _this._bet = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.GameModel.SpinBtnUpdate, _this._onSpinBtnUpdate, _this);
    return _this;
  }

  _createClass(ControlsView, [{
    key: 'getGridConfig',
    value: function getGridConfig() {
      return (0, _gridConfigs.getControlsGridConfig)();
    }
  }, {
    key: 'rebuild',
    value: function rebuild(config) {
      _get(ControlsView.prototype.__proto__ || Object.getPrototypeOf(ControlsView.prototype), 'rebuild', this).call(this, config);

      var scale = LP(0.64, 1);
      this._ornamentL.scale.set(scale);
      this._ornamentR.scale.set(scale);
      this._ornamentL.scale.x *= -1;

      this._ornamentL.bottom = this._bg.bottom + 8;
      this._ornamentR.bottom = this._bg.bottom + 8;

      this._ornamentL.x = this._bg.left + 28;
      this._ornamentR.x = this._bg.right - 28;
    }
  }, {
    key: '_onSpinBtnUpdate',
    value: function _onSpinBtnUpdate(value) {
      value && this._buildSpin();
    }
  }, {
    key: '_build',
    value: function _build() {
      _get(ControlsView.prototype.__proto__ || Object.getPrototypeOf(ControlsView.prototype), 'build', this).call(this, this.getGridConfig());

      this._buildBg();
      this._buildWinBet();
    }
  }, {
    key: '_buildBg',
    value: function _buildBg() {
      var bg = (0, _utils.makeGradient)({
        width: 10,
        height: 170,
        horizontal: 0,
        vertical: 1,
        colors: [{
          percent: 0,
          color: '#606d80'
        }, {
          percent: 0.01,
          color: '#323845'
        }, {
          percent: 0.03,
          color: '#000513'
        }, {
          percent: 0.49,
          color: '#011b3e'
        }, {
          percent: 1,
          color: '#010817'
        }]
      });

      var ornamentConfig = (0, _imageConfigs.getUiOrnamentImageConfig)();
      var ornamentL = (0, _utils.makeImage)(ornamentConfig);
      var ornamentR = (0, _utils.makeImage)(ornamentConfig);

      this.setChild('bg', this._bg = bg);
      this.addChild(this._ornamentL = ornamentL);
      this.addChild(this._ornamentR = ornamentR);
    }
  }, {
    key: '_buildWinBet',
    value: function _buildWinBet() {
      var cont = new _container.Container();

      var winBetBg = (0, _utils.makeNinePatch)((0, _ninepatchConfigs.getWinBetBgNinePathConfig)());

      this._win = new _winView.WinView();
      this._bet = new _betView.BetView();

      cont.addChild(winBetBg);
      cont.addChild(this._win);
      cont.addChild(this._bet);

      this._win.y = -this._win.height / 1.5 + 3;
      this._bet.y = this._bet.height / 2 + 3;

      winBetBg.scale.set(0.95);

      this.setChild('win_bet', cont);
    }
  }, {
    key: '_buildSpin',
    value: function _buildSpin() {
      this.setChild('spin', this._spin = new _spinView.SpinView());
    }
  }, {
    key: 'name',
    get: function get() {
      return 'ControlsView';
    }
  }]);

  return ControlsView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../configs/image-configs":98,"../../configs/ninepatch-configs":100,"../../events/model-events":111,"../../utils":202,"../../utils/container":198,"./bet-view":179,"./spin-view":183,"./win-view":185,"@armathai/lego":219,"@armathai/phaser2-grid":224}],181:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PairInfoComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../../utils');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PairInfoComponent = exports.PairInfoComponent = function (_Container) {
  _inherits(PairInfoComponent, _Container);

  function PairInfoComponent(config) {
    _classCallCheck(this, PairInfoComponent);

    var _this = _possibleConstructorReturn(this, (PairInfoComponent.__proto__ || Object.getPrototypeOf(PairInfoComponent)).call(this));

    var label = config.label,
        text = config.text;

    _this._buildLabel(label);
    _this._buildText(text);
    return _this;
  }

  _createClass(PairInfoComponent, [{
    key: '_buildLabel',
    value: function _buildLabel(labelConfig) {
      var label = (0, _utils.makeText)(labelConfig);

      this.addChild(label);
    }
  }, {
    key: '_buildText',
    value: function _buildText(textConfig) {
      var text = (0, _utils.makeText)(textConfig);
      text.anchor.set(0.5);
      return this.addChild(text);
    }
  }]);

  return PairInfoComponent;
}(_container.Container);

},{"../../utils":202,"../../utils/container":198}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersistentCTAView = undefined;

var _lego = require('@armathai/lego');

var _buttonConfigs = require('../../configs/button-configs');

var _viewEvents = require('../../events/view-events');

var _button = require('../../utils/button/button');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PersistentCTAView = exports.PersistentCTAView = function (_Button) {
  _inherits(PersistentCTAView, _Button);

  function PersistentCTAView() {
    _classCallCheck(this, PersistentCTAView);

    var _this = _possibleConstructorReturn(this, (PersistentCTAView.__proto__ || Object.getPrototypeOf(PersistentCTAView)).call(this, (0, _buttonConfigs.getPersistentCtaButtonConfig)()));

    _this.onClick.add(function () {
      return _lego.lego.event.emit(_viewEvents.ViewEvents.PersistentCtaView.Click);
    }, _this);
    return _this;
  }

  return PersistentCTAView;
}(_button.Button);

},{"../../configs/button-configs":87,"../../events/view-events":112,"../../utils/button/button":196,"@armathai/lego":219}],183:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _buttonConfigs = require('../../configs/button-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _store = require('../../models/store');

var _button = require('../../utils/button/button');

var _container = require('../../utils/container');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpinView = exports.SpinView = function (_Container) {
  _inherits(SpinView, _Container);

  function SpinView() {
    _classCallCheck(this, SpinView);

    var _this = _possibleConstructorReturn(this, (SpinView.__proto__ || Object.getPrototypeOf(SpinView)).call(this));

    _this.name = 'SpinView';

    _this._spinBtn = null;
    _this._stopBtn = null;
    _this._freeSpinBtn = null;
    _this._activeBtn = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.SpinButtonModel.StateUpdate, _this._onSpinStateUpdate, _this).on(_modelEvents.ModelEvents.SpinButtonModel.ActiveUpdate, _this._onSpinActiveUpdate, _this).on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, _this._onSlotMachineStateUpdate, _this);

    // setTimeout(() => {
    //   this._setFreeSpinsState();
    //   this._activeBtn.switchEnable(true);
    // }, 1000);
    return _this;
  }

  _createClass(SpinView, [{
    key: '_onSpinStateUpdate',
    value: function _onSpinStateUpdate(value) {
      switch (value) {
        case _constants.SpinBtnState.FreeSpin:
          this._setFreeSpinsState();
          break;
        case _constants.SpinBtnState.Spin:
          this._setSpinState();
          break;
        case _constants.SpinBtnState.Stop:
          this._setStopState();
          break;
        default:
      }
    }
  }, {
    key: '_onSpinActiveUpdate',
    value: function _onSpinActiveUpdate() {
      this._checkForButtonActive();
    }
  }, {
    key: '_checkForButtonsState',
    value: function _checkForButtonsState() {
      var state = _store.store.game.spinBtn.state;

      state === _constants.SpinBtnState.Spin ? this._setSpinState() : this._setStopState();
    }
  }, {
    key: '_onSlotMachineStateUpdate',
    value: function _onSlotMachineStateUpdate(state) {
      switch (state) {
        case _constants.SlotMachineState.Spin:
          this._updateFreeSpinBtnText();
          break;
        default:
      }
    }
  }, {
    key: '_setSpinState',
    value: function _setSpinState() {
      this._spinBtn.visible = true;
      this._stopBtn.visible = false;
      this._freeSpinBtn.visible = false;
      this._activeBtn = this._spinBtn;
    }
  }, {
    key: '_setStopState',
    value: function _setStopState() {
      this._stopBtn.visible = true;
      this._spinBtn.visible = false;
      this._freeSpinBtn.visible = false;

      this._activeBtn = this._stopBtn;
    }
  }, {
    key: '_setFreeSpinsState',
    value: function _setFreeSpinsState() {
      this._stopBtn.visible = false;
      this._spinBtn.visible = false;
      this._freeSpinBtn.visible = true;
      this._activeBtn = this._freeSpinBtn;

      this.bringToTop(this._freeSpinBtn);
    }
  }, {
    key: '_checkForButtonActive',
    value: function _checkForButtonActive() {
      var active = _store.store.game.spinBtn.active;

      this._activeBtn.switchEnable(active);
    }
  }, {
    key: '_updateFreeSpinBtnText',
    value: function _updateFreeSpinBtnText() {
      var slotMachine = _store.store.game.slotMachine;
      var spinsCount = slotMachine.spinsCount;
      var _CI_API$Globals$PARAM = CI_API.Globals.PARAMS,
          number_of_extra_spins = _CI_API$Globals$PARAM.number_of_extra_spins,
          first_slot_spins = _CI_API$Globals$PARAM.first_slot_spins;


      this._freeSpinBtn.setText({
        text: number_of_extra_spins - (spinsCount - first_slot_spins + 1) + ' / ' + number_of_extra_spins,
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });
    }
  }, {
    key: '_build',
    value: function _build() {
      var freeSpinBtn = new _button.FreeSpinButton((0, _buttonConfigs.getFreeSpinButtonConfig)());
      var spinBtn = new _button.Button((0, _buttonConfigs.getSpinButtonConfig)());
      var stopBtn = new _button.Button((0, _buttonConfigs.getStopButtonConfig)());

      freeSpinBtn.onClick.add(this._onSpinClick, this);
      spinBtn.onClick.add(this._onSpinClick, this);
      stopBtn.onClick.add(this._onStopClick, this);

      freeSpinBtn.switchEnable(false);
      spinBtn.switchEnable(false);
      stopBtn.switchEnable(false);

      this.addChild(this._freeSpinBtn = freeSpinBtn);
      this.addChild(this._spinBtn = spinBtn);
      this.addChild(this._stopBtn = stopBtn);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: '_onSpinClick',
    value: function _onSpinClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.SpinView.Spin);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: '_onStopClick',
    value: function _onStopClick() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.SpinView.Stop);
    }
  }]);

  return SpinView;
}(_container.Container);

},{"../../configs/button-configs":87,"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../models/store":156,"../../utils/button/button":196,"../../utils/container":198,"@armathai/lego":219}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; /* eslint-disable class-methods-use-this */


var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _gridConfigs = require('../../configs/grid-configs');

var _modelEvents = require('../../events/model-events');

var _tutorialView = require('../foreground/tutorial-view');

var _balanceView = require('./balance-view');

var _controlsView = require('./controls-view');

var _persistentCtaView = require('./persistent-cta-view');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIView = exports.UIView = function (_Phaser2Grid) {
  _inherits(UIView, _Phaser2Grid);

  function UIView() {
    _classCallCheck(this, UIView);

    var _this = _possibleConstructorReturn(this, (UIView.__proto__ || Object.getPrototypeOf(UIView)).call(this, CI_API.game));

    _get(UIView.prototype.__proto__ || Object.getPrototypeOf(UIView.prototype), 'build', _this).call(_this, _this.getGridConfig());

    _lego.lego.event.on(_modelEvents.ModelEvents.AdModel.PersistentCtaUpdate, _this._onPersistentCtaUpdate, _this).on(_modelEvents.ModelEvents.GameModel.SlotMachineUpdate, _this._onSlotMachineUpdate, _this).on(_modelEvents.ModelEvents.Store.PlayerUpdate, _this._onPlayerUpdate, _this).on(_modelEvents.ModelEvents.AdModel.TutorialUpdate, _this._onTutorialUpdate, _this);
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
      this._balanceView && this._balanceView.rebuild();
      this._tutorialView && this._tutorialView.rebuild();

      _get(UIView.prototype.__proto__ || Object.getPrototypeOf(UIView.prototype), 'rebuild', this).call(this, config);
    }

    // TUTORIAL

  }, {
    key: '_onTutorialUpdate',
    value: function _onTutorialUpdate(tutorial) {
      tutorial ? this._buildTutorial() : this._destroyTutorial();
    }
  }, {
    key: '_buildTutorial',
    value: function _buildTutorial() {
      this._tutorialView = new _tutorialView.TutorialView();
      this._tutorialView.onSequenceReady.add(this._onTutorialSequenceReady, this);
    }
  }, {
    key: '_onTutorialSequenceReady',
    value: function _onTutorialSequenceReady() {
      this.setChild('tutorial', this._tutorialView);
    }
  }, {
    key: '_destroyTutorial',
    value: function _destroyTutorial() {
      this._tutorialView.destroy();
    }

    // PERSISTENT

  }, {
    key: '_onPersistentCtaUpdate',
    value: function _onPersistentCtaUpdate(persistentCta) {
      persistentCta ? this._buildPersistentCta() : this._destroyPersistentCta();
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
    }

    // BALANCE

  }, {
    key: '_onPlayerUpdate',
    value: function _onPlayerUpdate(player) {
      player ? this._buildBalance() : this._destroyBalance();
    }
  }, {
    key: '_buildBalance',
    value: function _buildBalance() {
      this._balanceView = new _balanceView.BalanceView();
      this.setChild('balance', this._balanceView);
    }
  }, {
    key: '_destroyBalance',
    value: function _destroyBalance() {
      this._balanceView.destroy();
    }

    // CONTROLS

  }, {
    key: '_onSlotMachineUpdate',
    value: function _onSlotMachineUpdate(slotMachine) {
      slotMachine ? this._buildControls() : this._destroyControls();
    }
  }, {
    key: '_buildControls',
    value: function _buildControls() {
      this._controlsView = new _controlsView.ControlsView();
      this.setChild('footer', this._controlsView);
    }
  }, {
    key: '_destroyControls',
    value: function _destroyControls() {
      this._controlsView.destroy();
    }
  }, {
    key: 'name',
    get: function get() {
      return 'UIView';
    }
  }]);

  return UIView;
}(_phaser2Grid.Phaser2Grid);

},{"../../configs/grid-configs":88,"../../events/model-events":111,"../foreground/tutorial-view":172,"./balance-view":178,"./controls-view":180,"./persistent-cta-view":182,"@armathai/lego":219,"@armathai/phaser2-grid":224}],185:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WinView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lego = require('@armathai/lego');

var _textConfigs = require('../../configs/text-configs');

var _constants = require('../../constants');

var _modelEvents = require('../../events/model-events');

var _viewEvents = require('../../events/view-events');

var _store = require('../../models/store');

var _utils = require('../../utils');

var _pairInfoComponent = require('./pair-info-component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var WinView = exports.WinView = function (_PairInfoComponent) {
  _inherits(WinView, _PairInfoComponent);

  function WinView() {
    _classCallCheck(this, WinView);

    var _this = _possibleConstructorReturn(this, (WinView.__proto__ || Object.getPrototypeOf(WinView)).call(this, {
      label: (0, _textConfigs.getWinLabelTextConfig)(),
      text: (0, _textConfigs.getWinTextConfig)()
    }));

    _this._money = null;
    _this._label = null;

    _this._build();

    _lego.lego.event.on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, _this._onSlotMachineStateUpdate, _this);
    return _this;
  }

  _createClass(WinView, [{
    key: 'destroy',
    value: function destroy() {
      this.game.tweens.remove(this._numberTween);

      _get(WinView.prototype.__proto__ || Object.getPrototypeOf(WinView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: '_onSlotMachineStateUpdate',
    value: function _onSlotMachineStateUpdate() {
      var _store$game$slotMachi = _store.store.game.slotMachine,
          state = _store$game$slotMachi.state,
          spinResult = _store$game$slotMachi.spinResult;


      switch (state) {
        case _constants.SlotMachineState.Spin:
          this._setText(0);
          break;
        case _constants.SlotMachineState.Action:
          this._tweenText(spinResult.prize);
          break;
        default:
      }
    }
  }, {
    key: '_tweenText',
    value: function _tweenText(to) {
      var _this2 = this;

      var from = 0;

      this._numberTween = (0, _utils.tweenNumber)({
        from: from,
        to: to,
        duration: 1000,
        step: 1,
        context: this,
        onStart: function onStart() {
          return _this2._onPrizeTweenStart();
        },
        onComplete: function onComplete() {
          return _this2._onPrizeTweenComplete();
        },
        onUpdate: function onUpdate(value) {
          return _this2._onPrizeTweenUpdate(value);
        }
      });
    }
  }, {
    key: '_onPrizeTweenStart',
    value: function _onPrizeTweenStart() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.WinView.ScoreTweenStart);
    }
  }, {
    key: '_onPrizeTweenComplete',
    value: function _onPrizeTweenComplete() {
      _lego.lego.event.emit(_viewEvents.ViewEvents.WinView.ScoreTweenComplete);
    }
  }, {
    key: '_onPrizeTweenUpdate',
    value: function _onPrizeTweenUpdate(value) {
      this._setText(Math.floor(value));
    }
  }, {
    key: '_build',
    value: function _build() {
      this.addChild(this._money = this._buildMoneyText());
      this.addChild(this._label = this._buildLabel());

      this._setText(0);
    }
  }, {
    key: '_buildMoneyText',
    value: function _buildMoneyText() {
      var money = (0, _utils.makeText)((0, _textConfigs.getWinTextConfig)());
      money.anchor.set(0.5);
      money.x = LP(25, 25);
      money.y = 2;

      return money;
    }
  }, {
    key: '_buildLabel',
    value: function _buildLabel() {
      var label = (0, _utils.makeText)((0, _textConfigs.getWinLabelTextConfig)());
      label.anchor.set(0.5);
      label.x = LP(-93, -108);

      return label;
    }
  }, {
    key: '_setText',
    value: function _setText(n) {
      this._money.setText({
        text: '' + n.toLocaleString(),
        ignoreLocalization: true,
        toString: function toString() {
          return this;
        }
      });

      (0, _utils.fitText)(this._money, 200);
    }
  }]);

  return WinView;
}(_pairInfoComponent.PairInfoComponent);

},{"../../configs/text-configs":104,"../../constants":106,"../../events/model-events":111,"../../events/view-events":112,"../../models/store":156,"../../utils":202,"./pair-info-component":181,"@armathai/lego":219}],186:[function(require,module,exports){
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
  var spinsToCta = _store.store.game.slotMachine.spinsToCta;
  var spinsCount = _store.store.game.slotMachine.spinsCount;


  analytics.logProgress('spins_left', '' + (spinsToCta - spinsCount));
}

function onSlotMachineClick() {
  analytics.logProgress('spin_slots', 'full_screen');
}

function logItemsToCtaReached() {
  analytics.logProgress('spins_to_cta', '');
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

function onPersistentCtaClick() {
  analytics.logClick('cta_click', 'persistent_cta_button');
}

function onTutorialCompleteUpdate(complete) {
  if (complete) {
    analytics.logProgress('tutorial', 'complete');
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

function onCtaReasonUpdate(reason) {
  switch (reason) {
    case _constants.GameOverReasons.Idled:
      logIdledCta();
      break;
    case _constants.GameOverReasons.ItemsToCtaReached:
      logItemsToCtaReached();
      break;
    default:
      throw new Error('Unknown CTA reason "' + reason + '"');
  }
}

function AnalyticsObservant() {
  _lego.lego.event.on(_viewEvents.ViewEvents.CtaView.ScreenClick, onCtaScreenClick, this).on(_viewEvents.ViewEvents.CtaView.PlayClick, onCtaPlayClick, this).on(_viewEvents.ViewEvents.PersistentCtaView.Click, onPersistentCtaClick, this).on(_modelEvents.ModelEvents.TutorialModel.CompleteUpdate, onTutorialCompleteUpdate, this).on(_modelEvents.ModelEvents.CtaModel.ReasonUpdate, onCtaReasonUpdate, this).on(_modelEvents.ModelEvents.AdModel.StatusUpdate, onAdStatusUpdate, this).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, onViewStateUpdate, this).on(_viewEvents.ViewEvents.SlotMachineView.Spin, onSlotMachineClick, this);
}

},{"../constants":106,"../events/model-events":111,"../events/view-events":112,"../models/store":156,"@armathai/lego":219}],187:[function(require,module,exports){
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

var sound = void 0;

function play(id, volume) {
  sound.play(id, volume);
}

function stop(id) {
  sound.stop(id);
}

function onLoadCompleteUpdate(complete) {
  if (!complete) {
    return;
  }
  sound = soundLoader.addAudioSprite('audio');
}

function playGameTheme() {
  play('game-theme', 1);
}

function playCount() {
  play('count', 1);
}

function stopCount() {
  stop('count');
}

function playCleopatraSlot() {
  play('cleopatra', 1);
}

function playCaesarSlot() {
  play('caesar', 1);
}

function playClick() {
  play('click', 1);
}

function onWin(spinResult) {
  var type = spinResult.type,
      reels = spinResult.reels;

  if (type === 'mega') {
    var winSlotType = reels[0][0].type;

    switch (winSlotType) {
      case 8:
        playCleopatraSlot();
        break;
      case 9:
        playCaesarSlot();
        break;
      default:
    }
  } else {
    play('win', 1);
  }
}

function gameStatusUpdate(status) {
  switch (status) {
    case _constants.GameStatus.Reward:
      play('reward', 1);
      break;
    default:
  }
}

function onMachineStateUpdate(state) {
  var spinResult = _store.store.game.slotMachine.spinResult;


  switch (state) {
    case _constants.SlotMachineState.Spin:
      play('reel-tick', 2);
      break;
    case _constants.SlotMachineState.Action:
      stop('reel-tick');

      switch (spinResult.type) {
        case _constants.SpinResultType.Loose:
          break;
        default:
          onWin(spinResult);
      }

      break;
    default:
  }
}

function SoundObservant() {
  _lego.lego.event.on(_modelEvents.ModelEvents.LoadModel.CompleteUpdate, onLoadCompleteUpdate, this).once(_viewEvents.ViewEvents.Game.UserInteraction, playGameTheme, this).on(_modelEvents.ModelEvents.GameModel.StatusUpdate, gameStatusUpdate, this).on(_modelEvents.ModelEvents.SlotMachineModel.StateUpdate, onMachineStateUpdate, this).on(_viewEvents.ViewEvents.CtaView.ScoreTweenStart, playCount, this).on(_viewEvents.ViewEvents.CtaView.ScoreTweenComplete, stopCount, this).on(_viewEvents.ViewEvents.WinView.ScoreTweenStart, playCount, this).on(_viewEvents.ViewEvents.WinView.ScoreTweenComplete, stopCount, this).on(_viewEvents.ViewEvents.BetView.ButtonClick, playClick, this).on(_viewEvents.ViewEvents.SpinView.Spin, playClick, this).on(_viewEvents.ViewEvents.SpinView.Stop, playClick, this).on(_viewEvents.ViewEvents.CtaView.PlayClick, playClick, this).on(_viewEvents.ViewEvents.PersistentCtaView.Click, playClick, this).on(_viewEvents.ViewEvents.SoundView.Click, playClick, this);
}

},{"../constants":106,"../events/model-events":111,"../events/view-events":112,"../models/store":156,"@armathai/lego":219}],188:[function(require,module,exports){
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
  _lego.lego.event.on(_modelEvents.ModelEvents.LoadModel.ProgressUpdate, onLoadProgress, this).on(_modelEvents.ModelEvents.LoadModel.CompleteUpdate, onLoadComplete, this).on(_modelEvents.ModelEvents.AdModel.ViewStateUpdate, onViewStateUpdate, this).on(_viewEvents.ViewEvents.PersistentCtaView.Click, clickGo, this).on(_viewEvents.ViewEvents.CtaView.ScreenClick, clickGo, this).on(_viewEvents.ViewEvents.CtaView.PlayClick, clickGo, this).on(_modelEvents.ModelEvents.CtaModel.VisibleUpdate, onCtaVisibleUpdate, this).on(_viewEvents.ViewEvents.Game.UserInteraction, markInteraction, this);
}

},{"../constants":106,"../events/model-events":111,"../events/view-events":112,"../models/store":156,"@armathai/lego":219}],189:[function(require,module,exports){
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

      // @ts-ignore
      this.game.world.handleResize = function (orientation) {
        (0, _utils.manageOrientedTweens)();
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

},{"../constants":106,"../events/view-events":112,"../models/store":156,"../objects/main-view":177,"../utils":202,"@armathai/lego":219}],190:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloaderState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _spineConfigs = require('../configs/spine-configs');

var _layoutUtils = require('../display/layout-utils');

var _layoutUtils2 = _interopRequireDefault(_layoutUtils);

var _viewEvents = require('../events/view-events');

require('../kernel/atlas-rescale');

require('../kernel/multiple-atlas');

var _store = require('../models/store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        spine: [{ name: _spineConfigs.Spines.Frame.Key, scale: 1 }].concat(_toConsumableArray(_spineConfigs.SlotSpineMap.map(function (key) {
          return { name: key, scale: 1 };
        })))
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

},{"../configs/spine-configs":103,"../display/layout-utils":108,"../events/view-events":112,"../kernel/atlas-rescale":137,"../kernel/multiple-atlas":139,"../models/store":156,"@armathai/lego":219}],191:[function(require,module,exports){
'use strict';

localization.registerStrings({
  'Spin to earn your prize!': {
    en: 'Spin to earn your prize!'
  },
  'Spin and test your luck!': {
    en: 'Spin and test your luck!'
  },
  "You're so close to the jackpot! Spin and test your luck!": {
    en: "You're so close to the jackpot!\nSpin and test your luck!"
  },
  'Stop to earn your prize!': {
    en: 'Stop to earn your prize!'
  },
  'Stop and test your luck!': {
    en: 'Stop and test your luck!'
  },
  "You're so close to the jackpot! Stop and test your luck!": {
    en: "You're so close to the jackpot!\nStop and test your luck!"
  },
  tutorial_text_2: {
    en: 'You won {{0}} free spins!!!'
  },
  big_win: {
    en: 'BIG WIN'
  },
  free_spins: {
    en: 'FREE SPINS'
  },
  'GET MORE REWARDS': {
    en: 'GET MORE\nREWARDS!'
  },
  'Download Now': {
    en: 'Download Now'
  },
  'Play Now': {
    en: 'Play Now'
  },
  Play: {
    en: 'Play'
  },
  Download: {
    en: 'Download'
  },
  Continue: {
    en: 'Continue'
  },
  'Collect Reward': {
    en: 'Collect Reward'
  },
  cta_btn_persistent_text: {
    en: 'DOWNLOAD NOW'
  },
  win: {
    en: 'Win'
  },
  bet: {
    en: 'Bet'
  },
  spin: {
    en: 'SPIN'
  },
  stop: {
    en: 'STOP'
  }
});

},{}],192:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var last = exports.last = function last(arr) {
  return arr.slice(-1)[0];
};

},{}],193:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sample = exports.sample = function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

},{}],194:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = undefined;

var _randomInt = require('../number/random-int');

var shuffle = exports.shuffle = function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i -= 1) {
    var j = (0, _randomInt.randomInt)(0, i);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

},{"../number/random-int":204}],195:[function(require,module,exports){
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
exports.FreeSpinButton = exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('..');

var _abstractButton = require('./abstract-button');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable max-classes-per-file */


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
          label = config.label;

      // FRAME

      var bgObj = bg.width && bg.height ? (0, _.makeNinePatch)(bg) : (0, _.makeImage)(bg);
      state.add(bgObj);

      // LABEL
      if (label) {
        var labelObj = (0, _.makeText)(label);
        labelObj.anchor.set(0.5);
        state.add(labelObj);

        (0, _.fitText)(labelObj, bgObj.width * 0.8, bgObj.height * 0.8);
      }

      return this.add(state);
    }
  }]);

  return Button;
}(_abstractButton.AbstractButton);

var FreeSpinButton = exports.FreeSpinButton = function (_AbstractButton2) {
  _inherits(FreeSpinButton, _AbstractButton2);

  function FreeSpinButton() {
    _classCallCheck(this, FreeSpinButton);

    return _possibleConstructorReturn(this, (FreeSpinButton.__proto__ || Object.getPrototypeOf(FreeSpinButton)).apply(this, arguments));
  }

  _createClass(FreeSpinButton, [{
    key: 'setText',
    value: function setText(value) {
      // @ts-ignore
      this.states.up.countLabel.setText(value);
      // @ts-ignore
      this.states.down.countLabel.setText(value);
      // @ts-ignore
      this.states.disable.countLabel.setText(value);
    }
  }, {
    key: 'createState',
    value: function createState(config) {
      var state = new Phaser.Group(this.game);

      var bg = config.bg,
          label = config.label,
          count = config.count;

      // FRAME

      var bgObj = bg.width && bg.height ? (0, _.makeNinePatch)(bg) : (0, _.makeImage)(bg);
      bgObj.anchor.set(0.5);

      var labelObj = (0, _.makeText)(label);
      labelObj.anchor.set(0.5);
      labelObj.y += 15;

      var countObj = (0, _.makeText)(count);
      countObj.anchor.set(0.5);
      countObj.y -= 9;

      state.add(bgObj);
      state.add(labelObj);
      state.add(countObj);

      // @ts-ignore
      state.countLabel = countObj;

      (0, _.fitText)(labelObj, bgObj.width * 0.9, bgObj.height * 0.9);

      return this.add(state);
    }
  }]);

  return FreeSpinButton;
}(_abstractButton.AbstractButton);

},{"..":202,"./abstract-button":195}],197:[function(require,module,exports){
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
      // @ts-ignore
      gr.input.name = name;
      gr.name = name;
      gr.input.priorityID = priority;
      gr.events.onInputDown.add(this.onDown, this);
      gr.events.onInputUp.add(this.onUp, this);
      gr.events.onInputOver.add(this.onOver, this);
      gr.centerX = this.centerX;
      gr.centerY = this.centerY;

      this.add(gr);

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

},{"@armathai/lego":219,"@armathai/phaser2-grid":224}],199:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-underscore-dangle */
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

var CoinFallEmitter = exports.CoinFallEmitter = function (_Phaser$Group) {
  _inherits(CoinFallEmitter, _Phaser$Group);

  function CoinFallEmitter(config) {
    _classCallCheck(this, CoinFallEmitter);

    var _this = _possibleConstructorReturn(this, (CoinFallEmitter.__proto__ || Object.getPrototypeOf(CoinFallEmitter)).call(this, CI_API.game));

    _this._config = config;
    _this._particles = [];
    _this._events = [];
    _this._fps = 60;
    return _this;
  }

  _createClass(CoinFallEmitter, [{
    key: "_onFocus",
    value: function _onFocus() {
      if (!this.game) {
        return;
      }

      this.stop();
      this.emit();
    }
  }, {
    key: "emit",
    value: function emit() {
      this.game.onFocus.remove(this._onFocus, this);
      this.game.onFocus.add(this._onFocus, this);

      var _config = this._config,
          count = _config.count,
          delay = _config.delay;


      for (var i = 0; i < count; i += 1) {
        var dt = getRandom(delay.min, delay.max);
        var spawnEvent = this.game.time.events.add(dt, this._spawn, this);
        this._events.push(spawnEvent);
      }
    }
  }, {
    key: "stop",
    value: function stop(removeActives) {
      var _this2 = this;

      this.game.onFocus.remove(this._onFocus, this);

      this._events.forEach(function (e) {
        return _this2.game.time.events.remove(e);
      });

      if (removeActives) {
        this._particles.forEach(function (p) {
          return p.destroy();
        });
        this._particles = [];
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      _get(CoinFallEmitter.prototype.__proto__ || Object.getPrototypeOf(CoinFallEmitter.prototype), "update", this).call(this);

      this._particles.forEach(function (p) {
        p.__velocity__.x += _this3._config.gravity.x;
        p.__velocity__.y += _this3._config.gravity.y;
        p.x += p.__velocity__.x / _this3._fps;
        p.y += p.__velocity__.y / _this3._fps;
        p.rotation += p.__rotation__ / _this3._fps;
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop(true);
      _get(CoinFallEmitter.prototype.__proto__ || Object.getPrototypeOf(CoinFallEmitter.prototype), "destroy", this).call(this);
    }
  }, {
    key: "_spawn",
    value: function _spawn() {
      var _config2 = this._config,
          particleClass = _config2.particleClass,
          velocity = _config2.velocity,
          area = _config2.area,
          duration = _config2.duration,
          scale = _config2.scale,
          rotation = _config2.rotation,
          repeat = _config2.repeat;


      var velX = getRandom(velocity.x.min, velocity.x.max);
      var velY = getRandom(velocity.y.min, velocity.y.max);
      var sc = getRandom(scale.min, scale.max);
      var rt = getRandom(rotation.min, rotation.max);
      var dt = getRandom(duration.min, duration.max);

      var _area$shape$random = area.shape.random(),
          posX = _area$shape$random.x,
          posY = _area$shape$random.y;

      var config = {
        velocity: { x: velX, y: velY },
        rotation: rt
      };

      // eslint-disable-next-line new-cap
      var p = new particleClass(config);
      p.position.set(posX, posY);
      p.scale.set(sc);
      p.rotation = rt;
      p.onEmit();

      var killEvent = this.game.time.events.add(dt, this._kill, this, p, repeat);

      this._events.push(killEvent);
      this._particles.push(p);
      this.addChild(p);
    }
  }, {
    key: "_kill",
    value: function _kill(particle, revive) {
      this._particles.splice(this._particles.indexOf(particle), 1);
      particle.destroy();

      if (revive) {
        this._spawn();
      }
    }
  }]);

  return CoinFallEmitter;
}(Phaser.Group);

},{}],200:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoinFallParticle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationConfigs = require('../../../configs/animation-configs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable max-classes-per-file */

var Particle = function (_Phaser$Sprite) {
  _inherits(Particle, _Phaser$Sprite);

  function Particle(config) {
    _classCallCheck(this, Particle);

    var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this, CI_API.game, 0, 0, '', ''));

    var velocity = config.velocity,
        rotation = config.rotation;

    _this.__velocity__ = velocity;
    _this.__rotation__ = rotation;

    _this.anchor.set(0.5);
    return _this;
  }

  // eslint-disable-next-line class-methods-use-this


  _createClass(Particle, [{
    key: 'onEmit',
    value: function onEmit() {}
  }]);

  return Particle;
}(Phaser.Sprite);

var CoinFallParticle = exports.CoinFallParticle = function (_Particle) {
  _inherits(CoinFallParticle, _Particle);

  function CoinFallParticle(config) {
    _classCallCheck(this, CoinFallParticle);

    var _this2 = _possibleConstructorReturn(this, (CoinFallParticle.__proto__ || Object.getPrototypeOf(CoinFallParticle)).call(this, config));

    _this2._buildAnimation();
    return _this2;
  }

  _createClass(CoinFallParticle, [{
    key: 'onEmit',
    value: function onEmit() {
      this.animations.play('fall');
    }
  }, {
    key: '_buildAnimation',
    value: function _buildAnimation() {
      var _this3 = this;

      (0, _animationConfigs.getCoinFallAnimationConfig)().data.forEach(function (d) {
        var name = d.name,
            prefix = d.prefix,
            start = d.start,
            stop = d.stop,
            suffix = d.suffix,
            zeroPad = d.zeroPad,
            frameRate = d.frameRate,
            loop = d.loop;

        _this3.animations.add(name, Phaser.Animation.generateFrameNames(prefix, start, stop, suffix, zeroPad), frameRate, loop);
      });
    }
  }]);

  return CoinFallParticle;
}(Particle);

},{"../../../configs/animation-configs":86}],201:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SparkleEmitter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('../..');

var _sample = require('../../array/sample');

var _container = require('../../container');

var _randomReal = require('../../number/random-real');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SparkleEmitter = exports.SparkleEmitter = function (_Container) {
  _inherits(SparkleEmitter, _Container);

  function SparkleEmitter() {
    _classCallCheck(this, SparkleEmitter);

    return _possibleConstructorReturn(this, (SparkleEmitter.__proto__ || Object.getPrototypeOf(SparkleEmitter)).apply(this, arguments));
  }

  _createClass(SparkleEmitter, [{
    key: 'emit',
    value: function emit() {
      this.stop();
      this._area = new Phaser.Circle(0, 0, 800);
      this._spawnRunnable = (0, _.loopRunnable)(20, this._spawn, this);
    }
  }, {
    key: 'stop',
    value: function stop() {
      (0, _.removeRunnable)(this._spawnRunnable);
      this.removeChildren();
    }
  }, {
    key: '_spawn',
    value: function _spawn() {
      var frame = (0, _sample.sample)(['circle', 'sparkle']);
      var particle = (0, _.makeImage)({ key: 'effects/' + frame + '.png' });

      var angle = Math.random() * Math.PI * 2;

      var toX = Math.cos(angle) * this._area.radius;
      var toY = Math.sin(angle) * this._area.radius;

      var rnd = (0, _randomReal.randomReal)(0.3, 0.7);
      var fromX = toX * rnd;
      var fromY = toY * rnd;
      var pos = new Phaser.Rectangle(fromX, fromY);
      var scale = (0, _randomReal.randomReal)(0.3, 1);
      particle.position.set(pos.x, pos.y);
      particle.alpha = 0;

      var t1 = this.game.add.tween(particle).to({ rotation: 2 * Math.PI }, 5000, null, true, 0, -1);
      var t2 = this.game.add.tween(particle).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 0, true);
      var t3 = this.game.add.tween(particle.scale).to({ x: scale, y: scale }, 800, null, true, 0, 0, true);
      var t4 = this.game.add.tween(particle).to({ x: toX, y: toY }, 1600, null, true, 0, 0, false);

      t4.onComplete.addOnce(function () {
        particle.destroy();
      });

      // @ts-ignore
      t1.universal = true;
      // @ts-ignore
      t2.universal = true;
      // @ts-ignore
      t3.universal = true;
      // @ts-ignore
      t4.universal = true;

      this.addChild(particle);
    }
  }]);

  return SparkleEmitter;
}(_container.Container);

},{"../..":202,"../../array/sample":193,"../../container":198,"../../number/random-real":205}],202:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePixel = exports.getGameBounds = exports.postRunnable = exports.loopRunnable = exports.removeRunnable = exports.delayRunnable = undefined;
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
exports.manageOrientedTweens = manageOrientedTweens;
exports.makeUniversalTween = makeUniversalTween;
exports.getRelativeScale = getRelativeScale;
exports.getRelativePosition = getRelativePosition;
exports.getRelativeTransform = getRelativeTransform;

var _constants = require('../constants');

var _objectKeys = require('./object/object-keys');

var _universalTween = require('./tween/universal-tween');

function updateTextSize(textGameObject, fontSize) {
  var styleRef = textGameObject.style;
  styleRef.fontSize = fontSize;
  textGameObject.setStyle(styleRef);
} /* eslint-disable no-underscore-dangle */
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

  delayRunnable.apply(undefined, [CI_API.game.time.physicsElapsedMS, runnable, context].concat(args));
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
    // @ts-ignore
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
    gradient.forEach(function (data) {
      var color = data.color,
          percent = data.percent;

      grd.addColorStop(percent, color);
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
      scalingVariant = config.scalingVariant;

  return CI_API.game.add.spine(x, y, key, scalingVariant);
}

function makeAnimation(config) {
  var _config$key = config.key,
      key = _config$key === undefined ? _constants.ASSETS : _config$key,
      _config$x3 = config.x,
      x = _config$x3 === undefined ? 0 : _config$x3,
      _config$y3 = config.y,
      y = _config$y3 === undefined ? 0 : _config$y3,
      data = config.data;

  var animation = CI_API.game.add.sprite(x, y, key);
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
      _config$key2 = config.key,
      key = _config$key2 === undefined ? _constants.ASSETS : _config$key2,
      _config$x4 = config.x,
      x = _config$x4 === undefined ? 0 : _config$x4,
      _config$y4 = config.y,
      y = _config$y4 === undefined ? 0 : _config$y4,
      tint = config.tint,
      _config$scale = config.scale,
      scale = _config$scale === undefined ? { x: 1, y: 1 } : _config$scale,
      _config$anchor = config.anchor,
      anchor = _config$anchor === undefined ? { x: 0.5, y: 0.5 } : _config$anchor;
  var sx = scale.x,
      sy = scale.y;
  var ax = anchor.x,
      ay = anchor.y;


  var img = CI_API.game.make.sprite(x, y, key, frame);

  if (tint) img.tint = tint;
  img.scale.set(sx, sy);
  img.anchor.set(ax, ay);

  return img;
}

function makeNinePatch(config) {
  var frame = config.frame,
      _config$key3 = config.key,
      key = _config$key3 === undefined ? _constants.ASSETS : _config$key3,
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

  var ninePatch = CI_API.game.add.ninePatch(x, y, key, frame, width, height);
  if (tint) ninePatch.tint = tint;
  ninePatch.anchor.set(ax, ay);

  return ninePatch;
}

function makeEmitter(config) {
  var _config$key4 = config.key,
      key = _config$key4 === undefined ? _constants.ASSETS : _config$key4,
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
  return emitter.emit(key, x, y, emitterConfig);
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
  var timeline = tw.timeline,
      target = tw.target;

  tw.stop();
  CI_API.game.tweens.removeFrom(target);

  timeline.forEach(function (tl) {
    // @ts-ignore
    var vEnd = tl.vEnd,
        vStart = tl.vStart,
        yoyo = tl.yoyo;

    var keys = (0, _objectKeys.objectKeys)(vEnd);

    keys.forEach(function (k) {
      target[k] = yoyo ? vStart[k] : vEnd[k];
    });
  });

  tw.onComplete.dispatch();
}

function manageOrientedTweens() {
  var tweens = CI_API.game.tweens.getAll();
  tweens.forEach(function (tw) {
    if (tw instanceof _universalTween.UniversalTween) {
      updateUniversalTweenData(tw);

      return;
    }

    // @ts-ignore
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

},{"../constants":106,"./object/object-keys":206,"./tween/universal-tween":208}],203:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clamp = exports.clamp = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

},{}],204:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 */
var randomInt = exports.randomInt = function randomInt(min, max) {
  var mi = Math.ceil(min);
  var ma = Math.floor(max);
  return Math.floor(Math.random() * (ma - mi + 1)) + mi;
};

},{}],205:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
var randomReal = exports.randomReal = function randomReal(min, max) {
  return Math.random() * (max - min) + min;
};

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizablePhaser2Grid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lego = require('@armathai/lego');

var _phaser2Grid = require('@armathai/phaser2-grid');

var _viewEvents = require('../events/view-events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable class-methods-use-this */


var ResizablePhaser2Grid = exports.ResizablePhaser2Grid = function (_Phaser2Grid) {
  _inherits(ResizablePhaser2Grid, _Phaser2Grid);

  function ResizablePhaser2Grid(game) {
    _classCallCheck(this, ResizablePhaser2Grid);

    var _this = _possibleConstructorReturn(this, (ResizablePhaser2Grid.__proto__ || Object.getPrototypeOf(ResizablePhaser2Grid)).call(this, game));

    _lego.lego.event.on(_viewEvents.ViewEvents.Game.Resize, _this.onResize, _this);
    return _this;
  }

  _createClass(ResizablePhaser2Grid, [{
    key: 'onResize',
    value: function onResize() {
      // @ts-ignore
      this.rebuild(this.getGridConfig());
    }

    // @ts-ignore

  }, {
    key: 'getGridConfig',
    value: function getGridConfig() {
      throw new Error('Method "getGridConfig" is not implement.');
    }
  }]);

  return ResizablePhaser2Grid;
}(_phaser2Grid.Phaser2Grid);

},{"../events/view-events":112,"@armathai/lego":219,"@armathai/phaser2-grid":224}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./Types":210,"./utils/Utils":212,"./utils/geom/Point":213,"./utils/geom/Rect":214}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{"./Cell":209,"./Types":210,"./utils/Utils":212,"./utils/geom/Point":213,"./utils/geom/Rect":214}],212:[function(require,module,exports){
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

},{"../Types":210,"./geom/Point":213,"./geom/Rect":214}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{"./index":219}],216:[function(require,module,exports){
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

},{"./utils/Map":220}],217:[function(require,module,exports){
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

},{"./Command":215,"./Emitter":216,"./Observe":218}],218:[function(require,module,exports){
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

},{"./index":219}],219:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lego_1 = require("./Lego");
var Utils_1 = require("./utils/Utils");
exports.not = Utils_1.not;
exports.lego = new Lego_1.Lego();

},{"./Lego":217,"./utils/Utils":221}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{"./Debugger":222,"@armathai/grid-core":211}],224:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_core_1 = require("@armathai/grid-core");
Object.defineProperty(exports, "CellAlign", { enumerable: true, get: function () { return grid_core_1.CellAlign; } });
Object.defineProperty(exports, "CellScale", { enumerable: true, get: function () { return grid_core_1.CellScale; } });
var Phaser2Grid_1 = require("./Phaser2Grid");
Object.defineProperty(exports, "Phaser2Grid", { enumerable: true, get: function () { return Phaser2Grid_1.Phaser2Grid; } });

},{"./Phaser2Grid":223,"@armathai/grid-core":211}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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

},{"./NinePatch":225}],227:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NinePatch_1 = require("./NinePatch");
Object.defineProperty(exports, "NinePatch", { enumerable: true, get: function () { return NinePatch_1.NinePatch; } });
var NinePatchPlugin_1 = require("./NinePatchPlugin");
Object.defineProperty(exports, "NinePatchPlugin", { enumerable: true, get: function () { return NinePatchPlugin_1.NinePatchPlugin; } });

},{"./NinePatch":225,"./NinePatchPlugin":226}],228:[function(require,module,exports){
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
