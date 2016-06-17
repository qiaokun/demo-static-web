/**
 * @file 格式化日期模块
 *
 * @author CK
 */

module.exports = function (milliseconds) {
    if (milliseconds > 999) {
        return (milliseconds / 1000).toFixed(2) + ' s';
    }

    return milliseconds + ' ms';
};
