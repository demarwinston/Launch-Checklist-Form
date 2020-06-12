window.addEventListener("load", function () {

	let form = document.querySelector("form");
	fetchData();

	form.addEventListener("submit", function (event) {

		   event.preventDefault();
		

		let items = document.getElementById('faultyItems');
		let launchStatus = document.getElementById('launchStatus');
		let fuelStatus = document.getElementById('fuelStatus');
		let cargoStatus = document.getElementById('cargoStatus')

		let ready = true;

		let pilotName = document.querySelector("input[name=pilotName]").value;
		let copilotName = document.querySelector("input[name=copilotName]").value;
		let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
		let cargoMass = document.querySelector("input[name=cargoMass]").value;

		fuelLevel = Number(fuelLevel);
		cargoMass = Number(cargoMass);

		if (isNaN(pilotName) || isNaN(copilotName) || isNaN(fuelLevel) || isNaN(cargoMass)) {

			alert("Invalid information")
			items.style.visibility = 'hidden'
			launchStatus.style.color = 'black';
			launchStatus.innerHTML = 'Awaiting Information Before Launch';



		} else {


			items.style.visibility = 'visible';

			document.getElementById('pilotStatus').innerHTML = `Pilot ${pilotName + ' '}Ready`

			document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilotName + ' '}Ready`




			if (fuelLevel < 10000) {
				ready = false;
				fuelStatus.innerHTML = 'Not enough fuel for journey...';

			} else {
				fuelStatus.innerHTML = 'Fuel level high enough...';
			}

			if (cargoMass > 10000) {
				ready = false;
				cargoStatus.innerHTML = 'Too much mass for the shuttle to take off...';


			} else {
				cargoStatus.innerHTML = 'Cargo mass sufficient for launch...';
			}

			if (ready) {
				launchStatus.style.color = 'green';

				launchStatus.innerHTML = 'Shuttle is ready for launch...';



			} else {
				items.style.visibility = 'visible';
				launchStatus.style.color = 'red';
				launchStatus.innerHTML = 'Shuttle not ready for launch';
			}

		}
	});
});


function fetchData() {

	fetch('https://handlers.education.launchcode.org/static/planets.json').then(
		function (response) {
			response.json().then(function (data) {

				let targets = document.getElementById('missionTarget');

				let random = Math.round(Math.random() * data.length);
				let respJson = data[random];

				targets.innerHTML =
					`<h2>Mission Destination</h2>
				<ol>
				   <li>Name: ${respJson.name}</li>
				   <li>Diameter: ${respJson.diameter}</li>
				   <li>Star: ${respJson.stat}</li>
				   <li>Distance from Earth: ${respJson.distance}</li>
				   <li>Number of Moons: ${respJson.moons}</li>
				</ol>
				<img src="${respJson.image}">`


			});
		})

}


// This block of code shows how to format the HTML once you fetch some planetary JSON!
// <h2>Mission Destination</h2>
// <ol>
//    <li>Name: ${}</li>
//    <li>Diameter: ${}</li>
//    <li>Star: ${}</li>
//    <li>Distance from Earth: ${}</li>
//    <li>Number of Moons: ${}</li>
// </ol>
// <img src="${}">

