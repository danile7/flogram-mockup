<script>
	import { fade } from 'svelte/transition';
</script>

<div
	class="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-40"
	transition:fade
>
	<div class="pl">
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__dot" />
		<div class="pl__text relative">
			<div class="loader" />
			<div
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white loading-text-flogram"
			>
				Flogram
			</div>
		</div>
	</div>
</div>

<style>
	.loading-text-flogram {
		text-shadow: 0px 0px 3px white, 0px 1px 3px rgba(255, 255, 255, 0.2);
	}

	.loader {
		width: 65px;
		height: 117px;
		position: relative;
	}

	.loader:before,
	.loader:after {
		content: '';
		position: absolute;
		inset: 0;
		background: #ff3c01;
		box-shadow: 0 0 0 50px;
		clip-path: polygon(100% 0, 10% 55%, 40% 55%, 0 100%, 83% 45%, 60% 45%, 73% 30%);
	}

	.loader:after {
		animation: l8 5s infinite;
		transform: perspective(300px) translateZ(0px);
	}

	@keyframes l8 {
		to {
			transform: perspective(300px) translateZ(180px);
			opacity: 0;
		}
	}

	* {
		border: 0;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.pl {
		box-shadow: 2em 0 2em rgba(0, 0, 0, 0.2) inset, -2em 0 2em rgba(255, 255, 255, 0.1) inset;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		transform: rotateX(30deg) rotateZ(45deg);
		width: 15em;
		height: 15em;
	}

	.pl,
	.pl__dot {
		border-radius: 50%;
	}

	.pl__dot {
		animation-name: shadow;
		box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.5);
		top: calc(50% - 0.75em);
		left: calc(50% - 0.75em);
		width: 1.5em;
		height: 1.5em;
	}

	.pl__dot,
	.pl__dot:before,
	.pl__dot:after {
		animation-duration: 2s;
		animation-iteration-count: infinite;
		position: absolute;
	}

	.pl__dot:before,
	.pl__dot:after {
		content: '';
		display: block;
		left: 0;
		width: inherit;
		transition: background-color 0.3s;
	}

	.pl__dot:before {
		animation-name: pushInOut1;
		background-color: #454954;
		border-radius: inherit;
		box-shadow: 0.05em 0 0.1em rgba(255, 255, 255, 0.2) inset;
		height: inherit;
		z-index: 1;
	}

	.pl__dot:after {
		animation-name: pushInOut2;
		background-color: #255ff4;
		border-radius: 0.75em;
		box-shadow: 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset, 0 -0.4em 0.2em #2e3138 inset,
			0 -1em 0.25em rgba(0, 0, 0, 0.3) inset;
		bottom: 0;
		clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
		height: 3em;
		transform: rotate(-45deg);
		transform-origin: 50% 2.25em;
	}

	.pl__dot:nth-child(1) {
		transform: rotate(0deg) translateX(5em) rotate(0deg);
		z-index: 5;
	}

	.pl__dot:nth-child(1),
	.pl__dot:nth-child(1):before,
	.pl__dot:nth-child(1):after {
		animation-delay: 0s;
	}

	.pl__dot:nth-child(2) {
		transform: rotate(-30deg) translateX(5em) rotate(30deg);
		z-index: 4;
	}

	.pl__dot:nth-child(2),
	.pl__dot:nth-child(2):before,
	.pl__dot:nth-child(2):after {
		animation-delay: -0.16667s;
	}

	.pl__dot:nth-child(3) {
		transform: rotate(-60deg) translateX(5em) rotate(60deg);
		z-index: 3;
	}

	.pl__dot:nth-child(3),
	.pl__dot:nth-child(3):before,
	.pl__dot:nth-child(3):after {
		animation-delay: -0.33333s;
	}

	.pl__dot:nth-child(4) {
		transform: rotate(-90deg) translateX(5em) rotate(90deg);
		z-index: 2;
	}

	.pl__dot:nth-child(4),
	.pl__dot:nth-child(4):before,
	.pl__dot:nth-child(4):after {
		animation-delay: -0.5s;
	}

	.pl__dot:nth-child(5) {
		transform: rotate(-120deg) translateX(5em) rotate(120deg);
		z-index: 1;
	}

	.pl__dot:nth-child(5),
	.pl__dot:nth-child(5):before,
	.pl__dot:nth-child(5):after {
		animation-delay: -0.66667s;
	}

	.pl__dot:nth-child(6) {
		transform: rotate(-150deg) translateX(5em) rotate(150deg);
		z-index: 1;
	}

	.pl__dot:nth-child(6),
	.pl__dot:nth-child(6):before,
	.pl__dot:nth-child(6):after {
		animation-delay: -0.83333s;
	}

	.pl__dot:nth-child(7) {
		transform: rotate(-180deg) translateX(5em) rotate(180deg);
		z-index: 2;
	}

	.pl__dot:nth-child(7),
	.pl__dot:nth-child(7):before,
	.pl__dot:nth-child(7):after {
		animation-delay: -1s;
	}

	.pl__dot:nth-child(8) {
		transform: rotate(-210deg) translateX(5em) rotate(210deg);
		z-index: 3;
	}

	.pl__dot:nth-child(8),
	.pl__dot:nth-child(8):before,
	.pl__dot:nth-child(8):after {
		animation-delay: -1.16667s;
	}

	.pl__dot:nth-child(9) {
		transform: rotate(-240deg) translateX(5em) rotate(240deg);
		z-index: 4;
	}

	.pl__dot:nth-child(9),
	.pl__dot:nth-child(9):before,
	.pl__dot:nth-child(9):after {
		animation-delay: -1.33333s;
	}

	.pl__dot:nth-child(10) {
		transform: rotate(-270deg) translateX(5em) rotate(270deg);
		z-index: 5;
	}

	.pl__dot:nth-child(10),
	.pl__dot:nth-child(10):before,
	.pl__dot:nth-child(10):after {
		animation-delay: -1.5s;
	}

	.pl__dot:nth-child(11) {
		transform: rotate(-300deg) translateX(5em) rotate(300deg);
		z-index: 6;
	}

	.pl__dot:nth-child(11),
	.pl__dot:nth-child(11):before,
	.pl__dot:nth-child(11):after {
		animation-delay: -1.66667s;
	}

	.pl__dot:nth-child(12) {
		transform: rotate(-330deg) translateX(5em) rotate(330deg);
		z-index: 6;
	}

	.pl__dot:nth-child(12),
	.pl__dot:nth-child(12):before,
	.pl__dot:nth-child(12):after {
		animation-delay: -1.83333s;
	}

	.pl__text {
		font-size: 0.75em;
		max-width: 5rem;
		position: relative;
		text-shadow: 0 0 0.1em rgba(227, 228, 232, 0.5);
		transform: rotateZ(-45deg);
	}

	/* Animations */
	@keyframes shadow {
		from {
			animation-timing-function: ease-in;
			box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
		}
		25% {
			animation-timing-function: ease-out;
			box-shadow: 0.1em 0.1em 0 0.1em black, 0.8em 0 0.8em rgba(0, 0, 0, 0.5);
		}
		50%,
		to {
			box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
		}
	}

	@keyframes pushInOut1 {
		from {
			animation-timing-function: ease-in;
			background-color: #454954;
			transform: translate(0, 0);
		}
		25% {
			animation-timing-function: ease-out;
			background-color: #5583f6;
			transform: translate(-71%, -71%);
		}
		50%,
		to {
			background-color: #454954;
			transform: translate(0, 0);
		}
	}

	@keyframes pushInOut2 {
		from {
			animation-timing-function: ease-in;
			background-color: #454954;
			clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
		}
		25% {
			animation-timing-function: ease-out;
			background-color: #255ff4;
			clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
		}
		50%,
		to {
			background-color: #454954;
			clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
		}
	}
</style>
