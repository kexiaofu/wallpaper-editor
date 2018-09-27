<template>
    <div class="wallpaper" >
      <div class="left-part">
        <img :src="styles[styleIndex].src" alt="" class="bg-img">
        <div class="content-img"
             :style="{
             'top':styles[styleIndex].y + 'px',
             'left':styles[styleIndex].x + 'px',
             'width':styles[styleIndex].w + 'px',
             'height':styles[styleIndex].h + 'px',
             'border-radius':styles[styleIndex].radius + 'px',
              'box-shadow': '-5px 5px 10px #333'
             }">
          <img :src="w2" alt="" class="s-img"
               :style="{
             'width':styles[styleIndex].w + 'px',
             'height':styles[styleIndex].h + 'px'
             }">
        </div>

      </div>
      <div class="right-part" ref="uploadImg">
        <div class="custom-aside">
          <div class="step-btn hide">
            <i class="ww-icon help-i"></i>
          </div>
          <div class="side summary-wrap">
            <ul class="list-unstyled info">
              <li class="hd">
                <span class="title">售价</span>
                <span class="pull-right price">
                                <span class="discount-msg">七折惠</span>
                                <span class="item ori-price"></span>
                                <span class="item discount-price">
                                   <strong>￥</strong><strong id="completedMoney">0</strong>
                                </span>
                            </span>
              </li>
              <li>
                <span class="title">完成尺寸</span>
                <span class="pull-right size" id="completedSize"></span>
              </li>
              <li>
                <span class="title">我的产品</span>
                <a href="#" class="pull-right check-detail">材料明细</a>
              </li>
            </ul>

            <div class="btn-group-wrap">
              <div class="step step1 active clearfix" data-step="1">
                <div class="num-wrap">
                                    <span class="input-item">
                                        <input type="text" id="buy-count" class="form-control" value="1" data-id="113">
                                    </span>
                  <a href="javascript:void(0)" class="default-link num-ope-item minus">
                    -
                  </a>
                  <a href="javascript:void(0)" class="default-link num-ope-item plus">
                    +
                  </a>
                </div>
                <button class="btn btn-lg btn-block btn-success add-cart disabled" id="custom-add-cart-btn" data-type="1">
                  <i class="wa wa-shopping-cart-fill"></i>
                  <span>加入购物车</span>
                </button>
              </div>

              <div class="step step2" data-step="2">
                <a href="/cart" class="btn btn-lg btn-block btn-success " target="_blank" data-type="link">
                  <img src="/images/custom/circle-money.png" alt="">
                  <span>去结算</span>
                </a>
                <button class="btn btn-lg btn-block btn-default" data-type="4">
                  <span>再定制一幅</span>
                </button>
              </div>

              <div class="step step3" data-step="3">
                <button class="btn btn-lg btn-block btn-success" data-type="3">
                  <i class="wa wa-shopping-cart-fill"></i>
                  <span>加入购物车</span>
                </button>
                <button class="btn btn-lg btn-block btn-default" data-type="4">
                  <span>再定制一幅</span>
                </button>
              </div>

              <div class="step step4" data-step="4">
                <button class="btn btn-lg btn-block btn-success" data-type="5">
                  <span>保存修改</span>
                </button>
                <button class="btn btn-lg btn-block btn-default" data-type="6">
                  <span>放弃修改</span>
                </button>
              </div>
            </div>

            <!--<div class="bottom">
              <a href="javascript:void(0)" class="item cus-to-pro"><span>售卖这件产品</span></a>

              &lt;!&ndash;<button class="btn btn-lg btn-block btn-default" data-type="2">&ndash;&gt;

              &lt;!&ndash;</button>&ndash;&gt;
              <div class="item share-wrap">
                            <span class="share-tit">
                                <i class="bd"></i> 分享大作 <i class="wa wa-share-fill"></i>
                            </span>
                <div class="share-list">
                                <span class="share-social" data-type="weibo">
                                    <i class="ww-icon social-color weibo-light-color"></i>
                                </span>
                  <span class="share-social" data-type="qq">
                                    <i class="ww-icon social-color qq-light-color"></i>
                                </span>
                  <span class="share-social" data-type="weixin">
                                    <i class="ww-icon social-color weixin-light-color"></i>
                                </span>
                  <span class="share-social" data-type="douban">
                                    <i class="ww-icon social-color douban-light-color"></i>
                                </span>
                </div>
              </div>
              <div class="share-erweima invisible">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                <p>扫一扫进行分享</p>
                <div class="code-wrap">
                  <img src="/images/loading/loading-32.gif" alt="墙蛙微信分享二维码" class="code">
                </div>
              </div>
            </div>-->
          </div>
          <div class="side pack-wrap clearfix">
            <div id="material-wrap" class="right">
              <div id="image" data-type="image" class="image-tab-content">

              </div>
              <div class="img-material-nav">
                <a href="javascript:void(0)" id="trigger-upload" class=" btn btn-block btn-primary" @click="toUploadFile">
                  上传图片
                </a>
                <p class="cate-tips">
                  <span class="error">* </span>建议上传尺寸：≥ <span id="size-tips">1580 x 1580</span> 像素
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="style-part">
          <div class="title">墙纸样式</div>
          <div class="content">
            <div class="item"
                 v-for="(style,index) in styles"
                 :style="{'background':styleIndex === index?'#76a549':''}"
                @click="selectStyle(index)"
            >{{style.name}}</div>
          </div>
        </div>
        <div class="upload-img" ref="uploadImg">
          <div class="submit-img" @click="toUploadFile" >上传文件</div>
        </div>-->
      </div>
    </div>
</template>

<script>
  export default {
    name: "wallpaper",

    data() {
      return {
        w1:'static/images/w1.jpg',
        w2:'',
        styleIndex:0,
        styles:[{
          name:'样式1',
          src:'static/images/w1.jpg',
          x:225,
          y:78,
          w:250,
          h:298,
          radius:0
        },{
          name:'样式2',
          src:'static/images/w2.jpg',
          x:122,
          y:5,
          w:455,
          h:312,
          radius:3
        }]
      }
    },

    mounted() {
      console.log(this.$router.history.current.params.wid);
      if(this.$router.history.current.params.wid !== undefined) {
        this.styleIndex = this.$router.history.current.params.wid
      }

    },

    methods:{

      selectStyle(index) {
        this.styleIndex = index;
        this.w2 = '';
      },

      toUploadFile() {
        let p =  this.$refs.uploadImg;
        if(document.querySelector('#uploadImg')) {
          p.removeChild(document.querySelector('#uploadImg'));
        }
        let input = document.createElement('input');
            input.id = "uploadImg";
            input.onchange = this.uploadFile;
            input.type = 'file';
            input.style.display = 'none';
            p.appendChild(input);
            input.click();
      },

      uploadFile() {
        console.log('onchange');
        let flObj = document.querySelector('#uploadImg'),
            file=flObj.files[0],
            fReader=new FileReader();
        if(file.type.indexOf("image") >= 0) {
          fReader.readAsDataURL(file);
          fReader.onload = e =>{
            console.log(e);
            this.w2 = e.target.result;
          }
        } else {
          alert('请上传图片资源')
        }

      }

    }
  }
</script>

<style scoped>
  @import '../assets/base.css';
  @import '../assets/custom.css';
  .wallpaper{
    width: 1200px;
    height: 700px;
    position: relative;
    z-index: 1;
    margin:60px auto;
    overflow: hidden;
  }
  .left-part{
    width: 700px;
    height: 700px;
    position: absolute;
    background-size: cover;
  }
  .content-img{
    position: absolute;
    width: 100%;
    overflow: hidden;
  }
  .bg-img{
    max-width: 100%;
    max-height: 100%;
  }
  .right-part{
    width: 320px;
    float:right;
  }
  .style-part{
    height: 120px;
    padding: 10px;
  }
  .style-part .content{
    display: flex;
  }
  .style-part>.title{
    padding-bottom:10px;
  }
  .content>.item {
    padding: 5px 10px;
    border-radius:5px;
    background: #cdcdcd;
    color: #fff;
    margin-right:10px;
    cursor: pointer;
  }

  .submit-img{
    width: 320px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color:#fff;
    background: #76a549;
    cursor: pointer;
    margin:0 auto;
  }

  .s-img{
    position: absolute;
  }


  /*这是别人的css*/



</style>
