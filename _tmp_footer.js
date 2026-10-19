/*! Central de Rodapé da Agência - embed */
(function () {
  var render = function renderFooter(c, opts) {
	var S = opts && opts.scope || ".agf";
	var paused = !!(opts && opts.paused);
	var forceReduced = !!(opts && opts.reduced);
	var esc = function(s) {
		return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	};
	var isHex = function(h) {
		return typeof h === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(h);
	};
	var rgba = function(h, a) {
		var x = String(h).replace("#", "");
		if (x.length === 3) x = x.charAt(0) + x.charAt(0) + x.charAt(1) + x.charAt(1) + x.charAt(2) + x.charAt(2);
		var n = parseInt(x, 16) || 0;
		return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + Math.max(0, Math.min(1, a)) + ")";
	};
	var r2 = function(n) {
		return Math.round(n * 1e3) / 1e3;
	};
	var safeUrl = /^https?:\/\//i.test(String(c.url || "")) ? String(c.url) : "#";
	var hf = c.heartFx || {}, wf = c.waveFx || {}, af = c.agencyFx || {}, cf = c.colorFx || {}, br = c.brand || {}, px = c.phoenix || {};
	var pal = br.palette || {};
	var src = br.colorSource;
	var mode = c.appearance;
	if (src === "transparentFx" && mode === "own") mode = "transparent";
	var adaptOn = mode === "adapt" || src === "adapt";
	var P = isHex(pal.primary) ? pal.primary : c.heartColor;
	var Sx = isHex(pal.secondary) ? pal.secondary : P;
	var A = isHex(pal.accent) ? pal.accent : Sx;
	var logoSrc = src === "logo" || src === "logoGradient" || src === "transparentFx";
	var mono = src === "mono";
	var family = {
		Arial: "Arial, sans-serif",
		Helvetica: "Helvetica, Arial, sans-serif",
		Georgia: "Georgia, serif",
		"system-ui": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
		"Playfair Display": "'Playfair Display', Georgia, serif"
	}[c.fontFamily] || "'" + c.fontFamily + "', system-ui, -apple-system, 'Segoe UI', sans-serif";
	if (adaptOn && c.inheritFont) family = "inherit";
	var cpk = c.colorPick || {};
	var pickC = function(k, fb) {
		var m = cpk[k];
		if (!m || m === "manual") return fb;
		if (m === "adapt") return "currentColor";
		var comp = pal.complements || [];
		var val = m === "c1" ? comp[0] : m === "c2" ? comp[1] : pal[m];
		return isHex(val) ? val : fb;
	};
	var picked = function(k) {
		return !!cpk[k] && cpk[k] !== "manual";
	};
	var textCol = "var(--agf-text," + pickC("text", mono ? c.textColor : adaptOn && c.inheritText ? "currentColor" : c.textColor) + ")";
	var heartCol = pickC("heart", mono ? c.textColor : logoSrc ? A : c.heartColor);
	var nameMode = af.colorMode;
	if (src === "logo") nameMode = "logo";
	else if (src === "logoGradient" || src === "transparentFx") nameMode = "logoGradient";
	else if (src === "adapt") nameMode = "adapt";
	else if (mono) nameMode = "fixed";
	var nameBase = pickC("name", mono ? c.textColor : nameMode === "logo" ? P : nameMode === "adapt" ? "currentColor" : c.linkColor);
	var nameCol = picked("name") ? nameBase : "var(--agf-link," + nameBase + ")";
	var gradName = nameMode === "logoGradient" && !picked("name") || !!af.gradient;
	var nameGrad = af.gradient ? "linear-gradient(90deg," + af.gradA + "," + af.gradB + (af.gradThree ? "," + af.gradC : "") + ")" : "linear-gradient(90deg," + P + "," + Sx + "," + A + ")";
	var hoverCol = pickC("nameHover", adaptOn && nameMode === "adapt" ? heartCol : c.linkHoverColor);
	var glowCol = af.customGlow && isHex(af.glowColor) ? af.glowColor : "";
	var waveCol = pickC("wave", wf.colorMode === "custom" ? wf.color : heartCol);
	var pxCol = pickC("phoenix", px.colorMode === "logo" ? P : px.colorMode === "mono" || mono ? adaptOn ? "currentColor" : c.textColor : px.color);
	var bg = "transparent";
	if (mode === "own") bg = c.bgGradient ? "linear-gradient(" + c.bgAngle + "deg," + rgba(c.bgColor, c.bgOpacity / 100) + "," + rgba(c.bgColor2, c.bgOpacity / 100) + ")" : rgba(c.bgColor, c.bgOpacity / 100);
	var deco = mode !== "textonly";
	var justify = function(a) {
		return a === "left" ? "flex-start" : a === "right" ? "flex-end" : "center";
	};
	var bp = function(b) {
		b = b || {
			fontSize: 14,
			paddingTop: 16,
			paddingX: 16,
			paddingBottom: 16,
			align: "center",
			wrap: true,
			heartSize: 14
		};
		return S + " .agf-inner{font-size:" + b.fontSize + "px;padding:" + b.paddingTop + "px " + b.paddingX + "px " + b.paddingBottom + "px;justify-content:" + justify(b.align) + ";text-align:" + b.align + ";flex-wrap:" + (b.wrap ? "wrap" : "nowrap") + ";white-space:" + (b.wrap ? "normal" : "nowrap") + "}" + S + " .agf-hw{font-size:" + b.heartSize + "px}";
	};
	var k = Number(hf.intensity);
	var kf = "@keyframes agf-soft{0%,100%{transform:scale(1)}50%{transform:scale(" + r2(1 + .14 * k) + ")}}@keyframes agf-beat{0%,40%,100%{transform:scale(1)}10%{transform:scale(" + r2(1 + .22 * k) + ")}20%{transform:scale(1)}30%{transform:scale(" + r2(1 + .14 * k) + ")}}@keyframes agf-double{0%,100%{transform:scale(1)}8%{transform:scale(" + r2(1 + .24 * k) + ")}16%{transform:scale(1)}24%{transform:scale(" + r2(1 + .24 * k) + ")}34%{transform:scale(1)}}@keyframes agf-glow{0%,100%{filter:drop-shadow(0 0 0 " + heartCol + ")}50%{filter:drop-shadow(0 0 " + r2(2 + 5 * k) + "px " + heartCol + ")}}@keyframes agf-scale{0%,100%{transform:scale(1)}40%{transform:scale(" + r2(1 + .3 * k) + ")}70%{transform:scale(" + r2(1 - .1 * k) + ")}}@keyframes agf-float{0%,100%{transform:translateY(0)}50%{transform:translateY(" + r2(-3 * k) + "px)}}";
	var it = Number(hf.iterations) > 0 ? String(hf.iterations) : "infinite";
	var hd = hf.speed + "s", hdl = hf.delay + "s";
	var heartAnim = function(name) {
		return name + " " + hd + " ease-in-out " + hdl + " " + it;
	};
	var hmap = {
		soft: heartAnim("agf-soft"),
		beat: heartAnim("agf-beat"),
		double: heartAnim("agf-double"),
		glow: heartAnim("agf-glow"),
		glowpulse: heartAnim("agf-soft") + "," + heartAnim("agf-glow"),
		scale: heartAnim("agf-scale"),
		float: heartAnim("agf-float")
	};
	var heartCss = k > 0 && hmap[hf.type] ? hmap[hf.type] : "";
	var wt = wf.type;
	var wk = Number(wf.intensity);
	var wCount = wt === "one" ? 1 : wt === "two" ? 2 : wt === "three" ? 3 : wt === "sonar" || wt === "ripple" ? Number(wf.count) : 1;
	var waveHtml = "";
	var waveCss = "";
	if (wt !== "none" && wk > 0) {
		var s0 = Number(wf.startSize), s1 = s0 + (Number(wf.endSize) - s0) * Math.min(1, wk);
		var o0 = Math.min(1, Number(wf.opStart) * Math.max(.3, wk)), o1 = Number(wf.opEnd);
		var wd = wf.speed + "s";
		var ringBase = S + " .agf-wv{position:absolute;left:50%;top:50%;pointer-events:none;line-height:1;font-size:1em;font-weight:" + hf.weight + ";";
		if (wt === "ring") waveCss = ringBase + "color:transparent;-webkit-text-stroke:" + wf.thickness + "px " + waveCol + ";opacity:" + o0 + ";transform:translate(-50%,-50%) scale(" + s1 + ");text-shadow:0 0 " + r2(4 + 6 * wk) + "px " + waveCol + ";animation:agf-ring " + wd + " ease-in-out infinite}@keyframes agf-ring{0%,100%{opacity:" + o0 + "}50%{opacity:" + r2(o0 * .45) + "}}";
		else if (wt === "halo" || wt === "halopulse") waveCss = ringBase + "color:" + (isHex(waveCol) ? rgba(waveCol, o0) : waveCol) + ";filter:blur(" + wf.thickness + "px);transform:translate(-50%,-50%) scale(" + s1 + ");" + (wt === "halopulse" ? "animation:agf-halo " + wd + " ease-in-out infinite" : "") + "}@keyframes agf-halo{0%,100%{transform:translate(-50%,-50%) scale(" + s0 + ");opacity:" + o0 + "}50%{transform:translate(-50%,-50%) scale(" + s1 + ");opacity:" + r2(o0 * .5) + "}}";
		else waveCss = ringBase + "color:" + (wt === "ripple" && isHex(waveCol) ? rgba(waveCol, .5) : waveCol) + ";opacity:0;transform:translate(-50%,-50%) scale(" + s0 + ");animation:agf-sonar " + wd + " cubic-bezier(.2,.6,.4,1) infinite}@keyframes agf-sonar{0%{transform:translate(-50%,-50%) scale(" + s0 + ");opacity:" + o0 + "}100%{transform:translate(-50%,-50%) scale(" + r2(s1) + ");opacity:" + o1 + "}}";
		for (var w = 0; w < wCount; w++) waveHtml += "<span class=\"agf-wv\" aria-hidden=\"true\" style=\"animation-delay:" + r2(w * Number(wf.gap)) + "s\">" + esc(c.heart) + "</span>";
	}
	var as = af.speed + "s", ak = Number(af.intensity);
	var nameAnim = "";
	var nameExtra = "";
	if (af.type === "shine") {
		nameExtra = "background:linear-gradient(100deg," + (gradName ? P : nameBase) + " 40%," + rgba("#ffffff", .5 + .25 * ak) + " 50%," + (gradName ? A : nameBase) + " 60%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;";
		nameAnim = "agf-shine " + as + " linear infinite";
	} else if (af.type === "glow") nameAnim = "agf-nglow " + as + " ease-in-out infinite";
	else if (af.type === "colorShift") nameAnim = "agf-shift " + as + " ease-in-out infinite";
	else if (af.type === "underline") nameAnim = "";
	else if (af.type === "pulse") nameAnim = "agf-npulse " + as + " ease-in-out infinite";
	else if (af.type === "enter") nameAnim = "agf-enter " + as + " ease-out 1 both";
	else if (af.type === "sameAsHeart") nameAnim = heartCss;
	var nameCss = S + " .agf-link{display:inline-flex;align-items:center;position:relative;font:inherit;font-size:" + af.scale + "em;font-weight:" + c.agencyWeight + ";letter-spacing:inherit;text-transform:inherit;line-height:1.2;text-decoration:" + (c.underline ? "underline" : "none") + ";" + (gradName && af.type !== "shine" ? "background:" + nameGrad + ";background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:" + P + ";" : "color:" + nameCol + ";") + nameExtra + (nameAnim ? "animation:" + nameAnim + ";" : "") + (c.transition ? "transition:color .2s ease,text-shadow .2s ease,transform .2s ease;" : "") + "}@keyframes agf-shine{0%{background-position:150% 0}100%{background-position:-100% 0}}@keyframes agf-nglow{0%,100%{text-shadow:0 0 0 transparent}50%{text-shadow:0 0 " + r2(3 + 6 * ak) + "px " + (glowCol || (gradName ? P : heartCol)) + "}}@keyframes agf-shift{0%,100%{color:" + (logoSrc || gradName ? P : c.linkColor) + "}50%{color:" + (logoSrc || gradName ? A : heartCol) + "}}@keyframes agf-npulse{0%,100%{transform:scale(1)}50%{transform:scale(" + r2(1 + .06 * ak) + ")}}@keyframes agf-enter{from{opacity:0;transform:translateY(" + r2(4 * ak) + "px)}to{opacity:1;transform:none}}" + (af.type === "underline" ? S + " .agf-link::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:" + Math.max(1, Math.round(ak * 1.5)) + "px;background:" + (gradName ? nameGrad : heartCol) + ";transform-origin:left;animation:agf-uline " + as + " ease-in-out infinite;pointer-events:none}@keyframes agf-uline{0%{transform:scaleX(0)}50%{transform:scaleX(1)}100%{transform:scaleX(0);transform-origin:right}}" : "") + (af.type === "hover" ? S + " .agf-link:hover{transform:translateY(-1px) scale(" + r2(1 + .04 * ak) + ");text-shadow:0 0 " + r2(4 + 6 * ak) + "px " + (glowCol || heartCol) + "}" : "");
	var hoverColor = c.hoverEffect === "color" || c.hoverEffect === "both";
	var hoverUnder = c.hoverEffect === "underline" || c.hoverEffect === "both";
	var cfList = cf.useLogo && isHex(pal.primary) ? [
		P,
		Sx,
		A
	].concat(pal.complements || []) : [
		heartCol,
		isHex(c.linkColor) ? c.linkColor : P,
		"#f59e0b",
		"#8b5cf6",
		"#06b6d4"
	];
	if (picked("fx")) cfList = [pickC("fx", cfList[0] || heartCol)].concat(cfList);
	if (cf.customColors) cfList = [
		cf.colorA,
		cf.colorB,
		cf.colorC
	];
	else if (cf.type === "gold" && !picked("fx")) cfList = [
		"#f5c542",
		"#ffd86b",
		"#e0a800"
	];
	else if (cf.type === "snow" && !picked("fx")) cfList = [
		"#ffffff",
		"#e0f2fe",
		"#cbd5e1"
	];
	cfList = cfList.filter(function(x) {
		return isHex(x);
	}).slice(0, cf.customColors ? 3 : Number(cf.colors));
	if (cfList.length < 2) cfList.push(cfList[0] || "#e11d48");
	var cOp = Math.min(1, Number(cf.opacity) * Math.max(.2, Number(cf.intensity)));
	var cs = cf.speed + "s";
	var isBgFx = cf.type === "solid" || cf.type === "linear" || cf.type === "radial" || cf.type === "animated";
	var fxOn = cf.type !== "none" && !(isBgFx && cf.respectTransparent && mode !== "own");
	var fxCss = "", fxHtml = "";
	if (fxOn) {
		var stops = cfList.join(",");
		var layer = S + " .agf-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;opacity:" + r2(cOp) + ";border-radius:inherit}";
		if (cf.type === "solid") fxCss = layer + S + " .agf-fx{background:" + cfList[0] + "}";
		else if (cf.type === "linear") fxCss = layer + S + " .agf-fx{background:linear-gradient(" + cf.angle + "deg," + stops + ")}";
		else if (cf.type === "radial") fxCss = layer + S + " .agf-fx{background:radial-gradient(circle at center," + stops + ",transparent 80%)}";
		else if (cf.type === "animated") fxCss = layer + S + " .agf-fx{background:linear-gradient(" + cf.angle + "deg," + stops + "," + cfList[0] + ");background-size:300% 300%;animation:agf-grad " + cs + " ease infinite}@keyframes agf-grad{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}";
		else if (cf.type === "shine") fxCss = layer + S + " .agf-fx::before{content:'';position:absolute;top:0;bottom:0;width:40%;left:-40%;background:linear-gradient(" + cf.angle + "deg,transparent," + rgba(cfList[0], .9) + "," + rgba(cfList[1], .6) + ",transparent);filter:blur(" + cf.blur / 2 + "px);animation:agf-sweep " + cs + " linear infinite}@keyframes agf-sweep{to{left:100%}}";
		else if (cf.type === "neon") fxCss = S + " .agf-inner{text-shadow:0 0 " + r2(2 + cf.blur / 4) + "px " + rgba(cfList[0], cOp) + ",0 0 " + r2(4 + cf.blur / 2) + "px " + rgba(cfList[1], cOp * .8) + "}";
		else if (cf.type === "aura") fxCss = layer + S + " .agf-fx::before{content:'';position:absolute;left:20%;right:20%;top:15%;bottom:15%;border-radius:50%;background:radial-gradient(ellipse," + stops + ");filter:blur(" + cf.blur + "px);animation:agf-aura " + cs + " ease-in-out infinite}@keyframes agf-aura{0%,100%{opacity:.6;transform:scale(.92)}50%{opacity:1;transform:scale(1.05)}}";
		else if (cf.type === "particles") {
			fxCss = layer + S + " .agf-pt{position:absolute;bottom:0;width:3px;height:3px;border-radius:50%;opacity:0;animation:agf-rise " + cs + " ease-in infinite}@keyframes agf-rise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-40px);opacity:0}}";
			for (var q = 0; q < 8; q++) fxHtml += "<span class=\"agf-pt\" style=\"left:" + (8 + q * 12) + "%;background:" + cfList[q % cfList.length] + ";animation-delay:" + r2(q * Number(cf.speed) / 8) + "s\"></span>";
		} else if (cf.type === "spectrum") fxCss = layer + S + " .agf-fx{top:auto;height:2px;opacity:" + r2(Math.max(.3, cOp)) + ";background:linear-gradient(90deg," + stops + "," + cfList[0] + ");background-size:200% 100%;animation:agf-spec " + cs + " linear infinite}@keyframes agf-spec{to{background-position:-200% 0}}";
		else if (cf.type === "aurora") fxCss = layer + S + " .agf-fx::before{content:'';position:absolute;left:-20%;right:-20%;top:-60%;bottom:-60%;background:linear-gradient(" + cf.angle + "deg," + stops + "," + cfList[0] + ");background-size:300% 100%;filter:blur(" + cf.blur + "px);animation:agf-aur " + cs + " ease-in-out infinite alternate}@keyframes agf-aur{0%{background-position:0% 50%;transform:skewY(-4deg)}100%{background-position:100% 50%;transform:skewY(4deg)}}";
		else if (cf.type === "rays") fxCss = layer + S + " .agf-fx::before{content:'';position:absolute;left:50%;top:50%;width:200vmax;height:200vmax;margin:-100vmax 0 0 -100vmax;background:repeating-conic-gradient(from 0deg," + rgba(cfList[0], .9) + " 0deg 6deg,transparent 6deg 30deg," + rgba(cfList[1], .7) + " 30deg 36deg,transparent 36deg 60deg);filter:blur(" + r2(cf.blur / 4) + "px);animation:agf-rays " + cs + " linear infinite}@keyframes agf-rays{to{transform:rotate(360deg)}}";
		else if (cf.type !== "none") {
			var rnd = function(i, sd) {
				var x = Math.sin(i * 12.9898 + sd * 78.233) * 43758.5453;
				return x - Math.floor(x);
			};
			var n = Math.max(1, Math.min(40, Math.round(Number(cf.count) || 12)));
			var sz = Math.max(1, Number(cf.size) || 4);
			var t = cf.type;
			var glyph = t === "stars" ? "✦" : t === "hearts" ? esc(c.heart || "♥") : "";
			var kfName = t === "confetti" || t === "snow" ? "agf-fall" : t === "stars" || t === "gold" ? "agf-twk" : t === "fireflies" ? "agf-wan" : "agf-up";
			fxCss = S + " .agf-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;border-radius:inherit;opacity:" + r2(Math.min(1, cOp * 3)) + "}" + S + " .agf-p2{position:absolute;display:block;line-height:1;opacity:0;pointer-events:none;animation-name:" + kfName + ";animation-iteration-count:infinite;animation-timing-function:ease-in-out}@keyframes agf-fall{0%{transform:translateY(-12px) rotate(0);opacity:0}15%{opacity:1}100%{transform:translateY(70px) rotate(360deg);opacity:0}}@keyframes agf-up{0%{transform:translateY(10px) scale(.8);opacity:0}20%{opacity:1}100%{transform:translateY(-60px) scale(1.1);opacity:0}}@keyframes agf-twk{0%,100%{transform:scale(.4);opacity:0}50%{transform:scale(1);opacity:1}}@keyframes agf-wan{0%,100%{transform:translate(0,0);opacity:.2}25%{transform:translate(8px,-6px);opacity:1}50%{transform:translate(-6px,-10px);opacity:.5}75%{transform:translate(-10px,4px);opacity:1}}";
			for (var q = 0; q < n; q++) {
				var col = cfList[q % cfList.length];
				var s2 = r2(sz * (.6 + rnd(q, 3) * .8));
				var dur = r2(Number(cf.speed) * (.6 + rnd(q, 5) * .8));
				var dl = r2(rnd(q, 7) * Number(cf.speed));
				var top = kfName === "agf-fall" ? 0 : kfName === "agf-up" ? 80 + rnd(q, 2) * 15 : 10 + rnd(q, 2) * 75;
				var st = "left:" + r2(rnd(q, 1) * 96 + 2) + "%;top:" + r2(top) + "%;animation-duration:" + dur + "s;animation-delay:" + dl + "s;";
				if (glyph) st += "font-size:" + r2(s2 * 2.4) + "px;color:" + col + ";" + (t === "stars" ? "text-shadow:0 0 " + r2(s2) + "px " + col + ";" : "");
				else if (t === "bubbles") st += "width:" + r2(s2 * 2) + "px;height:" + r2(s2 * 2) + "px;border-radius:50%;border:1px solid " + col + ";background:" + rgba(col, .15) + ";";
				else if (t === "confetti") st += "width:" + s2 + "px;height:" + r2(s2 * 1.6) + "px;background:" + col + ";border-radius:1px;";
				else st += "width:" + s2 + "px;height:" + s2 + "px;border-radius:50%;background:" + col + ";" + (t === "fireflies" || t === "sparks" || t === "gold" ? "box-shadow:0 0 " + r2(s2 * 2) + "px " + col + ";" : "");
				fxHtml += "<span class=\"agf-p2\" style=\"" + st + "\">" + glyph + "</span>";
			}
		}
		if (cf.type !== "neon") fxHtml = "<span class=\"agf-fx\" aria-hidden=\"true\">" + fxHtml + "</span>";
	}
	var phx = "";
	var phxCss = "";
	var useLogoPhx = br.logoUsage === "phoenix" && /^(https:\/\/|data:image\/(png|webp|jpeg);base64,)/i.test(br.logoUrl);
	if (px.variant !== "none" || useLogoPhx) {
		var v = px.variant;
		var PXL = "data:image/webp;base64,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";
		var PXR = "data:image/webp;base64,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";
		var maskV = v === "silhouette" || v === "lines" || px.colorMode === "mono";
		var half = function(cls, u) {
			return "<span class=\"pw " + cls + "\" style=\"" + (maskV ? "background-color:currentColor;-webkit-mask:url(" + u + ") center/100% 100% no-repeat;mask:url(" + u + ") center/100% 100% no-repeat" : "background:url(" + u + ") center/100% 100% no-repeat") + "\"></span>";
		};
		var inner = half("pl", PXL) + half("pr", PXR);
		if (v === "particles") inner += "<i class=\"pp\"></i><i class=\"pp\"></i><i class=\"pp\"></i>";
		if (v === "glow") inner += "<i class=\"psh\"></i>";
		phx = useLogoPhx ? "<img class=\"agf-px\" alt=\"\" aria-hidden=\"true\" src=\"" + esc(br.logoUrl) + "\">" : "<span class=\"agf-px agf-px-" + v + "\" aria-hidden=\"true\">" + inner + "</span>";
		var pd = px.speed + "s", pk = Number(px.intensity);
		var va = px.valign === "baseline" ? "align-self:baseline;vertical-align:baseline;" : "align-self:center;vertical-align:middle;";
		var neg = "margin-top:calc((1em - " + px.size + "px)/2);margin-bottom:calc((1em - " + px.size + "px)/2);";
		var pw = r2(px.size * 1.22), pc = isHex(pxCol) ? pxCol : heartCol;
		phxCss = S + " .agf-px{position:relative;display:inline-flex;flex:none;height:" + px.size + "px;width:" + pw + "px;color:" + pxCol + ";" + va + neg + (px.position === "after" ? "margin-left:" + px.gap + "px;" : "margin-right:" + px.gap + "px;") + "overflow:visible;" + (v === "silhouette" ? "opacity:.92;" : "") + (v === "lines" ? "opacity:.85;" : "") + "}" + S + " img.agf-px{width:auto;max-width:" + px.size * 2 + "px}" + S + " .agf-px .pw{display:block;width:50%;height:100%;will-change:transform}" + S + " .agf-px .pl{transform-origin:100% 52%}" + S + " .agf-px .pr{transform-origin:0 52%}" + S + " .agf-px .pp{position:absolute;left:50%;bottom:8%;width:2px;height:2px;border-radius:50%;background:" + pc + ";opacity:0}" + S + " .agf-px .pp:nth-of-type(1){background:#ff5a1f;margin-left:-3px}" + S + " .agf-px .pp:nth-of-type(2){background:#21c55d}" + S + " .agf-px .pp:nth-of-type(3){background:#1fa2ff;margin-left:3px}" + S + " .agf-px .psh{position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.75) 50%,transparent 65%) -150% 0/250% 100% no-repeat;-webkit-mask:linear-gradient(#000,#000);mix-blend-mode:overlay}" + (v === "lines" ? S + " .agf-px{filter:drop-shadow(0 0 .5px currentColor)}" : "") + (px.glow && (v === "glow" || v === "neon") ? S + " .agf-px{filter:drop-shadow(0 0 " + r2(1 + 3 * pk) + "px " + pc + ")}" : "") + "@keyframes agf-pbob{0%,100%{transform:translateY(0)}50%{transform:translateY(" + r2(-2 * pk) + "px)}}@keyframes agf-popl{0%,100%{transform:rotate(" + r2(10 * pk) + "deg) scaleX(" + r2(1 - .15 * pk) + ")}50%{transform:rotate(0) scaleX(1)}}@keyframes agf-popr{0%,100%{transform:rotate(" + r2(-10 * pk) + "deg) scaleX(" + r2(1 - .15 * pk) + ")}50%{transform:rotate(0) scaleX(1)}}@keyframes agf-pfl{0%,100%{transform:rotate(" + r2(-14 * pk) + "deg)}50%{transform:rotate(" + r2(24 * pk) + "deg) scaleY(" + r2(1 - .1 * pk) + ")}}@keyframes agf-pfr{0%,100%{transform:rotate(" + r2(14 * pk) + "deg)}50%{transform:rotate(" + r2(-24 * pk) + "deg) scaleY(" + r2(1 - .1 * pk) + ")}}@keyframes agf-pfly{0%{transform:translate(0,0)}25%{transform:translate(" + r2(2 * pk) + "px," + r2(-2 * pk) + "px)}50%{transform:translate(0," + r2(-3 * pk) + "px)}75%{transform:translate(" + r2(-2 * pk) + "px," + r2(-1 * pk) + "px)}100%{transform:translate(0,0)}}@keyframes agf-pdraw{0%{clip-path:inset(100% 0 0 0)}55%,100%{clip-path:inset(0 0 0 0)}}@keyframes agf-pglow{0%,100%{filter:drop-shadow(0 0 1px " + pc + ")}50%{filter:drop-shadow(0 0 " + r2(2 + 5 * pk) + "px " + pc + ")}}@keyframes agf-pneon{0%,100%{filter:drop-shadow(0 0 2px #ff5a1f) drop-shadow(0 0 " + r2(2 + 3 * pk) + "px #ff9d00)}50%{filter:drop-shadow(0 0 2px #1fa2ff) drop-shadow(0 0 " + r2(2 + 4 * pk) + "px #21c55d)}}@keyframes agf-pgeo{0%,100%{transform:rotate(" + r2(-4 * pk) + "deg)}50%{transform:rotate(" + r2(4 * pk) + "deg)}}@keyframes agf-psh{0%{background-position:-150% 0}60%,100%{background-position:250% 0}}@keyframes agf-prise{0%{transform:translateY(0);opacity:1}100%{transform:translateY(" + r2(6 + 4 * pk) + "px);opacity:0}}@keyframes agf-pbreath{0%,100%{transform:scale(1)}50%{transform:scale(" + r2(1 + .08 * pk) + ")}}";
		var an = function(k, d, e) {
			return "animation:" + k + " " + d + " " + (e || "ease-in-out") + " infinite";
		};
		var flapD = r2(px.speed / 3) + "s";
		var pm = {
			minimal: S + " .agf-px{" + an("agf-pbob", pd) + "}",
			open: S + " .agf-px .pl{" + an("agf-popl", pd) + "}" + S + " .agf-px .pr{" + an("agf-popr", pd) + "}",
			flap: S + " .agf-px .pl{" + an("agf-pfl", flapD) + "}" + S + " .agf-px .pr{" + an("agf-pfr", flapD) + "}",
			flight: S + " .agf-px{" + an("agf-pfly", pd) + "}" + S + " .agf-px .pl{" + an("agf-pfl", r2(px.speed / 2.5) + "s") + "}" + S + " .agf-px .pr{" + an("agf-pfr", r2(px.speed / 2.5) + "s") + "}",
			lines: S + " .agf-px .pw{" + an("agf-pdraw", pd) + " alternate}",
			neon: S + " .agf-px{" + an("agf-pneon", pd) + "}",
			glow: (px.glow ? S + " .agf-px{" + an("agf-pglow", pd) + "}" : "") + S + " .agf-px .psh{" + an("agf-psh", pd, "linear") + "}",
			geometric: S + " .agf-px{" + an("agf-pgeo", pd) + "}",
			particles: S + " .agf-px .pp{" + an("agf-prise", r2(px.speed / 1.5) + "s", "ease-in") + "}" + S + " .agf-px .pp:nth-of-type(2){animation-delay:.3s}" + S + " .agf-px .pp:nth-of-type(3){animation-delay:.6s}" + S + " .agf-px{" + an("agf-pbob", pd) + "}",
			silhouette: S + " .agf-px{" + an("agf-pbreath", pd) + "}"
		};
		if (px.motion && pk > 0) phxCss += useLogoPhx ? S + " .agf-px{animation:agf-pbob " + pd + " ease-in-out infinite}" : pm[v] || "";
		if (px.valign === "float" && px.motion) phxCss += S + " .agf-px{animation:agf-pbob " + pd + " ease-in-out infinite}";
	}
	var logoHtml = br.logoUsage === "show" && /^(https:\/\/|data:image\/(png|webp|jpeg);base64,)/i.test(br.logoUrl) ? "<img class=\"agf-logo\" alt=\"\" aria-hidden=\"true\" src=\"" + esc(br.logoUrl) + "\">" : "";
	var css = S + "{" + (adaptOn ? "color:inherit;font:inherit;text-align:initial;" : "all:initial;") + "display:block;container-type:inline-size;width:100%;max-width:100%;box-sizing:border-box}" + S + " *{box-sizing:border-box}" + S + " .agf-wrap{position:relative;overflow-x:clip;background:" + bg + ";min-height:" + c.minHeight + "px;display:flex;flex-direction:column;justify-content:center;" + (deco && c.borderEnabled ? "border-top:1px solid " + c.borderColor + ";" : "") + (deco && c.radius ? "border-radius:" + c.radius + "px;" : "") + (deco && c.shadow ? "box-shadow:0 4px 18px rgba(0,0,0,.12);" : "") + (c.fullWidth ? "width:100%;" : "width:fit-content;max-width:100%;margin:0 auto;") + (c.position === "fixed" ? "position:fixed;left:0;right:0;bottom:0;z-index:2147483000;" : "") + "}" + S + " .agf-inner{position:relative;z-index:1;display:flex;align-items:center;gap:0;width:100%;margin:0 auto;" + (c.maxWidth > 0 ? "max-width:" + c.maxWidth + "px;" : "") + "font-family:" + family + ";font-weight:" + c.fontWeight + ";color:" + textCol + ";letter-spacing:" + c.letterSpacing + "px;line-height:" + c.lineHeight + ";text-transform:" + c.textTransform + "}" + S + " .agf-extra{position:relative;z-index:1;display:block;width:100%;font-family:" + family + ";color:" + textCol + ";font-size:.85em;opacity:.8;text-align:center;padding:0 8px 8px}" + S + " .agf-hw{position:relative;display:inline-grid;place-items:center;flex:none;line-height:1;margin:0 " + c.heartGapAfter + "px 0 " + c.heartGapBefore + "px}" + S + " .agf-heart{display:inline-block;color:" + heartCol + ";font-weight:" + hf.weight + ";line-height:1;" + (heartCss ? "animation:" + heartCss + ";will-change:transform;" : "") + "}" + waveCss + fxCss + phxCss + S + " .agf-logo{height:" + br.logoSize + "px;width:auto;max-width:" + br.logoSize * 4 + "px;margin:0 6px;flex:none;object-fit:contain;align-self:center}" + S + " .agf-sp{display:inline-block;width:.3em}" + S + " .agf-t{opacity:" + (adaptOn && c.inheritText ? ".85" : "1") + ";line-height:1.2;display:inline-flex;align-items:center}" + nameCss + S + " .agf-all{display:block;position:relative;z-index:1;color:inherit;text-decoration:none;cursor:pointer;outline:none}" + S + " .agf-all:hover," + S + " .agf-all:focus{color:inherit;text-decoration:none}" + S + " .agf-all:focus-visible{outline:2px solid " + hoverCol + ";outline-offset:2px;border-radius:2px}" + S + " .agf-txt{display:block;color:inherit;text-decoration:none;cursor:pointer;outline:none}" + S + " .agf-txt:hover," + S + " .agf-txt:focus{color:inherit;text-decoration:none}" + S + " .agf-txt:focus-visible{outline:2px solid " + hoverCol + ";outline-offset:2px;border-radius:2px}" + (c.footerHover && (c.linkArea || "whole") === "whole" ? S + " .agf-all:hover .agf-inner{color:" + pickC("footerHover", c.footerHoverColor) + "}" : "") + S + " a.agf-link," + S + " .agf-all .agf-link," + S + " .agf-txt .agf-link{cursor:pointer;min-height:24px}" + S + " .agf-link:hover," + S + " a.agf-link:focus-visible{" + (hoverColor && !gradName && af.type !== "shine" ? "color:" + hoverCol + ";" : "") + (hoverUnder ? "text-decoration:underline;" : "") + "}" + S + " a.agf-link:focus-visible{outline:2px solid " + hoverCol + ";outline-offset:2px;border-radius:2px}" + kf + bp(c.desktop) + "@container (max-width:" + c.mobileBreakpoint + "px){" + bp(c.mobile) + (hf.mobile ? "" : S + " .agf-heart{animation:none}") + (wf.mobile ? "" : S + " .agf-wv{display:none}") + (cf.mobile ? "" : S + " .agf-fx{display:none}" + S + " .agf-inner{text-shadow:none}") + (px.mobile ? "" : S + " .agf-px{display:none}") + "}" + (c.reducedMotion ? "@media (prefers-reduced-motion:reduce){" + S + " *," + S + " *::before," + S + " *::after{animation:none!important;transition:none!important}" + S + " .agf-wv," + S + " .agf-pt," + S + " .agf-p2{display:none}}" : "") + (forceReduced ? S + " *," + S + " *::before," + S + " *::after{animation:none!important}" + S + " .agf-wv," + S + " .agf-pt," + S + " .agf-p2{display:none}" : "") + (paused ? S + " *," + S + " *::before," + S + " *::after{animation-play-state:paused!important}" : "");
	var relv = String(c.rel || "").replace(/[^a-z \-]/gi, "");
	if (c.newTab && relv.indexOf("noopener") < 0) relv = (relv + " noopener noreferrer").trim();
	var target = c.newTab ? " target=\"_blank\" rel=\"" + esc(relv) + "\"" : relv ? " rel=\"" + esc(relv) + "\"" : "";
	var aria = c.ariaLabel ? " aria-label=\"" + esc(c.ariaLabel) + "\"" : "";
	var Bp = c.beforeText ? "<span class=\"agf-t\">" + esc(c.beforeText) + "</span>" : "";
	var Hp = hf.enabled ? "<span class=\"agf-hw\">" + waveHtml + "<span class=\"agf-heart\" aria-hidden=\"true\">" + esc(c.heart) + "</span></span>" : "<span class=\"agf-sp\"></span>";
	var Ap = c.afterText ? "<span class=\"agf-t\">" + esc(c.afterText) + "</span><span class=\"agf-sp\"></span>" : "";
	var area = c.linkArea || (c.wholeLink ? "whole" : "text");
	var whole = area === "whole" && c.linkEnabled !== false && safeUrl !== "#";
	var txt = area === "text" && c.linkEnabled !== false && safeUrl !== "#";
	var Np = !af.show ? "" : whole || txt || area === "off" || c.linkEnabled === false || safeUrl === "#" ? "<span class=\"agf-link\">" + esc(c.agencyName) + "</span>" : "<a class=\"agf-link\" href=\"" + esc(safeUrl) + "\"" + target + aria + ">" + esc(c.agencyName) + "</a>";
	var body = c.order === "nameFirst" ? Np + "<span class=\"agf-sp\"></span>" + Bp + Hp + Ap.replace("<span class=\"agf-sp\"></span>", "") : c.order === "heartFirst" ? Hp + Bp + (Bp ? "<span class=\"agf-sp\"></span>" : "") + Ap + Np : Bp + Hp + Ap + Np;
	var txtOpen = txt ? "<a class=\"agf-txt\" href=\"" + esc(safeUrl) + "\"" + target + aria + ">" : "";
	var txtClose = txt ? "</a>" : "";
	return {
		css,
		html: "<div class=\"agf-wrap\">" + fxHtml + (whole ? "<a class=\"agf-all\" href=\"" + esc(safeUrl) + "\"" + target + aria + ">" : "") + txtOpen + "<p class=\"agf-inner\" style=\"margin:0 auto\">" + logoHtml + (px.position === "before" ? phx : "") + body + (px.position === "after" ? phx : "") + "</p>" + txtClose + (whole ? "</a>" : "") + (c.showExtra && c.extraText ? "<span class=\"agf-extra\">" + esc(c.extraText) + "</span>" : "") + "</div>"
	};
};
  var adapt = function adaptFooter(el, c) {
	if (!el) return;
	el.style.removeProperty("--agf-text");
	el.style.removeProperty("--agf-link");
	if (c.appearance === "own" || !c.autoContrast) return;
	var parse = function(s) {
		var m = String(s).match(/rgba?\(([^)]+)\)/);
		if (!m) return null;
		var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
		return {
			r: p[0],
			g: p[1],
			b: p[2],
			a: p.length > 3 ? p[3] : 1
		};
	};
	var lum = function(x) {
		var f = function(v) {
			v = v / 255;
			return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
		};
		return .2126 * f(x.r) + .7152 * f(x.g) + .0722 * f(x.b);
	};
	var ratio = function(a, b) {
		return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
	};
	var bgL = 1;
	var node = el.parentElement;
	while (node) {
		var cs = getComputedStyle(node);
		var col = parse(cs.backgroundColor);
		if (col && col.a > .5) {
			bgL = lum(col);
			break;
		}
		if (cs.backgroundImage && cs.backgroundImage !== "none") {
			bgL = -1;
			break;
		}
		node = node.parentElement;
	}
	if (bgL < 0) return;
	var root = el.shadowRoot || el;
	var inner = root.querySelector(".agf-inner");
	var link = root.querySelector(".agf-link");
	var dark = bgL < .4;
	var t = inner ? parse(getComputedStyle(inner).color) : null;
	if (t && t.a > 0 && ratio(lum(t), bgL) < 3) el.style.setProperty("--agf-text", dark ? "rgba(255,255,255,.82)" : "rgba(17,24,39,.78)");
	if (c.agencyFx && c.agencyFx.autoContrast === false) return;
	var l = link ? parse(getComputedStyle(link).color) : null;
	if (l && l.a > 0 && ratio(lum(l), bgL) < 3) el.style.setProperty("--agf-link", dark ? "#ffffff" : "#111827");
};
  var fhref = function fontHref(c) {
	if ([
		"Inter",
		"Roboto",
		"Open Sans",
		"Lato",
		"Montserrat",
		"Poppins",
		"Nunito",
		"Playfair Display"
	].indexOf(c.fontFamily) < 0) return null;
	if ((c.appearance === "adapt" || c.brand && c.brand.colorSource === "adapt") && c.inheritFont) return null;
	var ws = [];
	[
		c.fontWeight,
		c.agencyWeight,
		c.heartFx ? c.heartFx.weight : 400
	].forEach(function(w) {
		var r = Math.min(900, Math.max(100, Math.round(Number(w) / 100) * 100));
		if (ws.indexOf(r) < 0) ws.push(r);
	});
	ws.sort(function(a, b) {
		return a - b;
	});
	return "https://fonts.googleapis.com/css2?family=" + c.fontFamily.replace(/ /g, "+") + ":wght@" + ws.join(";") + "&display=swap";
};
  var scripts = document.querySelectorAll('script[src*="/embed/footer.js"]');
  var cur = document.currentScript || scripts[scripts.length - 1];
  if (!cur) return;
  var base;
  try { base = new URL(cur.src).origin; } catch (e) { return; }
  var id = (cur.getAttribute('data-footer-id') || 'default').toLowerCase();
  var sel = cur.getAttribute('data-target') || '#agencia-footer';
  var hasTarget = !!cur.getAttribute('data-target');

  function findEl() { var el = null; try { el = document.querySelector(sel); } catch (e) {} return el; }
  function getEl() {
    var el = findEl();
    if (!el) {
      el = document.createElement('div');
      el.id = 'agencia-footer';
      if (hasTarget) { try { console.warn('[agencia-footer] elemento ' + sel + ' não encontrado; criando no fim da página.'); } catch (x) {} }
      document.body.appendChild(el);
    }
    return el;
  }

  function loadFont(cfg) {
    var href = null;
    try { href = fhref(cfg); } catch (e) {}
    if (!href) return;
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href;
    l.onerror = function () { try { console.warn('[agencia-footer] fonte não carregou; usando fonte do sistema.'); } catch (x) {} };
    document.head.appendChild(l);
  }

  var CK = 'agf2:' + id;
  try { localStorage.removeItem('agf:' + id); } catch (e) {}
  function readCache() {
    try { var v = JSON.parse(localStorage.getItem(CK) || 'null'); return v && v.config ? v : null; } catch (e) { return null; }
  }
  function getRoot(el) {
    var root = el.__agfRoot;
    if (!root) {
      try { root = el.shadowRoot || (el.attachShadow ? el.attachShadow({ mode: 'open' }) : el); } catch (e) { root = el; }
      el.__agfRoot = root;
    }
    return root;
  }
  // Never throws: returns true when the footer was drawn.
  function paint(el, cfg) {
    try {
      var out = render(cfg, { scope: '.agf' });
      var root = getRoot(el);
      root.innerHTML = '<style>' + out.css + '</style><div class="agf">' + out.html + '</div>';
      el.__agfCfg = cfg;
    } catch (e) {
      try { console.warn('[agencia-footer] erro ao desenhar o rodapé "' + id + '":', e && e.message); } catch (x) {}
      return false;
    }
    try { loadFont(cfg); } catch (e) {}
    try { adapt(el, cfg); } catch (e) {}
    return true;
  }

  function fallback(el) {
    if (el.__agfCfg) return;
    var root = getRoot(el);
    root.innerHTML = '<div class="agf-inner" style="font:12px system-ui,sans-serif;color:#9ca3af;text-align:center;padding:12px">Desenvolvido com <span style="color:#e11d48">&#9829;</span></div>';
  }

  // The request starts as soon as the script runs, before the page finishes loading.
  var req = fetch(base + '/api/public/footers/' + encodeURIComponent(id) + '?v=' + Date.now(), { credentials: 'omit', cache: 'no-store' })
    .then(function (r) { if (!r.ok) { if (r.status === 404 || r.status === 410) { try { localStorage.removeItem(CK); } catch (e) {} } throw new Error('HTTP ' + r.status); } return r.json(); });
  req.catch(function () {});
  function sig(d) { return d ? String(d.version) + '|' + String(d.updatedAt || '') : ''; }
  // Never scrolls, focuses or reloads; keeps the scroll position stable while drawing.
  function steady(fn) {
    var x = window.pageXOffset, y = window.pageYOffset;
    fn();
    try { if (window.pageYOffset !== y || window.pageXOffset !== x) window.scrollTo(x, y); } catch (e) {}
  }
  function reserve(el, h) { try { if (h > 0 && !el.style.minHeight) el.style.minHeight = h + 'px'; } catch (e) {} }
  function release(el) { try { var h = el.getBoundingClientRect().height; el.style.minHeight = ''; return Math.round(h); } catch (e) { return 0; } }
  function load(el) {
    var cached = readCache();
    if (cached) reserve(el, cached.h || 0);
    if (cached) steady(function () { if (!paint(el, cached.config)) { try { localStorage.removeItem(CK); } catch (e) {} cached = null; } });
    req
      .then(function (data) {
        if (!data || !data.config) throw new Error('resposta sem config');
        // Only redraw when the footer actually changed.
        if (cached && el.__agfCfg && sig(cached) === sig(data)) { release(el); return; }
        var ok = false;
        steady(function () { ok = paint(el, data.config); });
        if (ok) { var h = release(el); data.h = h; try { localStorage.setItem(CK, JSON.stringify(data)); } catch (e) {} }
        else fallback(el);
      })
      .catch(function (e) { try { console.warn('[agencia-footer] não foi possível carregar o rodapé "' + id + '":', e && e.message); } catch (x) {} release(el); fallback(el); });
  }

  function start() {
    var el = findEl();
    if (el) { if (!el.__agfInit) { el.__agfInit = true; last = el; load(el); } return; }
    // Target not in the page yet (SPA still rendering): wait a bit before creating one at the end.
    setTimeout(function () {
      var e2 = findEl();
      if (e2 && e2.__agfInit) return;
      e2 = e2 || getEl();
      if (!e2.__agfInit) { e2.__agfInit = true; last = e2; load(e2); }
    }, 2500);
  }

  var reg = (window.__agfLoaded = window.__agfLoaded || {});
  var regKey = id + '|' + sel;
  if (reg[regKey]) return;
  reg[regKey] = true;

  var last = null;
  function tick() {
    var el = null;
    try { el = document.querySelector(sel); } catch (e) {}
    if (el && !el.__agfInit) {
      el.__agfInit = true;
      if (last && last !== el && last.__agfCfg) { var lc = last.__agfCfg; steady(function () { paint(el, lc); }); }
      last = el;
      load(el);
    }
  }
  var t = null;
  function reAdapt() {
    clearTimeout(t);
    t = setTimeout(function () {
      tick();
    }, 200);
  }
  function boot() {
    start();
    try {
      new MutationObserver(reAdapt).observe(document.body || document.documentElement, { childList: true, subtree: true });
      var ta = null;
      var themeObs = new MutationObserver(function () { clearTimeout(ta); ta = setTimeout(function () { var el = findEl(); if (el && el.__agfCfg) { try { adapt(el, el.__agfCfg); } catch (e) {} } }, 150); });
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
      if (document.body) themeObs.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    } catch (e) {}
    if (window.matchMedia) { try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { var el = findEl(); if (el && el.__agfCfg) { try { adapt(el, el.__agfCfg); } catch (e) {} } }); } catch (e) {} }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

