export default function resolvePromise(prms, promiseState) {
	function promiseDataACB(result) {
		if (promiseState.promise === prms) {
			promiseState.data = result;
		}
	}

	function promiseErrorACB(error) {
		if (promiseState.promise === prms) {
			promiseState.error = error;
		}
	}

	if (prms === null) {
		return;
	}

	promiseState.promise = prms;
	promiseState.data = null;
	promiseState.error = null;

	prms.then(promiseDataACB).catch(promiseErrorACB);
}

export { resolvePromise };