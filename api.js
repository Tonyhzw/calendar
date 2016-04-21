// JavaScript Document
 //solar to lunar
function API(){
  var lunarInfo=new Array(   //农历1900-2100的润大小信息表
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909   
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//...
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,   
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,   
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,   
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,   
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,   
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,   
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,   
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,   
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,   
  0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,   
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0); 
  var solarMonth=[31,28,31,30,31,30,31,31,30,31,30,31];//公历每个月份的天数普通表
  var solarTerm =["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];//24节气速查表
  var lunar_Fes={"正月初一":"春节","正月十五":"元宵节","五月初五":"端午节","七月初七":"七夕节","七月十五":"中元节","八月十五":"中秋节","九月初九":"重阳节","腊月初八":"腊八节","腊月廿四":"小年"};
  var solar_Fes={"0101":"元旦","0214":"情人节","0308":"妇女节","0312":"植树节","0315":"消费者权益保护日","0401":"愚人节","0404":"清明节","0501":"劳动节","0504":"青年节","0512":"护士节","0601":"儿童节","0701":"建党节/香港回归纪念日","0801":"建军节","0910":"教师节","1001":"国庆节","1220":"澳门回归纪念日","1225":"圣诞节"};
  var sTermInfo=[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
  var str1=["日","一","二","三","四","五","六","七","八","九","十"];
  var str2=["初","十","廿","卅",""];//nian sa
  var self=this;
  this.solarToLunar=function (objDate) {// 输入公历Date输出农历
      var baseDate=new Date(1900,0,31); //1000*60*60*24 ms->h
      var offset=(objDate-baseDate)/86400000;     
      this.dayCyl=offset+40;
      this.monCyl=14;
	  var temp=0,i=0;
      for(i=1900;i<2050&&offset>0;i++){
		 // console.log(this);
		  temp=self.lYearDays(i);//农历i年的总天数
		  offset-=temp;
		  this.monCyl+=12;
	  }
	  if(offset<0){
	      offset+=temp;
		  i--;
		  this.monCyl-=12;
	   }
	   this.year=i;
	   this.yearCyl=i-1864;
	   var leap=self.leapMonth(i); //闰月
	   this.isLeap=false;
	   for(i=1;i<13&&offset>0;i++){   
               //闰月   
               if(leap>0&&i==(leap+1)&&this.isLeap==false){
				  --i;   
				  this.isLeap=true;
				  temp=self.leapDays(this.year);//闰月的总天数   
			   }else{   
			      temp=self.monthDays(this.year,i); //i月的总天数  
			   }   
              //闰月完成   
              if(this.isLeap==true&&i==(leap+1))   this.isLeap=false;  
              offset-=temp   
              if(this.isLeap==false)   this.monCyl++;  
        }   
        if(offset==0&&leap>0&&i==leap+1)   
              if(this.isLeap){   
			      this.isLeap=false;   
			  }else{   
			      this.isLeap=true;   
				  --i;   
				  --this.monCyl;
			  }   
        if(offset<0){   
		      offset+=temp;   
			  --i;   
			  --this.monCyl;   
		}   
        this.month=i;   
        this.day=offset+1;   
  };
 this.cDay=function(d){   //======================   农历天d转中文日期 
       var   s;   
       switch   (d)   {   
              case 10:s='初十';break;   
              case 20:s='二十';break;  
              case 30:s='三十';break; 
              default:s=str2[Math.floor(d/10)];s+=str1[d%10];   
        }   
        return(s);     
  };    
 this.cMonth=function(m){   //======================   农历月m中文月份
       var   s=['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','冬月','腊月'];
       return s[m-1];   
 };  
 this.getLunarDay=function(YearStr,MonthStr,DayStr)//公历转[农历中文月，农历中文日，农历年]   
  {   
        var   sDObj=new   Date(parseInt(YearStr),parseInt(MonthStr)-1,parseInt(DayStr))   
        var   lDObj=new  self.solarToLunar(sDObj)           //农历   
   //console.log(lDObj.year+" "+lDObj.month+" "+lDObj.day);
        return new Array(self.cMonth(lDObj.month),self.cDay(lDObj.day),lDObj.year);   
 };
 this.getLastDay=function(YearStr,MonthStr,DayStr){//公历日期时，农历当月的最大天数
	  var   sDObj=new   Date(parseInt(YearStr),parseInt(MonthStr)-1,parseInt(DayStr))   
      var   lDObj=new   self.solarToLunar(sDObj)           //农历   
      return lDObj.isLeap?self.leapDays(lDObj.year):self.monthDays(lDObj.year,lDObj.month);  
   };  
 this.lYearDays=function(y){  //农历y年的总天数 
        var sum=348;   
		//console.log(this);
        for(var i=0x8000;i>0x8;i>>=1)   sum += (lunarInfo[y-1900] &i)?1:0; 
        return (sum+self.leapDays(y));   
 }; 
 this.leapDays=function(y){   //农历y年中闰月的总天数
       if(self.leapMonth(y))   return((lunarInfo[y-1900]&0x10000)?30:29);   
       else   return(0);   
 };
 this.leapMonth=function(y){   //农历y年的闰月
       return(lunarInfo[y-1900]&0xf); 
 };
 this.monthDays=function(y,m){   //农历y年m月的总天数
       return((lunarInfo[y-1900]&(0x10000>>m))?30:29);   
 };
 this.festivalCheckingSolar=function(month,day){ //input Date
	   if(month<10) month="0"+month;
	   if(day<10) day="0"+day;
	   var str=month+day;
	   for(var iterm in solar_Fes){
	      if(iterm==str){
			 return solar_Fes[iterm];
		  }
	   }
	   return null;//未找到
 }; 
 this.festivalCheckingLunar=function(objLunar){//检查农历对应日期是否有节日，有则输出 
	  var lunar_str=objLunar[0]+objLunar[1];
	  for(var iterm in lunar_Fes){
	     if(iterm==lunar_str){
			 return lunar_Fes[iterm];
		 }
	  }
	  return null;//未找到
 };
 this.sTerm=function (y,n){//===== 某年的第n个节气为几日(从0小寒起算)
	   var offDate = new Date( (31556925974.7*(y-1900) + sTermInfo[n]*60000) + Date.UTC(1900,0,6,2,5) );
	   return(offDate.getUTCDate());
 };
 this.sTermChecking=function(YearStr,MonthStr,DayStr){//节气
		for(var i=2*MonthStr;i<2*MonthStr+2;i++){//每月只有两个节气
		    var offDate=self.sTerm(YearStr,i);
		    if(DayStr==offDate) return solarTerm[i];
		}
	   return null;
 }
}
