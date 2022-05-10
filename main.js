const API_URL =
	"https://api.thecatapi.com/v1/images/search?limit=3";
const API_URL_FAVOURITES =
	"https://api.thecatapi.com/v1/favourites";
const API_URL_DELETE = (id) =>
	`https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.querySelector(".statusError");


	/* const $foto = document.querySelector("img"); */

	/* fetch(API_URL)
		.then((res) => res.json())
		.then((data) => ($foto.src = data[0].url)); */

	async function loadRandomCats() {
		const res = await fetch(API_URL);
		const data = await res.json();

		if (res.status !== 200) {
			spanError.innerText = "Hubo un error " + res.status + data.message;
			spanError.style.color = "red";
		} else {
			const $foto1 = document.querySelector("img.uno");
			const $boton1 = document.getElementById("btn-1");
			const $foto2 = document.querySelector("img.dos");
			const $boton2 = document.getElementById("btn-2");
			const $foto3 = document.querySelector("img.tres");
			const $boton3 = document.getElementById("btn-3");

			$foto1.src = data[0].url;
			$foto2.src = data[1].url;
			$foto3.src = data[2].url;

			/* console.log("random", $boton1); */

			$boton1.onclick = () => saveFavouritesCats(data[0].id);
			$boton2.onclick = () => saveFavouritesCats(data[1].id);
			$boton3.onclick = () => saveFavouritesCats(data[2].id);
		}
    loadFavouritesCats();
	}

	async function loadFavouritesCats() {
		const res = await fetch(API_URL_FAVOURITES, {
      method: "GET",
      headers: {
        'X-API-KEY': 'cbf5ce22-ffd6-4176-a09b-d575dbbf884e',
      }
    });
		const data = await res.json();

		/* console.log(favoritos); */

		if (res.status !== 200) {
			spanError.innerText = "Hubo un error " + res.status + data.message;
			spanError.style.color = "red";
		} else {
			const $seccion = document.getElementById("favouritesMichis");
      $seccion.innerText = "";
			const $titulo = document.createElement("h2");
			const $textoTitulo = document.createTextNode("Gatitos Favoritos");

			$titulo.append($textoTitulo);
			$seccion.append($titulo);

			data.forEach((cat) => {
				/*  cat.image.url */

				const $articulo = document.createElement("article");
				const $imagen = document.createElement("img");
				$imagen.style.width = "150px";
				const $boton = document.createElement("button");
				$boton.onclick = () => deleteFavouritesCats(cat.id);
				const mensajeBoton = document.createTextNode("Quitar");

				/* console.log(cat.id); */

				$boton.append(mensajeBoton);

				$imagen.src = cat.image.url;

				$articulo.append($imagen);
				$articulo.append($boton);
				$seccion.append($articulo);
			});
			/* console.log("favourites", data); */
		}
	}

	


async function saveFavouritesCats(id) {
	const res = await fetch(API_URL_FAVOURITES, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
      "X-API-KEY": "cbf5ce22-ffd6-4176-a09b-d575dbbf884e",
		},
		body: JSON.stringify({
			image_id: id,
		}),
	});

	const data = await res.json();

	if (res.status !== 200) {
		spanError.innerText = "Hubo un error " + res.status + data.message;
		spanError.style.color = "red";
	} else {
		console.info("Gato guardado");
    loadFavouritesCats();
	}

	/* console.log("data", id); */
}

async function deleteFavouritesCats(id) {
	const res = await fetch(API_URL_DELETE(id), {
		method: "DELETE",
    headers: {
      "X-API-KEY": "cbf5ce22-ffd6-4176-a09b-d575dbbf884e"
    }
	});
	/* console.log(res) */
	const data = await JSON.stringify(res);

	if (res.status !== 200) {
		spanError.innerText = "Hubo un error " + res.status + data.message;
		spanError.style.color = "red";
	} else {
		console.warn("Gato eliminado");
    loadFavouritesCats();
	}
}
