export const TEST_REDUCER = "TEST_REDUCER";
export const TEST_REDUCER2 = "TEST_REDUCER2";
export const TEST_INCREMENT_COUNT = "TEST_INCREMENT_COUNT";
export const TEST_DECREMENT_COUNT = "TEST_DECREMENT_COUNT";

function doTest1() {
	return {
		type:TEST_REDUCER
	}
}

function doTest2() {
	return {
		type:TEST_REDUCER2
	}
}
function increment() {
	return {
		type:TEST_INCREMENT_COUNT
	}
}
function decrement() {
	return {
		type:TEST_DECREMENT_COUNT
	}
}

export default {
	doTest1,
	doTest2,
	increment,
	decrement
}