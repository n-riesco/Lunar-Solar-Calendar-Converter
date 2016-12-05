/*
 * MIT License
 * 
 * Copyright (c) 2016, Nicolas Riesco and others as credited in the AUTHORS file
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var assert = require("assert");
var util = require("util");

var chineseCalendar = require("..");
var toSolar = chineseCalendar.toSolar;
var toLunar = chineseCalendar.toLunar;

describe("lunar-solar-converter", function() {
    var testCases;

    before(function() {
        testCases = [{
            solar: { year: 2016, month: 12, day: 5 },
            lunar: { year: 2016, month: 11, day: 7 },
        }, {
            solar: { year: 2015, month: 1, day: 15 },
            lunar: { year: 2014, month: 11, day: 25 },
        }, {
            solar: { year: 2014, month: 10, day: 25 },
            lunar: { year: 2014, month: 9, day: 2, isIntercalary: true },
        }];
    });

    it("can convert today's date", function() {
        var today = new Date(),
            solarYear = today.getFullYear(),
            solarMonth = 1 + today.getMonth(),
            solarDay = today.getDate();
        var lunarDate = toLunar(solarYear, solarMonth, solarDay);
        var solarDate = toSolar(lunarDate);
        assert.equal(solarDate.year, solarYear);
        assert.equal(solarDate.month, solarMonth);
        assert.equal(solarDate.day, solarDay);
    });

    it("can convert lunar dates into solar dates", function() {
        for (var i = 0; i < testCases.length; i++) {
            var testCase = testCases[i];
            assertSolarDate(testCase.lunar, testCase.solar);
        }
    });

    it("can convert solar dates into lunar dates", function() {
        for (var i = 0; i < testCases.length; i++) {
            var testCase = testCases[i];
            assertLunarDate(testCase.solar, testCase.lunar);
        }
    });

    function assertSolarDate(lunarDate, expectedSolarDate) {
        var errmsg = [
                "lunar =", util.inspect(lunarDate),
                "solar =", util.inspect(expectedSolarDate),
            ].join(" ");

        var solarDate;

        solarDate = toSolar(lunarDate);
        assert.equal(solarDate.year, expectedSolarDate.year, errmsg);
        assert.equal(solarDate.month, expectedSolarDate.month, errmsg);
        assert.equal(solarDate.day, expectedSolarDate.day, errmsg);

        solarDate = {};
        toSolar(lunarDate, solarDate);
        assert.equal(solarDate.year, expectedSolarDate.year, errmsg);
        assert.equal(solarDate.month, expectedSolarDate.month, errmsg);
        assert.equal(solarDate.day, expectedSolarDate.day, errmsg);

        solarDate = toSolar(lunarDate.year, lunarDate.month, lunarDate.day,
            lunarDate.isIntercalary);
        assert.equal(solarDate.year, expectedSolarDate.year, errmsg);
        assert.equal(solarDate.month, expectedSolarDate.month, errmsg);
        assert.equal(solarDate.day, expectedSolarDate.day, errmsg);

        solarDate = {};
        toSolar(lunarDate.year, lunarDate.month, lunarDate.day,
            lunarDate.isIntercalary, solarDate);
        assert.equal(solarDate.year, expectedSolarDate.year, errmsg);
        assert.equal(solarDate.month, expectedSolarDate.month, errmsg);
        assert.equal(solarDate.day, expectedSolarDate.day, errmsg);
    }

    function assertLunarDate(solarDate, expectedLunarDate) {
        var errmsg = [
                "solar =", util.inspect(solarDate),
                "lunar =", util.inspect(expectedLunarDate),
            ].join(" ");

        var lunarDate;

        lunarDate = toLunar(solarDate);
        assert.equal(lunarDate.year, expectedLunarDate.year, errmsg);
        assert.equal(lunarDate.month, expectedLunarDate.month, errmsg);
        assert.equal(lunarDate.day, expectedLunarDate.day, errmsg);
        assert.equal(lunarDate.isIntercalary,
            !!expectedLunarDate.isIntercalary, errmsg);

        lunarDate = {};
        toLunar(solarDate, lunarDate);
        assert.equal(lunarDate.year, expectedLunarDate.year, errmsg);
        assert.equal(lunarDate.month, expectedLunarDate.month, errmsg);
        assert.equal(lunarDate.day, expectedLunarDate.day, errmsg);
        assert.equal(lunarDate.isIntercalary,
            !!expectedLunarDate.isIntercalary, errmsg);

        lunarDate = toLunar(solarDate.year, solarDate.month, solarDate.day);
        assert.equal(lunarDate.year, expectedLunarDate.year, errmsg);
        assert.equal(lunarDate.month, expectedLunarDate.month, errmsg);
        assert.equal(lunarDate.day, expectedLunarDate.day, errmsg);
        assert.equal(lunarDate.isIntercalary,
            !!expectedLunarDate.isIntercalary, errmsg);

        lunarDate = {};
        toLunar(solarDate.year, solarDate.month, solarDate.day, lunarDate);
        assert.equal(lunarDate.year, expectedLunarDate.year, errmsg);
        assert.equal(lunarDate.month, expectedLunarDate.month, errmsg);
        assert.equal(lunarDate.day, expectedLunarDate.day, errmsg);
        assert.equal(lunarDate.isIntercalary,
            !!expectedLunarDate.isIntercalary, errmsg);
    }
});
