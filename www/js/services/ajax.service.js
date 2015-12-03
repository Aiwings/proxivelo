angular.module('proxivelo.services',[])

.factory('ajaxService',function($http){		




	var ajaxService = {
		
		
		post : function (url,data) {		
			
			console.log("POST "+url+" "+ JSON.stringify(data));
			 var method = 'POST';
			 var request = $http({
				    method: method,
					url: url,
					data: data,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
								
					.then(function(response){						
					
							console.log(response.data);
							return response.data;				         
				        
			}).catch(function(e)
			{
			    console.log(JSON.stringify(e));
			    alert(JSON.stringify(e));
			    
			    throw e;
                
			});
			return request;
		},
		
		get : function (url) {		
			
					console.log("GET "+url);
			
			 var request = $http.get(url)
			
				//~ var request = $http.post(url,data)				
					.then(function(response){						
					
						
							return response.data;				         
				        
			}).catch(function(e)
			{
			    console.log(JSON.stringify(e));
			    alert(JSON.stringify(e));
				
			    throw e;
			});
		return request;
		}	
	};
	return ajaxService;
});
