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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"(app-pages-browser)/./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _features_canvasSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/features/canvasSlice */ \"(app-pages-browser)/./src/features/canvasSlice.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fabric */ \"(app-pages-browser)/./node_modules/fabric/dist/index.min.mjs\");\n/* harmony import */ var _SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SnappingHelpers */ \"(app-pages-browser)/./src/components/SnappingHelpers.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst DrwaingBoard = ()=>{\n    _s();\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);\n    const canvas = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)({\n        \"DrwaingBoard.useSelector[canvas]\": (state)=>state.canvas.value\n    }[\"DrwaingBoard.useSelector[canvas]\"]);\n    const isPanning = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)({\n        \"DrwaingBoard.useSelector[isPanning]\": (state)=>state.panning.isPanning\n    }[\"DrwaingBoard.useSelector[isPanning]\"]);\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();\n    const [isDrawing, setIsDrawing] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [currentShape, setCurrentShape] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [guidelines, setGuidelines] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)({\n        \"DrwaingBoard.useEffect\": ()=>{\n            if (canvasRef.current) {\n                var _canvasRef_current;\n                const parentDiv = (_canvasRef_current = canvasRef.current) === null || _canvasRef_current === void 0 ? void 0 : _canvasRef_current.parentElement;\n                const width = parentDiv ? parentDiv.clientWidth : 500;\n                const height = parentDiv ? parentDiv.clientHeight : 500;\n                const initCanvas = new fabric__WEBPACK_IMPORTED_MODULE_5__.Canvas(canvasRef.current, {\n                    width: width,\n                    height: height,\n                    backgroundColor: '#121212'\n                });\n                initCanvas.renderAll();\n                initCanvas.on(\"object:moving\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        (0,_SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__.SnappingHelpers)(initCanvas, event.target, guidelines, setGuidelines);\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"object:modified\", {\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        (0,_SnappingHelpers__WEBPACK_IMPORTED_MODULE_3__.clearGuidelines)(initCanvas);\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                dispatch((0,_features_canvasSlice__WEBPACK_IMPORTED_MODULE_1__.setCanvas)(initCanvas));\n                initCanvas.on(\"mouse:down\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        if (event.e.altKey || isPanning) {\n                            initCanvas.isDragging = true;\n                            initCanvas.selection = false;\n                            initCanvas.lastPosX = event.e.clientX;\n                            initCanvas.lastPosY = event.e.clientY;\n                        }\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:move\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        if (initCanvas.isDragging) {\n                            const vpt = initCanvas.viewportTransform;\n                            vpt[4] += event.e.clientX - initCanvas.lastPosX;\n                            vpt[5] += event.e.clientY - initCanvas.lastPosY;\n                            initCanvas.requestRenderAll();\n                            initCanvas.lastPosX = event.e.clientX;\n                            initCanvas.lastPosY = event.e.clientY;\n                        }\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:up\", {\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        initCanvas.isDragging = false;\n                        initCanvas.selection = true;\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                initCanvas.on(\"mouse:wheel\", {\n                    \"DrwaingBoard.useEffect\": (event)=>{\n                        const delta = event.e.deltaY;\n                        const zoom = initCanvas.getZoom();\n                        const newZoom = zoom * (delta > 0 ? 0.9 : 1.1);\n                        initCanvas.zoomToPoint({\n                            x: event.e.offsetX,\n                            y: event.e.offsetY\n                        }, newZoom);\n                        event.e.preventDefault();\n                        event.e.stopPropagation();\n                    }\n                }[\"DrwaingBoard.useEffect\"]);\n                return ({\n                    \"DrwaingBoard.useEffect\": ()=>{\n                        initCanvas.dispose();\n                    }\n                })[\"DrwaingBoard.useEffect\"];\n            }\n        }\n    }[\"DrwaingBoard.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n        className: \"w-full h-full\",\n        ref: canvasRef\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Tushar bajaj\\\\OneDrive\\\\Desktop\\\\drawing\\\\src\\\\components\\\\DrwaingBoard.tsx\",\n        lineNumber: 94,\n        columnNumber: 5\n    }, undefined);\n};\n_s(DrwaingBoard, \"2X3t69BYUsmas4ZxAAATtkDFu68=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch\n    ];\n});\n_c = DrwaingBoard;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrwaingBoard);\nvar _c;\n$RefreshReg$(_c, \"DrwaingBoard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0Ryd2FpbmdCb2FyZC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUN1RDtBQUVMO0FBRUU7QUFHUjtBQUV5QjtBQUVyRSxNQUFNUyxlQUFlOztJQUNuQixNQUFNQyxZQUFZTiw2Q0FBTUEsQ0FBQztJQUV6QixNQUFNTyxTQUFTWCx3REFBV0E7NENBQUMsQ0FBQ1ksUUFBcUJBLE1BQU1ELE1BQU0sQ0FBQ0UsS0FBSzs7SUFFbkUsTUFBTUMsWUFBWWQsd0RBQVdBOytDQUFDLENBQUNZLFFBQXFCQSxNQUFNRyxPQUFPLENBQUNELFNBQVM7O0lBQzNFLE1BQU1FLFdBQVdmLHdEQUFXQTtJQUU1QixNQUFNLENBQUNnQixXQUFXQyxhQUFhLEdBQUdiLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ2MsY0FBY0MsZ0JBQWdCLEdBQUdmLCtDQUFRQSxDQUFjO0lBRTlELE1BQU0sQ0FBQ2dCLFlBQVlDLGNBQWMsR0FBR2pCLCtDQUFRQSxDQUFDLEVBQUU7SUFFL0NGLGdEQUFTQTtrQ0FBQztZQUNSLElBQUlPLFVBQVVhLE9BQU8sRUFBRTtvQkFDSGI7Z0JBQWxCLE1BQU1jLGFBQVlkLHFCQUFBQSxVQUFVYSxPQUFPLGNBQWpCYix5Q0FBQUEsbUJBQW1CZSxhQUFhO2dCQUNsRCxNQUFNQyxRQUFRRixZQUFZQSxVQUFVRyxXQUFXLEdBQUc7Z0JBQ2xELE1BQU1DLFNBQVNKLFlBQVlBLFVBQVVLLFlBQVksR0FBRztnQkFFcEQsTUFBTUMsYUFBa0IsSUFBSXhCLDBDQUFNQSxDQUFDSSxVQUFVYSxPQUFPLEVBQUU7b0JBQ3BERyxPQUFPQTtvQkFDUEUsUUFBUUE7b0JBQ1JHLGlCQUFpQjtnQkFDbkI7Z0JBRUFELFdBQVdFLFNBQVM7Z0JBRXBCRixXQUFXRyxFQUFFLENBQUM7OENBQWlCLENBQUNDO3dCQUM5QjNCLGlFQUFlQSxDQUFDdUIsWUFBWUksTUFBTUMsTUFBTSxFQUFFZCxZQUFZQztvQkFDeEQ7O2dCQUVBUSxXQUFXRyxFQUFFLENBQUM7OENBQW1CO3dCQUMvQnpCLGlFQUFlQSxDQUFDc0I7b0JBQ2xCOztnQkFFQWQsU0FBU2QsZ0VBQVNBLENBQUM0QjtnQkFFbkJBLFdBQVdHLEVBQUUsQ0FBQzs4Q0FBYyxDQUFDQzt3QkFDM0IsSUFBSUEsTUFBTUUsQ0FBQyxDQUFDQyxNQUFNLElBQUl2QixXQUFXOzRCQUMvQmdCLFdBQVdRLFVBQVUsR0FBRzs0QkFDeEJSLFdBQVdTLFNBQVMsR0FBRzs0QkFDdkJULFdBQVdVLFFBQVEsR0FBR04sTUFBTUUsQ0FBQyxDQUFDSyxPQUFPOzRCQUNyQ1gsV0FBV1ksUUFBUSxHQUFHUixNQUFNRSxDQUFDLENBQUNPLE9BQU87d0JBQ3ZDO29CQUNGOztnQkFFQWIsV0FBV0csRUFBRSxDQUFDOzhDQUFjLENBQUNDO3dCQUMzQixJQUFJSixXQUFXUSxVQUFVLEVBQUU7NEJBQ3pCLE1BQU1NLE1BQU1kLFdBQVdlLGlCQUFpQjs0QkFDeENELEdBQUcsQ0FBQyxFQUFFLElBQUlWLE1BQU1FLENBQUMsQ0FBQ0ssT0FBTyxHQUFHWCxXQUFXVSxRQUFROzRCQUMvQ0ksR0FBRyxDQUFDLEVBQUUsSUFBSVYsTUFBTUUsQ0FBQyxDQUFDTyxPQUFPLEdBQUdiLFdBQVdZLFFBQVE7NEJBQy9DWixXQUFXZ0IsZ0JBQWdCOzRCQUMzQmhCLFdBQVdVLFFBQVEsR0FBR04sTUFBTUUsQ0FBQyxDQUFDSyxPQUFPOzRCQUNyQ1gsV0FBV1ksUUFBUSxHQUFHUixNQUFNRSxDQUFDLENBQUNPLE9BQU87d0JBQ3ZDO29CQUNGOztnQkFFQWIsV0FBV0csRUFBRSxDQUFDOzhDQUFZO3dCQUN4QkgsV0FBV1EsVUFBVSxHQUFHO3dCQUN4QlIsV0FBV1MsU0FBUyxHQUFHO29CQUN6Qjs7Z0JBRUFULFdBQVdHLEVBQUUsQ0FBQzs4Q0FBZSxDQUFDQzt3QkFDNUIsTUFBTWEsUUFBUWIsTUFBTUUsQ0FBQyxDQUFDWSxNQUFNO3dCQUM1QixNQUFNQyxPQUFPbkIsV0FBV29CLE9BQU87d0JBQy9CLE1BQU1DLFVBQVVGLE9BQVFGLENBQUFBLFFBQVEsSUFBSSxNQUFNLEdBQUU7d0JBQzVDakIsV0FBV3NCLFdBQVcsQ0FBQzs0QkFBRUMsR0FBR25CLE1BQU1FLENBQUMsQ0FBQ2tCLE9BQU87NEJBQUVDLEdBQUdyQixNQUFNRSxDQUFDLENBQUNvQixPQUFPO3dCQUFDLEdBQUdMO3dCQUNuRWpCLE1BQU1FLENBQUMsQ0FBQ3FCLGNBQWM7d0JBQ3RCdkIsTUFBTUUsQ0FBQyxDQUFDc0IsZUFBZTtvQkFDekI7O2dCQUdBOzhDQUFPO3dCQUNMNUIsV0FBVzZCLE9BQU87b0JBQ3BCOztZQUNGO1FBQ0Y7aUNBQUcsRUFBRTtJQUlMLHFCQUNFLDhEQUFDaEQ7UUFBT2lELFdBQVU7UUFBZ0JDLEtBQUtuRDs7Ozs7O0FBRTNDO0dBbkZNRDs7UUFHV1Qsb0RBQVdBO1FBRVJBLG9EQUFXQTtRQUNaQyxvREFBV0E7OztLQU54QlE7QUFxRk4saUVBQWVBLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVHVzaGFyIGJhamFqXFxPbmVEcml2ZVxcRGVza3RvcFxcZHJhd2luZ1xcc3JjXFxjb21wb25lbnRzXFxEcndhaW5nQm9hcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4uL3N0b3JlL3N0b3JlJztcclxuaW1wb3J0IHsgc2V0Q2FudmFzIH0gZnJvbSAnQC9mZWF0dXJlcy9jYW52YXNTbGljZSdcclxuXHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuXHJcbmltcG9ydCB7IENhbnZhcywgUmVjdCwgTGluZSB9IGZyb20gXCJmYWJyaWNcIjtcclxuXHJcbmltcG9ydCB7IFNuYXBwaW5nSGVscGVycywgY2xlYXJHdWlkZWxpbmVzIH0gZnJvbSAnLi9TbmFwcGluZ0hlbHBlcnMnO1xyXG5cclxuY29uc3QgRHJ3YWluZ0JvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgY2FudmFzID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLmNhbnZhcy52YWx1ZSlcclxuXHJcbiAgY29uc3QgaXNQYW5uaW5nID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLnBhbm5pbmcuaXNQYW5uaW5nKTtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKClcclxuXHJcbiAgY29uc3QgW2lzRHJhd2luZywgc2V0SXNEcmF3aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbY3VycmVudFNoYXBlLCBzZXRDdXJyZW50U2hhcGVdID0gdXNlU3RhdGU8UmVjdCB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBbZ3VpZGVsaW5lcywgc2V0R3VpZGVsaW5lc10gPSB1c2VTdGF0ZShbXSlcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChjYW52YXNSZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCBwYXJlbnREaXYgPSBjYW52YXNSZWYuY3VycmVudD8ucGFyZW50RWxlbWVudDtcclxuICAgICAgY29uc3Qgd2lkdGggPSBwYXJlbnREaXYgPyBwYXJlbnREaXYuY2xpZW50V2lkdGggOiA1MDA7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IHBhcmVudERpdiA/IHBhcmVudERpdi5jbGllbnRIZWlnaHQgOiA1MDA7XHJcblxyXG4gICAgICBjb25zdCBpbml0Q2FudmFzOiBhbnkgPSBuZXcgQ2FudmFzKGNhbnZhc1JlZi5jdXJyZW50LCB7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMxMjEyMTInXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaW5pdENhbnZhcy5yZW5kZXJBbGwoKTtcclxuXHJcbiAgICAgIGluaXRDYW52YXMub24oXCJvYmplY3Q6bW92aW5nXCIsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgU25hcHBpbmdIZWxwZXJzKGluaXRDYW52YXMsIGV2ZW50LnRhcmdldCwgZ3VpZGVsaW5lcywgc2V0R3VpZGVsaW5lcylcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGluaXRDYW52YXMub24oXCJvYmplY3Q6bW9kaWZpZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyR3VpZGVsaW5lcyhpbml0Q2FudmFzKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgZGlzcGF0Y2goc2V0Q2FudmFzKGluaXRDYW52YXMpKVxyXG5cclxuICAgICAgaW5pdENhbnZhcy5vbihcIm1vdXNlOmRvd25cIiwgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQuZS5hbHRLZXkgfHwgaXNQYW5uaW5nKSB7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLmlzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgaW5pdENhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgIGluaXRDYW52YXMubGFzdFBvc1ggPSBldmVudC5lLmNsaWVudFg7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLmxhc3RQb3NZID0gZXZlbnQuZS5jbGllbnRZO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpbml0Q2FudmFzLm9uKFwibW91c2U6bW92ZVwiLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChpbml0Q2FudmFzLmlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgIGNvbnN0IHZwdCA9IGluaXRDYW52YXMudmlld3BvcnRUcmFuc2Zvcm0hO1xyXG4gICAgICAgICAgdnB0WzRdICs9IGV2ZW50LmUuY2xpZW50WCAtIGluaXRDYW52YXMubGFzdFBvc1ghO1xyXG4gICAgICAgICAgdnB0WzVdICs9IGV2ZW50LmUuY2xpZW50WSAtIGluaXRDYW52YXMubGFzdFBvc1khO1xyXG4gICAgICAgICAgaW5pdENhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7XHJcbiAgICAgICAgICBpbml0Q2FudmFzLmxhc3RQb3NYID0gZXZlbnQuZS5jbGllbnRYO1xyXG4gICAgICAgICAgaW5pdENhbnZhcy5sYXN0UG9zWSA9IGV2ZW50LmUuY2xpZW50WTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaW5pdENhbnZhcy5vbihcIm1vdXNlOnVwXCIsICgpID0+IHtcclxuICAgICAgICBpbml0Q2FudmFzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICBpbml0Q2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaW5pdENhbnZhcy5vbihcIm1vdXNlOndoZWVsXCIsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSBldmVudC5lLmRlbHRhWTtcclxuICAgICAgICBjb25zdCB6b29tID0gaW5pdENhbnZhcy5nZXRab29tKCk7XHJcbiAgICAgICAgY29uc3QgbmV3Wm9vbSA9IHpvb20gKiAoZGVsdGEgPiAwID8gMC45IDogMS4xKTtcclxuICAgICAgICBpbml0Q2FudmFzLnpvb21Ub1BvaW50KHsgeDogZXZlbnQuZS5vZmZzZXRYLCB5OiBldmVudC5lLm9mZnNldFkgfSwgbmV3Wm9vbSk7XHJcbiAgICAgICAgZXZlbnQuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGV2ZW50LmUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgaW5pdENhbnZhcy5kaXNwb3NlKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Y2FudmFzIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIiByZWY9e2NhbnZhc1JlZn0gLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJ3YWluZ0JvYXJkO1xyXG4iXSwibmFtZXMiOlsidXNlU2VsZWN0b3IiLCJ1c2VEaXNwYXRjaCIsInNldENhbnZhcyIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiQ2FudmFzIiwiU25hcHBpbmdIZWxwZXJzIiwiY2xlYXJHdWlkZWxpbmVzIiwiRHJ3YWluZ0JvYXJkIiwiY2FudmFzUmVmIiwiY2FudmFzIiwic3RhdGUiLCJ2YWx1ZSIsImlzUGFubmluZyIsInBhbm5pbmciLCJkaXNwYXRjaCIsImlzRHJhd2luZyIsInNldElzRHJhd2luZyIsImN1cnJlbnRTaGFwZSIsInNldEN1cnJlbnRTaGFwZSIsImd1aWRlbGluZXMiLCJzZXRHdWlkZWxpbmVzIiwiY3VycmVudCIsInBhcmVudERpdiIsInBhcmVudEVsZW1lbnQiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5pdENhbnZhcyIsImJhY2tncm91bmRDb2xvciIsInJlbmRlckFsbCIsIm9uIiwiZXZlbnQiLCJ0YXJnZXQiLCJlIiwiYWx0S2V5IiwiaXNEcmFnZ2luZyIsInNlbGVjdGlvbiIsImxhc3RQb3NYIiwiY2xpZW50WCIsImxhc3RQb3NZIiwiY2xpZW50WSIsInZwdCIsInZpZXdwb3J0VHJhbnNmb3JtIiwicmVxdWVzdFJlbmRlckFsbCIsImRlbHRhIiwiZGVsdGFZIiwiem9vbSIsImdldFpvb20iLCJuZXdab29tIiwiem9vbVRvUG9pbnQiLCJ4Iiwib2Zmc2V0WCIsInkiLCJvZmZzZXRZIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaXNwb3NlIiwiY2xhc3NOYW1lIiwicmVmIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/DrwaingBoard.tsx\n"));

/***/ })

});