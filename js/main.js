const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

const prveBtn = document.getElementById('acer-carousel__left-btan');
const nextBtn = document.getElementById('acer-carousel__right-btan');



const dotsNav = document.querySelector('.acer-carousel__nav');
const dots = Array.from(dotsNav.children);
console.log(dots);



const slideWidth  = slides[0].getBoundingClientRect().width;

// arrange the slides next one to another
const slidePosition = function(el,i) {
	el.style.left = slideWidth * i + 'px';
}
slides.forEach(slidePosition); 

const moveToSlide = (track, currentSlide, targetSlide) => {
		track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
		currentSlide.classList.remove('current-slide');
		targetSlide.classList.add('current-slide');
	}


const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('curr-slide');
	targetDot.classList.add('curr-slide');
}



const hideShowArrows = (slides, prveBtn, nextBtn, targetIndex) =>{
	if(targetIndex === 0) {
		prveBtn.classList.add('is-hidden');
		nextBtn.classList.remove('is-hidden');
	} else if (targetIndex === slides.length - 1){
		prveBtn.classList.remove('is-hidden');
		nextBtn.classList.add("is-hidden");
	} else {
		prveBtn.classList.remove('is-hidden');
		nextBtn.classList.remove('is-hidden');
	}
}

// When I click left, move slides to the left

prveBtn.addEventListener('click', e=> {
	const currentSlide = track.querySelector('.current-slide');
	const prevSlide = currentSlide.previousElementSibling;
	const currentDot = dotsNav.querySelector('.curr-slide');
	const prevDot = currentDot.previousElementSibling;
	const prevIndex = slides.findIndex(slide => slide === prevSlide);

	moveToSlide(track,currentSlide,prevSlide);
	updateDots(currentDot, prevDot);
	hideShowArrows(slides, prveBtn, nextBtn, prevIndex);

});

// When I click right, move slides to right

nextBtn.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current-slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector('.curr-slide');
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide);
	
	// const amountToMove = nextSlide.style.left;
	moveToSlide(track, currentSlide, nextSlide);
	// move to the next slide 
	updateDots(currentDot, nextDot);
	hideShowArrows(slides, prveBtn, nextBtn, nextIndex);
});


dotsNav.addEventListener('click', e =>{
	const targetDot = e.target;
	
	if (!targetDot) return;

	const currentSlide = track.querySelector('.current-slide');
	const currentDot = dotsNav.querySelector('.curr-slide');
	const targetIndex = dots.findIndex(dot => dot === targetDot);
	const targetSlide = slides[targetIndex];
	moveToSlide(track, currentSlide, targetSlide);

	updateDots(currentDot, targetDot);

	hideShowArrows(slides,  prveBtn, nextBtn, targetIndex);
	
});