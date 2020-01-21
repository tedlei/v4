<template>
  <div class="ped-app">
    <ul class="ped_ul">
      <li class="ul_left">手机号</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.phone" disabled></el-input>
      </li>
      <li class="ul_icon"></li>
      <li class="ul_right"></li>
    </ul>
    <ul class="ped_ul">
      <li class="ul_left">帐户名</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.name" disabled v-if="userInfoData.name"></el-input>
        <el-input 
        v-model="userPhone" 
        v-else 
        :class="userPhoneCorrect?'':'borderColor'" 
        placeholder="请输入帐户名"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="!userPhoneCorrect||userPhone" :class="userPhoneCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
      </li>
      <li class="ul_right">
        <div v-if="userInfoData.userPhone?false:true" class="ped_li_text" :class="userPhoneCorrect?'':'red'">请输入8-16位字母或数字组合的字符，账户名只能设置一次，不能修改</div>
      </li>
    </ul>

    <ul class="ped_ul">
      <li class="ul_left">昵称</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.nickName" placeholder="" :class="tNameCorrect?'':'borderColor'"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="!tNameCorrect||userInfoData.nickName" :class="tNameCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
      </li>
      <li class="ul_right">
        <div class="ped_li_text" :class="tNameCorrect?'':'red'">设置昵称，请输入2-11个中文字符</div>
      </li>
    </ul>

    <ul class="ped_ul">
      <li class="ul_left">生日</li>
      <li class="ul_center">
        <el-select v-model="getYear" placeholder="请选择年">
          <el-option v-for="item in selYear" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="getMonth" placeholder="请选择月">
          <el-option v-for="item in selMonth" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="getDate" placeholder="请选择日">
          <el-option v-for="item in selDay" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </li>
      <li class="ul_icon"></li>
      <li class="ul_right"></li>
    </ul>


    <ul class="ped_ul">
      <li class="ul_left">选择地区</li>
      <li class="ul_center">
        <el-select 
        class="el_select_width" 
        v-model="userInfoData.oneDddress" 
        placeholder="请选择省">
          <el-option v-for="(item,i) in selProvince" :key="i" :label="item" :value="item"></el-option>
        </el-select>
        <el-select 
        class="el_select_width" 
        v-if="selCity.length>0" 
        v-model="userInfoData.twoDddress" 
        placeholder="请选择市">
          <el-option v-for="(item,i) in selCity" :key="i" :label="item" :value="item"></el-option>
        </el-select>
        <el-select 
        class="el_select_width" 
        v-if="selDistrict.length>0" 
        v-model="userInfoData.threeDddress" 
        placeholder="请选择区">
          <el-option v-for="(item,i) in selDistrict" :key="i" :label="item" :value="item"></el-option>
        </el-select> 
      </li>
      <li class="ul_icon"></li>
      <li class="ul_right"></li>
    </ul>

    <ul class="ped_ul">
      <li class="ul_left">详细地址</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.detailedDddress" :class="idVerify?'borderColor':''"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="idVerify||userInfoData.detailedDddress" :class="idVerify?'el-icon-circle-close red':'el-icon-circle-check green'"></i>
      </li>
      <li class="ul_right">
        <div class="ped_li_text" :class="idVerify?'red':''">请输入详细地址</div>
      </li>
    </ul>

    <ul class="ped_ul">
      <li class="ul_left">邮箱</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.email" placeholder="" :class="emailCorrect?'':'borderColor'"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="!emailCorrect||userInfoData.email" :class="emailCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
      </li>
      <li class="ul_right">
        <div class="ped_li_text" :class="emailCorrect?'':'red'">请输入邮箱,例如:yx@yx.com</div>
      </li>
    </ul>

    <ul class="ped_ul">
      <li class="ul_left">QQ</li>
      <li class="ul_center">
        <el-input v-model="userInfoData.qq" placeholder="" :class="qqCorrect?'':'borderColor'"></el-input>
      </li>
      <li class="ul_icon">
        <i v-if="!qqCorrect||userInfoData.qq" :class="qqCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
      </li>
      <li class="ul_right">
        <div class="ped_li_text" :class="qqCorrect?'':'red'">请输入QQ账号，列入130xxxxxxx</div>
      </li>
    </ul>

    <el-button type="primary" 
    @click="topSave" 
    :class="isBtnDisabled||isUpdateData?'':'btnColor'" 
    :disabled="isBtnDisabled||isUpdateData">保存</el-button>

  </div>
</template>

<script>
import personalData from './personalData.js'
export default {
  ...personalData
}
</script>>

<style lang="less">
.ped-app{
  width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  .ped_ul{
    margin-top:16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    li+li{
      margin-left: 25px;
    }
    .ul_left{
      width: 80px;
      text-align: right;
      color:rgba(102,102,102,1);
    }
    .ul_center{
      width: 375px;
      .el-input{
        height: 50px;
        border:1px solid rgba(230,230,230,1);
        border-radius:5px;
        .el-input__inner{
          border: 0;
          height: 100%;
          font-size: 16px;
        }
      }
      .borderColor{
        border-color: red;
      }
      .el-select{
        width: 121px;
      }
      .el_select_width{
        width: 121px;
        .el-input>.el-input__inner{
          padding-right:20px;
          padding-left: 5px;
        }
        .el-input>.el-input__suffix {
          right: -2px;
        }
      }
    }
    .ul_icon{
      width: 20px;
      font-size: 20px;
      .red{
        color:red;
      }
      .green{
        color:green;
      }
    }
    .ul_right{
      margin:5px;
      margin-top: 1px;
      width: 220px;
      .ped_li_text{
        font-size: 14px;
        color:rgba(153,153,153,1);
      }
      .red{
        color:red;
      }
    }
  }
  .el-button{
    margin-top:20px;
    margin-left:385px;
    width:150px;
    height:40px;
    border: 0;
    background:rgba(230,230,230,1);
  }
  .btnColor{
    background:rgba(42,176,234,1);
  }
}
</style>