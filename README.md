#bootstrap3-Paging#
>a simple paging plugin

##config##
so easy
```javascript
            var callback = function(){
                console.log("callback()"+page.curPageNum);
                page.setAllPageNum(page.allPageNum+3)
            };
            var page = paging(".pagination",3,3,callback);
            page.createPagination();
```
paging(id, all, size,callback)

1. id : jquery selector_id
2. all : all data numbers
3. size : paging menu size
4. callback : callback function

##picture##
![](http://wuhulala.github.io/images/images.jpg)