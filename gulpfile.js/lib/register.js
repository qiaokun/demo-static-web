/**
 * @file 路由注册，前端实现后端接口
 *
 * @author CK
 */

// router.get('/forwarder', function*(next) {
//     var location = url.parse(this.req.url);
//     var query = parseParam(location.query);

//     if (query.url) {
//         var currPath = config.root + '/html/' + query.url;
//         currPath = fs.existsSync(currPath)
//              ? currPath : fs.existsSync(currPath + '.html') ? currPath + '.html' : null;
//         if (currPath) {
//             this.body = fs.readFileSync(currPath, {
//                 encoding: 'utf8'
//             });
//             return;
//         }
//     }

//     yield next;
// });

// app.use(router.routes()).use(router.allowedMethods());

