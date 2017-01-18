exports.ids = [0];
exports.modules = {

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(26);
__webpack_require__(186);
var sonOfHello_1 = __webpack_require__(181);
// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.

var Hello = function (_React$Component) {
    _inherits(Hello, _React$Component);

    function Hello() {
        _classCallCheck(this, Hello);

        return _possibleConstructorReturn(this, (Hello.__proto__ || Object.getPrototypeOf(Hello)).apply(this, arguments));
    }

    _createClass(Hello, [{
        key: "render",
        value: function render() {
            return React.createElement("div", null, React.createElement("h1", null, "Hello from ", this.props.compiler, " and ", this.props.framework, "!"), React.createElement(sonOfHello_1.default, { msg: "haha", ref: "oo" }));
        }
    }]);

    return Hello;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hello;

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.TEST_REDUCER = "TEST_REDUCER";
exports.TEST_REDUCER2 = "TEST_REDUCER2";
exports.TEST_INCREMENT_COUNT = "TEST_INCREMENT_COUNT";
exports.TEST_DECREMENT_COUNT = "TEST_DECREMENT_COUNT";
function doTest1() {
    return {
        type: exports.TEST_REDUCER
    };
}
function doTest2() {
    return {
        type: exports.TEST_REDUCER2
    };
}
function increment() {
    return {
        type: exports.TEST_INCREMENT_COUNT
    };
}
function decrement() {
    return {
        type: exports.TEST_DECREMENT_COUNT
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    doTest1: doTest1,
    doTest2: doTest2,
    increment: increment,
    decrement: decrement
};

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = __webpack_require__(26);
var ReduxConnector_1 = __webpack_require__(184);
var ReduxComponent_1 = __webpack_require__(183);
// import { ReduxComponent } from "core/index";
var index_1 = __webpack_require__(182);
var index_2 = __webpack_require__(180);
var namespace = "Hello.sonOfHello";
var Hello = function (_React$Component) {
    _inherits(Hello, _React$Component);

    function Hello(props, context) {
        _classCallCheck(this, Hello);

        return _possibleConstructorReturn(this, (Hello.__proto__ || Object.getPrototypeOf(Hello)).call(this, props, context));
    }

    _createClass(Hello, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                test1 = _props.test1,
                test2 = _props.test2,
                count = _props.count;

            return React.createElement("div", null, React.createElement("h1", null, "Hello from ", this.props.compiler, " and ", this.props.framework, "!"), React.createElement("p", null, React.createElement("button", { onClick: this.props.actions.doTest1 }, "Test1")), React.createElement("p", null, test1 ? "TRUE" : "FALSE"), React.createElement("p", null, React.createElement("button", { onClick: this.props.actions.doTest2 }, "Test2")), React.createElement("p", null, test2 ? "TRUE" : "FALSE"), React.createElement("p", null, React.createElement("button", { onClick: this.props.actions.increment }, "INCREMENT")), React.createElement("p", null, React.createElement("button", { onClick: this.props.actions.decrement }, "DECREMENT")), React.createElement("p", null, count));
        }
    }]);

    return Hello;
}(React.Component);
Hello.defaultProps = {
    count: 0,
    test1: false,
    test2: false
};
Hello = __decorate([ReduxComponent_1.default({
    namespace: namespace,
    reducers: {
        r_index: index_1.default
    },
    actions: index_2.default
})], Hello);
function theState(state) {
    if (!state) {
        return {};
    }
    var _state = state.get(namespace);
    if (!_state) {
        return {};
    }
    return {
        count: _state.get("count"),
        test1: _state.get("test1"),
        test2: _state.get("test2")
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReduxConnector_1.default(theState)(Hello);

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = __webpack_require__(180);
var globalTypes = __webpack_require__(86);
var Immutable = __webpack_require__(48);
var initialState = Immutable.fromJS({
    test1: false,
    test2: false,
    count: 0
});
function default_1() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    // (window as any).Immutable = Immutable;
    switch (action.type) {
        case globalTypes.TH_INIT_ASYNC_REDUCERS:
            return state || initialState;
        case globalTypes.RESET_DATA:
            return initialState;
        case types.TEST_REDUCER:
            return state.set('test1', !state.get("test1"));
        case types.TEST_REDUCER2:
            return state.set('test2', !state.get("test2"));
        case types.TEST_INCREMENT_COUNT:
            return state.set('count', state.get("count") + 1);
        case types.TEST_DECREMENT_COUNT:
            return state.set('count', state.get("count") - 1);
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var React = __webpack_require__(26);
function ReduxComponent(option) {
    var namespace = option.namespace,
        reducers = option.reducers,
        actions = option.actions;

    return function (WrappedComponent) {
        return _a = function (_React$Component) {
            _inherits(RComponent, _React$Component);

            function RComponent(props, context) {
                _classCallCheck(this, RComponent);

                var _this = _possibleConstructorReturn(this, (RComponent.__proto__ || Object.getPrototypeOf(RComponent)).call(this, props, context));

                context.store.addReducers(namespace, reducers);
                return _this;
            }

            _createClass(RComponent, [{
                key: "render",
                value: function render() {
                    var bondActions = this.context.store.bindActions(namespace, actions);
                    var newProps = __assign({}, this.props, { actions: bondActions });
                    return React.createElement(WrappedComponent, __assign({}, newProps));
                }
            }]);

            return RComponent;
        }(React.Component), _a.contextTypes = {
            store: React.PropTypes.shape({
                subscribe: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                getState: React.PropTypes.func.isRequired
            })
        }, _a;
        var _a;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReduxComponent;

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var React = __webpack_require__(26);
var defaultMapStateToProps = function defaultMapStateToProps(state) {
    return state;
}; // eslint-disable-line no-unused-vars
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
    return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
    return __assign({}, parentProps, stateProps, dispatchProps);
};
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
function shallowEqual(prev, next) {
    if (prev === next) {
        return true;
    }
    var keysA = Object.keys(prev);
    var keysB = Object.keys(next);
    if (keysA.length !== keysB.length) {
        return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(next, keysA[i]) || prev[keysA[i]] !== next[keysA[i]]) {
            return false;
        }
    }
    return true;
}
var nextVersion = 0;
function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    // const shouldSubscribe = Boolean(mapStateToProps);
    var mapState = mapStateToProps || defaultMapStateToProps;
    var mapDispatch = void 0;
    if (typeof mapDispatchToProps === 'function') {
        mapDispatch = mapDispatchToProps;
    } else if (!mapDispatchToProps) {
        mapDispatch = defaultMapDispatchToProps;
    }
    var finalMergeProps = mergeProps || defaultMergeProps;
    // const { pure = true, withRef = false } = options;
    // const checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
    // Helps track hot reloading.
    var version = nextVersion++;
    return function wrapWithConnect(WrappedComponent) {
        var connectDisplayName = "Connect(" + getDisplayName(WrappedComponent) + ")";
        function computeMergedProps(stateProps, dispatchProps, parentProps) {
            return finalMergeProps(stateProps, dispatchProps, parentProps);
        }

        var Connect = function (_React$Component) {
            _inherits(Connect, _React$Component);

            function Connect(props, context) {
                _classCallCheck(this, Connect);

                var _this = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props, context));

                _this.displayName = connectDisplayName;
                _this.version = version;
                _this.store = props.store || context.store;
                var storeState = _this.store.getState()["asyncReducer"];
                _this.state = { storeState: storeState };
                _this.clearCache();
                return _this;
            }

            _createClass(Connect, [{
                key: "shouldComponentUpdate",
                value: function shouldComponentUpdate() {
                    return this.haveOwnPropsChanged || this.hasStoreStateChanged;
                }
            }, {
                key: "computeStateProps",
                value: function computeStateProps(store, props) {
                    if (!this.finalMapStateToProps) {
                        return this.configureFinalMapState(store, props);
                    }
                    var state = store.getState()["asyncReducer"];
                    return this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, store.getState(), props) : this.finalMapStateToProps(state, store.getState());
                }
            }, {
                key: "configureFinalMapState",
                value: function configureFinalMapState(store, props) {
                    var mappedState = mapState(store.getState()["asyncReducer"], props);
                    var isFactory = typeof mappedState === 'function';
                    this.finalMapStateToProps = isFactory ? mappedState : mapState;
                    this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
                    if (isFactory) {
                        return this.computeStateProps(store, props);
                    }
                    return mappedState;
                }
            }, {
                key: "computeDispatchProps",
                value: function computeDispatchProps(store, props) {
                    if (!this.finalMapDispatchToProps) {
                        return this.configureFinalMapDispatch(store, props);
                    }
                    var dispatch = store.dispatch;

                    return this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
                }
            }, {
                key: "configureFinalMapDispatch",
                value: function configureFinalMapDispatch(store, props) {
                    var mappedDispatch = mapDispatch(store.dispatch, props);
                    var isFactory = typeof mappedDispatch === 'function';
                    this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
                    this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
                    if (isFactory) {
                        return this.computeDispatchProps(store, props);
                    }
                    return mappedDispatch;
                }
            }, {
                key: "updateStatePropsIfNeeded",
                value: function updateStatePropsIfNeeded() {
                    var nextStateProps = this.computeStateProps(this.store, this.props);
                    if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
                        return false;
                    }
                    // if (this.stateProps && nextStateProps.equals(this.stateProps)) {
                    // 	return false
                    // }
                    this.stateProps = nextStateProps;
                    return true;
                }
            }, {
                key: "updateDispatchPropsIfNeeded",
                value: function updateDispatchPropsIfNeeded() {
                    var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
                    if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
                        return false;
                    }
                    this.dispatchProps = nextDispatchProps;
                    return true;
                }
            }, {
                key: "updateMergedPropsIfNeeded",
                value: function updateMergedPropsIfNeeded() {
                    var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
                    if (this.mergedProps && shallowEqual(nextMergedProps, this.mergedProps)) {
                        return false;
                    }
                    this.mergedProps = nextMergedProps;
                    return true;
                }
            }, {
                key: "trySubscribe",
                value: function trySubscribe() {
                    if (!this.unsubscribe) {
                        this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
                        this.handleChange();
                    }
                }
            }, {
                key: "tryUnsubscribe",
                value: function tryUnsubscribe() {
                    if (this.unsubscribe) {
                        this.unsubscribe();
                        this.unsubscribe = null;
                    }
                }
            }, {
                key: "componentDidMount",
                value: function componentDidMount() {
                    this.trySubscribe();
                }
            }, {
                key: "componentWillReceiveProps",
                value: function componentWillReceiveProps(nextProps) {
                    this.haveOwnPropsChanged = !shallowEqual(nextProps, this.props);
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    this.tryUnsubscribe();
                    this.clearCache();
                }
            }, {
                key: "clearCache",
                value: function clearCache() {
                    this.dispatchProps = null;
                    this.stateProps = null;
                    this.mergedProps = null;
                    this.haveOwnPropsChanged = true;
                    this.hasStoreStateChanged = true;
                    this.haveStatePropsBeenPrecalculated = false;
                    this.statePropsPrecalculationError = null;
                    this.renderedElement = null;
                    this.finalMapDispatchToProps = null;
                    this.finalMapStateToProps = null;
                }
            }, {
                key: "handleChange",
                value: function handleChange() {
                    if (!this.unsubscribe) {
                        return;
                    }
                    var storeState = this.store.getState()["asyncReducer"];
                    var prevStoreState = this.state.storeState;
                    if (prevStoreState && storeState && prevStoreState === storeState) {
                        return;
                    }
                    this.hasStoreStateChanged = true;
                    this.setState({ storeState: storeState });
                }
            }, {
                key: "render",
                value: function render() {
                    var haveOwnPropsChanged = this.haveOwnPropsChanged,
                        hasStoreStateChanged = this.hasStoreStateChanged,
                        haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
                        statePropsPrecalculationError = this.statePropsPrecalculationError,
                        renderedElement = this.renderedElement;

                    this.haveOwnPropsChanged = false;
                    this.hasStoreStateChanged = false;
                    this.haveStatePropsBeenPrecalculated = false;
                    this.statePropsPrecalculationError = null;
                    if (statePropsPrecalculationError) {
                        throw statePropsPrecalculationError;
                    }
                    var shouldUpdateStateProps = true;
                    var shouldUpdateDispatchProps = true;
                    if (renderedElement) {
                        shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
                        shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
                    }
                    var haveStatePropsChanged = false;
                    var haveDispatchPropsChanged = false;
                    if (haveStatePropsBeenPrecalculated) {
                        haveStatePropsChanged = true;
                    } else if (shouldUpdateStateProps) {
                        haveStatePropsChanged = this.updateStatePropsIfNeeded();
                    }
                    if (shouldUpdateDispatchProps) {
                        haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
                    }
                    var haveMergedPropsChanged = true;
                    if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
                        haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
                    } else {
                        haveMergedPropsChanged = false;
                    }
                    if (!haveMergedPropsChanged && renderedElement) {
                        return renderedElement;
                    }
                    this.renderedElement = React.createElement(WrappedComponent, __assign({}, this.mergedProps, { ref: 'wrappedInstance' }));
                    return this.renderedElement;
                }
            }]);

            return Connect;
        }(React.Component);
        // private childContextTypes: any;
        // private contextTypes: any;
        // private defaultProps: any;
        // private getDefaultProps: any;
        // private mixins: any;
        // private propTypes: any;
        // private type: any;
        //
        // private name: any;
        // private length: any;
        // private prototype: any;
        // private caller: any;
        // private arguments: any;
        // private arity: any;


        Connect.contextTypes = {
            store: React.PropTypes.shape({
                subscribe: React.PropTypes.func.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                getState: React.PropTypes.func.isRequired
            })
        };
        // let REACT_STATICS:any = {
        // 	childContextTypes: true,
        // 	contextTypes: true,
        // 	defaultProps: true,
        // 	displayName: true,
        // 	getDefaultProps: true,
        // 	mixins: true,
        // 	propTypes: true,
        // 	type: true
        // };
        //
        // let KNOWN_STATICS:any = {
        // 	name: true,
        // 	length: true,
        // 	prototype: true,
        // 	caller: true,
        // 	arguments: true,
        // 	arity: true
        // };
        //
        // if (typeof WrappedComponent !== 'string') { // don't hoist over string (html) components
        // 	let keys = Object.getOwnPropertyNames(WrappedComponent);
        // 	for (let i = 0; i < keys.length; ++i) {
        // 		if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
        // 			try {
        // 				Connect[keys[i]] = WrappedComponent[keys[i]];
        // 			} catch (error) {
        //
        // 			}
        // 		}
        // 	}
        // }
        return Connect;
        // return hoistStatics(Connect,WrappedComponent);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connect;

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(185)();
// imports


// module
exports.push([module.i, "body {\n  font-size: 20px;\n  -webkit-transform: translateX(100px);\n          transform: translateX(100px); }\n", ""]);

// exports


/***/ })

};;