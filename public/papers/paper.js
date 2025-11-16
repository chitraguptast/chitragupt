(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === "childList")
        for (const h of d.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = s(c);
    fetch(c.href, d);
  }
})();
const Eu = [];
let Lm = !0;
const jm = console.error;
function Dh(r) {
  Eu.length > 5 || !Lm || Eu.push(r);
}
function Dm(r) {
  Eu.push({ type: "runtime", args: r });
}
function Um(r) {
  r.preventDefault();
}
function H0(r) {
  try {
    const i = r.find((s) => s instanceof Error);
    if (i && i.stack) Dh({ type: "console.error", args: i });
    else if (r.length > 0) {
      const s = r
          .map((c) => (typeof c == "object" ? JSON.stringify(c) : String(c)))
          .join(" "),
        o = new Error(s);
      Dh({ type: "console.error", args: o });
    }
  } catch (i) {
    console.warn(i);
  }
}
window.addEventListener("error", Dm);
window.addEventListener("unhandledrejection", Um);
console.error = function (...i) {
  H0(i), jm.apply(this, i);
};
function B0() {
  return (
    window.removeEventListener("error", Dm),
    window.removeEventListener("unhandledrejection", Um),
    (console.error = jm),
    (Lm = !1),
    Eu
  );
}
const q0 = 1e3,
  Uh = Symbol("postMessageResponseTimeout");
let gu = 0;
const Ps = "*";
class Ou {
  client;
  baseTimeout;
  waitRes = new Map();
  removeListeners = new Set();
  clear;
  constructor(i, s) {
    (this.client = i), (this.baseTimeout = s?.timeout || q0);
    const o = this.emitResponse.bind(this);
    (this.clear = () => {
      window.removeEventListener("message", o);
    }),
      window.addEventListener("message", o);
  }
  destroy() {
    this.clear(), this.removeListeners.forEach((i) => i());
  }
  isTimeout(i) {
    return i === Uh;
  }
  post(i, s, o) {
    gu++;
    const { timeout: c, origin: d = Ps } = o || {};
    return (
      this.client.postMessage({ data: s, id: gu, type: i }, d),
      new Promise((h) => {
        this.waitRes.set(gu, (m) => {
          h(m);
        }),
          setTimeout(() => {
            this.waitRes.delete(gu), h(Uh);
          }, c || this.baseTimeout);
      })
    );
  }
  on(i, s, o) {
    const { once: c, origin: d = Ps } = o || {},
      h = async (p) => {
        const { id: g, type: v, data: b } = p.data;
        let S;
        v === i &&
          ((S = await s(b)),
          console.log(i, c, S, b),
          ((g && d === p.origin) || d === Ps) &&
            p.source?.postMessage({ fromType: i, id: g, data: S }, p.origin),
          c && m());
      };
    window.addEventListener("message", h);
    const m = () => {
      window.removeEventListener("message", h), this.removeListeners.delete(m);
    };
    return this.removeListeners.add(m), m;
  }
  emitResponse(i) {
    const s = i.data,
      { id: o, data: c } = s,
      d = this.waitRes.get(o);
    d && d(c);
  }
}
function Y0(r) {
  if (Object.prototype.hasOwnProperty.call(r, "__esModule")) return r;
  var i = r.default;
  if (typeof i == "function") {
    var s = function o() {
      var c = !1;
      try {
        c = this instanceof o;
      } catch {}
      return c
        ? Reflect.construct(i, arguments, this.constructor)
        : i.apply(this, arguments);
    };
    s.prototype = i.prototype;
  } else s = {};
  return (
    Object.defineProperty(s, "__esModule", { value: !0 }),
    Object.keys(r).forEach(function (o) {
      var c = Object.getOwnPropertyDescriptor(r, o);
      Object.defineProperty(
        s,
        o,
        c.get
          ? c
          : {
              enumerable: !0,
              get: function () {
                return r[o];
              },
            }
      );
    }),
    s
  );
}
var Ha = {},
  Is = {},
  eo = {},
  to = {},
  Hh;
function G0() {
  if (Hh) return to;
  Hh = 1;
  const r =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
      ""
    );
  return (
    (to.encode = function (i) {
      if (0 <= i && i < r.length) return r[i];
      throw new TypeError("Must be between 0 and 63: " + i);
    }),
    to
  );
}
var Bh;
function Hm() {
  if (Bh) return eo;
  Bh = 1;
  const r = G0(),
    i = 5,
    s = 1 << i,
    o = s - 1,
    c = s;
  function d(h) {
    return h < 0 ? (-h << 1) + 1 : (h << 1) + 0;
  }
  return (
    (eo.encode = function (m) {
      let p = "",
        g,
        v = d(m);
      do (g = v & o), (v >>>= i), v > 0 && (g |= c), (p += r.encode(g));
      while (v > 0);
      return p;
    }),
    eo
  );
}
var Lt = {};
const V0 = {},
  Q0 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: V0 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  X0 = Y0(Q0);
var no, qh;
function Z0() {
  return qh || ((qh = 1), (no = typeof URL == "function" ? URL : X0.URL)), no;
}
var Yh;
function Tu() {
  if (Yh) return Lt;
  Yh = 1;
  const r = Z0();
  function i(V, Z, $) {
    if (Z in V) return V[Z];
    if (arguments.length === 3) return $;
    throw new Error('"' + Z + '" is a required argument.');
  }
  Lt.getArg = i;
  const s = (function () {
    return !("__proto__" in Object.create(null));
  })();
  function o(V) {
    return V;
  }
  function c(V) {
    return h(V) ? "$" + V : V;
  }
  Lt.toSetString = s ? o : c;
  function d(V) {
    return h(V) ? V.slice(1) : V;
  }
  Lt.fromSetString = s ? o : d;
  function h(V) {
    if (!V) return !1;
    const Z = V.length;
    if (
      Z < 9 ||
      V.charCodeAt(Z - 1) !== 95 ||
      V.charCodeAt(Z - 2) !== 95 ||
      V.charCodeAt(Z - 3) !== 111 ||
      V.charCodeAt(Z - 4) !== 116 ||
      V.charCodeAt(Z - 5) !== 111 ||
      V.charCodeAt(Z - 6) !== 114 ||
      V.charCodeAt(Z - 7) !== 112 ||
      V.charCodeAt(Z - 8) !== 95 ||
      V.charCodeAt(Z - 9) !== 95
    )
      return !1;
    for (let $ = Z - 10; $ >= 0; $--) if (V.charCodeAt($) !== 36) return !1;
    return !0;
  }
  function m(V, Z) {
    return V === Z ? 0 : V === null ? 1 : Z === null ? -1 : V > Z ? 1 : -1;
  }
  function p(V, Z) {
    let $ = V.generatedLine - Z.generatedLine;
    return $ !== 0 ||
      (($ = V.generatedColumn - Z.generatedColumn), $ !== 0) ||
      (($ = m(V.source, Z.source)), $ !== 0) ||
      (($ = V.originalLine - Z.originalLine), $ !== 0) ||
      (($ = V.originalColumn - Z.originalColumn), $ !== 0)
      ? $
      : m(V.name, Z.name);
  }
  Lt.compareByGeneratedPositionsInflated = p;
  function g(V) {
    return JSON.parse(V.replace(/^\)]}'[^\n]*\n/, ""));
  }
  Lt.parseSourceMapInput = g;
  const v = "http:",
    b = `${v}//host`;
  function S(V) {
    return (Z) => {
      const $ = L(Z),
        le = z(Z),
        ce = new r(Z, le);
      V(ce);
      const we = ce.toString();
      return $ === "absolute"
        ? we
        : $ === "scheme-relative"
        ? we.slice(v.length)
        : $ === "path-absolute"
        ? we.slice(b.length)
        : U(le, we);
    };
  }
  function x(V, Z) {
    return new r(V, Z).toString();
  }
  function _(V, Z) {
    let $ = 0;
    do {
      const le = V + $++;
      if (Z.indexOf(le) === -1) return le;
    } while (!0);
  }
  function z(V) {
    const Z = V.split("..").length - 1,
      $ = _("p", V);
    let le = `${b}/`;
    for (let ce = 0; ce < Z; ce++) le += `${$}/`;
    return le;
  }
  const O = /^[A-Za-z0-9\+\-\.]+:/;
  function L(V) {
    return V[0] === "/"
      ? V[1] === "/"
        ? "scheme-relative"
        : "path-absolute"
      : O.test(V)
      ? "absolute"
      : "path-relative";
  }
  function U(V, Z) {
    typeof V == "string" && (V = new r(V)),
      typeof Z == "string" && (Z = new r(Z));
    const $ = Z.pathname.split("/"),
      le = V.pathname.split("/");
    for (
      le.length > 0 && !le[le.length - 1] && le.pop();
      $.length > 0 && le.length > 0 && $[0] === le[0];

    )
      $.shift(), le.shift();
    return (
      le
        .map(() => "..")
        .concat($)
        .join("/") +
      Z.search +
      Z.hash
    );
  }
  const Q = S((V) => {
      V.pathname = V.pathname.replace(/\/?$/, "/");
    }),
    P = S((V) => {
      V.href = new r(".", V.toString()).toString();
    }),
    W = S((V) => {});
  Lt.normalize = W;
  function ue(V, Z) {
    const $ = L(Z),
      le = L(V);
    if (((V = Q(V)), $ === "absolute")) return x(Z, void 0);
    if (le === "absolute") return x(Z, V);
    if ($ === "scheme-relative") return W(Z);
    if (le === "scheme-relative") return x(Z, x(V, b)).slice(v.length);
    if ($ === "path-absolute") return W(Z);
    if (le === "path-absolute") return x(Z, x(V, b)).slice(b.length);
    const ce = z(Z + V),
      we = x(Z, x(V, ce));
    return U(ce, we);
  }
  Lt.join = ue;
  function I(V, Z) {
    const $ = Ee(V, Z);
    return typeof $ == "string" ? $ : W(Z);
  }
  Lt.relative = I;
  function Ee(V, Z) {
    if (L(V) !== L(Z)) return null;
    const le = z(V + Z),
      ce = new r(V, le),
      we = new r(Z, le);
    try {
      new r("", we.toString());
    } catch {
      return null;
    }
    return we.protocol !== ce.protocol ||
      we.user !== ce.user ||
      we.password !== ce.password ||
      we.hostname !== ce.hostname ||
      we.port !== ce.port
      ? null
      : U(ce, we);
  }
  function ye(V, Z, $) {
    V && L(Z) === "path-absolute" && (Z = Z.replace(/^\//, ""));
    let le = W(Z || "");
    return V && (le = ue(V, le)), $ && (le = ue(P($), le)), le;
  }
  return (Lt.computeSourceURL = ye), Lt;
}
var lo = {},
  Gh;
function Bm() {
  if (Gh) return lo;
  Gh = 1;
  class r {
    constructor() {
      (this._array = []), (this._set = new Map());
    }
    static fromArray(s, o) {
      const c = new r();
      for (let d = 0, h = s.length; d < h; d++) c.add(s[d], o);
      return c;
    }
    size() {
      return this._set.size;
    }
    add(s, o) {
      const c = this.has(s),
        d = this._array.length;
      (!c || o) && this._array.push(s), c || this._set.set(s, d);
    }
    has(s) {
      return this._set.has(s);
    }
    indexOf(s) {
      const o = this._set.get(s);
      if (o >= 0) return o;
      throw new Error('"' + s + '" is not in the set.');
    }
    at(s) {
      if (s >= 0 && s < this._array.length) return this._array[s];
      throw new Error("No element indexed by " + s);
    }
    toArray() {
      return this._array.slice();
    }
  }
  return (lo.ArraySet = r), lo;
}
var ao = {},
  Vh;
function K0() {
  if (Vh) return ao;
  Vh = 1;
  const r = Tu();
  function i(o, c) {
    const d = o.generatedLine,
      h = c.generatedLine,
      m = o.generatedColumn,
      p = c.generatedColumn;
    return (
      h > d ||
      (h == d && p >= m) ||
      r.compareByGeneratedPositionsInflated(o, c) <= 0
    );
  }
  class s {
    constructor() {
      (this._array = []),
        (this._sorted = !0),
        (this._last = { generatedLine: -1, generatedColumn: 0 });
    }
    unsortedForEach(c, d) {
      this._array.forEach(c, d);
    }
    add(c) {
      i(this._last, c)
        ? ((this._last = c), this._array.push(c))
        : ((this._sorted = !1), this._array.push(c));
    }
    toArray() {
      return (
        this._sorted ||
          (this._array.sort(r.compareByGeneratedPositionsInflated),
          (this._sorted = !0)),
        this._array
      );
    }
  }
  return (ao.MappingList = s), ao;
}
var Qh;
function qm() {
  if (Qh) return Is;
  Qh = 1;
  const r = Hm(),
    i = Tu(),
    s = Bm().ArraySet,
    o = K0().MappingList;
  class c {
    constructor(h) {
      h || (h = {}),
        (this._file = i.getArg(h, "file", null)),
        (this._sourceRoot = i.getArg(h, "sourceRoot", null)),
        (this._skipValidation = i.getArg(h, "skipValidation", !1)),
        (this._sources = new s()),
        (this._names = new s()),
        (this._mappings = new o()),
        (this._sourcesContents = null);
    }
    static fromSourceMap(h) {
      const m = h.sourceRoot,
        p = new c({ file: h.file, sourceRoot: m });
      return (
        h.eachMapping(function (g) {
          const v = {
            generated: { line: g.generatedLine, column: g.generatedColumn },
          };
          g.source != null &&
            ((v.source = g.source),
            m != null && (v.source = i.relative(m, v.source)),
            (v.original = { line: g.originalLine, column: g.originalColumn }),
            g.name != null && (v.name = g.name)),
            p.addMapping(v);
        }),
        h.sources.forEach(function (g) {
          let v = g;
          m != null && (v = i.relative(m, g)),
            p._sources.has(v) || p._sources.add(v);
          const b = h.sourceContentFor(g);
          b != null && p.setSourceContent(g, b);
        }),
        p
      );
    }
    addMapping(h) {
      const m = i.getArg(h, "generated"),
        p = i.getArg(h, "original", null);
      let g = i.getArg(h, "source", null),
        v = i.getArg(h, "name", null);
      this._skipValidation || this._validateMapping(m, p, g, v),
        g != null &&
          ((g = String(g)), this._sources.has(g) || this._sources.add(g)),
        v != null &&
          ((v = String(v)), this._names.has(v) || this._names.add(v)),
        this._mappings.add({
          generatedLine: m.line,
          generatedColumn: m.column,
          originalLine: p && p.line,
          originalColumn: p && p.column,
          source: g,
          name: v,
        });
    }
    setSourceContent(h, m) {
      let p = h;
      this._sourceRoot != null && (p = i.relative(this._sourceRoot, p)),
        m != null
          ? (this._sourcesContents ||
              (this._sourcesContents = Object.create(null)),
            (this._sourcesContents[i.toSetString(p)] = m))
          : this._sourcesContents &&
            (delete this._sourcesContents[i.toSetString(p)],
            Object.keys(this._sourcesContents).length === 0 &&
              (this._sourcesContents = null));
    }
    applySourceMap(h, m, p) {
      let g = m;
      if (m == null) {
        if (h.file == null)
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        g = h.file;
      }
      const v = this._sourceRoot;
      v != null && (g = i.relative(v, g));
      const b = this._mappings.toArray().length > 0 ? new s() : this._sources,
        S = new s();
      this._mappings.unsortedForEach(function (x) {
        if (x.source === g && x.originalLine != null) {
          const O = h.originalPositionFor({
            line: x.originalLine,
            column: x.originalColumn,
          });
          O.source != null &&
            ((x.source = O.source),
            p != null && (x.source = i.join(p, x.source)),
            v != null && (x.source = i.relative(v, x.source)),
            (x.originalLine = O.line),
            (x.originalColumn = O.column),
            O.name != null && (x.name = O.name));
        }
        const _ = x.source;
        _ != null && !b.has(_) && b.add(_);
        const z = x.name;
        z != null && !S.has(z) && S.add(z);
      }, this),
        (this._sources = b),
        (this._names = S),
        h.sources.forEach(function (x) {
          const _ = h.sourceContentFor(x);
          _ != null &&
            (p != null && (x = i.join(p, x)),
            v != null && (x = i.relative(v, x)),
            this.setSourceContent(x, _));
        }, this);
    }
    _validateMapping(h, m, p, g) {
      if (m && typeof m.line != "number" && typeof m.column != "number")
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      if (
        !(
          h &&
          "line" in h &&
          "column" in h &&
          h.line > 0 &&
          h.column >= 0 &&
          !m &&
          !p &&
          !g
        )
      ) {
        if (
          !(
            h &&
            "line" in h &&
            "column" in h &&
            m &&
            "line" in m &&
            "column" in m &&
            h.line > 0 &&
            h.column >= 0 &&
            m.line > 0 &&
            m.column >= 0 &&
            p
          )
        )
          throw new Error(
            "Invalid mapping: " +
              JSON.stringify({ generated: h, source: p, original: m, name: g })
          );
      }
    }
    _serializeMappings() {
      let h = 0,
        m = 1,
        p = 0,
        g = 0,
        v = 0,
        b = 0,
        S = "",
        x,
        _,
        z,
        O;
      const L = this._mappings.toArray();
      for (let U = 0, Q = L.length; U < Q; U++) {
        if (((_ = L[U]), (x = ""), _.generatedLine !== m))
          for (h = 0; _.generatedLine !== m; ) (x += ";"), m++;
        else if (U > 0) {
          if (!i.compareByGeneratedPositionsInflated(_, L[U - 1])) continue;
          x += ",";
        }
        (x += r.encode(_.generatedColumn - h)),
          (h = _.generatedColumn),
          _.source != null &&
            ((O = this._sources.indexOf(_.source)),
            (x += r.encode(O - b)),
            (b = O),
            (x += r.encode(_.originalLine - 1 - g)),
            (g = _.originalLine - 1),
            (x += r.encode(_.originalColumn - p)),
            (p = _.originalColumn),
            _.name != null &&
              ((z = this._names.indexOf(_.name)),
              (x += r.encode(z - v)),
              (v = z))),
          (S += x);
      }
      return S;
    }
    _generateSourcesContent(h, m) {
      return h.map(function (p) {
        if (!this._sourcesContents) return null;
        m != null && (p = i.relative(m, p));
        const g = i.toSetString(p);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, g)
          ? this._sourcesContents[g]
          : null;
      }, this);
    }
    toJSON() {
      const h = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings(),
      };
      return (
        this._file != null && (h.file = this._file),
        this._sourceRoot != null && (h.sourceRoot = this._sourceRoot),
        this._sourcesContents &&
          (h.sourcesContent = this._generateSourcesContent(
            h.sources,
            h.sourceRoot
          )),
        h
      );
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  }
  return (c.prototype._version = 3), (Is.SourceMapGenerator = c), Is;
}
var Ba = {},
  io = {},
  Xh;
function k0() {
  return (
    Xh ||
      ((Xh = 1),
      (function (r) {
        (r.GREATEST_LOWER_BOUND = 1), (r.LEAST_UPPER_BOUND = 2);
        function i(s, o, c, d, h, m) {
          const p = Math.floor((o - s) / 2) + s,
            g = h(c, d[p], !0);
          return g === 0
            ? p
            : g > 0
            ? o - p > 1
              ? i(p, o, c, d, h, m)
              : m === r.LEAST_UPPER_BOUND
              ? o < d.length
                ? o
                : -1
              : p
            : p - s > 1
            ? i(s, p, c, d, h, m)
            : m == r.LEAST_UPPER_BOUND
            ? p
            : s < 0
            ? -1
            : s;
        }
        r.search = function (o, c, d, h) {
          if (c.length === 0) return -1;
          let m = i(-1, c.length, o, c, d, h || r.GREATEST_LOWER_BOUND);
          if (m < 0) return -1;
          for (; m - 1 >= 0 && d(c[m], c[m - 1], !0) === 0; ) --m;
          return m;
        };
      })(io)),
    io
  );
}
var pu = { exports: {} },
  Zh;
function Ym() {
  if (Zh) return pu.exports;
  Zh = 1;
  let r = null;
  return (
    (pu.exports = function () {
      if (typeof r == "string") return fetch(r).then((s) => s.arrayBuffer());
      if (r instanceof ArrayBuffer) return Promise.resolve(r);
      throw new Error(
        "You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer"
      );
    }),
    (pu.exports.initialize = (i) => {
      r = i;
    }),
    pu.exports
  );
}
var uo, Kh;
function J0() {
  if (Kh) return uo;
  Kh = 1;
  const r = Ym();
  function i() {
    (this.generatedLine = 0),
      (this.generatedColumn = 0),
      (this.lastGeneratedColumn = null),
      (this.source = null),
      (this.originalLine = null),
      (this.originalColumn = null),
      (this.name = null);
  }
  let s = null;
  return (
    (uo = function () {
      if (s) return s;
      const c = [];
      return (
        (s = r()
          .then((d) =>
            WebAssembly.instantiate(d, {
              env: {
                mapping_callback(h, m, p, g, v, b, S, x, _, z) {
                  const O = new i();
                  (O.generatedLine = h + 1),
                    (O.generatedColumn = m),
                    p && (O.lastGeneratedColumn = g - 1),
                    v &&
                      ((O.source = b),
                      (O.originalLine = S + 1),
                      (O.originalColumn = x),
                      _ && (O.name = z)),
                    c[c.length - 1](O);
                },
                start_all_generated_locations_for() {
                  console.time("all_generated_locations_for");
                },
                end_all_generated_locations_for() {
                  console.timeEnd("all_generated_locations_for");
                },
                start_compute_column_spans() {
                  console.time("compute_column_spans");
                },
                end_compute_column_spans() {
                  console.timeEnd("compute_column_spans");
                },
                start_generated_location_for() {
                  console.time("generated_location_for");
                },
                end_generated_location_for() {
                  console.timeEnd("generated_location_for");
                },
                start_original_location_for() {
                  console.time("original_location_for");
                },
                end_original_location_for() {
                  console.timeEnd("original_location_for");
                },
                start_parse_mappings() {
                  console.time("parse_mappings");
                },
                end_parse_mappings() {
                  console.timeEnd("parse_mappings");
                },
                start_sort_by_generated_location() {
                  console.time("sort_by_generated_location");
                },
                end_sort_by_generated_location() {
                  console.timeEnd("sort_by_generated_location");
                },
                start_sort_by_original_location() {
                  console.time("sort_by_original_location");
                },
                end_sort_by_original_location() {
                  console.timeEnd("sort_by_original_location");
                },
              },
            })
          )
          .then((d) => ({
            exports: d.instance.exports,
            withMappingCallback: (h, m) => {
              c.push(h);
              try {
                m();
              } finally {
                c.pop();
              }
            },
          }))
          .then(null, (d) => {
            throw ((s = null), d);
          })),
        s
      );
    }),
    uo
  );
}
var kh;
function $0() {
  if (kh) return Ba;
  kh = 1;
  const r = Tu(),
    i = k0(),
    s = Bm().ArraySet;
  Hm();
  const o = Ym(),
    c = J0(),
    d = Symbol("smcInternal");
  class h {
    constructor(S, x) {
      return S == d ? Promise.resolve(this) : g(S, x);
    }
    static initialize(S) {
      o.initialize(S["lib/mappings.wasm"]);
    }
    static fromSourceMap(S, x) {
      return v(S, x);
    }
    static async with(S, x, _) {
      const z = await new h(S, x);
      try {
        return await _(z);
      } finally {
        z.destroy();
      }
    }
    eachMapping(S, x, _) {
      throw new Error("Subclasses must implement eachMapping");
    }
    allGeneratedPositionsFor(S) {
      throw new Error("Subclasses must implement allGeneratedPositionsFor");
    }
    destroy() {
      throw new Error("Subclasses must implement destroy");
    }
  }
  (h.prototype._version = 3),
    (h.GENERATED_ORDER = 1),
    (h.ORIGINAL_ORDER = 2),
    (h.GREATEST_LOWER_BOUND = 1),
    (h.LEAST_UPPER_BOUND = 2),
    (Ba.SourceMapConsumer = h);
  class m extends h {
    constructor(S, x) {
      return super(d).then((_) => {
        let z = S;
        typeof S == "string" && (z = r.parseSourceMapInput(S));
        const O = r.getArg(z, "version"),
          L = r.getArg(z, "sources").map(String),
          U = r.getArg(z, "names", []),
          Q = r.getArg(z, "sourceRoot", null),
          P = r.getArg(z, "sourcesContent", null),
          W = r.getArg(z, "mappings"),
          ue = r.getArg(z, "file", null),
          I = r.getArg(z, "x_google_ignoreList", null);
        if (O != _._version) throw new Error("Unsupported version: " + O);
        return (
          (_._sourceLookupCache = new Map()),
          (_._names = s.fromArray(U.map(String), !0)),
          (_._sources = s.fromArray(L, !0)),
          (_._absoluteSources = s.fromArray(
            _._sources.toArray().map(function (Ee) {
              return r.computeSourceURL(Q, Ee, x);
            }),
            !0
          )),
          (_.sourceRoot = Q),
          (_.sourcesContent = P),
          (_._mappings = W),
          (_._sourceMapURL = x),
          (_.file = ue),
          (_.x_google_ignoreList = I),
          (_._computedColumnSpans = !1),
          (_._mappingsPtr = 0),
          (_._wasm = null),
          c().then((Ee) => ((_._wasm = Ee), _))
        );
      });
    }
    _findSourceIndex(S) {
      const x = this._sourceLookupCache.get(S);
      if (typeof x == "number") return x;
      const _ = r.computeSourceURL(null, S, this._sourceMapURL);
      if (this._absoluteSources.has(_)) {
        const O = this._absoluteSources.indexOf(_);
        return this._sourceLookupCache.set(S, O), O;
      }
      const z = r.computeSourceURL(this.sourceRoot, S, this._sourceMapURL);
      if (this._absoluteSources.has(z)) {
        const O = this._absoluteSources.indexOf(z);
        return this._sourceLookupCache.set(S, O), O;
      }
      return -1;
    }
    static fromSourceMap(S, x) {
      return new m(S.toString());
    }
    get sources() {
      return this._absoluteSources.toArray();
    }
    _getMappingsPtr() {
      return (
        this._mappingsPtr === 0 && this._parseMappings(), this._mappingsPtr
      );
    }
    _parseMappings() {
      const S = this._mappings,
        x = S.length,
        _ = this._wasm.exports.allocate_mappings(x) >>> 0,
        z = new Uint8Array(this._wasm.exports.memory.buffer, _, x);
      for (let L = 0; L < x; L++) z[L] = S.charCodeAt(L);
      const O = this._wasm.exports.parse_mappings(_);
      if (!O) {
        const L = this._wasm.exports.get_last_error();
        let U = `Error parsing mappings (code ${L}): `;
        switch (L) {
          case 1:
            U +=
              "the mappings contained a negative line, column, source index, or name index";
            break;
          case 2:
            U += "the mappings contained a number larger than 2**32";
            break;
          case 3:
            U += "reached EOF while in the middle of parsing a VLQ";
            break;
          case 4:
            U += "invalid base 64 character while parsing a VLQ";
            break;
          default:
            U += "unknown error code";
            break;
        }
        throw new Error(U);
      }
      this._mappingsPtr = O;
    }
    eachMapping(S, x, _) {
      const z = x || null,
        O = _ || h.GENERATED_ORDER;
      this._wasm.withMappingCallback(
        (L) => {
          L.source !== null &&
            ((L.source = this._absoluteSources.at(L.source)),
            L.name !== null && (L.name = this._names.at(L.name))),
            this._computedColumnSpans &&
              L.lastGeneratedColumn === null &&
              (L.lastGeneratedColumn = 1 / 0),
            S.call(z, L);
        },
        () => {
          switch (O) {
            case h.GENERATED_ORDER:
              this._wasm.exports.by_generated_location(this._getMappingsPtr());
              break;
            case h.ORIGINAL_ORDER:
              this._wasm.exports.by_original_location(this._getMappingsPtr());
              break;
            default:
              throw new Error("Unknown order of iteration.");
          }
        }
      );
    }
    allGeneratedPositionsFor(S) {
      let x = r.getArg(S, "source");
      const _ = r.getArg(S, "line"),
        z = S.column || 0;
      if (((x = this._findSourceIndex(x)), x < 0)) return [];
      if (_ < 1) throw new Error("Line numbers must be >= 1");
      if (z < 0) throw new Error("Column numbers must be >= 0");
      const O = [];
      return (
        this._wasm.withMappingCallback(
          (L) => {
            let U = L.lastGeneratedColumn;
            this._computedColumnSpans && U === null && (U = 1 / 0),
              O.push({
                line: L.generatedLine,
                column: L.generatedColumn,
                lastColumn: U,
              });
          },
          () => {
            this._wasm.exports.all_generated_locations_for(
              this._getMappingsPtr(),
              x,
              _ - 1,
              "column" in S,
              z
            );
          }
        ),
        O
      );
    }
    destroy() {
      this._mappingsPtr !== 0 &&
        (this._wasm.exports.free_mappings(this._mappingsPtr),
        (this._mappingsPtr = 0));
    }
    computeColumnSpans() {
      this._computedColumnSpans ||
        (this._wasm.exports.compute_column_spans(this._getMappingsPtr()),
        (this._computedColumnSpans = !0));
    }
    originalPositionFor(S) {
      const x = {
        generatedLine: r.getArg(S, "line"),
        generatedColumn: r.getArg(S, "column"),
      };
      if (x.generatedLine < 1) throw new Error("Line numbers must be >= 1");
      if (x.generatedColumn < 0) throw new Error("Column numbers must be >= 0");
      let _ = r.getArg(S, "bias", h.GREATEST_LOWER_BOUND);
      _ == null && (_ = h.GREATEST_LOWER_BOUND);
      let z;
      if (
        (this._wasm.withMappingCallback(
          (O) => (z = O),
          () => {
            this._wasm.exports.original_location_for(
              this._getMappingsPtr(),
              x.generatedLine - 1,
              x.generatedColumn,
              _
            );
          }
        ),
        z && z.generatedLine === x.generatedLine)
      ) {
        let O = r.getArg(z, "source", null);
        O !== null && (O = this._absoluteSources.at(O));
        let L = r.getArg(z, "name", null);
        return (
          L !== null && (L = this._names.at(L)),
          {
            source: O,
            line: r.getArg(z, "originalLine", null),
            column: r.getArg(z, "originalColumn", null),
            name: L,
          }
        );
      }
      return { source: null, line: null, column: null, name: null };
    }
    hasContentsOfAllSources() {
      return this.sourcesContent
        ? this.sourcesContent.length >= this._sources.size() &&
            !this.sourcesContent.some(function (S) {
              return S == null;
            })
        : !1;
    }
    sourceContentFor(S, x) {
      if (!this.sourcesContent) return null;
      const _ = this._findSourceIndex(S);
      if (_ >= 0) return this.sourcesContent[_];
      if (x) return null;
      throw new Error('"' + S + '" is not in the SourceMap.');
    }
    generatedPositionFor(S) {
      let x = r.getArg(S, "source");
      if (((x = this._findSourceIndex(x)), x < 0))
        return { line: null, column: null, lastColumn: null };
      const _ = {
        source: x,
        originalLine: r.getArg(S, "line"),
        originalColumn: r.getArg(S, "column"),
      };
      if (_.originalLine < 1) throw new Error("Line numbers must be >= 1");
      if (_.originalColumn < 0) throw new Error("Column numbers must be >= 0");
      let z = r.getArg(S, "bias", h.GREATEST_LOWER_BOUND);
      z == null && (z = h.GREATEST_LOWER_BOUND);
      let O;
      if (
        (this._wasm.withMappingCallback(
          (L) => (O = L),
          () => {
            this._wasm.exports.generated_location_for(
              this._getMappingsPtr(),
              _.source,
              _.originalLine - 1,
              _.originalColumn,
              z
            );
          }
        ),
        O && O.source === _.source)
      ) {
        let L = O.lastGeneratedColumn;
        return (
          this._computedColumnSpans && L === null && (L = 1 / 0),
          {
            line: r.getArg(O, "generatedLine", null),
            column: r.getArg(O, "generatedColumn", null),
            lastColumn: L,
          }
        );
      }
      return { line: null, column: null, lastColumn: null };
    }
  }
  (m.prototype.consumer = h), (Ba.BasicSourceMapConsumer = m);
  class p extends h {
    constructor(S, x) {
      return super(d).then((_) => {
        let z = S;
        typeof S == "string" && (z = r.parseSourceMapInput(S));
        const O = r.getArg(z, "version"),
          L = r.getArg(z, "sections");
        if (O != _._version) throw new Error("Unsupported version: " + O);
        let U = { line: -1, column: 0 };
        return Promise.all(
          L.map((Q) => {
            if (Q.url)
              throw new Error(
                "Support for url field in sections not implemented."
              );
            const P = r.getArg(Q, "offset"),
              W = r.getArg(P, "line"),
              ue = r.getArg(P, "column");
            if (W < U.line || (W === U.line && ue < U.column))
              throw new Error(
                "Section offsets must be ordered and non-overlapping."
              );
            return (
              (U = P),
              new h(r.getArg(Q, "map"), x).then((Ee) => ({
                generatedOffset: {
                  generatedLine: W + 1,
                  generatedColumn: ue + 1,
                },
                consumer: Ee,
              }))
            );
          })
        ).then((Q) => ((_._sections = Q), _));
      });
    }
    get sources() {
      const S = [];
      for (let x = 0; x < this._sections.length; x++)
        for (let _ = 0; _ < this._sections[x].consumer.sources.length; _++)
          S.push(this._sections[x].consumer.sources[_]);
      return S;
    }
    originalPositionFor(S) {
      const x = {
          generatedLine: r.getArg(S, "line"),
          generatedColumn: r.getArg(S, "column"),
        },
        _ = i.search(x, this._sections, function (O, L) {
          const U = O.generatedLine - L.generatedOffset.generatedLine;
          return (
            U || O.generatedColumn - (L.generatedOffset.generatedColumn - 1)
          );
        }),
        z = this._sections[_];
      return z
        ? z.consumer.originalPositionFor({
            line: x.generatedLine - (z.generatedOffset.generatedLine - 1),
            column:
              x.generatedColumn -
              (z.generatedOffset.generatedLine === x.generatedLine
                ? z.generatedOffset.generatedColumn - 1
                : 0),
            bias: S.bias,
          })
        : { source: null, line: null, column: null, name: null };
    }
    hasContentsOfAllSources() {
      return this._sections.every(function (S) {
        return S.consumer.hasContentsOfAllSources();
      });
    }
    sourceContentFor(S, x) {
      for (let _ = 0; _ < this._sections.length; _++) {
        const O = this._sections[_].consumer.sourceContentFor(S, !0);
        if (O) return O;
      }
      if (x) return null;
      throw new Error('"' + S + '" is not in the SourceMap.');
    }
    _findSectionIndex(S) {
      for (let x = 0; x < this._sections.length; x++) {
        const { consumer: _ } = this._sections[x];
        if (_._findSourceIndex(S) !== -1) return x;
      }
      return -1;
    }
    generatedPositionFor(S) {
      const x = this._findSectionIndex(r.getArg(S, "source")),
        _ = x >= 0 ? this._sections[x] : null,
        z =
          x >= 0 && x + 1 < this._sections.length
            ? this._sections[x + 1]
            : null,
        O = _ && _.consumer.generatedPositionFor(S);
      if (O && O.line !== null) {
        const L = _.generatedOffset.generatedLine - 1,
          U = _.generatedOffset.generatedColumn - 1;
        return (
          O.line === 1 &&
            ((O.column += U),
            typeof O.lastColumn == "number" && (O.lastColumn += U)),
          O.lastColumn === 1 / 0 &&
            z &&
            O.line === z.generatedOffset.generatedLine &&
            (O.lastColumn = z.generatedOffset.generatedColumn - 2),
          (O.line += L),
          O
        );
      }
      return { line: null, column: null, lastColumn: null };
    }
    allGeneratedPositionsFor(S) {
      const x = this._findSectionIndex(r.getArg(S, "source")),
        _ = x >= 0 ? this._sections[x] : null,
        z =
          x >= 0 && x + 1 < this._sections.length
            ? this._sections[x + 1]
            : null;
      return _
        ? _.consumer.allGeneratedPositionsFor(S).map((O) => {
            const L = _.generatedOffset.generatedLine - 1,
              U = _.generatedOffset.generatedColumn - 1;
            return (
              O.line === 1 &&
                ((O.column += U),
                typeof O.lastColumn == "number" && (O.lastColumn += U)),
              O.lastColumn === 1 / 0 &&
                z &&
                O.line === z.generatedOffset.generatedLine &&
                (O.lastColumn = z.generatedOffset.generatedColumn - 2),
              (O.line += L),
              O
            );
          })
        : [];
    }
    eachMapping(S, x, _) {
      this._sections.forEach((z, O) => {
        const L = O + 1 < this._sections.length ? this._sections[O + 1] : null,
          { generatedOffset: U } = z,
          Q = U.generatedLine - 1,
          P = U.generatedColumn - 1;
        z.consumer.eachMapping(
          function (W) {
            W.generatedLine === 1 &&
              ((W.generatedColumn += P),
              typeof W.lastGeneratedColumn == "number" &&
                (W.lastGeneratedColumn += P)),
              W.lastGeneratedColumn === 1 / 0 &&
                L &&
                W.generatedLine === L.generatedOffset.generatedLine &&
                (W.lastGeneratedColumn = L.generatedOffset.generatedColumn - 2),
              (W.generatedLine += Q),
              S.call(this, W);
          },
          x,
          _
        );
      });
    }
    computeColumnSpans() {
      for (let S = 0; S < this._sections.length; S++)
        this._sections[S].consumer.computeColumnSpans();
    }
    destroy() {
      for (let S = 0; S < this._sections.length; S++)
        this._sections[S].consumer.destroy();
    }
  }
  Ba.IndexedSourceMapConsumer = p;
  function g(b, S) {
    let x = b;
    typeof b == "string" && (x = r.parseSourceMapInput(b));
    const _ = x.sections != null ? new p(x, S) : new m(x, S);
    return Promise.resolve(_);
  }
  function v(b, S) {
    return m.fromSourceMap(b, S);
  }
  return Ba;
}
var ro = {},
  Jh;
function F0() {
  if (Jh) return ro;
  Jh = 1;
  const r = qm().SourceMapGenerator,
    i = Tu(),
    s = /(\r?\n)/,
    o = 10,
    c = "$$$isSourceNode$$$";
  class d {
    constructor(m, p, g, v, b) {
      (this.children = []),
        (this.sourceContents = {}),
        (this.line = m ?? null),
        (this.column = p ?? null),
        (this.source = g ?? null),
        (this.name = b ?? null),
        (this[c] = !0),
        v != null && this.add(v);
    }
    static fromStringWithSourceMap(m, p, g) {
      const v = new d(),
        b = m.split(s);
      let S = 0;
      const x = function () {
        const Q = W(),
          P = W() || "";
        return Q + P;
        function W() {
          return S < b.length ? b[S++] : void 0;
        }
      };
      let _ = 1,
        z = 0,
        O = null,
        L;
      return (
        p.eachMapping(function (Q) {
          if (O !== null)
            if (_ < Q.generatedLine) U(O, x()), _++, (z = 0);
            else {
              L = b[S] || "";
              const P = L.substr(0, Q.generatedColumn - z);
              (b[S] = L.substr(Q.generatedColumn - z)),
                (z = Q.generatedColumn),
                U(O, P),
                (O = Q);
              return;
            }
          for (; _ < Q.generatedLine; ) v.add(x()), _++;
          z < Q.generatedColumn &&
            ((L = b[S] || ""),
            v.add(L.substr(0, Q.generatedColumn)),
            (b[S] = L.substr(Q.generatedColumn)),
            (z = Q.generatedColumn)),
            (O = Q);
        }, this),
        S < b.length && (O && U(O, x()), v.add(b.splice(S).join(""))),
        p.sources.forEach(function (Q) {
          const P = p.sourceContentFor(Q);
          P != null &&
            (g != null && (Q = i.join(g, Q)), v.setSourceContent(Q, P));
        }),
        v
      );
      function U(Q, P) {
        if (Q === null || Q.source === void 0) v.add(P);
        else {
          const W = g ? i.join(g, Q.source) : Q.source;
          v.add(new d(Q.originalLine, Q.originalColumn, W, P, Q.name));
        }
      }
    }
    add(m) {
      if (Array.isArray(m))
        m.forEach(function (p) {
          this.add(p);
        }, this);
      else if (m[c] || typeof m == "string") m && this.children.push(m);
      else
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
            m
        );
      return this;
    }
    prepend(m) {
      if (Array.isArray(m))
        for (let p = m.length - 1; p >= 0; p--) this.prepend(m[p]);
      else if (m[c] || typeof m == "string") this.children.unshift(m);
      else
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
            m
        );
      return this;
    }
    walk(m) {
      let p;
      for (let g = 0, v = this.children.length; g < v; g++)
        (p = this.children[g]),
          p[c]
            ? p.walk(m)
            : p !== "" &&
              m(p, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name,
              });
    }
    join(m) {
      let p, g;
      const v = this.children.length;
      if (v > 0) {
        for (p = [], g = 0; g < v - 1; g++) p.push(this.children[g]), p.push(m);
        p.push(this.children[g]), (this.children = p);
      }
      return this;
    }
    replaceRight(m, p) {
      const g = this.children[this.children.length - 1];
      return (
        g[c]
          ? g.replaceRight(m, p)
          : typeof g == "string"
          ? (this.children[this.children.length - 1] = g.replace(m, p))
          : this.children.push("".replace(m, p)),
        this
      );
    }
    setSourceContent(m, p) {
      this.sourceContents[i.toSetString(m)] = p;
    }
    walkSourceContents(m) {
      for (let g = 0, v = this.children.length; g < v; g++)
        this.children[g][c] && this.children[g].walkSourceContents(m);
      const p = Object.keys(this.sourceContents);
      for (let g = 0, v = p.length; g < v; g++)
        m(i.fromSetString(p[g]), this.sourceContents[p[g]]);
    }
    toString() {
      let m = "";
      return (
        this.walk(function (p) {
          m += p;
        }),
        m
      );
    }
    toStringWithSourceMap(m) {
      const p = { code: "", line: 1, column: 0 },
        g = new r(m);
      let v = !1,
        b = null,
        S = null,
        x = null,
        _ = null;
      return (
        this.walk(function (z, O) {
          (p.code += z),
            O.source !== null && O.line !== null && O.column !== null
              ? ((b !== O.source ||
                  S !== O.line ||
                  x !== O.column ||
                  _ !== O.name) &&
                  g.addMapping({
                    source: O.source,
                    original: { line: O.line, column: O.column },
                    generated: { line: p.line, column: p.column },
                    name: O.name,
                  }),
                (b = O.source),
                (S = O.line),
                (x = O.column),
                (_ = O.name),
                (v = !0))
              : v &&
                (g.addMapping({
                  generated: { line: p.line, column: p.column },
                }),
                (b = null),
                (v = !1));
          for (let L = 0, U = z.length; L < U; L++)
            z.charCodeAt(L) === o
              ? (p.line++,
                (p.column = 0),
                L + 1 === U
                  ? ((b = null), (v = !1))
                  : v &&
                    g.addMapping({
                      source: O.source,
                      original: { line: O.line, column: O.column },
                      generated: { line: p.line, column: p.column },
                      name: O.name,
                    }))
              : p.column++;
        }),
        this.walkSourceContents(function (z, O) {
          g.setSourceContent(z, O);
        }),
        { code: p.code, map: g }
      );
    }
  }
  return (ro.SourceNode = d), ro;
}
var $h;
function W0() {
  return (
    $h ||
      (($h = 1),
      (Ha.SourceMapGenerator = qm().SourceMapGenerator),
      (Ha.SourceMapConsumer = $0().SourceMapConsumer),
      (Ha.SourceNode = F0().SourceNode)),
    Ha
  );
}
var bo = W0();
let so = !1;
const Vl = new Map(),
  P0 = 300 * 1e3,
  I0 = 1e3;
setInterval(() => {
  const r = Date.now();
  for (const [i, s] of Vl.entries()) r - s.timestamp > P0 && Vl.delete(i);
}, 6e4);
async function ey() {
  if (!so)
    try {
      await bo.SourceMapConsumer.initialize({
        "lib/mappings.wasm":
          "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm",
      }),
        (so = !0);
    } catch (r) {
      console.warn("Failed to initialize SourceMapConsumer:", r);
      try {
        await bo.SourceMapConsumer.initialize({}), (so = !0);
      } catch (i) {
        throw (
          (console.error(
            "SourceMapConsumer initialization failed completely:",
            i
          ),
          i)
        );
      }
    }
}
function ty(r) {
  if (!r || !r.stack) return `no-stack-${r?.message || "unknown"}`;
  const o = r.stack
    .split(
      `
`
    )
    .slice(0, 3)
    .map((c) =>
      c
        .replace(/\?t=\d+/g, "")
        .replace(/\?v=[\w\d]+/g, "")
        .replace(/\d{13,}/g, "TIMESTAMP")
    );
  return `${r.name || "Error"}-${r.message}-${o.join("|")}`;
}
const ny = "preview-inject/";
async function yu(r, i = 5) {
  if (!r || !r.stack)
    return {
      errorMessage: r?.message || "",
      mappedStack: r?.stack || "",
      sourceContext: [],
    };
  const s = ty(r);
  if (Vl.has(s)) {
    const v = Vl.get(s);
    return console.log("Using cached error mapping for:", s), v;
  }
  if (Vl.size >= I0) return null;
  await ey();
  const o = r.stack.split(`
`),
    c = [],
    d = [],
    h = new Map(),
    m = new Map();
  let p = 0;
  for (const v of o) {
    const b = v.match(
      /at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)/
    );
    if (!b) {
      c.push(v);
      continue;
    }
    let S, x, _, z;
    b[1]
      ? ((S = b[1]), (x = b[2]), (_ = parseInt(b[3])), (z = parseInt(b[4])))
      : ((S = "<anonymous>"),
        (x = b[5]),
        (_ = parseInt(b[6])),
        (z = parseInt(b[7])));
    try {
      const O = `${x}.map`;
      let L = h.get(O);
      if (!L) {
        const Q = await iy(O);
        (L = await new bo.SourceMapConsumer(Q)), h.set(O, L);
      }
      const U = L.originalPositionFor({ line: _, column: z });
      if (U.source) {
        if (U.source.includes(ny)) continue;
        const Q = U.source
            .split("/")
            .filter((ue) => ue !== "..")
            .join("/"),
          W = `    at ${U.name || S} (${Q}:${U.line}:${U.column})`;
        if ((c.push(W), U.line && U.column && p < i)) {
          p++;
          try {
            const ue = await ly(L, U.source, m);
            if (ue) {
              const I = ay(ue, U.line, 10);
              d.push({ file: Q, line: U.line, column: U.column, context: I });
            }
          } catch (ue) {
            console.warn("Failed to extract source context:", ue);
          }
        }
      } else c.push(v);
    } catch (O) {
      console.warn("Failed to map stack line:", v, O), c.push(v);
    }
  }
  for (const v of h.values()) v.destroy();
  const g = {
    errorMessage: r?.message || "",
    mappedStack: c.join(`
`),
    sourceContext: d,
  };
  return (g.timestamp = Date.now()), Vl.set(s, g), g;
}
async function ly(r, i, s) {
  if (s.has(i)) return s.get(i) || null;
  const o = r.sourceContentFor(i);
  return o ? (s.set(i, o), o) : null;
}
function ay(r, i, s = 10) {
  const o = r.split(`
`),
    c = Math.max(0, i - s - 1),
    d = Math.min(o.length - 1, i + s - 1),
    h = [];
  for (let m = c; m <= d; m++) {
    const p = m + 1,
      b = `${p === i ? ">>>" : "   "} ${p.toString().padStart(4, " ")} | ${
        o[m] || ""
      }`;
    h.push(b);
  }
  return h.join(`
`);
}
async function iy(r) {
  try {
    const i = await fetch(r);
    if (!i.ok) throw new Error(`Failed to load source map: ${i.status}`);
    return await i.json();
  } catch (i) {
    const s = i instanceof Error ? i.message : String(i);
    throw new Error(`Error loading source map from ${r}: ${s}`);
  }
}
class uy {
  client;
  originalConsoleError;
  constructor() {
    const i = B0();
    i.length > 0 &&
      i.forEach((s) => {
        s.type === "console.error"
          ? this.handleConsoleError(s.args)
          : s.type === "runtime" && this.handleError(s.args);
      }),
      (this.client = new Ou(window.parent)),
      (this.originalConsoleError = console.error),
      this.initErrorHandlers();
  }
  initErrorHandlers() {
    window.addEventListener("error", this.handleError.bind(this)),
      window.addEventListener(
        "unhandledrejection",
        this.handlePromiseRejection.bind(this)
      ),
      this.interceptConsoleError();
  }
  async handleError(i) {
    const s = i.target;
    if (
      !(
        s &&
        s instanceof HTMLElement &&
        s.tagName &&
        [
          "IMG",
          "SCRIPT",
          "LINK",
          "VIDEO",
          "AUDIO",
          "SOURCE",
          "IFRAME",
        ].includes(s.tagName)
      ) &&
      i.error &&
      i.error.stack
    )
      try {
        const o = await yu(i.error);
        this.sendError(o);
      } catch (o) {
        console.warn("Failed to map error stack:", o);
      }
  }
  async handlePromiseRejection(i) {
    const s =
      i.reason instanceof Error ? i.reason : new Error(String(i.reason));
    if (s.stack)
      try {
        const o = await yu(s);
        this.sendError(o);
      } catch (o) {
        console.warn("Failed to map promise rejection stack:", o);
      }
  }
  interceptConsoleError() {
    console.error = (...i) => {
      this.originalConsoleError.apply(console, i);
      const s = i.find((o) => o instanceof Error);
      if (s && s.stack) this.handleConsoleError(s);
      else if (i.length > 0) {
        const o = i
            .map((d) => (typeof d == "object" ? JSON.stringify(d) : String(d)))
            .join(" "),
          c = new Error(o);
        this.handleConsoleError(c);
      }
    };
  }
  async handleConsoleError(i) {
    try {
      const s = await yu(i);
      this.sendError(s);
    } catch (s) {
      console.warn("Failed to map console error stack:", s);
    }
  }
  reportError(i) {
    this.handleReactError(i);
  }
  async handleReactError(i) {
    try {
      const s = await yu(i);
      this.sendError(s);
    } catch (s) {
      console.warn("Failed to map React error stack:", s);
    }
  }
  async sendError(i) {
    if (!i) {
      console.warn("error is too many");
      return;
    }
    if (i.sourceContext.length !== 0)
      try {
        await this.client.post("runtime-error", i);
      } catch (s) {
        console.warn("Failed to send error to parent:", s);
      }
  }
  destroy() {
    (console.error = this.originalConsoleError), this.client.destroy();
  }
}
function ry() {
  const r = new uy();
  return (window.runtimeErrorCollector = r), r;
}
class sy {
  _client;
  constructor() {
    (this._client = new Ou(window.parent)), this._domContentLoadedListener();
  }
  _domContentLoadedListener() {
    const i = () => {
      console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"),
        document.removeEventListener("DOMContentLoaded", i);
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", i)
      : (console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"));
  }
}
function oy() {
  return new sy();
}
const Co = (r) => {
    const i = "/preview/76b93b74-c86e-45a5-a04d-8fb07c51523c/3859454";
    return r.startsWith(i) ? r.replaceAll(i, "") || "/" : r || "/";
  },
  cy = "modulepreload",
  fy = function (r) {
    return "/preview/76b93b74-c86e-45a5-a04d-8fb07c51523c/3859454/" + r;
  },
  Fh = {},
  Yt = function (i, s, o) {
    let c = Promise.resolve();
    if (s && s.length > 0) {
      let p = function (g) {
        return Promise.all(
          g.map((v) =>
            Promise.resolve(v).then(
              (b) => ({ status: "fulfilled", value: b }),
              (b) => ({ status: "rejected", reason: b })
            )
          )
        );
      };
      document.getElementsByTagName("link");
      const h = document.querySelector("meta[property=csp-nonce]"),
        m = h?.nonce || h?.getAttribute("nonce");
      c = p(
        s.map((g) => {
          if (((g = fy(g)), g in Fh)) return;
          Fh[g] = !0;
          const v = g.endsWith(".css"),
            b = v ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${g}"]${b}`)) return;
          const S = document.createElement("link");
          if (
            ((S.rel = v ? "stylesheet" : cy),
            v || (S.as = "script"),
            (S.crossOrigin = ""),
            (S.href = g),
            m && S.setAttribute("nonce", m),
            document.head.appendChild(S),
            v)
          )
            return new Promise((x, _) => {
              S.addEventListener("load", x),
                S.addEventListener("error", () =>
                  _(new Error(`Unable to preload CSS for ${g}`))
                );
            });
        })
      );
    }
    function d(h) {
      const m = new Event("vite:preloadError", { cancelable: !0 });
      if (((m.payload = h), window.dispatchEvent(m), !m.defaultPrevented))
        throw h;
    }
    return c.then((h) => {
      for (const m of h || []) m.status === "rejected" && d(m.reason);
      return i().catch(d);
    });
  };
async function dy() {
  await await Yt(() => Promise.resolve().then(() => Pb), void 0)
    .then((i) => i.navigatePromise)
    .catch((i) => (console.error(i), Promise.resolve(() => {}))),
    (window.REACT_APP_ROUTER = {
      push: (i, s) => {
        window.REACT_APP_NAVIGATE(i, s);
      },
      replace: (i, s, o) => {
        window.REACT_APP_NAVIGATE(i, { replace: !0, ...o });
      },
      forward: () => {
        window.REACT_APP_NAVIGATE(1);
      },
      back: () => {
        window.REACT_APP_NAVIGATE(-1);
      },
      refresh: () => {
        window.REACT_APP_NAVIGATE(0);
      },
      prefetch: (i, s) => {
        window.REACT_APP_NAVIGATE(i, s);
      },
    });
}
const Gm = new Promise((r) => {
    dy().then(() => {
      r(window.REACT_APP_ROUTER);
    });
  }),
  wo = () => window.REACT_APP_ROUTER,
  Vm = new Ou(window.parent),
  So = async (r, i) => {
    await Vm.post("routeWillChange", { next: Co(r) }, i);
  };
function hy(r) {
  const i = document.querySelector(r);
  i && i.scrollIntoView({ behavior: "smooth" });
}
function my() {
  const r = window.open;
  return (
    (window.open = function (i, s, o) {
      return i && typeof i == "string" && i.startsWith("#")
        ? (hy(i), null)
        : (r(i, "_blank", o), null);
    }),
    () => {
      window.open = r;
    }
  );
}
function gy() {
  const r = async (i) => {
    const o = i.target.closest("a");
    if (!o || o.tagName !== "A") return;
    const c = o.getAttribute("href");
    if (
      c &&
      !["#", "javascript:void(0)", ""].includes(c) &&
      !c.startsWith("#")
    ) {
      if ((i.preventDefault(), c.startsWith("/"))) {
        const d = wo();
        await So(c, { timeout: 500 });
        const h = Co(c);
        d.push(h);
        return;
      }
      window.open(o.href, "_blank");
    }
  };
  return (
    window.addEventListener("click", r, !0),
    () => {
      window.removeEventListener("click", r, !0);
    }
  );
}
const Wh = (r) => r.startsWith("http://") || r.startsWith("https://");
function py() {
  const r = () => {
    const i = wo(),
      s = i.push;
    i.push = async function (c, d, h) {
      return Wh(c)
        ? (window.open(c, "_blank"), Promise.resolve(!1))
        : (await So(c, { timeout: 500 }), s.call(this, c, d, h));
    };
    const o = i.replace;
    i.replace = async function (c, d, h) {
      return Wh(c)
        ? (window.open(c, "_blank"), Promise.resolve(!1))
        : (await So(c, { timeout: 500 }), o.call(this, c, d, h));
    };
  };
  return (
    window.addEventListener("load", r),
    () => {
      window.removeEventListener("load", r);
    }
  );
}
async function yy() {
  await Gm;
  const r = my(),
    i = gy(),
    s = py();
  return () => {
    Vm.destroy(), r(), i(), s();
  };
}
async function vy() {
  const r = await Yt(() => Promise.resolve().then(() => Fb), void 0)
    .then((c) => c.default)
    .catch((c) => []);
  let i = [],
    s = 0;
  function o(c, d) {
    const { path: h = "", children: m, index: p } = c;
    s++;
    const g = p === !0 || h === "",
      v = h && h[0] === "/",
      b = h.slice(-1) === "/" ? h.slice(0, -1) : h,
      S = g ? d.path : `${d.path}/${b}`,
      x = v && !g ? h : S,
      _ = { id: s, parentId: d.id, path: x };
    /\*/.test(_.path) || i.push(_), m && m.forEach((z) => o(z, _));
  }
  return r.forEach((c) => o(c, { id: 0, path: "" })), i;
}
async function by() {
  const r = new Ou(window.parent),
    i = await vy();
  (window.REACT_APP_ROUTES = i),
    r.post("routes", { routes: i }),
    r.on("getRouteInfo", async (p) => i),
    await Gm,
    r.on("routeAction", async (p) => {
      const g = wo(),
        { action: v, route: b } = p;
      switch (v) {
        case "goForward":
          g.forward();
          break;
        case "goBack":
          g.back();
          break;
        case "refresh":
          g.refresh();
          break;
        case "goTo":
          b && g.push(b);
          break;
        default:
          console.warn("Unknown action:", v);
      }
    });
  function s() {
    const p = window.history.state?.index ?? 0,
      g = window.history.length > p + 1,
      v = p > 0,
      b = window.location.pathname;
    r.post("updateNavigationState", {
      canGoForward: g,
      canGoBack: v,
      currentRoute: Co(b),
    });
  }
  function o() {
    const p = new MutationObserver((v) => {
        v.forEach((b) => {
          (b.type === "childList" || b.type === "characterData") &&
            r.post("titleChanged", { title: document.title });
        });
      }),
      g = document.querySelector("title");
    return (
      r.post("titleChanged", { title: document.title }),
      g && p.observe(g, { childList: !0, characterData: !0, subtree: !0 }),
      p
    );
  }
  let c = o();
  function d() {
    c.disconnect(),
      setTimeout(() => {
        c = o();
      }, 100);
  }
  const h = window.history.pushState,
    m = window.history.replaceState;
  return (
    (window.history.pushState = function (p, g, v) {
      h.apply(this, arguments), s(), d();
    }),
    (window.history.replaceState = function (p, g, v) {
      m.apply(this, arguments), s(), d();
    }),
    {
      destroy: () => {
        r.destroy(), c.disconnect();
      },
    }
  );
}
const Sy = !0;
console.log("Is preview build:", Sy);
async function xy() {
  ry(), yy(), oy(), by();
}
xy();
var oo = { exports: {} },
  qa = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ph;
function Ey() {
  if (Ph) return qa;
  Ph = 1;
  var r = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function s(o, c, d) {
    var h = null;
    if (
      (d !== void 0 && (h = "" + d),
      c.key !== void 0 && (h = "" + c.key),
      "key" in c)
    ) {
      d = {};
      for (var m in c) m !== "key" && (d[m] = c[m]);
    } else d = c;
    return (
      (c = d.ref),
      { $$typeof: r, type: o, key: h, ref: c !== void 0 ? c : null, props: d }
    );
  }
  return (qa.Fragment = i), (qa.jsx = s), (qa.jsxs = s), qa;
}
var Ih;
function _y() {
  return Ih || ((Ih = 1), (oo.exports = Ey())), oo.exports;
}
var w = _y(),
  co = { exports: {} },
  ie = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var em;
function Cy() {
  if (em) return ie;
  em = 1;
  var r = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function x(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (S && C[S]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var _ = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    z = Object.assign,
    O = {};
  function L(C, B, K) {
    (this.props = C),
      (this.context = B),
      (this.refs = O),
      (this.updater = K || _);
  }
  (L.prototype.isReactComponent = {}),
    (L.prototype.setState = function (C, B) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, C, B, "setState");
    }),
    (L.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    });
  function U() {}
  U.prototype = L.prototype;
  function Q(C, B, K) {
    (this.props = C),
      (this.context = B),
      (this.refs = O),
      (this.updater = K || _);
  }
  var P = (Q.prototype = new U());
  (P.constructor = Q), z(P, L.prototype), (P.isPureReactComponent = !0);
  var W = Array.isArray;
  function ue() {}
  var I = { H: null, A: null, T: null, S: null },
    Ee = Object.prototype.hasOwnProperty;
  function ye(C, B, K) {
    var k = K.ref;
    return {
      $$typeof: r,
      type: C,
      key: B,
      ref: k !== void 0 ? k : null,
      props: K,
    };
  }
  function V(C, B) {
    return ye(C.type, B, C.props);
  }
  function Z(C) {
    return typeof C == "object" && C !== null && C.$$typeof === r;
  }
  function $(C) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (K) {
        return B[K];
      })
    );
  }
  var le = /\/+/g;
  function ce(C, B) {
    return typeof C == "object" && C !== null && C.key != null
      ? $("" + C.key)
      : B.toString(36);
  }
  function we(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (
          (typeof C.status == "string"
            ? C.then(ue, ue)
            : ((C.status = "pending"),
              C.then(
                function (B) {
                  C.status === "pending" &&
                    ((C.status = "fulfilled"), (C.value = B));
                },
                function (B) {
                  C.status === "pending" &&
                    ((C.status = "rejected"), (C.reason = B));
                }
              )),
          C.status)
        ) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function D(C, B, K, k, re) {
    var fe = typeof C;
    (fe === "undefined" || fe === "boolean") && (C = null);
    var Ce = !1;
    if (C === null) Ce = !0;
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          Ce = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case r:
            case i:
              Ce = !0;
              break;
            case v:
              return (Ce = C._init), D(Ce(C._payload), B, K, k, re);
          }
      }
    if (Ce)
      return (
        (re = re(C)),
        (Ce = k === "" ? "." + ce(C, 0) : k),
        W(re)
          ? ((K = ""),
            Ce != null && (K = Ce.replace(le, "$&/") + "/"),
            D(re, B, K, "", function (Xl) {
              return Xl;
            }))
          : re != null &&
            (Z(re) &&
              (re = V(
                re,
                K +
                  (re.key == null || (C && C.key === re.key)
                    ? ""
                    : ("" + re.key).replace(le, "$&/") + "/") +
                  Ce
              )),
            B.push(re)),
        1
      );
    Ce = 0;
    var tt = k === "" ? "." : k + ":";
    if (W(C))
      for (var He = 0; He < C.length; He++)
        (k = C[He]), (fe = tt + ce(k, He)), (Ce += D(k, B, K, fe, re));
    else if (((He = x(C)), typeof He == "function"))
      for (C = He.call(C), He = 0; !(k = C.next()).done; )
        (k = k.value), (fe = tt + ce(k, He++)), (Ce += D(k, B, K, fe, re));
    else if (fe === "object") {
      if (typeof C.then == "function") return D(we(C), B, K, k, re);
      throw (
        ((B = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : B) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return Ce;
  }
  function X(C, B, K) {
    if (C == null) return C;
    var k = [],
      re = 0;
    return (
      D(C, k, "", "", function (fe) {
        return B.call(K, fe, re++);
      }),
      k
    );
  }
  function te(C) {
    if (C._status === -1) {
      var B = C._result;
      (B = B()),
        B.then(
          function (K) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = K));
          },
          function (K) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = K));
          }
        ),
        C._status === -1 && ((C._status = 0), (C._result = B));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ve =
      typeof reportError == "function"
        ? reportError
        : function (C) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var B = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == "object" &&
                  C !== null &&
                  typeof C.message == "string"
                    ? String(C.message)
                    : String(C),
                error: C,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", C);
              return;
            }
            console.error(C);
          },
    _e = {
      map: X,
      forEach: function (C, B, K) {
        X(
          C,
          function () {
            B.apply(this, arguments);
          },
          K
        );
      },
      count: function (C) {
        var B = 0;
        return (
          X(C, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (C) {
        return (
          X(C, function (B) {
            return B;
          }) || []
        );
      },
      only: function (C) {
        if (!Z(C))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return C;
      },
    };
  return (
    (ie.Activity = b),
    (ie.Children = _e),
    (ie.Component = L),
    (ie.Fragment = s),
    (ie.Profiler = c),
    (ie.PureComponent = Q),
    (ie.StrictMode = o),
    (ie.Suspense = p),
    (ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I),
    (ie.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return I.H.useMemoCache(C);
      },
    }),
    (ie.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (ie.cacheSignal = function () {
      return null;
    }),
    (ie.cloneElement = function (C, B, K) {
      if (C == null)
        throw Error(
          "The argument must be a React element, but you passed " + C + "."
        );
      var k = z({}, C.props),
        re = C.key;
      if (B != null)
        for (fe in (B.key !== void 0 && (re = "" + B.key), B))
          !Ee.call(B, fe) ||
            fe === "key" ||
            fe === "__self" ||
            fe === "__source" ||
            (fe === "ref" && B.ref === void 0) ||
            (k[fe] = B[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) k.children = K;
      else if (1 < fe) {
        for (var Ce = Array(fe), tt = 0; tt < fe; tt++)
          Ce[tt] = arguments[tt + 2];
        k.children = Ce;
      }
      return ye(C.type, re, k);
    }),
    (ie.createContext = function (C) {
      return (
        (C = {
          $$typeof: h,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: d, _context: C }),
        C
      );
    }),
    (ie.createElement = function (C, B, K) {
      var k,
        re = {},
        fe = null;
      if (B != null)
        for (k in (B.key !== void 0 && (fe = "" + B.key), B))
          Ee.call(B, k) &&
            k !== "key" &&
            k !== "__self" &&
            k !== "__source" &&
            (re[k] = B[k]);
      var Ce = arguments.length - 2;
      if (Ce === 1) re.children = K;
      else if (1 < Ce) {
        for (var tt = Array(Ce), He = 0; He < Ce; He++)
          tt[He] = arguments[He + 2];
        re.children = tt;
      }
      if (C && C.defaultProps)
        for (k in ((Ce = C.defaultProps), Ce))
          re[k] === void 0 && (re[k] = Ce[k]);
      return ye(C, fe, re);
    }),
    (ie.createRef = function () {
      return { current: null };
    }),
    (ie.forwardRef = function (C) {
      return { $$typeof: m, render: C };
    }),
    (ie.isValidElement = Z),
    (ie.lazy = function (C) {
      return { $$typeof: v, _payload: { _status: -1, _result: C }, _init: te };
    }),
    (ie.memo = function (C, B) {
      return { $$typeof: g, type: C, compare: B === void 0 ? null : B };
    }),
    (ie.startTransition = function (C) {
      var B = I.T,
        K = {};
      I.T = K;
      try {
        var k = C(),
          re = I.S;
        re !== null && re(K, k),
          typeof k == "object" &&
            k !== null &&
            typeof k.then == "function" &&
            k.then(ue, ve);
      } catch (fe) {
        ve(fe);
      } finally {
        B !== null && K.types !== null && (B.types = K.types), (I.T = B);
      }
    }),
    (ie.unstable_useCacheRefresh = function () {
      return I.H.useCacheRefresh();
    }),
    (ie.use = function (C) {
      return I.H.use(C);
    }),
    (ie.useActionState = function (C, B, K) {
      return I.H.useActionState(C, B, K);
    }),
    (ie.useCallback = function (C, B) {
      return I.H.useCallback(C, B);
    }),
    (ie.useContext = function (C) {
      return I.H.useContext(C);
    }),
    (ie.useDebugValue = function () {}),
    (ie.useDeferredValue = function (C, B) {
      return I.H.useDeferredValue(C, B);
    }),
    (ie.useEffect = function (C, B) {
      return I.H.useEffect(C, B);
    }),
    (ie.useEffectEvent = function (C) {
      return I.H.useEffectEvent(C);
    }),
    (ie.useId = function () {
      return I.H.useId();
    }),
    (ie.useImperativeHandle = function (C, B, K) {
      return I.H.useImperativeHandle(C, B, K);
    }),
    (ie.useInsertionEffect = function (C, B) {
      return I.H.useInsertionEffect(C, B);
    }),
    (ie.useLayoutEffect = function (C, B) {
      return I.H.useLayoutEffect(C, B);
    }),
    (ie.useMemo = function (C, B) {
      return I.H.useMemo(C, B);
    }),
    (ie.useOptimistic = function (C, B) {
      return I.H.useOptimistic(C, B);
    }),
    (ie.useReducer = function (C, B, K) {
      return I.H.useReducer(C, B, K);
    }),
    (ie.useRef = function (C) {
      return I.H.useRef(C);
    }),
    (ie.useState = function (C) {
      return I.H.useState(C);
    }),
    (ie.useSyncExternalStore = function (C, B, K) {
      return I.H.useSyncExternalStore(C, B, K);
    }),
    (ie.useTransition = function () {
      return I.H.useTransition();
    }),
    (ie.version = "19.2.0"),
    ie
  );
}
var tm;
function Ao() {
  return tm || ((tm = 1), (co.exports = Cy())), co.exports;
}
var Y = Ao();
const ae = (r) => typeof r == "string",
  Ya = () => {
    let r, i;
    const s = new Promise((o, c) => {
      (r = o), (i = c);
    });
    return (s.resolve = r), (s.reject = i), s;
  },
  nm = (r) => (r == null ? "" : "" + r),
  wy = (r, i, s) => {
    r.forEach((o) => {
      i[o] && (s[o] = i[o]);
    });
  },
  Ay = /###/g,
  lm = (r) => (r && r.indexOf("###") > -1 ? r.replace(Ay, ".") : r),
  am = (r) => !r || ae(r),
  Xa = (r, i, s) => {
    const o = ae(i) ? i.split(".") : i;
    let c = 0;
    for (; c < o.length - 1; ) {
      if (am(r)) return {};
      const d = lm(o[c]);
      !r[d] && s && (r[d] = new s()),
        Object.prototype.hasOwnProperty.call(r, d) ? (r = r[d]) : (r = {}),
        ++c;
    }
    return am(r) ? {} : { obj: r, k: lm(o[c]) };
  },
  im = (r, i, s) => {
    const { obj: o, k: c } = Xa(r, i, Object);
    if (o !== void 0 || i.length === 1) {
      o[c] = s;
      return;
    }
    let d = i[i.length - 1],
      h = i.slice(0, i.length - 1),
      m = Xa(r, h, Object);
    for (; m.obj === void 0 && h.length; )
      (d = `${h[h.length - 1]}.${d}`),
        (h = h.slice(0, h.length - 1)),
        (m = Xa(r, h, Object)),
        m?.obj && typeof m.obj[`${m.k}.${d}`] < "u" && (m.obj = void 0);
    m.obj[`${m.k}.${d}`] = s;
  },
  Oy = (r, i, s, o) => {
    const { obj: c, k: d } = Xa(r, i, Object);
    (c[d] = c[d] || []), c[d].push(s);
  },
  _u = (r, i) => {
    const { obj: s, k: o } = Xa(r, i);
    if (s && Object.prototype.hasOwnProperty.call(s, o)) return s[o];
  },
  Ty = (r, i, s) => {
    const o = _u(r, s);
    return o !== void 0 ? o : _u(i, s);
  },
  Qm = (r, i, s) => {
    for (const o in i)
      o !== "__proto__" &&
        o !== "constructor" &&
        (o in r
          ? ae(r[o]) ||
            r[o] instanceof String ||
            ae(i[o]) ||
            i[o] instanceof String
            ? s && (r[o] = i[o])
            : Qm(r[o], i[o], s)
          : (r[o] = i[o]));
    return r;
  },
  ql = (r) => r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var Ny = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};
const Ry = (r) => (ae(r) ? r.replace(/[&<>"'\/]/g, (i) => Ny[i]) : r);
class zy {
  constructor(i) {
    (this.capacity = i), (this.regExpMap = new Map()), (this.regExpQueue = []);
  }
  getRegExp(i) {
    const s = this.regExpMap.get(i);
    if (s !== void 0) return s;
    const o = new RegExp(i);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(i, o),
      this.regExpQueue.push(i),
      o
    );
  }
}
const My = [" ", ",", "?", "!", ";"],
  Ly = new zy(20),
  jy = (r, i, s) => {
    (i = i || ""), (s = s || "");
    const o = My.filter((h) => i.indexOf(h) < 0 && s.indexOf(h) < 0);
    if (o.length === 0) return !0;
    const c = Ly.getRegExp(
      `(${o.map((h) => (h === "?" ? "\\?" : h)).join("|")})`
    );
    let d = !c.test(r);
    if (!d) {
      const h = r.indexOf(s);
      h > 0 && !c.test(r.substring(0, h)) && (d = !0);
    }
    return d;
  },
  xo = (r, i, s = ".") => {
    if (!r) return;
    if (r[i]) return Object.prototype.hasOwnProperty.call(r, i) ? r[i] : void 0;
    const o = i.split(s);
    let c = r;
    for (let d = 0; d < o.length; ) {
      if (!c || typeof c != "object") return;
      let h,
        m = "";
      for (let p = d; p < o.length; ++p)
        if ((p !== d && (m += s), (m += o[p]), (h = c[m]), h !== void 0)) {
          if (
            ["string", "number", "boolean"].indexOf(typeof h) > -1 &&
            p < o.length - 1
          )
            continue;
          d += p - d + 1;
          break;
        }
      c = h;
    }
    return c;
  },
  Za = (r) => r?.replace("_", "-"),
  Dy = {
    type: "logger",
    log(r) {
      this.output("log", r);
    },
    warn(r) {
      this.output("warn", r);
    },
    error(r) {
      this.output("error", r);
    },
    output(r, i) {
      console?.[r]?.apply?.(console, i);
    },
  };
class Cu {
  constructor(i, s = {}) {
    this.init(i, s);
  }
  init(i, s = {}) {
    (this.prefix = s.prefix || "i18next:"),
      (this.logger = i || Dy),
      (this.options = s),
      (this.debug = s.debug);
  }
  log(...i) {
    return this.forward(i, "log", "", !0);
  }
  warn(...i) {
    return this.forward(i, "warn", "", !0);
  }
  error(...i) {
    return this.forward(i, "error", "");
  }
  deprecate(...i) {
    return this.forward(i, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(i, s, o, c) {
    return c && !this.debug
      ? null
      : (ae(i[0]) && (i[0] = `${o}${this.prefix} ${i[0]}`), this.logger[s](i));
  }
  create(i) {
    return new Cu(this.logger, {
      prefix: `${this.prefix}:${i}:`,
      ...this.options,
    });
  }
  clone(i) {
    return (
      (i = i || this.options),
      (i.prefix = i.prefix || this.prefix),
      new Cu(this.logger, i)
    );
  }
}
var Bt = new Cu();
class Nu {
  constructor() {
    this.observers = {};
  }
  on(i, s) {
    return (
      i.split(" ").forEach((o) => {
        this.observers[o] || (this.observers[o] = new Map());
        const c = this.observers[o].get(s) || 0;
        this.observers[o].set(s, c + 1);
      }),
      this
    );
  }
  off(i, s) {
    if (this.observers[i]) {
      if (!s) {
        delete this.observers[i];
        return;
      }
      this.observers[i].delete(s);
    }
  }
  emit(i, ...s) {
    this.observers[i] &&
      Array.from(this.observers[i].entries()).forEach(([c, d]) => {
        for (let h = 0; h < d; h++) c(...s);
      }),
      this.observers["*"] &&
        Array.from(this.observers["*"].entries()).forEach(([c, d]) => {
          for (let h = 0; h < d; h++) c.apply(c, [i, ...s]);
        });
  }
}
class um extends Nu {
  constructor(i, s = { ns: ["translation"], defaultNS: "translation" }) {
    super(),
      (this.data = i || {}),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(i) {
    this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
  }
  removeNamespaces(i) {
    const s = this.options.ns.indexOf(i);
    s > -1 && this.options.ns.splice(s, 1);
  }
  getResource(i, s, o, c = {}) {
    const d =
        c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator,
      h =
        c.ignoreJSONStructure !== void 0
          ? c.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let m;
    i.indexOf(".") > -1
      ? (m = i.split("."))
      : ((m = [i, s]),
        o &&
          (Array.isArray(o)
            ? m.push(...o)
            : ae(o) && d
            ? m.push(...o.split(d))
            : m.push(o)));
    const p = _u(this.data, m);
    return (
      !p &&
        !s &&
        !o &&
        i.indexOf(".") > -1 &&
        ((i = m[0]), (s = m[1]), (o = m.slice(2).join("."))),
      p || !h || !ae(o) ? p : xo(this.data?.[i]?.[s], o, d)
    );
  }
  addResource(i, s, o, c, d = { silent: !1 }) {
    const h =
      d.keySeparator !== void 0 ? d.keySeparator : this.options.keySeparator;
    let m = [i, s];
    o && (m = m.concat(h ? o.split(h) : o)),
      i.indexOf(".") > -1 && ((m = i.split(".")), (c = s), (s = m[1])),
      this.addNamespaces(s),
      im(this.data, m, c),
      d.silent || this.emit("added", i, s, o, c);
  }
  addResources(i, s, o, c = { silent: !1 }) {
    for (const d in o)
      (ae(o[d]) || Array.isArray(o[d])) &&
        this.addResource(i, s, d, o[d], { silent: !0 });
    c.silent || this.emit("added", i, s, o);
  }
  addResourceBundle(i, s, o, c, d, h = { silent: !1, skipCopy: !1 }) {
    let m = [i, s];
    i.indexOf(".") > -1 && ((m = i.split(".")), (c = o), (o = s), (s = m[1])),
      this.addNamespaces(s);
    let p = _u(this.data, m) || {};
    h.skipCopy || (o = JSON.parse(JSON.stringify(o))),
      c ? Qm(p, o, d) : (p = { ...p, ...o }),
      im(this.data, m, p),
      h.silent || this.emit("added", i, s, o);
  }
  removeResourceBundle(i, s) {
    this.hasResourceBundle(i, s) && delete this.data[i][s],
      this.removeNamespaces(s),
      this.emit("removed", i, s);
  }
  hasResourceBundle(i, s) {
    return this.getResource(i, s) !== void 0;
  }
  getResourceBundle(i, s) {
    return s || (s = this.options.defaultNS), this.getResource(i, s);
  }
  getDataByLanguage(i) {
    return this.data[i];
  }
  hasLanguageSomeTranslations(i) {
    const s = this.getDataByLanguage(i);
    return !!((s && Object.keys(s)) || []).find(
      (c) => s[c] && Object.keys(s[c]).length > 0
    );
  }
  toJSON() {
    return this.data;
  }
}
var Xm = {
  processors: {},
  addPostProcessor(r) {
    this.processors[r.name] = r;
  },
  handle(r, i, s, o, c) {
    return (
      r.forEach((d) => {
        i = this.processors[d]?.process(i, s, o, c) ?? i;
      }),
      i
    );
  },
};
const Zm = Symbol("i18next/PATH_KEY");
function Uy() {
  const r = [],
    i = Object.create(null);
  let s;
  return (
    (i.get = (o, c) => (
      s?.revoke?.(),
      c === Zm ? r : (r.push(c), (s = Proxy.revocable(o, i)), s.proxy)
    )),
    Proxy.revocable(Object.create(null), i).proxy
  );
}
function Eo(r, i) {
  const { [Zm]: s } = r(Uy());
  return s.join(i?.keySeparator ?? ".");
}
const rm = {},
  sm = (r) => !ae(r) && typeof r != "boolean" && typeof r != "number";
class wu extends Nu {
  constructor(i, s = {}) {
    super(),
      wy(
        [
          "resourceStore",
          "languageUtils",
          "pluralResolver",
          "interpolator",
          "backendConnector",
          "i18nFormat",
          "utils",
        ],
        i,
        this
      ),
      (this.options = s),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      (this.logger = Bt.create("translator"));
  }
  changeLanguage(i) {
    i && (this.language = i);
  }
  exists(i, s = { interpolation: {} }) {
    const o = { ...s };
    return i == null ? !1 : this.resolve(i, o)?.res !== void 0;
  }
  extractFromKey(i, s) {
    let o = s.nsSeparator !== void 0 ? s.nsSeparator : this.options.nsSeparator;
    o === void 0 && (o = ":");
    const c =
      s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
    let d = s.ns || this.options.defaultNS || [];
    const h = o && i.indexOf(o) > -1,
      m =
        !this.options.userDefinedKeySeparator &&
        !s.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !s.nsSeparator &&
        !jy(i, o, c);
    if (h && !m) {
      const p = i.match(this.interpolator.nestingRegexp);
      if (p && p.length > 0) return { key: i, namespaces: ae(d) ? [d] : d };
      const g = i.split(o);
      (o !== c || (o === c && this.options.ns.indexOf(g[0]) > -1)) &&
        (d = g.shift()),
        (i = g.join(c));
    }
    return { key: i, namespaces: ae(d) ? [d] : d };
  }
  translate(i, s, o) {
    let c = typeof s == "object" ? { ...s } : s;
    if (
      (typeof c != "object" &&
        this.options.overloadTranslationOptionHandler &&
        (c = this.options.overloadTranslationOptionHandler(arguments)),
      typeof options == "object" && (c = { ...c }),
      c || (c = {}),
      i == null)
    )
      return "";
    typeof i == "function" && (i = Eo(i, c)),
      Array.isArray(i) || (i = [String(i)]);
    const d =
        c.returnDetails !== void 0
          ? c.returnDetails
          : this.options.returnDetails,
      h =
        c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator,
      { key: m, namespaces: p } = this.extractFromKey(i[i.length - 1], c),
      g = p[p.length - 1];
    let v = c.nsSeparator !== void 0 ? c.nsSeparator : this.options.nsSeparator;
    v === void 0 && (v = ":");
    const b = c.lng || this.language,
      S = c.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (b?.toLowerCase() === "cimode")
      return S
        ? d
          ? {
              res: `${g}${v}${m}`,
              usedKey: m,
              exactUsedKey: m,
              usedLng: b,
              usedNS: g,
              usedParams: this.getUsedParamsDetails(c),
            }
          : `${g}${v}${m}`
        : d
        ? {
            res: m,
            usedKey: m,
            exactUsedKey: m,
            usedLng: b,
            usedNS: g,
            usedParams: this.getUsedParamsDetails(c),
          }
        : m;
    const x = this.resolve(i, c);
    let _ = x?.res;
    const z = x?.usedKey || m,
      O = x?.exactUsedKey || m,
      L = ["[object Number]", "[object Function]", "[object RegExp]"],
      U = c.joinArrays !== void 0 ? c.joinArrays : this.options.joinArrays,
      Q = !this.i18nFormat || this.i18nFormat.handleAsObject,
      P = c.count !== void 0 && !ae(c.count),
      W = wu.hasDefaultValue(c),
      ue = P ? this.pluralResolver.getSuffix(b, c.count, c) : "",
      I =
        c.ordinal && P
          ? this.pluralResolver.getSuffix(b, c.count, { ordinal: !1 })
          : "",
      Ee = P && !c.ordinal && c.count === 0,
      ye =
        (Ee && c[`defaultValue${this.options.pluralSeparator}zero`]) ||
        c[`defaultValue${ue}`] ||
        c[`defaultValue${I}`] ||
        c.defaultValue;
    let V = _;
    Q && !_ && W && (V = ye);
    const Z = sm(V),
      $ = Object.prototype.toString.apply(V);
    if (Q && V && Z && L.indexOf($) < 0 && !(ae(U) && Array.isArray(V))) {
      if (!c.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            "accessing an object - but returnObjects options is not enabled!"
          );
        const le = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(z, V, { ...c, ns: p })
          : `key '${m} (${this.language})' returned an object instead of string.`;
        return d
          ? ((x.res = le), (x.usedParams = this.getUsedParamsDetails(c)), x)
          : le;
      }
      if (h) {
        const le = Array.isArray(V),
          ce = le ? [] : {},
          we = le ? O : z;
        for (const D in V)
          if (Object.prototype.hasOwnProperty.call(V, D)) {
            const X = `${we}${h}${D}`;
            W && !_
              ? (ce[D] = this.translate(X, {
                  ...c,
                  defaultValue: sm(ye) ? ye[D] : void 0,
                  joinArrays: !1,
                  ns: p,
                }))
              : (ce[D] = this.translate(X, { ...c, joinArrays: !1, ns: p })),
              ce[D] === X && (ce[D] = V[D]);
          }
        _ = ce;
      }
    } else if (Q && ae(U) && Array.isArray(_))
      (_ = _.join(U)), _ && (_ = this.extendTranslation(_, i, c, o));
    else {
      let le = !1,
        ce = !1;
      !this.isValidLookup(_) && W && ((le = !0), (_ = ye)),
        this.isValidLookup(_) || ((ce = !0), (_ = m));
      const D =
          (c.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          ce
            ? void 0
            : _,
        X = W && ye !== _ && this.options.updateMissing;
      if (ce || le || X) {
        if (
          (this.logger.log(X ? "updateKey" : "missingKey", b, g, m, X ? ye : _),
          h)
        ) {
          const C = this.resolve(m, { ...c, keySeparator: !1 });
          C &&
            C.res &&
            this.logger.warn(
              "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
            );
        }
        let te = [];
        const ve = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          c.lng || this.language
        );
        if (this.options.saveMissingTo === "fallback" && ve && ve[0])
          for (let C = 0; C < ve.length; C++) te.push(ve[C]);
        else
          this.options.saveMissingTo === "all"
            ? (te = this.languageUtils.toResolveHierarchy(
                c.lng || this.language
              ))
            : te.push(c.lng || this.language);
        const _e = (C, B, K) => {
          const k = W && K !== _ ? K : D;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(C, g, B, k, X, c)
            : this.backendConnector?.saveMissing &&
              this.backendConnector.saveMissing(C, g, B, k, X, c),
            this.emit("missingKey", C, g, B, _);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && P
            ? te.forEach((C) => {
                const B = this.pluralResolver.getSuffixes(C, c);
                Ee &&
                  c[`defaultValue${this.options.pluralSeparator}zero`] &&
                  B.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  B.push(`${this.options.pluralSeparator}zero`),
                  B.forEach((K) => {
                    _e([C], m + K, c[`defaultValue${K}`] || ye);
                  });
              })
            : _e(te, m, ye));
      }
      (_ = this.extendTranslation(_, i, c, x, o)),
        ce &&
          _ === m &&
          this.options.appendNamespaceToMissingKey &&
          (_ = `${g}${v}${m}`),
        (ce || le) &&
          this.options.parseMissingKeyHandler &&
          (_ = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${g}${v}${m}` : m,
            le ? _ : void 0,
            c
          ));
    }
    return d
      ? ((x.res = _), (x.usedParams = this.getUsedParamsDetails(c)), x)
      : _;
  }
  extendTranslation(i, s, o, c, d) {
    if (this.i18nFormat?.parse)
      i = this.i18nFormat.parse(
        i,
        { ...this.options.interpolation.defaultVariables, ...o },
        o.lng || this.language || c.usedLng,
        c.usedNS,
        c.usedKey,
        { resolved: c }
      );
    else if (!o.skipInterpolation) {
      o.interpolation &&
        this.interpolator.init({
          ...o,
          interpolation: { ...this.options.interpolation, ...o.interpolation },
        });
      const p =
        ae(i) &&
        (o?.interpolation?.skipOnVariables !== void 0
          ? o.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let g;
      if (p) {
        const b = i.match(this.interpolator.nestingRegexp);
        g = b && b.length;
      }
      let v = o.replace && !ae(o.replace) ? o.replace : o;
      if (
        (this.options.interpolation.defaultVariables &&
          (v = { ...this.options.interpolation.defaultVariables, ...v }),
        (i = this.interpolator.interpolate(
          i,
          v,
          o.lng || this.language || c.usedLng,
          o
        )),
        p)
      ) {
        const b = i.match(this.interpolator.nestingRegexp),
          S = b && b.length;
        g < S && (o.nest = !1);
      }
      !o.lng && c && c.res && (o.lng = this.language || c.usedLng),
        o.nest !== !1 &&
          (i = this.interpolator.nest(
            i,
            (...b) =>
              d?.[0] === b[0] && !o.context
                ? (this.logger.warn(
                    `It seems you are nesting recursively key: ${b[0]} in key: ${s[0]}`
                  ),
                  null)
                : this.translate(...b, s),
            o
          )),
        o.interpolation && this.interpolator.reset();
    }
    const h = o.postProcess || this.options.postProcess,
      m = ae(h) ? [h] : h;
    return (
      i != null &&
        m?.length &&
        o.applyPostProcessor !== !1 &&
        (i = Xm.handle(
          m,
          i,
          s,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...c,
                  usedParams: this.getUsedParamsDetails(o),
                },
                ...o,
              }
            : o,
          this
        )),
      i
    );
  }
  resolve(i, s = {}) {
    let o, c, d, h, m;
    return (
      ae(i) && (i = [i]),
      i.forEach((p) => {
        if (this.isValidLookup(o)) return;
        const g = this.extractFromKey(p, s),
          v = g.key;
        c = v;
        let b = g.namespaces;
        this.options.fallbackNS && (b = b.concat(this.options.fallbackNS));
        const S = s.count !== void 0 && !ae(s.count),
          x = S && !s.ordinal && s.count === 0,
          _ =
            s.context !== void 0 &&
            (ae(s.context) || typeof s.context == "number") &&
            s.context !== "",
          z = s.lngs
            ? s.lngs
            : this.languageUtils.toResolveHierarchy(
                s.lng || this.language,
                s.fallbackLng
              );
        b.forEach((O) => {
          this.isValidLookup(o) ||
            ((m = O),
            !rm[`${z[0]}-${O}`] &&
              this.utils?.hasLoadedNamespace &&
              !this.utils?.hasLoadedNamespace(m) &&
              ((rm[`${z[0]}-${O}`] = !0),
              this.logger.warn(
                `key "${c}" for languages "${z.join(
                  ", "
                )}" won't get resolved as namespace "${m}" was not yet loaded`,
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
              )),
            z.forEach((L) => {
              if (this.isValidLookup(o)) return;
              h = L;
              const U = [v];
              if (this.i18nFormat?.addLookupKeys)
                this.i18nFormat.addLookupKeys(U, v, L, O, s);
              else {
                let P;
                S && (P = this.pluralResolver.getSuffix(L, s.count, s));
                const W = `${this.options.pluralSeparator}zero`,
                  ue = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (S &&
                    (s.ordinal &&
                      P.indexOf(ue) === 0 &&
                      U.push(v + P.replace(ue, this.options.pluralSeparator)),
                    U.push(v + P),
                    x && U.push(v + W)),
                  _)
                ) {
                  const I = `${v}${this.options.contextSeparator || "_"}${
                    s.context
                  }`;
                  U.push(I),
                    S &&
                      (s.ordinal &&
                        P.indexOf(ue) === 0 &&
                        U.push(I + P.replace(ue, this.options.pluralSeparator)),
                      U.push(I + P),
                      x && U.push(I + W));
                }
              }
              let Q;
              for (; (Q = U.pop()); )
                this.isValidLookup(o) ||
                  ((d = Q), (o = this.getResource(L, O, Q, s)));
            }));
        });
      }),
      { res: o, usedKey: c, exactUsedKey: d, usedLng: h, usedNS: m }
    );
  }
  isValidLookup(i) {
    return (
      i !== void 0 &&
      !(!this.options.returnNull && i === null) &&
      !(!this.options.returnEmptyString && i === "")
    );
  }
  getResource(i, s, o, c = {}) {
    return this.i18nFormat?.getResource
      ? this.i18nFormat.getResource(i, s, o, c)
      : this.resourceStore.getResource(i, s, o, c);
  }
  getUsedParamsDetails(i = {}) {
    const s = [
        "defaultValue",
        "ordinal",
        "context",
        "replace",
        "lng",
        "lngs",
        "fallbackLng",
        "ns",
        "keySeparator",
        "nsSeparator",
        "returnObjects",
        "returnDetails",
        "joinArrays",
        "postProcess",
        "interpolation",
      ],
      o = i.replace && !ae(i.replace);
    let c = o ? i.replace : i;
    if (
      (o && typeof i.count < "u" && (c.count = i.count),
      this.options.interpolation.defaultVariables &&
        (c = { ...this.options.interpolation.defaultVariables, ...c }),
      !o)
    ) {
      c = { ...c };
      for (const d of s) delete c[d];
    }
    return c;
  }
  static hasDefaultValue(i) {
    const s = "defaultValue";
    for (const o in i)
      if (
        Object.prototype.hasOwnProperty.call(i, o) &&
        s === o.substring(0, s.length) &&
        i[o] !== void 0
      )
        return !0;
    return !1;
  }
}
class om {
  constructor(i) {
    (this.options = i),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = Bt.create("languageUtils"));
  }
  getScriptPartFromCode(i) {
    if (((i = Za(i)), !i || i.indexOf("-") < 0)) return null;
    const s = i.split("-");
    return s.length === 2 || (s.pop(), s[s.length - 1].toLowerCase() === "x")
      ? null
      : this.formatLanguageCode(s.join("-"));
  }
  getLanguagePartFromCode(i) {
    if (((i = Za(i)), !i || i.indexOf("-") < 0)) return i;
    const s = i.split("-");
    return this.formatLanguageCode(s[0]);
  }
  formatLanguageCode(i) {
    if (ae(i) && i.indexOf("-") > -1) {
      let s;
      try {
        s = Intl.getCanonicalLocales(i)[0];
      } catch {}
      return (
        s && this.options.lowerCaseLng && (s = s.toLowerCase()),
        s || (this.options.lowerCaseLng ? i.toLowerCase() : i)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? i.toLowerCase()
      : i;
  }
  isSupportedCode(i) {
    return (
      (this.options.load === "languageOnly" ||
        this.options.nonExplicitSupportedLngs) &&
        (i = this.getLanguagePartFromCode(i)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(i) > -1
    );
  }
  getBestMatchFromCodes(i) {
    if (!i) return null;
    let s;
    return (
      i.forEach((o) => {
        if (s) return;
        const c = this.formatLanguageCode(o);
        (!this.options.supportedLngs || this.isSupportedCode(c)) && (s = c);
      }),
      !s &&
        this.options.supportedLngs &&
        i.forEach((o) => {
          if (s) return;
          const c = this.getScriptPartFromCode(o);
          if (this.isSupportedCode(c)) return (s = c);
          const d = this.getLanguagePartFromCode(o);
          if (this.isSupportedCode(d)) return (s = d);
          s = this.options.supportedLngs.find((h) => {
            if (h === d) return h;
            if (
              !(h.indexOf("-") < 0 && d.indexOf("-") < 0) &&
              ((h.indexOf("-") > 0 &&
                d.indexOf("-") < 0 &&
                h.substring(0, h.indexOf("-")) === d) ||
                (h.indexOf(d) === 0 && d.length > 1))
            )
              return h;
          });
        }),
      s || (s = this.getFallbackCodes(this.options.fallbackLng)[0]),
      s
    );
  }
  getFallbackCodes(i, s) {
    if (!i) return [];
    if (
      (typeof i == "function" && (i = i(s)),
      ae(i) && (i = [i]),
      Array.isArray(i))
    )
      return i;
    if (!s) return i.default || [];
    let o = i[s];
    return (
      o || (o = i[this.getScriptPartFromCode(s)]),
      o || (o = i[this.formatLanguageCode(s)]),
      o || (o = i[this.getLanguagePartFromCode(s)]),
      o || (o = i.default),
      o || []
    );
  }
  toResolveHierarchy(i, s) {
    const o = this.getFallbackCodes(
        (s === !1 ? [] : s) || this.options.fallbackLng || [],
        i
      ),
      c = [],
      d = (h) => {
        h &&
          (this.isSupportedCode(h)
            ? c.push(h)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${h}`
              ));
      };
    return (
      ae(i) && (i.indexOf("-") > -1 || i.indexOf("_") > -1)
        ? (this.options.load !== "languageOnly" &&
            d(this.formatLanguageCode(i)),
          this.options.load !== "languageOnly" &&
            this.options.load !== "currentOnly" &&
            d(this.getScriptPartFromCode(i)),
          this.options.load !== "currentOnly" &&
            d(this.getLanguagePartFromCode(i)))
        : ae(i) && d(this.formatLanguageCode(i)),
      o.forEach((h) => {
        c.indexOf(h) < 0 && d(this.formatLanguageCode(h));
      }),
      c
    );
  }
}
const cm = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  fm = {
    select: (r) => (r === 1 ? "one" : "other"),
    resolvedOptions: () => ({ pluralCategories: ["one", "other"] }),
  };
class Hy {
  constructor(i, s = {}) {
    (this.languageUtils = i),
      (this.options = s),
      (this.logger = Bt.create("pluralResolver")),
      (this.pluralRulesCache = {});
  }
  addRule(i, s) {
    this.rules[i] = s;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(i, s = {}) {
    const o = Za(i === "dev" ? "en" : i),
      c = s.ordinal ? "ordinal" : "cardinal",
      d = JSON.stringify({ cleanedCode: o, type: c });
    if (d in this.pluralRulesCache) return this.pluralRulesCache[d];
    let h;
    try {
      h = new Intl.PluralRules(o, { type: c });
    } catch {
      if (!Intl)
        return (
          this.logger.error("No Intl support, please use an Intl polyfill!"), fm
        );
      if (!i.match(/-|_/)) return fm;
      const p = this.languageUtils.getLanguagePartFromCode(i);
      h = this.getRule(p, s);
    }
    return (this.pluralRulesCache[d] = h), h;
  }
  needsPlural(i, s = {}) {
    let o = this.getRule(i, s);
    return (
      o || (o = this.getRule("dev", s)),
      o?.resolvedOptions().pluralCategories.length > 1
    );
  }
  getPluralFormsOfKey(i, s, o = {}) {
    return this.getSuffixes(i, o).map((c) => `${s}${c}`);
  }
  getSuffixes(i, s = {}) {
    let o = this.getRule(i, s);
    return (
      o || (o = this.getRule("dev", s)),
      o
        ? o
            .resolvedOptions()
            .pluralCategories.sort((c, d) => cm[c] - cm[d])
            .map(
              (c) =>
                `${this.options.prepend}${
                  s.ordinal ? `ordinal${this.options.prepend}` : ""
                }${c}`
            )
        : []
    );
  }
  getSuffix(i, s, o = {}) {
    const c = this.getRule(i, o);
    return c
      ? `${this.options.prepend}${
          o.ordinal ? `ordinal${this.options.prepend}` : ""
        }${c.select(s)}`
      : (this.logger.warn(`no plural rule found for: ${i}`),
        this.getSuffix("dev", s, o));
  }
}
const dm = (r, i, s, o = ".", c = !0) => {
    let d = Ty(r, i, s);
    return (
      !d &&
        c &&
        ae(s) &&
        ((d = xo(r, s, o)), d === void 0 && (d = xo(i, s, o))),
      d
    );
  },
  fo = (r) => r.replace(/\$/g, "$$$$");
class By {
  constructor(i = {}) {
    (this.logger = Bt.create("interpolator")),
      (this.options = i),
      (this.format = i?.interpolation?.format || ((s) => s)),
      this.init(i);
  }
  init(i = {}) {
    i.interpolation || (i.interpolation = { escapeValue: !0 });
    const {
      escape: s,
      escapeValue: o,
      useRawValueToEscape: c,
      prefix: d,
      prefixEscaped: h,
      suffix: m,
      suffixEscaped: p,
      formatSeparator: g,
      unescapeSuffix: v,
      unescapePrefix: b,
      nestingPrefix: S,
      nestingPrefixEscaped: x,
      nestingSuffix: _,
      nestingSuffixEscaped: z,
      nestingOptionsSeparator: O,
      maxReplaces: L,
      alwaysFormat: U,
    } = i.interpolation;
    (this.escape = s !== void 0 ? s : Ry),
      (this.escapeValue = o !== void 0 ? o : !0),
      (this.useRawValueToEscape = c !== void 0 ? c : !1),
      (this.prefix = d ? ql(d) : h || "{{"),
      (this.suffix = m ? ql(m) : p || "}}"),
      (this.formatSeparator = g || ","),
      (this.unescapePrefix = v ? "" : b || "-"),
      (this.unescapeSuffix = this.unescapePrefix ? "" : v || ""),
      (this.nestingPrefix = S ? ql(S) : x || ql("$t(")),
      (this.nestingSuffix = _ ? ql(_) : z || ql(")")),
      (this.nestingOptionsSeparator = O || ","),
      (this.maxReplaces = L || 1e3),
      (this.alwaysFormat = U !== void 0 ? U : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const i = (s, o) =>
      s?.source === o ? ((s.lastIndex = 0), s) : new RegExp(o, "g");
    (this.regexp = i(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = i(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`
      )),
      (this.nestingRegexp = i(
        this.nestingRegexp,
        `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`
      ));
  }
  interpolate(i, s, o, c) {
    let d, h, m;
    const p =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      g = (x) => {
        if (x.indexOf(this.formatSeparator) < 0) {
          const L = dm(
            s,
            p,
            x,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          );
          return this.alwaysFormat
            ? this.format(L, void 0, o, { ...c, ...s, interpolationkey: x })
            : L;
        }
        const _ = x.split(this.formatSeparator),
          z = _.shift().trim(),
          O = _.join(this.formatSeparator).trim();
        return this.format(
          dm(
            s,
            p,
            z,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          ),
          O,
          o,
          { ...c, ...s, interpolationkey: z }
        );
      };
    this.resetRegExp();
    const v =
        c?.missingInterpolationHandler ||
        this.options.missingInterpolationHandler,
      b =
        c?.interpolation?.skipOnVariables !== void 0
          ? c.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (x) => fo(x) },
        {
          regex: this.regexp,
          safeValue: (x) => (this.escapeValue ? fo(this.escape(x)) : fo(x)),
        },
      ].forEach((x) => {
        for (m = 0; (d = x.regex.exec(i)); ) {
          const _ = d[1].trim();
          if (((h = g(_)), h === void 0))
            if (typeof v == "function") {
              const O = v(i, d, c);
              h = ae(O) ? O : "";
            } else if (c && Object.prototype.hasOwnProperty.call(c, _)) h = "";
            else if (b) {
              h = d[0];
              continue;
            } else
              this.logger.warn(
                `missed to pass in variable ${_} for interpolating ${i}`
              ),
                (h = "");
          else !ae(h) && !this.useRawValueToEscape && (h = nm(h));
          const z = x.safeValue(h);
          if (
            ((i = i.replace(d[0], z)),
            b
              ? ((x.regex.lastIndex += h.length),
                (x.regex.lastIndex -= d[0].length))
              : (x.regex.lastIndex = 0),
            m++,
            m >= this.maxReplaces)
          )
            break;
        }
      }),
      i
    );
  }
  nest(i, s, o = {}) {
    let c, d, h;
    const m = (p, g) => {
      const v = this.nestingOptionsSeparator;
      if (p.indexOf(v) < 0) return p;
      const b = p.split(new RegExp(`${v}[ ]*{`));
      let S = `{${b[1]}`;
      (p = b[0]), (S = this.interpolate(S, h));
      const x = S.match(/'/g),
        _ = S.match(/"/g);
      (((x?.length ?? 0) % 2 === 0 && !_) || _.length % 2 !== 0) &&
        (S = S.replace(/'/g, '"'));
      try {
        (h = JSON.parse(S)), g && (h = { ...g, ...h });
      } catch (z) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${p}`,
            z
          ),
          `${p}${v}${S}`
        );
      }
      return (
        h.defaultValue &&
          h.defaultValue.indexOf(this.prefix) > -1 &&
          delete h.defaultValue,
        p
      );
    };
    for (; (c = this.nestingRegexp.exec(i)); ) {
      let p = [];
      (h = { ...o }),
        (h = h.replace && !ae(h.replace) ? h.replace : h),
        (h.applyPostProcessor = !1),
        delete h.defaultValue;
      const g = /{.*}/.test(c[1])
        ? c[1].lastIndexOf("}") + 1
        : c[1].indexOf(this.formatSeparator);
      if (
        (g !== -1 &&
          ((p = c[1]
            .slice(g)
            .split(this.formatSeparator)
            .map((v) => v.trim())
            .filter(Boolean)),
          (c[1] = c[1].slice(0, g))),
        (d = s(m.call(this, c[1].trim(), h), h)),
        d && c[0] === i && !ae(d))
      )
        return d;
      ae(d) || (d = nm(d)),
        d ||
          (this.logger.warn(`missed to resolve ${c[1]} for nesting ${i}`),
          (d = "")),
        p.length &&
          (d = p.reduce(
            (v, b) =>
              this.format(v, b, o.lng, { ...o, interpolationkey: c[1].trim() }),
            d.trim()
          )),
        (i = i.replace(c[0], d)),
        (this.regexp.lastIndex = 0);
    }
    return i;
  }
}
const qy = (r) => {
    let i = r.toLowerCase().trim();
    const s = {};
    if (r.indexOf("(") > -1) {
      const o = r.split("(");
      i = o[0].toLowerCase().trim();
      const c = o[1].substring(0, o[1].length - 1);
      i === "currency" && c.indexOf(":") < 0
        ? s.currency || (s.currency = c.trim())
        : i === "relativetime" && c.indexOf(":") < 0
        ? s.range || (s.range = c.trim())
        : c.split(";").forEach((h) => {
            if (h) {
              const [m, ...p] = h.split(":"),
                g = p
                  .join(":")
                  .trim()
                  .replace(/^'+|'+$/g, ""),
                v = m.trim();
              s[v] || (s[v] = g),
                g === "false" && (s[v] = !1),
                g === "true" && (s[v] = !0),
                isNaN(g) || (s[v] = parseInt(g, 10));
            }
          });
    }
    return { formatName: i, formatOptions: s };
  },
  hm = (r) => {
    const i = {};
    return (s, o, c) => {
      let d = c;
      c &&
        c.interpolationkey &&
        c.formatParams &&
        c.formatParams[c.interpolationkey] &&
        c[c.interpolationkey] &&
        (d = { ...d, [c.interpolationkey]: void 0 });
      const h = o + JSON.stringify(d);
      let m = i[h];
      return m || ((m = r(Za(o), c)), (i[h] = m)), m(s);
    };
  },
  Yy = (r) => (i, s, o) => r(Za(s), o)(i);
class Gy {
  constructor(i = {}) {
    (this.logger = Bt.create("formatter")), (this.options = i), this.init(i);
  }
  init(i, s = { interpolation: {} }) {
    this.formatSeparator = s.interpolation.formatSeparator || ",";
    const o = s.cacheInBuiltFormats ? hm : Yy;
    this.formats = {
      number: o((c, d) => {
        const h = new Intl.NumberFormat(c, { ...d });
        return (m) => h.format(m);
      }),
      currency: o((c, d) => {
        const h = new Intl.NumberFormat(c, { ...d, style: "currency" });
        return (m) => h.format(m);
      }),
      datetime: o((c, d) => {
        const h = new Intl.DateTimeFormat(c, { ...d });
        return (m) => h.format(m);
      }),
      relativetime: o((c, d) => {
        const h = new Intl.RelativeTimeFormat(c, { ...d });
        return (m) => h.format(m, d.range || "day");
      }),
      list: o((c, d) => {
        const h = new Intl.ListFormat(c, { ...d });
        return (m) => h.format(m);
      }),
    };
  }
  add(i, s) {
    this.formats[i.toLowerCase().trim()] = s;
  }
  addCached(i, s) {
    this.formats[i.toLowerCase().trim()] = hm(s);
  }
  format(i, s, o, c = {}) {
    const d = s.split(this.formatSeparator);
    if (
      d.length > 1 &&
      d[0].indexOf("(") > 1 &&
      d[0].indexOf(")") < 0 &&
      d.find((m) => m.indexOf(")") > -1)
    ) {
      const m = d.findIndex((p) => p.indexOf(")") > -1);
      d[0] = [d[0], ...d.splice(1, m)].join(this.formatSeparator);
    }
    return d.reduce((m, p) => {
      const { formatName: g, formatOptions: v } = qy(p);
      if (this.formats[g]) {
        let b = m;
        try {
          const S = c?.formatParams?.[c.interpolationkey] || {},
            x = S.locale || S.lng || c.locale || c.lng || o;
          b = this.formats[g](m, x, { ...v, ...c, ...S });
        } catch (S) {
          this.logger.warn(S);
        }
        return b;
      } else this.logger.warn(`there was no format function for ${g}`);
      return m;
    }, i);
  }
}
const Vy = (r, i) => {
  r.pending[i] !== void 0 && (delete r.pending[i], r.pendingCount--);
};
class Qy extends Nu {
  constructor(i, s, o, c = {}) {
    super(),
      (this.backend = i),
      (this.store = s),
      (this.services = o),
      (this.languageUtils = o.languageUtils),
      (this.options = c),
      (this.logger = Bt.create("backendConnector")),
      (this.waitingReads = []),
      (this.maxParallelReads = c.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = c.maxRetries >= 0 ? c.maxRetries : 5),
      (this.retryTimeout = c.retryTimeout >= 1 ? c.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      this.backend?.init?.(o, c.backend, c);
  }
  queueLoad(i, s, o, c) {
    const d = {},
      h = {},
      m = {},
      p = {};
    return (
      i.forEach((g) => {
        let v = !0;
        s.forEach((b) => {
          const S = `${g}|${b}`;
          !o.reload && this.store.hasResourceBundle(g, b)
            ? (this.state[S] = 2)
            : this.state[S] < 0 ||
              (this.state[S] === 1
                ? h[S] === void 0 && (h[S] = !0)
                : ((this.state[S] = 1),
                  (v = !1),
                  h[S] === void 0 && (h[S] = !0),
                  d[S] === void 0 && (d[S] = !0),
                  p[b] === void 0 && (p[b] = !0)));
        }),
          v || (m[g] = !0);
      }),
      (Object.keys(d).length || Object.keys(h).length) &&
        this.queue.push({
          pending: h,
          pendingCount: Object.keys(h).length,
          loaded: {},
          errors: [],
          callback: c,
        }),
      {
        toLoad: Object.keys(d),
        pending: Object.keys(h),
        toLoadLanguages: Object.keys(m),
        toLoadNamespaces: Object.keys(p),
      }
    );
  }
  loaded(i, s, o) {
    const c = i.split("|"),
      d = c[0],
      h = c[1];
    s && this.emit("failedLoading", d, h, s),
      !s &&
        o &&
        this.store.addResourceBundle(d, h, o, void 0, void 0, { skipCopy: !0 }),
      (this.state[i] = s ? -1 : 2),
      s && o && (this.state[i] = 0);
    const m = {};
    this.queue.forEach((p) => {
      Oy(p.loaded, [d], h),
        Vy(p, i),
        s && p.errors.push(s),
        p.pendingCount === 0 &&
          !p.done &&
          (Object.keys(p.loaded).forEach((g) => {
            m[g] || (m[g] = {});
            const v = p.loaded[g];
            v.length &&
              v.forEach((b) => {
                m[g][b] === void 0 && (m[g][b] = !0);
              });
          }),
          (p.done = !0),
          p.errors.length ? p.callback(p.errors) : p.callback());
    }),
      this.emit("loaded", m),
      (this.queue = this.queue.filter((p) => !p.done));
  }
  read(i, s, o, c = 0, d = this.retryTimeout, h) {
    if (!i.length) return h(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: i,
        ns: s,
        fcName: o,
        tried: c,
        wait: d,
        callback: h,
      });
      return;
    }
    this.readingCalls++;
    const m = (g, v) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const b = this.waitingReads.shift();
          this.read(b.lng, b.ns, b.fcName, b.tried, b.wait, b.callback);
        }
        if (g && v && c < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, i, s, o, c + 1, d * 2, h);
          }, d);
          return;
        }
        h(g, v);
      },
      p = this.backend[o].bind(this.backend);
    if (p.length === 2) {
      try {
        const g = p(i, s);
        g && typeof g.then == "function"
          ? g.then((v) => m(null, v)).catch(m)
          : m(null, g);
      } catch (g) {
        m(g);
      }
      return;
    }
    return p(i, s, m);
  }
  prepareLoading(i, s, o = {}, c) {
    if (!this.backend)
      return (
        this.logger.warn(
          "No backend was added via i18next.use. Will not load resources."
        ),
        c && c()
      );
    ae(i) && (i = this.languageUtils.toResolveHierarchy(i)), ae(s) && (s = [s]);
    const d = this.queueLoad(i, s, o, c);
    if (!d.toLoad.length) return d.pending.length || c(), null;
    d.toLoad.forEach((h) => {
      this.loadOne(h);
    });
  }
  load(i, s, o) {
    this.prepareLoading(i, s, {}, o);
  }
  reload(i, s, o) {
    this.prepareLoading(i, s, { reload: !0 }, o);
  }
  loadOne(i, s = "") {
    const o = i.split("|"),
      c = o[0],
      d = o[1];
    this.read(c, d, "read", void 0, void 0, (h, m) => {
      h &&
        this.logger.warn(
          `${s}loading namespace ${d} for language ${c} failed`,
          h
        ),
        !h &&
          m &&
          this.logger.log(`${s}loaded namespace ${d} for language ${c}`, m),
        this.loaded(i, h, m);
    });
  }
  saveMissing(i, s, o, c, d, h = {}, m = () => {}) {
    if (
      this.services?.utils?.hasLoadedNamespace &&
      !this.services?.utils?.hasLoadedNamespace(s)
    ) {
      this.logger.warn(
        `did not save key "${o}" as the namespace "${s}" was not yet loaded`,
        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
      );
      return;
    }
    if (!(o == null || o === "")) {
      if (this.backend?.create) {
        const p = { ...h, isUpdate: d },
          g = this.backend.create.bind(this.backend);
        if (g.length < 6)
          try {
            let v;
            g.length === 5 ? (v = g(i, s, o, c, p)) : (v = g(i, s, o, c)),
              v && typeof v.then == "function"
                ? v.then((b) => m(null, b)).catch(m)
                : m(null, v);
          } catch (v) {
            m(v);
          }
        else g(i, s, o, c, m, p);
      }
      !i || !i[0] || this.store.addResource(i[0], s, o, c);
    }
  }
}
const mm = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (r) => {
      let i = {};
      if (
        (typeof r[1] == "object" && (i = r[1]),
        ae(r[1]) && (i.defaultValue = r[1]),
        ae(r[2]) && (i.tDescription = r[2]),
        typeof r[2] == "object" || typeof r[3] == "object")
      ) {
        const s = r[3] || r[2];
        Object.keys(s).forEach((o) => {
          i[o] = s[o];
        });
      }
      return i;
    },
    interpolation: {
      escapeValue: !0,
      format: (r) => r,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
    cacheInBuiltFormats: !0,
  }),
  gm = (r) => (
    ae(r.ns) && (r.ns = [r.ns]),
    ae(r.fallbackLng) && (r.fallbackLng = [r.fallbackLng]),
    ae(r.fallbackNS) && (r.fallbackNS = [r.fallbackNS]),
    r.supportedLngs?.indexOf?.("cimode") < 0 &&
      (r.supportedLngs = r.supportedLngs.concat(["cimode"])),
    typeof r.initImmediate == "boolean" && (r.initAsync = r.initImmediate),
    r
  ),
  vu = () => {},
  Xy = (r) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach((s) => {
      typeof r[s] == "function" && (r[s] = r[s].bind(r));
    });
  };
class Ka extends Nu {
  constructor(i = {}, s) {
    if (
      (super(),
      (this.options = gm(i)),
      (this.services = {}),
      (this.logger = Bt),
      (this.modules = { external: [] }),
      Xy(this),
      s && !this.isInitialized && !i.isClone)
    ) {
      if (!this.options.initAsync) return this.init(i, s), this;
      setTimeout(() => {
        this.init(i, s);
      }, 0);
    }
  }
  init(i = {}, s) {
    (this.isInitializing = !0),
      typeof i == "function" && ((s = i), (i = {})),
      i.defaultNS == null &&
        i.ns &&
        (ae(i.ns)
          ? (i.defaultNS = i.ns)
          : i.ns.indexOf("translation") < 0 && (i.defaultNS = i.ns[0]));
    const o = mm();
    (this.options = { ...o, ...this.options, ...gm(i) }),
      (this.options.interpolation = {
        ...o.interpolation,
        ...this.options.interpolation,
      }),
      i.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = i.keySeparator),
      i.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = i.nsSeparator);
    const c = (g) => (g ? (typeof g == "function" ? new g() : g) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? Bt.init(c(this.modules.logger), this.options)
        : Bt.init(null, this.options);
      let g;
      this.modules.formatter ? (g = this.modules.formatter) : (g = Gy);
      const v = new om(this.options);
      this.store = new um(this.options.resources, this.options);
      const b = this.services;
      (b.logger = Bt),
        (b.resourceStore = this.store),
        (b.languageUtils = v),
        (b.pluralResolver = new Hy(v, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        this.options.interpolation.format &&
          this.options.interpolation.format !== o.interpolation.format &&
          this.logger.deprecate(
            "init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"
          ),
        g &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === o.interpolation.format) &&
          ((b.formatter = c(g)),
          b.formatter.init && b.formatter.init(b, this.options),
          (this.options.interpolation.format = b.formatter.format.bind(
            b.formatter
          ))),
        (b.interpolator = new By(this.options)),
        (b.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (b.backendConnector = new Qy(
          c(this.modules.backend),
          b.resourceStore,
          b,
          this.options
        )),
        b.backendConnector.on("*", (x, ..._) => {
          this.emit(x, ..._);
        }),
        this.modules.languageDetector &&
          ((b.languageDetector = c(this.modules.languageDetector)),
          b.languageDetector.init &&
            b.languageDetector.init(b, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((b.i18nFormat = c(this.modules.i18nFormat)),
          b.i18nFormat.init && b.i18nFormat.init(this)),
        (this.translator = new wu(this.services, this.options)),
        this.translator.on("*", (x, ..._) => {
          this.emit(x, ..._);
        }),
        this.modules.external.forEach((x) => {
          x.init && x.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      s || (s = vu),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const g = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng
      );
      g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        "init: no languageDetector is used and no lng is defined"
      ),
      [
        "getResource",
        "hasResourceBundle",
        "getResourceBundle",
        "getDataByLanguage",
      ].forEach((g) => {
        this[g] = (...v) => this.store[g](...v);
      }),
      [
        "addResource",
        "addResources",
        "addResourceBundle",
        "removeResourceBundle",
      ].forEach((g) => {
        this[g] = (...v) => (this.store[g](...v), this);
      });
    const m = Ya(),
      p = () => {
        const g = (v, b) => {
          (this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                "init: i18next is already initialized. You should call init just once!"
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log("initialized", this.options),
            this.emit("initialized", this.options),
            m.resolve(b),
            s(v, b);
        };
        if (this.languages && !this.isInitialized)
          return g(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, g);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? p()
        : setTimeout(p, 0),
      m
    );
  }
  loadResources(i, s = vu) {
    let o = s;
    const c = ae(i) ? i : this.language;
    if (
      (typeof i == "function" && (o = i),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        c?.toLowerCase() === "cimode" &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return o();
      const d = [],
        h = (m) => {
          if (!m || m === "cimode") return;
          this.services.languageUtils.toResolveHierarchy(m).forEach((g) => {
            g !== "cimode" && d.indexOf(g) < 0 && d.push(g);
          });
        };
      c
        ? h(c)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((p) => h(p)),
        this.options.preload?.forEach?.((m) => h(m)),
        this.services.backendConnector.load(d, this.options.ns, (m) => {
          !m &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            o(m);
        });
    } else o(null);
  }
  reloadResources(i, s, o) {
    const c = Ya();
    return (
      typeof i == "function" && ((o = i), (i = void 0)),
      typeof s == "function" && ((o = s), (s = void 0)),
      i || (i = this.languages),
      s || (s = this.options.ns),
      o || (o = vu),
      this.services.backendConnector.reload(i, s, (d) => {
        c.resolve(), o(d);
      }),
      c
    );
  }
  use(i) {
    if (!i)
      throw new Error(
        "You are passing an undefined module! Please check the object you are passing to i18next.use()"
      );
    if (!i.type)
      throw new Error(
        "You are passing a wrong module! Please check the object you are passing to i18next.use()"
      );
    return (
      i.type === "backend" && (this.modules.backend = i),
      (i.type === "logger" || (i.log && i.warn && i.error)) &&
        (this.modules.logger = i),
      i.type === "languageDetector" && (this.modules.languageDetector = i),
      i.type === "i18nFormat" && (this.modules.i18nFormat = i),
      i.type === "postProcessor" && Xm.addPostProcessor(i),
      i.type === "formatter" && (this.modules.formatter = i),
      i.type === "3rdParty" && this.modules.external.push(i),
      this
    );
  }
  setResolvedLanguage(i) {
    if (!(!i || !this.languages) && !(["cimode", "dev"].indexOf(i) > -1)) {
      for (let s = 0; s < this.languages.length; s++) {
        const o = this.languages[s];
        if (
          !(["cimode", "dev"].indexOf(o) > -1) &&
          this.store.hasLanguageSomeTranslations(o)
        ) {
          this.resolvedLanguage = o;
          break;
        }
      }
      !this.resolvedLanguage &&
        this.languages.indexOf(i) < 0 &&
        this.store.hasLanguageSomeTranslations(i) &&
        ((this.resolvedLanguage = i), this.languages.unshift(i));
    }
  }
  changeLanguage(i, s) {
    this.isLanguageChangingTo = i;
    const o = Ya();
    this.emit("languageChanging", i);
    const c = (m) => {
        (this.language = m),
          (this.languages = this.services.languageUtils.toResolveHierarchy(m)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(m);
      },
      d = (m, p) => {
        p
          ? this.isLanguageChangingTo === i &&
            (c(p),
            this.translator.changeLanguage(p),
            (this.isLanguageChangingTo = void 0),
            this.emit("languageChanged", p),
            this.logger.log("languageChanged", p))
          : (this.isLanguageChangingTo = void 0),
          o.resolve((...g) => this.t(...g)),
          s && s(m, (...g) => this.t(...g));
      },
      h = (m) => {
        !i && !m && this.services.languageDetector && (m = []);
        const p = ae(m) ? m : m && m[0],
          g = this.store.hasLanguageSomeTranslations(p)
            ? p
            : this.services.languageUtils.getBestMatchFromCodes(
                ae(m) ? [m] : m
              );
        g &&
          (this.language || c(g),
          this.translator.language || this.translator.changeLanguage(g),
          this.services.languageDetector?.cacheUserLanguage?.(g)),
          this.loadResources(g, (v) => {
            d(v, g);
          });
      };
    return (
      !i &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? h(this.services.languageDetector.detect())
        : !i &&
          this.services.languageDetector &&
          this.services.languageDetector.async
        ? this.services.languageDetector.detect.length === 0
          ? this.services.languageDetector.detect().then(h)
          : this.services.languageDetector.detect(h)
        : h(i),
      o
    );
  }
  getFixedT(i, s, o) {
    const c = (d, h, ...m) => {
      let p;
      typeof h != "object"
        ? (p = this.options.overloadTranslationOptionHandler([d, h].concat(m)))
        : (p = { ...h }),
        (p.lng = p.lng || c.lng),
        (p.lngs = p.lngs || c.lngs),
        (p.ns = p.ns || c.ns),
        p.keyPrefix !== "" && (p.keyPrefix = p.keyPrefix || o || c.keyPrefix);
      const g = this.options.keySeparator || ".";
      let v;
      return (
        p.keyPrefix && Array.isArray(d)
          ? (v = d.map(
              (b) => (
                typeof b == "function" && (b = Eo(b, h)),
                `${p.keyPrefix}${g}${b}`
              )
            ))
          : (typeof d == "function" && (d = Eo(d, h)),
            (v = p.keyPrefix ? `${p.keyPrefix}${g}${d}` : d)),
        this.t(v, p)
      );
    };
    return ae(i) ? (c.lng = i) : (c.lngs = i), (c.ns = s), (c.keyPrefix = o), c;
  }
  t(...i) {
    return this.translator?.translate(...i);
  }
  exists(...i) {
    return this.translator?.exists(...i);
  }
  setDefaultNamespace(i) {
    this.options.defaultNS = i;
  }
  hasLoadedNamespace(i, s = {}) {
    if (!this.isInitialized)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18next was not initialized",
          this.languages
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18n.languages were undefined or empty",
          this.languages
        ),
        !1
      );
    const o = s.lng || this.resolvedLanguage || this.languages[0],
      c = this.options ? this.options.fallbackLng : !1,
      d = this.languages[this.languages.length - 1];
    if (o.toLowerCase() === "cimode") return !0;
    const h = (m, p) => {
      const g = this.services.backendConnector.state[`${m}|${p}`];
      return g === -1 || g === 0 || g === 2;
    };
    if (s.precheck) {
      const m = s.precheck(this, h);
      if (m !== void 0) return m;
    }
    return !!(
      this.hasResourceBundle(o, i) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (h(o, i) && (!c || h(d, i)))
    );
  }
  loadNamespaces(i, s) {
    const o = Ya();
    return this.options.ns
      ? (ae(i) && (i = [i]),
        i.forEach((c) => {
          this.options.ns.indexOf(c) < 0 && this.options.ns.push(c);
        }),
        this.loadResources((c) => {
          o.resolve(), s && s(c);
        }),
        o)
      : (s && s(), Promise.resolve());
  }
  loadLanguages(i, s) {
    const o = Ya();
    ae(i) && (i = [i]);
    const c = this.options.preload || [],
      d = i.filter(
        (h) =>
          c.indexOf(h) < 0 && this.services.languageUtils.isSupportedCode(h)
      );
    return d.length
      ? ((this.options.preload = c.concat(d)),
        this.loadResources((h) => {
          o.resolve(), s && s(h);
        }),
        o)
      : (s && s(), Promise.resolve());
  }
  dir(i) {
    if (
      (i ||
        (i =
          this.resolvedLanguage ||
          (this.languages?.length > 0 ? this.languages[0] : this.language)),
      !i)
    )
      return "rtl";
    try {
      const c = new Intl.Locale(i);
      if (c && c.getTextInfo) {
        const d = c.getTextInfo();
        if (d && d.direction) return d.direction;
      }
    } catch {}
    const s = [
        "ar",
        "shu",
        "sqr",
        "ssh",
        "xaa",
        "yhd",
        "yud",
        "aao",
        "abh",
        "abv",
        "acm",
        "acq",
        "acw",
        "acx",
        "acy",
        "adf",
        "ads",
        "aeb",
        "aec",
        "afb",
        "ajp",
        "apc",
        "apd",
        "arb",
        "arq",
        "ars",
        "ary",
        "arz",
        "auz",
        "avl",
        "ayh",
        "ayl",
        "ayn",
        "ayp",
        "bbz",
        "pga",
        "he",
        "iw",
        "ps",
        "pbt",
        "pbu",
        "pst",
        "prp",
        "prd",
        "ug",
        "ur",
        "ydd",
        "yds",
        "yih",
        "ji",
        "yi",
        "hbo",
        "men",
        "xmn",
        "fa",
        "jpr",
        "peo",
        "pes",
        "prs",
        "dv",
        "sam",
        "ckb",
      ],
      o = this.services?.languageUtils || new om(mm());
    return i.toLowerCase().indexOf("-latn") > 1
      ? "ltr"
      : s.indexOf(o.getLanguagePartFromCode(i)) > -1 ||
        i.toLowerCase().indexOf("-arab") > 1
      ? "rtl"
      : "ltr";
  }
  static createInstance(i = {}, s) {
    return new Ka(i, s);
  }
  cloneInstance(i = {}, s = vu) {
    const o = i.forkResourceStore;
    o && delete i.forkResourceStore;
    const c = { ...this.options, ...i, isClone: !0 },
      d = new Ka(c);
    if (
      ((i.debug !== void 0 || i.prefix !== void 0) &&
        (d.logger = d.logger.clone(i)),
      ["store", "services", "language"].forEach((m) => {
        d[m] = this[m];
      }),
      (d.services = { ...this.services }),
      (d.services.utils = { hasLoadedNamespace: d.hasLoadedNamespace.bind(d) }),
      o)
    ) {
      const m = Object.keys(this.store.data).reduce(
        (p, g) => (
          (p[g] = { ...this.store.data[g] }),
          (p[g] = Object.keys(p[g]).reduce(
            (v, b) => ((v[b] = { ...p[g][b] }), v),
            p[g]
          )),
          p
        ),
        {}
      );
      (d.store = new um(m, c)), (d.services.resourceStore = d.store);
    }
    return (
      (d.translator = new wu(d.services, c)),
      d.translator.on("*", (m, ...p) => {
        d.emit(m, ...p);
      }),
      d.init(c, s),
      (d.translator.options = c),
      (d.translator.backendConnector.services.utils = {
        hasLoadedNamespace: d.hasLoadedNamespace.bind(d),
      }),
      d
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const et = Ka.createInstance();
et.createInstance = Ka.createInstance;
et.createInstance;
et.dir;
et.init;
et.loadResources;
et.reloadResources;
et.use;
et.changeLanguage;
et.getFixedT;
et.t;
et.exists;
et.setDefaultNamespace;
et.hasLoadedNamespace;
et.loadNamespaces;
et.loadLanguages;
const Zy =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  Ky = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/",
  },
  ky = (r) => Ky[r],
  Jy = (r) => r.replace(Zy, ky);
let pm = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Jy,
};
const $y = (r = {}) => {
    pm = { ...pm, ...r };
  },
  Fy = {
    type: "3rdParty",
    init(r) {
      $y(r.options.react);
    },
  },
  { slice: Wy, forEach: Py } = [];
function Iy(r) {
  return (
    Py.call(Wy.call(arguments, 1), (i) => {
      if (i) for (const s in i) r[s] === void 0 && (r[s] = i[s]);
    }),
    r
  );
}
function ev(r) {
  return typeof r != "string"
    ? !1
    : [
        /<\s*script.*?>/i,
        /<\s*\/\s*script\s*>/i,
        /<\s*img.*?on\w+\s*=/i,
        /<\s*\w+\s*on\w+\s*=.*?>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /expression\s*\(/i,
        /eval\s*\(/i,
        /alert\s*\(/i,
        /document\.cookie/i,
        /document\.write\s*\(/i,
        /window\.location/i,
        /innerHTML/i,
      ].some((s) => s.test(r));
}
const ym = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  tv = function (r, i) {
    const o =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: "/" },
      c = encodeURIComponent(i);
    let d = `${r}=${c}`;
    if (o.maxAge > 0) {
      const h = o.maxAge - 0;
      if (Number.isNaN(h)) throw new Error("maxAge should be a Number");
      d += `; Max-Age=${Math.floor(h)}`;
    }
    if (o.domain) {
      if (!ym.test(o.domain)) throw new TypeError("option domain is invalid");
      d += `; Domain=${o.domain}`;
    }
    if (o.path) {
      if (!ym.test(o.path)) throw new TypeError("option path is invalid");
      d += `; Path=${o.path}`;
    }
    if (o.expires) {
      if (typeof o.expires.toUTCString != "function")
        throw new TypeError("option expires is invalid");
      d += `; Expires=${o.expires.toUTCString()}`;
    }
    if (
      (o.httpOnly && (d += "; HttpOnly"),
      o.secure && (d += "; Secure"),
      o.sameSite)
    )
      switch (
        typeof o.sameSite == "string" ? o.sameSite.toLowerCase() : o.sameSite
      ) {
        case !0:
          d += "; SameSite=Strict";
          break;
        case "lax":
          d += "; SameSite=Lax";
          break;
        case "strict":
          d += "; SameSite=Strict";
          break;
        case "none":
          d += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    return o.partitioned && (d += "; Partitioned"), d;
  },
  vm = {
    create(r, i, s, o) {
      let c =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: "/", sameSite: "strict" };
      s &&
        ((c.expires = new Date()),
        c.expires.setTime(c.expires.getTime() + s * 60 * 1e3)),
        o && (c.domain = o),
        (document.cookie = tv(r, i, c));
    },
    read(r) {
      const i = `${r}=`,
        s = document.cookie.split(";");
      for (let o = 0; o < s.length; o++) {
        let c = s[o];
        for (; c.charAt(0) === " "; ) c = c.substring(1, c.length);
        if (c.indexOf(i) === 0) return c.substring(i.length, c.length);
      }
      return null;
    },
    remove(r, i) {
      this.create(r, "", -1, i);
    },
  };
var nv = {
    name: "cookie",
    lookup(r) {
      let { lookupCookie: i } = r;
      if (i && typeof document < "u") return vm.read(i) || void 0;
    },
    cacheUserLanguage(r, i) {
      let {
        lookupCookie: s,
        cookieMinutes: o,
        cookieDomain: c,
        cookieOptions: d,
      } = i;
      s && typeof document < "u" && vm.create(s, r, o, c, d);
    },
  },
  lv = {
    name: "querystring",
    lookup(r) {
      let { lookupQuerystring: i } = r,
        s;
      if (typeof window < "u") {
        let { search: o } = window.location;
        !window.location.search &&
          window.location.hash?.indexOf("?") > -1 &&
          (o = window.location.hash.substring(
            window.location.hash.indexOf("?")
          ));
        const d = o.substring(1).split("&");
        for (let h = 0; h < d.length; h++) {
          const m = d[h].indexOf("=");
          m > 0 && d[h].substring(0, m) === i && (s = d[h].substring(m + 1));
        }
      }
      return s;
    },
  },
  av = {
    name: "hash",
    lookup(r) {
      let { lookupHash: i, lookupFromHashIndex: s } = r,
        o;
      if (typeof window < "u") {
        const { hash: c } = window.location;
        if (c && c.length > 2) {
          const d = c.substring(1);
          if (i) {
            const h = d.split("&");
            for (let m = 0; m < h.length; m++) {
              const p = h[m].indexOf("=");
              p > 0 &&
                h[m].substring(0, p) === i &&
                (o = h[m].substring(p + 1));
            }
          }
          if (o) return o;
          if (!o && s > -1) {
            const h = c.match(/\/([a-zA-Z-]*)/g);
            return Array.isArray(h)
              ? h[typeof s == "number" ? s : 0]?.replace("/", "")
              : void 0;
          }
        }
      }
      return o;
    },
  };
let Yl = null;
const bm = () => {
  if (Yl !== null) return Yl;
  try {
    if (((Yl = typeof window < "u" && window.localStorage !== null), !Yl))
      return !1;
    const r = "i18next.translate.boo";
    window.localStorage.setItem(r, "foo"), window.localStorage.removeItem(r);
  } catch {
    Yl = !1;
  }
  return Yl;
};
var iv = {
  name: "localStorage",
  lookup(r) {
    let { lookupLocalStorage: i } = r;
    if (i && bm()) return window.localStorage.getItem(i) || void 0;
  },
  cacheUserLanguage(r, i) {
    let { lookupLocalStorage: s } = i;
    s && bm() && window.localStorage.setItem(s, r);
  },
};
let Gl = null;
const Sm = () => {
  if (Gl !== null) return Gl;
  try {
    if (((Gl = typeof window < "u" && window.sessionStorage !== null), !Gl))
      return !1;
    const r = "i18next.translate.boo";
    window.sessionStorage.setItem(r, "foo"),
      window.sessionStorage.removeItem(r);
  } catch {
    Gl = !1;
  }
  return Gl;
};
var uv = {
    name: "sessionStorage",
    lookup(r) {
      let { lookupSessionStorage: i } = r;
      if (i && Sm()) return window.sessionStorage.getItem(i) || void 0;
    },
    cacheUserLanguage(r, i) {
      let { lookupSessionStorage: s } = i;
      s && Sm() && window.sessionStorage.setItem(s, r);
    },
  },
  rv = {
    name: "navigator",
    lookup(r) {
      const i = [];
      if (typeof navigator < "u") {
        const { languages: s, userLanguage: o, language: c } = navigator;
        if (s) for (let d = 0; d < s.length; d++) i.push(s[d]);
        o && i.push(o), c && i.push(c);
      }
      return i.length > 0 ? i : void 0;
    },
  },
  sv = {
    name: "htmlTag",
    lookup(r) {
      let { htmlTag: i } = r,
        s;
      const o = i || (typeof document < "u" ? document.documentElement : null);
      return (
        o &&
          typeof o.getAttribute == "function" &&
          (s = o.getAttribute("lang")),
        s
      );
    },
  },
  ov = {
    name: "path",
    lookup(r) {
      let { lookupFromPathIndex: i } = r;
      if (typeof window > "u") return;
      const s = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      return Array.isArray(s)
        ? s[typeof i == "number" ? i : 0]?.replace("/", "")
        : void 0;
    },
  },
  cv = {
    name: "subdomain",
    lookup(r) {
      let { lookupFromSubdomainIndex: i } = r;
      const s = typeof i == "number" ? i + 1 : 1,
        o =
          typeof window < "u" &&
          window.location?.hostname?.match(
            /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i
          );
      if (o) return o[s];
    },
  };
let Km = !1;
try {
  document.cookie, (Km = !0);
} catch {}
const km = [
  "querystring",
  "cookie",
  "localStorage",
  "sessionStorage",
  "navigator",
  "htmlTag",
];
Km || km.splice(1, 1);
const fv = () => ({
  order: km,
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  convertDetectedLanguage: (r) => r,
});
class Jm {
  constructor(i) {
    let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.type = "languageDetector"), (this.detectors = {}), this.init(i, s);
  }
  init() {
    let i =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    (this.services = i),
      (this.options = Iy(s, this.options || {}, fv())),
      typeof this.options.convertDetectedLanguage == "string" &&
        this.options.convertDetectedLanguage.indexOf("15897") > -1 &&
        (this.options.convertDetectedLanguage = (c) => c.replace("-", "_")),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = o),
      this.addDetector(nv),
      this.addDetector(lv),
      this.addDetector(iv),
      this.addDetector(uv),
      this.addDetector(rv),
      this.addDetector(sv),
      this.addDetector(ov),
      this.addDetector(cv),
      this.addDetector(av);
  }
  addDetector(i) {
    return (this.detectors[i.name] = i), this;
  }
  detect() {
    let i =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      s = [];
    return (
      i.forEach((o) => {
        if (this.detectors[o]) {
          let c = this.detectors[o].lookup(this.options);
          c && typeof c == "string" && (c = [c]), c && (s = s.concat(c));
        }
      }),
      (s = s
        .filter((o) => o != null && !ev(o))
        .map((o) => this.options.convertDetectedLanguage(o))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? s
        : s.length > 0
        ? s[0]
        : null
    );
  }
  cacheUserLanguage(i) {
    let s =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches;
    s &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(i) > -1) ||
        s.forEach((o) => {
          this.detectors[o] &&
            this.detectors[o].cacheUserLanguage(i, this.options);
        }));
  }
}
Jm.type = "languageDetector";
const xm = Object.assign({}),
  Qa = {};
Object.keys(xm).forEach((r) => {
  const i = r.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (i) {
    const [, s] = i,
      o = xm[r];
    Qa[s] || (Qa[s] = { translation: {} }),
      o.default && (Qa[s].translation = { ...Qa[s].translation, ...o.default });
  }
});
et.use(Jm)
  .use(Fy)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: Qa,
    interpolation: { escapeValue: !1 },
  });
var ho = { exports: {} },
  Ga = {},
  mo = { exports: {} },
  go = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Em;
function dv() {
  return (
    Em ||
      ((Em = 1),
      (function (r) {
        function i(D, X) {
          var te = D.length;
          D.push(X);
          e: for (; 0 < te; ) {
            var ve = (te - 1) >>> 1,
              _e = D[ve];
            if (0 < c(_e, X)) (D[ve] = X), (D[te] = _e), (te = ve);
            else break e;
          }
        }
        function s(D) {
          return D.length === 0 ? null : D[0];
        }
        function o(D) {
          if (D.length === 0) return null;
          var X = D[0],
            te = D.pop();
          if (te !== X) {
            D[0] = te;
            e: for (var ve = 0, _e = D.length, C = _e >>> 1; ve < C; ) {
              var B = 2 * (ve + 1) - 1,
                K = D[B],
                k = B + 1,
                re = D[k];
              if (0 > c(K, te))
                k < _e && 0 > c(re, K)
                  ? ((D[ve] = re), (D[k] = te), (ve = k))
                  : ((D[ve] = K), (D[B] = te), (ve = B));
              else if (k < _e && 0 > c(re, te))
                (D[ve] = re), (D[k] = te), (ve = k);
              else break e;
            }
          }
          return X;
        }
        function c(D, X) {
          var te = D.sortIndex - X.sortIndex;
          return te !== 0 ? te : D.id - X.id;
        }
        if (
          ((r.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          r.unstable_now = function () {
            return d.now();
          };
        } else {
          var h = Date,
            m = h.now();
          r.unstable_now = function () {
            return h.now() - m;
          };
        }
        var p = [],
          g = [],
          v = 1,
          b = null,
          S = 3,
          x = !1,
          _ = !1,
          z = !1,
          O = !1,
          L = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          Q = typeof setImmediate < "u" ? setImmediate : null;
        function P(D) {
          for (var X = s(g); X !== null; ) {
            if (X.callback === null) o(g);
            else if (X.startTime <= D)
              o(g), (X.sortIndex = X.expirationTime), i(p, X);
            else break;
            X = s(g);
          }
        }
        function W(D) {
          if (((z = !1), P(D), !_))
            if (s(p) !== null) (_ = !0), ue || ((ue = !0), $());
            else {
              var X = s(g);
              X !== null && we(W, X.startTime - D);
            }
        }
        var ue = !1,
          I = -1,
          Ee = 5,
          ye = -1;
        function V() {
          return O ? !0 : !(r.unstable_now() - ye < Ee);
        }
        function Z() {
          if (((O = !1), ue)) {
            var D = r.unstable_now();
            ye = D;
            var X = !0;
            try {
              e: {
                (_ = !1), z && ((z = !1), U(I), (I = -1)), (x = !0);
                var te = S;
                try {
                  t: {
                    for (
                      P(D), b = s(p);
                      b !== null && !(b.expirationTime > D && V());

                    ) {
                      var ve = b.callback;
                      if (typeof ve == "function") {
                        (b.callback = null), (S = b.priorityLevel);
                        var _e = ve(b.expirationTime <= D);
                        if (((D = r.unstable_now()), typeof _e == "function")) {
                          (b.callback = _e), P(D), (X = !0);
                          break t;
                        }
                        b === s(p) && o(p), P(D);
                      } else o(p);
                      b = s(p);
                    }
                    if (b !== null) X = !0;
                    else {
                      var C = s(g);
                      C !== null && we(W, C.startTime - D), (X = !1);
                    }
                  }
                  break e;
                } finally {
                  (b = null), (S = te), (x = !1);
                }
                X = void 0;
              }
            } finally {
              X ? $() : (ue = !1);
            }
          }
        }
        var $;
        if (typeof Q == "function")
          $ = function () {
            Q(Z);
          };
        else if (typeof MessageChannel < "u") {
          var le = new MessageChannel(),
            ce = le.port2;
          (le.port1.onmessage = Z),
            ($ = function () {
              ce.postMessage(null);
            });
        } else
          $ = function () {
            L(Z, 0);
          };
        function we(D, X) {
          I = L(function () {
            D(r.unstable_now());
          }, X);
        }
        (r.unstable_IdlePriority = 5),
          (r.unstable_ImmediatePriority = 1),
          (r.unstable_LowPriority = 4),
          (r.unstable_NormalPriority = 3),
          (r.unstable_Profiling = null),
          (r.unstable_UserBlockingPriority = 2),
          (r.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (r.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Ee = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (r.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (r.unstable_next = function (D) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = S;
            }
            var te = S;
            S = X;
            try {
              return D();
            } finally {
              S = te;
            }
          }),
          (r.unstable_requestPaint = function () {
            O = !0;
          }),
          (r.unstable_runWithPriority = function (D, X) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var te = S;
            S = D;
            try {
              return X();
            } finally {
              S = te;
            }
          }),
          (r.unstable_scheduleCallback = function (D, X, te) {
            var ve = r.unstable_now();
            switch (
              (typeof te == "object" && te !== null
                ? ((te = te.delay),
                  (te = typeof te == "number" && 0 < te ? ve + te : ve))
                : (te = ve),
              D)
            ) {
              case 1:
                var _e = -1;
                break;
              case 2:
                _e = 250;
                break;
              case 5:
                _e = 1073741823;
                break;
              case 4:
                _e = 1e4;
                break;
              default:
                _e = 5e3;
            }
            return (
              (_e = te + _e),
              (D = {
                id: v++,
                callback: X,
                priorityLevel: D,
                startTime: te,
                expirationTime: _e,
                sortIndex: -1,
              }),
              te > ve
                ? ((D.sortIndex = te),
                  i(g, D),
                  s(p) === null &&
                    D === s(g) &&
                    (z ? (U(I), (I = -1)) : (z = !0), we(W, te - ve)))
                : ((D.sortIndex = _e),
                  i(p, D),
                  _ || x || ((_ = !0), ue || ((ue = !0), $()))),
              D
            );
          }),
          (r.unstable_shouldYield = V),
          (r.unstable_wrapCallback = function (D) {
            var X = S;
            return function () {
              var te = S;
              S = X;
              try {
                return D.apply(this, arguments);
              } finally {
                S = te;
              }
            };
          });
      })(go)),
    go
  );
}
var _m;
function hv() {
  return _m || ((_m = 1), (mo.exports = dv())), mo.exports;
}
var po = { exports: {} },
  Ie = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cm;
function mv() {
  if (Cm) return Ie;
  Cm = 1;
  var r = Ao();
  function i(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        g += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      g +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(i(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function d(p, g, v) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: b == null ? null : "" + b,
      children: p,
      containerInfo: g,
      implementation: v,
    };
  }
  var h = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, g) {
    if (p === "font") return "";
    if (typeof g == "string") return g === "use-credentials" ? g : "";
  }
  return (
    (Ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (Ie.createPortal = function (p, g) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11))
        throw Error(i(299));
      return d(p, g, null, v);
    }),
    (Ie.flushSync = function (p) {
      var g = h.T,
        v = o.p;
      try {
        if (((h.T = null), (o.p = 2), p)) return p();
      } finally {
        (h.T = g), (o.p = v), o.d.f();
      }
    }),
    (Ie.preconnect = function (p, g) {
      typeof p == "string" &&
        (g
          ? ((g = g.crossOrigin),
            (g =
              typeof g == "string"
                ? g === "use-credentials"
                  ? g
                  : ""
                : void 0))
          : (g = null),
        o.d.C(p, g));
    }),
    (Ie.prefetchDNS = function (p) {
      typeof p == "string" && o.d.D(p);
    }),
    (Ie.preinit = function (p, g) {
      if (typeof p == "string" && g && typeof g.as == "string") {
        var v = g.as,
          b = m(v, g.crossOrigin),
          S = typeof g.integrity == "string" ? g.integrity : void 0,
          x = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
        v === "style"
          ? o.d.S(p, typeof g.precedence == "string" ? g.precedence : void 0, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: x,
            })
          : v === "script" &&
            o.d.X(p, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: x,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
      }
    }),
    (Ie.preinitModule = function (p, g) {
      if (typeof p == "string")
        if (typeof g == "object" && g !== null) {
          if (g.as == null || g.as === "script") {
            var v = m(g.as, g.crossOrigin);
            o.d.M(p, {
              crossOrigin: v,
              integrity: typeof g.integrity == "string" ? g.integrity : void 0,
              nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(p);
    }),
    (Ie.preload = function (p, g) {
      if (
        typeof p == "string" &&
        typeof g == "object" &&
        g !== null &&
        typeof g.as == "string"
      ) {
        var v = g.as,
          b = m(v, g.crossOrigin);
        o.d.L(p, v, {
          crossOrigin: b,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          type: typeof g.type == "string" ? g.type : void 0,
          fetchPriority:
            typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
          referrerPolicy:
            typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
          imageSrcSet:
            typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
          imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
          media: typeof g.media == "string" ? g.media : void 0,
        });
      }
    }),
    (Ie.preloadModule = function (p, g) {
      if (typeof p == "string")
        if (g) {
          var v = m(g.as, g.crossOrigin);
          o.d.m(p, {
            as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
            crossOrigin: v,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (Ie.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (Ie.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (Ie.useFormState = function (p, g, v) {
      return h.H.useFormState(p, g, v);
    }),
    (Ie.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (Ie.version = "19.2.0"),
    Ie
  );
}
var wm;
function gv() {
  if (wm) return po.exports;
  wm = 1;
  function r() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (i) {
        console.error(i);
      }
  }
  return r(), (po.exports = mv()), po.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Am;
function pv() {
  if (Am) return Ga;
  Am = 1;
  var r = hv(),
    i = Ao(),
    s = gv();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (d(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (((l = a.return), l !== null)) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === n) return p(a), e;
          if (u === l) return p(a), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== l.return) (n = a), (l = u);
      else {
        for (var f = !1, y = a.child; y; ) {
          if (y === n) {
            (f = !0), (n = a), (l = u);
            break;
          }
          if (y === l) {
            (f = !0), (l = a), (n = u);
            break;
          }
          y = y.sibling;
        }
        if (!f) {
          for (y = u.child; y; ) {
            if (y === n) {
              (f = !0), (n = u), (l = a);
              break;
            }
            if (y === l) {
              (f = !0), (l = u), (n = a);
              break;
            }
            y = y.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (n.alternate !== l) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = v(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    S = Symbol.for("react.element"),
    x = Symbol.for("react.transitional.element"),
    _ = Symbol.for("react.portal"),
    z = Symbol.for("react.fragment"),
    O = Symbol.for("react.strict_mode"),
    L = Symbol.for("react.profiler"),
    U = Symbol.for("react.consumer"),
    Q = Symbol.for("react.context"),
    P = Symbol.for("react.forward_ref"),
    W = Symbol.for("react.suspense"),
    ue = Symbol.for("react.suspense_list"),
    I = Symbol.for("react.memo"),
    Ee = Symbol.for("react.lazy"),
    ye = Symbol.for("react.activity"),
    V = Symbol.for("react.memo_cache_sentinel"),
    Z = Symbol.iterator;
  function $(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Z && e[Z]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case z:
        return "Fragment";
      case L:
        return "Profiler";
      case O:
        return "StrictMode";
      case W:
        return "Suspense";
      case ue:
        return "SuspenseList";
      case ye:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case Q:
          return e.displayName || "Context";
        case U:
          return (e._context.displayName || "Context") + ".Consumer";
        case P:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case I:
          return (
            (t = e.displayName || null), t !== null ? t : ce(e.type) || "Memo"
          );
        case Ee:
          (t = e._payload), (e = e._init);
          try {
            return ce(e(t));
          } catch {}
      }
    return null;
  }
  var we = Array.isArray,
    D = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    ve = [],
    _e = -1;
  function C(e) {
    return { current: e };
  }
  function B(e) {
    0 > _e || ((e.current = ve[_e]), (ve[_e] = null), _e--);
  }
  function K(e, t) {
    _e++, (ve[_e] = e.current), (e.current = t);
  }
  var k = C(null),
    re = C(null),
    fe = C(null),
    Ce = C(null);
  function tt(e, t) {
    switch ((K(fe, t), K(re, e), K(k, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? ah(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = ah(t)), (e = ih(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    B(k), K(k, e);
  }
  function He() {
    B(k), B(re), B(fe);
  }
  function Xl(e) {
    e.memoizedState !== null && K(Ce, e);
    var t = k.current,
      n = ih(t, e.type);
    t !== n && (K(re, e), K(k, n));
  }
  function Wa(e) {
    re.current === e && (B(k), B(re)),
      Ce.current === e && (B(Ce), (La._currentValue = te));
  }
  var ju, Lo;
  function Dn(e) {
    if (ju === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        (ju = (t && t[1]) || ""),
          (Lo =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      ju +
      e +
      Lo
    );
  }
  var Du = !1;
  function Uu(e, t) {
    if (!e || Du) return "";
    Du = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var G = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(G.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(G, []);
                } catch (j) {
                  var M = j;
                }
                Reflect.construct(e, [], G);
              } else {
                try {
                  G.call();
                } catch (j) {
                  M = j;
                }
                e.call(G.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                M = j;
              }
              (G = e()) &&
                typeof G.catch == "function" &&
                G.catch(function () {});
            }
          } catch (j) {
            if (j && M && typeof j.stack == "string") return [j.stack, M.stack];
          }
          return [null, null];
        },
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a &&
        a.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = l.DetermineComponentFrameRoot(),
        f = u[0],
        y = u[1];
      if (f && y) {
        var E = f.split(`
`),
          R = y.split(`
`);
        for (
          a = l = 0;
          l < E.length && !E[l].includes("DetermineComponentFrameRoot");

        )
          l++;
        for (; a < R.length && !R[a].includes("DetermineComponentFrameRoot"); )
          a++;
        if (l === E.length || a === R.length)
          for (
            l = E.length - 1, a = R.length - 1;
            1 <= l && 0 <= a && E[l] !== R[a];

          )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (E[l] !== R[a]) {
            if (l !== 1 || a !== 1)
              do
                if ((l--, a--, 0 > a || E[l] !== R[a])) {
                  var H =
                    `
` + E[l].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      H.includes("<anonymous>") &&
                      (H = H.replace("<anonymous>", e.displayName)),
                    H
                  );
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      (Du = !1), (Error.prepareStackTrace = n);
    }
    return (n = e ? e.displayName || e.name : "") ? Dn(n) : "";
  }
  function mg(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Dn(e.type);
      case 16:
        return Dn("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Dn("Suspense Fallback")
          : Dn("Suspense");
      case 19:
        return Dn("SuspenseList");
      case 0:
      case 15:
        return Uu(e.type, !1);
      case 11:
        return Uu(e.type.render, !1);
      case 1:
        return Uu(e.type, !0);
      case 31:
        return Dn("Activity");
      default:
        return "";
    }
  }
  function jo(e) {
    try {
      var t = "",
        n = null;
      do (t += mg(e, n)), (n = e), (e = e.return);
      while (e);
      return t;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  var Hu = Object.prototype.hasOwnProperty,
    Bu = r.unstable_scheduleCallback,
    qu = r.unstable_cancelCallback,
    gg = r.unstable_shouldYield,
    pg = r.unstable_requestPaint,
    ct = r.unstable_now,
    yg = r.unstable_getCurrentPriorityLevel,
    Do = r.unstable_ImmediatePriority,
    Uo = r.unstable_UserBlockingPriority,
    Pa = r.unstable_NormalPriority,
    vg = r.unstable_LowPriority,
    Ho = r.unstable_IdlePriority,
    bg = r.log,
    Sg = r.unstable_setDisableYieldValue,
    Zl = null,
    ft = null;
  function cn(e) {
    if (
      (typeof bg == "function" && Sg(e),
      ft && typeof ft.setStrictMode == "function")
    )
      try {
        ft.setStrictMode(Zl, e);
      } catch {}
  }
  var dt = Math.clz32 ? Math.clz32 : _g,
    xg = Math.log,
    Eg = Math.LN2;
  function _g(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((xg(e) / Eg) | 0)) | 0;
  }
  var Ia = 256,
    ei = 262144,
    ti = 4194304;
  function Un(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ni(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0,
      u = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var y = l & 134217727;
    return (
      y !== 0
        ? ((l = y & ~u),
          l !== 0
            ? (a = Un(l))
            : ((f &= y),
              f !== 0
                ? (a = Un(f))
                : n || ((n = y & ~e), n !== 0 && (a = Un(n)))))
        : ((y = l & ~u),
          y !== 0
            ? (a = Un(y))
            : f !== 0
            ? (a = Un(f))
            : n || ((n = l & ~e), n !== 0 && (a = Un(n)))),
      a === 0
        ? 0
        : t !== 0 &&
          t !== a &&
          (t & u) === 0 &&
          ((u = a & -a),
          (n = t & -t),
          u >= n || (u === 32 && (n & 4194048) !== 0))
        ? t
        : a
    );
  }
  function Kl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Cg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Bo() {
    var e = ti;
    return (ti <<= 1), (ti & 62914560) === 0 && (ti = 4194304), e;
  }
  function Yu(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function kl(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function wg(e, t, n, l, a, u) {
    var f = e.pendingLanes;
    (e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0);
    var y = e.entanglements,
      E = e.expirationTimes,
      R = e.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var H = 31 - dt(n),
        G = 1 << H;
      (y[H] = 0), (E[H] = -1);
      var M = R[H];
      if (M !== null)
        for (R[H] = null, H = 0; H < M.length; H++) {
          var j = M[H];
          j !== null && (j.lane &= -536870913);
        }
      n &= ~G;
    }
    l !== 0 && qo(e, l, 0),
      u !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(f & ~t));
  }
  function qo(e, t, n) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var l = 31 - dt(t);
    (e.entangledLanes |= t),
      (e.entanglements[l] = e.entanglements[l] | 1073741824 | (n & 261930));
  }
  function Yo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var l = 31 - dt(n),
        a = 1 << l;
      (a & t) | (e[l] & t) && (e[l] |= t), (n &= ~a);
    }
  }
  function Go(e, t) {
    var n = t & -t;
    return (
      (n = (n & 42) !== 0 ? 1 : Gu(n)),
      (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    );
  }
  function Gu(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Vu(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Vo() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Th(e.type));
  }
  function Qo(e, t) {
    var n = X.p;
    try {
      return (X.p = e), t();
    } finally {
      X.p = n;
    }
  }
  var fn = Math.random().toString(36).slice(2),
    Je = "__reactFiber$" + fn,
    lt = "__reactProps$" + fn,
    tl = "__reactContainer$" + fn,
    Qu = "__reactEvents$" + fn,
    Ag = "__reactListeners$" + fn,
    Og = "__reactHandles$" + fn,
    Xo = "__reactResources$" + fn,
    Jl = "__reactMarker$" + fn;
  function Xu(e) {
    delete e[Je], delete e[lt], delete e[Qu], delete e[Ag], delete e[Og];
  }
  function nl(e) {
    var t = e[Je];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[tl] || n[Je])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = dh(e); e !== null; ) {
            if ((n = e[Je])) return n;
            e = dh(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function ll(e) {
    if ((e = e[Je] || e[tl])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function $l(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function al(e) {
    var t = e[Xo];
    return (
      t ||
        (t = e[Xo] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ke(e) {
    e[Jl] = !0;
  }
  var Zo = new Set(),
    Ko = {};
  function Hn(e, t) {
    il(e, t), il(e + "Capture", t);
  }
  function il(e, t) {
    for (Ko[e] = t, e = 0; e < t.length; e++) Zo.add(t[e]);
  }
  var Tg = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    ko = {},
    Jo = {};
  function Ng(e) {
    return Hu.call(Jo, e)
      ? !0
      : Hu.call(ko, e)
      ? !1
      : Tg.test(e)
      ? (Jo[e] = !0)
      : ((ko[e] = !0), !1);
  }
  function li(e, t, n) {
    if (Ng(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function ai(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Vt(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  function St(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function $o(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Rg(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var a = l.get,
        u = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (f) {
            (n = "" + f), u.call(this, f);
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (f) {
            n = "" + f;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Zu(e) {
    if (!e._valueTracker) {
      var t = $o(e) ? "checked" : "value";
      e._valueTracker = Rg(e, t, "" + e[t]);
    }
  }
  function Fo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      l = "";
    return (
      e && (l = $o(e) ? (e.checked ? "true" : "false") : e.value),
      (e = l),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function ii(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var zg = /[\n"\\]/g;
  function xt(e) {
    return e.replace(zg, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Ku(e, t, n, l, a, u, f, y) {
    (e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + St(t))
          : e.value !== "" + St(t) && (e.value = "" + St(t))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      t != null
        ? ku(e, f, St(t))
        : n != null
        ? ku(e, f, St(n))
        : l != null && e.removeAttribute("value"),
      a == null && u != null && (e.defaultChecked = !!u),
      a != null &&
        (e.checked = a && typeof a != "function" && typeof a != "symbol"),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (e.name = "" + St(y))
        : e.removeAttribute("name");
  }
  function Wo(e, t, n, l, a, u, f, y) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || n != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) {
        Zu(e);
        return;
      }
      (n = n != null ? "" + St(n) : ""),
        (t = t != null ? "" + St(t) : n),
        y || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (l = l ?? a),
      (l = typeof l != "function" && typeof l != "symbol" && !!l),
      (e.checked = y ? e.checked : !!l),
      (e.defaultChecked = !!l),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f),
      Zu(e);
  }
  function ku(e, t, n) {
    (t === "number" && ii(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function ul(e, t, n, l) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        (a = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== a && (e[n].selected = a),
          a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + St(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          (e[a].selected = !0), l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Po(e, t, n) {
    if (
      t != null &&
      ((t = "" + St(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + St(n) : "";
  }
  function Io(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(o(92));
        if (we(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), (t = n);
    }
    (n = St(t)),
      (e.defaultValue = n),
      (l = e.textContent),
      l === n && l !== "" && l !== null && (e.value = l),
      Zu(e);
  }
  function rl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Mg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ec(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? l
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : l
      ? e.setProperty(t, n)
      : typeof n != "number" || n === 0 || Mg.has(t)
      ? t === "float"
        ? (e.cssFloat = n)
        : (e[t] = ("" + n).trim())
      : (e[t] = n + "px");
  }
  function tc(e, t, n) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (((e = e.style), n != null)) {
      for (var l in n)
        !n.hasOwnProperty(l) ||
          (t != null && t.hasOwnProperty(l)) ||
          (l.indexOf("--") === 0
            ? e.setProperty(l, "")
            : l === "float"
            ? (e.cssFloat = "")
            : (e[l] = ""));
      for (var a in t)
        (l = t[a]), t.hasOwnProperty(a) && n[a] !== l && ec(e, a, l);
    } else for (var u in t) t.hasOwnProperty(u) && ec(e, u, t[u]);
  }
  function Ju(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Lg = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    jg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ui(e) {
    return jg.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Qt() {}
  var $u = null;
  function Fu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var sl = null,
    ol = null;
  function nc(e) {
    var t = ll(e);
    if (t && (e = t.stateNode)) {
      var n = e[lt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Ku(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + xt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[lt] || null;
                if (!a) throw Error(o(90));
                Ku(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              (l = n[t]), l.form === e.form && Fo(l);
          }
          break e;
        case "textarea":
          Po(e, n.value, n.defaultValue);
          break e;
        case "select":
          (t = n.value), t != null && ul(e, !!n.multiple, t, !1);
      }
    }
  }
  var Wu = !1;
  function lc(e, t, n) {
    if (Wu) return e(t, n);
    Wu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (
        ((Wu = !1),
        (sl !== null || ol !== null) &&
          (ki(), sl && ((t = sl), (e = ol), (ol = sl = null), nc(t), e)))
      )
        for (t = 0; t < e.length; t++) nc(e[t]);
    }
  }
  function Fl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[lt] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) ||
          ((e = e.type),
          (l = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !l);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(o(231, t, typeof n));
    return n;
  }
  var Xt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Pu = !1;
  if (Xt)
    try {
      var Wl = {};
      Object.defineProperty(Wl, "passive", {
        get: function () {
          Pu = !0;
        },
      }),
        window.addEventListener("test", Wl, Wl),
        window.removeEventListener("test", Wl, Wl);
    } catch {
      Pu = !1;
    }
  var dn = null,
    Iu = null,
    ri = null;
  function ac() {
    if (ri) return ri;
    var e,
      t = Iu,
      n = t.length,
      l,
      a = "value" in dn ? dn.value : dn.textContent,
      u = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++);
    var f = n - e;
    for (l = 1; l <= f && t[n - l] === a[u - l]; l++);
    return (ri = a.slice(e, 1 < l ? 1 - l : void 0));
  }
  function si(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function oi() {
    return !0;
  }
  function ic() {
    return !1;
  }
  function at(e) {
    function t(n, l, a, u, f) {
      (this._reactName = n),
        (this._targetInst = a),
        (this.type = l),
        (this.nativeEvent = u),
        (this.target = f),
        (this.currentTarget = null);
      for (var y in e)
        e.hasOwnProperty(y) && ((n = e[y]), (this[y] = n ? n(u) : u[y]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? oi
          : ic),
        (this.isPropagationStopped = ic),
        this
      );
    }
    return (
      b(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = oi));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = oi));
        },
        persist: function () {},
        isPersistent: oi,
      }),
      t
    );
  }
  var Bn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ci = at(Bn),
    Pl = b({}, Bn, { view: 0, detail: 0 }),
    Dg = at(Pl),
    er,
    tr,
    Il,
    fi = b({}, Pl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: lr,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Il &&
              (Il && e.type === "mousemove"
                ? ((er = e.screenX - Il.screenX), (tr = e.screenY - Il.screenY))
                : (tr = er = 0),
              (Il = e)),
            er);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : tr;
      },
    }),
    uc = at(fi),
    Ug = b({}, fi, { dataTransfer: 0 }),
    Hg = at(Ug),
    Bg = b({}, Pl, { relatedTarget: 0 }),
    nr = at(Bg),
    qg = b({}, Bn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Yg = at(qg),
    Gg = b({}, Bn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Vg = at(Gg),
    Qg = b({}, Bn, { data: 0 }),
    rc = at(Qg),
    Xg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Zg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Kg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function kg(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Kg[e])
      ? !!t[e]
      : !1;
  }
  function lr() {
    return kg;
  }
  var Jg = b({}, Pl, {
      key: function (e) {
        if (e.key) {
          var t = Xg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = si(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Zg[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: lr,
      charCode: function (e) {
        return e.type === "keypress" ? si(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? si(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    $g = at(Jg),
    Fg = b({}, fi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    sc = at(Fg),
    Wg = b({}, Pl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: lr,
    }),
    Pg = at(Wg),
    Ig = b({}, Bn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ep = at(Ig),
    tp = b({}, fi, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    np = at(tp),
    lp = b({}, Bn, { newState: 0, oldState: 0 }),
    ap = at(lp),
    ip = [9, 13, 27, 32],
    ar = Xt && "CompositionEvent" in window,
    ea = null;
  Xt && "documentMode" in document && (ea = document.documentMode);
  var up = Xt && "TextEvent" in window && !ea,
    oc = Xt && (!ar || (ea && 8 < ea && 11 >= ea)),
    cc = " ",
    fc = !1;
  function dc(e, t) {
    switch (e) {
      case "keyup":
        return ip.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var cl = !1;
  function rp(e, t) {
    switch (e) {
      case "compositionend":
        return hc(t);
      case "keypress":
        return t.which !== 32 ? null : ((fc = !0), cc);
      case "textInput":
        return (e = t.data), e === cc && fc ? null : e;
      default:
        return null;
    }
  }
  function sp(e, t) {
    if (cl)
      return e === "compositionend" || (!ar && dc(e, t))
        ? ((e = ac()), (ri = Iu = dn = null), (cl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return oc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var op = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function mc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!op[e.type] : t === "textarea";
  }
  function gc(e, t, n, l) {
    sl ? (ol ? ol.push(l) : (ol = [l])) : (sl = l),
      (t = eu(t, "onChange")),
      0 < t.length &&
        ((n = new ci("onChange", "change", null, n, l)),
        e.push({ event: n, listeners: t }));
  }
  var ta = null,
    na = null;
  function cp(e) {
    Pd(e, 0);
  }
  function di(e) {
    var t = $l(e);
    if (Fo(t)) return e;
  }
  function pc(e, t) {
    if (e === "change") return t;
  }
  var yc = !1;
  if (Xt) {
    var ir;
    if (Xt) {
      var ur = "oninput" in document;
      if (!ur) {
        var vc = document.createElement("div");
        vc.setAttribute("oninput", "return;"),
          (ur = typeof vc.oninput == "function");
      }
      ir = ur;
    } else ir = !1;
    yc = ir && (!document.documentMode || 9 < document.documentMode);
  }
  function bc() {
    ta && (ta.detachEvent("onpropertychange", Sc), (na = ta = null));
  }
  function Sc(e) {
    if (e.propertyName === "value" && di(na)) {
      var t = [];
      gc(t, na, e, Fu(e)), lc(cp, t);
    }
  }
  function fp(e, t, n) {
    e === "focusin"
      ? (bc(), (ta = t), (na = n), ta.attachEvent("onpropertychange", Sc))
      : e === "focusout" && bc();
  }
  function dp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return di(na);
  }
  function hp(e, t) {
    if (e === "click") return di(t);
  }
  function mp(e, t) {
    if (e === "input" || e === "change") return di(t);
  }
  function gp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ht = typeof Object.is == "function" ? Object.is : gp;
  function la(e, t) {
    if (ht(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!Hu.call(t, a) || !ht(e[a], t[a])) return !1;
    }
    return !0;
  }
  function xc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ec(e, t) {
    var n = xc(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (((l = e + n.textContent.length), e <= t && l >= t))
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = xc(n);
    }
  }
  function _c(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? _c(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function Cc(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ii(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ii(e.document);
    }
    return t;
  }
  function rr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var pp = Xt && "documentMode" in document && 11 >= document.documentMode,
    fl = null,
    sr = null,
    aa = null,
    or = !1;
  function wc(e, t, n) {
    var l =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    or ||
      fl == null ||
      fl !== ii(l) ||
      ((l = fl),
      "selectionStart" in l && rr(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (aa && la(aa, l)) ||
        ((aa = l),
        (l = eu(sr, "onSelect")),
        0 < l.length &&
          ((t = new ci("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: l }),
          (t.target = fl))));
  }
  function qn(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var dl = {
      animationend: qn("Animation", "AnimationEnd"),
      animationiteration: qn("Animation", "AnimationIteration"),
      animationstart: qn("Animation", "AnimationStart"),
      transitionrun: qn("Transition", "TransitionRun"),
      transitionstart: qn("Transition", "TransitionStart"),
      transitioncancel: qn("Transition", "TransitionCancel"),
      transitionend: qn("Transition", "TransitionEnd"),
    },
    cr = {},
    Ac = {};
  Xt &&
    ((Ac = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete dl.animationend.animation,
      delete dl.animationiteration.animation,
      delete dl.animationstart.animation),
    "TransitionEvent" in window || delete dl.transitionend.transition);
  function Yn(e) {
    if (cr[e]) return cr[e];
    if (!dl[e]) return e;
    var t = dl[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ac) return (cr[e] = t[n]);
    return e;
  }
  var Oc = Yn("animationend"),
    Tc = Yn("animationiteration"),
    Nc = Yn("animationstart"),
    yp = Yn("transitionrun"),
    vp = Yn("transitionstart"),
    bp = Yn("transitioncancel"),
    Rc = Yn("transitionend"),
    zc = new Map(),
    fr =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  fr.push("scrollEnd");
  function Rt(e, t) {
    zc.set(e, t), Hn(t, [e]);
  }
  var hi =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    Et = [],
    hl = 0,
    dr = 0;
  function mi() {
    for (var e = hl, t = (dr = hl = 0); t < e; ) {
      var n = Et[t];
      Et[t++] = null;
      var l = Et[t];
      Et[t++] = null;
      var a = Et[t];
      Et[t++] = null;
      var u = Et[t];
      if (((Et[t++] = null), l !== null && a !== null)) {
        var f = l.pending;
        f === null ? (a.next = a) : ((a.next = f.next), (f.next = a)),
          (l.pending = a);
      }
      u !== 0 && Mc(n, a, u);
    }
  }
  function gi(e, t, n, l) {
    (Et[hl++] = e),
      (Et[hl++] = t),
      (Et[hl++] = n),
      (Et[hl++] = l),
      (dr |= l),
      (e.lanes |= l),
      (e = e.alternate),
      e !== null && (e.lanes |= l);
  }
  function hr(e, t, n, l) {
    return gi(e, t, n, l), pi(e);
  }
  function Gn(e, t) {
    return gi(e, null, null, t), pi(e);
  }
  function Mc(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, u = e.return; u !== null; )
      (u.childLanes |= n),
        (l = u.alternate),
        l !== null && (l.childLanes |= n),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (a = !0)),
        (e = u),
        (u = u.return);
    return e.tag === 3
      ? ((u = e.stateNode),
        a &&
          t !== null &&
          ((a = 31 - dt(n)),
          (e = u.hiddenUpdates),
          (l = e[a]),
          l === null ? (e[a] = [t]) : l.push(t),
          (t.lane = n | 536870912)),
        u)
      : null;
  }
  function pi(e) {
    if (50 < Aa) throw ((Aa = 0), (Es = null), Error(o(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var ml = {};
  function Sp(e, t, n, l) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function mt(e, t, n, l) {
    return new Sp(e, t, n, l);
  }
  function mr(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Zt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = mt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Lc(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function yi(e, t, n, l, a, u) {
    var f = 0;
    if (((l = e), typeof e == "function")) mr(e) && (f = 1);
    else if (typeof e == "string")
      f = w0(e, n, k.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case ye:
          return (e = mt(31, n, t, a)), (e.elementType = ye), (e.lanes = u), e;
        case z:
          return Vn(n.children, a, u, t);
        case O:
          (f = 8), (a |= 24);
          break;
        case L:
          return (
            (e = mt(12, n, t, a | 2)), (e.elementType = L), (e.lanes = u), e
          );
        case W:
          return (e = mt(13, n, t, a)), (e.elementType = W), (e.lanes = u), e;
        case ue:
          return (e = mt(19, n, t, a)), (e.elementType = ue), (e.lanes = u), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Q:
                f = 10;
                break e;
              case U:
                f = 9;
                break e;
              case P:
                f = 11;
                break e;
              case I:
                f = 14;
                break e;
              case Ee:
                (f = 16), (l = null);
                break e;
            }
          (f = 29),
            (n = Error(o(130, e === null ? "null" : typeof e, ""))),
            (l = null);
      }
    return (
      (t = mt(f, n, t, a)), (t.elementType = e), (t.type = l), (t.lanes = u), t
    );
  }
  function Vn(e, t, n, l) {
    return (e = mt(7, e, l, t)), (e.lanes = n), e;
  }
  function gr(e, t, n) {
    return (e = mt(6, e, null, t)), (e.lanes = n), e;
  }
  function jc(e) {
    var t = mt(18, null, null, 0);
    return (t.stateNode = e), t;
  }
  function pr(e, t, n) {
    return (
      (t = mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Dc = new WeakMap();
  function _t(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Dc.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: jo(t) }), Dc.set(e, t), t);
    }
    return { value: e, source: t, stack: jo(t) };
  }
  var gl = [],
    pl = 0,
    vi = null,
    ia = 0,
    Ct = [],
    wt = 0,
    hn = null,
    jt = 1,
    Dt = "";
  function Kt(e, t) {
    (gl[pl++] = ia), (gl[pl++] = vi), (vi = e), (ia = t);
  }
  function Uc(e, t, n) {
    (Ct[wt++] = jt), (Ct[wt++] = Dt), (Ct[wt++] = hn), (hn = e);
    var l = jt;
    e = Dt;
    var a = 32 - dt(l) - 1;
    (l &= ~(1 << a)), (n += 1);
    var u = 32 - dt(t) + a;
    if (30 < u) {
      var f = a - (a % 5);
      (u = (l & ((1 << f) - 1)).toString(32)),
        (l >>= f),
        (a -= f),
        (jt = (1 << (32 - dt(t) + a)) | (n << a) | l),
        (Dt = u + e);
    } else (jt = (1 << u) | (n << a) | l), (Dt = e);
  }
  function yr(e) {
    e.return !== null && (Kt(e, 1), Uc(e, 1, 0));
  }
  function vr(e) {
    for (; e === vi; )
      (vi = gl[--pl]), (gl[pl] = null), (ia = gl[--pl]), (gl[pl] = null);
    for (; e === hn; )
      (hn = Ct[--wt]),
        (Ct[wt] = null),
        (Dt = Ct[--wt]),
        (Ct[wt] = null),
        (jt = Ct[--wt]),
        (Ct[wt] = null);
  }
  function Hc(e, t) {
    (Ct[wt++] = jt),
      (Ct[wt++] = Dt),
      (Ct[wt++] = hn),
      (jt = t.id),
      (Dt = t.overflow),
      (hn = e);
  }
  var $e = null,
    Me = null,
    pe = !1,
    mn = null,
    At = !1,
    br = Error(o(519));
  function gn(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (ua(_t(t, e)), br);
  }
  function Bc(e) {
    var t = e.stateNode,
      n = e.type,
      l = e.memoizedProps;
    switch (((t[Je] = e), (t[lt] = l), n)) {
      case "dialog":
        he("cancel", t), he("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        he("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ta.length; n++) he(Ta[n], t);
        break;
      case "source":
        he("error", t);
        break;
      case "img":
      case "image":
      case "link":
        he("error", t), he("load", t);
        break;
      case "details":
        he("toggle", t);
        break;
      case "input":
        he("invalid", t),
          Wo(
            t,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0
          );
        break;
      case "select":
        he("invalid", t);
        break;
      case "textarea":
        he("invalid", t), Io(t, l.value, l.defaultValue, l.children);
    }
    (n = l.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      l.suppressHydrationWarning === !0 ||
      nh(t.textContent, n)
        ? (l.popover != null && (he("beforetoggle", t), he("toggle", t)),
          l.onScroll != null && he("scroll", t),
          l.onScrollEnd != null && he("scrollend", t),
          l.onClick != null && (t.onclick = Qt),
          (t = !0))
        : (t = !1),
      t || gn(e, !0);
  }
  function qc(e) {
    for ($e = e.return; $e; )
      switch ($e.tag) {
        case 5:
        case 31:
        case 13:
          At = !1;
          return;
        case 27:
        case 3:
          At = !0;
          return;
        default:
          $e = $e.return;
      }
  }
  function yl(e) {
    if (e !== $e) return !1;
    if (!pe) return qc(e), (pe = !0), !1;
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || Hs(e.type, e.memoizedProps))),
        (n = !n)),
      n && Me && gn(e),
      qc(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Me = fh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      Me = fh(e);
    } else
      t === 27
        ? ((t = Me), Nn(e.type) ? ((e = Vs), (Vs = null), (Me = e)) : (Me = t))
        : (Me = $e ? Tt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Qn() {
    (Me = $e = null), (pe = !1);
  }
  function Sr() {
    var e = mn;
    return (
      e !== null &&
        (st === null ? (st = e) : st.push.apply(st, e), (mn = null)),
      e
    );
  }
  function ua(e) {
    mn === null ? (mn = [e]) : mn.push(e);
  }
  var xr = C(null),
    Xn = null,
    kt = null;
  function pn(e, t, n) {
    K(xr, t._currentValue), (t._currentValue = n);
  }
  function Jt(e) {
    (e._currentValue = xr.current), B(xr);
  }
  function Er(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
          : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function _r(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var f = a.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var y = u;
          u = a;
          for (var E = 0; E < t.length; E++)
            if (y.context === t[E]) {
              (u.lanes |= n),
                (y = u.alternate),
                y !== null && (y.lanes |= n),
                Er(u.return, n, e),
                l || (f = null);
              break e;
            }
          u = y.next;
        }
      } else if (a.tag === 18) {
        if (((f = a.return), f === null)) throw Error(o(341));
        (f.lanes |= n),
          (u = f.alternate),
          u !== null && (u.lanes |= n),
          Er(f, n, e),
          (f = null);
      } else f = a.child;
      if (f !== null) f.return = a;
      else
        for (f = a; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((a = f.sibling), a !== null)) {
            (a.return = f.return), (f = a);
            break;
          }
          f = f.return;
        }
      a = f;
    }
  }
  function vl(e, t, n, l) {
    e = null;
    for (var a = t, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var f = a.alternate;
        if (f === null) throw Error(o(387));
        if (((f = f.memoizedProps), f !== null)) {
          var y = a.type;
          ht(a.pendingProps.value, f.value) ||
            (e !== null ? e.push(y) : (e = [y]));
        }
      } else if (a === Ce.current) {
        if (((f = a.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
          (e !== null ? e.push(La) : (e = [La]));
      }
      a = a.return;
    }
    e !== null && _r(t, e, n, l), (t.flags |= 262144);
  }
  function bi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ht(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Zn(e) {
    (Xn = e),
      (kt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Fe(e) {
    return Yc(Xn, e);
  }
  function Si(e, t) {
    return Xn === null && Zn(e), Yc(e, t);
  }
  function Yc(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), kt === null)) {
      if (e === null) throw Error(o(308));
      (kt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else kt = kt.next = t;
    return n;
  }
  var xp =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, l) {
                  e.push(l);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                });
            };
          },
    Ep = r.unstable_scheduleCallback,
    _p = r.unstable_NormalPriority,
    Ye = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Cr() {
    return { controller: new xp(), data: new Map(), refCount: 0 };
  }
  function ra(e) {
    e.refCount--,
      e.refCount === 0 &&
        Ep(_p, function () {
          e.controller.abort();
        });
  }
  var sa = null,
    wr = 0,
    bl = 0,
    Sl = null;
  function Cp(e, t) {
    if (sa === null) {
      var n = (sa = []);
      (wr = 0),
        (bl = Ts()),
        (Sl = {
          status: "pending",
          value: void 0,
          then: function (l) {
            n.push(l);
          },
        });
    }
    return wr++, t.then(Gc, Gc), t;
  }
  function Gc() {
    if (--wr === 0 && sa !== null) {
      Sl !== null && (Sl.status = "fulfilled");
      var e = sa;
      (sa = null), (bl = 0), (Sl = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function wp(e, t) {
    var n = [],
      l = {
        status: "pending",
        value: null,
        reason: null,
        then: function (a) {
          n.push(a);
        },
      };
    return (
      e.then(
        function () {
          (l.status = "fulfilled"), (l.value = t);
          for (var a = 0; a < n.length; a++) (0, n[a])(t);
        },
        function (a) {
          for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
            (0, n[a])(void 0);
        }
      ),
      l
    );
  }
  var Vc = D.S;
  D.S = function (e, t) {
    (Ad = ct()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Cp(e, t),
      Vc !== null && Vc(e, t);
  };
  var Kn = C(null);
  function Ar() {
    var e = Kn.current;
    return e !== null ? e : ze.pooledCache;
  }
  function xi(e, t) {
    t === null ? K(Kn, Kn.current) : K(Kn, t.pool);
  }
  function Qc() {
    var e = Ar();
    return e === null ? null : { parent: Ye._currentValue, pool: e };
  }
  var xl = Error(o(460)),
    Or = Error(o(474)),
    Ei = Error(o(542)),
    _i = { then: function () {} };
  function Xc(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function Zc(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Qt, Qt), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), kc(e), e);
      default:
        if (typeof t.status == "string") t.then(Qt, Qt);
        else {
          if (((e = ze), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (l) {
                if (t.status === "pending") {
                  var a = t;
                  (a.status = "fulfilled"), (a.value = l);
                }
              },
              function (l) {
                if (t.status === "pending") {
                  var a = t;
                  (a.status = "rejected"), (a.reason = l);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), kc(e), e);
        }
        throw ((Jn = t), xl);
    }
  }
  function kn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((Jn = n), xl)
        : n;
    }
  }
  var Jn = null;
  function Kc() {
    if (Jn === null) throw Error(o(459));
    var e = Jn;
    return (Jn = null), e;
  }
  function kc(e) {
    if (e === xl || e === Ei) throw Error(o(483));
  }
  var El = null,
    oa = 0;
  function Ci(e) {
    var t = oa;
    return (oa += 1), El === null && (El = []), Zc(El, e, t);
  }
  function ca(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function wi(e, t) {
    throw t.$$typeof === S
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Jc(e) {
    function t(T, A) {
      if (e) {
        var N = T.deletions;
        N === null ? ((T.deletions = [A]), (T.flags |= 16)) : N.push(A);
      }
    }
    function n(T, A) {
      if (!e) return null;
      for (; A !== null; ) t(T, A), (A = A.sibling);
      return null;
    }
    function l(T) {
      for (var A = new Map(); T !== null; )
        T.key !== null ? A.set(T.key, T) : A.set(T.index, T), (T = T.sibling);
      return A;
    }
    function a(T, A) {
      return (T = Zt(T, A)), (T.index = 0), (T.sibling = null), T;
    }
    function u(T, A, N) {
      return (
        (T.index = N),
        e
          ? ((N = T.alternate),
            N !== null
              ? ((N = N.index), N < A ? ((T.flags |= 67108866), A) : N)
              : ((T.flags |= 67108866), A))
          : ((T.flags |= 1048576), A)
      );
    }
    function f(T) {
      return e && T.alternate === null && (T.flags |= 67108866), T;
    }
    function y(T, A, N, q) {
      return A === null || A.tag !== 6
        ? ((A = gr(N, T.mode, q)), (A.return = T), A)
        : ((A = a(A, N)), (A.return = T), A);
    }
    function E(T, A, N, q) {
      var ee = N.type;
      return ee === z
        ? H(T, A, N.props.children, q, N.key)
        : A !== null &&
          (A.elementType === ee ||
            (typeof ee == "object" &&
              ee !== null &&
              ee.$$typeof === Ee &&
              kn(ee) === A.type))
        ? ((A = a(A, N.props)), ca(A, N), (A.return = T), A)
        : ((A = yi(N.type, N.key, N.props, null, T.mode, q)),
          ca(A, N),
          (A.return = T),
          A);
    }
    function R(T, A, N, q) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== N.containerInfo ||
        A.stateNode.implementation !== N.implementation
        ? ((A = pr(N, T.mode, q)), (A.return = T), A)
        : ((A = a(A, N.children || [])), (A.return = T), A);
    }
    function H(T, A, N, q, ee) {
      return A === null || A.tag !== 7
        ? ((A = Vn(N, T.mode, q, ee)), (A.return = T), A)
        : ((A = a(A, N)), (A.return = T), A);
    }
    function G(T, A, N) {
      if (
        (typeof A == "string" && A !== "") ||
        typeof A == "number" ||
        typeof A == "bigint"
      )
        return (A = gr("" + A, T.mode, N)), (A.return = T), A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case x:
            return (
              (N = yi(A.type, A.key, A.props, null, T.mode, N)),
              ca(N, A),
              (N.return = T),
              N
            );
          case _:
            return (A = pr(A, T.mode, N)), (A.return = T), A;
          case Ee:
            return (A = kn(A)), G(T, A, N);
        }
        if (we(A) || $(A))
          return (A = Vn(A, T.mode, N, null)), (A.return = T), A;
        if (typeof A.then == "function") return G(T, Ci(A), N);
        if (A.$$typeof === Q) return G(T, Si(T, A), N);
        wi(T, A);
      }
      return null;
    }
    function M(T, A, N, q) {
      var ee = A !== null ? A.key : null;
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return ee !== null ? null : y(T, A, "" + N, q);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case x:
            return N.key === ee ? E(T, A, N, q) : null;
          case _:
            return N.key === ee ? R(T, A, N, q) : null;
          case Ee:
            return (N = kn(N)), M(T, A, N, q);
        }
        if (we(N) || $(N)) return ee !== null ? null : H(T, A, N, q, null);
        if (typeof N.then == "function") return M(T, A, Ci(N), q);
        if (N.$$typeof === Q) return M(T, A, Si(T, N), q);
        wi(T, N);
      }
      return null;
    }
    function j(T, A, N, q, ee) {
      if (
        (typeof q == "string" && q !== "") ||
        typeof q == "number" ||
        typeof q == "bigint"
      )
        return (T = T.get(N) || null), y(A, T, "" + q, ee);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case x:
            return (
              (T = T.get(q.key === null ? N : q.key) || null), E(A, T, q, ee)
            );
          case _:
            return (
              (T = T.get(q.key === null ? N : q.key) || null), R(A, T, q, ee)
            );
          case Ee:
            return (q = kn(q)), j(T, A, N, q, ee);
        }
        if (we(q) || $(q)) return (T = T.get(N) || null), H(A, T, q, ee, null);
        if (typeof q.then == "function") return j(T, A, N, Ci(q), ee);
        if (q.$$typeof === Q) return j(T, A, N, Si(A, q), ee);
        wi(A, q);
      }
      return null;
    }
    function J(T, A, N, q) {
      for (
        var ee = null, be = null, F = A, oe = (A = 0), ge = null;
        F !== null && oe < N.length;
        oe++
      ) {
        F.index > oe ? ((ge = F), (F = null)) : (ge = F.sibling);
        var Se = M(T, F, N[oe], q);
        if (Se === null) {
          F === null && (F = ge);
          break;
        }
        e && F && Se.alternate === null && t(T, F),
          (A = u(Se, A, oe)),
          be === null ? (ee = Se) : (be.sibling = Se),
          (be = Se),
          (F = ge);
      }
      if (oe === N.length) return n(T, F), pe && Kt(T, oe), ee;
      if (F === null) {
        for (; oe < N.length; oe++)
          (F = G(T, N[oe], q)),
            F !== null &&
              ((A = u(F, A, oe)),
              be === null ? (ee = F) : (be.sibling = F),
              (be = F));
        return pe && Kt(T, oe), ee;
      }
      for (F = l(F); oe < N.length; oe++)
        (ge = j(F, T, oe, N[oe], q)),
          ge !== null &&
            (e &&
              ge.alternate !== null &&
              F.delete(ge.key === null ? oe : ge.key),
            (A = u(ge, A, oe)),
            be === null ? (ee = ge) : (be.sibling = ge),
            (be = ge));
      return (
        e &&
          F.forEach(function (jn) {
            return t(T, jn);
          }),
        pe && Kt(T, oe),
        ee
      );
    }
    function ne(T, A, N, q) {
      if (N == null) throw Error(o(151));
      for (
        var ee = null, be = null, F = A, oe = (A = 0), ge = null, Se = N.next();
        F !== null && !Se.done;
        oe++, Se = N.next()
      ) {
        F.index > oe ? ((ge = F), (F = null)) : (ge = F.sibling);
        var jn = M(T, F, Se.value, q);
        if (jn === null) {
          F === null && (F = ge);
          break;
        }
        e && F && jn.alternate === null && t(T, F),
          (A = u(jn, A, oe)),
          be === null ? (ee = jn) : (be.sibling = jn),
          (be = jn),
          (F = ge);
      }
      if (Se.done) return n(T, F), pe && Kt(T, oe), ee;
      if (F === null) {
        for (; !Se.done; oe++, Se = N.next())
          (Se = G(T, Se.value, q)),
            Se !== null &&
              ((A = u(Se, A, oe)),
              be === null ? (ee = Se) : (be.sibling = Se),
              (be = Se));
        return pe && Kt(T, oe), ee;
      }
      for (F = l(F); !Se.done; oe++, Se = N.next())
        (Se = j(F, T, oe, Se.value, q)),
          Se !== null &&
            (e &&
              Se.alternate !== null &&
              F.delete(Se.key === null ? oe : Se.key),
            (A = u(Se, A, oe)),
            be === null ? (ee = Se) : (be.sibling = Se),
            (be = Se));
      return (
        e &&
          F.forEach(function (U0) {
            return t(T, U0);
          }),
        pe && Kt(T, oe),
        ee
      );
    }
    function Re(T, A, N, q) {
      if (
        (typeof N == "object" &&
          N !== null &&
          N.type === z &&
          N.key === null &&
          (N = N.props.children),
        typeof N == "object" && N !== null)
      ) {
        switch (N.$$typeof) {
          case x:
            e: {
              for (var ee = N.key; A !== null; ) {
                if (A.key === ee) {
                  if (((ee = N.type), ee === z)) {
                    if (A.tag === 7) {
                      n(T, A.sibling),
                        (q = a(A, N.props.children)),
                        (q.return = T),
                        (T = q);
                      break e;
                    }
                  } else if (
                    A.elementType === ee ||
                    (typeof ee == "object" &&
                      ee !== null &&
                      ee.$$typeof === Ee &&
                      kn(ee) === A.type)
                  ) {
                    n(T, A.sibling),
                      (q = a(A, N.props)),
                      ca(q, N),
                      (q.return = T),
                      (T = q);
                    break e;
                  }
                  n(T, A);
                  break;
                } else t(T, A);
                A = A.sibling;
              }
              N.type === z
                ? ((q = Vn(N.props.children, T.mode, q, N.key)),
                  (q.return = T),
                  (T = q))
                : ((q = yi(N.type, N.key, N.props, null, T.mode, q)),
                  ca(q, N),
                  (q.return = T),
                  (T = q));
            }
            return f(T);
          case _:
            e: {
              for (ee = N.key; A !== null; ) {
                if (A.key === ee)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === N.containerInfo &&
                    A.stateNode.implementation === N.implementation
                  ) {
                    n(T, A.sibling),
                      (q = a(A, N.children || [])),
                      (q.return = T),
                      (T = q);
                    break e;
                  } else {
                    n(T, A);
                    break;
                  }
                else t(T, A);
                A = A.sibling;
              }
              (q = pr(N, T.mode, q)), (q.return = T), (T = q);
            }
            return f(T);
          case Ee:
            return (N = kn(N)), Re(T, A, N, q);
        }
        if (we(N)) return J(T, A, N, q);
        if ($(N)) {
          if (((ee = $(N)), typeof ee != "function")) throw Error(o(150));
          return (N = ee.call(N)), ne(T, A, N, q);
        }
        if (typeof N.then == "function") return Re(T, A, Ci(N), q);
        if (N.$$typeof === Q) return Re(T, A, Si(T, N), q);
        wi(T, N);
      }
      return (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
        ? ((N = "" + N),
          A !== null && A.tag === 6
            ? (n(T, A.sibling), (q = a(A, N)), (q.return = T), (T = q))
            : (n(T, A), (q = gr(N, T.mode, q)), (q.return = T), (T = q)),
          f(T))
        : n(T, A);
    }
    return function (T, A, N, q) {
      try {
        oa = 0;
        var ee = Re(T, A, N, q);
        return (El = null), ee;
      } catch (F) {
        if (F === xl || F === Ei) throw F;
        var be = mt(29, F, null, T.mode);
        return (be.lanes = q), (be.return = T), be;
      } finally {
      }
    };
  }
  var $n = Jc(!0),
    $c = Jc(!1),
    yn = !1;
  function Tr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Nr(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function vn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function bn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (((l = l.shared), (xe & 2) !== 0)) {
      var a = l.pending;
      return (
        a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
        (l.pending = t),
        (t = pi(e)),
        Mc(e, null, n),
        t
      );
    }
    return gi(e, l, t, n), pi(e);
  }
  function fa(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var l = t.lanes;
      (l &= e.pendingLanes), (n |= l), (t.lanes = n), Yo(e, n);
    }
  }
  function Rr(e, t) {
    var n = e.updateQueue,
      l = e.alternate;
    if (l !== null && ((l = l.updateQueue), n === l)) {
      var a = null,
        u = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          u === null ? (a = u = f) : (u = u.next = f), (n = n.next);
        } while (n !== null);
        u === null ? (a = u = t) : (u = u.next = t);
      } else a = u = t;
      (n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  var zr = !1;
  function da() {
    if (zr) {
      var e = Sl;
      if (e !== null) throw e;
    }
  }
  function ha(e, t, n, l) {
    zr = !1;
    var a = e.updateQueue;
    yn = !1;
    var u = a.firstBaseUpdate,
      f = a.lastBaseUpdate,
      y = a.shared.pending;
    if (y !== null) {
      a.shared.pending = null;
      var E = y,
        R = E.next;
      (E.next = null), f === null ? (u = R) : (f.next = R), (f = E);
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (y = H.lastBaseUpdate),
        y !== f &&
          (y === null ? (H.firstBaseUpdate = R) : (y.next = R),
          (H.lastBaseUpdate = E)));
    }
    if (u !== null) {
      var G = a.baseState;
      (f = 0), (H = R = E = null), (y = u);
      do {
        var M = y.lane & -536870913,
          j = M !== y.lane;
        if (j ? (me & M) === M : (l & M) === M) {
          M !== 0 && M === bl && (zr = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: y.tag,
                  payload: y.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var J = e,
              ne = y;
            M = t;
            var Re = n;
            switch (ne.tag) {
              case 1:
                if (((J = ne.payload), typeof J == "function")) {
                  G = J.call(Re, G, M);
                  break e;
                }
                G = J;
                break e;
              case 3:
                J.flags = (J.flags & -65537) | 128;
              case 0:
                if (
                  ((J = ne.payload),
                  (M = typeof J == "function" ? J.call(Re, G, M) : J),
                  M == null)
                )
                  break e;
                G = b({}, G, M);
                break e;
              case 2:
                yn = !0;
            }
          }
          (M = y.callback),
            M !== null &&
              ((e.flags |= 64),
              j && (e.flags |= 8192),
              (j = a.callbacks),
              j === null ? (a.callbacks = [M]) : j.push(M));
        } else
          (j = {
            lane: M,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null,
          }),
            H === null ? ((R = H = j), (E = G)) : (H = H.next = j),
            (f |= M);
        if (((y = y.next), y === null)) {
          if (((y = a.shared.pending), y === null)) break;
          (j = y),
            (y = j.next),
            (j.next = null),
            (a.lastBaseUpdate = j),
            (a.shared.pending = null);
        }
      } while (!0);
      H === null && (E = G),
        (a.baseState = E),
        (a.firstBaseUpdate = R),
        (a.lastBaseUpdate = H),
        u === null && (a.shared.lanes = 0),
        (Cn |= f),
        (e.lanes = f),
        (e.memoizedState = G);
    }
  }
  function Fc(e, t) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(t);
  }
  function Wc(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) Fc(n[e], t);
  }
  var _l = C(null),
    Ai = C(0);
  function Pc(e, t) {
    (e = ln), K(Ai, e), K(_l, t), (ln = e | t.baseLanes);
  }
  function Mr() {
    K(Ai, ln), K(_l, _l.current);
  }
  function Lr() {
    (ln = Ai.current), B(_l), B(Ai);
  }
  var gt = C(null),
    Ot = null;
  function Sn(e) {
    var t = e.alternate;
    K(Be, Be.current & 1),
      K(gt, e),
      Ot === null &&
        (t === null || _l.current !== null || t.memoizedState !== null) &&
        (Ot = e);
  }
  function jr(e) {
    K(Be, Be.current), K(gt, e), Ot === null && (Ot = e);
  }
  function Ic(e) {
    e.tag === 22
      ? (K(Be, Be.current), K(gt, e), Ot === null && (Ot = e))
      : xn();
  }
  function xn() {
    K(Be, Be.current), K(gt, gt.current);
  }
  function pt(e) {
    B(gt), Ot === e && (Ot = null), B(Be);
  }
  var Be = C(0);
  function Oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || Ys(n) || Gs(n)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var $t = 0,
    se = null,
    Te = null,
    Ge = null,
    Ti = !1,
    Cl = !1,
    Fn = !1,
    Ni = 0,
    ma = 0,
    wl = null,
    Ap = 0;
  function De() {
    throw Error(o(321));
  }
  function Dr(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ht(e[n], t[n])) return !1;
    return !0;
  }
  function Ur(e, t, n, l, a, u) {
    return (
      ($t = u),
      (se = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (D.H = e === null || e.memoizedState === null ? Hf : Wr),
      (Fn = !1),
      (u = n(l, a)),
      (Fn = !1),
      Cl && (u = tf(t, n, l, a)),
      ef(e),
      u
    );
  }
  function ef(e) {
    D.H = ya;
    var t = Te !== null && Te.next !== null;
    if ((($t = 0), (Ge = Te = se = null), (Ti = !1), (ma = 0), (wl = null), t))
      throw Error(o(300));
    e === null ||
      Ve ||
      ((e = e.dependencies), e !== null && bi(e) && (Ve = !0));
  }
  function tf(e, t, n, l) {
    se = e;
    var a = 0;
    do {
      if ((Cl && (wl = null), (ma = 0), (Cl = !1), 25 <= a))
        throw Error(o(301));
      if (((a += 1), (Ge = Te = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        (u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0);
      }
      (D.H = Bf), (u = t(n, l));
    } while (Cl);
    return u;
  }
  function Op() {
    var e = D.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? ga(t) : t),
      (e = e.useState()[0]),
      (Te !== null ? Te.memoizedState : null) !== e && (se.flags |= 1024),
      t
    );
  }
  function Hr() {
    var e = Ni !== 0;
    return (Ni = 0), e;
  }
  function Br(e, t, n) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
  }
  function qr(e) {
    if (Ti) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      Ti = !1;
    }
    ($t = 0), (Ge = Te = se = null), (Cl = !1), (ma = Ni = 0), (wl = null);
  }
  function nt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ge === null ? (se.memoizedState = Ge = e) : (Ge = Ge.next = e), Ge;
  }
  function qe() {
    if (Te === null) {
      var e = se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Te.next;
    var t = Ge === null ? se.memoizedState : Ge.next;
    if (t !== null) (Ge = t), (Te = e);
    else {
      if (e === null)
        throw se.alternate === null ? Error(o(467)) : Error(o(310));
      (Te = e),
        (e = {
          memoizedState: Te.memoizedState,
          baseState: Te.baseState,
          baseQueue: Te.baseQueue,
          queue: Te.queue,
          next: null,
        }),
        Ge === null ? (se.memoizedState = Ge = e) : (Ge = Ge.next = e);
    }
    return Ge;
  }
  function Ri() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ga(e) {
    var t = ma;
    return (
      (ma += 1),
      wl === null && (wl = []),
      (e = Zc(wl, e, t)),
      (t = se),
      (Ge === null ? t.memoizedState : Ge.next) === null &&
        ((t = t.alternate),
        (D.H = t === null || t.memoizedState === null ? Hf : Wr)),
      e
    );
  }
  function zi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ga(e);
      if (e.$$typeof === Q) return Fe(e);
    }
    throw Error(o(438, String(e)));
  }
  function Yr(e) {
    var t = null,
      n = se.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var l = se.alternate;
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (t = {
              data: l.data.map(function (a) {
                return a.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Ri()), (se.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++) n[l] = V;
    return t.index++, n;
  }
  function Ft(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Mi(e) {
    var t = qe();
    return Gr(t, Te, e);
  }
  function Gr(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue,
      u = l.pending;
    if (u !== null) {
      if (a !== null) {
        var f = a.next;
        (a.next = u.next), (u.next = f);
      }
      (t.baseQueue = a = u), (l.pending = null);
    }
    if (((u = e.baseState), a === null)) e.memoizedState = u;
    else {
      t = a.next;
      var y = (f = null),
        E = null,
        R = t,
        H = !1;
      do {
        var G = R.lane & -536870913;
        if (G !== R.lane ? (me & G) === G : ($t & G) === G) {
          var M = R.revertLane;
          if (M === 0)
            E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: R.action,
                  hasEagerState: R.hasEagerState,
                  eagerState: R.eagerState,
                  next: null,
                }),
              G === bl && (H = !0);
          else if (($t & M) === M) {
            (R = R.next), M === bl && (H = !0);
            continue;
          } else
            (G = {
              lane: 0,
              revertLane: R.revertLane,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null,
            }),
              E === null ? ((y = E = G), (f = u)) : (E = E.next = G),
              (se.lanes |= M),
              (Cn |= M);
          (G = R.action),
            Fn && n(u, G),
            (u = R.hasEagerState ? R.eagerState : n(u, G));
        } else
          (M = {
            lane: G,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          }),
            E === null ? ((y = E = M), (f = u)) : (E = E.next = M),
            (se.lanes |= G),
            (Cn |= G);
        R = R.next;
      } while (R !== null && R !== t);
      if (
        (E === null ? (f = u) : (E.next = y),
        !ht(u, e.memoizedState) && ((Ve = !0), H && ((n = Sl), n !== null)))
      )
        throw n;
      (e.memoizedState = u),
        (e.baseState = f),
        (e.baseQueue = E),
        (l.lastRenderedState = u);
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Vr(e) {
    var t = qe(),
      n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch,
      a = n.pending,
      u = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var f = (a = a.next);
      do (u = e(u, f.action)), (f = f.next);
      while (f !== a);
      ht(u, t.memoizedState) || (Ve = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (n.lastRenderedState = u);
    }
    return [u, l];
  }
  function nf(e, t, n) {
    var l = se,
      a = qe(),
      u = pe;
    if (u) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var f = !ht((Te || a).memoizedState, n);
    if (
      (f && ((a.memoizedState = n), (Ve = !0)),
      (a = a.queue),
      Zr(uf.bind(null, l, a, e), [e]),
      a.getSnapshot !== t || f || (Ge !== null && Ge.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        Al(9, { destroy: void 0 }, af.bind(null, l, a, n, t), null),
        ze === null)
      )
        throw Error(o(349));
      u || ($t & 127) !== 0 || lf(l, t, n);
    }
    return n;
  }
  function lf(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = se.updateQueue),
      t === null
        ? ((t = Ri()), (se.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function af(e, t, n, l) {
    (t.value = n), (t.getSnapshot = l), rf(t) && sf(e);
  }
  function uf(e, t, n) {
    return n(function () {
      rf(t) && sf(e);
    });
  }
  function rf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ht(e, n);
    } catch {
      return !0;
    }
  }
  function sf(e) {
    var t = Gn(e, 2);
    t !== null && ot(t, e, 2);
  }
  function Qr(e) {
    var t = nt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), Fn)) {
        cn(!0);
        try {
          n();
        } finally {
          cn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ft,
        lastRenderedState: e,
      }),
      t
    );
  }
  function of(e, t, n, l) {
    return (e.baseState = n), Gr(e, Te, typeof l == "function" ? l : Ft);
  }
  function Tp(e, t, n, l, a) {
    if (Di(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          u.listeners.push(f);
        },
      };
      D.T !== null ? n(!0) : (u.isTransition = !1),
        l(u),
        (n = t.pending),
        n === null
          ? ((u.next = t.pending = u), cf(t, u))
          : ((u.next = n.next), (t.pending = n.next = u));
    }
  }
  function cf(e, t) {
    var n = t.action,
      l = t.payload,
      a = e.state;
    if (t.isTransition) {
      var u = D.T,
        f = {};
      D.T = f;
      try {
        var y = n(a, l),
          E = D.S;
        E !== null && E(f, y), ff(e, t, y);
      } catch (R) {
        Xr(e, t, R);
      } finally {
        u !== null && f.types !== null && (u.types = f.types), (D.T = u);
      }
    } else
      try {
        (u = n(a, l)), ff(e, t, u);
      } catch (R) {
        Xr(e, t, R);
      }
  }
  function ff(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (l) {
            df(e, t, l);
          },
          function (l) {
            return Xr(e, t, l);
          }
        )
      : df(e, t, n);
  }
  function df(e, t, n) {
    (t.status = "fulfilled"),
      (t.value = n),
      hf(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), cf(e, n)));
  }
  function Xr(e, t, n) {
    var l = e.pending;
    if (((e.pending = null), l !== null)) {
      l = l.next;
      do (t.status = "rejected"), (t.reason = n), hf(t), (t = t.next);
      while (t !== l);
    }
    e.action = null;
  }
  function hf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function mf(e, t) {
    return t;
  }
  function gf(e, t) {
    if (pe) {
      var n = ze.formState;
      if (n !== null) {
        e: {
          var l = se;
          if (pe) {
            if (Me) {
              t: {
                for (var a = Me, u = At; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break t;
                  }
                  if (((a = Tt(a.nextSibling)), a === null)) {
                    a = null;
                    break t;
                  }
                }
                (u = a.data), (a = u === "F!" || u === "F" ? a : null);
              }
              if (a) {
                (Me = Tt(a.nextSibling)), (l = a.data === "F!");
                break e;
              }
            }
            gn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return (
      (n = nt()),
      (n.memoizedState = n.baseState = t),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: mf,
        lastRenderedState: t,
      }),
      (n.queue = l),
      (n = jf.bind(null, se, l)),
      (l.dispatch = n),
      (l = Qr(!1)),
      (u = Fr.bind(null, se, !1, l.queue)),
      (l = nt()),
      (a = { state: t, dispatch: null, action: e, pending: null }),
      (l.queue = a),
      (n = Tp.bind(null, se, a, u, n)),
      (a.dispatch = n),
      (l.memoizedState = e),
      [t, n, !1]
    );
  }
  function pf(e) {
    var t = qe();
    return yf(t, Te, e);
  }
  function yf(e, t, n) {
    if (
      ((t = Gr(e, t, mf)[0]),
      (e = Mi(Ft)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var l = ga(t);
      } catch (f) {
        throw f === xl ? Ei : f;
      }
    else l = t;
    t = qe();
    var a = t.queue,
      u = a.dispatch;
    return (
      n !== t.memoizedState &&
        ((se.flags |= 2048),
        Al(9, { destroy: void 0 }, Np.bind(null, a, n), null)),
      [l, u, e]
    );
  }
  function Np(e, t) {
    e.action = t;
  }
  function vf(e) {
    var t = qe(),
      n = Te;
    if (n !== null) return yf(t, n, e);
    qe(), (t = t.memoizedState), (n = qe());
    var l = n.queue.dispatch;
    return (n.memoizedState = e), [t, l, !1];
  }
  function Al(e, t, n, l) {
    return (
      (e = { tag: e, create: n, deps: l, inst: t, next: null }),
      (t = se.updateQueue),
      t === null && ((t = Ri()), (se.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((l = n.next), (n.next = e), (e.next = l), (t.lastEffect = e)),
      e
    );
  }
  function bf() {
    return qe().memoizedState;
  }
  function Li(e, t, n, l) {
    var a = nt();
    (se.flags |= e),
      (a.memoizedState = Al(
        1 | t,
        { destroy: void 0 },
        n,
        l === void 0 ? null : l
      ));
  }
  function ji(e, t, n, l) {
    var a = qe();
    l = l === void 0 ? null : l;
    var u = a.memoizedState.inst;
    Te !== null && l !== null && Dr(l, Te.memoizedState.deps)
      ? (a.memoizedState = Al(t, u, n, l))
      : ((se.flags |= e), (a.memoizedState = Al(1 | t, u, n, l)));
  }
  function Sf(e, t) {
    Li(8390656, 8, e, t);
  }
  function Zr(e, t) {
    ji(2048, 8, e, t);
  }
  function Rp(e) {
    se.flags |= 4;
    var t = se.updateQueue;
    if (t === null) (t = Ri()), (se.updateQueue = t), (t.events = [e]);
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function xf(e) {
    var t = qe().memoizedState;
    return (
      Rp({ ref: t, nextImpl: e }),
      function () {
        if ((xe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Ef(e, t) {
    return ji(4, 2, e, t);
  }
  function _f(e, t) {
    return ji(4, 4, e, t);
  }
  function Cf(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function wf(e, t, n) {
    (n = n != null ? n.concat([e]) : null), ji(4, 4, Cf.bind(null, t, e), n);
  }
  function Kr() {}
  function Af(e, t) {
    var n = qe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Dr(t, l[1]) ? l[0] : ((n.memoizedState = [e, t]), e);
  }
  function Of(e, t) {
    var n = qe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Dr(t, l[1])) return l[0];
    if (((l = e()), Fn)) {
      cn(!0);
      try {
        e();
      } finally {
        cn(!1);
      }
    }
    return (n.memoizedState = [l, t]), l;
  }
  function kr(e, t, n) {
    return n === void 0 || (($t & 1073741824) !== 0 && (me & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Td()), (se.lanes |= e), (Cn |= e), n);
  }
  function Tf(e, t, n, l) {
    return ht(n, t)
      ? n
      : _l.current !== null
      ? ((e = kr(e, n, l)), ht(e, t) || (Ve = !0), e)
      : ($t & 42) === 0 || (($t & 1073741824) !== 0 && (me & 261930) === 0)
      ? ((Ve = !0), (e.memoizedState = n))
      : ((e = Td()), (se.lanes |= e), (Cn |= e), t);
  }
  function Nf(e, t, n, l, a) {
    var u = X.p;
    X.p = u !== 0 && 8 > u ? u : 8;
    var f = D.T,
      y = {};
    (D.T = y), Fr(e, !1, t, n);
    try {
      var E = a(),
        R = D.S;
      if (
        (R !== null && R(y, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var H = wp(E, l);
        pa(e, t, H, bt(e));
      } else pa(e, t, l, bt(e));
    } catch (G) {
      pa(e, t, { then: function () {}, status: "rejected", reason: G }, bt());
    } finally {
      (X.p = u),
        f !== null && y.types !== null && (f.types = y.types),
        (D.T = f);
    }
  }
  function zp() {}
  function Jr(e, t, n, l) {
    if (e.tag !== 5) throw Error(o(476));
    var a = Rf(e).queue;
    Nf(
      e,
      a,
      t,
      te,
      n === null
        ? zp
        : function () {
            return zf(e), n(l);
          }
    );
  }
  function Rf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: te,
      baseState: te,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ft,
        lastRenderedState: te,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ft,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function zf(e) {
    var t = Rf(e);
    t.next === null && (t = e.alternate.memoizedState),
      pa(e, t.next.queue, {}, bt());
  }
  function $r() {
    return Fe(La);
  }
  function Mf() {
    return qe().memoizedState;
  }
  function Lf() {
    return qe().memoizedState;
  }
  function Mp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = bt();
          e = vn(n);
          var l = bn(t, e, n);
          l !== null && (ot(l, t, n), fa(l, t, n)),
            (t = { cache: Cr() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Lp(e, t, n) {
    var l = bt();
    (n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Di(e)
        ? Df(t, n)
        : ((n = hr(e, t, n, l)), n !== null && (ot(n, e, l), Uf(n, t, l)));
  }
  function jf(e, t, n) {
    var l = bt();
    pa(e, t, n, l);
  }
  function pa(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Di(e)) Df(t, a);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var f = t.lastRenderedState,
            y = u(f, n);
          if (((a.hasEagerState = !0), (a.eagerState = y), ht(y, f)))
            return gi(e, t, a, 0), ze === null && mi(), !1;
        } catch {
        } finally {
        }
      if (((n = hr(e, t, a, l)), n !== null))
        return ot(n, e, l), Uf(n, t, l), !0;
    }
    return !1;
  }
  function Fr(e, t, n, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: Ts(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Di(e))
    ) {
      if (t) throw Error(o(479));
    } else (t = hr(e, n, l, 2)), t !== null && ot(t, e, 2);
  }
  function Di(e) {
    var t = e.alternate;
    return e === se || (t !== null && t === se);
  }
  function Df(e, t) {
    Cl = Ti = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function Uf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      (l &= e.pendingLanes), (n |= l), (t.lanes = n), Yo(e, n);
    }
  }
  var ya = {
    readContext: Fe,
    use: zi,
    useCallback: De,
    useContext: De,
    useEffect: De,
    useImperativeHandle: De,
    useLayoutEffect: De,
    useInsertionEffect: De,
    useMemo: De,
    useReducer: De,
    useRef: De,
    useState: De,
    useDebugValue: De,
    useDeferredValue: De,
    useTransition: De,
    useSyncExternalStore: De,
    useId: De,
    useHostTransitionStatus: De,
    useFormState: De,
    useActionState: De,
    useOptimistic: De,
    useMemoCache: De,
    useCacheRefresh: De,
  };
  ya.useEffectEvent = De;
  var Hf = {
      readContext: Fe,
      use: zi,
      useCallback: function (e, t) {
        return (nt().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Fe,
      useEffect: Sf,
      useImperativeHandle: function (e, t, n) {
        (n = n != null ? n.concat([e]) : null),
          Li(4194308, 4, Cf.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return Li(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Li(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = nt();
        t = t === void 0 ? null : t;
        var l = e();
        if (Fn) {
          cn(!0);
          try {
            e();
          } finally {
            cn(!1);
          }
        }
        return (n.memoizedState = [l, t]), l;
      },
      useReducer: function (e, t, n) {
        var l = nt();
        if (n !== void 0) {
          var a = n(t);
          if (Fn) {
            cn(!0);
            try {
              n(t);
            } finally {
              cn(!1);
            }
          }
        } else a = t;
        return (
          (l.memoizedState = l.baseState = a),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: a,
          }),
          (l.queue = e),
          (e = e.dispatch = Lp.bind(null, se, e)),
          [l.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = nt();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = Qr(e);
        var t = e.queue,
          n = jf.bind(null, se, t);
        return (t.dispatch = n), [e.memoizedState, n];
      },
      useDebugValue: Kr,
      useDeferredValue: function (e, t) {
        var n = nt();
        return kr(n, e, t);
      },
      useTransition: function () {
        var e = Qr(!1);
        return (
          (e = Nf.bind(null, se, e.queue, !0, !1)),
          (nt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var l = se,
          a = nt();
        if (pe) {
          if (n === void 0) throw Error(o(407));
          n = n();
        } else {
          if (((n = t()), ze === null)) throw Error(o(349));
          (me & 127) !== 0 || lf(l, t, n);
        }
        a.memoizedState = n;
        var u = { value: n, getSnapshot: t };
        return (
          (a.queue = u),
          Sf(uf.bind(null, l, u, e), [e]),
          (l.flags |= 2048),
          Al(9, { destroy: void 0 }, af.bind(null, l, u, n, t), null),
          n
        );
      },
      useId: function () {
        var e = nt(),
          t = ze.identifierPrefix;
        if (pe) {
          var n = Dt,
            l = jt;
          (n = (l & ~(1 << (32 - dt(l) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = Ni++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_");
        } else (n = Ap++), (t = "_" + t + "r_" + n.toString(32) + "_");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: $r,
      useFormState: gf,
      useActionState: gf,
      useOptimistic: function (e) {
        var t = nt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = Fr.bind(null, se, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Yr,
      useCacheRefresh: function () {
        return (nt().memoizedState = Mp.bind(null, se));
      },
      useEffectEvent: function (e) {
        var t = nt(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((xe & 2) !== 0) throw Error(o(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Wr = {
      readContext: Fe,
      use: zi,
      useCallback: Af,
      useContext: Fe,
      useEffect: Zr,
      useImperativeHandle: wf,
      useInsertionEffect: Ef,
      useLayoutEffect: _f,
      useMemo: Of,
      useReducer: Mi,
      useRef: bf,
      useState: function () {
        return Mi(Ft);
      },
      useDebugValue: Kr,
      useDeferredValue: function (e, t) {
        var n = qe();
        return Tf(n, Te.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Mi(Ft)[0],
          t = qe().memoizedState;
        return [typeof e == "boolean" ? e : ga(e), t];
      },
      useSyncExternalStore: nf,
      useId: Mf,
      useHostTransitionStatus: $r,
      useFormState: pf,
      useActionState: pf,
      useOptimistic: function (e, t) {
        var n = qe();
        return of(n, Te, e, t);
      },
      useMemoCache: Yr,
      useCacheRefresh: Lf,
    };
  Wr.useEffectEvent = xf;
  var Bf = {
    readContext: Fe,
    use: zi,
    useCallback: Af,
    useContext: Fe,
    useEffect: Zr,
    useImperativeHandle: wf,
    useInsertionEffect: Ef,
    useLayoutEffect: _f,
    useMemo: Of,
    useReducer: Vr,
    useRef: bf,
    useState: function () {
      return Vr(Ft);
    },
    useDebugValue: Kr,
    useDeferredValue: function (e, t) {
      var n = qe();
      return Te === null ? kr(n, e, t) : Tf(n, Te.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Vr(Ft)[0],
        t = qe().memoizedState;
      return [typeof e == "boolean" ? e : ga(e), t];
    },
    useSyncExternalStore: nf,
    useId: Mf,
    useHostTransitionStatus: $r,
    useFormState: vf,
    useActionState: vf,
    useOptimistic: function (e, t) {
      var n = qe();
      return Te !== null
        ? of(n, Te, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: Yr,
    useCacheRefresh: Lf,
  };
  Bf.useEffectEvent = xf;
  function Pr(e, t, n, l) {
    (t = e.memoizedState),
      (n = n(l, t)),
      (n = n == null ? t : b({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Ir = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var l = bt(),
        a = vn(l);
      (a.payload = t),
        n != null && (a.callback = n),
        (t = bn(e, a, l)),
        t !== null && (ot(t, e, l), fa(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var l = bt(),
        a = vn(l);
      (a.tag = 1),
        (a.payload = t),
        n != null && (a.callback = n),
        (t = bn(e, a, l)),
        t !== null && (ot(t, e, l), fa(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = bt(),
        l = vn(n);
      (l.tag = 2),
        t != null && (l.callback = t),
        (t = bn(e, l, n)),
        t !== null && (ot(t, e, n), fa(t, e, n));
    },
  };
  function qf(e, t, n, l, a, u, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(l, u, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !la(n, l) || !la(a, u)
        : !0
    );
  }
  function Yf(e, t, n, l) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, l),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, l),
      t.state !== e && Ir.enqueueReplaceState(t, t.state, null);
  }
  function Wn(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t) l !== "ref" && (n[l] = t[l]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = b({}, n));
      for (var a in e) n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function Gf(e) {
    hi(e);
  }
  function Vf(e) {
    console.error(e);
  }
  function Qf(e) {
    hi(e);
  }
  function Ui(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Xf(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function es(e, t, n) {
    return (
      (n = vn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Ui(e, t);
      }),
      n
    );
  }
  function Zf(e) {
    return (e = vn(e)), (e.tag = 3), e;
  }
  function Kf(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = l.value;
      (e.payload = function () {
        return a(u);
      }),
        (e.callback = function () {
          Xf(t, n, l);
        });
    }
    var f = n.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        Xf(t, n, l),
          typeof a != "function" &&
            (wn === null ? (wn = new Set([this])) : wn.add(this));
        var y = l.stack;
        this.componentDidCatch(l.value, {
          componentStack: y !== null ? y : "",
        });
      });
  }
  function jp(e, t, n, l, a) {
    if (
      ((n.flags |= 32768),
      l !== null && typeof l == "object" && typeof l.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && vl(t, n, a, !0),
        (n = gt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Ot === null ? Ji() : n.alternate === null && Ue === 0 && (Ue = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = a),
              l === _i
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([l])) : t.add(l),
                  ws(e, l, a)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              l === _i
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([l])) : n.add(l)),
                  ws(e, l, a)),
              !1
            );
        }
        throw Error(o(435, n.tag));
      }
      return ws(e, l, a), Ji(), !1;
    }
    if (pe)
      return (
        (t = gt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = a),
            l !== br && ((e = Error(o(422), { cause: l })), ua(_t(e, n))))
          : (l !== br && ((t = Error(o(423), { cause: l })), ua(_t(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (a &= -a),
            (e.lanes |= a),
            (l = _t(l, n)),
            (a = es(e.stateNode, l, a)),
            Rr(e, a),
            Ue !== 4 && (Ue = 2)),
        !1
      );
    var u = Error(o(520), { cause: l });
    if (
      ((u = _t(u, n)),
      wa === null ? (wa = [u]) : wa.push(u),
      Ue !== 4 && (Ue = 2),
      t === null)
    )
      return !0;
    (l = _t(l, n)), (n = t);
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = a & -a),
            (n.lanes |= e),
            (e = es(n.stateNode, l, e)),
            Rr(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (u = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (wn === null || !wn.has(u)))))
          )
            return (
              (n.flags |= 65536),
              (a &= -a),
              (n.lanes |= a),
              (a = Zf(a)),
              Kf(a, e, n, l),
              Rr(n, a),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var ts = Error(o(461)),
    Ve = !1;
  function We(e, t, n, l) {
    t.child = e === null ? $c(t, null, n, l) : $n(t, e.child, n, l);
  }
  function kf(e, t, n, l, a) {
    n = n.render;
    var u = t.ref;
    if ("ref" in l) {
      var f = {};
      for (var y in l) y !== "ref" && (f[y] = l[y]);
    } else f = l;
    return (
      Zn(t),
      (l = Ur(e, t, n, f, u, a)),
      (y = Hr()),
      e !== null && !Ve
        ? (Br(e, t, a), Wt(e, t, a))
        : (pe && y && yr(t), (t.flags |= 1), We(e, t, l, a), t.child)
    );
  }
  function Jf(e, t, n, l, a) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" &&
        !mr(u) &&
        u.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = u), $f(e, t, u, l, a))
        : ((e = yi(n.type, null, l, t, t.mode, a)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((u = e.child), !os(e, a))) {
      var f = u.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : la), n(f, l) && e.ref === t.ref)
      )
        return Wt(e, t, a);
    }
    return (
      (t.flags |= 1),
      (e = Zt(u, l)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function $f(e, t, n, l, a) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (la(u, l) && e.ref === t.ref)
        if (((Ve = !1), (t.pendingProps = l = u), os(e, a)))
          (e.flags & 131072) !== 0 && (Ve = !0);
        else return (t.lanes = e.lanes), Wt(e, t, a);
    }
    return ns(e, t, n, l, a);
  }
  function Ff(e, t, n, l) {
    var a = l.children,
      u = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | n : n), e !== null)) {
          for (l = t.child = e.child, a = 0; l !== null; )
            (a = a | l.lanes | l.childLanes), (l = l.sibling);
          l = a & ~u;
        } else (l = 0), (t.child = null);
        return Wf(e, t, u, n, l);
      }
      if ((n & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && xi(t, u !== null ? u.cachePool : null),
          u !== null ? Pc(t, u) : Mr(),
          Ic(t);
      else
        return (
          (l = t.lanes = 536870912),
          Wf(e, t, u !== null ? u.baseLanes | n : n, n, l)
        );
    } else
      u !== null
        ? (xi(t, u.cachePool), Pc(t, u), xn(), (t.memoizedState = null))
        : (e !== null && xi(t, null), Mr(), xn());
    return We(e, t, a, n), t.child;
  }
  function va(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Wf(e, t, n, l, a) {
    var u = Ar();
    return (
      (u = u === null ? null : { parent: Ye._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: n, cachePool: u }),
      e !== null && xi(t, null),
      Mr(),
      Ic(t),
      e !== null && vl(e, t, l, !0),
      (t.childLanes = a),
      null
    );
  }
  function Hi(e, t) {
    return (
      (t = qi({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Pf(e, t, n) {
    return (
      $n(t, e.child, null, n),
      (e = Hi(t, t.pendingProps)),
      (e.flags |= 2),
      pt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Dp(e, t, n) {
    var l = t.pendingProps,
      a = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (pe) {
        if (l.mode === "hidden")
          return (e = Hi(t, l)), (t.lanes = 536870912), va(null, e);
        if (
          (jr(t),
          (e = Me)
            ? ((e = ch(e, At)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: hn !== null ? { id: jt, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = jc(e)),
                (n.return = t),
                (t.child = n),
                ($e = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return (t.lanes = 536870912), null;
      }
      return Hi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var f = u.dehydrated;
      if ((jr(t), a))
        if (t.flags & 256) (t.flags &= -257), (t = Pf(e, t, n));
        else if (t.memoizedState !== null)
          (t.child = e.child), (t.flags |= 128), (t = null);
        else throw Error(o(558));
      else if (
        (Ve || vl(e, t, n, !1), (a = (n & e.childLanes) !== 0), Ve || a)
      ) {
        if (
          ((l = ze),
          l !== null && ((f = Go(l, n)), f !== 0 && f !== u.retryLane))
        )
          throw ((u.retryLane = f), Gn(e, f), ot(l, e, f), ts);
        Ji(), (t = Pf(e, t, n));
      } else
        (e = u.treeContext),
          (Me = Tt(f.nextSibling)),
          ($e = t),
          (pe = !0),
          (mn = null),
          (At = !1),
          e !== null && Hc(t, e),
          (t = Hi(t, l)),
          (t.flags |= 4096);
      return t;
    }
    return (
      (e = Zt(e.child, { mode: l.mode, children: l.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Bi(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function ns(e, t, n, l, a) {
    return (
      Zn(t),
      (n = Ur(e, t, n, l, void 0, a)),
      (l = Hr()),
      e !== null && !Ve
        ? (Br(e, t, a), Wt(e, t, a))
        : (pe && l && yr(t), (t.flags |= 1), We(e, t, n, a), t.child)
    );
  }
  function If(e, t, n, l, a, u) {
    return (
      Zn(t),
      (t.updateQueue = null),
      (n = tf(t, l, n, a)),
      ef(e),
      (l = Hr()),
      e !== null && !Ve
        ? (Br(e, t, u), Wt(e, t, u))
        : (pe && l && yr(t), (t.flags |= 1), We(e, t, n, u), t.child)
    );
  }
  function ed(e, t, n, l, a) {
    if ((Zn(t), t.stateNode === null)) {
      var u = ml,
        f = n.contextType;
      typeof f == "object" && f !== null && (u = Fe(f)),
        (u = new n(l, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = Ir),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = l),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Tr(t),
        (f = n.contextType),
        (u.context = typeof f == "object" && f !== null ? Fe(f) : ml),
        (u.state = t.memoizedState),
        (f = n.getDerivedStateFromProps),
        typeof f == "function" && (Pr(t, n, f, l), (u.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((f = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          f !== u.state && Ir.enqueueReplaceState(u, u.state, null),
          ha(t, l, u, a),
          da(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (l = !0);
    } else if (e === null) {
      u = t.stateNode;
      var y = t.memoizedProps,
        E = Wn(n, y);
      u.props = E;
      var R = u.context,
        H = n.contextType;
      (f = ml), typeof H == "object" && H !== null && (f = Fe(H));
      var G = n.getDerivedStateFromProps;
      (H =
        typeof G == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (y = t.pendingProps !== y),
        H ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((y || R !== f) && Yf(t, u, l, f)),
        (yn = !1);
      var M = t.memoizedState;
      (u.state = M),
        ha(t, l, u, a),
        da(),
        (R = t.memoizedState),
        y || M !== R || yn
          ? (typeof G == "function" && (Pr(t, n, G, l), (R = t.memoizedState)),
            (E = yn || qf(t, n, E, l, M, R, f))
              ? (H ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = l),
                (t.memoizedState = R)),
            (u.props = l),
            (u.state = R),
            (u.context = f),
            (l = E))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (l = !1));
    } else {
      (u = t.stateNode),
        Nr(e, t),
        (f = t.memoizedProps),
        (H = Wn(n, f)),
        (u.props = H),
        (G = t.pendingProps),
        (M = u.context),
        (R = n.contextType),
        (E = ml),
        typeof R == "object" && R !== null && (E = Fe(R)),
        (y = n.getDerivedStateFromProps),
        (R =
          typeof y == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((f !== G || M !== E) && Yf(t, u, l, E)),
        (yn = !1),
        (M = t.memoizedState),
        (u.state = M),
        ha(t, l, u, a),
        da();
      var j = t.memoizedState;
      f !== G ||
      M !== j ||
      yn ||
      (e !== null && e.dependencies !== null && bi(e.dependencies))
        ? (typeof y == "function" && (Pr(t, n, y, l), (j = t.memoizedState)),
          (H =
            yn ||
            qf(t, n, H, l, M, j, E) ||
            (e !== null && e.dependencies !== null && bi(e.dependencies)))
            ? (R ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(l, j, E),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(l, j, E)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = l),
              (t.memoizedState = j)),
          (u.props = l),
          (u.state = j),
          (u.context = E),
          (l = H))
        : (typeof u.componentDidUpdate != "function" ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (l = !1));
    }
    return (
      (u = l),
      Bi(e, t),
      (l = (t.flags & 128) !== 0),
      u || l
        ? ((u = t.stateNode),
          (n =
            l && typeof n.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && l
            ? ((t.child = $n(t, e.child, null, a)),
              (t.child = $n(t, null, n, a)))
            : We(e, t, n, a),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = Wt(e, t, a)),
      e
    );
  }
  function td(e, t, n, l) {
    return Qn(), (t.flags |= 256), We(e, t, n, l), t.child;
  }
  var ls = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function as(e) {
    return { baseLanes: e, cachePool: Qc() };
  }
  function is(e, t, n) {
    return (e = e !== null ? e.childLanes & ~n : 0), t && (e |= vt), e;
  }
  function nd(e, t, n) {
    var l = t.pendingProps,
      a = !1,
      u = (t.flags & 128) !== 0,
      f;
    if (
      ((f = u) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (Be.current & 2) !== 0),
      f && ((a = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (pe) {
        if (
          (a ? Sn(t) : xn(),
          (e = Me)
            ? ((e = ch(e, At)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: hn !== null ? { id: jt, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = jc(e)),
                (n.return = t),
                (t.child = n),
                ($e = t),
                (Me = null)))
            : (e = null),
          e === null)
        )
          throw gn(t);
        return Gs(e) ? (t.lanes = 32) : (t.lanes = 536870912), null;
      }
      var y = l.children;
      return (
        (l = l.fallback),
        a
          ? (xn(),
            (a = t.mode),
            (y = qi({ mode: "hidden", children: y }, a)),
            (l = Vn(l, a, n, null)),
            (y.return = t),
            (l.return = t),
            (y.sibling = l),
            (t.child = y),
            (l = t.child),
            (l.memoizedState = as(n)),
            (l.childLanes = is(e, f, n)),
            (t.memoizedState = ls),
            va(null, l))
          : (Sn(t), us(t, y))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((y = E.dehydrated), y !== null)) {
      if (u)
        t.flags & 256
          ? (Sn(t), (t.flags &= -257), (t = rs(e, t, n)))
          : t.memoizedState !== null
          ? (xn(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (xn(),
            (y = l.fallback),
            (a = t.mode),
            (l = qi({ mode: "visible", children: l.children }, a)),
            (y = Vn(y, a, n, null)),
            (y.flags |= 2),
            (l.return = t),
            (y.return = t),
            (l.sibling = y),
            (t.child = l),
            $n(t, e.child, null, n),
            (l = t.child),
            (l.memoizedState = as(n)),
            (l.childLanes = is(e, f, n)),
            (t.memoizedState = ls),
            (t = va(null, l)));
      else if ((Sn(t), Gs(y))) {
        if (((f = y.nextSibling && y.nextSibling.dataset), f)) var R = f.dgst;
        (f = R),
          (l = Error(o(419))),
          (l.stack = ""),
          (l.digest = f),
          ua({ value: l, source: null, stack: null }),
          (t = rs(e, t, n));
      } else if (
        (Ve || vl(e, t, n, !1), (f = (n & e.childLanes) !== 0), Ve || f)
      ) {
        if (
          ((f = ze),
          f !== null && ((l = Go(f, n)), l !== 0 && l !== E.retryLane))
        )
          throw ((E.retryLane = l), Gn(e, l), ot(f, e, l), ts);
        Ys(y) || Ji(), (t = rs(e, t, n));
      } else
        Ys(y)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (Me = Tt(y.nextSibling)),
            ($e = t),
            (pe = !0),
            (mn = null),
            (At = !1),
            e !== null && Hc(t, e),
            (t = us(t, l.children)),
            (t.flags |= 4096));
      return t;
    }
    return a
      ? (xn(),
        (y = l.fallback),
        (a = t.mode),
        (E = e.child),
        (R = E.sibling),
        (l = Zt(E, { mode: "hidden", children: l.children })),
        (l.subtreeFlags = E.subtreeFlags & 65011712),
        R !== null ? (y = Zt(R, y)) : ((y = Vn(y, a, n, null)), (y.flags |= 2)),
        (y.return = t),
        (l.return = t),
        (l.sibling = y),
        (t.child = l),
        va(null, l),
        (l = t.child),
        (y = e.child.memoizedState),
        y === null
          ? (y = as(n))
          : ((a = y.cachePool),
            a !== null
              ? ((E = Ye._currentValue),
                (a = a.parent !== E ? { parent: E, pool: E } : a))
              : (a = Qc()),
            (y = { baseLanes: y.baseLanes | n, cachePool: a })),
        (l.memoizedState = y),
        (l.childLanes = is(e, f, n)),
        (t.memoizedState = ls),
        va(e.child, l))
      : (Sn(t),
        (n = e.child),
        (e = n.sibling),
        (n = Zt(n, { mode: "visible", children: l.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function us(e, t) {
    return (
      (t = qi({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function qi(e, t) {
    return (e = mt(22, e, null, t)), (e.lanes = 0), e;
  }
  function rs(e, t, n) {
    return (
      $n(t, e.child, null, n),
      (e = us(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function ld(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Er(e.return, t, n);
  }
  function ss(e, t, n, l, a, u) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: n,
          tailMode: a,
          treeForkCount: u,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = l),
        (f.tail = n),
        (f.tailMode = a),
        (f.treeForkCount = u));
  }
  function ad(e, t, n) {
    var l = t.pendingProps,
      a = l.revealOrder,
      u = l.tail;
    l = l.children;
    var f = Be.current,
      y = (f & 2) !== 0;
    if (
      (y ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      K(Be, f),
      We(e, t, l, n),
      (l = pe ? ia : 0),
      !y && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ld(e, n, t);
        else if (e.tag === 19) ld(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; )
          (e = n.alternate),
            e !== null && Oi(e) === null && (a = n),
            (n = n.sibling);
        (n = a),
          n === null
            ? ((a = t.child), (t.child = null))
            : ((a = n.sibling), (n.sibling = null)),
          ss(t, !1, a, n, u, l);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (((e = a.alternate), e !== null && Oi(e) === null)) {
            t.child = a;
            break;
          }
          (e = a.sibling), (a.sibling = n), (n = a), (a = e);
        }
        ss(t, !0, n, null, u, l);
        break;
      case "together":
        ss(t, !1, null, null, void 0, l);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Wt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Cn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((vl(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Zt(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = Zt(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function os(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && bi(e)));
  }
  function Up(e, t, n) {
    switch (t.tag) {
      case 3:
        tt(t, t.stateNode.containerInfo),
          pn(t, Ye, e.memoizedState.cache),
          Qn();
        break;
      case 27:
      case 5:
        Xl(t);
        break;
      case 4:
        tt(t, t.stateNode.containerInfo);
        break;
      case 10:
        pn(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return (t.flags |= 128), jr(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null
            ? (Sn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
            ? nd(e, t, n)
            : (Sn(t), (e = Wt(e, t, n)), e !== null ? e.sibling : null);
        Sn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (
          ((l = (n & t.childLanes) !== 0),
          l || (vl(e, t, n, !1), (l = (n & t.childLanes) !== 0)),
          a)
        ) {
          if (l) return ad(e, t, n);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null &&
            ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          K(Be, Be.current),
          l)
        )
          break;
        return null;
      case 22:
        return (t.lanes = 0), Ff(e, t, n, t.pendingProps);
      case 24:
        pn(t, Ye, e.memoizedState.cache);
    }
    return Wt(e, t, n);
  }
  function id(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ve = !0;
      else {
        if (!os(e, n) && (t.flags & 128) === 0) return (Ve = !1), Up(e, t, n);
        Ve = (e.flags & 131072) !== 0;
      }
    else (Ve = !1), pe && (t.flags & 1048576) !== 0 && Uc(t, ia, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (((e = kn(t.elementType)), (t.type = e), typeof e == "function"))
            mr(e)
              ? ((l = Wn(e, l)), (t.tag = 1), (t = ed(null, t, e, l, n)))
              : ((t.tag = 0), (t = ns(null, t, e, l, n)));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === P) {
                (t.tag = 11), (t = kf(null, t, e, l, n));
                break e;
              } else if (a === I) {
                (t.tag = 14), (t = Jf(null, t, e, l, n));
                break e;
              }
            }
            throw ((t = ce(e) || e), Error(o(306, t, "")));
          }
        }
        return t;
      case 0:
        return ns(e, t, t.type, t.pendingProps, n);
      case 1:
        return (l = t.type), (a = Wn(l, t.pendingProps)), ed(e, t, l, a, n);
      case 3:
        e: {
          if ((tt(t, t.stateNode.containerInfo), e === null))
            throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          (a = u.element), Nr(e, t), ha(t, l, null, n);
          var f = t.memoizedState;
          if (
            ((l = f.cache),
            pn(t, Ye, l),
            l !== u.cache && _r(t, [Ye], n, !0),
            da(),
            (l = f.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: l, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = td(e, t, l, n);
              break e;
            } else if (l !== a) {
              (a = _t(Error(o(424)), t)), ua(a), (t = td(e, t, l, n));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Me = Tt(e.firstChild),
                  $e = t,
                  pe = !0,
                  mn = null,
                  At = !0,
                  n = $c(t, null, l, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            }
          else {
            if ((Qn(), l === a)) {
              t = Wt(e, t, n);
              break e;
            }
            We(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Bi(e, t),
          e === null
            ? (n = ph(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : pe ||
                ((n = t.type),
                (e = t.pendingProps),
                (l = tu(fe.current).createElement(n)),
                (l[Je] = t),
                (l[lt] = e),
                Pe(l, n, e),
                Ke(l),
                (t.stateNode = l))
            : (t.memoizedState = ph(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Xl(t),
          e === null &&
            pe &&
            ((l = t.stateNode = hh(t.type, t.pendingProps, fe.current)),
            ($e = t),
            (At = !0),
            (a = Me),
            Nn(t.type) ? ((Vs = a), (Me = Tt(l.firstChild))) : (Me = a)),
          We(e, t, t.pendingProps.children, n),
          Bi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            pe &&
            ((a = l = Me) &&
              ((l = d0(l, t.type, t.pendingProps, At)),
              l !== null
                ? ((t.stateNode = l),
                  ($e = t),
                  (Me = Tt(l.firstChild)),
                  (At = !1),
                  (a = !0))
                : (a = !1)),
            a || gn(t)),
          Xl(t),
          (a = t.type),
          (u = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (l = u.children),
          Hs(a, u) ? (l = null) : f !== null && Hs(a, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((a = Ur(e, t, Op, null, null, n)), (La._currentValue = a)),
          Bi(e, t),
          We(e, t, l, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            pe &&
            ((e = n = Me) &&
              ((n = h0(n, t.pendingProps, At)),
              n !== null
                ? ((t.stateNode = n), ($e = t), (Me = null), (e = !0))
                : (e = !1)),
            e || gn(t)),
          null
        );
      case 13:
        return nd(e, t, n);
      case 4:
        return (
          tt(t, t.stateNode.containerInfo),
          (l = t.pendingProps),
          e === null ? (t.child = $n(t, null, l, n)) : We(e, t, l, n),
          t.child
        );
      case 11:
        return kf(e, t, t.type, t.pendingProps, n);
      case 7:
        return We(e, t, t.pendingProps, n), t.child;
      case 8:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return (
          (l = t.pendingProps),
          pn(t, t.type, l.value),
          We(e, t, l.children, n),
          t.child
        );
      case 9:
        return (
          (a = t.type._context),
          (l = t.pendingProps.children),
          Zn(t),
          (a = Fe(a)),
          (l = l(a)),
          (t.flags |= 1),
          We(e, t, l, n),
          t.child
        );
      case 14:
        return Jf(e, t, t.type, t.pendingProps, n);
      case 15:
        return $f(e, t, t.type, t.pendingProps, n);
      case 19:
        return ad(e, t, n);
      case 31:
        return Dp(e, t, n);
      case 22:
        return Ff(e, t, n, t.pendingProps);
      case 24:
        return (
          Zn(t),
          (l = Fe(Ye)),
          e === null
            ? ((a = Ar()),
              a === null &&
                ((a = ze),
                (u = Cr()),
                (a.pooledCache = u),
                u.refCount++,
                u !== null && (a.pooledCacheLanes |= n),
                (a = u)),
              (t.memoizedState = { parent: l, cache: a }),
              Tr(t),
              pn(t, Ye, a))
            : ((e.lanes & n) !== 0 && (Nr(e, t), ha(t, null, null, n), da()),
              (a = e.memoizedState),
              (u = t.memoizedState),
              a.parent !== l
                ? ((a = { parent: l, cache: l }),
                  (t.memoizedState = a),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = a),
                  pn(t, Ye, l))
                : ((l = u.cache),
                  pn(t, Ye, l),
                  l !== a.cache && _r(t, [Ye], n, !0))),
          We(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Pt(e) {
    e.flags |= 4;
  }
  function cs(e, t, n, l, a) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (a & 335544128) === a))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Md()) e.flags |= 8192;
        else throw ((Jn = _i), Or);
    } else e.flags &= -16777217;
  }
  function ud(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !xh(t)))
      if (Md()) e.flags |= 8192;
      else throw ((Jn = _i), Or);
  }
  function Yi(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Bo() : 536870912), (e.lanes |= t), (Rl |= t));
  }
  function ba(e, t) {
    if (!pe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), (n = n.sibling);
          l === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (l.sibling = null);
      }
  }
  function Le(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        (n |= a.lanes | a.childLanes),
          (l |= a.subtreeFlags & 65011712),
          (l |= a.flags & 65011712),
          (a.return = e),
          (a = a.sibling);
    else
      for (a = e.child; a !== null; )
        (n |= a.lanes | a.childLanes),
          (l |= a.subtreeFlags),
          (l |= a.flags),
          (a.return = e),
          (a = a.sibling);
    return (e.subtreeFlags |= l), (e.childLanes = n), t;
  }
  function Hp(e, t, n) {
    var l = t.pendingProps;
    switch ((vr(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Le(t), null;
      case 1:
        return Le(t), null;
      case 3:
        return (
          (n = t.stateNode),
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Jt(Ye),
          He(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (yl(t)
              ? Pt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Sr())),
          Le(t),
          null
        );
      case 26:
        var a = t.type,
          u = t.memoizedState;
        return (
          e === null
            ? (Pt(t),
              u !== null ? (Le(t), ud(t, u)) : (Le(t), cs(t, a, null, l, n)))
            : u
            ? u !== e.memoizedState
              ? (Pt(t), Le(t), ud(t, u))
              : (Le(t), (t.flags &= -16777217))
            : ((e = e.memoizedProps),
              e !== l && Pt(t),
              Le(t),
              cs(t, a, e, l, n)),
          null
        );
      case 27:
        if (
          (Wa(t),
          (n = fe.current),
          (a = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== l && Pt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return Le(t), null;
          }
          (e = k.current),
            yl(t) ? Bc(t) : ((e = hh(a, l, n)), (t.stateNode = e), Pt(t));
        }
        return Le(t), null;
      case 5:
        if ((Wa(t), (a = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== l && Pt(t);
        else {
          if (!l) {
            if (t.stateNode === null) throw Error(o(166));
            return Le(t), null;
          }
          if (((u = k.current), yl(t))) Bc(t);
          else {
            var f = tu(fe.current);
            switch (u) {
              case 1:
                u = f.createElementNS("http://www.w3.org/2000/svg", a);
                break;
              case 2:
                u = f.createElementNS("http://www.w3.org/1998/Math/MathML", a);
                break;
              default:
                switch (a) {
                  case "svg":
                    u = f.createElementNS("http://www.w3.org/2000/svg", a);
                    break;
                  case "math":
                    u = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    (u = f.createElement("div")),
                      (u.innerHTML = "<script></script>"),
                      (u = u.removeChild(u.firstChild));
                    break;
                  case "select":
                    (u =
                      typeof l.is == "string"
                        ? f.createElement("select", { is: l.is })
                        : f.createElement("select")),
                      l.multiple
                        ? (u.multiple = !0)
                        : l.size && (u.size = l.size);
                    break;
                  default:
                    u =
                      typeof l.is == "string"
                        ? f.createElement(a, { is: l.is })
                        : f.createElement(a);
                }
            }
            (u[Je] = t), (u[lt] = l);
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) u.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                (f.child.return = f), (f = f.child);
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break e;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
            t.stateNode = u;
            e: switch ((Pe(u, a, l), a)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Pt(t);
          }
        }
        return (
          Le(t),
          cs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== l && Pt(t);
        else {
          if (typeof l != "string" && t.stateNode === null) throw Error(o(166));
          if (((e = fe.current), yl(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (l = null),
              (a = $e),
              a !== null)
            )
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            (e[Je] = t),
              (e = !!(
                e.nodeValue === n ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                nh(e.nodeValue, n)
              )),
              e || gn(t, !0);
          } else (e = tu(e).createTextNode(l)), (e[Je] = t), (t.stateNode = e);
        }
        return Le(t), null;
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((l = yl(t)), n !== null)) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(o(557));
              e[Je] = t;
            } else
              Qn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Le(t), (e = !1);
          } else
            (n = Sr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (e = !0);
          if (!e) return t.flags & 256 ? (pt(t), t) : (pt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return Le(t), null;
      case 13:
        if (
          ((l = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((a = yl(t)), l !== null && l.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (
                ((a = t.memoizedState),
                (a = a !== null ? a.dehydrated : null),
                !a)
              )
                throw Error(o(317));
              a[Je] = t;
            } else
              Qn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Le(t), (a = !1);
          } else
            (a = Sr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = a),
              (a = !0);
          if (!a) return t.flags & 256 ? (pt(t), t) : (pt(t), null);
        }
        return (
          pt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = l !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((l = t.child),
                (a = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (a = l.alternate.memoizedState.cachePool.pool),
                (u = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (u = l.memoizedState.cachePool.pool),
                u !== a && (l.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              Yi(t, t.updateQueue),
              Le(t),
              null)
        );
      case 4:
        return He(), e === null && Ms(t.stateNode.containerInfo), Le(t), null;
      case 10:
        return Jt(t.type), Le(t), null;
      case 19:
        if ((B(Be), (l = t.memoizedState), l === null)) return Le(t), null;
        if (((a = (t.flags & 128) !== 0), (u = l.rendering), u === null))
          if (a) ba(l, !1);
          else {
            if (Ue !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Oi(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      ba(l, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Yi(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    Lc(n, e), (n = n.sibling);
                  return (
                    K(Be, (Be.current & 1) | 2),
                    pe && Kt(t, l.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            l.tail !== null &&
              ct() > Zi &&
              ((t.flags |= 128), (a = !0), ba(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = Oi(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Yi(t, e),
                ba(l, !0),
                l.tail === null &&
                  l.tailMode === "hidden" &&
                  !u.alternate &&
                  !pe)
              )
                return Le(t), null;
            } else
              2 * ct() - l.renderingStartTime > Zi &&
                n !== 536870912 &&
                ((t.flags |= 128), (a = !0), ba(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = l.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (l.last = u));
        }
        return l.tail !== null
          ? ((e = l.tail),
            (l.rendering = e),
            (l.tail = e.sibling),
            (l.renderingStartTime = ct()),
            (e.sibling = null),
            (n = Be.current),
            K(Be, a ? (n & 1) | 2 : n & 1),
            pe && Kt(t, l.treeForkCount),
            e)
          : (Le(t), null);
      case 22:
      case 23:
        return (
          pt(t),
          Lr(),
          (l = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== l && (t.flags |= 8192)
            : l && (t.flags |= 8192),
          l
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Le(t),
          (n = t.updateQueue),
          n !== null && Yi(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (l = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          l !== n && (t.flags |= 2048),
          e !== null && B(Kn),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Jt(Ye),
          Le(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Bp(e, t) {
    switch ((vr(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Jt(Ye),
          He(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Wa(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if ((pt(t), t.alternate === null)) throw Error(o(340));
          Qn();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (pt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          Qn();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return B(Be), null;
      case 4:
        return He(), null;
      case 10:
        return Jt(t.type), null;
      case 22:
      case 23:
        return (
          pt(t),
          Lr(),
          e !== null && B(Kn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return Jt(Ye), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function rd(e, t) {
    switch ((vr(t), t.tag)) {
      case 3:
        Jt(Ye), He();
        break;
      case 26:
      case 27:
      case 5:
        Wa(t);
        break;
      case 4:
        He();
        break;
      case 31:
        t.memoizedState !== null && pt(t);
        break;
      case 13:
        pt(t);
        break;
      case 19:
        B(Be);
        break;
      case 10:
        Jt(t.type);
        break;
      case 22:
      case 23:
        pt(t), Lr(), e !== null && B(Kn);
        break;
      case 24:
        Jt(Ye);
    }
  }
  function Sa(e, t) {
    try {
      var n = t.updateQueue,
        l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var u = n.create,
              f = n.inst;
            (l = u()), (f.destroy = l);
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (y) {
      Oe(t, t.return, y);
    }
  }
  function En(e, t, n) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst,
              y = f.destroy;
            if (y !== void 0) {
              (f.destroy = void 0), (a = t);
              var E = n,
                R = y;
              try {
                R();
              } catch (H) {
                Oe(a, E, H);
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (H) {
      Oe(t, t.return, H);
    }
  }
  function sd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Wc(t, n);
      } catch (l) {
        Oe(e, e.return, l);
      }
    }
  }
  function od(e, t, n) {
    (n.props = Wn(e.type, e.memoizedProps)), (n.state = e.memoizedState);
    try {
      n.componentWillUnmount();
    } catch (l) {
      Oe(e, t, l);
    }
  }
  function xa(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(l)) : (n.current = l);
      }
    } catch (a) {
      Oe(e, t, a);
    }
  }
  function Ut(e, t) {
    var n = e.ref,
      l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          Oe(e, t, a);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          Oe(e, t, a);
        }
      else n.current = null;
  }
  function cd(e) {
    var t = e.type,
      n = e.memoizedProps,
      l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? (l.src = n.src) : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      Oe(e, e.return, a);
    }
  }
  function fs(e, t, n) {
    try {
      var l = e.stateNode;
      u0(l, e.type, n, t), (l[lt] = t);
    } catch (a) {
      Oe(e, e.return, a);
    }
  }
  function fd(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Nn(e.type)) ||
      e.tag === 4
    );
  }
  function ds(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || fd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Nn(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function hs(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Qt));
    else if (
      l !== 4 &&
      (l === 27 && Nn(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (hs(e, t, n), e = e.sibling; e !== null; )
        hs(e, t, n), (e = e.sibling);
  }
  function Gi(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (
      l !== 4 &&
      (l === 27 && Nn(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (Gi(e, t, n), e = e.sibling; e !== null; )
        Gi(e, t, n), (e = e.sibling);
  }
  function dd(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      Pe(t, l, n), (t[Je] = e), (t[lt] = n);
    } catch (u) {
      Oe(e, e.return, u);
    }
  }
  var It = !1,
    Qe = !1,
    ms = !1,
    hd = typeof WeakSet == "function" ? WeakSet : Set,
    ke = null;
  function qp(e, t) {
    if (((e = e.containerInfo), (Ds = su), (e = Cc(e)), rr(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var a = l.anchorOffset,
              u = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break e;
            }
            var f = 0,
              y = -1,
              E = -1,
              R = 0,
              H = 0,
              G = e,
              M = null;
            t: for (;;) {
              for (
                var j;
                G !== n || (a !== 0 && G.nodeType !== 3) || (y = f + a),
                  G !== u || (l !== 0 && G.nodeType !== 3) || (E = f + l),
                  G.nodeType === 3 && (f += G.nodeValue.length),
                  (j = G.firstChild) !== null;

              )
                (M = G), (G = j);
              for (;;) {
                if (G === e) break t;
                if (
                  (M === n && ++R === a && (y = f),
                  M === u && ++H === l && (E = f),
                  (j = G.nextSibling) !== null)
                )
                  break;
                (G = M), (M = G.parentNode);
              }
              G = j;
            }
            n = y === -1 || E === -1 ? null : { start: y, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Us = { focusedElem: e, selectionRange: n }, su = !1, ke = t;
      ke !== null;

    )
      if (
        ((t = ke), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        (e.return = t), (ke = e);
      else
        for (; ke !== null; ) {
          switch (((t = ke), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (n = 0; n < e.length; n++)
                  (a = e[n]), (a.ref.impl = a.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                (e = void 0),
                  (n = t),
                  (a = u.memoizedProps),
                  (u = u.memoizedState),
                  (l = n.stateNode);
                try {
                  var J = Wn(n.type, a);
                  (e = l.getSnapshotBeforeUpdate(J, u)),
                    (l.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ne) {
                  Oe(n, n.return, ne);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  qs(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      qs(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (ke = e);
            break;
          }
          ke = t.return;
        }
  }
  function md(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        tn(e, n), l & 4 && Sa(5, n);
        break;
      case 1:
        if ((tn(e, n), l & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Oe(n, n.return, f);
            }
          else {
            var a = Wn(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Oe(n, n.return, f);
            }
          }
        l & 64 && sd(n), l & 512 && xa(n, n.return);
        break;
      case 3:
        if ((tn(e, n), l & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Wc(e, t);
          } catch (f) {
            Oe(n, n.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && dd(n);
      case 26:
      case 5:
        tn(e, n), t === null && l & 4 && cd(n), l & 512 && xa(n, n.return);
        break;
      case 12:
        tn(e, n);
        break;
      case 31:
        tn(e, n), l & 4 && yd(e, n);
        break;
      case 13:
        tn(e, n),
          l & 4 && vd(e, n),
          l & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = Jp.bind(null, n)), m0(e, n))));
        break;
      case 22:
        if (((l = n.memoizedState !== null || It), !l)) {
          (t = (t !== null && t.memoizedState !== null) || Qe), (a = It);
          var u = Qe;
          (It = l),
            (Qe = t) && !u ? nn(e, n, (n.subtreeFlags & 8772) !== 0) : tn(e, n),
            (It = a),
            (Qe = u);
        }
        break;
      case 30:
        break;
      default:
        tn(e, n);
    }
  }
  function gd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), gd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Xu(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var je = null,
    it = !1;
  function en(e, t, n) {
    for (n = n.child; n !== null; ) pd(e, t, n), (n = n.sibling);
  }
  function pd(e, t, n) {
    if (ft && typeof ft.onCommitFiberUnmount == "function")
      try {
        ft.onCommitFiberUnmount(Zl, n);
      } catch {}
    switch (n.tag) {
      case 26:
        Qe || Ut(n, t),
          en(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
        break;
      case 27:
        Qe || Ut(n, t);
        var l = je,
          a = it;
        Nn(n.type) && ((je = n.stateNode), (it = !1)),
          en(e, t, n),
          Ra(n.stateNode),
          (je = l),
          (it = a);
        break;
      case 5:
        Qe || Ut(n, t);
      case 6:
        if (
          ((l = je),
          (a = it),
          (je = null),
          en(e, t, n),
          (je = l),
          (it = a),
          je !== null)
        )
          if (it)
            try {
              (je.nodeType === 9
                ? je.body
                : je.nodeName === "HTML"
                ? je.ownerDocument.body
                : je
              ).removeChild(n.stateNode);
            } catch (u) {
              Oe(n, t, u);
            }
          else
            try {
              je.removeChild(n.stateNode);
            } catch (u) {
              Oe(n, t, u);
            }
        break;
      case 18:
        je !== null &&
          (it
            ? ((e = je),
              sh(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                n.stateNode
              ),
              Bl(e))
            : sh(je, n.stateNode));
        break;
      case 4:
        (l = je),
          (a = it),
          (je = n.stateNode.containerInfo),
          (it = !0),
          en(e, t, n),
          (je = l),
          (it = a);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        En(2, n, t), Qe || En(4, n, t), en(e, t, n);
        break;
      case 1:
        Qe ||
          (Ut(n, t),
          (l = n.stateNode),
          typeof l.componentWillUnmount == "function" && od(n, t, l)),
          en(e, t, n);
        break;
      case 21:
        en(e, t, n);
        break;
      case 22:
        (Qe = (l = Qe) || n.memoizedState !== null), en(e, t, n), (Qe = l);
        break;
      default:
        en(e, t, n);
    }
  }
  function yd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Bl(e);
      } catch (n) {
        Oe(t, t.return, n);
      }
    }
  }
  function vd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Bl(e);
      } catch (n) {
        Oe(t, t.return, n);
      }
  }
  function Yp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new hd()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new hd()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Vi(e, t) {
    var n = Yp(e);
    t.forEach(function (l) {
      if (!n.has(l)) {
        n.add(l);
        var a = $p.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function ut(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l],
          u = e,
          f = t,
          y = f;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (Nn(y.type)) {
                (je = y.stateNode), (it = !1);
                break e;
              }
              break;
            case 5:
              (je = y.stateNode), (it = !1);
              break e;
            case 3:
            case 4:
              (je = y.stateNode.containerInfo), (it = !0);
              break e;
          }
          y = y.return;
        }
        if (je === null) throw Error(o(160));
        pd(u, f, a),
          (je = null),
          (it = !1),
          (u = a.alternate),
          u !== null && (u.return = null),
          (a.return = null);
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) bd(t, e), (t = t.sibling);
  }
  var zt = null;
  function bd(e, t) {
    var n = e.alternate,
      l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ut(t, e),
          rt(e),
          l & 4 && (En(3, e, e.return), Sa(3, e), En(5, e, e.return));
        break;
      case 1:
        ut(t, e),
          rt(e),
          l & 512 && (Qe || n === null || Ut(n, n.return)),
          l & 64 &&
            It &&
            ((e = e.updateQueue),
            e !== null &&
              ((l = e.callbacks),
              l !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? l : n.concat(l)))));
        break;
      case 26:
        var a = zt;
        if (
          (ut(t, e),
          rt(e),
          l & 512 && (Qe || n === null || Ut(n, n.return)),
          l & 4)
        ) {
          var u = n !== null ? n.memoizedState : null;
          if (((l = e.memoizedState), n === null))
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  (l = e.type),
                    (n = e.memoizedProps),
                    (a = a.ownerDocument || a);
                  t: switch (l) {
                    case "title":
                      (u = a.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Jl] ||
                          u[Je] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = a.createElement(l)),
                          a.head.insertBefore(
                            u,
                            a.querySelector("head > title")
                          )),
                        Pe(u, l, n),
                        (u[Je] = e),
                        Ke(u),
                        (l = u);
                      break e;
                    case "link":
                      var f = bh("link", "href", a).get(l + (n.href || ""));
                      if (f) {
                        for (var y = 0; y < f.length; y++)
                          if (
                            ((u = f[y]),
                            u.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              u.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              u.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              u.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            f.splice(y, 1);
                            break t;
                          }
                      }
                      (u = a.createElement(l)),
                        Pe(u, l, n),
                        a.head.appendChild(u);
                      break;
                    case "meta":
                      if (
                        (f = bh("meta", "content", a).get(
                          l + (n.content || "")
                        ))
                      ) {
                        for (y = 0; y < f.length; y++)
                          if (
                            ((u = f[y]),
                            u.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              u.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              u.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              u.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            f.splice(y, 1);
                            break t;
                          }
                      }
                      (u = a.createElement(l)),
                        Pe(u, l, n),
                        a.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  (u[Je] = e), Ke(u), (l = u);
                }
                e.stateNode = l;
              } else Sh(a, e.type, e.stateNode);
            else e.stateNode = vh(a, l, e.memoizedProps);
          else
            u !== l
              ? (u === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : u.count--,
                l === null
                  ? Sh(a, e.type, e.stateNode)
                  : vh(a, l, e.memoizedProps))
              : l === null &&
                e.stateNode !== null &&
                fs(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        ut(t, e),
          rt(e),
          l & 512 && (Qe || n === null || Ut(n, n.return)),
          n !== null && l & 4 && fs(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (
          (ut(t, e),
          rt(e),
          l & 512 && (Qe || n === null || Ut(n, n.return)),
          e.flags & 32)
        ) {
          a = e.stateNode;
          try {
            rl(a, "");
          } catch (J) {
            Oe(e, e.return, J);
          }
        }
        l & 4 &&
          e.stateNode != null &&
          ((a = e.memoizedProps), fs(e, a, n !== null ? n.memoizedProps : a)),
          l & 1024 && (ms = !0);
        break;
      case 6:
        if ((ut(t, e), rt(e), l & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          (l = e.memoizedProps), (n = e.stateNode);
          try {
            n.nodeValue = l;
          } catch (J) {
            Oe(e, e.return, J);
          }
        }
        break;
      case 3:
        if (
          ((au = null),
          (a = zt),
          (zt = nu(t.containerInfo)),
          ut(t, e),
          (zt = a),
          rt(e),
          l & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Bl(t.containerInfo);
          } catch (J) {
            Oe(e, e.return, J);
          }
        ms && ((ms = !1), Sd(e));
        break;
      case 4:
        (l = zt),
          (zt = nu(e.stateNode.containerInfo)),
          ut(t, e),
          rt(e),
          (zt = l);
        break;
      case 12:
        ut(t, e), rt(e);
        break;
      case 31:
        ut(t, e),
          rt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Vi(e, l)));
        break;
      case 13:
        ut(t, e),
          rt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Xi = ct()),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Vi(e, l)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null,
          R = It,
          H = Qe;
        if (
          ((It = R || a),
          (Qe = H || E),
          ut(t, e),
          (Qe = H),
          (It = R),
          rt(e),
          l & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = a ? t._visibility & -2 : t._visibility | 1,
              a && (n === null || E || It || Qe || Pn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                E = n = t;
                try {
                  if (((u = E.stateNode), a))
                    (f = u.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none");
                  else {
                    y = E.stateNode;
                    var G = E.memoizedProps.style,
                      M =
                        G != null && G.hasOwnProperty("display")
                          ? G.display
                          : null;
                    y.style.display =
                      M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (J) {
                  Oe(E, E.return, J);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = a ? "" : E.memoizedProps;
                } catch (J) {
                  Oe(E, E.return, J);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                E = t;
                try {
                  var j = E.stateNode;
                  a ? oh(j, !0) : oh(E.stateNode, !1);
                } catch (J) {
                  Oe(E, E.return, J);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), (t = t.return);
            }
            n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        l & 4 &&
          ((l = e.updateQueue),
          l !== null &&
            ((n = l.retryQueue),
            n !== null && ((l.retryQueue = null), Vi(e, n))));
        break;
      case 19:
        ut(t, e),
          rt(e),
          l & 4 &&
            ((l = e.updateQueue),
            l !== null && ((e.updateQueue = null), Vi(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ut(t, e), rt(e);
    }
  }
  function rt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (fd(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode,
              u = ds(e);
            Gi(e, u, a);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (rl(f, ""), (n.flags &= -33));
            var y = ds(e);
            Gi(e, y, f);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo,
              R = ds(e);
            hs(e, R, E);
            break;
          default:
            throw Error(o(161));
        }
      } catch (H) {
        Oe(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Sd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Sd(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function tn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) md(e, t.alternate, t), (t = t.sibling);
  }
  function Pn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          En(4, t, t.return), Pn(t);
          break;
        case 1:
          Ut(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && od(t, t.return, n),
            Pn(t);
          break;
        case 27:
          Ra(t.stateNode);
        case 26:
        case 5:
          Ut(t, t.return), Pn(t);
          break;
        case 22:
          t.memoizedState === null && Pn(t);
          break;
        case 30:
          Pn(t);
          break;
        default:
          Pn(t);
      }
      e = e.sibling;
    }
  }
  function nn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate,
        a = e,
        u = t,
        f = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          nn(a, u, n), Sa(4, u);
          break;
        case 1:
          if (
            (nn(a, u, n),
            (l = u),
            (a = l.stateNode),
            typeof a.componentDidMount == "function")
          )
            try {
              a.componentDidMount();
            } catch (R) {
              Oe(l, l.return, R);
            }
          if (((l = u), (a = l.updateQueue), a !== null)) {
            var y = l.stateNode;
            try {
              var E = a.shared.hiddenCallbacks;
              if (E !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < E.length; a++)
                  Fc(E[a], y);
            } catch (R) {
              Oe(l, l.return, R);
            }
          }
          n && f & 64 && sd(u), xa(u, u.return);
          break;
        case 27:
          dd(u);
        case 26:
        case 5:
          nn(a, u, n), n && l === null && f & 4 && cd(u), xa(u, u.return);
          break;
        case 12:
          nn(a, u, n);
          break;
        case 31:
          nn(a, u, n), n && f & 4 && yd(a, u);
          break;
        case 13:
          nn(a, u, n), n && f & 4 && vd(a, u);
          break;
        case 22:
          u.memoizedState === null && nn(a, u, n), xa(u, u.return);
          break;
        case 30:
          break;
        default:
          nn(a, u, n);
      }
      t = t.sibling;
    }
  }
  function gs(e, t) {
    var n = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && ra(n));
  }
  function ps(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ra(e));
  }
  function Mt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) xd(e, t, n, l), (t = t.sibling);
  }
  function xd(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Mt(e, t, n, l), a & 2048 && Sa(9, t);
        break;
      case 1:
        Mt(e, t, n, l);
        break;
      case 3:
        Mt(e, t, n, l),
          a & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ra(e)));
        break;
      case 12:
        if (a & 2048) {
          Mt(e, t, n, l), (e = t.stateNode);
          try {
            var u = t.memoizedProps,
              f = u.id,
              y = u.onPostCommit;
            typeof y == "function" &&
              y(
                f,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (E) {
            Oe(t, t.return, E);
          }
        } else Mt(e, t, n, l);
        break;
      case 31:
        Mt(e, t, n, l);
        break;
      case 13:
        Mt(e, t, n, l);
        break;
      case 23:
        break;
      case 22:
        (u = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? Mt(e, t, n, l)
              : Ea(e, t)
            : u._visibility & 2
            ? Mt(e, t, n, l)
            : ((u._visibility |= 2),
              Ol(e, t, n, l, (t.subtreeFlags & 10256) !== 0 || !1)),
          a & 2048 && gs(f, t);
        break;
      case 24:
        Mt(e, t, n, l), a & 2048 && ps(t.alternate, t);
        break;
      default:
        Mt(e, t, n, l);
    }
  }
  function Ol(e, t, n, l, a) {
    for (
      a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var u = e,
        f = t,
        y = n,
        E = l,
        R = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ol(u, f, y, E, a), Sa(8, f);
          break;
        case 23:
          break;
        case 22:
          var H = f.stateNode;
          f.memoizedState !== null
            ? H._visibility & 2
              ? Ol(u, f, y, E, a)
              : Ea(u, f)
            : ((H._visibility |= 2), Ol(u, f, y, E, a)),
            a && R & 2048 && gs(f.alternate, f);
          break;
        case 24:
          Ol(u, f, y, E, a), a && R & 2048 && ps(f.alternate, f);
          break;
        default:
          Ol(u, f, y, E, a);
      }
      t = t.sibling;
    }
  }
  function Ea(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          l = t,
          a = l.flags;
        switch (l.tag) {
          case 22:
            Ea(n, l), a & 2048 && gs(l.alternate, l);
            break;
          case 24:
            Ea(n, l), a & 2048 && ps(l.alternate, l);
            break;
          default:
            Ea(n, l);
        }
        t = t.sibling;
      }
  }
  var _a = 8192;
  function Tl(e, t, n) {
    if (e.subtreeFlags & _a)
      for (e = e.child; e !== null; ) Ed(e, t, n), (e = e.sibling);
  }
  function Ed(e, t, n) {
    switch (e.tag) {
      case 26:
        Tl(e, t, n),
          e.flags & _a &&
            e.memoizedState !== null &&
            A0(n, zt, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Tl(e, t, n);
        break;
      case 3:
      case 4:
        var l = zt;
        (zt = nu(e.stateNode.containerInfo)), Tl(e, t, n), (zt = l);
        break;
      case 22:
        e.memoizedState === null &&
          ((l = e.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = _a), (_a = 16777216), Tl(e, t, n), (_a = l))
            : Tl(e, t, n));
        break;
      default:
        Tl(e, t, n);
    }
  }
  function _d(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Ca(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          (ke = l), wd(l, e);
        }
      _d(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Cd(e), (e = e.sibling);
  }
  function Cd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ca(e), e.flags & 2048 && En(9, e, e.return);
        break;
      case 3:
        Ca(e);
        break;
      case 12:
        Ca(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Qi(e))
          : Ca(e);
        break;
      default:
        Ca(e);
    }
  }
  function Qi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          (ke = l), wd(l, e);
        }
      _d(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          En(8, t, t.return), Qi(t);
          break;
        case 22:
          (n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Qi(t));
          break;
        default:
          Qi(t);
      }
      e = e.sibling;
    }
  }
  function wd(e, t) {
    for (; ke !== null; ) {
      var n = ke;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          En(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ra(n.memoizedState.cache);
      }
      if (((l = n.child), l !== null)) (l.return = n), (ke = l);
      else
        e: for (n = e; ke !== null; ) {
          l = ke;
          var a = l.sibling,
            u = l.return;
          if ((gd(l), l === n)) {
            ke = null;
            break e;
          }
          if (a !== null) {
            (a.return = u), (ke = a);
            break e;
          }
          ke = u;
        }
    }
  }
  var Gp = {
      getCacheForType: function (e) {
        var t = Fe(Ye),
          n = t.data.get(e);
        return n === void 0 && ((n = e()), t.data.set(e, n)), n;
      },
      cacheSignal: function () {
        return Fe(Ye).controller.signal;
      },
    },
    Vp = typeof WeakMap == "function" ? WeakMap : Map,
    xe = 0,
    ze = null,
    de = null,
    me = 0,
    Ae = 0,
    yt = null,
    _n = !1,
    Nl = !1,
    ys = !1,
    ln = 0,
    Ue = 0,
    Cn = 0,
    In = 0,
    vs = 0,
    vt = 0,
    Rl = 0,
    wa = null,
    st = null,
    bs = !1,
    Xi = 0,
    Ad = 0,
    Zi = 1 / 0,
    Ki = null,
    wn = null,
    Xe = 0,
    An = null,
    zl = null,
    an = 0,
    Ss = 0,
    xs = null,
    Od = null,
    Aa = 0,
    Es = null;
  function bt() {
    return (xe & 2) !== 0 && me !== 0 ? me & -me : D.T !== null ? Ts() : Vo();
  }
  function Td() {
    if (vt === 0)
      if ((me & 536870912) === 0 || pe) {
        var e = ei;
        (ei <<= 1), (ei & 3932160) === 0 && (ei = 262144), (vt = e);
      } else vt = 536870912;
    return (e = gt.current), e !== null && (e.flags |= 32), vt;
  }
  function ot(e, t, n) {
    ((e === ze && (Ae === 2 || Ae === 9)) || e.cancelPendingCommit !== null) &&
      (Ml(e, 0), On(e, me, vt, !1)),
      kl(e, n),
      ((xe & 2) === 0 || e !== ze) &&
        (e === ze &&
          ((xe & 2) === 0 && (In |= n), Ue === 4 && On(e, me, vt, !1)),
        Ht(e));
  }
  function Nd(e, t, n) {
    if ((xe & 6) !== 0) throw Error(o(327));
    var l = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Kl(e, t),
      a = l ? Zp(e, t) : Cs(e, t, !0),
      u = l;
    do {
      if (a === 0) {
        Nl && !l && On(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), u && !Qp(n))) {
          (a = Cs(e, t, !1)), (u = !1);
          continue;
        }
        if (a === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var f = 0;
          else
            (f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            t = f;
            e: {
              var y = e;
              a = wa;
              var E = y.current.memoizedState.isDehydrated;
              if ((E && (Ml(y, f).flags |= 256), (f = Cs(y, f, !1)), f !== 2)) {
                if (ys && !E) {
                  (y.errorRecoveryDisabledLanes |= u), (In |= u), (a = 4);
                  break e;
                }
                (u = st),
                  (st = a),
                  u !== null && (st === null ? (st = u) : st.push.apply(st, u));
              }
              a = f;
            }
            if (((u = !1), a !== 2)) continue;
          }
        }
        if (a === 1) {
          Ml(e, 0), On(e, t, 0, !0);
          break;
        }
        e: {
          switch (((l = e), (u = a), u)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              On(l, t, vt, !_n);
              break e;
            case 2:
              st = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((a = Xi + 300 - ct()), 10 < a)) {
            if ((On(l, t, vt, !_n), ni(l, 0, !0) !== 0)) break e;
            (an = t),
              (l.timeoutHandle = uh(
                Rd.bind(
                  null,
                  l,
                  n,
                  st,
                  Ki,
                  bs,
                  t,
                  vt,
                  In,
                  Rl,
                  _n,
                  u,
                  "Throttled",
                  -0,
                  0
                ),
                a
              ));
            break e;
          }
          Rd(l, n, st, Ki, bs, t, vt, In, Rl, _n, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ht(e);
  }
  function Rd(e, t, n, l, a, u, f, y, E, R, H, G, M, j) {
    if (
      ((e.timeoutHandle = -1),
      (G = t.subtreeFlags),
      G & 8192 || (G & 16785408) === 16785408)
    ) {
      (G = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qt,
      }),
        Ed(t, u, G);
      var J =
        (u & 62914560) === u ? Xi - ct() : (u & 4194048) === u ? Ad - ct() : 0;
      if (((J = O0(G, J)), J !== null)) {
        (an = u),
          (e.cancelPendingCommit = J(
            Bd.bind(null, e, t, u, n, l, a, f, y, E, H, G, null, M, j)
          )),
          On(e, u, f, !R);
        return;
      }
    }
    Bd(e, t, u, n, l, a, f, y, E);
  }
  function Qp(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var l = 0; l < n.length; l++) {
          var a = n[l],
            u = a.getSnapshot;
          a = a.value;
          try {
            if (!ht(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function On(e, t, n, l) {
    (t &= ~vs),
      (t &= ~In),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      l && (e.warmLanes |= t),
      (l = e.expirationTimes);
    for (var a = t; 0 < a; ) {
      var u = 31 - dt(a),
        f = 1 << u;
      (l[u] = -1), (a &= ~f);
    }
    n !== 0 && qo(e, n, t);
  }
  function ki() {
    return (xe & 6) === 0 ? (Oa(0), !1) : !0;
  }
  function _s() {
    if (de !== null) {
      if (Ae === 0) var e = de.return;
      else (e = de), (kt = Xn = null), qr(e), (El = null), (oa = 0), (e = de);
      for (; e !== null; ) rd(e.alternate, e), (e = e.return);
      de = null;
    }
  }
  function Ml(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && ((e.timeoutHandle = -1), o0(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (an = 0),
      _s(),
      (ze = e),
      (de = n = Zt(e.current, null)),
      (me = t),
      (Ae = 0),
      (yt = null),
      (_n = !1),
      (Nl = Kl(e, t)),
      (ys = !1),
      (Rl = vt = vs = In = Cn = Ue = 0),
      (st = wa = null),
      (bs = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - dt(l),
          u = 1 << a;
        (t |= e[a]), (l &= ~u);
      }
    return (ln = t), mi(), n;
  }
  function zd(e, t) {
    (se = null),
      (D.H = ya),
      t === xl || t === Ei
        ? ((t = Kc()), (Ae = 3))
        : t === Or
        ? ((t = Kc()), (Ae = 4))
        : (Ae =
            t === ts
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (yt = t),
      de === null && ((Ue = 1), Ui(e, _t(t, e.current)));
  }
  function Md() {
    var e = gt.current;
    return e === null
      ? !0
      : (me & 4194048) === me
      ? Ot === null
      : (me & 62914560) === me || (me & 536870912) !== 0
      ? e === Ot
      : !1;
  }
  function Ld() {
    var e = D.H;
    return (D.H = ya), e === null ? ya : e;
  }
  function jd() {
    var e = D.A;
    return (D.A = Gp), e;
  }
  function Ji() {
    (Ue = 4),
      _n || ((me & 4194048) !== me && gt.current !== null) || (Nl = !0),
      ((Cn & 134217727) === 0 && (In & 134217727) === 0) ||
        ze === null ||
        On(ze, me, vt, !1);
  }
  function Cs(e, t, n) {
    var l = xe;
    xe |= 2;
    var a = Ld(),
      u = jd();
    (ze !== e || me !== t) && ((Ki = null), Ml(e, t)), (t = !1);
    var f = Ue;
    e: do
      try {
        if (Ae !== 0 && de !== null) {
          var y = de,
            E = yt;
          switch (Ae) {
            case 8:
              _s(), (f = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0);
              var R = Ae;
              if (((Ae = 0), (yt = null), Ll(e, y, E, R), n && Nl)) {
                f = 0;
                break e;
              }
              break;
            default:
              (R = Ae), (Ae = 0), (yt = null), Ll(e, y, E, R);
          }
        }
        Xp(), (f = Ue);
        break;
      } catch (H) {
        zd(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (kt = Xn = null),
      (xe = l),
      (D.H = a),
      (D.A = u),
      de === null && ((ze = null), (me = 0), mi()),
      f
    );
  }
  function Xp() {
    for (; de !== null; ) Dd(de);
  }
  function Zp(e, t) {
    var n = xe;
    xe |= 2;
    var l = Ld(),
      a = jd();
    ze !== e || me !== t
      ? ((Ki = null), (Zi = ct() + 500), Ml(e, t))
      : (Nl = Kl(e, t));
    e: do
      try {
        if (Ae !== 0 && de !== null) {
          t = de;
          var u = yt;
          t: switch (Ae) {
            case 1:
              (Ae = 0), (yt = null), Ll(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Xc(u)) {
                (Ae = 0), (yt = null), Ud(t);
                break;
              }
              (t = function () {
                (Ae !== 2 && Ae !== 9) || ze !== e || (Ae = 7), Ht(e);
              }),
                u.then(t, t);
              break e;
            case 3:
              Ae = 7;
              break e;
            case 4:
              Ae = 5;
              break e;
            case 7:
              Xc(u)
                ? ((Ae = 0), (yt = null), Ud(t))
                : ((Ae = 0), (yt = null), Ll(e, t, u, 7));
              break;
            case 5:
              var f = null;
              switch (de.tag) {
                case 26:
                  f = de.memoizedState;
                case 5:
                case 27:
                  var y = de;
                  if (f ? xh(f) : y.stateNode.complete) {
                    (Ae = 0), (yt = null);
                    var E = y.sibling;
                    if (E !== null) de = E;
                    else {
                      var R = y.return;
                      R !== null ? ((de = R), $i(R)) : (de = null);
                    }
                    break t;
                  }
              }
              (Ae = 0), (yt = null), Ll(e, t, u, 5);
              break;
            case 6:
              (Ae = 0), (yt = null), Ll(e, t, u, 6);
              break;
            case 8:
              _s(), (Ue = 6);
              break e;
            default:
              throw Error(o(462));
          }
        }
        Kp();
        break;
      } catch (H) {
        zd(e, H);
      }
    while (!0);
    return (
      (kt = Xn = null),
      (D.H = l),
      (D.A = a),
      (xe = n),
      de !== null ? 0 : ((ze = null), (me = 0), mi(), Ue)
    );
  }
  function Kp() {
    for (; de !== null && !gg(); ) Dd(de);
  }
  function Dd(e) {
    var t = id(e.alternate, e, ln);
    (e.memoizedProps = e.pendingProps), t === null ? $i(e) : (de = t);
  }
  function Ud(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = If(n, t, t.pendingProps, t.type, void 0, me);
        break;
      case 11:
        t = If(n, t, t.pendingProps, t.type.render, t.ref, me);
        break;
      case 5:
        qr(t);
      default:
        rd(n, t), (t = de = Lc(t, ln)), (t = id(n, t, ln));
    }
    (e.memoizedProps = e.pendingProps), t === null ? $i(e) : (de = t);
  }
  function Ll(e, t, n, l) {
    (kt = Xn = null), qr(t), (El = null), (oa = 0);
    var a = t.return;
    try {
      if (jp(e, a, t, n, me)) {
        (Ue = 1), Ui(e, _t(n, e.current)), (de = null);
        return;
      }
    } catch (u) {
      if (a !== null) throw ((de = a), u);
      (Ue = 1), Ui(e, _t(n, e.current)), (de = null);
      return;
    }
    t.flags & 32768
      ? (pe || l === 1
          ? (e = !0)
          : Nl || (me & 536870912) !== 0
          ? (e = !1)
          : ((_n = e = !0),
            (l === 2 || l === 9 || l === 3 || l === 6) &&
              ((l = gt.current),
              l !== null && l.tag === 13 && (l.flags |= 16384))),
        Hd(t, e))
      : $i(t);
  }
  function $i(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Hd(t, _n);
        return;
      }
      e = t.return;
      var n = Hp(t.alternate, t, ln);
      if (n !== null) {
        de = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        de = t;
        return;
      }
      de = t = e;
    } while (t !== null);
    Ue === 0 && (Ue = 5);
  }
  function Hd(e, t) {
    do {
      var n = Bp(e.alternate, e);
      if (n !== null) {
        (n.flags &= 32767), (de = n);
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        de = e;
        return;
      }
      de = e = n;
    } while (e !== null);
    (Ue = 6), (de = null);
  }
  function Bd(e, t, n, l, a, u, f, y, E) {
    e.cancelPendingCommit = null;
    do Fi();
    while (Xe !== 0);
    if ((xe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= dr),
        wg(e, n, u, f, y, E),
        e === ze && ((de = ze = null), (me = 0)),
        (zl = t),
        (An = e),
        (an = n),
        (Ss = u),
        (xs = a),
        (Od = l),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Fp(Pa, function () {
              return Qd(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (l = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || l)
      ) {
        (l = D.T), (D.T = null), (a = X.p), (X.p = 2), (f = xe), (xe |= 4);
        try {
          qp(e, t, n);
        } finally {
          (xe = f), (X.p = a), (D.T = l);
        }
      }
      (Xe = 1), qd(), Yd(), Gd();
    }
  }
  function qd() {
    if (Xe === 1) {
      Xe = 0;
      var e = An,
        t = zl,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        (n = D.T), (D.T = null);
        var l = X.p;
        X.p = 2;
        var a = xe;
        xe |= 4;
        try {
          bd(t, e);
          var u = Us,
            f = Cc(e.containerInfo),
            y = u.focusedElem,
            E = u.selectionRange;
          if (
            f !== y &&
            y &&
            y.ownerDocument &&
            _c(y.ownerDocument.documentElement, y)
          ) {
            if (E !== null && rr(y)) {
              var R = E.start,
                H = E.end;
              if ((H === void 0 && (H = R), "selectionStart" in y))
                (y.selectionStart = R),
                  (y.selectionEnd = Math.min(H, y.value.length));
              else {
                var G = y.ownerDocument || document,
                  M = (G && G.defaultView) || window;
                if (M.getSelection) {
                  var j = M.getSelection(),
                    J = y.textContent.length,
                    ne = Math.min(E.start, J),
                    Re = E.end === void 0 ? ne : Math.min(E.end, J);
                  !j.extend && ne > Re && ((f = Re), (Re = ne), (ne = f));
                  var T = Ec(y, ne),
                    A = Ec(y, Re);
                  if (
                    T &&
                    A &&
                    (j.rangeCount !== 1 ||
                      j.anchorNode !== T.node ||
                      j.anchorOffset !== T.offset ||
                      j.focusNode !== A.node ||
                      j.focusOffset !== A.offset)
                  ) {
                    var N = G.createRange();
                    N.setStart(T.node, T.offset),
                      j.removeAllRanges(),
                      ne > Re
                        ? (j.addRange(N), j.extend(A.node, A.offset))
                        : (N.setEnd(A.node, A.offset), j.addRange(N));
                  }
                }
              }
            }
            for (G = [], j = y; (j = j.parentNode); )
              j.nodeType === 1 &&
                G.push({ element: j, left: j.scrollLeft, top: j.scrollTop });
            for (
              typeof y.focus == "function" && y.focus(), y = 0;
              y < G.length;
              y++
            ) {
              var q = G[y];
              (q.element.scrollLeft = q.left), (q.element.scrollTop = q.top);
            }
          }
          (su = !!Ds), (Us = Ds = null);
        } finally {
          (xe = a), (X.p = l), (D.T = n);
        }
      }
      (e.current = t), (Xe = 2);
    }
  }
  function Yd() {
    if (Xe === 2) {
      Xe = 0;
      var e = An,
        t = zl,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        (n = D.T), (D.T = null);
        var l = X.p;
        X.p = 2;
        var a = xe;
        xe |= 4;
        try {
          md(e, t.alternate, t);
        } finally {
          (xe = a), (X.p = l), (D.T = n);
        }
      }
      Xe = 3;
    }
  }
  function Gd() {
    if (Xe === 4 || Xe === 3) {
      (Xe = 0), pg();
      var e = An,
        t = zl,
        n = an,
        l = Od;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Xe = 5)
        : ((Xe = 0), (zl = An = null), Vd(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (
        (a === 0 && (wn = null),
        Vu(n),
        (t = t.stateNode),
        ft && typeof ft.onCommitFiberRoot == "function")
      )
        try {
          ft.onCommitFiberRoot(Zl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (l !== null) {
        (t = D.T), (a = X.p), (X.p = 2), (D.T = null);
        try {
          for (var u = e.onRecoverableError, f = 0; f < l.length; f++) {
            var y = l[f];
            u(y.value, { componentStack: y.stack });
          }
        } finally {
          (D.T = t), (X.p = a);
        }
      }
      (an & 3) !== 0 && Fi(),
        Ht(e),
        (a = e.pendingLanes),
        (n & 261930) !== 0 && (a & 42) !== 0
          ? e === Es
            ? Aa++
            : ((Aa = 0), (Es = e))
          : (Aa = 0),
        Oa(0);
    }
  }
  function Vd(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ra(t)));
  }
  function Fi() {
    return qd(), Yd(), Gd(), Qd();
  }
  function Qd() {
    if (Xe !== 5) return !1;
    var e = An,
      t = Ss;
    Ss = 0;
    var n = Vu(an),
      l = D.T,
      a = X.p;
    try {
      (X.p = 32 > n ? 32 : n), (D.T = null), (n = xs), (xs = null);
      var u = An,
        f = an;
      if (((Xe = 0), (zl = An = null), (an = 0), (xe & 6) !== 0))
        throw Error(o(331));
      var y = xe;
      if (
        ((xe |= 4),
        Cd(u.current),
        xd(u, u.current, f, n),
        (xe = y),
        Oa(0, !1),
        ft && typeof ft.onPostCommitFiberRoot == "function")
      )
        try {
          ft.onPostCommitFiberRoot(Zl, u);
        } catch {}
      return !0;
    } finally {
      (X.p = a), (D.T = l), Vd(e, t);
    }
  }
  function Xd(e, t, n) {
    (t = _t(n, t)),
      (t = es(e.stateNode, t, 2)),
      (e = bn(e, t, 2)),
      e !== null && (kl(e, 2), Ht(e));
  }
  function Oe(e, t, n) {
    if (e.tag === 3) Xd(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Xd(t, e, n);
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof l.componentDidCatch == "function" &&
              (wn === null || !wn.has(l)))
          ) {
            (e = _t(n, e)),
              (n = Zf(2)),
              (l = bn(t, n, 2)),
              l !== null && (Kf(n, l, t, e), kl(l, 2), Ht(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function ws(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Vp();
      var a = new Set();
      l.set(t, a);
    } else (a = l.get(t)), a === void 0 && ((a = new Set()), l.set(t, a));
    a.has(n) ||
      ((ys = !0), a.add(n), (e = kp.bind(null, e, t, n)), t.then(e, e));
  }
  function kp(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      ze === e &&
        (me & n) === n &&
        (Ue === 4 || (Ue === 3 && (me & 62914560) === me && 300 > ct() - Xi)
          ? (xe & 2) === 0 && Ml(e, 0)
          : (vs |= n),
        Rl === me && (Rl = 0)),
      Ht(e);
  }
  function Zd(e, t) {
    t === 0 && (t = Bo()), (e = Gn(e, t)), e !== null && (kl(e, t), Ht(e));
  }
  function Jp(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), Zd(e, n);
  }
  function $p(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode,
          a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(t), Zd(e, n);
  }
  function Fp(e, t) {
    return Bu(e, t);
  }
  var Wi = null,
    jl = null,
    As = !1,
    Pi = !1,
    Os = !1,
    Tn = 0;
  function Ht(e) {
    e !== jl &&
      e.next === null &&
      (jl === null ? (Wi = jl = e) : (jl = jl.next = e)),
      (Pi = !0),
      As || ((As = !0), Pp());
  }
  function Oa(e, t) {
    if (!Os && Pi) {
      Os = !0;
      do
        for (var n = !1, l = Wi; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var f = l.suspendedLanes,
                y = l.pingedLanes;
              (u = (1 << (31 - dt(42 | e) + 1)) - 1),
                (u &= a & ~(f & ~y)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0);
            }
            u !== 0 && ((n = !0), $d(l, u));
          } else
            (u = me),
              (u = ni(
                l,
                l === ze ? u : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Kl(l, u) || ((n = !0), $d(l, u));
          l = l.next;
        }
      while (n);
      Os = !1;
    }
  }
  function Wp() {
    Kd();
  }
  function Kd() {
    Pi = As = !1;
    var e = 0;
    Tn !== 0 && s0() && (e = Tn);
    for (var t = ct(), n = null, l = Wi; l !== null; ) {
      var a = l.next,
        u = kd(l, t);
      u === 0
        ? ((l.next = null),
          n === null ? (Wi = a) : (n.next = a),
          a === null && (jl = n))
        : ((n = l), (e !== 0 || (u & 3) !== 0) && (Pi = !0)),
        (l = a);
    }
    (Xe !== 0 && Xe !== 5) || Oa(e), Tn !== 0 && (Tn = 0);
  }
  function kd(e, t) {
    for (
      var n = e.suspendedLanes,
        l = e.pingedLanes,
        a = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;

    ) {
      var f = 31 - dt(u),
        y = 1 << f,
        E = a[f];
      E === -1
        ? ((y & n) === 0 || (y & l) !== 0) && (a[f] = Cg(y, t))
        : E <= t && (e.expiredLanes |= y),
        (u &= ~y);
    }
    if (
      ((t = ze),
      (n = me),
      (n = ni(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (l = e.callbackNode),
      n === 0 ||
        (e === t && (Ae === 2 || Ae === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && qu(l),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || Kl(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((l !== null && qu(l), Vu(n))) {
        case 2:
        case 8:
          n = Uo;
          break;
        case 32:
          n = Pa;
          break;
        case 268435456:
          n = Ho;
          break;
        default:
          n = Pa;
      }
      return (
        (l = Jd.bind(null, e)),
        (n = Bu(n, l)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      l !== null && l !== null && qu(l),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Jd(e, t) {
    if (Xe !== 0 && Xe !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var n = e.callbackNode;
    if (Fi() && e.callbackNode !== n) return null;
    var l = me;
    return (
      (l = ni(
        e,
        e === ze ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      l === 0
        ? null
        : (Nd(e, l, t),
          kd(e, ct()),
          e.callbackNode != null && e.callbackNode === n
            ? Jd.bind(null, e)
            : null)
    );
  }
  function $d(e, t) {
    if (Fi()) return null;
    Nd(e, t, !0);
  }
  function Pp() {
    c0(function () {
      (xe & 6) !== 0 ? Bu(Do, Wp) : Kd();
    });
  }
  function Ts() {
    if (Tn === 0) {
      var e = bl;
      e === 0 && ((e = Ia), (Ia <<= 1), (Ia & 261888) === 0 && (Ia = 256)),
        (Tn = e);
    }
    return Tn;
  }
  function Fd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : ui("" + e);
  }
  function Wd(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function Ip(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var u = Fd((a[lt] || null).action),
        f = l.submitter;
      f &&
        ((t = (t = f[lt] || null)
          ? Fd(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((u = t), (f = null)));
      var y = new ci("action", "action", null, l, a);
      e.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Tn !== 0) {
                  var E = f ? Wd(a, f) : new FormData(a);
                  Jr(
                    n,
                    { pending: !0, data: E, method: a.method, action: u },
                    null,
                    E
                  );
                }
              } else
                typeof u == "function" &&
                  (y.preventDefault(),
                  (E = f ? Wd(a, f) : new FormData(a)),
                  Jr(
                    n,
                    { pending: !0, data: E, method: a.method, action: u },
                    u,
                    E
                  ));
            },
            currentTarget: a,
          },
        ],
      });
    }
  }
  for (var Ns = 0; Ns < fr.length; Ns++) {
    var Rs = fr[Ns],
      e0 = Rs.toLowerCase(),
      t0 = Rs[0].toUpperCase() + Rs.slice(1);
    Rt(e0, "on" + t0);
  }
  Rt(Oc, "onAnimationEnd"),
    Rt(Tc, "onAnimationIteration"),
    Rt(Nc, "onAnimationStart"),
    Rt("dblclick", "onDoubleClick"),
    Rt("focusin", "onFocus"),
    Rt("focusout", "onBlur"),
    Rt(yp, "onTransitionRun"),
    Rt(vp, "onTransitionStart"),
    Rt(bp, "onTransitionCancel"),
    Rt(Rc, "onTransitionEnd"),
    il("onMouseEnter", ["mouseout", "mouseover"]),
    il("onMouseLeave", ["mouseout", "mouseover"]),
    il("onPointerEnter", ["pointerout", "pointerover"]),
    il("onPointerLeave", ["pointerout", "pointerover"]),
    Hn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Hn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Hn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Hn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Hn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Hn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Ta =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    n0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ta)
    );
  function Pd(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n],
        a = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var y = l[f],
              E = y.instance,
              R = y.currentTarget;
            if (((y = y.listener), E !== u && a.isPropagationStopped()))
              break e;
            (u = y), (a.currentTarget = R);
            try {
              u(a);
            } catch (H) {
              hi(H);
            }
            (a.currentTarget = null), (u = E);
          }
        else
          for (f = 0; f < l.length; f++) {
            if (
              ((y = l[f]),
              (E = y.instance),
              (R = y.currentTarget),
              (y = y.listener),
              E !== u && a.isPropagationStopped())
            )
              break e;
            (u = y), (a.currentTarget = R);
            try {
              u(a);
            } catch (H) {
              hi(H);
            }
            (a.currentTarget = null), (u = E);
          }
      }
    }
  }
  function he(e, t) {
    var n = t[Qu];
    n === void 0 && (n = t[Qu] = new Set());
    var l = e + "__bubble";
    n.has(l) || (Id(t, e, 2, !1), n.add(l));
  }
  function zs(e, t, n) {
    var l = 0;
    t && (l |= 4), Id(n, e, l, t);
  }
  var Ii = "_reactListening" + Math.random().toString(36).slice(2);
  function Ms(e) {
    if (!e[Ii]) {
      (e[Ii] = !0),
        Zo.forEach(function (n) {
          n !== "selectionchange" && (n0.has(n) || zs(n, !1, e), zs(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ii] || ((t[Ii] = !0), zs("selectionchange", !1, t));
    }
  }
  function Id(e, t, n, l) {
    switch (Th(t)) {
      case 2:
        var a = R0;
        break;
      case 8:
        a = z0;
        break;
      default:
        a = ks;
    }
    (n = a.bind(null, t, n, e)),
      (a = void 0),
      !Pu ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (a = !0),
      l
        ? a !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: a })
          : e.addEventListener(t, n, !0)
        : a !== void 0
        ? e.addEventListener(t, n, { passive: a })
        : e.addEventListener(t, n, !1);
  }
  function Ls(e, t, n, l, a) {
    var u = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (;;) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var y = l.stateNode.containerInfo;
          if (y === a) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var E = f.tag;
              if ((E === 3 || E === 4) && f.stateNode.containerInfo === a)
                return;
              f = f.return;
            }
          for (; y !== null; ) {
            if (((f = nl(y)), f === null)) return;
            if (((E = f.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              l = u = f;
              continue e;
            }
            y = y.parentNode;
          }
        }
        l = l.return;
      }
    lc(function () {
      var R = u,
        H = Fu(n),
        G = [];
      e: {
        var M = zc.get(e);
        if (M !== void 0) {
          var j = ci,
            J = e;
          switch (e) {
            case "keypress":
              if (si(n) === 0) break e;
            case "keydown":
            case "keyup":
              j = $g;
              break;
            case "focusin":
              (J = "focus"), (j = nr);
              break;
            case "focusout":
              (J = "blur"), (j = nr);
              break;
            case "beforeblur":
            case "afterblur":
              j = nr;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = uc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = Hg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = Pg;
              break;
            case Oc:
            case Tc:
            case Nc:
              j = Yg;
              break;
            case Rc:
              j = ep;
              break;
            case "scroll":
            case "scrollend":
              j = Dg;
              break;
            case "wheel":
              j = np;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = Vg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = sc;
              break;
            case "toggle":
            case "beforetoggle":
              j = ap;
          }
          var ne = (t & 4) !== 0,
            Re = !ne && (e === "scroll" || e === "scrollend"),
            T = ne ? (M !== null ? M + "Capture" : null) : M;
          ne = [];
          for (var A = R, N; A !== null; ) {
            var q = A;
            if (
              ((N = q.stateNode),
              (q = q.tag),
              (q !== 5 && q !== 26 && q !== 27) ||
                N === null ||
                T === null ||
                ((q = Fl(A, T)), q != null && ne.push(Na(A, q, N))),
              Re)
            )
              break;
            A = A.return;
          }
          0 < ne.length &&
            ((M = new j(M, J, null, n, H)),
            G.push({ event: M, listeners: ne }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === "mouseover" || e === "pointerover"),
            (j = e === "mouseout" || e === "pointerout"),
            M &&
              n !== $u &&
              (J = n.relatedTarget || n.fromElement) &&
              (nl(J) || J[tl]))
          )
            break e;
          if (
            (j || M) &&
            ((M =
              H.window === H
                ? H
                : (M = H.ownerDocument)
                ? M.defaultView || M.parentWindow
                : window),
            j
              ? ((J = n.relatedTarget || n.toElement),
                (j = R),
                (J = J ? nl(J) : null),
                J !== null &&
                  ((Re = d(J)),
                  (ne = J.tag),
                  J !== Re || (ne !== 5 && ne !== 27 && ne !== 6)) &&
                  (J = null))
              : ((j = null), (J = R)),
            j !== J)
          ) {
            if (
              ((ne = uc),
              (q = "onMouseLeave"),
              (T = "onMouseEnter"),
              (A = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ne = sc),
                (q = "onPointerLeave"),
                (T = "onPointerEnter"),
                (A = "pointer")),
              (Re = j == null ? M : $l(j)),
              (N = J == null ? M : $l(J)),
              (M = new ne(q, A + "leave", j, n, H)),
              (M.target = Re),
              (M.relatedTarget = N),
              (q = null),
              nl(H) === R &&
                ((ne = new ne(T, A + "enter", J, n, H)),
                (ne.target = N),
                (ne.relatedTarget = Re),
                (q = ne)),
              (Re = q),
              j && J)
            )
              t: {
                for (ne = l0, T = j, A = J, N = 0, q = T; q; q = ne(q)) N++;
                q = 0;
                for (var ee = A; ee; ee = ne(ee)) q++;
                for (; 0 < N - q; ) (T = ne(T)), N--;
                for (; 0 < q - N; ) (A = ne(A)), q--;
                for (; N--; ) {
                  if (T === A || (A !== null && T === A.alternate)) {
                    ne = T;
                    break t;
                  }
                  (T = ne(T)), (A = ne(A));
                }
                ne = null;
              }
            else ne = null;
            j !== null && eh(G, M, j, ne, !1),
              J !== null && Re !== null && eh(G, Re, J, ne, !0);
          }
        }
        e: {
          if (
            ((M = R ? $l(R) : window),
            (j = M.nodeName && M.nodeName.toLowerCase()),
            j === "select" || (j === "input" && M.type === "file"))
          )
            var be = pc;
          else if (mc(M))
            if (yc) be = mp;
            else {
              be = dp;
              var F = fp;
            }
          else
            (j = M.nodeName),
              !j ||
              j.toLowerCase() !== "input" ||
              (M.type !== "checkbox" && M.type !== "radio")
                ? R && Ju(R.elementType) && (be = pc)
                : (be = hp);
          if (be && (be = be(e, R))) {
            gc(G, be, n, H);
            break e;
          }
          F && F(e, M, R),
            e === "focusout" &&
              R &&
              M.type === "number" &&
              R.memoizedProps.value != null &&
              ku(M, "number", M.value);
        }
        switch (((F = R ? $l(R) : window), e)) {
          case "focusin":
            (mc(F) || F.contentEditable === "true") &&
              ((fl = F), (sr = R), (aa = null));
            break;
          case "focusout":
            aa = sr = fl = null;
            break;
          case "mousedown":
            or = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (or = !1), wc(G, n, H);
            break;
          case "selectionchange":
            if (pp) break;
          case "keydown":
          case "keyup":
            wc(G, n, H);
        }
        var oe;
        if (ar)
          e: {
            switch (e) {
              case "compositionstart":
                var ge = "onCompositionStart";
                break e;
              case "compositionend":
                ge = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ge = "onCompositionUpdate";
                break e;
            }
            ge = void 0;
          }
        else
          cl
            ? dc(e, n) && (ge = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (ge = "onCompositionStart");
        ge &&
          (oc &&
            n.locale !== "ko" &&
            (cl || ge !== "onCompositionStart"
              ? ge === "onCompositionEnd" && cl && (oe = ac())
              : ((dn = H),
                (Iu = "value" in dn ? dn.value : dn.textContent),
                (cl = !0))),
          (F = eu(R, ge)),
          0 < F.length &&
            ((ge = new rc(ge, e, null, n, H)),
            G.push({ event: ge, listeners: F }),
            oe
              ? (ge.data = oe)
              : ((oe = hc(n)), oe !== null && (ge.data = oe)))),
          (oe = up ? rp(e, n) : sp(e, n)) &&
            ((ge = eu(R, "onBeforeInput")),
            0 < ge.length &&
              ((F = new rc("onBeforeInput", "beforeinput", null, n, H)),
              G.push({ event: F, listeners: ge }),
              (F.data = oe))),
          Ip(G, e, R, n, H);
      }
      Pd(G, t);
    });
  }
  function Na(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function eu(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e,
        u = a.stateNode;
      if (
        ((a = a.tag),
        (a !== 5 && a !== 26 && a !== 27) ||
          u === null ||
          ((a = Fl(e, n)),
          a != null && l.unshift(Na(e, a, u)),
          (a = Fl(e, t)),
          a != null && l.push(Na(e, a, u))),
        e.tag === 3)
      )
        return l;
      e = e.return;
    }
    return [];
  }
  function l0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function eh(e, t, n, l, a) {
    for (var u = t._reactName, f = []; n !== null && n !== l; ) {
      var y = n,
        E = y.alternate,
        R = y.stateNode;
      if (((y = y.tag), E !== null && E === l)) break;
      (y !== 5 && y !== 26 && y !== 27) ||
        R === null ||
        ((E = R),
        a
          ? ((R = Fl(n, u)), R != null && f.unshift(Na(n, R, E)))
          : a || ((R = Fl(n, u)), R != null && f.push(Na(n, R, E)))),
        (n = n.return);
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var a0 = /\r\n?/g,
    i0 = /\u0000|\uFFFD/g;
  function th(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        a0,
        `
`
      )
      .replace(i0, "");
  }
  function nh(e, t) {
    return (t = th(t)), th(e) === t;
  }
  function Ne(e, t, n, l, a, u) {
    switch (n) {
      case "children":
        typeof l == "string"
          ? t === "body" || (t === "textarea" && l === "") || rl(e, l)
          : (typeof l == "number" || typeof l == "bigint") &&
            t !== "body" &&
            rl(e, "" + l);
        break;
      case "className":
        ai(e, "class", l);
        break;
      case "tabIndex":
        ai(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ai(e, n, l);
        break;
      case "style":
        tc(e, l, u);
        break;
      case "data":
        if (t !== "object") {
          ai(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "symbol" ||
          typeof l == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        (l = ui("" + l)), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" &&
            (n === "formAction"
              ? (t !== "input" && Ne(e, t, "name", a.name, a, null),
                Ne(e, t, "formEncType", a.formEncType, a, null),
                Ne(e, t, "formMethod", a.formMethod, a, null),
                Ne(e, t, "formTarget", a.formTarget, a, null))
              : (Ne(e, t, "encType", a.encType, a, null),
                Ne(e, t, "method", a.method, a, null),
                Ne(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        (l = ui("" + l)), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Qt);
        break;
      case "onScroll":
        l != null && he("scroll", e);
        break;
      case "onScrollEnd":
        l != null && he("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
          if (((n = l.__html), n != null)) {
            if (a.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          l == null ||
          typeof l == "function" ||
          typeof l == "boolean" ||
          typeof l == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (n = ui("" + l)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "" + l)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0
          ? e.setAttribute(n, "")
          : l !== !1 &&
            l != null &&
            typeof l != "function" &&
            typeof l != "symbol"
          ? e.setAttribute(n, l)
          : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null &&
        typeof l != "function" &&
        typeof l != "symbol" &&
        !isNaN(l) &&
        1 <= l
          ? e.setAttribute(n, l)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
          ? e.removeAttribute(n)
          : e.setAttribute(n, l);
        break;
      case "popover":
        he("beforetoggle", e), he("toggle", e), li(e, "popover", l);
        break;
      case "xlinkActuate":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
        break;
      case "xlinkArcrole":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
        break;
      case "xlinkRole":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
        break;
      case "xlinkShow":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
        break;
      case "xlinkTitle":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
        break;
      case "xlinkType":
        Vt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
        break;
      case "xmlBase":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
        break;
      case "xmlLang":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
        break;
      case "xmlSpace":
        Vt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
        break;
      case "is":
        li(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Lg.get(n) || n), li(e, n, l));
    }
  }
  function js(e, t, n, l, a, u) {
    switch (n) {
      case "style":
        tc(e, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l)) throw Error(o(61));
          if (((n = l.__html), n != null)) {
            if (a.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string"
          ? rl(e, l)
          : (typeof l == "number" || typeof l == "bigint") && rl(e, "" + l);
        break;
      case "onScroll":
        l != null && he("scroll", e);
        break;
      case "onScrollEnd":
        l != null && he("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ko.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((a = n.endsWith("Capture")),
              (t = n.slice(2, a ? n.length - 7 : void 0)),
              (u = e[lt] || null),
              (u = u != null ? u[n] : null),
              typeof u == "function" && e.removeEventListener(t, u, a),
              typeof l == "function")
            ) {
              typeof u != "function" &&
                u !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, l, a);
              break e;
            }
            n in e
              ? (e[n] = l)
              : l === !0
              ? e.setAttribute(n, "")
              : li(e, n, l);
          }
    }
  }
  function Pe(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        he("error", e), he("load", e);
        var l = !1,
          a = !1,
          u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var f = n[u];
            if (f != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Ne(e, t, u, f, n, null);
              }
          }
        a && Ne(e, t, "srcSet", n.srcSet, n, null),
          l && Ne(e, t, "src", n.src, n, null);
        return;
      case "input":
        he("invalid", e);
        var y = (u = f = a = null),
          E = null,
          R = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var H = n[l];
            if (H != null)
              switch (l) {
                case "name":
                  a = H;
                  break;
                case "type":
                  f = H;
                  break;
                case "checked":
                  E = H;
                  break;
                case "defaultChecked":
                  R = H;
                  break;
                case "value":
                  u = H;
                  break;
                case "defaultValue":
                  y = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(o(137, t));
                  break;
                default:
                  Ne(e, t, l, H, n, null);
              }
          }
        Wo(e, u, y, E, R, f, a, !1);
        return;
      case "select":
        he("invalid", e), (l = f = u = null);
        for (a in n)
          if (n.hasOwnProperty(a) && ((y = n[a]), y != null))
            switch (a) {
              case "value":
                u = y;
                break;
              case "defaultValue":
                f = y;
                break;
              case "multiple":
                l = y;
              default:
                Ne(e, t, a, y, n, null);
            }
        (t = u),
          (n = f),
          (e.multiple = !!l),
          t != null ? ul(e, !!l, t, !1) : n != null && ul(e, !!l, n, !0);
        return;
      case "textarea":
        he("invalid", e), (u = a = l = null);
        for (f in n)
          if (n.hasOwnProperty(f) && ((y = n[f]), y != null))
            switch (f) {
              case "value":
                l = y;
                break;
              case "defaultValue":
                a = y;
                break;
              case "children":
                u = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(o(91));
                break;
              default:
                Ne(e, t, f, y, n, null);
            }
        Io(e, l, a, u);
        return;
      case "option":
        for (E in n)
          if (n.hasOwnProperty(E) && ((l = n[E]), l != null))
            switch (E) {
              case "selected":
                e.selected =
                  l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ne(e, t, E, l, n, null);
            }
        return;
      case "dialog":
        he("beforetoggle", e), he("toggle", e), he("cancel", e), he("close", e);
        break;
      case "iframe":
      case "object":
        he("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ta.length; l++) he(Ta[l], e);
        break;
      case "image":
        he("error", e), he("load", e);
        break;
      case "details":
        he("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        he("error", e), he("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (R in n)
          if (n.hasOwnProperty(R) && ((l = n[R]), l != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ne(e, t, R, l, n, null);
            }
        return;
      default:
        if (Ju(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((l = n[H]), l !== void 0 && js(e, t, H, l, n, void 0));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && ((l = n[y]), l != null && Ne(e, t, y, l, n, null));
  }
  function u0(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null,
          u = null,
          f = null,
          y = null,
          E = null,
          R = null,
          H = null;
        for (j in n) {
          var G = n[j];
          if (n.hasOwnProperty(j) && G != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = G;
              default:
                l.hasOwnProperty(j) || Ne(e, t, j, null, l, G);
            }
        }
        for (var M in l) {
          var j = l[M];
          if (((G = n[M]), l.hasOwnProperty(M) && (j != null || G != null)))
            switch (M) {
              case "type":
                u = j;
                break;
              case "name":
                a = j;
                break;
              case "checked":
                R = j;
                break;
              case "defaultChecked":
                H = j;
                break;
              case "value":
                f = j;
                break;
              case "defaultValue":
                y = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(o(137, t));
                break;
              default:
                j !== G && Ne(e, t, M, j, l, G);
            }
        }
        Ku(e, f, y, E, R, H, u, a);
        return;
      case "select":
        j = f = y = M = null;
        for (u in n)
          if (((E = n[u]), n.hasOwnProperty(u) && E != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                j = E;
              default:
                l.hasOwnProperty(u) || Ne(e, t, u, null, l, E);
            }
        for (a in l)
          if (
            ((u = l[a]),
            (E = n[a]),
            l.hasOwnProperty(a) && (u != null || E != null))
          )
            switch (a) {
              case "value":
                M = u;
                break;
              case "defaultValue":
                y = u;
                break;
              case "multiple":
                f = u;
              default:
                u !== E && Ne(e, t, a, u, l, E);
            }
        (t = y),
          (n = f),
          (l = j),
          M != null
            ? ul(e, !!n, M, !1)
            : !!l != !!n &&
              (t != null ? ul(e, !!n, t, !0) : ul(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        j = M = null;
        for (y in n)
          if (
            ((a = n[y]),
            n.hasOwnProperty(y) && a != null && !l.hasOwnProperty(y))
          )
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ne(e, t, y, null, l, a);
            }
        for (f in l)
          if (
            ((a = l[f]),
            (u = n[f]),
            l.hasOwnProperty(f) && (a != null || u != null))
          )
            switch (f) {
              case "value":
                M = a;
                break;
              case "defaultValue":
                j = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(o(91));
                break;
              default:
                a !== u && Ne(e, t, f, a, l, u);
            }
        Po(e, M, j);
        return;
      case "option":
        for (var J in n)
          if (
            ((M = n[J]),
            n.hasOwnProperty(J) && M != null && !l.hasOwnProperty(J))
          )
            switch (J) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ne(e, t, J, null, l, M);
            }
        for (E in l)
          if (
            ((M = l[E]),
            (j = n[E]),
            l.hasOwnProperty(E) && M !== j && (M != null || j != null))
          )
            switch (E) {
              case "selected":
                e.selected =
                  M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                Ne(e, t, E, M, l, j);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ne in n)
          (M = n[ne]),
            n.hasOwnProperty(ne) &&
              M != null &&
              !l.hasOwnProperty(ne) &&
              Ne(e, t, ne, null, l, M);
        for (R in l)
          if (
            ((M = l[R]),
            (j = n[R]),
            l.hasOwnProperty(R) && M !== j && (M != null || j != null))
          )
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(o(137, t));
                break;
              default:
                Ne(e, t, R, M, l, j);
            }
        return;
      default:
        if (Ju(t)) {
          for (var Re in n)
            (M = n[Re]),
              n.hasOwnProperty(Re) &&
                M !== void 0 &&
                !l.hasOwnProperty(Re) &&
                js(e, t, Re, void 0, l, M);
          for (H in l)
            (M = l[H]),
              (j = n[H]),
              !l.hasOwnProperty(H) ||
                M === j ||
                (M === void 0 && j === void 0) ||
                js(e, t, H, M, l, j);
          return;
        }
    }
    for (var T in n)
      (M = n[T]),
        n.hasOwnProperty(T) &&
          M != null &&
          !l.hasOwnProperty(T) &&
          Ne(e, t, T, null, l, M);
    for (G in l)
      (M = l[G]),
        (j = n[G]),
        !l.hasOwnProperty(G) ||
          M === j ||
          (M == null && j == null) ||
          Ne(e, t, G, M, l, j);
  }
  function lh(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function r0() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0;
        l < n.length;
        l++
      ) {
        var a = n[l],
          u = a.transferSize,
          f = a.initiatorType,
          y = a.duration;
        if (u && y && lh(f)) {
          for (f = 0, y = a.responseEnd, l += 1; l < n.length; l++) {
            var E = n[l],
              R = E.startTime;
            if (R > y) break;
            var H = E.transferSize,
              G = E.initiatorType;
            H &&
              lh(G) &&
              ((E = E.responseEnd), (f += H * (E < y ? 1 : (y - R) / (E - R))));
          }
          if ((--l, (t += (8 * (u + f)) / (a.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var Ds = null,
    Us = null;
  function tu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ah(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ih(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Hs(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Bs = null;
  function s0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Bs
        ? !1
        : ((Bs = e), !0)
      : ((Bs = null), !1);
  }
  var uh = typeof setTimeout == "function" ? setTimeout : void 0,
    o0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    rh = typeof Promise == "function" ? Promise : void 0,
    c0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof rh < "u"
        ? function (e) {
            return rh.resolve(null).then(e).catch(f0);
          }
        : uh;
  function f0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Nn(e) {
    return e === "head";
  }
  function sh(e, t) {
    var n = t,
      l = 0;
    do {
      var a = n.nextSibling;
      if ((e.removeChild(n), a && a.nodeType === 8))
        if (((n = a.data), n === "/$" || n === "/&")) {
          if (l === 0) {
            e.removeChild(a), Bl(t);
            return;
          }
          l--;
        } else if (
          n === "$" ||
          n === "$?" ||
          n === "$~" ||
          n === "$!" ||
          n === "&"
        )
          l++;
        else if (n === "html") Ra(e.ownerDocument.documentElement);
        else if (n === "head") {
          (n = e.ownerDocument.head), Ra(n);
          for (var u = n.firstChild; u; ) {
            var f = u.nextSibling,
              y = u.nodeName;
            u[Jl] ||
              y === "SCRIPT" ||
              y === "STYLE" ||
              (y === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(u),
              (u = f);
          }
        } else n === "body" && Ra(e.ownerDocument.body);
      n = a;
    } while (n);
    Bl(t);
  }
  function oh(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (
        (n.nodeType === 1
          ? t
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (t
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        l && l.nodeType === 8)
      )
        if (((n = l.data), n === "/$")) {
          if (e === 0) break;
          e--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || e++;
      n = l;
    } while (n);
  }
  function qs(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qs(n), Xu(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function d0(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (l) {
        if (!e[Jl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== a.rel ||
                e.getAttribute("href") !==
                  (a.href == null || a.href === "" ? null : a.href) ||
                e.getAttribute("crossorigin") !==
                  (a.crossOrigin == null ? null : a.crossOrigin) ||
                e.getAttribute("title") !== (a.title == null ? null : a.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (a.src == null ? null : a.src) ||
                  e.getAttribute("type") !== (a.type == null ? null : a.type) ||
                  e.getAttribute("crossorigin") !==
                    (a.crossOrigin == null ? null : a.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === u) return e;
      } else return e;
      if (((e = Tt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function h0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = Tt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ch(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = Tt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Ys(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Gs(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function m0(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading") t();
    else {
      var l = function () {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), (e._reactRetry = l);
    }
  }
  function Tt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Vs = null;
  function fh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return Tt(e.nextSibling);
          t--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function dh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else (n !== "/$" && n !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function hh(e, t, n) {
    switch (((t = tu(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Ra(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Xu(e);
  }
  var Nt = new Map(),
    mh = new Set();
  function nu(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var un = X.d;
  X.d = { f: g0, r: p0, D: y0, C: v0, L: b0, m: S0, X: E0, S: x0, M: _0 };
  function g0() {
    var e = un.f(),
      t = ki();
    return e || t;
  }
  function p0(e) {
    var t = ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? zf(t) : un.r(e);
  }
  var Dl = typeof document > "u" ? null : document;
  function gh(e, t, n) {
    var l = Dl;
    if (l && typeof t == "string" && t) {
      var a = xt(t);
      (a = 'link[rel="' + e + '"][href="' + a + '"]'),
        typeof n == "string" && (a += '[crossorigin="' + n + '"]'),
        mh.has(a) ||
          (mh.add(a),
          (e = { rel: e, crossOrigin: n, href: t }),
          l.querySelector(a) === null &&
            ((t = l.createElement("link")),
            Pe(t, "link", e),
            Ke(t),
            l.head.appendChild(t)));
    }
  }
  function y0(e) {
    un.D(e), gh("dns-prefetch", e, null);
  }
  function v0(e, t) {
    un.C(e, t), gh("preconnect", e, t);
  }
  function b0(e, t, n) {
    un.L(e, t, n);
    var l = Dl;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + xt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((a += '[imagesrcset="' + xt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (a += '[imagesizes="' + xt(n.imageSizes) + '"]'))
        : (a += '[href="' + xt(e) + '"]');
      var u = a;
      switch (t) {
        case "style":
          u = Ul(e);
          break;
        case "script":
          u = Hl(e);
      }
      Nt.has(u) ||
        ((e = b(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        Nt.set(u, e),
        l.querySelector(a) !== null ||
          (t === "style" && l.querySelector(za(u))) ||
          (t === "script" && l.querySelector(Ma(u))) ||
          ((t = l.createElement("link")),
          Pe(t, "link", e),
          Ke(t),
          l.head.appendChild(t)));
    }
  }
  function S0(e, t) {
    un.m(e, t);
    var n = Dl;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script",
        a =
          'link[rel="modulepreload"][as="' + xt(l) + '"][href="' + xt(e) + '"]',
        u = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Hl(e);
      }
      if (
        !Nt.has(u) &&
        ((e = b({ rel: "modulepreload", href: e }, t)),
        Nt.set(u, e),
        n.querySelector(a) === null)
      ) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ma(u))) return;
        }
        (l = n.createElement("link")),
          Pe(l, "link", e),
          Ke(l),
          n.head.appendChild(l);
      }
    }
  }
  function x0(e, t, n) {
    un.S(e, t, n);
    var l = Dl;
    if (l && e) {
      var a = al(l).hoistableStyles,
        u = Ul(e);
      t = t || "default";
      var f = a.get(u);
      if (!f) {
        var y = { loading: 0, preload: null };
        if ((f = l.querySelector(za(u)))) y.loading = 5;
        else {
          (e = b({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = Nt.get(u)) && Qs(e, n);
          var E = (f = l.createElement("link"));
          Ke(E),
            Pe(E, "link", e),
            (E._p = new Promise(function (R, H) {
              (E.onload = R), (E.onerror = H);
            })),
            E.addEventListener("load", function () {
              y.loading |= 1;
            }),
            E.addEventListener("error", function () {
              y.loading |= 2;
            }),
            (y.loading |= 4),
            lu(f, t, l);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: y }),
          a.set(u, f);
      }
    }
  }
  function E0(e, t) {
    un.X(e, t);
    var n = Dl;
    if (n && e) {
      var l = al(n).hoistableScripts,
        a = Hl(e),
        u = l.get(a);
      u ||
        ((u = n.querySelector(Ma(a))),
        u ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Nt.get(a)) && Xs(e, t),
          (u = n.createElement("script")),
          Ke(u),
          Pe(u, "link", e),
          n.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        l.set(a, u));
    }
  }
  function _0(e, t) {
    un.M(e, t);
    var n = Dl;
    if (n && e) {
      var l = al(n).hoistableScripts,
        a = Hl(e),
        u = l.get(a);
      u ||
        ((u = n.querySelector(Ma(a))),
        u ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = Nt.get(a)) && Xs(e, t),
          (u = n.createElement("script")),
          Ke(u),
          Pe(u, "link", e),
          n.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        l.set(a, u));
    }
  }
  function ph(e, t, n, l) {
    var a = (a = fe.current) ? nu(a) : null;
    if (!a) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Ul(n.href)),
            (n = al(a).hoistableStyles),
            (l = n.get(t)),
            l ||
              ((l = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, l)),
            l)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = Ul(n.href);
          var u = al(a).hoistableStyles,
            f = u.get(e);
          if (
            (f ||
              ((a = a.ownerDocument || a),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, f),
              (u = a.querySelector(za(e))) &&
                !u._p &&
                ((f.instance = u), (f.state.loading = 5)),
              Nt.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                Nt.set(e, n),
                u || C0(a, e, n, f.state))),
            t && l === null)
          )
            throw Error(o(528, ""));
          return f;
        }
        if (t && l !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Hl(n)),
              (n = al(a).hoistableScripts),
              (l = n.get(t)),
              l ||
                ((l = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, l)),
              l)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Ul(e) {
    return 'href="' + xt(e) + '"';
  }
  function za(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function yh(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function C0(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (l.loading = 1)
      : ((t = e.createElement("link")),
        (l.preload = t),
        t.addEventListener("load", function () {
          return (l.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (l.loading |= 2);
        }),
        Pe(t, "link", n),
        Ke(t),
        e.head.appendChild(t));
  }
  function Hl(e) {
    return '[src="' + xt(e) + '"]';
  }
  function Ma(e) {
    return "script[async]" + e;
  }
  function vh(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var l = e.querySelector('style[data-href~="' + xt(n.href) + '"]');
          if (l) return (t.instance = l), Ke(l), l;
          var a = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (l = (e.ownerDocument || e).createElement("style")),
            Ke(l),
            Pe(l, "style", a),
            lu(l, n.precedence, e),
            (t.instance = l)
          );
        case "stylesheet":
          a = Ul(n.href);
          var u = e.querySelector(za(a));
          if (u) return (t.state.loading |= 4), (t.instance = u), Ke(u), u;
          (l = yh(n)),
            (a = Nt.get(a)) && Qs(l, a),
            (u = (e.ownerDocument || e).createElement("link")),
            Ke(u);
          var f = u;
          return (
            (f._p = new Promise(function (y, E) {
              (f.onload = y), (f.onerror = E);
            })),
            Pe(u, "link", l),
            (t.state.loading |= 4),
            lu(u, n.precedence, e),
            (t.instance = u)
          );
        case "script":
          return (
            (u = Hl(n.src)),
            (a = e.querySelector(Ma(u)))
              ? ((t.instance = a), Ke(a), a)
              : ((l = n),
                (a = Nt.get(u)) && ((l = b({}, n)), Xs(l, a)),
                (e = e.ownerDocument || e),
                (a = e.createElement("script")),
                Ke(a),
                Pe(a, "link", l),
                e.head.appendChild(a),
                (t.instance = a))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((l = t.instance), (t.state.loading |= 4), lu(l, n.precedence, e));
    return t.instance;
  }
  function lu(e, t, n) {
    for (
      var l = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        a = l.length ? l[l.length - 1] : null,
        u = a,
        f = 0;
      f < l.length;
      f++
    ) {
      var y = l[f];
      if (y.dataset.precedence === t) u = y;
      else if (u !== a) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Qs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Xs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var au = null;
  function bh(e, t, n) {
    if (au === null) {
      var l = new Map(),
        a = (au = new Map());
      a.set(n, l);
    } else (a = au), (l = a.get(n)), l || ((l = new Map()), a.set(n, l));
    if (l.has(e)) return l;
    for (
      l.set(e, null), n = n.getElementsByTagName(e), a = 0;
      a < n.length;
      a++
    ) {
      var u = n[a];
      if (
        !(
          u[Jl] ||
          u[Je] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = u.getAttribute(t) || "";
        f = e + f;
        var y = l.get(f);
        y ? y.push(u) : l.set(f, [u]);
      }
    }
    return l;
  }
  function Sh(e, t, n) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function w0(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function xh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function A0(e, t, n, l) {
    if (
      n.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var a = Ul(l.href),
          u = t.querySelector(za(a));
        if (u) {
          (t = u._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = iu.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = u),
            Ke(u);
          return;
        }
        (u = t.ownerDocument || t),
          (l = yh(l)),
          (a = Nt.get(a)) && Qs(l, a),
          (u = u.createElement("link")),
          Ke(u);
        var f = u;
        (f._p = new Promise(function (y, E) {
          (f.onload = y), (f.onerror = E);
        })),
          Pe(u, "link", l),
          (n.instance = u);
      }
      e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = iu.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n));
    }
  }
  var Zs = 0;
  function O0(e, t) {
    return (
      e.stylesheets && e.count === 0 && ru(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var l = setTimeout(function () {
              if ((e.stylesheets && ru(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                (e.unsuspend = null), u();
              }
            }, 6e4 + t);
            0 < e.imgBytes && Zs === 0 && (Zs = 62500 * r0());
            var a = setTimeout(function () {
              if (
                ((e.waitingForImages = !1),
                e.count === 0 &&
                  (e.stylesheets && ru(e, e.stylesheets), e.unsuspend))
              ) {
                var u = e.unsuspend;
                (e.unsuspend = null), u();
              }
            }, (e.imgBytes > Zs ? 50 : 800) + t);
            return (
              (e.unsuspend = n),
              function () {
                (e.unsuspend = null), clearTimeout(l), clearTimeout(a);
              }
            );
          }
        : null
    );
  }
  function iu() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) ru(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var uu = null;
  function ru(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (uu = new Map()),
        t.forEach(T0, e),
        (uu = null),
        iu.call(e));
  }
  function T0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = uu.get(e);
      if (n) var l = n.get(null);
      else {
        (n = new Map()), uu.set(e, n);
        for (
          var a = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < a.length;
          u++
        ) {
          var f = a[u];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (n.set(f.dataset.precedence, f), (l = f));
        }
        l && n.set(null, l);
      }
      (a = t.instance),
        (f = a.getAttribute("data-precedence")),
        (u = n.get(f) || l),
        u === l && n.set(null, a),
        n.set(f, a),
        this.count++,
        (l = iu.bind(this)),
        a.addEventListener("load", l),
        a.addEventListener("error", l),
        u
          ? u.parentNode.insertBefore(a, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(a, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var La = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function N0(e, t, n, l, a, u, f, y, E) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Yu(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Yu(0)),
      (this.hiddenUpdates = Yu(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = a),
      (this.onCaughtError = u),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map());
  }
  function Eh(e, t, n, l, a, u, f, y, E, R, H, G) {
    return (
      (e = new N0(e, t, n, f, E, R, H, G, y)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = mt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Cr()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: l, isDehydrated: n, cache: t }),
      Tr(u),
      e
    );
  }
  function _h(e) {
    return e ? ((e = ml), e) : ml;
  }
  function Ch(e, t, n, l, a, u) {
    (a = _h(a)),
      l.context === null ? (l.context = a) : (l.pendingContext = a),
      (l = vn(t)),
      (l.payload = { element: n }),
      (u = u === void 0 ? null : u),
      u !== null && (l.callback = u),
      (n = bn(e, l, t)),
      n !== null && (ot(n, e, t), fa(n, e, t));
  }
  function wh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ks(e, t) {
    wh(e, t), (e = e.alternate) && wh(e, t);
  }
  function Ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Gn(e, 67108864);
      t !== null && ot(t, e, 67108864), Ks(e, 67108864);
    }
  }
  function Oh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = bt();
      t = Gu(t);
      var n = Gn(e, t);
      n !== null && ot(n, e, t), Ks(e, t);
    }
  }
  var su = !0;
  function R0(e, t, n, l) {
    var a = D.T;
    D.T = null;
    var u = X.p;
    try {
      (X.p = 2), ks(e, t, n, l);
    } finally {
      (X.p = u), (D.T = a);
    }
  }
  function z0(e, t, n, l) {
    var a = D.T;
    D.T = null;
    var u = X.p;
    try {
      (X.p = 8), ks(e, t, n, l);
    } finally {
      (X.p = u), (D.T = a);
    }
  }
  function ks(e, t, n, l) {
    if (su) {
      var a = Js(l);
      if (a === null) Ls(e, t, l, ou, n), Nh(e, l);
      else if (L0(a, e, t, n, l)) l.stopPropagation();
      else if ((Nh(e, l), t & 4 && -1 < M0.indexOf(e))) {
        for (; a !== null; ) {
          var u = ll(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var f = Un(u.pendingLanes);
                  if (f !== 0) {
                    var y = u;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; f; ) {
                      var E = 1 << (31 - dt(f));
                      (y.entanglements[1] |= E), (f &= ~E);
                    }
                    Ht(u), (xe & 6) === 0 && ((Zi = ct() + 500), Oa(0));
                  }
                }
                break;
              case 31:
              case 13:
                (y = Gn(u, 2)), y !== null && ot(y, u, 2), ki(), Ks(u, 2);
            }
          if (((u = Js(l)), u === null && Ls(e, t, l, ou, n), u === a)) break;
          a = u;
        }
        a !== null && l.stopPropagation();
      } else Ls(e, t, l, null, n);
    }
  }
  function Js(e) {
    return (e = Fu(e)), $s(e);
  }
  var ou = null;
  function $s(e) {
    if (((ou = null), (e = nl(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (ou = e), null;
  }
  function Th(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (yg()) {
          case Do:
            return 2;
          case Uo:
            return 8;
          case Pa:
          case vg:
            return 32;
          case Ho:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Fs = !1,
    Rn = null,
    zn = null,
    Mn = null,
    ja = new Map(),
    Da = new Map(),
    Ln = [],
    M0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Nh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rn = null;
        break;
      case "dragenter":
      case "dragleave":
        zn = null;
        break;
      case "mouseover":
      case "mouseout":
        Mn = null;
        break;
      case "pointerover":
      case "pointerout":
        ja.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Da.delete(t.pointerId);
    }
  }
  function Ua(e, t, n, l, a, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: l,
          nativeEvent: u,
          targetContainers: [a],
        }),
        t !== null && ((t = ll(t)), t !== null && Ah(t)),
        e)
      : ((e.eventSystemFlags |= l),
        (t = e.targetContainers),
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e);
  }
  function L0(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return (Rn = Ua(Rn, e, t, n, l, a)), !0;
      case "dragenter":
        return (zn = Ua(zn, e, t, n, l, a)), !0;
      case "mouseover":
        return (Mn = Ua(Mn, e, t, n, l, a)), !0;
      case "pointerover":
        var u = a.pointerId;
        return ja.set(u, Ua(ja.get(u) || null, e, t, n, l, a)), !0;
      case "gotpointercapture":
        return (
          (u = a.pointerId), Da.set(u, Ua(Da.get(u) || null, e, t, n, l, a)), !0
        );
    }
    return !1;
  }
  function Rh(e) {
    var t = nl(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = h(n)), t !== null)) {
            (e.blockedOn = t),
              Qo(e.priority, function () {
                Oh(n);
              });
            return;
          }
        } else if (t === 31) {
          if (((t = m(n)), t !== null)) {
            (e.blockedOn = t),
              Qo(e.priority, function () {
                Oh(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function cu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Js(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(n.type, n);
        ($u = l), n.target.dispatchEvent(l), ($u = null);
      } else return (t = ll(n)), t !== null && Ah(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function zh(e, t, n) {
    cu(e) && n.delete(t);
  }
  function j0() {
    (Fs = !1),
      Rn !== null && cu(Rn) && (Rn = null),
      zn !== null && cu(zn) && (zn = null),
      Mn !== null && cu(Mn) && (Mn = null),
      ja.forEach(zh),
      Da.forEach(zh);
  }
  function fu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Fs ||
        ((Fs = !0),
        r.unstable_scheduleCallback(r.unstable_NormalPriority, j0)));
  }
  var du = null;
  function Mh(e) {
    du !== e &&
      ((du = e),
      r.unstable_scheduleCallback(r.unstable_NormalPriority, function () {
        du === e && (du = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            l = e[t + 1],
            a = e[t + 2];
          if (typeof l != "function") {
            if ($s(l || n) === null) continue;
            break;
          }
          var u = ll(n);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Jr(u, { pending: !0, data: a, method: n.method, action: l }, l, a));
        }
      }));
  }
  function Bl(e) {
    function t(E) {
      return fu(E, e);
    }
    Rn !== null && fu(Rn, e),
      zn !== null && fu(zn, e),
      Mn !== null && fu(Mn, e),
      ja.forEach(t),
      Da.forEach(t);
    for (var n = 0; n < Ln.length; n++) {
      var l = Ln[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ln.length && ((n = Ln[0]), n.blockedOn === null); )
      Rh(n), n.blockedOn === null && Ln.shift();
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (l = 0; l < n.length; l += 3) {
        var a = n[l],
          u = n[l + 1],
          f = a[lt] || null;
        if (typeof u == "function") f || Mh(n);
        else if (f) {
          var y = null;
          if (u && u.hasAttribute("formAction")) {
            if (((a = u), (f = u[lt] || null))) y = f.formAction;
            else if ($s(a) !== null) continue;
          } else y = f.action;
          typeof y == "function" ? (n[l + 1] = y) : (n.splice(l, 3), (l -= 3)),
            Mh(n);
        }
      }
  }
  function Lh() {
    function e(u) {
      u.canIntercept &&
        u.info === "react-transition" &&
        u.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (a = f);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      a !== null && (a(), (a = null)), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var l = !1,
        a = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(n, 100),
        function () {
          (l = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            a !== null && (a(), (a = null));
        }
      );
    }
  }
  function Ws(e) {
    this._internalRoot = e;
  }
  (hu.prototype.render = Ws.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var n = t.current,
        l = bt();
      Ch(n, l, e, t, null, null);
    }),
    (hu.prototype.unmount = Ws.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          Ch(e.current, 2, null, e, null, null), ki(), (t[tl] = null);
        }
      });
  function hu(e) {
    this._internalRoot = e;
  }
  hu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Vo();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ln.length && t !== 0 && t < Ln[n].priority; n++);
      Ln.splice(n, 0, e), n === 0 && Rh(e);
    }
  };
  var jh = i.version;
  if (jh !== "19.2.0") throw Error(o(527, jh, "19.2.0"));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(o(188))
        : ((e = Object.keys(e).join(",")), Error(o(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? v(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var D0 = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var mu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!mu.isDisabled && mu.supportsFiber)
      try {
        (Zl = mu.inject(D0)), (ft = mu);
      } catch {}
  }
  return (
    (Ga.createRoot = function (e, t) {
      if (!c(e)) throw Error(o(299));
      var n = !1,
        l = "",
        a = Gf,
        u = Vf,
        f = Qf;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (a = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = Eh(e, 1, !1, null, null, n, l, null, a, u, f, Lh)),
        (e[tl] = t.current),
        Ms(e),
        new Ws(t)
      );
    }),
    (Ga.hydrateRoot = function (e, t, n) {
      if (!c(e)) throw Error(o(299));
      var l = !1,
        a = "",
        u = Gf,
        f = Vf,
        y = Qf,
        E = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (u = n.onUncaughtError),
          n.onCaughtError !== void 0 && (f = n.onCaughtError),
          n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
          n.formState !== void 0 && (E = n.formState)),
        (t = Eh(e, 1, !0, t, n ?? null, l, a, E, u, f, y, Lh)),
        (t.context = _h(null)),
        (n = t.current),
        (l = bt()),
        (l = Gu(l)),
        (a = vn(l)),
        (a.callback = null),
        bn(n, a, l),
        (n = l),
        (t.current.lanes = n),
        kl(t, n),
        Ht(t),
        (e[tl] = t.current),
        Ms(e),
        new hu(t)
      );
    }),
    (Ga.version = "19.2.0"),
    Ga
  );
}
var Om;
function yv() {
  if (Om) return ho.exports;
  Om = 1;
  function r() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (i) {
        console.error(i);
      }
  }
  return r(), (ho.exports = pv()), ho.exports;
}
var vv = yv();
/**
 * react-router v7.9.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Tm = "popstate";
function bv(r = {}) {
  function i(o, c) {
    let { pathname: d, search: h, hash: m } = o.location;
    return _o(
      "",
      { pathname: d, search: h, hash: m },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default"
    );
  }
  function s(o, c) {
    return typeof c == "string" ? c : ka(c);
  }
  return xv(i, s, null, r);
}
function Ze(r, i) {
  if (r === !1 || r === null || typeof r > "u") throw new Error(i);
}
function qt(r, i) {
  if (!r) {
    typeof console < "u" && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Sv() {
  return Math.random().toString(36).substring(2, 10);
}
function Nm(r, i) {
  return { usr: r.state, key: r.key, idx: i };
}
function _o(r, i, s = null, o) {
  return {
    pathname: typeof r == "string" ? r : r.pathname,
    search: "",
    hash: "",
    ...(typeof i == "string" ? Ja(i) : i),
    state: s,
    key: (i && i.key) || o || Sv(),
  };
}
function ka({ pathname: r = "/", search: i = "", hash: s = "" }) {
  return (
    i && i !== "?" && (r += i.charAt(0) === "?" ? i : "?" + i),
    s && s !== "#" && (r += s.charAt(0) === "#" ? s : "#" + s),
    r
  );
}
function Ja(r) {
  let i = {};
  if (r) {
    let s = r.indexOf("#");
    s >= 0 && ((i.hash = r.substring(s)), (r = r.substring(0, s)));
    let o = r.indexOf("?");
    o >= 0 && ((i.search = r.substring(o)), (r = r.substring(0, o))),
      r && (i.pathname = r);
  }
  return i;
}
function xv(r, i, s, o = {}) {
  let { window: c = document.defaultView, v5Compat: d = !1 } = o,
    h = c.history,
    m = "POP",
    p = null,
    g = v();
  g == null && ((g = 0), h.replaceState({ ...h.state, idx: g }, ""));
  function v() {
    return (h.state || { idx: null }).idx;
  }
  function b() {
    m = "POP";
    let O = v(),
      L = O == null ? null : O - g;
    (g = O), p && p({ action: m, location: z.location, delta: L });
  }
  function S(O, L) {
    m = "PUSH";
    let U = _o(z.location, O, L);
    g = v() + 1;
    let Q = Nm(U, g),
      P = z.createHref(U);
    try {
      h.pushState(Q, "", P);
    } catch (W) {
      if (W instanceof DOMException && W.name === "DataCloneError") throw W;
      c.location.assign(P);
    }
    d && p && p({ action: m, location: z.location, delta: 1 });
  }
  function x(O, L) {
    m = "REPLACE";
    let U = _o(z.location, O, L);
    g = v();
    let Q = Nm(U, g),
      P = z.createHref(U);
    h.replaceState(Q, "", P),
      d && p && p({ action: m, location: z.location, delta: 0 });
  }
  function _(O) {
    return Ev(O);
  }
  let z = {
    get action() {
      return m;
    },
    get location() {
      return r(c, h);
    },
    listen(O) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Tm, b),
        (p = O),
        () => {
          c.removeEventListener(Tm, b), (p = null);
        }
      );
    },
    createHref(O) {
      return i(c, O);
    },
    createURL: _,
    encodeLocation(O) {
      let L = _(O);
      return { pathname: L.pathname, search: L.search, hash: L.hash };
    },
    push: S,
    replace: x,
    go(O) {
      return h.go(O);
    },
  };
  return z;
}
function Ev(r, i = !1) {
  let s = "http://localhost";
  typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Ze(s, "No window.location.(origin|href) available to create URL");
  let o = typeof r == "string" ? r : ka(r);
  return (
    (o = o.replace(/ $/, "%20")),
    !i && o.startsWith("//") && (o = s + o),
    new URL(o, s)
  );
}
function $m(r, i, s = "/") {
  return _v(r, i, s, !1);
}
function _v(r, i, s, o) {
  let c = typeof i == "string" ? Ja(i) : i,
    d = sn(c.pathname || "/", s);
  if (d == null) return null;
  let h = Fm(r);
  Cv(h);
  let m = null;
  for (let p = 0; m == null && p < h.length; ++p) {
    let g = Dv(d);
    m = Lv(h[p], g, o);
  }
  return m;
}
function Fm(r, i = [], s = [], o = "", c = !1) {
  let d = (h, m, p = c, g) => {
    let v = {
      relativePath: g === void 0 ? h.path || "" : g,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h,
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(o) && p) return;
      Ze(
        v.relativePath.startsWith(o),
        `Absolute route path "${v.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(o.length));
    }
    let b = rn([o, v.relativePath]),
      S = s.concat(v);
    h.children &&
      h.children.length > 0 &&
      (Ze(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Fm(h.children, i, S, b, p)),
      !(h.path == null && !h.index) &&
        i.push({ path: b, score: zv(b, h.index), routesMeta: S });
  };
  return (
    r.forEach((h, m) => {
      if (h.path === "" || !h.path?.includes("?")) d(h, m);
      else for (let p of Wm(h.path)) d(h, m, !0, p);
    }),
    i
  );
}
function Wm(r) {
  let i = r.split("/");
  if (i.length === 0) return [];
  let [s, ...o] = i,
    c = s.endsWith("?"),
    d = s.replace(/\?$/, "");
  if (o.length === 0) return c ? [d, ""] : [d];
  let h = Wm(o.join("/")),
    m = [];
  return (
    m.push(...h.map((p) => (p === "" ? d : [d, p].join("/")))),
    c && m.push(...h),
    m.map((p) => (r.startsWith("/") && p === "" ? "/" : p))
  );
}
function Cv(r) {
  r.sort((i, s) =>
    i.score !== s.score
      ? s.score - i.score
      : Mv(
          i.routesMeta.map((o) => o.childrenIndex),
          s.routesMeta.map((o) => o.childrenIndex)
        )
  );
}
var wv = /^:[\w-]+$/,
  Av = 3,
  Ov = 2,
  Tv = 1,
  Nv = 10,
  Rv = -2,
  Rm = (r) => r === "*";
function zv(r, i) {
  let s = r.split("/"),
    o = s.length;
  return (
    s.some(Rm) && (o += Rv),
    i && (o += Ov),
    s
      .filter((c) => !Rm(c))
      .reduce((c, d) => c + (wv.test(d) ? Av : d === "" ? Tv : Nv), o)
  );
}
function Mv(r, i) {
  return r.length === i.length && r.slice(0, -1).every((o, c) => o === i[c])
    ? r[r.length - 1] - i[i.length - 1]
    : 0;
}
function Lv(r, i, s = !1) {
  let { routesMeta: o } = r,
    c = {},
    d = "/",
    h = [];
  for (let m = 0; m < o.length; ++m) {
    let p = o[m],
      g = m === o.length - 1,
      v = d === "/" ? i : i.slice(d.length) || "/",
      b = Au(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: g },
        v
      ),
      S = p.route;
    if (
      (!b &&
        g &&
        s &&
        !o[o.length - 1].route.index &&
        (b = Au(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          v
        )),
      !b)
    )
      return null;
    Object.assign(c, b.params),
      h.push({
        params: c,
        pathname: rn([d, b.pathname]),
        pathnameBase: qv(rn([d, b.pathnameBase])),
        route: S,
      }),
      b.pathnameBase !== "/" && (d = rn([d, b.pathnameBase]));
  }
  return h;
}
function Au(r, i) {
  typeof r == "string" && (r = { path: r, caseSensitive: !1, end: !0 });
  let [s, o] = jv(r.path, r.caseSensitive, r.end),
    c = i.match(s);
  if (!c) return null;
  let d = c[0],
    h = d.replace(/(.)\/+$/, "$1"),
    m = c.slice(1);
  return {
    params: o.reduce((g, { paramName: v, isOptional: b }, S) => {
      if (v === "*") {
        let _ = m[S] || "";
        h = d.slice(0, d.length - _.length).replace(/(.)\/+$/, "$1");
      }
      const x = m[S];
      return (
        b && !x ? (g[v] = void 0) : (g[v] = (x || "").replace(/%2F/g, "/")), g
      );
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: r,
  };
}
function jv(r, i = !1, s = !0) {
  qt(
    r === "*" || !r.endsWith("*") || r.endsWith("/*"),
    `Route path "${r}" will be treated as if it were "${r.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let o = [],
    c =
      "^" +
      r
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (h, m, p) => (
            o.push({ paramName: m, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    r.endsWith("*")
      ? (o.push({ paramName: "*" }),
        (c += r === "*" || r === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
      ? (c += "\\/*$")
      : r !== "" && r !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, i ? void 0 : "i"), o]
  );
}
function Dv(r) {
  try {
    return r
      .split("/")
      .map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
      .join("/");
  } catch (i) {
    return (
      qt(
        !1,
        `The URL path "${r}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      r
    );
  }
}
function sn(r, i) {
  if (i === "/") return r;
  if (!r.toLowerCase().startsWith(i.toLowerCase())) return null;
  let s = i.endsWith("/") ? i.length - 1 : i.length,
    o = r.charAt(s);
  return o && o !== "/" ? null : r.slice(s) || "/";
}
function Uv(r, i = "/") {
  let {
    pathname: s,
    search: o = "",
    hash: c = "",
  } = typeof r == "string" ? Ja(r) : r;
  return {
    pathname: s ? (s.startsWith("/") ? s : Hv(s, i)) : i,
    search: Yv(o),
    hash: Gv(c),
  };
}
function Hv(r, i) {
  let s = i.replace(/\/+$/, "").split("/");
  return (
    r.split("/").forEach((c) => {
      c === ".." ? s.length > 1 && s.pop() : c !== "." && s.push(c);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function yo(r, i, s, o) {
  return `Cannot include a '${r}' character in a manually specified \`to.${i}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Bv(r) {
  return r.filter(
    (i, s) => s === 0 || (i.route.path && i.route.path.length > 0)
  );
}
function Pm(r) {
  let i = Bv(r);
  return i.map((s, o) => (o === i.length - 1 ? s.pathname : s.pathnameBase));
}
function Im(r, i, s, o = !1) {
  let c;
  typeof r == "string"
    ? (c = Ja(r))
    : ((c = { ...r }),
      Ze(
        !c.pathname || !c.pathname.includes("?"),
        yo("?", "pathname", "search", c)
      ),
      Ze(
        !c.pathname || !c.pathname.includes("#"),
        yo("#", "pathname", "hash", c)
      ),
      Ze(!c.search || !c.search.includes("#"), yo("#", "search", "hash", c)));
  let d = r === "" || c.pathname === "",
    h = d ? "/" : c.pathname,
    m;
  if (h == null) m = s;
  else {
    let b = i.length - 1;
    if (!o && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; ) S.shift(), (b -= 1);
      c.pathname = S.join("/");
    }
    m = b >= 0 ? i[b] : "/";
  }
  let p = Uv(c, m),
    g = h && h !== "/" && h.endsWith("/"),
    v = (d || h === ".") && s.endsWith("/");
  return !p.pathname.endsWith("/") && (g || v) && (p.pathname += "/"), p;
}
var rn = (r) => r.join("/").replace(/\/\/+/g, "/"),
  qv = (r) => r.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Yv = (r) => (!r || r === "?" ? "" : r.startsWith("?") ? r : "?" + r),
  Gv = (r) => (!r || r === "#" ? "" : r.startsWith("#") ? r : "#" + r);
function Vv(r) {
  return (
    r != null &&
    typeof r.status == "number" &&
    typeof r.statusText == "string" &&
    typeof r.internal == "boolean" &&
    "data" in r
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var eg = ["POST", "PUT", "PATCH", "DELETE"];
new Set(eg);
var Qv = ["GET", ...eg];
new Set(Qv);
var Ql = Y.createContext(null);
Ql.displayName = "DataRouter";
var Ru = Y.createContext(null);
Ru.displayName = "DataRouterState";
Y.createContext(!1);
var tg = Y.createContext({ isTransitioning: !1 });
tg.displayName = "ViewTransition";
var Xv = Y.createContext(new Map());
Xv.displayName = "Fetchers";
var Zv = Y.createContext(null);
Zv.displayName = "Await";
var Gt = Y.createContext(null);
Gt.displayName = "Navigation";
var zu = Y.createContext(null);
zu.displayName = "Location";
var on = Y.createContext({ outlet: null, matches: [], isDataRoute: !1 });
on.displayName = "Route";
var Oo = Y.createContext(null);
Oo.displayName = "RouteError";
function Kv(r, { relative: i } = {}) {
  Ze(
    $a(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: o } = Y.useContext(Gt),
    { hash: c, pathname: d, search: h } = Fa(r, { relative: i }),
    m = d;
  return (
    s !== "/" && (m = d === "/" ? s : rn([s, d])),
    o.createHref({ pathname: m, search: h, hash: c })
  );
}
function $a() {
  return Y.useContext(zu) != null;
}
function el() {
  return (
    Ze(
      $a(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    Y.useContext(zu).location
  );
}
var ng =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function lg(r) {
  Y.useContext(Gt).static || Y.useLayoutEffect(r);
}
function To() {
  let { isDataRoute: r } = Y.useContext(on);
  return r ? ib() : kv();
}
function kv() {
  Ze(
    $a(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let r = Y.useContext(Ql),
    { basename: i, navigator: s } = Y.useContext(Gt),
    { matches: o } = Y.useContext(on),
    { pathname: c } = el(),
    d = JSON.stringify(Pm(o)),
    h = Y.useRef(!1);
  return (
    lg(() => {
      h.current = !0;
    }),
    Y.useCallback(
      (p, g = {}) => {
        if ((qt(h.current, ng), !h.current)) return;
        if (typeof p == "number") {
          s.go(p);
          return;
        }
        let v = Im(p, JSON.parse(d), c, g.relative === "path");
        r == null &&
          i !== "/" &&
          (v.pathname = v.pathname === "/" ? i : rn([i, v.pathname])),
          (g.replace ? s.replace : s.push)(v, g.state, g);
      },
      [i, s, d, c, r]
    )
  );
}
Y.createContext(null);
function Fa(r, { relative: i } = {}) {
  let { matches: s } = Y.useContext(on),
    { pathname: o } = el(),
    c = JSON.stringify(Pm(s));
  return Y.useMemo(() => Im(r, JSON.parse(c), o, i === "path"), [r, c, o, i]);
}
function Jv(r, i) {
  return ag(r);
}
function ag(r, i, s, o, c) {
  Ze(
    $a(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = Y.useContext(Gt),
    { matches: h } = Y.useContext(on),
    m = h[h.length - 1],
    p = m ? m.params : {},
    g = m ? m.pathname : "/",
    v = m ? m.pathnameBase : "/",
    b = m && m.route;
  {
    let U = (b && b.path) || "";
    ig(
      g,
      !b || U.endsWith("*") || U.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${U}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${U}"> to <Route path="${
        U === "/" ? "*" : `${U}/*`
      }">.`
    );
  }
  let S = el(),
    x;
  x = S;
  let _ = x.pathname || "/",
    z = _;
  if (v !== "/") {
    let U = v.replace(/^\//, "").split("/");
    z = "/" + _.replace(/^\//, "").split("/").slice(U.length).join("/");
  }
  let O = $m(r, { pathname: z });
  return (
    qt(
      b || O != null,
      `No routes matched location "${x.pathname}${x.search}${x.hash}" `
    ),
    qt(
      O == null ||
        O[O.length - 1].route.element !== void 0 ||
        O[O.length - 1].route.Component !== void 0 ||
        O[O.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ),
    Iv(
      O &&
        O.map((U) =>
          Object.assign({}, U, {
            params: Object.assign({}, p, U.params),
            pathname: rn([
              v,
              d.encodeLocation
                ? d.encodeLocation(
                    U.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                  ).pathname
                : U.pathname,
            ]),
            pathnameBase:
              U.pathnameBase === "/"
                ? v
                : rn([
                    v,
                    d.encodeLocation
                      ? d.encodeLocation(
                          U.pathnameBase
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23")
                        ).pathname
                      : U.pathnameBase,
                  ]),
          })
        ),
      h,
      s,
      o,
      c
    )
  );
}
function $v() {
  let r = ab(),
    i = Vv(r)
      ? `${r.status} ${r.statusText}`
      : r instanceof Error
      ? r.message
      : JSON.stringify(r),
    s = r instanceof Error ? r.stack : null,
    o = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: o },
    d = { padding: "2px 4px", backgroundColor: o },
    h = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", r),
    (h = Y.createElement(
      Y.Fragment,
      null,
      Y.createElement("p", null, "💿 Hey developer 👋"),
      Y.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        Y.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        Y.createElement("code", { style: d }, "errorElement"),
        " prop on your route."
      )
    )),
    Y.createElement(
      Y.Fragment,
      null,
      Y.createElement("h2", null, "Unexpected Application Error!"),
      Y.createElement("h3", { style: { fontStyle: "italic" } }, i),
      s ? Y.createElement("pre", { style: c }, s) : null,
      h
    )
  );
}
var Fv = Y.createElement($v, null),
  Wv = class extends Y.Component {
    constructor(r) {
      super(r),
        (this.state = {
          location: r.location,
          revalidation: r.revalidation,
          error: r.error,
        });
    }
    static getDerivedStateFromError(r) {
      return { error: r };
    }
    static getDerivedStateFromProps(r, i) {
      return i.location !== r.location ||
        (i.revalidation !== "idle" && r.revalidation === "idle")
        ? { error: r.error, location: r.location, revalidation: r.revalidation }
        : {
            error: r.error !== void 0 ? r.error : i.error,
            location: i.location,
            revalidation: r.revalidation || i.revalidation,
          };
    }
    componentDidCatch(r, i) {
      this.props.unstable_onError
        ? this.props.unstable_onError(r, i)
        : console.error(
            "React Router caught the following error during render",
            r
          );
    }
    render() {
      return this.state.error !== void 0
        ? Y.createElement(
            on.Provider,
            { value: this.props.routeContext },
            Y.createElement(Oo.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function Pv({ routeContext: r, match: i, children: s }) {
  let o = Y.useContext(Ql);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = i.route.id),
    Y.createElement(on.Provider, { value: r }, s)
  );
}
function Iv(r, i = [], s = null, o = null, c = null) {
  if (r == null) {
    if (!s) return null;
    if (s.errors) r = s.matches;
    else if (i.length === 0 && !s.initialized && s.matches.length > 0)
      r = s.matches;
    else return null;
  }
  let d = r,
    h = s?.errors;
  if (h != null) {
    let g = d.findIndex((v) => v.route.id && h?.[v.route.id] !== void 0);
    Ze(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        h
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, g + 1)));
  }
  let m = !1,
    p = -1;
  if (s)
    for (let g = 0; g < d.length; g++) {
      let v = d[g];
      if (
        ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = g),
        v.route.id)
      ) {
        let { loaderData: b, errors: S } = s,
          x =
            v.route.loader &&
            !b.hasOwnProperty(v.route.id) &&
            (!S || S[v.route.id] === void 0);
        if (v.route.lazy || x) {
          (m = !0), p >= 0 ? (d = d.slice(0, p + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  return d.reduceRight((g, v, b) => {
    let S,
      x = !1,
      _ = null,
      z = null;
    s &&
      ((S = h && v.route.id ? h[v.route.id] : void 0),
      (_ = v.route.errorElement || Fv),
      m &&
        (p < 0 && b === 0
          ? (ig(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (x = !0),
            (z = null))
          : p === b &&
            ((x = !0), (z = v.route.hydrateFallbackElement || null))));
    let O = i.concat(d.slice(0, b + 1)),
      L = () => {
        let U;
        return (
          S
            ? (U = _)
            : x
            ? (U = z)
            : v.route.Component
            ? (U = Y.createElement(v.route.Component, null))
            : v.route.element
            ? (U = v.route.element)
            : (U = g),
          Y.createElement(Pv, {
            match: v,
            routeContext: { outlet: g, matches: O, isDataRoute: s != null },
            children: U,
          })
        );
      };
    return s && (v.route.ErrorBoundary || v.route.errorElement || b === 0)
      ? Y.createElement(Wv, {
          location: s.location,
          revalidation: s.revalidation,
          component: _,
          error: S,
          children: L(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          unstable_onError: o,
        })
      : L();
  }, null);
}
function No(r) {
  return `${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function eb(r) {
  let i = Y.useContext(Ql);
  return Ze(i, No(r)), i;
}
function tb(r) {
  let i = Y.useContext(Ru);
  return Ze(i, No(r)), i;
}
function nb(r) {
  let i = Y.useContext(on);
  return Ze(i, No(r)), i;
}
function Ro(r) {
  let i = nb(r),
    s = i.matches[i.matches.length - 1];
  return (
    Ze(
      s.route.id,
      `${r} can only be used on routes that contain a unique "id"`
    ),
    s.route.id
  );
}
function lb() {
  return Ro("useRouteId");
}
function ab() {
  let r = Y.useContext(Oo),
    i = tb("useRouteError"),
    s = Ro("useRouteError");
  return r !== void 0 ? r : i.errors?.[s];
}
function ib() {
  let { router: r } = eb("useNavigate"),
    i = Ro("useNavigate"),
    s = Y.useRef(!1);
  return (
    lg(() => {
      s.current = !0;
    }),
    Y.useCallback(
      async (c, d = {}) => {
        qt(s.current, ng),
          s.current &&
            (typeof c == "number"
              ? r.navigate(c)
              : await r.navigate(c, { fromRouteId: i, ...d }));
      },
      [r, i]
    )
  );
}
var zm = {};
function ig(r, i, s) {
  !i && !zm[r] && ((zm[r] = !0), qt(!1, s));
}
Y.memo(ub);
function ub({ routes: r, future: i, state: s, unstable_onError: o }) {
  return ag(r, void 0, s, o, i);
}
function rb({
  basename: r = "/",
  children: i = null,
  location: s,
  navigationType: o = "POP",
  navigator: c,
  static: d = !1,
}) {
  Ze(
    !$a(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = r.replace(/^\/*/, "/"),
    m = Y.useMemo(
      () => ({ basename: h, navigator: c, static: d, future: {} }),
      [h, c, d]
    );
  typeof s == "string" && (s = Ja(s));
  let {
      pathname: p = "/",
      search: g = "",
      hash: v = "",
      state: b = null,
      key: S = "default",
    } = s,
    x = Y.useMemo(() => {
      let _ = sn(p, h);
      return _ == null
        ? null
        : {
            location: { pathname: _, search: g, hash: v, state: b, key: S },
            navigationType: o,
          };
    }, [h, p, g, v, b, S, o]);
  return (
    qt(
      x != null,
      `<Router basename="${h}"> is not able to match the URL "${p}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    x == null
      ? null
      : Y.createElement(
          Gt.Provider,
          { value: m },
          Y.createElement(zu.Provider, { children: i, value: x })
        )
  );
}
var Su = "get",
  xu = "application/x-www-form-urlencoded";
function Mu(r) {
  return r != null && typeof r.tagName == "string";
}
function sb(r) {
  return Mu(r) && r.tagName.toLowerCase() === "button";
}
function ob(r) {
  return Mu(r) && r.tagName.toLowerCase() === "form";
}
function cb(r) {
  return Mu(r) && r.tagName.toLowerCase() === "input";
}
function fb(r) {
  return !!(r.metaKey || r.altKey || r.ctrlKey || r.shiftKey);
}
function db(r, i) {
  return r.button === 0 && (!i || i === "_self") && !fb(r);
}
var bu = null;
function hb() {
  if (bu === null)
    try {
      new FormData(document.createElement("form"), 0), (bu = !1);
    } catch {
      bu = !0;
    }
  return bu;
}
var mb = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function vo(r) {
  return r != null && !mb.has(r)
    ? (qt(
        !1,
        `"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${xu}"`
      ),
      null)
    : r;
}
function gb(r, i) {
  let s, o, c, d, h;
  if (ob(r)) {
    let m = r.getAttribute("action");
    (o = m ? sn(m, i) : null),
      (s = r.getAttribute("method") || Su),
      (c = vo(r.getAttribute("enctype")) || xu),
      (d = new FormData(r));
  } else if (sb(r) || (cb(r) && (r.type === "submit" || r.type === "image"))) {
    let m = r.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = r.getAttribute("formaction") || m.getAttribute("action");
    if (
      ((o = p ? sn(p, i) : null),
      (s = r.getAttribute("formmethod") || m.getAttribute("method") || Su),
      (c =
        vo(r.getAttribute("formenctype")) ||
        vo(m.getAttribute("enctype")) ||
        xu),
      (d = new FormData(m, r)),
      !hb())
    ) {
      let { name: g, type: v, value: b } = r;
      if (v === "image") {
        let S = g ? `${g}.` : "";
        d.append(`${S}x`, "0"), d.append(`${S}y`, "0");
      } else g && d.append(g, b);
    }
  } else {
    if (Mu(r))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (s = Su), (o = null), (c = xu), (h = r);
  }
  return (
    d && c === "text/plain" && ((h = d), (d = void 0)),
    { action: o, method: s.toLowerCase(), encType: c, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function zo(r, i) {
  if (r === !1 || r === null || typeof r > "u") throw new Error(i);
}
function pb(r, i, s) {
  let o =
    typeof r == "string"
      ? new URL(
          r,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : r;
  return (
    o.pathname === "/"
      ? (o.pathname = `_root.${s}`)
      : i && sn(o.pathname, i) === "/"
      ? (o.pathname = `${i.replace(/\/$/, "")}/_root.${s}`)
      : (o.pathname = `${o.pathname.replace(/\/$/, "")}.${s}`),
    o
  );
}
async function yb(r, i) {
  if (r.id in i) return i[r.id];
  try {
    let s = await import(r.module);
    return (i[r.id] = s), s;
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${r.module}\`, reloading page...`
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function vb(r) {
  return r == null
    ? !1
    : r.href == null
    ? r.rel === "preload" &&
      typeof r.imageSrcSet == "string" &&
      typeof r.imageSizes == "string"
    : typeof r.rel == "string" && typeof r.href == "string";
}
async function bb(r, i, s) {
  let o = await Promise.all(
    r.map(async (c) => {
      let d = i.routes[c.route.id];
      if (d) {
        let h = await yb(d, s);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return _b(
    o
      .flat(1)
      .filter(vb)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" }
      )
  );
}
function Mm(r, i, s, o, c, d) {
  let h = (p, g) => (s[g] ? p.route.id !== s[g].route.id : !0),
    m = (p, g) =>
      s[g].pathname !== p.pathname ||
      (s[g].route.path?.endsWith("*") && s[g].params["*"] !== p.params["*"]);
  return d === "assets"
    ? i.filter((p, g) => h(p, g) || m(p, g))
    : d === "data"
    ? i.filter((p, g) => {
        let v = o.routes[p.route.id];
        if (!v || !v.hasLoader) return !1;
        if (h(p, g) || m(p, g)) return !0;
        if (p.route.shouldRevalidate) {
          let b = p.route.shouldRevalidate({
            currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
            currentParams: s[0]?.params || {},
            nextUrl: new URL(r, window.origin),
            nextParams: p.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof b == "boolean") return b;
        }
        return !0;
      })
    : [];
}
function Sb(r, i, { includeHydrateFallback: s } = {}) {
  return xb(
    r
      .map((o) => {
        let c = i.routes[o.route.id];
        if (!c) return [];
        let d = [c.module];
        return (
          c.clientActionModule && (d = d.concat(c.clientActionModule)),
          c.clientLoaderModule && (d = d.concat(c.clientLoaderModule)),
          s &&
            c.hydrateFallbackModule &&
            (d = d.concat(c.hydrateFallbackModule)),
          c.imports && (d = d.concat(c.imports)),
          d
        );
      })
      .flat(1)
  );
}
function xb(r) {
  return [...new Set(r)];
}
function Eb(r) {
  let i = {},
    s = Object.keys(r).sort();
  for (let o of s) i[o] = r[o];
  return i;
}
function _b(r, i) {
  let s = new Set();
  return (
    new Set(i),
    r.reduce((o, c) => {
      let d = JSON.stringify(Eb(c));
      return s.has(d) || (s.add(d), o.push({ key: d, link: c })), o;
    }, [])
  );
}
function ug() {
  let r = Y.useContext(Ql);
  return (
    zo(
      r,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    r
  );
}
function Cb() {
  let r = Y.useContext(Ru);
  return (
    zo(
      r,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    r
  );
}
var Mo = Y.createContext(void 0);
Mo.displayName = "FrameworkContext";
function rg() {
  let r = Y.useContext(Mo);
  return (
    zo(r, "You must render this element inside a <HydratedRouter> element"), r
  );
}
function wb(r, i) {
  let s = Y.useContext(Mo),
    [o, c] = Y.useState(!1),
    [d, h] = Y.useState(!1),
    {
      onFocus: m,
      onBlur: p,
      onMouseEnter: g,
      onMouseLeave: v,
      onTouchStart: b,
    } = i,
    S = Y.useRef(null);
  Y.useEffect(() => {
    if ((r === "render" && h(!0), r === "viewport")) {
      let z = (L) => {
          L.forEach((U) => {
            h(U.isIntersecting);
          });
        },
        O = new IntersectionObserver(z, { threshold: 0.5 });
      return (
        S.current && O.observe(S.current),
        () => {
          O.disconnect();
        }
      );
    }
  }, [r]),
    Y.useEffect(() => {
      if (o) {
        let z = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(z);
        };
      }
    }, [o]);
  let x = () => {
      c(!0);
    },
    _ = () => {
      c(!1), h(!1);
    };
  return s
    ? r !== "intent"
      ? [d, S, {}]
      : [
          d,
          S,
          {
            onFocus: Va(m, x),
            onBlur: Va(p, _),
            onMouseEnter: Va(g, x),
            onMouseLeave: Va(v, _),
            onTouchStart: Va(b, x),
          },
        ]
    : [!1, S, {}];
}
function Va(r, i) {
  return (s) => {
    r && r(s), s.defaultPrevented || i(s);
  };
}
function Ab({ page: r, ...i }) {
  let { router: s } = ug(),
    o = Y.useMemo(() => $m(s.routes, r, s.basename), [s.routes, r, s.basename]);
  return o ? Y.createElement(Tb, { page: r, matches: o, ...i }) : null;
}
function Ob(r) {
  let { manifest: i, routeModules: s } = rg(),
    [o, c] = Y.useState([]);
  return (
    Y.useEffect(() => {
      let d = !1;
      return (
        bb(r, i, s).then((h) => {
          d || c(h);
        }),
        () => {
          d = !0;
        }
      );
    }, [r, i, s]),
    o
  );
}
function Tb({ page: r, matches: i, ...s }) {
  let o = el(),
    { manifest: c, routeModules: d } = rg(),
    { basename: h } = ug(),
    { loaderData: m, matches: p } = Cb(),
    g = Y.useMemo(() => Mm(r, i, p, c, o, "data"), [r, i, p, c, o]),
    v = Y.useMemo(() => Mm(r, i, p, c, o, "assets"), [r, i, p, c, o]),
    b = Y.useMemo(() => {
      if (r === o.pathname + o.search + o.hash) return [];
      let _ = new Set(),
        z = !1;
      if (
        (i.forEach((L) => {
          let U = c.routes[L.route.id];
          !U ||
            !U.hasLoader ||
            ((!g.some((Q) => Q.route.id === L.route.id) &&
              L.route.id in m &&
              d[L.route.id]?.shouldRevalidate) ||
            U.hasClientLoader
              ? (z = !0)
              : _.add(L.route.id));
        }),
        _.size === 0)
      )
        return [];
      let O = pb(r, h, "data");
      return (
        z &&
          _.size > 0 &&
          O.searchParams.set(
            "_routes",
            i
              .filter((L) => _.has(L.route.id))
              .map((L) => L.route.id)
              .join(",")
          ),
        [O.pathname + O.search]
      );
    }, [h, m, o, c, g, i, r, d]),
    S = Y.useMemo(() => Sb(v, c), [v, c]),
    x = Ob(v);
  return Y.createElement(
    Y.Fragment,
    null,
    b.map((_) =>
      Y.createElement("link", {
        key: _,
        rel: "prefetch",
        as: "fetch",
        href: _,
        ...s,
      })
    ),
    S.map((_) =>
      Y.createElement("link", { key: _, rel: "modulepreload", href: _, ...s })
    ),
    x.map(({ key: _, link: z }) =>
      Y.createElement("link", { key: _, nonce: s.nonce, ...z })
    )
  );
}
function Nb(...r) {
  return (i) => {
    r.forEach((s) => {
      typeof s == "function" ? s(i) : s != null && (s.current = i);
    });
  };
}
var sg =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  sg && (window.__reactRouterVersion = "7.9.5");
} catch {}
function Rb({ basename: r, children: i, window: s }) {
  let o = Y.useRef();
  o.current == null && (o.current = bv({ window: s, v5Compat: !0 }));
  let c = o.current,
    [d, h] = Y.useState({ action: c.action, location: c.location }),
    m = Y.useCallback(
      (p) => {
        Y.startTransition(() => h(p));
      },
      [h]
    );
  return (
    Y.useLayoutEffect(() => c.listen(m), [c, m]),
    Y.createElement(rb, {
      basename: r,
      children: i,
      location: d.location,
      navigationType: d.action,
      navigator: c,
    })
  );
}
var og = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Lu = Y.forwardRef(function (
    {
      onClick: i,
      discover: s = "render",
      prefetch: o = "none",
      relative: c,
      reloadDocument: d,
      replace: h,
      state: m,
      target: p,
      to: g,
      preventScrollReset: v,
      viewTransition: b,
      ...S
    },
    x
  ) {
    let { basename: _ } = Y.useContext(Gt),
      z = typeof g == "string" && og.test(g),
      O,
      L = !1;
    if (typeof g == "string" && z && ((O = g), sg))
      try {
        let ye = new URL(window.location.href),
          V = g.startsWith("//") ? new URL(ye.protocol + g) : new URL(g),
          Z = sn(V.pathname, _);
        V.origin === ye.origin && Z != null
          ? (g = Z + V.search + V.hash)
          : (L = !0);
      } catch {
        qt(
          !1,
          `<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let U = Kv(g, { relative: c }),
      [Q, P, W] = wb(o, S),
      ue = jb(g, {
        replace: h,
        state: m,
        target: p,
        preventScrollReset: v,
        relative: c,
        viewTransition: b,
      });
    function I(ye) {
      i && i(ye), ye.defaultPrevented || ue(ye);
    }
    let Ee = Y.createElement("a", {
      ...S,
      ...W,
      href: O || U,
      onClick: L || d ? i : I,
      ref: Nb(x, P),
      target: p,
      "data-discover": !z && s === "render" ? "true" : void 0,
    });
    return Q && !z
      ? Y.createElement(Y.Fragment, null, Ee, Y.createElement(Ab, { page: U }))
      : Ee;
  });
Lu.displayName = "Link";
var zb = Y.forwardRef(function (
  {
    "aria-current": i = "page",
    caseSensitive: s = !1,
    className: o = "",
    end: c = !1,
    style: d,
    to: h,
    viewTransition: m,
    children: p,
    ...g
  },
  v
) {
  let b = Fa(h, { relative: g.relative }),
    S = el(),
    x = Y.useContext(Ru),
    { navigator: _, basename: z } = Y.useContext(Gt),
    O = x != null && qb(b) && m === !0,
    L = _.encodeLocation ? _.encodeLocation(b).pathname : b.pathname,
    U = S.pathname,
    Q =
      x && x.navigation && x.navigation.location
        ? x.navigation.location.pathname
        : null;
  s ||
    ((U = U.toLowerCase()),
    (Q = Q ? Q.toLowerCase() : null),
    (L = L.toLowerCase())),
    Q && z && (Q = sn(Q, z) || Q);
  const P = L !== "/" && L.endsWith("/") ? L.length - 1 : L.length;
  let W = U === L || (!c && U.startsWith(L) && U.charAt(P) === "/"),
    ue =
      Q != null &&
      (Q === L || (!c && Q.startsWith(L) && Q.charAt(L.length) === "/")),
    I = { isActive: W, isPending: ue, isTransitioning: O },
    Ee = W ? i : void 0,
    ye;
  typeof o == "function"
    ? (ye = o(I))
    : (ye = [
        o,
        W ? "active" : null,
        ue ? "pending" : null,
        O ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let V = typeof d == "function" ? d(I) : d;
  return Y.createElement(
    Lu,
    {
      ...g,
      "aria-current": Ee,
      className: ye,
      ref: v,
      style: V,
      to: h,
      viewTransition: m,
    },
    typeof p == "function" ? p(I) : p
  );
});
zb.displayName = "NavLink";
var Mb = Y.forwardRef(
  (
    {
      discover: r = "render",
      fetcherKey: i,
      navigate: s,
      reloadDocument: o,
      replace: c,
      state: d,
      method: h = Su,
      action: m,
      onSubmit: p,
      relative: g,
      preventScrollReset: v,
      viewTransition: b,
      ...S
    },
    x
  ) => {
    let _ = Hb(),
      z = Bb(m, { relative: g }),
      O = h.toLowerCase() === "get" ? "get" : "post",
      L = typeof m == "string" && og.test(m),
      U = (Q) => {
        if ((p && p(Q), Q.defaultPrevented)) return;
        Q.preventDefault();
        let P = Q.nativeEvent.submitter,
          W = P?.getAttribute("formmethod") || h;
        _(P || Q.currentTarget, {
          fetcherKey: i,
          method: W,
          navigate: s,
          replace: c,
          state: d,
          relative: g,
          preventScrollReset: v,
          viewTransition: b,
        });
      };
    return Y.createElement("form", {
      ref: x,
      method: O,
      action: z,
      onSubmit: o ? p : U,
      ...S,
      "data-discover": !L && r === "render" ? "true" : void 0,
    });
  }
);
Mb.displayName = "Form";
function Lb(r) {
  return `${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cg(r) {
  let i = Y.useContext(Ql);
  return Ze(i, Lb(r)), i;
}
function jb(
  r,
  {
    target: i,
    replace: s,
    state: o,
    preventScrollReset: c,
    relative: d,
    viewTransition: h,
  } = {}
) {
  let m = To(),
    p = el(),
    g = Fa(r, { relative: d });
  return Y.useCallback(
    (v) => {
      if (db(v, i)) {
        v.preventDefault();
        let b = s !== void 0 ? s : ka(p) === ka(g);
        m(r, {
          replace: b,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
        });
      }
    },
    [p, m, g, s, o, i, r, c, d, h]
  );
}
var Db = 0,
  Ub = () => `__${String(++Db)}__`;
function Hb() {
  let { router: r } = cg("useSubmit"),
    { basename: i } = Y.useContext(Gt),
    s = lb();
  return Y.useCallback(
    async (o, c = {}) => {
      let { action: d, method: h, encType: m, formData: p, body: g } = gb(o, i);
      if (c.navigate === !1) {
        let v = c.fetcherKey || Ub();
        await r.fetch(v, s, c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: p,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || m,
          flushSync: c.flushSync,
        });
      } else
        await r.navigate(c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: p,
          body: g,
          formMethod: c.method || h,
          formEncType: c.encType || m,
          replace: c.replace,
          state: c.state,
          fromRouteId: s,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [r, i, s]
  );
}
function Bb(r, { relative: i } = {}) {
  let { basename: s } = Y.useContext(Gt),
    o = Y.useContext(on);
  Ze(o, "useFormAction must be used inside a RouteContext");
  let [c] = o.matches.slice(-1),
    d = { ...Fa(r || ".", { relative: i }) },
    h = el();
  if (r == null) {
    d.search = h.search;
    let m = new URLSearchParams(d.search),
      p = m.getAll("index");
    if (p.some((v) => v === "")) {
      m.delete("index"),
        p.filter((b) => b).forEach((b) => m.append("index", b));
      let v = m.toString();
      d.search = v ? `?${v}` : "";
    }
  }
  return (
    (!r || r === ".") &&
      c.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (d.pathname = d.pathname === "/" ? s : rn([s, d.pathname])),
    ka(d)
  );
}
function qb(r, { relative: i } = {}) {
  let s = Y.useContext(tg);
  Ze(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = cg("useViewTransitionState"),
    c = Fa(r, { relative: i });
  if (!s.isTransitioning) return !1;
  let d = sn(s.currentLocation.pathname, o) || s.currentLocation.pathname,
    h = sn(s.nextLocation.pathname, o) || s.nextLocation.pathname;
  return Au(c.pathname, h) != null || Au(c.pathname, d) != null;
}
function Yb() {
  const [r, i] = Y.useState("home"),
    [s, o] = Y.useState(!1);
  Y.useEffect(() => {
    const m = () => {
      o(window.scrollY > 50);
    };
    return (
      window.addEventListener("scroll", m),
      () => window.removeEventListener("scroll", m)
    );
  }, []);
  const c = (m) => {
      const p = document.getElementById(m);
      p && (p.scrollIntoView({ behavior: "smooth" }), i(m));
    },
    d = [
      {
        icon: "ri-time-line",
        title: "Real-Time Attendance",
        description:
          "Instant attendance tracking with live updates and notifications for administrators and students.",
      },
      {
        icon: "ri-user-search-line",
        title: "Face Detection",
        description:
          "Advanced facial recognition technology for secure and contactless attendance marking.",
      },
      {
        icon: "ri-cloud-line",
        title: "Cloud Sync",
        description:
          "Seamless data synchronization across all devices with secure cloud storage and backup.",
      },
      {
        icon: "ri-dashboard-line",
        title: "Analytics Dashboard",
        description:
          "Comprehensive analytics with detailed reports, charts, and attendance insights.",
      },
      {
        icon: "ri-shield-user-line",
        title: "Role-Based Login",
        description:
          "Secure authentication system with different access levels for students, teachers, and admins.",
      },
    ],
    h = [
      {
        title: "Dashboard Overview",
        image:
          "https://readdy.ai/api/search-image?query=modern%20dark%20themed%20attendance%20management%20dashboard%20with%20charts%20graphs%20and%20analytics%2C%20professional%20UI%20design%2C%20blue%20accents%2C%20clean%20interface&width=600&height=400&seq=dashboard-1&orientation=landscape",
      },
      {
        title: "Student Login Interface",
        image:
          "https://readdy.ai/api/search-image?query=sleek%20dark%20login%20screen%20for%20attendance%20system%20with%20modern%20form%20design%2C%20blue%20gradient%20buttons%2C%20professional%20layout&width=600&height=400&seq=login-1&orientation=landscape",
      },
      {
        title: "Attendance Tracking",
        image:
          "https://readdy.ai/api/search-image?query=attendance%20tracking%20interface%20with%20student%20list%2C%20checkboxes%2C%20dark%20theme%2C%20modern%20table%20design%2C%20blue%20highlights&width=600&height=400&seq=tracking-1&orientation=landscape",
      },
      {
        title: "Analytics Reports",
        image:
          "https://readdy.ai/api/search-image?query=attendance%20analytics%20dashboard%20with%20pie%20charts%20bar%20graphs%20dark%20theme%20blue%20accents%20professional%20data%20visualization&width=600&height=400&seq=analytics-1&orientation=landscape",
      },
    ];
  return w.jsxs("div", {
    className:
      "min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans",
    children: [
      w.jsx("nav", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          s
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        }`,
        children: w.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: w.jsxs("div", {
            className: "flex items-center justify-between h-16",
            children: [
              w.jsxs("div", {
                className: "flex items-center space-x-8",
                children: [
                  w.jsx("div", {
                    className:
                      "text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent",
                    children: "AMS Portfolio",
                  }),
                  w.jsx("div", {
                    className: "hidden md:flex space-x-6",
                    children: [
                      "home",
                      "about",
                      "features",
                      "screenshots",
                      "contact",
                    ].map((m) =>
                      w.jsx(
                        "button",
                        {
                          onClick: () => c(m),
                          className: `capitalize text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            r === m
                              ? "text-blue-400"
                              : "text-gray-300 hover:text-white"
                          }`,
                          children: m,
                        },
                        m
                      )
                    ),
                  }),
                ],
              }),
              w.jsxs(Lu, {
                to: "/",
                className:
                  "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer whitespace-nowrap",
                children: [
                  w.jsx("i", { className: "ri-home-line mr-2" }),
                  "Back to Platform",
                ],
              }),
            ],
          }),
        }),
      }),
      w.jsxs("section", {
        id: "home",
        className:
          "relative min-h-screen flex items-center justify-center overflow-hidden",
        children: [
          w.jsx("div", {
            className:
              "absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10",
          }),
          w.jsx("div", {
            className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
            style: {
              backgroundImage:
                "url('https://readdy.ai/api/search-image?query=futuristic%20dark%20workspace%20with%20laptop%20showing%20analytics%20dashboard%2C%20modern%20office%20setup%2C%20blue%20ambient%20lighting%2C%20professional%20tech%20environment&width=1920&height=1080&seq=hero-bg&orientation=landscape')",
            },
          }),
          w.jsx("div", {
            className: "relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: w.jsx("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
              children: w.jsxs("div", {
                className: "text-left",
                children: [
                  w.jsxs("h1", {
                    className:
                      "text-5xl md:text-7xl font-bold mb-6 leading-tight",
                    children: [
                      w.jsx("span", {
                        className:
                          "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                        children: "Attendance",
                      }),
                      w.jsx("br", {}),
                      w.jsx("span", {
                        className:
                          "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent",
                        children: "Management",
                      }),
                      w.jsx("br", {}),
                      w.jsx("span", {
                        className:
                          "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                        children: "System",
                      }),
                    ],
                  }),
                  w.jsx("p", {
                    className: "text-xl text-gray-300 mb-8 leading-relaxed",
                    children: "Smart, Secure & Automated Attendance Tracking",
                  }),
                  w.jsxs("div", {
                    className: "flex flex-col sm:flex-row gap-4 mb-8",
                    children: [
                      w.jsxs("button", {
                        className:
                          "bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap transform hover:scale-105",
                        children: [
                          w.jsx("i", { className: "ri-eye-line mr-2" }),
                          "View Project",
                        ],
                      }),
                      w.jsxs("button", {
                        className:
                          "bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap",
                        children: [
                          w.jsx("i", { className: "ri-download-line mr-2" }),
                          "Download Report",
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    className: "flex space-x-6",
                    children: [
                      w.jsx("a", {
                        href: "#",
                        className:
                          "w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer",
                        children: w.jsx("i", {
                          className: "ri-github-fill text-xl",
                        }),
                      }),
                      w.jsx("a", {
                        href: "#",
                        className:
                          "w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer",
                        children: w.jsx("i", {
                          className: "ri-linkedin-fill text-xl",
                        }),
                      }),
                      w.jsx("a", {
                        href: "#",
                        className:
                          "w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer",
                        children: w.jsx("i", {
                          className: "ri-mail-line text-xl",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          w.jsx("div", {
            className:
              "absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse",
          }),
          w.jsx("div", {
            className:
              "absolute bottom-20 left-20 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000",
          }),
        ],
      }),
      w.jsx("section", {
        id: "about",
        className: "py-20 relative",
        children: w.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: w.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
            children: [
              w.jsxs("div", {
                children: [
                  w.jsx("h2", {
                    className:
                      "text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                    children: "About the Project",
                  }),
                  w.jsxs("div", {
                    className: "space-y-6 text-gray-300",
                    children: [
                      w.jsx("p", {
                        className: "text-lg leading-relaxed",
                        children:
                          "The Attendance Management System is a comprehensive solution designed to modernize and streamline attendance tracking in educational institutions. Built with cutting-edge technology, it offers real-time monitoring, automated reporting, and secure data management.",
                      }),
                      w.jsxs("div", {
                        className:
                          "bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10",
                        children: [
                          w.jsx("h3", {
                            className: "text-xl font-semibold text-white mb-4",
                            children: "Technologies Used",
                          }),
                          w.jsxs("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className: "ri-html5-line text-orange-400",
                                  }),
                                  w.jsx("span", { children: "HTML5" }),
                                ],
                              }),
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className: "ri-css3-line text-blue-400",
                                  }),
                                  w.jsx("span", { children: "CSS3" }),
                                ],
                              }),
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className:
                                      "ri-javascript-line text-yellow-400",
                                  }),
                                  w.jsx("span", { children: "JavaScript" }),
                                ],
                              }),
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className: "ri-reactjs-line text-cyan-400",
                                  }),
                                  w.jsx("span", { children: "React" }),
                                ],
                              }),
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className:
                                      "ri-database-line text-green-400",
                                  }),
                                  w.jsx("span", { children: "Firebase" }),
                                ],
                              }),
                              w.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  w.jsx("i", {
                                    className: "ri-cloud-line text-purple-400",
                                  }),
                                  w.jsx("span", { children: "Cloud Storage" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      w.jsxs("div", {
                        className:
                          "bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10",
                        children: [
                          w.jsx("h3", {
                            className: "text-xl font-semibold text-white mb-4",
                            children: "Project Role",
                          }),
                          w.jsx("p", {
                            children:
                              "Lead Full-Stack Developer responsible for system architecture, UI/UX design, and backend implementation. Collaborated with a team of 3 developers to deliver a robust attendance management solution.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              w.jsxs("div", {
                className: "relative",
                children: [
                  w.jsx("div", {
                    className: "relative z-10",
                    children: w.jsx("img", {
                      src: "https://readdy.ai/api/search-image?query=professional%20software%20developer%20working%20on%20laptop%20in%20modern%20dark%20office%2C%20coding%20on%20screen%2C%20blue%20ambient%20lighting%2C%20tech%20workspace&width=500&height=600&seq=developer-1&orientation=portrait",
                      alt: "Professional Developer",
                      className: "w-full rounded-lg shadow-2xl opacity-80",
                    }),
                  }),
                  w.jsx("div", {
                    className:
                      "absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg",
                  }),
                  w.jsx("div", {
                    className:
                      "absolute -top-4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl",
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      w.jsx("section", {
        id: "features",
        className: "py-20 relative",
        children: w.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            w.jsxs("div", {
              className: "text-center mb-16",
              children: [
                w.jsx("h2", {
                  className:
                    "text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                  children: "Core Features",
                }),
                w.jsx("p", {
                  className: "text-xl text-gray-300 max-w-3xl mx-auto",
                  children:
                    "Discover the powerful features that make our attendance management system stand out",
                }),
              ],
            }),
            w.jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
              children: d.map((m, p) =>
                w.jsxs(
                  "div",
                  {
                    className:
                      "group bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105",
                    children: [
                      w.jsx("div", {
                        className:
                          "w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300",
                        children: w.jsx("i", {
                          className: `${m.icon} text-2xl text-white`,
                        }),
                      }),
                      w.jsx("h3", {
                        className:
                          "text-xl font-semibold text-white mb-4 text-center",
                        children: m.title,
                      }),
                      w.jsx("p", {
                        className: "text-gray-300 text-center leading-relaxed",
                        children: m.description,
                      }),
                    ],
                  },
                  p
                )
              ),
            }),
          ],
        }),
      }),
      w.jsx("section", {
        id: "screenshots",
        className: "py-20 relative",
        children: w.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            w.jsxs("div", {
              className: "text-center mb-16",
              children: [
                w.jsx("h2", {
                  className:
                    "text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                  children: "Project Screenshots",
                }),
                w.jsx("p", {
                  className: "text-xl text-gray-300 max-w-3xl mx-auto",
                  children:
                    "Explore the user interface and design of our attendance management system",
                }),
              ],
            }),
            w.jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-8",
              children: h.map((m, p) =>
                w.jsxs(
                  "div",
                  {
                    className:
                      "group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-all duration-300",
                    children: [
                      w.jsxs("div", {
                        className: "relative overflow-hidden",
                        children: [
                          w.jsx("img", {
                            src: m.image,
                            alt: m.title,
                            className:
                              "w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-110",
                          }),
                          w.jsx("div", {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          }),
                        ],
                      }),
                      w.jsxs("div", {
                        className: "p-6",
                        children: [
                          w.jsx("h3", {
                            className: "text-xl font-semibold text-white mb-2",
                            children: m.title,
                          }),
                          w.jsx("p", {
                            className: "text-gray-300",
                            children:
                              "Interactive UI component showcasing modern design principles",
                          }),
                        ],
                      }),
                      w.jsx("div", {
                        className:
                          "absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        children: w.jsx("i", {
                          className: "ri-external-link-line text-white text-sm",
                        }),
                      }),
                    ],
                  },
                  p
                )
              ),
            }),
          ],
        }),
      }),
      w.jsx("section", {
        id: "contact",
        className: "py-20 relative",
        children: w.jsxs("div", {
          className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            w.jsxs("div", {
              className: "text-center mb-16",
              children: [
                w.jsx("h2", {
                  className:
                    "text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
                  children: "Get In Touch",
                }),
                w.jsx("p", {
                  className: "text-xl text-gray-300",
                  children:
                    "Interested in collaborating or learning more about this project?",
                }),
              ],
            }),
            w.jsx("div", {
              className:
                "bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10",
              children: w.jsxs("form", {
                className: "space-y-6",
                children: [
                  w.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                      w.jsxs("div", {
                        children: [
                          w.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-300 mb-2",
                            children: "Name",
                          }),
                          w.jsx("input", {
                            type: "text",
                            className:
                              "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
                            placeholder: "Your Name",
                          }),
                        ],
                      }),
                      w.jsxs("div", {
                        children: [
                          w.jsx("label", {
                            className:
                              "block text-sm font-medium text-gray-300 mb-2",
                            children: "Email",
                          }),
                          w.jsx("input", {
                            type: "email",
                            className:
                              "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
                            placeholder: "your.email@example.com",
                          }),
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Subject",
                      }),
                      w.jsx("input", {
                        type: "text",
                        className:
                          "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors",
                        placeholder: "Project Inquiry",
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Message",
                      }),
                      w.jsx("textarea", {
                        rows: 6,
                        className:
                          "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none",
                        placeholder: "Tell me about your project or inquiry...",
                        maxLength: 500,
                      }),
                    ],
                  }),
                  w.jsx("div", {
                    className: "text-center",
                    children: w.jsxs("button", {
                      className:
                        "bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap transform hover:scale-105",
                      children: [
                        w.jsx("i", { className: "ri-send-plane-line mr-2" }),
                        "Send Message",
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      w.jsx("footer", {
        className: "py-12 border-t border-white/10",
        children: w.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: w.jsxs("div", {
            className: "flex flex-col md:flex-row items-center justify-between",
            children: [
              w.jsx("div", {
                className: "text-gray-400 mb-4 md:mb-0",
                children:
                  "© 2024 Attendance Management System Portfolio. All rights reserved.",
              }),
              w.jsxs("div", {
                className: "flex space-x-6",
                children: [
                  w.jsx("a", {
                    href: "#",
                    className:
                      "text-gray-400 hover:text-blue-400 transition-colors cursor-pointer",
                    children: w.jsx("i", {
                      className: "ri-github-line text-xl",
                    }),
                  }),
                  w.jsx("a", {
                    href: "#",
                    className:
                      "text-gray-400 hover:text-blue-400 transition-colors cursor-pointer",
                    children: w.jsx("i", {
                      className: "ri-linkedin-line text-xl",
                    }),
                  }),
                  w.jsx("a", {
                    href: "#",
                    className:
                      "text-gray-400 hover:text-blue-400 transition-colors cursor-pointer",
                    children: w.jsx("i", { className: "ri-mail-line text-xl" }),
                  }),
                  w.jsx("a", {
                    href: "https://readdy.ai/?origin=logo",
                    className:
                      "text-gray-400 hover:text-blue-400 transition-colors cursor-pointer",
                    children: w.jsx("i", {
                      className: "ri-global-line text-xl",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function Gb() {
  const r = To(),
    [i, s] = Y.useState({
      rollNumber: "",
      section: "",
      year: "",
      password: "",
    }),
    o = (h) => {
      const { name: m, value: p } = h.target;
      s((g) => ({ ...g, [m]: p }));
    },
    c = (h) => {
      h.preventDefault();
      const { rollNumber: m, section: p, year: g, password: v } = i;
      if (!m || !p || !g || !v) {
        console.error("All fields are required.");
        return;
      }
      console.log("Portfolio login attempt:", i), r("/portfolio");
    };
  return w.jsxs("div", {
    className:
      "min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4",
    children: [
      w.jsx("div", {
        className: "absolute inset-0 opacity-20",
        style: {
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          backgroundRepeat: "repeat",
        },
      }),
      w.jsxs("div", {
        className: "relative max-w-md w-full",
        children: [
          w.jsxs("div", {
            className: "text-center mb-8",
            children: [
              w.jsx("div", {
                className:
                  "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4",
                children: w.jsx("i", {
                  className: "ri-user-line text-2xl text-white",
                }),
              }),
              w.jsx("h1", {
                className:
                  "text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2",
                children: "Portfolio Access",
              }),
              w.jsx("p", {
                className: "text-gray-400",
                children: "Enter your credentials to view the portfolio",
              }),
            ],
          }),
          w.jsxs("div", {
            className:
              "backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl",
            children: [
              w.jsxs("form", {
                onSubmit: c,
                className: "space-y-6",
                children: [
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        htmlFor: "rollNumber",
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Roll Number",
                      }),
                      w.jsxs("div", {
                        className: "relative",
                        children: [
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-hashtag text-gray-400",
                            }),
                          }),
                          w.jsx("input", {
                            type: "text",
                            id: "rollNumber",
                            name: "rollNumber",
                            value: i.rollNumber,
                            onChange: o,
                            className:
                              "block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm backdrop-blur-sm",
                            placeholder: "Enter your roll number",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        htmlFor: "section",
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Section",
                      }),
                      w.jsxs("div", {
                        className: "relative",
                        children: [
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-group-line text-gray-400",
                            }),
                          }),
                          w.jsxs("select", {
                            id: "section",
                            name: "section",
                            value: i.section,
                            onChange: o,
                            className:
                              "block w-full pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm backdrop-blur-sm appearance-none cursor-pointer",
                            required: !0,
                            children: [
                              w.jsx("option", {
                                value: "",
                                children: "Select Section",
                              }),
                              w.jsx("option", {
                                value: "A",
                                children: "Section A",
                              }),
                              w.jsx("option", {
                                value: "B",
                                children: "Section B",
                              }),
                              w.jsx("option", {
                                value: "C",
                                children: "Section C",
                              }),
                              w.jsx("option", {
                                value: "D",
                                children: "Section D",
                              }),
                            ],
                          }),
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-arrow-down-s-line text-gray-400",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        htmlFor: "year",
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Academic Year",
                      }),
                      w.jsxs("div", {
                        className: "relative",
                        children: [
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-calendar-line text-gray-400",
                            }),
                          }),
                          w.jsxs("select", {
                            id: "year",
                            name: "year",
                            value: i.year,
                            onChange: o,
                            className:
                              "block w-full pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm backdrop-blur-sm appearance-none cursor-pointer",
                            required: !0,
                            children: [
                              w.jsx("option", {
                                value: "",
                                children: "Select Year",
                              }),
                              w.jsx("option", {
                                value: "1st",
                                children: "1st Year",
                              }),
                              w.jsx("option", {
                                value: "2nd",
                                children: "2nd Year",
                              }),
                              w.jsx("option", {
                                value: "3rd",
                                children: "3rd Year",
                              }),
                              w.jsx("option", {
                                value: "4th",
                                children: "4th Year",
                              }),
                            ],
                          }),
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-arrow-down-s-line text-gray-400",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    children: [
                      w.jsx("label", {
                        htmlFor: "password",
                        className:
                          "block text-sm font-medium text-gray-300 mb-2",
                        children: "Password",
                      }),
                      w.jsxs("div", {
                        className: "relative",
                        children: [
                          w.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: w.jsx("i", {
                              className: "ri-lock-line text-gray-400",
                            }),
                          }),
                          w.jsx("input", {
                            type: "password",
                            id: "password",
                            name: "password",
                            value: i.password,
                            onChange: o,
                            className:
                              "block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm backdrop-blur-sm",
                            placeholder: "Enter your password",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  w.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      w.jsx("input", {
                        id: "remember-portfolio",
                        name: "remember-portfolio",
                        type: "checkbox",
                        className:
                          "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-white/5 cursor-pointer",
                      }),
                      w.jsx("label", {
                        htmlFor: "remember-portfolio",
                        className:
                          "ml-2 block text-sm text-gray-300 cursor-pointer",
                        children: "Remember me for this session",
                      }),
                    ],
                  }),
                  w.jsxs("button", {
                    type: "submit",
                    className:
                      "w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap transform hover:scale-105",
                    children: [
                      w.jsx("i", { className: "ri-login-circle-line mr-2" }),
                      "Access Portfolio",
                    ],
                  }),
                ],
              }),
              w.jsx("div", {
                className: "mt-6 text-center",
                children: w.jsxs("p", {
                  className: "text-sm text-gray-400",
                  children: [
                    "Need access?",
                    " ",
                    w.jsx("button", {
                      className:
                        "text-blue-400 hover:text-blue-300 font-medium cursor-pointer whitespace-nowrap",
                      children: "Contact Administrator",
                    }),
                  ],
                }),
              }),
            ],
          }),
          w.jsx("div", {
            className: "text-center mt-6",
            children: w.jsxs(Lu, {
              to: "/",
              className:
                "inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap",
              children: [
                w.jsx("i", { className: "ri-arrow-left-line mr-2" }),
                "Back to Study Hub",
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
const Vb = Y.lazy(() => Yt(() => import("./page-DEM0Aday.js"), [])),
  Qb = Y.lazy(() => Yt(() => import("./page-CUS_J7QC.js"), [])),
  Xb = Y.lazy(() => Yt(() => import("./page-DGnmMjxR.js"), [])),
  Zb = Y.lazy(() => Yt(() => import("./page-Dmm3G2MT.js"), [])),
  Kb = Y.lazy(() => Yt(() => import("./page-BIq4jz1s.js"), [])),
  kb = Y.lazy(() => Yt(() => import("./page-DmvjPWUz.js"), [])),
  Jb = Y.lazy(() => Yt(() => import("./page-87hYISML.js"), [])),
  $b = Y.lazy(() => Yt(() => import("./NotFound-Ca3mRRNM.js"), [])),
  fg = [
    { path: "/", element: w.jsx(Vb, {}) },
    { path: "/notes", element: w.jsx(Qb, {}) },
    { path: "/exam-papers", element: w.jsx(Xb, {}) },
    { path: "/study-materials", element: w.jsx(Zb, {}) },
    { path: "/college-info", element: w.jsx(Kb, {}) },
    { path: "/login", element: w.jsx(kb, {}) },
    { path: "/teacher-dashboard", element: w.jsx(Jb, {}) },
    { path: "/portfolio", element: w.jsx(Yb, {}) },
    { path: "/portfolio/login", element: w.jsx(Gb, {}) },
    { path: "*", element: w.jsx($b, {}) },
  ],
  Fb = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: fg },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
let dg;
const Wb = new Promise((r) => {
  dg = r;
});
function hg() {
  const r = Jv(fg),
    i = To();
  return (
    Y.useEffect(() => {
      (window.REACT_APP_NAVIGATE = i), dg(window.REACT_APP_NAVIGATE);
    }),
    r
  );
}
const Pb = Object.freeze(
  Object.defineProperty(
    { __proto__: null, AppRoutes: hg, navigatePromise: Wb },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Ib() {
  return w.jsx(Rb, {
    basename: "/preview/76b93b74-c86e-45a5-a04d-8fb07c51523c/3859454",
    children: w.jsx(hg, {}),
  });
}
vv.createRoot(document.getElementById("root")).render(
  w.jsx(Y.StrictMode, { children: w.jsx(Ib, {}) })
);
export { Lu as L, w as j, Y as r };
//# sourceMappingURL=index-c1Wx4pYN.js.map
