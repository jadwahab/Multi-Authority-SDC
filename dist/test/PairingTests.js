"use strict";

var _BpGroup = require("../BpGroup");

var _BpGroup2 = _interopRequireDefault(_BpGroup);

var _mocha = require("mocha");

var mocha = _interopRequireWildcard(_mocha);

var _chai = require("chai");

var chai = _interopRequireWildcard(_chai);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Bilinear Pairing", function () {
        describe("Bilinearity Property", function () {
                var G = new _BpGroup2.default();

                // Get group generators
                var g1 = G.gen1;
                var g2 = G.gen2;
                var o = G.order;
                var e = G.pair;

                var x = G.ctx.BIG.randomnum(o, G.rngGen);
                var y = G.ctx.BIG.randomnum(o, G.rngGen);

                // Create G1Elem and G2Elem
                var g1Elem = G.ctx.PAIR.G1mul(g1, x);
                var g2Elem = G.ctx.PAIR.G2mul(g2, y);

                // pairing
                var gt = e(g1Elem, g2Elem);

                var big2 = new G.ctx.BIG(2);
                var big3 = new G.ctx.BIG(3);
                var big4 = new G.ctx.BIG(4);
                var big6 = new G.ctx.BIG(6);
                var big7 = new G.ctx.BIG(7);

                var g1test = G.ctx.PAIR.G1mul(g1Elem, big2);
                var g2test = G.ctx.PAIR.G2mul(g2Elem, big3);

                var gt6_1 = e(g1test, g2test);
                var gt6_2 = G.ctx.PAIR.GTpow(gt, big6);

                it("e(2*g1, 3*g2) == e(g1, g2)^6", function () {
                        chai.assert.isTrue(gt6_1.equals(gt6_2));
                });

                it("e(2*g1, 3*g2) != e(g1, g2)^7", function () {
                        var gt_7 = G.ctx.PAIR.GTpow(gt, big7);
                        chai.assert.isNotTrue(gt6_1.equals(gt_7));
                });

                it("e(3*g1, 4*g2) != e(g1, g2)^6", function () {
                        var g1test_2 = G.ctx.PAIR.G1mul(g1Elem, big3);
                        var g2test_2 = G.ctx.PAIR.G2mul(g2Elem, big4);
                        var gt6_3 = e(g1test_2, g2test_2);

                        chai.assert.isNotTrue(gt6_3.equals(gt6_2));
                });

                it("e(a*g1, g2) == e(g1,g2)^a for random a", function () {
                        var a = G.ctx.BIG.randomnum(o, G.rngGen);
                        var g1_test2 = G.ctx.PAIR.G1mul(g1Elem, a);
                        var gt_1 = e(g1_test2, g2Elem);
                        var gt_2 = G.ctx.PAIR.GTpow(e(g1Elem, g2Elem), a);

                        chai.assert.isTrue(gt_1.equals(gt_2));
                });

                it("e(g1, a*g2) == e(g1,g2)^a for random a", function () {
                        var a = G.ctx.BIG.randomnum(o, G.rngGen);
                        var g2_test2 = G.ctx.PAIR.G2mul(g2Elem, a);
                        var gt_1 = e(g1Elem, g2_test2);
                        var gt_2 = G.ctx.PAIR.GTpow(e(g1Elem, g2Elem), a);

                        chai.assert.isTrue(gt_1.equals(gt_2));
                });

                it("e(a*g1, b*g2) == e(g1, g2)^(a*b) for big (originally random) (a,b)", function () {
                        // const a = G.ctx.BIG.randomnum(o, G.rngGen);
                        // const b = G.ctx.BIG.randomnum(o, G.rngGen);

                        var a = new G.ctx.BIG(514000051400005140000);
                        var b = new G.ctx.BIG(514000051400005140000);

                        var g1_test2 = G.ctx.PAIR.G1mul(g1, a);
                        var g2_test2 = G.ctx.PAIR.G2mul(g2, b);

                        var gt_1 = e(g1_test2, g2_test2);

                        // same issue as in SchemeTests; smul returns only part of result, mul returns instance of "DBIG" that can't be used in GTPow
                        var c = G.ctx.BIG.mul(a, b);

                        var gt_2 = G.ctx.PAIR.GTpow(e(g1, g2), c);

                        chai.assert.isTrue(gt_1.equals(gt_2));
                });
        });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L1BhaXJpbmdUZXN0cy5qcyJdLCJuYW1lcyI6WyJtb2NoYSIsImNoYWkiLCJkZXNjcmliZSIsIkciLCJnMSIsImdlbjEiLCJnMiIsImdlbjIiLCJvIiwib3JkZXIiLCJlIiwicGFpciIsIngiLCJjdHgiLCJCSUciLCJyYW5kb21udW0iLCJybmdHZW4iLCJ5IiwiZzFFbGVtIiwiUEFJUiIsIkcxbXVsIiwiZzJFbGVtIiwiRzJtdWwiLCJndCIsImJpZzIiLCJiaWczIiwiYmlnNCIsImJpZzYiLCJiaWc3IiwiZzF0ZXN0IiwiZzJ0ZXN0IiwiZ3Q2XzEiLCJndDZfMiIsIkdUcG93IiwiaXQiLCJhc3NlcnQiLCJpc1RydWUiLCJlcXVhbHMiLCJndF83IiwiaXNOb3RUcnVlIiwiZzF0ZXN0XzIiLCJnMnRlc3RfMiIsImd0Nl8zIiwiYSIsImcxX3Rlc3QyIiwiZ3RfMSIsImd0XzIiLCJnMl90ZXN0MiIsImIiLCJjIiwibXVsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7O0lBQVlBLEs7O0FBQ1o7O0lBQVlDLEk7Ozs7OztBQUdaQyxTQUFTLGtCQUFULEVBQTZCLFlBQU07QUFDL0JBLGlCQUFTLHNCQUFULEVBQWlDLFlBQU07QUFDbkMsb0JBQU1DLElBQUksdUJBQVY7O0FBRUE7QUFDQSxvQkFBTUMsS0FBS0QsRUFBRUUsSUFBYjtBQUNBLG9CQUFNQyxLQUFLSCxFQUFFSSxJQUFiO0FBQ0Esb0JBQU1DLElBQUlMLEVBQUVNLEtBQVo7QUFDQSxvQkFBTUMsSUFBSVAsRUFBRVEsSUFBWjs7QUFFQSxvQkFBTUMsSUFBSVQsRUFBRVUsR0FBRixDQUFNQyxHQUFOLENBQVVDLFNBQVYsQ0FBb0JQLENBQXBCLEVBQXVCTCxFQUFFYSxNQUF6QixDQUFWO0FBQ0Esb0JBQU1DLElBQUlkLEVBQUVVLEdBQUYsQ0FBTUMsR0FBTixDQUFVQyxTQUFWLENBQW9CUCxDQUFwQixFQUF1QkwsRUFBRWEsTUFBekIsQ0FBVjs7QUFFQTtBQUNBLG9CQUFNRSxT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OztBQUVBO0FBQ0EsNEJBQU1FLElBQUk5QyxFQUFFVSxHQUFGLENBQU1DLEdBQU4sQ0FBVW9DLEdBQVYsQ0FBY1AsQ0FBZCxFQUFnQkssQ0FBaEIsQ0FBVjs7QUFFQSw0QkFBTUYsT0FBTzNDLEVBQUVVLEdBQUYsQ0FBTU0sSUFBTixDQUFXYyxLQUFYLENBQWlCdkIsRUFBRU4sRUFBRixFQUFNRSxFQUFOLENBQWpCLEVBQTRCMkMsQ0FBNUIsQ0FBYjs7QUFFQWhELDZCQUFLa0MsTUFBTCxDQUFZQyxNQUFaLENBQW1CUyxLQUFLUixNQUFMLENBQVlTLElBQVosQ0FBbkI7QUFDSCxpQkFsQkQ7QUFvQkgsU0F4RkQ7QUEwRkgsQ0EzRkQiLCJmaWxlIjoiUGFpcmluZ1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJwR3JvdXAgZnJvbSBcIi4uL0JwR3JvdXBcIjtcclxuXHJcbmltcG9ydCAqIGFzIG1vY2hhIGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQgKiBhcyBjaGFpIGZyb20gJ2NoYWknO1xyXG5cclxuXHJcbmRlc2NyaWJlKFwiQmlsaW5lYXIgUGFpcmluZ1wiLCAoKSA9PiB7XHJcbiAgICBkZXNjcmliZShcIkJpbGluZWFyaXR5IFByb3BlcnR5XCIsICgpID0+IHtcclxuICAgICAgICBjb25zdCBHID0gbmV3IEJwR3JvdXAoKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGdyb3VwIGdlbmVyYXRvcnNcclxuICAgICAgICBjb25zdCBnMSA9IEcuZ2VuMTtcclxuICAgICAgICBjb25zdCBnMiA9IEcuZ2VuMjtcclxuICAgICAgICBjb25zdCBvID0gRy5vcmRlcjtcclxuICAgICAgICBjb25zdCBlID0gRy5wYWlyO1xyXG5cclxuICAgICAgICBjb25zdCB4ID0gRy5jdHguQklHLnJhbmRvbW51bShvLCBHLnJuZ0dlbik7XHJcbiAgICAgICAgY29uc3QgeSA9IEcuY3R4LkJJRy5yYW5kb21udW0obywgRy5ybmdHZW4pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRzFFbGVtIGFuZCBHMkVsZW1cclxuICAgICAgICBjb25zdCBnMUVsZW0gPSBHLmN0eC5QQUlSLkcxbXVsKGcxLCB4KTtcclxuICAgICAgICBjb25zdCBnMkVsZW0gPSBHLmN0eC5QQUlSLkcybXVsKGcyLCB5KTtcclxuXHJcbiAgICAgICAgLy8gcGFpcmluZ1xyXG4gICAgICAgIGNvbnN0IGd0ID0gZShnMUVsZW0sIGcyRWxlbSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJpZzIgPSBuZXcgRy5jdHguQklHKDIpO1xyXG4gICAgICAgIGNvbnN0IGJpZzMgPSBuZXcgRy5jdHguQklHKDMpO1xyXG4gICAgICAgIGNvbnN0IGJpZzQgPSBuZXcgRy5jdHguQklHKDQpO1xyXG4gICAgICAgIGNvbnN0IGJpZzYgPSBuZXcgRy5jdHguQklHKDYpO1xyXG4gICAgICAgIGNvbnN0IGJpZzcgPSBuZXcgRy5jdHguQklHKDcpO1xyXG5cclxuICAgICAgICBjb25zdCBnMXRlc3QgPSBHLmN0eC5QQUlSLkcxbXVsKGcxRWxlbSwgYmlnMik7XHJcbiAgICAgICAgY29uc3QgZzJ0ZXN0ID0gRy5jdHguUEFJUi5HMm11bChnMkVsZW0sIGJpZzMpO1xyXG5cclxuICAgICAgICBjb25zdCBndDZfMSA9IGUoZzF0ZXN0LCBnMnRlc3QpO1xyXG4gICAgICAgIGNvbnN0IGd0Nl8yID0gRy5jdHguUEFJUi5HVHBvdyhndCwgYmlnNik7XHJcblxyXG4gICAgICAgIGl0KFwiZSgyKmcxLCAzKmcyKSA9PSBlKGcxLCBnMileNlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoYWkuYXNzZXJ0LmlzVHJ1ZShndDZfMS5lcXVhbHMoZ3Q2XzIpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoXCJlKDIqZzEsIDMqZzIpICE9IGUoZzEsIGcyKV43XCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZ3RfNyA9IEcuY3R4LlBBSVIuR1Rwb3coZ3QsIGJpZzcpO1xyXG4gICAgICAgICAgICBjaGFpLmFzc2VydC5pc05vdFRydWUoZ3Q2XzEuZXF1YWxzKGd0XzcpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoXCJlKDMqZzEsIDQqZzIpICE9IGUoZzEsIGcyKV42XCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZzF0ZXN0XzIgPSBHLmN0eC5QQUlSLkcxbXVsKGcxRWxlbSwgYmlnMyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGcydGVzdF8yID0gRy5jdHguUEFJUi5HMm11bChnMkVsZW0sIGJpZzQpO1xyXG4gICAgICAgICAgICBjb25zdCBndDZfMyA9IGUoZzF0ZXN0XzIsIGcydGVzdF8yKTtcclxuXHJcbiAgICAgICAgICAgIGNoYWkuYXNzZXJ0LmlzTm90VHJ1ZShndDZfMy5lcXVhbHMoZ3Q2XzIpKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGl0KFwiZShhKmcxLCBnMikgPT0gZShnMSxnMileYSBmb3IgcmFuZG9tIGFcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhID0gRy5jdHguQklHLnJhbmRvbW51bShvLCBHLnJuZ0dlbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGcxX3Rlc3QyID0gRy5jdHguUEFJUi5HMW11bChnMUVsZW0sIGEpO1xyXG4gICAgICAgICAgICBjb25zdCBndF8xID0gZShnMV90ZXN0MiwgZzJFbGVtKTtcclxuICAgICAgICAgICAgY29uc3QgZ3RfMiA9IEcuY3R4LlBBSVIuR1Rwb3coZShnMUVsZW0sIGcyRWxlbSksIGEpO1xyXG5cclxuICAgICAgICAgICAgY2hhaS5hc3NlcnQuaXNUcnVlKGd0XzEuZXF1YWxzKGd0XzIpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoXCJlKGcxLCBhKmcyKSA9PSBlKGcxLGcyKV5hIGZvciByYW5kb20gYVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSBHLmN0eC5CSUcucmFuZG9tbnVtKG8sIEcucm5nR2VuKTtcclxuICAgICAgICAgICAgY29uc3QgZzJfdGVzdDIgPSBHLmN0eC5QQUlSLkcybXVsKGcyRWxlbSwgYSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGd0XzEgPSBlKGcxRWxlbSwgZzJfdGVzdDIpO1xyXG4gICAgICAgICAgICBjb25zdCBndF8yID0gRy5jdHguUEFJUi5HVHBvdyhlKGcxRWxlbSwgZzJFbGVtKSwgYSk7XHJcblxyXG4gICAgICAgICAgICBjaGFpLmFzc2VydC5pc1RydWUoZ3RfMS5lcXVhbHMoZ3RfMikpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgaXQoXCJlKGEqZzEsIGIqZzIpID09IGUoZzEsIGcyKV4oYSpiKSBmb3IgYmlnIChvcmlnaW5hbGx5IHJhbmRvbSkgKGEsYilcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBhID0gRy5jdHguQklHLnJhbmRvbW51bShvLCBHLnJuZ0dlbik7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGIgPSBHLmN0eC5CSUcucmFuZG9tbnVtKG8sIEcucm5nR2VuKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSBuZXcgRy5jdHguQklHKDUxNDAwMDA1MTQwMDAwNTE0MDAwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGIgPSBuZXcgRy5jdHguQklHKDUxNDAwMDA1MTQwMDAwNTE0MDAwMCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnMV90ZXN0MiA9IEcuY3R4LlBBSVIuRzFtdWwoZzEsIGEpO1xyXG4gICAgICAgICAgICBjb25zdCBnMl90ZXN0MiA9IEcuY3R4LlBBSVIuRzJtdWwoZzIsIGIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3RfMSA9IGUoZzFfdGVzdDIsIGcyX3Rlc3QyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNhbWUgaXNzdWUgYXMgaW4gU2NoZW1lVGVzdHM7IHNtdWwgcmV0dXJucyBvbmx5IHBhcnQgb2YgcmVzdWx0LCBtdWwgcmV0dXJucyBpbnN0YW5jZSBvZiBcIkRCSUdcIiB0aGF0IGNhbid0IGJlIHVzZWQgaW4gR1RQb3dcclxuICAgICAgICAgICAgY29uc3QgYyA9IEcuY3R4LkJJRy5tdWwoYSxiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGd0XzIgPSBHLmN0eC5QQUlSLkdUcG93KGUoZzEsIGcyKSwgYyk7XHJcblxyXG4gICAgICAgICAgICBjaGFpLmFzc2VydC5pc1RydWUoZ3RfMS5lcXVhbHMoZ3RfMikpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcblxyXG59KTsiXX0=