Q: 存储 `unique` 属性的字段数据是先查询再入库还是直接入库?

> 584800573(584800573) 11:37:12
> 正常不跟数据库交互

> hero63418@163.com<hero63418@163.com> 11:37:12
> 两个都用

> 584800573(584800573) 11:37:22
> redis 就可以了

> hero63418@163.com<hero63418@163.com> 11:37:57
> 万一你那天查询被缓存了, 没有及时更新就派上用场了

> hero63418@163.com<hero63418@163.com> 11:38:02
> 处理下错误~

> 631300329(631300329) 11:38:15
> /难过 查询貌似会出问题.. 两个同名用户同时注册 都先查数据库 这是都是没有 然后同时入了库咋办

> 1031028525(1031028525) 11:38:33
> insert ignore

> 631300329(631300329) 11:38:43
> /难过 幂等操作挺难熬的

> 1031028525(1031028525) 11:38:44
> last insert id

> 584800573(584800573) 11:38:53
> 那就幂等啊
> 正常都是先 redis 一下

> 584800573(584800573) 11:40:15
> redis 加上数据库幂等基本上就 ok 可