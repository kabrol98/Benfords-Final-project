webpackJsonp([1],{"4+hh":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i=a("EqLo");a("4+hh");n.default.use(i.MdButton),n.default.use(i.MdTable),n.default.use(i.MdSteppers),n.default.use(i.MdContent),n.default.use(i.MdTabs);var r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")({name:"App"},r,!1,function(t){a("SEzf")},null,null).exports,o=a("/ocq"),l=a("c/Tr"),d=a.n(l),c=a("vwbq"),h={name:"DataViz",data:function(){return{width:860,height:500}},computed:{points:function(){var t=this;return d()(this.data).reduce(function(e,a){return e.push({x:a[t.xcol],y:parseInt(a[t.ycol])}),e},[])}},props:{data:Array,xcol:String,ycol:String,id:String,activate:{type:Boolean,default:function(){return!1}},xlabel:{default:function(){return"Leading Digit"}}},watch:{data:function(){this.activate&&this.refreshViz()},activate:function(t){!0===t&&this.refreshViz()}},methods:{refreshViz:function(){var t=c.g("#"+this.id);t.selectAll("*").remove(),t.attr("width",this.width),t.attr("height",this.height),this.generateViz()},generateViz:function(){var t=c.g("#"+this.id);t.attr("width",this.width),t.attr("height",this.height);var e=20,a=20,n=20,i=40,r=+t.attr("width")-i-a,s=+t.attr("height")-e-n,o=c.g("#tip"),l=c.e().rangeRound([0,r]).padding(.1),d=c.f().rangeRound([s,0]),h=t.append("g").attr("transform","translate("+i+","+e+")"),u=this.points;l.domain(u.map(function(t){return t.x})),d.domain([0,c.d(u,function(t){return t.y})]),h.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+s+")").call(c.a(l)),h.append("g").attr("class","axis axis--y").call(c.b(d).ticks(10)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end").text("Frequency"),h.selectAll(".bar").data(u).enter().append("rect").attr("class","bar").attr("x",function(t){return l(t.x)}).attr("y",function(t){return d(t.y)}).attr("fill","steelblue").attr("width",l.bandwidth()).attr("height",function(t){return s-d(t.y)}).on("mouseover",function(t){return o.style("opacity",1).style("visibility","visible").style("left",c.c.pageX+"px").style("top",c.c.pageY-28+"px"),console.log(o.style("opacity")),o})}}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"viz"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.activate,expression:"activate"}]},[e("svg",{attrs:{id:this.id,width:"90",height:"50"}}),this._v(" "),e("h2",[e("b",[this._v(this._s(this.xlabel))])])]),this._v(" "),e("div",{staticClass:"tooltip",staticStyle:{visibility:"hidden"},attrs:{id:"tip"}})])},staticRenderFns:[]};var v=a("VU/8")(h,u,!1,function(t){a("bZAy")},"data-v-dfc4457e",null).exports,f=a("Xxa5"),p=a.n(f),m=a("exGp"),g=a.n(m),_=a("mtWM"),b=a.n(_),w={name:"BlackFriday",data:function(){return{range:10,elems:[],activatePurchases:!1}},computed:{mini:function(){return d()(this.elems).slice(1,10)},benfordPoints:function(){var t=this.range,e=d()(this.elems).slice(1,t),a=[0,0,0,0,0,0,0,0,0];for(var n in e=e.reduce(function(t,e){return t.push({x:e.User_ID,y:parseInt(e.Purchase)}),t},[])){var i=Math.floor(Math.log(e[n].y)/Math.log(10)),r=Math.pow(10,i);a[Math.floor(e[n].y/r)-1]++}return a=a.reduce(function(t,e,a){return t.push({x:a+1,y:e}),t},[])}},components:{DataViz:v},methods:{fetchData:function(){var t=this;return g()(p.a.mark(function e(){var a;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("http://ddv-final.herokuapp.com/BlackFridayFiltered.json");case 3:(a=e.sent).data.error||(t.elems=a.data,t.elems.map(function(t){return delete t.Product_Category_1,delete t.Product_Category_2,delete t.Product_Category_3,t})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}},created:function(){this.fetchData()}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"blackFriday"}},[a("h2",[t._v("Dataset 1: Black Friday Sales")]),t._v(" "),a("p",[t._v("The following data is from a Kaggle entry on sales during Black Friday. Here's a few records of the plotted data.")]),t._v(" "),a("md-table",[a("md-table-row",t._l(t.elems[0],function(e,n,i){return a("md-table-head",{key:i},[t._v("\n        "+t._s(n)+"\n      ")])})),t._v(" "),t._l(t.mini,function(e){return a("md-table-row",{key:e.Product_ID},t._l(e,function(e,n){return a("md-table-cell",{key:n},[t._v("\n        "+t._s(e)+"\n      ")])}))})],2),t._v(" "),a("h2",[t._v("Benford's Black Friday Purchases")]),t._v(" "),a("p",[t._v("\n  Now, the data for amount of money purchased spans a few orders of magnitude.\n  It seems like this would be perfect for a demonstration of Benford's law. Let's try plotting the frequency\n  of each leading digit for the purchases column.")]),t._v(" "),a("md-button",{staticClass:"md-raised",on:{click:function(e){t.activatePurchases=!t.activatePurchases}}},[t._v("Toggle Visualization ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.activatePurchases,expression:"activatePurchases"}],staticClass:"purchasesViz"},[a("data-viz",{attrs:{data:t.benfordPoints,xcol:"x",ycol:"y",id:"black-friday-benford",activate:t.activatePurchases,xlabel:"Leading Digit - Purchase Amount (in U.S.D)"}}),t._v(" "),a("p",[t._v("Use this slider to control the number of values we use.")]),t._v("\n    0"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider",attrs:{type:"range",min:"1",max:"5000",id:"myRange"},domProps:{value:t.range},on:{__r:function(e){t.range=e.target.value}}}),t._v("5000\n    "),a("p",[t._v("Number of records: "+t._s(t.range))])],1),t._v(" "),a("br"),t._v(" "),a("p",[t._v("\n    Interesting, isn't it? The numbers don't really seem to follow a logarithmic downward trend, but they DEFINITELY\n    favor 1 as a leading digit. let's look at some other examples.\n  ")])],1)},staticRenderFns:[]};var x={name:"StatePopulations",data:function(){return{range:10,elems:[],activatePopulation:!1}},computed:{mini:function(){return d()(this.elems).slice(1,10)},benfordPoints:function(){var t=this.range,e=d()(this.elems).slice(1,t),a=[0,0,0,0,0,0,0,0,0];for(var n in e=e.reduce(function(t,e){return t.push({x:e.state,y:parseInt(e.pop_est_2014)}),t},[])){var i=Math.floor(Math.log(e[n].y)/Math.log(10)),r=Math.pow(10,i);a[Math.floor(e[n].y/r)-1]++}return a=a.reduce(function(t,e,a){return t.push({x:a+1,y:e}),t},[])}},components:{DataViz:v},methods:{testbenford:function(){console.log(this.range,this.benfordPoints)},fetchData:function(){var t=this;return g()(p.a.mark(function e(){var a;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("http://ddv-final.herokuapp.com/census-state-populations.json");case 3:(a=e.sent).data.error?console.log(a.data.error):t.elems=a.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}},created:function(){this.fetchData()}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"statepops"}},[a("h2",[t._v("Dataset 2: State Populations")]),t._v(" "),a("p",[t._v("The following data is from a dataset about refugees in the United States.\n    We're only interested, however, in the estimated populstions of U.S. States as estimated\n    in 2014. Here's a few records of the data.")]),t._v(" "),a("md-table",[a("md-table-row",t._l(t.elems[0],function(e,n,i){return a("md-table-head",{key:i},[t._v("\n        "+t._s(n)+"\n      ")])})),t._v(" "),t._l(t.mini,function(e){return a("md-table-row",{key:e.Product_ID},t._l(e,function(e,n){return a("md-table-cell",{key:n},[t._v("\n        "+t._s(e)+"\n      ")])}))})],2),t._v(" "),a("h2",[t._v("Benford's State Populations")]),t._v(" "),a("p",[t._v("\n  Now, we only have 50 records so it's not abundantly likely that we'll find a strong correlation. Here's the plotted leading digits:\n  ")]),t._v(" "),a("md-button",{staticClass:"md-raised",on:{click:function(e){t.activatePopulation=!t.activatePopulation}}},[t._v("Toggle Visualization ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.activatePopulation,expression:"activatePopulation"}],staticClass:"statepop"},[a("data-viz",{attrs:{data:t.benfordPoints,xcol:"x",ycol:"y",id:"state-pop-benford",activate:t.activatePopulation,xlabel:"Leading Digit - State Populations"}}),t._v(" "),a("p",[t._v("Use this slider to control the number of states we use.")]),t._v("\n    0"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider",attrs:{type:"range",min:"1",max:"50",id:"myRange"},domProps:{value:t.range},on:{__r:function(e){t.range=e.target.value}}}),t._v("50\n    "),a("p",[t._v("Number of records: "+t._s(t.range))])],1),t._v(" "),a("br"),t._v(" "),a("p",[t._v("\n    Well! Even with just 50 records, you wouldn't expect such a good correlation, but, with the exception of 6,\n    pretty much all the values taper off after 1 logarithmically! Let's look at what else we can do.\n  ")])],1)},staticRenderFns:[]};var T={name:"AppStore",data:function(){return{range:10,elems:[],activateBytes:!1,activateVersion:!1,activateTotal:!1}},computed:{mini:function(){return d()(this.elems).slice(1,10)},benfordByteCount:function(){return this.benfordPoints(this.elems,this.range,"id","size_bytes")},benfordTotalReviews:function(){return this.benfordPoints(this.elems,this.range,"id","rating_count_tot")},benfordVersionReviews:function(){return this.benfordPoints(this.elems,this.range,"id","rating_count_ver")}},components:{DataViz:v},methods:{benfordPoints:function(t,e,a,n){var i=d()(t).slice(1,e),r=[0,0,0,0,0,0,0,0,0];for(var s in i=i.reduce(function(t,e){return t.push({x:e[a],y:parseInt(e[n])}),t},[])){var o=Math.floor(Math.log(i[s].y)/Math.log(10)),l=Math.pow(10,o),c=Math.floor(i[s].y/l);isNaN(c)||r[c-1]++}return r=r.reduce(function(t,e,a){return t.push({x:a+1,y:e}),t},[])},fetchData:function(){var t=this;return g()(p.a.mark(function e(){var a;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("http://ddv-final.herokuapp.com/AppleStore.json");case 3:(a=e.sent).data.error?console.log(a.data.error):t.elems=a.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}},created:function(){this.fetchData()}},P={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"appstore"}},[a("h2",[t._v("Dataset 3: Apple Store")]),t._v(" "),a("p",[t._v("This data is also from Kaggle. It's from Apple's App Store, and just looking at this data,\n    I can see three potential candidates to test Benford's Law. Do you see them? I'd pick rating_count_tot\n    (total ratings), rating_count_ver (rating for the current version), and the byte-size (number of bytes)\n  ")]),t._v(" "),a("md-table",[a("md-table-row",t._l(t.elems[0],function(e,n,i){return a("md-table-head",{key:i},[t._v("\n        "+t._s(n)+"\n      ")])})),t._v(" "),t._l(t.mini,function(e){return a("md-table-row",{key:e.Product_ID},t._l(e,function(e,n){return a("md-table-cell",{key:n},[t._v("\n        "+t._s(e)+"\n      ")])}))})],2),t._v(" "),a("h2",[t._v("Benford's Byte Count")]),t._v(" "),a("p",[t._v("\n  Let's start with the number of bytes as our parameter.\n  ")]),t._v(" "),a("md-button",{staticClass:"md-raised",on:{click:function(e){t.activateBytes=!t.activateBytes}}},[t._v("Toggle Visualization ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.activateBytes,expression:"activateBytes"}],staticClass:"bytecount"},[a("data-viz",{attrs:{data:t.benfordByteCount,xcol:"x",ycol:"y",id:"appstore-bytes-benford",activate:t.activateBytes,xlabel:"Leading Digit - App Size (in Bytes)"}}),t._v(" "),a("p",[t._v("Use this slider to control the number of apps used.")]),t._v("\n    0"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider",attrs:{type:"range",min:"1",max:"7198",id:"myRange"},domProps:{value:t.range},on:{__r:function(e){t.range=e.target.value}}}),t._v("7198\n    "),a("p",[t._v("Number of records: "+t._s(t.range))])],1),t._v(" "),a("br"),t._v(" "),a("h2",[t._v("Benford's Version Reviews")]),t._v(" "),a("p",[t._v("\n    Interesting. Now let's see the current version's reviews\n  ")]),t._v(" "),a("md-button",{staticClass:"md-raised",on:{click:function(e){t.activateVersion=!t.activateVersion}}},[t._v("Toggle Visualization ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.activateVersion,expression:"activateVersion"}],staticClass:"versionreviews"},[a("data-viz",{attrs:{data:t.benfordVersionReviews,xcol:"x",ycol:"y",id:"appstore-version-benford",activate:t.activateVersion,xlabel:"Leading Digit - Current Version Reviews"}}),t._v(" "),a("p",[t._v("Use this slider to control the number of apps used.")]),t._v("\n    0"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider",attrs:{type:"range",min:"1",max:"7198",id:"myRange"},domProps:{value:t.range},on:{__r:function(e){t.range=e.target.value}}}),t._v("7198\n    "),a("p",[t._v("Number of records: "+t._s(t.range))])],1),t._v(" "),a("br"),t._v(" "),a("h2",[t._v("Benford's Total Reviews")]),t._v(" "),a("p",[t._v("\n    And finally, the total reviews\n  ")]),t._v(" "),a("md-button",{staticClass:"md-raised",on:{click:function(e){t.activateTotal=!t.activateTotal}}},[t._v("Toggle Visualization ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.activateTotal,expression:"activateTotal"}],staticClass:"totalReviews"},[a("data-viz",{attrs:{data:t.benfordTotalReviews,xcol:"x",ycol:"y",id:"appstore-total-benford",activate:t.activateTotal,xlabel:"Leading Digit - Total Reviews"}}),t._v(" "),a("p",[t._v("Use this slider to control the number of apps used.")]),t._v("\n    0"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"range"}],staticClass:"slider",attrs:{type:"range",min:"1",max:"7198",id:"myRange"},domProps:{value:t.range},on:{__r:function(e){t.range=e.target.value}}}),t._v("7198\n    "),a("p",[t._v("Number of records: "+t._s(t.range))])],1),t._v(" "),a("br"),t._v(" "),a("p")],1)},staticRenderFns:[]};var V={name:"Walkthrough",data:function(){return{active:"first"}},components:{DataViz:v,BlackFriday:a("VU/8")(w,y,!1,function(t){a("ropI")},"data-v-24aaa82a",null).exports,StatePopulations:a("VU/8")(x,k,!1,function(t){a("uXqn")},"data-v-2863133c",null).exports,AppStore:a("VU/8")(T,P,!1,function(t){a("tIYf")},"data-v-fa58b522",null).exports}},B={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("md-steppers",{attrs:{"md-dynamic-height":"","md-active-step":t.active},on:{"update:mdActiveStep":function(e){t.active=e}}},[a("md-step",{attrs:{id:"first","md-label":"Introduction"}},[a("p",{attrs:{align:"left"}},[t._v("Benford’s law is about a frequency distribution of numbers that span multiple orders of magnitude.\n    Specifically, it concerns the leading or most significant digit in such a distribution.\n    For example, the leading digit of 392 is 3, that of 1042 is 1, and so on.\n    in the following datasets, I'm going to plot the leading digits of certain values to demonstrate how this works.\n    I will use the following formula to do this:")]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("If x is the datapoint, we take FLOOR(x/POWER(10, FLOOR(LOG(x,10)))) to get this.\n    Taking the log base 10 of a number x gives the exact exponent of 10 needed to reach x. Raising 10 to the\n    floor of that logarithm will give the highest power of 10 lower than x. Dividing x by this number gives a\n    decimal less than 10, and taking the floor of that number gives the leading digit. We will turn discrete quantitative\n    values into a discrete nominal value (1,2,3,4,5,6,7,8 or 9), and plot the frequency of items that fall in each value on a bar graph.")]),t._v(" "),a("p",{attrs:{align:"left"}},[t._v("Though you might expect a bunch of random numbers to have an equal chance of getting any given leading digit, about 11.1%,\n    Benford’s law states that this is far from the case. There’s around a 30% chance of getting 1 and 5% chance of getting 9, and\n    the graph, in general, follows a logarithmic scale (the logarithmic scale is also the reason for this law).")]),t._v(" "),a("p",[t._v("\n      However, you shouldn't take my word for it that this is the case. I've chosen 3 datasets that are completely unrelated to each other.\n      I'm going to look for values in these datasets that span multiple orders of magnitude, and plot their leading digits to find\n      out how credible Benford's Law really is.\n    ")]),t._v(" "),a("md-button",{staticClass:"md-raised md-primary",on:{click:function(e){t.active="second"}}},[t._v("Continue")])],1),t._v(" "),a("md-step",{attrs:{id:"second","md-label":"Black Friday Purchases"}},[a("black-friday"),t._v(" "),a("md-button",{staticClass:"md-primary md-raised",on:{click:function(e){t.active="third"}}},[t._v("Continue")])],1),t._v(" "),a("md-step",{attrs:{id:"third","md-label":"State Populations"}},[a("state-populations"),t._v(" "),a("md-button",{staticClass:"md-raised md-primary",on:{click:function(e){t.active="fourth"}}},[t._v("Continue")])],1),t._v(" "),a("md-step",{attrs:{id:"fourth","md-label":"App Store"}},[a("app-store"),t._v(" "),a("md-button",{staticClass:"md-raised md-primary",on:{click:function(e){t.active="fifth"}}},[t._v("Continue")])],1),t._v(" "),a("md-step",{attrs:{id:"fifth","md-label":"About This Visualization",align:"left"}},[a("p",[t._v("\n      My visualization uses an interactive slideshow to show the user how different kinds of data all follow Benford's Law.\n      I used a reactive front end framework called Vue.js, and a component library called Vue Material to build the necessary\n      UI components and transitions. The relevant links to both are at the bottom of this web page. All the charts were built using d3.js.\n    ")]),t._v(" "),a("p",[t._v("\n      The visualization has four scenes (five, including this essay) that the user can navigate through while on the webpage.\n      There are headings at the top which, when clicked, will take the user to the slide of their choice. There are also buttons\n      at the bottom of the first four slides that take the user forward through the visualization. The transitions are highlighted by\n      animations in which the previous layout is 'slid out' and replaced with the new one. This is done in order to make clear to the viewer\n      that the datasets in consecutive slides are in no way related to each other.\n      The template for each slide, however, is the same, a table with an overview followed by a graphical representation of Benford's law,\n      in order to show the reader that these different datasets all follow the same law.\n    ")]),t._v(" "),a("p",[t._v("\n      The first slide is simply an introduction to Benford's law, and a little bit about the math involved in plotting the results\n      as a chart (E.g. how to obtain the leading digit of a number).The three main slides pull data from Black Friday sales data, U.S. census\n      data and the Apple App store respectively. In each main slide, 10 records from each dataset are first shown in table form.\n      Then the user can click a button to open a visualization of the frequency of each leading digit (from 1 to 9) in one of the parameters shown on the table.\n    ")]),t._v(" "),a("p",[t._v("\n      I've included annotations as lines of text describing the data and the visualizations, so that each slide reads as though it was its own\n      interactive document. The reason for this is to make the design of the experience look simple and unobtrusive, and ensure that each individual slide\n      is considered consistent with the previous ones yet in terms of theme yet separate in terms of content. The annotations are cleared between scenes to show that\n      the dataset that the slide is focused on has also changed.\n    ")]),t._v(" "),a("p",[t._v("\n      The dataset being used can be changwd by changing the slide. The tiles showing the slides darken when the mouse hovers over them to show\n      they can be pressed to cause a slide change. The 'continue' button at the end of each slide is also raised for the same reason.\n      The user can access the charts by clicking on a button that toggles the visualization. The button is raised, indicating to the user that it can\n      be pressed. Each chart also has a slider underneath it, so that the user can\n      change the number of data points being used to plot the frequency of leading digits.\n      This is a parameter, a form of direct interaction between the user and the data. As the user uses the slider,\n      the graph reactively adjusts to accomodate the use of more data points. The annotation text above the slider tells the user that they\n      can change the values.\n    ")])])],1)},staticRenderFns:[]};var z={name:"HelloWorld",data:function(){return{msg:"Benford's Law",data:[]}},components:{Walkthrough:a("VU/8")(V,B,!1,function(t){a("Vtlu")},"data-v-450b0b5a",null).exports}},C={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h3",[t._v("An interactive visualization by Karan Abrol")]),t._v(" "),a("walkthrough"),t._v(" "),a("h2",[t._v("Links and sources")]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Vue.js\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://vuematerial.io/",target:"_blank"}},[t._v("\n        Vue Material\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.github.com/kabrol98",target:"_blank"}},[t._v("\n        My Github\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Benford%27s_law",target:"_blank"}},[t._v("\n        Benford's Law\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.kaggle.com/mehdidag/black-friday",target:"_blank"}},[t._v("\n        Black Friday Data\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/BuzzFeedNews/2015-11-refugees-in-the-united-states",target:"_blank"}},[t._v("\n        U.S. Census Data\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.kaggle.com/ramamet4/app-store-apple-data-set-10k-apps",target:"_blank"}},[t._v("\n        App Store Data\n      ")])])])}]};var D=a("VU/8")(z,C,!1,function(t){a("Rr73")},"data-v-01ac5bd4",null).exports;n.default.use(o.a);var I=new o.a({routes:[{path:"/",name:"HelloWorld",component:D}]});n.default.config.productionTip=!1,new n.default({el:"#app",router:I,components:{App:s},template:"<App/>"})},Rr73:function(t,e){},SEzf:function(t,e){},Vtlu:function(t,e){},bZAy:function(t,e){},ropI:function(t,e){},tIYf:function(t,e){},uXqn:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6dd576730690bc4468c1.js.map