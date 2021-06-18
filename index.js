let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=3bbd4cf0ad46eb7a176bc6174fe9abf7&language=pt-BR";
		let xhr= new XMLHttpRequest();
		xhr.open("GET", endpoint);
		xhr.send();
		xhr.onreadystatechange=function()
		{
			console.log(this);

			if (xhr.readyState==this.DONE)
			{
				if(xhr.status==200)
				{
					console.log(xhr.responseText);
					displayResults(xhr.responseText);
				}
				else
				{
					alert("AJAX error!");
					console.log(xhr.status)
				}
			}

		}

		console.log("Final do onsubmit");

	
function displayResults(resultObject)
{
	resultObject= JSON.parse(resultObject);
	console.log(resultObject.results);

	let conElement=document.querySelector("#movie-container");	

	while(conElement.hasChildNodes())
	{
		conElement.removeChild(conElement.lastChild);
	}
	
	document.querySelector("#numofresults").innerHTML= "Mostrando " + resultObject.results.length + " de " + resultObject.total_results+ " resultado(s)!";


	for(let i=0; i<resultObject.results.length; i++)
	{

		let rowElement= document.createElement("div");
		rowElement.classList.add("col");
		rowElement.classList.add("col-12");
		rowElement.classList.add("col-md-4");
		rowElement.classList.add("col-lg-3");	
		let conImage=document.createElement("a");
		conImage.classList.add("imageCon");
		conImage.target = "_blank";
		conImage.rel = "noreferrer noopener";
		let movTitle=document.createElement("p");
		movTitle.classList.add("title");
		let movRelease=document.createElement("p");
		movRelease.classList.add("release");
		let movRating=document.createElement("p");
		movRating.classList.add("rating");
		let movVotes=document.createElement("p");
		movVotes.classList.add("numofVotes");
		let movDescription=document.createElement("p");
		movDescription.classList.add("description");


		
		let movPoster=document.createElement("img");
		if (resultObject.results[i].poster_path==null)
		{
			movPoster.src = "https://images-na.ssl-images-amazon.com/images/I/51lh93vBeRL._SY679_.jpg";
		}
		else
		{
			movPoster.src = "https://image.tmdb.org/t/p/w500/"+resultObject.results[i].poster_path;
		}
	
		
		console.log(movPoster);

		conImage.href = "https://themoviedb.org/movie/" + resultObject.results[i].id;
		movTitle.innerHTML= resultObject.results[i].title;
		movRelease.innerHTML= resultObject.results[i].release_date;
		movRating.innerHTML= "Avaliação " + resultObject.results[i].vote_average + " de 10";
		movVotes.innerHTML= "Números de votos: " + resultObject.results[i].vote_count;
		if (resultObject.results[i].overview.length>370)
		{
		movDescription.innerHTML=resultObject.results[i].overview.substring(0, 370) + "...";
		}
		else
		{
		movDescription.innerHTML= resultObject.results[i].overview;
		}
		
		


		conImage.appendChild(movRating);
		conImage.appendChild(movVotes);
		conImage.appendChild(movDescription);
		conImage.appendChild(movPoster);
		rowElement.appendChild(conImage);
		rowElement.appendChild(movTitle);
		rowElement.appendChild(movRelease);
		

		console.log(rowElement);

		conElement.appendChild(rowElement);
		


	}
} 

document.querySelector("#search-form").onsubmit=function(event)
{
	event.preventDefault();

	let searchInput = document.querySelector("#search-id").value.trim();
	if(searchInput=="")
	{
		alert("Escreva o nome de um Filme.")
	}
	else
	{
		console.log(searchInput);

			
		let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=3bbd4cf0ad46eb7a176bc6174fe9abf7&language=pt-BR&query="+ searchInput +"&page=1&include_adult=false"
			let xhr= new XMLHttpRequest();
			xhr.open("GET", endpoint);
			xhr.send();
		
			xhr.onreadystatechange=function()
			{
				console.log(this);

				
				if (xhr.readyState==this.DONE)
				{
					if(xhr.status==200)
					{
						console.log(xhr.responseText);
						displayResults(xhr.responseText);
					}
					else
					{
						alert("Procurando algo!");
						console.log(xhr.status)
					}
				}

			}

			console.log("Final do onsubmit");

	}

	

}
