import ShopUtil from 'utils/shop.jsx'

const _shop = new ShopUtil()

class Product{
    getProductList(listParam){
        let url = ''
        let data = {}
        if(listParam.listType === 'list'){
            url = '/manage/product/{商品列表接口}'
            data.pageNum = listParam.pageNum
        }else if(listParam.listType === 'search'){
            url = '/manage/product/{查询商品接口}'
            data.pageNum = listParam.pageNum
            data[listParam.searchType] = listParam.keyword
        }
        return _shop.request({
            type: 'post',
            url: url,
            data: data
        })
    }
    setProductStatus(productInfo){
        return _shop.request({
            type: 'post',
            url: '/manage/product/{修改商品状态接口/上架或下架}',
            data: productInfo
        })
    }
    getCategoryList(parentCategoryId){
        return _shop.request({
            type: 'post',
            url: '/manage/category/{根据id获取分类接口}',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证成功'
        }
        if(typeof product.name !== 'string' || product.name.length === 0){
            return {
                status: false,
                msg: '商品名称不能为空'
            }
        }

        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
            return {
                status: false,
                msg: '商品描述不能为空'
            }
        }

        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类'
            }
        }

        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格'
            }
        }

        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数'
            }
        }
        //console.log(product)
        return result
    }
    saveProduct(product){
        return _shop.request({
            type: 'post',
            url: '/manage/product/{添加商品接口}',
            data: product
        })
    }
    getProduct(productId){
        return _shop.request({
            type: 'post',
            url: '/manage/product/{商品详情接口}',
            data: {
                productId: productId || 0
            }
        })
    }
    updateCategoryName(category){
        return _shop.request({
            type: 'post',
            url: '/manage/category/{修改品类名接口}',
            data: category
        })
    }
    saveCategory(category){
        return _shop.request({
            type: 'post',
            url: '/manage/category/{添加品类接口}',
            data: category
        })
    }
}

export default Product