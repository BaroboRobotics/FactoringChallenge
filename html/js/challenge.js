/* global Serenade, $ */
/* jshint  newcap: false */

$(function () {
    "use strict";

    var
        red = "8kv7",
        left = red,
        blue = "c97s",
        right = blue,
        redRobot,
        blueRobot,

        ctrl = {
            leftClick: function () {
                zeClicken(left);
            },
            rightClick: function () {
                zeClicken(right);
            },
            discon: function () {
                redRobot.disconnect();
                blueRobot.disconnect();
            },
            connect: function () {
                redRobot = Linkbots.connect(red);
                blueRobot = Linkbots.connect(blue);
                redRobot.register(callbacks);
                blueRobot.register(callbacks);
                redRobot.color(0,0,255);
                blueRobot.color(255,0,0);

            },
            startOver: function (_, o) {
                var newNumber = giveMeNumber(4,100);
                o.topNumbers.update([newNumber]);
                o.topNumber = newNumber;
                ctrl.connect();
                resetGame(o, newNumber);
            },
        },

        model = Serenade({
            topNumbers: new Serenade.Collection([]),
            topNumber: '',
            rightVal: null,
            leftVal: null,
            leftDisabled: false,
            rightDisabled: false,
            leftFailed: false,
            rightFailed: false,
            leftSuccess: false,
            rightSuccess: false,
            totalSuccess: false,
            hasRobots: true,
        });

    function giveMeNumber (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function isPrime (n) {
        var i;
        for (i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    function proceed (o) {
        var min, max, next;
        if (o.leftVal <= o.rightVal) {
            min = o.leftVal;
            max = o.rightVal;
        }
        else {
            min = o.rightVal;
            max = o.leftVal;
        }

        if (!isPrime(max)) {
            next = max;
        }
        else if (!isPrime(min)) {
            next = min;
        }
        else {
            ctrl.startOver(null, o);
            return;
        }

        o.topNumbers.push(next);
        o.topNumber = o.topNumbers.join(' -> ');
        resetGame(o, next);
    }

    function resetGame (o, n) {
        o.leftVal = giveMeNumber(2, 2*n/3);
        o.rightVal = giveMeNumber(2,2*n/3);
        o.leftDisabled = false;
        o.rightDisabled = false;
        o.leftSuccess = false;
        o.rightSuccess = false;
        o.totalSuccess = false;
    }

    function zeClicken (robot) {
        var robID = robot._id;
        var top = model.topNumbers.last,
            val, otherVal, success, disabled, halfDone, fail;
        if (robID === left) {
            val = 'leftVal';
            otherVal = 'rightVal';
            disabled = 'leftDisabled';
            success = 'leftSuccess';
            halfDone = model.rightSuccess;
            fail = 'leftFailed';
        }
        else {
            val = 'rightVal';
            otherVal = 'leftVal';
            disabled = 'rightDisabled';
            success = 'rightSuccess';
            halfDone = model.leftSuccess;
            fail = 'rightFailed';
        }
        if (!model[disabled]) {
            if (halfDone && Math.abs(model[val] * model[otherVal] - top) < 0.001) {
                model[disabled] = true;
                model[success] = true;
                model.totalSuccess = true;
                setTimeout(function () { proceed(model); }, 1500);
            }
            else if (!halfDone && Math.abs(top % model[val]) < 0.001) {
                model[fail] = false;
                model[disabled] = true;
                model[success] = true;
            }
            else {
                model[fail] = true;
                model[disabled] = true;
                setTimeout(function () {
                    model[fail] = false;
                    model[disabled] = false;
                }, 1000);
            }
        }
    }

    var scrollUp = function (robID) {
        if (robID === left) {
          if (!model.leftDisabled) {
              model.leftVal++;
          }
        }
        else {
          if (!model.rightDisabled) {
              model.rightVal++;
          }
        }
    }
    var scrollDown = function (robID) {
        if (robID === left) {
            if (!model.leftDisabled) {
                if (model.leftVal > 1.5) {
                    model.leftVal--;
                }
            }
        }
        else {
            if (!model.rightDisabled) {
                if (model.rightVal > 1.5) {
                    model.rightVal--;
                }
            }
        }
    }

    var changeValue = function(robot, _, event) {
      if (event.difference > 0) {
        scrollUp(robot._id);
      }
      else {
        scrollDown(robot._id);
      }
    }

    var callbacks = {
      button: {
        0: {
          callback: zeClicken
        },
        1: {
          callback: zeClicken
        }
      },
      wheel: {
        1: {
          distance: 20,
          callback: changeValue
        },
        3: {
          distance: 20,
          callback: changeValue
        }
      }
    };

    ctrl.startOver(null, model);
    $("#challengeApp").replaceWith(Serenade.render('app', model, ctrl));
});
