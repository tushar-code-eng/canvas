"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/home/page",{

/***/ "(app-pages-browser)/./src/components/DrwaingBoard.tsx":
/*!*****************************************!*\
  !*** ./src/components/DrwaingBoard.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"(app-pages-browser)/./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _features_canvasSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/features/canvasSlice */ \"(app-pages-browser)/./src/features/canvasSlice.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fabric */ \"(app-pages-browser)/./node_modules/fabric/dist/index.min.mjs\");\n/* harmony import */ var _SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SnappingHelpers */ \"(app-pages-browser)/./src/components/SnappingHelpers.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst DrwaingBoard = ()=>{\n    _s();\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);\n    const canvas = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)({\n        \"DrwaingBoard.useSelector[canvas]\": (state)=>state.canvas.value\n    }[\"DrwaingBoard.useSelector[canvas]\"]);\n    const isPanning = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)({\n        \"DrwaingBoard.useSelector[isPanning]\": (state)=>state.panning.isPanning\n    }[\"DrwaingBoard.useSelector[isPanning]\"]);\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();\n    const [isDrawing, setIsDrawing] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [currentShape, setCurrentShape] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [guidelines, setGuidelines] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"DrwaingBoard.useEffect\": ()=>{\n            if (canvasRef.current) {\n                const parentDiv = canvasRef.current.parentElement;\n                const width = parentDiv ? parentDiv.clientWidth : 500;\n                const height = parentDiv ? parentDiv.clientHeight : 500;\n                const initCanvas = new fabric__WEBPACK_IMPORTED_MODULE_5__.Canvas(canvasRef.current, {\n                    width: width,\n                    height: height,\n                    backgroundColor: '#121212'\n                });\n                initCanvas.renderAll();\n                initCanvas.on(\"object:moving\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        (0,_SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__.SnappingHelpers)(initCanvas, event.target, guidelines, setGuidelines);\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"object:modified\", {\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        (0,_SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__.clearGuidelines)(initCanvas);\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                dispatch((0,_features_canvasSlice__WEBPACK_IMPORTED_MODULE_1__.setCanvas)(initCanvas));\n                initCanvas.on(\"mouse:down\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        if (event.e.altKey || isPanning) {\n                            initCanvas.isDragging = true;\n                            initCanvas.selection = false;\n                            initCanvas.lastPosX = event.e.clientX;\n                            initCanvas.lastPosY = event.e.clientY;\n                        }\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:move\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        if (initCanvas.isDragging) {\n                            const vpt = initCanvas.viewportTransform;\n                            vpt[4] += event.e.clientX - initCanvas.lastPosX;\n                            vpt[5] += event.e.clientY - initCanvas.lastPosY;\n                            initCanvas.requestRenderAll();\n                            initCanvas.lastPosX = event.e.clientX;\n                            initCanvas.lastPosY = event.e.clientY;\n                        }\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:up\", {\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        initCanvas.isDragging = false;\n                        initCanvas.selection = true;\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:wheel\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        const delta = event.e.deltaY;\n                        const zoom = initCanvas.getZoom();\n                        const newZoom = zoom * (delta > 0 ? 0.9 : 1.1);\n                        initCanvas.zoomToPoint({\n                            x: event.e.offsetX,\n                            y: event.e.offsetY\n                        }, newZoom);\n                        event.e.preventDefault();\n                        event.e.stopPropagation();\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                return ({\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        initCanvas.dispose();\n                    }\n                })[\"DrwaingBoard.useEffect\"];\n            }\n        }\n    }[\"DrwaingBoard.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n        className: \"w-full h-full\",\n        ref: canvasRef\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Tushar bajaj\\\\OneDrive\\\\Desktop\\\\drawing\\\\src\\\\components\\\\DrwaingBoard.tsx\",\n        lineNumber: 94,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DrwaingBoard, \"2X3t69BYUsmas4ZxAAATtkDFu68=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch\n    ];\n});\n_c = DrwaingBoard;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrwaingBoard);\nvar _c;\n$RefreshReg$(_c, \"DrwaingBoard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0Ryd2FpbmdCb2FyZC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUN1RDtBQUVMO0FBRUU7QUFHUjtBQUV5QjtBQUVyRSxNQUFNUyxlQUFlOztJQUNuQixNQUFNQyxZQUFZTiw2Q0FBTUEsQ0FBMkI7SUFFbkQsTUFBTU8sU0FBU1gsd0RBQVdBOzRDQUFDLENBQUNZLFFBQXFCQSxNQUFNRCxNQUFNLENBQUNFLEtBQUs7O0lBRW5FLE1BQU1DLFlBQVlkLHdEQUFXQTsrQ0FBQyxDQUFDWSxRQUFxQkEsTUFBTUcsT0FBTyxDQUFDRCxTQUFTOztJQUMzRSxNQUFNRSxXQUFXZix3REFBV0E7SUFFNUIsTUFBTSxDQUFDZ0IsV0FBV0MsYUFBYSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNjLGNBQWNDLGdCQUFnQixHQUFHZiwrQ0FBUUEsQ0FBYztJQUU5RCxNQUFNLENBQUNnQixZQUFZQyxjQUFjLEdBQUdqQiwrQ0FBUUEsQ0FBQyxFQUFFO0lBRS9DRixnREFBU0E7a0NBQUM7WUFDUixJQUFJTyxVQUFVYSxPQUFPLEVBQUU7Z0JBQ3JCLE1BQU1DLFlBQVlkLFVBQVVhLE9BQU8sQ0FBQ0UsYUFBYTtnQkFDakQsTUFBTUMsUUFBUUYsWUFBWUEsVUFBVUcsV0FBVyxHQUFHO2dCQUNsRCxNQUFNQyxTQUFTSixZQUFZQSxVQUFVSyxZQUFZLEdBQUc7Z0JBRXBELE1BQU1DLGFBQWtCLElBQUl4QiwwQ0FBTUEsQ0FBQ0ksVUFBVWEsT0FBTyxFQUFFO29CQUNwREcsT0FBT0E7b0JBQ1BFLFFBQVFBO29CQUNSRyxpQkFBaUI7Z0JBQ25CO2dCQUVBRCxXQUFXRSxTQUFTO2dCQUVwQkYsV0FBV0csRUFBRSxDQUFDOzhDQUFpQixDQUFDQzt3QkFDOUIzQixpRUFBZUEsQ0FBQ3VCLFlBQVlJLE1BQU1DLE1BQU0sRUFBRWQsWUFBWUM7b0JBQ3hEOztnQkFFQVEsV0FBV0csRUFBRSxDQUFDOzhDQUFtQjt3QkFDL0J6QixpRUFBZUEsQ0FBQ3NCO29CQUNsQjs7Z0JBRUFkLFNBQVNkLGdFQUFTQSxDQUFDNEI7Z0JBRW5CQSxXQUFXRyxFQUFFLENBQUM7OENBQWMsQ0FBQ0M7d0JBQzNCLElBQUlBLE1BQU1FLENBQUMsQ0FBQ0MsTUFBTSxJQUFJdkIsV0FBVzs0QkFDL0JnQixXQUFXUSxVQUFVLEdBQUc7NEJBQ3hCUixXQUFXUyxTQUFTLEdBQUc7NEJBQ3ZCVCxXQUFXVSxRQUFRLEdBQUdOLE1BQU1FLENBQUMsQ0FBQ0ssT0FBTzs0QkFDckNYLFdBQVdZLFFBQVEsR0FBR1IsTUFBTUUsQ0FBQyxDQUFDTyxPQUFPO3dCQUN2QztvQkFDRjs7Z0JBRUFiLFdBQVdHLEVBQUUsQ0FBQzs4Q0FBYyxDQUFDQzt3QkFDM0IsSUFBSUosV0FBV1EsVUFBVSxFQUFFOzRCQUN6QixNQUFNTSxNQUFNZCxXQUFXZSxpQkFBaUI7NEJBQ3hDRCxHQUFHLENBQUMsRUFBRSxJQUFJVixNQUFNRSxDQUFDLENBQUNLLE9BQU8sR0FBR1gsV0FBV1UsUUFBUTs0QkFDL0NJLEdBQUcsQ0FBQyxFQUFFLElBQUlWLE1BQU1FLENBQUMsQ0FBQ08sT0FBTyxHQUFHYixXQUFXWSxRQUFROzRCQUMvQ1osV0FBV2dCLGdCQUFnQjs0QkFDM0JoQixXQUFXVSxRQUFRLEdBQUdOLE1BQU1FLENBQUMsQ0FBQ0ssT0FBTzs0QkFDckNYLFdBQVdZLFFBQVEsR0FBR1IsTUFBTUUsQ0FBQyxDQUFDTyxPQUFPO3dCQUN2QztvQkFDRjs7Z0JBRUFiLFdBQVdHLEVBQUUsQ0FBQzs4Q0FBWTt3QkFDeEJILFdBQVdRLFVBQVUsR0FBRzt3QkFDeEJSLFdBQVdTLFNBQVMsR0FBRztvQkFDekI7O2dCQUVBVCxXQUFXRyxFQUFFLENBQUM7OENBQWUsQ0FBQ0M7d0JBQzVCLE1BQU1hLFFBQVFiLE1BQU1FLENBQUMsQ0FBQ1ksTUFBTTt3QkFDNUIsTUFBTUMsT0FBT25CLFdBQVdvQixPQUFPO3dCQUMvQixNQUFNQyxVQUFVRixPQUFRRixDQUFBQSxRQUFRLElBQUksTUFBTSxHQUFFO3dCQUM1Q2pCLFdBQVdzQixXQUFXLENBQUM7NEJBQUVDLEdBQUduQixNQUFNRSxDQUFDLENBQUNrQixPQUFPOzRCQUFFQyxHQUFHckIsTUFBTUUsQ0FBQyxDQUFDb0IsT0FBTzt3QkFBQyxHQUFHTDt3QkFDbkVqQixNQUFNRSxDQUFDLENBQUNxQixjQUFjO3dCQUN0QnZCLE1BQU1FLENBQUMsQ0FBQ3NCLGVBQWU7b0JBQ3pCOztnQkFHQTs4Q0FBTzt3QkFDTDVCLFdBQVc2QixPQUFPO29CQUNwQjs7WUFDRjtRQUNGO2lDQUFHLEVBQUU7SUFJTCxxQkFDRSw4REFBQ2hEO1FBQU9pRCxXQUFVO1FBQWdCQyxLQUFLbkQ7Ozs7OztBQUUzQztHQW5GTUQ7O1FBR1dULG9EQUFXQTtRQUVSQSxvREFBV0E7UUFDWkMsb0RBQVdBOzs7S0FOeEJRO0FBcUZOLGlFQUFlQSxZQUFZQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFR1c2hhciBiYWphalxcT25lRHJpdmVcXERlc2t0b3BcXGRyYXdpbmdcXHNyY1xcY29tcG9uZW50c1xcRHJ3YWluZ0JvYXJkLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tICcuLi9zdG9yZS9zdG9yZSc7XHJcbmltcG9ydCB7IHNldENhbnZhcyB9IGZyb20gJ0AvZmVhdHVyZXMvY2FudmFzU2xpY2UnXHJcblxyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBDYW52YXMsIFJlY3QsIExpbmUgfSBmcm9tIFwiZmFicmljXCI7XHJcblxyXG5pbXBvcnQgeyBTbmFwcGluZ0hlbHBlcnMsIGNsZWFyR3VpZGVsaW5lcyB9IGZyb20gJy4vU25hcHBpbmdIZWxwZXJzJztcclxuXHJcbmNvbnN0IERyd2FpbmdCb2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgY2FudmFzID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLmNhbnZhcy52YWx1ZSlcclxuXHJcbiAgY29uc3QgaXNQYW5uaW5nID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLnBhbm5pbmcuaXNQYW5uaW5nKTtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKClcclxuXHJcbiAgY29uc3QgW2lzRHJhd2luZywgc2V0SXNEcmF3aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbY3VycmVudFNoYXBlLCBzZXRDdXJyZW50U2hhcGVdID0gdXNlU3RhdGU8UmVjdCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBbZ3VpZGVsaW5lcywgc2V0R3VpZGVsaW5lc10gPSB1c2VTdGF0ZShbXSlcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChjYW52YXNSZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCBwYXJlbnREaXYgPSBjYW52YXNSZWYuY3VycmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBjb25zdCB3aWR0aCA9IHBhcmVudERpdiA/IHBhcmVudERpdi5jbGllbnRXaWR0aCA6IDUwMDtcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gcGFyZW50RGl2ID8gcGFyZW50RGl2LmNsaWVudEhlaWdodCA6IDUwMDtcclxuXHJcbiAgICAgIGNvbnN0IGluaXRDYW52YXM6IGFueSA9IG5ldyBDYW52YXMoY2FudmFzUmVmLmN1cnJlbnQsIHtcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzEyMTIxMidcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0Q2FudmFzLnJlbmRlckFsbCgpO1xyXG5cclxuICAgICAgaW5pdENhbnZhcy5vbihcIm9iamVjdDptb3ZpbmdcIiwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBTbmFwcGluZ0hlbHBlcnMoaW5pdENhbnZhcywgZXZlbnQudGFyZ2V0LCBndWlkZWxpbmVzLCBzZXRHdWlkZWxpbmVzKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgaW5pdENhbnZhcy5vbihcIm9iamVjdDptb2RpZmllZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJHdWlkZWxpbmVzKGluaXRDYW52YXMpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBkaXNwYXRjaChzZXRDYW52YXMoaW5pdENhbnZhcykpXHJcblxyXG4gICAgICBpbml0Q2FudmFzLm9uKFwibW91c2U6ZG93blwiLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5lLmFsdEtleSB8fCBpc1Bhbm5pbmcpIHtcclxuICAgICAgICAgIGluaXRDYW52YXMuaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLnNlbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgaW5pdENhbnZhcy5sYXN0UG9zWCA9IGV2ZW50LmUuY2xpZW50WDtcclxuICAgICAgICAgIGluaXRDYW52YXMubGFzdFBvc1kgPSBldmVudC5lLmNsaWVudFk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGluaXRDYW52YXMub24oXCJtb3VzZTptb3ZlXCIsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGluaXRDYW52YXMuaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgY29uc3QgdnB0ID0gaW5pdENhbnZhcy52aWV3cG9ydFRyYW5zZm9ybSE7XHJcbiAgICAgICAgICB2cHRbNF0gKz0gZXZlbnQuZS5jbGllbnRYIC0gaW5pdENhbnZhcy5sYXN0UG9zWCE7XHJcbiAgICAgICAgICB2cHRbNV0gKz0gZXZlbnQuZS5jbGllbnRZIC0gaW5pdENhbnZhcy5sYXN0UG9zWSE7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTtcclxuICAgICAgICAgIGluaXRDYW52YXMubGFzdFBvc1ggPSBldmVudC5lLmNsaWVudFg7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLmxhc3RQb3NZID0gZXZlbnQuZS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0Q2FudmFzLm9uKFwibW91c2U6dXBcIiwgKCkgPT4ge1xyXG4gICAgICAgIGluaXRDYW52YXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgIGluaXRDYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0Q2FudmFzLm9uKFwibW91c2U6d2hlZWxcIiwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBkZWx0YSA9IGV2ZW50LmUuZGVsdGFZO1xyXG4gICAgICAgIGNvbnN0IHpvb20gPSBpbml0Q2FudmFzLmdldFpvb20oKTtcclxuICAgICAgICBjb25zdCBuZXdab29tID0gem9vbSAqIChkZWx0YSA+IDAgPyAwLjkgOiAxLjEpO1xyXG4gICAgICAgIGluaXRDYW52YXMuem9vbVRvUG9pbnQoeyB4OiBldmVudC5lLm9mZnNldFgsIHk6IGV2ZW50LmUub2Zmc2V0WSB9LCBuZXdab29tKTtcclxuICAgICAgICBldmVudC5lLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBpbml0Q2FudmFzLmRpc3Bvc2UoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LCBbXSk7XHJcblxyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxjYW52YXMgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbFwiIHJlZj17Y2FudmFzUmVmfSAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcndhaW5nQm9hcmQ7XHJcbiJdLCJuYW1lcyI6WyJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwic2V0Q2FudmFzIiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJDYW52YXMiLCJTbmFwcGluZ0hlbHBlcnMiLCJjbGVhckd1aWRlbGluZXMiLCJEcndhaW5nQm9hcmQiLCJjYW52YXNSZWYiLCJjYW52YXMiLCJzdGF0ZSIsInZhbHVlIiwiaXNQYW5uaW5nIiwicGFubmluZyIsImRpc3BhdGNoIiwiaXNEcmF3aW5nIiwic2V0SXNEcmF3aW5nIiwiY3VycmVudFNoYXBlIiwic2V0Q3VycmVudFNoYXBlIiwiZ3VpZGVsaW5lcyIsInNldEd1aWRlbGluZXMiLCJjdXJyZW50IiwicGFyZW50RGl2IiwicGFyZW50RWxlbWVudCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJoZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJpbml0Q2FudmFzIiwiYmFja2dyb3VuZENvbG9yIiwicmVuZGVyQWxsIiwib24iLCJldmVudCIsInRhcmdldCIsImUiLCJhbHRLZXkiLCJpc0RyYWdnaW5nIiwic2VsZWN0aW9uIiwibGFzdFBvc1giLCJjbGllbnRYIiwibGFzdFBvc1kiLCJjbGllbnRZIiwidnB0Iiwidmlld3BvcnRUcmFuc2Zvcm0iLCJyZXF1ZXN0UmVuZGVyQWxsIiwiZGVsdGEiLCJkZWx0YVkiLCJ6b29tIiwiZ2V0Wm9vbSIsIm5ld1pvb20iLCJ6b29tVG9Qb2ludCIsIngiLCJvZmZzZXRYIiwieSIsIm9mZnNldFkiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImRpc3Bvc2UiLCJjbGFzc05hbWUiLCJyZWYiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/DrwaingBoard.tsx\n"));

/***/ })

});