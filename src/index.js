const movements = [
	{
		name: "Movement 1",
		concept: {
			name: "Concept 1",
			id: "concept-1",
			className: "concepts__container__item__text",
		},
		image: {
			src: "/assets/images/therapy.jpg",
			id: "image-1",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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
			src: "/assets/images/therapy.jpg",
			id: "image-2",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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
			src: "/assets/images/therapy.jpg",
			id: "image-3",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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
			src: "/assets/images/therapy.jpg",
			id: "image-4",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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
			src: "/assets/images/therapy.jpg",
			id: "image-5",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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
			src: "/assets/images/therapy.jpg",
			id: "image-6",
			containerClassName: "images__container__item__inner-element",
			className: "images__container__item__img",
			width: "233",
			height: "180",
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

/* window.addEventListener("resize", () => {
	const conceptsTitle = document.getElementById("concepts__title");
	const imagesTitle = document.getElementById("images__title");

	if (window.innerWidth >= 1440) {
		if (
			conceptsContainer.contains(conceptsTitle) ||
			imagesContainer.contains(imagesTitle)
		) {
			conceptsContainer.removeChild(conceptsTitle);
			conceptsContainer.insertAdjacentElement("beforebegin", conceptsTitle);
			imagesContainer.removeChild(imagesTitle);
			imagesContainer.insertAdjacentElement("beforebegin", imagesTitle);
		}
	} else {
		conceptsContainer.firstElementChild
			? conceptsContainer.insertAdjacentElement("afterbegin", conceptsTitle)
			: null;
		imagesContainer.firstElementChild
			? imagesContainer.insertAdjacentElement("afterbegin", imagesTitle)
			: null;
	}
});

if (window.innerWidth > 1440) {
	const conceptsTitle = document.getElementById("concepts__title");
	const imagesTitle = document.getElementById("images__title");

	conceptsContainer.removeChild(conceptsTitle);
	conceptsContainer.insertAdjacentElement("beforebegin", conceptsTitle);
	imagesContainer.removeChild(imagesTitle);
	imagesContainer.insertAdjacentElement("beforebegin", imagesTitle);
}
 */
const conceptsArray = [];
const imagesArray = [];

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

const resetButton = document.querySelector(".reset-button");

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
		const innerImageItemContainer = document.createElement("div");

		conceptItemContainer.classList.add("concepts__container__item");
		conceptItemContainer.id = `concept-container-${shuffledConcepts[i].id}`;

		imageItemContainer.classList.add("images__container__item");
		imageItemContainer.id = `image-container-${shuffledImages[i].id}`;

		const concept = document.createElement("p");
		const image = document.createElement("div");

		concept.classList.add(shuffledConcepts[i].className);
		concept.innerText = shuffledConcepts[i].name;
		concept.id = shuffledConcepts[i].id;
		concept.draggable = true;

		image.style.backgroundImage = `url(${shuffledImages[i].src})`;
		image.classList.add(shuffledImages[i].className);

		innerImageItemContainer.classList.add(shuffledImages[i].containerClassName);
		innerImageItemContainer.id = shuffledImages[i].id;
		innerImageItemContainer.draggable = true;
		innerImageItemContainer.append(image);

		conceptItemContainer.append(concept);
		conceptsContainer.append(conceptItemContainer);
		imageItemContainer.append(innerImageItemContainer);
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
		e.target.nodeName === "P"
			? "concepts__container__item__text"
			: "images__container__item__inner-element";
};

const dragOver = (e) => {
	const idTarget = e.target.id.split("-").find((el) => {
		return el === "concept" || el === "image";
	});
	const idElement = startingDragTarget.id.split("-").find((el) => {
		return el === "concept" || el === "image";
	});

	if (e.target.firstChild !== startingDragTarget && idTarget === idElement) {
		e.preventDefault();
	} else {
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

	const elements = Array.from(
		document.querySelectorAll(".movements__container__item__drop"),
	);

	const data = e.dataTransfer.getData("text/plain");
	const element = document.getElementById(data);
	const conceptId = document.getElementById(`concept-container-${data}`);
	const imageId = document.getElementById(`image-container-${data}`);

	const resetButton = document.querySelector(".reset-button");

	if (!e.target.firstChild) {
		e.target.append(element);
	} else {
		const conceptItemsArray = Array.from(
			document.querySelectorAll(".concepts__container__item"),
		);
		const imageItemsArray = Array.from(
			document.querySelectorAll(".images__container__item"),
		);
		const itemContainer = conceptItemsArray.concat(imageItemsArray);

		const isInsideItems = itemContainer.some((el) => {
			return el.contains(element);
		});

		const childElement = document.getElementById(e.target.id);
		const parentElement = elements.find((el) => {
			return el.firstChild === childElement;
		});

		if (isInsideItems) {
			const optionElement = document.createElement("div");
			optionElement.append(childElement);

			if (element.nodeName === "P") {
				optionElement.classList.add("concepts__container__item");
				optionElement.id = `concept-container-${childElement.id}`;
				if (window.innerWidth < 1440) {
					const conceptTitle = document.getElementById("concepts__title");
					conceptTitle.insertAdjacentElement("afterend", optionElement);
				} else {
					conceptsContainer.insertAdjacentElement("afterbegin", optionElement);
				}
			} else {
				optionElement.classList.add("images__container__item");
				optionElement.id = `image-container-${childElement.id}`;
				if (window.innerWidth < 1440) {
					const imageTitle = document.getElementById("images__title");
					imageTitle.insertAdjacentElement("afterend", optionElement);
				} else {
					imagesContainer.insertAdjacentElement("afterbegin", optionElement);
				}
			}

			parentElement.append(element);
		} else {
			const parentTarget = elements.find((el) => {
				return el.firstChild === element;
			});

			const childTarget = parentTarget.firstChild;
			parentElement.append(childTarget);
			parentTarget.append(childElement);
		}
	}

	const hasElements = elements.some((element) => {
		return element.firstChild;
	});

	if (hasElements) {
		resetButton.disabled = false;
	}

	conceptId
		? conceptsContainer.removeChild(conceptId)
		: imageId
		? imagesContainer.removeChild(imageId)
		: null;

	const isFull = elements.every((element) => {
		return element.firstChild;
	});

	if (!conceptsContainer.firstElementChild) {
		const conceptsTitle = document.getElementById("concepts__title");
		const itemsContainer = document.querySelector(".main__sections");

		if (itemsContainer.contains(conceptsTitle)) {
			itemsContainer.removeChild(conceptsTitle);
		}
	}

	if (!imagesContainer.firstElementChild) {
		const imagesTitle = document.getElementById("images__title");
		const itemsContainer = document.querySelector(".main__sections");

		if (itemsContainer.contains(imagesTitle)) {
			itemsContainer.removeChild(imagesTitle);
		}
	}

	if (isFull) {
		if (!document.querySelector(".submit-button")) {
			const main = document.querySelector(".main");
			const mainSections = document.querySelector(".main__sections");
			const submitButton = document.createElement("button");

			submitButton.type = "button";
			submitButton.classList.add("button", "submit-button");
			submitButton.innerText = "Comprobar respuestas";

			resetButton.insertAdjacentElement("beforebegin", submitButton);
			submitButton.addEventListener("click", submit);

			main.removeChild(mainSections);
		}
	}
};

const reset = () => {
	history.scrollRestoration = "manual";
	window.location.reload();
};

const submit = () => {
	const answersConcepts = Array.from(
		document.querySelectorAll(".movements__container__item__drop__concept"),
	);
	const answersImages = Array.from(
		document.querySelectorAll(".movements__container__item__drop__image"),
	);

	const submitButton = document.querySelector(".submit-button");
	submitButton.disabled = true;

	const answersArray = answersConcepts.concat(answersImages);

	answersArray.forEach((el) => {
		let id = el.id.split("-").slice(-2).join("-");
		if (el.firstChild?.id === id) {
			el.classList.add("item-correct");
		} else {
			el.classList.add("item-incorrect");
		}
		el.firstChild.draggable = false;
		el.firstChild.style.cursor = "default";
	});

	const correctAnswers = Array.from(document.querySelectorAll(".item-correct"));
	const wrongAnswers = Array.from(document.querySelectorAll(".item-incorrect"));

	Swal.fire({
		title: "Resultado",
		html: `<span class="alert__text">Obtuviste <strong class=alert__result${
			correctAnswers.length > 6 ? "--approved" : "--failed"
		}>${12 - wrongAnswers.length}</strong> respuesta(s) bien de 12</span>`,
		icon:
			correctAnswers.length === 12
				? "success"
				: correctAnswers.length === 0
				? "error"
				: "info",
		background: "#0e1b33",
		confirmButtonText: "Cerrar",
		customClass: {
			title: "alert__title",
		},
		padding: "2rem",
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
		stopKeydownPropagation: false,
	});
};

const handleEvents = () => {
	const conceptsContainer = document.querySelectorAll(
		".movements__container__item__drop__concept",
	);

	const imagesContainer = document.querySelectorAll(
		".movements__container__item__drop__image",
	);

	const concept = document.querySelectorAll(".concepts__container__item__text");
	const image = document.querySelectorAll(
		".images__container__item__inner-element",
	);

	for (let i = 0; i < concept.length; i++) {
		concept[i].addEventListener("dragstart", dragStart);
		concept[i].addEventListener("dragend", dragEnd);
		concept[i].removeEventListener("dragenter", dragEnter);
		concept[i].removeEventListener("dragleave", dragLeave);
		concept[i].removeEventListener("dragover", dragOver);
		concept[i].removeEventListener("drop", dragDrop);

		image[i].addEventListener("dragstart", dragStart);
		image[i].addEventListener("dragend", dragEnd);
		image[i].removeEventListener("dragenter", dragEnter);
		image[i].removeEventListener("dragleave", dragLeave);
		image[i].removeEventListener("dragover", dragOver);
		image[i].removeEventListener("drop", dragDrop);

		image[i].addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});
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
	const resetButton = document.querySelector(".reset-button");
	resetButton.addEventListener("click", reset);
};

createElements();
