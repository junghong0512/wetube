/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./assets/scss/styles.scss\");\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _videoPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videoPlayer */ \"./assets/js/videoPlayer.js\");\n/* harmony import */ var _videoPlayer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videoPlayer__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/videoPlayer.js":
/*!**********************************!*\
  !*** ./assets/js/videoPlayer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var videoContainer = document.getElementById(\"jsVideoPlayer\");\nvar videoPlayer = document.querySelector(\"#jsVideoPlayer video\");\nvar playBtn = document.getElementById(\"jsPlayBtn\");\nvar volumeBtn = document.getElementById(\"jsVolumeBtn\");\nvar fullScrnBtn = document.getElementById(\"jsFullScrnBtn\");\nvar currentTime = document.getElementById(\"jsCurrentTime\");\nvar totalTime = document.getElementById(\"jsTotalTime\");\n\nfunction handlePlayClick() {\n  if (videoPlayer.paused) {\n    videoPlayer.play();\n    playBtn.innerHTML = '<i class=\"fas fa-pause\"></i>';\n  } else {\n    videoPlayer.pause();\n    playBtn.innerHTML = '<i class=\"fas fa-play\"></i>';\n  }\n}\n\nfunction handleVolumeClick() {\n  if (videoPlayer.muted) {\n    videoPlayer.muted = false;\n    volumeBtn.innerHTML = '<i class=\"fas fa-volume-up\"></i>';\n  } else {\n    videoPlayer.muted = true;\n    volumeBtn.innerHTML = '<i class=\"fas fa-volume-mute\"></i>';\n  }\n}\n\nfunction exitFullScreen() {\n  fullScrnBtn.innerHTML = '<i class=\"fas fa-expand\"></i>';\n  fullScrnBtn.addEventListener(\"click\", goFullScreen);\n\n  if (document.exitFullscreen) {\n    document.exitFullscreen();\n  } else if (document.mozCancelFullScreen) {\n    document.mozCancelFullScreen();\n  } else if (document.msExitFullScreen) {\n    document.msExitFullScreen();\n  }\n}\n\nfunction goFullScreen() {\n  if (videoContainer.requestFullscreen) {\n    videoContainer.requestFullscreen();\n  } else if (videoContainer.mozRequestFullScreen) {\n    videoContainer.mozRequestFullScreen();\n  } else if (videoContainer.msRequestFullScreen) {\n    videoContainer.msRequestFullScreen();\n  }\n\n  fullScrnBtn.innerHTML = '<i class=\"fas fa-compress\"></i>';\n  fullScrnBtn.removeEventListener(\"click\", goFullScreen);\n  fullScrnBtn.addEventListener(\"click\", exitFullScreen);\n}\n\nvar formatDate = function formatDate(seconds) {\n  var secondsNumber = parseInt(seconds, 10);\n  var hours = Math.floor(secondsNumber / 3600);\n  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);\n  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;\n\n  if (hours < 10) {\n    hours = \"0\".concat(hours);\n  }\n\n  if (minutes < 10) {\n    minutes = \"0\".concat(minutes);\n  }\n\n  if (totalSeconds < 10) {\n    totalSeconds = \"0\".concat(totalSeconds);\n  }\n\n  return \"\".concat(hours, \":\").concat(minutes, \":\").concat(totalSeconds);\n};\n\nfunction getCurrentTime() {\n  currentTime.innerHTML = formatDate(videoPlayer.currentTime);\n}\n\nfunction setTotalTime() {\n  var totalTimeString = formatDate(videoPlayer.duration);\n  totalTime.innerHTML = totalTimeString;\n  setInterval(getCurrentTime, 1000);\n}\n\nfunction init() {\n  playBtn.addEventListener(\"click\", handlePlayClick);\n  volumeBtn.addEventListener(\"click\", handleVolumeClick);\n  fullScrnBtn.addEventListener(\"click\", goFullScreen);\n  videoPlayer.addEventListener(\"loadedmetadata\", setTotalTime);\n}\n\nif (videoContainer) {\n  init();\n}\n\n//# sourceURL=webpack:///./assets/js/videoPlayer.js?");

/***/ }),

/***/ "./assets/scss/styles.scss":
/*!*********************************!*\
  !*** ./assets/scss/styles.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./assets/scss/styles.scss?");

/***/ })

/******/ });