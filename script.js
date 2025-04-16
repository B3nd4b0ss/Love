document.addEventListener('DOMContentLoaded', function () {
	// DOM Elements
	const acceptBtn = document.getElementById('accept-btn');
	const declineBtn = document.getElementById('decline-btn');
	const proposalText = document.querySelector('.proposal-text');
	const calendarContainer = document.getElementById('calendar-container');
	const datePicker = document.getElementById('date-picker');
	const confirmDateBtn = document.getElementById('confirm-date');
	const initialButtons = document.getElementById('initial-buttons');
	const gifContainer = document.getElementById('gifContainer');
	const gifContainer2 = document.getElementById('gifContainer2');
	const heartCursor = document.getElementById('heart-cursor');
	const confettiContainer = document.querySelector('.confetti-container');

	// State variables
	let enthusiasmLevel = 1;
	let sadnessLevel = 0;
	let noButtonClicked = 0;
	const rejectionPhrases = [
		'Are you sure?',
		'Maybe reconsider?',
		"I'll be sad...",
		'My heart is breaking...',
		'Why are you doing this?',
		'Please give me a chance...',
		"I'll cry myself to sleep...",
		'This is the worst day ever...',
		'My life has no meaning now...',
		"I'll never love again...",
	];

	// Initialize date picker
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	datePicker.min = tomorrow.toISOString().split('T')[0];

	// Dropdown functionality - Improved
	function setupDropdowns() {
		document.querySelectorAll('.select-box').forEach((selectBox) => {
			selectBox.addEventListener('click', function (e) {
				e.stopPropagation();
				const parent = this.parentElement;
				const checkboxes = parent.querySelector('.checkboxes');

				// Close all other dropdowns
				document.querySelectorAll('.checkboxes').forEach((box) => {
					if (box !== checkboxes) {
						box.classList.remove('visible');
						box.previousElementSibling.classList.remove('active');
					}
				});

				// Toggle current dropdown
				const isOpening = !this.classList.contains('active');
				this.classList.toggle('active');

				if (isOpening) {
					// Opening dropdown - show border
					checkboxes.classList.add('visible');
					checkboxes.style.border = '2px solid var(--pink-medium)';
					checkboxes.style.borderTop = 'none';
					checkboxes.classList.remove('hidden');
					this.style.borderRadius = '8px 8px 0 0';
				} else {
					// Closing dropdown - hide border
					checkboxes.classList.remove('visible');
					checkboxes.style.border = 'none';
					this.style.borderRadius = '8px';
					checkboxes.classList.add('hidden');
				}
			});
		});

		// Close dropdowns when clicking outside
		document.addEventListener('click', function (e) {
			if (!e.target.closest('.dropdown-multiselect')) {
				document.querySelectorAll('.checkboxes').forEach((box) => {
					box.classList.remove('visible');
					box.style.border = 'none'; // Hide border when closing
					box.previousElementSibling.classList.remove('active');
					box.previousElementSibling.style.borderRadius = '8px';
				});
			}
		});

		// Prevent dropdown from closing when clicking inside
		document.querySelectorAll('.checkboxes').forEach((box) => {
			box.addEventListener('click', function (e) {
				e.stopPropagation();
			});
		});

		// Update selected text when checkboxes change
		document
			.querySelectorAll('.checkboxes input[type="checkbox"]')
			.forEach((checkbox) => {
				checkbox.addEventListener('change', function () {
					const dropdown = this.closest('.dropdown-multiselect');
					const selectedBox =
						dropdown.querySelector('.select-box span');
					const checkboxes = dropdown.querySelectorAll(
						'input[type="checkbox"]:checked'
					);

					if (checkboxes.length > 2) {
						selectedBox.textContent = `${checkboxes.length} selected`;
					} else if (checkboxes.length) {
						selectedBox.textContent = Array.from(checkboxes)
							.map((cb) => cb.value)
							.join(', ');
					} else {
						selectedBox.textContent = 'Select options';
					}
				});
			});

		// Update selected text when checkboxes change
		document
			.querySelectorAll('.checkboxes input[type="checkbox"]')
			.forEach((checkbox) => {
				checkbox.addEventListener('change', function () {
					const dropdown = this.closest('.dropdown-multiselect');
					const selectedBox =
						dropdown.querySelector('.select-box span');
					const checkboxes = dropdown.querySelectorAll(
						'input[type="checkbox"]:checked'
					);

					if (checkboxes.length > 2) {
						selectedBox.textContent = `${checkboxes.length} selected`;
					} else if (checkboxes.length) {
						selectedBox.textContent = Array.from(checkboxes)
							.map((cb) => cb.value)
							.join(', ');
					} else {
						selectedBox.textContent = this.closest(
							'.dropdown-multiselect'
						)
							.querySelector('label')
							.textContent.replace(':', '');
					}
				});
			});

		// Prevent dropdown from closing when clicking inside
		document.querySelectorAll('.checkboxes').forEach((box) => {
			box.addEventListener('click', function (e) {
				e.stopPropagation();
			});
		});
	}

	// Decline button behavior
	function handleDeclineButton() {
		declineBtn.addEventListener('click', function () {
			noButtonClicked++;
			sadnessLevel++;

			if (sadnessLevel <= rejectionPhrases.length) {
				this.textContent = rejectionPhrases[sadnessLevel - 1];
			}

			const shrinkFactor = 1 - sadnessLevel * 0.05;
			this.style.transform = `scale(${Math.max(0.1, shrinkFactor)})`;

			enthusiasmLevel += 0.2;
			acceptBtn.style.transform = `scale(${enthusiasmLevel})`;

			if (sadnessLevel >= 10) {
				this.style.transform = 'scale(0.05)';
				this.style.pointerEvents = 'auto';
				acceptBtn.style.transform = 'scale(1)';
				proposalText.innerHTML = `Will you go on a date with me? <br> What are you gonna do now?`;
				moveButtonToLastPosition(this);
			} else {
				moveButtonToSafePosition(this);
			}

			if (
				noButtonClicked > 10 &&
				this.style.transform === 'scale(0.05)'
			) {
				proposalText.innerHTML = `You really don't want to go on a date with me?`;
				acceptBtn.innerHTML = `<i class="fas fa-heart"></i> No I was just kidding, I would love to go on a date with you ❤️`;
				showGif(gifContainer, 'assets/1NSK.gif', 'Sad reaction');
				this.classList.add('hidden');
			}
		});
	}

	// Accept button behavior
	function handleAcceptButton() {
		acceptBtn.addEventListener('click', function () {
			hideGifs();
			showGif(gifContainer2, 'assets/3Y0.gif', 'Happy reaction');

			// Remove 'hidden' class and set display to block
			calendarContainer.classList.remove('hidden');
			calendarContainer.style.display = 'block';

			// Add a fade-in animation
			calendarContainer.style.animation = 'fadeIn 0.5s ease';

			initialButtons.style.display = 'none';
			proposalText.textContent = "I'm so happy! ❤️";
			createConfetti();
			showHeartCursor();
		});
	}

	// Confirm date button
	function handleConfirmDate() {
		confirmDateBtn.addEventListener('click', function () {
			const selectedDateValue = datePicker.value;
			const selectedFoods = getSelectedOptions('food-options');
			const selectedActivities = getSelectedOptions('activity-options');

			if (!selectedDateValue) {
				showError('Please select a date first!');
				return;
			}

			const formattedDate = formatDate(selectedDateValue);
			sendWhatsAppMessage(
				formattedDate,
				selectedFoods,
				selectedActivities
			);

			proposalText.textContent = `Yay! See you on ${formattedDate}! ❤️`;
			calendarContainer.style.display = 'none';
		});
	}

	// Helper functions
	function moveButtonToSafePosition(button) {
		const padding = 20;
		const buttonWidth = button.offsetWidth;
		const buttonHeight = button.offsetHeight;
		const maxX = window.innerWidth - buttonWidth - padding;
		const maxY = window.innerHeight - buttonHeight - padding;
		const yesRect = acceptBtn.getBoundingClientRect();
		let randX, randY, overlap;

		do {
			randX = Math.floor(Math.random() * (maxX - padding) + padding);
			randY = Math.floor(Math.random() * (maxY - padding) + padding);
			overlap = !(
				randX + buttonWidth < yesRect.left ||
				randX > yesRect.right ||
				randY + buttonHeight < yesRect.top ||
				randY > yesRect.bottom
			);
		} while (overlap);

		button.style.position = 'fixed';
		button.style.left = `${randX}px`;
		button.style.top = `${randY}px`;
		button.style.zIndex = '1000';
	}

	function moveButtonToLastPosition(button) {
		const maxX = window.innerWidth - button.offsetWidth;
		const maxY = window.innerHeight - button.offsetHeight;
		const randX = Math.floor(Math.random() * maxX);
		const randY = Math.floor(Math.random() * maxY);
		button.style.position = 'fixed';
		button.style.left = `${randX}px`;
		button.style.top = `${randY}px`;
		button.style.zIndex = '1000';
	}

	function showGif(container, gifSrc, altText) {
		container.innerHTML = `<img src="${gifSrc}" alt="${altText}" class="gif-image">`;
		container.classList.remove('hidden');
		container.style.display = 'block';
		document.querySelector('.content-container').appendChild(container);
	}

	function hideGifs() {
		gifContainer.style.display = 'none';
		gifContainer2.style.display = 'none';
	}

	function showHeartCursor() {
		heartCursor.style.display = 'block';
		setTimeout(() => {
			heartCursor.style.display = 'none';
		}, 3000);
	}

	function createConfetti() {
		for (let i = 0; i < 100; i++) {
			const confetti = document.createElement('div');
			confetti.className = 'confetti';
			confetti.style.left = `${Math.random() * 100}vw`;
			confetti.style.backgroundColor = getRandomColor();
			confetti.style.animation = `fall ${
				Math.random() * 3 + 2
			}s linear forwards`;
			confetti.style.setProperty(
				'--random-x',
				`${Math.random() * 200 - 100}px`
			);
			confettiContainer.appendChild(confetti);

			setTimeout(() => {
				confetti.remove();
			}, 5000);
		}
	}

	function getRandomColor() {
		const colors = ['#ff4d6d', '#4cc9f0', '#7209b7', '#ffd166', '#06d6a0'];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function showError(message) {
		const errorElement = document.createElement('div');
		errorElement.className = 'error-message';
		errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

		const existingError = document.querySelector('.error-message');
		if (existingError) {
			existingError.remove();
		}

		calendarContainer.appendChild(errorElement);

		setTimeout(() => {
			errorElement.style.opacity = '0';
			setTimeout(() => errorElement.remove(), 300);
		}, 3000);
	}

	function getSelectedOptions(containerId) {
		return Array.from(
			document.querySelectorAll(
				`#${containerId} input[type="checkbox"]:checked`
			)
		).map((cb) => cb.value);
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	}

	function sendWhatsAppMessage(date, foods, activities) {
		const foodText = foods.length ? foods.join(' and ') : 'Surprise me!';
		const activityText = activities.length
			? activities.join(' and ')
			: 'Something fun';

		const message = `Hey my love, I picked this date for us: ${date} \nLet's eat: ${foodText} \nLet's do: ${activityText} `;
		const encodedMessage = encodeURIComponent(message);

		const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
		window.open(whatsappUrl, '_blank').focus();
	}

	// Heart cursor follow
	document.addEventListener('mousemove', (e) => {
		if (heartCursor.style.display === 'block') {
			heartCursor.style.left = `${e.clientX}px`;
			heartCursor.style.top = `${e.clientY}px`;
		}
	});

	// Initialize all functionality
	setupDropdowns();
	handleDeclineButton();
	handleAcceptButton();
	handleConfirmDate();
});
