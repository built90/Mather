/*
 * zzllrr Mather
 * Copyright by zzllrr since 2013. All rights reserved.
 * zzllrr@gmail
 * Released under MIT License
 */
var Graphic={
	parse:function(graphType,v,ID,DOM){
		var g=graphType,d;
		if(g=='latex'){
			d=katex.renderToString(v||$(ID?'#'+ID:DOM).html());
			
		}
		
		
		if(g=='flowchart'){
			d=flowchart.parse(v?v.replace(/&&/g,'\n'):$(ID?'#'+ID:DOM).html());
			
		}
		
		if(g=='echarts'){
			
			
			
		}
		
		
		return d;
	},
	drawSVG:function(graphType,v,ID,DOM){
		var g=graphType,d;
		if(g=='latex'){
			//katex.render(v||$(ID?'#'+ID:DOM).html(),DOM||$('#'+ID)[0]);
			
		}else if(g=='flowchart'){
			d=Graphic.parse(g,v,ID,DOM);
			var id=ID||$(DOM).attr('id')||$(DOM).attr('id',(new Date()).getTime()+(Math.random()+'').substr(2)).attr('id');
			d.drawSVG(id,{'scale':1});

			do{
				$('#'+id+' text tspan').filter(function(){return /\$\$[^\$]+\$\$/.test($(this).text())}).each(function(){
					var t=$(this).text().replace(/\$\$[^\$]+\$\$/g, function(x){return eval(x.replace(/^\$\$|\$\$$/g,''))});
					$(this).text(t);
				});

			}while($('#'+id+' text tspan').filter(function(){return /\$\$[^\$]+\$\$/.test($(this).text())}).length);

			$('#'+id+' text').filter(function(){return /^\$.+\$$/.test($(this).text())}).each(function(){
				var t=$(this).text();
				Graphic.drawHTMLinSVG('latex',kx(fnv0(t)),'',this);
			});
			
		}else if(g=='echarts'){

			var id=ID||$(DOM).attr('id'),D=$('#'+id),
			o=isObj(v)?v:jSon(fnv(v[0]=='{'?v:'{'+v+'}'));

			D.append(DCtv('echart0" style="width:'+D.width()+'px;height:'+(D.height()||600)+'px',''));
consolelog(D.html());
			var myChart = echarts.init(D.children().last()[0]);

	        //使用制定的配置项和数据显示图表
	        myChart.setOption(o);
			
		}else{
			
			var ivs=v.split('\n'), str='';
			for(var i=0;i<ivs.length;i++){
				var ivi=ivs[i].trim();
				if(ivi){
					if(/^draw/.test(ivi)){//canvas
						eval(ivi)
						
						
					}else{//svg
					
						str+=eval('plot.'+ivi);
					}
				}
			}
			var id='graphic'+(new Date().getTime());
			plot.plot(id,'<div id='+id+'>'+plot.shape(id+'_svg','svg',str)+dc);

			
		}
	},
	drawHTML:function(graphType,v,ID,DOM){
		var g=graphType;
		if(g=='latex'){
			katex.render(v||$(ID?'#'+ID:DOM).html(),DOM||$('#'+ID)[0]);
			
		}

		
		if(g=='flowchart'){

		}
	},
	drawHTMLinSVG:function(graphType,v,ID,DOM){//用于在SVG绘制之后，再次加工HTML
		var g=graphType,h;
		if(g=='latex'){
			var d=$(ID?'#'+ID:DOM);
			consolelog(v||d.text());
			h=katex.renderToString(v||d.text());
//这里使用原式JS，是因为jQuery对元素的大小写不敏感
			h='<foreignObject x="'+(d.attr('x')||0)+'" y="'+(+(d.attr('y')||0)-10)+'" transform="'+(d.attr('transform')||'')+'" width="'+scrollW()+'" height="'+scrollH()+
				'"><body xmlns="'+xhtml+'">'+h+'</body></foreignObject>';
			$(ID?'#'+ID:DOM)[0].outerHTML=h;

		}

		
		if(g=='flowchart'){

		}
	},

	
	
	
};

