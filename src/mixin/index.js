/* eslint-disable no-control-regex */
import Vue from 'vue'
import axios from 'axios'

import headerNav from '../components/component_lzj/header/header'
import indexFooter from '../components/component_lzj/indexFooter.vue'
import errorPage from "../components/component_lzj/error";

const Api = {
	install() {
		// 注册网络请求
		this.prototype.fetch = Api.netWork;

		this.prototype.userInfo = null	// 用户信息
		this.prototype.hideError = true	// 是否隐藏404
		this.prototype.authLogin = false	// 是否开启登陆权限验证
		this.prototype.localtion = 'http://112.74.18.182:9101/cnjy-search-web'  //其他接口ip

		this.prototype.parse = Api.parse;
		this.prototype.stringify = Api.stringify;
		this.prototype.isLogin = Api.isLogin;
		this.prototype.push = Api.push;
		this.prototype.pop = Api.pop;
		this.prototype.quit = Api.quit;
		this.prototype.getTimer = Api.getTimer;
		this.prototype.getItem = Api.getItem;
		this.prototype.setItem = Api.setItem;
		this.prototype.jsonToBase64 = Api.jsonToBase64;
		this.prototype.base64ToJson = Api.base64ToJson;
		this.prototype.getRoleName = Api.getRoleName;
		this.prototype.removeItemUserInfo = Api.removeItemUserInfo;
		this.prototype.verifyLogin = Api.verifyLogin;
		this.prototype.getAdvertisingData = Api.getAdvertisingData;
	},
	netWork: (() => {
		let _this = null;
		let ipList = [
			// 'http://112.74.18.182:9101/cnjy-search-web/',
			// 'http://112.74.16.235:9102/cnjy-user-web/',
			// 'http://112.74.16.235:9103/cnjy-curriculum-web/',
			// 'http://120.24.45.159:9104/cnjy-school-web/',
			// 'http://120.24.45.159:9105/cnjy-teacher-web/',
			// 'http://120.78.145.39:9106/cnjy-chuniao-web/'
			'http://192.168.3.88:9101/',
			'http://192.168.3.88:9102/',
			'http://192.168.3.88:9103/',
			'http://192.168.3.88:9104/',
			'http://192.168.3.88:9105/',
			'http://192.168.3.88:9106/',
		];

		// 网络请求
		axios.defaults.timeout = 20000;
		axios.defaults.validateStatus = function (status) {
			//验证响应状态码=>自定义成功失败规则：状态码以2/3开头算作成功
			let result = /^(2|3)\d{2}$/.test(status);
			if (!result) {
				let errorMsg = '';
				switch (status) {
					case 404:
						errorMsg = '网址错误';
						break;
					default:
						errorMsg = '请求失败';
				}
				throw new Error(errorMsg + '， 错误码为：' + status);
			}
			if (status === 201) {
				_this.removeItemUserInfo();
			}
			return result;
		};
		return function (params, id, isImage) {
			_this = this;
			if (typeof id === 'undefined') id = 1;
			axios.defaults.baseURL = typeof id === 'string' ? id : ipList[id - 1];
			// 是否为图片上传
			if (isImage) {
				axios.defaults.headers = { 'Content-Type': 'multipart/form-data' };
			} else {
				axios.defaults.headers = { 'Content-Type': 'application/json;charset=UTF-8' };    //设置请求头
			}
			let url = params.url;
			if (/^\//.test(url)) params.url = url.slice(1);

			let data = params.data;
			if (data) {
				data.t = new Date().getTime()   //使每次调用接口时参数都不相同
			}
			if (params.method === 'get') {
				if (data) {
					Object.keys(data).forEach((key, i) => {
						if (!i) params.url += "?";
						params.url += '&' + key + '=' + data[key]
					});
					data = {};
				}
			}

			return axios(params);
		};
	})(),
	// 序列化
	parse(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	stringify(obj) {
		return JSON.stringify(obj);
	},
	/**
	 * [isLogin description] 判断是否登陆
	 * @return {Boolean} [description]
	 */
	isLogin() {
		let bool = true;
		let userInfo = this.getItem('userInfo');

		if (!userInfo) bool = false;
		// 获取用户信息
		this.userInfo = userInfo;
		return bool;
	},
	// 路由跳转
	push(param) {
		this.$router.push(param);
	},
	// 返回
	pop() {
		this.$router.go(-1)
	},
	// 退出
	quit() {
		let cookie = document.cookie,
			userInfo = this.userInfo,
			phone = null;

		if (cookie) {
			phone = document.cookie.split("=")[1];
		} else if (userInfo) {
			phone = userInfo.user.phone;
		} else {
			this.removeItemUserInfo();
			this.push('/loginAndRegister');
			return;
		}

		// 退出并清除用户数据
		this.fetch({
			url: '/logout.do',
			method: 'get',
			data: { username: phone }
		}, 2, () => { });
		this.removeItemUserInfo();
		this.push('/loginAndRegister');
	},
	/**
	 * @param data {boolean} 是否返回为日期格式
	 * @param notHMS {boolean} 是否只要年月日
	 * @param notYMD {boolean} 是否只要时分秒
	 * @param sign {string}    年月日拼接符号
	 * @param sign2 {string}    时分秒拼接符号
	 * @returns {string}
	 */
	getTimer(data = false, notHMS = false, notYMD = false, sign = '-', sign2 = ':') {
		function double(val) {
			if (val < 10) val = '0' + val;
			return val;
		}

		let nowTimer = new Date(),
			year = double(nowTimer.getFullYear()),
			month = double(nowTimer.getMonth() + 1),
			date = double(nowTimer.getDate()),
			hours = double(nowTimer.getHours()),
			minutes = double(nowTimer.getMinutes()),
			seconds = double(nowTimer.getSeconds());
		let ymd = '',
			hms = '';
		if (data) {
			ymd = year + '年' + month + '月' + date + '日';
			hms = hours + '时' + minutes + '分' + seconds + '秒'
		} else {
			ymd = year + sign + month + sign + date;
			hms = hours + sign2 + minutes + sign2 + seconds
		}

		if (notYMD) return hms;
		if (notHMS) return ymd;

		return ymd + ' ' + hms;
	},
	// userInfo的获取需要以回调函数的形式获取
	getItem(name) {
		let result = window.localStorage.getItem(name);

		if (!result || result === 'undefined') return null;
		if (name === 'userInfo') {
			let res = JSON.parse(this.base64ToJson(result));
			// 判断路由是否在聊天页面，如果为客服消息时  更改result.user.id 为学校id
			let serviceSchoolId = this.getItem('serviceSchoolId');
			let clientId = this.getItem('clientId');
			let route = this.$route;
			if (route.path === '/systemMessage' && (route.query && route.query.category * 1 === 2) && serviceSchoolId) {
				res.user.id = serviceSchoolId;
			} else if (clientId && res.user.id !== clientId) {
				res.user.id = clientId;
			}
			result = this.stringify(res);
		}
		return JSON.parse(result);
	},
	setItem(name, val) {
		let value = JSON.stringify(val);
		// 值相等则拦截
		if (this.stringify(this.getItem(name)) === value) return;

		if (name === 'position') {
			val.provincialLevel = '重庆市';
			window.localStorage.setItem(name, JSON.stringify(val));

			// 触发城市相关接口更新
			this.$store.commit('changeAddressUpdate', true);
			return
		}

		if (name === 'userInfo') {
			value = this.jsonToBase64(value);
		}
		window.localStorage.setItem(name, value);
	},

	/**
	 * json字符串转base64
	 * @param json string
	 */
	jsonToBase64(json) {
		let reg = /([^\x00-\xff])+/g;
		let cnArr = json.match(reg);

		this.setItem('cnArr', cnArr);
		let blob = btoa(json.replace(reg, '%ChicksB64Education%'));

		this.setItem('str', cnArr);

		return blob.replace(/\w{2}/, (value) => {
			this.setItem('u_str', value);
			return 'LjzNaYxNaYxsLzjNaYx'
		});
	},
	/**
	 * base64转json字符串
	 * @param base64Str
	 */
	base64ToJson(base64Str) {
		let index = -1,
			cnArr = this.getItem('cnArr');

		let result = base64Str.replace('LjzNaYxNaYxsLzjNaYx', this.getItem('u_str'));

		result = atob(result).replace(/(%ChicksB64Education%)+/g, function () {
			index++;
			return cnArr[index];
		});

		return result;
	},

	// 获取学校权限
	// 是否为学校入驻 -1未登录 0未注册学校 1审核中 2审核失败 3审核成功 4违规学校权限被封
	getRoleName() {
		let userInfo = this.getItem('userInfo');
		if (userInfo && userInfo.schoolUser) {
			return userInfo.schoolUser.schoolStatus * 1;
		} else return 0;
	},
	/**
	 * 清除用户数据
	 */
	removeItemUserInfo() {
		window.localStorage.removeItem('userInfo');
		window.localStorage.removeItem('clientId');
		window.localStorage.removeItem('serviceSchoolId');
		this.$store.commit('changeUpdateUserInfo', true)
	},
	/**
	 * @param param
	 *            message    提示信息
	 *            url        跳转的url
	 * @param result    Boolean or Function: 函数返回值为Boolean（是否登陆的结果）
	 */
	verifyLogin(param, result) {
		// 未登陆跳转到登录页
		result = typeof result === 'function' ? result() : result;

		if (!result) {
			this.$msgbox({
				message: param.message,
				beforeClose: (action, instance, done) => {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = '跳转中...';
					setTimeout(() => {
						// 跳转到登录页
						this.push(param.url);
						done();
						setTimeout(() => {
							instance.confirmButtonLoading = false;
						}, 300);
					}, 1000);
				}
			});
		}
	},
	/**
	 * 获取广告位数据
	 */
	getAdvertisingData(categoryId) {
		return new Promise(resolve => {
			this.fetch({
				method: 'get',
				url: '/content/cateId.do',
				data: {
					categoryId
				}
			}, 2).then((res) => {
				resolve(res.data)
			});
		})
	}
}

const mixins = new class Mixins {
	install() {
		Vue.mixin({
			components: { headerNav, indexFooter, errorPage },
			async mounted() {
				let _this = this;
				setTimeout(() => {
					if (_this.authLogin) {
						// 验证是否登陆
						_this.verifyLogin({
							message: '未登陆，请先登陆！',
							url: '/loginAndRegister'
						}, this.getItem('userInfo'));
					}
				});
			}
		})
	}
}

export {Api, mixins }


