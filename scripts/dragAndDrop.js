const movements = [
	{
		name: "Movement 1",
		concept: { name: "1", id: "concept-1" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image one",
			id: "img-1",
		},
	},
	{
		name: "Movement 2",
		concept: { name: "2", id: "concept-2" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image two",
			id: "img-2",
		},
	},
	{
		name: "Movement 3",
		concept: { name: "3", id: "concept-3" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image three",
			id: "img-3",
		},
	},
	{
		name: "Movement 4",
		concept: { name: "4", id: "concept-4" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image four",
			id: "img-4",
		},
	},
	{
		name: "Movement 5",
		concept: { name: "5", id: "concept-5" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image five",
			id: "img-5",
		},
	},
	{
		name: "Movement 6",
		concept: { name: "6", id: "concept-6" },
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			alt: "image six",
			id: "img-6",
		},
	},
];

const movementsContainer = document.querySelector("#movements");
const conceptsContainer = document.querySelector("#concepts");
const imagesContainer = document.querySelector("#images");

const conceptsArray = [];
const imagesArray = [];

const shuffleArray = (arr) => {
	return arr.sort((a, b) => 0.5 - Math.random());
};

const createElements = () => {
	movements.forEach((movement) => {
		const itemContainer = document.createElement("div");
		const innerItemContainer = document.createElement("div");

		itemContainer.classList.add("movements__container__item");
		innerItemContainer.classList.add("movements__container__item__container");

		const title = document.createElement("h3");
		const conceptSubtitle = document.createElement("h4");
		const imageSubtitle = document.createElement("h4");

		title.classList.add("movements__title");
		title.innerText = movement.name;

		conceptSubtitle.classList.add("movements__subtitle");
		conceptSubtitle.innerText = "Concept";
		imageSubtitle.classList.add("movements__subtitle");
		imageSubtitle.innerText = "Image";

		innerItemContainer.append(conceptSubtitle, imageSubtitle);

		conceptsArray.push(movement.concept);
		imagesArray.push(movement.image);

		itemContainer.append(title, innerItemContainer);
		movementsContainer.append(itemContainer);
	});

	const shuffledConcepts = shuffleArray(conceptsArray);
	const shuffledImages = shuffleArray(imagesArray);

	for (let i = 0; i < movements.length; i++) {
		const conceptItemContainer = document.createElement("div");
		const imageItemContainer = document.createElement("div");

		conceptItemContainer.classList.add("concepts__container__item");
		conceptItemContainer.id = `concept-container-${shuffledConcepts[i].id}`;

		imageItemContainer.classList.add("images__container__item");
		imageItemContainer.id = `image-container-${shuffledImages[i].id}`;

		const concept = document.createElement("p");
		const image = document.createElement("img");

		concept.classList.add("concepts__container__item__text");
		concept.innerText = shuffledConcepts[i].name;
		concept.id = shuffledConcepts[i].id;
		concept.draggable = true;

		image.classList.add("images__container__item__img");
		image.src = shuffledImages[i].src;
		image.alt = shuffledImages[i].alt;
		image.id = shuffledImages[i].id;
		image.draggable = true;

		conceptItemContainer.append(concept);
		conceptsContainer.append(conceptItemContainer);
		imageItemContainer.append(image);
		imagesContainer.append(imageItemContainer);
	}
	handleEvents();
};

const dragStartHandler = (e) => {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dataTransfer.dropEffect = "move";
};

const dragStartImageHandler = (e) => {
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dataTransfer.dropEffect = "move";
};

const dragOverHandler = (e) => {
	e.preventDefault();
	e.dataTransfer.dropEffect = "move";
};

const dropHandler = (e) => {
	e.preventDefault();
	const data = e.dataTransfer.getData("text/plain");
	const element = document.getElementById(data);

	const conceptsContainer = document.getElementById("concepts");
	const imagesContainer = document.getElementById("images");

	const conceptId = document.getElementById(`concept-container-${data}`);
	const imageId = document.getElementById(`image-container-${data}`);

	e.target.append(element);

	conceptId
		? conceptsContainer.removeChild(conceptId)
		: imagesContainer.removeChild(imageId);
};

const handleEvents = () => {
	const itemContainer = document.querySelectorAll(
		".movements__container__item",
	);
	const concept = document.querySelectorAll(".concepts__container__item__text");
	const image = document.querySelectorAll(".images__container__item");

	for (let i = 0; i < itemContainer.length; i++) {
		itemContainer[i].addEventListener("dragover", dragOverHandler);
		itemContainer[i].addEventListener("drop", dropHandler);

		concept[i].addEventListener("dragstart", dragStartHandler);
		image[i].addEventListener("dragstart", dragStartImageHandler);
	}
};

createElements();
