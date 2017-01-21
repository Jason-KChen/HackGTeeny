
function top25(datahtml)
{
	//parsing the title
    var raw = $(datahtml).find(".detName").text();
    if ( raw )
    {
        raw = raw.replace(/[-\/\\^*+?.()|[\]{}]/g, '');

    	//setting bad words to remove
        var nonowords = ["320", "kbps", "," , "mp3", "download","@","Deluxe", "2016","2017","2015","2014","2013","2009","2008","2010","2011", "2012", "2002", "2003","2004", "2005", "2006","2007", "vtwin88cube", "deluxe", "cd", "-","Single","Promo", "Bubanee"," ak", "explicit", "album", "Edition", "special","CBR","rip", "limited", "bonuscov", "Prime", " feat", " ft"];
        //removing the extra words
        for(var i = 0; i < nonowords.length; i ++)
        {
            var searchMask = nonowords[i];
            var regEx = new RegExp(searchMask,"ig");
            var replaceMask = "";
            raw = raw.replace(regEx,replaceMask);
        }
        //removing whitespace
        raw = raw.replace(/   /g,'');
        raw = raw.replace(/  /g, '');
        //splitting the songs up into an array
        var splitup = raw.split("\n");
                    	
		//setting phrases that make the array index not count
		var badphrases = ["nrj", "billboard", "discography", "complete", "chart","compilation", "greatest hits"];
		//defining a splice for strings
		String.prototype.splice = function(idx, rem, str) 
		{
    		return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
		};
		//removing those "songs"
		for(var i = 0; i < badphrases.length; i ++)
		{
			for(var j = 0; j < splitup.length; j++)
			{
				searchMask = badphrases[i];
				var searcher = new RegExp(searchMask,"i");

				search = splitup[j].search(searcher);
				if (search != -1)
				{
					splitup.splice(j,1);
					j = j -1;
				}
								
			}
		}
		//function for alpha
		function alphais(inputtxt)  
		{  
			var letterNumber = /^[a-zA-Z]+$/;  
			if((inputtxt.match(letterNumber)))   
			{  
				return true;  
			}  
			else  
			{
				return false; 	
			}      
		}  
		//putting space when theres a capital letter  
		for(var i = 0; i < splitup.length; i++)
		{
			var temp = splitup[i];
			var alpha = /^[a-zA-Z]+$/;
			for(var j = 1; j < temp.length-1; j++)
			{
				if(alphais(temp[j]) && temp[j] == temp[j].toUpperCase() && temp[(j-1)] != ' ' && temp[j+1] == temp[j+1].toLowerCase() && (temp[j-1] == temp[j-1].toLowerCase() || !alphais(temp[j-1])))
				{
					temp = temp.splice(j,0," ");
				}
			}
			splitup[i] = temp;
		}
		output = splitup.slice(0,25);
		return output;
	}
}
