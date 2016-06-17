/**
 * @file 字符串重复模块
 *
 * @author CK
 */

module.exports = function (pattern, number) {
    var string = '';
    while (number > 0) {
        number--;
        string += pattern;
    }
    return string;
};
