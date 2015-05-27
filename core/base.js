if (document.currentScript.override < window.ontando_core_modAPI_override) {
    console.log("Ignoring modAPI from " + document.currentScript.src);
} else {
    console.log("Loading modAPI from " + document.currentScript.src);
    window.ontando_core_modAPI_override = document.currentScript.override;
    (function(f, g) {
        function Fa() {
            ma();
            setInterval(ma, 18E4);
            z = ba = document.getElementById("canvas");
            e = z.getContext("2d");
            z.onmousedown = function(a) {
                if (na) {
                    var b = a.clientX - (5 + h / 5 / 2),
                        c = a.clientY - (5 + h / 5 / 2);
                    if (Math.sqrt(b * b + c * c) <= h / 5 / 2) {
                        I();
                        A(17);
                        return
                    }
                }
                O = a.clientX;
                P = a.clientY;
                ca();
                I()
            };
            z.onmousemove = function(a) {
                O = a.clientX;
                P = a.clientY;
                ca()
            };
            z.onmouseup = function(a) {};
            var a = !1,
                b = !1,
                c = !1;
            f.onkeydown = function(d) {
                /*new*/ if (window.ontando.core.keybinding.down(d)) { return; }
                32 != d.keyCode || a || (I(), A(17), a = !0);
                81 != d.keyCode || b || (A(18), b = !0);
                87 != d.keyCode || c || (I(), A(21), c = !0);
                27 == d.keyCode && oa(!0)
            };
            f.onkeyup = function(d) {
                /*new*/ if (window.ontando.core.keybinding.up(d)) { return; }
                32 == d.keyCode && (a = !1);
                87 == d.keyCode && (c = !1);
                81 == d.keyCode && b && (A(19), b = !1)
            };
            f.onblur = function() {
                A(19);
                c = b = a = !1
            };
            f.onresize = pa;
            pa();
            f.requestAnimationFrame ? f.requestAnimationFrame(qa) : setInterval(da, 1E3 / 60);
            setInterval(I, 40);
            ra();
            ea(g("#region").val());
            g("#overlays").show()
            /*new*/ window.ontando.script.connectDirect = ua;
            /*new*/ window.ontando.script.newDocument = $;
            /*new*/ window.ontando.script.sendActionPacket = A;
            /*new*/ window.ontando.core.init();
        }

        function Ga() {
            if (.5 > k) J = null;
            else {
                for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, p = 0; p < q.length; p++) q[p].shouldRender() && (e = Math.max(q[p].size, e), a = Math.min(q[p].x, a), b = Math.min(q[p].y, b), c = Math.max(q[p].x, c), d = Math.max(q[p].y, d));
                J = QUAD.init({
                    minX: a - (e + 100),
                    minY: b - (e + 100),
                    maxX: c + (e + 100),
                    maxY: d + (e + 100)
                });
                for (p = 0; p < q.length; p++)
                    if (a = q[p], a.shouldRender())
                        for (b = 0; b < a.points.length; ++b) J.insert(a.points[b])
            }
        }

        function ca() {
            Q = (O - h / 2) / k + s;
            R = (P - r / 2) / k + t
        }

        function ma() {
            null == S && (S = {}, g("#region").children().each(function() {
                var a = g(this),
                    b = a.val();
                b && (S[b] = a.text())
            }));
            g.get("http://m.agar.io/info", function(a) {
                var b = {},
                    c;
                for (c in a.regions) {
                    var d =
                        c.split(":")[0];
                    b[d] = b[d] || 0;
                    b[d] += a.regions[c].numPlayers
                }
                for (c in b) g('#region option[value="' + c + '"]').text(S[c] + " (" + b[c] + " players)")
            }, "json")
        }

        function sa() {
            g("#adsBottom").hide();
            g("#overlays").hide();
            ra()
            /*new*/ window.ontando.core.hideMenu();
        }

        function ea(a) {
            a && a != D && (g("#region").val() != a && g("#region").val(a), D = f.localStorage.location = a, g(".region-message").hide(), g(".region-message." + a).show(), g(".btn-needs-server").prop("disabled", !1), fa())
        }

        function oa(a) {
            B = null;
            Ha();
            g("#overlays").fadeIn(a ? 200 : 3E3);
            a || g("#adsBottom").fadeIn(3E3)
        }

        function ra() {
            g("#region").val() ? f.localStorage.location = g("#region").val() : f.localStorage.location && g("#region").val(f.localStorage.location);
            g("#region").val() ? g("#locationKnown").append(g("#region")) : g("#locationUnknown").append(g("#region"))
        }

        function Ha() {
            T && 3 == ga && (T = !1, setTimeout(function() {
                T = !0
            }, 3E5), googletag.pubads().refresh([f.mainAd]))
        }

        function ta() {
            console.log("Find " + D + K);
            g.ajax("http://m.agar.io/", {
                error: function() {
                    setTimeout(ta, 1E3)
                },
                success: function(a) {
                    a = a.split("\n");
                    ua("ws://" + a[0])
                },
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: D + K || "?"
            })
        }

        function fa() {
            D && (g("#connecting").show(), ta())
        }

        function ua(a) {
            /*new*/ a = f.ontando.core.connecting(a);
            if (m) {
                m.onopen = null;
                m.onmessage = null;
                m.onclose = null;
                try {
                    m.close()
                } catch (b) {}
                m = null
            }
            C = [];
            l = [];
            x = {};
            q = [];
            E = [];
            y = [];
            u = v = null;
            F = 0;
            console.log("Connecting to " + a);
            m = new WebSocket(a);
            m.binaryType = "arraybuffer";
            m.onopen = Ia;
            m.onmessage = Ja;
            m.onclose = Ka;
            m.onerror = function() {
                console.log("socket error")
            }
        }

        function Ia(a) {
            U = 500;
            g("#connecting").hide();
            console.log("socket open");
            a = new ArrayBuffer(5);
            var b = new DataView(a);
            b.setUint8(0, 254);
            b.setUint32(1, 1, !0);
            m.send(a);
            a = new ArrayBuffer(5);
            b = new DataView(a);
            b.setUint8(0, 255);
            b.setUint32(1, 1, !0);
            m.send(a);
            va()
        }

        function Ka(a) {
            console.log("socket close");
            setTimeout(fa, U);
            U *= 1.5
        }

        function Ja(a) {
            function b() {
                for (var a = "";;) {
                    var b = d.getUint16(c, !0);
                    c += 2;
                    if (0 == b) break;
                    a += String.fromCharCode(b)
                }
                return a
            }
            var c = 1,
                d = new DataView(a.data);
            switch (d.getUint8(0)) {
                case 16:
                    La(d);
                    break;
                case 17:
                    L = d.getFloat32(1, !0);
                    M = d.getFloat32(5, !0);
                    N = d.getFloat32(9, !0);
                    break;
                case 20:
                    l = [];
                    C = [];
                    break;
                case 32:
                    C.push(d.getUint32(1, !0));
                    break;
                case 49:
                    if (null != v) break;
                    a = d.getUint32(c, !0);
                    c += 4;
                    y = [];
                    for (var e = 0; e < a; ++e) {
                        var p = d.getUint32(c, !0),
                            c = c + 4;
                        y.push({
                            id: p,
                            name: b()
                        })
                    }
                    wa();
                    break;
                case 50:
                    v = [];
                    a = d.getUint32(c, !0);
                    c += 4;
                    for (e = 0; e < a; ++e) v.push(d.getFloat32(c, !0)), c += 4;
                    wa();
                    break;
                case 64:
                    V = d.getFloat64(1, !0), W = d.getFloat64(9, !0), X = d.getFloat64(17, !0), Y = d.getFloat64(25, !0), L = (X + V) / 2, M = (Y + W) / 2, N = 1, 0 == l.length && (s = L, t = M, k = N)
            }
        }

        function La(a) {
            /*new*/ var Entity = window.ontando.core.newEntity;
            G = +new Date;
            var b = Math.random(),
                c = 1;
            ha = !1;
            for (var d = a.getUint16(c, !0), c = c + 2, e = 0; e < d; ++e) {
                var p = x[a.getUint32(c, !0)],
                    f = x[a.getUint32(c + 4, !0)],
                    c = c + 8;
                p && f && (f.destroy(), f.ox = f.x, f.oy = f.y, f.oSize = f.size, f.nx = p.x, f.ny = p.y, f.nSize = f.size, f.updateTime = G)
            }
            for (;;) {
                d = a.getUint32(c, !0);
                c += 4;
                if (0 == d) break;
                for (var e = a.getFloat32(c, !0), c = c + 4, p = a.getFloat32(c, !0), c = c + 4, f = a.getFloat32(c, !0), c = c + 4, g = a.getUint8(c++), k = a.getUint8(c++), m = a.getUint8(c++), g = (g << 16 | k << 8 | m).toString(16); 6 > g.length;) g = "0" + g;
                var g = "#" + g,
                    h = a.getUint8(c++),
                    k = !!(h & 1),
                    m = !!(h & 16);
                h & 2 && (c += 4);
                h & 4 && (c += 8);
                h & 8 && (c += 16);
                for (h = "";;) {
                    var n = a.getUint16(c, !0),
                        c = c + 2;
                    if (0 == n) break;
                    h += String.fromCharCode(n)
                }
                n = null;
                x.hasOwnProperty(d) ? (n = x[d], n.updatePos(), n.ox = n.x, n.oy = n.y, n.oSize = n.size, n.color = g) : (n = new xa(d, e, p, f, g, h), n.pX = e, n.pY = p);
                /*new*/ n.api == null ? n.api = new Entity(d, e, p, f, g, k, h) : n.api.update(e, p, f, g, k, h);/*x, y, size, color, isVirus, name*/
                n.isVirus = k;
                n.isAgitated = m;
                n.nx = e;
                n.ny = p;
                n.nSize = f;
                n.updateCode = b;
                n.updateTime = G; - 1 != C.indexOf(d) && -1 == l.indexOf(n) && (
                        document.getElementById("overlays").style.display = "none", 
                        l.push(n), 
                        1 == l.length && (s = n.x, t = n.y)
                        /*new*/, n.api.setMe()
                )
            }
            a.getUint16(c, !0);
            c += 2;
            p = a.getUint32(c, !0);
            c += 4;
            for (e = 0; e < p; e++) d = a.getUint32(c, !0), c += 4, x[d] && (x[d].updateCode = b);
            for (e = 0; e < q.length; e++) q[e].updateCode != b && q[e--].destroy();
            ha && 0 == l.length && oa(!1)
            /*new*/ if (ha && 0 == l.length) { window.ontando.core.showMenu(); }
        }

        function I() {
            if (ia()) {
                /*new*/ var tmp = window.ontando.core.targetLocation(Q, R);
                /*new*/ Q = tmp[0]; R = tmp[1];
                var a = O - h / 2,
                    b = P - r / 2;
                /*new*/ if (tmp[2]) { return; }
                64 > a * a + b * b || ya == Q && za == R || (ya = Q, za = R, a = new ArrayBuffer(21), b = new DataView(a), b.setUint8(0, 16), b.setFloat64(1, Q, !0), b.setFloat64(9, R, !0), b.setUint32(17, 0, !0), m.send(a))
            }
        }

        function va() {
            if (ia() && null != B) {
                var a = new ArrayBuffer(1 + 2 * B.length),
                    b = new DataView(a);
                b.setUint8(0, 0);
                for (var c = 0; c < B.length; ++c) b.setUint16(1 +
                    2 * c, B.charCodeAt(c), !0);
                m.send(a)
            }
        }

        function ia() {
            return null != m && m.readyState == m.OPEN
        }

        function A(a) {
            if (ia()) {
                var b = new ArrayBuffer(1);
                (new DataView(b)).setUint8(0, a);
                m.send(b)
            }
        }

        function qa() {
            da();
            f.requestAnimationFrame(qa)
        }

        function pa() {
            h = f.innerWidth;
            r = f.innerHeight;
            ba.width = z.width = h;
            ba.height = z.height = r;
            da()
        }

        function Ma() {
            if (0 != l.length) {
                for (var a = 0, b = 0; b < l.length; b++) a += l[b].size;
                a = Math.pow(Math.min(64 / a, 1), .4) * Math.max(r / 1080, h / 1920);
                k = (9 * k + a) / 10
            }
        }

        function da() {
            var a = +new Date;
            ++Na;
            G = +new Date;
            if (0 < l.length) {
                Ma();
                for (var b = 0, c = 0, d = 0; d < l.length; d++) l[d].updatePos(), b += l[d].x / l.length, c += l[d].y / l.length;
                L = b;
                M = c;
                N = k;
                s = (s + b) / 2;
                t = (t + c) / 2
            } else s = (29 * s + L) / 30, t = (29 * t + M) / 30, k = (9 * k + N) / 10;
            /*new*/ var tmp_a = window.ontando.core.preRender(/*coords (center of creen): x, y |, scale*/ s, t, k);
            /*new*/ s = tmp_a[0], t = tmp_a[1], k = tmp_a[2];
            Ga();
            ca();
            e.clearRect(0, 0, h, r);
            e.fillStyle = ja ? "#111111" : "#F2FBFF";
            e.fillRect(0, 0, h, r);
            e.save();
            e.strokeStyle = ja ? "#AAAAAA" : "#000000";
            e.globalAlpha = .2;
            e.scale(k, k);
            b = h / k;
            c = r / k;
            for (d = -.5 + (-s + b / 2) % 50; d < b; d += 50) e.beginPath(), e.moveTo(d, 0), e.lineTo(d, c), e.stroke();
            for (d = -.5 + (-t + c / 2) % 50; d < c; d += 50) e.beginPath(), e.moveTo(0,
                d), e.lineTo(b, d), e.stroke();
            e.restore();
            q.sort(function(a, b) {
                return a.size == b.size ? a.id - b.id : a.size - b.size
            });
            e.save();
            e.translate(h / 2, r / 2);
            e.scale(k, k);
            e.translate(-s, -t);
            for (d = 0; d < E.length; d++) E[d].draw();
            for (d = 0; d < q.length; d++) q[d].draw();
            e.restore();
            u && u.width && e.drawImage(u, h - u.width - 10, 10);
            F = Math.max(F, Oa());
            0 != F && (null == Z && (Z = new $(24, "#FFFFFF")), Z.setValue("Score: " + ~~(F / 100)), c = Z.render(), b = c.width, e.globalAlpha = .2, e.fillStyle = "#000000", e.fillRect(10, r - 10 - 24 - 10, b + 10, 34), e.globalAlpha = 1, e.drawImage(c, 15, r - 10 - 24 - 5));
            Pa();
            a = +new Date - a;
            a > 1E3 / 60 ? w -= .01 : a < 1E3 / 65 && (w += .01);.4 > w && (w = .4);
            1 < w && (w = 1)
            /*new*/ window.ontando.core.postRender(/*canvas context*/ e);
        }

        function Pa() {
            if (na && ka.width) {
                var a = h / 5;
                e.drawImage(ka, 5, 5, a, a)
            }
        }

        function Oa() {
            for (var a = 0, b = 0; b < l.length; b++) a += l[b].nSize * l[b].nSize;
            return a
        }

        function wa() {
            u = null;
            if (null != v || 0 != y.length)
                if (null != v || aa) {
                    u = document.createElement("canvas");
                    var a = u.getContext("2d"),
                        b = 60,
                        b = null == v ? b + 24 * y.length : b + 180,
                        c = Math.min(200, .3 * h) / 200;
                    u.width = 200 * c;
                    u.height = b * c;
                    a.scale(c, c);
                    a.globalAlpha = .4;
                    a.fillStyle = "#000000";
                    a.fillRect(0,
                        0, 200, b);
                    a.globalAlpha = 1;
                    a.fillStyle = "#FFFFFF";
                    c = null;
                    c = "Leaderboard";
                    a.font = "30px Ubuntu";
                    a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                    if (null == v)
                        for (a.font = "20px Ubuntu", b = 0; b < y.length; ++b) c = y[b].name || "An unnamed cell", aa || (c = "An unnamed cell"), -1 != C.indexOf(y[b].id) ? (l[0].name && (c = l[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                    else
                        for (b = c = 0; b < v.length; ++b) angEnd = c + v[b] * Math.PI * 2, a.fillStyle = Qa[b + 1], a.beginPath(), a.moveTo(100, 140), a.arc(100, 140, 80, c, angEnd, !1), a.fill(), c = angEnd
                }
        }

        function xa(a, b, c, d, e, f) {
            q.push(this);
            x[a] = this;
            this.id = a;
            this.ox = this.x = b;
            this.oy = this.y = c;
            this.oSize = this.size = d;
            this.color = e;
            this.points = [];
            this.pointsAcc = [];
            this.createPoints();
            this.setName(f)
        }

        function $(a, b, c, d) {
            a && (this._size = a);
            b && (this._color = b);
            this._stroke = !!c;
            d && (this._strokeColor = d)
        }
        if ("agar.io" != f.location.hostname && "localhost" != f.location.hostname && "10.10.2.13" != f.location.hostname) f.location = "http://agar.io/";
        else if (f.top != f) f.top.location = "http://agar.io/";
        else {
            var ba, e, z, h, r, J = null,
                m = null,
                s = 0,
                t = 0,
                C = [],
                l = [],
                x = {},
                q = [],
                E = [],
                y = [],
                O = 0,
                P = 0,
                Q = -1,
                R = -1,
                Na = 0,
                G = 0,
                B = null,
                V = 0,
                W = 0,
                X = 1E4,
                Y = 1E4,
                k = 1,
                D = null,
                Aa = !0,
                aa = !0,
                la = !1,
                ha = !1,
                F = 0,
                ja = !1,
                Ba = !1,
                L = s = ~~((V + X) / 2),
                M = t = ~~((W + Y) / 2),
                N = 1,
                K = "",
                v = null,
                ga = 0,
                Qa = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
                na = "ontouchstart" in f && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                ka = new Image;
            ka.src = "img/split.png";
            var Ca = document.createElement("canvas");
            if ("undefined" == typeof console ||
                "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Ca || null == Ca.getContext || null == f.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                var S = null;
                f.setNick = function(a) {
                    /* new */ a = window.ontando.core.options.setNick(a);
                    sa();
                    B = a;
                    va();
                    F = 0
                };
                f.setRegion = ea;
                f.setSkins = function(a) {
                    /*new*/ window.ontando.core.options.setSkins(a);
                    Aa = a
                };
                f.setNames = function(a) {
                    /*new*/ window.ontando.core.options.setNames(a);
                    aa = a
                };
                f.setDarkTheme = function(a) {
                    /*new*/ window.ontando.core.options.setDarkTheme(a);
                    ja = a
                };
                f.setColors = function(a) {
                    /*new */ window.ontando.core.options.setSkins(a);
                    la = a
                };
                f.setShowMass = function(a) {
                    /*new*/ window.ontando.core.options.setShowMass(a);
                    Ba = a
                };
                f.spectate = function() {
                    B = null;
                    A(1);
                    sa()
                };
                f.setGameMode = function(a) {
                    /*new*/ window.ontando.core.options.setGameMode(a);
                    a != K && (K = a, fa())
                };
                null != f.localStorage && (null == f.localStorage.AB4 && (f.localStorage.AB4 = 1 + ~~(2 * Math.random())), ga = f.localStorage.AB4, f.ABGroup = ga);
                g.get("http://gc.agar.io", function(a) {
                    countryCode = a.split(" ")[0]; - 1 == "DE IL PL HU BR AT".split(" ").indexOf(countryCode) && Da.push("nazi");
                    Ea.hasOwnProperty(countryCode) && (D || ea(Ea[countryCode]))
                }, "text");
                var T = !1;
                setTimeout(function() {
                    T = !0
                }, 3E5);
                var Ea = {
                    AF: "JP-Tokyo",
                    AX: "EU-London",
                    AL: "EU-London",
                    DZ: "EU-London",
                    AS: "SG-Singapore",
                    AD: "EU-London",
                    AO: "EU-London",
                    AI: "US-Atlanta",
                    AG: "US-Atlanta",
                    AR: "BR-Brazil",
                    AM: "JP-Tokyo",
                    AW: "US-Atlanta",
                    AU: "SG-Singapore",
                    AT: "EU-London",
                    AZ: "JP-Tokyo",
                    BS: "US-Atlanta",
                    BH: "JP-Tokyo",
                    BD: "JP-Tokyo",
                    BB: "US-Atlanta",
                    BY: "EU-London",
                    BE: "EU-London",
                    BZ: "US-Atlanta",
                    BJ: "EU-London",
                    BM: "US-Atlanta",
                    BT: "JP-Tokyo",
                    BO: "BR-Brazil",
                    BQ: "US-Atlanta",
                    BA: "EU-London",
                    BW: "EU-London",
                    BR: "BR-Brazil",
                    IO: "JP-Tokyo",
                    VG: "US-Atlanta",
                    BN: "JP-Tokyo",
                    BG: "EU-London",
                    BF: "EU-London",
                    BI: "EU-London",
                    KH: "JP-Tokyo",
                    CM: "EU-London",
                    CA: "US-Atlanta",
                    CV: "EU-London",
                    KY: "US-Atlanta",
                    CF: "EU-London",
                    TD: "EU-London",
                    CL: "BR-Brazil",
                    CN: "CN-China",
                    CX: "JP-Tokyo",
                    CC: "JP-Tokyo",
                    CO: "BR-Brazil",
                    KM: "EU-London",
                    CD: "EU-London",
                    CG: "EU-London",
                    CK: "SG-Singapore",
                    CR: "US-Atlanta",
                    CI: "EU-London",
                    HR: "EU-London",
                    CU: "US-Atlanta",
                    CW: "US-Atlanta",
                    CY: "JP-Tokyo",
                    CZ: "EU-London",
                    DK: "EU-London",
                    DJ: "EU-London",
                    DM: "US-Atlanta",
                    DO: "US-Atlanta",
                    EC: "BR-Brazil",
                    EG: "EU-London",
                    SV: "US-Atlanta",
                    GQ: "EU-London",
                    ER: "EU-London",
                    EE: "EU-London",
                    ET: "EU-London",
                    FO: "EU-London",
                    FK: "BR-Brazil",
                    FJ: "SG-Singapore",
                    FI: "EU-London",
                    FR: "EU-London",
                    GF: "BR-Brazil",
                    PF: "SG-Singapore",
                    GA: "EU-London",
                    GM: "EU-London",
                    GE: "JP-Tokyo",
                    DE: "EU-London",
                    GH: "EU-London",
                    GI: "EU-London",
                    GR: "EU-London",
                    GL: "US-Atlanta",
                    GD: "US-Atlanta",
                    GP: "US-Atlanta",
                    GU: "SG-Singapore",
                    GT: "US-Atlanta",
                    GG: "EU-London",
                    GN: "EU-London",
                    GW: "EU-London",
                    GY: "BR-Brazil",
                    HT: "US-Atlanta",
                    VA: "EU-London",
                    HN: "US-Atlanta",
                    HK: "JP-Tokyo",
                    HU: "EU-London",
                    IS: "EU-London",
                    IN: "JP-Tokyo",
                    ID: "JP-Tokyo",
                    IR: "JP-Tokyo",
                    IQ: "JP-Tokyo",
                    IE: "EU-London",
                    IM: "EU-London",
                    IL: "JP-Tokyo",
                    IT: "EU-London",
                    JM: "US-Atlanta",
                    JP: "JP-Tokyo",
                    JE: "EU-London",
                    JO: "JP-Tokyo",
                    KZ: "JP-Tokyo",
                    KE: "EU-London",
                    KI: "SG-Singapore",
                    KP: "JP-Tokyo",
                    KR: "JP-Tokyo",
                    KW: "JP-Tokyo",
                    KG: "JP-Tokyo",
                    LA: "JP-Tokyo",
                    LV: "EU-London",
                    LB: "JP-Tokyo",
                    LS: "EU-London",
                    LR: "EU-London",
                    LY: "EU-London",
                    LI: "EU-London",
                    LT: "EU-London",
                    LU: "EU-London",
                    MO: "JP-Tokyo",
                    MK: "EU-London",
                    MG: "EU-London",
                    MW: "EU-London",
                    MY: "JP-Tokyo",
                    MV: "JP-Tokyo",
                    ML: "EU-London",
                    MT: "EU-London",
                    MH: "SG-Singapore",
                    MQ: "US-Atlanta",
                    MR: "EU-London",
                    MU: "EU-London",
                    YT: "EU-London",
                    MX: "US-Atlanta",
                    FM: "SG-Singapore",
                    MD: "EU-London",
                    MC: "EU-London",
                    MN: "JP-Tokyo",
                    ME: "EU-London",
                    MS: "US-Atlanta",
                    MA: "EU-London",
                    MZ: "EU-London",
                    MM: "JP-Tokyo",
                    NA: "EU-London",
                    NR: "SG-Singapore",
                    NP: "JP-Tokyo",
                    NL: "EU-London",
                    NC: "SG-Singapore",
                    NZ: "SG-Singapore",
                    NI: "US-Atlanta",
                    NE: "EU-London",
                    NG: "EU-London",
                    NU: "SG-Singapore",
                    NF: "SG-Singapore",
                    MP: "SG-Singapore",
                    NO: "EU-London",
                    OM: "JP-Tokyo",
                    PK: "JP-Tokyo",
                    PW: "SG-Singapore",
                    PS: "JP-Tokyo",
                    PA: "US-Atlanta",
                    PG: "SG-Singapore",
                    PY: "BR-Brazil",
                    PE: "BR-Brazil",
                    PH: "JP-Tokyo",
                    PN: "SG-Singapore",
                    PL: "EU-London",
                    PT: "EU-London",
                    PR: "US-Atlanta",
                    QA: "JP-Tokyo",
                    RE: "EU-London",
                    RO: "EU-London",
                    RU: "RU-Russia",
                    RW: "EU-London",
                    BL: "US-Atlanta",
                    SH: "EU-London",
                    KN: "US-Atlanta",
                    LC: "US-Atlanta",
                    MF: "US-Atlanta",
                    PM: "US-Atlanta",
                    VC: "US-Atlanta",
                    WS: "SG-Singapore",
                    SM: "EU-London",
                    ST: "EU-London",
                    SA: "EU-London",
                    SN: "EU-London",
                    RS: "EU-London",
                    SC: "EU-London",
                    SL: "EU-London",
                    SG: "JP-Tokyo",
                    SX: "US-Atlanta",
                    SK: "EU-London",
                    SI: "EU-London",
                    SB: "SG-Singapore",
                    SO: "EU-London",
                    ZA: "EU-London",
                    SS: "EU-London",
                    ES: "EU-London",
                    LK: "JP-Tokyo",
                    SD: "EU-London",
                    SR: "BR-Brazil",
                    SJ: "EU-London",
                    SZ: "EU-London",
                    SE: "EU-London",
                    CH: "EU-London",
                    SY: "EU-London",
                    TW: "JP-Tokyo",
                    TJ: "JP-Tokyo",
                    TZ: "EU-London",
                    TH: "JP-Tokyo",
                    TL: "JP-Tokyo",
                    TG: "EU-London",
                    TK: "SG-Singapore",
                    TO: "SG-Singapore",
                    TT: "US-Atlanta",
                    TN: "EU-London",
                    TR: "TK-Turkey",
                    TM: "JP-Tokyo",
                    TC: "US-Atlanta",
                    TV: "SG-Singapore",
                    UG: "EU-London",
                    UA: "EU-London",
                    AE: "EU-London",
                    GB: "EU-London",
                    UM: "SG-Singapore",
                    VI: "US-Atlanta",
                    UY: "BR-Brazil",
                    UZ: "JP-Tokyo",
                    VU: "SG-Singapore",
                    VE: "BR-Brazil",
                    VN: "JP-Tokyo",
                    WF: "SG-Singapore",
                    EH: "EU-London",
                    YE: "JP-Tokyo",
                    ZM: "EU-London",
                    ZW: "EU-London"
                };
                f.connect = ua;
                var U = 500,
                    ya = -1,
                    za = -1,
                    u = null,
                    w = 1,
                    Z = null,
                    H = {},
                    Da = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;ussr;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8".split(";"),
                    Ra = ["m'blob"];
                xa.prototype = {
                    id: 0,
                    points: null,
                    pointsAcc: null,
                    name: null,
                    nameCache: null,
                    sizeCache: null,
                    x: 0,
                    y: 0,
                    size: 0,
                    ox: 0,
                    oy: 0,
                    oSize: 0,
                    nx: 0,
                    ny: 0,
                    nSize: 0,
                    updateTime: 0,
                    updateCode: 0,
                    drawTime: 0,
                    destroyed: !1,
                    isVirus: !1,
                    isAgitated: !1,
                    wasSimpleDrawing: !0,
                    destroy: function() {
                        /*new*/ this.api.destroy();
                        var a;
                        for (a = 0; a < q.length; a++)
                            if (q[a] == this) {
                                q.splice(a, 1);
                                break
                            }
                        delete x[this.id];
                        a = l.indexOf(this); - 1 != a && (ha = !0, l.splice(a, 1));
                        a = C.indexOf(this.id); - 1 != a && C.splice(a, 1);
                        this.destroyed = !0;
                        E.push(this)
                    },
                    getNameSize: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    setName: function(a) {
                        if (this.name = a) null == this.nameCache ? this.nameCache = new $(this.getNameSize(), "#FFFFFF", !0, "#000000") : this.nameCache.setSize(this.getNameSize()), this.nameCache.setValue(this.name)
                    },
                    createPoints: function() {
                        for (var a = this.getNumPoints(); this.points.length > a;) {
                            var b = ~~(Math.random() * this.points.length);
                            this.points.splice(b, 1);
                            this.pointsAcc.splice(b, 1)
                        }
                        0 == this.points.length && 0 < a && (this.points.push({
                            c: this,
                            v: this.size,
                            x: this.x,
                            y: this.y
                        }), this.pointsAcc.push(Math.random() - .5));
                        for (; this.points.length < a;) {
                            var b = ~~(Math.random() * this.points.length),
                                c = this.points[b];
                            this.points.splice(b, 0, {
                                c: this,
                                v: c.v,
                                x: c.x,
                                y: c.y
                            });
                            this.pointsAcc.splice(b, 0, this.pointsAcc[b])
                        }
                    },
                    getNumPoints: function() {
                        var a = 10;
                        20 > this.size && (a = 5);
                        this.isVirus && (a = 30);
                        return ~~Math.max(this.size * k * (this.isVirus ? Math.min(2 * w, 1) : w), a)
                    },
                    movePoints: function() {
                        this.createPoints();
                        for (var a = this.points, b = this.pointsAcc, c = a.length, d = 0; d < c; ++d) {
                            var e = b[(d - 1 + c) % c],
                                f = b[(d + 1) % c];
                            b[d] += (Math.random() - .5) * (this.isAgitated ? 3 : 1);
                            b[d] *= .7;
                            10 < b[d] && (b[d] = 10); - 10 > b[d] && (b[d] = -10);
                            b[d] = (e + f + 8 * b[d]) / 10
                        }
                        for (var g = this, d = 0; d < c; ++d) {
                            var h = a[d].v,
                                e = a[(d - 1 + c) % c].v,
                                f = a[(d + 1) % c].v;
                            if (15 < this.size && null != J) {
                                var k = !1,
                                    l = a[d].x,
                                    m = a[d].y;
                                J.retrieve2(l - 5, m - 5, 10, 10, function(a) {
                                    a.c != g && 25 > (l - a.x) * (l - a.x) + (m - a.y) * (m - a.y) && (k = !0)
                                });
                                !k && (a[d].x < V || a[d].y < W || a[d].x > X || a[d].y > Y) && (k = !0);
                                k && (0 < b[d] && (b[d] = 0), b[d] -= 1)
                            }
                            h += b[d];
                            0 > h && (h = 0);
                            h = this.isAgitated ? (19 * h + this.size) / 20 : (12 * h + this.size) / 13;
                            a[d].v = (e + f + 8 * h) / 10;
                            e = 2 * Math.PI / c;
                            f = this.points[d].v;
                            this.isVirus && 0 == d % 2 && (f += 5);
                            a[d].x = this.x + Math.cos(e * d) * f;
                            a[d].y = this.y + Math.sin(e * d) * f
                        }
                    },
                    updatePos: function() {
                        var a;
                        a = (G - this.updateTime) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        a = a * a * (3 - 2 * a);
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        this.getNameSize();
                        if (this.destroyed && 1 <= b) {
                            var c = E.indexOf(this); - 1 != c && E.splice(c, 1)
                        }
                        this.x = a * (this.nx - this.ox) + this.ox;
                        this.y = a * (this.ny - this.oy) + this.oy;
                        this.size = b * (this.nSize - this.oSize) + this.oSize;
                        return b
                    },
                    shouldRender: function() {
                        return this.x + this.size + 40 < s - h / 2 / k || this.y + this.size + 40 < t - r / 2 / k || this.x -
                            this.size - 40 > s + h / 2 / k || this.y - this.size - 40 > t + r / 2 / k ? !1 : !0
                    },
                    draw: function() {
                        if (this.shouldRender()) {
                            var a = !this.isVirus && !this.isAgitated && .5 > k;
                            if (this.wasSimpleDrawing && !a)
                                for (var b = 0; b < this.points.length; b++) this.points[b].v = this.size;
                            this.wasSimpleDrawing = a;
                            e.save();
                            this.drawTime = G;
                            b = this.updatePos();
                            this.destroyed && (e.globalAlpha *= 1 - b);
                            e.lineWidth = 10;
                            e.lineCap = "round";
                            e.lineJoin = this.isVirus ? "mitter" : "round";
                            la ? (e.fillStyle = "#FFFFFF", e.strokeStyle = "#AAAAAA") : (e.fillStyle = this.color, e.strokeStyle = this.color);
                            if (a) e.beginPath(), e.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1);
                            else {
                                this.movePoints();
                                e.beginPath();
                                var c = this.getNumPoints();
                                e.moveTo(this.points[0].x, this.points[0].y);
                                for (b = 1; b <= c; ++b) {
                                    var d = b % c;
                                    e.lineTo(this.points[d].x, this.points[d].y)
                                }
                            }
                            e.closePath();
                            b = this.name.toLowerCase();
                            !this.isAgitated && Aa && "" == K ? -1 != Da.indexOf(b) ? (H.hasOwnProperty(b) || (H[b] = new Image, H[b].src = "skins/" + b + ".png"), c = 0 != H[b].width && H[b].complete ? H[b] : null) : c = null : c = null;
                            b = c ? -1 != Ra.indexOf(b) : !1;
                            a || e.stroke();
                            e.fill();
                            null == c || b || (e.save(), e.clip(), e.drawImage(c, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), e.restore());
                            (la || 15 < this.size) && !a && (e.strokeStyle = "#000000", e.globalAlpha *= .1, e.stroke());
                            e.globalAlpha = 1;
                            null != c && b && e.drawImage(c, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                            c = -1 != l.indexOf(this);
                            a = ~~this.y;
                            if ((aa || c) && this.name && this.nameCache && "8" != this.name) {
                                d = this.nameCache;
                                d.setValue(this.name);
                                d.setSize(this.getNameSize());
                                b = Math.ceil(10 * k) / 10;
                                d.setScale(b);
                                var d = d.render(),
                                    f = ~~(d.width / b),
                                    g = ~~(d.height / b);
                                e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(g / 2), f, g);
                                a += d.height / 2 / b + 4
                            }
                            Ba && (c || 0 == l.length && (!this.isVirus || this.isAgitated) && 20 < this.size) && (null == this.sizeCache && (this.sizeCache = new $(this.getNameSize() / 2, "#FFFFFF", !0, "#000000")), c = this.sizeCache, c.setSize(this.getNameSize() / 2), c.setValue(~~(this.size * this.size / 100)), b = Math.ceil(10 * k) / 10, c.setScale(b), d = c.render(), f = ~~(d.width / b), g = ~~(d.height / b), e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(g / 2), f, g));
                            e.restore()
                        }
                    }
                };
                $.prototype = {
                    _value: "",
                    _color: "#000000",
                    _stroke: !1,
                    _strokeColor: "#000000",
                    _size: 16,
                    _canvas: null,
                    _ctx: null,
                    _dirty: !1,
                    _scale: 1,
                    setSize: function(a) {
                        this._size != a && (this._size = a, this._dirty = !0)
                    },
                    setScale: function(a) {
                        this._scale != a && (this._scale = a, this._dirty = !0)
                    },
                    setColor: function(a) {
                        this._color != a && (this._color = a, this._dirty = !0)
                    },
                    setStroke: function(a) {
                        this._stroke != a && (this._stroke = a, this._dirty = !0)
                    },
                    setStrokeColor: function(a) {
                        this._strokeColor != a && (this._strokeColor = a, this._dirty = !0)
                    },
                    setValue: function(a) {
                        a != this._value && (this._value = a, this._dirty = !0)
                    },
                    render: function() {
                        null == this._canvas && (this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"));
                        if (this._dirty) {
                            this._dirty = !1;
                            var a = this._canvas,
                                b = this._ctx,
                                c = this._value,
                                d = this._scale,
                                e = this._size,
                                f = e + "px Ubuntu";
                            b.font = f;
                            var g = b.measureText(c).width,
                                h = ~~(.2 * e);
                            a.width = (g + 6) * d;
                            a.height = (e + h) * d;
                            b.font = f;
                            b.scale(d, d);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this._strokeColor;
                            b.fillStyle = this._color;
                            this._stroke && b.strokeText(c, 3, e - h / 2);
                            b.fillText(c, 3, e - h / 2)
                        }
                        return this._canvas
                    }
                };
                f.onload = Fa
            }
        }
    })(window, jQuery);
}