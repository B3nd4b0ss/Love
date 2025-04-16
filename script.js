document.addEventListener('DOMContentLoaded', function () {
	const acceptBtn = document.getElementById('accept-btn');
	const declineBtn = document.getElementById('decline-btn');
	const proposalText = document.querySelector('.proposal-text');
	const calendarContainer = document.getElementById('calendar-container');
	const datePicker = document.getElementById('date-picker');
	const confirmDateBtn = document.getElementById('confirm-date');
	const initialButtons = document.getElementById('initial-buttons');
	const gifContainer = document.createElement('div'); // To hold the GIFs
	const gifContainer2 = document.createElement('div'); // To hold the 3Y0.gif
	document.body.appendChild(gifContainer); // Append gifContainer to body
	document.body.appendChild(gifContainer2); // Append gifContainer2 to body

	let enthusiasmLevel = 1;
	let sadnessLevel = 0;
	let noButtonClicked = 0; // Track how many times the no button has been clicked
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

	// Set minimum date to today
	const today = new Date().toISOString().split('T')[0];
	datePicker.min = today;

	// Make decline button shrink and move when clicked
	declineBtn.addEventListener('click', function () {
		noButtonClicked++; // Increase click count

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

			// Update the text after 10 clicks
			proposalText.innerHTML = `Will you go on a date with me? <br> What are you gonna do now?`;

			// Move to last position after 10 clicks
			moveButtonToLastPosition(this);
		} else {
			moveButtonToSafePosition(this);
		}

		// If "No" button has been clicked more than 10 times and is very small
		if (noButtonClicked > 10 && this.style.transform === 'scale(0.05)') {
			// Display the message: "You really don't want to go on a date with me?"
			proposalText.innerHTML = `You really don't want to go on a date with me?`;
			acceptBtn.innerText = `No I was just kidding, I would love to go on a date with you ❤️`;
			showFirstGif(); // Show the "No" GIF
		}
	});

	confirmDateBtn.addEventListener('click', function () {
		if (datePicker.value) {
			const selectedDate = new Date(datePicker.value);

			// Format as DD.MM.YYYY
			const day = selectedDate.getDate().toString().padStart(2, '0');
			const month = (selectedDate.getMonth() + 1)
				.toString()
				.padStart(2, '0');
			const year = selectedDate.getFullYear();
			const formattedDate = `${day}.${month}.${year}`;

			// WhatsApp message
			const message = `Hey my love, I picked this date for us: ${formattedDate}`;
			const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
				message
			)}`;

			// Redirect to WhatsApp
			window.location.href = whatsappUrl;

			// Update on screen text (optional)
			proposalText.textContent = `Yay! See you on ${formattedDate}! ❤️`;
			calendarContainer.classList.add('hidden');
		} else {
			alert('Please select a date first!');
		}
	});

	// Utility: Move button to non-overlapping and visible random position
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

		randX = Math.max(padding, Math.min(randX, maxX));
		randY = Math.max(padding, Math.min(randY, maxY));

		button.style.position = 'fixed';
		button.style.left = `${randX}px`;
		button.style.top = `${randY}px`;

		// Ensure buttons are always on top of other elements, such as <h1>
		button.style.zIndex = 1000; // Set z-index for visibility above other elements
	}

	// Move button to a last different position after 10 clicks
	function moveButtonToLastPosition(button) {
		const maxX = window.innerWidth - button.offsetWidth;
		const maxY = window.innerHeight - button.offsetHeight;
		const randX = Math.floor(Math.random() * maxX);
		const randY = Math.floor(Math.random() * maxY);

		button.style.position = 'fixed';
		button.style.left = `${randX}px`;
		button.style.top = `${randY}px`;

		// Ensure buttons are always on top of other elements, such as <h1>
		button.style.zIndex = 1000; // Set z-index for visibility above other elements
	}

	// Show GIF after the "No" button becomes really small and clicked more than 10 times
	// Function to show the first GIF (480x360px)
	function showFirstGif() {
		declineBtn.style.display = 'none';
		gifContainer.innerHTML = `
        <iframe src="1NSK.gif" width="480" height="360"></iframe>
    `;
		gifContainer.style.display = 'block';
	}

	// Function to show the second GIF (263x321px)
	function showSecondGif() {
		gifContainer2.innerHTML = `
        <iframe src="3Y0.gif" width="264" height="322"></iframe>
    `;
		gifContainer2.style.display = 'block';
	}

	// Function to hide the previous GIF
	function hidePreviousGif() {
		gifContainer.style.display = 'none';
		gifContainer2.style.display = 'none';
	}
});
