/**
 * Created by Totooria Hyperion on 2017/1/2.
 */
import configureStore from "./configureStore";

let store = configureStore();

export default store;

// polyfills
import * as es6Promise from "es6-promise";
es6Promise.polyfill();