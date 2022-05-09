function gatitosRandom() {
	/* const $foto = document.querySelector("img"); */

	const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=cbf5ce22-ffd6-4176-a09b-d575dbbf884e";

	/* fetch(API_URL)
		.then((res) => res.json())
		.then((data) => ($foto.src = data[0].url)); */

    async function reload() {
      const res = await fetch(API_URL);
      const data = await res.json();

      const $foto1 = document.querySelector("img.uno");
      const $foto2 = document.querySelector("img.dos");
      const $foto3 = document.querySelector("img.tres");

      $foto1.src = data[0].url;
      $foto2.src = data[1].url;
      $foto3.src = data[2].url;

    }

    reload();
}
