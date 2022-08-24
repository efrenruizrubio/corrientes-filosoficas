const movements = [
	{
		name: "Movement 1",
		concept: {
			name: "Concept 1",
			id: "concept-1",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-1",
			className: "images__container__item__img",
			alt: "imagen 1",
		},
	},
	{
		name: "Movement 2",
		concept: {
			name: "Concept 2",
			id: "concept-2",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-2",
			className: "images__container__item__img",
			alt: "imagen 2",
		},
	},
	{
		name: "Movement 3",
		concept: {
			name: "Concept 3",
			id: "concept-3",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-3",
			className: "images__container__item__img",
			alt: "imagen 3",
		},
	},
	{
		name: "Movement 4",
		concept: {
			name: "Concept 4",
			id: "concept-4",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-4",
			className: "images__container__item__img",
			alt: "imagen 4",
		},
	},
	{
		name: "Movement 5",
		concept: {
			name: "Concept 5",
			id: "concept-5",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-5",
			className: "images__container__item__img",
			alt: "imagen 5",
		},
	},
	{
		name: "Movement 6",
		concept: {
			name: "Concept 6",
			id: "concept-6",
			className: "concepts__container__item__text",
		},
		image: {
			src: "https://th.bing.com/th/id/OIP.wO290Jy9XuTQhBSdZmgz3gHaE8?w=233&h=180&c=7&r=0&o=5&pid=1.7",
			id: "image-6",
			className: "images__container__item__img",
			alt: "imagen 6",
		},
	},
];

const shuffleArray = (arr) => {
	return arr.sort((a, b) => 0.5 - Math.random());
};

const movementsContainer = document.querySelector("#movements");
const conceptsContainer = document.querySelector("#concepts");
const imagesContainer = document.querySelector("#images");

const conceptsArray = [];
const imagesArray = [];
const answers = [];
const correctAnswers = [];

/* 

Tried to implement a stateful element in vanilla JS, it works, but not quite as
I expected, but I think it's worth it to have it here as a comment, for the moment

const useState = (defaultValue) => {
	let value = defaultValue;
	const getValue = () => {
		return value;
	}
	const setValue = (newValue) => (value = newValue);
	return [getValue, setValue];
};

const [disableButton, setDisableButton] = useState(true); */

const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");
submitButton.disabled = true;
resetButton.disabled = true;

const createElements = () => {
	movements.forEach((movement, i) => {
		const itemContainer = document.createElement("div");
		const innerItemContainer = document.createElement("div");
		const innerConceptsContainer = document.createElement("div");
		const innerImagesContainer = document.createElement("div");

		itemContainer.classList.add("movements__container__item");
		innerItemContainer.classList.add("movements__container__item__container");
		innerConceptsContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__concept",
		);
		innerConceptsContainer.id = `container-concept-${i + 1}`;
		innerImagesContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__image",
		);
		innerImagesContainer.id = `container-image-${i + 1}`;
		const title = document.createElement("h3");
		const conceptSubtitle = document.createElement("h4");
		const imageSubtitle = document.createElement("h4");

		title.classList.add("movements__title");
		title.innerText = movement.name;

		conceptSubtitle.classList.add("movements__subtitle", "concept__subtitle");
		conceptSubtitle.innerText = "Concept";
		imageSubtitle.classList.add("movements__subtitle", "image__subtitle");
		imageSubtitle.innerText = "Image";

		innerItemContainer.append(
			conceptSubtitle,
			imageSubtitle,
			innerConceptsContainer,
			innerImagesContainer,
		);

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

		concept.classList.add(shuffledConcepts[i].className);
		concept.innerText = shuffledConcepts[i].name;
		concept.id = shuffledConcepts[i].id;
		concept.draggable = true;

		image.classList.add(shuffledImages[i].className);
		image.src = shuffledImages[i].src;
		image.id = shuffledImages[i].id;
		image.alt = shuffledImages[i].alt;
		image.draggable = true;

		conceptItemContainer.append(concept);
		conceptsContainer.append(conceptItemContainer);
		imageItemContainer.append(image);
		imagesContainer.append(imageItemContainer);
	}
	handleEvents();
};

let startingDragTarget;

const dragStart = (e) => {
	startingDragTarget = e.target;
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dataTransfer.dropEffect = "move";
	e.target.classList.add("item-hold");
	setTimeout(() => e.target.classList.add("item-invisible"), 0);
};

const dragEnd = (e) => {
	e.target.classList.remove("invisible", "hold");
	e.target.className =
		e.target.nodeName !== "IMG"
			? "concepts__container__item__text"
			: "images__container__item__img";
};

const dragOver = (e) => {
	const className =
		e.target.nodeName === "DIV"
			? e.target.classList[1].split("__").slice(-1)[0]
			: undefined;

	if (!e.target.firstChild && className === startingDragTarget.id.split("-")[0])
		e.preventDefault();
	else {
		e.target.classList.remove("item-hovered");
	}
};

const dragEnter = (e) => {
	if (!e.target.firstChild) {
		e.preventDefault();
		e.target.classList.add("item-hovered");
	}
};

const dragLeave = (e) => {
	e.target.classList.remove("item-hovered");
};

const dragDrop = (e) => {
	e.preventDefault();
	e.target.classList.remove("item-hovered");

	const data = e.dataTransfer.getData("text/plain");
	const conceptId = document.getElementById(`concept-container-${data}`);
	const imageId = document.getElementById(`image-container-${data}`);

	answers.push(data);
	correctAnswers.push(e.target.id);

	e.target.append(document.getElementById(data));

	conceptId
		? conceptsContainer.removeChild(conceptId)
		: imageId
		? imagesContainer.removeChild(imageId)
		: null;

	const elements = document.querySelectorAll(
		".movements__container__item__drop",
	);

	const isFull = Array.from(elements).every((element) => {
		return element.firstChild;
	});

	const hasElements = Array.from(elements).some((element) => {
		return element.firstChild;
	});

	const submitButton = document.querySelector(".submit-button");
	const resetButton = document.querySelector(".reset-button");
	if (isFull) {
		submitButton.disabled = false;
	}
	if (hasElements) {
		Swal.fire({ title: "Hi" });
		resetButton.disabled = false;
	}
};

const submit = () => {
	const answerConcept = document.querySelectorAll(
		".movements__container__item__drop__concept",
	);
	const answerImage = document.querySelectorAll(
		".movements__container__item__drop__image",
	);

	for (let i = 0; i < correctAnswers.length; i++) {
		if (answers[i] === correctAnswers[i].split("-").slice(-2).join("-")) {
			console.log("the answers are correct");
			if (
				correctAnswers[i].split("-").slice(-2)[0].split("-")[0] === "concept"
			) {
				let conceptContainer = document.getElementById(correctAnswers[i]);
				conceptContainer.classList.add("item-correct");
			} else {
				let imageContainer = document.getElementById(correctAnswers[i]);
				imageContainer.classList.add("item-correct");
			}
		} else {
			console.log("the answers are incorrect");
			if (
				correctAnswers[i].split("-").slice(-2)[0].split("-")[0] === "concept"
			) {
				let conceptContainer = document.getElementById(correctAnswers[i]);
				conceptContainer.classList.add("item-incorrect");
			} else {
				let imageContainer = document.getElementById(correctAnswers[i]);
				imageContainer.classList.add("item-incorrect");
			}
		}
		let draggableElement = document.getElementById(answers[i]);
		draggableElement.draggable = false;
	}
};

const reset = () => {
	window.location.reload();
};

const handleEvents = () => {
	const conceptsContainer = document.querySelectorAll(
		".movements__container__item__drop__concept",
	);

	const imagesContainer = document.querySelectorAll(
		".movements__container__item__drop__image",
	);

	const concept = document.querySelectorAll(".concepts__container__item__text");
	const image = document.querySelectorAll(".images__container__item__img");

	for (let i = 0; i < concept.length; i++) {
		concept[i].addEventListener("dragstart", dragStart);
		concept[i].addEventListener("dragend", dragEnd);
		image[i].addEventListener("dragstart", dragStart);
		image[i].addEventListener("dragend", dragEnd);

		concept[i].removeEventListener("dragenter", dragEnter);
		concept[i].removeEventListener("dragleave", dragLeave);
		concept[i].removeEventListener("dragover", dragOver);
		concept[i].removeEventListener("drop", dragDrop);
		image[i].removeEventListener("dragenter", dragEnter);
		image[i].removeEventListener("dragleave", dragLeave);
		image[i].removeEventListener("dragover", dragOver);
		image[i].removeEventListener("drop", dragDrop);
	}

	for (let i = 0; i < conceptsContainer.length; i++) {
		conceptsContainer[i].addEventListener("dragover", dragOver);
		conceptsContainer[i].addEventListener("dragenter", dragEnter);
		conceptsContainer[i].addEventListener("dragleave", dragLeave);
		conceptsContainer[i].addEventListener("drop", dragDrop);
		imagesContainer[i].addEventListener("dragover", dragOver);
		imagesContainer[i].addEventListener("dragenter", dragEnter);
		imagesContainer[i].addEventListener("dragleave", dragLeave);
		imagesContainer[i].addEventListener("drop", dragDrop);
	}

	const checkButton = document.querySelector(".submit-button");
	const resetButton = document.querySelector(".reset-button");
	checkButton.addEventListener("click", submit);
	resetButton.addEventListener("click", reset);
};

createElements();
