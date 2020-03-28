let fun = null;

export default {
	/**
	 *
	 * @param dom
	 * @param fn
	 * @param options   指定有关事件侦听器的特征
	 */
	mousewheel: function (dom, fn, options = { passive: false }) {
		fun = fn;
		let type;
		if (dom.onmousewheel === null) type = "mousewheel";
		else type = "DOMMouseScroll";

		dom.addEventListener(type, this.scroll, options, true);
	},

	/**
	 * 注销滚轮事件
	 */
	removeMousewheel(ele) {
		let type,
			dom = ele || document.body;
		if (dom.onmousewheel === null) type = "mousewheel";
		else type = "DOMMouseScroll";
		dom.removeEventListener(type, this.scroll)
	},

	scroll: function (e) {
		// 火狐下滚为3 上滚为-3  转为谷歌的 -120 与 120
		let wheelDelta = e.wheelDelta || -e.detail * 40;

		// 修改对象属性权限为可修改
		Object.defineProperty(e, 'wheelDelta', {
			writable: true
		});
		// 赋值
		e.wheelDelta = wheelDelta;

		// 函数返回值是否等于false  等于说明要阻止默认行为
		if (fun.call(this, e) === false) {
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
		}
	},

	/**
	 * 获取元素到可视区域左上角的x轴距离
	 * @param element
	 * @returns {number}
	 */
	getElementViewLeft: function (element) {
		let actualLeft = element.offsetLeft;
		let current = element.offsetParent;

		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}

		let elementScrollLeft = 0;
		if (document.compatMode === "BackCompat") {
			elementScrollLeft = document.body.scrollLeft;
		} else {
			elementScrollLeft = document.documentElement.scrollLeft;
		}


		return actualLeft - elementScrollLeft;
	},
	/**
	 * 获取元素到可视区域左上角的y轴距离
	 * @param element
	 * @returns {number}
	 */
	getElementViewTop: function (element) {
		let actualTop = element.offsetTop;
		let current = element.offsetParent;

		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}

		let elementScrollTop = 0;
		// 混杂模式还是标准模式
		if (document.compatMode === "BackCompat") {

			elementScrollTop = document.body.scrollTop;
		} else {
			elementScrollTop = document.documentElement.scrollTop;
		}

		return actualTop - elementScrollTop;
	},

}
