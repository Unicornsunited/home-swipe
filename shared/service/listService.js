(() => {
	angular.module('lists')
	.factory('listService', listService);

	function listService() {
		return {
			addToList: addToList,
			removeFromList: removeFromList
		};

		function addToList(id, targetListName) {
			let targetListCache = [];
			if(window.localStorage.getItem(targetListName)) {
				targetListCache = JSON.parse(window.localStorage.getItem(targetListName));
			}

			targetListCache.push(id);

			window.localStorage.setItem(targetListName, JSON.stringify(targetListCache));
		}

		function removeFromList(id, targetList) {
			if (typeof targetList === 'string') {
				if(window.localStorage.getItem(targetList)) {
					targetList = JSON.parse(window.localStorage.getItem(targetList));
				} else {
					targetList = [];
				}
			}

			if(targetList.length && targetList[id]) {
				targetList.splice(id, 1);
			}

			if(window.localStorage.getItem(targetList)) {
				window.localStorage.setItem(id, JSON.stringify(targetList));
			}
		}
	}
})();