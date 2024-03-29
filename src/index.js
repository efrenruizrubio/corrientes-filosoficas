import { movements } from "./movements.js";

const shuffleArray = (arr) => {
	return arr.sort(() => 0.5 - Math.random());
};

const movementsContainer = document.querySelector("#movements");
const conceptsContainer = document.querySelector("#concepts");
const imagesContainer = document.querySelector("#images");
const methodsContainer = document.querySelector("#methods");
const thesisContainer = document.querySelector("#thesis");

const conceptsArray = [];
const imagesArray = [];
const methodsArray = [];
const thesisArray = [];

const resetButton = document.querySelector(".reset-button");

resetButton.disabled = true;

const createElements = () => {
	movements.forEach((movement) => {
		const itemContainer = document.createElement("div");
		const innerItemContainer = document.createElement("div");

		const innerConceptsContainer = document.createElement("div");
		const innerImagesContainer = document.createElement("div");
		const innerMethodsContainer = document.createElement("div");
		const innerThesisContainer = document.createElement("div");

		itemContainer.classList.add("movements__container__item");
		innerItemContainer.classList.add("movements__container__item__container");

		innerConceptsContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__concept",
		);
		innerImagesContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__image",
		);
		innerMethodsContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__method",
		);
		innerThesisContainer.classList.add(
			"movements__container__item__drop",
			"movements__container__item__drop__thesis",
		);

		innerConceptsContainer.id = `container-concept-${movement.mainId}`;
		innerImagesContainer.id = `container-image-${movement.mainId}`;
		innerMethodsContainer.id = `container-method-${movement.mainId}`;
		innerThesisContainer.id = `container-thesis-${movement.mainId}`;

		const title = document.createElement("h3");

		const conceptSubtitle = document.createElement("h4");
		const imageSubtitle = document.createElement("h4");
		const methodSubtitle = document.createElement("h4");
		const thesisSubtitle = document.createElement("h4");

		title.classList.add("movements__title");
		title.innerText = movement.name;

		conceptSubtitle.classList.add("movements__subtitle", "concept__subtitle");
		imageSubtitle.classList.add("movements__subtitle", "image__subtitle");
		methodSubtitle.classList.add("movements__subtitle", "method__subtitle");
		thesisSubtitle.classList.add("movements__subtitle", "thesis__subtitle");

		conceptSubtitle.innerText = "Definición";
		imageSubtitle.innerText = "Representantes";
		methodSubtitle.innerText = "Método";
		thesisSubtitle.innerText = "Tesis";

		innerItemContainer.append(
			conceptSubtitle,
			imageSubtitle,
			innerConceptsContainer,
			innerImagesContainer,
			methodSubtitle,
			thesisSubtitle,
			innerMethodsContainer,
			innerThesisContainer,
		);

		conceptsArray.push(movement.concept);
		imagesArray.push(movement.image);
		methodsArray.push(movement.method);
		thesisArray.push(movement.thesis);

		itemContainer.append(title, innerItemContainer);
		movementsContainer.append(itemContainer);
	});

	const shuffledConcepts = shuffleArray(conceptsArray);
	const shuffledImages = shuffleArray(imagesArray);
	const shuffledMethods = shuffleArray(methodsArray);
	const shuffledThesis = shuffleArray(thesisArray);

	for (let i = 0; i < movements.length; i++) {
		const conceptItemContainer = document.createElement("div");
		const imageItemContainer = document.createElement("div");
		const innerImageItemContainer = document.createElement("div");
		const methodItemContainer = document.createElement("div");
		const thesisItemContainer = document.createElement("div");

		conceptItemContainer.classList.add("concepts__container__item");
		imageItemContainer.classList.add("images__container__item");
		methodItemContainer.classList.add("methods__container__item");
		thesisItemContainer.classList.add("thesis__container__item");

		conceptItemContainer.id = `concept-container-${shuffledConcepts[i].id}`;
		imageItemContainer.id = `image-container-${shuffledImages[i].id}`;
		methodItemContainer.id = `method-container-${shuffledMethods[i].id}`;
		thesisItemContainer.id = `thesis-container-${shuffledThesis[i].id}`;

		const concept = document.createElement("p");
		const image = document.createElement("div");
		const method = document.createElement("p");
		const thesis = document.createElement("p");

		concept.classList.add(shuffledConcepts[i].className);
		image.classList.add(shuffledImages[i].className);
		method.classList.add(shuffledMethods[i].className);
		thesis.classList.add(shuffledThesis[i].className);

		concept.innerText = shuffledConcepts[i].name;
		concept.id = shuffledConcepts[i].id;
		concept.draggable = true;

		innerImageItemContainer.classList.add(shuffledImages[i].containerClassName);
		innerImageItemContainer.id = shuffledImages[i].id;
		innerImageItemContainer.draggable = true;

		image.style.backgroundImage = `url(${shuffledImages[i].src})`;
		innerImageItemContainer.append(image);

		method.innerText = shuffledMethods[i].content;
		method.id = shuffledMethods[i].id;
		method.draggable = true;

		thesis.innerText = shuffledThesis[i].content;
		thesis.id = shuffledThesis[i].id;
		thesis.draggable = true;

		conceptItemContainer.append(concept);
		conceptsContainer.append(conceptItemContainer);
		imageItemContainer.append(innerImageItemContainer);
		imagesContainer.append(imageItemContainer);
		methodItemContainer.append(method);
		methodsContainer.append(methodItemContainer);
		thesisItemContainer.append(thesis);
		thesisContainer.append(thesisItemContainer);
	}
	if (window.innerWidth < 1024) {
		const droppableContainer = document.createElement("div");
		droppableContainer.classList.add("droppable__container");
		document.body.insertAdjacentElement("afterbegin", droppableContainer);
	}
	handleEvents();
};

let startingDragTarget;

const dragStart = (e) => {
	startingDragTarget = e.target;
	e.dataTransfer.setData("text/plain", e.target.id);
	e.dataTransfer.dropEffect = "move";
	setTimeout(() => e.target.classList.add("item-invisible"), 0);
	if (window.innerWidth < 1024) {
		const droppableContainer = document.querySelector(".droppable__container");
		if (!droppableContainer.firstElementChild) {
			movements.forEach((element) => {
				const droppableItem = document.createElement("div");
				const droppableItemDropZone = document.createElement("div");

				droppableItem.classList.add("droppable__container__item");
				droppableItemDropZone.classList.add(
					"droppable__container__item__dropzone",
				);
				droppableItemDropZone.id = `droppable-${element.mainId}`;
				droppableItemDropZone.addEventListener("dragover", dragOver);
				droppableItemDropZone.addEventListener("dragenter", dragEnter);
				droppableItemDropZone.addEventListener("dragleave", dragLeave);
				droppableItemDropZone.addEventListener("drop", dragDrop);

				const title = document.createElement("h3");
				title.classList.add("droppable__container__item-title");

				title.innerText = element.name;
				droppableItem.append(title);
				droppableItem.append(droppableItemDropZone);

				droppableContainer.append(droppableItem);
			});
		}
		if (window.innerWidth > window.innerHeight) {
			droppableContainer.classList.add("droppable__container--landscape");
		} else {
			droppableContainer.classList.remove("droppable__container--landscape");
		}
		droppableContainer.classList.toggle("droppable__container--open");
	} else {
		e.target.classList.add("item-hold");
	}
};

const dragEnd = (e) => {
	startingDragTarget.classList.add("dragging");
	e.target.classList.remove("invisible", "hold");
	const id = e.target.id.split("-")[0];
	e.target.className =
		id === "concept"
			? "concepts__container__item__text"
			: id === "image"
			? "images__container__item__inner-element"
			: id === "method"
			? "methods__container__item__text"
			: "thesis__container__item__text";

	const droppableContainer = document.querySelector(".droppable__container");
	if (droppableContainer) {
		droppableContainer.classList.toggle("droppable__container--open");
	}
};

const dragOver = (e) => {
	if (window.innerWidth < 1024) {
		e.preventDefault();
	}
	const idTarget = e.target.id.split("-").find((el) => {
		return (
			el === "concept" || el === "image" || el === "method" || el === "thesis"
		);
	});
	const idElement = startingDragTarget.id.split("-").find((el) => {
		return (
			el === "concept" || el === "image" || el === "method" || el === "thesis"
		);
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

	const elements = Array.from(
		document.querySelectorAll(".movements__container__item__drop"),
	);

	const data = e.dataTransfer.getData("text/plain");
	const element = document.getElementById(data);
	const conceptId = document.getElementById(`concept-container-${data}`);
	const imageId = document.getElementById(`image-container-${data}`);
	const methodId = document.getElementById(`method-container-${data}`);
	const thesisId = document.getElementById(`thesis-container-${data}`);

	e.target.classList.remove("item-hovered");

	const resetButton = document.querySelector(".reset-button");

	const targetElement =
		e.target.id.split("-")[0] === "droppable"
			? e.target.id.replace("droppable", `container-${data.split("-")[0]}`)
			: e.target.id;

	const targetContainer = document.getElementById(targetElement);

	if (!targetContainer.firstChild) {
		targetContainer.append(element);
	} else {
		const conceptItemsArray = Array.from(
			document.querySelectorAll(".concepts__container__item"),
		);
		const imageItemsArray = Array.from(
			document.querySelectorAll(".images__container__item"),
		);
		const methodItemsArray = Array.from(
			document.querySelectorAll(".methods__container__item"),
		);
		const thesisItemsArray = Array.from(
			document.querySelectorAll(".thesis__container__item"),
		);

		const itemContainer = conceptItemsArray.concat(
			imageItemsArray,
			methodItemsArray,
			thesisItemsArray,
		);

		const isInsideItems = itemContainer.some((el) => {
			return el.contains(element);
		});

		const childElement = !targetContainer.firstElementChild
			? targetContainer
			: targetContainer.firstElementChild;

		const parentElement = elements.find((el) => {
			return el.contains(childElement);
		});
		if (isInsideItems) {
			const optionElement = document.createElement("div");
			optionElement.append(childElement);
			const id = element.id.split("-")[0];
			if (id === "concept") {
				optionElement.classList.add("concepts__container__item");
				optionElement.id = `concept-container-${childElement.id}`;
				conceptsContainer.insertAdjacentElement("afterbegin", optionElement);
			} else if (id === "image") {
				optionElement.classList.add("images__container__item");
				optionElement.id = `image-container-${childElement.id}`;
				imagesContainer.insertAdjacentElement("afterbegin", optionElement);
			} else if (id === "method") {
				optionElement.classList.add("methods__container__item");
				optionElement.id = `method-container-${childElement.id}`;
				methodsContainer.insertAdjacentElement("afterbegin", optionElement);
			} else if (id === "thesis") {
				optionElement.classList.add("thesis__container__item");
				optionElement.id = `thesis-container-${childElement.id}`;
				thesisContainer.insertAdjacentElement("afterbegin", optionElement);
			}

			parentElement.append(element);
		} else {
			const parentOfDragged = elements.find((el) => {
				return el.contains(element);
			});

			if (element.id.split("-")[0] !== "image") {
				parentOfDragged.append(childElement);
				parentElement.append(element);
			} else {
				if (childElement.id) {
					parentOfDragged.append(childElement);
				} else {
					const imageElement = document.getElementById(targetElement);
					parentOfDragged.append(imageElement);
				}

				parentElement.append(element);
			}
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
		: methodId
		? methodsContainer.removeChild(methodId)
		: thesisId
		? thesisContainer.removeChild(thesisId)
		: null;

	const isFull = elements.every((element) => {
		return element.firstChild;
	});

	if (document.querySelector(".main__sections")) {
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

		if (!methodsContainer.firstElementChild) {
			const methodsTitle = document.getElementById("methods__title");
			const itemsContainer = document.querySelector(".main__sections");

			if (itemsContainer.contains(methodsTitle)) {
				itemsContainer.removeChild(methodsTitle);
			}
		}

		if (!thesisContainer.firstElementChild) {
			const thesisTitle = document.getElementById("thesis__title");
			const itemsContainer = document.querySelector(".main__sections");

			if (itemsContainer.contains(thesisTitle)) {
				itemsContainer.removeChild(thesisTitle);
			}
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
	Swal.fire({
		title: "¿Seguro que quieres reiniciar el juego?",
		html: `<span class="alert__text--confirm-reset">Al reiniciar el juego, perderás las respuestas ingresadas.</span>`,
		icon: "question",
		showCancelButton: true,
		background: "#0e1b33",
		confirmButtonText: "Sí, reiniciar juego.",
		confirmButtonColor: "red",
		cancelButtonText: "Cancelar",
		cancelButtonColor: "#009076",
		customClass: {
			title: "alert__title",
		},
		padding: "2rem",
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
		stopKeydownPropagation: false,
	}).then((result) => {
		if (result.isConfirmed) {
			history.scrollRestoration = "manual";
			window.location.reload();
		}
	});
};

const submit = () => {
	const answersConcepts = Array.from(
		document.querySelectorAll(".movements__container__item__drop__concept"),
	);
	const answersImages = Array.from(
		document.querySelectorAll(".movements__container__item__drop__image"),
	);

	const answersMethods = Array.from(
		document.querySelectorAll(".movements__container__item__drop__method"),
	);

	const answersThesis = Array.from(
		document.querySelectorAll(".movements__container__item__drop__thesis"),
	);

	const submitButton = document.querySelector(".submit-button");
	submitButton.disabled = true;

	const answersArray = answersConcepts.concat(
		answersImages,
		answersMethods,
		answersThesis,
	);

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

	const answersLength = answersArray.length;

	Swal.fire({
		title: "Resultado",
		html: `<span class="alert__text">Obtuviste <strong class=alert__result${
			correctAnswers.length > answersLength / 2 ? "--approved" : "--failed"
		}>${
			answersLength - wrongAnswers.length
		}</strong> respuesta(s) bien de ${answersLength}.</span>`,
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

	const methodsContainer = document.querySelectorAll(
		".movements__container__item__drop__method",
	);

	const thesisContainer = document.querySelectorAll(
		".movements__container__item__drop__thesis",
	);

	const concept = document.querySelectorAll(".concepts__container__item__text");
	const image = document.querySelectorAll(
		".images__container__item__inner-element",
	);
	const method = document.querySelectorAll(".methods__container__item__text");
	const thesis = document.querySelectorAll(".thesis__container__item__text");

	const titles = document.getElementsByClassName("section__title");

	Array.from(titles).forEach((el) => {
		el.addEventListener("click", () => {
			const element = document.getElementById(`${el.id.split("__")[0]}`);
			element.classList.toggle("section--hidden");
		});
	});

	for (let i = 0; i < movements.length; i++) {
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

		method[i].addEventListener("dragstart", dragStart);
		method[i].addEventListener("dragend", dragEnd);
		method[i].removeEventListener("dragenter", dragEnter);
		method[i].removeEventListener("dragleave", dragLeave);
		method[i].removeEventListener("dragover", dragOver);
		method[i].removeEventListener("drop", dragDrop);

		thesis[i].addEventListener("dragstart", dragStart);
		thesis[i].addEventListener("dragend", dragEnd);
		thesis[i].removeEventListener("dragenter", dragEnter);
		thesis[i].removeEventListener("dragleave", dragLeave);
		thesis[i].removeEventListener("dragover", dragOver);
		thesis[i].removeEventListener("drop", dragDrop);

		conceptsContainer[i].addEventListener("dragover", dragOver);
		conceptsContainer[i].addEventListener("dragenter", dragEnter);
		conceptsContainer[i].addEventListener("dragleave", dragLeave);
		conceptsContainer[i].addEventListener("drop", dragDrop);

		imagesContainer[i].addEventListener("dragover", dragOver);
		imagesContainer[i].addEventListener("dragenter", dragEnter);
		imagesContainer[i].addEventListener("dragleave", dragLeave);
		imagesContainer[i].addEventListener("drop", dragDrop);

		methodsContainer[i].addEventListener("dragover", dragOver);
		methodsContainer[i].addEventListener("dragenter", dragEnter);
		methodsContainer[i].addEventListener("dragleave", dragLeave);
		methodsContainer[i].addEventListener("drop", dragDrop);

		thesisContainer[i].addEventListener("dragover", dragOver);
		thesisContainer[i].addEventListener("dragenter", dragEnter);
		thesisContainer[i].addEventListener("dragleave", dragLeave);
		thesisContainer[i].addEventListener("drop", dragDrop);
	}

	if (window.innerWidth < 1024) {
		const alert = {
			title: "Alerta",
			text: "Por favor, rota tu dispositivo para una mejor experiencia",
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
		};

		if (screen.orientation.type.split("-")[0] === "landscape") {
			Swal.fire(alert);
		}
		window.screen.orientation.addEventListener("change", () => {
			if (screen.orientation.type.split("-")[0] === "landscape") {
				Swal.fire(alert);
			}
		});
	}

	const resetButton = document.querySelector(".reset-button");
	resetButton.addEventListener("click", reset);
};

createElements();
