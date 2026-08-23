//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let atom$1 = require("atom");
let child_process = require("child_process");
let cross_spawn = require("cross-spawn");
cross_spawn = __toESM(cross_spawn);
let node_fs = require("node:fs");
let node_os = require("node:os");
let node_path = require("node:path");
let node_child_process = require("node:child_process");
let tree_kill = require("tree-kill");
tree_kill = __toESM(tree_kill);
let fs = require("fs");
fs = __toESM(fs);
let path = require("path");
path = __toESM(path);
let _xterm_xterm = require("@xterm/xterm");
let _xterm_addon_fit = require("@xterm/addon-fit");
let node_module = require("node:module");
let events = require("events");
events = __toESM(events);
let xregexp = require("xregexp");
xregexp = __toESM(xregexp);
let os = require("os");
os = __toESM(os);
let cosmiconfig = require("cosmiconfig");
let cosmiconfig_loader_pkl = require("cosmiconfig-loader-pkl");
let jiti = require("jiti");

//#region node_modules/@children-of-atom/dependency-manager/dist/installDependencies--IPLasz9.mjs
var a$7 = Object.defineProperty;
var o$6 = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
var s$5 = (e, t) => {
	let n = {};
	for (var r in e) a$7(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || a$7(n, Symbol.toStringTag, { value: `Module` }), n;
};
var c$3 = o$6(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			`major`,
			`premajor`,
			`minor`,
			`preminor`,
			`patch`,
			`prepatch`,
			`prerelease`
		],
		SEMVER_SPEC_VERSION: `2.0.0`,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
}));
var l$3 = o$6(((e, t) => {
	t.exports = typeof process == `object` && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error(`SEMVER`, ...e) : () => {};
}));
var u$3 = o$6(((e, t) => {
	let { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = c$3(), a = l$3();
	e = t.exports = {};
	let o = e.re = [], s = e.safeRe = [], u = e.src = [], d = e.safeSrc = [], f = e.t = {}, p = 0, m = `[a-zA-Z0-9-]`, h = [
		[`\\s`, 1],
		[`\\d`, i],
		[m, r]
	], g = (e) => {
		for (let [t, n] of h) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, _ = (e, t, n) => {
		let r = g(t), i = p++;
		a(e, i, t), f[e] = i, u[i] = t, d[i] = r, o[i] = new RegExp(t, n ? `g` : void 0), s[i] = new RegExp(r, n ? `g` : void 0);
	};
	_(`NUMERICIDENTIFIER`, `0|[1-9]\\d*`), _(`NUMERICIDENTIFIERLOOSE`, `\\d+`), _(`NONNUMERICIDENTIFIER`, `\\d*[a-zA-Z-]${m}*`), _(`MAINVERSION`, `(${u[f.NUMERICIDENTIFIER]})\\.(${u[f.NUMERICIDENTIFIER]})\\.(${u[f.NUMERICIDENTIFIER]})`), _(`MAINVERSIONLOOSE`, `(${u[f.NUMERICIDENTIFIERLOOSE]})\\.(${u[f.NUMERICIDENTIFIERLOOSE]})\\.(${u[f.NUMERICIDENTIFIERLOOSE]})`), _(`PRERELEASEIDENTIFIER`, `(?:${u[f.NONNUMERICIDENTIFIER]}|${u[f.NUMERICIDENTIFIER]})`), _(`PRERELEASEIDENTIFIERLOOSE`, `(?:${u[f.NONNUMERICIDENTIFIER]}|${u[f.NUMERICIDENTIFIERLOOSE]})`), _(`PRERELEASE`, `(?:-(${u[f.PRERELEASEIDENTIFIER]}(?:\\.${u[f.PRERELEASEIDENTIFIER]})*))`), _(`PRERELEASELOOSE`, `(?:-?(${u[f.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[f.PRERELEASEIDENTIFIERLOOSE]})*))`), _(`BUILDIDENTIFIER`, `${m}+`), _(`BUILD`, `(?:\\+(${u[f.BUILDIDENTIFIER]}(?:\\.${u[f.BUILDIDENTIFIER]})*))`), _(`FULLPLAIN`, `v?${u[f.MAINVERSION]}${u[f.PRERELEASE]}?${u[f.BUILD]}?`), _(`FULL`, `^${u[f.FULLPLAIN]}$`), _(`LOOSEPLAIN`, `[v=\\s]*${u[f.MAINVERSIONLOOSE]}${u[f.PRERELEASELOOSE]}?${u[f.BUILD]}?`), _(`LOOSE`, `^${u[f.LOOSEPLAIN]}$`), _(`GTLT`, `((?:<|>)?=?)`), _(`XRANGEIDENTIFIERLOOSE`, `${u[f.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _(`XRANGEIDENTIFIER`, `${u[f.NUMERICIDENTIFIER]}|x|X|\\*`), _(`XRANGEPLAIN`, `[v=\\s]*(${u[f.XRANGEIDENTIFIER]})(?:\\.(${u[f.XRANGEIDENTIFIER]})(?:\\.(${u[f.XRANGEIDENTIFIER]})(?:${u[f.PRERELEASE]})?${u[f.BUILD]}?)?)?`), _(`XRANGEPLAINLOOSE`, `[v=\\s]*(${u[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[f.XRANGEIDENTIFIERLOOSE]})(?:${u[f.PRERELEASELOOSE]})?${u[f.BUILD]}?)?)?`), _(`XRANGE`, `^${u[f.GTLT]}\\s*${u[f.XRANGEPLAIN]}$`), _(`XRANGELOOSE`, `^${u[f.GTLT]}\\s*${u[f.XRANGEPLAINLOOSE]}$`), _(`COERCEPLAIN`, `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), _(`COERCE`, `${u[f.COERCEPLAIN]}(?:$|[^\\d])`), _(`COERCEFULL`, u[f.COERCEPLAIN] + `(?:${u[f.PRERELEASE]})?(?:${u[f.BUILD]})?(?:$|[^\\d])`), _(`COERCERTL`, u[f.COERCE], !0), _(`COERCERTLFULL`, u[f.COERCEFULL], !0), _(`LONETILDE`, `(?:~>?)`), _(`TILDETRIM`, `(\\s*)${u[f.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = `$1~`, _(`TILDE`, `^${u[f.LONETILDE]}${u[f.XRANGEPLAIN]}$`), _(`TILDELOOSE`, `^${u[f.LONETILDE]}${u[f.XRANGEPLAINLOOSE]}$`), _(`LONECARET`, `(?:\\^)`), _(`CARETTRIM`, `(\\s*)${u[f.LONECARET]}\\s+`, !0), e.caretTrimReplace = `$1^`, _(`CARET`, `^${u[f.LONECARET]}${u[f.XRANGEPLAIN]}$`), _(`CARETLOOSE`, `^${u[f.LONECARET]}${u[f.XRANGEPLAINLOOSE]}$`), _(`COMPARATORLOOSE`, `^${u[f.GTLT]}\\s*(${u[f.LOOSEPLAIN]})$|^$`), _(`COMPARATOR`, `^${u[f.GTLT]}\\s*(${u[f.FULLPLAIN]})$|^$`), _(`COMPARATORTRIM`, `(\\s*)${u[f.GTLT]}\\s*(${u[f.LOOSEPLAIN]}|${u[f.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = `$1$2$3`, _(`HYPHENRANGE`, `^\\s*(${u[f.XRANGEPLAIN]})\\s+-\\s+(${u[f.XRANGEPLAIN]})\\s*$`), _(`HYPHENRANGELOOSE`, `^\\s*(${u[f.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[f.XRANGEPLAINLOOSE]})\\s*$`), _(`STAR`, `(<|>)?=?\\s*\\*`), _(`GTE0`, `^\\s*>=\\s*0\\.0\\.0\\s*$`), _(`GTE0PRE`, `^\\s*>=\\s*0\\.0\\.0-0\\s*$`);
}));
var d$3 = o$6(((e, t) => {
	let n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == `object` ? e : n : r;
}));
var f$4 = o$6(((e, t) => {
	let n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == `number` && typeof t == `number`) return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
}));
var p$3 = o$6(((e, t) => {
	let n = l$3(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = c$3(), { safeRe: a, t: o } = u$3(), s = d$3(), { compareIdentifiers: p } = f$4(), m = (e, t) => {
		let n = t.split(`.`);
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (p(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != `string`) throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n(`SemVer`, t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError(`Invalid major version`);
			if (this.minor > i || this.minor < 0) throw TypeError(`Invalid minor version`);
			if (this.patch > i || this.patch < 0) throw TypeError(`Invalid patch version`);
			l[4] ? this.prerelease = l[4].split(`.`).map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : this.prerelease = [], this.build = l[5] ? l[5].split(`.`) : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(`.`)}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n(`SemVer.compare`, this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == `string` && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n(`prerelease compare`, r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return p(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n(`build compare`, r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return p(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith(`pre`)) {
				if (!t && n === !1) throw Error(`invalid increment argument: identifier is empty`);
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case `premajor`:
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(`pre`, t, n);
					break;
				case `preminor`:
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc(`pre`, t, n);
					break;
				case `prepatch`:
					this.prerelease.length = 0, this.inc(`patch`, t, n), this.inc(`pre`, t, n);
					break;
				case `prerelease`:
					this.prerelease.length === 0 && this.inc(`patch`, t, n), this.inc(`pre`, t, n);
					break;
				case `release`:
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case `major`:
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case `minor`:
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case `patch`:
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case `pre`: {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == `number` && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(`.`) && n === !1) throw Error(`invalid increment argument: identifier already exists`);
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), m(this.prerelease, t)) {
							let e = this.prerelease[t.split(`.`).length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(`.`)}`), this;
		}
	};
}));
var m$3 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
}));
var h$3 = o$6(((e, t) => {
	let n = m$3();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
}));
var g$2 = o$6(((e, t) => {
	let n = m$3();
	t.exports = (e, t) => {
		let r = n(e.trim().replace(/^[=v]+/, ``), t);
		return r ? r.version : null;
	};
}));
var _$2 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t, r, i, a) => {
		typeof r == `string` && (a = i, i = r, r = void 0);
		try {
			return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
		} catch {
			return null;
		}
	};
}));
var v$2 = o$6(((e, t) => {
	let n = m$3();
	t.exports = (e, t) => {
		let r = n(e, null, !0), i = n(t, null, !0), a = r.compare(i);
		if (a === 0) return null;
		let o = a > 0, s = o ? r : i, c = o ? i : r, l = !!s.prerelease.length;
		if (c.prerelease.length && !l) {
			if (!c.patch && !c.minor) return `major`;
			if (c.compareMain(s) === 0) return c.minor && !c.patch ? `minor` : `patch`;
		}
		let u = l ? `pre` : ``;
		return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? `prerelease` : u + `patch` : u + `minor` : u + `major`;
	};
}));
var y$2 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t) => new n(e, t).major;
}));
var b$2 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t) => new n(e, t).minor;
}));
var x$2 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t) => new n(e, t).patch;
}));
var S$1 = o$6(((e, t) => {
	let n = m$3();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r && r.prerelease.length ? r.prerelease : null;
	};
}));
var C$1 = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
}));
var w$1 = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(t, e, r);
}));
var T$1 = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t) => n(e, t, !0);
}));
var E = o$6(((e, t) => {
	let n = p$3();
	t.exports = (e, t, r) => {
		let i = new n(e, r), a = new n(t, r);
		return i.compare(a) || i.compareBuild(a);
	};
}));
var D = o$6(((e, t) => {
	let n = E();
	t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
}));
var O = o$6(((e, t) => {
	let n = E();
	t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
}));
var k = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) > 0;
}));
var A = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) < 0;
}));
var j = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) === 0;
}));
var M = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) !== 0;
}));
var N = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) >= 0;
}));
var P = o$6(((e, t) => {
	let n = C$1();
	t.exports = (e, t, r) => n(e, t, r) <= 0;
}));
var F = o$6(((e, t) => {
	let n = j(), r = M(), i = k(), a = N(), o = A(), s = P();
	t.exports = (e, t, c, l) => {
		switch (t) {
			case `===`: return typeof e == `object` && (e = e.version), typeof c == `object` && (c = c.version), e === c;
			case `!==`: return typeof e == `object` && (e = e.version), typeof c == `object` && (c = c.version), e !== c;
			case ``:
			case `=`:
			case `==`: return n(e, c, l);
			case `!=`: return r(e, c, l);
			case `>`: return i(e, c, l);
			case `>=`: return a(e, c, l);
			case `<`: return o(e, c, l);
			case `<=`: return s(e, c, l);
			default: throw TypeError(`Invalid operator: ${t}`);
		}
	};
}));
var I = o$6(((e, t) => {
	let n = p$3(), r = m$3(), { safeRe: i, t: a } = u$3();
	t.exports = (e, t) => {
		if (e instanceof n) return e;
		if (typeof e == `number` && (e = String(e)), typeof e != `string`) return null;
		t ||= {};
		let o = null;
		if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
		else {
			let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL], r;
			for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);) (!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
			n.lastIndex = -1;
		}
		if (o === null) return null;
		let s = o[2];
		return r(`${s}.${o[3] || `0`}.${o[4] || `0`}${t.includePrerelease && o[5] ? `-${o[5]}` : ``}${t.includePrerelease && o[6] ? `+${o[6]}` : ``}`, t);
	};
}));
var L = o$6(((e, t) => {
	let n = m$3(), r = c$3(), i = p$3(), a = (e, t, n) => {
		if (!r.RELEASE_TYPES.includes(t)) return null;
		let i = o(e, n);
		return i && s(i, t);
	}, o = (e, t) => n(e instanceof i ? e.version : e, t), s = (e, t) => {
		if (l(t)) return e.version;
		switch (e.prerelease = [], t) {
			case `major`:
				e.minor = 0, e.patch = 0;
				break;
			case `minor`: e.patch = 0;
		}
		return e.format();
	}, l = (e) => e.startsWith(`pre`);
	t.exports = a;
}));
var ee = o$6(((e, t) => {
	t.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(e) {
			let t = this.map.get(e);
			if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t;
		}
		delete(e) {
			return this.map.delete(e);
		}
		set(e, t) {
			if (!this.delete(e) && t !== void 0) {
				if (this.map.size >= this.max) {
					let e = this.map.keys().next().value;
					this.delete(e);
				}
				this.map.set(e, t);
			}
			return this;
		}
	};
}));
var R = o$6(((e, t) => {
	let n = /\s+/g;
	t.exports = class e {
		constructor(t, r) {
			if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
			if (t instanceof a) return this.raw = t.value, this.set = [[t]], this.formatted = void 0, this;
			if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, ` `), this.set = this.raw.split(`||`).map((e) => this.parseRange(e.trim())).filter((e) => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let e = this.set[0];
				if (this.set = this.set.filter((e) => !S(e[0])), this.set.length === 0) this.set = [e];
				else if (this.set.length > 1) {
					for (let e of this.set) if (e.length === 1 && C(e[0])) {
						this.set = [e];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = ``;
				for (let e = 0; e < this.set.length; e++) {
					e > 0 && (this.formatted += `||`);
					let t = this.set[e];
					for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += ` `), this.formatted += t[e].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(e) {
			e = e.replace(x, ``);
			let t = ((this.options.includePrerelease && y) | (this.options.loose && b)) + `:` + e, n = r.get(t);
			if (n) return n;
			let i = this.options.loose, s = i ? f[h.HYPHENRANGELOOSE] : f[h.HYPHENRANGE];
			e = e.replace(s, I(this.options.includePrerelease)), o(`hyphen replace`, e), e = e.replace(f[h.COMPARATORTRIM], g), o(`comparator trim`, e), e = e.replace(f[h.TILDETRIM], _), o(`tilde trim`, e), e = e.replace(f[h.CARETTRIM], v), o(`caret trim`, e);
			let c = e.split(` `).map((e) => T(e, this.options)).join(` `).split(/\s+/).map((e) => F(e, this.options));
			i && (c = c.filter((e) => (o(`loose invalid filter`, e, this.options), !!e.match(f[h.COMPARATORLOOSE])))), o(`range list`, c);
			let l = /* @__PURE__ */ new Map(), u = c.map((e) => new a(e, this.options));
			for (let e of u) {
				if (S(e)) return [e];
				l.set(e.value, e);
			}
			l.size > 1 && l.has(``) && l.delete(``);
			let d = [...l.values()];
			return r.set(t, d), d;
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError(`a Range is required`);
			return this.set.some((e) => w(e, n) && t.set.some((t) => w(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))));
		}
		test(e) {
			if (!e) return !1;
			if (typeof e == `string`) try {
				e = new s(e, this.options);
			} catch {
				return !1;
			}
			for (let t = 0; t < this.set.length; t++) if (L(this.set[t], e, this.options)) return !0;
			return !1;
		}
	};
	let r = new (ee())(), i = d$3(), a = z(), o = l$3(), s = p$3(), { safeRe: f, src: m, t: h, comparatorTrimReplace: g, tildeTrimReplace: _, caretTrimReplace: v } = u$3(), { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: b } = c$3(), x = new RegExp(m[h.BUILD], `g`), S = (e) => e.value === `<0.0.0-0`, C = (e) => e.value === ``, w = (e, t) => {
		let n = !0, r = e.slice(), i = r.pop();
		for (; n && r.length;) n = r.every((e) => i.intersects(e, t)), i = r.pop();
		return n;
	}, T = (e, t) => (e = e.replace(f[h.BUILD], ``), o(`comp`, e, t), e = A(e, t), o(`caret`, e), e = O(e, t), o(`tildes`, e), e = M(e, t), o(`xrange`, e), e = P(e, t), o(`stars`, e), e), E = (e) => !e || e.toLowerCase() === `x` || e === `*`, D = (e, t, n) => E(e) && !E(t) || E(t) && n && !E(n), O = (e, t) => e.trim().split(/\s+/).map((e) => k(e, t)).join(` `), k = (e, t) => {
		let n = t.loose ? f[h.TILDELOOSE] : f[h.TILDE], r = t.includePrerelease ? `-0` : ``;
		return e.replace(n, (t, n, i, a, s) => {
			o(`tilde`, e, t, n, i, a, s);
			let c;
			return E(n) ? c = `` : E(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : E(a) ? c = `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : s ? (o(`replaceTilde pr`, s), c = `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0`) : c = `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0`, o(`tilde return`, c), c;
		});
	}, A = (e, t) => e.trim().split(/\s+/).map((e) => j(e, t)).join(` `), j = (e, t) => {
		o(`caret`, e, t);
		let n = t.loose ? f[h.CARETLOOSE] : f[h.CARET], r = t.includePrerelease ? `-0` : ``;
		return e.replace(n, (t, n, i, a, s) => {
			o(`caret`, e, t, n, i, a, s);
			let c;
			return E(n) ? c = `` : E(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : E(a) ? c = n === `0` ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0` : s ? (o(`replaceCaret pr`, s), c = n === `0` ? i === `0` ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`) : (o(`no pr`), c = n === `0` ? i === `0` ? `>=${n}.${i}.${a} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`), o(`caret return`, c), c;
		});
	}, M = (e, t) => (o(`replaceXRanges`, e, t), e.split(/\s+/).map((e) => N(e, t)).join(` `)), N = (e, t) => {
		e = e.trim();
		let n = t.loose ? f[h.XRANGELOOSE] : f[h.XRANGE];
		return e.replace(n, (n, r, i, a, s, c) => {
			if (o(`xRange`, e, n, r, i, a, s, c), D(i, a, s)) return e;
			let l = E(i), u = l || E(a), d = u || E(s), f = d;
			return r === `=` && f && (r = ``), c = t.includePrerelease ? `-0` : ``, l ? n = r === `>` || r === `<` ? `<0.0.0-0` : `*` : r && f ? (u && (a = 0), s = 0, r === `>` ? (r = `>=`, u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === `<=` && (r = `<`, u ? i = +i + 1 : a = +a + 1), r === `<` && (c = `-0`), n = `${r + i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i + 1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`), o(`xRange return`, n), n;
		});
	}, P = (e, t) => (o(`replaceStars`, e, t), e.trim().replace(f[h.STAR], ``)), F = (e, t) => (o(`replaceGTE0`, e, t), e.trim().replace(f[t.includePrerelease ? h.GTE0PRE : h.GTE0], ``)), I = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = E(r) ? `` : E(i) ? `>=${r}.0.0${e ? `-0` : ``}` : E(a) ? `>=${r}.${i}.0${e ? `-0` : ``}` : o ? `>=${n}` : `>=${n}${e ? `-0` : ``}`, c = E(l) ? `` : E(u) ? `<${+l + 1}.0.0-0` : E(d) ? `<${l}.${+u + 1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d + 1}-0` : `<=${c}`, `${n} ${c}`.trim()), L = (e, t, n) => {
		for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
		if (t.prerelease.length && !n.includePrerelease) {
			for (let n = 0; n < e.length; n++) if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
				let r = e[n].semver;
				if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
}));
var z = o$6(((e, t) => {
	let n = Symbol(`SemVer ANY`);
	t.exports = class e {
		static get ANY() {
			return n;
		}
		constructor(t, i) {
			if (i = r(i), t instanceof e) {
				if (t.loose === !!i.loose) return t;
				t = t.value;
			}
			t = t.trim().split(/\s+/).join(` `), s(`comparator`, t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.semver === n ? this.value = `` : this.value = this.operator + this.semver.version, s(`comp`, this);
		}
		parse(e) {
			let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR], r = e.match(t);
			if (!r) throw TypeError(`Invalid comparator: ${e}`);
			this.operator = r[1] === void 0 ? `` : r[1], this.operator === `=` && (this.operator = ``), r[2] ? this.semver = new c(r[2], this.options.loose) : this.semver = n;
		}
		toString() {
			return this.value;
		}
		test(e) {
			if (s(`Comparator.test`, e, this.options.loose), this.semver === n || e === n) return !0;
			if (typeof e == `string`) try {
				e = new c(e, this.options);
			} catch {
				return !1;
			}
			return o(e, this.operator, this.semver, this.options);
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError(`a Comparator is required`);
			return this.operator === `` ? this.value === `` ? !0 : new f(t.value, n).test(this.value) : t.operator === `` ? t.value === `` ? !0 : new f(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === `<0.0.0-0` || t.value === `<0.0.0-0`) || !n.includePrerelease && (this.value.startsWith(`<0.0.0`) || t.value.startsWith(`<0.0.0`)) ? !1 : !!(this.operator.startsWith(`>`) && t.operator.startsWith(`>`) || this.operator.startsWith(`<`) && t.operator.startsWith(`<`) || this.semver.version === t.semver.version && this.operator.includes(`=`) && t.operator.includes(`=`) || o(this.semver, `<`, t.semver, n) && this.operator.startsWith(`>`) && t.operator.startsWith(`<`) || o(this.semver, `>`, t.semver, n) && this.operator.startsWith(`<`) && t.operator.startsWith(`>`)));
		}
	};
	let r = d$3(), { safeRe: i, t: a } = u$3(), o = F(), s = l$3(), c = p$3(), f = R();
}));
var B = o$6(((e, t) => {
	let n = R();
	t.exports = (e, t, r) => {
		try {
			t = new n(t, r);
		} catch {
			return !1;
		}
		return t.test(e);
	};
}));
var V = o$6(((e, t) => {
	let n = R();
	t.exports = (e, t) => new n(e, t).set.map((e) => e.map((e) => e.value).join(` `).trim().split(` `));
}));
var te = o$6(((e, t) => {
	let n = p$3(), r = R();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i));
		}), a;
	};
}));
var ne = o$6(((e, t) => {
	let n = p$3(), r = R();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i));
		}), a;
	};
}));
var re = o$6(((e, t) => {
	let n = p$3(), r = R(), i = k();
	t.exports = (e, t) => {
		e = new r(e, t);
		let a = new n(`0.0.0`);
		if (e.test(a) || (a = new n(`0.0.0-0`), e.test(a))) return a;
		a = null;
		for (let t = 0; t < e.set.length; ++t) {
			let r = e.set[t], o = null;
			r.forEach((e) => {
				let t = new n(e.semver.version);
				switch (e.operator) {
					case `>`: t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
					case ``:
					case `>=`:
						(!o || i(t, o)) && (o = t);
						break;
					case `<`:
					case `<=`: break;
					default: throw Error(`Unexpected operation: ${e.operator}`);
				}
			}), o && (!a || i(a, o)) && (a = o);
		}
		return a && e.test(a) ? a : null;
	};
}));
var ie = o$6(((e, t) => {
	let n = R();
	t.exports = (e, t) => {
		try {
			return new n(e, t).range || `*`;
		} catch {
			return null;
		}
	};
}));
var H = o$6(((e, t) => {
	let n = p$3(), r = z(), { ANY: i } = r, a = R(), o = B(), s = k(), c = A(), l = P(), u = N();
	t.exports = (e, t, d, f) => {
		e = new n(e, f), t = new a(t, f);
		let p, m, h, g, _;
		switch (d) {
			case `>`:
				p = s, m = l, h = c, g = `>`, _ = `>=`;
				break;
			case `<`:
				p = c, m = u, h = s, g = `<`, _ = `<=`;
				break;
			default: throw TypeError(`Must provide a hilo val of "<" or ">"`);
		}
		if (o(e, t, f)) return !1;
		for (let n = 0; n < t.set.length; ++n) {
			let a = t.set[n], o = null, s = null;
			if (a.forEach((e) => {
				e.semver === i && (e = new r(`>=0.0.0`)), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e);
			}), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1;
		}
		return !0;
	};
}));
var ae = o$6(((e, t) => {
	let n = H();
	t.exports = (e, t, r) => n(e, t, `>`, r);
}));
var oe = o$6(((e, t) => {
	let n = H();
	t.exports = (e, t, r) => n(e, t, `<`, r);
}));
var se = o$6(((e, t) => {
	let n = R();
	t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r));
}));
var ce = o$6(((e, t) => {
	let n = B(), r = C$1();
	t.exports = (e, t, i) => {
		let a = [], o = null, s = null, c = e.sort((e, t) => r(e, t, i));
		for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
		o && a.push([o, null]);
		let l = [];
		for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push(`*`) : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
		let u = l.join(` || `), d = typeof t.raw == `string` ? t.raw : String(t);
		return u.length < d.length ? u : t;
	};
}));
var U = o$6(((e, t) => {
	let n = R(), r = z(), { ANY: i } = r, a = B(), o = C$1(), s = (e, t, r = {}) => {
		if (e === t) return !0;
		e = new n(e, r), t = new n(t, r);
		let i = !1;
		OUTER: for (let n of e.set) {
			for (let e of t.set) {
				let t = u(n, e, r);
				if (i ||= t !== null, t) continue OUTER;
			}
			if (i) return !1;
		}
		return !0;
	}, c = [new r(`>=0.0.0-0`)], l = [new r(`>=0.0.0`)], u = (e, t, n) => {
		if (e === t) return !0;
		if (e.length === 1 && e[0].semver === i) {
			if (t.length === 1 && t[0].semver === i) return !0;
			e = n.includePrerelease ? c : l;
		}
		if (t.length === 1 && t[0].semver === i) {
			if (n.includePrerelease) return !0;
			t = l;
		}
		let r = /* @__PURE__ */ new Set(), s, u;
		for (let t of e) t.operator === `>` || t.operator === `>=` ? s = d(s, t, n) : t.operator === `<` || t.operator === `<=` ? u = f(u, t, n) : r.add(t.semver);
		if (r.size > 1) return null;
		let p;
		if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== `>=` || u.operator !== `<=`))) return null;
		for (let e of r) {
			if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
			for (let r of t) if (!a(e, String(r), n)) return !1;
			return !0;
		}
		let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1, y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
		v && v.prerelease.length === 1 && u.operator === `<` && v.prerelease[0] === 0 && (v = !1);
		for (let e of t) {
			if (_ = _ || e.operator === `>` || e.operator === `>=`, g = g || e.operator === `<` || e.operator === `<=`, s) {
				if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === `>` || e.operator === `>=`) {
					if (m = d(s, e, n), m === e && m !== s) return !1;
				} else if (s.operator === `>=` && !e.test(s.semver)) return !1;
			}
			if (u) {
				if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === `<` || e.operator === `<=`) {
					if (h = f(u, e, n), h === e && h !== u) return !1;
				} else if (u.operator === `<=` && !e.test(u.semver)) return !1;
			}
			if (!e.operator && (u || s) && p !== 0) return !1;
		}
		return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v);
	}, d = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r > 0 ? e : r < 0 || t.operator === `>` && e.operator === `>=` ? t : e;
	}, f = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r < 0 ? e : r > 0 || t.operator === `<` && e.operator === `<=` ? t : e;
	};
	t.exports = s;
}));
var W = o$6(((e, t) => {
	let n = u$3(), r = c$3(), i = p$3(), a = f$4();
	t.exports = {
		parse: m$3(),
		valid: h$3(),
		clean: g$2(),
		inc: _$2(),
		diff: v$2(),
		major: y$2(),
		minor: b$2(),
		patch: x$2(),
		prerelease: S$1(),
		compare: C$1(),
		rcompare: w$1(),
		compareLoose: T$1(),
		compareBuild: E(),
		sort: D(),
		rsort: O(),
		gt: k(),
		lt: A(),
		eq: j(),
		neq: M(),
		gte: N(),
		lte: P(),
		cmp: F(),
		coerce: I(),
		truncate: L(),
		Comparator: z(),
		Range: R(),
		satisfies: B(),
		toComparators: V(),
		maxSatisfying: te(),
		minSatisfying: ne(),
		minVersion: re(),
		validRange: ie(),
		outside: H(),
		gtr: ae(),
		ltr: oe(),
		intersects: se(),
		simplifyRange: ce(),
		subset: U(),
		SemVer: i,
		re: n.re,
		src: n.src,
		tokens: n.t,
		SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: r.RELEASE_TYPES,
		compareIdentifiers: a.compareIdentifiers,
		rcompareIdentifiers: a.rcompareIdentifiers
	};
}));
var G = W();
const K = typeof atom < `u`;
K ? atom.inDevMode() : process.env.NODE_ENV;
const le = `dependency-manager.disabledBy`;
function q(e) {
	if (K) {
		let t = atom.packages.getLoadedPackage(e);
		if (!t) throw Error(`Package "${e}" is not loaded`);
		return t.metadata.dependencyManager ?? {};
	}
	let i = (0, node_path.join)((0, node_os.homedir)(), `.atom`, `packages`, e, `package.json`);
	return JSON.parse((0, node_fs.readFileSync)(i, `utf-8`)).dependencyManager ?? {};
}
function ue(e) {
	return e.map((e) => typeof e == `string` ? [{ name: e }] : Array.isArray(e) ? e.map(J) : [J(e)]);
}
function de(e) {
	return e.map((e) => typeof e == `string` ? { name: e } : {
		name: e.name,
		version: e.version,
		reason: e.reason
	});
}
function J(e) {
	return {
		name: e.name,
		version: e.version
	};
}
function Y(t) {
	if (K) return atom.packages.resolvePackagePath(t) ?? void 0;
	let i = (0, node_path.join)((0, node_os.homedir)(), `.atom`, `packages`, t);
	return (0, node_fs.existsSync)(i) ? i : void 0;
}
function X(e) {
	if (K) {
		let t = atom.packages.getLoadedPackage(e);
		return t ? t.metadata.version : void 0;
	}
	let n = Y(e);
	if (n) try {
		return JSON.parse((0, node_fs.readFileSync)((0, node_path.join)(n, `package.json`), `utf-8`)).version;
	} catch {
		return;
	}
}
function Z(e) {
	return Y(e) !== void 0;
}
function fe(e) {
	return K ? atom.packages.isPackageActive(e) || atom.packages.isPackageLoaded(e) : Z(e);
}
var pe = s$5({
	promptConflicts: () => ve,
	promptInstall: () => me,
	promptRestore: () => ye,
	showInstallError: () => _e,
	showInstallSuccess: () => ge,
	showProgress: () => he
});
function me(e, t) {
	return new Promise((n) => {
		let r = t.map((e) => e.name).join(`, `), i = atom.notifications.addInfo(`**${e}** needs to install: ${r}`, {
			dismissable: !0,
			buttons: [
				{
					text: `Install`,
					onDidClick: () => {
						n(`yes`), i.dismiss();
					}
				},
				{
					text: `Not now`,
					onDidClick: () => {
						n(`no`), i.dismiss();
					}
				},
				{
					text: `Never`,
					onDidClick: () => {
						n(`never`), i.dismiss();
					}
				}
			]
		});
		i.onDidDismiss(() => {
			n(`no`);
		});
	});
}
function he(e) {
	let t = atom.notifications.addInfo(`Installing **${e}**…`, { dismissable: !1 });
	return { dismiss: () => t.dismiss() };
}
function ge(e) {
	atom.notifications.addSuccess(`Installed: ${e.join(`, `)}`, { dismissable: !0 });
}
function _e(e, t) {
	atom.notifications.addError(`Failed to install **${e}**`, {
		detail: t.message,
		dismissable: !0
	});
}
function ve(e, t) {
	return new Promise((n) => {
		let r = t.map((e) => {
			let t = `• ${e.name}`;
			return e.reason ? `${t} — ${e.reason}` : t;
		}).join(`
`), i = atom.notifications.addWarning(`**${e}** conflicts with active packages:`, {
			detail: r,
			dismissable: !0,
			buttons: [{
				text: `Disable & continue`,
				onDidClick: () => {
					n(`disable`), i.dismiss();
				}
			}, {
				text: `Cancel`,
				onDidClick: () => {
					n(`cancel`), i.dismiss();
				}
			}]
		});
		i.onDidDismiss(() => {
			n(`cancel`);
		});
	});
}
function ye(e, t) {
	return new Promise((n) => {
		let r = atom.notifications.addInfo(`**${e}** previously disabled: ${t.join(`, `)}. Re-enable them?`, {
			dismissable: !0,
			buttons: [{
				text: `Re-enable`,
				onDidClick: () => {
					n(`restore`), r.dismiss();
				}
			}, {
				text: `Keep disabled`,
				onDidClick: () => {
					n(`keep`), r.dismiss();
				}
			}]
		});
		r.onDidDismiss(() => {
			n(`dismiss`);
		});
	});
}
var be = s$5({
	promptConflicts: () => we,
	promptInstall: () => xe,
	promptRestore: () => Te,
	showInstallError: () => Ce,
	showInstallSuccess: () => Se,
	showProgress: () => Q
});
function xe(e, t) {
	let n = t.map((e) => e.name).join(`, `);
	return console.log(`[dependency-manager] Missing dependencies: ${n}`), console.log(`[dependency-manager] Auto-installing (non-interactive mode)`), Promise.resolve(`yes`);
}
function Q(e) {
	return console.log(`[dependency-manager] Installing ${e}…`), { dismiss: () => {} };
}
function Se(e) {
	console.log(`[dependency-manager] Installed: ${e.join(`, `)}`);
}
function Ce(e, t) {
	console.error(`[dependency-manager] Failed to install ${e}: ${t.message}`);
}
function we(e, t) {
	let n = t.map((e) => e.name).join(`, `);
	return console.warn(`[dependency-manager] Conflicts detected: ${n}`), Promise.resolve(`cancel`);
}
function Te(e, t) {
	return console.log(`[dependency-manager] Previously disabled packages: ${t.join(`, `)}`), Promise.resolve(`dismiss`);
}
const $ = K ? pe : be;
function Ee() {
	return K ? atom.packages.getApmPath() : process.env.APM_PATH ?? `apm`;
}
function De(e) {
	return new Promise((t, n) => {
		(0, node_child_process.execFile)(Ee(), [`install`, e], { timeout: 12e4 }, (r, i, a) => {
			if (r) {
				n(Error(`Failed to install "${e}": ${a || r.message}`));
				return;
			}
			t();
		});
	});
}
async function Oe(e, t) {
	if ((K ? atom.config.get(`dependency-manager.ignored`) ?? [] : []).includes(e)) return;
	let n = q(e).dependsOn;
	if (!n || n.length === 0) return;
	let r = ue(n), i = [];
	for (let e of r) e.some((e) => ke(e)) || i.push(e[0]);
	if (i.length === 0) return;
	if (!t?.hideUserPrompt) {
		let t = await $.promptInstall(e, i);
		if (t === `never`) {
			if (K) {
				let t = atom.config.get(`dependency-manager.ignored`) ?? [];
				atom.config.set(`dependency-manager.ignored`, [...t, e]);
			}
			return;
		}
		if (t === `no`) return;
	}
	let a = [];
	for (let e of i) {
		let t = $.showProgress(e.name);
		try {
			await De(e.name), a.push(e.name), K && atom.packages.activatePackage(e.name);
		} catch (t) {
			$.showInstallError(e.name, t);
		} finally {
			t.dismiss();
		}
	}
	a.length > 0 && $.showInstallSuccess(a);
}
function ke(e) {
	if (!Z(e.name)) return !1;
	if (!e.version) return !0;
	let t = X(e.name);
	if (!t) return !1;
	if ((0, G.satisfies)(t, e.version)) return !0;
	let n = (0, G.minVersion)(e.version);
	return n && (0, G.gt)(t, n.version) ? (console.warn(`[dependency-manager] "${e.name}" v${t} is newer than required range "${e.version}". Skipping (apm cannot downgrade).`), !0) : !1;
}

//#endregion
//#region node_modules/@children-of-atom/dependency-manager/dist/index.mjs
var l$2 = W();
var u$2 = class extends Error {
	constructor(e = `User declined to resolve conflicts`) {
		super(e), this.name = `ConflictDeclinedError`;
	}
};
async function d$2(e) {
	if (!K) return;
	let n = atom.config.get(`dependency-manager.disabledBy`) ?? {}, r = n[e];
	if (!r || r.length === 0) return;
	let a = await $.promptRestore(e, r);
	if (a === `restore`) {
		for (let e of r) atom.packages.enablePackage(e);
		delete n[e], atom.config.set(le, n);
	} else a === `keep` && (delete n[e], atom.config.set(le, n));
}
const f$3 = /* @__PURE__ */ new Map();
const p$2 = /* @__PURE__ */ new Map();
const m$2 = /* @__PURE__ */ new Set();
async function h$2(e) {
	let t = g$1(e);
	if (t.length === 0) return;
	let n = t.filter(_$1);
	if (n.length > 0) {
		if (await $.promptConflicts(e, n) === `cancel`) throw new u$2();
		v$1(e, n);
	}
	y$1(e), b$1(e, t);
}
function g$1(t) {
	let n = q(t);
	return n.conflictsWith ? de(n.conflictsWith) : [];
}
function _$1(e) {
	if (!fe(e.name) || K && atom.packages.isPackageDisabled(e.name)) return !1;
	if (e.version) {
		let t = X(e.name);
		return t ? (0, l$2.satisfies)(t, e.version) : (console.warn(`[dependency-manager] Cannot read version for "${e.name}", treating as conflicting.`), !0);
	}
	return !0;
}
function v$1(e, n) {
	if (!K) return;
	let r = n.map((e) => e.name);
	for (let e of r) atom.packages.disablePackage(e);
	let i = atom.config.get(`dependency-manager.disabledBy`) ?? {};
	i[e] = [.../* @__PURE__ */ new Set([...i[e] ?? [], ...r])], atom.config.set(le, i);
}
function y$1(e) {
	if (!K || f$3.has(e)) return;
	let n = atom.packages.onDidDeactivatePackage((t) => {
		t.name === e && (n.dispose(), f$3.delete(e), p$2.get(e)?.dispose(), p$2.delete(e), d$2(e).catch((t) => {
			console.error(`[dependency-manager] Failed to restore conflicts for "${e}":`, t);
		}));
	});
	f$3.set(e, n);
}
function b$1(e, n) {
	if (!K || p$2.has(e)) return;
	let r = atom.packages.onDidActivatePackage((t) => {
		let r = `${e}:${t.name}`;
		if (t.name === e || m$2.has(r)) return;
		let a = n.find((e) => e.name === t.name);
		!a || !_$1(a) || (m$2.add(r), $.promptConflicts(e, [a]).then((t) => {
			t === `disable` && v$1(e, [a]);
		}).catch((e) => {
			console.error(`[dependency-manager] Failed to resolve conflict with "${t.name}":`, e);
		}).finally(() => {
			m$2.delete(r);
		}));
	});
	p$2.set(e, r);
}
async function x$1(e, t) {
	await h$2(e), await Oe(e, t);
}

//#endregion
//#region package.json
var name = "buildium";
var version = "0.79.1";

//#endregion
//#region src/utils.ts
const genName = (base, index) => `${base} - ${index}`;
function uniquifySettings(settings) {
	const newSettings = [];
	settings.forEach((setting) => {
		let i = 0;
		let testName = setting.name;
		while (newSettings.find((ns) => ns.name === testName)) testName = genName(setting.name, ++i);
		newSettings.push({
			...setting,
			name: testName
		});
	});
	return newSettings;
}
function activePath() {
	const textEditor = atom.workspace.getActiveTextEditor();
	if (!textEditor || !textEditor.getPath()) {
		if (0 === atom.project.getPaths().length) return false;
		return atom.project.getPaths()[0];
	}
	return atom.project.getPaths().toSorted((a, b) => b.length - a.length).find((p) => {
		try {
			const realpath = fs.default.realpathSync(p);
			return fs.default.realpathSync(textEditor.getPath()).substr(0, realpath.length) === realpath;
		} catch {
			return false;
		}
	});
}
function getDefaultSettings(cwd, setting) {
	return {
		...setting,
		env: setting.env || {},
		args: setting.args || [],
		cwd: setting.cwd || cwd,
		sh: void 0 === setting.sh ? true : setting.sh,
		errorMatch: setting.errorMatch || ""
	};
}
function replace(value = "", targetEnv) {
	if (typeof value !== "string") return value;
	const env = {
		...process.env,
		...targetEnv
	};
	let result = value.replace(/\$(\w+)/g, (match, variable) => variable in env ? env[variable] : match);
	const editor = atom.workspace.getActiveTextEditor();
	const projectPaths = atom.project.getPaths().map((projectPath) => {
		try {
			return fs.default.realpathSync(projectPath);
		} catch {
			return null;
		}
	});
	let projectPath = projectPaths[0];
	const editorPath = editor?.getPath();
	if (editor && editorPath) {
		const activeFile = fs.default.realpathSync(editorPath);
		const activeFilePath = path.default.dirname(activeFile);
		projectPath = projectPaths.find((p) => p !== null && activeFilePath.startsWith(p)) ?? projectPath;
		const cursorScreenPosition = editor.getCursorScreenPosition();
		result = result.replace(/{FILE_ACTIVE}/g, activeFile).replace(/{FILE_ACTIVE_PATH}/g, activeFilePath).replace(/{FILE_ACTIVE_NAME}/g, path.default.basename(activeFile)).replace(/{FILE_ACTIVE_NAME_BASE}/g, path.default.basename(activeFile, path.default.extname(activeFile))).replace(/{SELECTION}/g, editor.getSelectedText()).replace(/{FILE_ACTIVE_CURSOR_ROW}/g, String(cursorScreenPosition.row + 1)).replace(/{FILE_ACTIVE_CURSOR_COLUMN}/g, String(cursorScreenPosition.column + 1));
	}
	result = result.replace(/{PROJECT_PATH}/g, projectPath ?? "");
	const repository = atom.project.getRepositories()[0];
	if (repository) result = result.replace(/{REPO_BRANCH_SHORT}/g, repository.getShortHead());
	return result;
}
function capitalizedName() {
	return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}
function getVersion() {
	return `v${version}`;
}
/**
* Every file name that can produce build targets, in order of precedence — the
* order documented in the readme, and the order cosmiconfig searches.
*
* This is the single source of truth for two things that must not drift apart:
* which files `atom-build.ts` reads, and which files `build-file-watcher.ts`
* refreshes on. `package.json` only counts when it carries a `buildium` object;
* cosmiconfig enforces that through `packageProp`.
*/
const buildFileNames = [
	"package.json",
	"buildium.config.cts",
	"buildium.config.mts",
	"buildium.config.ts",
	"buildium.config.cjs",
	"buildium.config.mjs",
	"buildium.config.js",
	"buildium.config.json",
	"buildium.config.json5",
	"buildium.config.jsonc",
	"buildium.config.toml",
	"buildium.config.pkl",
	"buildium.config.yaml",
	"buildium.config.yml",
	".buildium.cts",
	".buildium.mts",
	".buildium.ts",
	".buildium.cjs",
	".buildium.mjs",
	".buildium.js",
	".buildium.json",
	".buildium.json5",
	".buildium.jsonc",
	".buildium.toml",
	".buildium.pkl",
	".buildium.yaml",
	".buildium.yml"
];
/**
* The subset valid as a home-directory fallback, which applies to every
* project. `package.json` is excluded deliberately: a `~/package.json` is
* usually an accident of running `npm init` in the wrong directory, and letting
* one silently supply build targets to every project would be surprising.
*/
const homeBuildFileNames = buildFileNames.filter((file) => file !== "package.json");

//#endregion
//#region src/build-error.ts
var BuildError = class BuildError extends Error {
	constructor(name, message) {
		super(message);
		this.name = name;
		this.message = message;
		Error.captureStackTrace(this, BuildError);
	}
};

//#endregion
//#region node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
const noop = () => {};
/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
/**
* TODO replace with Promise.withResolvers once supported widely enough
* @template [T=void]
*/
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;
	/** @type {(reason: any) => void} */
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}

//#endregion
//#region node_modules/svelte/src/internal/client/constants.js
/**
* An effect that does not destroy its child effects when it reruns.
* Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
*/
const MANAGED_EFFECT = 1 << 24;
const CLEAN = 1024;
const DIRTY = 2048;
const MAYBE_DIRTY = 4096;
const INERT = 8192;
const DESTROYED = 16384;
/** Set once a reaction has run for the first time */
const REACTION_RAN = 32768;
/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
const DESTROYING = 1 << 25;
/**
* 'Transparent' effects do not create a transition boundary.
* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
*/
const EFFECT_TRANSPARENT = 65536;
const EAGER_EFFECT = 1 << 17;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const EFFECT_OFFSCREEN = 1 << 25;
/**
* Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
* Will be lifted during execution of the derived and during checking its dirty state (both are necessary
* because a derived might be checked but not executed). This is a pure performance optimization flag and
* should not be used for any other purpose!
*/
const WAS_MARKED = 65536;
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;
const ERROR_VALUE = 1 << 23;
const STATE_SYMBOL = Symbol("$state");
const LEGACY_PROPS = Symbol("legacy props");
const LOADING_ATTR_SYMBOL = Symbol("");
const PROXY_PATH_SYMBOL = Symbol("proxy path");
const ATTRIBUTES_CACHE = Symbol("attributes");
const CLASS_CACHE = Symbol("class");
const STYLE_CACHE = Symbol("style");
const TEXT_CACHE = Symbol("text");
const FORM_RESET_HANDLER = Symbol("form reset");
/** An anchor might change, via this symbol on the original anchor we can tell HMR about the updated anchor */
const HMR_ANCHOR = Symbol("hmr anchor");
/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
const STALE_REACTION = new class StaleReactionError extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
const IS_XHTML = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");

//#endregion
//#region node_modules/svelte/src/internal/shared/errors.js
/**
* A snippet function was passed invalid arguments. Snippets should only be instantiated via `{@render ...}`
* @returns {never}
*/
function invalid_snippet_arguments() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`invalid_snippet_arguments\nA snippet function was passed invalid arguments. Snippets should only be instantiated via \`{@render ...}\`\nhttps://svelte.dev/e/invalid_snippet_arguments`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/invalid_snippet_arguments`);
}
/**
* An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "%message%"
* @param {string} message
* @returns {never}
*/
function invariant_violation(message) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`invariant_violation\nAn invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app — please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${message}"\nhttps://svelte.dev/e/invariant_violation`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/invariant_violation`);
}
/**
* Attempted to render a snippet without a `{@render}` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change `{snippet}` to `{@render snippet()}`.
* @returns {never}
*/
function snippet_without_render_tag() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`snippet_without_render_tag\nAttempted to render a snippet without a \`{@render}\` block. This would cause the snippet code to be stringified instead of its content being rendered to the DOM. To fix this, change \`{snippet}\` to \`{@render snippet()}\`.\nhttps://svelte.dev/e/snippet_without_render_tag`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/snippet_without_render_tag`);
}

//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
/**
* Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
* @returns {never}
*/
function async_derived_orphan() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`async_derived_orphan\nCannot create a \`$derived(...)\` with an \`await\` expression outside of an effect tree\nhttps://svelte.dev/e/async_derived_orphan`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/async_derived_orphan`);
}
/**
* Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead
* @returns {never}
*/
function bind_invalid_checkbox_value() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`bind_invalid_checkbox_value\nUsing \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead\nhttps://svelte.dev/e/bind_invalid_checkbox_value`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
}
/**
* Calling `%method%` on a component instance (of %component%) is no longer valid in Svelte 5
* @param {string} method
* @param {string} component
* @returns {never}
*/
function component_api_changed(method, component) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`component_api_changed\nCalling \`${method}\` on a component instance (of ${component}) is no longer valid in Svelte 5\nhttps://svelte.dev/e/component_api_changed`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/component_api_changed`);
}
/**
* Attempted to instantiate %component% with `new %name%`, which is no longer valid in Svelte 5. If this component is not under your control, set the `compatibility.componentApi` compiler option to `4` to keep it working.
* @param {string} component
* @param {string} name
* @returns {never}
*/
function component_api_invalid_new(component, name) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`component_api_invalid_new\nAttempted to instantiate ${component} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.\nhttps://svelte.dev/e/component_api_invalid_new`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
}
/**
* A derived value cannot reference itself recursively
* @returns {never}
*/
function derived_references_self() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`derived_references_self\nA derived value cannot reference itself recursively\nhttps://svelte.dev/e/derived_references_self`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/derived_references_self`);
}
/**
* Keyed each block has duplicate key `%value%` at indexes %a% and %b%
* @param {string} a
* @param {string} b
* @param {string | undefined | null} [value]
* @returns {never}
*/
function each_key_duplicate(a, b, value) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`each_key_duplicate\n${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}\nhttps://svelte.dev/e/each_key_duplicate`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/each_key_duplicate`);
}
/**
* Keyed each block has key that is not idempotent — the key for item at index %index% was `%a%` but is now `%b%`. Keys must be the same each time for a given item
* @param {string} index
* @param {string} a
* @param {string} b
* @returns {never}
*/
function each_key_volatile(index, a, b) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`each_key_volatile\nKeyed each block has key that is not idempotent — the key for item at index ${index} was \`${a}\` but is now \`${b}\`. Keys must be the same each time for a given item\nhttps://svelte.dev/e/each_key_volatile`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/each_key_volatile`);
}
/**
* `%rune%` cannot be used inside an effect cleanup function
* @param {string} rune
* @returns {never}
*/
function effect_in_teardown(rune) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`effect_in_teardown\n\`${rune}\` cannot be used inside an effect cleanup function\nhttps://svelte.dev/e/effect_in_teardown`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/effect_in_teardown`);
}
/**
* Effect cannot be created inside a `$derived` value that was not itself created inside an effect
* @returns {never}
*/
function effect_in_unowned_derived() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`effect_in_unowned_derived\nEffect cannot be created inside a \`$derived\` value that was not itself created inside an effect\nhttps://svelte.dev/e/effect_in_unowned_derived`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
/**
* `%rune%` can only be used inside an effect (e.g. during component initialisation)
* @param {string} rune
* @returns {never}
*/
function effect_orphan(rune) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`effect_orphan\n\`${rune}\` can only be used inside an effect (e.g. during component initialisation)\nhttps://svelte.dev/e/effect_orphan`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/effect_orphan`);
}
/**
* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
* @returns {never}
*/
function effect_update_depth_exceeded() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`effect_update_depth_exceeded\nMaximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state\nhttps://svelte.dev/e/effect_update_depth_exceeded`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
/**
* Failed to hydrate the application
* @returns {never}
*/
function hydration_failed() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`hydration_failed\nFailed to hydrate the application\nhttps://svelte.dev/e/hydration_failed`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/hydration_failed`);
}
/**
* Could not `{@render}` snippet due to the expression being `null` or `undefined`. Consider using optional chaining `{@render snippet?.()}`
* @returns {never}
*/
function invalid_snippet() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`invalid_snippet\nCould not \`{@render}\` snippet due to the expression being \`null\` or \`undefined\`. Consider using optional chaining \`{@render snippet?.()}\`\nhttps://svelte.dev/e/invalid_snippet`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/invalid_snippet`);
}
/**
* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
* @param {string} key
* @returns {never}
*/
function props_invalid_value(key) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`props_invalid_value\nCannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value\nhttps://svelte.dev/e/props_invalid_value`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/props_invalid_value`);
}
/**
* The `%rune%` rune is only available inside `.svelte` and `.svelte.js/ts` files
* @param {string} rune
* @returns {never}
*/
function rune_outside_svelte(rune) {
	if (true) {
		const error = /* @__PURE__ */ new Error(`rune_outside_svelte\nThe \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files\nhttps://svelte.dev/e/rune_outside_svelte`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
}
/**
* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
* @returns {never}
*/
function state_descriptors_fixed() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`state_descriptors_fixed\nProperty descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.\nhttps://svelte.dev/e/state_descriptors_fixed`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
/**
* Cannot set prototype of `$state` object
* @returns {never}
*/
function state_prototype_fixed() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`state_prototype_fixed\nCannot set prototype of \`$state\` object\nhttps://svelte.dev/e/state_prototype_fixed`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
/**
* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
* @returns {never}
*/
function state_unsafe_mutation() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`state_unsafe_mutation\nUpdating state inside \`$derived(...)\`, \`$inspect(...)\` or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`\nhttps://svelte.dev/e/state_unsafe_mutation`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
/**
* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
* @returns {never}
*/
function svelte_boundary_reset_onerror() {
	if (true) {
		const error = /* @__PURE__ */ new Error(`svelte_boundary_reset_onerror\nA \`<svelte:boundary>\` \`reset\` function cannot be called while an error is still being handled\nhttps://svelte.dev/e/svelte_boundary_reset_onerror`);
		error.name = "Svelte error";
		throw error;
	} else throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}

//#endregion
//#region node_modules/svelte/src/constants.js
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol("uninitialized");
const FILENAME = Symbol("filename");
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";

//#endregion
//#region node_modules/svelte/src/internal/client/warnings.js
var bold = "font-weight: bold";
var normal = "font-weight: normal";
/**
* Detected reactivity loss when reading `%name%`. This happens when state is read in an async function after an earlier `await`
* @param {string} name
*/
function await_reactivity_loss(name) {
	if (true) console.warn(`%c[svelte] await_reactivity_loss\n%cDetected reactivity loss when reading \`${name}\`. This happens when state is read in an async function after an earlier \`await\`\nhttps://svelte.dev/e/await_reactivity_loss`, bold, normal);
	else console.warn(`https://svelte.dev/e/await_reactivity_loss`);
}
/**
* An async derived, `%name%` (%location%) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app
* @param {string} name
* @param {string} location
*/
function await_waterfall(name, location) {
	if (true) console.warn(`%c[svelte] await_waterfall\n%cAn async derived, \`${name}\` (${location}) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app\nhttps://svelte.dev/e/await_waterfall`, bold, normal);
	else console.warn(`https://svelte.dev/e/await_waterfall`);
}
/**
* Reading a derived belonging to a now-destroyed effect may result in stale values
*/
function derived_inert() {
	if (true) console.warn(`%c[svelte] derived_inert\n%cReading a derived belonging to a now-destroyed effect may result in stale values\nhttps://svelte.dev/e/derived_inert`, bold, normal);
	else console.warn(`https://svelte.dev/e/derived_inert`);
}
/**
* %handler% should be a function. Did you mean to %suggestion%?
* @param {string} handler
* @param {string} suggestion
*/
function event_handler_invalid(handler, suggestion) {
	if (true) console.warn(`%c[svelte] event_handler_invalid\n%c${handler} should be a function. Did you mean to ${suggestion}?\nhttps://svelte.dev/e/event_handler_invalid`, bold, normal);
	else console.warn(`https://svelte.dev/e/event_handler_invalid`);
}
/**
* The `%attribute%` attribute on `%html%` changed its value between server and client renders. The client value, `%value%`, will be ignored in favour of the server value
* @param {string} attribute
* @param {string} html
* @param {string} value
*/
function hydration_attribute_changed(attribute, html, value) {
	if (true) console.warn(`%c[svelte] hydration_attribute_changed\n%cThe \`${attribute}\` attribute on \`${html}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value\nhttps://svelte.dev/e/hydration_attribute_changed`, bold, normal);
	else console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
}
/**
* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
* @param {string | undefined | null} [location]
*/
function hydration_mismatch(location) {
	if (true) console.warn(`%c[svelte] hydration_mismatch\n%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}\nhttps://svelte.dev/e/hydration_mismatch`, bold, normal);
	else console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
/**
* Tried to unmount a component that was not mounted
*/
function lifecycle_double_unmount() {
	if (true) console.warn(`%c[svelte] lifecycle_double_unmount\n%cTried to unmount a component that was not mounted\nhttps://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
	else console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
}
/**
* %parent% passed property `%prop%` to %child% with `bind:`, but its parent component %owner% did not declare `%prop%` as a binding. Consider creating a binding between %owner% and %parent% (e.g. `bind:%prop%={...}` instead of `%prop%={...}`)
* @param {string} parent
* @param {string} prop
* @param {string} child
* @param {string} owner
*/
function ownership_invalid_binding(parent, prop, child, owner) {
	if (true) console.warn(`%c[svelte] ownership_invalid_binding\n%c${parent} passed property \`${prop}\` to ${child} with \`bind:\`, but its parent component ${owner} did not declare \`${prop}\` as a binding. Consider creating a binding between ${owner} and ${parent} (e.g. \`bind:${prop}={...}\` instead of \`${prop}={...}\`)\nhttps://svelte.dev/e/ownership_invalid_binding`, bold, normal);
	else console.warn(`https://svelte.dev/e/ownership_invalid_binding`);
}
/**
* Mutating unbound props (`%name%`, at %location%) is strongly discouraged. Consider using `bind:%prop%={...}` in %parent% (or using a callback) instead
* @param {string} name
* @param {string} location
* @param {string} prop
* @param {string} parent
*/
function ownership_invalid_mutation(name, location, prop, parent) {
	if (true) console.warn(`%c[svelte] ownership_invalid_mutation\n%cMutating unbound props (\`${name}\`, at ${location}) is strongly discouraged. Consider using \`bind:${prop}={...}\` in ${parent} (or using a callback) instead\nhttps://svelte.dev/e/ownership_invalid_mutation`, bold, normal);
	else console.warn(`https://svelte.dev/e/ownership_invalid_mutation`);
}
/**
* Reactive `$state(...)` proxies and the values they proxy have different identities. Because of this, comparisons with `%operator%` will produce unexpected results
* @param {string} operator
*/
function state_proxy_equality_mismatch(operator) {
	if (true) console.warn(`%c[svelte] state_proxy_equality_mismatch\n%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results\nhttps://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
	else console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
}
/**
* Tried to unmount a state proxy, rather than a component
*/
function state_proxy_unmount() {
	if (true) console.warn(`%c[svelte] state_proxy_unmount\n%cTried to unmount a state proxy, rather than a component\nhttps://svelte.dev/e/state_proxy_unmount`, bold, normal);
	else console.warn(`https://svelte.dev/e/state_proxy_unmount`);
}
/**
* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
*/
function svelte_boundary_reset_noop() {
	if (true) console.warn(`%c[svelte] svelte_boundary_reset_noop\n%cA \`<svelte:boundary>\` \`reset\` function only resets the boundary the first time it is called\nhttps://svelte.dev/e/svelte_boundary_reset_noop`, bold, normal);
	else console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
/** @import { TemplateNode } from '#client' */
/**
* Use this variable to guard everything related to hydration code so it can be treeshaken out
* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
*/
let hydrating = false;
/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}
/**
* The node that is currently being hydrated. This starts out as the first node inside the opening
* <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
* When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
* time we leave the block it is the closing comment, which serves as the block's anchor.
* @type {TemplateNode}
*/
let hydrate_node;
/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
/** @param {TemplateNode} node */
function reset(node) {
	if (!hydrating) return;
	if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	hydrate_node = node;
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
/**
* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
* @param {boolean} remove
*/
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data = node.data;
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
		}
		var next = /* @__PURE__ */ get_next_sibling(node);
		if (remove) node.remove();
		node = next;
	}
}
/**
*
* @param {TemplateNode} node
*/
function read_hydration_instruction(node) {
	if (!node || node.nodeType !== 8) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return node.data;
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
/** @import { Equals } from '#client' */
/** @type {Equals} */
function equals$1(value) {
	return value === this.v;
}
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}

//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
/** True if experimental.async=true */
let async_mode_flag = false;
/** True if we're not certain that we only have Svelte 5 code in the compilation */
let legacy_mode_flag = false;
/** True if $inspect.trace is used */
let tracing_mode_flag = false;

//#endregion
//#region node_modules/svelte/src/internal/client/dev/tracing.js
/**
* @typedef {{
*   traces: Error[];
* }} TraceEntry
*/
/** @type {{ reaction: Reaction | null, entries: Map<Value, TraceEntry> } | null} */
let tracing_expressions = null;
/**
* @param {Value} source
* @param {string} label
*/
function tag(source, label) {
	source.label = label;
	tag_proxy(source.v, label);
	return source;
}
/**
* @param {unknown} value
* @param {string} label
*/
function tag_proxy(value, label) {
	value?.[PROXY_PATH_SYMBOL]?.(label);
	return value;
}

//#endregion
//#region node_modules/svelte/src/internal/shared/dev.js
/**
* @param {string} label
* @returns {Error & { stack: string } | null}
*/
function get_error(label) {
	const error = /* @__PURE__ */ new Error();
	const stack = get_stack();
	if (stack.length === 0) return null;
	stack.unshift("\n");
	define_property(error, "stack", { value: stack.join("\n") });
	define_property(error, "name", { value: label });
	return error;
}
/**
* @returns {string[]}
*/
function get_stack() {
	const limit = Error.stackTraceLimit;
	Error.stackTraceLimit = Infinity;
	const stack = (/* @__PURE__ */ new Error()).stack;
	Error.stackTraceLimit = limit;
	if (!stack) return [];
	const lines = stack.split("\n");
	const new_lines = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const posixified = line.replaceAll("\\", "/");
		if (line.trim() === "Error") continue;
		if (line.includes("validate_each_keys")) return [];
		if (posixified.includes("svelte/src/internal") || posixified.includes("node_modules/.vite")) continue;
		new_lines.push(line);
	}
	return new_lines;
}
/**
* @param {boolean} condition
* @param {string} message
*/
function invariant(condition, message) {
	if (!true) throw new Error("invariant(...) was not guarded by if (DEV)");
	if (!condition) invariant_violation(message);
}

//#endregion
//#region node_modules/svelte/src/internal/client/context.js
/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
/** @type {ComponentContext | null} */
let component_context = null;
/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}
/** @type {DevStackEntry | null} */
let dev_stack = null;
/** @param {DevStackEntry | null} stack */
function set_dev_stack(stack) {
	dev_stack = stack;
}
/**
* Execute a callback with a new dev stack entry
* @param {() => any} callback - Function to execute
* @param {DevStackEntry['type']} type - Type of block/component
* @param {any} component - Component function
* @param {number} line - Line number
* @param {number} column - Column number
* @param {Record<string, any>} [additional] - Any additional properties to add to the dev stack entry
* @returns {any}
*/
function add_svelte_meta(callback, type, component, line, column, additional) {
	const parent = dev_stack;
	dev_stack = {
		type,
		file: component[FILENAME],
		line,
		column,
		parent,
		...additional
	};
	try {
		return callback();
	} finally {
		dev_stack = parent;
	}
}
/**
* The current component function. Different from current component context:
* ```html
* <!-- App.svelte -->
* <Foo>
*   <Bar /> <!-- context == Foo.svelte, function == App.svelte -->
* </Foo>
* ```
* @type {ComponentContext['function']}
*/
let dev_current_component_function = null;
/** @param {ComponentContext['function']} fn */
function set_dev_current_component_function(fn) {
	dev_current_component_function = fn;
}
/**
* @param {Record<string, unknown>} props
* @param {any} runes
* @param {Function} [fn]
* @returns {void}
*/
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: active_effect,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
	if (true) {
		component_context.function = fn;
		dev_current_component_function = fn;
	}
}
/**
* @template {Record<string, any>} T
* @param {T} [component]
* @returns {T}
*/
function pop(component) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component !== void 0) context.x = component;
	context.i = true;
	component_context = context.p;
	if (true) dev_current_component_function = component_context?.function ?? null;
	return component ?? {};
}
/** @returns {boolean} */
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
/** @type {Array<() => void>} */
let micro_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
/**
* @param {() => void} fn
*/
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
/**
* Synchronously run any queued tasks.
*/
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}

//#endregion
//#region node_modules/svelte/src/internal/client/error-handling.js
/** @import { Derived, Effect } from '#client' */
/** @import { Boundary } from './dom/blocks/boundary.js' */
const adjustments = /* @__PURE__ */ new WeakMap();
/**
* @param {unknown} error
*/
function handle_error(error) {
	var effect = active_effect;
	if (effect === null) {
		/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
		return error;
	}
	if (true && error instanceof Error && !adjustments.has(error)) adjustments.set(error, get_adjustments(error, effect));
	if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) {
		if (true && !effect.parent && error instanceof Error) apply_adjustments(error);
		throw error;
	}
	invoke_error_boundary(error, effect);
}
/**
* @param {unknown} error
* @param {Effect | null} effect
*/
function invoke_error_boundary(error, effect) {
	if (effect !== null && (effect.f & 16384) !== 0) return;
	while (effect !== null) {
		if ((effect.f & 128) !== 0) {
			if ((effect.f & 32768) === 0) throw error;
			try {
				/** @type {Boundary} */ effect.b.error(error);
				return;
			} catch (e) {
				error = e;
			}
		}
		effect = effect.parent;
	}
	if (true && error instanceof Error) apply_adjustments(error);
	throw error;
}
/**
* Add useful information to the error message/stack in development
* @param {Error} error
* @param {Effect} effect
*/
function get_adjustments(error, effect) {
	const message_descriptor = get_descriptor(error, "message");
	if (message_descriptor && !message_descriptor.configurable) return;
	var indent = is_firefox ? "  " : "	";
	var component_stack = `\n${indent}in ${effect.fn?.name || "<unknown>"}`;
	var context = effect.ctx;
	while (context !== null) {
		component_stack += `\n${indent}in ${context.function?.[FILENAME].split("/").pop()}`;
		context = context.p;
	}
	return {
		message: error.message + `\n${component_stack}\n`,
		stack: error.stack?.split("\n").filter((line) => !line.includes("svelte/src/internal")).join("\n")
	};
}
/**
* @param {Error} error
*/
function apply_adjustments(error) {
	const adjusted = adjustments.get(error);
	if (adjusted) {
		define_property(error, "message", { value: adjusted.message });
		define_property(error, "stack", { value: adjusted.stack });
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
/** @import { Derived, Signal } from '#client' */
const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
/**
* @param {Signal} signal
* @param {number} status
*/
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
/**
* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
* @param {Derived} derived
*/
function update_derived_status(derived) {
	if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
	else set_signal_status(derived, MAYBE_DIRTY);
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
/** @import { Derived, Effect, Value } from '#client' */
/**
* @param {Value[] | null} deps
*/
function clear_marked(deps) {
	if (deps === null) return;
	for (const dep of deps) {
		if ((dep.f & 2) === 0 || (dep.f & 65536) === 0) continue;
		dep.f ^= WAS_MARKED;
		clear_marked(
			/** @type {Derived} */
			dep.deps
		);
	}
}
/**
* @param {Effect} effect
* @param {Set<Effect>} dirty_effects
* @param {Set<Effect>} maybe_dirty_effects
*/
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
	if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
	else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
	clear_marked(effect.deps);
	set_signal_status(effect, CLEAN);
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
/**
* We set this to `true` when updating a store so that we correctly
* schedule effects if the update takes place inside a `$:` effect
*/
let legacy_is_updating_store = false;
/**
* Whether or not the prop currently being read is a store binding, as in
* `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
* runes mode, and skip `binding_property_non_reactive` validation
*/
let is_store_binding = false;
/**
* Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
* Used to prevent `binding_property_non_reactive` validation false positives and
* ensure that these props are treated as mutable even in runes mode
* @template T
* @param {() => T} fn
* @returns {[T, boolean]}
*/
function capture_store_binding(fn) {
	var previous_is_store_binding = is_store_binding;
	try {
		is_store_binding = false;
		return [fn(), is_store_binding];
	} finally {
		is_store_binding = previous_is_store_binding;
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/misc.js
/**
* @param {HTMLElement} dom
* @param {boolean} value
* @returns {void}
*/
function autofocus(dom, value) {
	if (value) {
		const body = document.body;
		dom.autofocus = true;
		queue_micro_task(() => {
			if (document.activeElement === body) dom.focus();
		});
	}
}
let listening_to_form_reset = false;
function add_form_reset_listener() {
	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener("reset", (evt) => {
			Promise.resolve().then(() => {
				if (!evt.defaultPrevented) for (const e of evt.target.elements)
 /** @type {any} */ e[FORM_RESET_HANDLER]?.();
			});
		}, { capture: true });
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
/**
* @template T
* @param {() => T} fn
*/
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
/**
* Listen to the given event, and then instantiate a global form reset listener if not already done,
* to notify all bindings when the form is reset
* @param {HTMLElement} element
* @param {string} event
* @param {(is_reset?: true) => void} handler
* @param {(is_reset?: true) => void} [on_reset]
*/
function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
	element.addEventListener(event, () => without_reactive_context(handler));
	const prev = element[FORM_RESET_HANDLER];
	if (prev)
 /** @type {any} */ element[FORM_RESET_HANDLER] = () => {
		prev();
		on_reset(true);
	};
	else
 /** @type {any} */ element[FORM_RESET_HANDLER] = () => on_reset(true);
	add_form_reset_listener();
}

//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	if (true) tag(version, "createSubscriber version");
	return () => {
		if (effect_tracking()) {
			get(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop?.();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
/** @import { Effect, Source, TemplateNode, } from '#client' */
/**
* @typedef {{
* 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
*   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
*   pending?: ((anchor: Node) => void) | null;
* }} BoundaryProps
*/
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
/**
* @param {TemplateNode} node
* @param {BoundaryProps} props
* @param {((anchor: Node) => void)} children
* @param {((error: unknown) => unknown) | undefined} [transform_error]
* @returns {void}
*/
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}
var Boundary = class {
	/** @type {Boundary | null} */
	parent;
	is_pending = false;
	/**
	* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
	* Inherited from parent boundary, or defaults to identity.
	* @type {(error: unknown) => unknown}
	*/
	transform_error;
	/** @type {TemplateNode} */
	#anchor;
	/** @type {TemplateNode | null} */
	#hydrate_open = hydrating ? hydrate_node : null;
	/** @type {BoundaryProps} */
	#props;
	/** @type {((anchor: Node) => void)} */
	#children;
	/** @type {Effect} */
	#effect;
	/** @type {Effect | null} */
	#main_effect = null;
	/** @type {Effect | null} */
	#pending_effect = null;
	/** @type {Effect | null} */
	#failed_effect = null;
	/** @type {DocumentFragment | null} */
	#offscreen_fragment = null;
	#local_pending_count = 0;
	#pending_count = 0;
	#pending_count_update_queued = false;
	/** @type {Set<Effect>} */
	#dirty_effects = /* @__PURE__ */ new Set();
	/** @type {Set<Effect>} */
	#maybe_dirty_effects = /* @__PURE__ */ new Set();
	/**
	* A source containing the number of pending async deriveds/expressions.
	* Only created if `$effect.pending()` is used inside the boundary,
	* otherwise updating the source results in needless `Batch.ensure()`
	* calls followed by no-op flushes
	* @type {Source<number> | null}
	*/
	#effect_pending = null;
	#effect_pending_subscriber = createSubscriber(() => {
		this.#effect_pending = source(this.#local_pending_count);
		if (true) tag(this.#effect_pending, "$effect.pending()");
		return () => {
			this.#effect_pending = null;
		};
	});
	/**
	* @param {TemplateNode} node
	* @param {BoundaryProps} props
	* @param {((anchor: Node) => void)} children
	* @param {((error: unknown) => unknown) | undefined} [transform_error]
	*/
	constructor(node, props, children, transform_error) {
		this.#anchor = node;
		this.#props = props;
		this.#children = (anchor) => {
			var effect = active_effect;
			effect.b = this;
			effect.f |= 128;
			children(anchor);
		};
		this.parent = active_effect.b;
		this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
		this.#effect = block(() => {
			if (hydrating) {
				const comment = this.#hydrate_open;
				hydrate_next();
				const server_rendered_pending = comment.data === "[!";
				if (comment.data.startsWith("[?")) {
					const serialized_error = JSON.parse(comment.data.slice("[?".length));
					this.#hydrate_failed_content(serialized_error);
				} else if (server_rendered_pending) this.#hydrate_pending_content();
				else this.#hydrate_resolved_content();
			} else this.#render();
		}, flags);
		if (hydrating) this.#anchor = hydrate_node;
	}
	#hydrate_resolved_content() {
		try {
			this.#main_effect = branch(() => this.#children(this.#anchor));
		} catch (error) {
			this.error(error);
		}
	}
	/**
	* @param {unknown} error The deserialized error from the server's hydration comment
	*/
	#hydrate_failed_content(error) {
		const failed = this.#props.failed;
		const { reset, invoke_onerror } = this.#create_reset(error);
		queue_micro_task(invoke_onerror);
		if (!failed) return;
		this.#failed_effect = branch(() => {
			failed(this.#anchor, () => error, () => reset);
		});
	}
	/**
	* Creates the `reset` function for a failed boundary, along with a function
	* that invokes `onerror` with it (if provided)
	* @param {unknown} error
	* @returns {{ reset: () => void, invoke_onerror: () => void }}
	*/
	#create_reset(error) {
		var did_reset = false;
		var calling_on_error = false;
		const reset = () => {
			if (did_reset) {
				svelte_boundary_reset_noop();
				return;
			}
			did_reset = true;
			if (calling_on_error) svelte_boundary_reset_onerror();
			if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
				this.#failed_effect = null;
			});
			this.#run(() => {
				this.#render();
			});
		};
		const invoke_onerror = () => {
			try {
				calling_on_error = true;
				this.#props.onerror?.(error, reset);
				calling_on_error = false;
			} catch (err) {
				invoke_error_boundary(err, this.#effect && this.#effect.parent);
			}
		};
		return {
			reset,
			invoke_onerror
		};
	}
	#hydrate_pending_content() {
		const pending = this.#props.pending;
		if (!pending) return;
		this.is_pending = true;
		this.#pending_effect = branch(() => pending(this.#anchor));
		queue_micro_task(() => {
			var fragment = this.#offscreen_fragment = document.createDocumentFragment();
			var anchor = create_text();
			fragment.append(anchor);
			this.#main_effect = this.#run(() => {
				return branch(() => this.#children(anchor));
			});
			if (this.#pending_count === 0) {
				this.#anchor.before(fragment);
				this.#offscreen_fragment = null;
				pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
				this.#resolve(current_batch);
			}
		});
	}
	#render() {
		try {
			this.is_pending = this.has_pending_snippet();
			this.#pending_count = 0;
			this.#local_pending_count = 0;
			this.#main_effect = branch(() => {
				this.#children(this.#anchor);
			});
			if (this.#pending_count > 0) {
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				move_effect(this.#main_effect, fragment);
				const pending = this.#props.pending;
				this.#pending_effect = branch(() => pending(this.#anchor));
			} else this.#resolve(current_batch);
		} catch (error) {
			this.error(error);
		}
	}
	/**
	* @param {Batch} batch
	*/
	#resolve(batch) {
		this.is_pending = false;
		batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Defer an effect inside a pending boundary until the boundary resolves
	* @param {Effect} effect
	*/
	defer_effect(effect) {
		defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Returns `false` if the effect exists inside a boundary whose pending snippet is shown
	* @returns {boolean}
	*/
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#props.pending;
	}
	/**
	* @template T
	* @param {() => T} fn
	*/
	#run(fn) {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_ctx = component_context;
		set_active_effect(this.#effect);
		set_active_reaction(this.#effect);
		set_component_context(this.#effect.ctx);
		try {
			Batch.ensure();
			return fn();
		} catch (e) {
			handle_error(e);
			return null;
		} finally {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_ctx);
		}
	}
	/**
	* Updates the pending count associated with the currently visible pending snippet,
	* if any, such that we can replace the snippet with content once work is done
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	#update_pending_count(d, batch) {
		if (!this.has_pending_snippet()) {
			if (this.parent) this.parent.#update_pending_count(d, batch);
			return;
		}
		this.#pending_count += d;
		if (this.#pending_count === 0) {
			this.#resolve(batch);
			if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
				this.#pending_effect = null;
			});
			if (this.#offscreen_fragment) {
				this.#anchor.before(this.#offscreen_fragment);
				this.#offscreen_fragment = null;
			}
		}
	}
	/**
	* Update the source that powers `$effect.pending()` inside this boundary,
	* and controls when the current `pending` snippet (if any) is removed.
	* Do not call from inside the class
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	update_pending_count(d, batch) {
		this.#update_pending_count(d, batch);
		this.#local_pending_count += d;
		if (!this.#effect_pending || this.#pending_count_update_queued) return;
		this.#pending_count_update_queued = true;
		queue_micro_task(() => {
			this.#pending_count_update_queued = false;
			if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
		});
	}
	get_effect_pending() {
		this.#effect_pending_subscriber();
		return get(this.#effect_pending);
	}
	/** @param {unknown} error */
	error(error) {
		if (!this.#props.onerror && !this.#props.failed) throw error;
		if (current_batch?.is_fork) {
			if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
			if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
			if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
			current_batch.oncommit(() => {
				this.#handle_error(error);
			});
		} else this.#handle_error(error);
	}
	/**
	* @param {unknown} error
	*/
	#handle_error(error) {
		if (this.#main_effect) {
			destroy_effect(this.#main_effect);
			this.#main_effect = null;
		}
		if (this.#pending_effect) {
			destroy_effect(this.#pending_effect);
			this.#pending_effect = null;
		}
		if (this.#failed_effect) {
			destroy_effect(this.#failed_effect);
			this.#failed_effect = null;
		}
		if (hydrating) {
			set_hydrate_node(this.#hydrate_open);
			next();
			set_hydrate_node(skip_nodes());
		}
		let failed = this.#props.failed;
		/** @param {unknown} transformed_error */
		const handle_error_result = (transformed_error) => {
			const { reset, invoke_onerror } = this.#create_reset(transformed_error);
			invoke_onerror();
			if (failed) this.#failed_effect = this.#run(() => {
				try {
					return branch(() => {
						var effect = active_effect;
						effect.b = this;
						effect.f |= 128;
						failed(this.#anchor, () => transformed_error, () => reset);
					});
				} catch (error) {
					invoke_error_boundary(error, this.#effect.parent);
					return null;
				}
			});
		};
		queue_micro_task(() => {
			/** @type {unknown} */
			var result;
			try {
				result = this.transform_error(error);
			} catch (e) {
				invoke_error_boundary(e, this.#effect && this.#effect.parent);
				return;
			}
			if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
				handle_error_result,
				/** @param {unknown} e */
				(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
			);
			else handle_error_result(result);
		});
	}
};

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
/** @import { Blocker, Effect, Source, Value } from '#client' */
/**
* @param {Blocker[]} blockers
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {(values: Value[]) => any} fn
*/
function flatten(blockers, sync, async, fn) {
	const d = is_runes() ? derived : derived_safe_equal;
	var pending = blockers.filter((b) => !b.settled);
	var deriveds = sync.map(d);
	if (true) deriveds.forEach((d, i) => {
		d.label = sync[i].toString().replace("() => ", "").replaceAll("$.eager(() => ", "$state.eager(").replace(/\$\.get\((.+?)\)/g, (_, id) => id);
	});
	if (async.length === 0 && pending.length === 0) {
		fn(deriveds);
		return;
	}
	var parent = active_effect;
	var restore = capture();
	var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
	/**
	* @param {Source[]} async
	*/
	function finish(async) {
		if ((parent.f & 16384) !== 0) return;
		restore();
		try {
			fn([...deriveds, ...async]);
		} catch (error) {
			invoke_error_boundary(error, parent);
		}
		unset_context();
	}
	var decrement_pending = increment_pending();
	if (async.length === 0) {
		/** @type {Promise<any>} */ blocker_promise.then(() => finish([])).finally(decrement_pending);
		return;
	}
	function run() {
		Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
	}
	if (blocker_promise) blocker_promise.then(() => {
		restore();
		run();
		unset_context();
	});
	else run();
}
/**
* Captures the current effect context so that we can restore it after
* some asynchronous work has happened (so that e.g. `await a + b`
* causes `b` to be registered as a dependency).
*/
function capture() {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_component_context = component_context;
	var previous_batch = current_batch;
	if (true) var previous_dev_stack = dev_stack;
	return function restore(activate_batch = true) {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_component_context);
		if (activate_batch && (previous_effect.f & 16384) === 0) {
			previous_batch?.activate();
			previous_batch?.apply();
		}
		if (true) {
			set_reactivity_loss_tracker(null);
			set_dev_stack(previous_dev_stack);
		}
	};
}
function unset_context(deactivate_batch = true) {
	set_active_effect(null);
	set_active_reaction(null);
	set_component_context(null);
	if (deactivate_batch) current_batch?.deactivate();
	if (true) {
		set_reactivity_loss_tracker(null);
		set_dev_stack(null);
	}
}
/**
* @returns {(skip?: boolean) => void}
*/
function increment_pending() {
	var effect = active_effect;
	var boundary = effect.b;
	var batch = current_batch;
	var blocking = !!boundary?.is_rendered();
	boundary?.update_pending_count(1, batch);
	batch.increment(blocking, effect);
	return () => {
		boundary?.update_pending_count(-1, batch);
		batch.decrement(blocking, effect);
	};
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/deriveds.js
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/** @import { Batch } from './batch.js'; */
/** @import { Boundary } from '../dom/blocks/boundary.js'; */
/**
* This allows us to track 'reactivity loss' that occurs when signals
* are read after a non-context-restoring `await`. Dev-only
* @type {{ effect: Effect, effect_deps: Set<Value>, warned: boolean } | null}
*/
let reactivity_loss_tracker = null;
/** @param {{ effect: Effect, effect_deps: Set<Value>, warned: boolean } | null} v */
function set_reactivity_loss_tracker(v) {
	reactivity_loss_tracker = v;
}
const recent_async_deriveds = /* @__PURE__ */ new Set();
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function derived(fn) {
	var flags = 2 | DIRTY;
	if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
	/** @type {Derived<V>} */
	const signal = {
		ctx: component_context,
		deps: null,
		effects: null,
		equals: equals$1,
		f: flags,
		fn,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: active_effect,
		ac: null
	};
	if (true && tracing_mode_flag) signal.created = get_error("created at");
	return signal;
}
const OBSOLETE = Symbol("obsolete");
/**
* @template V
* @param {() => V | Promise<V>} fn
* @param {string} [label]
* @param {string} [location] If provided, print a warning if the value is not read immediately after update
* @returns {Promise<Source<V>>}
*/
/*#__NO_SIDE_EFFECTS__*/
function async_derived(fn, label, location) {
	let parent = active_effect;
	if (parent === null) async_derived_orphan();
	var promise = void 0;
	var signal = source(UNINITIALIZED);
	if (true) signal.label = label ?? fn.toString();
	var should_suspend = !active_reaction;
	/** @type {Set<ReturnType<typeof deferred<V>>>} */
	var deferreds = /* @__PURE__ */ new Set();
	async_effect(() => {
		var effect = active_effect;
		if (true) reactivity_loss_tracker = {
			effect,
			effect_deps: /* @__PURE__ */ new Set(),
			warned: false
		};
		/** @type {ReturnType<typeof deferred<V>>} */
		var d = deferred();
		promise = d.promise;
		try {
			Promise.resolve(fn()).then(d.resolve, (e) => {
				if (e !== STALE_REACTION) d.reject(e);
			}).finally(unset_context);
		} catch (error) {
			d.reject(error);
			unset_context();
		}
		if (true) {
			if (reactivity_loss_tracker) {
				if (effect.deps !== null) for (let i = 0; i < skipped_deps; i += 1) reactivity_loss_tracker.effect_deps.add(effect.deps[i]);
				if (new_deps !== null) for (let i = 0; i < new_deps.length; i += 1) reactivity_loss_tracker.effect_deps.add(new_deps[i]);
			}
			reactivity_loss_tracker = null;
		}
		var batch = current_batch;
		if (should_suspend) {
			if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
			if (parent.b?.is_rendered()) batch.async_deriveds.get(effect)?.reject(OBSOLETE);
			else for (const d of deferreds.values()) d.reject(OBSOLETE);
			deferreds.add(d);
			batch.async_deriveds.set(effect, d);
		}
		/**
		* @param {any} value
		* @param {unknown} error
		*/
		const handler = (value, error = void 0) => {
			if (true) reactivity_loss_tracker = null;
			decrement_pending?.();
			deferreds.delete(d);
			if (error === OBSOLETE) return;
			batch.activate();
			if (error) {
				signal.f |= ERROR_VALUE;
				internal_set(signal, error);
			} else {
				if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
				if (true && location !== void 0 && !signal.equals(value)) {
					recent_async_deriveds.add(signal);
					setTimeout(() => {
						if (recent_async_deriveds.has(signal) && (effect.f & 16384) === 0) {
							await_waterfall(signal.label, location);
							recent_async_deriveds.delete(signal);
						}
					});
				}
				internal_set(signal, value);
			}
			batch.deactivate();
		};
		d.promise.then(handler, (e) => handler(null, e || "unknown"));
	});
	teardown(() => {
		for (const d of deferreds) d.reject(OBSOLETE);
	});
	if (true) signal.f |= ASYNC;
	return new Promise((fulfil) => {
		/** @param {Promise<V>} p */
		function next(p) {
			function go() {
				if (p === promise) fulfil(signal);
				else next(promise);
			}
			p.then(go, go);
		}
		next(promise);
	});
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function user_derived(fn) {
	const d = /* @__PURE__ */ derived(fn);
	if (!async_mode_flag) push_reaction_value(d);
	return d;
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function derived_safe_equal(fn) {
	const signal = /* @__PURE__ */ derived(fn);
	signal.equals = safe_equals;
	return signal;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function destroy_derived_effects(derived) {
	var effects = derived.effects;
	if (effects !== null) {
		derived.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
/**
* The currently updating deriveds, used to detect infinite recursion
* in dev mode and provide a nicer error than 'too much recursion'
* @type {Derived[]}
*/
let stack = [];
/**
* @template T
* @param {Derived} derived
* @returns {T}
*/
function execute_derived(derived) {
	var value;
	var prev_active_effect = active_effect;
	var parent = derived.parent;
	if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & (16384 | 8192)) !== 0) {
		derived_inert();
		return derived.v;
	}
	set_active_effect(parent);
	if (true) {
		let prev_eager_effects = eager_effects;
		set_eager_effects(/* @__PURE__ */ new Set());
		try {
			if (includes.call(stack, derived)) derived_references_self();
			stack.push(derived);
			derived.f &= ~WAS_MARKED;
			destroy_derived_effects(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
			set_eager_effects(prev_eager_effects);
			stack.pop();
		}
	} else try {
		derived.f &= ~WAS_MARKED;
		destroy_derived_effects(derived);
		value = update_reaction(derived);
	} finally {
		set_active_effect(prev_active_effect);
	}
	return value;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function update_derived(derived) {
	var value = execute_derived(derived);
	if (!derived.equals(value)) {
		derived.wv = increment_write_version();
		if (!current_batch?.is_fork || derived.deps === null) {
			if (current_batch !== null) {
				current_batch.capture(derived, value, true);
				previous_batch?.capture(derived, value, true);
			} else derived.v = value;
			if (derived.deps === null) {
				set_signal_status(derived, CLEAN);
				return;
			}
		}
	}
	if (is_destroying_effect) return;
	if (batch_values !== null) {
		if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived, value);
	} else update_derived_status(derived);
}
/**
* @param {Derived} derived
*/
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown || e.ac) {
		e.teardown?.();
		if (e.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ e.ac.abort(STALE_REACTION);
			e.ac = null;
		});
		if (e.fn !== null) e.teardown = noop;
		remove_reactions(e, 0);
		destroy_effect_children(e);
	}
}
/**
* @param {Derived} derived
*/
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
/** @import { Fork } from 'svelte' */
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/** @type {Batch | null} */
let first_batch = null;
/** @type {Batch | null} */
let last_batch = null;
/** @type {Batch | null} */
let current_batch = null;
/**
* This is needed to avoid overwriting inputs
* @type {Batch | null}
*/
let previous_batch = null;
/**
* When time travelling (i.e. working in one batch, while other batches
* still have ongoing work), we ignore the real values of affected
* signals in favour of their values within the batch
* @type {Map<Value, any> | null}
*/
let batch_values = null;
/** @type {Effect | null} */
let last_scheduled_effect = null;
let is_flushing_sync = false;
let is_processing = false;
/**
* During traversal, this is an array. Newly created effects are (if not immediately
* executed) pushed to this array, rather than going through the scheduling
* rigamarole that would cause another turn of the flush loop.
* @type {Effect[] | null}
*/
let collected_effects = null;
/**
* An array of effects that are marked during traversal as a result of a `set`
* (not `internal_set`) call. These will be added to the next batch and
* trigger another `batch.process()`
* @type {Effect[] | null}
* @deprecated when we get rid of legacy mode and stores, we can get rid of this
*/
let legacy_updates = null;
var flush_count = 0;
/** @type {Set<Value>} */
var source_stacks = /* @__PURE__ */ new Set();
let uid = 1;
var Batch = class Batch {
	id = uid++;
	/** True as soon as `#process` was called */
	#started = false;
	linked = true;
	/** @type {Batch | null} */
	#prev = null;
	/** @type {Batch | null} */
	#next = null;
	/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
	async_deriveds = /* @__PURE__ */ new Map();
	/**
	* The current values of any signals that are updated in this batch.
	* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
	* They keys of this map are identical to `this.#previous`
	* @type {Map<Value, [any, boolean]>}
	*/
	current = /* @__PURE__ */ new Map();
	/**
	* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
	* They keys of this map are identical to `this.#current`
	* @type {Map<Value, any>}
	*/
	previous = /* @__PURE__ */ new Map();
	/**
	* When the batch is committed (and the DOM is updated), we need to remove old branches
	* and append new ones by calling the functions added inside (if/each/key/etc) blocks
	* @type {Set<(batch: Batch) => void>}
	*/
	#commit_callbacks = /* @__PURE__ */ new Set();
	/**
	* If a fork is discarded, we need to destroy any effects that are no longer needed
	* @type {Set<(batch: Batch) => void>}
	*/
	#discard_callbacks = /* @__PURE__ */ new Set();
	/**
	* The number of async effects that are currently in flight
	*/
	#pending = 0;
	/**
	* Async effects that are currently in flight, _not_ inside a pending boundary
	* @type {Map<Effect, number>}
	*/
	#blocking_pending = /* @__PURE__ */ new Map();
	/**
	* A deferred that resolves when the batch is committed, used with `settled()`
	* TODO replace with Promise.withResolvers once supported widely enough
	* @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
	*/
	#deferred = null;
	/**
	* The root effects that need to be flushed
	* @type {Effect[]}
	*/
	#roots = [];
	/**
	* Effects created while this batch was active.
	* @type {Effect[]}
	*/
	#new_effects = [];
	/**
	* Deferred effects (which run after async work has completed) that are DIRTY
	* @type {Set<Effect>}
	*/
	#dirty_effects = /* @__PURE__ */ new Set();
	/**
	* Deferred effects that are MAYBE_DIRTY
	* @type {Set<Effect>}
	*/
	#maybe_dirty_effects = /* @__PURE__ */ new Set();
	/**
	* A map of branches that still exist, but will be destroyed when this batch
	* is committed — we skip over these during `process`.
	* The value contains child effects that were dirty/maybe_dirty before being reset,
	* so they can be rescheduled if the branch survives.
	* @type {Map<Effect, { d: Effect[], m: Effect[] }>}
	*/
	#skipped_branches = /* @__PURE__ */ new Map();
	/**
	* Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
	* @type {Set<Effect>}
	*/
	#unskipped_branches = /* @__PURE__ */ new Set();
	is_fork = false;
	#decrement_queued = false;
	constructor() {
		if (last_batch === null) first_batch = last_batch = this;
		else {
			last_batch.#next = this;
			this.#prev = last_batch;
		}
		last_batch = this;
	}
	#is_deferred() {
		if (this.is_fork) return true;
		for (const effect of this.#blocking_pending.keys()) {
			var e = effect;
			var skipped = false;
			while (e.parent !== null) {
				if (this.#skipped_branches.has(e)) {
					skipped = true;
					break;
				}
				e = e.parent;
			}
			if (!skipped) return true;
		}
		return false;
	}
	/**
	* Add an effect to the #skipped_branches map and reset its children
	* @param {Effect} effect
	*/
	skip_effect(effect) {
		if (!this.#skipped_branches.has(effect)) this.#skipped_branches.set(effect, {
			d: [],
			m: []
		});
		this.#unskipped_branches.delete(effect);
	}
	/**
	* Remove an effect from the #skipped_branches map and reschedule
	* any tracked dirty/maybe_dirty child effects
	* @param {Effect} effect
	* @param {(e: Effect) => void} callback
	*/
	unskip_effect(effect, callback = (e) => this.schedule(e)) {
		var tracked = this.#skipped_branches.get(effect);
		if (tracked) {
			this.#skipped_branches.delete(effect);
			for (var e of tracked.d) {
				set_signal_status(e, DIRTY);
				callback(e);
			}
			for (e of tracked.m) {
				set_signal_status(e, MAYBE_DIRTY);
				callback(e);
			}
		}
		this.#unskipped_branches.add(effect);
	}
	#process() {
		this.#started = true;
		if (flush_count++ > 1e3) {
			this.#unlink();
			infinite_loop_guard();
		}
		if (true) for (const value of this.current.keys()) source_stacks.add(value);
		for (const e of this.#dirty_effects) {
			this.#maybe_dirty_effects.delete(e);
			set_signal_status(e, DIRTY);
			this.schedule(e);
		}
		for (const e of this.#maybe_dirty_effects) {
			set_signal_status(e, MAYBE_DIRTY);
			this.schedule(e);
		}
		const roots = this.#roots;
		this.#roots = [];
		this.apply();
		/** @type {Effect[]} */
		var effects = collected_effects = [];
		/** @type {Effect[]} */
		var render_effects = [];
		/**
		* @type {Effect[]}
		* @deprecated when we get rid of legacy mode and stores, we can get rid of this
		*/
		var updates = legacy_updates = [];
		for (const root of roots) try {
			this.#traverse(root, effects, render_effects);
		} catch (e) {
			reset_all(root);
			if (!this.#is_deferred()) this.discard();
			throw e;
		}
		current_batch = null;
		if (updates.length > 0) {
			var batch = Batch.ensure();
			for (const e of updates) batch.schedule(e);
		}
		collected_effects = null;
		legacy_updates = null;
		if (this.#is_deferred()) {
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);
			for (const [e, t] of this.#skipped_branches) reset_branch(e, t);
			if (updates.length > 0)
 /** @type {Batch} */ current_batch.#process();
			return;
		}
		const earlier_batch = this.#find_earlier_batch();
		if (earlier_batch) {
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);
			earlier_batch.#merge(this);
			return;
		}
		this.#dirty_effects.clear();
		this.#maybe_dirty_effects.clear();
		for (const fn of this.#commit_callbacks) fn(this);
		this.#commit_callbacks.clear();
		previous_batch = this;
		flush_queued_effects(render_effects);
		flush_queued_effects(effects);
		previous_batch = null;
		this.#deferred?.resolve();
		var next_batch = current_batch;
		if (this.#pending === 0 && (this.#roots.length === 0 || next_batch !== null)) {
			this.#unlink();
			if (async_mode_flag) {
				this.#commit();
				current_batch = next_batch;
			}
		}
		if (this.#roots.length > 0) {
			if (next_batch !== null) {
				const batch = next_batch;
				batch.#roots.push(...this.#roots.filter((r) => !batch.#roots.includes(r)));
			} else next_batch = this;
		}
		if (next_batch !== null) {
			old_values.clear();
			next_batch.#process();
		}
	}
	/**
	* Traverse the effect tree, executing effects or stashing
	* them for later execution as appropriate
	* @param {Effect} root
	* @param {Effect[]} effects
	* @param {Effect[]} render_effects
	*/
	#traverse(root, effects, render_effects) {
		root.f ^= CLEAN;
		var effect = root.first;
		while (effect !== null) {
			var flags = effect.f;
			var is_branch = (flags & (32 | 64)) !== 0;
			if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || this.#skipped_branches.has(effect)) && effect.fn !== null) {
				if (is_branch) effect.f ^= CLEAN;
				else if ((flags & 4) !== 0) effects.push(effect);
				else if (async_mode_flag && (flags & (8 | 16777216)) !== 0) render_effects.push(effect);
				else if (is_dirty(effect)) {
					if ((flags & 16) !== 0) this.#maybe_dirty_effects.add(effect);
					update_effect(effect);
				}
				var child = effect.first;
				if (child !== null) {
					effect = child;
					continue;
				}
			}
			while (effect !== null) {
				var next = effect.next;
				if (next !== null) {
					effect = next;
					break;
				}
				effect = effect.parent;
			}
		}
	}
	#find_earlier_batch() {
		var batch = this.#prev;
		while (batch !== null) {
			if (!batch.is_fork) {
				for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
			}
			batch = batch.#prev;
		}
		return null;
	}
	/**
	* @param {Batch} batch
	*/
	#merge(batch) {
		for (const [source, value] of batch.current) {
			if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
			this.current.set(source, value);
		}
		for (const [effect, deferred] of batch.async_deriveds) {
			const d = this.async_deriveds.get(effect);
			if (d) deferred.promise.then(d.resolve).catch(d.reject);
		}
		batch.async_deriveds.clear();
		this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
		/**
		* mark all effects that depend on `batch.current`, except the
		* async effects that we just resolved (TODO unless they depend
		* on values in this batch that are NOT in the later batch?).
		* Through this we also will populate the correct #skipped_branches,
		* oncommit callbacks etc, so we don't need to merge them separately.
		* @param {Value} value
		*/
		const mark = (value) => {
			var reactions = value.reactions;
			if (reactions === null) return;
			if ((value.f & 2) !== 0 && (value.f & (2048 | 4096)) === 0) return;
			for (const reaction of reactions) {
				var flags = reaction.f;
				if ((flags & 2) !== 0) mark(reaction);
				else {
					var effect = reaction;
					if (flags & (4194304 | 16) && !this.async_deriveds.has(effect)) {
						this.#maybe_dirty_effects.delete(effect);
						set_signal_status(effect, DIRTY);
						this.schedule(effect);
					}
				}
			}
		};
		for (const source of this.current.keys()) mark(source);
		this.oncommit(() => batch.discard());
		batch.#unlink();
		current_batch = this;
		this.#process();
	}
	/**
	* @param {Effect[]} effects
	*/
	#defer_effects(effects) {
		for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Associate a change to a given source with the current
	* batch, noting its previous and current values
	* @param {Value} source
	* @param {any} value
	* @param {boolean} [is_derived]
	*/
	capture(source, value, is_derived = false) {
		if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
		if ((source.f & 8388608) === 0) {
			this.current.set(source, [value, is_derived]);
			batch_values?.set(source, value);
		}
		if (!this.is_fork) source.v = value;
	}
	activate() {
		current_batch = this;
	}
	deactivate() {
		current_batch = null;
		batch_values = null;
	}
	flush() {
		try {
			if (true) source_stacks.clear();
			is_processing = true;
			current_batch = this;
			this.#process();
		} finally {
			flush_count = 0;
			last_scheduled_effect = null;
			collected_effects = null;
			legacy_updates = null;
			is_processing = false;
			current_batch = null;
			batch_values = null;
			old_values.clear();
			if (true) for (const source of source_stacks) source.updated = null;
		}
	}
	discard() {
		for (const fn of this.#discard_callbacks) fn(this);
		this.#discard_callbacks.clear();
		for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
		this.#unlink();
		this.#deferred?.resolve();
	}
	/**
	* @param {Effect} effect
	*/
	register_created_effect(effect) {
		this.#new_effects.push(effect);
	}
	#commit() {
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			var is_earlier = batch.id < this.id;
			/** @type {Source[]} */
			var sources = [];
			for (const [source, [value, is_derived]] of this.current) {
				if (batch.current.has(source)) {
					var batch_value = batch.current.get(source)[0];
					if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
					else continue;
				}
				sources.push(source);
			}
			if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
				const d = batch.async_deriveds.get(effect);
				if (d) deferred.promise.then(d.resolve).catch(d.reject);
			}
			var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
			if (!batch.#started || current.length === 0) continue;
			var others = current.filter((source) => !this.current.has(source));
			if (others.length === 0) {
				if (is_earlier) batch.discard();
			} else if (sources.length > 0) {
				if (true && !batch.#decrement_queued) invariant(batch.#roots.length === 0, "Batch has scheduled roots");
				if (is_earlier) for (const unskipped of this.#unskipped_branches) batch.unskip_effect(unskipped, (e) => {
					if ((e.f & (16 | 4194304)) !== 0) batch.schedule(e);
					else batch.#defer_effects([e]);
				});
				batch.activate();
				/** @type {Set<Value>} */
				var marked = /* @__PURE__ */ new Set();
				/** @type {Map<Reaction, boolean>} */
				var checked = /* @__PURE__ */ new Map();
				for (var source of sources) mark_effects(source, others, marked, checked);
				checked = /* @__PURE__ */ new Map();
				var current_unequal = [...batch.current].filter(([c, v1]) => {
					const v2 = this.current.get(c);
					if (!v2) return true;
					return v2[0] !== v1[0] || v2[1] !== v1[1];
				}).map(([c]) => c);
				if (current_unequal.length > 0) {
					for (const effect of this.#new_effects) if ((effect.f & (16384 | 8192 | 131072)) === 0 && depends_on(effect, current_unequal, checked)) {
						if ((effect.f & (4194304 | 16)) !== 0) {
							set_signal_status(effect, DIRTY);
							batch.schedule(effect);
						} else batch.#dirty_effects.add(effect);
					}
				}
				if (batch.#roots.length > 0 && !batch.#decrement_queued) {
					batch.apply();
					for (var root of batch.#roots) batch.#traverse(root, [], []);
					batch.#roots = [];
				}
				batch.deactivate();
			}
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	increment(blocking, effect) {
		this.#pending += 1;
		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
			this.#blocking_pending.set(effect, blocking_pending_count + 1);
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	decrement(blocking, effect) {
		this.#pending -= 1;
		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
			if (blocking_pending_count === 1) this.#blocking_pending.delete(effect);
			else this.#blocking_pending.set(effect, blocking_pending_count - 1);
		}
		if (this.#decrement_queued) return;
		this.#decrement_queued = true;
		queue_micro_task(() => {
			this.#decrement_queued = false;
			if (this.linked) this.flush();
		});
	}
	/**
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	transfer_effects(dirty_effects, maybe_dirty_effects) {
		for (const e of dirty_effects) this.#dirty_effects.add(e);
		for (const e of maybe_dirty_effects) this.#maybe_dirty_effects.add(e);
		dirty_effects.clear();
		maybe_dirty_effects.clear();
	}
	/** @param {(batch: Batch) => void} fn */
	oncommit(fn) {
		this.#commit_callbacks.add(fn);
	}
	/** @param {(batch: Batch) => void} fn */
	ondiscard(fn) {
		this.#discard_callbacks.add(fn);
	}
	settled() {
		return (this.#deferred ??= deferred()).promise;
	}
	static ensure() {
		if (current_batch === null) {
			const batch = current_batch = new Batch();
			if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
				if (!batch.#started) batch.flush();
			});
		}
		return current_batch;
	}
	apply() {
		if (!async_mode_flag || !this.is_fork && this.#prev === null && this.#next === null) {
			batch_values = null;
			return;
		}
		batch_values = /* @__PURE__ */ new Map();
		for (const [source, [value]] of this.current) batch_values.set(source, value);
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			if (batch === this || batch.is_fork) continue;
			var intersects = false;
			if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
				if (is_derived) continue;
				if (this.current.has(source)) {
					intersects = true;
					break;
				}
			}
			if (!intersects) {
				for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
			}
		}
	}
	/**
	*
	* @param {Effect} effect
	*/
	schedule(effect) {
		last_scheduled_effect = effect;
		if (effect.b?.is_pending && (effect.f & (4 | 8 | 16777216)) !== 0 && (effect.f & 32768) === 0) {
			effect.b.defer_effect(effect);
			return;
		}
		var e = effect;
		while (e.parent !== null) {
			e = e.parent;
			var flags = e.f;
			if (collected_effects !== null && e === active_effect) {
				if (async_mode_flag) return;
				if ((active_reaction === null || (active_reaction.f & 2) === 0) && !legacy_is_updating_store) return;
			}
			if ((flags & (64 | 32)) !== 0) {
				if ((flags & 1024) === 0) return;
				e.f ^= CLEAN;
			}
		}
		this.#roots.push(e);
	}
	#unlink() {
		if (!this.linked) return;
		var prev = this.#prev;
		var next = this.#next;
		if (prev === null) first_batch = next;
		else prev.#next = next;
		if (next === null) last_batch = prev;
		else next.#prev = prev;
		this.linked = false;
	}
};
/**
* Synchronously flush any pending updates.
* Returns void if no callback is provided, otherwise returns the result of calling the callback.
* @template [T=void]
* @param {(() => T) | undefined} [fn]
* @returns {T}
*/
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (current_batch === null) return result;
			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}
function infinite_loop_guard() {
	if (true) {
		var updates = /* @__PURE__ */ new Map();
		for (const source of current_batch.current.keys()) for (const [stack, update] of source.updated ?? []) {
			var entry = updates.get(stack);
			if (!entry) {
				entry = {
					error: update.error,
					count: 0
				};
				updates.set(stack, entry);
			}
			entry.count += update.count;
		}
		for (const update of updates.values()) if (update.error) console.error(update.error);
	}
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		if (true) define_property(error, "stack", { value: "" });
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
/** @type {Set<Effect> | null} */
let eager_block_effects = null;
/**
* @param {Array<Effect>} effects
* @returns {void}
*/
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	var i = 0;
	while (i < length) {
		var effect = effects[i++];
		if ((effect.f & (16384 | 8192)) === 0 && is_dirty(effect)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			update_effect(effect);
			if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
			if (eager_block_effects?.size > 0) {
				old_values.clear();
				for (const e of eager_block_effects) {
					if ((e.f & (16384 | 8192)) !== 0) continue;
					/** @type {Effect[]} */
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}
					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e = ordered_effects[j];
						if ((e.f & (16384 | 8192)) !== 0) continue;
						update_effect(e);
					}
				}
				eager_block_effects.clear();
			}
		}
	}
	eager_block_effects = null;
}
/**
* This is similar to `mark_reactions`, but it only marks async/block effects
* depending on `value` and at least one of the other `sources`, so that
* these effects can re-run after another batch has been committed
* @param {Value} value
* @param {Source[]} sources
* @param {Set<Value>} marked
* @param {Map<Reaction, boolean>} checked
*/
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);
	if (value.reactions !== null) for (const reaction of value.reactions) {
		const flags = reaction.f;
		if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
		else if ((flags & (4194304 | 16)) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
			set_signal_status(reaction, DIRTY);
			schedule_effect(reaction);
		}
	}
}
/**
* @param {Reaction} reaction
* @param {Source[]} sources
* @param {Map<Reaction, boolean>} checked
*/
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== void 0) return depends;
	if (reaction.deps !== null) for (const dep of reaction.deps) {
		if (includes.call(sources, dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
			checked.set(dep, true);
			return true;
		}
	}
	checked.set(reaction, false);
	return false;
}
/**
* @param {Effect} effect
* @returns {void}
*/
function schedule_effect(effect) {
	/** @type {Batch} */ current_batch.schedule(effect);
}
/**
* Mark all the effects inside a skipped branch CLEAN, so that
* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
* effects so they can be rescheduled if the branch survives.
* @param {Effect} effect
* @param {{ d: Effect[], m: Effect[] }} tracked
*/
function reset_branch(effect, tracked) {
	if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
	if ((effect.f & 2048) !== 0) tracked.d.push(effect);
	else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_branch(e, tracked);
		e = e.next;
	}
}
/**
* Mark an entire effect tree clean following an error
* @param {Effect} effect
*/
function reset_all(effect) {
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_all(e);
		e = e.next;
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
/** @import { Derived, Effect, Source, Value } from '#client' */
/** @type {Set<Effect>} */
let eager_effects = /* @__PURE__ */ new Set();
/** @type {Map<Source, any>} */
const old_values = /* @__PURE__ */ new Map();
/**
* @param {Set<any>} v
*/
function set_eager_effects(v) {
	eager_effects = v;
}
let eager_effects_deferred = false;
function set_eager_effects_deferred() {
	eager_effects_deferred = true;
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
* @returns {Source<V>}
*/
function source(v, stack) {
	/** @type {Value} */
	var signal = {
		f: 0,
		v,
		reactions: null,
		equals: equals$1,
		rv: 0,
		wv: 0
	};
	if (true && tracing_mode_flag) {
		signal.created = stack ?? get_error("created at");
		signal.updated = null;
		signal.set_during_effect = false;
		signal.trace = null;
	}
	return signal;
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
*/
/*#__NO_SIDE_EFFECTS__*/
function state(v, stack) {
	const s = source(v, stack);
	push_reaction_value(s);
	return s;
}
/**
* @template V
* @param {V} initial_value
* @param {boolean} [immutable]
* @returns {Source<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
	return s;
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {boolean} [should_proxy]
* @returns {V}
*/
function set(source, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & (2 | 16 | 4194304 | 131072)) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
	let new_value = should_proxy ? proxy(value) : value;
	if (true) tag_proxy(new_value, source.label);
	return internal_set(source, new_value, legacy_updates);
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {Effect[] | null} [updated_during_traversal]
* @returns {V}
*/
function internal_set(source, value, updated_during_traversal = null) {
	if (!source.equals(value)) {
		if (is_destroying_effect) old_values.set(source, value);
		else if (!old_values.has(source)) old_values.set(source, source.v);
		var batch = Batch.ensure();
		batch.capture(source, value);
		if (true) {
			if (tracing_mode_flag || active_effect !== null) {
				source.updated ??= /* @__PURE__ */ new Map();
				const count = (source.updated.get("")?.count ?? 0) + 1;
				source.updated.set("", {
					error: null,
					count
				});
				if (tracing_mode_flag || count > 5) {
					const error = get_error("updated at");
					if (error !== null) {
						let entry = source.updated.get(error.stack);
						if (!entry) {
							entry = {
								error,
								count: 0
							};
							source.updated.set(error.stack, entry);
						}
						entry.count++;
					}
				}
			}
			if (active_effect !== null) source.set_during_effect = true;
		}
		if ((source.f & 2) !== 0) {
			const derived = source;
			if ((source.f & 2048) !== 0) execute_derived(derived);
			if (batch_values === null) update_derived_status(derived);
		}
		source.wv = increment_write_version();
		mark_reactions(source, DIRTY, updated_during_traversal);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & (32 | 64)) === 0) {
			if (untracked_writes === null) set_untracked_writes([source]);
			else untracked_writes.push(source);
		}
		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
	}
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	for (const effect of eager_effects) {
		if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
		let dirty;
		try {
			dirty = is_dirty(effect);
		} catch {
			dirty = true;
		}
		if (dirty) update_effect(effect);
	}
	eager_effects.clear();
}
/**
* Silently (without using `get`) increment a source
* @param {Source<number>} source
*/
function increment(source) {
	set(source, source.v + 1);
}
/**
* @param {Value} signal
* @param {number} status should be DIRTY or MAYBE_DIRTY
* @param {Effect[] | null} updated_during_traversal
* @returns {void}
*/
function mark_reactions(signal, status, updated_during_traversal) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if (!runes && reaction === active_effect) continue;
		var not_dirty = (flags & DIRTY) === 0;
		if (not_dirty) set_signal_status(reaction, status);
		if ((flags & 131072) !== 0) eager_effects.add(reaction);
		else if ((flags & 2) !== 0) {
			var derived = reaction;
			batch_values?.delete(derived);
			if ((flags & 65536) === 0) {
				if (flags & 512 && (active_effect === null || (active_effect.f & 2097152) === 0)) reaction.f |= WAS_MARKED;
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			}
		} else if (not_dirty) {
			var effect = reaction;
			if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
			if (updated_during_traversal !== null) updated_during_traversal.push(effect);
			else schedule_effect(effect);
		}
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/proxy.js
/** @import { Source } from '#client' */
const regex_is_valid_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
/**
* @template T
* @param {T} value
* @returns {T}
*/
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	/** @type {Map<any, Source<any>>} */
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack = true && tracing_mode_flag ? get_error("created at") : null;
	var parent_version = update_version;
	/**
	* Executes the proxy in the context of the reaction it was originally created in, if any
	* @template T
	* @param {() => T} fn
	*/
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version);
		return result;
	};
	if (is_proxied_array) {
		sources.set("length", /* @__PURE__ */ state(
			/** @type {any[]} */
			value.length,
			stack
		));
		if (true) value = inspectable_array(value);
	}
	/** Used in dev for $inspect.trace() */
	var path = "";
	let updating = false;
	/** @param {string} new_path */
	function update_path(new_path) {
		if (updating) return;
		updating = true;
		path = new_path;
		tag(version, `${path} version`);
		for (const [prop, source] of sources) tag(source, get_label(path, prop));
		updating = false;
	}
	return new Proxy(value, {
		defineProperty(_, prop, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop);
			if (s === void 0) with_parent(() => {
				var s = /* @__PURE__ */ state(descriptor.value, stack);
				sources.set(prop, s);
				if (true && typeof prop === "string") tag(s, get_label(path, prop));
				return s;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === void 0) {
				if (prop in target) {
					const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(prop, s);
					increment(version);
					if (true) tag(s, get_label(path, prop));
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			if (prop === STATE_SYMBOL) return value;
			if (true && prop === PROXY_PATH_SYMBOL) return update_path;
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
				s = with_parent(() => {
					var p = proxy(exists ? target[prop] : UNINITIALIZED);
					var s = /* @__PURE__ */ state(p, stack);
					if (true) tag(s, get_label(path, prop));
					return s;
				});
				sources.set(prop, s);
			}
			if (s !== void 0) {
				var v = get(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor && "value" in descriptor) {
				var s = sources.get(prop);
				if (s) descriptor.value = get(s);
			} else if (descriptor === void 0) {
				var source = sources.get(prop);
				var value = source?.v;
				if (source !== void 0 && value !== UNINITIALIZED) return {
					enumerable: true,
					configurable: true,
					value,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop) {
			if (prop === STATE_SYMBOL) return true;
			var s = sources.get(prop);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
			if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
				if (s === void 0) {
					s = with_parent(() => {
						var p = has ? proxy(target[prop]) : UNINITIALIZED;
						var s = /* @__PURE__ */ state(p, stack);
						if (true) tag(s, get_label(path, prop));
						return s;
					});
					sources.set(prop, s);
				}
				if (get(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(i + "", other_s);
					if (true) tag(other_s, get_label(path, i));
				}
			}
			if (s === void 0) {
				if (!has || get_descriptor(target, prop)?.writable) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
					if (true) tag(s, get_label(path, prop));
					set(s, proxy(value));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor?.set) descriptor.set.call(receiver, value);
			if (!has) {
				if (is_proxied_array && typeof prop === "string") {
					var ls = sources.get("length");
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === void 0 || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
/**
* @param {string} path
* @param {string | symbol} prop
*/
function get_label(path, prop) {
	if (typeof prop === "symbol") return `${path}[Symbol(${prop.description ?? ""})]`;
	if (regex_is_valid_identifier.test(prop)) return `${path}.${prop}`;
	return /^\d+$/.test(prop) ? `${path}[${prop}]` : `${path}['${prop}']`;
}
/**
* @param {any} value
*/
function get_proxied_value(value) {
	try {
		if (value !== null && typeof value === "object" && STATE_SYMBOL in value) return value[STATE_SYMBOL];
	} catch {}
	return value;
}
const ARRAY_MUTATING_METHODS = /* @__PURE__ */ new Set([
	"copyWithin",
	"fill",
	"pop",
	"push",
	"reverse",
	"shift",
	"sort",
	"splice",
	"unshift"
]);
/**
* Wrap array mutating methods so $inspect is triggered only once and
* to prevent logging an array in intermediate state (e.g. with an empty slot)
* @param {any[]} array
*/
function inspectable_array(array) {
	return new Proxy(array, { get(target, prop, receiver) {
		var value = Reflect.get(target, prop, receiver);
		if (!ARRAY_MUTATING_METHODS.has(prop)) return value;
		/**
		* @this {any[]}
		* @param {any[]} args
		*/
		return function(...args) {
			set_eager_effects_deferred();
			var result = value.apply(this, args);
			flush_eager_effects();
			return result;
		};
	} });
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/equality.js
function init_array_prototype_warnings() {
	const array_prototype = Array.prototype;
	const cleanup = Array.__svelte_cleanup;
	if (cleanup) cleanup();
	const { indexOf, lastIndexOf, includes } = array_prototype;
	array_prototype.indexOf = function(item, from_index) {
		const index = indexOf.call(this, item, from_index);
		if (index === -1) {
			for (let i = from_index ?? 0; i < this.length; i += 1) if (get_proxied_value(this[i]) === item) {
				state_proxy_equality_mismatch("array.indexOf(...)");
				break;
			}
		}
		return index;
	};
	array_prototype.lastIndexOf = function(item, from_index) {
		const index = lastIndexOf.call(this, item, from_index ?? this.length - 1);
		if (index === -1) {
			for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) if (get_proxied_value(this[i]) === item) {
				state_proxy_equality_mismatch("array.lastIndexOf(...)");
				break;
			}
		}
		return index;
	};
	array_prototype.includes = function(item, from_index) {
		const has = includes.call(this, item, from_index);
		if (!has) {
			for (let i = 0; i < this.length; i += 1) if (get_proxied_value(this[i]) === item) {
				state_proxy_equality_mismatch("array.includes(...)");
				break;
			}
		}
		return has;
	};
	Array.__svelte_cleanup = () => {
		array_prototype.indexOf = indexOf;
		array_prototype.lastIndexOf = lastIndexOf;
		array_prototype.includes = includes;
	};
}
/**
* @param {any} a
* @param {any} b
* @param {boolean} equal
* @returns {boolean}
*/
function strict_equals(a, b, equal = true) {
	try {
		if (a === b !== (get_proxied_value(a) === get_proxied_value(b))) state_proxy_equality_mismatch(equal ? "===" : "!==");
	} catch {}
	return a === b === equal;
}
/**
* @param {any} a
* @param {any} b
* @param {boolean} equal
* @returns {boolean}
*/
function equals(a, b, equal = true) {
	if (a == b !== (get_proxied_value(a) == get_proxied_value(b))) state_proxy_equality_mismatch(equal ? "==" : "!=");
	return a == b === equal;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/operations.js
/** @import { Effect, TemplateNode } from '#client' */
/** @type {Window} */
var $window;
/** @type {Document} */
var $document;
/** @type {boolean} */
var is_firefox;
/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;
/**
* Initialize these lazily to avoid issues when using the runtime in a server context
* where these globals are not available while avoiding a separate server entry point
*/
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	$document = document;
	is_firefox = /Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
		/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
		/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
	if (true) {
		element_prototype.__svelte_meta = null;
		init_array_prototype_warnings();
	}
}
/**
* @param {string} value
* @returns {Text}
*/
function create_text(value = "") {
	return document.createTextNode(value);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(node) {
	return first_child_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @template {Node} N
* @param {N} node
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function child(node, is_text) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(node);
	var child = /* @__PURE__ */ get_first_child(hydrate_node);
	if (child === null) child = hydrate_node.appendChild(create_text());
	else if (is_text && child.nodeType !== 3) {
		var text = create_text();
		child?.before(text);
		set_hydrate_node(text);
		return text;
	}
	if (is_text) merge_text_nodes(child);
	set_hydrate_node(child);
	return child;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {boolean} [is_text]
* @returns {TemplateNode | null}
*/
function first_child(node, is_text = false) {
	if (!hydrating) {
		var first = /* @__PURE__ */ get_first_child(node);
		if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
		return first;
	}
	if (is_text) {
		if (hydrate_node?.nodeType !== 3) {
			var text = create_text();
			hydrate_node?.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(hydrate_node);
	}
	return hydrate_node;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {number} count
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
	}
	if (!hydrating) return next_sibling;
	if (is_text) {
		if (next_sibling?.nodeType !== 3) {
			var text = create_text();
			if (next_sibling === null) last_sibling?.after(text);
			else next_sibling.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(next_sibling);
	}
	set_hydrate_node(next_sibling);
	return next_sibling;
}
/**
* @template {Node} N
* @param {N} node
* @returns {void}
*/
function clear_text_content(node) {
	node.textContent = "";
}
/**
* Returns `true` if we're updating the current block, for example `condition` in
* an `{#if condition}` block just changed. In this case, the branch should be
* appended (or removed) at the same time as other updates within the
* current `<svelte:boundary>`
*/
function should_defer_append() {
	if (!async_mode_flag) return false;
	if (eager_block_effects !== null) return false;
	return (active_effect.f & REACTION_RAN) !== 0;
}
/**
* Branching here is intentional and load-bearing for perf. `createElement(tag)`
* hits a fast path in Blink that `createElementNS(NAMESPACE_HTML, tag)` doesn't,
* and passing an explicit `undefined` as the trailing options arg measurably
* slows both APIs. Funnelling every case through a single `createElementNS(ns,
* tag, options)` call would be smaller but slower on the HTML path.
*
* @template {keyof HTMLElementTagNameMap | string} T
* @param {T} tag
* @param {string} [namespace]
* @param {string} [is]
* @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
*/
function create_element(tag, namespace, is) {
	if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
	return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
}
/**
* Browsers split text nodes larger than 65536 bytes when parsing.
* For hydration to succeed, we need to stitch them back together
* @param {Text} text
*/
function merge_text_nodes(text) {
	if (text.nodeValue.length < 65536) return;
	let next = text.nextSibling;
	while (next !== null && next.nodeType === 3) {
		next.remove();
		/** @type {string} */ text.nodeValue += next.nodeValue;
		next = text.nextSibling;
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
/**
* @param {'$effect' | '$effect.pre' | '$inspect'} rune
*/
function validate_effect(rune) {
	if (active_effect === null) {
		if (active_reaction === null) effect_orphan(rune);
		effect_in_unowned_derived();
	}
	if (is_destroying_effect) effect_in_teardown(rune);
}
/**
* @param {Effect} effect
* @param {Effect} parent_effect
*/
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect;
	else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
/**
* @param {number} type
* @param {null | (() => void | (() => void))} fn
* @returns {Effect}
*/
function create_effect(type, fn) {
	var parent = active_effect;
	if (true) while (parent !== null && (parent.f & 131072) !== 0) parent = parent.parent;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	/** @type {Effect} */
	var effect = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: type | DIRTY | 512,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	if (true) effect.component_function = dev_current_component_function;
	current_batch?.register_created_effect(effect);
	/** @type {Effect | null} */
	var e = effect;
	if ((type & 4) !== 0) {
		if (collected_effects !== null) collected_effects.push(effect);
		else Batch.ensure().schedule(effect);
	} else if (fn !== null) {
		try {
			update_effect(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}
		if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
			e = e.first;
			if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
		}
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var derived = active_reaction;
			(derived.effects ??= []).push(e);
		}
	}
	return effect;
}
/**
* Internal representation of `$effect.tracking()`
* @returns {boolean}
*/
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
/**
* @param {() => void} fn
*/
function teardown(fn) {
	const effect = create_effect(8, null);
	set_signal_status(effect, CLEAN);
	effect.teardown = fn;
	return effect;
}
/**
* Internal representation of `$effect(...)`
* @param {() => void | (() => void)} fn
*/
function user_effect(fn) {
	validate_effect("$effect");
	if (true) define_property(fn, "name", { value: "$effect" });
	var flags = active_effect.f;
	if (!active_reaction && (flags & 32) !== 0 && component_context !== null && !component_context.i) {
		var context = component_context;
		(context.e ??= []).push(fn);
	} else return create_user_effect(fn);
}
/**
* @param {() => void | (() => void)} fn
*/
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn);
}
/**
* Internal representation of `$effect.root(...)`
* @param {() => void | (() => void)} fn
* @returns {() => void}
*/
function effect_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return () => {
		destroy_effect(effect);
	};
}
/**
* An effect root whose children can transition out
* @param {() => void} fn
* @returns {(options?: { outro?: boolean }) => Promise<void>}
*/
function component_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect, () => {
				destroy_effect(effect);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect);
				fulfil(void 0);
			}
		});
	};
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function effect(fn) {
	return create_effect(4, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function async_effect(fn) {
	return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function render_effect(fn, flags = 0) {
	return create_effect(8 | flags, fn);
}
/**
* @param {(...expressions: any) => void | (() => void)} fn
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {Blocker[]} blockers
*/
function template_effect(fn, sync = [], async = [], blockers = []) {
	flatten(blockers, sync, async, (values) => {
		create_effect(8, () => {
			fn(...values.map(get));
		});
	});
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function block(fn, flags = 0) {
	var effect = create_effect(16 | flags, fn);
	if (true) effect.dev_stack = dev_stack;
	return effect;
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function managed(fn, flags = 0) {
	var effect = create_effect(MANAGED_EFFECT | flags, fn);
	if (true) effect.dev_stack = dev_stack;
	return effect;
}
/**
* @param {(() => void)} fn
*/
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn);
}
/**
* @param {Effect} effect
*/
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
/**
* @param {Effect} signal
* @param {boolean} remove_dom
* @returns {void}
*/
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		const controller = effect.ac;
		if (controller !== null) without_reactive_context(() => {
			controller.abort(STALE_REACTION);
		});
		var next = effect.next;
		if ((effect.f & 64) !== 0) effect.parent = null;
		else destroy_effect(effect, remove_dom);
		effect = next;
	}
}
/**
* @param {Effect} signal
* @returns {void}
*/
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & 32) === 0) destroy_effect(effect);
		effect = next;
	}
}
/**
* @param {Effect} effect
* @param {boolean} [remove_dom]
* @returns {void}
*/
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
		remove_effect_dom(effect.nodes.start, effect.nodes.end);
		removed = true;
	}
	effect.f |= DESTROYING;
	destroy_effect_children(effect, remove_dom && !removed);
	remove_reactions(effect, 0);
	var transitions = effect.nodes && effect.nodes.t;
	if (transitions !== null) for (const transition of transitions) transition.stop();
	execute_effect_teardown(effect);
	effect.f ^= DESTROYING;
	effect.f |= DESTROYED;
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect);
	if (true) effect.component_function = null;
	effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
}
/**
*
* @param {TemplateNode | null} node
* @param {TemplateNode} end
*/
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next;
	}
}
/**
* Detach an effect from the effect tree, freeing up memory and
* reducing the amount of work that happens on subsequent traversals
* @param {Effect} effect
*/
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
/**
* When a block effect is removed, we don't immediately destroy it or yank it
* out of the DOM, because it might have transitions. Instead, we 'pause' it.
* It stays around (in memory, and in the DOM) until outro transitions have
* completed, and if the state change is reversed then we _resume_ it.
* A paused effect does not update, and the DOM subtree becomes inert.
* @param {Effect} effect
* @param {() => void} [callback]
* @param {boolean} [destroy]
*/
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	pause_children(effect, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) transition.out(check);
	} else fn();
}
/**
* @param {Effect} effect
* @param {TransitionManager[]} transitions
* @param {boolean} local
*/
function pause_children(effect, transitions, local) {
	if ((effect.f & 8192) !== 0) return;
	effect.f ^= INERT;
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transitions.push(transition);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		if ((child.f & 64) === 0) {
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
			pause_children(child, transitions, transparent ? local : false);
		}
		child = sibling;
	}
}
/**
* The opposite of `pause_effect`. We call this if (for example)
* `x` becomes falsy then truthy: `{#if x}...{/if}`
* @param {Effect} effect
*/
function resume_effect(effect) {
	resume_children(effect, true);
}
/**
* @param {Effect} effect
* @param {boolean} local
*/
function resume_children(effect, local) {
	if ((effect.f & 8192) === 0) return;
	effect.f ^= INERT;
	if ((effect.f & 1024) === 0) {
		set_signal_status(effect, DIRTY);
		Batch.ensure().schedule(effect);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
		resume_children(child, transparent ? local : false);
		child = sibling;
	}
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transition.in();
	}
}
/**
* @param {Effect} effect
* @param {DocumentFragment} fragment
*/
function move_effect(effect, fragment) {
	if (!effect.nodes) return;
	/** @type {TemplateNode | null} */
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		fragment.append(node);
		node = next;
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
/**
* @type {Set<Value> | null}
* @deprecated
*/
let captured_signals = null;

//#endregion
//#region node_modules/svelte/src/internal/client/runtime.js
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/**
* True if updating in an effect context that is reactive (i.e. not branch/root effects)
*/
let is_updating_effect = false;
let is_destroying_effect = false;
/** @param {boolean} value */
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
/** @type {null | Reaction} */
let active_reaction = null;
let untracking = false;
/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
/** @type {null | Effect} */
let active_effect = null;
/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}
/**
* When sources are created within a reaction, reading and writing
* them within that reaction should not cause a re-run
* @type {null | Set<Source>}
*/
let current_sources = null;
/** @param {Value} value */
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) (current_sources ??= /* @__PURE__ */ new Set()).add(value);
}
/**
* The dependencies of the reaction that is currently being executed. In many cases,
* the dependencies are unchanged between runs, and so this will be `null` unless
* and until a new dependency is accessed — we track this via `skipped_deps`
* @type {null | Value[]}
*/
let new_deps = null;
let skipped_deps = 0;
/**
* Tracks writes that the effect it's executed in doesn't listen to yet,
* so that the dependency can be added to the effect later on if it then reads it
* @type {null | Source[]}
*/
let untracked_writes = null;
/** @param {null | Source[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}
/**
* @type {number} Used by sources and deriveds for handling updates.
* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
**/
let write_version = 1;
/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
let read_version = 0;
let update_version = read_version;
/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
/**
* Determines whether a derived or effect is dirty.
* If it is MAYBE_DIRTY, will set the status to CLEAN
* @param {Reaction} reaction
* @returns {boolean}
*/
function is_dirty(reaction) {
	var flags = reaction.f;
	if ((flags & 2048) !== 0) return true;
	if (flags & 2) reaction.f &= ~WAS_MARKED;
	if ((flags & 4096) !== 0) {
		var dependencies = reaction.deps;
		var length = dependencies.length;
		for (var i = 0; i < length; i++) {
			var dependency = dependencies[i];
			if (is_dirty(dependency)) update_derived(dependency);
			if (dependency.wv > reaction.wv) return true;
		}
		if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
	}
	return false;
}
/**
* @param {Value} signal
* @param {Effect} effect
* @param {boolean} [root]
*/
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
		else if (effect === reaction) {
			if (root) set_signal_status(reaction, DIRTY);
			else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
			schedule_effect(reaction);
		}
	}
}
/** @param {Reaction} reaction */
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & (32 | 64)) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	if (reaction.ac !== null) {
		without_reactive_context(() => {
			/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
		});
		reaction.ac = null;
	}
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		reaction.f |= REACTION_RAN;
		var deps = reaction.deps;
		var is_fork = current_batch?.is_fork;
		if (new_deps !== null) {
			var i;
			if (!is_fork) remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
		} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (2 | 4096 | 2048)) === 0) for (i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
			if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
			if (untracked_writes !== null) {
				if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
				else previous_untracked_writes.push(...untracked_writes);
			}
		}
		if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
		return result;
	} catch (error) {
		return handle_error(error);
	} finally {
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}
/**
* @template V
* @param {Reaction} signal
* @param {Value<V>} dependency
* @returns {void}
*/
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
		var derived = dependency;
		if ((derived.f & 512) !== 0) {
			derived.f ^= 512;
			derived.f &= ~WAS_MARKED;
		}
		if (derived.v !== UNINITIALIZED) update_derived_status(derived);
		if (derived.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ derived.ac.abort(STALE_REACTION);
			derived.ac = null;
			set_signal_status(derived, DIRTY);
		});
		freeze_derived_effects(derived);
		remove_reactions(derived, 0);
	}
}
/**
* @param {Reaction} signal
* @param {number} start_index
* @returns {void}
*/
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
/**
* @param {Effect} effect
* @returns {void}
*/
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & 16384) !== 0) return;
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;
	active_effect = effect;
	is_updating_effect = (flags & (32 | 64)) === 0;
	if (true) {
		var previous_component_fn = dev_current_component_function;
		set_dev_current_component_function(effect.component_function);
		var previous_stack = dev_stack;
		set_dev_stack(effect.dev_stack ?? dev_stack);
	}
	try {
		if ((flags & (16 | 16777216)) !== 0) destroy_block_effect_children(effect);
		else destroy_effect_children(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === "function" ? teardown : null;
		effect.wv = write_version;
		if (true && tracing_mode_flag && (effect.f & 2048) !== 0 && effect.deps !== null) {
			for (var dep of effect.deps) if (dep.set_during_effect) {
				dep.wv = increment_write_version();
				dep.set_during_effect = false;
			}
		}
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
		if (true) {
			set_dev_current_component_function(previous_component_fn);
			set_dev_stack(previous_stack);
		}
	}
}
/**
* Returns a promise that resolves once any pending state changes have been applied.
* @returns {Promise<void>}
*/
async function tick() {
	if (async_mode_flag) return new Promise((f) => {
		requestAnimationFrame(() => f());
		setTimeout(() => f());
	});
	await Promise.resolve();
	flushSync();
}
/**
* @template V
* @param {Value<V>} signal
* @returns {V}
*/
function get(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals?.add(signal);
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else new_deps.push(signal);
				}
			} else {
				active_reaction.deps ??= [];
				if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
				var reactions = signal.reactions;
				if (reactions === null) signal.reactions = [active_reaction];
				else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
			}
		}
	}
	if (true) {
		if (!untracking && reactivity_loss_tracker && current_batch === null && previous_batch === null && !reactivity_loss_tracker.warned && (reactivity_loss_tracker.effect.f & 2097152) === 0 && !reactivity_loss_tracker.effect_deps.has(signal)) {
			reactivity_loss_tracker.warned = true;
			await_reactivity_loss(signal.label);
			var trace = get_error("traced at");
			if (trace) console.warn(trace);
		}
		recent_async_deriveds.delete(signal);
		if (tracing_mode_flag && !untracking && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
			if (signal.trace) signal.trace();
			else {
				trace = get_error("traced at");
				if (trace) {
					var entry = tracing_expressions.entries.get(signal);
					if (entry === void 0) {
						entry = { traces: [] };
						tracing_expressions.entries.set(signal, entry);
					}
					var last = entry.traces[entry.traces.length - 1];
					if (trace.stack !== last?.stack) entry.traces.push(trace);
				}
			}
		}
	}
	if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
	if (is_derived) {
		var derived = signal;
		if (is_destroying_effect) {
			var value = derived.v;
			if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
			old_values.set(derived, value);
			return value;
		}
		var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
		var is_new = (derived.f & REACTION_RAN) === 0;
		if (is_dirty(derived)) {
			if (should_connect) derived.f |= 512;
			update_derived(derived);
		}
		if (should_connect && !is_new) {
			unfreeze_derived_effects(derived);
			reconnect(derived);
		}
	}
	if (batch_values?.has(signal)) return batch_values.get(signal);
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
/**
* (Re)connect a disconnected derived, so that it is notified
* of changes in `mark_reactions`
* @param {Derived} derived
*/
function reconnect(derived) {
	derived.f |= 512;
	if (derived.deps === null) return;
	for (const dep of derived.deps) {
		(dep.reactions ??= []).push(derived);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
			unfreeze_derived_effects(dep);
			reconnect(dep);
		}
	}
}
/** @param {Derived} derived */
function depends_on_old_values(derived) {
	if (derived.v === UNINITIALIZED) return true;
	if (derived.deps === null) return false;
	for (const dep of derived.deps) {
		if (old_values.has(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
	}
	return false;
}
/**
* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
* any state read inside `fn` will not be treated as a dependency.
*
* ```ts
* $effect(() => {
*   // this will run when `data` changes, but not when `time` changes
*   save(data, {
*     timestamp: untrack(() => time)
*   });
* });
* ```
* @template T
* @param {() => T} fn
* @returns {T}
*/
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}

//#endregion
//#region node_modules/svelte/src/utils.js
/**
* Attributes that are boolean, i.e. they are present or not present.
*/
const DOM_BOOLEAN_ATTRIBUTES = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"disabled",
	"formnovalidate",
	"indeterminate",
	"inert",
	"ismap",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"seamless",
	"selected",
	"webkitdirectory",
	"defer",
	"disablepictureinpicture",
	"disableremoteplayback"
];
const DOM_PROPERTIES = [
	...DOM_BOOLEAN_ATTRIBUTES,
	"formNoValidate",
	"isMap",
	"noModule",
	"playsInline",
	"readOnly",
	"value",
	"volume",
	"defaultValue",
	"defaultChecked",
	"srcObject",
	"noValidate",
	"allowFullscreen",
	"disablePictureInPicture",
	"disableRemotePlayback"
];
/**
* Subset of delegated events which should be passive by default.
* These two are already passive via browser defaults on window, document and body.
* But since
* - we're delegating them
* - they happen often
* - they apply to mobile which is generally less performant
* we're marking them as passive by default for other elements, too.
*/
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
/**
* Returns `true` if `name` is a passive event
* @param {string} name
*/
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
const STATE_CREATION_RUNES = [
	"$state",
	"$state.raw",
	"$derived",
	"$derived.by"
];
const RUNES = [
	...STATE_CREATION_RUNES,
	"$state.eager",
	"$state.snapshot",
	"$props",
	"$props.id",
	"$bindable",
	"$effect",
	"$effect.pre",
	"$effect.tracking",
	"$effect.root",
	"$effect.pending",
	"$inspect",
	"$inspect().with",
	"$inspect.trace",
	"$host"
];
/**
* Prevent devtools trying to make `location` a clickable link by inserting a zero-width space
* @template {string | undefined} T
* @param {T} location
* @returns {T};
*/
function sanitize_location(location) {
	return location?.replace(/\//g, "/​");
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/css.js
/** @type {Map<String, Set<HTMLStyleElement>>} */
var all_styles = /* @__PURE__ */ new Map();
/**
* @param {String} hash
* @param {HTMLStyleElement} style
*/
function register_style(hash, style) {
	var styles = all_styles.get(hash);
	if (!styles) {
		styles = /* @__PURE__ */ new Set();
		all_styles.set(hash, styles);
	}
	styles.add(style);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/elements.js
/** @import { SourceLocation } from '#client' */
/**
* @param {any} fn
* @param {string} filename
* @param {SourceLocation[]} locations
* @returns {any}
*/
function add_locations(fn, filename, locations) {
	return (...args) => {
		const dom = fn(...args);
		assign_locations(hydrating ? dom : dom.nodeType === 11 ? dom.firstChild : dom, filename, locations);
		return dom;
	};
}
/**
* @param {Element} element
* @param {string} filename
* @param {SourceLocation} location
*/
function assign_location(element, filename, location) {
	element.__svelte_meta = {
		parent: dev_stack,
		loc: {
			file: filename,
			line: location[0],
			column: location[1]
		}
	};
	if (location[2]) assign_locations(element.firstChild, filename, location[2]);
}
/**
* @param {Node | null} node
* @param {string} filename
* @param {SourceLocation[]} locations
*/
function assign_locations(node, filename, locations) {
	var i = 0;
	var depth = 0;
	while (node && i < locations.length) {
		if (hydrating && node.nodeType === 8) {
			var comment = node;
			if (comment.data[0] === "[") depth += 1;
			else if (comment.data[0] === "]") depth -= 1;
		}
		if (depth === 0 && node.nodeType === 1) assign_location(node, filename, locations[i++]);
		node = node.nextSibling;
	}
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
const event_symbol = Symbol("events");
/** @type {Set<string>} */
const all_registered_events = /* @__PURE__ */ new Set();
/** @type {Set<(events: Array<string>) => void>} */
const root_event_handles = /* @__PURE__ */ new Set();
/**
* @param {string} event_name
* @param {EventTarget} dom
* @param {EventListener} [handler]
* @param {AddEventListenerOptions} [options]
*/
function create_event(event_name, dom, handler, options = {}) {
	/**
	* @this {EventTarget}
	*/
	function target_handler(event) {
		if (!options.capture) handle_event_propagation.call(dom, event);
		if (!event.cancelBubble) return without_reactive_context(() => {
			return handler?.call(this, event);
		});
	}
	if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") queue_micro_task(() => {
		dom.addEventListener(event_name, target_handler, options);
	});
	else dom.addEventListener(event_name, target_handler, options);
	return target_handler;
}
/**
* @param {string} event_name
* @param {Element} dom
* @param {EventListener} [handler]
* @param {boolean} [capture]
* @param {boolean} [passive]
* @returns {void}
*/
function event(event_name, dom, handler, capture, passive) {
	var options = {
		capture,
		passive
	};
	var target_handler = create_event(event_name, dom, handler, options);
	if (dom === document.body || dom === window || dom === document || dom instanceof HTMLMediaElement) teardown(() => {
		dom.removeEventListener(event_name, target_handler, options);
	});
}
/**
* @param {string} event_name
* @param {Element} element
* @param {EventListener} [handler]
* @returns {void}
*/
function delegated(event_name, element, handler) {
	(element[event_symbol] ??= {})[event_name] = handler;
}
/**
* @param {Array<string>} events
* @returns {void}
*/
function delegate(events) {
	for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
	for (var fn of root_event_handles) fn(events);
}
let last_propagated_event = null;
let last_propagated_event_clear_scheduled = false;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var delegated = current_target[event_symbol]?.[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) break;
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
/**
* In dev, warn if an event handler is not a function, as it means the
* user probably called the handler or forgot to add a `() =>`
* @param {() => (event: Event, ...args: any) => void} thunk
* @param {EventTarget} element
* @param {[Event, ...any]} args
* @param {any} component
* @param {[number, number]} [loc]
* @param {boolean} [remove_parens]
*/
function apply(thunk, element, args, component, loc, has_side_effects = false, remove_parens = false) {
	let handler;
	let error;
	try {
		handler = thunk();
	} catch (e) {
		error = e;
	}
	if (typeof handler !== "function" && (has_side_effects || handler != null || error)) {
		const filename = component?.[FILENAME];
		const location = loc ? ` at ${filename}:${loc[0]}:${loc[1]}` : ` in ${filename}`;
		const phase = args[0]?.eventPhase < Event.BUBBLING_PHASE ? "capture" : "";
		const description = `\`${args[0]?.type + phase}\` handler${location}`;
		const suggestion = remove_parens ? "remove the trailing `()`" : "add a leading `() =>`";
		event_handler_invalid(description, suggestion);
		if (error) throw error;
	}
	handler?.apply(element, args);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
const policy = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { 
/** @param {string} html */
createHTML: (html) => {
	return html;
} });
/** @param {string} html */
function create_trusted_html(html) {
	return policy?.createHTML(html) ?? html;
}
/**
* @param {string} html
*/
function create_fragment_from_html(html) {
	var elem = create_element("template");
	elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
	return elem.content;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { TemplateStructure } from './types' */
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/**
* @param {string} content
* @param {number} flags
* @returns {() => Node | Node[]}
*/
/*#__NO_SIDE_EFFECTS__*/
function from_html(content, flags) {
	var is_fragment = (flags & 1) !== 0;
	var use_import_node = (flags & 2) !== 0;
	/** @type {Node} */
	var node;
	/**
	* Whether or not the first item is a text/element node. If not, we need to
	* create an additional comment node to act as `effect.nodes.start`
	*/
	var has_start = !content.startsWith("<!>");
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === void 0) {
			node = create_fragment_from_html(has_start ? content : "<!>" + content);
			if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
		}
		var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone);
			var end = clone.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone, clone);
		return clone;
	};
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {any} value
*/
function text(value = "") {
	if (!hydrating) {
		var t = create_text(value + "");
		assign_nodes(t, t);
		return t;
	}
	var node = hydrate_node;
	if (node.nodeType !== 3) {
		node.before(node = create_text());
		set_hydrate_node(node);
	} else merge_text_nodes(node);
	assign_nodes(node, node);
	return node;
}
/**
* @returns {TemplateNode | DocumentFragment}
*/
function comment() {
	if (hydrating) {
		assign_nodes(hydrate_node, null);
		return hydrate_node;
	}
	var frag = document.createDocumentFragment();
	var start = document.createComment("");
	var anchor = create_text();
	frag.append(start, anchor);
	assign_nodes(start, anchor);
	return frag;
}
/**
* Assign the created (or in hydration mode, traversed) dom elements to the current block
* and insert the elements into the dom (in client mode).
* @param {Text | Comment | Element} anchor
* @param {DocumentFragment | Element} dom
*/
function append(anchor, dom) {
	if (hydrating) {
		var effect = active_effect;
		if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) return;
	anchor.before(dom);
}
/**
* Create (or hydrate) an unique UID for the component instance.
*/
function props_id() {
	if (hydrating && hydrate_node && hydrate_node.nodeType === 8 && hydrate_node.textContent?.startsWith(`$`)) {
		const id = hydrate_node.textContent.substring(1);
		hydrate_next();
		return id;
	}
	(window.__svelte ??= {}).uid ??= 1;
	return `c${window.__svelte.uid++}`;
}

//#endregion
//#region node_modules/svelte/src/internal/client/render.js
/** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */
/**
* This is normally true — block effects should run their intro transitions —
* but is false during hydration (unless `options.intro` is `true`) and
* when creating the children of a `<svelte:element>` that just changed tag
*/
let should_intro = true;
/**
* @param {Element} text
* @param {string} value
* @returns {void}
*/
function set_text(text, value) {
	var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
	if (str !== (text[TEXT_CACHE] ??= text.nodeValue)) {
		/** @type {any} */ text[TEXT_CACHE] = str;
		text.nodeValue = `${str}`;
	}
}
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	init_operations();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/** @type {Map<EventTarget, Map<string, number>>} */
const listeners = /* @__PURE__ */ new Map();
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions} options
* @returns {Exports}
*/
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
	init_operations();
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor ?? target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			should_intro = intro;
			component = Component(anchor_node, props) || {};
			should_intro = true;
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		/** @type {Set<string>} */
		var registered_events = /* @__PURE__ */ new Set();
		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];
				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);
				var passive = is_passive_event(event_name);
				for (const node of [target, document]) {
					var counts = listeners.get(node);
					if (counts === void 0) {
						counts = /* @__PURE__ */ new Map();
						listeners.set(node, counts);
					}
					var count = counts.get(event_name);
					if (count === void 0) {
						node.addEventListener(event_name, handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else counts.set(event_name, count + 1);
				}
			}
		};
		event_handle(array_from(all_registered_events));
		root_event_handles.add(event_handle);
		return () => {
			for (var event_name of registered_events) for (const node of [target, document]) {
				var counts = listeners.get(node);
				var count = counts.get(event_name);
				if (--count == 0) {
					node.removeEventListener(event_name, handle_event_propagation);
					counts.delete(event_name);
					if (counts.size === 0) listeners.delete(node);
				} else counts.set(event_name, count);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* References of the components that were mounted or hydrated.
* Uses a `WeakMap` to avoid memory leaks.
*/
let mounted_components = /* @__PURE__ */ new WeakMap();
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	if (true) {
		if (STATE_SYMBOL in component) state_proxy_unmount();
		else lifecycle_double_unmount();
	}
	return Promise.resolve();
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/ownership.js
/** @typedef {{ file: string, line: number, column: number }} Location */
/**
* Sets up a validator that
* - traverses the path of a prop to find out if it is allowed to be mutated
* - checks that the binding chain is not interrupted
* @param {Record<string, any>} props
*/
function create_ownership_validator(props) {
	const component = component_context?.function;
	const parent = component_context?.p?.function;
	return {
		/**
		* @param {string} prop
		* @param {any[]} path
		* @param {any} result
		* @param {number} line
		* @param {number} column
		*/
		mutation: (prop, path, result, line, column) => {
			const name = path[0];
			if (is_bound_or_unset(props, name) || !parent) return result;
			/** @type {any} */
			let value = props;
			for (let i = 0; i < path.length - 1; i++) {
				value = value[path[i]];
				if (!value?.[STATE_SYMBOL]) return result;
			}
			const location = sanitize_location(`${component[FILENAME]}:${line}:${column}`);
			ownership_invalid_mutation(name, location, prop, parent[FILENAME]);
			return result;
		},
		/**
		* @param {any} key
		* @param {any} child_component
		* @param {() => any} value
		*/
		binding: (key, child_component, value) => {
			if (!is_bound_or_unset(props, key) && parent && value()?.[STATE_SYMBOL]) ownership_invalid_binding(component[FILENAME], key, child_component[FILENAME], parent[FILENAME]);
		}
	};
}
/**
* @param {Record<string, any>} props
* @param {string} prop_name
*/
function is_bound_or_unset(props, prop_name) {
	const is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
	return !!get_descriptor(props, prop_name)?.set || is_entry_props && prop_name in props || !(prop_name in props);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/legacy.js
/** @param {Function & { [FILENAME]: string }} target */
function check_target(target) {
	if (target) component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
}
function legacy_api() {
	const component = component_context?.function;
	/** @param {string} method */
	function error(method) {
		component_api_changed(method, component[FILENAME]);
	}
	return {
		$destroy: () => error("$destroy()"),
		$on: () => error("$on(...)"),
		$set: () => error("$set(...)")
	};
}

//#endregion
//#region node_modules/svelte/src/internal/client/dev/validation.js
/**
* @param {Node} anchor
* @param {...(()=>any)[]} args
*/
function validate_snippet_args(anchor, ...args) {
	if (typeof anchor !== "object" || !(anchor instanceof Node)) invalid_snippet_arguments();
	for (let arg of args) if (typeof arg !== "function") invalid_snippet_arguments();
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
/** @import { Effect, TemplateNode } from '#client' */
/**
* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
*/
/**
* @template Key
*/
var BranchManager = class {
	/** @type {TemplateNode} */
	anchor;
	/** @type {Map<Batch, Key>} */
	#batches = /* @__PURE__ */ new Map();
	/**
	* Map of keys to effects that are currently rendered in the DOM.
	* These effects are visible and actively part of the document tree.
	* Example:
	* ```
	* {#if condition}
	* 	foo
	* {:else}
	* 	bar
	* {/if}
	* ```
	* Can result in the entries `true->Effect` and `false->Effect`
	* @type {Map<Key, Effect>}
	*/
	#onscreen = /* @__PURE__ */ new Map();
	/**
	* Similar to #onscreen with respect to the keys, but contains branches that are not yet
	* in the DOM, because their insertion is deferred.
	* @type {Map<Key, Branch>}
	*/
	#offscreen = /* @__PURE__ */ new Map();
	/**
	* Keys of effects that are currently outroing
	* @type {Set<Key>}
	*/
	#outroing = /* @__PURE__ */ new Set();
	/**
	* Whether to pause (i.e. outro) on change, or destroy immediately.
	* This is necessary for `<svelte:element>`
	*/
	#transition = true;
	/**
	* @param {TemplateNode} anchor
	* @param {boolean} transition
	*/
	constructor(anchor, transition = true) {
		this.anchor = anchor;
		this.#transition = transition;
	}
	/**
	* @param {Batch} batch
	*/
	#commit = (batch) => {
		if (!this.#batches.has(batch)) return;
		var key = this.#batches.get(batch);
		var onscreen = this.#onscreen.get(key);
		if (onscreen) {
			resume_effect(onscreen);
			this.#outroing.delete(key);
		} else {
			var offscreen = this.#offscreen.get(key);
			if (offscreen) {
				resume_effect(offscreen.effect);
				this.#onscreen.set(key, offscreen.effect);
				this.#offscreen.delete(key);
				if (true)
 /** @type {any} */ offscreen.fragment.lastChild[HMR_ANCHOR] = this.anchor;
				/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
				this.anchor.before(offscreen.fragment);
				onscreen = offscreen.effect;
			}
		}
		for (const [b, k] of this.#batches) {
			this.#batches.delete(b);
			if (b === batch) break;
			const offscreen = this.#offscreen.get(k);
			if (offscreen) {
				destroy_effect(offscreen.effect);
				this.#offscreen.delete(k);
			}
		}
		for (const [k, effect] of this.#onscreen) {
			if (k === key || this.#outroing.has(k)) continue;
			const on_destroy = () => {
				if (Array.from(this.#batches.values()).includes(k)) {
					var fragment = document.createDocumentFragment();
					move_effect(effect, fragment);
					fragment.append(create_text());
					this.#offscreen.set(k, {
						effect,
						fragment
					});
				} else destroy_effect(effect);
				this.#outroing.delete(k);
				this.#onscreen.delete(k);
			};
			if (this.#transition || !onscreen) {
				this.#outroing.add(k);
				pause_effect(effect, on_destroy, false);
			} else on_destroy();
		}
	};
	/**
	* @param {Batch} batch
	*/
	#discard = (batch) => {
		this.#batches.delete(batch);
		const keys = Array.from(this.#batches.values());
		for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
			destroy_effect(branch.effect);
			this.#offscreen.delete(k);
		}
	};
	/**
	*
	* @param {any} key
	* @param {null | ((target: TemplateNode) => void)} fn
	*/
	ensure(key, fn) {
		var batch = current_batch;
		var defer = should_defer_append();
		if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
			if (defer) {
				var fragment = document.createDocumentFragment();
				var target = create_text();
				fragment.append(target);
				this.#offscreen.set(key, {
					effect: branch(() => fn(target)),
					fragment
				});
			} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
		}
		this.#batches.set(batch, key);
		if (defer) {
			for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
			else batch.skip_effect(effect);
			for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
			else batch.skip_effect(branch.effect);
			batch.oncommit(this.#commit);
			batch.ondiscard(this.#discard);
		} else {
			if (hydrating) this.anchor = hydrate_node;
			this.#commit(batch);
		}
	}
};

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
/** @import { TemplateNode } from '#client' */
/**
* @param {TemplateNode} node
* @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
* @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
* @returns {void}
*/
function if_block(node, fn, elseif = false) {
	/** @type {TemplateNode | undefined} */
	var marker;
	if (hydrating) {
		marker = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	/**
	* @param {number | false} key
	* @param {null | ((anchor: Node) => void)} fn
	*/
	function update_branch(key, fn) {
		if (hydrating) {
			var data = read_hydration_instruction(marker);
			if (key !== parseInt(data.substring(1))) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(key, fn);
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(key, fn);
	}
	block(() => {
		var has_branch = false;
		fn((fn, key = 0) => {
			has_branch = true;
			update_branch(key, fn);
		});
		if (!has_branch) update_branch(-1, null);
	}, flags);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
/** @import { Batch } from '../../reactivity/batch.js'; */
/**
* @param {any} _
* @param {number} i
*/
function index(_, i) {
	return i;
}
/**
* Pause multiple effects simultaneously, and coordinate their
* subsequent destruction. Used in each blocks
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {null | Node} controlled_anchor
*/
function pause_effects(state, to_destroy, controlled_anchor) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	var length = to_destroy.length;
	/** @type {EachOutroGroup} */
	var group;
	var remaining = to_destroy.length;
	for (var i = 0; i < length; i++) {
		let effect = to_destroy[i];
		pause_effect(effect, () => {
			if (group) {
				group.pending.delete(effect);
				group.done.add(effect);
				if (group.pending.size === 0) {
					var groups = state.outrogroups;
					destroy_effects(state, array_from(group.done));
					groups.delete(group);
					if (groups.size === 0) state.outrogroups = null;
				}
			} else remaining -= 1;
		}, false);
	}
	if (remaining === 0) {
		var fast_path = transitions.length === 0 && controlled_anchor !== null && state.pending.size === 0;
		if (fast_path) {
			var anchor = controlled_anchor;
			var parent_node = anchor.parentNode;
			clear_text_content(parent_node);
			parent_node.append(anchor);
			state.items.clear();
		}
		destroy_effects(state, to_destroy, !fast_path);
	} else {
		group = {
			pending: new Set(to_destroy),
			done: /* @__PURE__ */ new Set()
		};
		(state.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
	}
}
/**
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {boolean} remove_dom
*/
function destroy_effects(state, to_destroy, remove_dom = true) {
	/** @type {Set<Effect> | undefined} */
	var preserved_effects;
	if (state.pending.size > 0) {
		preserved_effects = /* @__PURE__ */ new Set();
		for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
			/** @type {EachItem} */
			state.items.get(key).e
		);
	}
	for (var i = 0; i < to_destroy.length; i++) {
		var e = to_destroy[i];
		if (preserved_effects?.has(e)) {
			e.f |= EFFECT_OFFSCREEN;
			const fragment = document.createDocumentFragment();
			move_effect(e, fragment);
		} else destroy_effect(to_destroy[i], remove_dom);
	}
}
/** @type {TemplateNode} */
var offscreen_anchor;
/**
* @template V
* @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
* @param {number} flags
* @param {() => V[]} get_collection
* @param {(value: V, index: number) => any} get_key
* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
* @param {null | ((anchor: Node) => void)} fallback_fn
* @returns {void}
*/
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	/** @type {Map<any, EachItem>} */
	var items = /* @__PURE__ */ new Map();
	if ((flags & 4) !== 0) {
		var parent_node = node;
		anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
	}
	if (hydrating) hydrate_next();
	/** @type {Effect | null} */
	var fallback = null;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	if (true) tag(each_array, "{#each ...}");
	/** @type {V[]} */
	var array;
	/** @type {Map<Batch, Set<any>>} */
	var pending = /* @__PURE__ */ new Map();
	var first_run = true;
	/**
	* @param {Batch} batch
	*/
	function commit(batch) {
		if ((state.effect.f & 16384) !== 0) return;
		state.pending.delete(batch);
		state.fallback = fallback;
		reconcile(state, array, anchor, flags, get_key);
		if (fallback !== null) {
			if (array.length === 0) {
				if ((fallback.f & 33554432) === 0) resume_effect(fallback);
				else {
					fallback.f ^= EFFECT_OFFSCREEN;
					move(fallback, null, anchor);
				}
			} else pause_effect(fallback, () => {
				fallback = null;
			});
		}
	}
	/**
	* @param {Batch} batch
	*/
	function discard(batch) {
		state.pending.delete(batch);
	}
	/** @type {EachState} */
	var state = {
		effect: block(() => {
			array = get(each_array);
			var length = array.length;
			/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
			let mismatch = false;
			if (hydrating) {
				if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
					anchor = skip_nodes();
					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}
			var keys = /* @__PURE__ */ new Set();
			var batch = current_batch;
			var defer = should_defer_append();
			for (var index = 0; index < length; index += 1) {
				if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					anchor = hydrate_node;
					mismatch = true;
					set_hydrating(false);
				}
				var value = array[index];
				var key = get_key(value, index);
				if (true) {
					var key_again = get_key(value, index);
					if (key !== key_again) each_key_volatile(String(index), String(key), String(key_again));
				}
				var item = first_run ? null : items.get(key);
				if (item) {
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);
					if (defer) batch.unskip_effect(item.e);
				} else {
					item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
					if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
					items.set(key, item);
				}
				keys.add(key);
			}
			if (length === 0 && fallback_fn && !fallback) {
				if (first_run) fallback = branch(() => fallback_fn(anchor));
				else {
					fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
					fallback.f |= EFFECT_OFFSCREEN;
				}
			}
			if (length > keys.size) {
				if (true) validate_each_keys(array, get_key);
				else each_key_duplicate("", "", "");
			}
			if (hydrating && length > 0) set_hydrate_node(skip_nodes());
			if (!first_run) {
				pending.set(batch, keys);
				if (defer) {
					for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
					batch.oncommit(commit);
					batch.ondiscard(discard);
				} else commit(batch);
			}
			if (mismatch) set_hydrating(true);
			get(each_array);
		}),
		flags,
		items,
		pending,
		outrogroups: null,
		fallback
	};
	first_run = false;
	if (hydrating) anchor = hydrate_node;
}
/**
* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
* @param {Effect | null} effect
* @returns {Effect | null}
*/
function skip_to_branch(effect) {
	while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
	return effect;
}
/**
* Add, remove, or reorder items output by an each block as its input changes
* @template V
* @param {EachState} state
* @param {Array<V>} array
* @param {Element | Comment | Text} anchor
* @param {number} flags
* @param {(value: V, index: number) => any} get_key
* @returns {void}
*/
function reconcile(state, array, anchor, flags, get_key) {
	var is_animated = (flags & 8) !== 0;
	var length = array.length;
	var items = state.items;
	var current = skip_to_branch(state.effect.first);
	/** @type {undefined | Set<Effect>} */
	var seen;
	/** @type {Effect | null} */
	var prev = null;
	/** @type {undefined | Set<Effect>} */
	var to_animate;
	/** @type {Effect[]} */
	var matched = [];
	/** @type {Effect[]} */
	var stashed = [];
	/** @type {V} */
	var value;
	/** @type {any} */
	var key;
	/** @type {Effect | undefined} */
	var effect;
	/** @type {number} */
	var i;
	if (is_animated) for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if ((effect.f & 33554432) === 0) {
			effect.nodes?.a?.measure();
			(to_animate ??= /* @__PURE__ */ new Set()).add(effect);
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if (state.outrogroups !== null) for (const group of state.outrogroups) {
			group.pending.delete(effect);
			group.done.delete(effect);
		}
		if ((effect.f & 8192) !== 0) {
			resume_effect(effect);
			if (is_animated) {
				effect.nodes?.a?.unfix();
				(to_animate ??= /* @__PURE__ */ new Set()).delete(effect);
			}
		}
		if ((effect.f & 33554432) !== 0) {
			effect.f ^= EFFECT_OFFSCREEN;
			if (effect === current) move(effect, null, anchor);
			else {
				var next = prev ? prev.next : current;
				if (effect === state.effect.last) state.effect.last = effect.prev;
				if (effect.prev) effect.prev.next = effect.next;
				if (effect.next) effect.next.prev = effect.prev;
				link(state, prev, effect);
				link(state, effect, next);
				move(effect, next, anchor);
				prev = effect;
				matched = [];
				stashed = [];
				current = skip_to_branch(prev.next);
				continue;
			}
		}
		if (effect !== current) {
			if (seen !== void 0 && seen.has(effect)) {
				if (matched.length < stashed.length) {
					var start = stashed[0];
					var j;
					prev = start.prev;
					var a = matched[0];
					var b = matched[matched.length - 1];
					for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
					for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(effect);
					move(effect, current, anchor);
					link(state, effect.prev, effect.next);
					link(state, effect, prev === null ? state.effect.first : prev.next);
					link(state, prev, effect);
					prev = effect;
				}
				continue;
			}
			matched = [];
			stashed = [];
			while (current !== null && current !== effect) {
				(seen ??= /* @__PURE__ */ new Set()).add(current);
				stashed.push(current);
				current = skip_to_branch(current.next);
			}
			if (current === null) continue;
		}
		if ((effect.f & 33554432) === 0) matched.push(effect);
		prev = effect;
		current = skip_to_branch(effect.next);
	}
	if (state.outrogroups !== null) {
		for (const group of state.outrogroups) if (group.pending.size === 0) {
			destroy_effects(state, array_from(group.done));
			state.outrogroups?.delete(group);
		}
		if (state.outrogroups.size === 0) state.outrogroups = null;
	}
	if (current !== null || seen !== void 0) {
		/** @type {Effect[]} */
		var to_destroy = [];
		if (seen !== void 0) {
			for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
		}
		while (current !== null) {
			if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
			current = skip_to_branch(current.next);
		}
		var destroy_length = to_destroy.length;
		if (destroy_length > 0) {
			var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
			}
			pause_effects(state, to_destroy, controlled_anchor);
		}
	}
	if (is_animated) queue_micro_task(() => {
		if (to_animate === void 0) return;
		for (effect of to_animate) effect.nodes?.a?.apply();
	});
}
/**
* @template V
* @param {Map<any, EachItem>} items
* @param {Node} anchor
* @param {V} value
* @param {unknown} key
* @param {number} index
* @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
* @param {number} flags
* @param {() => V[]} get_collection
* @returns {EachItem}
*/
function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
	var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
	var i = (flags & 2) !== 0 ? source(index) : null;
	if (true && v) v.trace = () => {
		get_collection()[i?.v ?? index];
	};
	return {
		v,
		i,
		e: branch(() => {
			render_fn(anchor, v ?? value, i ?? index, get_collection);
			return () => {
				items.delete(key);
			};
		})
	};
}
/**
* @param {Effect} effect
* @param {Effect | null} next
* @param {Text | Element | Comment} anchor
*/
function move(effect, next, anchor) {
	if (!effect.nodes) return;
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
	while (node !== null) {
		var next_node = /* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		if (node === end) return;
		node = next_node;
	}
}
/**
* @param {EachState} state
* @param {Effect | null} prev
* @param {Effect | null} next
*/
function link(state, prev, next) {
	if (prev === null) state.effect.first = next;
	else prev.next = next;
	if (next === null) state.effect.last = prev;
	else next.prev = prev;
}
/**
* @param {Array<any>} array
* @param {(item: any, index: number) => string} key_fn
* @returns {void}
*/
function validate_each_keys(array, key_fn) {
	const keys = /* @__PURE__ */ new Map();
	const length = array.length;
	for (let i = 0; i < length; i++) {
		const key = key_fn(array[i], i);
		if (keys.has(key)) {
			const a = String(keys.get(key));
			const b = String(i);
			/** @type {string | null} */
			let k = String(key);
			if (k.startsWith("[object ")) k = null;
			each_key_duplicate(a, b, k);
		}
		keys.set(key, i);
	}
}

//#endregion
//#region node_modules/svelte/src/internal/shared/validate.js
/**
* @template {(...args: any[]) => unknown} T
* @param {T} fn
*/
function prevent_snippet_stringification(fn) {
	fn.toString = () => {
		snippet_without_render_tag();
		return "";
	};
	return fn;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/snippet.js
/** @import { Snippet } from 'svelte' */
/** @import { TemplateNode } from '#client' */
/** @import { Getters } from '#shared' */
/**
* @template {(node: TemplateNode, ...args: any[]) => void} SnippetFn
* @param {TemplateNode} node
* @param {() => SnippetFn | null | undefined} get_snippet
* @param {(() => any)[]} args
* @returns {void}
*/
function snippet(node, get_snippet, ...args) {
	var branches = new BranchManager(node);
	block(() => {
		const snippet = get_snippet() ?? null;
		if (true && snippet == null) invalid_snippet();
		branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
	}, EFFECT_TRANSPARENT);
}
/**
* In development, wrap the snippet function so that it passes validation, and so that the
* correct component context is set for ownership checks
* @param {any} component
* @param {(node: TemplateNode, ...args: any[]) => void} fn
*/
function wrap_snippet(component, fn) {
	const snippet = (node, ...args) => {
		var previous_component_function = dev_current_component_function;
		set_dev_current_component_function(component);
		try {
			return fn(node, ...args);
		} finally {
			set_dev_current_component_function(previous_component_function);
		}
	};
	prevent_snippet_stringification(snippet);
	return snippet;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
/** @import { TemplateNode, Dom } from '#client' */
/**
* @template P
* @template {(props: P) => void} C
* @param {TemplateNode} node
* @param {() => C} get_component
* @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
* @returns {void}
*/
function component(node, get_component, render_fn) {
	/** @type {TemplateNode | undefined} */
	var hydration_start_node;
	if (hydrating) {
		hydration_start_node = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	block(() => {
		var component = get_component() ?? null;
		if (hydrating) {
			if (read_hydration_instruction(hydration_start_node) === "[" !== (component !== null)) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(component, component && ((target) => render_fn(target, component)));
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(component, component && ((target) => render_fn(target, component)));
	}, EFFECT_TRANSPARENT);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/css.js
/**
* @param {Node} anchor
* @param {{ hash: string, code: string }} css
*/
function append_styles$1(anchor, css) {
	effect(() => {
		anchor = active_effect?.parent?.nodes?.start ?? anchor;
		var root = anchor.getRootNode();
		var target = root.host ? root : /** @type {Document} */ root.head ?? root.ownerDocument.head;
		if (!target.querySelector("#" + css.hash)) {
			const style = create_element("style");
			style.id = css.hash;
			style.textContent = css.code;
			target.appendChild(style);
			if (true) register_style(css.hash, style);
		}
	});
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attachments.js
/** @import { Effect } from '#client' */
/**
* @param {Element} node
* @param {() => (node: Element) => void} get_fn
*/
function attach(node, get_fn) {
	/** @type {false | undefined | ((node: Element) => void)} */
	var fn = void 0;
	/** @type {Effect | null} */
	var e;
	managed(() => {
		if (fn !== (fn = get_fn())) {
			if (e) {
				destroy_effect(e);
				e = null;
			}
			if (fn) e = branch(() => {
				effect(() => fn(node));
			});
		}
	});
}

//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
const whitespace = [..." 	\n\r\f\xA0\v﻿"];
/**
* @param {any} value
* @param {string | null} [hash]
* @param {Record<string, boolean>} [directives]
* @returns {string | null}
*/
function to_class(value, hash, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash) classname = classname ? classname + " " + hash : hash;
	if (directives) {
		for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
		else if (classname.length) {
			var len = key.length;
			var a = 0;
			while ((a = classname.indexOf(key, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
/**
*
* @param {Record<string,any>} styles
* @param {boolean} important
*/
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== "") css += " " + key + ": " + value + separator;
	}
	return css;
}
/**
* @param {string} name
* @returns {string}
*/
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
/**
* @param {any} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
* @returns {string | null}
*/
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		/** @type {Record<string,any> | undefined} */
		var normal_styles;
		/** @type {Record<string,any> | undefined} */
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
/**
* @param {Element} dom
* @param {boolean | number} is_html
* @param {string | null} value
* @param {string} [hash]
* @param {Record<string, any>} [prev_classes]
* @param {Record<string, any>} [next_classes]
* @returns {Record<string, boolean> | undefined}
*/
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = dom[CLASS_CACHE];
	if (hydrating || prev !== value || prev === void 0) {
		var next_class_name = to_class(value, hash, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute("class")) {
			if (next_class_name == null) dom.removeAttribute("class");
			else if (is_html) dom.className = next_class_name;
			else dom.setAttribute("class", next_class_name);
		}
		/** @type {any} */ dom[CLASS_CACHE] = value;
	} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
		var is_present = !!next_classes[key];
		if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
	}
	return next_classes;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {Record<string, any>} prev
* @param {Record<string, any>} next
* @param {string} [priority]
*/
function update_styles(dom, prev = {}, next, priority) {
	for (var key in next) {
		var value = next[key];
		if (prev[key] !== value) {
			if (next[key] == null) dom.style.removeProperty(key);
			else dom.style.setProperty(key, value, priority);
		}
	}
}
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {string | null} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
*/
function set_style(dom, value, prev_styles, next_styles) {
	var prev = dom[STYLE_CACHE];
	if (hydrating || prev !== value) {
		var next_style_attr = to_style(value, next_styles);
		if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
			if (next_style_attr == null) dom.removeAttribute("style");
			else dom.style.cssText = next_style_attr;
		}
		/** @type {any} */ dom[STYLE_CACHE] = value;
	} else if (next_styles) {
		if (Array.isArray(next_styles)) {
			update_styles(dom, prev_styles?.[0], next_styles[0]);
			update_styles(dom, prev_styles?.[1], next_styles[1], "important");
		} else update_styles(dom, prev_styles, next_styles);
	}
	return next_styles;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
/** @import { Blocker, Effect } from '#client' */
const IS_CUSTOM_ELEMENT = Symbol("is custom element");
const IS_HTML = Symbol("is html");
const LINK_TAG = IS_XHTML ? "link" : "LINK";
/**
* The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
* to remove it upon hydration to avoid a bug when someone resets the form value.
* @param {HTMLInputElement} input
* @returns {void}
*/
function remove_input_defaults(input) {
	if (!hydrating) return;
	var already_removed = false;
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;
		if (input.hasAttribute("value")) {
			var value = input.value;
			set_attribute(input, "value", null);
			input.value = value;
		}
		if (input.hasAttribute("checked")) {
			var checked = input.checked;
			set_attribute(input, "checked", null);
			input.checked = checked;
		}
	};
	/** @type {any} */ input[FORM_RESET_HANDLER] = remove_defaults;
	queue_micro_task(remove_defaults);
	add_form_reset_listener();
}
/**
* @param {Element} element
* @param {boolean} checked
*/
function set_checked(element, checked) {
	var attributes = get_attributes(element);
	if (attributes.checked === (attributes.checked = checked ?? void 0)) return;
	element.checked = checked;
}
/**
* @param {Element} element
* @param {string} attribute
* @param {string | null} value
* @param {boolean} [skip_warning]
*/
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = get_attributes(element);
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
			if (!skip_warning) check_src_in_dev_hydration(element, attribute, value ?? "");
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
	if (value == null) element.removeAttribute(attribute);
	else if (typeof value !== "string" && get_setters(element).includes(attribute)) element[attribute] = value;
	else element.setAttribute(attribute, value);
}
/**
*
* @param {Element} element
*/
function get_attributes(element) {
	return element[ATTRIBUTES_CACHE] ??= {
		[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
		[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
	};
}
/** @type {Map<string, string[]>} */
var setters_cache = /* @__PURE__ */ new Map();
/** @param {Element} element */
function get_setters(element) {
	var cache_key = element.getAttribute("is") || element.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, setters = []);
	var descriptors;
	var proto = element;
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.push(key);
		proto = get_prototype_of(proto);
	}
	return setters;
}
/**
* @param {any} element
* @param {string} attribute
* @param {string} value
*/
function check_src_in_dev_hydration(element, attribute, value) {
	if (!true) return;
	if (attribute === "srcset" && srcset_url_equal(element, value)) return;
	if (src_url_equal(element.getAttribute(attribute) ?? "", value)) return;
	hydration_attribute_changed(attribute, element.outerHTML.replace(element.innerHTML, element.innerHTML && "..."), String(value));
}
/**
* @param {string} element_src
* @param {string} url
* @returns {boolean}
*/
function src_url_equal(element_src, url) {
	if (element_src === url) return true;
	return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}
/** @param {string} srcset */
function split_srcset(srcset) {
	return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
}
/**
* @param {HTMLSourceElement | HTMLImageElement} element
* @param {string} srcset
* @returns {boolean}
*/
function srcset_url_equal(element, srcset) {
	var element_urls = split_srcset(element.srcset);
	var urls = split_srcset(srcset);
	return urls.length === element_urls.length && urls.every(([url, width], i) => width === element_urls[i][1] && (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0])));
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
/** @import { Batch } from '../../../reactivity/batch.js' */
/**
* @param {HTMLInputElement} input
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_value(input, get, set = get) {
	var batches = /* @__PURE__ */ new WeakSet();
	listen_to_event_and_reset_event(input, "input", async (is_reset) => {
		if (true && input.type === "checkbox") bind_invalid_checkbox_value();
		/** @type {any} */
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set(value);
		if (current_batch !== null) batches.add(current_batch);
		await tick();
		if (value !== (value = get())) {
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var length = input.value.length;
			input.value = value ?? "";
			if (end !== null) {
				var new_length = input.value.length;
				if (start === end && end === length && new_length > length) {
					input.selectionStart = new_length;
					input.selectionEnd = new_length;
				} else {
					input.selectionStart = start;
					input.selectionEnd = Math.min(end, new_length);
				}
			}
		}
	});
	if (hydrating && input.defaultValue !== input.value || untrack(get) == null && input.value) {
		set(is_numberlike_input(input) ? to_number(input.value) : input.value);
		if (current_batch !== null) batches.add(current_batch);
	}
	render_effect(() => {
		if (true && input.type === "checkbox") bind_invalid_checkbox_value();
		var value = get();
		if (input === document.activeElement) {
			var batch = async_mode_flag ? previous_batch : current_batch;
			if (batches.has(batch)) return;
		}
		if (is_numberlike_input(input) && value === to_number(input.value)) return;
		if (input.type === "date" && !value && !input.value) return;
		if (value !== input.value) input.value = value ?? "";
	});
}
/**
* @param {HTMLInputElement} input
*/
function is_numberlike_input(input) {
	var type = input.type;
	return type === "number" || type === "range";
}
/**
* @param {string} value
*/
function to_number(value) {
	return value === "" ? null : +value;
}

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
/** @import { ComponentContext, Effect } from '#client' */
/**
* @param {any} bound_value
* @param {Element} element_or_component
* @returns {boolean}
*/
function is_bound_this(bound_value, element_or_component) {
	return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
/**
* @param {any} element_or_component
* @param {(value: unknown, ...parts: unknown[]) => void} update
* @param {(...parts: unknown[]) => unknown} get_value
* @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
* 										returns all the parts of the each block context that are used in the expression
* @returns {void}
*/
function bind_this(element_or_component = {}, update, get_value, get_parts) {
	var component_effect = component_context.r;
	var parent = active_effect;
	effect(() => {
		/** @type {unknown[]} */
		var old_parts;
		/** @type {unknown[]} */
		var parts;
		render_effect(() => {
			old_parts = parts;
			parts = get_parts?.() || [];
			untrack(() => {
				if (!is_bound_this(get_value(...parts), element_or_component)) {
					update(element_or_component, ...parts);
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
				}
			});
		});
		return () => {
			let p = parent;
			while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
			const teardown = () => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
			};
			const original_teardown = p.teardown;
			p.teardown = () => {
				teardown();
				original_teardown?.();
			};
		};
	});
	return element_or_component;
}

//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
/** @import { Derived, Effect, Source } from './types.js' */
/**
* This function is responsible for synchronizing a possibly bound prop with the inner component state.
* It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
* @template V
* @param {Record<string, unknown>} props
* @param {string} key
* @param {number} flags
* @param {V | (() => V)} [fallback]
* @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
*/
function prop(props, key, flags, fallback) {
	var runes = !legacy_mode_flag || (flags & 2) !== 0;
	var bindable = (flags & 8) !== 0;
	var lazy = (flags & 16) !== 0;
	var fallback_value = fallback;
	var fallback_dirty = true;
	var fallback_signal = void 0;
	var get_fallback = () => {
		if (lazy && runes) {
			fallback_signal ??= /* @__PURE__ */ derived(fallback);
			return get(fallback_signal);
		}
		if (fallback_dirty) {
			fallback_dirty = false;
			fallback_value = lazy ? untrack(fallback) : fallback;
		}
		return fallback_value;
	};
	/** @type {((v: V) => void) | undefined} */
	let setter;
	if (bindable) {
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
	}
	/** @type {V} */
	var initial_value;
	var is_store_sub = false;
	if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
	else initial_value = props[key];
	if (initial_value === void 0 && fallback !== void 0) {
		initial_value = get_fallback();
		if (setter) {
			if (runes) props_invalid_value(key);
			setter(initial_value);
		}
	}
	/** @type {() => V} */
	var getter;
	if (runes) getter = () => {
		var value = props[key];
		if (value === void 0) return get_fallback();
		fallback_dirty = true;
		return value;
	};
	else getter = () => {
		var value = props[key];
		if (value !== void 0) fallback_value = void 0;
		return value === void 0 ? fallback_value : value;
	};
	if (runes && (flags & 4) === 0) return getter;
	if (setter) {
		var legacy_parent = props.$$legacy;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
				return value;
			}
			return getter();
		});
	}
	var overridden = false;
	var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});
	if (true) d.label = key;
	if (bindable) get(d);
	var parent_effect = active_effect;
	return (function(value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
			set(d, new_value);
			overridden = true;
			if (fallback_value !== void 0) fallback_value = new_value;
			return value;
		}
		if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
		return get(d);
	});
}

//#endregion
//#region node_modules/svelte/src/legacy/legacy-client.js
/** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */
/**
* Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {ComponentConstructorOptions<Props> & {
* 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
* }} options
* @returns {SvelteComponent<Props, Events, Slots> & Exports}
*/
function createClassComponent(options) {
	return new Svelte4Component(options);
}
/**
* Support using the component as both a class and function during the transition period
* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
*/
var Svelte4Component = class {
	/** @type {any} */
	#events;
	/** @type {Record<string, any>} */
	#instance;
	/**
	* @param {ComponentConstructorOptions & {
	*  component: any;
	* }} options
	*/
	constructor(options) {
		var sources = /* @__PURE__ */ new Map();
		/**
		* @param {string | symbol} key
		* @param {unknown} value
		*/
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop) {
				return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
			},
			has(target, prop) {
				if (prop === LEGACY_PROPS) return true;
				get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				return Reflect.has(target, prop);
			},
			set(target, prop, value) {
				set(sources.get(prop) ?? add_source(prop, value), value);
				return Reflect.set(target, prop, value);
			}
		});
		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover,
			transformError: options.transformError
		});
		if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) flushSync();
		this.#events = props.$$events;
		for (const key of Object.keys(this.#instance)) {
			if (key === "$set" || key === "$destroy" || key === "$on") continue;
			define_property(this, key, {
				get() {
					return this.#instance[key];
				},
				/** @param {any} value */
				set(value) {
					this.#instance[key] = value;
				},
				enumerable: true
			});
		}
		this.#instance.$set = (next) => {
			Object.assign(props, next);
		};
		this.#instance.$destroy = () => {
			unmount(this.#instance);
		};
	}
	/** @param {Record<string, any>} props */
	$set(props) {
		this.#instance.$set(props);
	}
	/**
	* @param {string} event
	* @param {(...args: any[]) => any} callback
	* @returns {any}
	*/
	$on(event, callback) {
		this.#events[event] = this.#events[event] || [];
		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event].push(cb);
		return () => {
			this.#events[event] = this.#events[event].filter(
				/** @param {any} fn */
				(fn) => fn !== cb
			);
		};
	}
	$destroy() {
		this.#instance.$destroy();
	}
};

//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/custom-element.js
/**
* @typedef {Object} CustomElementPropDefinition
* @property {string} [attribute]
* @property {boolean} [reflect]
* @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
*/
/** @type {any} */
let SvelteElement;
if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
	/** The Svelte component constructor */
	$$ctor;
	/** Slots */
	$$s;
	/** @type {any} The Svelte component instance */
	$$c;
	/** Whether or not the custom element is connected */
	$$cn = false;
	/** @type {Record<string, any>} Component props data */
	$$d = {};
	/** `true` if currently in the process of reflecting component props back to attributes */
	$$r = false;
	/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
	$$p_d = {};
	/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
	$$l = {};
	/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
	$$l_u = /* @__PURE__ */ new Map();
	/** @type {any} The managed render effect for reflecting attributes */
	$$me;
	/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
	$$shadowRoot = null;
	/**
	* @param {*} $$componentCtor
	* @param {*} $$slots
	* @param {ShadowRootInit | undefined} shadow_root_init
	*/
	constructor($$componentCtor, $$slots, shadow_root_init) {
		super();
		this.$$ctor = $$componentCtor;
		this.$$s = $$slots;
		if (shadow_root_init) this.$$shadowRoot = this.attachShadow(shadow_root_init);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	addEventListener(type, listener, options) {
		this.$$l[type] = this.$$l[type] || [];
		this.$$l[type].push(listener);
		if (this.$$c) {
			const unsub = this.$$c.$on(type, listener);
			this.$$l_u.set(listener, unsub);
		}
		super.addEventListener(type, listener, options);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	removeEventListener(type, listener, options) {
		super.removeEventListener(type, listener, options);
		if (this.$$c) {
			const unsub = this.$$l_u.get(listener);
			if (unsub) {
				unsub();
				this.$$l_u.delete(listener);
			}
		}
	}
	async connectedCallback() {
		this.$$cn = true;
		if (!this.$$c) {
			await Promise.resolve();
			if (!this.$$cn || this.$$c) return;
			/** @param {string} name */
			function create_slot(name) {
				/**
				* @param {Element} anchor
				*/
				return (anchor) => {
					const slot = create_element("slot");
					if (name !== "default") slot.name = name;
					append(anchor, slot);
				};
			}
			/** @type {Record<string, any>} */
			const $$slots = {};
			const existing_slots = get_custom_elements_slots(this);
			for (const name of this.$$s) if (name in existing_slots) {
				if (name === "default" && !this.$$d.children) {
					this.$$d.children = create_slot(name);
					$$slots.default = true;
				} else $$slots[name] = create_slot(name);
			}
			for (const attribute of this.attributes) {
				const name = this.$$g_p(attribute.name);
				if (!(name in this.$$d)) this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
			}
			for (const key in this.$$p_d) if (!(key in this.$$d) && this[key] !== void 0) {
				this.$$d[key] = this[key];
				delete this[key];
			}
			this.$$c = createClassComponent({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots,
					$$host: this
				}
			});
			this.$$me = effect_root(() => {
				render_effect(() => {
					this.$$r = true;
					for (const key of object_keys(this.$$c)) {
						if (!this.$$p_d[key]?.reflect) continue;
						this.$$d[key] = this.$$c[key];
						const attribute_value = get_custom_element_value(key, this.$$d[key], this.$$p_d, "toAttribute");
						if (attribute_value == null) this.removeAttribute(this.$$p_d[key].attribute || key);
						else this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
					}
					this.$$r = false;
				});
			});
			for (const type in this.$$l) for (const listener of this.$$l[type]) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			this.$$l = {};
		}
	}
	/**
	* @param {string} attr
	* @param {string} _oldValue
	* @param {string} newValue
	*/
	attributeChangedCallback(attr, _oldValue, newValue) {
		if (this.$$r) return;
		attr = this.$$g_p(attr);
		this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
		this.$$c?.$set({ [attr]: this.$$d[attr] });
	}
	disconnectedCallback() {
		this.$$cn = false;
		Promise.resolve().then(() => {
			if (!this.$$cn && this.$$c) {
				this.$$c.$destroy();
				this.$$me();
				this.$$c = void 0;
			}
		});
	}
	/**
	* @param {string} attribute_name
	*/
	$$g_p(attribute_name) {
		return object_keys(this.$$p_d).find((key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name) || attribute_name;
	}
};
/**
* @param {string} prop
* @param {any} value
* @param {Record<string, CustomElementPropDefinition>} props_definition
* @param {'toAttribute' | 'toProp'} [transform]
*/
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
	if (!transform || !props_definition[prop]) return value;
	else if (transform === "toAttribute") switch (type) {
		case "Object":
		case "Array": return value == null ? null : JSON.stringify(value);
		case "Boolean": return value ? "" : null;
		case "Number": return value == null ? null : value;
		default: return value;
	}
	else switch (type) {
		case "Object":
		case "Array": return value && JSON.parse(value);
		case "Boolean": return value;
		case "Number": return value != null ? +value : value;
		default: return value;
	}
}
/**
* @param {HTMLElement} element
*/
function get_custom_elements_slots(element) {
	/** @type {Record<string, true>} */
	const result = {};
	element.childNodes.forEach((node) => {
		result[node.slot || "default"] = true;
	});
	return result;
}

//#endregion
//#region node_modules/svelte/src/index-client.js
if (true) {
	/**
	* @param {string} rune
	*/
	function throw_rune_error(rune) {
		if (!(rune in globalThis)) {
			/** @type {any} */
			let value;
			Object.defineProperty(globalThis, rune, {
				configurable: true,
				get: () => {
					if (value !== void 0) return value;
					rune_outside_svelte(rune);
				},
				set: (v) => {
					value = v;
				}
			});
		}
	}
	throw_rune_error("$state");
	throw_rune_error("$effect");
	throw_rune_error("$derived");
	throw_rune_error("$inspect");
	throw_rune_error("$props");
	throw_rune_error("$bindable");
}

//#endregion
//#region node_modules/@children-of-atom/svelte-view/dist/index.js
var a$6 = "svelte-view-container";
function o$5() {
	customElements.get("svelte-view-container") || customElements.define(a$6, class extends HTMLElement {
		connectedCallback() {}
		disconnectedCallback() {}
	});
}
function s$4(e, t) {
	return {
		top: e.addTopPanel.bind(e),
		bottom: e.addBottomPanel.bind(e),
		left: e.addLeftPanel.bind(e),
		right: e.addRightPanel.bind(e),
		modal: e.addModalPanel.bind(e),
		header: e.addHeaderPanel.bind(e),
		footer: e.addFooterPanel.bind(e)
	}[t];
}
var l$1 = class {
	#e;
	#t = null;
	#n = state(proxy({}));
	#r;
	constructor(e, t = {}) {
		o$5(), this.#e = document.createElement(a$6), Object.assign(this.#n.v, t), this.#r = e, this.#i();
	}
	#i() {
		this.#t = mount(this.#r, {
			target: this.#e,
			props: get(this.#n)
		});
	}
	#a() {
		this.#t &&= (unmount(this.#t), null);
	}
	updateProps(e) {
		Object.assign(get(this.#n), e);
	}
	getElement() {
		return this.#e;
	}
	destroy() {
		this.#a(), this.#e.remove();
	}
	dispose() {
		this.destroy();
	}
};
function u$1(e, t = {}, n = {}) {
	let r = new l$1(e, t), i = n.type ?? "bottom", a = s$4(atom.workspace, i)({
		item: r,
		visible: n.visible !== !1,
		priority: n.priority ?? 100
	});
	return {
		panel: a,
		view: r,
		dispose() {
			a.destroy(), r.destroy();
		}
	};
}
function f$2(e, t, n = {}, r = {}) {
	let i = new l$1(t, n), a = r.position ?? "right", o = r.priority ?? 100, s = a === "left" ? e.addLeftTile({
		item: i.getElement(),
		priority: o
	}) : e.addRightTile({
		item: i.getElement(),
		priority: o
	});
	return {
		tile: s,
		view: i,
		dispose() {
			s.destroy(), i.destroy();
		}
	};
}

//#endregion
//#region node_modules/svelte/src/internal/disclose-version.js
if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");

//#endregion
//#region src/terminal-theme.ts
/**
* xterm paints its glyphs from `Terminal.options.theme` and never from
* inherited CSS, so no stylesheet can reach the output text — the defaults are
* a hardcoded white-on-black. `build.less` mirrors the relevant `ui-variables`
* onto `div.build` as custom properties; this reads them back off the live
* element and hands them to xterm, which keeps the terminal in step with the
* theme without duplicating a single colour here.
*/
function readColor(styles, property) {
	return styles.getPropertyValue(property).trim() || void 0;
}
/**
* Keeps `terminal` painted in the active theme's colours. `element` is any node
* inside `div.build`, since custom properties inherit.
*/
function observeTerminalTheme(terminal, element) {
	let stale = true;
	function apply() {
		if (!element.isConnected) return;
		const styles = getComputedStyle(element);
		const theme = {
			foreground: readColor(styles, "--buildium-terminal-foreground"),
			background: readColor(styles, "--buildium-terminal-background"),
			cursor: readColor(styles, "--buildium-terminal-cursor"),
			cursorAccent: readColor(styles, "--buildium-terminal-cursor-accent"),
			selectionBackground: readColor(styles, "--buildium-terminal-selection"),
			selectionForeground: readColor(styles, "--buildium-terminal-selection-foreground")
		};
		terminal.options.theme = theme;
		stale = false;
	}
	apply();
	const themes = atom.themes.onDidChangeActiveThemes(() => {
		stale = true;
		requestAnimationFrame(apply);
	});
	const observer = new ResizeObserver(() => {
		if (stale) apply();
	});
	observer.observe(element);
	return new atom$1.Disposable(() => {
		themes.dispose();
		observer.disconnect();
	});
}

//#endregion
//#region src/components/BuildPanel.svelte
BuildPanel[FILENAME] = "src/components/BuildPanel.svelte";
var root$4 = add_locations(from_html(`<div tabindex="-1" class="build tool-panel native-key-bindings"><div><div class="control-container"><button class="btn btn-default icon icon-zap" title="Builds current project">Build</button> <button class="btn btn-default icon icon-trashcan" title="Clears the output">Clear</button> <button class="btn btn-default icon icon-x" title="Closes the build panel">Close</button> <div><span class="build-timer"> </span></div></div> <div> </div></div> <div class="output panel-body"></div> <div class="resizer"></div></div>`), BuildPanel[FILENAME], [[
	162,
	0,
	[
		[
			163,
			2,
			[[
				164,
				4,
				[
					[165, 6],
					[166, 6],
					[167, 6],
					[
						168,
						6,
						[[169, 8]]
					]
				]
			], [172, 4]]
		],
		[175, 2],
		[178, 2]
	]
]]);
function BuildPanel($$anchor, $$props) {
	check_target(new.target);
	push($$props, true, BuildPanel);
	var $$ownership_validator = create_ownership_validator($$props);
	/** Height the terminal falls back to when it can't be measured, in pixels. */
	const DEFAULT_TERMINAL_HEIGHT = 150;
	let terminal = prop($$props, "terminal", 7);
	let rootEl = tag(state(void 0), "rootEl");
	let resizerEl = tag(state(void 0), "resizerEl");
	const fitAddon = new _xterm_addon_fit.FitAddon();
	/** `.output`, the terminal's container. Set by `mountTerminal`. */
	let outputEl;
	/** `div.xterm`, i.e. what xterm renders into. Only exists once opened. */
	let terminalEl;
	/**
	* Opens the terminal into `.output` and keeps it fitted for as long as that
	* node lives. `terminal` never changes identity, so this runs once.
	*/
	const mountTerminal = (element) => {
		outputEl = element;
		terminal().loadAddon(fitAddon);
		terminal().open(element);
		terminalEl = terminal().element;
		terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;
		const observer = new ResizeObserver(() => fit());
		observer.observe(element);
		const themeSubscription = observeTerminalTheme(terminal(), element);
		return () => {
			observer.disconnect();
			themeSubscription.dispose();
		};
	};
	user_effect(() => {
		$$ownership_validator.mutation("terminal", [
			"terminal",
			"options",
			"fontSize"
		], terminal().options.fontSize = $$props.fontSize, 58, 4);
		if ($$props.fontFamily) $$ownership_validator.mutation("terminal", [
			"terminal",
			"options",
			"fontFamily"
		], terminal().options.fontFamily = $$props.fontFamily, 61, 6);
		fit();
	});
	user_effect(() => applyOrientation($$props.orientation));
	/** Reflows the terminal to the size of its container. No-op while detached. */
	function fit() {
		try {
			fitAddon.fit();
		} catch {}
	}
	function applyOrientation(next) {
		if (!get(rootEl) || !terminalEl) return;
		switch (next) {
			case "Top":
			case "Bottom":
				get(rootEl).style.width = "";
				terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;
				break;
			case "Left":
			case "Right": terminalEl.style.height = "";
		}
		fit();
	}
	/** The panel may not grow past the editor it shares the window with. */
	function maxTerminalHeight() {
		return (document.querySelector(".item-views")?.getBoundingClientRect().height ?? 0) + (outputEl?.getBoundingClientRect().height ?? 0);
	}
	function resizeStarted() {
		document.body.style.setProperty("-webkit-user-select", "none");
		document.addEventListener("mousemove", resizeMoved);
		document.addEventListener("mouseup", resizeEnded);
	}
	function resizeMoved(event) {
		if (!get(rootEl) || !get(resizerEl) || !terminalEl) return;
		const resizerBox = get(resizerEl).getBoundingClientRect();
		switch ($$props.orientation) {
			case "Bottom":
			case "Top": {
				const delta = resizerBox.top - event.y;
				const height = terminalEl.getBoundingClientRect().height + (strict_equals($$props.orientation, "Bottom") ? delta : -delta);
				terminalEl.style.height = `${Math.max(0, Math.min(maxTerminalHeight(), height))}px`;
				break;
			}
			case "Left": {
				const delta = resizerBox.right - event.x;
				get(rootEl).style.width = `${get(rootEl).getBoundingClientRect().width - delta - resizerBox.width}px`;
				break;
			}
			case "Right": {
				const delta = resizerBox.left - event.x;
				get(rootEl).style.width = `${get(rootEl).getBoundingClientRect().width + delta}px`;
				break;
			}
		}
		fit();
	}
	function resizeEnded() {
		document.body.style.setProperty("-webkit-user-select", "text");
		document.removeEventListener("mousemove", resizeMoved);
		document.removeEventListener("mouseup", resizeEnded);
	}
	var $$exports = { ...legacy_api() };
	var div = root$4();
	let styles;
	var div_1 = child(div);
	let classes;
	var div_2 = child(div_1);
	var button = child(div_2);
	var button_1 = sibling(button, 2);
	var button_2 = sibling(button_1, 2);
	var div_3 = sibling(button_2, 2);
	let classes_1;
	var span = child(div_3);
	var text = child(span, true);
	reset(span);
	reset(div_3);
	reset(div_2);
	var div_4 = sibling(div_2, 2);
	let classes_2;
	var text_1 = child(div_4, true);
	reset(div_4);
	reset(div_1);
	var div_5 = sibling(div_1, 2);
	attach(div_5, () => mountTerminal);
	var div_6 = sibling(div_5, 2);
	bind_this(div_6, ($$value) => set(resizerEl, $$value), () => get(resizerEl));
	reset(div);
	bind_this(div, ($$value) => set(rootEl, $$value), () => get(rootEl));
	template_effect(() => {
		styles = set_style(div, "", styles, {
			"font-size": `${$$props.fontSize ?? ""}px`,
			"font-family": $$props.fontFamily || null
		});
		classes = set_class(div_1, 1, "heading", null, classes, {
			success: strict_equals($$props.outcome, "success"),
			error: strict_equals($$props.outcome, "error")
		});
		classes_1 = set_class(div_3, 1, "title", null, classes_1, {
			success: strict_equals($$props.outcome, "success"),
			error: strict_equals($$props.outcome, "error")
		});
		set_text(text, $$props.timer);
		classes_2 = set_class(div_4, 1, "icon heading-text text-highlight", null, classes_2, { "icon-stop": $$props.aborting });
		set_text(text_1, $$props.heading);
	});
	delegated("click", button, function(...$$args) {
		apply(() => $$props.onBuild, this, $$args, BuildPanel, [165, 92]);
	});
	delegated("click", button_1, function(...$$args) {
		apply(() => $$props.onClear, this, $$args, BuildPanel, [166, 92]);
	});
	delegated("click", button_2, function(...$$args) {
		apply(() => $$props.onClose, this, $$args, BuildPanel, [167, 90]);
	});
	delegated("mousedown", div_6, resizeStarted);
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click", "mousedown"]);

//#endregion
//#region src/config.ts
var config_default = {
	schema: {
		panelVisibility: {
			title: "Panel Visibility",
			description: "Set when the build panel should be visible.",
			type: "string",
			default: "Toggle",
			enum: [
				"Toggle",
				"Keep Visible",
				"Show on Error",
				"Hidden"
			],
			order: 1
		},
		buildOnSave: {
			title: "Automatically build on save",
			description: "Automatically build your project each time an editor is saved.",
			type: "boolean",
			default: false,
			order: 3
		},
		saveOnBuild: {
			title: "Automatically save on build",
			description: "Automatically save all edited files when triggering a build.",
			type: "boolean",
			default: false,
			order: 4
		},
		matchedErrorFailsBuild: {
			title: "Any matched error will fail the build",
			description: "Even if the build has a return code of zero it is marked as \"failed\" if any error is being matched in the output.",
			type: "boolean",
			default: true,
			order: 5
		},
		scrollOnError: {
			title: "Automatically scroll on build error",
			description: "Automatically scroll to first matched error when a build failed.",
			type: "boolean",
			default: false,
			order: 6
		},
		stealFocus: {
			title: "Steal Focus",
			description: "Steal focus when opening build panel.",
			type: "boolean",
			default: true,
			order: 7
		},
		selectTriggers: {
			title: "Selecting new target triggers the build",
			description: "When selecting a new target (through status-bar, cmd-alt-t, etc), the newly selected target will be triggered.",
			type: "boolean",
			default: true,
			order: 9
		},
		refreshOnShowTargetList: {
			title: "Refresh targets when the target list is shown",
			description: "When opening the targets menu, the targets will be refreshed.",
			type: "boolean",
			default: false,
			order: 10
		},
		notificationOnRefresh: {
			title: "Show notification when targets are refreshed",
			description: "When targets are refreshed a notification with information about the number of targets will be displayed.",
			type: "boolean",
			default: false,
			order: 11
		},
		beepWhenDone: {
			title: "Beep when the build completes",
			description: "Make a \"beep\" notification sound when the build is complete - in success or failure.",
			type: "boolean",
			default: false,
			order: 12
		},
		panelOrientation: {
			title: "Panel Orientation",
			description: "Where to attach the build panel",
			type: "string",
			default: "Bottom",
			enum: [
				"Bottom",
				"Top",
				"Left",
				"Right"
			],
			order: 13
		},
		statusBar: {
			title: "Status Bar",
			description: "Where to place the status bar. Set to `Disable` to disable status bar display.",
			type: "string",
			default: "Left",
			enum: [
				"Left",
				"Right",
				"Disable"
			],
			order: 14
		},
		statusBarPriority: {
			title: "Priority on Status Bar",
			description: "Lower priority tiles are placed further to the left/right, depends on where you choose to place Status Bar.",
			type: "integer",
			default: -1e3,
			order: 15
		},
		terminalScrollback: {
			title: "Terminal Scrollback Size",
			description: "Max number of lines of build log kept in the terminal",
			type: "integer",
			default: 1e3,
			order: 16
		}
	},
	get(key) {
		return atom.config.get(`${name}.${key}`);
	},
	getAll() {
		return atom.config.get(name);
	},
	set(key, value) {
		atom.config.set(`${name}.${key}`, value);
	},
	migrate(oldKey, newKey) {
		if (!atom.config.get(`${name}.${oldKey}`) || atom.config.get(`${name}.${newKey}`)) return;
		try {
			atom.config.set(`${name}.${newKey}`, atom.config.get(`${name}.${oldKey}`));
		} catch {
			atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);
			return;
		}
		atom.config.unset(`${name}.${oldKey}`);
	},
	observe(key, callback) {
		return atom.config.observe(`${name}.${key}`, callback);
	},
	unset(key = "") {
		const unsetKey = key.length ? `${name}.${key}` : name;
		atom.config.unset(unsetKey);
	},
	open(options = {}) {
		atom.workspace.open(`atom://config/packages/${name}`, {
			pending: true,
			searchAllPanes: true,
			...options
		});
	}
};

//#endregion
//#region src/xterm-styles.ts
/**
* xterm ships its stylesheet inside its own package, and Pulsar only loads CSS
* from this package's `styles/` directory — it cannot reach into
* `node_modules`. Reading the file off the installed copy at runtime keeps the
* CSS in lockstep with the `@xterm/xterm` version apm actually resolved, which
* is more than a vendored copy can promise.
*/
const nodeRequire = (0, node_module.createRequire)(require("url").pathToFileURL(__filename).href);
/** Adds `@xterm/xterm/css/xterm.css` to the workspace. Dispose to remove it. */
function addXtermStyleSheet() {
	const source = (0, node_fs.readFileSync)(nodeRequire.resolve("@xterm/xterm/css/xterm.css"), "utf8");
	return atom.styles.addStyleSheet(source, {
		sourcePath: "buildium/xterm.css",
		priority: 0
	});
}

//#endregion
//#region src/build-view.ts
/**
* Controller for the build panel.
*
* The markup, the resizer and the terminal's layout live in
* `BuildPanel.svelte`; this owns the panel's lifecycle, the config
* subscriptions and the `Terminal` instance that `buildium.ts` writes to. Every
* public method is one the orchestrator already called, so the switch away from
* `atom-space-pen-views` is invisible to it.
*
* The view is created once and outlives every attach/detach: only the `Panel`
* is destroyed when the panel is toggled or re-docked, so the terminal's
* scrollback survives exactly as it did before.
*/
var BuildView = class BuildView {
	terminal;
	view;
	styles;
	panel = null;
	starttime = /* @__PURE__ */ new Date();
	titleTimer = 0;
	outcome = "idle";
	static initialTimerText() {
		return "0.000 s";
	}
	static initialHeadingText() {
		return `${capitalizedName()} ${getVersion()}`;
	}
	constructor() {
		this.styles = addXtermStyleSheet();
		this.terminal = new _xterm_xterm.Terminal({
			cursorBlink: false,
			convertEol: true,
			scrollback: config_default.get("terminalScrollback")
		});
		this.view = new l$1(BuildPanel, {
			terminal: this.terminal,
			heading: BuildView.initialHeadingText(),
			timer: BuildView.initialTimerText(),
			outcome: "idle",
			aborting: false,
			orientation: config_default.get("panelOrientation") || "Bottom",
			fontSize: atom.config.get("editor.fontSize"),
			fontFamily: atom.config.get("editor.fontFamily") || "",
			onBuild: () => this.build(),
			onClear: () => this.clearOutput(),
			onClose: () => this.close()
		});
		config_default.observe("panelVisibility", this.visibleFromConfig.bind(this));
		config_default.observe("panelOrientation", this.orientationFromConfig.bind(this));
		atom.config.observe("editor.fontSize", this.fontSizeFromConfig.bind(this));
		atom.config.observe("editor.fontFamily", this.fontFamilyFromConfig.bind(this));
		atom.commands.add("atom-workspace", "buildium:toggle-panel", this.toggle.bind(this));
	}
	destroy() {
		this.detach(true);
		this.view.destroy();
		this.terminal.dispose();
		this.styles.dispose();
	}
	/** The component's root, i.e. `div.build` — not the `<svelte-view-container>` wrapper. */
	getPanelElement() {
		return this.view.getElement().querySelector(".build");
	}
	getContent() {
		const buffer = this.terminal.buffer.active;
		let content = "";
		for (let i = 0; i < buffer.length; i++) content += `${buffer.getLine(i)?.translateToString(true) ?? ""}\n`;
		return content;
	}
	attach(force = false) {
		if (!force) switch (config_default.get("panelVisibility")) {
			case "Hidden":
			case "Show on Error": return;
		}
		if (this.panel) this.panel.destroy();
		const addfn = {
			Top: atom.workspace.addTopPanel,
			Bottom: atom.workspace.addBottomPanel,
			Left: atom.workspace.addLeftPanel,
			Right: atom.workspace.addRightPanel
		};
		const orientation = config_default.get("panelOrientation") || "Bottom";
		this.panel = addfn[orientation].call(atom.workspace, { item: this.view });
	}
	detach(force = false) {
		const element = this.getPanelElement();
		if (atom.views.getView(atom.workspace) && element && document.activeElement === element) atom.views.getView(atom.workspace).focus();
		if (this.panel && (force || "Keep Visible" !== config_default.get("panelVisibility"))) {
			this.panel.destroy();
			this.panel = null;
		}
	}
	isAttached() {
		return Boolean(this.panel);
	}
	visibleFromConfig(val) {
		switch (val) {
			case "Toggle":
			case "Show on Error":
				this.detach();
				return;
		}
		this.attach();
	}
	orientationFromConfig(orientation) {
		const wasAttached = this.isAttached();
		this.detach(true);
		if (wasAttached) this.attach();
		this.view.updateProps({ orientation });
	}
	fontSizeFromConfig(size) {
		this.view.updateProps({ fontSize: size });
	}
	fontFamilyFromConfig(family) {
		this.view.updateProps({ fontFamily: family || "" });
	}
	reset() {
		clearTimeout(this.titleTimer);
		this.titleTimer = 0;
		this.outcome = "idle";
		this.terminal.reset();
		this.view.updateProps({
			timer: BuildView.initialTimerText(),
			outcome: "idle"
		});
		this.detach();
	}
	updateTitle() {
		this.view.updateProps({ timer: `${((Date.now() - this.starttime.getTime()) / 1e3).toFixed(3)} s` });
		this.titleTimer = setTimeout(this.updateTitle.bind(this), 100);
	}
	close() {
		this.detach(true);
	}
	toggle() {
		if (this.isAttached()) this.detach(true);
		else this.attach(true);
	}
	clearOutput() {
		this.terminal.reset();
	}
	build() {
		atom.commands.dispatch(atom.views.getView(atom.workspace), "buildium:trigger");
	}
	write(data) {
		this.terminal.write(data);
	}
	setHeading(heading) {
		this.view.updateProps({ heading });
	}
	buildStarted() {
		this.starttime = /* @__PURE__ */ new Date();
		this.reset();
		this.attach();
		if (config_default.get("stealFocus")) this.getPanelElement()?.focus();
		this.updateTitle();
	}
	buildFinished(success) {
		if (!success && !this.isAttached()) this.attach(config_default.get("panelVisibility") === "Show on Error");
		this.finalizeBuild(success);
	}
	buildAbortInitiated() {
		this.view.updateProps({ aborting: true });
	}
	buildAborted() {
		this.finalizeBuild(false);
	}
	finalizeBuild(success) {
		this.outcome = success ? "success" : "error";
		this.view.updateProps({
			outcome: this.outcome,
			aborting: false
		});
		clearTimeout(this.titleTimer);
	}
	scrollTo(text) {
		const content = this.getContent();
		let endPos = -1;
		let curPos = text.length;
		while (-1 === endPos && curPos > 0) endPos = content.indexOf(text.substring(0, curPos--));
		if (curPos === 0) return;
		const row = content.slice(0, endPos).split("\n").length;
		this.terminal.scrollToLine(row - 1);
	}
};

//#endregion
//#region src/log.ts
const styleSheet = `
  background-color: darkslateblue;
  border-radius: 2px;
  color: white;
  line-height: 1.5;
  padding: 1px 4px;
  text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
`;
function __console__(type, ...args) {
	if (!atom?.inDevMode()) return;
	args.unshift(`%c${name}%c`, styleSheet, "");
	window.console[type](...args);
}
var log_default = {
	debug(...data) {
		__console__("debug", ...data);
	},
	error(...data) {
		__console__("error", ...data);
	},
	info(...data) {
		__console__("info", ...data);
	},
	log(...data) {
		__console__("log", ...data);
	},
	trace(...data) {
		__console__("trace", ...data);
	},
	warn(...data) {
		__console__("warn", ...data);
	}
};

//#endregion
//#region src/error-matcher.ts
var ErrorMatcher = class extends events.EventEmitter {
	regex = null;
	functions = [];
	cwd = null;
	output = "";
	currentMatch = [];
	firstMatchId = null;
	constructor() {
		super();
		atom.commands.add("atom-workspace", "buildium:error-match", this.match.bind(this));
		atom.commands.add("atom-workspace", "buildium:error-match-first", this.matchFirst.bind(this));
	}
	_gotoNext() {
		const next = this.currentMatch[0];
		if (!next?.id) return;
		this.goto(next.id);
	}
	goto(id) {
		const match = this.currentMatch.find((m) => m.id === id);
		if (!match) {
			this.emit("error", `Can't find match with id ${id}`);
			return;
		}
		while (this.currentMatch[0] !== match) this.currentMatch.push(this.currentMatch.shift());
		this.currentMatch.push(this.currentMatch.shift());
		let file = match.file;
		if (!file) {
			this.emit("error", "Did not match any file. Don't know what to open.");
			return;
		}
		if (!path.default.isAbsolute(file)) file = this.cwd + path.default.sep + file;
		const row = match.line ? Number(match.line) - 1 : 0;
		const col = match.col ? Number(match.col) - 1 : 0;
		fs.default.access(file, fs.default.constants.F_OK, (err) => {
			if (err) {
				this.emit("error", `Matched file does not exist: ${file}`);
				return;
			}
			atom.workspace.open(file, {
				initialLine: row,
				initialColumn: col,
				searchAllPanes: true
			});
			this.emit("matched", match);
		});
	}
	_parse() {
		this.currentMatch = [];
		this.functions.forEach((f, functionIndex) => {
			this.currentMatch = this.currentMatch.concat(f(this.output).map((match, matchIndex) => {
				match.id = `error-match-function-${functionIndex}-${matchIndex}`;
				match.type = match.type || "Error";
				return match;
			}));
		});
		if (this.regex) Object.keys(this.regex).forEach((kind) => {
			this.regex?.[kind]?.forEach((regex, i) => {
				if (!regex) return;
				xregexp.default.forEach(this.output, regex, (rawMatch, matchIndex) => {
					this.currentMatch.push({
						...rawMatch,
						...rawMatch.groups,
						id: `error-match-${i}-${matchIndex}`,
						type: kind
					});
				});
			});
		});
		this.currentMatch.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
		this.firstMatchId = this.currentMatch.length > 0 ? this.currentMatch[0]?.id ?? null : null;
	}
	_prepareRegex(regex) {
		return (regex ? Array.isArray(regex) ? regex : [regex] : []).map((pattern) => {
			try {
				return (0, xregexp.default)(pattern);
			} catch (err) {
				this.emit("error", `Error parsing regex. ${err.message}`);
				return null;
			}
		});
	}
	set(target, cwd, output) {
		if (target.functionMatch) this.functions = (Array.isArray(target.functionMatch) ? target.functionMatch : [target.functionMatch]).filter((f) => {
			if (typeof f !== "function") {
				this.emit("error", `found functionMatch that is no function: ${typeof f}`);
				return false;
			}
			return true;
		});
		this.regex = {
			Error: this._prepareRegex(target.errorMatch),
			Warning: this._prepareRegex(target.warningMatch)
		};
		this.cwd = cwd;
		this.output = output;
		this.currentMatch = [];
		this._parse();
	}
	match() {
		this._gotoNext();
	}
	matchFirst() {
		if (this.firstMatchId) this.goto(this.firstMatchId);
	}
	hasMatch() {
		return 0 !== this.currentMatch.length;
	}
	getMatches() {
		return this.currentMatch;
	}
};

//#endregion
//#region src/linter-integration.ts
function extractRange(json) {
	return [[Number(json.line || 1) - 1, Number(json.col || 1) - 1], [Number(json.line_end || json.line || 1) - 1, Number(json.col_end || json.col || 1) - 1]];
}
function typeToSeverity(type) {
	switch (type?.toLowerCase()) {
		case "warn":
		case "warning": return "warning";
		case "info": return "info";
		default: return "error";
	}
}
/**
* Flattens an HTML message into plain text, since Linter v2 messages render
* Markdown rather than HTML.
*/
function stripHtml(html) {
	if (!html) return "";
	return html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function extractExcerpt(match, fallback) {
	return match.message || stripHtml(match.html_message) || fallback;
}
/**
* Linter v2 has no equivalent of the v1 `trace` field, so traces are folded
* into the parent message's Markdown description instead.
*/
function extractDescription(match, cwd) {
	const traces = (match.trace || []).map((trace) => {
		const excerpt = extractExcerpt(trace, "Trace in build");
		const [[line, col]] = extractRange(trace);
		return trace.file ? `- ${normalizePath(trace.file, cwd)}:${line + 1}:${col + 1} — ${excerpt}` : `- ${excerpt}`;
	});
	return traces.length ? `### Trace\n\n${traces.join("\n")}` : void 0;
}
function normalizePath(filePath, cwd) {
	return path.default.isAbsolute(filePath) ? filePath : path.default.join(cwd, filePath);
}
var Linter = class {
	linter;
	constructor(registerIndie) {
		this.linter = registerIndie({ name: "Buildium" });
	}
	destroy() {
		this.linter.dispose();
	}
	clear() {
		this.linter.clearMessages();
	}
	processMessages(messages, cwd) {
		this.linter.setAllMessages(messages.filter((match) => Boolean(match.file)).map((match) => ({
			severity: typeToSeverity(match.type),
			location: {
				file: normalizePath(match.file, cwd),
				position: extractRange(match)
			},
			excerpt: extractExcerpt(match, "Error from build"),
			description: extractDescription(match, cwd)
		})));
	}
};

//#endregion
//#region src/components/SaveConfirm.svelte
SaveConfirm[FILENAME] = "src/components/SaveConfirm.svelte";
var root$3 = add_locations(from_html(`<div class="build-confirm overlay from-top"><h3>You have unsaved changes</h3> <div class="btn-container pull-right"><button class="btn btn-primary" title="Save and Build">Save and build</button> <button class="btn btn-primary" title="Build without Saving">Build without Saving</button></div> <div class="btn-container pull-left"><button class="btn" title="Cancel">Cancel</button></div></div>`), SaveConfirm[FILENAME], [[
	12,
	0,
	[
		[13, 2],
		[
			14,
			2,
			[[18, 4], [19, 4]]
		],
		[
			21,
			2,
			[[22, 4]]
		]
	]
]]);
function SaveConfirm($$anchor, $$props) {
	check_target(new.target);
	push($$props, true, SaveConfirm);
	var $$exports = { ...legacy_api() };
	var div = root$3();
	var div_1 = sibling(child(div), 2);
	var button = child(div_1);
	autofocus(button, true);
	var button_1 = sibling(button, 2);
	reset(div_1);
	var div_2 = sibling(div_1, 2);
	var button_2 = child(div_2);
	reset(div_2);
	reset(div);
	delegated("click", button, function(...$$args) {
		apply(() => $$props.onSave, this, $$args, SaveConfirm, [18, 78]);
	});
	delegated("click", button_1, function(...$$args) {
		apply(() => $$props.onSkipSave, this, $$args, SaveConfirm, [19, 74]);
	});
	delegated("click", button_2, function(...$$args) {
		apply(() => $$props.onCancel, this, $$args, SaveConfirm, [22, 48]);
	});
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click"]);

//#endregion
//#region src/save-confirm-view.ts
/**
* Controller for the unsaved-changes overlay. Owns the panel; the markup and
* the button wiring live in `SaveConfirm.svelte`.
*/
var SaveConfirmView = class {
	view = null;
	confirmcb;
	cancelcb;
	panel = null;
	destroy() {
		this.confirmcb = void 0;
		this.cancelcb = void 0;
		if (this.panel) {
			this.panel.destroy();
			this.panel = null;
		}
		if (this.view) {
			this.view.destroy();
			this.view = null;
		}
	}
	show(confirmcb, cancelcb) {
		this.confirmcb = confirmcb;
		this.cancelcb = cancelcb;
		this.view = new l$1(SaveConfirm, {
			onSave: () => this.saveAndConfirm(),
			onSkipSave: () => this.confirmWithoutSave(),
			onCancel: () => this.cancel()
		});
		this.panel = atom.workspace.addTopPanel({ item: this.view });
		this.view.getElement().querySelector("[autofocus]")?.focus();
	}
	cancel() {
		const cancelcb = this.cancelcb;
		this.destroy();
		if (cancelcb) cancelcb();
	}
	saveAndConfirm() {
		this.confirmcb?.(true);
		this.destroy();
	}
	confirmWithoutSave() {
		this.confirmcb?.(false);
		this.destroy();
	}
};

//#endregion
//#region src/state.svelte.ts
const buildState = proxy({
	target: "",
	status: "idle"
});

//#endregion
//#region src/components/StatusTile.svelte
StatusTile[FILENAME] = "src/components/StatusTile.svelte";
var root$2 = add_locations(from_html(`<div id="build-status-bar"><a> </a></div>`), StatusTile[FILENAME], [[
	15,
	0,
	[[24, 2]]
]]);
function StatusTile($$anchor, $$props) {
	check_target(new.target);
	push($$props, true, StatusTile);
	var $$exports = { ...legacy_api() };
	var div = root$2();
	let classes;
	var a = child(div);
	var text = child(a, true);
	reset(a);
	reset(div);
	template_effect(() => {
		classes = set_class(div, 1, "inline-block", null, classes, {
			"status-success": strict_equals(buildState.status, "success"),
			"status-error": strict_equals(buildState.status, "error")
		});
		set_text(text, buildState.target || "No build target");
	});
	delegated("click", a, function(...$$args) {
		apply(() => $$props.onclick, this, $$args, StatusTile, [24, 6]);
	});
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click"]);

//#endregion
//#region src/status-bar-view.ts
/**
* Controller for the status bar tile. What the tile displays lives in
* `state.svelte.ts`, so re-creating the tile on a config change — which is what
* `attach()` does — never loses the current target or build status.
*/
var StatusBarView = class {
	statusBar;
	tile = null;
	tooltip = null;
	clickCallback;
	subscriptions = new atom$1.CompositeDisposable();
	constructor(statusBar) {
		this.statusBar = statusBar;
		let observing = false;
		const reattach = () => {
			if (observing) this.attach();
		};
		this.subscriptions.add(config_default.observe("statusBar", reattach), config_default.observe("statusBarPriority", reattach));
		observing = true;
		this.attach();
	}
	attach() {
		this.destroy();
		const orientation = config_default.get("statusBar");
		if ("Disable" === orientation) return;
		this.tile = f$2(this.statusBar, StatusTile, { onclick: () => this.clicked() }, {
			position: orientation === "Left" ? "left" : "right",
			priority: config_default.get("statusBarPriority")
		});
		const root = this.tile.view.getElement().querySelector("#build-status-bar");
		if (root) this.tooltip = atom.tooltips.add(root, { title: () => this.tooltipMessage() });
	}
	/** Tears down the tile only; `attach()` calls this to rebuild it. */
	destroy() {
		if (this.tile) {
			this.tile.dispose();
			this.tile = null;
		}
		if (this.tooltip) {
			this.tooltip.dispose();
			this.tooltip = null;
		}
	}
	/** Full teardown, including the config observers. For package deactivation. */
	dispose() {
		this.subscriptions.dispose();
		this.destroy();
	}
	tooltipMessage() {
		return `Current build target is '${buildState.target}'`;
	}
	setTarget(t) {
		if (buildState.target === t) return;
		buildState.target = t || "";
		buildState.status = "idle";
	}
	buildAborted() {
		this.setBuildSuccess(false);
	}
	setBuildSuccess(success) {
		buildState.status = success ? "success" : "error";
	}
	buildStarted() {
		buildState.status = "idle";
	}
	onClick(cb) {
		this.clickCallback = cb;
	}
	clicked() {
		this.clickCallback?.();
	}
};

//#endregion
//#region src/build-file-watcher.ts
/**
* One editor save is rarely one filesystem event: editors write to a temp file
* and rename it over the target, and some write the file and then touch its
* mtime. Collect everything that lands in this window and refresh once.
*/
const DEBOUNCE_MS = 200;
/** `os.homedir()` resolved once; it cannot change during a session. */
const homeDir = os.default.homedir();
/**
* The project root whose targets a changed file belongs to, or `undefined` if
* the file produces no targets.
*
* `onDidChangeFiles` fires for every change anywhere in the project, so the
* cheap basename test comes first. Only a build file sitting *at* a project root
* counts: that root is the `cwd` every provider is constructed with, so a nested
* `package.json` deeper in the tree produces no targets and would make this
* refresh for nothing.
*/
function rootFor(filePath) {
	if (!buildFileNames.includes(path.default.basename(filePath))) return;
	const parent = path.default.dirname(filePath);
	return atom.project.getPaths().find((projectPath) => projectPath === parent);
}
/**
* Refreshes build targets when a file that produces them changes.
*
* Two mechanisms, because they cover different ground:
*
* - **Project roots** go through `atom.project.onDidChangeFiles`, a single
*   native subscription that already exists for the whole window. It reports
*   creations and deletions too, so a build file added to a project that had
*   none is picked up — which the per-provider `fs.watch` this replaces could
*   never do, since it could only watch files that already existed.
* - **The home directory** is not covered by that: `onDidChangeFiles` only
*   watches open project paths. `~/.buildium.*` acts as a fallback for every
*   project (see `CustomFile.isEligible`), so those paths are polled with
*   `fs.watchFile`. Polling also sidesteps the Linux `fs.watch` quirk where
*   closing a watcher fires another callback.
*
* @param onChange Invoked with the project roots whose targets are now stale.
*/
function watchBuildFiles(onChange) {
	const subscriptions = new atom$1.CompositeDisposable();
	const pendingRoots = /* @__PURE__ */ new Set();
	let timer;
	function flush() {
		timer = void 0;
		const roots = [...pendingRoots];
		pendingRoots.clear();
		if (!roots.length) return;
		log_default.log("Build files changed, refreshing targets for", roots);
		onChange(roots);
	}
	function schedule(roots) {
		roots.forEach((root) => pendingRoots.add(root));
		if (timer) clearTimeout(timer);
		timer = setTimeout(flush, DEBOUNCE_MS);
	}
	subscriptions.add(atom.project.onDidChangeFiles((events) => {
		const roots = /* @__PURE__ */ new Set();
		events.forEach((event) => {
			const root = rootFor(event.path);
			if (root) roots.add(root);
			if (event.action === "renamed") {
				const oldRoot = rootFor(event.oldPath);
				if (oldRoot) roots.add(oldRoot);
			}
		});
		if (roots.size) schedule([...roots]);
	}));
	const homeWatchers = homeBuildFileNames.map((fileName) => {
		const filePath = path.default.join(homeDir, fileName);
		const listener = (current, previous) => {
			if (current.mtimeMs === previous.mtimeMs) return;
			schedule(atom.project.getPaths());
		};
		fs.default.watchFile(filePath, listener);
		return () => fs.default.unwatchFile(filePath, listener);
	});
	subscriptions.add(new atom$1.Disposable(() => {
		homeWatchers.forEach((unwatch) => unwatch());
	}));
	return new atom$1.Disposable(() => {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
		}
		pendingRoots.clear();
		subscriptions.dispose();
	});
}

//#endregion
//#region src/select-list/highlight.ts
/**
* Split `text` into segments based on which character indices are
* highlighted. Consecutive characters of the same kind are grouped.
*/
function buildHighlightSegments(text, indices) {
	if (!indices.length) return [{
		text,
		match: false
	}];
	const hits = new Set(indices);
	const segments = [];
	let current = "";
	let currentMatch = false;
	for (let i = 0; i < text.length; i++) {
		const ch = text.charAt(i);
		const isMatch = hits.has(i);
		if (i === 0) {
			currentMatch = isMatch;
			current = ch;
		} else if (isMatch === currentMatch) current += ch;
		else {
			segments.push({
				text: current,
				match: currentMatch
			});
			current = ch;
			currentMatch = isMatch;
		}
	}
	if (current) segments.push({
		text: current,
		match: currentMatch
	});
	return segments;
}

//#endregion
//#region src/select-list/components/HighlightText.svelte
HighlightText[FILENAME] = "src/select-list/components/HighlightText.svelte";
var root$1 = add_locations(from_html(`<span class="character-match"> </span>`), HighlightText[FILENAME], [[21, 38]]);
function HighlightText($$anchor, $$props) {
	check_target(new.target);
	push($$props, true, HighlightText);
	const segments = tag(user_derived(() => buildHighlightSegments($$props.text, $$props.indices)), "segments");
	var $$exports = { ...legacy_api() };
	var fragment = comment();
	var node = first_child(fragment);
	add_svelte_meta(() => each(node, 17, () => get(segments), index, ($$anchor, seg) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		var consequent = ($$anchor) => {
			var span = root$1();
			var text_1 = child(span, true);
			reset(span);
			template_effect(() => set_text(text_1, get(seg).text));
			append($$anchor, span);
		};
		var alternate = ($$anchor) => {
			var text_2 = text();
			template_effect(() => set_text(text_2, get(seg).text));
			append($$anchor, text_2);
		};
		add_svelte_meta(() => if_block(node_1, ($$render) => {
			if (get(seg).match) $$render(consequent);
			else $$render(alternate, -1);
		}), "if", HighlightText, 21, 23);
		append($$anchor, fragment_1);
	}), "each", HighlightText, 21, 0);
	append($$anchor, fragment);
	return pop($$exports);
}

//#endregion
//#region src/select-list/components/SelectList.svelte
SelectList[FILENAME] = "src/select-list/components/SelectList.svelte";
var root = add_locations(from_html(`<label class="input-label select-list-checkbox svelte-n23c1j" aria-hidden="true"><input type="checkbox" class="input-checkbox"/></label>`), SelectList[FILENAME], [[
	420,
	6,
	[[421, 8]]
]]);
var root_1 = add_locations(from_html(`<span class="select-list-icon svelte-n23c1j"> </span>`), SelectList[FILENAME], [[437, 10]]);
var root_2 = add_locations(from_html(`<span class="select-list-icon svelte-n23c1j"><!></span>`), SelectList[FILENAME], [[440, 10]]);
var root_3 = add_locations(from_html(`<div class="select-list-description svelte-n23c1j"> </div>`), SelectList[FILENAME], [[450, 10]]);
var root_4 = add_locations(from_html(`<!> <div class="select-list-item-content svelte-n23c1j"><span class="select-list-label svelte-n23c1j"><!></span> <!></div>`, 1), SelectList[FILENAME], [[
	444,
	6,
	[[445, 8]]
]]);
var root_5 = add_locations(from_html(`<li role="option"><!> <!></li>`), SelectList[FILENAME], [[407, 2]]);
var root_6 = add_locations(from_html(`<span class="error-message"> </span>`), SelectList[FILENAME], [[494, 4]]);
var root_7 = add_locations(from_html(`<li role="presentation" class="list-section-heading svelte-n23c1j"> </li> <!>`, 1), SelectList[FILENAME], [[513, 8]]);
var root_8 = add_locations(from_html(`<li role="presentation" class="list-section-heading svelte-n23c1j"> </li>`), SelectList[FILENAME], [[522, 10]]);
var root_9 = add_locations(from_html(`<!> <!>`, 1), SelectList[FILENAME], []);
var root_10 = add_locations(from_html(`<ol role="listbox"><!> <!></ol>`), SelectList[FILENAME], [[503, 4]]);
var root_11 = add_locations(from_html(`<span class="loading-badge svelte-n23c1j"> </span>`), SelectList[FILENAME], [[537, 10]]);
var root_12 = add_locations(from_html(` <!>`, 1), SelectList[FILENAME], []);
var root_13 = add_locations(from_html(`<span class="empty-message"><!></span>`), SelectList[FILENAME], [[533, 4]]);
var root_14 = add_locations(from_html(`<div role="dialog" aria-modal="true"><input type="text" class="editor mini native-key-bindings svelte-n23c1j" autocomplete="off" spellcheck="false" role="combobox" aria-haspopup="listbox" aria-autocomplete="list"/> <div role="status" aria-live="polite" aria-atomic="true" class="sr-only svelte-n23c1j"> </div> <!></div>`), SelectList[FILENAME], [[
	457,
	0,
	[[471, 2], [489, 2]]
]]);
const $$css = {
	hash: "svelte-n23c1j",
	code: "\n  .sr-only.svelte-n23c1j {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n\n  /* Upstream hard-codes `rgba(255, 255, 255, …)` here, which is a 6%-white box on\n     whatever the overlay background happens to be — invisible on a dark theme and\n     wrong on a light one. These read the active theme's values instead:\n     `@children-of-atom/rosetta`, applied via `applyStyles()` on activation,\n     imports the theme's `ui-variables` and re-declares each LESS variable as a\n     matching custom property on `:root`, which is the only way a compile-time\n     `@variable` can reach CSS that Svelte injects at runtime. The fallbacks\n     stay, and carry enough contrast either way, for names a given theme leaves\n     undefined. */\n  input.editor.svelte-n23c1j {\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n    margin-bottom: 5px;\n    padding: 5px 10px;\n    font-size: inherit;\n    font-family: inherit;\n    color: var(--text-color-highlight, var(--text-color, inherit));\n    background: var(--input-background-color, rgba(127, 127, 127, 0.16));\n    border: 1px solid var(--input-border-color, rgba(127, 127, 127, 0.5));\n    border-radius: 2px;\n    outline: none;\n  }\n\n  input.editor.svelte-n23c1j::placeholder {\n    color: var(--text-color-subtle, rgba(127, 127, 127, 0.9));\n  }\n\n  /* Themes route every focused input through one `.focus()` mixin — `outline:\n     none; border-color: @accent-color; box-shadow: 0 0 0 1px @accent-color` —\n     and `atom-text-editor[mini].is-focused` adds the focused input background on\n     top of it. Upstream's near-white `--text-color-highlight` ring is the one\n     thing here that does not look like the rest of the UI, so this restates the\n     mixin. The fallback is one-dark-ui's own `@accent-color`, deliberately not\n     `--background-color-info`, which carries `@accent-bg-color` — a darker blue\n     that reads as subtly wrong next to every other focused input. */\n  input.editor.svelte-n23c1j:focus {\n    border-color: var(--accent-color, #568af2);\n    box-shadow: 0 0 0 1px var(--accent-color, #568af2);\n    background: var(--input-background-color-focus, var(--input-background-color, rgba(127, 127, 127, 0.16)));\n  }\n\n  .list-section-heading.svelte-n23c1j {\n    padding: 2px 8px;\n    font-size: 0.8em;\n    font-weight: bold;\n    opacity: 0.5;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    cursor: default;\n    list-style: none;\n  }\n\n  .loading-badge.svelte-n23c1j {\n    display: inline-block;\n    margin-inline-start: 0.4em;\n    padding: 1px 6px;\n    border-radius: 10px;\n    background: var(--badge-background-color, rgba(127, 127, 127, 0.2));\n    font-variant-numeric: tabular-nums;\n    font-size: 0.85em;\n  }\n\n  .select-list-checkbox.svelte-n23c1j {\n    display: inline-flex;\n    align-items: center;\n    flex-shrink: 0;\n    margin-right: 0.4em;\n    cursor: pointer;\n  }\n\n  .select-list-item-content.svelte-n23c1j {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n  }\n\n  .select-list-icon.svelte-n23c1j {\n    display: inline-flex;\n    align-items: center;\n    margin-right: 0.7em;\n    font-size: 1.2em;\n    opacity: 0.85;\n  }\n\n  .select-list-label.svelte-n23c1j {\n    font-weight: 500;\n    line-height: 1.2;\n    display: block;\n  }\n\n  .select-list-description.svelte-n23c1j {\n    color: var(--text-color-subtle, #888);\n    font-size: 0.95em;\n    margin-top: 0.1em;\n    line-height: 1.3;\n  }\n\n  .select-list li[role='option'].svelte-n23c1j {\n    display: flex;\n    align-items: center;\n  }\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0TGlzdC5zdmVsdGUiLCJzb3VyY2VzIjpbIlNlbGVjdExpc3Quc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjwhLS1cbiAgVmVuZG9yZWQgZnJvbSBgQGNoaWxkcmVuLW9mLWF0b20vc2VsZWN0LWxpc3RgLCB3aGljaCBpcyBub3QgcHVibGlzaGVkIHRvIG5wbS5cbiAgVXBzdHJlYW06IGNoaWxkcmVuLW9mLWF0b20gQCA2ZGVlYjIwNGU4Y2JmNTY5ZGE5MTdhOTQ1ZmZhNjM1ZWYxYTIxNDI3LFxuICBgbGlicmFyaWVzL3NlbGVjdC1saXN0L3NyYy9jb21wb25lbnRzL1NlbGVjdExpc3Quc3ZlbHRlYC5cblxuICBEZWxpYmVyYXRlIGRpdmVyZ2VuY2VzIGZyb20gdXBzdHJlYW0sIGFsbCB3b3J0aCBzZW5kaW5nIGJhY2s6XG5cbiAgMS4gYGl0ZW1TbmlwcGV0YCBpcyBpbXBsZW1lbnRlZC4gVXBzdHJlYW0gZGVjbGFyZXMgaXQgaW4gYFNlbGVjdExpc3RPcHRpb25zYFxuICAgICBidXQgdGhlIGNvbXBvbmVudCBuZXZlciBhY2NlcHRlZCBpdCwgc28gdGhlcmUgd2FzIG5vIHdheSB0byByZW5kZXIgY3VzdG9tXG4gICAgIGl0ZW0gbWFya3VwIOKAlCB3aGljaCBpcyB3aGF0IHRoZSBidWlsZC10YXJnZXQgbGlzdCBuZWVkcy5cbiAgMi4gYGxpc3RDbGFzc05hbWVgIC8gYGl0ZW1DbGFzc2AgYWRkZWQsIHNvIGEgY29uc3VtZXIgY2FuIHB1dCBBdG9tJ3NcbiAgICAgYG1hcmstYWN0aXZlYCBvbiB0aGUgYDxvbD5gIGFuZCBgYWN0aXZlYCBvbiB0aGUgbWF0Y2hpbmcgYDxsaT5gLiBUaGVtZXMga2V5XG4gICAgIHRoZSBhY3RpdmUtaXRlbSBjaGVja21hcmsgb2ZmIGAubGlzdC1ncm91cC5tYXJrLWFjdGl2ZSA+IGxpLmFjdGl2ZWAsIGFuZFxuICAgICBib3RoIGNsYXNzZXMgaGF2ZSB0byBzaXQgb24gdGhvc2UgZXhhY3QgZWxlbWVudHMuXG4gIDMuIGBlbXB0eU1lc3NhZ2VgIC8gYG5vTWF0Y2hlc01lc3NhZ2VgIGFkZGVkLiBVcHN0cmVhbSBoYXJkLWNvZGVzIGJvdGggc3RyaW5nc1xuICAgICBhbmQgb25seSBsZXRzIGEgY29uc3VtZXIgcmVwbGFjZSB0aGUgd2hvbGUgZW1wdHkgc3RhdGUgdmlhIGBlbXB0eVNuaXBwZXRgLFxuICAgICB3aGljaCBpcyBtb3JlIHRoYW4gaXMgbmVlZGVkIHRvIHJld29yZCBhIHNlbnRlbmNlLlxuICA0LiBgaW5pdGlhbFNlbGVjdGVkS2V5YCBhZGRlZCwgc28gdGhlIGxpc3QgY2FuIG9wZW4gd2l0aCBhIHBhcnRpY3VsYXIgaXRlbVxuICAgICBwcmVzZWxlY3RlZCByYXRoZXIgdGhhbiBhbHdheXMgdGhlIGZpcnN0IG9uZS5cbiAgNS4gVGhlIHR3byBuZWFyLWlkZW50aWNhbCBgeyNlYWNofWAgYmxvY2tzIGFyZSBjb2xsYXBzZWQgaW50byBvbmUgYGxpc3RJdGVtYFxuICAgICBzbmlwcGV0LiBVcHN0cmVhbSdzIGNvcGllcyBoYWQgYWxyZWFkeSBkcmlmdGVkOiBvbmx5IHRoZSBmaXJzdCBvbmUgcmVuZGVyZWRcbiAgICAgY29tcG9uZW50IGljb25zLlxuICA2LiBMYWJlbHMgcmVuZGVyIHRocm91Z2ggYEhpZ2hsaWdodFRleHRgIGluc3RlYWQgb2YgYHtAaHRtbH1gLiBJdGVtIGxhYmVscyBhcmVcbiAgICAgYnVpbGQtdGFyZ2V0IG5hbWVzIHJlYWQgb3V0IG9mIHByb2plY3QgZmlsZXM7IGludGVycG9sYXRpbmcgdGhlbSBhcyBIVE1MIGlzXG4gICAgIGFuIGluamVjdGlvbiB0aGUgY29tcG9uZW50IGRvZXMgbm90IG5lZWQuXG4gIDcuIFRoZSBxdWVyeSBpbnB1dCBpcyB0aGVtZWQgb2ZmIHRoZSBjdXN0b20gcHJvcGVydGllcyB0aGF0XG4gICAgIGBAY2hpbGRyZW4tb2YtYXRvbS9yb3NldHRhYCBicmlkZ2VzIGZyb20gdGhlIGFjdGl2ZSB0aGVtZSdzIExFU1MgdmFyaWFibGVzLCBhbmRcbiAgICAgaXRzIGZvY3VzIHJpbmcgZm9sbG93cyB0aGUgYC5mb2N1cygpYCBtaXhpbiBldmVyeSB0aGVtZWQgaW5wdXQgZ29lcyB0aHJvdWdoLlxuICAgICBVcHN0cmVhbSdzIGhhcmQtY29kZWQgYHJnYmEoMjU1LCAyNTUsIDI1NSwg4oCmKWAgcmVuZGVycyBpdCBhbGwgYnV0IGludmlzaWJsZVxuICAgICBvbiBhIGRhcmsgdGhlbWUsIGFuZCBpdHMgbmVhci13aGl0ZSBmb2N1cyByaW5nIG1hdGNoZXMgbm90aGluZyBlbHNlIGluIHRoZVxuICAgICBVSSDigJQgc2VlIHRoZSBgaW5wdXQuZWRpdG9yYCBydWxlcyBiZWxvdy5cbiAgOC4gVGhlIGxpc3Qgc3VwcHJlc3NlcyBtb3VzZWRvd24ncyBkZWZhdWx0IGFjdGlvbi4gVXBzdHJlYW0ncyBpdGVtcyBjYXJyeVxuICAgICBgb25jbGlja2AgaGFuZGxlcnMgdGhhdCBjYW4gbmV2ZXIgcnVuOiB0aGUgbW91c2Vkb3duIGJsdXJzIHRoZSBxdWVyeSBpbnB1dCxcbiAgICAgdGhlIGNvbnRhaW5lcidzIGBvbmZvY3Vzb3V0YCBjbG9zZXMgdGhlIGxpc3QsIGFuZCB0aGUgY2xpY2sgaXMgZGlzcGF0Y2hlZFxuICAgICBpbnRvIGEgZGV0YWNoZWQgdHJlZS4gS2V5Ym9hcmQgdXNlIGhpZGVzIHRoaXMsIHNvIHVwc3RyZWFtIChhbmQgdGhlIGZ1enp5XG4gICAgIHBhY2thZ2UsIHdoaWNoIGNvcGllZCB0aGUgc2FtZSBoYW5kbGVyKSBpcyBtb3VzZS1kZWFkIHRvby5cbi0tPlxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHR5cGUgeyBDYXNlTWF0Y2hpbmcsIE1hdGNoUmVzdWx0V2l0aEluZGljZXMgfSBmcm9tICdudWNsZW8tbWF0Y2hlci13YXNtJztcbiAgaW1wb3J0IHsgdW50cmFjayB9IGZyb20gJ3N2ZWx0ZSc7XG4gIGltcG9ydCBIaWdobGlnaHRUZXh0IGZyb20gJy4vSGlnaGxpZ2h0VGV4dC5zdmVsdGUnO1xuICBpbXBvcnQgdHlwZSB7IEZpbHRlcmVkUmVzdWx0LCBQcm9wcywgU2VsZWN0TGlzdEl0ZW0gfSBmcm9tICcuL1NlbGVjdExpc3QudHlwZXMudHMnO1xuXG4gIGxldCB7XG4gICAgLy8gRGF0YVxuICAgIGl0ZW1zLFxuXG4gICAgLy8gUmVuZGVyaW5nXG4gICAgaXRlbVNuaXBwZXQsXG4gICAgZW1wdHlTbmlwcGV0LFxuXG4gICAgLy8gTGFiZWxzIC8gQVJJQVxuICAgIGxhYmVsLFxuICAgIGxpc3RMYWJlbCxcbiAgICBpbnB1dExhYmVsLFxuICAgIGlucHV0UGxhY2Vob2xkZXIgPSAnJyxcbiAgICBjbGFzc05hbWUgPSAnJyxcbiAgICBsaXN0Q2xhc3NOYW1lID0gJycsXG4gICAgaXRlbUNsYXNzLFxuXG4gICAgLy8gTWF0Y2hpbmdcbiAgICBOdWNsZW9NYXRjaGVyQ2xhc3MgPSBudWxsLFxuICAgIGNhc2VNYXRjaGluZyA9ICdzbWFydCcsXG4gICAgcHJlZmVyUHJlZml4ID0gZmFsc2UsXG4gICAgbWF0Y2hQYXRocyA9IGZhbHNlLFxuICAgIGZpbHRlclF1ZXJ5LFxuICAgIG1heFZpc2libGVSZXN1bHRzID0gNTAsXG5cbiAgICAvLyBSZWNlbnQgaXRlbXNcbiAgICByZWNlbnRLZXlzID0gW10sXG4gICAgaXRlbUtleSxcbiAgICBpbml0aWFsU2VsZWN0ZWRLZXksXG4gICAgcmVjZW50U2VjdGlvbkxhYmVsID0gJ1JlY2VudGx5IHVzZWQnLFxuICAgIGFsbFNlY3Rpb25MYWJlbCA9ICdBbGwgaXRlbXMnLFxuXG4gICAgLy8gTXVsdGktc2VsZWN0XG4gICAgbXVsdGlTZWxlY3QgPSBmYWxzZSxcblxuICAgIC8vIFN0YXRlIC8gbG9hZGluZ1xuICAgIGxvYWRpbmdNZXNzYWdlLFxuICAgIGxvYWRpbmdCYWRnZSxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgZW1wdHlNZXNzYWdlID0gJ05vIGl0ZW1zIGF2YWlsYWJsZScsXG4gICAgbm9NYXRjaGVzTWVzc2FnZSA9ICdObyBtYXRjaGluZyBpdGVtcycsXG4gICAgaXNMb2FkaW5nID0gZmFsc2UsXG4gICAgaXNCdXN5ID0gZmFsc2UsXG4gICAgc2hvd0NvdW50ID0gMCxcblxuICAgIC8vIEV4dHJhIGludGVncmF0aW9uXG4gICAgZXh0cmFDb21tYW5kcyxcblxuICAgIC8vIENhbGxiYWNrc1xuICAgIG9uQ2xvc2UsXG4gICAgb25Db25maXJtLFxuICAgIG9uQ29uZmlybU11bHRpcGxlLFxuICAgIG9uUXVlcnlDaGFuZ2VcbiAgfTogUHJvcHMgPSAkcHJvcHMoKTtcblxuICAvLyDilIDilIAgVW5pcXVlIElEIHByZWZpeCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBjb25zdCBpZCA9ICRwcm9wcy5pZCgpO1xuXG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkfS1saXN0YDtcblxuICBmdW5jdGlvbiBpdGVtSWQoaWR4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtpZH0taXRlbS0ke2lkeH1gO1xuICB9XG5cbiAgLy8g4pSA4pSAIFN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGxldCBxdWVyeSA9ICRzdGF0ZSgnJyk7XG4gIGxldCBzZWxlY3RlZEluZGV4ID0gJHN0YXRlKDApO1xuICBsZXQgY2hlY2tlZFNldCA9ICRzdGF0ZShuZXcgU2V0PHN0cmluZz4oKSk7XG4gIGxldCBtYXRjaGVyID0gJHN0YXRlPGltcG9ydCgnbnVjbGVvLW1hdGNoZXItd2FzbScpLk51Y2xlb01hdGNoZXIgfCBudWxsPihudWxsKTtcblxuICAvLyDilIDilIAgRWxlbWVudCByZWZzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGxldCBjb250YWluZXJFbCA9ICRzdGF0ZTxIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgbGV0IGlucHV0RWwgPSAkc3RhdGU8SFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgbGV0IGxpc3RFbCA9ICRzdGF0ZTxIVE1MT0xpc3RFbGVtZW50IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIC8vIOKUgOKUgCBLZXkgZXh0cmFjdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBnZXRJdGVtS2V5KGl0ZW06IFNlbGVjdExpc3RJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbUtleSA/IGl0ZW1LZXkoaXRlbSkgOiBpdGVtLmxhYmVsO1xuICB9XG5cbiAgLy8g4pSA4pSAIFJlYWN0aXZlIGVmZmVjdHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgLy8gUmVidWlsZCB0aGUgTnVjbGVvTWF0Y2hlciB3aGVuZXZlciB0aGUgaXRlbSBsaXN0IG9yIGNvbnN0cnVjdG9yLW9ubHkgb3B0aW9ucyBjaGFuZ2UuXG4gICRlZmZlY3QoKCkgPT4ge1xuICAgIGlmICghTnVjbGVvTWF0Y2hlckNsYXNzIHx8ICFpdGVtcy5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0IGxhYmVscyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5sYWJlbCk7XG4gICAgY29uc3QgbSA9IG5ldyBOdWNsZW9NYXRjaGVyQ2xhc3MobGFiZWxzLCB7IG1hdGNoUGF0aHMsIHByZWZlclByZWZpeCB9KTtcblxuICAgIG1hdGNoZXIgPSBtO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChtYXRjaGVyID09PSBtKSBtYXRjaGVyID0gbnVsbDtcbiAgICAgIG0uZnJlZSgpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIFdoZW4gdGhlIGxpc3QgaXMgc2hvd246IHJlc2V0IHF1ZXJ5L3NlbGVjdGlvbi9jaGVja3MgYW5kIGZvY3VzIGlucHV0LlxuICAkZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNob3dDb3VudCkgcmV0dXJuO1xuXG4gICAgcXVlcnkgPSAnJztcbiAgICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgICBjaGVja2VkU2V0ID0gbmV3IFNldCgpO1xuICAgIGlucHV0RWw/LmZvY3VzKCk7XG5cbiAgICB1bnRyYWNrKCgpID0+IGxpc3RFbD8uc2Nyb2xsVG8oMCwgMCkpO1xuICB9KTtcblxuICAvLyBSZXNldCBzZWxlY3Rpb24gdG8gdG9wIHdoZW5ldmVyIHRoZSBxdWVyeSBjaGFuZ2VzLiBSZWFkaW5nIGBxdWVyeWAgaXMgdGhlXG4gIC8vIGVudGlyZSBwb2ludCBvZiB0aGUgZWZmZWN0LCBzbyBpdCBpcyBwYXNzZWQgaW4gcmF0aGVyIHRoYW4gbWVyZWx5IG1lbnRpb25lZC5cbiAgJGVmZmVjdCgoKSA9PiByZXNldFNlbGVjdGlvbihxdWVyeSkpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0U2VsZWN0aW9uKF9xdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cblxuICAvLyBOb3RpZnkgY29uc3VtZXIgb2YgcXVlcnkgY2hhbmdlcy5cbiAgJGVmZmVjdCgoKSA9PiB7XG4gICAgb25RdWVyeUNoYW5nZT8uKHF1ZXJ5KTtcbiAgfSk7XG5cbiAgLy8gUmVnaXN0ZXIgQXRvbSBjb3JlIG5hdmlnYXRpb24gY29tbWFuZHMgb24gdGhlIGNvbnRhaW5lci5cbiAgJGVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFjb250YWluZXJFbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY29tbWFuZHM6IFJlY29yZDxzdHJpbmcsIChlOiBFdmVudCkgPT4gdm9pZD4gPSB7XG4gICAgICAnY29yZTptb3ZlLXVwJzogKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZWN0UHJldmlvdXMoKTtcbiAgICAgIH0sXG4gICAgICAnY29yZTptb3ZlLWRvd24nOiAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBzZWxlY3ROZXh0KCk7XG4gICAgICB9LFxuICAgICAgJ2NvcmU6bW92ZS10by10b3AnOiAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgc2Nyb2xsU2VsZWN0ZWRJbnRvVmlldygpO1xuICAgICAgfSxcbiAgICAgICdjb3JlOm1vdmUtdG8tYm90dG9tJzogKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZWN0ZWRJbmRleCA9IE1hdGgubWF4KDAsIGFsbFJlc3VsdHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIHNjcm9sbFNlbGVjdGVkSW50b1ZpZXcoKTtcbiAgICAgIH0sXG4gICAgICAnY29yZTpjb25maXJtJzogKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uZmlybVNlbGVjdGVkKCk7XG4gICAgICB9LFxuICAgICAgJ2NvcmU6Y2FuY2VsJzogKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgb25DbG9zZT8uKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChleHRyYUNvbW1hbmRzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbW1hbmRzLCBleHRyYUNvbW1hbmRzKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXNwb3NhYmxlID0gYXRvbS5jb21tYW5kcy5hZGQoY29udGFpbmVyRWwsIGNvbW1hbmRzKTtcblxuICAgIHJldHVybiAoKSA9PiBkaXNwb3NhYmxlLmRpc3Bvc2UoKTtcbiAgfSk7XG5cbiAgLy8g4pSA4pSAIERlcml2ZWQgdmFsdWVzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4gIGNvbnN0IGVmZmVjdGl2ZVF1ZXJ5ID0gJGRlcml2ZWQoZmlsdGVyUXVlcnkgPyBmaWx0ZXJRdWVyeShxdWVyeSkgOiBxdWVyeSk7XG5cbiAgY29uc3QgaXRlbUJ5TGFiZWwgPSAkZGVyaXZlZChuZXcgTWFwKGl0ZW1zLm1hcCgoaXRlbSkgPT4gW2l0ZW0ubGFiZWwsIGl0ZW1dKSkpO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVzdWx0cyA9ICRkZXJpdmVkLmJ5PEZpbHRlcmVkUmVzdWx0PFNlbGVjdExpc3RJdGVtPltdPigoKSA9PiB7XG4gICAgaWYgKCFlZmZlY3RpdmVRdWVyeS50cmltKCkpIHtcbiAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7IGl0ZW0sIGluZGljZXM6IFtdIH0pKTtcbiAgICB9XG5cbiAgICBpZiAobWF0Y2hlcikge1xuICAgICAgY29uc3QgcmF3ID0gbWF0Y2hlci5tYXRjaExpdGVyYWxJbmRpY2VzKGVmZmVjdGl2ZVF1ZXJ5LCBudWxsLCB7XG4gICAgICAgIGNhc2VNYXRjaGluZzogY2FzZU1hdGNoaW5nIGFzIENhc2VNYXRjaGluZyxcbiAgICAgICAgbm9ybWFsaXphdGlvbjogdW5kZWZpbmVkXG4gICAgICB9KSBhcyBNYXRjaFJlc3VsdFdpdGhJbmRpY2VzW107XG5cbiAgICAgIHJldHVybiByYXcuZmxhdE1hcCgoW21hdGNoZWRMYWJlbCwgLCBpbmRpY2VzXSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gaXRlbUJ5TGFiZWwuZ2V0KG1hdGNoZWRMYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW0gPyBbeyBpdGVtLCBpbmRpY2VzIH1dIDogW107XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjazogc2ltcGxlIHN1YnN0cmluZyBtYXRjaCBiZWZvcmUgbWF0Y2hlciBpcyByZWFkeS5cbiAgICBjb25zdCBxID0gZWZmZWN0aXZlUXVlcnkudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSkubWFwKChpdGVtKSA9PiAoeyBpdGVtLCBpbmRpY2VzOiBbXSB9KSk7XG4gIH0pO1xuXG4gIGNvbnN0IHJlY2VudEtleVNldCA9ICRkZXJpdmVkKG5ldyBTZXQocmVjZW50S2V5cykpO1xuXG4gIGNvbnN0IHJlY2VudFJlc3VsdHMgPSAkZGVyaXZlZC5ieSgoKSA9PiB7XG4gICAgaWYgKGVmZmVjdGl2ZVF1ZXJ5LnRyaW0oKSkgcmV0dXJuIFtdO1xuXG4gICAgcmV0dXJuIHJlY2VudEtleXNcbiAgICAgIC5maWx0ZXIoKGtleSkgPT4gZmlsdGVyZWRSZXN1bHRzLnNvbWUoKHIpID0+IGdldEl0ZW1LZXkoci5pdGVtKSA9PT0ga2V5KSlcbiAgICAgIC5tYXAoKGtleSkgPT4gZmlsdGVyZWRSZXN1bHRzLmZpbmQoKHIpID0+IGdldEl0ZW1LZXkoci5pdGVtKSA9PT0ga2V5KSEpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuICB9KTtcblxuICBjb25zdCByZW1haW5pbmdSZXN1bHRzID0gJGRlcml2ZWQuYnkoKCkgPT4ge1xuICAgIGNvbnN0IGNhcCA9IE1hdGgubWF4KDAsIG1heFZpc2libGVSZXN1bHRzIC0gcmVjZW50UmVzdWx0cy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0cy5maWx0ZXIoKHIpID0+ICFyZWNlbnRLZXlTZXQuaGFzKGdldEl0ZW1LZXkoci5pdGVtKSkpLnNsaWNlKDAsIGNhcCk7XG4gIH0pO1xuXG4gIGNvbnN0IGFsbFJlc3VsdHMgPSAkZGVyaXZlZChbLi4ucmVjZW50UmVzdWx0cywgLi4ucmVtYWluaW5nUmVzdWx0c10pO1xuXG4gIGNvbnN0IGVmZmVjdGl2ZUluZGV4ID0gJGRlcml2ZWQoYWxsUmVzdWx0cy5sZW5ndGggPiAwID8gTWF0aC5taW4oc2VsZWN0ZWRJbmRleCwgYWxsUmVzdWx0cy5sZW5ndGggLSAxKSA6IDApO1xuXG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSAkZGVyaXZlZC5ieSgoKTogc3RyaW5nID0+IHtcbiAgICBpZiAoaXNMb2FkaW5nICYmIGxvYWRpbmdNZXNzYWdlKSByZXR1cm4gbG9hZGluZ01lc3NhZ2U7XG5cbiAgICBpZiAoYWxsUmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYCR7YWxsUmVzdWx0cy5sZW5ndGh9ICR7YWxsUmVzdWx0cy5sZW5ndGggPT09IDEgPyAnaXRlbScgOiAnaXRlbXMnfSBhdmFpbGFibGVgO1xuICAgIH1cblxuICAgIGlmIChlZmZlY3RpdmVRdWVyeS50cmltKCkpIHJldHVybiBub01hdGNoZXNNZXNzYWdlO1xuXG4gICAgcmV0dXJuICcnO1xuICB9KTtcblxuICAvLyBPcGVuIHdpdGggYGluaXRpYWxTZWxlY3RlZEtleWAgaGlnaGxpZ2h0ZWQuIEl0ZW1zIHVzdWFsbHkgYXJyaXZlIGFmdGVyIHRoZVxuICAvLyBsaXN0IGlzIGFscmVhZHkgb24gc2NyZWVuLCBzbyB0aGlzIGNhbm5vdCBsaXZlIGluIHRoZSBgc2hvd0NvdW50YCBlZmZlY3Qg4oCUXG4gIC8vIGl0IHJlYWN0cyB0byB0aGUgcmVzdWx0cyBpbnN0ZWFkLCBhbmQgYmFja3Mgb2ZmIGFzIHNvb24gYXMgdGhlIHVzZXIgaGFzXG4gIC8vIG1vdmVkIHRoZSBzZWxlY3Rpb24gb3IgdHlwZWQgYW55dGhpbmcuXG4gICRlZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGluaXRpYWxTZWxlY3RlZEtleTtcbiAgICBjb25zdCByZXN1bHRzID0gYWxsUmVzdWx0cztcblxuICAgIGlmICgha2V5IHx8ICFyZXN1bHRzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgdW50cmFjaygoKSA9PiB7XG4gICAgICBpZiAocXVlcnkgIT09ICcnIHx8IHNlbGVjdGVkSW5kZXggIT09IDApIHJldHVybjtcblxuICAgICAgY29uc3QgaWR4ID0gcmVzdWx0cy5maW5kSW5kZXgoKHIpID0+IGdldEl0ZW1LZXkoci5pdGVtKSA9PT0ga2V5KTtcblxuICAgICAgaWYgKGlkeCA+IDApIHtcbiAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGlkeDtcbiAgICAgICAgc2Nyb2xsU2VsZWN0ZWRJbnRvVmlldygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvLyDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuICBmdW5jdGlvbiBjb25maXJtSXRlbShpdGVtOiBTZWxlY3RMaXN0SXRlbSk6IHZvaWQge1xuICAgIGlmIChtdWx0aVNlbGVjdCkge1xuICAgICAgY29uc3QgY2hlY2tlZCA9IEFycmF5LmZyb20oY2hlY2tlZFNldClcbiAgICAgICAgLm1hcCgoa2V5KSA9PiBpdGVtcy5maW5kKChpKSA9PiBnZXRJdGVtS2V5KGkpID09PSBrZXkpKVxuICAgICAgICAuZmlsdGVyKChpKTogaSBpcyBTZWxlY3RMaXN0SXRlbSA9PiBpICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICBvbkNvbmZpcm1NdWx0aXBsZT8uKGNoZWNrZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkNvbmZpcm0/LihpdGVtKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb25maXJtU2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gYWxsUmVzdWx0c1tlZmZlY3RpdmVJbmRleF07XG5cbiAgICBpZiAocmVzdWx0KSBjb25maXJtSXRlbShyZXN1bHQuaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVDaGVja2VkKGl0ZW06IFNlbGVjdExpc3RJdGVtKTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZ2V0SXRlbUtleShpdGVtKTtcbiAgICBjb25zdCBuZXh0ID0gbmV3IFNldChjaGVja2VkU2V0KTtcblxuICAgIGlmIChuZXh0LmhhcyhrZXkpKSB7XG4gICAgICBuZXh0LmRlbGV0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0LmFkZChrZXkpO1xuICAgIH1cblxuICAgIGNoZWNrZWRTZXQgPSBuZXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0TmV4dCgpOiB2b2lkIHtcbiAgICBpZiAoIWFsbFJlc3VsdHMubGVuZ3RoKSByZXR1cm47XG5cbiAgICBzZWxlY3RlZEluZGV4ID0gKHNlbGVjdGVkSW5kZXggKyAxKSAlIGFsbFJlc3VsdHMubGVuZ3RoO1xuICAgIHNjcm9sbFNlbGVjdGVkSW50b1ZpZXcoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFByZXZpb3VzKCk6IHZvaWQge1xuICAgIGlmICghYWxsUmVzdWx0cy5sZW5ndGgpIHJldHVybjtcblxuICAgIHNlbGVjdGVkSW5kZXggPSAoc2VsZWN0ZWRJbmRleCAtIDEgKyBhbGxSZXN1bHRzLmxlbmd0aCkgJSBhbGxSZXN1bHRzLmxlbmd0aDtcbiAgICBzY3JvbGxTZWxlY3RlZEludG9WaWV3KCk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxTZWxlY3RlZEludG9WaWV3KCk6IHZvaWQge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBsaXN0RWw/LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXScpPy5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGVjdE5leHQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxlY3RQcmV2aW91cygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25maXJtU2VsZWN0ZWQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uQ2xvc2U/LigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBzY3JvbGxTZWxlY3RlZEludG9WaWV3KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdFbmQnOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxlY3RlZEluZGV4ID0gTWF0aC5tYXgoMCwgYWxsUmVzdWx0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgc2Nyb2xsU2VsZWN0ZWRJbnRvVmlldygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnICc6XG4gICAgICAgIGlmIChtdWx0aVNlbGVjdCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYWxsUmVzdWx0c1tlZmZlY3RpdmVJbmRleF07XG4gICAgICAgICAgaWYgKHJlc3VsdCkgdG9nZ2xlQ2hlY2tlZChyZXN1bHQuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSXRlbUNsaWNrKGl0ZW06IFNlbGVjdExpc3RJdGVtKTogdm9pZCB7XG4gICAgaWYgKG11bHRpU2VsZWN0KSB7XG4gICAgICB0b2dnbGVDaGVja2VkKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maXJtSXRlbShpdGVtKTtcbiAgICB9XG4gIH1cbjwvc2NyaXB0PlxuXG57I3NuaXBwZXQgbGlzdEl0ZW0ocmVzdWx0OiBGaWx0ZXJlZFJlc3VsdDxTZWxlY3RMaXN0SXRlbT4sIGlkeDogbnVtYmVyKX1cbiAge0Bjb25zdCBpc0NoZWNrZWQgPSBtdWx0aVNlbGVjdCAmJiBjaGVja2VkU2V0LmhhcyhnZXRJdGVtS2V5KHJlc3VsdC5pdGVtKSl9XG5cbiAgPCEtLSBzdmVsdGUtaWdub3JlIGExMXlfY2xpY2tfZXZlbnRzX2hhdmVfa2V5X2V2ZW50cyAtLT5cbiAgPGxpXG4gICAgaWQ9e2l0ZW1JZChpZHgpfVxuICAgIGNsYXNzPVwidHdvLWxpbmVzIHtpdGVtQ2xhc3M/LihyZXN1bHQuaXRlbSkgPz8gJyd9XCJcbiAgICBjbGFzczpzZWxlY3RlZD17aWR4ID09PSBlZmZlY3RpdmVJbmRleH1cbiAgICByb2xlPVwib3B0aW9uXCJcbiAgICBhcmlhLXNlbGVjdGVkPXtpZHggPT09IGVmZmVjdGl2ZUluZGV4fVxuICAgIGFyaWEtY2hlY2tlZD17bXVsdGlTZWxlY3QgPyBpc0NoZWNrZWQgOiB1bmRlZmluZWR9XG4gICAgb25jbGljaz17KCkgPT4gaGFuZGxlSXRlbUNsaWNrKHJlc3VsdC5pdGVtKX1cbiAgICBvbm1vdXNlZW50ZXI9eygpID0+IHtcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBpZHg7XG4gICAgfX1cbiAgPlxuICAgIHsjaWYgbXVsdGlTZWxlY3R9XG4gICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbCBzZWxlY3QtbGlzdC1jaGVja2JveFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e2lzQ2hlY2tlZH1cbiAgICAgICAgICB0YWJpbmRleD17LTF9XG4gICAgICAgICAgb25jaGFuZ2U9eygpID0+IHRvZ2dsZUNoZWNrZWQocmVzdWx0Lml0ZW0pfVxuICAgICAgICAgIG9uY2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAvPlxuICAgICAgPC9sYWJlbD5cbiAgICB7L2lmfVxuXG4gICAgeyNpZiBpdGVtU25pcHBldH1cbiAgICAgIHtAcmVuZGVyIGl0ZW1TbmlwcGV0KHJlc3VsdC5pdGVtLCByZXN1bHQuaW5kaWNlcywgaXNDaGVja2VkKX1cbiAgICB7OmVsc2V9XG4gICAgICB7I2lmIHJlc3VsdC5pdGVtLmljb259XG4gICAgICAgIHsjaWYgdHlwZW9mIHJlc3VsdC5pdGVtLmljb24gPT09ICdzdHJpbmcnfVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0LWxpc3QtaWNvblwiPntyZXN1bHQuaXRlbS5pY29ufTwvc3Bhbj5cbiAgICAgICAgezplbHNlfVxuICAgICAgICAgIHtAY29uc3QgSWNvbiA9IHJlc3VsdC5pdGVtLmljb259XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QtbGlzdC1pY29uXCI+PEljb24gLz48L3NwYW4+XG4gICAgICAgIHsvaWZ9XG4gICAgICB7L2lmfVxuXG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LWxpc3QtaXRlbS1jb250ZW50XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0LWxpc3QtbGFiZWxcIj5cbiAgICAgICAgICA8SGlnaGxpZ2h0VGV4dCB0ZXh0PXtyZXN1bHQuaXRlbS5sYWJlbH0gaW5kaWNlcz17cmVzdWx0LmluZGljZXN9IC8+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICB7I2lmIHJlc3VsdC5pdGVtLmRlc2NyaXB0aW9ufVxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QtbGlzdC1kZXNjcmlwdGlvblwiPntyZXN1bHQuaXRlbS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgey9pZn1cbiAgICAgIDwvZGl2PlxuICAgIHsvaWZ9XG4gIDwvbGk+XG57L3NuaXBwZXR9XG5cbjxkaXZcbiAgYmluZDp0aGlzPXtjb250YWluZXJFbH1cbiAgY2xhc3M9XCJzZWxlY3QtbGlzdCB7Y2xhc3NOYW1lfVwiXG4gIHJvbGU9XCJkaWFsb2dcIlxuICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgYXJpYS1tb2RhbD1cInRydWVcIlxuICBhcmlhLWJ1c3k9e2lzQnVzeSB8fCBpc0xvYWRpbmd9XG4gIG9uZm9jdXNvdXQ9eyhlKSA9PiB7XG4gICAgaWYgKGNvbnRhaW5lckVsPy5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQgYXMgTm9kZSB8IG51bGwpKSByZXR1cm47XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5oYXNGb2N1cygpICYmICFjb250YWluZXJFbD8uY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIG9uQ2xvc2U/LigpO1xuICAgIH0pO1xuICB9fVxuPlxuICA8aW5wdXRcbiAgICBiaW5kOnRoaXM9e2lucHV0RWx9XG4gICAgYmluZDp2YWx1ZT17cXVlcnl9XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzPVwiZWRpdG9yIG1pbmkgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgcGxhY2Vob2xkZXI9e2lucHV0UGxhY2Vob2xkZXJ9XG4gICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICBzcGVsbGNoZWNrPVwiZmFsc2VcIlxuICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIlxuICAgIGFyaWEtZXhwYW5kZWQ9e2FsbFJlc3VsdHMubGVuZ3RoID4gMH1cbiAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthbGxSZXN1bHRzLmxlbmd0aCA+IDAgPyBpdGVtSWQoZWZmZWN0aXZlSW5kZXgpIDogdW5kZWZpbmVkfVxuICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXG4gICAgYXJpYS1sYWJlbD17aW5wdXRMYWJlbH1cbiAgICBvbmtleWRvd249e2hhbmRsZUtleWRvd259XG4gIC8+XG5cbiAgPGRpdiByb2xlPVwic3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIgY2xhc3M9XCJzci1vbmx5XCI+XG4gICAge3N0YXR1c01lc3NhZ2V9XG4gIDwvZGl2PlxuXG4gIHsjaWYgZXJyb3JNZXNzYWdlfVxuICAgIDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPntlcnJvck1lc3NhZ2V9PC9zcGFuPlxuICB7OmVsc2UgaWYgYWxsUmVzdWx0cy5sZW5ndGggPiAwfVxuICAgIDwhLS0gTm90aGluZyBpbiB0aGUgbGlzdCBpcyBmb2N1c2FibGUsIHNvIHByZXNzaW5nIHRoZSBtb3VzZSBvbiBhbiBpdGVtIG1vdmVzXG4gICAgICAgICBmb2N1cyB0byBgPGJvZHk+YCBhbmQgdGhlIGNvbnRhaW5lcidzIGBvbmZvY3Vzb3V0YCBjbG9zZXMgdGhlIGxpc3Qg4oCUIGFcbiAgICAgICAgIGZyYW1lIGJlZm9yZSBgY2xpY2tgIHdvdWxkIGhhdmUgZmlyZWQsIGFuZCBvbiBhbiBlbGVtZW50IHRoYXQgbm8gbG9uZ2VyXG4gICAgICAgICBleGlzdHMuIFN1cHByZXNzaW5nIG1vdXNlZG93bidzIGRlZmF1bHQga2VlcHMgZm9jdXMgaW4gdGhlIHF1ZXJ5IGlucHV0LFxuICAgICAgICAgc28gdGhlIGNsaWNrIGxhbmRzLiBUaGUgY2hlY2tib3gncyBvd24gYWN0aXZhdGlvbiBoYXBwZW5zIG9uIGBjbGlja2AgYW5kXG4gICAgICAgICBpcyB1bmFmZmVjdGVkLiAtLT5cbiAgICA8IS0tIHN2ZWx0ZS1pZ25vcmUgYTExeV9ub19ub25pbnRlcmFjdGl2ZV9lbGVtZW50X2ludGVyYWN0aW9ucyAtLT5cbiAgICA8b2xcbiAgICAgIGJpbmQ6dGhpcz17bGlzdEVsfVxuICAgICAgaWQ9e2xpc3RJZH1cbiAgICAgIGNsYXNzPVwibGlzdC1ncm91cCB7bGlzdENsYXNzTmFtZX1cIlxuICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgYXJpYS1sYWJlbD17bGlzdExhYmVsfVxuICAgICAgYXJpYS1tdWx0aXNlbGVjdGFibGU9e211bHRpU2VsZWN0ID8gdHJ1ZSA6IHVuZGVmaW5lZH1cbiAgICAgIG9ubW91c2Vkb3duPXsoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxuICAgID5cbiAgICAgIHsjaWYgcmVjZW50UmVzdWx0cy5sZW5ndGggPiAwfVxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibGlzdC1zZWN0aW9uLWhlYWRpbmdcIj57cmVjZW50U2VjdGlvbkxhYmVsfTwvbGk+XG5cbiAgICAgICAgeyNlYWNoIHJlY2VudFJlc3VsdHMgYXMgcmVzdWx0LCBpIChnZXRJdGVtS2V5KHJlc3VsdC5pdGVtKSl9XG4gICAgICAgICAge0ByZW5kZXIgbGlzdEl0ZW0ocmVzdWx0LCBpKX1cbiAgICAgICAgey9lYWNofVxuICAgICAgey9pZn1cblxuICAgICAgeyNpZiByZW1haW5pbmdSZXN1bHRzLmxlbmd0aCA+IDB9XG4gICAgICAgIHsjaWYgcmVjZW50UmVzdWx0cy5sZW5ndGggPiAwfVxuICAgICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJsaXN0LXNlY3Rpb24taGVhZGluZ1wiPnthbGxTZWN0aW9uTGFiZWx9PC9saT5cbiAgICAgICAgey9pZn1cblxuICAgICAgICB7I2VhY2ggcmVtYWluaW5nUmVzdWx0cyBhcyByZXN1bHQsIGkgKGdldEl0ZW1LZXkocmVzdWx0Lml0ZW0pKX1cbiAgICAgICAgICB7QHJlbmRlciBsaXN0SXRlbShyZXN1bHQsIHJlY2VudFJlc3VsdHMubGVuZ3RoICsgaSl9XG4gICAgICAgIHsvZWFjaH1cbiAgICAgIHsvaWZ9XG4gICAgPC9vbD5cbiAgezplbHNlIGlmIGVtcHR5U25pcHBldH1cbiAgICB7QHJlbmRlciBlbXB0eVNuaXBwZXQocXVlcnkpfVxuICB7OmVsc2V9XG4gICAgPHNwYW4gY2xhc3M9XCJlbXB0eS1tZXNzYWdlXCI+XG4gICAgICB7I2lmIGlzTG9hZGluZyAmJiBsb2FkaW5nTWVzc2FnZX1cbiAgICAgICAge2xvYWRpbmdNZXNzYWdlfVxuICAgICAgICB7I2lmIGxvYWRpbmdCYWRnZSAhPSBudWxsfVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibG9hZGluZy1iYWRnZVwiPntsb2FkaW5nQmFkZ2V9PC9zcGFuPlxuICAgICAgICB7L2lmfVxuICAgICAgezplbHNlIGlmIGVmZmVjdGl2ZVF1ZXJ5LnRyaW0oKX1cbiAgICAgICAge25vTWF0Y2hlc01lc3NhZ2V9XG4gICAgICB7OmVsc2V9XG4gICAgICAgIHtlbXB0eU1lc3NhZ2V9XG4gICAgICB7L2lmfVxuICAgIDwvc3Bhbj5cbiAgey9pZn1cbjwvZGl2PlxuXG48c3R5bGU+XG4gIC5zci1vbmx5IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogLTFweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGNsaXA6IHJlY3QoMCwgMCwgMCwgMCk7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBib3JkZXI6IDA7XG4gIH1cblxuICAvKiBVcHN0cmVhbSBoYXJkLWNvZGVzIGByZ2JhKDI1NSwgMjU1LCAyNTUsIOKApilgIGhlcmUsIHdoaWNoIGlzIGEgNiUtd2hpdGUgYm94IG9uXG4gICAgIHdoYXRldmVyIHRoZSBvdmVybGF5IGJhY2tncm91bmQgaGFwcGVucyB0byBiZSDigJQgaW52aXNpYmxlIG9uIGEgZGFyayB0aGVtZSBhbmRcbiAgICAgd3Jvbmcgb24gYSBsaWdodCBvbmUuIFRoZXNlIHJlYWQgdGhlIGFjdGl2ZSB0aGVtZSdzIHZhbHVlcyBpbnN0ZWFkOlxuICAgICBgQGNoaWxkcmVuLW9mLWF0b20vcm9zZXR0YWAsIGFwcGxpZWQgdmlhIGBhcHBseVN0eWxlcygpYCBvbiBhY3RpdmF0aW9uLFxuICAgICBpbXBvcnRzIHRoZSB0aGVtZSdzIGB1aS12YXJpYWJsZXNgIGFuZCByZS1kZWNsYXJlcyBlYWNoIExFU1MgdmFyaWFibGUgYXMgYVxuICAgICBtYXRjaGluZyBjdXN0b20gcHJvcGVydHkgb24gYDpyb290YCwgd2hpY2ggaXMgdGhlIG9ubHkgd2F5IGEgY29tcGlsZS10aW1lXG4gICAgIGBAdmFyaWFibGVgIGNhbiByZWFjaCBDU1MgdGhhdCBTdmVsdGUgaW5qZWN0cyBhdCBydW50aW1lLiBUaGUgZmFsbGJhY2tzXG4gICAgIHN0YXksIGFuZCBjYXJyeSBlbm91Z2ggY29udHJhc3QgZWl0aGVyIHdheSwgZm9yIG5hbWVzIGEgZ2l2ZW4gdGhlbWUgbGVhdmVzXG4gICAgIHVuZGVmaW5lZC4gKi9cbiAgaW5wdXQuZWRpdG9yIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgY29sb3I6IHZhcigtLXRleHQtY29sb3ItaGlnaGxpZ2h0LCB2YXIoLS10ZXh0LWNvbG9yLCBpbmhlcml0KSk7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW5wdXQtYmFja2dyb3VuZC1jb2xvciwgcmdiYSgxMjcsIDEyNywgMTI3LCAwLjE2KSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW5wdXQtYm9yZGVyLWNvbG9yLCByZ2JhKDEyNywgMTI3LCAxMjcsIDAuNSkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgaW5wdXQuZWRpdG9yOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtY29sb3Itc3VidGxlLCByZ2JhKDEyNywgMTI3LCAxMjcsIDAuOSkpO1xuICB9XG5cbiAgLyogVGhlbWVzIHJvdXRlIGV2ZXJ5IGZvY3VzZWQgaW5wdXQgdGhyb3VnaCBvbmUgYC5mb2N1cygpYCBtaXhpbiDigJQgYG91dGxpbmU6XG4gICAgIG5vbmU7IGJvcmRlci1jb2xvcjogQGFjY2VudC1jb2xvcjsgYm94LXNoYWRvdzogMCAwIDAgMXB4IEBhY2NlbnQtY29sb3JgIOKAlFxuICAgICBhbmQgYGF0b20tdGV4dC1lZGl0b3JbbWluaV0uaXMtZm9jdXNlZGAgYWRkcyB0aGUgZm9jdXNlZCBpbnB1dCBiYWNrZ3JvdW5kIG9uXG4gICAgIHRvcCBvZiBpdC4gVXBzdHJlYW0ncyBuZWFyLXdoaXRlIGAtLXRleHQtY29sb3ItaGlnaGxpZ2h0YCByaW5nIGlzIHRoZSBvbmVcbiAgICAgdGhpbmcgaGVyZSB0aGF0IGRvZXMgbm90IGxvb2sgbGlrZSB0aGUgcmVzdCBvZiB0aGUgVUksIHNvIHRoaXMgcmVzdGF0ZXMgdGhlXG4gICAgIG1peGluLiBUaGUgZmFsbGJhY2sgaXMgb25lLWRhcmstdWkncyBvd24gYEBhY2NlbnQtY29sb3JgLCBkZWxpYmVyYXRlbHkgbm90XG4gICAgIGAtLWJhY2tncm91bmQtY29sb3ItaW5mb2AsIHdoaWNoIGNhcnJpZXMgYEBhY2NlbnQtYmctY29sb3JgIOKAlCBhIGRhcmtlciBibHVlXG4gICAgIHRoYXQgcmVhZHMgYXMgc3VidGx5IHdyb25nIG5leHQgdG8gZXZlcnkgb3RoZXIgZm9jdXNlZCBpbnB1dC4gKi9cbiAgaW5wdXQuZWRpdG9yOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudC1jb2xvciwgIzU2OGFmMik7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLWFjY2VudC1jb2xvciwgIzU2OGFmMik7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW5wdXQtYmFja2dyb3VuZC1jb2xvci1mb2N1cywgdmFyKC0taW5wdXQtYmFja2dyb3VuZC1jb2xvciwgcmdiYSgxMjcsIDEyNywgMTI3LCAwLjE2KSkpO1xuICB9XG5cbiAgLmxpc3Qtc2VjdGlvbi1oZWFkaW5nIHtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgb3BhY2l0eTogMC41O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgfVxuXG4gIC5sb2FkaW5nLWJhZGdlIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMC40ZW07XG4gICAgcGFkZGluZzogMXB4IDZweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhZGdlLWJhY2tncm91bmQtY29sb3IsIHJnYmEoMTI3LCAxMjcsIDEyNywgMC4yKSk7XG4gICAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcbiAgICBmb250LXNpemU6IDAuODVlbTtcbiAgfVxuXG4gIC5zZWxlY3QtbGlzdC1jaGVja2JveCB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNGVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5zZWxlY3QtbGlzdC1pdGVtLWNvbnRlbnQge1xuICAgIGZsZXg6IDE7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIC5zZWxlY3QtbGlzdC1pY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1yaWdodDogMC43ZW07XG4gICAgZm9udC1zaXplOiAxLjJlbTtcbiAgICBvcGFjaXR5OiAwLjg1O1xuICB9XG5cbiAgLnNlbGVjdC1saXN0LWxhYmVsIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuICAuc2VsZWN0LWxpc3QtZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yLXN1YnRsZSwgIzg4OCk7XG4gICAgZm9udC1zaXplOiAwLjk1ZW07XG4gICAgbWFyZ2luLXRvcDogMC4xZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgfVxuXG4gIDpnbG9iYWwoLnNlbGVjdC1saXN0KSBsaVtyb2xlPSdvcHRpb24nXSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFvaUJBLEVBQUUsc0JBQVEsQ0FBQztBQUNYLElBQUksa0JBQWtCO0FBQ3RCLElBQUksVUFBVTtBQUNkLElBQUksV0FBVztBQUNmLElBQUksVUFBVTtBQUNkLElBQUksWUFBWTtBQUNoQixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLHNCQUFzQjtBQUMxQixJQUFJLG1CQUFtQjtBQUN2QixJQUFJLFNBQVM7QUFDYjs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBSyxxQkFBTyxDQUFDO0FBQ2YsSUFBSSxjQUFjO0FBQ2xCLElBQUksV0FBVztBQUNmLElBQUksc0JBQXNCO0FBQzFCLElBQUksa0JBQWtCO0FBQ3RCLElBQUksaUJBQWlCO0FBQ3JCLElBQUksa0JBQWtCO0FBQ3RCLElBQUksb0JBQW9CO0FBQ3hCLElBQUksOERBQThEO0FBQ2xFLElBQUksb0VBQW9FO0FBQ3hFLElBQUkscUVBQXFFO0FBQ3pFLElBQUksa0JBQWtCO0FBQ3RCLElBQUksYUFBYTtBQUNqQjs7QUFFQSxFQUFFLEtBQUsscUJBQU8sYUFBYSxDQUFDO0FBQzVCLElBQUkseURBQXlEO0FBQzdEOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBSyxxQkFBTyxNQUFNLENBQUM7QUFDckIsSUFBSSwwQ0FBMEM7QUFDOUMsSUFBSSxrREFBa0Q7QUFDdEQsSUFBSSx5R0FBeUc7QUFDN0c7O0FBRUEsRUFBRSxtQ0FBcUIsQ0FBQztBQUN4QixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLGlCQUFpQjtBQUNyQixJQUFJLFlBQVk7QUFDaEIsSUFBSSx5QkFBeUI7QUFDN0IsSUFBSSxzQkFBc0I7QUFDMUIsSUFBSSxlQUFlO0FBQ25CLElBQUksZ0JBQWdCO0FBQ3BCOztBQUVBLEVBQUUsNEJBQWMsQ0FBQztBQUNqQixJQUFJLHFCQUFxQjtBQUN6QixJQUFJLDBCQUEwQjtBQUM5QixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLG1CQUFtQjtBQUN2QixJQUFJLG1FQUFtRTtBQUN2RSxJQUFJLGtDQUFrQztBQUN0QyxJQUFJLGlCQUFpQjtBQUNyQjs7QUFFQSxFQUFFLG1DQUFxQixDQUFDO0FBQ3hCLElBQUksb0JBQW9CO0FBQ3hCLElBQUksbUJBQW1CO0FBQ3ZCLElBQUksY0FBYztBQUNsQixJQUFJLG1CQUFtQjtBQUN2QixJQUFJLGVBQWU7QUFDbkI7O0FBRUEsRUFBRSx1Q0FBeUIsQ0FBQztBQUM1QixJQUFJLE9BQU87QUFDWCxJQUFJLFlBQVk7QUFDaEIsSUFBSSxhQUFhO0FBQ2pCLElBQUksc0JBQXNCO0FBQzFCLElBQUksdUJBQXVCO0FBQzNCOztBQUVBLEVBQUUsK0JBQWlCLENBQUM7QUFDcEIsSUFBSSxvQkFBb0I7QUFDeEIsSUFBSSxtQkFBbUI7QUFDdkIsSUFBSSxtQkFBbUI7QUFDdkIsSUFBSSxnQkFBZ0I7QUFDcEIsSUFBSSxhQUFhO0FBQ2pCOztBQUVBLEVBQUUsZ0NBQWtCLENBQUM7QUFDckIsSUFBSSxnQkFBZ0I7QUFDcEIsSUFBSSxnQkFBZ0I7QUFDcEIsSUFBSSxjQUFjO0FBQ2xCOztBQUVBLEVBQUUsc0NBQXdCLENBQUM7QUFDM0IsSUFBSSxxQ0FBcUM7QUFDekMsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxnQkFBZ0I7QUFDcEI7O0FBRUEsRUFBVSxZQUFhLENBQUMsRUFBRSw2QkFBZSxDQUFDO0FBQzFDLElBQUksYUFBYTtBQUNqQixJQUFJLG1CQUFtQjtBQUN2QjsifQ== */"
};
function SelectList($$anchor, $$props) {
	const id = props_id();
	check_target(new.target);
	push($$props, true, SelectList);
	append_styles$1($$anchor, $$css);
	const listItem = wrap_snippet(SelectList, function($$anchor, result = noop, idx = noop) {
		validate_snippet_args(...arguments);
		const isChecked = tag(user_derived(() => multiSelect() && get(checkedSet).has(getItemKey(result().item))), "isChecked");
		get(isChecked);
		var li = root_5();
		let classes;
		var node = child(li);
		var consequent = ($$anchor) => {
			var label_1 = root();
			var input = child(label_1);
			remove_input_defaults(input);
			set_attribute(input, "tabindex", -1);
			reset(label_1);
			template_effect(() => set_checked(input, get(isChecked)));
			delegated("change", input, function change() {
				return toggleChecked(result().item);
			});
			delegated("click", input, function click_1(e) {
				return e.stopPropagation();
			});
			append($$anchor, label_1);
		};
		add_svelte_meta(() => if_block(node, ($$render) => {
			if (multiSelect()) $$render(consequent);
		}), "if", SelectList, 419, 4);
		var node_1 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			var fragment = comment();
			var node_2 = first_child(fragment);
			add_svelte_meta(() => snippet(node_2, () => $$props.itemSnippet, () => result().item, () => result().indices, () => get(isChecked)), "render", SelectList, 433, 6);
			append($$anchor, fragment);
		};
		var alternate_1 = ($$anchor) => {
			var fragment_1 = root_4();
			var node_3 = first_child(fragment_1);
			var consequent_3 = ($$anchor) => {
				var fragment_2 = comment();
				var node_4 = first_child(fragment_2);
				var consequent_2 = ($$anchor) => {
					var span = root_1();
					var text = child(span, true);
					reset(span);
					template_effect(() => set_text(text, result().item.icon));
					append($$anchor, span);
				};
				var alternate = ($$anchor) => {
					const Icon = tag(user_derived(() => result().item.icon), "Icon");
					get(Icon);
					var span_1 = root_2();
					var node_5 = child(span_1);
					add_svelte_meta(() => component(node_5, () => get(Icon), ($$anchor, Icon_1) => {
						Icon_1($$anchor, {});
					}), "component", SelectList, 440, 41, { componentTag: "Icon" });
					reset(span_1);
					append($$anchor, span_1);
				};
				add_svelte_meta(() => if_block(node_4, ($$render) => {
					if (strict_equals(typeof result().item.icon, "string")) $$render(consequent_2);
					else $$render(alternate, -1);
				}), "if", SelectList, 436, 8);
				append($$anchor, fragment_2);
			};
			add_svelte_meta(() => if_block(node_3, ($$render) => {
				if (result().item.icon) $$render(consequent_3);
			}), "if", SelectList, 435, 6);
			var div = sibling(node_3, 2);
			var span_2 = child(div);
			var node_6 = child(span_2);
			add_svelte_meta(() => HighlightText(node_6, {
				get text() {
					return result().item.label;
				},
				get indices() {
					return result().indices;
				}
			}), "component", SelectList, 446, 10, { componentTag: "HighlightText" });
			reset(span_2);
			var node_7 = sibling(span_2, 2);
			var consequent_4 = ($$anchor) => {
				var div_1 = root_3();
				var text_1 = child(div_1, true);
				reset(div_1);
				template_effect(() => set_text(text_1, result().item.description));
				append($$anchor, div_1);
			};
			add_svelte_meta(() => if_block(node_7, ($$render) => {
				if (result().item.description) $$render(consequent_4);
			}), "if", SelectList, 449, 8);
			reset(div);
			append($$anchor, fragment_1);
		};
		add_svelte_meta(() => if_block(node_1, ($$render) => {
			if ($$props.itemSnippet) $$render(consequent_1);
			else $$render(alternate_1, -1);
		}), "if", SelectList, 432, 4);
		reset(li);
		template_effect(($0, $1) => {
			set_attribute(li, "id", $0);
			classes = set_class(li, 1, `two-lines ${$1 ?? ""}`, "svelte-n23c1j", classes, { selected: strict_equals(idx(), get(effectiveIndex)) });
			set_attribute(li, "aria-selected", strict_equals(idx(), get(effectiveIndex)));
			set_attribute(li, "aria-checked", multiSelect() ? get(isChecked) : void 0);
		}, [() => itemId(idx()), () => $$props.itemClass?.(result().item) ?? ""]);
		delegated("click", li, function click() {
			return handleItemClick(result().item);
		});
		event("mouseenter", li, function mouseenter() {
			set(selectedIndex, idx(), true);
		});
		append($$anchor, li);
	});
	let inputPlaceholder = prop($$props, "inputPlaceholder", 3, ""), className = prop($$props, "className", 3, ""), listClassName = prop($$props, "listClassName", 3, ""), NucleoMatcherClass = prop($$props, "NucleoMatcherClass", 3, null), caseMatching = prop($$props, "caseMatching", 3, "smart"), preferPrefix = prop($$props, "preferPrefix", 3, false), matchPaths = prop($$props, "matchPaths", 3, false), maxVisibleResults = prop($$props, "maxVisibleResults", 3, 50), recentKeys = prop($$props, "recentKeys", 19, () => []), recentSectionLabel = prop($$props, "recentSectionLabel", 3, "Recently used"), allSectionLabel = prop($$props, "allSectionLabel", 3, "All items"), multiSelect = prop($$props, "multiSelect", 3, false), emptyMessage = prop($$props, "emptyMessage", 3, "No items available"), noMatchesMessage = prop($$props, "noMatchesMessage", 3, "No matching items"), isLoading = prop($$props, "isLoading", 3, false), isBusy = prop($$props, "isBusy", 3, false), showCount = prop($$props, "showCount", 3, 0);
	const listId = `${id}-list`;
	function itemId(idx) {
		return `${id}-item-${idx}`;
	}
	let query = tag(state(""), "query");
	let selectedIndex = tag(state(0), "selectedIndex");
	let checkedSet = tag(state(proxy(/* @__PURE__ */ new Set())), "checkedSet");
	let matcher = tag(state(null), "matcher");
	let containerEl = tag(state(void 0), "containerEl");
	let inputEl = tag(state(void 0), "inputEl");
	let listEl = tag(state(void 0), "listEl");
	function getItemKey(item) {
		return $$props.itemKey ? $$props.itemKey(item) : item.label;
	}
	user_effect(() => {
		if (!NucleoMatcherClass() || !$$props.items.length) return;
		const labels = $$props.items.map((item) => item.label);
		const m = new (NucleoMatcherClass())(labels, {
			matchPaths: matchPaths(),
			preferPrefix: preferPrefix()
		});
		set(matcher, m, true);
		return () => {
			if (strict_equals(get(matcher), m)) set(matcher, null);
			m.free();
		};
	});
	user_effect(() => {
		if (!showCount()) return;
		set(query, "");
		set(selectedIndex, 0);
		set(checkedSet, /* @__PURE__ */ new Set(), true);
		get(inputEl)?.focus();
		untrack(() => get(listEl)?.scrollTo(0, 0));
	});
	user_effect(() => resetSelection(get(query)));
	function resetSelection(_query) {
		set(selectedIndex, 0);
	}
	user_effect(() => {
		$$props.onQueryChange?.(get(query));
	});
	user_effect(() => {
		if (!get(containerEl)) return;
		const commands = {
			"core:move-up": (e) => {
				e.stopPropagation();
				selectPrevious();
			},
			"core:move-down": (e) => {
				e.stopPropagation();
				selectNext();
			},
			"core:move-to-top": (e) => {
				e.stopPropagation();
				set(selectedIndex, 0);
				scrollSelectedIntoView();
			},
			"core:move-to-bottom": (e) => {
				e.stopPropagation();
				set(selectedIndex, Math.max(0, get(allResults).length - 1), true);
				scrollSelectedIntoView();
			},
			"core:confirm": (e) => {
				e.stopPropagation();
				confirmSelected();
			},
			"core:cancel": (e) => {
				e.stopPropagation();
				$$props.onClose?.();
			}
		};
		if ($$props.extraCommands) Object.assign(commands, $$props.extraCommands);
		const disposable = atom.commands.add(get(containerEl), commands);
		return () => disposable.dispose();
	});
	const effectiveQuery = tag(user_derived(() => $$props.filterQuery ? $$props.filterQuery(get(query)) : get(query)), "effectiveQuery");
	const itemByLabel = tag(user_derived(() => new Map($$props.items.map((item) => [item.label, item]))), "itemByLabel");
	const filteredResults = tag(user_derived(() => {
		if (!get(effectiveQuery).trim()) return $$props.items.map((item) => ({
			item,
			indices: []
		}));
		if (get(matcher)) return get(matcher).matchLiteralIndices(get(effectiveQuery), null, {
			caseMatching: caseMatching(),
			normalization: void 0
		}).flatMap(([matchedLabel, , indices]) => {
			const item = get(itemByLabel).get(matchedLabel);
			return item ? [{
				item,
				indices
			}] : [];
		});
		const q = get(effectiveQuery).toLowerCase();
		return $$props.items.filter((item) => item.label.toLowerCase().includes(q)).map((item) => ({
			item,
			indices: []
		}));
	}), "filteredResults");
	const recentKeySet = tag(user_derived(() => new Set(recentKeys())), "recentKeySet");
	const recentResults = tag(user_derived(() => {
		if (get(effectiveQuery).trim()) return [];
		return recentKeys().filter((key) => get(filteredResults).some((r) => strict_equals(getItemKey(r.item), key))).map((key) => get(filteredResults).find((r) => strict_equals(getItemKey(r.item), key))).filter(Boolean);
	}), "recentResults");
	const remainingResults = tag(user_derived(() => {
		const cap = Math.max(0, maxVisibleResults() - get(recentResults).length);
		return get(filteredResults).filter((r) => !get(recentKeySet).has(getItemKey(r.item))).slice(0, cap);
	}), "remainingResults");
	const allResults = tag(user_derived(() => [...get(recentResults), ...get(remainingResults)]), "allResults");
	const effectiveIndex = tag(user_derived(() => get(allResults).length > 0 ? Math.min(get(selectedIndex), get(allResults).length - 1) : 0), "effectiveIndex");
	const statusMessage = tag(user_derived(() => {
		if (isLoading() && $$props.loadingMessage) return $$props.loadingMessage;
		if (get(allResults).length > 0) return `${get(allResults).length} ${strict_equals(get(allResults).length, 1) ? "item" : "items"} available`;
		if (get(effectiveQuery).trim()) return noMatchesMessage();
		return "";
	}), "statusMessage");
	user_effect(() => {
		const key = $$props.initialSelectedKey;
		const results = get(allResults);
		if (!key || !results.length) return;
		untrack(() => {
			if (strict_equals(get(query), "", false) || strict_equals(get(selectedIndex), 0, false)) return;
			const idx = results.findIndex((r) => strict_equals(getItemKey(r.item), key));
			if (idx > 0) {
				set(selectedIndex, idx, true);
				scrollSelectedIntoView();
			}
		});
	});
	function confirmItem(item) {
		if (multiSelect()) {
			const checked = Array.from(get(checkedSet)).map((key) => $$props.items.find((i) => strict_equals(getItemKey(i), key))).filter((i) => strict_equals(i, void 0, false));
			$$props.onConfirmMultiple?.(checked);
		} else $$props.onConfirm?.(item);
	}
	function confirmSelected() {
		const result = get(allResults)[get(effectiveIndex)];
		if (result) confirmItem(result.item);
	}
	function toggleChecked(item) {
		const key = getItemKey(item);
		const next = new Set(get(checkedSet));
		if (next.has(key)) next.delete(key);
		else next.add(key);
		set(checkedSet, next, true);
	}
	function selectNext() {
		if (!get(allResults).length) return;
		set(selectedIndex, (get(selectedIndex) + 1) % get(allResults).length);
		scrollSelectedIntoView();
	}
	function selectPrevious() {
		if (!get(allResults).length) return;
		set(selectedIndex, (get(selectedIndex) - 1 + get(allResults).length) % get(allResults).length);
		scrollSelectedIntoView();
	}
	function scrollSelectedIntoView() {
		requestAnimationFrame(() => {
			get(listEl)?.querySelector("[aria-selected=\"true\"]")?.scrollIntoView({ block: "nearest" });
		});
	}
	function handleKeydown(event) {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				selectNext();
				break;
			case "ArrowUp":
				event.preventDefault();
				selectPrevious();
				break;
			case "Enter":
				event.preventDefault();
				confirmSelected();
				break;
			case "Escape":
				event.preventDefault();
				$$props.onClose?.();
				break;
			case "Home":
				event.preventDefault();
				set(selectedIndex, 0);
				scrollSelectedIntoView();
				break;
			case "End":
				event.preventDefault();
				set(selectedIndex, Math.max(0, get(allResults).length - 1), true);
				scrollSelectedIntoView();
				break;
			case " ": if (multiSelect()) {
				event.preventDefault();
				const result = get(allResults)[get(effectiveIndex)];
				if (result) toggleChecked(result.item);
			}
		}
	}
	function handleItemClick(item) {
		if (multiSelect()) toggleChecked(item);
		else confirmItem(item);
	}
	var $$exports = { ...legacy_api() };
	var div_2 = root_14();
	var input_1 = child(div_2);
	remove_input_defaults(input_1);
	bind_this(input_1, ($$value) => set(inputEl, $$value), () => get(inputEl));
	var div_3 = sibling(input_1, 2);
	var text_2 = child(div_3, true);
	reset(div_3);
	var node_8 = sibling(div_3, 2);
	var consequent_5 = ($$anchor) => {
		var span_3 = root_6();
		var text_3 = child(span_3, true);
		reset(span_3);
		template_effect(() => set_text(text_3, $$props.errorMessage));
		append($$anchor, span_3);
	};
	var consequent_9 = ($$anchor) => {
		var ol = root_10();
		var node_9 = child(ol);
		var consequent_6 = ($$anchor) => {
			var fragment_3 = root_7();
			var li_1 = first_child(fragment_3);
			var text_4 = child(li_1, true);
			reset(li_1);
			var node_10 = sibling(li_1, 2);
			add_svelte_meta(() => each(node_10, 19, () => get(recentResults), (result) => getItemKey(result.item), ($$anchor, result, i) => {
				add_svelte_meta(() => listItem($$anchor, () => get(result), () => get(i)), "render", SelectList, 516, 10);
			}), "each", SelectList, 515, 8);
			template_effect(() => set_text(text_4, recentSectionLabel()));
			append($$anchor, fragment_3);
		};
		add_svelte_meta(() => if_block(node_9, ($$render) => {
			if (get(recentResults).length > 0) $$render(consequent_6);
		}), "if", SelectList, 512, 6);
		var node_11 = sibling(node_9, 2);
		var consequent_8 = ($$anchor) => {
			var fragment_5 = root_9();
			var node_12 = first_child(fragment_5);
			var consequent_7 = ($$anchor) => {
				var li_2 = root_8();
				var text_5 = child(li_2, true);
				reset(li_2);
				template_effect(() => set_text(text_5, allSectionLabel()));
				append($$anchor, li_2);
			};
			add_svelte_meta(() => if_block(node_12, ($$render) => {
				if (get(recentResults).length > 0) $$render(consequent_7);
			}), "if", SelectList, 521, 8);
			var node_13 = sibling(node_12, 2);
			add_svelte_meta(() => each(node_13, 19, () => get(remainingResults), (result) => getItemKey(result.item), ($$anchor, result, i) => {
				add_svelte_meta(() => listItem($$anchor, () => get(result), () => get(recentResults).length + get(i)), "render", SelectList, 526, 10);
			}), "each", SelectList, 525, 8);
			append($$anchor, fragment_5);
		};
		add_svelte_meta(() => if_block(node_11, ($$render) => {
			if (get(remainingResults).length > 0) $$render(consequent_8);
		}), "if", SelectList, 520, 6);
		reset(ol);
		bind_this(ol, ($$value) => set(listEl, $$value), () => get(listEl));
		template_effect(() => {
			set_attribute(ol, "id", listId);
			set_class(ol, 1, `list-group ${listClassName() ?? ""}`, "svelte-n23c1j");
			set_attribute(ol, "aria-label", $$props.listLabel);
			set_attribute(ol, "aria-multiselectable", multiSelect() ? true : void 0);
		});
		delegated("mousedown", ol, function mousedown(e) {
			return e.preventDefault();
		});
		append($$anchor, ol);
	};
	var consequent_10 = ($$anchor) => {
		var fragment_7 = comment();
		var node_14 = first_child(fragment_7);
		add_svelte_meta(() => snippet(node_14, () => $$props.emptySnippet, () => get(query)), "render", SelectList, 531, 4);
		append($$anchor, fragment_7);
	};
	var alternate_3 = ($$anchor) => {
		var span_4 = root_13();
		var node_15 = child(span_4);
		var consequent_12 = ($$anchor) => {
			var fragment_8 = root_12();
			var text_6 = first_child(fragment_8);
			var node_16 = sibling(text_6);
			var consequent_11 = ($$anchor) => {
				var span_5 = root_11();
				var text_7 = child(span_5, true);
				reset(span_5);
				template_effect(() => set_text(text_7, $$props.loadingBadge));
				append($$anchor, span_5);
			};
			add_svelte_meta(() => if_block(node_16, ($$render) => {
				if (equals($$props.loadingBadge, null, false)) $$render(consequent_11);
			}), "if", SelectList, 536, 8);
			template_effect(() => set_text(text_6, `${$$props.loadingMessage ?? ""} `));
			append($$anchor, fragment_8);
		};
		var consequent_13 = ($$anchor) => {
			var text_8 = text();
			template_effect(() => set_text(text_8, noMatchesMessage()));
			append($$anchor, text_8);
		};
		var d = user_derived(() => get(effectiveQuery).trim());
		var alternate_2 = ($$anchor) => {
			var text_9 = text();
			template_effect(() => set_text(text_9, emptyMessage()));
			append($$anchor, text_9);
		};
		add_svelte_meta(() => if_block(node_15, ($$render) => {
			if (isLoading() && $$props.loadingMessage) $$render(consequent_12);
			else if (get(d)) $$render(consequent_13, 1);
			else $$render(alternate_2, -1);
		}), "if", SelectList, 534, 6);
		reset(span_4);
		append($$anchor, span_4);
	};
	add_svelte_meta(() => if_block(node_8, ($$render) => {
		if ($$props.errorMessage) $$render(consequent_5);
		else if (get(allResults).length > 0) $$render(consequent_9, 1);
		else if ($$props.emptySnippet) $$render(consequent_10, 2);
		else $$render(alternate_3, -1);
	}), "if", SelectList, 493, 2);
	reset(div_2);
	bind_this(div_2, ($$value) => set(containerEl, $$value), () => get(containerEl));
	template_effect(($0) => {
		set_class(div_2, 1, `select-list ${className() ?? ""}`, "svelte-n23c1j");
		set_attribute(div_2, "aria-label", $$props.label);
		set_attribute(div_2, "aria-busy", isBusy() || isLoading());
		set_attribute(input_1, "placeholder", inputPlaceholder());
		set_attribute(input_1, "aria-expanded", get(allResults).length > 0);
		set_attribute(input_1, "aria-controls", listId);
		set_attribute(input_1, "aria-activedescendant", $0);
		set_attribute(input_1, "aria-label", $$props.inputLabel);
		set_text(text_2, get(statusMessage));
	}, [() => get(allResults).length > 0 ? itemId(get(effectiveIndex)) : void 0]);
	delegated("focusout", div_2, function focusout(e) {
		if (get(containerEl)?.contains(e.relatedTarget)) return;
		requestAnimationFrame(() => {
			if (document.hasFocus() && !get(containerEl)?.contains(document.activeElement)) $$props.onClose?.();
		});
	});
	delegated("keydown", input_1, handleKeydown);
	bind_value(input_1, function get$1() {
		return get(query);
	}, function set$1($$value) {
		set(query, $$value);
	});
	append($$anchor, div_2);
	return pop($$exports);
}
delegate([
	"click",
	"change",
	"focusout",
	"keydown",
	"mousedown"
]);

//#endregion
//#region src/select-list/create-select-list.ts
/**
* Vendored from `@children-of-atom/select-list`, which is not published to npm.
* Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
* `libraries/select-list/src/create-select-list.ts`.
*
* Local additions are marked `LOCAL`; the public API is otherwise unchanged so
* this directory can be swapped for the package once it ships. The one
* signature change is `SelectListHandle`, which is now generic over the item
* type — it defaults to `SelectListItem`, so existing annotations still hold,
* and it makes `updateProps()` type-check against the same options the list was
* created with.
*/
let DefaultNucleoMatcherClass = null;
/**
* `nucleo-matcher-wasm` loads its binary with `readFileSync` off its own
* `__dirname`, so it is an apm-installed dependency rather than something the
* bundler inlines. A failed install degrades to substring matching instead of
* breaking the package, which is why this is a guarded `require`.
*/
function loadNucleoMatcher() {
	if (DefaultNucleoMatcherClass) return DefaultNucleoMatcherClass;
	try {
		DefaultNucleoMatcherClass = require("nucleo-matcher-wasm").NucleoMatcher;
	} catch {}
	return DefaultNucleoMatcherClass;
}
function createSelectList(options) {
	let showCount = 0;
	let panelResult = null;
	function ensurePanel() {
		if (panelResult) return panelResult;
		showCount++;
		const { NucleoMatcherClass, ...rest } = options;
		panelResult = u$1(SelectList, {
			...rest,
			NucleoMatcherClass: NucleoMatcherClass !== void 0 ? NucleoMatcherClass : loadNucleoMatcher(),
			showCount,
			onClose: () => handle.hide()
		}, {
			type: "modal",
			visible: true
		});
		return panelResult;
	}
	const handle = {
		show() {
			const result = ensurePanel();
			if (result.panel.isVisible()) return;
			showCount++;
			result.view.updateProps({ showCount });
			result.panel.show();
		},
		hide() {
			if (!panelResult) return;
			panelResult.panel.hide();
			options.onDismiss?.();
		},
		toggle() {
			if (panelResult?.panel.isVisible()) this.hide();
			else this.show();
		},
		isVisible() {
			return panelResult?.panel.isVisible() ?? false;
		},
		updateProps(props) {
			if (!panelResult) return;
			panelResult.view.updateProps(props);
		},
		dispose() {
			panelResult?.dispose();
			panelResult = null;
		}
	};
	return handle;
}

//#endregion
//#region src/targets-view.ts
/**
* The build-target picker.
*
* The public methods are the ones `target-manager.ts` has always called, so the
* switch from `atom-space-pen-views`' `SelectListView` to the Svelte select-list
* is invisible to it. As before, `awaitSelection()` only ever settles on a
* confirmed target — dismissing the list simply leaves it pending.
*/
var TargetsView = class TargetsView {
	list;
	resolveFunction = null;
	confirmed = false;
	activeTarget;
	constructor() {
		this.list = createSelectList({
			items: [],
			label: "Build Targets",
			listLabel: "Build targets",
			inputLabel: "Search build targets",
			className: "build-target",
			listClassName: "mark-active",
			itemClass: TargetsView.itemClassFor(void 0),
			emptyMessage: "No targets found.",
			noMatchesMessage: "No matches",
			onConfirm: (item) => this.confirm(item.label),
			onDismiss: () => this.dismissed()
		});
		this.list.show();
	}
	/**
	* A fresh closure per active target: `itemClass` is a reactive prop, but what
	* it closes over is not, so the identity change is what re-renders the list.
	*/
	static itemClassFor(activeTarget) {
		return (item) => item.label === activeTarget ? "active build-target" : "build-target";
	}
	hide() {
		this.list.dispose();
	}
	setItems(items) {
		this.list.updateProps({
			items: items.map((label) => ({ label })),
			isLoading: false
		});
	}
	setActiveTarget(target) {
		this.activeTarget = target;
		this.list.updateProps({
			initialSelectedKey: target,
			itemClass: TargetsView.itemClassFor(target)
		});
	}
	setLoading(message) {
		this.list.updateProps({
			isLoading: true,
			loadingMessage: message
		});
	}
	setError(message) {
		this.list.updateProps({ errorMessage: message });
	}
	awaitSelection() {
		return new Promise((resolve) => {
			this.resolveFunction = resolve;
		});
	}
	confirm(target) {
		this.confirmed = true;
		if (this.resolveFunction) {
			this.resolveFunction(target);
			this.resolveFunction = null;
		}
		this.hide();
	}
	dismissed() {
		if (this.confirmed) return;
		this.list.dispose();
	}
};

//#endregion
//#region src/target-manager.ts
var TargetManager = class extends events.default {
	pathTargets;
	tools = [];
	busyProvider;
	targetsView = null;
	subscriptions = new atom$1.CompositeDisposable();
	constructor() {
		super();
		let projectPaths = atom.project.getPaths();
		this.pathTargets = projectPaths.map((path) => this._defaultPathTarget(path));
		this.subscriptions.add(atom.project.onDidChangePaths((newProjectPaths) => {
			const addedPaths = newProjectPaths.filter((el) => projectPaths.indexOf(el) === -1);
			const removedPaths = projectPaths.filter((el) => newProjectPaths.indexOf(el) === -1);
			addedPaths.forEach((path) => this.pathTargets.push(this._defaultPathTarget(path)));
			this.pathTargets = this.pathTargets.filter((pt) => -1 === removedPaths.indexOf(pt.path));
			this.refreshTargets(addedPaths);
			projectPaths = newProjectPaths;
		}), atom.commands.add("atom-workspace", "buildium:refresh-targets", () => this.refreshTargets()), atom.commands.add("atom-workspace", "buildium:select-active-target", () => this.selectActiveTarget()), watchBuildFiles((roots) => this.refreshTargets(roots)));
	}
	setBusyProvider(busyProvider) {
		this.busyProvider = busyProvider;
	}
	_defaultPathTarget(path) {
		return {
			path,
			loading: false,
			targets: [],
			instancedTools: [],
			activeTarget: null,
			tools: [],
			subscriptions: new atom$1.CompositeDisposable()
		};
	}
	destroy() {
		this.subscriptions.dispose();
		this.pathTargets.forEach((pathTarget) => pathTarget.tools.map((tool) => {
			tool.removeAllListeners?.("refresh");
			tool.destructor?.();
		}));
	}
	setTools(tools) {
		this.tools = tools || [];
	}
	refreshTargets(refreshPaths) {
		log_default.log("Refreshing targets");
		const paths = refreshPaths || atom.project.getPaths();
		this.busyProvider?.add(`Refreshing targets for ${paths.join(",")}`);
		const pathPromises = paths.map((path) => {
			const pathTarget = this.pathTargets.find((pt) => pt.path === path);
			if (!pathTarget) return Promise.resolve(void 0);
			pathTarget.loading = true;
			pathTarget.instancedTools.forEach((tool) => tool.removeAllListeners?.("refresh"));
			pathTarget.instancedTools = [];
			const settingsPromise = this.tools.map((Tool) => new Tool(path)).filter((tool) => tool.isEligible()).map((tool) => {
				pathTarget.instancedTools.push(tool);
				tool.on?.("refresh", () => this.refreshTargets([path]));
				return Promise.resolve().then(() => tool.settings()).catch((err) => {
					if (err instanceof SyntaxError) atom.notifications.addError("Invalid build file.", {
						detail: `You have a syntax error in your build file: ${err.message}`,
						dismissable: true
					});
					else {
						const toolName = tool.getNiceName();
						atom.notifications.addError(`Ooops. Something went wrong${toolName ? ` in the ${toolName} build provider` : ""}.`, {
							detail: err.message,
							stack: err.stack,
							dismissable: true
						});
					}
				});
			});
			return Promise.all(settingsPromise).then((results) => {
				const settings = uniquifySettings(results.flat().filter((setting) => Boolean(setting)).map((setting) => getDefaultSettings(path, setting)));
				if (null === pathTarget.activeTarget || !settings.find((s) => s.name === pathTarget.activeTarget)) pathTarget.activeTarget = settings[0] ? settings[0].name : void 0;
				pathTarget.subscriptions.dispose();
				pathTarget.subscriptions = new atom$1.CompositeDisposable();
				settings.forEach((setting) => {
					if (setting.keymap && !setting.atomCommandName) setting.atomCommandName = `buildium:trigger:${setting.name}`;
					if (setting.atomCommandName) pathTarget.subscriptions.add(atom.commands.add("atom-workspace", setting.atomCommandName, (event) => this.emit("trigger", event)));
					if (setting.keymap) {
						const keymapSpec = { "atom-workspace, atom-text-editor": { [setting.keymap]: setting.atomCommandName } };
						pathTarget.subscriptions.add(atom.keymaps.add(setting.name, keymapSpec));
					}
				});
				pathTarget.targets = settings;
				pathTarget.loading = false;
				return pathTarget;
			}).catch((err) => {
				atom.notifications.addError("Ooops. Something went wrong.", {
					detail: err.message,
					stack: err.stack,
					dismissable: true
				});
			});
		});
		return Promise.all(pathPromises).then((pathTargets) => {
			this.fillTargets(activePath(), false);
			this.emit("refresh-complete");
			this.busyProvider?.remove(`Refreshing targets for ${paths.join(",")}`);
			if (pathTargets.length === 0) return;
			if (config_default.get("notificationOnRefresh")) {
				const rows = paths.map((path) => {
					const pathTarget = this.pathTargets.find((pt) => pt.path === path);
					if (!pathTarget) return `Targets ${path} no longer exists. Is build deactivated?`;
					return `${pathTarget.targets.length} targets at: ${path}`;
				});
				atom.notifications.addInfo("Build targets parsed.", { detail: rows.join("\n") });
			}
		}).catch((err) => {
			atom.notifications.addError("Ooops. Something went wrong.", {
				detail: err.message,
				stack: err.stack,
				dismissable: true
			});
		});
	}
	fillTargets(path, refreshOnEmpty = true) {
		if (!this.targetsView || !path) return;
		const activeTarget = this.getActiveTarget(path);
		if (activeTarget) this.targetsView.setActiveTarget(activeTarget.name);
		this.getTargets(path, refreshOnEmpty).then((targets) => targets.map((t) => t.name)).then((targetNames) => this.targetsView?.setItems(targetNames));
	}
	selectActiveTarget() {
		if (config_default.get("refreshOnShowTargetList")) this.refreshTargets();
		const path = activePath();
		if (!path) {
			atom.notifications.addWarning("Unable to build.", { detail: "Open file is not part of any open project in Atom" });
			return;
		}
		const targetsView = new TargetsView();
		this.targetsView = targetsView;
		if (this.isLoading(path)) targetsView.setLoading("Loading project build targets…");
		else this.fillTargets(path);
		targetsView.awaitSelection().then((newTarget) => {
			this.setActiveTarget(path, newTarget);
			this.targetsView = null;
		}).catch((err) => {
			targetsView.setError(err.message);
			this.targetsView = null;
		});
	}
	getTargets(path, refreshOnEmpty = true) {
		const pathTarget = this.pathTargets.find((pt) => pt.path === path);
		if (!pathTarget) return Promise.resolve([]);
		if (refreshOnEmpty && pathTarget.targets.length === 0) return this.refreshTargets([pathTarget.path]).then(() => pathTarget.targets);
		return Promise.resolve(pathTarget.targets);
	}
	getActiveTarget(path) {
		const pathTarget = this.pathTargets.find((pt) => pt.path === path);
		if (!pathTarget) return null;
		return pathTarget.targets.find((target) => target.name === pathTarget.activeTarget) ?? null;
	}
	setActiveTarget(path, targetName) {
		const pathTarget = this.pathTargets.find((pt) => pt.path === path);
		if (!pathTarget) return;
		pathTarget.activeTarget = targetName;
		this.emit("new-active-target", path, this.getActiveTarget(path));
	}
	isLoading(path) {
		return Boolean(this.pathTargets.find((pt) => pt.path === path)?.loading);
	}
};

//#endregion
//#region node_modules/confbox/dist/_chunks/rolldown-runtime.mjs
var e$3 = Object.create;
var t$5 = Object.defineProperty;
var n$5 = Object.getOwnPropertyDescriptor;
var r$6 = Object.getOwnPropertyNames;
var i$6 = Object.getPrototypeOf;
var a$5 = Object.prototype.hasOwnProperty;
var o$4 = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var s$3 = (e, i, o, s) => {
	if (i && typeof i == `object` || typeof i == `function`) for (var c = r$6(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a$5.call(e, d) && d !== o && t$5(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n$5(i, d)) || s.enumerable
	});
	return e;
};
var c$2 = (n, r, a) => (a = n == null ? {} : e$3(i$6(n)), s$3(r || !n || !n.__esModule ? t$5(a, `default`, {
	value: n,
	enumerable: !0
}) : a, n));

//#endregion
//#region node_modules/confbox/dist/_chunks/libs/json5.mjs
var t$4 = o$4(((e, t) => {
	t.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, t.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, t.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
}));
var n$4 = o$4(((e, n) => {
	let r = t$4();
	n.exports = {
		isSpaceSeparator(e) {
			return typeof e == `string` && r.Space_Separator.test(e);
		},
		isIdStartChar(e) {
			return typeof e == `string` && (e >= `a` && e <= `z` || e >= `A` && e <= `Z` || e === `$` || e === `_` || r.ID_Start.test(e));
		},
		isIdContinueChar(e) {
			return typeof e == `string` && (e >= `a` && e <= `z` || e >= `A` && e <= `Z` || e >= `0` && e <= `9` || e === `$` || e === `_` || e === `‌` || e === `‍` || r.ID_Continue.test(e));
		},
		isDigit(e) {
			return typeof e == `string` && /[0-9]/.test(e);
		},
		isHexDigit(e) {
			return typeof e == `string` && /[0-9A-Fa-f]/.test(e);
		}
	};
}));
var r$5 = o$4(((e, t) => {
	let r = n$4(), i, a, o, s, c, l, u, d, f;
	t.exports = function(e, t) {
		i = String(e), a = `start`, o = [], s = 0, c = 1, l = 0, u = void 0, d = void 0, f = void 0;
		do
			u = y(), O[a]();
		while (u.type !== `eof`);
		return typeof t == `function` ? p({ "": f }, ``, t) : f;
	};
	function p(e, t, n) {
		let r = e[t];
		if (typeof r == `object` && r) if (Array.isArray(r)) for (let e = 0; e < r.length; e++) {
			let t = String(e), i = p(r, t, n);
			i === void 0 ? delete r[t] : Object.defineProperty(r, t, {
				value: i,
				writable: !0,
				enumerable: !0,
				configurable: !0
			});
		}
		else for (let e in r) {
			let t = p(r, e, n);
			t === void 0 ? delete r[e] : Object.defineProperty(r, e, {
				value: t,
				writable: !0,
				enumerable: !0,
				configurable: !0
			});
		}
		return n.call(e, t, r);
	}
	let m, h, g, _, v;
	function y() {
		for (m = `default`, h = ``, g = !1, _ = 1;;) {
			v = b();
			let e = S[m]();
			if (e) return e;
		}
	}
	function b() {
		if (i[s]) return String.fromCodePoint(i.codePointAt(s));
	}
	function x() {
		let e = b();
		return e === `
` ? (c++, l = 0) : e ? l += e.length : l++, e && (s += e.length), e;
	}
	let S = {
		default() {
			switch (v) {
				case `	`:
				case `\v`:
				case `\f`:
				case ` `:
				case `\xA0`:
				case `﻿`:
				case `
`:
				case `\r`:
				case `\u2028`:
				case `\u2029`:
					x();
					return;
				case `/`:
					x(), m = `comment`;
					return;
				case void 0: return x(), C(`eof`);
			}
			if (r.isSpaceSeparator(v)) {
				x();
				return;
			}
			return S[a]();
		},
		comment() {
			switch (v) {
				case `*`:
					x(), m = `multiLineComment`;
					return;
				case `/`:
					x(), m = `singleLineComment`;
					return;
			}
			throw j(x());
		},
		multiLineComment() {
			switch (v) {
				case `*`:
					x(), m = `multiLineCommentAsterisk`;
					return;
				case void 0: throw j(x());
			}
			x();
		},
		multiLineCommentAsterisk() {
			switch (v) {
				case `*`:
					x();
					return;
				case `/`:
					x(), m = `default`;
					return;
				case void 0: throw j(x());
			}
			x(), m = `multiLineComment`;
		},
		singleLineComment() {
			switch (v) {
				case `
`:
				case `\r`:
				case `\u2028`:
				case `\u2029`:
					x(), m = `default`;
					return;
				case void 0: return x(), C(`eof`);
			}
			x();
		},
		value() {
			switch (v) {
				case `{`:
				case `[`: return C(`punctuator`, x());
				case `n`: return x(), w(`ull`), C(`null`, null);
				case `t`: return x(), w(`rue`), C(`boolean`, !0);
				case `f`: return x(), w(`alse`), C(`boolean`, !1);
				case `-`:
				case `+`:
					x() === `-` && (_ = -1), m = `sign`;
					return;
				case `.`:
					h = x(), m = `decimalPointLeading`;
					return;
				case `0`:
					h = x(), m = `zero`;
					return;
				case `1`:
				case `2`:
				case `3`:
				case `4`:
				case `5`:
				case `6`:
				case `7`:
				case `8`:
				case `9`:
					h = x(), m = `decimalInteger`;
					return;
				case `I`: return x(), w(`nfinity`), C(`numeric`, 1 / 0);
				case `N`: return x(), w(`aN`), C(`numeric`, NaN);
				case `"`:
				case `'`:
					g = x() === `"`, h = ``, m = `string`;
					return;
			}
			throw j(x());
		},
		identifierNameStartEscape() {
			if (v !== `u`) throw j(x());
			x();
			let e = D();
			switch (e) {
				case `$`:
				case `_`: break;
				default: if (!r.isIdStartChar(e)) throw N();
			}
			h += e, m = `identifierName`;
		},
		identifierName() {
			switch (v) {
				case `$`:
				case `_`:
				case `‌`:
				case `‍`:
					h += x();
					return;
				case `\\`:
					x(), m = `identifierNameEscape`;
					return;
			}
			if (r.isIdContinueChar(v)) {
				h += x();
				return;
			}
			return C(`identifier`, h);
		},
		identifierNameEscape() {
			if (v !== `u`) throw j(x());
			x();
			let e = D();
			switch (e) {
				case `$`:
				case `_`:
				case `‌`:
				case `‍`: break;
				default: if (!r.isIdContinueChar(e)) throw N();
			}
			h += e, m = `identifierName`;
		},
		sign() {
			switch (v) {
				case `.`:
					h = x(), m = `decimalPointLeading`;
					return;
				case `0`:
					h = x(), m = `zero`;
					return;
				case `1`:
				case `2`:
				case `3`:
				case `4`:
				case `5`:
				case `6`:
				case `7`:
				case `8`:
				case `9`:
					h = x(), m = `decimalInteger`;
					return;
				case `I`: return x(), w(`nfinity`), C(`numeric`, _ * (1 / 0));
				case `N`: return x(), w(`aN`), C(`numeric`, NaN);
			}
			throw j(x());
		},
		zero() {
			switch (v) {
				case `.`:
					h += x(), m = `decimalPoint`;
					return;
				case `e`:
				case `E`:
					h += x(), m = `decimalExponent`;
					return;
				case `x`:
				case `X`:
					h += x(), m = `hexadecimal`;
					return;
			}
			return C(`numeric`, _ * 0);
		},
		decimalInteger() {
			switch (v) {
				case `.`:
					h += x(), m = `decimalPoint`;
					return;
				case `e`:
				case `E`:
					h += x(), m = `decimalExponent`;
					return;
			}
			if (r.isDigit(v)) {
				h += x();
				return;
			}
			return C(`numeric`, _ * Number(h));
		},
		decimalPointLeading() {
			if (r.isDigit(v)) {
				h += x(), m = `decimalFraction`;
				return;
			}
			throw j(x());
		},
		decimalPoint() {
			switch (v) {
				case `e`:
				case `E`:
					h += x(), m = `decimalExponent`;
					return;
			}
			if (r.isDigit(v)) {
				h += x(), m = `decimalFraction`;
				return;
			}
			return C(`numeric`, _ * Number(h));
		},
		decimalFraction() {
			switch (v) {
				case `e`:
				case `E`:
					h += x(), m = `decimalExponent`;
					return;
			}
			if (r.isDigit(v)) {
				h += x();
				return;
			}
			return C(`numeric`, _ * Number(h));
		},
		decimalExponent() {
			switch (v) {
				case `+`:
				case `-`:
					h += x(), m = `decimalExponentSign`;
					return;
			}
			if (r.isDigit(v)) {
				h += x(), m = `decimalExponentInteger`;
				return;
			}
			throw j(x());
		},
		decimalExponentSign() {
			if (r.isDigit(v)) {
				h += x(), m = `decimalExponentInteger`;
				return;
			}
			throw j(x());
		},
		decimalExponentInteger() {
			if (r.isDigit(v)) {
				h += x();
				return;
			}
			return C(`numeric`, _ * Number(h));
		},
		hexadecimal() {
			if (r.isHexDigit(v)) {
				h += x(), m = `hexadecimalInteger`;
				return;
			}
			throw j(x());
		},
		hexadecimalInteger() {
			if (r.isHexDigit(v)) {
				h += x();
				return;
			}
			return C(`numeric`, _ * Number(h));
		},
		string() {
			switch (v) {
				case `\\`:
					x(), h += T();
					return;
				case `"`:
					if (g) return x(), C(`string`, h);
					h += x();
					return;
				case `'`:
					if (!g) return x(), C(`string`, h);
					h += x();
					return;
				case `
`:
				case `\r`: throw j(x());
				case `\u2028`:
				case `\u2029`:
					P(v);
					break;
				case void 0: throw j(x());
			}
			h += x();
		},
		start() {
			switch (v) {
				case `{`:
				case `[`: return C(`punctuator`, x());
			}
			m = `value`;
		},
		beforePropertyName() {
			switch (v) {
				case `$`:
				case `_`:
					h = x(), m = `identifierName`;
					return;
				case `\\`:
					x(), m = `identifierNameStartEscape`;
					return;
				case `}`: return C(`punctuator`, x());
				case `"`:
				case `'`:
					g = x() === `"`, m = `string`;
					return;
			}
			if (r.isIdStartChar(v)) {
				h += x(), m = `identifierName`;
				return;
			}
			throw j(x());
		},
		afterPropertyName() {
			if (v === `:`) return C(`punctuator`, x());
			throw j(x());
		},
		beforePropertyValue() {
			m = `value`;
		},
		afterPropertyValue() {
			switch (v) {
				case `,`:
				case `}`: return C(`punctuator`, x());
			}
			throw j(x());
		},
		beforeArrayValue() {
			if (v === `]`) return C(`punctuator`, x());
			m = `value`;
		},
		afterArrayValue() {
			switch (v) {
				case `,`:
				case `]`: return C(`punctuator`, x());
			}
			throw j(x());
		},
		end() {
			throw j(x());
		}
	};
	function C(e, t) {
		return {
			type: e,
			value: t,
			line: c,
			column: l
		};
	}
	function w(e) {
		for (let t of e) {
			if (b() !== t) throw j(x());
			x();
		}
	}
	function T() {
		switch (b()) {
			case `b`: return x(), `\b`;
			case `f`: return x(), `\f`;
			case `n`: return x(), `
`;
			case `r`: return x(), `\r`;
			case `t`: return x(), `	`;
			case `v`: return x(), `\v`;
			case `0`:
				if (x(), r.isDigit(b())) throw j(x());
				return `\0`;
			case `x`: return x(), E();
			case `u`: return x(), D();
			case `
`:
			case `\u2028`:
			case `\u2029`: return x(), ``;
			case `\r`: return x(), b() === `
` && x(), ``;
			case `1`:
			case `2`:
			case `3`:
			case `4`:
			case `5`:
			case `6`:
			case `7`:
			case `8`:
			case `9`: throw j(x());
			case void 0: throw j(x());
		}
		return x();
	}
	function E() {
		let e = ``, t = b();
		if (!r.isHexDigit(t) || (e += x(), t = b(), !r.isHexDigit(t))) throw j(x());
		return e += x(), String.fromCodePoint(parseInt(e, 16));
	}
	function D() {
		let e = ``, t = 4;
		for (; t-- > 0;) {
			let t = b();
			if (!r.isHexDigit(t)) throw j(x());
			e += x();
		}
		return String.fromCodePoint(parseInt(e, 16));
	}
	let O = {
		start() {
			if (u.type === `eof`) throw M();
			k();
		},
		beforePropertyName() {
			switch (u.type) {
				case `identifier`:
				case `string`:
					d = u.value, a = `afterPropertyName`;
					return;
				case `punctuator`:
					A();
					return;
				case `eof`: throw M();
			}
		},
		afterPropertyName() {
			if (u.type === `eof`) throw M();
			a = `beforePropertyValue`;
		},
		beforePropertyValue() {
			if (u.type === `eof`) throw M();
			k();
		},
		beforeArrayValue() {
			if (u.type === `eof`) throw M();
			if (u.type === `punctuator` && u.value === `]`) {
				A();
				return;
			}
			k();
		},
		afterPropertyValue() {
			if (u.type === `eof`) throw M();
			switch (u.value) {
				case `,`:
					a = `beforePropertyName`;
					return;
				case `}`: A();
			}
		},
		afterArrayValue() {
			if (u.type === `eof`) throw M();
			switch (u.value) {
				case `,`:
					a = `beforeArrayValue`;
					return;
				case `]`: A();
			}
		},
		end() {}
	};
	function k() {
		let e;
		switch (u.type) {
			case `punctuator`:
				switch (u.value) {
					case `{`:
						e = {};
						break;
					case `[`: e = [];
				}
				break;
			case `null`:
			case `boolean`:
			case `numeric`:
			case `string`: e = u.value;
		}
		if (f === void 0) f = e;
		else {
			let t = o[o.length - 1];
			Array.isArray(t) ? t.push(e) : Object.defineProperty(t, d, {
				value: e,
				writable: !0,
				enumerable: !0,
				configurable: !0
			});
		}
		if (typeof e == `object` && e) o.push(e), a = Array.isArray(e) ? `beforeArrayValue` : `beforePropertyName`;
		else {
			let e = o[o.length - 1];
			a = e == null ? `end` : Array.isArray(e) ? `afterArrayValue` : `afterPropertyValue`;
		}
	}
	function A() {
		o.pop();
		let e = o[o.length - 1];
		a = e == null ? `end` : Array.isArray(e) ? `afterArrayValue` : `afterPropertyValue`;
	}
	function j(e) {
		return I(e === void 0 ? `JSON5: invalid end of input at ${c}:${l}` : `JSON5: invalid character '${F(e)}' at ${c}:${l}`);
	}
	function M() {
		return I(`JSON5: invalid end of input at ${c}:${l}`);
	}
	function N() {
		return l -= 5, I(`JSON5: invalid identifier character at ${c}:${l}`);
	}
	function P(e) {
		console.warn(`JSON5: '${F(e)}' in strings is not valid ECMAScript; consider escaping`);
	}
	function F(e) {
		let t = {
			"'": `\\'`,
			"\"": `\\"`,
			"\\": `\\\\`,
			"\b": `\\b`,
			"\f": `\\f`,
			"\n": `\\n`,
			"\r": `\\r`,
			"	": `\\t`,
			"\v": `\\v`,
			"\0": `\\0`,
			"\u2028": `\\u2028`,
			"\u2029": `\\u2029`
		};
		if (t[e]) return t[e];
		if (e < ` `) {
			let t = e.charCodeAt(0).toString(16);
			return `\\x` + (`00` + t).substring(t.length);
		}
		return e;
	}
	function I(e) {
		let t = SyntaxError(e);
		return t.lineNumber = c, t.columnNumber = l, t;
	}
}));
var i$5 = o$4(((e, t) => {
	let r = n$4();
	t.exports = function(e, t, n) {
		let i = [], a = ``, o, s, c = ``, l;
		if (typeof t == `object` && t && !Array.isArray(t) && (n = t.space, l = t.quote, t = t.replacer), typeof t == `function`) s = t;
		else if (Array.isArray(t)) {
			o = [];
			for (let e of t) {
				let t;
				typeof e == `string` ? t = e : (typeof e == `number` || e instanceof String || e instanceof Number) && (t = String(e)), t !== void 0 && o.indexOf(t) < 0 && o.push(t);
			}
		}
		return n instanceof Number ? n = Number(n) : n instanceof String && (n = String(n)), typeof n == `number` ? n > 0 && (n = Math.min(10, Math.floor(n)), c = `          `.substr(0, n)) : typeof n == `string` && (c = n.substr(0, 10)), u(``, { "": e });
		function u(e, t) {
			let n = t[e];
			switch (n != null && (typeof n.toJSON5 == `function` ? n = n.toJSON5(e) : typeof n.toJSON == `function` && (n = n.toJSON(e))), s && (n = s.call(t, e, n)), n instanceof Number ? n = Number(n) : n instanceof String ? n = String(n) : n instanceof Boolean && (n = n.valueOf()), n) {
				case null: return `null`;
				case !0: return `true`;
				case !1: return `false`;
			}
			if (typeof n == `string`) return d(n, !1);
			if (typeof n == `number`) return String(n);
			if (typeof n == `object`) return Array.isArray(n) ? m(n) : f(n);
		}
		function d(e) {
			let t = {
				"'": .1,
				"\"": .2
			}, n = {
				"'": `\\'`,
				"\"": `\\"`,
				"\\": `\\\\`,
				"\b": `\\b`,
				"\f": `\\f`,
				"\n": `\\n`,
				"\r": `\\r`,
				"	": `\\t`,
				"\v": `\\v`,
				"\0": `\\0`,
				"\u2028": `\\u2028`,
				"\u2029": `\\u2029`
			}, i = ``;
			for (let a = 0; a < e.length; a++) {
				let o = e[a];
				switch (o) {
					case `'`:
					case `"`:
						t[o]++, i += o;
						continue;
					case `\0`: if (r.isDigit(e[a + 1])) {
						i += `\\x00`;
						continue;
					}
				}
				if (n[o]) {
					i += n[o];
					continue;
				}
				if (o < ` `) {
					let e = o.charCodeAt(0).toString(16);
					i += `\\x` + (`00` + e).substring(e.length);
					continue;
				}
				i += o;
			}
			let a = l || Object.keys(t).reduce((e, n) => t[e] < t[n] ? e : n);
			return i = i.replace(new RegExp(a, `g`), n[a]), a + i + a;
		}
		function f(e) {
			if (i.indexOf(e) >= 0) throw TypeError(`Converting circular structure to JSON5`);
			i.push(e);
			let t = a;
			a += c;
			let n = o || Object.keys(e), r = [];
			for (let t of n) {
				let n = u(t, e);
				if (n !== void 0) {
					let e = p(t) + `:`;
					c !== `` && (e += ` `), e += n, r.push(e);
				}
			}
			let s;
			if (r.length === 0) s = `{}`;
			else {
				let e;
				if (c === ``) e = r.join(`,`), s = `{` + e + `}`;
				else {
					let n = `,
` + a;
					e = r.join(n), s = `{
` + a + e + `,
` + t + `}`;
				}
			}
			return i.pop(), a = t, s;
		}
		function p(e) {
			if (e.length === 0) return d(e, !0);
			let t = String.fromCodePoint(e.codePointAt(0));
			if (!r.isIdStartChar(t)) return d(e, !0);
			for (let n = t.length; n < e.length; n++) if (!r.isIdContinueChar(String.fromCodePoint(e.codePointAt(n)))) return d(e, !0);
			return e;
		}
		function m(e) {
			if (i.indexOf(e) >= 0) throw TypeError(`Converting circular structure to JSON5`);
			i.push(e);
			let t = a;
			a += c;
			let n = [];
			for (let t = 0; t < e.length; t++) {
				let r = u(String(t), e);
				n.push(r === void 0 ? `null` : r);
			}
			let r;
			if (n.length === 0) r = `[]`;
			else if (c === ``) r = `[` + n.join(`,`) + `]`;
			else {
				let e = `,
` + a, i = n.join(e);
				r = `[
` + a + i + `,
` + t + `]`;
			}
			return i.pop(), a = t, r;
		}
	};
}));

//#endregion
//#region node_modules/confbox/dist/_chunks/_format.mjs
const t$3 = Symbol.for(`__confbox_fmt__`);
const n$3 = /^(\s+)/;
const r$4 = /(\s+)$/;
function i$4(e, t = {}) {
	return {
		sample: t.indent === void 0 && t.preserveIndentation !== !1 && e.slice(0, t?.sampleSize || 1024),
		whiteSpace: t.preserveWhitespace === !1 ? void 0 : {
			start: n$3.exec(e)?.[0] || ``,
			end: r$4.exec(e)?.[0] || ``
		}
	};
}
function a$4(e, n, r) {
	!n || typeof n != `object` || Object.defineProperty(n, t$3, {
		enumerable: !1,
		configurable: !0,
		writable: !0,
		value: i$4(e, r)
	});
}

//#endregion
//#region node_modules/confbox/dist/json5.mjs
var a$3 = c$2(r$5(), 1);
var o$3 = c$2(i$5(), 1);
function s$2(e, n) {
	let r = (0, a$3.default)(e, n?.reviver);
	return a$4(e, r, n), r;
}

//#endregion
//#region node_modules/confbox/dist/_chunks/libs/jsonc-parser.mjs
function e$2(e, i = !1) {
	let a = e.length, o = 0, s = ``, c = 0, l = 16, u = 0, d = 0, f = 0, p = 0, m = 0;
	function h(t, n) {
		let r = 0, i = 0;
		for (; r < t || !n;) {
			let t = e.charCodeAt(o);
			if (t >= 48 && t <= 57) i = i * 16 + t - 48;
			else if (t >= 65 && t <= 70) i = i * 16 + t - 65 + 10;
			else if (t >= 97 && t <= 102) i = i * 16 + t - 97 + 10;
			else break;
			o++, r++;
		}
		return r < t && (i = -1), i;
	}
	function g(e) {
		o = e, s = ``, c = 0, l = 16, m = 0;
	}
	function _() {
		let t = o;
		if (e.charCodeAt(o) === 48) o++;
		else for (o++; o < e.length && r$3(e.charCodeAt(o));) o++;
		if (o < e.length && e.charCodeAt(o) === 46) if (o++, o < e.length && r$3(e.charCodeAt(o))) for (o++; o < e.length && r$3(e.charCodeAt(o));) o++;
		else return m = 3, e.substring(t, o);
		let n = o;
		if (o < e.length && (e.charCodeAt(o) === 69 || e.charCodeAt(o) === 101)) if (o++, (o < e.length && e.charCodeAt(o) === 43 || e.charCodeAt(o) === 45) && o++, o < e.length && r$3(e.charCodeAt(o))) {
			for (o++; o < e.length && r$3(e.charCodeAt(o));) o++;
			n = o;
		} else m = 3;
		return e.substring(t, n);
	}
	function v() {
		let t = ``, r = o;
		for (;;) {
			if (o >= a) {
				t += e.substring(r, o), m = 2;
				break;
			}
			let i = e.charCodeAt(o);
			if (i === 34) {
				t += e.substring(r, o), o++;
				break;
			}
			if (i === 92) {
				if (t += e.substring(r, o), o++, o >= a) {
					m = 2;
					break;
				}
				switch (e.charCodeAt(o++)) {
					case 34:
						t += `"`;
						break;
					case 92:
						t += `\\`;
						break;
					case 47:
						t += `/`;
						break;
					case 98:
						t += `\b`;
						break;
					case 102:
						t += `\f`;
						break;
					case 110:
						t += `
`;
						break;
					case 114:
						t += `\r`;
						break;
					case 116:
						t += `	`;
						break;
					case 117:
						let e = h(4, !0);
						e >= 0 ? t += String.fromCharCode(e) : m = 4;
						break;
					default: m = 5;
				}
				r = o;
				continue;
			}
			if (i >= 0 && i <= 31) if (n$2(i)) {
				t += e.substring(r, o), m = 2;
				break;
			} else m = 6;
			o++;
		}
		return t;
	}
	function y() {
		if (s = ``, m = 0, c = o, d = u, p = f, o >= a) return c = a, l = 17;
		let i = e.charCodeAt(o);
		if (t$2(i)) {
			do
				o++, s += String.fromCharCode(i), i = e.charCodeAt(o);
			while (t$2(i));
			return l = 15;
		}
		if (n$2(i)) return o++, s += String.fromCharCode(i), i === 13 && e.charCodeAt(o) === 10 && (o++, s += `
`), u++, f = o, l = 14;
		switch (i) {
			case 123: return o++, l = 1;
			case 125: return o++, l = 2;
			case 91: return o++, l = 3;
			case 93: return o++, l = 4;
			case 58: return o++, l = 6;
			case 44: return o++, l = 5;
			case 34: return o++, s = v(), l = 10;
			case 47:
				let t = o - 1;
				if (e.charCodeAt(o + 1) === 47) {
					for (o += 2; o < a && !n$2(e.charCodeAt(o));) o++;
					return s = e.substring(t, o), l = 12;
				}
				if (e.charCodeAt(o + 1) === 42) {
					o += 2;
					let r = a - 1, i = !1;
					for (; o < r;) {
						let t = e.charCodeAt(o);
						if (t === 42 && e.charCodeAt(o + 1) === 47) {
							o += 2, i = !0;
							break;
						}
						o++, n$2(t) && (t === 13 && e.charCodeAt(o) === 10 && o++, u++, f = o);
					}
					return i || (o++, m = 1), s = e.substring(t, o), l = 13;
				}
				return s += String.fromCharCode(i), o++, l = 16;
			case 45: if (s += String.fromCharCode(i), o++, o === a || !r$3(e.charCodeAt(o))) return l = 16;
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: return s += _(), l = 11;
			default:
				for (; o < a && b(i);) o++, i = e.charCodeAt(o);
				if (c !== o) {
					switch (s = e.substring(c, o), s) {
						case `true`: return l = 8;
						case `false`: return l = 9;
						case `null`: return l = 7;
					}
					return l = 16;
				}
				return s += String.fromCharCode(i), o++, l = 16;
		}
	}
	function b(e) {
		if (t$2(e) || n$2(e)) return !1;
		switch (e) {
			case 125:
			case 93:
			case 123:
			case 91:
			case 34:
			case 58:
			case 44:
			case 47: return !1;
		}
		return !0;
	}
	function x() {
		let e;
		do
			e = y();
		while (e >= 12 && e <= 15);
		return e;
	}
	return {
		setPosition: g,
		getPosition: () => o,
		scan: i ? x : y,
		getToken: () => l,
		getTokenValue: () => s,
		getTokenOffset: () => c,
		getTokenLength: () => o - c,
		getTokenStartLine: () => d,
		getTokenStartCharacter: () => c - p,
		getTokenError: () => m
	};
}
function t$2(e) {
	return e === 32 || e === 9;
}
function n$2(e) {
	return e === 10 || e === 13;
}
function r$3(e) {
	return e >= 48 && e <= 57;
}
var i$3;
(function(e) {
	e[e.lineFeed = 10] = `lineFeed`, e[e.carriageReturn = 13] = `carriageReturn`, e[e.space = 32] = `space`, e[e._0 = 48] = `_0`, e[e._1 = 49] = `_1`, e[e._2 = 50] = `_2`, e[e._3 = 51] = `_3`, e[e._4 = 52] = `_4`, e[e._5 = 53] = `_5`, e[e._6 = 54] = `_6`, e[e._7 = 55] = `_7`, e[e._8 = 56] = `_8`, e[e._9 = 57] = `_9`, e[e.a = 97] = `a`, e[e.b = 98] = `b`, e[e.c = 99] = `c`, e[e.d = 100] = `d`, e[e.e = 101] = `e`, e[e.f = 102] = `f`, e[e.g = 103] = `g`, e[e.h = 104] = `h`, e[e.i = 105] = `i`, e[e.j = 106] = `j`, e[e.k = 107] = `k`, e[e.l = 108] = `l`, e[e.m = 109] = `m`, e[e.n = 110] = `n`, e[e.o = 111] = `o`, e[e.p = 112] = `p`, e[e.q = 113] = `q`, e[e.r = 114] = `r`, e[e.s = 115] = `s`, e[e.t = 116] = `t`, e[e.u = 117] = `u`, e[e.v = 118] = `v`, e[e.w = 119] = `w`, e[e.x = 120] = `x`, e[e.y = 121] = `y`, e[e.z = 122] = `z`, e[e.A = 65] = `A`, e[e.B = 66] = `B`, e[e.C = 67] = `C`, e[e.D = 68] = `D`, e[e.E = 69] = `E`, e[e.F = 70] = `F`, e[e.G = 71] = `G`, e[e.H = 72] = `H`, e[e.I = 73] = `I`, e[e.J = 74] = `J`, e[e.K = 75] = `K`, e[e.L = 76] = `L`, e[e.M = 77] = `M`, e[e.N = 78] = `N`, e[e.O = 79] = `O`, e[e.P = 80] = `P`, e[e.Q = 81] = `Q`, e[e.R = 82] = `R`, e[e.S = 83] = `S`, e[e.T = 84] = `T`, e[e.U = 85] = `U`, e[e.V = 86] = `V`, e[e.W = 87] = `W`, e[e.X = 88] = `X`, e[e.Y = 89] = `Y`, e[e.Z = 90] = `Z`, e[e.asterisk = 42] = `asterisk`, e[e.backslash = 92] = `backslash`, e[e.closeBrace = 125] = `closeBrace`, e[e.closeBracket = 93] = `closeBracket`, e[e.colon = 58] = `colon`, e[e.comma = 44] = `comma`, e[e.dot = 46] = `dot`, e[e.doubleQuote = 34] = `doubleQuote`, e[e.minus = 45] = `minus`, e[e.openBrace = 123] = `openBrace`, e[e.openBracket = 91] = `openBracket`, e[e.plus = 43] = `plus`, e[e.slash = 47] = `slash`, e[e.formFeed = 12] = `formFeed`, e[e.tab = 9] = `tab`;
})(i$3 ||= {}), Array(20).fill(0).map((e, t) => ` `.repeat(t)), Array(200).fill(0).map((e, t) => `
` + ` `.repeat(t)), Array(200).fill(0).map((e, t) => `\r` + ` `.repeat(t)), Array(200).fill(0).map((e, t) => `\r
` + ` `.repeat(t)), Array(200).fill(0).map((e, t) => `
` + `	`.repeat(t)), Array(200).fill(0).map((e, t) => `\r` + `	`.repeat(t)), Array(200).fill(0).map((e, t) => `\r
` + `	`.repeat(t));
var a$2;
(function(e) {
	e.DEFAULT = { allowTrailingComma: !1 };
})(a$2 ||= {});
function o$2(e, t = [], n = a$2.DEFAULT) {
	let r = null, i = [], o = [];
	function s(e) {
		Array.isArray(i) ? i.push(e) : r !== null && (i[r] = e);
	}
	return d$1(e, {
		onObjectBegin: () => {
			let e = {};
			s(e), o.push(i), i = e, r = null;
		},
		onObjectProperty: (e) => {
			r = e;
		},
		onObjectEnd: () => {
			i = o.pop();
		},
		onArrayBegin: () => {
			let e = [];
			s(e), o.push(i), i = e, r = null;
		},
		onArrayEnd: () => {
			i = o.pop();
		},
		onLiteralValue: s,
		onError: (e, n, r) => {
			t.push({
				error: e,
				offset: n,
				length: r
			});
		}
	}, n), i[0];
}
function d$1(t, n, r = a$2.DEFAULT) {
	let i = e$2(t, !1), o = [], s = 0;
	function c(e) {
		return e ? () => s === 0 && e(i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter()) : () => !0;
	}
	function l(e) {
		return e ? (t) => s === 0 && e(t, i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter()) : () => !0;
	}
	function u(e) {
		return e ? (t) => s === 0 && e(t, i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter(), () => o.slice()) : () => !0;
	}
	function d(e) {
		return e ? () => {
			s > 0 ? s++ : e(i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter(), () => o.slice()) === !1 && (s = 1);
		} : () => !0;
	}
	function f(e) {
		return e ? () => {
			s > 0 && s--, s === 0 && e(i.getTokenOffset(), i.getTokenLength(), i.getTokenStartLine(), i.getTokenStartCharacter());
		} : () => !0;
	}
	let p = d(n.onObjectBegin), m = u(n.onObjectProperty), h = f(n.onObjectEnd), g = d(n.onArrayBegin), _ = f(n.onArrayEnd), v = u(n.onLiteralValue), y = l(n.onSeparator), b = c(n.onComment), x = l(n.onError), S = r && r.disallowComments, C = r && r.allowTrailingComma;
	function w() {
		for (;;) {
			let e = i.scan();
			switch (i.getTokenError()) {
				case 4:
					T(14);
					break;
				case 5:
					T(15);
					break;
				case 3:
					T(13);
					break;
				case 1:
					S || T(11);
					break;
				case 2:
					T(12);
					break;
				case 6: T(16);
			}
			switch (e) {
				case 12:
				case 13:
					S ? T(10) : b();
					break;
				case 16:
					T(1);
					break;
				case 15:
				case 14: break;
				default: return e;
			}
		}
	}
	function T(e, t = [], n = []) {
		if (x(e), t.length + n.length > 0) {
			let e = i.getToken();
			for (; e !== 17;) {
				if (t.indexOf(e) !== -1) {
					w();
					break;
				} else if (n.indexOf(e) !== -1) break;
				e = w();
			}
		}
	}
	function E(e) {
		let t = i.getTokenValue();
		return e ? v(t) : (m(t), o.push(t)), w(), !0;
	}
	function D() {
		switch (i.getToken()) {
			case 11:
				let e = i.getTokenValue(), t = Number(e);
				isNaN(t) && (T(2), t = 0), v(t);
				break;
			case 7:
				v(null);
				break;
			case 8:
				v(!0);
				break;
			case 9:
				v(!1);
				break;
			default: return !1;
		}
		return w(), !0;
	}
	function O() {
		return i.getToken() === 10 ? (E(!1), i.getToken() === 6 ? (y(`:`), w(), j() || T(4, [], [2, 5])) : T(5, [], [2, 5]), o.pop(), !0) : (T(3, [], [2, 5]), !1);
	}
	function k() {
		p(), w();
		let e = !1;
		for (; i.getToken() !== 2 && i.getToken() !== 17;) {
			if (i.getToken() === 5) {
				if (e || T(4, [], []), y(`,`), w(), i.getToken() === 2 && C) break;
			} else e && T(6, [], []);
			O() || T(4, [], [2, 5]), e = !0;
		}
		return h(), i.getToken() === 2 ? w() : T(7, [2], []), !0;
	}
	function A() {
		g(), w();
		let e = !0, t = !1;
		for (; i.getToken() !== 4 && i.getToken() !== 17;) {
			if (i.getToken() === 5) {
				if (t || T(4, [], []), y(`,`), w(), i.getToken() === 4 && C) break;
			} else t && T(6, [], []);
			e ? (o.push(0), e = !1) : o[o.length - 1]++, j() || T(4, [], [4, 5]), t = !0;
		}
		return _(), e || o.pop(), i.getToken() === 4 ? w() : T(8, [4], []), !0;
	}
	function j() {
		switch (i.getToken()) {
			case 3: return A();
			case 1: return k();
			case 10: return E(!0);
			default: return D();
		}
	}
	return w(), i.getToken() === 17 ? r.allowEmptyContent ? !0 : (T(4, [], []), !1) : j() ? (i.getToken() !== 17 && T(9, [], []), !0) : (T(4, [], []), !1);
}
var f$1;
(function(e) {
	e[e.None = 0] = `None`, e[e.UnexpectedEndOfComment = 1] = `UnexpectedEndOfComment`, e[e.UnexpectedEndOfString = 2] = `UnexpectedEndOfString`, e[e.UnexpectedEndOfNumber = 3] = `UnexpectedEndOfNumber`, e[e.InvalidUnicode = 4] = `InvalidUnicode`, e[e.InvalidEscapeCharacter = 5] = `InvalidEscapeCharacter`, e[e.InvalidCharacter = 6] = `InvalidCharacter`;
})(f$1 ||= {});
var p$1;
(function(e) {
	e[e.OpenBraceToken = 1] = `OpenBraceToken`, e[e.CloseBraceToken = 2] = `CloseBraceToken`, e[e.OpenBracketToken = 3] = `OpenBracketToken`, e[e.CloseBracketToken = 4] = `CloseBracketToken`, e[e.CommaToken = 5] = `CommaToken`, e[e.ColonToken = 6] = `ColonToken`, e[e.NullKeyword = 7] = `NullKeyword`, e[e.TrueKeyword = 8] = `TrueKeyword`, e[e.FalseKeyword = 9] = `FalseKeyword`, e[e.StringLiteral = 10] = `StringLiteral`, e[e.NumericLiteral = 11] = `NumericLiteral`, e[e.LineCommentTrivia = 12] = `LineCommentTrivia`, e[e.BlockCommentTrivia = 13] = `BlockCommentTrivia`, e[e.LineBreakTrivia = 14] = `LineBreakTrivia`, e[e.Trivia = 15] = `Trivia`, e[e.Unknown = 16] = `Unknown`, e[e.EOF = 17] = `EOF`;
})(p$1 ||= {});
const m$1 = o$2;
var h$1;
(function(e) {
	e[e.InvalidSymbol = 1] = `InvalidSymbol`, e[e.InvalidNumberFormat = 2] = `InvalidNumberFormat`, e[e.PropertyNameExpected = 3] = `PropertyNameExpected`, e[e.ValueExpected = 4] = `ValueExpected`, e[e.ColonExpected = 5] = `ColonExpected`, e[e.CommaExpected = 6] = `CommaExpected`, e[e.CloseBraceExpected = 7] = `CloseBraceExpected`, e[e.CloseBracketExpected = 8] = `CloseBracketExpected`, e[e.EndOfFileExpected = 9] = `EndOfFileExpected`, e[e.InvalidCommentToken = 10] = `InvalidCommentToken`, e[e.UnexpectedEndOfComment = 11] = `UnexpectedEndOfComment`, e[e.UnexpectedEndOfString = 12] = `UnexpectedEndOfString`, e[e.UnexpectedEndOfNumber = 13] = `UnexpectedEndOfNumber`, e[e.InvalidUnicode = 14] = `InvalidUnicode`, e[e.InvalidEscapeCharacter = 15] = `InvalidEscapeCharacter`, e[e.InvalidCharacter = 16] = `InvalidCharacter`;
})(h$1 ||= {});

//#endregion
//#region node_modules/confbox/dist/jsonc.mjs
function r$2(n, r) {
	let i = m$1(n, r?.errors, r);
	return a$4(n, i, r), i;
}

//#endregion
//#region node_modules/confbox/dist/_chunks/libs/smol-toml.mjs
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function e$1(e, t) {
	let n = e.slice(0, t).split(/\r\n|\n|\r/g);
	return [n.length, n.pop().length + 1];
}
function t$1(e, t, n) {
	let r = e.split(/\r\n|\n|\r/g), i = ``, a = (Math.log10(t + 1) | 0) + 1;
	for (let e = t - 1; e <= t + 1; e++) {
		let o = r[e - 1];
		o && (i += e.toString().padEnd(a, ` `), i += `:  `, i += o, i += `
`, e === t && (i += ` `.repeat(a + n + 2), i += `^
`));
	}
	return i;
}
var n$1 = class extends Error {
	line;
	column;
	codeblock;
	constructor(n, r) {
		let [i, a] = e$1(r.toml, r.ptr), o = t$1(r.toml, i, a);
		super(`Invalid TOML document: ${n}\n\n${o}`, r), this.line = i, this.column = a, this.codeblock = o;
	}
};
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function r$1(e, t) {
	let n = 0;
	for (; e[t - ++n] === `\\`;);
	return --n && n % 2;
}
function i$2(e, t = 0, n = e.length) {
	let r = e.indexOf(`
`, t);
	return e[r - 1] === `\r` && r--, r <= n ? r : -1;
}
function a$1(e, t) {
	for (let r = t; r < e.length; r++) {
		let i = e[r];
		if (i === `
`) return r;
		if (i === `\r` && e[r + 1] === `
`) return r + 1;
		if (i < ` ` && i !== `	` || i === ``) throw new n$1(`control characters are not allowed in comments`, {
			toml: e,
			ptr: t
		});
	}
	return e.length;
}
function o$1(e, t, n, r) {
	let i;
	for (; (i = e[t]) === ` ` || i === `	` || !n && (i === `
` || i === `\r` && e[t + 1] === `
`);) t++;
	return r || i !== `#` ? t : o$1(e, a$1(e, t), n);
}
function s$1(e, t, r, a, o = !1) {
	if (!a) return t = i$2(e, t), t < 0 ? e.length : t;
	for (let n = t; n < e.length; n++) {
		let t = e[n];
		if (t === `#`) n = i$2(e, n);
		else if (t === r) return n + 1;
		else if (t === a || o && (t === `
` || t === `\r` && e[n + 1] === `
`)) return n;
	}
	throw new n$1(`cannot find end of structure`, {
		toml: e,
		ptr: t
	});
}
function c$1(e, t) {
	let n = e[t], i = n === e[t + 1] && e[t + 1] === e[t + 2] ? e.slice(t, t + 3) : n;
	t += i.length - 1;
	do
		t = e.indexOf(i, ++t);
	while (t > -1 && n !== `'` && r$1(e, t));
	return t > -1 && (t += i.length, i.length > 1 && (e[t] === n && t++, e[t] === n && t++)), t;
}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
let l = /^(\d{4}-\d{2}-\d{2})?[T ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|[-+]\d{2}:\d{2})?$/i;
var u = class e extends Date {
	#e = !1;
	#t = !1;
	#n = null;
	constructor(e) {
		let t = !0, n = !0, r = `Z`;
		if (typeof e == `string`) {
			let i = e.match(l);
			i ? (i[1] || (t = !1, e = `0000-01-01T${e}`), n = !!i[2], n && e[10] === ` ` && (e = e.replace(` `, `T`)), i[2] && +i[2] > 23 ? e = `` : (r = i[3] || null, e = e.toUpperCase(), !r && n && (e += `Z`))) : e = ``;
		}
		super(e), isNaN(this.getTime()) || (this.#e = t, this.#t = n, this.#n = r);
	}
	isDateTime() {
		return this.#e && this.#t;
	}
	isLocal() {
		return !this.#e || !this.#t || !this.#n;
	}
	isDate() {
		return this.#e && !this.#t;
	}
	isTime() {
		return this.#t && !this.#e;
	}
	isValid() {
		return this.#e || this.#t;
	}
	toISOString() {
		let e = super.toISOString();
		if (this.isDate()) return e.slice(0, 10);
		if (this.isTime()) return e.slice(11, 23);
		if (this.#n === null) return e.slice(0, -1);
		if (this.#n === `Z`) return e;
		let t = this.#n.slice(1, 3) * 60 + +this.#n.slice(4, 6);
		return t = this.#n[0] === `-` ? t : -t, (/* @__PURE__ */ new Date(this.getTime() - t * 6e4)).toISOString().slice(0, -1) + this.#n;
	}
	static wrapAsOffsetDateTime(t, n = `Z`) {
		let r = new e(t);
		return r.#n = n, r;
	}
	static wrapAsLocalDateTime(t) {
		let n = new e(t);
		return n.#n = null, n;
	}
	static wrapAsLocalDate(t) {
		let n = new e(t);
		return n.#t = !1, n.#n = null, n;
	}
	static wrapAsLocalTime(t) {
		let n = new e(t);
		return n.#e = !1, n.#n = null, n;
	}
};
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
let d = /^((0x[0-9a-fA-F](_?[0-9a-fA-F])*)|(([+-]|0[ob])?\d(_?\d)*))$/;
let f = /^[+-]?\d(_?\d)*(\.\d(_?\d)*)?([eE][+-]?\d(_?\d)*)?$/;
let p = /^[+-]?0[0-9_]/;
let m = /^[0-9a-f]{2,8}$/i;
let h = {
	b: `\b`,
	t: `	`,
	n: `
`,
	f: `\f`,
	r: `\r`,
	e: `\x1B`,
	"\"": `"`,
	"\\": `\\`
};
function g(e, t = 0, r = e.length) {
	let i = e[t] === `'`, a = e[t++] === e[t] && e[t] === e[t + 1];
	a && (r -= 2, e[t += 2] === `\r` && t++, e[t] === `
` && t++);
	let s = 0, c, l = ``, u = t;
	for (; t < r - 1;) {
		let r = e[t++];
		if (r === `
` || r === `\r` && e[t] === `
`) {
			if (!a) throw new n$1(`newlines are not allowed in strings`, {
				toml: e,
				ptr: t - 1
			});
		} else if (r < ` ` && r !== `	` || r === ``) throw new n$1(`control characters are not allowed in strings`, {
			toml: e,
			ptr: t - 1
		});
		if (c) {
			if (c = !1, r === `x` || r === `u` || r === `U`) {
				let i = e.slice(t, t += r === `x` ? 2 : r === `u` ? 4 : 8);
				if (!m.test(i)) throw new n$1(`invalid unicode escape`, {
					toml: e,
					ptr: s
				});
				try {
					l += String.fromCodePoint(parseInt(i, 16));
				} catch {
					throw new n$1(`invalid unicode escape`, {
						toml: e,
						ptr: s
					});
				}
			} else if (a && (r === `
` || r === ` ` || r === `	` || r === `\r`)) {
				if (t = o$1(e, t - 1, !0), e[t] !== `
` && e[t] !== `\r`) throw new n$1(`invalid escape: only line-ending whitespace may be escaped`, {
					toml: e,
					ptr: s
				});
				t = o$1(e, t);
			} else if (r in h) l += h[r];
			else throw new n$1(`unrecognized escape sequence`, {
				toml: e,
				ptr: s
			});
			u = t;
		} else !i && r === `\\` && (s = t - 1, c = !0, l += e.slice(u, s));
	}
	return l + e.slice(u, r - 1);
}
function _(e, t, r, i) {
	if (e === `true`) return !0;
	if (e === `false`) return !1;
	if (e === `-inf`) return -1 / 0;
	if (e === `inf` || e === `+inf`) return 1 / 0;
	if (e === `nan` || e === `+nan` || e === `-nan`) return NaN;
	if (e === `-0`) return i ? 0n : 0;
	let a = d.test(e);
	if (a || f.test(e)) {
		if (p.test(e)) throw new n$1(`leading zeroes are not allowed`, {
			toml: t,
			ptr: r
		});
		e = e.replace(/_/g, ``);
		let o = +e;
		if (isNaN(o)) throw new n$1(`invalid number`, {
			toml: t,
			ptr: r
		});
		if (a) {
			if ((a = !Number.isSafeInteger(o)) && !i) throw new n$1(`integer value cannot be represented losslessly`, {
				toml: t,
				ptr: r
			});
			(a || i === !0) && (o = BigInt(e));
		}
		return o;
	}
	let o = new u(e);
	if (!o.isValid()) throw new n$1(`invalid value`, {
		toml: t,
		ptr: r
	});
	return o;
}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function v(e, t, n) {
	let r = e.slice(t, n), i = r.indexOf(`#`);
	return i > -1 && (a$1(e, i), r = r.slice(0, i)), [r.trimEnd(), i];
}
function y(e, t, r, i, a) {
	if (i === 0) throw new n$1(`document contains excessively nested structures. aborting.`, {
		toml: e,
		ptr: t
	});
	let l = e[t];
	if (l === `[` || l === `{`) {
		let [s, c] = l === `[` ? C(e, t, i, a) : S(e, t, i, a);
		if (r) {
			if (c = o$1(e, c), e[c] === `,`) c++;
			else if (e[c] !== r) throw new n$1(`expected comma or end of structure`, {
				toml: e,
				ptr: c
			});
		}
		return [s, c];
	}
	let u;
	if (l === `"` || l === `'`) {
		u = c$1(e, t);
		let i = g(e, t, u);
		if (r) {
			if (u = o$1(e, u), e[u] && e[u] !== `,` && e[u] !== r && e[u] !== `
` && e[u] !== `\r`) throw new n$1(`unexpected character encountered`, {
				toml: e,
				ptr: u
			});
			u += +(e[u] === `,`);
		}
		return [i, u];
	}
	u = s$1(e, t, `,`, r);
	let d = v(e, t, u - +(e[u - 1] === `,`));
	if (!d[0]) throw new n$1(`incomplete key-value declaration: no value specified`, {
		toml: e,
		ptr: t
	});
	return r && d[1] > -1 && (u = o$1(e, t + d[1]), u += +(e[u] === `,`)), [_(d[0], e, t, a), u];
}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
let b = /^[a-zA-Z0-9-_]+[ \t]*$/;
function x(e, t, r = `=`) {
	let a = t - 1, s = [], l = e.indexOf(r, t);
	if (l < 0) throw new n$1(`incomplete key-value: cannot find end of key`, {
		toml: e,
		ptr: t
	});
	do {
		let o = e[t = ++a];
		if (o !== ` ` && o !== `	`) if (o === `"` || o === `'`) {
			if (o === e[t + 1] && o === e[t + 2]) throw new n$1(`multiline strings are not allowed in keys`, {
				toml: e,
				ptr: t
			});
			let u = c$1(e, t);
			if (u < 0) throw new n$1(`unfinished string encountered`, {
				toml: e,
				ptr: t
			});
			a = e.indexOf(`.`, u);
			let d = e.slice(u, a < 0 || a > l ? l : a), f = i$2(d);
			if (f > -1) throw new n$1(`newlines are not allowed in keys`, {
				toml: e,
				ptr: t + a + f
			});
			if (d.trimStart()) throw new n$1(`found extra tokens after the string part`, {
				toml: e,
				ptr: u
			});
			if (l < u && (l = e.indexOf(r, u), l < 0)) throw new n$1(`incomplete key-value: cannot find end of key`, {
				toml: e,
				ptr: t
			});
			s.push(g(e, t, u));
		} else {
			a = e.indexOf(`.`, t);
			let r = e.slice(t, a < 0 || a > l ? l : a);
			if (!b.test(r)) throw new n$1(`only letter, numbers, dashes and underscores are allowed in keys`, {
				toml: e,
				ptr: t
			});
			s.push(r.trimEnd());
		}
	} while (a + 1 && a < l);
	return [s, o$1(e, l + 1, !0, !0)];
}
function S(e, t, r, i) {
	let o = {}, s = /* @__PURE__ */ new Set(), c;
	for (t++; (c = e[t++]) !== `}` && c;) if (c === `,`) throw new n$1(`expected value, found comma`, {
		toml: e,
		ptr: t - 1
	});
	else if (c === `#`) t = a$1(e, t);
	else if (c !== ` ` && c !== `	` && c !== `
` && c !== `\r`) {
		let a, c = o, l = !1, [u, d] = x(e, t - 1);
		for (let r = 0; r < u.length; r++) {
			if (r && (c = l ? c[a] : c[a] = {}), a = u[r], (l = Object.hasOwn(c, a)) && (typeof c[a] != `object` || s.has(c[a]))) throw new n$1(`trying to redefine an already defined value`, {
				toml: e,
				ptr: t
			});
			!l && a === `__proto__` && Object.defineProperty(c, a, {
				enumerable: !0,
				configurable: !0,
				writable: !0
			});
		}
		if (l) throw new n$1(`trying to redefine an already defined value`, {
			toml: e,
			ptr: t
		});
		let [f, p] = y(e, d, `}`, r - 1, i);
		s.add(f), c[a] = f, t = p;
	}
	if (!c) throw new n$1(`unfinished table encountered`, {
		toml: e,
		ptr: t
	});
	return [o, t];
}
function C(e, t, r, i) {
	let o = [], s;
	for (t++; (s = e[t++]) !== `]` && s;) if (s === `,`) throw new n$1(`expected value, found comma`, {
		toml: e,
		ptr: t - 1
	});
	else if (s === `#`) t = a$1(e, t);
	else if (s !== ` ` && s !== `	` && s !== `
` && s !== `\r`) {
		let n = y(e, t - 1, `]`, r - 1, i);
		o.push(n[0]), t = n[1];
	}
	if (!s) throw new n$1(`unfinished array encountered`, {
		toml: e,
		ptr: t
	});
	return [o, t];
}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function w(e, t, n, r) {
	let i = t, a = n, o, s = !1, c;
	for (let t = 0; t < e.length; t++) {
		if (t) {
			if (i = s ? i[o] : i[o] = {}, a = (c = a[o]).c, r === 0 && (c.t === 1 || c.t === 2)) return null;
			if (c.t === 2) {
				let e = i.length - 1;
				i = i[e], a = a[e].c;
			}
		}
		if (o = e[t], (s = Object.hasOwn(i, o)) && a[o]?.t === 0 && a[o]?.d) return null;
		s || (o === `__proto__` && (Object.defineProperty(i, o, {
			enumerable: !0,
			configurable: !0,
			writable: !0
		}), Object.defineProperty(a, o, {
			enumerable: !0,
			configurable: !0,
			writable: !0
		})), a[o] = {
			t: t < e.length - 1 && r === 2 ? 3 : r,
			d: !1,
			i: 0,
			c: {}
		});
	}
	if (c = a[o], c.t !== r && !(r === 1 && c.t === 3) || (r === 2 && (c.d || (c.d = !0, i[o] = []), i[o].push(i = {}), c.c[c.i++] = c = {
		t: 1,
		d: !1,
		i: 0,
		c: {}
	}), c.d)) return null;
	if (c.d = !0, r === 1) i = s ? i[o] : i[o] = {};
	else if (r === 0 && s) return null;
	return [
		o,
		i,
		c.c
	];
}
function T(e, { maxDepth: t = 1e3, integersAsBigInt: r } = {}) {
	let i = {}, a = {}, s = i, c = a;
	for (let l = o$1(e, 0); l < e.length;) {
		if (e[l] === `[`) {
			let t = e[++l] === `[`, r = x(e, l += +t, `]`);
			if (t) {
				if (e[r[1] - 1] !== `]`) throw new n$1(`expected end of table declaration`, {
					toml: e,
					ptr: r[1] - 1
				});
				r[1]++;
			}
			let o = w(r[0], i, a, t ? 2 : 1);
			if (!o) throw new n$1(`trying to redefine an already defined table or value`, {
				toml: e,
				ptr: l
			});
			c = o[2], s = o[1], l = r[1];
		} else {
			let i = x(e, l), a = w(i[0], s, c, 0);
			if (!a) throw new n$1(`trying to redefine an already defined table or value`, {
				toml: e,
				ptr: l
			});
			let o = y(e, i[1], void 0, t, r);
			a[1][a[0]] = o[0], l = o[1];
		}
		if (l = o$1(e, l, !0), e[l] && e[l] !== `
` && e[l] !== `\r`) throw new n$1(`each key-value declaration must be followed by an end-of-line`, {
			toml: e,
			ptr: l
		});
		l = o$1(e, l);
	}
	return i;
}
/*!
* Copyright (c) Squirrel Chat et al., All rights reserved.
* SPDX-License-Identifier: BSD-3-Clause
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
* 3. Neither the name of the copyright holder nor the names of its contributors
*    may be used to endorse or promote products derived from this software without
*    specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

//#endregion
//#region node_modules/confbox/dist/toml.mjs
function i$1(t) {
	let r = T(t);
	return a$4(t, r, { preserveIndentation: !1 }), r;
}

//#endregion
//#region src/loaders.ts
/**
* `printParseErrorCode`, restated. confbox hands `errors` straight through to
* `jsonc-parser` but re-exports neither the `ParseErrorCode` enum nor the
* function that names its members, so a raw `error: 4` is all that survives.
* The codes are part of `jsonc-parser`'s public API and have not moved since
* the parser was published.
*/
const parseErrorNames = {
	1: "InvalidSymbol",
	2: "InvalidNumberFormat",
	3: "PropertyNameExpected",
	4: "ValueExpected",
	5: "ColonExpected",
	6: "CommaExpected",
	7: "CloseBraceExpected",
	8: "CloseBracketExpected",
	9: "EndOfFileExpected",
	10: "InvalidCommentToken",
	11: "UnexpectedEndOfComment",
	12: "UnexpectedEndOfString",
	13: "UnexpectedEndOfNumber",
	14: "InvalidUnicode",
	15: "InvalidEscapeCharacter",
	16: "InvalidCharacter"
};
function rethrow(format, filePath, error) {
	if (error instanceof Error) error.message = `${format} Error in ${filePath}:\n${error.message}`;
	throw error;
}
/**
* Unwraps `export default`. A transpiled ES module arrives as `{ default: … }`,
* while `module.exports =` and `export =` arrive as the target itself — and a
* build file has no legitimate `default` key of its own to confuse this.
*
* jiti's `interopDefault` does not cover this: it leaves the wrapper in place
* for the modules it hands back here.
*/
function unwrapDefault(module) {
	return module && "default" in module ? module.default : module;
}
/** Whether a failed `require` was really an ES module being fed to a CommonJS loader. */
function isEsmFailure(error) {
	if (error?.code === "ERR_REQUIRE_ESM") return true;
	return error instanceof SyntaxError && /Unexpected token '(export|import)'|Cannot use import statement/.test(error.message);
}
/**
* Renders a JSONC parse error the way the other parsers phrase theirs: what
* went wrong, and where. The parser reports a byte offset, so the line and
* column have to be counted out of the source.
*/
function describe(error, content) {
	const upToError = content.slice(0, error.offset);
	const line = upToError.split("\n").length;
	const column = error.offset - (upToError.lastIndexOf("\n") + 1) + 1;
	return `${parseErrorNames[error.error] ?? "<unknown ParseErrorCode>"} at line ${line}, column ${column}`;
}
/**
* Both caches are off for the reason the `javascript` loader clears
* `require.cache`: jiti memoises by resolved path in memory and writes
* transpiled output to disk, either of which would keep serving an edited build
* file's previous contents — and a refresh is precisely when it must be re-read.
*/
const jiti$1 = (0, jiti.createJiti)("", {
	interopDefault: true,
	moduleCache: false,
	fsCache: false
});
const loaders = {
	javascript(filePath) {
		try {
			delete require.cache[require.resolve(filePath)];
		} catch {}
		try {
			return unwrapDefault(require(filePath));
		} catch (error) {
			if (isEsmFailure(error)) rethrow("JavaScript", filePath, /* @__PURE__ */ new SyntaxError("ES module syntax is not supported in a build file. Use `module.exports` instead, or move the configuration to a `.json`, `.toml` or `.yaml` file."));
			rethrow("JavaScript", filePath, error);
		}
	},
	json5(filePath, content) {
		try {
			return s$2(content);
		} catch (error) {
			rethrow("JSON5", filePath, error);
		}
	},
	jsonc(filePath, content) {
		const errors = [];
		const result = r$2(content, {
			errors,
			allowTrailingComma: true
		});
		if (errors.length) rethrow("JSONC", filePath, new SyntaxError(errors.map((error) => describe(error, content)).join("\n")));
		return result;
	},
	pkl(filePath) {
		return (0, cosmiconfig_loader_pkl.pklLoader)(filePath).catch((error) => rethrow("Pkl", filePath, error));
	},
	toml(filePath, content) {
		try {
			return i$1(content);
		} catch (error) {
			rethrow("TOML", filePath, error);
		}
	},
	transpiled(filePath) {
		try {
			return unwrapDefault(jiti$1(filePath));
		} catch (error) {
			rethrow(path.default.extname(filePath).endsWith("js") ? "JavaScript" : "TypeScript", filePath, error);
		}
	}
};

//#endregion
//#region src/atom-build.ts
const explorer = (0, cosmiconfig.cosmiconfig)(name, {
	searchPlaces: [...buildFileNames],
	cache: false,
	loaders: {
		".cjs": loaders.javascript,
		".js": loaders.javascript,
		".mjs": loaders.transpiled,
		".ts": loaders.transpiled,
		".cts": loaders.transpiled,
		".mts": loaders.transpiled,
		".toml": loaders.toml,
		".json": loaders.jsonc,
		".json5": loaders.json5,
		".jsonc": loaders.jsonc,
		".pkl": loaders.pkl,
		"noExt": loaders.jsonc
	}
});
/**
* Loads one build file. Returns `null` when the file holds no build
* configuration at all — which is the common case for `package.json`, where
* cosmiconfig yields an empty result unless the `buildium` object is present.
* Without this, every project with a `package.json` would gain a phantom target
* whose `exec` is `undefined`.
*/
async function getConfig(file) {
	const realFile = await fs.default.promises.realpath(file);
	const config = (await explorer.load(realFile))?.config;
	if (!config || !config.cmd && !config.targets) return null;
	return config;
}
function createBuildConfig(build, name) {
	const conf = {
		name: `Custom: ${name}`,
		exec: build.cmd,
		env: build.env,
		args: build.args,
		cwd: build.cwd,
		sh: build.sh,
		errorMatch: build.errorMatch,
		functionMatch: build.functionMatch,
		warningMatch: build.warningMatch,
		atomCommandName: build.atomCommandName,
		keymap: build.keymap,
		killSignals: build.killSignals
	};
	if (typeof build.postBuild === "function") conf.postBuild = build.postBuild;
	if (typeof build.preBuild === "function") conf.preBuild = build.preBuild;
	return conf;
}
/**
* The built-in provider: build targets read out of the project's build file.
*
* Watching those files is *not* this class's job — `build-file-watcher.ts`
* covers every candidate name across every project root from one subscription,
* including files that do not exist yet. The `refresh` event stays part of the
* `BuildProvider` contract for third-party providers.
*/
var CustomFile = class extends events.default {
	cwd;
	files = [];
	constructor(cwd) {
		super();
		this.cwd = cwd;
	}
	getNiceName() {
		return "Custom file";
	}
	isEligible() {
		this.files = [...buildFileNames.map((fileName) => path.default.join(this.cwd, fileName)), ...homeBuildFileNames.map((fileName) => path.default.join(os.default.homedir(), fileName))].filter((file) => fs.default.existsSync(file));
		return 0 < this.files.length;
	}
	async settings() {
		const config = [];
		(await Promise.all(this.files.map((file) => getConfig(file)))).forEach((build) => {
			if (!build) return;
			config.push(createBuildConfig(build, build.name || "default"), ...Object.keys(build.targets || {}).map((name) => createBuildConfig(build.targets[name], name)));
		});
		return config;
	}
};

//#endregion
//#region node_modules/@children-of-atom/rosetta/dist/index.js
var e = "// Defaults\n@ui-syntax-color: @syntax-background-color;\n@ui-s-h: hue(@ui-syntax-color);\n@ui-s-s: saturation(@ui-syntax-color);\n@ui-s-l: lightness(@ui-syntax-color);\n@ui-inv: 10%;\n@ui-hue: @ui-s-h;\n@ui-saturation: @ui-s-s;\n@ui-lightness: @ui-s-l;\n@ui-lightness-border: (@ui-s-l * 0.6);\n@ui-fg: @text-color;\n@ui-bg: @base-background-color;\n@ui-border: @base-border-color;\n\n@ui-theme-name: unknown;\n\n// Text\n@text-color-faded: fade(@text-color, 20%);\n@text-color-added: @text-color-success;\n@text-color-ignored: @text-color-subtle;\n@text-color-modified: @text-color-warning;\n@text-color-removed: @text-color-error;\n@text-color-renamed: @text-color-info;\n\n// Background levels\n@level-1-color: lighten(@base-background-color, 6%);\n@level-2-color: @base-background-color;\n@level-3-color: darken(@base-background-color, 3%);\n@level-3-color-hover: lighten(@level-3-color, 6%);\n@level-3-color-active: lighten(@level-3-color, 3%);\n\n// Accent\n@accent-luma: luma(hsl(@ui-hue, 50%, 50%));\n@accent-color: @background-color-info;\n@accent-text-color: contrast(@accent-color);\n@accent-bg-color: @background-color-info;\n@accent-bg-text-color: contrast(@accent-bg-color);\n@accent-only-text-color: @text-color-info;\n\n// Components\n@badge-background-color: @background-color-highlight;\n@button-text-color-selected: @text-color-selected;\n@button-border-color-selected: @button-border-color;\n@checkbox-background-color: @background-color-highlight;\n@input-background-color-focus: @input-background-color;\n@input-selection-color: @background-color-selected;\n@input-selection-color-focus: @background-color-selected;\n@overlay-backdrop-color: @app-background-color;\n@overlay-backdrop-opacity: 0.75;\n@progress-background-color: @accent-color;\n@scrollbar-color-editor: @scrollbar-color;\n@scrollbar-background-color-editor: @ui-syntax-color;\n\n// Tabs\n@tab-text-color: @text-color-subtle;\n@tab-text-color-active: @text-color-highlight;\n@tab-text-color-editor: @text-color-highlight;\n@tab-background-color-editor: @ui-syntax-color;\n@tab-inactive-status-added: fade(@text-color-success, 55%);\n@tab-inactive-status-modified: fade(@text-color-warning, 55%);\n\n// Tooltips\n@tooltip-background-color: @accent-bg-color;\n@tooltip-text-color: @accent-bg-text-color;\n@tooltip-text-key-color: @tooltip-background-color;\n@tooltip-background-key-color: @tooltip-text-color;\n\n// Sizes\n@ui-size: 1em;\n@ui-input-size: (@ui-size * 1.15);\n@ui-padding: (@ui-size * 1.5);\n@ui-padding-pane: (@ui-size * 0.5);\n@ui-padding-icon: (@ui-padding / 3.3);\n@ui-line-height: (@ui-size * 2);\n@ui-tab-height: (@ui-size * 2.5);\n\n// Package overrides\n@settings-list-background-color: darken(@level-2-color, 1.5%);\n@theme-config-box-shadow: none;\n@theme-config-box-shadow-selected: none;\n@theme-config-border-selected: @base-border-color;\n\n@import 'ui-variables';\n\n:root {\n  /* Theme identity */\n  --ui-theme-name: @ui-theme-name;\n\n  /* Color derivation */\n  --ui-syntax-color: @ui-syntax-color;\n  --ui-s-h: @ui-s-h;\n  --ui-s-s: @ui-s-s;\n  --ui-s-l: @ui-s-l;\n  --ui-inv: @ui-inv;\n  --ui-hue: @ui-hue;\n  --ui-saturation: @ui-saturation;\n  --ui-lightness: @ui-lightness;\n  --ui-lightness-border: @ui-lightness-border;\n  --ui-fg: @ui-fg;\n  --ui-bg: @ui-bg;\n  --ui-border: @ui-border;\n\n  /* Text (custom) */\n  --text-color-faded: @text-color-faded;\n  --text-color-added: @text-color-added;\n  --text-color-ignored: @text-color-ignored;\n  --text-color-modified: @text-color-modified;\n  --text-color-removed: @text-color-removed;\n  --text-color-renamed: @text-color-renamed;\n\n  /* Background levels */\n  --level-1-color: @level-1-color;\n  --level-2-color: @level-2-color;\n  --level-3-color: @level-3-color;\n  --level-3-color-hover: @level-3-color-hover;\n  --level-3-color-active: @level-3-color-active;\n\n  /* Accent */\n  --accent-luma: @accent-luma;\n  --accent-color: @accent-color;\n  --accent-text-color: @accent-text-color;\n  --accent-bg-color: @accent-bg-color;\n  --accent-bg-text-color: @accent-bg-text-color;\n  --accent-only-text-color: @accent-only-text-color;\n\n  /* Components (custom) */\n  --badge-background-color: @badge-background-color;\n  --button-text-color-selected: @button-text-color-selected;\n  --button-border-color-selected: @button-border-color-selected;\n  --checkbox-background-color: @checkbox-background-color;\n  --input-background-color-focus: @input-background-color-focus;\n  --input-selection-color: @input-selection-color;\n  --input-selection-color-focus: @input-selection-color-focus;\n  --overlay-backdrop-color: @overlay-backdrop-color;\n  --overlay-backdrop-opacity: @overlay-backdrop-opacity;\n  --progress-background-color: @progress-background-color;\n  --scrollbar-color-editor: @scrollbar-color-editor;\n  --scrollbar-background-color-editor: @scrollbar-background-color-editor;\n\n  /* Tabs (custom) */\n  --tab-text-color: @tab-text-color;\n  --tab-text-color-active: @tab-text-color-active;\n  --tab-text-color-editor: @tab-text-color-editor;\n  --tab-background-color-editor: @tab-background-color-editor;\n  --tab-inactive-status-added: @tab-inactive-status-added;\n  --tab-inactive-status-modified: @tab-inactive-status-modified;\n\n  /* Tooltips */\n  --tooltip-background-color: @tooltip-background-color;\n  --tooltip-text-color: @tooltip-text-color;\n  --tooltip-text-key-color: @tooltip-text-key-color;\n  --tooltip-background-key-color: @tooltip-background-key-color;\n\n  /* Sizes (custom) */\n  --ui-size: @ui-size;\n  --ui-input-size: @ui-input-size;\n  --ui-padding: @ui-padding;\n  --ui-padding-pane: @ui-padding-pane;\n  --ui-padding-icon: @ui-padding-icon;\n  --ui-line-height: @ui-line-height;\n  --ui-tab-height: @ui-tab-height;\n\n  /* Package overrides */\n  --settings-list-background-color: @settings-list-background-color;\n  --theme-config-box-shadow: @theme-config-box-shadow;\n  --theme-config-box-shadow-selected: @theme-config-box-shadow-selected;\n  --theme-config-border-selected: @theme-config-border-selected;\n}\n";
var t = "@import 'ui-variables';\n\n:root {\n  /* Text colors */\n  --text-color: @text-color;\n  --text-color-subtle: @text-color-subtle;\n  --text-color-highlight: @text-color-highlight;\n  --text-color-selected: @text-color-selected;\n  --text-color-info: @text-color-info;\n  --text-color-success: @text-color-success;\n  --text-color-warning: @text-color-warning;\n  --text-color-error: @text-color-error;\n\n  /* Background colors */\n  --background-color-info: @background-color-info;\n  --background-color-success: @background-color-success;\n  --background-color-warning: @background-color-warning;\n  --background-color-error: @background-color-error;\n  --background-color-highlight: @background-color-highlight;\n  --background-color-selected: @background-color-selected;\n  --app-background-color: @app-background-color;\n\n  /* Base colors */\n  --base-background-color: @base-background-color;\n  --base-border-color: @base-border-color;\n\n  /* Component colors */\n  --pane-item-background-color: @pane-item-background-color;\n  --pane-item-border-color: @pane-item-border-color;\n  --input-background-color: @input-background-color;\n  --input-border-color: @input-border-color;\n  --tool-panel-background-color: @tool-panel-background-color;\n  --tool-panel-border-color: @tool-panel-border-color;\n  --inset-panel-background-color: @inset-panel-background-color;\n  --inset-panel-border-color: @inset-panel-border-color;\n  --panel-heading-background-color: @panel-heading-background-color;\n  --panel-heading-border-color: @panel-heading-border-color;\n  --overlay-background-color: @overlay-background-color;\n  --overlay-border-color: @overlay-border-color;\n  --button-background-color: @button-background-color;\n  --button-background-color-hover: @button-background-color-hover;\n  --button-background-color-selected: @button-background-color-selected;\n  --button-border-color: @button-border-color;\n  --tab-bar-background-color: @tab-bar-background-color;\n  --tab-bar-border-color: @tab-bar-border-color;\n  --tab-background-color: @tab-background-color;\n  --tab-background-color-active: @tab-background-color-active;\n  --tab-border-color: @tab-border-color;\n  --tree-view-background-color: @tree-view-background-color;\n  --tree-view-border-color: @tree-view-border-color;\n  --scrollbar-color: @scrollbar-color;\n  --scrollbar-background-color: @scrollbar-background-color;\n\n  /* Site colors */\n  --ui-site-color-1: @ui-site-color-1;\n  --ui-site-color-2: @ui-site-color-2;\n  --ui-site-color-3: @ui-site-color-3;\n  --ui-site-color-4: @ui-site-color-4;\n  --ui-site-color-5: @ui-site-color-5;\n\n  /* Sizes */\n  --font-size: @font-size;\n  --input-font-size: @input-font-size;\n  --disclosure-arrow-size: @disclosure-arrow-size;\n  --component-padding: @component-padding;\n  --component-icon-padding: @component-icon-padding;\n  --component-icon-size: @component-icon-size;\n  --component-line-height: @component-line-height;\n  --component-border-radius: @component-border-radius;\n  --tab-height: @tab-height;\n\n  /* Fonts */\n  --font-family: @font-family;\n}\n";
var n = Symbol.for("@children-of-atom/rosetta");
var r = [{
	sourcePath: "@children-of-atom/rosetta/styles/ui-variables.less",
	source: t
}, {
	sourcePath: "@children-of-atom/rosetta/styles/one-ui.less",
	source: e
}];
function i() {
	let e = globalThis;
	return e[n] ??= {
		consumers: 0,
		styles: [],
		themeSubscription: null,
		priority: 0
	}, e[n];
}
function a() {
	let { lessCache: e } = atom.themes;
	if (!e) throw Error("Atom has not compiled any LESS yet, call this once your package has activated");
	return e;
}
function o(e) {
	let t = a();
	e.styles = r.map(({ sourcePath: n, source: r }) => atom.styles.addStyleSheet(t.cssForFile(n, r), {
		sourcePath: n,
		priority: e.priority
	}));
}
function s(e) {
	for (let t of e.styles) t.dispose();
	e.styles = [], e.themeSubscription?.dispose(), e.themeSubscription = null;
}
function c(e = {}) {
	let t = i();
	t.consumers === 0 && (t.priority = e.priority ?? 0, o(t), t.themeSubscription = atom.themes.onDidChangeActiveThemes(() => o(t))), t.consumers += 1;
	let n = !1;
	return { dispose() {
		n || (n = !0, --t.consumers, t.consumers === 0 && s(t));
	} };
}

//#endregion
//#region src/buildium.ts
var buildium_default = {
	config: config_default.schema,
	disposables: null,
	tools: [],
	targetManager: null,
	buildView: null,
	errorMatcher: null,
	linter: null,
	statusBarView: null,
	saveConfirmView: null,
	busyProvider: null,
	child: null,
	nextBuild: null,
	activate() {
		log_default.log("Activating package");
		this.disposables = new atom$1.CompositeDisposable();
		this.disposables.add(c());
		if (!process.platform.startsWith("win")) process.env.PATH = (process.env.PATH ? `${process.env.PATH}:` : "") + "/usr/local/bin";
		x$1(name).catch((error) => {
			if (error instanceof u$2) return;
			log_default.error(error);
		});
		this.tools = [CustomFile];
		this.linter = null;
		this.setupTargetManager();
		this.setupBuildView();
		this.setupErrorMatcher();
		atom.commands.add("atom-workspace", "buildium:trigger", () => this.build("trigger"));
		atom.commands.add("atom-workspace", "buildium:stop", () => this.stop());
		atom.commands.add("atom-workspace", "buildium:confirm", () => {
			document.activeElement?.click();
		});
		atom.commands.add("atom-workspace", "buildium:no-confirm", () => {
			this.saveConfirmView?.cancel();
		});
		atom.workspace.observeTextEditors((editor) => {
			editor.onDidSave(() => {
				if (config_default.get("buildOnSave")) this.build("save");
			});
		});
		atom.workspace.onDidChangeActivePaneItem(() => this.updateStatusBar());
		if (atom.packages.hasActivatedInitialPackages()) this.targetManager.refreshTargets();
		else atom.packages.onDidActivateInitialPackages(() => this.targetManager.refreshTargets());
	},
	setupTargetManager() {
		this.targetManager = new TargetManager();
		this.targetManager.setTools(this.tools);
		this.targetManager.on("refresh-complete", () => {
			this.updateStatusBar();
		});
		this.targetManager.once("refresh-complete", () => {
			log_default.log("First refresh complete");
			atom.packages.onDidActivatePackage((e) => {
				if (e.name.startsWith("build-") && e.mainModule?.provideBuilder) {
					log_default.log("Activating", e.name);
					this.targetManager.refreshTargets();
				}
			});
			atom.packages.onDidDeactivatePackage((e) => {
				if (e.name.startsWith("build-") && e.mainModule?.provideBuilder) {
					log_default.log("Deactivating", e.name);
					this.targetManager.refreshTargets();
				}
			});
		});
		this.targetManager.on("new-active-target", () => {
			this.updateStatusBar();
			if (config_default.get("selectTriggers")) this.build("trigger");
		});
		this.targetManager.on("trigger", (event) => this.build("trigger", event));
	},
	setupBuildView() {
		this.buildView = new BuildView();
	},
	setupErrorMatcher() {
		this.errorMatcher = new ErrorMatcher();
		this.errorMatcher.on("error", (message) => {
			atom.notifications.addError("Error matching failed!", { detail: message });
		});
		this.errorMatcher.on("matched", (match) => {
			if (match[0]) this.buildView.scrollTo(match[0]);
		});
	},
	deactivate() {
		log_default.log("Deactivating package");
		if (this.child) {
			this.child.removeAllListeners();
			(0, tree_kill.default)(this.child.pid, "SIGKILL");
			this.child = null;
		}
		this.statusBarView?.dispose();
		this.buildView?.destroy();
		this.saveConfirmView?.destroy();
		this.linter?.destroy();
		this.targetManager.destroy();
		this.disposables.dispose();
	},
	updateStatusBar() {
		const path = activePath();
		const activeTarget = this.targetManager.getActiveTarget(path);
		if (this.statusBarView && activeTarget) this.statusBarView.setTarget(activeTarget.name);
	},
	startNewBuild(source, atomCommandName) {
		const path = activePath();
		let buildTitle = "";
		this.linter?.clear();
		Promise.resolve(path ? this.targetManager.getTargets(path) : []).then((targets) => {
			if (!targets || 0 === targets.length) throw new BuildError("No eligible build target.", "No configuration to build this project exists.");
			const target = targets.find((t) => t.atomCommandName === atomCommandName) ?? this.targetManager.getActiveTarget(path);
			if (!target?.exec) throw new BuildError("Invalid build file.", "No executable command specified.");
			this.statusBarView?.buildStarted();
			this.busyProvider?.add(`${capitalizedName()}: ${target.name}`);
			this.buildView.buildStarted();
			this.buildView.setHeading("Running preBuild...");
			return Promise.resolve(target.preBuild ? target.preBuild() : null).then(() => target);
		}).then((target) => {
			const replace$1 = replace;
			const env = {
				...process.env,
				...target.env
			};
			Object.keys(env).forEach((key) => {
				env[key] = replace$1(env[key], target.env);
			});
			const exec = replace$1(target.exec, target.env);
			const args = target.args.map((arg) => replace$1(arg, target.env));
			const cwd = replace$1(target.cwd, target.env);
			const isWin = process.platform === "win32";
			const shCmd = isWin ? "cmd" : "/bin/sh";
			const shCmdArg = isWin ? "/C" : "-c";
			buildTitle = [
				target.sh ? `${shCmd} ${shCmdArg} ${exec}` : exec,
				...args,
				"\n"
			].join(" ");
			this.buildView.setHeading(buildTitle);
			const child = target.sh ? (0, child_process.spawn)(shCmd, [shCmdArg, [exec].concat(args).join(" ")], {
				cwd,
				env,
				stdio: [
					"ignore",
					null,
					null
				]
			}) : (0, cross_spawn.default)(exec, args, {
				cwd,
				env,
				stdio: [
					"ignore",
					null,
					null
				]
			});
			this.child = child;
			let stdout = "";
			let stderr = "";
			child.stdout?.setEncoding("utf8");
			child.stderr?.setEncoding("utf8");
			child.stdout?.on("data", (d) => {
				stdout += d;
				this.buildView.write(d);
			});
			child.stderr?.on("data", (d) => {
				stderr += d;
				this.buildView.write(d);
			});
			child.killSignals = (target.killSignals || [
				"SIGINT",
				"SIGTERM",
				"SIGKILL"
			]).slice();
			child.on("error", (err) => {
				this.buildView.write((target.sh ? "Unable to execute with shell: " : "Unable to execute: ") + exec + "\n");
				if (/\s/.test(exec) && !target.sh) this.buildView.write("`cmd` cannot contain space. Use `args` for arguments.\n");
				if ("ENOENT" === err.code) {
					this.buildView.write(`Make sure cmd:'${exec}' and cwd:'${cwd}' exists and have correct access permissions.\n`);
					this.buildView.write(`Binaries are found in these folders: ${process.env.PATH}\n`);
				}
			});
			child.on("close", (exitCode) => {
				this.child = null;
				this.errorMatcher.set(target, cwd, stdout + stderr);
				let success = 0 === exitCode;
				if (config_default.get("matchedErrorFailsBuild")) success = success && !this.errorMatcher.getMatches().some((match) => match.type?.toLowerCase() === "error");
				this.linter?.processMessages(this.errorMatcher.getMatches(), cwd);
				if (config_default.get("beepWhenDone")) atom.beep();
				this.buildView.setHeading("Running postBuild...");
				return Promise.resolve(target.postBuild ? target.postBuild(success, stdout, stderr) : null).then(() => {
					this.buildView.setHeading(buildTitle);
					this.busyProvider?.remove(`${capitalizedName()}: ${target.name}`, success);
					this.buildView.buildFinished(success);
					this.statusBarView?.setBuildSuccess(success);
					if (!success && config_default.get("scrollOnError")) this.errorMatcher.matchFirst();
					this.nextBuild?.();
					this.nextBuild = null;
				});
			});
		}).catch((err) => {
			if (err instanceof BuildError) {
				if (source === "save") return;
				atom.notifications.addWarning(err.name, {
					detail: err.message,
					stack: err.stack
				});
			} else atom.notifications.addError("Failed to build.", {
				detail: err.message,
				stack: err.stack
			});
		});
	},
	sendNextSignal() {
		try {
			const signal = this.child?.killSignals.shift();
			(0, tree_kill.default)(this.child?.pid, signal);
		} catch {}
	},
	abort(cb) {
		if (this.child && !this.child.killed) {
			this.buildView.buildAbortInitiated();
			this.child.killed = true;
			this.child.on("exit", () => {
				this.child = null;
				cb?.();
			});
		}
		this.sendNextSignal();
	},
	build(source, event) {
		this.doSaveConfirm(this.unsavedTextEditors(), () => {
			const nextBuild = this.startNewBuild.bind(this, source, event ? event.type : null);
			if (this.child) {
				this.nextBuild = nextBuild;
				return this.abort();
			}
			return nextBuild();
		});
	},
	doSaveConfirm(modifiedTextEditors, continuecb, cancelcb) {
		const saveAndContinue = (save) => {
			modifiedTextEditors.forEach((textEditor) => save && textEditor.save());
			continuecb();
		};
		if (0 === modifiedTextEditors.length || config_default.get("saveOnBuild")) {
			saveAndContinue(true);
			return;
		}
		this.saveConfirmView?.destroy();
		this.saveConfirmView = new SaveConfirmView();
		this.saveConfirmView.show(saveAndContinue, cancelcb);
	},
	unsavedTextEditors() {
		return atom.workspace.getTextEditors().filter((textEditor) => {
			return textEditor.isModified() && void 0 !== textEditor.getPath();
		});
	},
	stop() {
		this.nextBuild = null;
		if (this.child) this.abort(() => {
			this.buildView.buildAborted();
			this.statusBarView?.buildAborted();
		});
		else this.buildView.reset();
	},
	consumeLinterIndie(registerIndie) {
		log_default.log("Consuming linter");
		this.linter?.destroy();
		this.linter = new Linter(registerIndie);
	},
	consumeBuilder(builder) {
		log_default.log("Consuming builder");
		if (Array.isArray(builder)) this.tools.push(...builder);
		else this.tools.push(builder);
		this.targetManager.setTools(this.tools);
		return new atom$1.Disposable(() => {
			this.tools = this.tools.filter(Array.isArray(builder) ? (tool) => builder.indexOf(tool) === -1 : (tool) => tool !== builder);
			this.targetManager.setTools(this.tools);
		});
	},
	consumeStatusBar(statusBar) {
		log_default.log("Consuming status-bar");
		this.statusBarView = new StatusBarView(statusBar);
		this.statusBarView.onClick(() => this.targetManager.selectActiveTarget());
		this.updateStatusBar();
	},
	consumeBusySignal(registry) {
		log_default.log("Consuming busy-signal");
		this.busyProvider = registry.create();
		this.targetManager.setBusyProvider(this.busyProvider);
	}
};

//#endregion
module.exports = buildium_default;
//# sourceMappingURL=buildium.js.map