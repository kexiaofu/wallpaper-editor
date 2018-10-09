<template>
    <div class="standard">
      <!--<div class="container" ref="uploadImg">
        <div class="s-item" v-for="item in imgs" @click="showModal(item)">
          <img :src="item" alt="">
          <div class="mask">
            <img src="static/images/search.png" alt="">
          </div>
        </div>
        <div class="s-item" @click="toUploadFile">
          <img src="static/images/add.png" alt="" style="width: 50px;height: 50px;">
        </div>
      </div>-->
      <div class="modal" :style="{'min-width':sw+360+'px'}">
        <div class="close" @click="closeModal" >
          <img src="static/images/close.png" alt="">
        </div>

        <div class="warp-container">
          <div class="warp" :style="{'width':viewData.artBoxWidth + 'px','height':viewData.artBoxHeight +  'px'}" v-if="viewData.imageUrl">
            <div class="img-container"
                 ref="container"
                 :style="{
                   'width':viewData.trimBoxWidth + 'px',
                   'height':viewData.trimBoxHeight +  'px',
                   'margin-left':(viewData.artBoxWidth  - viewData.trimBoxWidth)/2 + 'px',
                   'top':(viewData.artBoxHeight  - viewData.trimBoxHeight)/2 + 'px'

                 }">
              <img :src="viewData.imageUrl" alt=""
                   :style="{
                   'width':toBig?(rotateClass/90%2===0?viewData.artBoxWidth:viewData.artBoxHeight)+'px':viewData.imageWidth + 'px',
                   'height':toBig?(rotateClass/90%2===0?viewData.artBoxHeight :viewData.artBoxWidth)+ 'px':viewData.imageHeight + 'px',
                   'transform':reversal?'rotate('+rotateClass+'deg) scaleX(-1) translate(-50%,-50%)':'rotate('+rotateClass+'deg) translate(-50%,-50%)'
                   }" v-if="viewData.imageUrl!==''">
              <img src="static/images/add.png" alt="" style="cursor: pointer" v-else>
              <img :src="viewData.photoUrl" alt="" v-if="viewData.type === 3">
            </div>
            <div class="operation"
                 :style="{
                 'width':viewData.trimBoxWidth+'px',
                 'height':viewData.trimBoxHeight + 'px',
                 'margin-left':(viewData.artBoxWidth  - viewData.trimBoxWidth - 4)/2 + 'px',
                 'margin-top':(viewData.artBoxHeight  - viewData.trimBoxHeight - 4)/2 + 'px',
                 cursor: viewData.imageUrl!==''?'':'pointer'}"
                 v-if="viewData.type === 1"
            >
              <div class="add-item add-l" @click="addItem(0)" :style="{'display':modeType === 1?'block':'none'}">
                <div class="head">+</div>
              </div>
              <div class="add-item add-v" @click="addItem(1)" :style="{'display':modeType === 1?'block':'none'}">
                <div class="head">+</div>
              </div>
              <!--这是垂直方向（y轴）的-->
              <div class="v-item add-v" v-drag:y="dragV" v-for="(item,index) in varr" :style="{'top':item.y + 'px','display':modeType === 1?'block':'none'}" @click="toDelItem(0,index)" :id="item.id" :data-min="viewData.materialMinHeight" :data-max="viewData.materialMaxHeight" :data-r="ballR">
                <div class="head" :style="{'width':ballR * 2 + 'px','height':ballR * 2 + 'px'}"></div>
                <div class="line" :style="{'width':viewData.trimBoxWidth + 10 + 'px'}"></div>
                <div class="count">{{(item.y + ballR)/viewData.proportion * .3528 / 10 | fixed1}}cm</div>
                <div class="del" v-if="vIndex === index" @click="delItem(0,index)" :style="{'left':viewData.trimBoxWidth + 35 + 'px'}">+</div>
              </div>
              <!--这是水平方向（x轴）的-->
              <div class="l-item" v-drag:x="dragL" v-for="(item,index) in larr" :style="{'left':item.x + 'px','display':modeType === 1?'block':'none'}" @click="toDelItem(1,index)" :id="item.id" :data-min="viewData.materialMinWidth" :data-max="viewData.materialMaxWidth" :data-r="ballR">
                <div class="head" :style="{'width':ballR * 2 + 'px','height':ballR * 2 + 'px'}"></div>
                <div class="line" :style="{'height':viewData.trimBoxHeight + 10 + 'px'}"></div>
                <div class="count">{{(item.x + ballR)/viewData.proportion * .3528 / 10 | fixed1}}cm</div>
                <div class="del" v-if="lIndex === index" @click="delItem(1,index)" :style="{'top': viewData.trimBoxHeight + 35 + 'px'}">+</div>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="warp-container" >
          <div class="warp" style="width: 750px;height: 750px;">
            <div class="img-container" style="height: 750px;">
              <img src="static/images/opacity.png" alt="" >
            </div>
          </div>
        </div>-->

        <div class="data-container">
          <div class="data-item">
            <div class="title"><b>{{ productData.productName }}</b></div>
            <div class="content">
              <!--<p>文件大小: -</p>-->
              <p>需求大小: {{ productData.width - (-productData.bleedingLine)}}cm X {{ productData.height - (-productData.bleedingLine)}}cm</p>
              <p>最大: {{ productData.materialMaxWidth }}cm X {{ productData.materialMaxHeight }}cm</p>
              <p>最小: {{ productData.materialMinWidth }}cm X {{ productData.materialMinHeight }}cm</p>
              <p>需求DPI: {{ productData.dpi }}</p>
              <p :style="{'color':productData.dpi > viewData.imageDpi?'red':'#999'}">实际DPI: {{ viewData.imageDpi }}</p>
            </div>
          </div>
          <div class="data-item">
            <div class="title"><b>翻转</b></div>
            <div class="content">
              <div class="bg_con">
                <input id="checked_1" type="checkbox" class="switch" v-model="reversal"/>
                <label for="checked_1"></label>
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="title"><b>填充</b></div>
            <div class="content">
              <div class="bg_con">
                <input id="checked_2" type="checkbox" class="switch" v-model="toBig"/>
                <label for="checked_2"></label>
              </div>
            </div>
          </div>
          <div class="data-item">
            <div class="title"><b>旋转</b></div>
            <div class="content">
              <div class="svg-container" @click="toRotateImg">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path stroke="none" fill="#2e2e2e" d="M22.499 0c-.276 0-.5.224-.5.5v5.645c-1.811-2.007-4.241-3.339-6.975-3.784-3.193-.518-6.382.223-8.993 2.086-2.61 1.862-4.338 4.629-4.866 7.79-.529 3.161.206 6.34 2.067 8.948.749 1.049 1.651 1.963 2.683 2.718.089.066.192.097.295.097.153 0 .306-.071.403-.205.163-.223.115-.535-.108-.698-.944-.692-1.773-1.53-2.458-2.491-1.707-2.393-2.38-5.306-1.895-8.203.484-2.899 2.068-5.434 4.46-7.141 2.394-1.711 5.327-2.387 8.251-1.914 2.592.422 4.887 1.708 6.562 3.652h-5.926c-.276 0-.5.224-.5.5s.224.5.5.5h7l.059-.012.014-.003c.24-.037.427-.235.427-.485v-7c0-.276-.224-.5-.5-.5z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="data-item" v-if="viewData.type === 1">
            <div class="title"><b>模式</b></div>
            <div class="content">
              <iselect
                :arr="['普通','画线']"
                :selectWidth="200"
                :selectIndex="modeType"
                @selectThisOne="selectThisOne"
                :canSelect="canSelectMode"
              />
            </div>
          </div>

          <div class="data-item" style="margin-top:50px;">
            <div class="title"><b></b></div>
            <div class="content">
              <div class="btn" @click.stop="toUploadFile">上传图片</div>
            </div>
          </div>

          <div class="data-item" v-if="viewData.hasOwnProperty('imageUrl')">
            <div class="title"><b></b></div>
            <div class="content">
              <div class="btn save" @click="saveSetting">保存</div>
            </div>
          </div>

        </div>

      </div>

      <form class="uploadFile" ref="uploadFile"></form>
      <div class="waiting" v-if="waiting">
        <div class="loading">
          <div class="loader"></div>
          <p>please waiting!</p>
        </div>

      </div>
    </div>
</template>

<script>
  import drag from './drag';
  import axios from 'axios';
  import iselect from './iselect';
  export default {
    name: "standard",

    components:{
      iselect
    },

    filters:{
      fixed1(val) {
        return val.toFixed(1)
      }
    },

    data() {
      return {

        waiting:false,

        canSelectMode:true,

        ballR:13,//小球半径

        viewData:{/*
          "shoppingCartID":"7cb24857-e7dd-40ca-9678-6f670e46988c",
          "productID":"cfcf1c8e-2785-467f-af95-531bcba69b02",
          "productName":"彩色墙纸",
          "printSides":1,
          "amount":1,
          "width":2834.64575,
          "height":2834.64575,
          "materialMaxWidth":375.0,
          "materialMaxHeight":375.0,
          "materialMinWidth":0,
          "materialMinHeight":0,
          "dpi":500,
          "bleedingLine":85.03937,
          "whiteLine":85.03937,
          "stickerNum":0,
          "imageUrl":"http://192.168.2.157:56790/BaiChengImage/5477dd42-345f-4c38-a8b7-ae0019db85d5/Thumbnail/_SUN4097.JPG",
          "trimBoxWidth":750.0,
          "trimBoxHeight":750.0,
          "artBoxWidth":772.5,
          "artBoxHeight":772.5,
          "proportion":0.264583319*/
        },

        productData:{},

        sid:'',

        modeType:0,
        imgs:['static/images/w1.jpg','static/images/w2.jpg'],
        modalShow:false,
        w:'http://192.168.2.157/BaiChengImage/20180926113654.jpg',
        offset:13,
        varr:[],
        larr:[],
        maxL:301,
        maxH:201,
        lIndex:null,
        vIndex:null,
        sw: 750,
        sh: 750,
        reversal:false,
        toBig:false,
        rotateClass:0
      }
    },

    mounted () {

      let sid = this.$router.history.current.query.shoppingCartId;
      if(sid) {
        this.sid = sid;
        axios.post('http://120.79.145.34:8818/Product/UploadTemplateData',{
          shoppingCartId:sid,
          admin:'deepmind',
          passwordHash:"9ec090ec31f3e72d50db4f914eaaa0a4"
        })
          .then(res=>{
            console.log(res);
            if(res.data.Success) {
              this.productData = Object.assign({},res.data.Data);
              if(this.productData.width > this.productData.materialMaxWidth || this.productData.height > this.productData.materialMaxHeight) {
                this.modeType = 1;
                this.canSelectMode = false;
              }

              axios.get('/api/baicheng/GetImageCropInfo?shoppingCartId='+sid)
                .then(res=>{
                  console.log(res);
                  if(res.data.code === 2000) {
                    let data = res.data.result;
                    this.viewData = Object.assign({},data);
                    this.reversal = data.mirror;
                    this.rotateClass = data.rotate;
                    this.toBig = data.fill;
                    if(data.x.length > 0) {
                      data.x.map(item=>{
                        this.larr.push({
                          id:item,
                          x:item - this.ballR,
                          y:0
                        })
                      });
                    }

                    if(data.y.length > 0) {
                      data.y.map(item=>{
                        this.varr.push({
                          id:item,
                          x:0,
                          y:item - this.ballR
                        })
                      });
                    }

                  }
                })
                .catch(err=>{

                })

            }
          })
          .catch(err=>{
            console.log(err)
          });
      }

      //测试用
      //this.addItem(1,this.viewData.materialMaxWidth - this.ballR);
      //this.addItem(0,this.viewData.materialMaxHeight - this.ballR);


      //this.maxL = this.$router.history.current.params.w;
      //this.maxH = this.$router.history.current.params.h;
      //this.showModal(this.imgs[1])
    },

    methods:{

      compareNum(a,b,c) {
        return b-a>c;
      },

      saveSetting() {
        let type = this.viewData.type;
        if(type === 1) {
          if(!this.canSelectMode) {
            if(this.larr.length === 0 || this.varr.length === 0) {
              alert('需要画线操作，请进行画线操作')
            } else {
              let maxDistY = this.viewData.materialMaxHeight,
                maxDistX = this.viewData.materialMaxWidth,
                larr = this.larr,
                varr = this.varr,
                llen = larr.length,
                vlen = varr.length,
                ballR = this.ballR;

              if(type !==1) {
                for(let i = 0;i<llen-1;i++) {

                  console.log(larr[i].x + ballR,larr[i+1].x,maxDistX,this.compareNum(larr[i].x,larr[i+1].x,maxDistX));
                  if(this.compareNum(larr[i].x + ballR,larr[i+1].x,maxDistX)) {
                    alert('水平方向的第'+(i-(-1))+'条画线距离大于预设的最大距离');
                    return
                  }
                }
                console.log(larr[llen-1].x + ballR,this.viewData.trimBoxWidth,maxDistX)
                if(this.compareNum(larr[llen-1].x + ballR,this.viewData.trimBoxWidth,maxDistX)) {
                  alert('水平方向的最后一条画线与边框距离大于预设的最大距离');
                  return
                }

                for(let i = 0;i<vlen-1;i++) {

                  console.log(varr[i].y + ballR,varr[i+1].y,maxDistX,this.compareNum(varr[i].y,varr[i+1].y,maxDistX));
                  if(this.compareNum(varr[i].y + ballR,varr[i+1].y,maxDistX)) {
                    alert('垂直方向的第'+(i-(-1))+'条画线距离大于预设的最大距离');
                    return
                  }
                }

                if(this.compareNum(varr[vlen-1].y + ballR,this.viewData.trimBoxHeight,maxDistX)) {
                  console.log(varr[vlen-1].y + ballR,this.viewData.trimBoxHeight,maxDistX)
                  alert('垂直方向的最后一条画线与边框距离大于预设的最大距离');
                  return
                }

              }

            }
          }
        }

        let obj = {
          shoppingCartID:this.sid,
          imageUrl:this.viewData.imageUrl,
          fill:this.toBig,
          rotate:this.rotateClass,
          mirror:this.reversal
        };

        if(type === 1 && this.modeType === 1) {
          obj = Object.assign({},obj,{
            x:larr.map(item=>item.x + this.ballR),
            y:varr.map(item=>item.y + this.ballR)
          })
        }

        this.waiting = true;

        axios.post('api/baicheng/CropImage',obj)
          .then(res=>{
            console.log(res);
            this.waiting = false;
            if(res.data.code === 2000) {
              console.log(this.productData.linkUrl + '&cmd=ok');
              window.location.href = this.productData.linkUrl + '&cmd=ok'

            }
          })
          .catch(err=>{
            this.waiting = false;
            console.log(err)
          });

        console.log(obj);

      },

      toUploadFile() {
        let p =  this.$refs.uploadFile;
        if(document.querySelector('#uploadImg')) {
          p.removeChild(document.querySelector('#uploadImg'));
        }
        let input = document.createElement('input');
        input.id = "uploadImg";
        input.name = "file";
        input.onchange = this.uploadFile;
        input.type = 'file';
        input.style.display = 'none';
        p.appendChild(input);
        input.click();
      },

      uploadFile() {
        console.log('onchange',document.querySelector('.uploadFile'));
        let form = document.querySelector('.uploadFile'),
          flObj = document.querySelector('#uploadImg'),
          file=flObj.files[0];
        if(file.type.indexOf("image") >= 0) {

          let formData = new FormData(form);
          this.waiting = true;
          axios.post('/api/baicheng/uploadfile?shoppingCartId='+this.sid,formData)
            .then(res=>{
              console.log(res);
              //this.waiting = false;
              if(res.data.code === 2000) {
                let data = res.data.result;
                this.viewData = data;
                this.reversal = false;
                this.rotateClass = 0;
                this.toBig = 0;
                let image = new Image();
                image.src= data.imageUrl;

                image.onload = () =>{
                  console.log('image is ok now')
                  this.waiting = false;
                };

                if(!this.canSelectMode) {
                  this.varr = [];
                  this.larr = [];
                  this.addItem(1,this.viewData.materialMaxWidth - this.ballR);
                  this.addItem(0,this.viewData.materialMaxHeight - this.ballR);
                }
              } else {
                alert('请求出了问题，请稍后再试！');
                this.waiting = false;
              }
            })
            .catch(err=>{
              this.waiting = false;
              alert('上传出了问题，请稍后再试！')
              console.log(err)
            })

        } else {
          alert('请上传图片资源')
        }

      },

      selectThisOne(index) {
        this.modeType = index;
      },

      toRotateImg() {
        console.log(this.rotateClass);
        this.rotateClass += 90;
        this.rotateClass %= 360;
      },

      closeModal(){

        console.log(this.productData.linkUrl);

        window.location.href=this.productData.linkUrl + '&cmd=cancel';

        //alert('将会关闭页面哦')
        //this.modalShow = false;
        //this.w = '';
      },

      showModal(src) {
        this.modalShow = true;
        this.w = src;
        let w = this.sw,
          h = this.sh;

        console.log(w,h)
        let larr = this.larr,
          larrLen = larr.length,
          varr = this.varr,
          varrLen = varr.length,
          maxL = this.maxL,
          maxH = this.maxH,
          lNum = Math.floor(w/maxL) -1,
          vNum = Math.floor(h/maxH);

        console.log(lNum,vNum);

        if(lNum > larrLen) {
          for(let i=larrLen;i<lNum;i++) {
            larr.push({
              id:i,
              x:0,
              y:0
            })
          }
        } else if(lNum < larrLen) {
          for(let i=lNum;i<larrLen;i++) {
            larr.pop()
          }
        }

        if(vNum > varrLen) {
          for(let i=varrLen;i<vNum;i++) {
            varr.push({
              id:i,
              x:0,
              y:0
            })
          }
        } else if(vNum < varrLen) {
          for(let i=vNum;i<varrLen;i++) {
            varr.pop()
          }
        }

        for(let  i = 0,l = lNum;i<l;i++) {
          larr[i].x = (i+1) * maxL;
          console.log(larr[i].x,'x',i);
          larr.splice(i,1,larr[i]);
        }

        for(let  i = 0,l = vNum;i<l;i++) {
          varr[i].y = (i+1) * maxH;
          console.log(varr[i].y,'y');
          varr.splice(i,1,varr[i]);
        }

        console.log(larr.length,varr)
      },

      delItem(code,index) {
        if(code === 0) {
          this.varr.splice(index,1);
          this.vIndex = null;
          console.log(this.vIndex)
        } else if(code === 1) {
          this.larr.splice(index,1);
          this.lIndex = null;
          console.log(this.lIndex)
        }
      },

      toDelItem(code,index) {
        if(code === 0) {
          this.vIndex = index;
          this.lIndex = null;
        } else if(code === 1) {
          this.lIndex = index
          this.vIndex = null;
        }
      },

      addItem(code,pos=null) {
        if(code === 0) {
          this.varr.unshift({
            id:this.varr.length,
            x:0,
            y:pos===null?this.viewData.materialMinHeight - this.ballR:pos
          })
        } else {
          this.larr.unshift({
            id:this.larr.length,
            x:pos===null?this.viewData.materialMinWidth - this.ballR:pos,
            y:0
          })
        }
      },

      dragV(obj) {
        //console.log(obj);
        let arr = this.varr;

        for(let i=arr.length-1;i>=0;i--) {
          if(arr[i].id === +obj.id) {
            arr[i].y = obj.y;
            arr.splice(i,1,arr[i]);
            break;
          }
        }

        //console.log(arr);

      },

      dragL(obj) {
        //console.log(obj);
        let arr = this.larr;

        for(let i=arr.length-1;i>=0;i--) {
          console.log(arr[i].id === +obj.id)
          if(arr[i].id === +obj.id) {
            arr[i].x = obj.x;
            arr.splice(i,1,arr[i]);
            break;
          }
        }

        //console.log(arr);

      }
    }
  }
</script>

<style scoped>
  @import '../assets/loading.css';
  .waiting {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 99;
  }
  .loading{
    width:120px;
    height: 120px;
    position: absolute;
    left:50%;
    top:40%;
    transform: translate(-50%,-50%);
  }

  .loading>p{
    color:#ccc;
    font-size: 18px;
    margin-top:20px;
  }

  .waiting>img{
    position: absolute;
    top:30%;
    left: 50%;
    //transform-origin: 0 0;
    //transform: translate(-50%,-50%);
    //animation: waiting 3s ease infinite;
  }

  @keyframes waiting {
    ftom{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }

  .warp-opacity{

  }
  .btn{
    width: 260px;
    height: 36px;
    line-height: 36px;
    background: #005db8;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border-radius:5px;
    user-select: none;
    font-size: 18px;
  }
  .save{
    background: limegreen;

  }
  .modal {
    position: absolute;
    top:10px;
    left:10px;
    background: #eee;
    width: calc(100% - 20px);
    height:calc(100% - 11px);
    border-radius:10px;
    overflow: hidden;
    border:1px solid #cdcdcd;
    border-bottom:none;
  }
  .close{
    position: absolute;
    top:10px;
    right: 10px;
    z-index: 13;
    color:#999;
    cursor: pointer;
  }
  .close>img{
    width: 24px;
    height: 24px;
  }
  .s-item{
    width: 200px;
    height: 200px;
    cursor: pointer;
    position: relative;
    float:left;
    margin:0 10px 10px 10px;
    border:1px solid #999;
    border-radius:5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .s-item:hover .mask{
    opacity: 1;
  }
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top:0;
    border-radius:5px;
    opacity: 0;
    transition:opacity .5s  ease;
  }
  .mask>img{
    width: 50px;
    height: 50px;
    margin:35%;
  }
  .s-item>img{
    width: 100%;
    height: 100%;
    border-radius:5px;
  }
  .bg_con{
    width: 60px;
  }

  .switch{
    display:none;
  }
  label{
    position:relative;
    display: block;
    padding: 1px;
    border-radius: 24px;
    height: 24px;
    margin-bottom: 15px;
    background-color: #ccc;
    cursor: pointer;
    vertical-align: top;
    -webkit-user-select: none;
  }
  label:before{
    content: '';
    display: block;
    border-radius: 24px;
    height: 24px;
    background-color: #ccc;
    -webkit-transform: scale(1, 1);
    -webkit-transition: all 0.3s ease;

  }
  label:after{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -23px;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: white;
    box-shadow: 0 0 10px #333;
    -webkit-transform: translateX(-12px);
    -webkit-transition: all 0.3s ease;
  }
  .switch:checked~label:after{
    -webkit-transform: translateX(36px);
    box-shadow: 0 0 10px green;
  }
  .switch:checked~label:before{
    background-color:green;

  }

  .data-container{
    width: 370px;
    height: 100%;
    margin:0 0 0 20px;
    border-left:2px solid #cdcdcd;
    padding: 40px 60px;
    box-sizing: border-box;
    position: absolute;
    top:0;
    right: 0;
    background: #fff;
    z-index: 12;
  }
  .data-item{
    margin:10px 0;
  }
  .data-item > .title {
    font-size:18px;
    padding-bottom:5px;
  }
  .svg-container {
    display: inline-block;
    border:1px solid #ccc;
    padding:5px;
    border-radius:5px;
    cursor: pointer;
  }

  .data-container p{
    color:#999;
    font-size: 16px;
    word-break: break-all;
    padding:5px 0;
  }
  p{
    margin:0;
  }
  .add-item{
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 25px;
    color:#fff;
    background: #0f0;
    position: absolute;
    border-radius:100%;
    cursor: pointer;
  }
  .add-l{
    left:-30px;
  }

  .add-v{
    top:-30px;
  }

  .v-item{
    position: absolute;
    left:-30px;
  }
  .v-item>.head {
    width: 25px;
    height: 25px;
    border-radius:100%;
    background: #f00;
    cursor: move;
    box-shadow: 0 0 10px #666;
    text-align: center;
    line-height: 25px;
    color:#fff;
  }
  .v-item>.line{
    width: 1210px;
    height: 3px;
    background: #fff;
    top:50%;
    position: absolute;
    left:25px;
    transform: translate(0,-50%);
  }
  .v-item>.line::after{
    content:'';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #f00;
    top:1px;
  }
  .v-item>.count{
    background: rgba(255,255,255,.7);
    position: absolute;
    left:50px;
    top:-25px;
    padding:2px 10px;
    font-size: 14px;
    min-width: 40px;
  }
  .v-item>.count::after{
    content: '';
    width: 0;
    height: 0;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-top:8px solid rgba(255,255,255,.7);
    top:100%;
    left:50%;
    position: absolute;
    transform: translate(-50%,0%);
  }
  .v-item>.del{
    position: absolute;
    left:1235px;
    top:0;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 25px;
    color:#fff;
    border-radius:100%;
    transform: rotate(45deg);
    background: #f00;
    cursor: pointer;
  }

  .l-item{
    position: absolute;
    top:-30px;
  }

  .l-item>.head {
    width: 25px;
    height: 25px;
    border-radius:100%;
    background: #f00;
    cursor: move;
    box-shadow: 0 0 10px #666;
    text-align: center;
    line-height: 25px;
    color:#fff;
  }
  .l-item>.line{
    height: 710px;
    width: 3px;
    background: #fff;
    left:50%;
    position: absolute;
    top:25px;
    transform: translate(-50%,0);
  }
  .l-item>.line::after{
    content:'';
    position: absolute;
    height: 100%;
    width: 1px;
    background: #f00;
    top:1px;
  }
  .l-item>.count{
    background: rgba(255,255,255,.7);
    position: absolute;
    left:35px;
    top:35px;
    padding:2px 8px;
    font-size: 14px;
    min-width: 40px;
  }
  .l-item>.count::after{
    content: '';
    width: 0;
    height: 0;
    border-top:8px solid transparent;
    border-bottom:8px solid transparent;
    border-right:8px solid rgba(255,255,255,.7);
    top:50%;
    left:-8px;
    position: absolute;
    transform: translate(0%,-50%);
  }
  .l-item>.del{
    position: absolute;
    left:0;
    top:735px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 25px;
    color:#fff;
    border-radius:100%;
    transform: rotate(45deg);
    background: #f00;
    cursor: pointer;
  }

  .img-container{
    //margin: 100px 0 0 50px ;
    box-sizing: border-box;
    user-select: none;
    transform-origin: 50% 50%;
    transition:transform .5s ease;
    //overflow: hidden;
    background: #ccc;
    position: relative;
  }
  .img-container>img{
    position: absolute;
    top:50%;
    left:50%;
    transform-origin: 0% 0%;
    transform: translate(-50%,-50%);
  }
  .img-container>.rotate0{
    transform: rotate(0deg) translate(-50%,-50%);
  }
  .img-container>.rotate1{
    transform: rotate(90deg) translate(-50%,-50%);
  }
  .img-container>.rotate2{
     transform: rotate(180deg) translate(-50%,-50%);
   }
  .img-container>.rotate3{
      transform: rotate(270deg) translate(-50%,-50%);
    }

  .standard {
    display: flex;
    margin:50px auto;
  }
  .operation {
    border:2px dashed #f00;
    position: absolute;
    top:0px;
    user-select: none;
  }
  .warp-container{
    //background: #f00;
    position: relative;
    width: calc(100% - 370px);
  }
  .warp-container>.warp{
    margin:100px auto;
    background: #fff;
    //padding:10px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 0 10px #999;
  }
  .warp-container>.operation{
    margin:0px auto;
  }
</style>
