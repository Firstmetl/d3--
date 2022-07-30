function Map() {
	var struct = function(key, value) { 
		this.key = key;     
		this.value = value;
	};

	var put = function(key, value){
		for(var i = 0; i < this.arr.length; i++) {
			if( this.arr[i].key === key ) {     
				this.arr[i].value = value;     
				return; 
			}     
		}
		this.arr[this.arr.length] = new struct(key, value);
	};

	var get = function(key) {
		for(var i = 0; i < this.arr.length; i++) {  
			if( this.arr[i].key === key ) {   
				return this.arr[i].value;
			}
		}
		return null;     
	};

	var remove = function(key) {//移除
		var v;
		for(var i = 0; i < this.arr.length; i++) { 
			v = this.arr.pop();
			if( v.key === key ) { 
				continue;     
			}     
			this.arr.unshift(v);
	   }     
	};
	
	var values = function(){//返回所有value，多个用###隔开
       var value=[];
       for (var i = 0; i < this.arr.length; i++) {  
          value.push(this.arr[i].value);  
       }  
       return value.join("###");  
	}; 

	var size = function() {
		return this.arr.length;
	}; 

	var isEmpty = function() { 
		return this.arr.length <= 0;     
	};


	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;     
	this.isEmpty = isEmpty;
	this.values = values;
}     