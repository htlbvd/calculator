
      var yun=document.getElementById('yunsuanqi');
      var xia=document.getElementById('xianshi');

      var app=new Vue({
        el:'#calc',
        data:{
          opera:['',0,'',0],
          // operatingOld:'',//上一操作
          // operandOld:0,//第一操作数
          // operatingNew:'',//当前操作
          // operandNew:0,//第二操作数
          input:'',//输入的数字
          operand:0,//操作数
          operating:null,//等待函数
          point:0,//小数点状态
          output:1,//结果状态
          funcs:{
            //清除x
            clx:function(){
              app.input='';
              app.output=1;
              app.point=0;
              app.operand=0;
              app.opera.splice(2, 1,'');
              app.opera.splice(3, 1, 0);
              if(!app.operating){
              app.opera.splice(0, 1,'');
              app.opera.splice(1, 1, 0);

              }
            },
            //清除
            cla:function(){
              this.clx();
              app.operating=null;
              app.opera.splice(1, 1,0);
              app.opera.splice(0, 1, '');
            },
            //数字区
            one:1,two:2,thr:3,fou:4,fiv:5,six:6,sev:7,eig:8,nin:9,zer:0,
            //小数点
            poi:function(){
              if(app.output){
                app.input='0';
                app.output=0;
              }
              if(!app.point){
                app.input+='.';
                app.point=1;
              }
            },
            //等于
            equ:function(){
              app.point=0;
              app.opera.splice(3, 1, app.operand);
              if(app.operating){
                app.operand=app.operating(app.operand);
                app.operating=null;
              }else{
              app.opera.splice(0, 1,'');
              app.opera.splice(1, 1, 0);
              app.opera.splice(2, 1, '');
              }
              app.input='';
              app.output=1;
            },
            //一元区,常数区
            pi:()=> Math.PI,            eul:()=> Math.E,
            sin:(x)=> Math.sin(x),            cos:(x)=> Math.cos(x),
            tan:(x)=> Math.tan(x),            cot:(x)=> 1/(Math.tan(x)),
            exp10:(x)=> Math.pow(10,x),            lg:(x)=> Math.log(x)/Math.log(10),
            ln:(x)=> Math.log(x),            log2:(x)=> Math.log(x)/Math.log(2),
            squ:(x)=> Math.pow(x,2),            cub:(x)=> Math.pow(x,3),
            sqr:(x)=> Math.pow(x,1/2),            cbr:(x)=> Math.pow(x,1/3),
            rec:(x)=> 1/x,            abs:(x)=> Math.abs(x),
            fac:(x)=> x,            con:(x)=> -x,
            per:(x)=> x/100,            mil:(x)=> x/1000,

            //二元区
            dvs:(x)=> (y)=> x/y,
            mul:(x)=> (y)=> x*y,
            sub:(x)=> (y)=> x-y,
            add:(x)=> (y)=> x+y,
            pow:(x)=> (y)=> Math.pow(x,y),
            ext:(x)=> (y)=> Math.pow(x,1/y),
            log:(x)=> (y)=> Math.log(x)/Math.log(y),
            e10:(x)=> (y)=> x*Math.pow(10,y),
          },
        },
        computed:{
          //显示数
          show:
            function(){
              if(this.output){
                return this.operand;
              }else{
                if(this.operand>9999999999){
                  return this.operand.toExponential();
                }
                return this.input;
              }
            },
          //历史记录
          history:function(){
            console.log(this.opera[1],this.opera[3]);
            if(this.opera[1].toString(10).length>9){
              this.opera[1]=Number(this.opera[1]).toPrecision(5);
            }
            if(this.opera[3].toString(10).length>9){
              this.opera[3]=Number(this.opera[3]).toPrecision(5);
            }
            return this.opera[0]+'('+this.opera[1]+','+this.opera[2]+'('+this.opera[3]+')'+')';
          },
        },
        methods:{
          clifunc:function(event){
            let id=event.target.id;
            let type=event.target.dataset.type;
            //按键为
            if(id=='clx'||id=='cla'||id=='equ'||id=='poi'){
              //清除x，清除，等于或小数点
              this.funcs[id]();
            }else if(type=='num'){
              //数字
              if(!this.operating){
                this.opera.splice(0, 1,'');
                this.opera.splice(1, 1,0);
              }
                this.output=0;
              this.input=this.input==='0'?'':(this.input+this.funcs[id]);
              this.operand=parseFloat(this.input);
              this.opera.splice(3, 1,this.input);
            }else if(type=='una'||type=='con'){
              //一元或常数
              if(!this.operating){
              this.opera.splice(0, 1, '');
              this.opera.splice(1, 1,0);
              }
              if(type==='una'){
                this.opera.splice(3, 1, this.operand);
              }else{
                this.opera.splice(3, 1, '');
              }
              this.opera.splice(2, 1, id);
              this.operand=this.funcs[id](this.operand);
              this.input='';
              this.output=1;
              this.point=0;
            }else if(type=='bin'){
              //二元
              this.point=0;
              this.input='';
              this.output=1;
              if(this.operating){
                this.operand=this.operating(this.operand);
              }else{
                
              }
              this.operating=this.funcs[id](this.operand);
              
              this.opera.splice(1, 1, this.operand);
              this.opera.splice(2, 1,'');
              this.opera.splice(3, 1, 0);
              this.opera.splice(0, 1, id);
            }else{
              
            }
            
            console.log('input:'+app.input+','+app.input.length+',operand:'+app.operand+',point:'+app.point+'output:'+app.output)
          }
        }
      });
      
      console.log('input:'+app.input+','+app.input.length+',operand:'+app.operand+',point:'+app.point+'output:'+app.output)