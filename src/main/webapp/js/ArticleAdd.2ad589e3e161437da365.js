(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{39:function(e,t,i){},56:function(e,t){e.exports=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},57:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},58:function(e,t){function a(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}e.exports=function(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}},59:function(e,t,i){"use strict";var a=i(39);i.n(a).a},68:function(e,t,i){"use strict";i.r(t);var a=i(4),r=i.n(a),n=i(7),l=i.n(n),o=i(56),s=i.n(o),c=i(16),u=i(57),d=i.n(u),p=i(58),h=i.n(p),f=function(){function t(e){1<arguments.length&&void 0!==arguments[1]&&arguments[1];d()(this,t),this.quill=e,this.handleDrop=this.handleDrop.bind(this),this.handlePaste=this.handlePaste.bind(this),this.quill.root.addEventListener("drop",this.handleDrop,!1),this.quill.root.addEventListener("paste",this.handlePaste,!1)}return h()(t,[{key:"handleDrop",value:function(e){if(e.preventDefault(),e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length){if(document.caretRangeFromPoint){var t=document.getSelection(),i=document.caretRangeFromPoint(e.clientX,e.clientY);t&&i&&t.setBaseAndExtent(i.startContainer,i.startOffset,i.startContainer,i.startOffset)}this.readFiles(e.dataTransfer.files,this.insert.bind(this))}}},{key:"handlePaste",value:function(e){var t=this;e.clipboardData&&e.clipboardData.items&&e.clipboardData.items.length&&this.readFiles(e.clipboardData.items,function(e){t.quill.getSelection()||setTimeout(function(){return t.insert(e)},0)})}},{key:"insert",value:function(e){var t=(this.quill.getSelection()||{}).index||this.quill.getLength();this.quill.insertEmbed(t,"image",e,"user")}},{key:"readFiles",value:function(e,a){[].forEach.call(e,function(e){if(e.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)){var t=new FileReader;t.onload=function(e){a(e.target.result)};var i=e.getAsFile?e.getAsFile():e;i instanceof Blob&&t.readAsDataURL(i)}})}}]),t}(),g=i(17),m=i.n(g);c.Quill.register("modules/imageResize",m.a),c.Quill.register("modules/imageDrop",f);var v,b=[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],[{color:[]},{background:[]}],[{align:[]}],["clean"],["link","image","video"]],y={data:function(){var e;return{quillUpdateImg:!1,serverUrl:"/api/file/upload",content:"",title:"",categories:[],selectedCategory:[],selectProps:{label:"name",value:"id"},editorOption:{modules:(e={imageDrop:!0,toolbar:{container:b,handlers:{image:function(e){e?document.querySelector(".avatar-uploader input").click():this.quill.format("image",!1)}}}},s()(e,"imageDrop",!0),s()(e,"imageResize",{displayStyles:{backgroundColor:"black",border:"none",color:"white"},modules:["Resize","DisplaySize","Toolbar"]}),e)}}},components:{quillEditor:c.quillEditor},methods:{beforeUpload:function(e,t){this.quillUpdateImg=!0},uploadSuccess:function(e,t){var i=this.$refs.myQuillEditor.quill;if(0===e.code){var a=i.getSelection().index;i.insertEmbed(a,"image","http://localhost:7777/"+e.data),i.setSelection(a+1)}else this.$message.error("图片插入失败");this.quillUpdateImg=!1},uploadError:function(e,t){this.quillUpdateImg=!1,this.$message.error("图片插入失败")},getCategory:function(){0===this.$store.state.category.length&&this.$store.dispatch("getCategory"),this.categories=this.getTreeData(this.$store.state.category.filter(function(e){return 0===e.isNav}))},getTreeData:function(e){for(var t=0;t<e.length;t++)e[t].children.length<1?e[t].children=void 0:this.getTreeData(e[t].children);return e},addActicle:(v=l()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,this.$http.post("/article/add",{title:this.title,content:this.content,categoryId:this.selectedCategory.slice(this.selectedCategory.length-1,this.selectedCategory.length)[0]});case 3:0===e.sent.data.code?this.$router.push("/article/list"):this.$message.error("发表失败!");case 5:case"end":return e.stop()}},e,this)})),function(){return v.apply(this,arguments)})},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},mounted:function(){this.getCategory()}},q=(i(59),i(6)),w=Object(q.a)(y,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"article_add"},[i("el-row",[i("el-col",[i("el-input",{attrs:{placeholder:"请输入文章标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1),t._v(" "),i("el-row",{directives:[{name:"loading",rawName:"v-loading",value:t.quillUpdateImg,expression:"quillUpdateImg"}]},[i("el-col",[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.serverUrl,name:"file","show-file-list":!1,"on-success":t.uploadSuccess,"on-error":t.uploadError,"before-upload":t.beforeUpload}}),t._v(" "),i("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:1.5}},[i("el-tag",{attrs:{type:"default"}},[t._v("分类")])],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("el-cascader",{attrs:{options:t.categories,props:t.selectProps,size:"small"},model:{value:t.selectedCategory,callback:function(e){t.selectedCategory=e},expression:"selectedCategory"}})],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:4,offset:8}},[i("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:t.addActicle}},[t._v("发表")]),t._v(" "),i("el-button",{attrs:{size:"small"}},[t._v("取消")])],1)],1)],1)},[],!1,null,"596bf39b",null);t.default=w.exports}}]);