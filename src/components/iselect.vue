<template>
    <div class="iselect" :style="{'width':selectWidth+'px'}">
      <input :value="selectValue" class="select-value" @focus="showSelectPart(0)" @blur="showSelectPart(1)" :readonly="!canSelect?'readonly':''" />
      <i :class="[showSelect?'upTriangle':'']"><img src="/static/images/triangle.png" alt="" v-if="canSelect"></i>
      <div class="select-container" v-show="showSelect && canSelect">
        <ul>
          <li v-for="(item,index) in arr" @mousedown="selectThisOne(index)" :style="{'background':selectIndex===index?'#005db8':'#eee','color':selectIndex===index?'#fff':'#000'}" >{{name===''?item:item[name]}}</li>
        </ul>
      </div>

    </div>
</template>

<script>
  export default {
    name: "iselect",

    props:{

      arr:{
        type:Array,
        default:()=>{
          return []
        }
      },

      id:{
        type:String,
        default:''
      },

      name:{
        type:String,
        default:''
      },

      selectIndex:{
        type:Number,
        default:0
      },

      selectWidth:{
        type:Number,
        default:120
      },

      canSelect:{
        type:Boolean,
        default:true
      }

    },

    data() {
      return {
        showSelect:false
      }
    },

    computed:{
      selectValue() {
        if(this.arr.length > 0) {
          return this.name === ''?this.arr[this.selectIndex]:this.arr[this.selectIndex][this.name]
        } else {
          return ''
        }
      }
    },

    methods:{
      showSelectPart(code) {
        this.showSelect = !!!code;
        this.$emit('showSelectPart',code);
      },

      selectThisOne(index) {
        this.$emit('selectThisOne',index);
      }
    }
  }
</script>

<style scoped lang="less">
  .iselect{
    width: 200px;
    height: 32px;
    position: relative;
    i{
      position: absolute;
      right: 0;
      top:15%;
      img{
        width: 20px;
        height: 20px;
      }
      transition:transform .5s ease;
    }
    .upTriangle{
      transform: translateY(-5px) rotateX(180deg);
    }
    input{
      width: 100%;
      border:1px solid #cdcdcd;
      outline: none;
      height: 32px;
      line-height: 24px;
      padding-left:5px;
      box-sizing: border-box;
      border-radius:5px;
      cursor: pointer;
      background: #eee;

    }
    .select-container{
      background: #cdcdcd;
      border:1px solid #eee;
      margin-top:5px;
      position: absolute;
      width: 100%;
      z-index: 999999;
      box-sizing: border-box;
      li{
        height: 24px;
        line-height: 24px;
        padding:0 0 0 5px;
        cursor: pointer;
        border-bottom:1px solid #ececec;
      }
      li:last-child{
        border:none;
      }
    }
  }
</style>
