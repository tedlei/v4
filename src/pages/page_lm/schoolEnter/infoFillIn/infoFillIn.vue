<template>
  <div class="ifi_app">
    <div class="ifi_hea">
      <span class="ifi_span1">学校入驻</span>
<!--      <span class="ifi_span2">已经注册，现在</span><span class="ifi_span2 ifi_span3">登录</span>-->
    </div>
    <div class="ifi_title fx">
      <i class="iconfont">&#xe616;</i>
      <span>基本信息</span>
      <el-button v-if="false" type="primary">修改</el-button>
    </div>
    <ul class="ifi_ul">
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>手机号码</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!phoneCorrect?'borderRed':''">
          <el-input v-model="info.user.phone" placeholder="请输入手机号码"></el-input>
        </div>
        <div class="ifi_li_div3 fx">
          <div class="ifi_icon">
            <i v-if="info.user.phone||!phoneCorrect" :class="phoneCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div v-if="info.user.phone||!phoneCorrect" :class="phoneCorrect?'':'red'">请输入11位手机号码</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>验证码</p><p>*</p></div>
        <div class="ifi_li_div2 border0 fx">
          <el-input :class="!smsCodeCorrect?'borderRed':''" type="number" v-model="verifyCode" placeholder="请输入验证码"></el-input>
          <el-button 
          @click="topGetyzm" 
          class="showYzm" 
          :disabled="isDisBtn"
          :class="isDisBtn?'bgh':''" 
          type="primary">{{isVfCodeBtn?fyCodeNum+'秒后获取':'获取验证码'}}</el-button>
        </div>
      </li>
      <li class="ifi_li fx" v-if="isShowPwd">
        <div class="ifi_li_div1"><p>帐户名</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!userPhoneCorrect?'borderRed':''">
          <el-input 
          v-model="info.user.name" 
          placeholder="请输入帐户名"></el-input>
        </div>
        <div class="ifi_li_div3 fx">
          <div class="ifi_icon">
            <i v-if="info.user.name||!userPhoneCorrect" :class="userPhoneCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div v-if="info.user.name||!userPhoneCorrect" :class="userPhoneCorrect?'':'red'">请输入8~16位字符的帐户名，账户名只能设置一次</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>联系人</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!tNameCorrect?'borderRed':''">
          <el-input v-model="info.schoolUser.linkman" :disabled="false" placeholder="请输入联系人名称"></el-input>
        </div>
        <div class="ifi_li_div3 fx">
          <div class="ifi_icon">
            <i v-if="info.schoolUser.linkman||!tNameCorrect" :class="tNameCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div v-if="info.schoolUser.linkman||!tNameCorrect" :class="tNameCorrect?'':'red'">与学校资质授权书签名一致</div>
        </div> 
      </li>
      <li class="ifi_li fx" v-if="isShowPwd">
        <div class="ifi_li_div1"><p>密码</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!passwordCorrect?'borderRed':''">
          <el-input type="password" v-model="info.user.password" placeholder="请输入密码"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.user.password||!passwordCorrect">
          <div class="ifi_icon">
            <i :class="passwordCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="passwordCorrect?'':'red'">密码长度6-16位，数字、字母或数字和字母的组合</div>
        </div> 
      </li>
      <li class="ifi_li fx" v-if="isShowPwd">
        <div class="ifi_li_div1"><p>确认密码</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!qrPwdCorrect?'borderRed':''">
          <el-input type="password" v-model="qrPwd" placeholder="请输入确认密码"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="qrPwd||!qrPwdCorrect">
          <div class="ifi_icon">
            <i :class="qrPwdCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="qrPwdCorrect?'':'red'">{{qrPwdCorrect?'密码长度6-16位，数字、字母或数字和字母的组合':'确认密码和密码不一致'}}</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>邮箱</p><p></p></div>
        <div class="ifi_li_div2" :class="!emailCorrect?'borderRed':''">
          <el-input v-model="info.user.email" placeholder="请输入邮箱"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.user.email||!emailCorrect">
          <div class="ifi_icon">
            <i :class="emailCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="emailCorrect?'':'red'">请输入邮箱，如：130xxxxxxxx@qq.com</div>
        </div> 
      </li>
    </ul>
    <div class="ifi_title fx">
      <i class="iconfont size24">&#xe620;</i>
      <span>认证信息</span>
      <el-button v-if="false" type="primary">重新上传认证信息</el-button>
    </div>
    <ul class="ifi_ul">
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>机构名称</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!oratCorrect?'borderRed':''">
          <el-input v-model="info.schoolUser.organizationName" :disabled="false" placeholder="请输入机构名称"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.schoolUser.organizationName||!oratCorrect">
          <div class="ifi_icon">
            <i :class="oratCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="oratCorrect?'':'red'">请输入机构名称,如是分校，请写明分校地区,如：XX教育XX校区</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>学校电话</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!fixedPhoneCorrect?'borderRed':''">
          <el-input v-model="info.schoolUser.schoolPhone" :disabled="false" placeholder="请输入学校电话"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.schoolUser.schoolPhone||!fixedPhoneCorrect">
          <div class="ifi_icon">
            <i :class="fixedPhoneCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="fixedPhoneCorrect?'':'red'">请输入学校电话,如：023-XXXXXXXX</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>学校网址</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!urlCorrect?'borderRed':''">
          <el-input v-model="info.schoolUser.schoolUrl" :disabled="false" placeholder="请输入学校网址"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.schoolUser.schoolUrl||!urlCorrect">
          <div class="ifi_icon">
            <i :class="urlCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="urlCorrect?'':'red'">请输入学校网址,如：http://www.baidu.com</div>
        </div> 
      </li>
      
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>主营行业</p><p>*</p></div>
        <div class="max-width">
          <el-checkbox-group v-model="schoolTrade" :disabled="false">
            <el-checkbox label="学前辅导"></el-checkbox>
            <el-checkbox label="小学辅导"></el-checkbox>
            <el-checkbox label="中学辅导"></el-checkbox>
            <el-checkbox label="艺术培训"></el-checkbox>
            <el-checkbox label="学历提升"></el-checkbox>
            <el-checkbox label="职业培训"></el-checkbox>
            <el-checkbox label="资格证书"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </div>
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>授课地区</p><p>*</p></div>
        <div class="ifi_sel">
          <el-select v-model="info.schoolUser.oneDddress" placeholder="请选择" :disabled="false">
            <el-option
              v-for="(item,i) in provinceList"
              :key="i+'sheng'"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-if="cityList.length>0" v-model="info.schoolUser.twoDddress" placeholder="请选择" :disabled="false">
            <el-option
              v-for="(item,i) in cityList"
              :key="i+'shi'"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-if="areaList.length>0" v-model="info.schoolUser.threeDddress" placeholder="请选择" :disabled="false">
            <el-option
              v-for="(item,i) in areaList"
              :key="i+'qu'"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </li>

      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>学校详细地址</p><p>*</p></div>
        <div class="ifi_li_div2" :class="!addressCorrect?'borderRed':''">
          <el-input v-model="info.schoolUser.schoolAddress" :disabled="false" placeholder="请输入学校详细地址"></el-input>
        </div>
        <div class="ifi_li_div3 fx" v-if="info.schoolUser.schoolAddress||!addressCorrect">
          <div class="ifi_icon">
            <i :class="addressCorrect?'el-icon-circle-check green':'el-icon-circle-close red'"></i>
          </div>
          <div :class="addressCorrect?'':'red'">请输入学校详细地址,如：某某街道办事处</div>
        </div> 
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>学校LOGO</p><p>*</p></div>
        <div class="ifi_upload">
          <el-upload class="avatar-uploader"
            :action="localtion+action"
            :show-file-list="false"
            :on-success="logoSuccess"
            :disabled="false"
            :before-upload="schoolLogo">
            <img v-if="info.schoolUser.schoolLogo" :src="info.schoolUser.schoolLogo" class="avatar avLogo">
            <i v-else class="el-icon-plus avatar-uploader-icon logoWH"></i>
          </el-upload>
        </div>
        <div class="ifi_up_text">
          上传清晰的学校LOGO,照片大小不超过300K,建议上传尺寸300*100px,上传成功即表明雏鸟拥有其图片的使用权,
          LOGO模板<a href="../../../../../public/file/LOGO模板.png" download="" >下载</a>
        </div>
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>营业执照</p><p>*</p></div>
        <div class="ifi_upload">
          <el-upload class="avatar-uploader"
            :action="localtion+action"
            :show-file-list="false"
            :on-success="aptitudeSuccess"
            :disabled="false"
            :before-upload="schoolAptitude">
            <img v-if="info.schoolUser.schoolAptitude" :src="info.schoolUser.schoolAptitude" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="ifi_up_text">
          上传营业执照图片,照片大小不超过1M,信息只为审核使用，不对外展示
        </div>
      </li>
      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>办学许可</p><p></p></div>
        <div class="ifi_upload">
          <el-upload class="avatar-uploader"
            :action="localtion+action"
            :show-file-list="false"
            :on-success="permissionSuccess"
            :disabled="false"
            :before-upload="schoolPermission">
            <img v-if="info.schoolUser.schoolPermission" :src="info.schoolUser.schoolPermission" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="ifi_up_text">
          上传办学许可照片(可不上传),照片大小不超过1M,信息只为审核使用，不对外展示
        </div>
      </li>

      <li class="ifi_li fx">
        <div class="ifi_li_div1"><p>授权文件</p><p>*</p></div>
        <div class="ifi_upload">
          <el-upload class="avatar-uploader"
            :action="localtion+action"
            :show-file-list="false"
            :on-success="brandSuccess"
            :disabled="false"
            :before-upload="schoolBrand">
            <img v-if="info.schoolUser.schoolCertificate" :src="info.schoolUser.schoolCertificate" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="ifi_up_text">
          上传清晰的授权文件图片,照片大小不超过1M,图片只为审核使用，
          不对外展示。文件模板<a href="../../../../../public/file/雏鸟授权书.doc" download="" >下载</a>
        </div>
      </li>
      <li class="ifi_li fx" style="margin-top:30px;" v-if="true">
        <div class="ifi_li_div1"></div>
        <div class="ifi_xy">
          <el-checkbox v-model="radio">我已阅读并同意</el-checkbox><router-link to="/">服务协议</router-link>、<router-link to="/">隐私保护政策</router-link>
        </div>
      </li>
      <li class="ifi_li fx" style="margin-top:30px;" v-if="true">
        <div class="ifi_li_div1"></div>
        <div class="ifi_btn">
          <el-button :disabled="ifiBtn" @click="tjVerifyCode" type="primary">提交注册</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import './infoFillIn.less'
import info from './infoFillIn.js'
export default {
  ...info
}
</script>