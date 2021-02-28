<template>
  <div class="editor-contaniner">
    <table class="table">
      <tbody>
        <tr scope="row">
          <td>
            <button class="mr-5 btn" style="padding:0" @click.prevent="clearEditor()">清空</button>
            <button class="mr-5 btn" style="padding:0" @click.prevent="doPublish()">发帖</button>
          </td>
        </tr>
      </tbody>
    </table>
    <textarea v-model="tinymceHtml" id="tinymceid" class="editor-style"></textarea>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
// import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/paste";
export default {
  name: "TinymceEditor",
  data() {
    return {
      blogid: "", //博客id
      tinymceHtml: "请输入博文", //
      blogcontent: "", //博客内容
      imagesid: "", //图片id
      html: "", //博客内容html标签字符串
      tinymceclass: Date.now()
    };
  },
  //父组件传入博客标题地址等
  props: {
    blog_title: {
      //博客标题
      type: String,
      default: ""
    },
    choice_province: {
      //选择的省份
      type: String,
      default: ""
    },
    choice_city: {
      //选择的城市
      type: String,
      default: ""
    },
    address_specific: {
      //输入的具体地址
      type: String,
      default: ""
    }
  },
  created() {
    this.initBlogID();
  },
  mounted() {
    this.init();
  },
  methods: {
    destroytinymce() {
      tinymce.remove();
    },
    initBlogID() {
      const ide = Date.now();
      // eslint-disable-next-line no-console
      this.blogid = ide;
    },

    init() {
      tinymce.init({
        selector: "#tinymceid",
        language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径
        language: "zh_CN", //语言
        skin: "oxide",
        skin_url: "/tinymce/skins/ui/oxide", // skin路径
        height: 550, //编辑器高度
        plugins: "lists image  table   wordcount paste ", ///media
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat",
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false, //顶部菜单栏显示
        paste_data_images: true,
        images_upload_base_path: "../assets/images",
        images_upload_handler: (blobInfo, success, failure) => {
          // const img = "data:image/jpeg;base64," + blobInfo.base64();
          // success(img);

          // "data:" + blobInfo.blob().type + ";base64," + blobInfo.base64();
          let formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          console.log(formData);
          this.$axios
            .post("/api/uploadImages", formData, {
              headers: { "Content-Type": "multipart / form - data" }
            })
            .then(Response => {
              if (Response.data !== null) {
                success(Response.data.path);
              } else {
                failure("上传失败");
              }
            });
        }
      });
    },
    clearEditor() {
      tinymce.activeEditor.setContent("");
    },
    doPublish() {
      //base64
      // eslint-disable-next-line no-unused-vars
      let Base64 = {
        encode(str) {
          return btoa(
            encodeURIComponent(str).replace(
              /%([0-9A-F]{2})/g,
              function toSolidBytes(match, p1) {
                return String.fromCharCode("0x" + p1);
              }
            )
          );
        },
        decode(str) {
          return decodeURIComponent(
            atob(str)
              .split("")
              .map(function(c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
        }
      };

      //base64
      this.blogcontent = tinymce.activeEditor.getContent();

      if (
        this.logininfo.username &&
        this.blog_title &&
        this.choice_province &&
        this.choice_city &&
        this.address_specific &&
        this.blogcontent !== 0
      ) {
        var user_id = this.logininfo.username;
        console.log(user_id);
        this.$axios
          .post("/api/publish", {
            blog_id: this.logininfo.username + this.blogid,
            username: this.logininfo.username,
            blog_title: this.blog_title,
            choice_province: this.choice_province,
            choice_city: this.choice_city,
            address_specific: this.address_specific,
            blogcontent: this.blogcontent
          })
          .then(Response => {
            if (Response.data.length) {
              alert("上传成功");
              // var obj = new Object();
              // obj.blogid = this.userinfo.username + this.blogid;
              // obj.blogauthor = this.userinfo.username;
              // this.$store.commit("SAVE_BLOGINFO", obj);
              this.$store.commit("SAVE_USERINFO", this.logininfo);
              this.$router.push({
                name: "Blog",
                params: { user_id: user_id }
              });
            } else {
              alert("上传失败");
            }
          });
      } else {
        alert("error");
      }
      tinymce.remove();
      ////////////////////////////////////////////////////////////////////////////////////////////
    }
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    }
  },
  beforeDestroy() {
    this.destroytinymce();
  }
};
</script>
<style scoped>
.editor-style {
  margin: auto;
}
.editor-contaniner {
  width: 100%;
}
.table td {
  /* border-style: none; */
  padding: 0.2rem;
}
.table {
  margin-bottom: 0.5rem;
}
.editor-style img {
  max-width: 80%;
  width: auto;
  height: auto;
}
</style>