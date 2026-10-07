// @ts-nocheck
/* eslint-disable */
/**
 * SiteController — the site's state, scroll scenes and handlers, ported from the
 * original design's logic class. renderVals() produces the values every view reads
 * through useSite(). Navigation (page changes) is mirrored to Next.js routes by DCLogic.
 */
import React from 'react';
import { DCLogic } from './DCLogic';
import LiteFlow, { initialLiteState } from '@/lib/pawteckt/LiteFlow';

export default class SiteController extends DCLogic {
  state = { lite: initialLiteState(), ptAge: 'mid', ptTier: 2, ptCov: 'in', sub: null, subPlan: 'lite', subTier: null, decl: false, kycDay: 1, kyc: { front: '', left: '', right: '', selfie: '', pPin: '', pAddr: '', sSame: false, sPin: '', sAddr: '' }, subPhone: '', otp: ['', '', '', '', '', ''], otpLeft: 60, payM: 'upi', payBusy: false, subPets: [{ id: 'bruno', name: 'Bruno' }, { id: 'coco', name: 'Coco' }], subPetId: '', np: { name: '', uname: '', type: '', gender: '', breed: '', breed2: '', other: '' }, jn: { name: '', email: '', user: '' }, grPet: 'dog', clinicType: 'regular', clDay: 0, clSlot: null, clDist: null, page: 'home', faq: 0, ptFaq: 0, city: 'Mumbai', service: 'Vet clinics', blogTab: 'Articles', ...(this.props.routeState || {}) };
  _lite = new LiteFlow(this);
  rail = React.createRef();
  row = React.createRef();
  scaleEl = React.createRef();
  stage = React.createRef();
  mark = React.createRef();
  pinTitle = React.createRef();
  panel = React.createRef();
  ptLogo = React.createRef();
  ptTitle = React.createRef();
  ptSub = React.createRef();
  ptCards = React.createRef();
  ptCta = React.createRef();
  ecoWrap = React.createRef();
  clMap = React.createRef();
  toTopEl = React.createRef();
  ecoStage = React.createRef();

  componentDidMount() {
    this._lite.mount();
    const PHASE_A = 0.9, ZOOM_START = 0.91;
    const MAX_SCALE_DESKTOP = 7, MAX_SCALE_SMALL = 5;
    const MAIN_VH = 14, CTA_VH = 3;
    const LOGO_START = 4.4;
    const D_DELAY = 0.15, E_DELAY = 0.28, F_DELAY = 0.4, CARD_STAGGER = 0.06;
    const PIN_BG = [247, 244, 253], NEXT_BG = [255, 249, 242];
    const mix = (t) => 'rgb(' + PIN_BG.map((c, i) => Math.round(c + (NEXT_BG[i] - c) * t)).join(',') + ')';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    this._tick = () => {
      this._raf = 0;
      const row = this.row.current, sc = this.scaleEl.current, st = this.stage.current, mk = this.mark.current;
      if (!row) return;
      const wrap = row.closest('[data-r="pinwrap"]');
      if (!wrap) return;
      if (reduced.matches) {
        row.style.transform = '';
        if (sc) { sc.style.transform = ''; sc.style.opacity = '1'; sc.style.willChange = ''; }
        if (st) st.style.backgroundColor = '';
        if (mk) mk.style.opacity = '0';
        if (this.pinTitle.current) this.pinTitle.current.style.opacity = '1';
        return;
      }
      const span = wrap.offsetHeight - window.innerHeight;
      if (span <= 0) return;
      const wrapTop = wrap.getBoundingClientRect().top;
      if (!this._lastCardGeom || this._geomW !== window.innerWidth) {
        this._geomW = window.innerWidth;
        const cards = row.children;
        const lastCard = cards[cards.length - 1];
        this._lastCardGeom = lastCard
          ? { left: lastCard.offsetLeft, w: lastCard.offsetWidth }
          : { left: row.scrollWidth - window.innerWidth, w: 0 };
        this._lastMedia = row.querySelector('[data-r="pinlogo"]') || null;
      }
      const vh = window.innerHeight / 100;
      const tail = (MAIN_VH + CTA_VH) * vh;
      const baseSpan = Math.max(1, span - tail);
      const rawScrolled = Math.min(span, Math.max(0, -wrapTop));
      if (this._stableScrolled === undefined || Math.abs(rawScrolled - this._stableScrolled) >= 1.5) {
        this._stableScrolled = rawScrolled;
      }
      const scrolled = this._stableScrolled;
      const p = Math.min(1, scrolled / baseSpan);
      const MAX_SCALE = window.innerWidth <= 860 ? MAX_SCALE_SMALL : MAX_SCALE_DESKTOP;

      if (!this._zoomOrigin && p >= PHASE_A && st && this._lastMedia) {
        const b = st.getBoundingClientRect();
        const originX = window.innerWidth / 2 - b.left;
        const originY = this._lastMedia.getBoundingClientRect().top + this._lastMedia.offsetHeight / 2 - b.top;
        this._zoomOrigin = originX + 'px ' + originY + 'px';
      }
      if (p < PHASE_A) this._zoomOrigin = null;

      const pa = Math.min(1, p / PHASE_A);
      const dist = Math.max(0, this._lastCardGeom.left + this._lastCardGeom.w / 2 - window.innerWidth / 2);
      const rowTransform = 'translateX(' + (-pa * dist) + 'px)';

      const pb = Math.min(1, Math.max(0, (p - ZOOM_START) / (1 - ZOOM_START)));
      const e = 1 - Math.pow(1 - pb, 3);
      const active = p > 0 && p < 1;
      const scTransform = 'scale(' + (1 + (MAX_SCALE - 1) * e) + ')';
      const scOpacity = String(1 - Math.min(1, Math.max(0, (pb - 0.72) / 0.28)));
      const stBg = mix(Math.min(1, e * 1.45));

      const setStyle = (el, prop, val) => { if (el && el.style[prop] !== val) el.style[prop] = val; };
      setStyle(row, 'transform', rowTransform);
      if (sc) {
        if (this._zoomOrigin) setStyle(sc, 'transformOrigin', this._zoomOrigin);
        setStyle(sc, 'transform', scTransform);
        setStyle(sc, 'opacity', scOpacity);
        setStyle(sc, 'willChange', active ? 'transform, opacity' : '');
      }
      if (st) setStyle(st, 'backgroundColor', stBg);
      if (mk) setStyle(mk, 'opacity', '0');
      const tt = this.pinTitle.current;
      if (tt) setStyle(tt, 'opacity', String(1 - Math.min(1, pb / 0.1)));

      const pn = this.panel.current;
      if (!pn || reduced.matches) { if (pn) pn.style.opacity = '0'; return; }
      const mainLen = MAIN_VH * vh, ctaLen = CTA_VH * vh;
      const mainStart = baseSpan, mainEnd = mainStart + mainLen, gEnd = mainEnd + ctaLen;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const win = (startFrac) => {
        const start = mainStart + mainLen * startFrac, len = Math.max(1, mainEnd - start);
        return Math.min(1, Math.max(0, (scrolled - start) / len));
      };

      const pc = win(0);
      setStyle(pn, 'opacity', String(Math.min(1, pc / 0.15)));
      setStyle(pn, 'pointerEvents', pc > 0.5 ? 'auto' : 'none');
      setStyle(sc, 'opacity', String(Math.max(0, 1 - pc / 0.25)));

      const lg = this.ptLogo.current;
      if (lg) setStyle(lg, 'transform', 'scale(' + (LOGO_START - (LOGO_START - 1) * ease(pc)) + ')');

      const reveal = (el, t, dy) => {
        if (!el) return;
        const q = ease(t);
        setStyle(el, 'opacity', String(q));
        setStyle(el, 'transform', 'translateY(' + (dy * (1 - q)) + 'px)');
      };
      reveal(this.ptTitle.current, win(D_DELAY), 20);
      reveal(this.ptSub.current, win(E_DELAY), 14);

      const cardEls = this.ptCards.current ? (this._ptCardEls || (this._ptCardEls = Array.from(this.ptCards.current.children))) : [];
      for (let i = 0; i < cardEls.length; i++) reveal(cardEls[i], win(F_DELAY + CARD_STAGGER * i), 18);

      const cta = this.ptCta.current;
      if (cta) {
        const q = ease(Math.min(1, Math.max(0, (scrolled - mainEnd) / ctaLen)));
        setStyle(cta, 'opacity', String(q));
        setStyle(cta, 'transform', 'scale(' + (0.9 + 0.1 * q) + ')');
      }
    };
    this._ecoEls = null;
    this._ecoTick = () => {
      const wrap = this.ecoWrap.current, stage = this.ecoStage.current;
      if (!wrap || !stage) return;
      if (this._ecoEls && (!this._ecoEls.b1layer || !this._ecoEls.b1layer.isConnected)) this._ecoEls = null;
      if (!this._ecoEls) {
        const g = (sel) => stage.querySelector(sel);
        this._ecoEls = {
          hudBox: g('[data-eco="hud"]'), hudText: g('[data-eco="hud-text"]'),
          tcard: g('[data-eco="travel-card"]'), tcardDots: g('[data-eco="tc-dots"]'),
          b1layer: g('[data-eco="beat1"]'), b1flat: g('[data-eco="b1-flat"]'), b1ripple: g('[data-eco="b1-ripple"]'),
          b2layer: g('[data-eco="beat2"]'),
          b2type1: g('[data-eco="b2-type1"]'), b2type2: g('[data-eco="b2-type2"]'), b2track: g('[data-eco="b2-track"]'),
          b2trail: Array.from(stage.querySelectorAll('[data-eco="b2-trail"]')),
          b3layer: g('[data-eco="beat3"]'), b3ring: g('[data-eco="b3-ring"]'), b3node: Array.from(stage.querySelectorAll('[data-eco="b3-node"]')), b3call: Array.from(stage.querySelectorAll('[data-eco="b3-call"]')),
          b4layer: g('[data-eco="beat4"]'), b4sat: Array.from(stage.querySelectorAll('[data-eco="b4-sat"]')), b4call: Array.from(stage.querySelectorAll('[data-eco="b4-call"]')),
          b5layer: g('[data-eco="beat5"]'), b5group: g('[data-eco="b5-group"]'), b5text: g('[data-eco="b5-text"]'),
          b6layer: g('[data-eco="beat6"]'), b6testi: g('[data-eco="b6-testi"]'),
        };
      }
      const E = this._ecoEls;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const W = [1, 2, 1, 2, 1], WS = W.reduce((a, b) => a + b, 0);
      const bp = (i) => { let st = 0; for (let k = 0; k < i; k++) st += W[k]; const len = total * W[i] / WS; return Math.min(1, Math.max(0, (scrolled - total * st / WS) / len)); };
      const clamp01 = (v) => Math.min(1, Math.max(0, v));
      const easeEco = (t) => 1 - Math.pow(1 - t, 3);
      const lerp = (a, b, t) => a + (b - a) * t;
      const layerOpacity = (t) => t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
      const layerOpacityFirst = (t) => t > 0.9 ? (1 - t) / 0.1 : 1;
      const setStyle = (el, prop, val) => { if (el && el.style[prop] !== val) el.style[prop] = val; };
      const setLayer = (el, t, fn) => { if (!el) return; const o = clamp01((fn || layerOpacity)(t)); setStyle(el, 'opacity', String(o)); setStyle(el, 'pointerEvents', o > 0.5 ? 'auto' : 'none'); };

      const p1 = bp(0), p2 = bp(1), p3 = bp(2), p4 = bp(3), p5 = bp(4);
      setLayer(E.b1layer, p1, layerOpacityFirst); setLayer(E.b2layer, p2); setLayer(E.b3layer, p3);
      setLayer(E.b4layer, p4); setLayer(E.b5layer, p5, (t) => t < 0.1 ? t / 0.1 : 1);

      const tapT = clamp01(p1 / 0.25);
      const liftT = easeEco(clamp01((p1 - 0.28) / 0.72));
      setStyle(E.b1flat, 'transform', 'scale(' + (1 - 0.05 * Math.sin(tapT * Math.PI)) + ')');
      if (E.b1ripple) {
        const rT = clamp01((p1 - 0.22) / 0.35);
        setStyle(E.b1ripple, 'transform', 'scale(' + lerp(0.5, 2.2, rT) + ')');
        setStyle(E.b1ripple, 'opacity', String(1 - rT));
      }

      if (E.hudBox && E.hudText) {
        const label = p2 < 0.35 ? 'Syncing vaccine records… 9/9' : p2 < 0.7 ? '1 profile · 3 products connected' : 'No re-entry needed';
        if (E.hudText.textContent !== label) E.hudText.textContent = label;
        setStyle(E.hudBox, 'opacity', p2 > 0.05 && p2 < 0.97 ? '1' : '0');
      }

      const typeT = easeEco(clamp01(p2 / 0.4));
      if (E.b2type1) { setStyle(E.b2type1, 'transform', 'translateX(' + lerp(-60, 0, typeT) + 'px)'); setStyle(E.b2type1, 'opacity', String(typeT)); }
      if (E.b2type2) { setStyle(E.b2type2, 'transform', 'translateX(' + lerp(60, 0, typeT) + 'px)'); setStyle(E.b2type2, 'opacity', String(typeT)); }
      if (E.b2track) {
        const trackT = easeEco(clamp01((p2 - 0.12) / 0.5));
        const par = E.b2track.parentElement, cs = getComputedStyle(par);
        const inner = par.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const w = Math.max(0, E.b2track.scrollWidth - inner);
        setStyle(E.b2track, 'transform', 'translateX(' + (-w * trackT) + 'px)');
      }
      E.b2trail.forEach((el, i) => {
        const local = clamp01((p2 - i * 0.12) / 0.3);
        setStyle(el, 'opacity', String(Math.sin(local * Math.PI)));
      });

      const b3Starts = [0.02, 0.22, 0.44];
      E.b3call.forEach((el, i) => {
        const t = easeEco(clamp01((p3 - b3Starts[i]) / 0.14));
        setStyle(el, 'opacity', String(t));
        setStyle(el, 'transform', 'translateX(-50%) translateY(' + lerp(14, 0, t) + 'px)');
      });

      if (E.b4call.length) {
        const starts = [0.03, 0.11, 0.19, 0.27];
        const cx = stage.clientWidth / 2, cy = stage.clientHeight / 2;
        E.b4call.forEach((el, i) => {
          const t = easeEco(clamp01((p4 - starts[i]) / 0.1));
          const drift = easeEco(clamp01((p4 - 0.38) / 0.3));
          const ex = el.offsetLeft + el.offsetWidth / 2, ey = el.offsetTop + el.offsetHeight / 2;
          let dx = (cx - ex) * 0.42 * drift;
          if (E.b1flat) {
            const sr = stage.getBoundingClientRect(), fr = E.b1flat.getBoundingClientRect();
            const fl = fr.left - sr.left - 20, frt = fr.right - sr.left + 20;
            if (ex < cx) dx = Math.min(dx, Math.max(0, fl - (el.offsetLeft + el.offsetWidth)));
            else dx = Math.max(dx, Math.min(0, frt - el.offsetLeft));
          }
          const dy = (cy - ey) * 0.3 * drift;
          setStyle(el, 'opacity', String(t));
          setStyle(el, 'transform', 'translate(' + dx + 'px,' + (lerp(16, 0, t) + dy) + 'px)');
        });
      }

      if (E.b4sat.length) {
        const ang0 = p4 * Math.PI * 2.4;
        const rx = Math.min(140, stage.clientWidth * 0.2), ry = Math.min(60, stage.clientHeight * 0.13);
        E.b4sat.forEach((el, i) => {
          const a = ang0 + i * (Math.PI * 2 / 3);
          setStyle(el, 'transform', 'translate(' + (Math.cos(a) * rx) + 'px,' + (Math.sin(a) * ry) + 'px)');
          setStyle(el, 'opacity', String(0.55 + 0.45 * Math.sin(a)));
        });
      }
      
      if (E.b5text) {
        const t = easeEco(clamp01((p5 - 0.12) / 0.2));
        const rise = easeEco(clamp01((p5 - 0.18) / 0.32));
        setStyle(E.b5text, 'opacity', String(t));
        setStyle(E.b5text, 'transform', 'translate(-50%,calc(-50% + ' + lerp(16, 0, t) + 'px))');
      }

      if (E.tcard) {
        const stageW = stage.clientWidth, stageH = stage.clientHeight;
        const o1 = clamp01(layerOpacityFirst(p1)), o2 = clamp01(layerOpacity(p2)), o3 = clamp01(layerOpacity(p3)), o4 = clamp01(layerOpacity(p4)), o5 = clamp01(layerOpacity(p5));

        const ENTRY = 0.18;
        const blendIn = (anchor, raw, p) => {
          const w = easeEco(clamp01(p / ENTRY));
          return { x: lerp(anchor.x, raw.x, w), y: lerp(anchor.y, raw.y, w), rot: lerp(anchor.rot, raw.rot, w), scale: lerp(anchor.scale, raw.scale, w), dots: raw.dots };
        };

        const b1Lift = liftT;
        const b1Grow = easeEco(p1);
        const b1 = { x: 0, y: lerp(40, -30, b1Lift), rot: lerp(0, -6, b1Lift), scale: lerp(0.4, 1, b1Grow), dots: 0 };
        const anchor1 = { x: 0, y: -30, rot: -6, scale: 1 };

        const b2Bob = Math.sin(p2 * Math.PI * 4) * 8, b2Rot = Math.sin(p2 * Math.PI * 3) * 4;
        const rawB2 = { x: 0, y: -0.06 * stageH + b2Bob, rot: b2Rot, scale: 1, dots: 0 };
        const b2 = blendIn(anchor1, rawB2, p2);
        const anchor2 = { x: 0, y: -0.06 * stageH, rot: 0, scale: 1 };

        const R3 = Math.max(96, Math.min(stageW * 0.28, (stageH - 390) / 2));
        const cx3 = stageW * 0.5, cy3 = stageH * 0.56, rx3 = R3, ry3 = R3;
        if (E.b3ring) { setStyle(E.b3ring, 'width', (R3 * 2) + 'px'); setStyle(E.b3ring, 'height', (R3 * 2) + 'px'); setStyle(E.b3ring, 'top', cy3 + 'px'); }
        E.b3node.forEach((el, i) => {
          const a = [180, 90, 0][i] * Math.PI / 180;
          setStyle(el, 'left', (cx3 + R3 * Math.cos(a)) + 'px');
          setStyle(el, 'top', (cy3 - R3 * Math.sin(a)) + 'px');
        });
        const j3 = clamp01(p3 / 0.72);
        const leg3 = Math.min(2, Math.floor(j3 * 3));
        const seg3 = clamp01(j3 * 3 - leg3);
        const t3 = easeEco(seg3);
        const ang3 = (180 - 90 * (leg3 + t3)) * Math.PI / 180;
        const px3 = cx3 + rx3 * Math.cos(ang3), py3 = cy3 - ry3 * Math.sin(ang3);
        const bank3 = Math.sin(seg3 * Math.PI) * (leg3 === 1 ? 10 : -10);
        const rawB3 = { x: px3 - stageW / 2, y: py3 - stageH / 2, rot: bank3, scale: 1, dots: 0 };
        const startA3 = { x: cx3 - R3 - stageW / 2, y: cy3 - stageH / 2, rot: 0, scale: 1 };
        const b3 = blendIn(startA3, rawB3, p3);
        const anchor3 = { x: stageW * 0.28, y: stageH * 0.18, rot: 0, scale: 1 };

        const b4Scale = lerp(0.9, 1, easeEco(clamp01(p4 / 0.3)));
        const rawB4 = { x: 0, y: 0, rot: 0, scale: b4Scale, dots: 0 };
        const b4 = blendIn(anchor3, rawB4, p4);
        const anchor4 = { x: 0, y: 0, rot: 0, scale: 1 };

        const b5T = easeEco(p5);
        const rawB5 = { x: 0, y: -0.16 * stageH * b5T, rot: 0, scale: lerp(1, 0.62, b5T), dots: 0 };
        const b5 = blendIn(anchor4, rawB5, p5);
        const anchor5 = { x: 0, y: -0.16 * stageH, rot: 0, scale: 0.62 };

        const ws = [o1, o2, o3, o4, o5], states = [b1, b2, b3, b4, b5];
        let wsum = 0, x = 0, y = 0, rot = 0, scale = 0, dots = 0;
        ws.forEach((w, i) => {
          if (w > 0) {
            const s = states[i];
            wsum += w; x += w * s.x; y += w * s.y; rot += w * s.rot; scale += w * s.scale; dots += w * s.dots;
          }
        });
        const cardOpacity = clamp01(wsum);
        if (wsum > 0) { x /= wsum; y /= wsum; rot /= wsum; scale /= wsum; dots /= wsum; } else { scale = b1.scale; y = b1.y; }

        setStyle(E.tcard, 'opacity', String(cardOpacity));
        setStyle(E.tcard, 'pointerEvents', cardOpacity > 0.5 ? 'auto' : 'none');
        setStyle(E.tcard, 'transform', 'translate(calc(-50% + ' + x + 'px),calc(-50% + ' + y + 'px)) rotate(' + rot + 'deg) scale(' + scale + ')');
        if (E.tcardDots) {
          setStyle(E.tcardDots, 'opacity', String(dots));
          setStyle(E.tcardDots, 'maxHeight', dots > 0.05 ? '20px' : '0px');
          setStyle(E.tcardDots, 'marginTop', dots > 0.05 ? '6px' : '0px');
        }
      }
    };
    this._frame = () => { this._raf = 0; this._tick(); this._ecoTick(); };
    this._onTopScroll = () => {
      const tb = this.toTopEl.current;
      if (tb) { const on = window.scrollY > window.innerHeight * 0.8; if (tb._on !== on) { tb._on = on; tb.style.opacity = on ? '1' : '0'; tb.style.pointerEvents = on ? 'auto' : 'none'; tb.style.transform = on ? 'translateY(0)' : 'translateY(10px)'; } }
    };
    window.addEventListener('scroll', this._onTopScroll, { passive: true });
    this._onTopScroll();
    this._onScroll = () => { if (!this._raf) this._raf = requestAnimationFrame(this._frame); };
    this._onResize = () => { this._stageRect = null; this._lastCardGeom = null; this._onScroll(); };
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize);
    this._onScroll();

    let tsx = 0, tsy = 0;
    let lastMoveT = 0, velY = 0, pending = 0, remainder = 0, dragging = false;
    const driver = (now) => {
      const dt = Math.min(48, now - (this._lastDriveT || now));
      this._lastDriveT = now;
      let amount = 0;
      if (pending) { amount = pending; pending = 0; }
      else if (!dragging && Math.abs(velY) > 0.02) {
        velY *= Math.exp(-dt / 325);
        amount = velY * dt;
        if (Math.abs(velY) <= 0.02) velY = 0;
      }
      if (amount) {
        const total = amount + remainder;
        const whole = Math.trunc(total);
        remainder = total - whole;
        if (whole) window.scrollBy(0, whole);
      }
      if (dragging || Math.abs(velY) > 0.02 || pending) {
        this._glideRaf = requestAnimationFrame(driver);
      } else {
        this._glideRaf = null;
        this._lastDriveT = 0;
        remainder = 0;
      }
    };
    const ensureDriver = () => { if (!this._glideRaf) { this._lastDriveT = 0; this._glideRaf = requestAnimationFrame(driver); } };
    const stopGlide = () => { if (this._glideRaf) { cancelAnimationFrame(this._glideRaf); this._glideRaf = null; } };

    this._onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      dragging = true;
      pending += e.deltaX;
      const now = performance.now(), dt = Math.max(1, now - lastMoveT);
      velY = velY * 0.7 + (e.deltaX / dt) * 0.3;
      lastMoveT = now;
      ensureDriver();
      clearTimeout(this._wheelEndTimer);
      this._wheelEndTimer = setTimeout(() => {
        dragging = false;
        if (Math.abs(velY) > 0.02) ensureDriver(); else stopGlide();
      }, 100);
    };
    window.addEventListener('wheel', this._onWheel, { passive: false });

    this._onTouchStart = (e) => {
      if (e.touches.length) { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }
      dragging = false;
      velY = 0; pending = 0; remainder = 0;
      lastMoveT = performance.now();
    };
    this._onTouchMove = (e) => {
      if (!e.touches.length) return;
      const dx = tsx - e.touches[0].clientX, dy = tsy - e.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 4) {
        e.preventDefault();
        dragging = true;
        pending += dx;
        tsx = e.touches[0].clientX; tsy = e.touches[0].clientY;
        const now = performance.now(), dt = Math.max(1, now - lastMoveT);
        velY = velY * 0.7 + (dx / dt) * 0.3;
        lastMoveT = now;
        ensureDriver();
      }
    };
    this._onTouchEnd = () => {
      dragging = false;
      if (Math.abs(velY) > 0.02) ensureDriver(); else stopGlide();
    };
    window.addEventListener('touchstart', this._onTouchStart, { passive: true });
    window.addEventListener('touchmove', this._onTouchMove, { passive: false });
    window.addEventListener('touchend', this._onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
  }

  componentDidUpdate(prevProps, prevState) { this._syncRoute(prevProps); this._lite.onUpdate(prevState); if (this._onScroll) this._onScroll(); this._initMap(); }

  _clinicVals() {
    const st = this.state, assured = st.clinicType === 'assured';
    const tab = (on) => ({ background: on ? '#2B2342' : '#fff', color: on ? '#fff' : '#4A3E78', border: '1.5px solid ' + (on ? '#2B2342' : 'transparent'), padding: '9px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 700 });
    const DOW = ['SUN','MON','TUE','WED','THU','FRI','SAT'], MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const today = new Date();
    const groups = [['Morning',['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM']],['Afternoon',['12:30 PM','1:00 PM','2:30 PM','3:00 PM','3:30 PM']],['Evening',['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:30 PM','8:00 PM']]];
    const taken = (d, gi, ti) => ((d * 7 + gi * 5 + ti * 3) % 5 === 0) || (d === 0 && gi === 0);
    const days = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(today); dt.setDate(today.getDate() + d);
      let free = 0; groups.forEach((g, gi) => g[1].forEach((_, ti) => { if (!taken(d, gi, ti)) free++; }));
      const on = st.clDay === d;
      days.push({
        dow: d === 0 ? 'TODAY' : DOW[dt.getDay()], date: String(dt.getDate()), count: free + ' slots', label: (d === 0 ? 'Today' : DOW[dt.getDay()].charAt(0) + DOW[dt.getDay()].slice(1).toLowerCase()) + ', ' + dt.getDate() + ' ' + MON[dt.getMonth()],
        pick: () => this.setState({ clDay: d, clSlot: null }),
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '12px 6px', borderRadius: 16, background: on ? '#6351A1' : '#F7F4FD', color: on ? '#fff' : '#2B2342', border: '1.5px solid ' + (on ? '#6351A1' : '#EAE4F6') }
      });
    }
    const clSlotGroups = groups.map((g, gi) => ({
      label: g[0],
      slots: g[1].map((time, ti) => {
        const off = taken(st.clDay, gi, ti), key = gi + '-' + ti, on = st.clSlot === key;
        return {
          time, off, pick: () => { if (!off) this.setState({ clSlot: key }); },
          style: { padding: '10px 8px', borderRadius: 12, fontSize: 14, fontWeight: 700, textAlign: 'center', cursor: off ? 'not-allowed' : 'pointer',
            background: off ? '#F5F4F8' : on ? '#6351A1' : '#fff', color: off ? '#B3ADC4' : on ? '#fff' : '#2B2342',
            border: '1.5px solid ' + (off ? '#F0EEF4' : on ? '#6351A1' : '#E4DDF3'), textDecoration: off ? 'line-through' : 'none' }
        };
      })
    }));
    let picked = 'Pick a time for ' + days[st.clDay].label;
    if (st.clSlot) { const [gi, ti] = st.clSlot.split('-').map(Number); picked = days[st.clDay].label + ' · ' + groups[gi][1][ti]; }
    return {
      clAssured: assured, clRegular: !assured, clTabRegular: tab(!assured), clTabAssured: tab(assured),
      viewRegular: () => this.setState({ clinicType: 'regular' }), viewAssured: () => this.setState({ clinicType: 'assured' }),
      clDays: days, clSlotGroups, clPicked: picked,
      grIsDog: st.grPet !== 'cat', grIsCat: st.grPet === 'cat',
      grPickDog: () => this.setState({ grPet: 'dog' }), grPickCat: () => this.setState({ grPet: 'cat' }),
      grTabDog: { padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 700, background: st.grPet !== 'cat' ? '#6351A1' : 'transparent', color: st.grPet !== 'cat' ? '#fff' : '#4A3E78' },
      grTabCat: { padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 700, background: st.grPet === 'cat' ? '#6351A1' : 'transparent', color: st.grPet === 'cat' ? '#fff' : '#4A3E78' },
      clMapRef: this.clMap, clLocate: () => this._locate(), clDistance: st.clDist || 'Locating…',
      goCare: () => { this._killMap(); this.setState({ page: 'care' }); window.scrollTo(0, 0); }
    };
  }

  _killMap() { if (this._map) { this._map.remove(); this._map = null; this._userMk = null; } }
  _initMap() {
    const el = this.clMap.current;
    if (!el) { if (this._map) this._killMap(); return; }
    if (this._map && this._mapEl === el) return;
    if (!window.L) { clearTimeout(this._mapT); this._mapT = setTimeout(() => this._initMap(), 300); return; }
    this._killMap();
    const L = window.L, C = this.state.page === 'groomer' ? [19.0330, 73.0297] : [18.5382, 73.7964];
    this._mapEl = el;
    this._map = L.map(el, { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView(C, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(this._map);
    L.circleMarker(C, { radius: 10, color: '#fff', weight: 3, fillColor: '#6351A1', fillOpacity: 1 }).addTo(this._map).bindTooltip(this.state.page === 'groomer' ? 'Snip & Sniff Grooming' : 'PZB Vet Clinic');
    this._locate();
  }
  _locate() {
    if (!navigator.geolocation) { this.setState({ clDist: 'Location unavailable on this device' }); return; }
    this.setState({ clDist: 'Finding your location…' });
    navigator.geolocation.getCurrentPosition((pos) => {
      if (!this._map) return;
      const L = window.L, U = [pos.coords.latitude, pos.coords.longitude], C = this.state.page === 'groomer' ? [19.0330, 73.0297] : [18.5382, 73.7964];
      if (this._userMk) this._userMk.remove();
      this._userMk = L.circleMarker(U, { radius: 9, color: '#fff', weight: 3, fillColor: '#CA5C00', fillOpacity: 1 }).addTo(this._map).bindTooltip('You');
      this._map.fitBounds(L.latLngBounds([U, C]).pad(0.25), { maxZoom: 15 });
      const km = this._map.distance(U, C) / 1000;
      this.setState({ clDist: (km < 1 ? Math.round(km * 1000) + ' m' : km.toFixed(1) + ' km') + ' from your location' });
    }, () => this.setState({ clDist: 'Allow location access to see how far you are' }), { enableHighAccuracy: false, timeout: 8000 });
  }

  _ptVals() {
    const st = this.state;
    const scrollTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); };
    const ages = [['young', 'Under 6 months'], ['mid', '6 months – 5 years'], ['old', 'Over 5 years']];
    const notes = { young: 'Lite fits your pet today. Premium opens up at 6 months.', mid: 'Every plan fits. Premium also covers big vet bills.', old: 'Lite fits your pet. Premium is for pets up to 5 years.' };
    const tiers = [['Starter', 4999, 4999, 30000, 90000, 3000], ['Complete', 6999, 6999, 50000, 150000, 5000], ['Guardian', 9999, 7999, 100000, 300000, 10000], ['Ultimate', 13999, 9999, 200000, 600000, 20000]];
    const inr = (n) => '₹' + n.toLocaleString('en-IN');
    const t = tiers[st.ptTier] || tiers[2];
    this._ptTiers = tiers;
    const tab = (on) => ({ padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 700, background: on ? '#6351A1' : 'transparent', color: on ? '#fff' : '#4A3E78' });
    return {
      ptToPlans: () => scrollTo('pt-plans'), ptToCover: () => scrollTo('pt-cover'),
      ptAges: ages.map(([k, label]) => ({ label, pick: () => this.setState({ ptAge: k }),
        style: { padding: '9px 16px', borderRadius: 999, fontSize: 14, fontWeight: 700, background: st.ptAge === k ? '#2B2342' : '#fff', color: st.ptAge === k ? '#fff' : '#4A3E78', border: '1.5px solid ' + (st.ptAge === k ? '#2B2342' : '#E4DDF3') } })),
      ptAgeNote: notes[st.ptAge], ptPremOk: st.ptAge === 'mid', ptPremNo: st.ptAge !== 'mid',
      ptTiers: tiers.map(([label], i) => ({ label, pick: () => this.setState({ ptTier: i }),
        style: { padding: '10px 4px', borderRadius: 14, fontSize: 13.5, fontWeight: 800, background: st.ptTier === i ? '#fff' : 'transparent', color: st.ptTier === i ? '#4A3E78' : '#fff' } })),
      ptTierName: t[0], ptYear: inr(t[2]), ptWas: inr(t[1]), ptHasSave: t[1] > t[2], ptSave: inr(t[1] - t[2]),
      ptEach: inr(t[3]), ptTotal: inr(t[4]), ptMort: inr(t[5]),
      ptIsIn: st.ptCov === 'in', ptIsOut: st.ptCov === 'out', ptShowIn: () => this.setState({ ptCov: 'in' }), ptShowOut: () => this.setState({ ptCov: 'out' }),
      ptTabIn: tab(st.ptCov === 'in'), ptTabOut: tab(st.ptCov === 'out')
    };
  }

  _subVals() {
    const st = this.state, sub = st.sub;
    const btn = (on) => ({ width: '100%', padding: '15px 20px', borderRadius: 999, fontSize: 15.5, fontWeight: 700, background: on ? '#CA5C00' : '#E6E3EC', color: on ? '#fff' : '#A39DB3', cursor: on ? 'pointer' : 'not-allowed' });
    const setSub = (s) => { this.setState({ sub: s }); document.body.style.overflow = s ? 'hidden' : ''; };
    const startTimer = () => { clearInterval(this._otpT); this.setState({ otpLeft: 60 }); this._otpT = setInterval(() => this.setState(p => { if (p.otpLeft <= 1) { clearInterval(this._otpT); return { otpLeft: 0 }; } return { otpLeft: p.otpLeft - 1 }; }), 1000); };
    const focusOtp = (i) => setTimeout(() => { const el = document.getElementById('pz-otp-' + i); if (el) { el.focus(); el.select && el.select(); } }, 0);
    const phoneOk = /^[6-9]\d{9}$/.test(st.subPhone);
    const otpOk = st.otp.every(d => d !== '');
    const setOtp = (i, d) => this.setState(p => { const o = p.otp.slice(); o[i] = d; return { otp: o }; });
    const fmt = (d) => d.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + ' ' + d.getFullYear();
    const start = this._subStart || new Date(), end = new Date(start); end.setFullYear(end.getFullYear() + 1); end.setDate(end.getDate() - 1);
    const pet = st.subPets.find(p => p.id === st.subPetId);
    const np = st.np, npOk = !!(np.name.trim() && np.uname.trim() && np.type && np.gender && np.breed && (np.breed !== 'other' || np.other.trim()));
    const isNew = (this.props.demoUser ?? 'New user') === 'New user';
    const jn = st.jn, emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(jn.email.trim()), userOk = /^[a-z0-9_.]{3,20}$/i.test(jn.user.trim());
    const jnOk = !!(jn.name.trim() && emailOk && userOk);
    const BREEDS = { dog: ['Indie','Labrador Retriever','Golden Retriever','German Shepherd','Beagle','Shih Tzu','Pug','Rottweiler','Siberian Husky','Pomeranian'], cat: ['Indian Domestic','Persian','Siamese','Maine Coon','British Shorthair','Bengal','Ragdoll'] };
    const blankNp = { name: '', uname: '', type: '', gender: '', breed: '', breed2: '', other: '' };
    const segS = (on) => ({ padding: '12px 10px', borderRadius: 14, fontSize: 15, fontWeight: 700, background: on ? '#F3EEFF' : '#fff', color: on ? '#4A3E78' : '#5A5177', border: '1.5px solid ' + (on ? '#6351A1' : '#D9D1EE') });
    const setNp = (k, v) => this.setState(p => ({ np: { ...p.np, [k]: v } }));
    const prem = st.subPlan === 'prem', tier = st.subTier || { name: '', price: 0, cover: 0 };
    const inr = (n) => '₹' + n.toLocaleString('en-IN'), priceS = prem ? inr(tier.price) : '₹539';
    const kd = st.kycDay || 1, left = 11 - kd;
    const payAt = new Date(this._payAt || Date.now()); payAt.setDate(payAt.getDate() - (kd - 1));
    const deadline = new Date(payAt); deadline.setDate(deadline.getDate() + 10);
    const dayN = { 'Day 1': 1, 'Day 8': 8, 'Day 11 (window missed)': 11 }[this.props.premFormDay ?? 'Day 1'] || 1;
    const kyc = st.kyc, pinOk = (v) => /^[1-9]\d{5}$/.test(v);
    const kycOk = !!(kyc.front && kyc.left && kyc.right && kyc.selfie && pinOk(kyc.pPin) && kyc.pAddr.trim().length >= 8 && (kyc.sSame || (pinOk(kyc.sPin) && kyc.sAddr.trim().length >= 8)));
    const setK = (k, v) => this.setState(p => ({ kyc: { ...p.kyc, [k]: v } }));
    const blankKyc = { front: '', left: '', right: '', selfie: '', pPin: '', pAddr: '', sSame: false, sPin: '', sAddr: '' };
    const box = (on) => ({ width: 22, height: 22, borderRadius: 7, flex: 'none', boxSizing: 'border-box', display: 'grid', placeItems: 'center', background: on ? '#6351A1' : '#fff', border: '2px solid ' + (on ? '#6351A1' : '#C9C3D9'), color: '#fff', marginTop: 1 });
    const afterPet = () => { this._subStart = new Date(); this.setState({ sub: prem ? 'kyc' : 'done', kycDay: 1 }); };
    const ps = this._polStart || new Date(), pe = new Date(ps); pe.setFullYear(pe.getFullYear() + 1); pe.setDate(pe.getDate() - 1);
    const petName = pet ? pet.name : 'your pet';
    const mm = String(Math.floor(st.otpLeft / 60)).padStart(2, '0') + ':' + String(st.otpLeft % 60).padStart(2, '0');
    const base = {
      subOpen: !!sub, subIsPhone: sub === 'phone', subIsOtp: sub === 'otp', subIsPay: sub === 'pay', subIsPet: sub === 'pet', subIsAdd: sub === 'add', subIsDone: sub === 'done', subIsElig: sub === 'elig', subIsKyc: sub === 'kyc', subIsPdone: sub === 'pdone', subIsPlater: sub === 'plater', subIsPexp: sub === 'pexp', subIsApp: sub === 'app',
      openPrem: () => { const tr = (this._ptTiers || [])[st.ptTier] || ['Guardian', 0, 7999, 0, 300000]; this.setState({ subPlan: 'prem', subTier: { name: tr[0], price: tr[2], cover: tr[4] }, decl: false, kycDay: 1, kyc: blankKyc, subPhone: '', otp: ['', '', '', '', '', ''], subPetId: '', payBusy: false, jn: { name: '', email: '', user: '' }, np: blankNp }); setSub('phone'); setTimeout(() => { const el = document.getElementById('pz-sub-phone'); el && el.focus(); }, 60); },
      openSub: this._lite.continuePlan,
      closeSub: () => { clearInterval(this._otpT); clearTimeout(this._payT); setSub(null); },
      subPhone: st.subPhone, subPhoneBad: !phoneOk, subBtnPhone: btn(phoneOk),
      onSubPhone: (e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); this.setState({ subPhone: v }); if (sub === 'otp') { clearInterval(this._otpT); this.setState({ sub: 'phone', otp: ['', '', '', '', '', ''] }); } },
      sendOtp: () => { if (!phoneOk) return; this.setState({ sub: 'otp', otp: ['', '', '', '', '', ''] }); startTimer(); focusOtp(0); },
      otpBoxes: st.otp.map((v, i) => ({
        id: 'pz-otp-' + i, label: 'OTP digit ' + (i + 1), v,
        change: (e) => { const d = e.target.value.replace(/\D/g, '').slice(-1); setOtp(i, d); if (d && i < 5) focusOtp(i + 1); },
        key: (e) => { if (e.key === 'Backspace' && !st.otp[i] && i > 0) { setOtp(i - 1, ''); focusOtp(i - 1); } },
        paste: (e) => { const t = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!t) return; e.preventDefault(); const o = ['', '', '', '', '', '']; t.split('').forEach((c, k) => o[k] = c); this.setState({ otp: o }); focusOtp(Math.min(t.length, 5)); },
        style: { width: '100%', aspectRatio: '1 / 1.1', boxSizing: 'border-box', textAlign: 'center', fontSize: 20, fontWeight: 700, color: '#2B2342', border: '1.5px solid ' + (v ? '#6351A1' : '#D9D1EE'), borderRadius: 12, background: '#fff', outline: 'none', fontFamily: 'inherit', padding: 0 }
      })),
      otpTimer: mm, otpWait: st.otpLeft > 0, otpBad: !otpOk, subBtnOtp: btn(otpOk),
      resendStyle: { background: 'transparent', padding: '4px 0', fontSize: 14, fontWeight: 700, color: st.otpLeft > 0 ? '#B3ADC4' : '#6351A1', cursor: st.otpLeft > 0 ? 'default' : 'pointer' },
      resendOtp: () => { if (st.otpLeft > 0) return; this.setState({ otp: ['', '', '', '', '', ''] }); startTimer(); focusOtp(0); },
      verifyOtp: () => { if (!otpOk) return; clearInterval(this._otpT); this.setState({ sub: prem ? 'elig' : 'pay', payBusy: false }); },
      payIdle: !st.payBusy, payBusy: st.payBusy, subBtnPay: btn(!st.payBusy),
      payMethods: [['upi', 'UPI'], ['card', 'Debit / Credit card'], ['nb', 'Net banking']].map(([k, label]) => ({
        label, pick: () => this.setState({ payM: k }),
        style: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: '#2B2342', background: st.payM === k ? '#F7F4FD' : '#fff', border: '1.5px solid ' + (st.payM === k ? '#6351A1' : '#ECEBF1'), textAlign: 'left' },
        dot: { width: 18, height: 18, borderRadius: '50%', boxSizing: 'border-box', border: st.payM === k ? '5px solid #6351A1' : '2px solid #C9C3D9', flex: 'none' }
      })),
      payNow: () => { if (st.payBusy) return; this.setState({ payBusy: true }); this._payAt = Date.now(); this._payT = setTimeout(() => this.setState({ sub: isNew ? 'join' : 'pet', payBusy: false }), 1600); },
      subPets: st.subPets, subPetId: st.subPetId, petBad: !pet, subBtnPet: btn(!!pet),
      onPickPet: (e) => this.setState({ subPetId: e.target.value }),
      openAddPet: () => this.setState({ sub: 'add', np: blankNp, npBrQ: '' }),
      backToPet: () => this.setState({ sub: 'pet' }),
      subIsJoin: sub === 'join',
      jnName: jn.name, jnEmail: jn.email, jnUser: jn.user,
      onJnName: (e) => this.setState(p => ({ jn: { ...p.jn, name: e.target.value } })),
      onJnEmail: (e) => this.setState(p => ({ jn: { ...p.jn, email: e.target.value } })),
      onJnUser: (e) => this.setState(p => ({ jn: { ...p.jn, user: e.target.value.replace(/\s/g, '').slice(0, 20) } })),
      jnHint: jn.user && !userOk ? '3–20 letters, numbers, dots or underscores' : jn.email && !emailOk ? 'Enter a valid email address' : 'Your username is how other pet parents find you',
      jnHintColor: (jn.user && !userOk) || (jn.email && !emailOk) ? '#CE0049' : '#6F6590',
      jnBad: !jnOk, subBtnJoin: btn(jnOk),
      joinNext: () => { if (!jnOk) return; this.setState({ sub: 'add', np: blankNp, npBrQ: '' }); },
      npName: np.name, npUname: np.uname, npType: np.type, npBreed: np.breed, npBreed2: np.breed2, npOther: np.other,
      onNpName: (e) => setNp('name', e.target.value),
      onNpUname: (e) => setNp('uname', e.target.value.replace(/\s/g, '').slice(0, 20)),
      onNpType: (e) => this.setState(p => ({ npBrQ: '', npBrOpen: false, np: { ...p.np, type: e.target.value, breed: '', breed2: '', other: '' } })),
      onNpBreed: (e) => setNp('breed', e.target.value), onNpBreed2: (e) => setNp('breed2', e.target.value), onNpOther: (e) => setNp('other', e.target.value),
      npTypes: [{ v: 'dog', l: 'Dog' }, { v: 'cat', l: 'Cat' }],
      npBreeds: np.type ? [...BREEDS[np.type].map(b => ({ v: b, l: b })), { v: 'other', l: 'Other' }] : [],
      npHasType: !!np.type, npIsOther: np.breed === 'other',
      ...(() => {
        const all = np.type ? [...BREEDS[np.type].map(b => ({ v: b, l: b })), { v: 'other', l: 'Other' }] : [];
        const q = (st.npBrQ ?? '').trim().toLowerCase();
        let opts = q ? all.filter(o => o.v === 'other' || o.l.toLowerCase().includes(q)) : all;
        opts.sort((a, b) => (a.v === 'other') - (b.v === 'other') || (q ? (a.l.toLowerCase().startsWith(q) ? 0 : 1) - (b.l.toLowerCase().startsWith(q) ? 0 : 1) : 0));
        const hi = Math.min(st.npBrHi || 0, Math.max(0, opts.length - 1));
        const pick = (o) => this.setState(p => ({ np: { ...p.np, breed: o.v, other: o.v === 'other' ? p.np.other : '' }, npBrQ: o.l, npBrOpen: false, npBrHi: 0 }));
        return {
          npBreedQ: st.npBrQ ?? '', npBrOpen: !!st.npBrOpen && opts.length > 0,
          npBrNone: q && opts.length === 1 && opts[0].v === 'other',
          npBrOpts: opts.map((o, k) => ({ l: o.l, on: np.breed === o.v, pick: (e) => { e.preventDefault(); pick(o); },
            style: { padding: '10px 12px', borderRadius: 10, fontSize: 14.5, fontWeight: np.breed === o.v ? 700 : 500, color: '#2B2342', cursor: 'pointer', background: k === hi ? '#F3EEFF' : 'transparent', borderTop: o.v === 'other' && k > 0 ? '1.5px solid #F2EEFA' : 'none' } })),
          onNpBreedQ: (e) => { const v = e.target.value; const m = all.find(o => o.v !== 'other' && o.l.toLowerCase() === v.trim().toLowerCase()); this.setState(p => ({ npBrQ: v, npBrOpen: true, npBrHi: 0, np: { ...p.np, breed: m ? m.v : '' } })); },
          npBrFocus: () => this.setState({ npBrOpen: true }),
          npBrBlur: () => this.setState({ npBrOpen: false }),
          npBrKey: (e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); this.setState({ npBrOpen: true, npBrHi: Math.min(hi + 1, opts.length - 1) }); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); this.setState({ npBrHi: Math.max(hi - 1, 0) }); }
            else if (e.key === 'Enter' && st.npBrOpen && opts[hi]) { e.preventDefault(); pick(opts[hi]); }
            else if (e.key === 'Escape') this.setState({ npBrOpen: false });
          }
        };
      })(),
      npMale: () => setNp('gender', 'male'), npFemale: () => setNp('gender', 'female'),
      npMaleStyle: { ...segS(np.gender === 'male'), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
      npFemaleStyle: { ...segS(np.gender === 'female'), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
      npBad: !npOk, subBtnAdd: { ...btn(npOk), width: '100%' },
      cancelPet: () => this.setState({ sub: isNew && !st.subPets.some(p => p.mine) ? 'join' : 'pet' }),
      savePet: () => {
        if (!npOk) return;
        const id = 'p' + Date.now();
        this.setState(p => ({ subPets: [...p.subPets, { id, name: p.np.name.trim(), mine: true, ...p.np }], subPetId: id }));
        if (isNew) afterPet(); else this.setState({ sub: 'pet' });
      },
      activate: () => { if (!pet) return; afterPet(); },
      subStart: fmt(start), subEnd: fmt(end), subPetName: pet ? pet.name : 'your pet', subPetInitial: pet ? pet.name.charAt(0).toUpperCase() : '',
      getApp: () => {
        const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.matchMedia('(max-width: 640px)').matches;
        if (mobile) window.open('https://play.google.com/store/search?q=pawzeeble&c=apps', '_blank', 'noopener');
        else { this._appBack = sub; this.setState({ sub: 'app' }); }
      },
      backToDone: () => this.setState({ sub: this._appBack || 'done' }),
      subPlanLine: prem ? 'Pawteckt Premium · ' + tier.name + ' · ' + priceS + '/year' : 'Pawteckt lite · Annual · ₹539',
      subPlanName: prem ? 'Pawteckt Premium · ' + tier.name + ' · Annual' : 'Pawteckt lite · Annual',
      subPrice: priceS, subTierName: tier.name, subCover: inr(tier.cover || 0),
      petSub: prem ? 'Select the pet this policy is for. They must be between 6 months and 5 years old today.' : 'Add or select your pet to activate your Pet QR and start saving today',
      appLine: prem ? 'Scan with your phone camera to download the app. We’ll guide you through the policy form step by step.' : 'Scan with your phone camera to download the app and view ' + petName + '’s Pet QR.',
      eligItems: ['Your pet is a dog or cat aged between 6 months and 5 years today', 'Your pet is healthy, with no ongoing illness, injury or treatment', 'Vaccinations are up to date for your pet’s age', 'Your pet lives with you in India', 'Your pet isn’t used for breeding, racing, guarding or any paid work'].map(t => ({ t })),
      declOn: st.decl, declBox: box(st.decl), toggleDecl: () => this.setState(p => ({ decl: !p.decl })),
      eligBad: !st.decl, subBtnElig: btn(st.decl), eligNext: () => { if (st.decl) this.setState({ sub: 'pay' }); },
      kycPhotos: [['front', 'Front', 'Face and chest, looking at the camera', 'environment'], ['left', 'Left side', 'Full body, head to tail', 'environment'], ['right', 'Right side', 'Full body, head to tail', 'environment'], ['selfie', 'Selfie with ' + petName, 'You and your pet in one photo', 'user']].map(([k, label, hint, cap]) => ({
        id: 'pz-kyc-' + k, label, hint, cap, url: kyc[k], has: !!kyc[k], empty: !kyc[k],
        change: (e) => { const f = e.target.files && e.target.files[0]; if (f) setK(k, URL.createObjectURL(f)); }
      })),
      kycPAddr: kyc.pAddr, onKycPAddr: (e) => setK('pAddr', e.target.value),
      kycPPin: kyc.pPin, onKycPPin: (e) => setK('pPin', e.target.value.replace(/\D/g, '').slice(0, 6)),
      kycSSame: kyc.sSame, kycNotSame: !kyc.sSame, sameBox: box(kyc.sSame), toggleSSame: () => setK('sSame', !kyc.sSame),
      kycSAddr: kyc.sAddr, onKycSAddr: (e) => setK('sAddr', e.target.value),
      kycSPin: kyc.sPin, onKycSPin: (e) => setK('sPin', e.target.value.replace(/\D/g, '').slice(0, 6)),
      kycBad: !kycOk, subBtnKyc: btn(kycOk),
      submitKyc: () => { if (!kycOk) return; this._polStart = new Date(); this.setState({ sub: 'pdone' }); },
      kycLater: () => this.setState({ sub: 'plater', kycDay: 1 }),
      kycFillNow: () => this.setState({ sub: dayN > 10 ? 'pexp' : 'kyc', kycDay: dayN }),
      kycDeadline: fmt(deadline), kycDaysLeft: left === 1 ? '1 day' : left + ' days', payDate: fmt(payAt),
      polStart: fmt(ps), polEnd: fmt(pe)
    };
    return { ...base, ...this._lite.pageVals(), ...this._lite.vals(base, btn) };
  }

  componentWillUnmount() {
    this._lite.destroy();
    clearInterval(this._otpT); clearTimeout(this._payT); document.body.style.overflow = '';
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('scroll', this._onTopScroll);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('touchstart', this._onTouchStart);
    window.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchcancel', this._onTouchEnd);
    clearTimeout(this._wheelEndTimer);
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._glideRaf) cancelAnimationFrame(this._glideRaf);
  }

  go(page) {
    return () => {
      this._ecoEls = null; this._stageRect = null; this._lastCardGeom = null; this._ptCardEls = null;
      this._killMap();
      this.setState({ page, menu: false }, () => { this._stageRect = null; if (this._onScroll) this._onScroll(); });
      window.scrollTo(0, 0);
    };
  }

  renderVals() {
    const p = this.state.page;
    const PLUM = '#6351A1', ACCENT = '#CA5C00', INK = '#2B2342';

    const nav = [['home','Home'],['ecosystem','Ecosystem'],['about','About'],['community','Community'],['care','Find Care'],['blog','Blog']];
    const navStyle = (on) => ({
      background: on ? '#F2EEFA' : 'transparent', color: on ? PLUM : '#6F6590',
      fontSize: 14.5, fontWeight: on ? 700 : 500, padding: '10px 15px', borderRadius: 999, whiteSpace: 'nowrap'
    });

    const marqueeWords = ['Vet booking','Grooming','Dog walking','Boarding','Pawteckt insurance','24×7 vet chat','Sheru AI','Pet records','Clans community','Pet ambulance','Training','Pet QR tag'];
    const marquee = marqueeWords.concat(marqueeWords).map((text, i) => ({
      text,
      style: {
        background: i % 4 === 1 ? '#F2EEFA' : i % 4 === 3 ? '#FFF4E9' : '#fff',
        border: '1.5px solid #EDE7F7', color: '#4A3E78',
        padding: '10px 20px', borderRadius: 999, fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap'
      }
    }));

    const featData = [
      ['⚕','Pet Services','Explore and book verified & dependable pet services.','#F0EBFA',PLUM,'#F7F4FD'],
      ['◎','Community Network','of pet parents; become part of your pet’s clan and more.','#E4F4EF','#25795F','#F4FBF8'],
      ['✦','Sheru AI','Ask Sheru Ai anything regarding your pet, from fun suggestions to serious guidance. Sheru is available always.','#FFF3D9','#8A6300','#FFFBF0'],
      ['✉','Messenger','Consult verified vets free of charge and unlimited number of times 24/7, 365 and connect with other pet parents and service providers. Get all your updates here.','#F0EBFA',PLUM,'#F7F4FD'],
      ['◈','Pawzeeble Academy','Improve as a pet parent through interactive learning.','#FFF1E4',ACCENT,'#FFF9F2'],
      ['▤','Pet Profile Management','Automated record management of your pet, from invoices to vaccine/deworming cycles to document uploads. Everything in one consolidated space.','#E4EEFA','#2B5A96','#F4F8FD'],
      ['🛡','Pawteckt','Pawzeeble Assurance Benefits + HDFC ERGO Pet Insurance starting at just ₹45/month, billed annually.','#FFF1E4',ACCENT,'#FFF9F2']
    ];
    const features = featData.map((f, i) => ({
      glyph: f[0], title: f[1], body: f[2], slotId: 'pz-feat-' + (i + 1),
      isMark: i === featData.length - 1, isSlot: i !== featData.length - 1,
      cardStyle: {
        flex: 'none', width: 'min(84vw, 340px)', scrollSnapAlign: 'start',
        background: '#fff', border: '1.5px solid #EFEAF8', borderRadius: 28,
        padding: 20, display: 'flex', flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(43,35,66,.05)'
      },
      mediaStyle: { height: 260, borderRadius: 20, overflow: 'hidden', background: f[5], flex: 'none' },
      iconStyle: { width: 44, height: 44, borderRadius: 14, background: f[3], color: f[4], display: 'grid', placeItems: 'center', fontSize: 20, flex: 'none' }
    }));

    const bandSource = [
      ['pz-band-1','Pet parent with her dogs at the kennel', 250, 236, -2],
      ['pz-band-2','Freshly groomed and ready', 300, 216, 2],
      ['pz-band-3','Family walking their dog', 230, 260, -1],
      ['pz-band-4','Cat being cuddled at home', 280, 210, 2],
      ['pz-band-5','Puppy at its first vaccination', 240, 244, -3],
      ['pz-band-6','Dog walker on a morning round', 310, 200, 1],
      ['pz-band-7','Small dog posing for the camera', 220, 252, -2],
      ['pz-band-8','Pet parent and their Indie', 290, 228, 2]
    ];
    const photoBand = bandSource.concat(bandSource).map(b => ({
      id: b[0], hint: b[1],
      style: {
        flex: 'none', width: b[2], height: b[3], borderRadius: 26, overflow: 'hidden',
        transform: 'rotate(' + b[4] + 'deg)', boxShadow: '0 14px 32px rgba(43,35,66,.1)'
      }
    }));

    const cityNames = ['Mumbai','Navi Mumbai','Thane','Pune','Delhi NCR','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Jaipur','Lucknow','Kochi','Chandigarh'];
    const cities = cityNames.map((name, i) => ({
      name,
      style: {
        background: i < 4 ? '#FFC24B' : 'rgba(255,255,255,.08)',
        color: i < 4 ? INK : '#EBE6F7',
        border: i < 4 ? 'none' : '1.5px solid rgba(255,255,255,.2)',
        padding: '11px 19px', borderRadius: 999, fontSize: 15, fontWeight: 600
      }
    }));

    const testiData = [
      ['Bruno had a reaction to a new food at midnight. Sheru told me exactly what to watch for and a vet was on chat in two minutes.','Aparna R.','Kharghar, Navi Mumbai','pz-t1'],
      ['I moved cities and found a groomer in three taps. The Pawzeeble Assured badge actually means something — they were excellent.','Vikram S.','Koramangala, Bengaluru','pz-t2'],
      ['The insurance claim took one upload. I had expected a month of paperwork and it was settled in nine days.','Meher D.','Bandra, Mumbai','pz-t3']
    ];
    const testiTint = ['#F7F4FD','#fff','#FFF9F2'];
    const testimonials = testiData.map((t, i) => ({
      quote: t[0], name: t[1], meta: t[2], slotId: t[3],
      style: { background: testiTint[i], border: '1.5px solid #EFEAF8', borderRadius: 28, padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }
    }));

    const faqData = [
      ['Is Pawzeeble free to use?','Yes. Browsing providers, booking, records and the community are free. Pawteckt is an optional paid membership that adds discounts, unlimited vet chat and insurance.'],
      ['What does "Pawzeeble Assured" mean?','Our team visits the clinic or salon in person, checks registration and facilities, and reviews pet parent feedback every quarter. A provider loses the badge if standards slip.'],
      ['Who underwrites the insurance?','Pawteckt plans are underwritten by HDFC ERGO and distributed by Pawzeeble as an IRDAI registered partner.'],
      ['Which cities are you in?','Four: Mumbai, Pune, Bengaluru and Delhi NCR. We open a new city only once enough verified providers are onboarded, so the list is short on purpose.'],
      ['Can I keep records for more than one pet?','Yes. Each pet gets its own profile, calendar and document folder, and you can switch between them from the home screen.']
    ];
    const faqs = faqData.map((f, i) => {
      const open = this.state.faq === i;
      return {
        question: f[0], answer: f[1], open,
        toggle: () => this.setState(s => ({ faq: s.faq === i ? -1 : i })),
        wrapStyle: { background: open ? '#F7F4FD' : '#fff', border: '1.5px solid ' + (open ? '#DCD2F0' : '#EFEAF8'), borderRadius: 24, overflow: 'hidden' },
        iconStyle: {
          flex: 'none', width: 30, height: 30, borderRadius: '50%', background: open ? ACCENT : '#F2EEFA',
          color: open ? '#fff' : PLUM, display: 'grid', placeItems: 'center', fontSize: 19,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'all .2s'
        }
      };
    });

    const prodData = [
      ['◉','Pawzeeble App','The everyday hub','Bookings, records, reminders, Sheru AI and the Clans community — the app is where pet parenting actually happens day to day.',['Verified vets, groomers, walkers, boarders','Automatic vaccination and appointment reminders','Every document in one searchable folder'],'Download the app','/images/content/home-hero.png','pz-eco-1','Pet parent using the app'],
      ['🛡','Pawteckt','Membership and insurance','A membership that pays for itself in one grooming session, bundled with pet insurance underwritten by HDFC ERGO and claimable in the app.',['Up to 50% off across the network','Unlimited 24×7 licensed vet chat','Pet QR tag so a lost pet finds you'],'Explore Pawteckt','/images/content/select-plan.png','pz-eco-2','Dog wearing a QR tag'],
      ['▣','My Pawzmart','The marketplace','Pet products and merch designed for pets and the people who love them. Food, essentials, and tees your dog will judge you for wearing.',['Curated pet products, not an endless catalogue','Original merch for pet parents','Member pricing on every order'],'Visit My PawzMart','/images/brand/tostb-black.webp','pz-eco-3','Pet parent wearing Pawzeeble merch'],
      ['◧','Skale by Pawzeeble','For service providers','The business management tool for vet clinics and grooming salons. Appointments, clients, inventory and revenue in one dashboard, so you spend the day on animals instead of admin.',['See income, expenses and stock at a glance','Fewer no-shows with automatic reminders','Bookings from Pawzeeble land straight in your schedule'],'Visit Skale','/images/content/vet-dashboard.png','pz-eco-4','Vet team at the front desk']
    ];
    const prodBg = ['#FFFCF6','#F7F4FD','#FFFCF6','#F7F4FD'];
    const prodIcon = [['#F0EBFA',PLUM],['#FFF1E4',ACCENT],['#FFF3D9','#8A6300'],['#E4F4EF','#25795F']];
    const prodBlob = ['#F0EBFA','#FFE9D6','#FFF3D9','#DFF0EA'];
    const products = prodData.map((d, i) => {
      const left = i % 2 === 0;
      const wide = i === 3;
      return {
        glyph: d[0], title: d[1], tagline: d[2], body: d[3], points: d[4], cta: d[5], shot: d[6],
        slotId: d[7], photoHint: d[8],
        action: this.go(i === 1 ? 'pawteckt' : i === 2 ? 'pawzmart' : i === 3 ? 'skale' : 'download'),
        sectionStyle: { background: prodBg[i], padding: '54px 22px' },
        innerStyle: { maxWidth: 1260, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(310px,100%),1fr))', gap: 48, alignItems: 'center' },
        textOrder: { order: left ? 1 : 2 },
        visualOrder: { order: left ? 2 : 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 500 },
        iconStyle: { width: 46, height: 46, borderRadius: 15, background: prodIcon[i][0], color: prodIcon[i][1], display: 'grid', placeItems: 'center', fontSize: 21, flex: 'none' },
        taglineStyle: { fontSize: 14, fontWeight: 700, color: '#A44A00', background: '#FFF1E4', padding: '7px 14px', borderRadius: 999 },
        blobStyle: { position: 'absolute', width: 'min(72%,300px)', aspectRatio: '1/1', background: prodBlob[i], borderRadius: '48% 52% 44% 56% / 54% 46% 54% 46%' },
        photoPos: left ? { left: '2%', bottom: '6%' } : { right: '2%', top: wide ? -56 : '6%' },
        photoTilt: left ? 'rotate(-6deg)' : 'rotate(6deg)',
        frameStyle: wide
          ? { position: 'relative', zIndex: 2, width: 'min(100%,560px)' }
          : { position: 'relative', zIndex: 2, width: 248, borderRadius: 32, padding: 8, background: INK, boxShadow: '0 26px 54px rgba(43,35,66,.24)', transform: left ? 'rotate(2deg)' : 'rotate(-2deg)' },
        hasShot: !!d[6],
        screenStyle: wide
          ? { borderRadius: 0, overflow: 'visible' }
          : { borderRadius: 25, overflow: 'hidden', background: '#fff', height: 460 },
        shotId: 'pz-img-eco-shot-' + i,
        imgStyle: wide
          ? { width: '100%', display: 'block', aspectRatio: '3080/2338', filter: 'drop-shadow(0 26px 54px rgba(43,35,66,.22))' }
          : { width: '100%', display: 'block', aspectRatio: ({ 0: '720/4184', 1: '360/800', 2: '360/540' })[i] || '9/19' }
      };
    });

    const ecoLoop = [
      ['01','You book a vet in the app and the visit notes land in your pet\u2019s record.'],
      ['02','That record prefills a Pawteckt claim, so there is nothing to chase.'],
      ['03','The vet\u2019s prescription flows into My Pawzmart for refills.'],
      ['04','Your clinic runs on Skale, so the next visit starts with the full history.']
    ].map(s => ({ step: s[0], text: s[1] }));

    const statTint = [['#F0EBFA',INK],[PLUM,'#fff'],['#FFF1E4',INK],['#FFC24B',INK]];
    const stats = [['1.2L+','pet parents on the app'],['4','cities live today'],['3,400+','verified providers'],['2021','founded in Pune']].map((s, i) => ({
      value: s[0], label: s[1],
      style: { background: statTint[i][0], color: statTint[i][1], borderRadius: 26, padding: 26 }
    }));

    const timeline = [
      ['2021','Founders and a spreadsheet','Pawzeeble starts as a list of vets in Pune that Yashh Sathe shares in a neighbourhood WhatsApp group.'],
      ['2022','The app ships','Booking, pet records and reminders go live. The first thousand pet parents join in eleven weeks.'],
      ['2023','Clans and Sheru AI','Breed communities open and Sheru begins answering the 2am questions nobody wants to call about.'],
      ['2024','Pawteckt launches','Membership plus insurance, underwritten by HDFC ERGO, at a price a first-time pet parent can say yes to.'],
      ['2025','Bengaluru and Delhi NCR','Provider verification teams go on the ground, taking Pawzeeble to four cities.'],
      ['2026','Pawzeeble Vets','Our first own-brand clinic opens in Kharghar, with published pricing and same-day member slots.']
    ].map((t, i) => ({
      year: t[0], title: t[1], body: t[2],
      dotStyle: { position: 'absolute', left: -9, top: 19, width: 16, height: 16, borderRadius: '50%', background: i === 5 ? ACCENT : PLUM, border: '3px solid #FFFCF6' }
    }));

    const mentors = [
      ['Mentor Name','Investor · Seed round','Backed the first version when it was a spreadsheet of clinics in Kharghar.','pz-mentor-1'],
      ['Mentor Name','Investor · Angel','Twenty years building consumer marketplaces in India. Keeps us honest on unit economics.','pz-mentor-2'],
      ['Mentor Name','Investor · Advisor','Veterinary supply background. Opens the doors we would otherwise knock on for months.','pz-mentor-3']
    ].map(m => ({ name: m[0], role: m[1], bio: m[2], slotId: m[3] }));

    const teamTint = ['#F7F4FD','#fff','#FFF9F2','#fff'];
    const team = [
      ['Yashh Sathe','Founder','Started Pawzeeble after one bad Saturday night in Kharghar. Beagle owner, which explains a lot.','pz-team-1'],
      ['Employee Name','Head of Operations','Built the provider verification programme from the very first clinic visit onward.','pz-team-2'],
      ['Employee Name','Head of Veterinary','Fifteen years in small animal practice. Reviews everything clinical we publish.','pz-team-3'],
      ['Employee Name','Head of Engineering','Makes sure the app works on a two-bar connection in a clinic basement.','pz-team-4']
    ].map((m, i) => ({
      name: m[0], role: m[1], bio: m[2], slotId: m[3],
      style: { background: teamTint[i], border: '1.5px solid #EFEAF8', borderRadius: 28, padding: 16 }
    }));

    const roles = [
      ['Senior Android Engineer','Engineering','Pune','Full-time'],
      ['Provider Verification Lead','Operations','Bengaluru','Full-time'],
      ['Veterinary Content Editor','Veterinary','Remote, India','Contract'],
      ['Community Manager, Clans','Community','Pune','Full-time'],
      ['Claims Associate, Pawteckt','Insurance','Mumbai','Full-time']
    ].map(r => ({ title: r[0], team: r[1], place: r[2], type: r[3] }));

    const N = 29, qrCells = [];
    const inFinder = (x, y) => {
      const box = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
      return box(0, 0) || box(N - 7, 0) || box(0, N - 7);
    };
    const finderOn = (x, y) => {
      const ox = x >= N - 7 ? N - 7 : 0, oy = y >= N - 7 ? N - 7 : 0;
      const lx = x - ox, ly = y - oy;
      const ring = Math.max(Math.abs(lx - 3), Math.abs(ly - 3));
      return ring !== 2;
    };
    let seed = 20260911;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        if (inFinder(x, y)) { if (finderOn(x, y)) qrCells.push({ x, y }); continue; }
        if ((x === 8 && y < 9) || (y === 8 && x < 9)) continue;
        if (x >= N - 9 && y === 8) continue;
        if (x === 8 && y >= N - 9) continue;
        if ((seed >> 7) % 100 < 46) qrCells.push({ x, y });
      }
    }
    for (let i = 0; i < 5; i++) { qrCells.push({ x: N - 9 + i, y: N - 9 }); qrCells.push({ x: N - 9, y: N - 9 + i }); qrCells.push({ x: N - 5, y: N - 9 + i }); qrCells.push({ x: N - 9 + i, y: N - 5 }); }
    qrCells.push({ x: N - 7, y: N - 7 });

    const leadPost = {
      kicker: 'Vet notes', author: 'Dr. Rhea Menon', meta: 'Reviewed 4 Sept 2026 · 7 min read',
      title: 'The monsoon skin problems we see every single July',
      dek: 'Hot spots, ear infections and the paw-lick cycle. What to do at home, and the three signs that mean you should stop treating it yourself.'
    };
    const homePostData = [
      ['Podcast','Ep. 14: What a ₹39 insurance plan actually covers','28 min · YouTube','▶'],
      ['Nutrition','How much should an Indian street-adopted pup eat?','5 min read','—'],
      ['Behaviour','Your dog is not being stubborn during Diwali','6 min read','—'],
      ['Podcast','Ep. 13: Inside a Pawzeeble verification visit','34 min · YouTube','▶']
    ];
    const homePosts = homePostData.map((b, i) => ({
      kicker: b[0], title: b[1], meta: b[2], mark: b[3], isPlay: b[3] === '▶', notPlay: b[3] !== '▶',
      rowStyle: { background: 'none', padding: '16px 0', display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', width: '100%', borderTop: i === 0 ? 'none' : '1px solid #E9E2F6' },
      markStyle: {
        flex: 'none', width: 34, height: 34, borderRadius: '50%',
        background: b[3] === '▶' ? 'transparent' : '#F2EEFA', color: '#6351A1',
        display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700
      }
    }));

    const articles = [
      ['Vet notes','Vaccination schedules, translated out of vet-speak','What your pup actually needs in year one, and what can wait.','Dr. Rhea Menon · 6 min read','pz-art-1','Puppy at a vet clinic'],
      ['City guide','Where to walk a dog in Pune without fighting traffic','Six routes our team walks their own dogs on, with water stops.','Sneha Iyer · 5 min read','pz-art-2','Dog walking in a park'],
      ['Cats','Why your cat stopped using the litter box','It is almost never spite. A short diagnostic checklist.','Dr. Aman Qureshi · 8 min read','pz-art-3','Cat at home'],
      ['Insurance','Reading a pet insurance policy without losing an afternoon','Waiting periods, sub-limits and the two clauses that matter.','Pawteckt team · 9 min read','pz-art-4','Pet parent with paperwork'],
      ['Grooming','Double coats and the myth of the summer shave','What shaving a Husky in Chennai actually does to its skin.','Dr. Rhea Menon · 4 min read','pz-art-5','Groomer brushing a dog'],
      ['Adoption','Bringing home an Indie: the first seventy-two hours','Set-up, feeding and the decompression window nobody mentions.','Yashh Sathe · 7 min read','pz-art-6','Indie dog being adopted']
    ].map((a, i) => ({ kicker: a[0], title: a[1], dek: a[2], meta: a[3], slotId: a[4], photoHint: a[5],
      author: a[3].split(' · ')[0], readTime: a[3].split(' · ')[1],
      open: () => { this.setState({ page: 'post', blogPost: i }); window.scrollTo(0, 0); } }));

    const postTags = [
      ['Vet notes','Puppies','Vaccination'], ['City guide','Pune','Walks'], ['Cats','Behaviour','Health'],
      ['Insurance','Pawteckt','Claims'], ['Grooming','Double coats','Summer'], ['Adoption','Indie dogs','First week']
    ];
    const postDates = ['12 Sep 2026','4 Sep 2026','28 Aug 2026','19 Aug 2026','9 Aug 2026','30 Jul 2026'];
    const postBodies = [
      [['p','Most puppies in India come home at around eight weeks, and the first vet visit usually arrives with a printed chart full of abbreviations. DHPPi, ARV, booster, deworm. It is a lot to take in while a small dog chews your shoelace.'],['h','The core shots'],['p','The combination vaccine (often written DHPPi or DA2PP) protects against distemper, hepatitis, parvovirus and parainfluenza. It is given in a series, usually at six to eight weeks, then every three to four weeks until about sixteen weeks. Parvo is the one to take seriously: it spreads through soil and shoes, and young puppies are most at risk.'],['p','Rabies is given once at around twelve weeks and boosted every year. In India this is not optional, and most boarders and groomers will ask to see the record.'],['q','If your puppy misses a dose by a week, the series does not restart. Book the next one and keep going.'],['h','What can wait'],['p','Leptospirosis, kennel cough and corona vaccines are situational. Ask your vet about them if your puppy will be around many other dogs, near stagnant water in the monsoon, or boarding regularly.'],['p','Every dose you log in the Pawzeeble app is added to your pet profile, with a reminder a few days before the next one is due.']],
      [['p','Pune has more green pockets than it gets credit for, but most of them sit behind a busy road. We asked our team where they actually walk their own dogs.'],['h','Early mornings'],['p','Vetal Tekdi and ARAI Hill are best before seven, when the trails are cool and the parking is easy. Carry water: there is none on the hill.'],['p','Kamala Nehru Park in Erandwane is small but shaded and fenced, which makes it good for a nervous or reactive dog.'],['q','Walk in the first hour after sunrise between April and June. The tarmac gets hot enough to burn paws by nine.'],['h','Evenings'],['p','The riverside path near Aundh is flat and wide, with space to pass other dogs. Baner Hill works too, though it gets crowded on weekends.']],
      [['p','A cat that stops using the litter box is telling you something. It is rarely about behaviour, and almost never about spite.'],['h','Rule out the medical causes first'],['p','Urinary tract infections, bladder crystals and kidney problems all make urination painful, and a cat can start to associate the box with that pain. If your cat is straining, going often, or peeing outside the box in small amounts, see a vet the same day.'],['q','A male cat straining with nothing coming out is an emergency. Do not wait until morning.'],['h','Then look at the box'],['p','Check the location, the litter and the number of boxes. The usual rule is one box per cat, plus one. Covered boxes trap smell, which is nicer for you and worse for the cat.'],['p','Changes at home, like a new pet, a move or a new baby, can also cause stress. Give it time and keep the routine steady.']],
      [['p','A pet insurance policy runs to twenty pages, but only a few clauses decide whether a claim gets paid.'],['h','Waiting periods'],['p','Most policies cover illness only after a waiting period, often thirty days from the start date. Accidents are usually covered sooner. If your pet falls ill in week two, the claim will be declined.'],['h','Sub-limits'],['p','A policy may promise a large sum insured but cap specific treatments, like surgery or diagnostics, at a smaller amount. Read the schedule of benefits, not just the headline number.'],['q','Pre-existing conditions are the most common reason claims are declined. Declare everything when you sign up.'],['p','Pawteckt claims are filed from the app. Upload the invoice and prescription, and our claims team handles the rest with HDFC ERGO.']],
      [['p','Every summer, groomers get requests to shave Huskies, Golden Retrievers and German Shepherds down to the skin. It feels kind. It usually is not.'],['h','How a double coat works'],['p','A double coat has a soft undercoat and longer guard hairs on top. Together they trap a layer of air that insulates against heat as well as cold, and they protect the skin from the sun.'],['p','Shave it off and the skin is exposed to direct sunlight. Sunburn and heat stress both become more likely, not less.'],['q','Some double coats never grow back the same way after a close shave.'],['h','What helps instead'],['p','Regular brushing to remove the loose undercoat does more for cooling than any haircut. A professional de-shedding session every six to eight weeks in summer is a good routine.']],
      [['p','Indie dogs are resilient, clever and often a little wary at first. The first three days set the tone for everything after.'],['h','Before they arrive'],['p','Set up a quiet corner with a bed, water and a few chew toys. Keep other pets and visitors away for the first day or two.'],['h','The first seventy-two hours'],['p','Many rescued dogs need time to decompress. They may not eat much, may hide, or may sleep far more than you expect. This is normal. Let them come to you.'],['q','Do not rush baths, new people or long walks. Keep the first few days boring on purpose.'],['p','Book a general check-up within the first week. Your vet will check for ticks, start or continue vaccinations, and plan deworming.']]
    ];
    const LEAD = articles.length;
    const allPosts = [...articles, {
      kicker: 'Vet notes', title: 'The monsoon skin problems we see every single July',
      dek: 'Hot spots, ear infections and the paw-lick cycle. What to do at home, and the three signs that mean you should stop treating it yourself.',
      meta: 'Dr. Rhea Menon · 7 min read', author: 'Dr. Rhea Menon', readTime: '7 min read',
      slotId: 'pz-journal-lead', photoHint: 'Vet examining a puppy',
      open: () => { this.setState({ page: 'post', blogPost: LEAD }); window.scrollTo(0, 0); }
    }];
    postTags.push(['Vet notes','Monsoon','Skin care']);
    postDates.push('4 Sep 2026');
    postBodies.push([
      ['p','Every July, clinics across Mumbai and Pune fill up with dogs scratching, licking and shaking their heads. Humidity, wet fur and muddy walks create the conditions that yeast and bacteria like best.'],
      ['h','Hot spots'],['p','A hot spot is a patch of red, moist, inflamed skin that can appear within hours. It often starts where the coat stays damp, such as under the collar or around the tail. Trim the hair around it, keep it clean and dry, and stop your dog from licking it.'],
      ['h','Ear infections'],['p','Floppy-eared breeds like Cocker Spaniels, Labradors and Beagles are most prone. Watch for head shaking, a sour smell or dark discharge. Dry the ears gently after every bath or rainy walk.'],
      ['h','The paw-lick cycle'],['p','Wet paws that are not dried properly can develop fungal infections between the toes. Licking keeps them wet, which makes the infection worse. Wipe and dry paws after each walk, including between the pads.'],
      ['q','Stop treating it at home if the area is spreading, bleeding or smells bad, if your dog is off food, or if nothing improves in two days.'],
      ['p','You can chat with a Pawzeeble vet any time from the app, and share photos of the affected area before deciding whether a clinic visit is needed.']
    ]);
    const bi = Math.min(this.state.blogPost || 0, LEAD);
    const post = { ...allPosts[bi], tags: postTags[bi], date: postDates[bi],
      body: postBodies[bi].map(b => ({ text: b[1], isP: b[0] === 'p', isH: b[0] === 'h', isQ: b[0] === 'q' })) };
    const relatedPosts = bi === LEAD ? articles.slice(0, 3) : [1, 2, 3].map(k => allPosts[(bi + k) % allPosts.length]);
    const openLead = allPosts[LEAD].open;

    const podcasts = [
      ['14','What a ₹39 insurance plan actually covers','We open a real claim file and walk through it line by line.','Dr. Rhea Menon','28 min','pz-pod-1','Podcast studio with host'],
      ['13','Inside a Pawzeeble verification visit','A clinic walkthrough with the team that decides who gets the badge.','Sneha Iyer','34 min','pz-pod-2','Vet clinic interior'],
      ['12','Raising a dog in a one-bedroom flat','Space, noise and neighbours, with a behaviourist who does it herself.','Meera Kulkarni','41 min','pz-pod-3','Dog in a small apartment'],
      ['11','Street dogs, community feeding and the law','What is actually legal, and how to keep a colony healthy.','Adv. Nikhil Rao','37 min','pz-pod-4','Community feeding street dogs']
    ].map(e => ({ number: e[0], title: e[1], dek: e[2], guest: e[3], length: e[4], slotId: e[5], photoHint: e[6] }));

    const blogTabs = ['Articles','Podcasts'].map(label => {
      const on = this.state.blogTab === label;
      return {
        label, pick: () => this.setState({ blogTab: label }),
        style: {
          background: on ? '#2B2342' : '#fff', color: on ? '#fff' : '#4A3E78',
          border: '1.5px solid ' + (on ? '#2B2342' : '#E4DDF3'),
          padding: '11px 24px', borderRadius: 999, fontSize: 14.5, fontWeight: 700
        }
      };
    });

    const careCityNames = ['Mumbai','Pune','Bengaluru','Delhi NCR'];
    const careCatData = [
      ['50% OFF','Vet Clinics','Find trusted vets near you','Vet clinics','#0E7C6B','#0E7C6B','#fff','#D8EDE8','pz-cc-vet','Vet holding a puppy'],
      ['50% OFF','Groomers','Find groomers near you','Groomers','#C0405A','#D9536E','#fff','#FBD6DF','pz-cc-groom','Groomer brushing a dog'],
      ['COMING SOON','Boarders','Verified boarder near you','Boarders','#0E7C6B','transparent',PLUM,'#D8EDE8','pz-cc-board','Pet parent with a dog and cat'],
      ['COMING SOON','Trainers','Certified trainers near you','Trainers','#8A4B2A','transparent',PLUM,'#FCE3CB','pz-cc-train','Trainer with a German Shepherd']
    ];
    const careCategories = careCatData.map(d => {
      const on = this.state.service === d[3];
      return {
        badge: d[0], title: d[1], body: d[2], slotId: d[8], hint: d[9],
        pick: () => this.setState({ service: d[3] }),
        cardStyle: {
          position: 'relative', background: '#fff', border: '2px solid ' + (on ? d[4] : 'transparent'),
          borderRadius: 26, padding: 22, overflow: 'hidden', display: 'flex', gap: 8,
          minHeight: 186, boxShadow: '0 8px 26px rgba(43,35,66,.07)', width: '100%'
        },
        badgeStyle: {
          display: 'inline-block', background: d[5], color: d[6],
          border: d[5] === 'transparent' ? '1.5px solid ' + PLUM : 'none',
          padding: d[5] === 'transparent' ? '4.5px 11px' : '6px 12px',
          borderRadius: 8, fontSize: 11.5, fontWeight: 800, letterSpacing: '.04em'
        },
        titleStyle: { marginTop: 14, fontSize: 25, color: d[4], letterSpacing: '-.025em' },
        blobStyle: { position: 'absolute', right: -8, top: 14, bottom: 0, left: 6, background: d[7], borderRadius: '30px 8px 34px 10px', transform: 'rotate(-4deg)' }
      };
    });

    const pickCity = (e) => this.setState({ city: e.target.value });
    const pickService = (e) => this.setState({ service: e.target.value });
    const scrollToResults = () => {
      const el = document.getElementById('pz-care-results');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    };

    const careCities = careCityNames.map(name => {
      const on = this.state.city === name;
      return {
        name, pick: () => this.setState({ city: name }),
        style: {
          background: on ? '#6351A1' : '#F7F4FD', color: on ? '#fff' : '#4A3E78',
          border: '1.5px solid ' + (on ? '#6351A1' : '#E4DDF3'),
          padding: '10px 20px', borderRadius: 999, fontSize: 14.5, fontWeight: on ? 700 : 600
        }
      };
    });

    const serviceData = [['Vet clinics','⚕'],['Groomers','✂'],['Boarders','⌂'],['Trainers','◎'],['Ambulance','✚'],['Walking','🦮']];
    const careServices = serviceData.map(s => {
      const on = this.state.service === s[0];
      return {
        name: s[0], glyph: s[1], pick: () => this.setState({ service: s[0] }),
        style: {
          background: on ? '#FFF4E9' : '#fff', border: '1.5px solid ' + (on ? '#CA5C00' : '#E9E2F6'),
          borderRadius: 20, padding: '14px 16px', display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', gap: 10, color: '#2B2342', textAlign: 'left'
        },
        iconStyle: {
          width: 36, height: 36, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 17,
          background: on ? '#CA5C00' : '#F2EEFA', color: on ? '#fff' : '#6351A1'
        }
      };
    });

    const providerPool = [
      ['New Hope Animal Clinic','Kharghar','Mumbai','Vet clinics','4.8','Open till 10 PM','₹200 off first visit',['Pawzeeble Assured','Instant booking'],'Vet examining a dog'],
      ['Paw & Whiskers Vet Care','Vashi','Mumbai','Vet clinics','4.6','Tomorrow, 9:00 AM','',['Pawzeeble Assured'],'Vet clinic reception'],
      ['Snip & Sniff Grooming','Nerul','Mumbai','Groomers','4.7','Today, 5:30 PM','30% off for members',['Pawzeeble Assured','Instant booking'],'Groomer bathing a dog'],
      ['The Dog House Boarding','Panvel','Mumbai','Boarders','4.5','Fri, 8:00 AM','',['Pawzeeble Assured'],'Dogs at a boarding facility'],
      ['Bandra Pet Hospital','Bandra West','Mumbai','Vet clinics','4.9','Today, 7:15 PM','Free first teleconsult',['Pawzeeble Assured','Instant booking'],'Vet with a cat'],
      ['Furrever Grooming Studio','Andheri','Mumbai','Groomers','4.4','Tomorrow, 11:00 AM','',['Instant booking'],'Groomer trimming a dog'],
      ['Koregaon Park Vet Clinic','Koregaon Park','Pune','Vet clinics','4.7','Today, 6:00 PM','₹150 off vaccination',['Pawzeeble Assured','Instant booking'],'Vet checking a puppy'],
      ['Wag Walk Pune','Baner','Pune','Walking','4.6','Tomorrow, 7:00 AM','First walk free',['Pawzeeble Assured'],'Dog walker with two dogs'],
      ['Tailwaggers Training','Aundh','Pune','Trainers','4.8','Sat, 10:00 AM','',['Pawzeeble Assured'],'Trainer with a German Shepherd'],
      ['Koramangala Pet Clinic','Koramangala','Bengaluru','Vet clinics','4.8','Today, 8:30 PM','',['Pawzeeble Assured','Instant booking'],'Vet clinic in Bengaluru'],
      ['Indiranagar Grooming Co.','Indiranagar','Bengaluru','Groomers','4.5','Tomorrow, 12:00 PM','20% off first groom',['Instant booking'],'Cat being groomed'],
      ['24×7 Pet Ambulance BLR','City-wide','Bengaluru','Ambulance','4.9','Available now','',['Pawzeeble Assured'],'Pet ambulance'],
      ['Gurgaon Animal Hospital','Sector 54','Delhi NCR','Vet clinics','4.6','Today, 9:00 PM','',['Pawzeeble Assured'],'Veterinary hospital'],
      ['Saket Pet Boarding','Saket','Delhi NCR','Boarders','4.4','Mon, 9:00 AM','Third night free',['Instant booking'],'Dog in a boarding kennel'],
      ['Powai Pet Ambulance','City-wide','Mumbai','Ambulance','4.8','Available now','',['Pawzeeble Assured'],'Pet ambulance'],
      ['Cubbon Bark Walks','Indiranagar','Bengaluru','Walking','4.7','Tomorrow, 6:30 AM','',['Pawzeeble Assured'],'Dog walker in a city park']
    ];
    const careResults = providerPool
      .filter(r => r[2] === this.state.city && r[3] === this.state.service)
      .map((r, i) => ({
        name: r[0], area: r[1], kind: r[3], rating: '★ ' + r[4], slot: r[5],
        price: ({ 'Vet clinics': '₹499', 'Groomers': '₹799', 'Boarders': '₹900', 'Trainers': '₹1,200', 'Walking': '₹299' })[r[3]] || '₹499',
        offer: r[7].includes('Pawzeeble Assured') ? (r[6] || ({ 'Vet clinics': '20% off consultation', 'Groomers': '25% off first groom', 'Boarders': '15% off boarding', 'Trainers': '₹300 off first session', 'Walking': 'First walk free', 'Ambulance': '₹250 off pickup' })[r[3]]) : '', hasOffer: r[7].includes('Pawzeeble Assured'), badges: r[7],
        assured: r[7].includes('Pawzeeble Assured'), instant: !r[7].includes('Pawzeeble Assured') || r[7].includes('Instant booking'),
        distance: r[1] === 'City-wide' ? 'Comes to you' : ([1.4, 2.1, 0.8, 3.6, 1.9, 4.2, 2.7, 1.1][i % 8]) + ' km away',
        status: 'Open', hours: r[3] === 'Ambulance' ? 'Open 24 hours' : 'Closes ' + (['10:00 PM', '8:00 PM', '9:30 PM', '7:00 PM'][i % 4]),
        hasMore: r[7].includes('Pawzeeble Assured') && i % 3 !== 2, moreLabel: '+' + ([4, 2, 0][i % 3]) + ' more',
        logoId: 'pz-care-logo-' + r[0].replace(/[^a-z]/gi, ''),
        open: () => { this._killMap(); this.setState({ page: r[3] === 'Groomers' ? 'groomer' : 'clinic', clinicType: r[7].includes('Pawzeeble Assured') ? 'assured' : 'regular', clDay: 0, clSlot: null }); window.scrollTo(0, 0); },
        photoHint: r[8], slotId: 'pz-care-' + this.state.city.replace(/\s/g, '') + '-' + this.state.service.replace(/\s/g, '') + '-' + i
      }));

    const sheruPoints = [
      'Instant answers on symptoms, feeding, vaccination timing and behaviour',
      'Written from guidance our veterinarians review, not scraped from forums',
      'Escalates to a licensed vet on chat, or books an appointment, when it should'
    ];

    const ptBenefitData = [
      ['🛡','Pet insurance','Accident and illness cover underwritten by HDFC ERGO, with claims filed and tracked inside the app.'],
      ['💬','24×7 vet support','Unlimited chat with licensed veterinarians, any hour, for as many pets as you have on the account.'],
      ['▦','Pet QR tag','A scannable tag on your pet\u2019s collar. Whoever finds them reaches you in one scan, no phone number on display.'],
      ['%','Member pricing','Up to 50% off vets, grooming, boarding and training across the network, plus member rates on My Pawzmart.']
    ];
    const ptTint = [['#fff','#FFF1E4',ACCENT],['#F7F4FD','#F0EBFA',PLUM],['#fff','#E4F4EF','#25795F'],['#FFF9F2','#FFF3D9','#8A6300']];
    const ptBenefits = ptBenefitData.map((b, i) => ({
      glyph: b[0], title: b[1], body: b[2],
      cardStyle: { background: ptTint[i][0], border: '1.5px solid #EFEAF8', borderRadius: 28, padding: 28 },
      iconStyle: { width: 48, height: 48, borderRadius: 16, background: ptTint[i][1], color: ptTint[i][2], display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 700 }
    }));

    const planData = [
      ['Monthly','₹69','/month','Billed monthly, cancel any time','', ['Pet insurance cover','Unlimited 24×7 vet chat','Pet QR tag for one pet','Up to 50% off services','Member pricing on My Pawzmart'],'Start monthly', false],
      ['Annual','₹539','/year','Only ₹39/month · save ₹289 a year','Best value', ['Everything in Monthly','Four months free','Priority claim handling','Free annual wellness teleconsult','Pet QR tag replacement once a year'],'Start annual', true],
      ['Multi-pet','₹899','/year','Up to three pets on one account','', ['Everything in Annual','Cover for up to three pets','One claim dashboard for the household','Pet QR tag for each pet','Family sharing of pet records'],'Start multi-pet', false]
    ];
    const plans = planData.map(pl => {
      const hi = pl[7];
      return {
        name: pl[0], price: pl[1], period: pl[2], note: pl[3], flagText: pl[4], flag: !!pl[4], items: pl[5], cta: pl[6],
        cardStyle: {
          position: 'relative', background: hi ? PLUM : '#fff',
          border: '1.5px solid ' + (hi ? PLUM : '#EFEAF8'), borderRadius: 30, padding: 30,
          boxShadow: hi ? '0 18px 44px rgba(99,81,161,.28)' : 'none'
        },
        flagStyle: { position: 'absolute', right: 24, top: 24, background: '#FFC24B', color: INK, padding: '6px 13px', borderRadius: 999, fontSize: 12, fontWeight: 700 },
        nameStyle: { fontSize: 21, color: hi ? '#fff' : INK },
        priceStyle: { fontSize: 40, fontWeight: 800, letterSpacing: '-.03em', color: hi ? '#fff' : INK },
        periodStyle: { fontSize: 15, fontWeight: 600, color: hi ? '#D5CCEE' : '#6F6590' },
        noteStyle: { marginTop: 8, fontSize: 13.5, fontWeight: 600, color: hi ? '#FFC24B' : '#A44A00' },
        itemStyle: { display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, fontWeight: 500, color: hi ? '#EBE6F7' : '#2B2342' },
        tickStyle: { flex: 'none', width: 19, height: 19, borderRadius: '50%', background: hi ? 'rgba(255,255,255,.22)' : '#E4F4EF', color: hi ? '#fff' : '#25795F', display: 'grid', placeItems: 'center', fontSize: 10.5, marginTop: 2 },
        ctaStyle: {
          marginTop: 24, width: '100%', background: hi ? '#FFC24B' : ACCENT, color: hi ? INK : '#fff',
          fontSize: 15.5, fontWeight: 700, padding: '15px 24px', borderRadius: 999
        }
      };
    });

    const ptClaim = [
      ['01','Upload the bill','Photograph the invoice and the prescription. Your pet\u2019s records are already attached.'],
      ['02','We file it','Our claims team submits to HDFC ERGO and chases the paperwork on your behalf.'],
      ['03','Money back','Settled to your account, average nine days. You can watch the status in the app throughout.']
    ].map(c => ({ step: c[0], title: c[1], body: c[2] }));

    const ptFaqData = [
      ['Which plan is right for my pet?','Lite suits every pet and covers everyday care. If your pet is 6 months to 5 years old, a Premium plan adds help with medical bills. Pick the cover that matches how much support you would want.'],
      ['My pet is older than 5 years. Can I still join?','Yes, Lite has no age limit. Premium plans can only be bought for pets aged 6 months to 5 years.'],
      ['What does “₹50,000 each” mean?','Injury, illness and surgery each have their own limit. On Complete, you can claim up to ₹50,000 for each, ₹1,50,000 in total.'],
      ['Can I go to my own vet?','Yes. Partner vets also give you the member discounts on check-ups and other services.'],
      ['How do I claim on Premium?','Email care@hdfcergo.com or call +91 022 6158 2020, send the bills and papers they ask for, and the approved amount reaches you within 15 working days.'],
      ['Do discounts apply automatically?','No. Pick the coupon at checkout when you book in the app.']
    ];
    const ptFaqs = ptFaqData.map((f, i) => {
      const open = this.state.ptFaq === i;
      return {
        question: f[0], answer: f[1], open,
        toggle: () => this.setState(s => ({ ptFaq: s.ptFaq === i ? -1 : i })),
        wrapStyle: { background: open ? '#F7F4FD' : '#fff', border: '1.5px solid ' + (open ? '#DCD2F0' : '#EFEAF8'), borderRadius: 24, overflow: 'hidden' },
        iconStyle: {
          flex: 'none', width: 30, height: 30, borderRadius: '50%', background: open ? ACCENT : '#F2EEFA',
          color: open ? '#fff' : PLUM, display: 'grid', placeItems: 'center', fontSize: 19,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'all .2s'
        }
      };
    });

    const stubs = {
      community: ['Community','The Clans feed page is next in the queue, along with the individual provider page.'],
      skale: ['Skale by Pawzeeble','Skale has its own product site for vets and groomers. The link will point there once it is live.'],
      pawzmart: ['My PawzMart','The marketplace opens in its own storefront. The link will point there once it is live.'],
      download: ['Download Pawzeeble','Store links go here. For now, the app is on Google Play and the App Store.']
    };
    const stub = stubs[p];

    return {
      navItems: nav.map(n => ({ label: n[1], go: this.go(n[0]), style: navStyle(p === n[0]) })),
      railRef: this.rail, rowRef: this.row,
      scaleRef: this.scaleEl, stageRef: this.stage, markRef: this.mark, pinTitleRef: this.pinTitle,
      panelRef: this.panel, ptLogoRef: this.ptLogo, ptTitleRef: this.ptTitle,
      ecoWrapRef: this.ecoWrap, ecoStageRef: this.ecoStage,
      ptSubRef: this.ptSub, ptCardsRef: this.ptCards, ptCtaRef: this.ptCta,

      railPrev: () => { const n = this.rail.current; if (n) n.scrollBy({ left: -(n.clientWidth * 0.8), behavior: 'smooth' }); },
      railNext: () => { const n = this.rail.current; if (n) n.scrollBy({ left: n.clientWidth * 0.8, behavior: 'smooth' }); },
      menuOpen: !!this.state.menu, menuClosed: !this.state.menu,
      toggleMenu: () => this.setState(s => ({ menu: !s.menu })),
      closeMenu: () => this.setState({ menu: false }),
      drawerItems: nav.map(n => ({
        label: n[1], go: this.go(n[0]),
        style: {
          background: p === n[0] ? '#F2EEFA' : 'transparent', color: p === n[0] ? PLUM : INK,
          fontSize: 18, fontWeight: 700, padding: '15px 16px', borderRadius: 16, textAlign: 'left', width: '100%'
        }
      })),
      isHome: p === 'home', isEco1: p === 'ecosystem' || p === 'ecosystem1', isEco: p === 'journey', chrome: p !== 'journey', isAbout: p === 'about',
      isClinic: p === 'clinic', isGroomer: p === 'groomer', ...this._clinicVals(), ...this._subVals(), ...this._ptVals(),
      isCare: p === 'care', isBlog: p === 'blog', isPawteckt: p === 'pawteckt', isStub: !!stub,
      sheruPoints, ptBenefits, plans, ptClaim, ptFaqs,
      stubTitle: stub ? stub[0] : '', stubBody: stub ? stub[1] : '',
      goHome: this.go('home'), goEco: this.go('ecosystem'), goJourney: this.go('journey'), retakeJourney: () => { const w = this.ecoWrap && this.ecoWrap.current; let n = w && w.parentElement; while (n && n !== document.body) { const o = getComputedStyle(n).overflowY; if ((o === 'auto' || o === 'scroll') && n.scrollHeight > n.clientHeight) { n.scrollTo({ top: 0, behavior: 'smooth' }); return; } n = n.parentElement; } window.scrollTo({ top: 0, behavior: 'smooth' }); }, goEco1: this.go('ecosystem1'), goCare: this.go('care'), goBlog: this.go('blog'),
      goCommunity: this.go('community'), goPawteckt: this.go('pawteckt'), goDownload: this.go('download'),
      bookInApp: (e) => {
        const el = e && e.currentTarget;
        const ua = navigator.userAgent, ios = /iPhone|iPad|iPod/i.test(ua);
        const mobile = /Android|iPhone|iPad|iPod/i.test(ua) || window.matchMedia('(max-width: 640px)').matches;
        if (mobile) { window.open(ios ? 'https://apps.apple.com/in/search?term=pawzeeble' : 'https://play.google.com/store/search?q=pawzeeble&c=apps', '_blank', 'noopener'); return; }
        let what = 'Appointment';
        if (el) {
          const card = el.parentElement && el.parentElement.querySelector('h3');
          if (el.dataset.bk === 'svc') { let t = el.querySelector(':scope > div'); if (t && t.firstElementChild && t.firstElementChild.tagName === 'DIV') t = t.firstElementChild; what = t ? t.textContent : what; }
          else if (card) what = 'Appointment with ' + card.textContent;
          else if (el.parentElement && el.parentElement.querySelector('span')) what = el.parentElement.querySelector('span').textContent;
        }
        this.setState({ bkWhat: what });
      },
      bkOpen: !!this.state.bkWhat, bkWhat: this.state.bkWhat || '', closeBk: () => this.setState({ bkWhat: null }), stopBk: (e) => e.stopPropagation(),
      roles, qrCells, leadPost, homePosts, articles, podcasts, blogTabs, post, relatedPosts, openLead, isPost: p === 'post',
      tapCard: (e) => { const c = e.currentTarget, was = c.hasAttribute('data-open'); c.parentElement.querySelectorAll('[data-r="pincard"][data-open]').forEach(x => x.removeAttribute('data-open')); if (!was) c.setAttribute('data-open', ''); },
      backToBlog: () => { this.setState({ page: 'blog', blogTab: 'Articles' }); window.scrollTo(0, 0); },
      showArticles: this.state.blogTab === 'Articles', showPodcasts: this.state.blogTab === 'Podcasts',
      careCities, careServices, careResults, careCategories,
      toTopRef: this.toTopEl, toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      careCityNames, careServiceNames: serviceData.map(sd => sd[0]),
      city: this.state.city, service: this.state.service, pickCity, pickService, scrollToResults,
      careHeading: this.state.service + ' in ' + this.state.city,
      careCount: careResults.length === 1 ? '1 verified provider' : careResults.length + ' verified providers',
      careEmpty: careResults.length === 0,
      marquee, features, photoBand, cities, testimonials, faqs, products, ecoLoop, stats, timeline, team, mentors,
      clans: ['Labrador Clan','Indie Clan','Persian Cat Clan','Golden Retriever Clan','Beagle Clan','Shih Tzu Clan'],
      pawteckt: ['Up to 50% off vets, grooming and boarding','Unlimited 24×7 licensed vet chat','Pet QR tag so a lost pet finds its way home','Claims filed and tracked inside the app'],
      footerCols: [
        { head: 'Product', links: [{ label: 'Pawzeeble App', go: this.go('download') }, { label: 'Pawteckt', go: this.go('pawteckt') }, { label: 'My Pawzmart', go: this.go('ecosystem') }, { label: 'Skale by Pawzeeble', go: this.go('ecosystem') }] },
        { head: 'Company', links: [{ label: 'About us', go: this.go('about') }, { label: 'Ecosystem', go: this.go('ecosystem') }, { label: 'Blog', go: this.go('blog') }, { label: 'Community', go: this.go('community') }] },
        { head: 'Support', links: [{ label: 'Find care', go: this.go('care') }, { label: 'Help centre', go: this.go('blog') }, { label: 'Privacy policy', go: this.go('about') }, { label: 'Terms of service', go: this.go('about') }] }
      ]
    };
  }
}
