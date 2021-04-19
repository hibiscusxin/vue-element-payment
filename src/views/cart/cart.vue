<template>
  <div class="cart-wrapper">
    <div class="cart-content">
      <el-card shadow="never" class="cart-content-card">
        <div class="cart-content__title">购物车</div>
        <div class="cart-content__top">
          <el-row :gutter="24">
            <el-col :span="2">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><span class="cart-checked-all">全选</span></el-checkbox>
            </el-col>
            <el-col :span="11">款式信息</el-col>
            <el-col :span="9">价格</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </div>
        <div class="cart-content__content">
          <el-row :gutter="24" class="valid-content" v-for="item in validList" :key="item.id">
            <el-col :span="1" class="single-checked" style="padding: 0">
              <el-checkbox v-model="item.selected" @change="handleChecked"></el-checkbox>
            </el-col>
            <el-col :span="2" class="images">
              <el-image class="images__images" :src="item.image" fit="cover" />
            </el-col>
            <el-col :span="4" class="styleName">{{ item.styleName }}</el-col>
            <el-col :span="6" class="content" >
              <div class="tags">标签： {{ item.tags }}</div>
              <div class="create-time">创建日期： {{ item.createTime | dateFormat }}</div>
            </el-col>
            <el-col :span="9" style="padding: 0">
              <span class="files">￥{{ item.price | priceToCurrency }}</span>
            </el-col>
            <el-col :span="2" style="padding: 0">
              <span class="delete" @click="deleteIt(item)">删除</span>
            </el-col>
          </el-row>
        </div>
        <div class="cart-content__invalid">
          <el-row :gutter="24" class="invalid-content" v-for="item in invalidList" :key="item.id">
            <el-col :span="1" class="single-failed">
              <div class="failed">失效</div>
            </el-col>
            <el-col :span="2" class="images">
              <el-image class="images__images" :src="item.image" fit="cover" />
            </el-col>
            <el-col :span="4" class="styleName">{{ item.styleName }}</el-col>
            <el-col :span="6" class="content">
              <div class="tags">标签： {{ item.tags }}</div>
              <div class="create-time">创建日期： {{ item.createTime | dateFormat}}</div>
            </el-col>
            <el-col :span="9" style="padding: 0">
              <span class="files">￥{{ item.price | priceToCurrency }}</span>
            </el-col>
            <el-col :span="2" style="padding: 0">
              <span class="delete" @click="deleteIt(item)">删除</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="cart-bottom-download">
      <el-row :gutter="24" class="cart-bottom-download__rows">
        <el-col :span="2" class="selected-all-box">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><span class="cart-checked-all">全选</span></el-checkbox>
        </el-col>
        <el-col :span="15" class="delete-all">
          <span class="delete" @click="deleteAll">删除</span>
        </el-col>
        <el-col :span="3" class="has-chose-box">
          <span class="has-chosed">已选择<span class="number">{{ selected_count }}</span>项</span>
        </el-col>
        <el-col :span="3" class="has-chose-box">
          <span class="has-chosed">金额:<span class="number">￥{{ selected_amount | priceToCurrency }}</span></span>
        </el-col>
        <el-col :span="2" class="downloads">
          <div class="download-button" @click="downloadsIt">立即支付</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { priceToCurrency } from '@/filter'
import { getList } from '@/api/cart'
export default {
  filters: {
    priceToCurrency
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      validList: [],
      invalidList: [],
      checkedCount: 0
    }
  },
  computed: {
    // 已选择数目
    selected_count() {
      var total_count = 0
      for (var i = 0; i < this.validList.length; i++) {
        if (this.validList[i].selected) {
          total_count ++
        }
      }
      return total_count
    },
    selected_amount() {
      var total_amount = 0
      for (var i = 0; i < this.validList.length; i++) {
        if (this.validList[i].selected) {
          console.log(this.validList[i])
          total_amount += this.validList[i].price
        }
      }
      return total_amount
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      getList().then(res => {
        this.validList = res.data.validList
        this.invalidList = res.data.invalidList
      })
    },
    // 全选 反选
    handleCheckAllChange(val) {
      if (val) {
        for (var i = 0; i < this.validList.length; i++) {
          this.validList[i].selected = true
        }
        this.checkedCount = this.validList.length
      } else {
        for (var j = 0; j < this.validList.length; j++) {
          this.validList[j].selected = false
        }
        this.checkedCount = 0
      }
      this.isIndeterminate = this.checkedCount > 0 && this.checkedCount < this.validList.length
    },
    // 一级选择
    handleChecked() {
      let checkedCounts = 0
      for (var i = 0; i < this.validList.length; i++) {
        if (this.validList[i].selected) {
          checkedCounts ++
        }
      }
      this.checkedCount = checkedCounts
      this.checkAll = this.checkedCount === this.validList.length
      this.isIndeterminate = this.checkedCount > 0 && this.checkedCount < this.validList.length
    },
    // 单个删除
    deleteIt(item) {
      console.log(item, '单个删除')
    },
    // 多个删除
    deleteAll() {
      console.log('duo个删除')
    },
    // 下载
    downloadsIt() {
      console.log('下载')
    }
  }
}
</script>
<style lang="scss">
  .cart-content-card {
    .el-card__body {
      padding: 24px 2.5%;
    }
  }
  .cart-content {
    &__top {
      .el-checkbox {
        margin-top: -17px;
      }
    }
  }
  .cart-bottom-download {
    .el-col {
      padding: 0!important;
    }
  }
</style>
<style lang="scss" scoped>
  .cart-wrapper {
    font-family: PingFangSC-Medium, PingFang SC;
    .cart-content {
      margin: 24px 5.5% 0 5.5%;
      .cart-content-card {
        max-width: 1280px;
        margin: 0 auto;
      }
      &__title {
        font-size: 18px;
        font-weight: bold;
        color: #CF3232;
        line-height: 18px;
      }
      &__top {
        margin-top: 24px;
        width: 100%;
        height: 48px;
        background: #F7F6F5;
        border-radius: 6px;
        padding: 17px 2%;
        font-size: 14px;
        font-weight: bold;
        color: #1A1B1C;
        line-height: 14px;
        .cart-checked-all {
          font-size: 14px;
          font-weight: bold;
          color: #1A1B1C;
          line-height: 14px;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;
        .valid-content {
          display: flex;
          align-items: center;
          margin-top: 20px;
          margin-left: 0 !important;
          margin-right: 0!important;
          width: 100%;
          height: 120px;
          background: #FFFFFF;
          border-radius: 6px;
          border: 2px solid #E8E8E8;
          .single-checked {
            display: flex;
            justify-content: center;
            min-width: 46px;
            max-width: 72px;
          }
          .images {
            min-width: 88px;
            max-width: 139px;
            padding: 0!important;
            display: flex;
            align-items: center;
            justify-content: center;
            &__images {
              width: 88px;
              height: 88px;
              border-radius: 6px;
            }
          }
          .styleName {
            font-size: 14px;
            font-weight: 400;
            color: #1A1B1C;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .content {
            font-size: 12px;
            font-weight: 400;
            color: #484949;
            line-height: 18px;
            .tags {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom: 8px;
            }
          }
          .files {
            font-size: 14px;
            font-weight: bold;
            color: #484949;
            line-height: 14px;
          }
          .delete {
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: #484949;
            line-height: 14px;
          }
        }
      }
      &__invalid {
        display: flex;
        flex-direction: column;
        .invalid-content {
          display: flex;
          align-items: center;
          margin-top: 20px;
          margin-left: 0 !important;
          margin-right: 0!important;
          width: 100%;
          height: 120px;
          background: #F7F6F5;
          border-radius: 6px;
          border: 2px solid #E8E8E8;
          .single-failed {
            display: flex;
            justify-content: center;
            min-width: 46px;
            max-width: 72px;
            .failed {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 11px;
              min-width: 46px;
              height: 18px;
              background: #D1D1D2;
              border-radius: 2px;
              font-size: 6px;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 12px;
            }
          }
          .images {
            min-width: 88px;
            max-width: 139px;
            padding: 0!important;
            display: flex;
            align-items: center;
            justify-content: center;
            &__images {
              opacity:0.6;
              filter: alpha(opacity=60);
              width: 88px;
              height: 88px;
              border-radius: 6px;
            }
          }
          .styleName {
            font-size: 14px;
            font-weight: 400;
            color: #A3A4A4;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .content {
            font-size: 12px;
            font-weight: 400;
            color: #A3A4A4;
            line-height: 18px;
            .tags {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom: 8px;
            }
          }
          .files {
            font-size: 14px;
            font-weight: 500;
            color: #A3A4A4;
            line-height: 14px;
          }
          .delete {
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            color: #1A1B1C;
            line-height: 14px;
          }
        }
      }
    }
    .cart-bottom-download {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 72px;
      background: #FFFFFF;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      &__rows {
        display: flex;
        align-items: center;
        width: 84%;
        max-width: 1216px;
        height: 44px;
        background: #F7F6F5;
        border-radius: 6px;
        border: 1px solid #E8E8E8;
        padding-left: 24px;
        .selected-all-box {
          max-width: 76px;
          .cart-checked-all {
            font-size: 14px;
            font-weight: bold;
            color: #1A1B1C;
            line-height: 14px;
          }
        }
        .delete {
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #484949;
          line-height: 14px;
        }
        .has-chosed {
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: #484949;
          line-height: 16px;
          .number {
            color: #CF3232;
            padding: 0 6px;
          }
        }
        .downloads {
          display: flex;
          justify-content: flex-end;
          max-width: 108px;
          .download-button {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 44px;
            background: #CF3232;
            -moz-border-radius-topright: 6px;
            -moz-border-radius-bottomright: 6px;
            -webkit-border-top-right-radius: 6px;
            -webkit-border-bottom-right-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 14px;
          }
        }
      }
    }
  }
</style>
