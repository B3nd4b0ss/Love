const CONFIG = {
	WHATSAPP_NUMBER: '41764056533',
	GIFS: {
		SAD: 'assets/1NSK.gif',
		HAPPY: 'assets/3Y0.gif',
	},
	DEFAULT_DATE_OFFSET: 1,
};

// Add confetti styles dynamically
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh) translateX(var(--random-x));
    }
}

.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -10px;
    opacity: 1;
    border-radius: 2px;
}
`;
document.head.appendChild(style);
